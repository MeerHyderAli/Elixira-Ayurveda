# Elixira Ayurveda

Website for Elixira Ayurveda — *Glow Naturally. Heal Deeply.* Ayurvedic face, hair and body care, homemade in small batches by Dr. Syeda Tanzeel Saher, BAMS, MD (Ayurveda), Bidar.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and GSAP.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Import this repository at https://vercel.com/new (framework preset: Next.js, no extra settings).
2. Add the environment variable `NEXT_PUBLIC_SITE_URL` with your live domain (e.g. `https://elixiraayurveda.com`); it is used for canonical URLs, Open Graph and structured data.
3. Deploy.

## Where things live

| What | Where |
|---|---|
| Brand facts, catalogue, film chapters, image slots | `src/content/site.ts` |
| Homepage sections | `src/components/sections/` |
| Design tokens | `src/app/globals.css` (documented in `DESIGN.md`) |
| Website images (WebP) | `public/images/` |
| Planning, compliance and image docs | `docs/` |

To change or add an image, put the file in `public/images/` and set `src` for its slot in `src/content/site.ts`.

The original generated PNGs (~100 MB) are kept locally in `assets/brand-input/product-images/` and are not committed.
