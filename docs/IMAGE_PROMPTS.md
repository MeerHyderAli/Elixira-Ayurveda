# Image Generation Prompts (mobile-first)

How to use: generate each image, save it to `public/images/` (WebP or high-quality JPG), then set `src` for its slot in `src/content/site.ts` → `imageSlots` (add `srcDesktop` for an optional 16:9 version of full-bleed stills). The page swaps the placeholder automatically.

**Rules for every prompt**
- **Packaging:** any prompt that shows a product must be generated *with your real label artwork or product photo as the reference image*. Never let the model invent a label, logo or text. If the model alters the label, composite the real product cut-out instead.
- **Palette:** deep forest green #263C30 shadows, warm ivory #FAF8F2 highlights, muted gold #B08D57 accents.
- **People and text:** no people unless stated, and no text or watermarks in the image.
- **Phone layout:** stills are portrait 9:16 (1080×1920 minimum). Keep the **bottom 40% calm and dark**, because the headline sits there. Keep the subject in the **upper-middle** of the frame.
- **Desktop:** the portrait file is enough. On desktop, chapter stills sit in the right 55% of the screen (cropped around the upper-middle) with the copy on forest at the left. If you also make a 16:9 version, set it as `srcDesktop` and that chapter goes full-bleed. For the hero (H1), a 16:9 version is recommended, with the product at the right third and the left 60% dark and calm for the headline.

Shared style tail (append to every prompt):
> cinematic still life, low-key chiaroscuro, single soft key light from upper left, deep forest-green shadows, warm ivory highlights, muted antique-gold accents, shallow depth of field, fine film grain, editorial luxury skincare campaign, no text, no logos, no people

| Slot | Use | Ratio | Prompt (add the style tail) |
|---|---|---|---|
| **H1** | Hero, full-bleed | 9:16 (+16:9 for desktop) | Elixira products from your references: one serum bottle, one hair-oil bottle and one soap bar arranged on wet dark slate, with scattered jasmine flowers, green leaves and a small brass mortar. Products in the upper half, dark empty slate below. **Use the real products as reference.** |
| **K1** | Chapter 1 herb (saffron) | 9:16 | Macro of deep-red saffron threads spilling from a small brass bowl onto dark slate; a few threads float in a drop of golden oil; the upper half is lit and the lower half falls to darkness |
| **P1** | Chapter 1 product | 9:16 | The Kumkumadi Face Serum bottle **(real product reference)** standing on dark slate, a few saffron threads at its base, a single drop of golden serum on the slate; product in upper-middle |
| **K2** | Chapter 2 herb (bhringraj) | 9:16 | Fresh bhringraj (Eclipta prostrata) sprigs with small white flowers beside a stone bowl of fine green herbal powder, a spoon of curd at the edge, dark linen ground |
| **P2** | Chapter 2 product | 9:16 | The Herbal Hair Pack kraft pouch **(real product reference)** leaning on a brass bowl of green powder paste, bhringraj leaves around, dark ground |
| **K3** | Chapter 3 herb (sandalwood) | 9:16 | Pale sandalwood sticks and a sandalwood stone grinding slab with a smear of sandalwood paste, soft smoke wisp, dark warm wood ground |
| **P3** | Chapter 3 product | 9:16 | The Sandalwood Gel jar **(real product reference)**, lid off, a swirl of gel visible, sandalwood sticks beside it on dark stone |
| **K4** | Chapter 4 herb (black seed) | 9:16 | Black nigella seeds poured into a small mound on dark slate, a few nigella seed pods, a slow trickle of amber oil catching the light |
| **P4** | Chapter 4 product | 9:16 | The Black Seed Hair Oil bottle **(real product reference)**, gold cap, beside a small mound of black seeds and a drop of oil on slate |
| **K5** | Chapter 5 herb (neem & tulsi) | 9:16 | Fresh neem leaves and holy basil (tulsi) sprigs crossed on wet dark stone, water droplets on leaves |
| **P5** | Chapter 5 product | 9:16 | The Neem & Tulsi Soap bar **(real product reference)** on wet stone, a neem twig and tulsi leaves beside it, light water beads |
| **E2** | Philosophy, small-batch process | 3:4 | Hands (no face) stirring herbs into oil in a brass vessel over a low flame, steam, warm side light |
| **E1** | Founder | 4:5 | **Use a real photo of Dr. Tanzeel (with consent), not a generated person.** Suggested shot: hands blending herbs at her clinic table |
| **C1** | Hair Oils collection | 4:5 | Your hair-oil bottles **(real references)** in a row on dark linen with curry leaves and neem |
| **C2** | Hair Care collection | 4:5 | Herbal Hair Pack pouch and shampoo bottle **(real references)** with reetha and shikakai pods |
| **C3** | Face Serums collection | 4:5 | Your serum bottles **(real references)** on dark slate with saffron threads and jasmine |
| **C4** | Face Packs collection | 4:5 | Face-pack jars **(real references)** with small brass bowls of powder: saffron, coffee, cinnamon |
| **C5** | Gels collection | 4:5 | Gel jars **(real references)** with rose petals, sandalwood sticks and papaya slice |
| **C6** | Soaps collection | 4:5 | Your soap bars **(real references)** stacked on wet stone with orange peel, neem and tulsi |
| **C7** | Lips & Body collection | 4:5 | Lip balm tins and scrub jars **(real references)** with beetroot slice and rose petals |
| **G1–G6** | Instagram tiles | 1:1 | Use your own Instagram post images (no generation needed) |

Total: 21 to generate (or 26 with the five collection extras), plus your Instagram images and a real founder photo.
