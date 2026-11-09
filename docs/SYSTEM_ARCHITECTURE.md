# System Architecture (v2)

## 1. Shape: modular monolith

One Next.js app on Vercel (functions pinned to `bom1`), one PostgreSQL database in an Indian region. One database means one transaction boundary, and that is what makes "no overselling" and "every change audited" simple. No microservices.

```
src/
  app/                        # presentation only
    (store)/  (account)/      # storefront + customer area
    admin/                    # back office, incl. POS screen and manufacturing screens
    api/auth/[...all]/        # Better Auth handler
    api/webhooks/razorpay/    # external callers
    api/cron/*                # Vercel Cron jobs
  modules/
    identity/      # Better Auth wrapper: getSession, requirePermission
    audit/         # audit.log(tx, …)
    catalog/       # products, variants, images, publish gate
    compliance/    # classification, licences, claims, term checker
    inventory/     # stock items, lots, balances, movements, reservations, allocation (FEFO), transfers
    manufacturing/ # formulations, BOMs, production orders, batches, QC, costing      [ERP phase]
    procurement/   # suppliers, POs, goods receipts                                    [ERP phase]
    sales/         # carts, order pricing, order placement, fulfilment, returns
    payments/      # Razorpay, cash/COD, refunds, settlements, reconciliation
    tax/           # tax classes, rates, document series, invoices, credit/debit notes
    customers/
  lib/  components/
```

Each module has `*.service.ts` (use cases, transactions, permission checks), `*.repo.ts` (Prisma only), `*.schema.ts` (Zod), pure domain files (e.g. `fefo.ts`, `gst.ts`) with unit tests, and an `index.ts` public API.

**Rules:** `app/` imports only module `index.ts`. Modules call each other's services, never their repos. Zod validates at every trust boundary. **Authorization is checked in services.** Multi-module writes share one `tx`. Only `identity` imports the auth library.

## 2. One sales pipeline for every channel

All channels go through the **same commands**; a channel is a policy, not a code path.

```
sales.placeOrder(input, channelPolicy)
  1. validate (Zod) + requirePermission (POS/MANUAL need staff)
  2. priceOrder: load variants from DB, apply prices, compute GST lines (tax.computeLines)
  3. tx:
       create SalesOrder + lines (snapshots)
       inventory.allocate(lines, warehouse, channel)    ← FEFO, row locks, all channels
       payments.start(order, method)                    ← Razorpay order | COD | cash
       audit.log
  4. channelPolicy.after(order)
```

| Policy | WEB (prepaid) | WEB (COD) | POS (counter) | MANUAL (phone/WhatsApp) |
|---|---|---|---|---|
| Reservation | ACTIVE, TTL 15 min | ACTIVE, no TTL | committed immediately | ACTIVE, no TTL |
| Payment | Razorpay; webhook confirms | collected on delivery; settled by courier remittance | cash / UPI / card terminal recorded now | staff picks: payment link (Razorpay) or COD |
| Order status after placement | PENDING_PAYMENT → CONFIRMED | CONFIRMED | COMPLETED | CONFIRMED |
| Tax invoice issued | on dispatch | on dispatch | at sale | on dispatch |
| Fulfilment | pick (FEFO lots pre-allocated, swap allowed), pack, ship | same | handed over | same |

Commit point: `fulfilment.ship()` (or POS sale) converts reservations into `SALE` movements and issues the tax invoice **in the same transaction**.

### Returns and refunds

`ReturnRequest` (REQUESTED → APPROVED → RECEIVED → INSPECTED → CLOSED). On inspection, each line is restocked (`CUSTOMER_RETURN` into its **original lot**, QC status ON_HOLD until re-checked) or written off (`DAMAGE`). A refund (Razorpay refund API, or cash/UPI recorded) plus a **credit note** referencing the original invoice are created in one transaction. Cancellation **before** dispatch just releases reservations: no invoice exists yet, so no credit note is needed.

### Payment reconciliation

- Razorpay webhook (`payment.captured`, `payment.failed`, `refund.processed`, `settlement.processed`) → `WebhookEvent` (unique) → handler.
- Daily job pulls Razorpay settlements → `Settlement` rows → matched to `Payment` by provider id; fees recorded; anything unmatched appears on an admin reconciliation screen.
- COD: courier remittance entered or imported (CSV) as `Settlement(source=COURIER_COD)` and matched to shipments.
- Late capture after the reservation expired: re-allocate; if stock is gone, the order becomes NEEDS_ATTENTION and an auto-refund is proposed.

## 3. GST documents (design; **all rates, HSN codes and formats pending CA approval**)

Based on CGST Rule 46(b): a consecutive serial number of **at most 16 characters**, in **one or multiple series**, using letters, digits, `-` and `/`, **unique for a financial year** ([CBIC Rule 46](https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter6/rule46_v1.00.html)). Practitioners recommend a year-coded prefix (e.g. `EA/WEB/26-27/000042`) so numbers never clash across years.

| Requirement | Design |
|---|---|
| FY-specific numbering | `DocumentSeries` is unique per (docType, code, FY, GSTIN). A new series row is created for each FY (1 April), automatically on first use if the owner has configured its prefix. |
| Multiple series | Separate series per channel or doc type (e.g. WEB, POS; invoices vs credit notes), as configured. |
| Transactional allocation | `tax.issueDocument(tx, …)`: `SELECT … FOR UPDATE` on the series row → take `nextNumber` → insert `TaxDocument` → increment → commit. Same transaction as the shipment or sale, so a rollback never leaves a gap and two documents can never share a number. A Postgres `SEQUENCE` is deliberately **not** used: sequences skip numbers on rollback. |
| Immutable | All content is snapshotted at issue (supplier, recipient, lines, totals). A DB trigger blocks updates except ISSUED → CANCELLED. |
| Cancellation | Sets status CANCELLED with reason, actor and time. The number is never reused, and the record stays and appears in the register as cancelled. For goods already supplied, the correct instrument is usually a **credit note**, not cancellation (CA to confirm the policy). |
| Credit / debit notes | Own doc types and series, `originalDocumentId` points to the invoice, reason required; created by returns or post-sale price corrections. |
| Intra- vs inter-state | `placeOfSupplyStateCode` vs the registration's state → CGST+SGST or IGST (pure function, unit-tested). |
| B2C / B2B | Customer GSTIN optional; if present, the invoice carries recipient GSTIN (B2B). |
| E-invoicing (IRN) | Not required while turnover is below the threshold (₹5 crore AATO per current secondary sources). Columns exist and stay null. **CA to confirm applicability.** |
| Registers & exports | Sales register and HSN summary CSV for the CA / GSTR-1 preparation. |

**Not decided by software:** the HSN code and rate for each product (depend on classification and licence; GST rates were restructured on 22 Sep 2025), whether a bill of supply applies, invoice wording, and the cancellation-vs-credit-note policy. All are entered or approved by the owner with their CA before go-live.

## 4. Inventory & manufacturing

See INVENTORY_AND_MANUFACTURING_MODEL.md. Key points: one write path (`inventory.post`); FEFO allocation over eligible lots only (RELEASED, enough remaining shelf life, active warehouse for the channel); deterministic row-lock order; production pins the formulation version, and consumption, yield, rejects, QC and costing are recorded per batch.

## 5. Cross-cutting

| Concern | Decision |
|---|---|
| Auth | Better Auth (AUTHENTICATION_DECISION.md) |
| Audit | `audit.log` in the same tx for every admin mutation; inventory ledger and tax documents are their own immutable records |
| Idempotency | Order placement takes an `idempotencyKey` (client-generated UUID); webhooks are deduplicated by event id |
| Jobs (Vercel Cron) | release expired reservations (5 min), Razorpay settlement pull (daily), lot expiry scan (daily), licence expiry alert (daily), ledger drift check (daily, read-only) |
| Images | Cloudinary signed uploads; `next/image` with a Cloudinary loader |
| Rendering | Catalogue static + ISR (tag revalidation on product, price or stock state change); cart, checkout, account and admin dynamic |
| Observability | Sentry for errors; structured logs with requestId |
| Environments | local Docker Postgres · Vercel preview + branch DB · production; Razorpay test keys outside production; `lib/env.ts` Zod-validates env at boot |
