# Authentication Decision

**Decision: Better Auth** (pending your approval). Checked against official sources on 2026-11-08.

## Sources

- Auth.js site banner: "The Auth.js project is now part of Better Auth"; its docs "cover `next-auth@5.0.0-beta` and later" — https://authjs.dev/getting-started
- Announcement (22 Sep 2025): https://www.better-auth.com/blog/authjs-joins-better-auth and https://github.com/nextauthjs/next-auth/discussions/13252
- Auth.js migration guide (security patches continue; Better Auth recommended for new projects): https://authjs.dev/getting-started/migrate-to-better-auth
- Better Auth joins Vercel (Jul 2026; Auth.js maintenance plan continues): https://better-auth.com/blog/better-auth-joins-vercel
- Better Auth Prisma adapter (Prisma 7 + `@prisma/adapter-pg`; Prisma 8 RC not yet supported): https://www.better-auth.com/docs/adapters/prisma
- Admin plugin (roles, multiple roles per user, `createAccessControl`, `userHasPermission`, ban, impersonation, session revoke): https://www.better-auth.com/docs/plugins/admin
- Phone-number plugin (bring your own SMS sender, 6-digit OTP, 300s expiry, 3 attempts): https://www.better-auth.com/docs/plugins/phone-number

## Comparison

| Criterion | Auth.js (next-auth v5) | Better Auth |
|---|---|---|
| Maintenance | Security patches and urgent fixes only; its own maintainers point new projects to Better Auth | Actively developed; now backed by Vercel |
| Next.js App Router | Yes (v5 docs still reference the beta line) | Yes (route handler + server-side `auth.api` calls) |
| PostgreSQL / Prisma | Prisma adapter | First-party Prisma adapter; CLI generates the schema; **pin Prisma 7** |
| Customer auth | OAuth, magic link; credentials are discouraged and hand-rolled | Email+password, email OTP, magic link, Google, phone OTP via plugins |
| Staff auth | Same as customers; 2FA is DIY | Same user table; `twoFactor` plugin for staff 2FA |
| Sessions | JWT or DB sessions | DB sessions with optional cookie cache; list and revoke per user, ban revokes all |
| Role-based authorization | DIY (add role to session in callbacks) | Admin plugin: roles (multiple per user), custom access-control statements, permission checks on server |
| Impersonation (support) | DIY | Built in, time-limited, can't impersonate admins by default |
| Lock-in risk | Library in maintenance mode | Single vendor, but MIT-licensed and data lives in our tables |

## How we'll use it

| Concern | Design |
|---|---|
| One identity table | Customers and staff are both `User`. Staff are invite-only (the owner creates them in admin); public sign-up only ever creates customers. |
| Customer sign-in (v1) | **Email OTP + Google.** Phone OTP needs an Indian SMS provider with **TRAI DLT** template registration (MSG91, Twilio India, etc.). It's an open decision, and phone becomes an optional sign-in later. Guest checkout is allowed; an account is created or linked by email or phone after the order. |
| Staff sign-in | Email + password **plus mandatory 2FA (TOTP)**; session lifetime 12h; sessions revoked on role change or removal. |
| Roles | `owner`, `manager`, `fulfilment`, `pos`, `qc`, `viewer`, `customer` (a user may hold several, e.g. `fulfilment,qc`). Defined with `createAccessControl` statements that mirror our permission map. |
| Authorization point | **Our services**, via `identity.requirePermission(ctx, 'inventory:adjust')`. That wrapper calls Better Auth's permission check. Route groups (`/admin`) also check, but only as a convenience, never as the sole guard. |
| Rate limiting | Better Auth's built-in limiter on auth routes, plus our own limit on OTP send per phone or email per hour. |
| Isolation | Only `modules/identity` imports Better Auth. The rest of the app calls `getSession()`, `requireUser()`, `requirePermission()`. |

## Risks

- Better Auth moves fast. Pin the exact version and review its changelog on each upgrade.
- Prisma 8 support lags. Stay on Prisma 7 until the adapter supports 8.
- The vendor (Vercel) has commercial incentives. The library is MIT and the data is ours, so the exit cost is a code migration, not a data migration.
