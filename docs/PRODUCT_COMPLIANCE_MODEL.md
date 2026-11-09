# Product Compliance Model

**This is a data model and workflow, not legal advice.** The system records classifications, licences and claim approvals that qualified people decide. It never decides them itself.

## 1. Regulatory context (to confirm with a regulatory consultant)

| Topic | What sources indicate | Status |
|---|---|---|
| Classification | In India, a hair oil or shampoo can be sold as a **cosmetic** (Drugs & Cosmetics Act 1940 / Cosmetics Rules 2020) or as an **Ayurvedic drug**: classical, or proprietary/patent (Chapter IVA, Drugs Rules 1945, licensed by the State AYUSH authority). The licence under which it is manufactured decides which. | **Unknown for every Elixira product.** Needs the licence documents. |
| Advertising of Ayurvedic drugs | Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 prohibits ads claiming to treat listed diseases and conditions. Rule 170 (pre-approval of ASU drug ads): AYUSH notified its omission in Jul 2024, the Supreme Court stayed that in Aug 2024, and the stay was vacated in Aug 2025 ([LiveLaw](https://www.livelaw.in/top-stories/supreme-court-vacates-stay-on-ayush-ministrys-notification-that-permitted-advertisements-of-ayurvedic-unani-siddha-drugs-300536), [Medical Dialogues](https://medicaldialogues.in/amp/news/health/misleading-medical-ads-case-sc-disposes-ima-plea-lifts-stay-on-ayush-ad-pre-approval-rule-153283)). Current 2026 status is **unverified**. | Expert review |
| Cosmetic claims | A cosmetic must not claim to treat or cure; ASCI guidelines apply to "natural" and "chemical-free" style claims. | Expert review |
| Labelling | Net quantity, MRP, manufacturer, licence number, batch, mfg/expiry, ingredients. Legal Metrology (Packaged Commodities) Rules + product-category rules. | Expert review |
| Services for children (Swarna Prashana) | A medical service; not a product listing | Enquiry only |

## 2. Data model

```
RegulatoryClassification (enum)
  COSMETIC | AYURVEDIC_CLASSICAL | AYURVEDIC_PROPRIETARY | FOOD_OR_NUTRACEUTICAL | OTHER | UNCLASSIFIED

Licence
  id, type (COSMETIC_MFG | AYUSH_MFG | FSSAI | GST | TRADE | OTHER), number, issuingAuthority,
  holderName, premisesAddress, validFrom, validTo, documentAssetId, status (ACTIVE/EXPIRED/SUSPENDED)

ProductCompliance            (one current row per Product; history kept as versions)
  productId, version, classification, licenceId?, evidenceAssetIds[],
  labelArtworkAssetId?, ingredientDeclaration (text), mandatoryCautions (text),
  status: UNVERIFIED | UNDER_REVIEW | VERIFIED | REJECTED,
  reviewedBy (name + qualification, free text), reviewedAt, notes

Claim                         (reusable claim library)
  id, text, kind (COSMETIC_BENEFIT | TRADITIONAL_USE | INGREDIENT_FACT | PROCESS_FACT | THERAPEUTIC),
  riskLevel (LOW | NEEDS_EXPERT_REVIEW | PROHIBITED), flaggedTerms[], allowedClassifications[]

ProductClaim
  productId, claimId, placement (PDP_BENEFITS | PDP_DESCRIPTION | SEO_DESCRIPTION | CATEGORY | AD),
  status: DRAFT | IN_REVIEW | APPROVED | REJECTED | WITHDRAWN,
  evidence (text/asset), approvedBy, approvedAt, expiresAt?
```

## 3. Rules the software enforces

1. **Publishing gate:** a product can't move to ACTIVE unless `ProductCompliance.status = VERIFIED` and a licence is linked and valid.
2. **Only APPROVED claims render.** The PDP's benefit bullets, SEO description and badges come from `ProductClaim` rows, not free text. Free-text description fields run through the term checker on save.
3. **Term checker** (`compliance.checkText`) flags, never auto-approves:
   - prohibited by default: cure, cures, treat, treatment of, heals (applied to a condition), guaranteed, permanent, regrow, stops hair fall, 100% safe, no side effects, chemical-free, doctor-recommended (unless substantiated), any disease name from the DMR Act schedule (the list is maintained as data)
   - needs review: anti-dandruff, anti-hairfall, prevents greying, antimicrobial, clinically proven, results in N days, before/after
4. A THERAPEUTIC claim is allowed only when the classification is AYURVEDIC_* **and** a reviewer approved it.
5. **Classification changes** create a new `ProductCompliance` version, set the product back to UNDER_REVIEW and unpublish it.
6. Licence expiry within 60 days raises a dashboard alert; an expired licence unpublishes linked products.

## 4. Current Instagram claims, pre-flagged

| Claim (as posted) | Product | Flag |
|---|---|---|
| "Enhances hair growth" | Hair Pack, Hair Growth Oil | NEEDS_EXPERT_REVIEW |
| "Prevents premature greying" | Hair Pack | NEEDS_EXPERT_REVIEW |
| "Reduces hair fall" / "Hairfall control" | Hair Pack, Shampoo, Hair Growth Oil | NEEDS_EXPERT_REVIEW |
| "antimicrobial properties", "Anti-dandruff" | Black Seed Hair Oil | NEEDS_EXPERT_REVIEW (therapeutic) |
| "Chemical free" | All | PROHIBITED (misleading) |
| "Chemical & preservatives free" | Black Seed Hair Oil | Replace with "No added preservatives" **only if verified** |
| "Suitable for all hair types" | Shampoo | NEEDS_EXPERT_REVIEW (substantiation) |
| "No need to use separate conditioner" | Shampoo | LOW (product-use fact) |
| "Made with 20 herbs" / "15–20 herbs" | Oil / Shampoo | LOW, if the formulation version lists them |
| "Homemade" | All | Brand decision; conflicts with licensed manufacturing wording |
| "Heal Deeply" (tagline) | Brand | NEEDS_EXPERT_REVIEW in product contexts |
