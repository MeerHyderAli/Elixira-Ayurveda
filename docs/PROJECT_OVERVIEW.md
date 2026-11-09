# Project Overview: Elixira Ayurveda

**Brand:** Elixira Ayurveda · *Glow Naturally. Heal Deeply.*
**Founder / formulator:** Dr. Syeda Tanzeel Saher, BAMS, MD (Ayurveda), Bidar, Karnataka.
**Today:** Hair-care products (oils, shampoo, herbal pack) made in small batches and sold through Instagram DMs, phone/WhatsApp and the clinic. Swarna Prashana and consultations are offered as services.

## Goal

A premium D2C e-commerce site with an admin back office, built on an architecture that grows into an ERP (manufacturing, procurement, multi-warehouse inventory, omnichannel sales, finance, CRM, HR) without a rewrite.

## Document map

| Document | Contents |
|---|---|
| BUSINESS_REQUIREMENTS.md | v1 scope, user stories, out of scope |
| SYSTEM_ARCHITECTURE.md | Modular monolith, modules, critical flows |
| DATABASE_SCHEMA.md | Entities, v1 Prisma model, ERP extensions |
| API_CONTRACTS.md | Server actions and route handlers |
| DESIGN_SYSTEM.md | Tokens, type, motion, accessibility |
| HOMEPAGE_WIREFRAME.md | Section architecture and responsive behaviour |
| SEO_STRATEGY.md | Metadata, structured data, CWV, compliance |
| DEVELOPMENT_ROADMAP.md | Phases, milestones, open questions, risks |
| SKILL_INVENTORY.md | Installed Claude skills and execution order |
| ARCHITECTURE_REVIEW_V2.md | v1 review: contradictions, gaps, risks, what changed |
| AUTHENTICATION_DECISION.md | Better Auth vs Auth.js, with sources |
| INVENTORY_AND_MANUFACTURING_MODEL.md | Stock concepts, lots, FEFO eligibility, production, QC, costing |
| PRODUCT_COMPLIANCE_MODEL.md | Classification, licences, claims workflow |
| HOMEPAGE_CONCEPTS.md | Live design research + three concepts + recommendation |
| BRAND_RESEARCH.md / PRODUCT_CATALOGUE_RESEARCH.md / BRAND_ASSET_INVENTORY.md / IMAGE_ASSET_PLAN.md | Research and assets |

## Stack (confirmed against the brief)

Next.js (App Router) · TypeScript strict · Tailwind CSS · shadcn/ui · PostgreSQL · Prisma 7 · **Better Auth** (replaces Auth.js; see AUTHENTICATION_DECISION) · Zod · React Hook Form · Cloudinary · Razorpay · Playwright · Vercel · GSAP. Exact versions get pinned to current stable at scaffold time.
