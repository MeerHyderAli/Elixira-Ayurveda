# Business Requirements (v1)

## Actors

Guest shopper · Registered customer · Staff roles: **Owner** (all), **Manager** (catalogue, inventory, orders, reports), **Fulfilment** (orders, inventory movements), **Viewer** (read-only reports).

## Storefront

| ID | Requirement |
|---|---|
| S1 | Homepage per `HOMEPAGE_WIREFRAME.md` |
| S2 | Shop page listing all active products; category pages; filter by category, concern tag and size; sort by featured / price / new |
| S3 | Search across product name, ingredients and tags (Postgres full-text; no external search service in v1) |
| S4 | PDP: gallery, variant (size) selector with per-variant price and stock state, ingredients, how to use, cautions, batch/expiry info, related products |
| S5 | Cart: guest cart persisted by cookie, merged on login; quantity limits up to available stock |
| S6 | Checkout: address (India, PIN code validated), shipping method, payment **Razorpay** or **Cash on Delivery** (COD limits configurable, e.g. max order value) |
| S7 | Order confirmation page and email (plus WhatsApp later; see the open questions) |
| S8 | Customer auth (Better Auth): email OTP + Google; guest checkout; phone OTP later (needs an SMS provider with TRAI DLT registration) |
| S9 | Account: order history, order detail and status, saved addresses |
| S10 | WhatsApp contact button with a prefilled message (`wa.me/917019556628`) on every page; PDP prefills the product name |
| S11 | Static pages: About / Our Practice, Shipping, Returns & Refunds, Privacy, Terms, Contact (required by Razorpay onboarding) |

## Admin

| ID | Requirement |
|---|---|
| A1 | Dashboard: today/7d/30d revenue, order count, AOV, low-stock list, expiring batches (≤60 days) |
| A2 | Products CRUD with draft/active/archived states, SEO fields, image upload to Cloudinary with ordering and alt text |
| A3 | Categories CRUD (nested one level) |
| A4 | Variants: size label, net quantity + unit, **unique SKU**, MRP, price, tax class (HSN and effective-dated rate entered after CA approval), weight, barcode (optional) |
| A5 | Inventory: stock per variant per batch per warehouse; manual adjustment with a reason; full movement ledger view |
| A6 | **Production batch receiving:** record a finished-goods batch (variant, batch code, mfg date, expiry date, quantity, warehouse) → creates stock via the ledger |
| A7 | Orders: list and filter, detail, status transitions (Pending → Confirmed → Packed → Shipped → Delivered; Cancelled; Returned), manual **offline order** entry, mark COD paid, cancel with stock release |
| A8 | Customers: list, detail, order history |
| A9 | Reports: sales by day/product/variant, stock on hand, stock valuation (at batch cost when known), expiry report; CSV export |
| A10 | Users and roles: invite staff, assign a role; permissions enforced on server |
| A11 | Audit log viewer: who changed what, when |

## Non-functional

Prices in integer paise · no overselling across channels · idempotent payment webhooks · every stock change in the ledger · audit log for admin mutations · WCAG 2.2 AA · LCP < 2.5s p75 mobile · INR only, India-only shipping in v1 · DPDP Act 2023-aware privacy policy and consent.

## Added in v2 (see ARCHITECTURE_REVIEW_V2)

| ID | Requirement | Phase |
|---|---|---|
| A12 | POS and manual (phone/WhatsApp) orders through the same order command as web | 3 |
| A13 | Returns, refunds, credit notes | 3 |
| A14 | Payment reconciliation (Razorpay settlements, COD remittances) | 3 |
| A15 | Compliance: classification, licences, claim approval, publish gate | 1 |
| A16 | Lot QC status; FEFO over eligible lots only | 1–2 |
| A17 | Manufacturing: formulations (versioned), packaging BOMs, production orders, consumption, yield, rejects, QC, release, costing | 5 |
| A18 | Multiple warehouses and transfers | 6 (schema from day one) |

## Out of scope for v1 (Phases 0–4)

Procurement and manufacturing screens (Phase 5), multi-warehouse transfers UI (Phase 6), accounting, CRM campaigns, HR, coupons and reviews (Phase 6), subscriptions, international shipping, shipping-carrier API integration (manual tracking number at first), e-invoicing (until applicable).
