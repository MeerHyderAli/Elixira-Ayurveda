# API Contracts (v2)

Internal mutations are **Server Actions** that call module services. **Route handlers** are only for external callers (auth, webhooks, cron) and cached reads. Every input is Zod-validated; every service checks permissions.

```ts
type Result<T> = { ok: true; data: T } | { ok: false; error: { code: ErrorCode; message: string; fields?: Record<string,string>; details?: unknown } };
type ErrorCode = 'VALIDATION'|'UNAUTHENTICATED'|'FORBIDDEN'|'NOT_FOUND'|'OUT_OF_STOCK'|'CONFLICT'|'INVALID_STATE'|'PAYMENT_FAILED'|'COMPLIANCE_BLOCKED'|'INTERNAL';
```

## Shared sales commands (used by web, POS and manual orders)

| Command | Input | Output | Permission |
|---|---|---|---|
| `sales.quote` | `{ channel, lines:[{variantId, qty}], shipToStateCode?, warehouseId? }` | priced lines with tax split, totals, per-line availability | public (web) / `pos:sell` |
| `sales.placeOrder` | `{ channel, lines, customer?, addresses?, paymentMethod, idempotencyKey, notes? }` | `{ orderId, orderNumber, payment?: {razorpayOrderId, keyId, amount} }` | WEB: public; POS: `pos:sell`; MANUAL: `orders:write` |
| `sales.cancelOrder` | `{ orderId, reason }` | order | owner of order (before dispatch) / `orders:write` |
| `fulfilment.allocate` / `swapLot` | `{ orderLineId, lotId, qty }` | allocations | `orders:fulfil` |
| `fulfilment.ship` | `{ orderId, carrier?, trackingNumber? }` | shipment + tax invoice | `orders:fulfil` |
| `fulfilment.markDelivered` | `{ shipmentId }` | shipment | `orders:fulfil` |
| `returns.request` / `approve` / `receive` / `inspect` | return lines, dispositions | return | customer (request) / `returns:manage` |
| `payments.recordManual` | `{ orderId, method: CASH\|UPI_DIRECT\|CARD_TERMINAL\|COD, amountPaise, reference? }` | payment | `payments:write` |
| `payments.refund` | `{ orderId, amountPaise, returnId?, reason }` | refund + credit note | `payments:refund` |
| `payments.createPaymentLink` | `{ orderId }` | Razorpay link | `orders:write` |

Client-supplied prices are never accepted. POS price overrides, if ever allowed, need `pos:override_price` and a reason, and are audited.

## Storefront-only

`cart.addItem/updateItem/clear`, `checkout.verifyPayment` (HMAC check for UI feedback only; the webhook is authoritative), `account.addresses.*`, `account.orders.list/get`.

## Inventory

| Command | Permission |
|---|---|
| `inventory.receiveOpeningStock { stockItemId, warehouseId, lotCode, mfgDate, expiryDate, qty, unitCost? }` | `inventory:receive` |
| `inventory.adjust { stockItemId, warehouseId, lotId, delta, reasonCode, note }` | `inventory:adjust` |
| `inventory.setLotStatus { lotId, status, reason }` | `qc:release` |
| `inventory.transfer.create/dispatch/receive` | `inventory:transfer` |
| `inventory.ledger.query { filters }` (read) | `inventory:read` |

## Manufacturing [ERP phase]

`formulation.createVersion` / `approveVersion` (`formulation:approve`) · `bom.createVersion` / `approveVersion` · `production.plan { kind, versionIds, plannedQty, date, warehouseId }` → requirements and shortages · `production.release` (reserves inputs FEFO) · `production.recordConsumption { lines:[{lotId, actualQty}] }` · `production.recordOutput { goodQty, rejectedQty, rejectReason, qcSampleQty, lotCode, mfgDate }` · `qc.recordInspection` · `qc.release { lotId, outcome }` (`qc:release`, separation-of-duties setting) · `production.close` (computes yield and cost).

## Tax

`tax.classes.upsert`, `tax.rates.add { taxClassId, rateBps, effectiveFrom, notificationRef }` (`tax:configure`, Owner only) · `tax.series.configure` · `tax.documents.cancel { id, reason }` (`tax:cancel`) · `tax.documents.issueDebitNote` · registers and CSV exports (`reports:read`). Invoice and credit-note **issue** is internal only, triggered by ship, POS sale and refund.

## Compliance and catalogue

`catalog.upsertProduct/Variant`, `catalog.publish` → fails with `COMPLIANCE_BLOCKED` unless verified · `compliance.setClassification`, `compliance.licences.upsert`, `compliance.claims.submit/approve/reject` (`compliance:approve`), `compliance.checkText { text }` → flagged terms.

## Route handlers

| Route | Auth | Purpose |
|---|---|---|
| `/api/auth/[...all]` | Better Auth | sign-in, OTP, sessions |
| `POST /api/webhooks/razorpay` | HMAC on raw body | payments, refunds, settlements (deduplicated by `WebhookEvent`) |
| `GET /api/cron/*` | `Bearer CRON_SECRET` | reservation expiry, settlement pull, lot expiry, licence expiry, drift check |
| `GET /api/search?q=` | public | product search (Postgres FTS), 60s cache |
| `GET /api/stock/:variantId` | public | in stock / low / out (never exact counts) |

## Permission map (code constant, mirrored in Better Auth access control)

| Role | Permissions |
|---|---|
| owner | all |
| manager | catalog:*, compliance:read, inventory:*, orders:*, returns:manage, payments:write, payments:refund, reports:read, production:* |
| fulfilment | orders:fulfil, inventory:receive, inventory:transfer, inventory:read |
| pos | pos:sell, payments:write, inventory:read |
| qc (can be combined) | qc:release, inventory:read |
| viewer | reports:read |
| *owner only* | tax:configure, tax:cancel, compliance:approve, formulation:approve, users:manage, pos:override_price |
