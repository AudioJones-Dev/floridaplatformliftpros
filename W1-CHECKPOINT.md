# W1 Checkpoint — Florida Platform Lift Pros

**Status:** W1 merged and validated on `main` (commit `b167819`).
**Date:** 2026-05-04.
**Build authority:** Linux CI on GitHub Actions.

---

## Final route inventory

16 routes total. 12 served on the wire (HTTP 200/201); the remaining are technical / framework.

| Route | Type | Indexed | Notes |
|---|---|---|---|
| `/` | Static | yes | Home; LocalBusiness + Service + Breadcrumb JSON-LD |
| `/services/vertical-platform-lifts` | Static | yes | Service catalog page |
| `/services/stair-lifts` | Static | yes | Straight + curved, indoor + outdoor (Harmar/Bruno) |
| `/services/vehicle-lifts` | Static | yes | Wheelchair + scooter lifts for vans/SUVs/trucks |
| `/services/ada-ramps` | Static | yes | Custom ADA ramp installation |
| `/services/mobile-home-accessibility` | Static | yes | Mobile/manufactured home entries |
| `/services/modular-trailer-ada-access` | Static | yes | Modular buildings + portable classrooms + trailers |
| `/resources/vertical-platform-lift-cost-florida` | Static | yes | Cost guide (Article schema) |
| `/book-assessment` | Static | yes | Lead-capture form (server wrapper + client child, Suspense-correct) |
| `/thank-you` | Static | **no** | Post-conversion; disallowed in robots, excluded from sitemap |
| `/api/lead` | Dynamic | n/a | POST only; mock adapter default |
| `/robots.txt` | Static (App Router metadata) | n/a | Generated from `app/robots.ts` |
| `/sitemap.xml` | Static (App Router metadata) | n/a | Generated from `app/sitemap.ts` |
| `/_not-found` | Static | n/a | Framework 404 |

---

## Sitemap

**9 public SEO URLs** at `/sitemap.xml`. Domain: `https://floridaplatformliftpros.com`.

```
/                                                  priority 1.0  weekly
/book-assessment                                   priority 0.9  monthly
/services/vertical-platform-lifts                  priority 0.9  monthly
/services/stair-lifts                              priority 0.9  monthly
/services/vehicle-lifts                            priority 0.9  monthly
/services/ada-ramps                                priority 0.9  monthly
/services/mobile-home-accessibility                priority 0.8  monthly
/services/modular-trailer-ada-access               priority 0.8  monthly
/resources/vertical-platform-lift-cost-florida     priority 0.7  monthly
```

`/thank-you`, `/api/lead`, `/_not-found`, `/robots.txt`, `/sitemap.xml` are intentionally excluded.

### Robots

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /thank-you
Host: https://floridaplatformliftpros.com
Sitemap: https://floridaplatformliftpros.com/sitemap.xml
```

---

## Schema coverage

| Page | Schemas emitted |
|---|---|
| `/` | `LocalBusiness` + `BreadcrumbList` + `Service` |
| `/services/vertical-platform-lifts` | `Service` + `FAQPage` + `BreadcrumbList` |
| `/services/stair-lifts` | `Service` + `FAQPage` + `BreadcrumbList` |
| `/services/vehicle-lifts` | `Service` + `FAQPage` + `BreadcrumbList` |
| `/services/ada-ramps` | `Service` + `FAQPage` + `BreadcrumbList` |
| `/services/mobile-home-accessibility` | `Service` + `FAQPage` + `BreadcrumbList` |
| `/services/modular-trailer-ada-access` | `Service` + `FAQPage` + `BreadcrumbList` |
| `/resources/vertical-platform-lift-cost-florida` | `Article` + `FAQPage` + `BreadcrumbList` + `Service` |
| `/book-assessment` | none (conversion page) |
| `/thank-you` | none (post-conversion) |

**`areaServed` on every Service + LocalBusiness schema:** 5 counties (`AdministrativeArea`) + 7 cities (`City`).

- Counties: Miami-Dade, Broward, Palm Beach, Lee, Collier
- Cities: Fort Myers, Naples, Cape Coral, Bonita Springs, Estero, Lehigh Acres, North Fort Myers

Helpers live in `src/lib/seo/schema.ts`. Single-source-of-truth siteConfig in `src/lib/seo/metadata.ts`.

---

## Lead-store status

| Setting | Value |
|---|---|
| Default provider | `mock` (in-memory; logs to console in dev mode) |
| Local-dev option | `json` (writes to `/data/leads.json`, gitignored; serverless FS read-only at runtime) |
| Unknown provider behavior | `console.warn` + fall back to mock |
| Production CRM adapter | not implemented (Airtable / webhook / Postgres deferred to W4) |

### Contract test results (verified W1.5)

| Test | Result |
|---|---|
| `POST /api/lead` happy path | `201 {"success":true,"id":"mock-…"}` |
| `POST /api/lead` missing required field | `400 {"error":"Name and phone are required."}` |
| `POST /api/lead` malformed JSON | `500 {"error":"Failed to process lead."}` (no stack trace leaked) |
| `LEAD_STORAGE_PROVIDER=airtable` (unknown) | `console.warn` emitted, falls back to mock, returns 201 |

Implementation: `src/lib/leads/store.ts`. API entry: `src/app/api/lead/route.ts`.

---

## Deployment status

| Item | Value |
|---|---|
| Vercel project | `audiojones/floridaplatformliftpros` |
| Org ID | `team_BHxIkAGPW6qEKKQBAt9c0NGz` |
| Project ID | `prj_cRGQlJxKdfeopr60piZPlysU0zn2` |
| Latest W1.5 smoke deploy | `dpl_GvSBszguAHuCTNqG54qZX7LxGnFZ` |
| Status | **● Ready** |
| Target | preview |
| URL | `https://floridaplatformliftpros-bejtcs18d-audiojones.vercel.app` |
| Region | `iad1` |

**Deployment Protection** is enabled by default on the Vercel project. All deployment URLs return HTTP 401 + auth interstitial to unauthenticated requests. This is intentional security posture — visual smoke from an authed Vercel session is the right way to inspect previews. Disabling Deployment Protection would expose preview URLs publicly and should not be done without a deliberate decision.

### CI / deploy automation

| Workflow | File | Triggers | Authority |
|---|---|---|---|
| `CI` | `.github/workflows/ci.yml` | `push`, `pull_request` to main | Build gate — lint + typecheck + build on Ubuntu Node 20 |
| `Deploy` | `.github/workflows/deploy.yml` | `workflow_run` (on CI success on main, target=production) + `workflow_dispatch` (input: preview \| production) | Calls `vercel deploy` only after CI passes |

Vercel native push-to-deploy is **not** the authority — GitHub Actions is. Deploy workflow needs the 3 secrets below before it can run.

---

## Manual desk-side steps (required before auto-deploy works)

### 1. Install Vercel GitHub App on the `AudioJones-Dev` org

Go to <https://vercel.com/dashboard/integrations> → add the Vercel GitHub App → grant access to the `AudioJones-Dev/floridaplatformliftpros` repo (or all repos in the org).

This is **optional** for the deploy workflow itself (it works with the token alone) but enables Vercel PR comments + status checks on the repo.

### 2. Add 3 GitHub Secrets

```bash
# 1. Generate token at https://vercel.com/account/tokens — scope to "audiojones" team
gh secret set VERCEL_TOKEN      --repo AudioJones-Dev/floridaplatformliftpros

# 2. Public Vercel org identifier
gh secret set VERCEL_ORG_ID     --repo AudioJones-Dev/floridaplatformliftpros
# Value: team_BHxIkAGPW6qEKKQBAt9c0NGz

# 3. Public Vercel project identifier
gh secret set VERCEL_PROJECT_ID --repo AudioJones-Dev/floridaplatformliftpros
# Value: prj_cRGQlJxKdfeopr60piZPlysU0zn2
```

`VERCEL_TOKEN` is the only true secret; the org/project IDs are public Vercel identifiers but kept as repo secrets so rotation doesn't require a workflow PR.

Until the secrets are set, the `Deploy` workflow will fail at the `vercel pull` step. The `CI` workflow is unaffected and will continue to run.

---

## Recommended next waves

These are sequenced suggestions, not a locked plan — direction is yours.

### W2 — Visual polish

- Apply the Tailwind v4 design tokens (`brand-*`, `accent-*`, `ink-*`, `surface-*`) defined in `src/app/globals.css` to existing components. Currently the components still use raw Tailwind utility colors (`bg-blue-900`, `text-yellow-300`, etc.) instead of the design-system tokens.
- Hero photography or illustration treatment.
- Trust-strip visual upgrade; manufacturer logo strip (Harmar, Bruno, Ameriglide, EZ-Access — names already in the business doc).
- Wire Geist's font properly across heading hierarchy, polish typography scale.
- Mobile responsiveness audit (sticky CTA already exists; verify all sections collapse cleanly).

### W3 — Location pages

- Per-county pages under `/locations/<county>/` for the 5 primary counties. Page-engine driven, with location-specific JSON-LD `LocalBusiness` narrowing `areaServed` to that county.
- Optional cross-product `/locations/<county>/<service>/` long-tail pages — high SEO value, generated from a config map.
- Sitemap entries for each location page.
- **Do not bloat with city pages** — county-level was the locked W1 scope; city pages would require explicit greenlight.

### W4 — Lead-capture hardening

- Production lead-store adapter behind `LEAD_STORAGE_PROVIDER` env switch — Airtable adapter recommended (matches the Lead Generation Agency business doc's "Invoice Tracker (Airtable or Sheet)" plan).
- Honeypot + basic rate-limiting on `/api/lead`.
- Per-page inline lead-capture forms on service pages (currently only `/book-assessment` has the form).
- E2E tests covering the full submission flow.

### Lower priority — backlog

- ICP-specific landing pages (homes / aging-in-place, schools, churches, medical clinics, trailer offices) — per business doc.
- Performance: image optimization pipeline, Core Web Vitals monitoring.
- Analytics: GA4 or Plausible behind env switch.
- Photos / testimonials / before-after content slots.

---

## Hard rules carried forward (still in force)

- No Firebase
- No hardcoded secrets — only `.env.example` is tracked
- Mock adapters for live integrations; production gated behind env switches
- Explicit `git add <files>` — never `-A`
- All git pushes via `gh` credential helper — no token URL embeds
- `--force-with-lease` only — never plain `--force`
- `<Suspense>` around any client component using App Router hooks (`useSearchParams`, etc.)
- Linux CI is the build authority
- FPLP-only consumer-facing brand — Ranked Access and Florida Ramp & Lift remain internal until explicitly greenlit

---

## Reference

- AGENTS.md — project conventions for SEO/AEO, CTA placement, contact-info consistency, JSON-LD locations, page engine, secrets policy
- CLAUDE.md — Claude Code carry-over hard rules
- docs/deployment.md — deploy pipeline + secrets setup
- src/lib/page-engine/types.ts — 12 typed `PageSection` variants
- src/lib/seo/metadata.ts — siteConfig single source of truth
- src/lib/seo/schema.ts — JSON-LD helpers
- src/lib/leads/store.ts — lead-store abstraction

_Last verified via Vercel App PR preview integration test on 2026-05-04._
