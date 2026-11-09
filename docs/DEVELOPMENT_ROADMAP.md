# Development Roadmap (v2)

Each phase ends deployable on a Vercel preview, with tests passing and your review. Nothing starts without your approval.

| Phase | Scope | Exit criteria |
|---|---|---|
| **0 Foundations** | Scaffold Next.js + TS strict + Tailwind + shadcn; Prisma **7** + Postgres; Better Auth (email OTP, Google, staff 2FA, roles); `identity`, `audit`, `lib/env`, `lib/money`; tokens and fonts; CI (typecheck, lint, unit, Playwright smoke) | Branded shell deployed; customer and staff sign-in work; CI green |
| **1 Catalogue, compliance, stock foundation** | Catalogue + variants + images; **compliance module** (classification, licences, claims, term checker, publish gate); StockItem / Warehouse / StockLot / InventoryBalance / InventoryMovement; opening-stock entry; storefront: home (light variant until the shoot), shop, category, PDP, search; SEO metadata + JSON-LD | Only VERIFIED products can publish; Lighthouse ≥ 90 mobile; accessibility audit passes |
| **2 Unified sales (web)** | `sales.quote/placeOrder` with FEFO allocation; cart, checkout, Razorpay, COD; webhooks; reservation expiry; shipments; **tax module** (classes, effective rates, series, invoice issue on dispatch); order emails | E2E: prepaid, COD, **two concurrent buyers for the last unit**, duplicate webhook, late capture; invoices numbered correctly across an FY boundary (test clock) |
| **3 Admin + POS + manual orders** | Dashboard; catalogue and stock admin; adjustments with reasons; lot QC status; **POS screen and manual orders on the same `placeOrder`**; returns + refunds + credit notes; payment reconciliation (Razorpay settlements, COD remittance CSV); reports; audit viewer | Owner runs daily operations from admin; POS and web share stock with no oversell |
| **4 Launch hardening** | Security review (auth, webhooks, actions, RLS-style DB privileges), performance, **CA sign-off on tax configuration**, **compliance sign-off on claims**, Razorpay live, domain/email, backups, Sentry, campaign photography swap-in (dark variant) | Go-live checklist signed |
| **5 Make (ERP I)** | Raw/packaging/WIP items; suppliers, POs, goods receipts with incoming QC; formulations + versions; packaging BOMs; production orders (bulk / packing / single-step), consumption actual vs planned, yield, rejects, QC inspection + release, batch costing; live batch card on the homepage | A run consumes RM lots, produces a WIP lot, packs into two FG sizes, passes QC, and becomes sellable via FEFO with a computed unit cost |
| **6 Scale stock (ERP II)** | Multiple warehouses with transfers; channel-to-warehouse rules; reorder alerts; coupons; verified reviews; phone OTP (after an SMS/DLT provider is chosen) | Transfer in transit is excluded from availability; the receiving warehouse becomes sellable on receipt |
| **7 Run the business (ERP III)** | Accounting journals, GST registers for filing, e-invoicing when applicable, CRM, HR | Scoped separately |

## Open decisions (need your answer)

| # | Decision | Recommendation |
|---|---|---|
| D1 | Auth library | **Better Auth** (AUTHENTICATION_DECISION) |
| D2 | Homepage direction | **Concept A** with B's founder and ritual sections; light variant until the shoot |
| D3 | Signature product for the hero | Black Seed Hair Oil or Premium Hair Oil: your call |
| D4 | Keep the tagline "Heal Deeply"? | Keep for brand, pending compliance review; alternative "Nourish Deeply" |
| D5 | Customer sign-in | Email OTP + Google now; phone OTP later |
| D6 | Minimum remaining shelf life per channel | Web 90 days, POS 30 days |
| D7 | QC separation of duties (inspector ≠ releaser) | On when staff ≥ 2, else owner releases |
| D8 | Invoice series | WEB and POS series + separate credit-note series, prefix `EA/<SERIES>/<YY-YY>/` (CA to approve) |
| D9 | POS hardware | Browser on a tablet/laptop, barcode scanner as keyboard, receipt via WhatsApp/email or an A4/thermal print |
| D10 | Swarna Prashana and consultations | Enquiry only, not sold online |

## Information still missing

Logo and photo files (folder absent) · complete product list and sizes · MRP and selling prices · ingredients, usage, cautions, shelf life · **licence documents** (classification depends on them) · legal entity, GSTIN, state of registration · **HSN codes and GST rates from your CA** · shipping carrier, rates and COD rules · return policy · domain and Razorpay status · staff list and roles · raw-material list and suppliers (Phase 5).

## Risks

| ID | Risk | Mitigation |
|---|---|---|
| R1 | Medicinal claims break the law | Compliance model with publish gate and claim review |
| R2 | Wrong classification or licence | Classification needs evidence; products are unpublishable until verified |
| R3 | Incorrect GST configuration | No rates or HSN in code; effective-dated rates entered after CA sign-off |
| R4 | Poor photography undermines the luxury direction | Light variant fallback; shoot before Phase 4 |
| R5 | Overselling across channels | One allocation function, row locks, CHECK constraints, concurrency E2E tests |
| R6 | Over-building ERP early | Schema designed now, code only per phase; Phase 5+ only after the shop is live |
| R7 | Better Auth / Prisma version coupling | Pin Prisma 7 and the Better Auth version; upgrade together |
| R8 | Regulatory status of ASU advertising rules changed recently (Rule 170) | Expert review before launch; claims stay conservative by default |
| R9 | Only 12 of 77 Instagram posts reviewed | Owner supplies the full catalogue |
