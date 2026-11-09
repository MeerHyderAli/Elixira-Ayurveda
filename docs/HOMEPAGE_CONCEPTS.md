# Homepage Concepts

## 1. Live design research (built-in browser, 2026-11-08)

Method: each homepage was loaded at 1440×900 (Byredo also at 375×812). I read the computed fonts, heading sizes, nav and video count with a script, and took screenshots. Cookie and geo pop-ups were declined or left in place, never accepted. These are observations to learn from, not layouts to copy.

| Site (URL) | Hero | Navigation | Typography (computed) | Product presentation | Motion / media | Take-away for Elixira |
|---|---|---|---|---|---|---|
| **Aesop** https://www.aesop.com/ (the `/in/` path returns 404: no India store) | Full-bleed video carousel; centred serif headline, one line of copy, outlined button; play/pause control visible | Two tiers: utility row (Stores, Customer service / Account, Cart) above a centred wordmark and category row incl. editorial "Library" and "Experience" | Zapf Humanist serif for headings at only **30–36px / weight 400**; Suisse Int'l sans; page background **#FFFEF2** (warm ivory) | Gift kits given evocative names ("Unhurried Mornings", "Caring Gestures") | Video, user-pausable | Luxury doesn't need giant type: a quiet serif at modest size on warm ivory reads expensive. Name rituals and sets, not just SKUs. Always give video a pause control. |
| **Forest Essentials** https://www.forestessentialsindia.com/ | Promotional festive banner, then a red band with a **countdown timer** | Dense mega-menu by product type **and by concern** ("Anti-acne", "Anti Ageing") | **~10 font families** loaded (Calluna, Aboreto, Gotu, Montserrat, Gotham, Open Sans, Inter…) | "Most loved rituals", "Shop by concern", "Trusted tales" testimonials | Chat widget | The Indian luxury-Ayurveda benchmark is promotion-led and typographically noisy. Elixira can stand apart through restraint. Concern-based nav is useful, but its wording must pass the claims rules. |
| **Kama Ayurveda** https://www.kamaayurveda.com/in | Carousel with the promotional text **baked into the image** | Thin category row using bullets; **ingredient franchises** in nav ("Kumkumadi Essentials", "Bringadi Collection") | Bell MT serif headings ~26–29px; Barlow body | Hero-product franchises | Sections appeared **blank while lazy-loading** after a fast scroll | Build a franchise around one hero formula (e.g. Black Seed). Never put text inside images (bad for accessibility, SEO and localisation). Reserve space for lazy content. |
| **Tata Harper** https://www.tataharperskincare.com/ | **Macro video of embossed packaging**, inset with page margins rather than full-bleed | Shop / Skincare Rituals / About Tata (founder) | ivyora-display serif 34–40px + Neue Haas Grotesk | Cards: name, one-line benefit, price (with strike-through), star rating, quick-add icon | 9 videos on the homepage | A founder-led natural brand: the founder story and quote get a homepage section, and packaging close-ups work as hero material. Their "Look 5 Years Younger" headline is exactly the kind of claim Elixira must avoid. |
| **Augustinus Bader** https://augustinusbader.com/ | Dark full-bleed video, headline **lower-left** | Three items only: Shop / Science / Explore | One sans family (Maison Neue); product names in small caps-style uppercase 12px | Science-led copy (trademarked complex) | Cookie banner + promo modal **stacked on first load** | A three-item nav is enough for a small catalogue. A dark cinematic hero with lower-left text works. Never stack pop-ups on arrival. |
| **Byredo** (mobile 375px) https://www.byredo.com/ | Oversized wordmark across a full-bleed video, collapsing into a compact sticky header on scroll | Text labels "MENU" and "CART (0)" instead of icons | Custom sans | — | Video with mute + pause | The wordmark as hero device suits mobile. Text labels are clearer than icons. The cookie banner covered ~70% of the phone screen: design ours as a slim bar. |

**Shared principles extracted:** (1) one idea per viewport; (2) warm off-white grounds, not pure white; (3) a short nav for a short catalogue; (4) founder and process stories carry trust; (5) video must be pausable and secondary to LCP; (6) pop-ups and promo clutter are what make luxury sites feel cheap.

## 2. Brand truths every concept must keep

- **Logo:** circular badge with a woman's profile and leaves; serif "ELIXIRA / AYURVEDA"; cream, olive green, muted gold. It stays as is. The site needs a horizontal wordmark lock-up derived from it, approved by the owner.
- **Packaging:** white labels with hibiscus and herb illustrations, amber and clear PET bottles with gold or black caps, kraft pouches. Products are always shown as they really are.
- **Provenance:** Dr. Tanzeel Saher (BAMS, MD), small batches, Bidar.

## 3. The three concepts

### A. Cinematic Botanical Luxury

| | |
|---|---|
| Hero | Full-bleed, 100svh, dark forest still life: the real bottle on wet slate with bhringraj and hibiscus, hard side light. Headline lower-left in large light serif. Product at the right third. |
| Colour | 45% forest/ink (dark sections alternate with ivory), ivory text on dark; gold hairlines; sage only in imagery |
| Typography | Cormorant Garamond 300 at display sizes (up to ~120px); Manrope body |
| Images | Low-key, chiaroscuro, wet surfaces, macro herbs; white labels glow against dark grounds |
| Sections | Hero → signature product (7/5 split) → collection → pinned ingredient scroll (dark) → small-batch video + live batch card → ritual steps → founder → footer |
| Motion | Slow scale-settle on the hero, clip-path image reveals, pinned ingredient scrub; GSAP |
| Mobile | 4:5 hero recomposed, text over a forest scrim; no pinning, stacked ingredient rows |
| Risk | **Depends most on photography.** On phone photos it looks worse than a simple site. |

### B. Modern Editorial Ayurveda

| | |
|---|---|
| Hero | Magazine cover: ivory ground, a large headline set across two columns, with a portrait-format image (founder's hands preparing herbs) on the right and a short standfirst |
| Colour | 75% ivory/beige, forest for type, gold for numerals and rules |
| Typography | Cormorant Garamond with italic headlines, small numerals as section markers (01, 02…), drop caps in long-form, Manrope body; text-heavy |
| Images | Documentary: process, hands, herbs, the Bidar practice, natural light |
| Sections | Cover → "Issue" contents index → feature story (how the oil is made) → products as "featured in this story" → ingredient glossary (A–Z) → journal entries → consultation |
| Motion | Minimal: text fades, image parallax ≤5%; mostly CSS |
| Mobile | Reads like a long article; sticky "Shop" pill |
| Risk | Needs continual written content; commerce is a step further away; can feel like a blog |

### C. Contemporary Minimal Luxury

| | |
|---|---|
| Hero | Split screen: left a beige field with a short headline and CTA; right a centred product photographed on a seamless ivory background |
| Colour | 85% ivory/beige, forest for text and buttons only, gold almost absent |
| Typography | Manrope does more of the work; Cormorant only for product names and the hero line, at moderate size |
| Images | Clean studio packshots, soft shadow, generous margins |
| Sections | Hero → product grid → one benefit band → founder line → footer |
| Motion | Hover image swap, simple fades |
| Mobile | Very clean, fast, conventional |
| Risk | The most generic of the three (close to the "Shopify look" the brief rejects); it loses the botanical richness of the label art |

## 4. Recommendation: **A, Cinematic Botanical Luxury**, with two borrowings from B

Why A:
- It's the only concept that matches the brief's "dark forest compositions" and "cinematic" direction.
- White labels with hibiscus art contrast strongly against forest green: the real packaging becomes the light source of each composition instead of something to hide.
- The live research shows Indian Ayurveda competitors are promo-led and visually busy, so a dark, calm, cinematic site is clearly differentiated.

Borrowed from B: (1) the **founder/process documentary section** (proof that is unique to Elixira); (2) **numbered ritual steps** in editorial style.

**Condition:** A only works with a proper product shoot (see IMAGE_ASSET_PLAN). If the shoot can't happen before launch, ship the same layout in its **light variant** (ivory-dominant sections, products on beige seamless) and switch the hero to the dark campaign image once it exists. The layout and components stay the same; only tokens and imagery change.
