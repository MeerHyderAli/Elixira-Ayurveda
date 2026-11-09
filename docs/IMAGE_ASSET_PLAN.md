# Image Asset Plan (v2)

## Status (re-checked 2026-11-08)

- `assets/brand-input/` **still does not exist**. No logo or product photo has been supplied.
- No image-generation tool is available in this environment (no image MCP and no FAL/Gemini/OpenAI/Replicate key). **No image has been generated.** The briefs below are for a photographer or for a model you run.

## Rules

1. **Packaging is never generated.** Any frame that shows a bottle, pouch, label or cap uses a real photograph of the real item. Generated backgrounds may be composited behind real cut-outs, but never retouched into a different design.
2. No generated people presented as customers or as Dr. Saher; no generated before/after; no generated testimonials.
3. Every generated asset is tagged `generated: true` in the asset register.
4. Colour direction everywhere: forest shadows, ivory/beige highlights, muted gold accents, the labels' own hibiscus red left untouched.

## A. Real product photography (owner shoot: **required**)

| ID | Use | Ratio / px | Brief |
|---|---|---|---|
| P1–P4 per SKU-size | PDP gallery | 1:1, 2000² | front, 3/4, back label (legible), texture (oil drop / powder / lather); ivory seamless, soft even light |
| P5 per SKU | PDP alt + product card hover | 4:5, 1600×2000 | in hand or in use (hands only) |
| P6 per SKU | Signature section, dark variant | 4:5 | on forest seamless, soft key + gold rim light |
| H1 | Home hero, desktop | 16:9, 2880×1620 | real 200 ml bottle on dark wet slate with real bhringraj, amla, hibiscus; hard side light from the right; product at right third, left 60% clear |
| H2 | Home hero, mobile | 4:5, 1440×1800 | same set, recomposed (product lower centre, top 45% clear), shot separately, not cropped |
| C1–C3 | Category banners (oils, cleansers, packs) | 21:9, 2520×1080 | the products of that category on linen or stone with their herbs, text space right |
| E1 | Our Practice | 3:2, 2400×1600 | Dr. Saher's hands preparing herbs in brass vessels (portrait only with consent) |
| E2 | Small-batch section | 16:9 video, 6–10s loop | original footage of herbs simmering and stirring (the owner already has similar Instagram clips; originals needed) |
| L1 | Logo | vector + PNG | master files plus a horizontal wordmark lock-up |

## B. Generated campaign photography (only around real products)

| ID | Use | Ratio | Brief | Real product? |
|---|---|---|---|---|
| G1 | Hero backdrop if H1 can't be shot | 16:9 + 4:5 | empty dark wet slate, scattered bhringraj leaves and hibiscus petals, single hard light from the right, deep forest-green falloff, empty right third ready for a real bottle cut-out | Composite a real cut-out |
| G2 | Ritual section backgrounds | 3:2 | linen and brass bowl still life, warm window light, empty foreground | Composite or none |
| G3 | OG share default | 1.91:1, 1200×630 | forest backdrop with space for logo left and a real product right | Composite |

## C. Botanical imagery (generatable or licensed stock)

| ID | Ingredient | Ratio | Brief |
|---|---|---|---|
| I1 | Bhringraj (Eclipta prostrata) | 4:5, 1200×1500 | single specimen, botanical-plate style, centred on ivory handmade paper, soft top light, muted sage and forest tones, no text |
| I2 | Amla (Phyllanthus emblica) | same | sprig with fruit |
| I3 | Reetha (Sapindus) | same | dried soapnuts and a leaf |
| I4 | Shikakai (Acacia concinna) | same | pods |
| I5 | Neem | same | leaf sprig |
| I6 | Methi (fenugreek) | same | seeds and leaves |
| I7 | Jatamansi | same | dried rhizome |
| I8 | Black seed (Nigella sativa) | same | seed head and seeds |

Only use ingredients the formulation actually contains (confirm each against the formulation version before publishing).

## D. Decorative assets

| ID | Use | Format | Brief |
|---|---|---|---|
| D1 | Section dividers, empty states | SVG, single stroke | leaf sprigs drawn in the label's illustration spirit (traced from label art only with owner permission) |
| D2 | Dark texture | tileable WebP 2048² | faint leaf silhouettes, forest on forest, <6% luminance variance |
| D3 | Light texture | tileable WebP 2048² | same, beige on ivory |
| D4 | Favicon / app icon | SVG + PNG set | simplified logo mark (woman-profile leaf), derived from the vector logo |

## Missing-asset checklist (owner)

Logo vectors · horizontal wordmark · label artwork files · product shoot (A) · original process videos · Dr. Saher portrait/hands with consent · usage rights for any stock botanicals.

## Homepage image slots (built 2026-11-08)

The homepage renders a labelled placeholder for every slot below until a file is supplied. To add an image: save it under `public/images/` and set `src` (and `alt`) for its id in `src/content/site.ts` → `imageSlots`. Nothing else changes. Real packaging only for any slot that shows a product.

| Slot | Where on the page | Ratio | Shows real packaging? |
|---|---|---|---|
| H1 | Hero, full-bleed behind the headline (replaces the logo stage) | 16:9, ≥2880 px wide | Yes |
| H2 | Hero, mobile crop (reserved) | 4:5 | Yes |
| E2 | Philosophy, small-batch process | 3:4 | No (process) |
| C1–C7 | Collections panel: Hair Oils, Hair Care, Face Serums, Face Packs, Gels, Soaps, Lips & Body | 4:5 desktop, 16:9 mobile (subject centred) | Yes |
| P1–P4 | Featured: Premium Hair Oil, Black Seed Hair Oil, Herbal Hair Pack, Kumkumadi Face Serum | 4:5 | Yes |
| P3 | Also the ritual section image | 4:3 crop of the same file | Yes |
| I1–I8 | Ingredient plates: bhringraj, amla, shikakai, reetha, neem, black seed, saffron, mulethi | 4:5 | No (botanical) |
| E1 | Founder portrait (consent needed) | 4:5 | No |
| G1–G6 | Instagram gallery tiles (owner's own post images) | 1:1 | Varies |

Still missing from the brand kit: a vector or transparent-background horizontal wordmark (the header currently uses a typeset interim lock-up in `src/components/wordmark.tsx`).
