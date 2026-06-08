# Florida Platform Lift Pros

Marketing + lead-capture site for an ADA accessibility installer serving South and Southwest Florida (Miami-Dade, Broward, Palm Beach, Lee, Collier and 7 SW FL cities). Built on Next.js App Router with a section-driven page engine, JSON-LD schema on every service/resource page, and a lightweight CRM for inbound leads.

## Active routes

| Route | Purpose |
|---|---|
| `/` | Home — LocalBusiness + Service + Breadcrumb JSON-LD |
| `/services/vertical-platform-lifts` | Service page |
| `/services/stair-lifts` | Service page |
| `/services/vehicle-lifts` | Service page |
| `/services/ada-ramps` | Service page |
| `/services/mobile-home-accessibility` | Service page |
| `/services/modular-trailer-ada-access` | Service page |
| `/resources/vertical-platform-lift-cost-florida` | Article + FAQ |
| `/book-assessment` | Lead-capture form (client child + Suspense-correct wrapper) |
| `/thank-you` | Post-conversion confirmation |
| `/admin/leads` | Admin CRM view (token-guarded) |
| `POST /api/leads` | Public lead intake (Zod-validated) |
| `PATCH /api/leads/:id` | Admin lead update (token-guarded) |
| `/robots.txt`, `/sitemap.xml` | App Router metadata routes |

> The legacy `POST /api/lead` (singular) endpoint and its mock-only store were removed. All lead submissions now go through `POST /api/leads`. See [`docs/lead-pipeline.md`](docs/lead-pipeline.md).

## Lead pipeline

Form → Zod validation → `LeadStorage` adapter (`mock` in dev, `neon` in prod) → Postgres `leads` table → fire-and-forget Resend alert email. Admin views/edits via `/admin/leads` and `PATCH /api/leads/:id`, both gated by `ADMIN_ACCESS_TOKEN`.

Full architecture, env matrix, and QA checklist: [`docs/lead-pipeline.md`](docs/lead-pipeline.md). Postgres schema: [`sql/006-leads.sql`](sql/006-leads.sql).

## Environment setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Defaults (`LEAD_STORAGE_PROVIDER=mock`) are safe for local dev — no database needed. See `.env.example` for the full list of supported env vars (Neon, Resend, admin token, public contact info).

## Deployment

GitHub Actions is the build authority: `.github/workflows/ci.yml` runs lint + typecheck + build on every PR; `.github/workflows/deploy.yml` ships to Vercel only after CI succeeds on `main`. Full pipeline + secret setup: [`docs/deployment.md`](docs/deployment.md).

## Conventions

- `AGENTS.md` — project rules (SEO/AEO structure, CTA placement, contact-info consistency, JSON-LD locations, page engine, secrets policy).
- `CLAUDE.md` — carry-over hard rules (no Firebase, no hardcoded secrets, App Router Suspense rules, git hygiene, CI authority).
