# Inventory and Manufacturing Model

This document defines the concepts. DATABASE_SCHEMA.md holds the tables.

## 1. Concepts and their boundaries

| Concept | What it is | Owned by module | Customer-visible? |
|---|---|---|---|
| **Product** | A marketed product: name, story, images, claims, classification ("Premium Hair Oil") | catalog | Yes |
| **ProductVariant** | A sellable size of a product, with a unique SKU and price ("Premium Hair Oil 200 ml", `EA-PHO-200`) | catalog | Yes |
| **StockItem** | Anything that is counted in stock: `RAW_MATERIAL`, `PACKAGING`, `WIP` (bulk), `FINISHED_GOOD`. Only a FINISHED_GOOD may reference a ProductVariant (`productVariantId`, unique, nullable). | inventory | No |
| **Warehouse** | A physical stock location ("Bidar clinic store", "Production unit"). Optional `Bin` later. | inventory | No |
| **StockLot** | A traceable quantity of one StockItem with its own expiry and QC status: a supplier lot for raw materials, a production batch output for WIP and finished goods | inventory | Lot code and expiry are shown on the PDP |
| **InventoryBalance** | Current `onHand` and `reserved` per (StockItem, Warehouse, StockLot). A projection of the ledger, updated in the same transaction. | inventory | Only as "in stock / low / out" |
| **InventoryMovement** | Append-only ledger row: signed quantity, type, reason, reference document, actor | inventory | No |
| **StockReservation** | A claim on a specific lot's quantity for a sales-order line or a production order, with a status and an optional expiry | inventory | No |
| **StockTransfer** | Moves lots between warehouses: DRAFT → DISPATCHED (in transit) → RECEIVED | inventory | No |
| **ProductionBatch** | One execution of a production order. Records the formulation version used, actual consumption, yield, rejects and cost. Its output becomes one StockLot. | manufacturing | Batch code printed on the label |

Raw materials and packaging live only in `StockItem`. They never appear in `Product` or `ProductVariant`.

## 2. Inventory rules

1. **Every quantity change is a movement.** No code path updates `InventoryBalance` except `inventory.post(movements[], tx)`. That function writes the movements and updates the balances in one transaction, and the `AuditLog` row goes in the same transaction.
2. Movement types: `OPENING_BALANCE`, `PURCHASE_RECEIPT`, `PRODUCTION_OUTPUT`, `PRODUCTION_CONSUMPTION`, `SALE`, `CUSTOMER_RETURN`, `SUPPLIER_RETURN`, `ADJUSTMENT_GAIN`, `ADJUSTMENT_LOSS`, `DAMAGE`, `EXPIRY_WRITE_OFF`, `QC_REJECT`, `TRANSFER_OUT`, `TRANSFER_IN`, `SAMPLE` (free samples and testers).
3. Adjustments need a reason code and permission `inventory:adjust`. Above a configurable quantity, owner approval is needed (v2).
4. Corrections are **reversing movements**, never edits or deletes.
5. DB constraints: `onHand >= 0`, `reserved >= 0`, `reserved <= onHand`.

## 3. Lot statuses

```
QUARANTINE ──QC pass──▶ RELEASED ──▶ (expires) EXPIRED
     │                     │
     └──QC fail──▶ REJECTED └──hold──▶ ON_HOLD ──release──▶ RELEASED
```

- Purchase receipts and production outputs **always start in QUARANTINE** (configurable per item; packaging may auto-release).
- `EXPIRED` is computed from `expiryDate`. A daily job moves expired stock to an `EXPIRY_WRITE_OFF` proposal for a human to confirm.

## 4. FEFO allocation: eligibility

A lot is **allocatable for sale** only when all of these hold:

- `qcStatus = RELEASED`
- `expiryDate >= today + minRemainingShelfLifeDays` (setting per channel; e.g. web 90 days, POS 30 days, pending owner decision)
- the StockItem is FINISHED_GOOD and the linked variant is active
- the warehouse is active and enabled for that channel (`Warehouse.sellableChannels`)
- `onHand - reserved > 0`

Allocation sorts eligible lots by `expiryDate ASC, mfgDate ASC, lotId ASC` and fills the line quantity across lots, splitting if needed. Production consumption uses the same function with a different eligibility rule (RELEASED raw/packaging lots, not expired by the planned production date).

**Concurrency:** inside one transaction, `SELECT … FOR UPDATE` the candidate balance rows in that deterministic order (prevents deadlocks), then `UPDATE … SET reserved = reserved + n` per chosen lot. If the total available is short, the whole transaction rolls back with `OUT_OF_STOCK`. Online checkout, POS and manual orders all call this one function, so overselling is impossible across channels.

## 5. Manufacturing flow

Two order kinds share the same tables, because Elixira makes bulk then fills it into several sizes:

```
BULK order   : FormulationVersion × planned bulk qty
               consumes RAW_MATERIAL lots  → produces WIP lot  (e.g. 20 L Premium Hair Oil bulk)
PACKING order: PackagingBomVersion (per variant) × planned units
               consumes WIP lot + PACKAGING lots → produces FINISHED_GOOD lot (e.g. 60 × 200 ml, 80 × 100 ml)
```

A single-step order (raw → finished) is also allowed for simple products such as the hair pack powder.

| Step | Record | Inventory effect |
|---|---|---|
| Plan | `ProductionOrder` (PLANNED): kind, formulation or BOM version **pinned**, planned output, planned date, warehouse | — |
| Material check | Planned requirements = version components × (planned qty ÷ version reference qty) | Shortage report; nothing reserved yet |
| Release to floor | Status RELEASED; FEFO **reserves** input lots | Reservations (refType `ProductionOrder`) |
| Execute | `ProductionBatch` created: `batchCode`, start/end time, operator | — |
| Record actual consumption | `MaterialConsumption` lines: lot, planned qty, **actual qty**, variance | `PRODUCTION_CONSUMPTION` movements; reservations committed |
| Record output | Good qty, **rejected qty** + reason, sample qty retained for QC | `PRODUCTION_OUTPUT` (good qty) into a new lot in QUARANTINE; rejects never enter stock (recorded on the batch) |
| Yield | `yieldPct = good output ÷ planned output`; `materialVariance` per component | — |
| QC inspection | `QcInspection` against the version's `QcSpec` (appearance, odour, viscosity, pH, fill volume, label check, microbial if applicable): each parameter has spec, result, pass/fail; inspector; attachments | — |
| Release | A user with `qc:release` (a different person from the operator when staff allow) sets RELEASED or REJECTED | REJECTED lot → `QC_REJECT` movement to zero |
| Close & cost | Order CLOSED; cost rolled up | Lot `unitCost` set |

### Formulation versioning

- `Formulation` (one per bulk recipe) has many `FormulationVersion` rows: `version`, `status DRAFT → APPROVED → RETIRED`, `referenceQty` + unit, `expectedYieldPct`, `shelfLifeDays`, `components[]` (stockItemId, qty, unit, `isOptional`), `qcSpec`, approvedBy/at.
- **An APPROVED version is immutable.** Changes create a new version.
- A production order pins `formulationVersionId` at planning time. `ProductionBatch` copies it, so the batch always shows the exact recipe used, even after the formula changes.
- `PackagingBom` and `PackagingBomVersion` work the same way, per ProductVariant (bottle, cap, label revision, carton, leaflet).

### Production costing (actual cost)

```
material cost   = Σ consumed lot qty × that lot's unitCost       (raw lots get cost from purchase receipts; WIP lots from their batch)
packaging cost  = same, for packaging lots
conversion cost = labour hours × rate + overhead rate × output   (rates are settings; 0 until the owner provides them)
batch cost      = material + packaging + conversion
unit cost       = batch cost ÷ good output qty                   (rejects and QC samples are absorbed by good units)
```

Costs are stored as `Decimal(14,4)` paise and roll up through WIP into finished goods. Until purchase costs are entered, cost shows "unknown". The system never guesses.

## 6. Opening position (go-live)

Existing finished stock on the shelf becomes lots with `OPENING_BALANCE` movements: batch code from the label, mfg and expiry dates from the label, QC status RELEASED, recorded by the owner, cost optional.
