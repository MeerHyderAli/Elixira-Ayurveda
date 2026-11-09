# Homepage Wireframe (v2): Concept A, Cinematic Botanical Luxury

Narrative: **object → origin → ritual → maker → invitation.** Copy is placeholder and must pass the compliance term checker and owner approval. Benefit lines come only from approved claims.

```
┌──────────────────────────────────────────────────────────────────┐
│ 0 ANNOUNCEMENT (optional, slim): "Hand-prepared in small batches  │
│   in Bidar · Shipping across India"                               │
│ HEADER transparent: [mark+wordmark]  Shop  Rituals  Our Practice  │
│                                         Search  Account  Bag (0)  │
├──────────────────────────────────────────────────────────────────┤
│ 1 HERO  100svh, forest, campaign H1                               │
│                                       [real bottle, right third]  │
│   Glow Naturally.                                                 │
│   Heal Deeply.         ← tagline pending compliance review        │
│   Hair rituals hand-prepared in small batches                     │
│   by an Ayurvedic physician.                                      │
│   [ Shop hair care ]   Meet Dr. Tanzeel →                         │
├──────────────────────────────────────────────────────────────────┤
│ 2 SIGNATURE FORMULA  ivory, 7/5, right column offset ↓            │
│   [product on forest P6]   Black Seed Hair Oil (or owner's pick)  │
│                            one approved benefit line              │
│                            sizes · from ₹— · [ Discover ]         │
├──────────────────────────────────────────────────────────────────┤
│ 3 THE COLLECTION  beige, heading left, 4–5 cards (DESIGN_SYSTEM)  │
├──────────────────────────────────────────────────────────────────┤
│ 4 INGREDIENTS  forest, pinned on desktop (one chapter per herb)   │
│   BHRINGRAJ (huge serif) | specimen image I1…I8                   │
│   "Traditionally used in Ayurveda for …" (approved wording only)  │
├──────────────────────────────────────────────────────────────────┤
│ 5 MADE IN SMALL BATCHES  ivory, 5/7                               │
│   [process video E2, pausable] | text + LIVE BATCH CARD:          │
│   Batch EA-PHO-2611-01 · Made 06 Nov 2026 · Best before …         │
│   · QC released ✓   ← from the latest RELEASED ProductionBatch    │
├──────────────────────────────────────────────────────────────────┤
│ 6 THE RITUAL  beige, editorial numerals 01 02 03                  │
│   Oil → Pack → Shampoo, using the published usage directions      │
├──────────────────────────────────────────────────────────────────┤
│ 7 OUR PRACTICE  forest, documentary photo E1                      │
│   Dr. Syeda Tanzeel Saher, BAMS, MD · Bidar clinic, 9am–6pm       │
│   [ Ask on WhatsApp ]  [ Visit the practice ]                     │
├──────────────────────────────────────────────────────────────────┤
│ 8 REVIEWS: only verified-purchase reviews; omitted until they     │
│   exist (no fabricated testimonials)                              │
├──────────────────────────────────────────────────────────────────┤
│ 9 FOOTER forest: Shop · Help (shipping, returns, contact) ·       │
│   address & hours · licence no. · GSTIN · policies · Instagram    │
└──────────────────────────────────────────────────────────────────┘
```

Section 5's batch card shows real data from the inventory/manufacturing model. Before manufacturing is live, it shows the latest lot entered via opening stock, or the section shows only the process story.

## Desktop (≥1024)

- Header 80 → 64px and transparent → ivory after 80px of scroll. Shop opens a mega-panel on hover or focus.
- Hero headline, sentence and CTA all fit in 1280×800; headline lower-left (an Augustinus Bader-style placement), product right third.
- Section 4 pins for ~0.5 viewport per ingredient; reduced motion turns it into a static list.
- Content max 1440px; sections 1, 4 and 7 run full-bleed.

## Mobile (<768)

- Header: "Menu" · wordmark · "Bag (0)", as text labels.
- Hero uses the 4:5 H2 image, text over a forest scrim, full-width CTA. The scrim keeps text contrast ≥ 4.5:1.
- Section 3: horizontal scroll-snap row with the next card peeking, plus a "View all" link.
- Section 4: no pinning; stacked rows (1:1 image + name + line).
- Section 5: video poster only (loads on tap); batch card under it.
- WhatsApp button bottom-right, 56px, hidden while the menu or cart is open. The cookie bar is a single line, never a full-screen sheet.

## Light variant (until the campaign shoot)

Sections 1, 4 and 7 swap forest for beige. The hero becomes a 5/7 split: a real product on beige seamless, with the headline on ivory. No layout changes.

## Performance budget

LCP < 2.0s on 4G (hero AVIF ≤ 180 KB mobile / 350 KB desktop, `priority`); CLS < 0.05 (all media sized); GSAP ~45 KB gz, loaded only by sections 1 and 4; no third-party scripts on the homepage except a cookieless analytics tag.
