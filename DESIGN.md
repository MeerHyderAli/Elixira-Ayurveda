---
name: Elixira Ayurveda
description: A physician's small-batch apothecary staged as a night-time botanical still life.
colors:
  forest: "#263c30"
  forest-deep: "#1b2b22"
  ink: "#1c2620"
  ivory: "#faf8f2"
  beige: "#ede5d7"
  sage: "#89977b"
  sage-deep: "#5e6b52"
  gold: "#b08d57"
  gold-light: "#d4b483"
  gold-ink: "#7d5f2c"
  danger: "#9b3b2e"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3.25rem, 7.4vw, 6rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  chapter-herb:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3.5rem, 11vw, 7rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  chapter:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.75rem, 8vw, 5.5rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  numeral:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "3.5rem"
    fontWeight: 300
    lineHeight: 1
    fontFeature: "\"lnum\", \"tnum\""
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1.25
  title-sm:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.25
  botanical:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  body-lead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"kern\", \"liga\""
  small:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  control: "2px"
  full: "9999px"
spacing:
  gutter: "clamp(1rem, 4vw, 4rem)"
  grid-gap: "1.5rem"
  section-sm: "6rem"
  section-md: "8rem"
  section-lg: "10rem"
  container: "1440px"
  header: "72px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 28px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.forest-deep}"
  button-primary-on-dark:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 28px"
    height: "48px"
  button-primary-on-dark-hover:
    backgroundColor: "{colors.beige}"
  button-outline:
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.ivory}"
  dock-action:
    backgroundColor: "{colors.forest-deep}"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "48px"
  input-field:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "48px"
  collection-tab-selected:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.ivory}"
    typography: "{typography.title}"
  image-slot-placeholder:
    backgroundColor: "{colors.beige}"
    textColor: "{colors.sage-deep}"
    rounded: "{rounded.none}"
  film-still-placeholder:
    backgroundColor: "{colors.forest-deep}"
    textColor: "{colors.gold-light}"
    rounded: "{rounded.none}"
  film-still-placeholder-forest:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.gold-light}"
    rounded: "{rounded.none}"
---

# Design System: Elixira Ayurveda

## Overview

**Creative North Star: "The Night Apothecary"**

A physician's small-batch apothecary staged like a night-time botanical still life. Deep forest fields own whole sections and alternate with warm ivory and beige grounds; gold appears only as hairline rules, the logo's own metal and a handful of italic phrases. Display type is Cormorant Garamond at light weight, set at poster scale over full-screen stills; every working word is Manrope. Density is low: one idea per screen, generous vertical rhythm, editorial 12-column asymmetry instead of rows of equal cards.

The surface is flat and square. Images and fields are square-cut; only controls carry a 2px corner; the only circles are the gold orbit rings around the seal. There are no shadows and no decorative gradients, only photographic scrims where a still sits under text. Motion is slow and calm and, where it carries the story, scrubbed to the scroll: full-screen stills that pin, settle and develop one into the next. Everything is visible and reachable without JavaScript and without motion.

Photography is pending. Every photograph position is a labelled placeholder (a field in the section's own colour, an inset gold hairline frame, a leaf mark, the slot id) so nobody mistakes a placeholder for packaging; it swaps to the owner's photograph by setting its source, with no layout change.

**Key Characteristics:**
- Whole-screen colour fields: forest, forest-deep, ivory, beige; the film runs on one continuous forest surface.
- Gold is line and metal, never a fill behind text.
- Cormorant 300 display at poster scale with italic gold-light phrases; Manrope for everything that works.
- Square images, 1px gold hairlines, 2px controls, no shadows.
- One motion vocabulary (reveal, clip-open, drift, and the scrubbed film chapter), all gated on reduced-motion.

## Colors

A dark botanical green field with warm paper neutrals and a single antique-gold metal.

### Primary
- **Apothecary Forest** (forest): the brand field. Hero stage, film product screens, footer; primary button fill on light grounds; header text and borders once the header turns solid; default focus ring.
- **Night Forest** (forest-deep): the deeper field for the announcement bar, the film's intro and herb screens, the trust band, the mobile dock and dark placeholders; primary button hover.

### Secondary
- **Seal Gold** (gold): 1px hairline rules and dividers (at 25 to 50% alpha), inset placeholder frames, leaf marks. Never a text colour on ivory.
- **Lamplight Gold** (gold-light): gold on dark grounds: the hero's italic second line, the film's develop line, the active progress-rail tick and "becomes the ..." line, trust-band titles, placeholder captions, link underlines on dark, the focus ring inside `.on-dark` sections, text selection fill.
- **Ink Gold** (gold-ink): the only gold allowed for text on ivory or beige (ritual step numerals, the founder's qualification line, the solid-header wordmark).

### Neutral
- **Ivory Paper** (ivory): page ground and light section field; text on forest (at 75 to 90% alpha for running copy); the filled primary on dark.
- **Linen** (beige): alternate light section field (collections, ritual, newsletter) and light image-slot placeholders.
- **Ink** (ink): body text on light grounds, usually at 75 to 85% alpha.
- **Sage** (sage): scrollbar thumb only.
- **Deep Sage** (sage-deep): muted metadata on light grounds (sizes, "Ask on WhatsApp", form placeholder, field labels in definition lists).
- **Madder** (danger): form error text only.

### Named Rules
**The Gold Is Metal Rule.** Gold draws lines and marks; it never fills a surface or a button. On light grounds any gold text uses Ink Gold, never Seal Gold.

**The Whole Field Rule.** A colour owns a full-bleed section or a full screen; sections alternate fields rather than placing cards on a ground.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif), weights 300 to 600, roman and italic, via `next/font`.
**Body Font:** Manrope (with system-ui, sans-serif), via `next/font`.

**Character:** A light, high-contrast apothecary serif carries every heading at large size; a calm geometric sans does all working text, labels and numbers, except the ritual's display numerals.

### Hierarchy
- **Display** (300, clamp(3.25rem, 7.4vw, 6rem), 0.98, -0.015em, balanced wrap): the hero headline, once per page; second line italic in Lamplight Gold. The film's title ("From the herb to the bottle.") sits in the same band at clamp(3rem, 7vw, 6rem).
- **Headline** (300, clamp(2.5rem, 5vw, 4.5rem), 0.98): section titles through the `.display` class; philosophy and founder titles sit within the same band (4.25rem to 4.75rem max).
- **Chapter herb** (300, clamp(3.5rem, 11vw, 7rem), 0.98): the herb name on each film herb screen, the one place type exceeds 6rem, because it sits alone over a full-screen still. Decorative duplicate of the chapter heading, hidden from assistive tech.
- **Chapter** (300, clamp(2.75rem, 8vw, 5.5rem), 0.98, max 14ch): the product name on each film product screen; the chapter's real heading.
- **Numeral** (300, 3.5rem on phones, 4.5rem from `sm`, leading 1, lining and tabular figures, Ink Gold): ritual step numbers. The only display-face numerals; all other numbers are Manrope.
- **Title** (400, 2rem / 1.75rem, tight): ritual step names, collection tabs on desktop (2rem; 1.25rem chips on phones), collection panel heading, trust titles (1.75rem, Lamplight Gold); mobile drawer links (2.5rem, 300).
- **Botanical** (400 italic, 1.25rem, ivory at 85%): Latin binomials under the herb name. Botanical Latin is always Cormorant italic, never Manrope.
- **Body lead** (400, 1.0625rem, relaxed): hero sentence, film notes, philosophy, founder and ritual copy, collection product names (500); held to a 62ch measure (30 to 34rem in the film) with pretty wrap.
- **Body** (400, 1rem, 1.6): default running text, set on `body`; it replaced the earlier 0.9375rem. Film metadata (collection and sizes) and secondary links use it.
- **Small** (400 to 500, 0.875rem): metadata, captions, form help, footer column headings, the "becomes the ..." line. Placeholder slot ids and the progress-rail label drop to 0.75rem.
- **Label** (600, 0.8125rem, +0.08em, uppercase): buttons, dock actions and primary navigation only.

### Named Rules
**The Light Display Rule.** Headings are Cormorant at 300 with no bolding; emphasis comes from italic or Lamplight Gold, not weight. Italic covers a whole phrase, never one word.

**The Label Is For Controls Rule.** Uppercase tracked Manrope is reserved for buttons, dock actions and navigation. Section headings are never preceded by an uppercase label line.

**The Tabular Rule.** Counts, sizes, hours, phone numbers and the chapter count use tabular numerals; ritual numerals add lining figures.

## Layout

A 1440px container with fluid gutters (clamp(1rem, 4vw, 4rem)) and a 12-column grid from `lg` (1.5rem gap), a single column below. Phone-first: 390px is the primary frame. Editorial sections use asymmetric splits (7/5, 6/4 offset to column 9, 4 and 8 offset to column 5, 6 and 6 offset to column 7), often with the narrower column dropped by a vertical offset (about 7rem on philosophy). Section padding is 6rem on phones, 8rem from `md`, 10rem for the two quiet editorial sections (philosophy, founder); the trust band runs 5rem / 6rem. The header is 72px; anchors scroll with 16px clearance below it.

**The film.** The hero fills the first screen (100svh less the header and announcement bar) with copy in the lower third and the seal above it on phones, at the right (columns 8 to 12) on desktop. The film opens with a forest-deep title screen (70svh, 80svh from `lg`) and then five chapters. Each chapter is a herb screen and a product screen of at least 100svh each; with motion allowed, each chapter is 260svh tall with a sticky 100svh stage, and the two screens stack inside it. Copy sits bottom-left (7rem bottom padding on phones to clear the dock, 5rem from `lg`). From `lg`, a chapter whose still exists only as a portrait file splits: the still occupies the right 55% and the copy is held to the left 42%; a supplied 16:9 desktop still goes full-bleed instead.

Responsive behaviour: desktop navigation appears from 1280px (`xl`); below it the Menu drawer and the fixed bottom dock take over. The collection tab list is a horizontal snap-scroller of chips on phones and a vertical ruled list from `lg`, ordered face, hair, body. Running text holds a 62ch measure.

## Elevation & Depth

Flat. There are no drop shadows anywhere; depth comes from full-bleed colour fields stacked against each other, from one full-screen still developing up over another, from the seal floating inside its orbit rings, and (later) from photography. The one `box-shadow` in the build is a 1px gold hairline under the solid header (`0 1px 0 rgb(176 141 87 / 0.35)`), which is a rule, not elevation. The solid header (ivory at 95%) and the mobile dock (forest-deep at 95%, gold hairline above) carry a small backdrop blur.

### Named Rules
**The No Lift Rule.** Nothing casts a shadow or lifts on hover. Hover changes colour, underline weight, a 4px arrow nudge, or a slow 4% image zoom inside a clipped frame.

**The Scrim Only Rule.** The only gradients permitted are photographic scrims in the field's own colour, keeping text at 4.5:1 over a still: from below on phones (solid, 75% at 45%, clear at the top of the lower three quarters), and on desktop from the copy side (the hero from the left; split chapters a soft 22%-wide edge where the still meets the copy).

## Shapes

Square by default: images, stills, placeholders and section fields have no radius. Buttons, dock actions, the header order button and the email field take a 2px corner. Full circles appear only as the hero's gold orbit rings around the round seal. Lines are 1px gold hairlines: list dividers, tab rules, footer and drawer separators, the trust band's column rules, the dock's top edge, the film's develop line and progress ticks, and an inset frame inside every placeholder (12px in image slots, 16px in film stills).

## Components

### Buttons
Quiet, rectangular, tracked uppercase.
- **Shape:** near-square (2px), minimum height 48px (44px in the header).
- **Primary:** forest fill, ivory label, 28px side padding; hover deepens to forest-deep over 200ms.
- **Primary on dark:** ivory fill, forest label; hover to linen. The hero's "Shop the collection" (with a trailing arrow that nudges 4px right on hover) and each film chapter's "Order on WhatsApp" (24px padding, WhatsApp mark leading).
- **Outline:** 1px border in the current text colour (forest, or ivory at 60% on dark), fills on hover with the text colour inverting. The header's WhatsApp order button.
- **Text link:** `.link-line` underline at 1px with a 5px offset, thickening to 2px on hover; decoration in gold-light on dark and gold on light. Used for secondary actions beside a primary button ("All Face Serums" with an arrow in the film).
- **Focus:** 2px forest outline offset 3px; gold-light inside dark sections.

### Inputs / Fields
- **Style:** ivory fill, 1px forest border at 30%, 2px corner, 48px tall, sage-deep placeholder, label above in small medium forest.
- **Focus:** border goes solid forest plus a 2px forest outline offset 2px.
- **Error:** message below in Madder with `role="alert"`, field marked `aria-invalid`.

### Navigation
- **Header:** three-column grid (nav or Menu, centred wordmark, order button). Over the hero it sits on forest with ivory labels; after 80px of scroll it turns ivory at 95% with forest labels and a gold hairline. Past 400px it slides away while scrolling down (so the film owns the screen) and returns on any upward scroll or when focus enters it. Desktop links appear from 1280px (`xl`), Label style, underlined on hover with an 8px offset.
- **Wordmark (interim):** a typeset stand-in until the owner's vector wordmark exists: "ELIXIRA" in Cormorant 600 at 1.65rem (1.85rem from `sm`), +0.14em, Lamplight Gold on dark and Ink Gold on light, over "AYURVEDA" in Manrope 700 at 0.5625rem, +0.42em. These three sizes are detector-ignored as the stand-in only; they are not ramp steps and not a pattern for other type.
- **Mobile drawer:** a "Menu" text-and-icon button opens a full-height ivory panel below the header with Cormorant 2.5rem links, address and hours, and a full-width primary WhatsApp button; it traps focus and closes on Escape.
- **Mobile dock:** below 1280px a fixed bottom bar (forest-deep at 95%, gold hairline top, safe-area padding) holds two equal 48px actions, Shop and WhatsApp. Both are always ivory outlines: the dock is a utility, so the one filled primary in view always belongs to the section on screen (the hero's "Shop the collection", a chapter's "Order on WhatsApp").
- **Announcement bar:** forest-deep strip above the header, 0.8125rem ivory text with one `.link-line` action.

### Film Chapter (signature)
The homepage's herb-to-bottle scene, five times. A herb screen (forest-deep: chapter-herb name, botanical Latin, a body-lead note, then a 40px gold-light rule and "becomes the {product}") over a product screen (forest: chapter product heading, collection and sizes in tabular body, an optional verified fact, then Order on WhatsApp and the collection link). With motion allowed, the stage pins and scrubs (0.6s smoothing): the herb still settles from 112% to 100%, the herb copy lifts 40px and fades, the product screen develops upward out of the herb by a bottom-to-top clip with a 1px gold-light line riding its edge, the product still settles from 116%, and the product copy rises in. A progress rail at the top right ("Face · 1/5" in 0.75rem tabular ivory, five 20px vertical ticks, the current one gold-light) names the area and position. Without motion the two screens simply stack.

### Film Still (signature)
A full-bleed still that fills its positioned parent, phone-first: the portrait file serves all widths unless a 16:9 desktop file is art-directed in from 1024px; cover-cropped at 50% 35%. Until a file exists it is a labelled placeholder: forest-deep (herb) or forest (product) field, a gold hairline frame inset 16px at 25%, a leaf mark, the slot label in Cormorant italic gold-light and "Image {id}, photograph to come". Captions sit high (16%) on herb screens and low (44%) on product screens so the rising develop edge uncovers them first. Exposed as `role="img"` with an honest label.

### Image Slot
Every editorial photograph position (philosophy, collections, ritual, founder, Instagram). With a source it is a square-cut cover image, optionally drifting with parallax. Without one it is a linen field with sage-deep text, an inset gold hairline frame, a leaf mark, the label in Cormorant italic and the slot id; compact slots show only the mark and id.

### Collection Tabs
A WAI-ARIA tablist. Desktop: a vertical list of Cormorant 2rem names with product counts, each on a gold hairline; the selected tab is full forest, others forest at 75%. Phones: bordered chips on a snap-scroller, the selected one filled forest. The panel pairs an image slot with a ruled list of products, each row a WhatsApp link with sage-deep "Ask on WhatsApp" and an arrow that darken and nudge on hover.

### Motion
`[data-reveal]` blocks rise 24px and fade in once on entry (0.9s, expo out, 0.08s stagger); `[data-reveal-image]` opens from an 8% inset clip (1.3s); `[data-parallax]` drifts while scrolling. The hero headline lines slide up from their own clip (1.4s), the orbit rings and seal scale in, and the seal drifts up 8% as the hero leaves. The film chapter is the one scrubbed sequence (see above). UI transitions use `cubic-bezier(0.22, 1, 0.36, 1)` at 160ms (micro) to 300ms (header slide, dock swap). All of it runs only under `prefers-reduced-motion: no-preference`; content is visible in server HTML.

## Do's and Don'ts

### Do:
- **Do** give each section or screen a whole colour field (forest, forest-deep, ivory or beige) and alternate them.
- **Do** keep gold to 1px hairlines at 25 to 50% alpha, the logo, the develop line and rail tick, and italic gold-light phrases on dark; use Ink Gold (#7d5f2c) for any gold text on light grounds.
- **Do** set headings in Cormorant Garamond 300 with balanced wrap; cap headings at 6rem, with the film's herb names (up to 7rem, alone over a still) the only exception.
- **Do** set botanical Latin in Cormorant italic and ritual numerals as Cormorant lining numerals in Ink Gold.
- **Do** keep images and surfaces square and controls at 2px.
- **Do** put every pending photograph behind a labelled Film Still or Image Slot placeholder rather than a stock or generated stand-in.
- **Do** keep Shop and WhatsApp under the thumb below 1280px, with only one filled primary in view.
- **Do** gate every animation on `prefers-reduced-motion: no-preference` and keep content visible and stacked without it.

### Don't:
- **Don't** add drop shadows, lifted hover states or gradients other than a photographic scrim.
- **Don't** fill buttons or surfaces with gold, or set Seal Gold text on ivory or beige.
- **Don't** put an uppercase label line above section headings; uppercase tracked type is for buttons, dock actions and navigation only.
- **Don't** round images or cards, or use pill shapes outside the hero's orbit rings.
- **Don't** use promo carousels, countdown banners or rows of identical cards.
- **Don't** treat the interim wordmark's sizes (1.65rem, 1.85rem, 0.5625rem) or its 600 weight as type-ramp steps.
