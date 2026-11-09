# Skill Inventory

Inspected 2026-11-08. Source: `~/.claude/plugins/installed_plugins.json`, `~/.claude/skills/`, plugin caches under `~/.claude/plugins/cache/`, and the session's MCP/agent list. No project-level skills exist (`.claude/` is absent in this repo).

## 1. What is installed

| Requested name | Installed? | Exact name(s) | SKILL.md location (under `~/.claude/plugins/cache/`) |
|---|---|---|---|
| Matt Pocock skills | Yes (v1.3.1) | `mattpocock-skills:domain-modeling`, `:codebase-design`, `:tdd`, `:grilling`, `:code-review`, `:research`, `:prototype`, `:diagnosing-bugs`, `:pr`, `:wizard`, `:writing-for-agents` | `claude-plugins-official/mattpocock-skills/1.3.1/skills/engineering/*` |
| Brainstorming | Yes | `superpowers:brainstorming` | synced plugin `~/.claude/plugins/synced/.../skills/` |
| Bencium | Yes (2 skills) | `bencium-controlled-ux-designer` (1.0.0), `bencium-innovative-ux-designer` (3.1.5) | `bencium-marketplace/*/skills/*/SKILL.md` |
| Impeccable | Yes (4.8.0) | `impeccable:impeccable` + 4 sub-agents | `impeccable/impeccable/4.8.0/skills/impeccable/SKILL.md` |
| Hallmark | Yes (2.0.0) | `hallmark:hallmark` | `hallmark/hallmark/2.0.0/hallmark/SKILL.md` |
| Taste | Yes (2.1.5) + ECC variants | `taste-skill:design-taste-frontend`; also `ecc:taste`, `ecc:taste-application`, `ecc:taste-distillation` | `taste-skill/taste-skill/2.1.5/skills/taste-skill/SKILL.md` |
| Find Skills | Yes | `anthropic-skills:find-skills`; ECC has `ecc:skill-scout`, `ecc:search-first` | built-in |
| GSAP skills | Yes (1.0.0) | `gsap-skills:gsap-core`, `-react`, `-scrolltrigger`, `-timeline`, `-plugins`, `-performance`, `-utils`, `-frameworks` | `gsap-skills/gsap-skills/1.0.0/skills/*` |
| 21st.dev | Yes (0.4.1) + MCP | `21st:21st-ui-explore`, `-ui-build`, `-ui-review`, `-registry`, `-design-sync`, `-cli-use`, `-ai`; MCP server `plugin:21st:21st` | `21st/21st/0.4.1/skills/*` |
| Motion skills | Yes | `ecc:motion-foundations`, `ecc:motion-patterns`, `ecc:motion-advanced`; gstack `design-motion` | ECC plugin |
| Claude SEO | Yes (2.5.0) | `claude-seo:seo` + 25 sub-skills (`seo-schema`, `seo-technical`, `seo-ecommerce`, `seo-images`, `seo-sitemap`, `seo-local`, …) + agents | `agricidaniel-claude-seo/claude-seo/2.5.0/skills/*` |
| Agent skills | Yes (0.6.14) | `agent-skills:*` (Addy Osmani): spec-driven, planning, frontend-ui-engineering, security-and-hardening, performance-optimization, … | `addy-agent-skills/agent-skills/0.6.14/skills/*` |
| UI UX Pro Max | Yes (2.15.0) | `ui-ux-pro-max:ui-ux-pro-max`, `:design-system`, `:brand`, `:design`, `:ui-styling`, `:banner-design`, `:slides` | `ui-ux-pro-max-skill/ui-ux-pro-max/2.15.0/.claude/skills/*` |
| Karpathy | Yes (1.0.0) | `andrej-karpathy-skills:karpathy-guidelines` | `karpathy-skills/andrej-karpathy-skills/1.0.0/skills/karpathy-guidelines/SKILL.md` |
| ECC / Everything Claude Code | Yes (2.2.3) | `ecc:*` (~300 skills, ~80 agents) incl. `ecc:prisma-patterns`, `ecc:postgres-patterns`, `ecc:database-migrations`, `ecc:nextjs-turbopack`, `ecc:e2e-testing`, `ecc:accessibility`, `ecc:security-review` | `ecc/ecc/2.2.3/` |
| Claude Mem | Yes (15.5.0) | `claude-mem:*`, `claude-mem-cowork:*`; MCP `plugin_claude-mem_mcp-search` | `thedotmack/claude-mem/15.5.0/skills/*` |
| Superpowers | Yes (synced) | `superpowers:brainstorming`, `:writing-plans`, `:executing-plans`, `:test-driven-development`, `:systematic-debugging`, `:verification-before-completion`, `:subagent-driven-development`, … | synced plugin |
| Playwright | **Partly** | Playwright **plugin/MCP is NOT installed** (exists only in the `claude-plugins-official` marketplace listing). Playwright CLI **1.65.0** is runnable via `npx` cache, Chromium builds 1234/1254 are in `%LOCALAPPDATA%\ms-playwright`. | n/a |
| Ponytail | Yes (5.3.2, active "full") | `ponytail:ponytail`, `-review`, `-audit`, `-debt`, `-gain`, `-help` | `ponytail/ponytail/5.3.2/skills/*` |

Also present and relevant: gstack user skills (`design-consultation`, `design-review`, `qa`, `benchmark`, `cso`, `plan-eng-review`, …), `archify` (diagrams), `rea:reverse-engineer-anything`, MCP `motionsites` (paid prompt library), MCP `ecc chrome-devtools` (Lighthouse, perf traces), built-in browser pane, Claude in Chrome.

## 2. Browser tooling (how browser interaction actually works here)

| Tool | Status | Use for |
|---|---|---|
| Built-in browser pane (`mcp__Claude_Browser__*`) | Working | Research (used for Instagram), previewing the dev server |
| Claude in Chrome | Available (deferred) | Only if the user's logged-in Chrome session is needed |
| ECC chrome-devtools MCP | Available | Lighthouse audits, performance traces, CWV |
| Playwright CLI 1.65 | Available via `npx`, not a project dep | E2E tests once `@playwright/test` is added as a devDependency |
| Playwright MCP | **Not installed** | `ecc:gan-evaluator` references `mcp__playwright__*` tools that do not exist; don't use that agent |

## 3. Overlaps and conflicts

| Conflict | Detail | Resolution |
|---|---|---|
| Five design-direction skills (Impeccable, Hallmark, Taste, Bencium ×2, UI UX Pro Max) | Each wants to own direction, tokens and review. Running several produces contradictory rules. | **One** primary: Impeccable. Its rule "the brief wins" honours our pinned palette and fonts. |
| Hallmark floor vs luxury conventions | Hallmark bans eyebrows, tracked small caps and an italic word inside a roman heading. Those are common editorial-luxury devices. | Use Hallmark's ideas as advice only. Don't adopt its floor as law. Its `sloplint` can run as an optional check. |
| Bencium innovative | Bans contemporary references, Google Fonts (Cormorant Garamond is a Google Font) and **all SVG** (logo, icons). Requires ten typography-only directions first. | **Do not use.** It contradicts the brief. |
| Bencium controlled | "ALWAYS ASK before any design decision". | Too slow for build phases. Skip. |
| Taste vs Impeccable | Both run screenshot look-and-fix loops. Taste deals random directions, but the brief already fixes ours. | Taste is optional: only its `inspect.mjs` checker, as a second opinion on the homepage. |
| GSAP vs Motion (`ecc:motion-*`) | Two animation libraries. | **GSAP + ScrollTrigger** for cinematic scroll; plain CSS transitions for micro-interactions. No Motion library. |
| TDD: superpowers vs mattpocock vs ecc:tdd-workflow vs agent-skills | Same discipline written four ways. | `superpowers:test-driven-development` |
| Planning: superpowers:writing-plans, ecc:plan, agent-skills:planning, claude-mem:make-plan | Same | `superpowers:writing-plans` → `superpowers:executing-plans` |
| Code review: mattpocock, ecc, agent-skills, gstack review, built-in `code-review` | Same | Built-in `code-review` + `ecc:typescript-reviewer` / `ecc:react-reviewer` agents |
| Memory: claude-mem vs native memory files | Both persist notes | Both are fine; claude-mem tracks work state. |
| Ponytail ("least code") vs ERP-scale foresight | Ponytail resists "for later" code. | Plan for future modules in the **schema and boundaries**. Write code only for the current phase. |

No duplicate installs are needed. **Nothing should be installed now.** The only install to consider later is the Playwright MCP plugin, and it is optional because the built-in browser and chrome-devtools MCP cover the same needs.

## 4. Recommended execution order

| Phase | Skills (in order) |
|---|---|
| Always on | `ponytail` (active), `andrej-karpathy-skills:karpathy-guidelines`, `superpowers:verification-before-completion` |
| Discovery (this phase) | `superpowers:brainstorming` → `mattpocock-skills:domain-modeling` (schema review) → `mattpocock-skills:grilling` (stress-test requirements) |
| Planning per phase | `superpowers:writing-plans` → `ecc:architect` agent for review |
| Design direction | `impeccable:impeccable` (shape → craft) with `ui-ux-pro-max` as an accessibility/UX checklist lookup; `21st:21st-ui-explore` only for component inspiration |
| Build | `superpowers:test-driven-development`, `ecc:prisma-patterns`, `ecc:postgres-patterns`, `ecc:database-migrations`, `ecc:nextjs-turbopack`, `agent-skills:frontend-ui-engineering`, `gsap-skills:gsap-react` + `gsap-scrolltrigger` |
| Quality gates | `code-review`, `ecc:security-review` (payments, auth, webhooks), `ecc:accessibility`, `impeccable` audit/polish, `ecc:e2e-testing` (Playwright) |
| Launch | `claude-seo:seo-technical`, `seo-schema`, `seo-ecommerce`, `seo-local` (Bidar shop), chrome-devtools Lighthouse, `gsap-skills:gsap-performance` |
