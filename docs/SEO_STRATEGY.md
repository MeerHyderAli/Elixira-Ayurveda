# SEO and Performance Strategy

## URLs (lowercase, hyphenated, stable)

| Page | URL |
|---|---|
| Home | `/` |
| Shop | `/shop` |
| Category | `/shop/hair-oils` (one level; subcategory `/shop/hair-care/hair-oils` only if needed) |
| Product | `/products/premium-hair-oil` (variant via `?size=200ml`, **canonical = product URL**) |
| Ingredient (v1.1) | `/ingredients/bhringraj` |
| Content | `/our-practice`, `/journal/[slug]` |

Filter and sort parameters: `noindex,follow` via metadata, and the canonical points to the unfiltered category.

## Metadata (Next.js `generateMetadata`)

- Title: `{Product} – {size range} | Elixira Ayurveda` (≤60 chars); home: `Elixira Ayurveda – Physician-made Ayurvedic Hair Care`.
- Description: 140–155 chars, factual, no cure claims.
- `alternates.canonical` on every page; `metadataBase` set to the production domain.
- Open Graph + Twitter: `og:type=product` on PDPs, a 1200×630 image (S1 default, or a per-product composite).

## Structured data (JSON-LD, server-rendered)

| Page | Types |
|---|---|
| Sitewide | `Organization` (name, logo, sameAs: Instagram, contactPoint phone), `WebSite` with `SearchAction` |
| Home / Our Practice | `HealthAndBeautyBusiness` (LocalBusiness subtype) for the Bidar location: address, openingHours 09:00–18:00, telephone. Confirm the days first. |
| PDP | `Product` with `brand`, `sku`, `image[]`, `description`, `offers` as `AggregateOffer` (lowPrice/highPrice in INR) or one `Offer` per variant with `availability` and `priceCurrency: INR`; `aggregateRating`/`review` **only when real reviews exist** |
| Category | `CollectionPage` + `ItemList` |
| All | `BreadcrumbList` |

## Crawl control

- `app/sitemap.ts`: home, categories, active products (lastModified = product updatedAt), content pages. Split into sitemap indexes past 5,000 URLs.
- `app/robots.ts`: allow all; disallow `/admin`, `/account`, `/cart`, `/checkout`, `/api`; reference the sitemap. Preview deployments send `X-Robots-Tag: noindex`.

## Semantic HTML and accessibility

One `h1` per page; landmark elements (`header`, `nav`, `main`, `footer`); product grids as `ul/li`; price in text, not images; breadcrumbs in `nav[aria-label=Breadcrumb]`; alt text pattern "Elixira Premium Hair Oil 200 ml bottle, front".

## Images

`next/image` with a Cloudinary loader, `f_auto,q_auto`, explicit width/height, `sizes` set per layout, `priority` only on the LCP image, AVIF first. Decorative textures as CSS backgrounds, lazy-loaded.

## Core Web Vitals targets (p75 mobile)

LCP < 2.5s (target 2.0) · INP < 200ms · CLS < 0.1 (target 0.05). Tactics: RSC by default, client components only for interactive islands, GSAP loaded dynamically only where used, `next/font` with `display: swap` and size-adjusted fallbacks, no third-party scripts before interaction (Razorpay script loads only on checkout). Measure with chrome-devtools MCP Lighthouse in CI on preview URLs, then CrUX once there's traffic.

## Local SEO

Google Business Profile for the Bidar clinic (owner action), NAP identical across site and GBP, the `LocalBusiness` schema above.

## Content and claims policy

No disease, cure or guaranteed-result language ("cures dandruff", "stops hair fall", "regrows hair"). Use cosmetic wording ("nourishes", "for healthy-looking hair", "traditionally used in Ayurveda for…"). No "chemical free". No fabricated reviews, ratings or certifications. Every product claim must be approved by the owner and checked against AYUSH / Drugs & Cosmetics rules and ASCI guidelines before publishing.
