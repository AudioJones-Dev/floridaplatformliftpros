# Lead Pipeline + Lightweight CRM

## Architecture

```
┌─────────────────┐    POST /api/leads     ┌─────────────────────────┐
│  /book-assessment│ ──────────────────▶  │  Zod validation         │
│  (client form)   │                       │  src/services/leads/    │
└─────────────────┘                       │    lead-validation.ts   │
                                           └────────────┬────────────┘
                                                        │
                                                        ▼
                                           ┌─────────────────────────┐
                                           │  LeadStorage adapter    │
                                           │  src/services/leads/    │
                                           │    lead-storage.ts      │
                                           │  (mock | neon)          │
                                           └────────────┬────────────┘
                                                        │
                          ┌─────────────────────────────┴────────────┐
                          ▼ (sync, blocks response)                  ▼ (fire-and-forget)
                ┌─────────────────────┐                  ┌─────────────────────┐
                │  Postgres (Neon)    │                  │  Resend             │
                │  table: leads       │                  │  src/services/leads/│
                │  schema:            │                  │    lead-email.ts    │
                │  sql/006-leads.sql  │                  │  (HTML escape, fail │
                │                     │                  │   open, never       │
                │                     │                  │   blocks user)      │
                └─────────────────────┘                  └─────────────────────┘
                          ▲
                          │ list / get / update
                          │
                ┌─────────────────────┐
                │  /admin/leads       │
                │  GET /api/leads/:id │  ← (none yet; add later if needed)
                │  PATCH /api/leads/:id│
                │  + admin token guard │
                └─────────────────────┘
```

## Routes added

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/leads` | POST | none (public) | Capture a new lead |
| `/api/leads/:id` | PATCH | `ADMIN_ACCESS_TOKEN` (header `x-admin-token` or `?token=`) | Update status / priority / assignedTo / notes |
| `/admin/leads` | GET | `ADMIN_ACCESS_TOKEN` (header or `?token=`) | View 200 most recent leads + counters |
| `/thank-you` | GET | none | Post-submission confirmation + 3-step next process |

## Environment variables

See `.env.example` for the canonical list. Required combinations by environment:

| Env var | Local dev (default) | Production (recommended) |
|---|---|---|
| `LEAD_STORAGE_PROVIDER` | `mock` | `neon` |
| `DATABASE_URL` | (unset, ignored) | **required** when provider = `neon` |
| `RESEND_API_KEY` | (unset → emails skipped) | required (otherwise alerts silently disabled) |
| `INTERNAL_ALERT_EMAIL` | (unset → alerts skipped) | `contact@floridaplatformliftpros.com` |
| `DEFAULT_FROM_EMAIL` | optional | verified Resend sender |
| `ADMIN_ACCESS_TOKEN` | optional (warns if unset) | **required** (otherwise `/admin/leads` denies all access) |
| `NEXT_PUBLIC_SITE_URL` | `https://floridaplatformliftpros.com` | `https://floridaplatformliftpros.com` |
| `NEXT_PUBLIC_BUSINESS_PHONE` | `954-613-9330` | `954-613-9330` |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | `contact@floridaplatformliftpros.com` | `contact@floridaplatformliftpros.com` |

## Local dev mode

```bash
# 1. Copy env scaffold
cp .env.example .env.local

# 2. Defaults are fine for dev — leave LEAD_STORAGE_PROVIDER=mock
# 3. Optionally set ADMIN_ACCESS_TOKEN to exercise the admin guard
echo "ADMIN_ACCESS_TOKEN=$(openssl rand -base64 32)" >> .env.local

# 4. Run dev server
npm run dev
# 5. Submit a test lead at http://localhost:3000/book-assessment
# 6. View at http://localhost:3000/admin/leads?token=<token>
#    (or visit without token if ADMIN_ACCESS_TOKEN is unset — dev only)
```

## Production mode

### One-time setup

1. Create the Neon database table by running the migration. From the Neon SQL Editor (or any psql client connected to `DATABASE_URL`):

   ```sql
   -- contents of sql/006-leads.sql
   ```

   The migration is idempotent: re-running is safe. Use `\i sql/006-leads.sql` from psql or paste contents into Neon's SQL Editor.

2. Set production env vars on Vercel:
   - `LEAD_STORAGE_PROVIDER=neon`
   - `DATABASE_URL=<neon connection string>`
   - `RESEND_API_KEY=<from resend.com/api-keys>`
   - `INTERNAL_ALERT_EMAIL=contact@floridaplatformliftpros.com`
   - `DEFAULT_FROM_EMAIL=<verified resend sender>`
   - `ADMIN_ACCESS_TOKEN=<generated with openssl rand -base64 32>`

3. Deploy via the existing `.github/workflows/deploy.yml` (CI-gated).

### Hard rule

`LEAD_STORAGE_PROVIDER=mock` in `NODE_ENV=production` **throws at the first storage call**. This prevents a misconfigured production from silently dropping leads. If you see this error in Vercel logs, set `LEAD_STORAGE_PROVIDER=neon` and redeploy.

## Resend flow

`src/services/leads/lead-email.ts` builds an alert email and POSTs to `https://api.resend.com/emails` via `fetch` (no SDK dep). The route handler awaits storage success first, then calls `sendLeadAlertEmail(lead).catch(...)` — the email never blocks the response and never surfaces errors to the user.

The email body is HTML-escaped at every interpolation. Subject is `New Lead — <serviceNeeded>`. The from address defaults to `leads@floridaplatformliftpros.com` and can be overridden via `DEFAULT_FROM_EMAIL`.

## Admin usage

### View leads

```
GET https://floridaplatformliftpros.com/admin/leads?token=<ADMIN_ACCESS_TOKEN>
```

Or set the token as a header (e.g. via a browser extension):

```
x-admin-token: <ADMIN_ACCESS_TOKEN>
```

### Update a lead

```bash
curl -X PATCH "https://floridaplatformliftpros.com/api/leads/<UUID>" \
  -H "Content-Type: application/json" \
  -H "x-admin-token: $ADMIN_ACCESS_TOKEN" \
  -d '{"status":"contacted","priority":"high","notes":"Called 3pm, will follow up Tuesday"}'
```

Allowed fields: `status` (new|contacted|qualified|quoted|won|lost|spam), `priority` (low|normal|high|urgent), `assignedTo` (or `assigned_to`), `notes`. Unspecified fields preserve their existing values via SQL `COALESCE`.

## QA checklist

Run before marking the pipeline production-ready:

- [ ] `sql/006-leads.sql` applied to the Neon database; `SELECT count(*) FROM leads;` returns 0
- [ ] `npm run lint` clean
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` succeeds with all routes prerendered (admin page is dynamic by design)
- [ ] `POST /api/leads` with mock provider returns 201 and a `mock-…` id
- [ ] `POST /api/leads` with neon provider returns 201 and a real UUID, and the row appears in `SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;`
- [ ] `POST /api/leads` missing required fields returns 400 with a clear `issues` array
- [ ] `POST /api/leads` malformed JSON returns 400 with `Invalid JSON body`
- [ ] `/book-assessment` form submits cleanly, redirects to `/thank-you`
- [ ] Resend alert email arrives at `INTERNAL_ALERT_EMAIL` within ~30s of a successful POST
- [ ] If `RESEND_API_KEY` is unset, the lead still records (storage path doesn't depend on email)
- [ ] `/admin/leads` without token in production returns the access-denied UI; with the right token shows leads
- [ ] `PATCH /api/leads/:id` with a real id and right token updates status/priority/notes; same call without token returns 401; same call with a malformed UUID returns 400
- [ ] `LEAD_STORAGE_PROVIDER=mock` + `NODE_ENV=production` deploy logs an error at the first lead submission (the throw is the safety net)
- [ ] No secrets are committed (`.env.example` placeholders only; check `git diff` for any leaked values before PR review)

## Related files

- `sql/006-leads.sql` — migration
- `src/services/leads/types.ts` — shared types
- `src/services/leads/lead-storage.ts` — adapters + provider resolver
- `src/services/leads/lead-validation.ts` — Zod schemas + normalizers
- `src/services/leads/lead-email.ts` — Resend alert
- `src/services/leads/admin-auth.ts` — token guard
- `src/app/api/leads/route.ts` — POST endpoint
- `src/app/api/leads/[id]/route.ts` — PATCH endpoint
- `src/app/admin/leads/page.tsx` — admin CRM UI
- `src/app/book-assessment/BookAssessmentForm.tsx` — public form
- `src/app/thank-you/page.tsx` — confirmation page

## Future work (not in this PR)

- Add detail view for individual lead at `/admin/leads/:id` with inline status/priority editing.
- Add CSV export from the admin page.
- Add a webhook adapter as a third storage provider for shipping leads to Slack / a third-party CRM.
- Add a honeypot field + rate limit on `POST /api/leads`.
