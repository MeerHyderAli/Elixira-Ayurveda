# Architecture Review V2

Reviewed 2026-11-08: all 14 v1 documents. Outcome: the overall shape (modular monolith, ledger-based inventory, unified orders, price snapshots) holds. The inventory, manufacturing, tax and compliance models needed correction. Changes are applied in the documents listed in §5.

## 1. Contradictions found in v1

| # | Where | Problem | Fix |
|---|---|---|---|
| C1 | DEVELOPMENT_ROADMAP (missing info #5) | Suggested "3004 at 12% / 3305 at 18%". That is **an invented rate and HSN**, and it is also outdated: the 12% slab was removed in the GST rate rationalisation effective 22 Sep 2025. | Removed. GST rates and HSN codes are now data entered by the business **after CA approval**. Nothing is hard-coded. |
| C2 | DATABASE_SCHEMA | `Product.hsnCode` and `gstRateBps` are fixed columns. Rates change by notification, and the right one depends on classification. | `TaxClass` with effective-dated `TaxRate` rows; the variant points to a tax class; order lines snapshot the rate. |
| C3 | DATABASE_SCHEMA | `ProductVariant.inventoryItemId` (variant owns stock identity) contradicts the "raw materials must not enter the catalogue" principle in spirit: the stock model hung off the catalogue. | Reversed: `StockItem` is the root; a FINISHED_GOOD `StockItem` optionally references a `ProductVariant`. |
| C4 | SYSTEM_ARCHITECTURE vs BUSINESS_REQUIREMENTS | Architecture says COD stock is "committed on dispatch", but requirements had no fulfilment status separate from order status. | `SalesOrder` gets separate `status`, `paymentStatus` and `fulfilmentStatus`, plus a `Shipment` entity. |
| C5 | DATABASE_SCHEMA vs SYSTEM_ARCHITECTURE | Batch had no QC status, yet FEFO was described as "eligible" batches. | `StockLot.qcStatus`; an eligibility rule is defined in INVENTORY_AND_MANUFACTURING_MODEL §4. |
| C6 | API_CONTRACTS | `Role` was a Prisma enum while the plan said "Auth.js". Auth is now decided (Better Auth) and roles come from its admin plugin plus our permission map. | See AUTHENTICATION_DECISION. |
| C7 | SYSTEM_ARCHITECTURE | "Gapless invoice number via DocumentSequence" was treated as sufficient. Legal numbering needs FY-scoping, series, immutability and cancellation records. | Full document-numbering design in §3 of SYSTEM_ARCHITECTURE and in DATABASE_SCHEMA. |
| C8 | BUSINESS_REQUIREMENTS | Returns and refunds were out of scope, but omnichannel needs them, and credit notes depend on them. | Added as an MVP-adjacent phase. |
| C9 | DESIGN_SYSTEM | "Reference sites recalled from knowledge". | Replaced by live research with URLs (HOMEPAGE_CONCEPTS §1). |
| C10 | SYSTEM_ARCHITECTURE | Integer quantities everywhere. Raw materials are weighed (g, ml) and costs are fractional paise per gram. | Quantities are `Decimal(14,3)` in the item's base unit; costs are `Decimal(14,4)` paise; **customer-facing money stays integer paise**. |

## 2. Missing requirements added

- **WIP / bulk stage:** one bulk batch of oil is filled into 100 ml and 200 ml bottles. v1 had no way to represent that.
- **Packaging bill of materials** per variant (bottle, cap, label, carton), versioned. Label text changes for compliance.
- **Planned vs actual consumption, yield, rejects, costing.**
- **Raw-material lots** with supplier lot number, expiry and incoming QC.
- **Stock transfers** between warehouses, with in-transit state.
- **Payment reconciliation:** Razorpay settlements and COD remittances matched against orders.
- **Shipments** separate from orders (partial shipment is possible later).
- **Compliance model:** product classification, licences, a claims library with review gating.
- **Indian SMS rules:** phone OTP needs TRAI DLT-registered templates through an SMS provider.
- **Customer shelf-life rule:** don't ship a lot that expires within N days (configurable per channel).

## 3. Unnecessary complexity removed or deferred

| Item | Decision |
|---|---|
| Separate stateless "reconcile-stock" cron that rebuilds balances | Kept as a **read-only drift check**, never auto-correcting |
| Ingredient pages and Tag kinds in v1 | Deferred to v1.1 |
| Custom role tables | Not needed. Fixed roles plus a permission map in code. |
| Multi-step "PosSession / register" | Deferred. POS v1 = staff using the same order command from an admin screen. |
| Accounting journals, CRM, HR | Unchanged: later phases only |
| Separate microservice for inventory | Never. One transaction boundary is the main reason to keep the monolith. |

## 4. Future migration risks

| Risk | Mitigation built in now |
|---|---|
| Moving from a single warehouse to many | Warehouse is already a key on every balance and movement; the v1 seed creates one warehouse. |
| Adding manufacturing after the shop is live | FG stock is already lot-based, and lots carry a nullable `productionBatchId`. Opening stock is entered as `OPENING_BALANCE` movements on manually created lots. |
| Price-list per channel later | Order lines already snapshot price; adding `PriceList` changes only the pricing function. |
| Prisma major upgrade | Better Auth's Prisma adapter supports Prisma 7; **Prisma 8 is in RC and not yet supported**. Pin Prisma 7. |
| E-invoicing when turnover crosses the threshold (₹5 crore AATO per current sources; CA to confirm) | `TaxDocument` has `irn`, `ackNo`, `signedQr` columns, nullable now. |
| Classification changes (cosmetic ↔ Ayurvedic medicine) | Classification is per product, versioned, and gates publishing. Tax class and label text follow it. |
| Auth library churn | Auth is behind the `identity` module; the app uses `getSession()`/`requirePermission()`, never the library directly. |

## 5. Documents changed

New: ARCHITECTURE_REVIEW_V2, AUTHENTICATION_DECISION, INVENTORY_AND_MANUFACTURING_MODEL, PRODUCT_COMPLIANCE_MODEL, HOMEPAGE_CONCEPTS.
Updated: DATABASE_SCHEMA, SYSTEM_ARCHITECTURE, API_CONTRACTS, DESIGN_SYSTEM, HOMEPAGE_WIREFRAME, DEVELOPMENT_ROADMAP, IMAGE_ASSET_PLAN, BUSINESS_REQUIREMENTS (scope lines), PROJECT_OVERVIEW (map).
Unchanged (research findings still valid): BRAND_RESEARCH, PRODUCT_CATALOGUE_RESEARCH, BRAND_ASSET_INVENTORY (folder still absent), SEO_STRATEGY, SKILL_INVENTORY.
