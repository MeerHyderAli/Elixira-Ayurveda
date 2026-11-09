# Design System (v2): Cinematic Botanical Luxury

Direction: concept A from HOMEPAGE_CONCEPTS.md. Primary design skill: **`impeccable`** (storefront in "Persuade" mode, admin in "Operate" mode). `ui-ux-pro-max` is used only as an accessibility/UX checklist. Hallmark, Taste and Bencium are not used for direction, to avoid conflicting rules (see SKILL_INVENTORY §3). Tokens live as CSS variables in `globals.css` and are mapped into the Tailwind theme. Components never contain literal colours.

## 1. Colour tokens

| Token | Hex | Role | Contrast (computed) |
|---|---|---|---|
| `--forest` | `#263C30` | dark surfaces, primary buttons, headings on light | 11.2:1 vs ivory |
| `--ink` | `#1C2620` | body text on light | 14.7:1 vs ivory |
| `--ivory` | `#FAF8F2` | page background; text on forest | 11.2:1 vs forest |
| `--beige` | `#EDE5D7` | alternate sections, inputs, product image ground | forest on beige 9.5:1 |
| `--sage` | `#89977B` | **decorative only** (rules, illustration tints) | 2.9:1 vs ivory: never for text |
| `--sage-deep` | `#5E6B52` | secondary text on light | 5.3:1 ivory, 4.5:1 beige |
| `--gold` | `#B08D57` | hairlines, focus ring on dark, numerals ≥24px on forest | 3.8:1 on forest (large text only) |
| `--gold-light` | `#D4B483` | small gold text on forest | 6.0:1 |
| `--danger` | `#9B3B2E` | errors | to verify at build |
| `--success` | `#3E6B4A` | confirmations | to verify at build |

Semantic aliases: `--surface`, `--surface-alt`, `--surface-inverse`, `--text`, `--text-muted`, `--text-inverse`, `--border`, `--focus`, `--accent`. The **light variant** (used until the dark campaign photography exists) only remaps `--surface-inverse` sections to beige. Components stay the same.

Gold comes from the real logo. The hibiscus red on the labels is never used as a UI colour: it belongs to the packaging.

## 2. Typography

| Role | Family | Size | Weight / leading / tracking |
|---|---|---|---|
| Display XL | Cormorant Garamond | `clamp(3rem, 7vw, 7.5rem)` | 300 / 0.95 / −0.02em |
| Display L | Cormorant Garamond | `clamp(2.25rem, 4.5vw, 4.5rem)` | 300–400 / 1.0 |
| Heading M | Cormorant Garamond | `clamp(1.5rem, 2vw, 2rem)` | 500 / 1.15 |
| Body L | Manrope | 1.125rem | 400 / 1.6 |
| Body | Manrope | 1rem | 400 / 1.6, measure 60–70ch |
| Small | Manrope | 0.875rem | 500 / 1.5 |
| Label (nav, buttons) | Manrope | 0.8125rem | 600, uppercase, +0.08em: a deliberate brand choice, used only here |
| Numerals (price, batch codes) | Manrope | inherits | `font-variant-numeric: tabular-nums` |

Two families only; Cormorant at 300, 400, 500 and italic 400. Self-hosted through `next/font`. Italic is used for whole phrases, never a single word. Live research showed luxury doesn't need oversized type everywhere, so Display XL appears **once per page** (the hero).

## 3. Spacing, grid, breakpoints

- Spacing scale (rem): 0.25 · 0.5 · 0.75 · 1 · 1.5 · 2 · 3 · 4 · 6 · 8 · 12. Section rhythm: 6rem mobile, 8–12rem desktop.
- Breakpoints (Tailwind defaults): `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
- Grid: 4 columns under `md`, 8 at `md`, 12 from `lg`. Container max 1440px, gutters `clamp(1rem, 4vw, 4rem)`. At 1920+ only the gutters grow.
- Editorial asymmetry: 7/5 and 5/7 splits with a 4–8rem vertical offset on the narrower column (from `lg`).
- Radius: 0 for images and surfaces, 2px for buttons and inputs, full for filter chips only. No shadows; depth comes from photography and layering.
- Image tracks use `minmax(0,1fr)`; `overflow-x: clip` on `html, body`.

## 4. Components

**Buttons**

| Variant | Light surface | Dark surface | Size |
|---|---|---|---|
| Primary | forest bg, ivory label | ivory bg, forest label | 48px tall (44px min), 24px side padding |
| Secondary | 1px forest border, forest label | 1px ivory border | same |
| Text link | ink, underline offset 4px, underline thickens on hover | ivory | — |

States: hover (bg shifts 6% lighter or darker, 160ms), focus-visible (2px ring, `--focus`, offset 3px, instant), disabled (40% opacity, `aria-disabled`), loading (spinner replaces label, width locked, `aria-busy`).

**Navigation**
- Desktop: logo-mark + wordmark left; **three primary items**: Shop · Rituals · Our Practice (live research: short nav for a short catalogue); right side: Search, Account, "Bag (2)" as **text labels**. The header is transparent over the hero, then turns solid ivory after 80px; height goes from 80 to 64px. The Shop mega-panel has categories, plus a feature tile with a real product image.
- Mobile: "Menu" left, centred wordmark, "Bag (2)" right; a full-height sheet with large Cormorant links; search sits at the top of the sheet.
- One slim announcement bar is allowed (e.g. shipping info). No countdown timers and no stacked pop-ups.

**Product card**
- Image 4:5 on a beige ground; second image fades in on hover (desktop only).
- Below: product name (Cormorant 1.375rem), one **approved** benefit line (from `ProductClaim`, Manrope small, muted), size count ("2 sizes"), price "from ₹—" with tabular numerals. If MRP > price, MRP is shown struck through with an accessible label.
- No star ratings until real reviews exist. No quick-add on multi-size products (size choice belongs on the PDP).
- States: out of stock (image at 70% opacity + "Sold out" text), low stock ("Few left", never an exact count).

**Forms**
- Label above the field, helper text below, error text below in `--danger` with an icon and `aria-describedby`; the error summary at the top of checkout links to fields.
- Inputs 48px tall, beige fill, 1px border that turns forest on focus.
- Indian address: PIN code first → autofill city and state; phone with the +91 prefix shown.
- React Hook Form + the Zod schema shared with the server.

**Other:** cart drawer (right sheet, focus trap), variant selector (size buttons, radiogroup semantics), quantity stepper, accordion (ingredients / how to use / batch & expiry / cautions), breadcrumb, toast (polite live region), WhatsApp button (bottom-right, labelled "Chat on WhatsApp", hidden while a drawer is open), cookie bar (slim, one line, "Accept" / "Reject non-essential" given equal weight).

**Admin:** shadcn/ui defaults with brand tokens, dense tables, keyboard-first POS screen (scan or search SKU → qty → payment).

## 5. Motion rules

Library: **GSAP + ScrollTrigger** for the hero and the ingredient chapter; CSS for everything else.

| Token | Value |
|---|---|
| ease-out | `cubic-bezier(0.22, 1, 0.36, 1)` |
| ease-in-out | `cubic-bezier(0.65, 0, 0.35, 1)` |
| micro | 160ms · ui 280ms · reveal 900ms · hero 1600ms |

Rules: animate only `transform`, `opacity`, `clip-path`; never `transition: all`. Motion responds to scroll or user action, never loops for attention. Video is always muted, `playsinline`, has a visible pause control, and never replaces the LCP image. `prefers-reduced-motion: reduce` disables pinning, scrub and parallax and replaces reveals with no animation. All content is visible without JavaScript.

## 6. Accessibility (WCAG 2.2 AA)

Contrast per §1 · visible focus everywhere · 44×44px targets (24px minimum per 2.5.8 with spacing) · skip link · one `h1` per page · landmarks · alt text "Elixira {product} {size}, {view}" · colour never the only signal · keyboard-complete cart and checkout · form errors announced · no time limits except the payment window, which is announced · zoom to 200% without loss · accessibility audit (`ecc:accessibility` + chrome-devtools Lighthouse) in each phase's exit criteria.
