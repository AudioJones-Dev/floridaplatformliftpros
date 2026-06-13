# Neon Setup

Neon is the production database for the lead and commission pipeline. Keep credentials local or in Vercel environment variables only.

## Production app database

Apply migrations in order from the Neon SQL Editor or a local `psql` session connected to `DATABASE_URL`:

```sql
-- 1. sql/006-leads.sql
-- 2. sql/007-lead-attribution-pipeline.sql
```

Or run the project helper after `.env.local` has `LEAD_STORAGE_PROVIDER=neon` and `DATABASE_URL`:

```powershell
npm run neon:migrate
```

The helper applies both SQL files in order and verifies that `public.leads` exists with the AI prequalification and commission columns.

Required Vercel environment variables:

| Variable | Purpose |
|---|---|
| `LEAD_STORAGE_PROVIDER=neon` | Enables the Neon-backed lead adapter |
| `DATABASE_URL` | Neon Postgres connection string |
| `RESEND_API_KEY` | New lead and partner handoff emails |
| `INTERNAL_ALERT_EMAIL` | Internal lead notification inbox |
| `PARTNER_HANDOFF_EMAIL` | Florida Ramp and Lift handoff inbox |
| `ADMIN_ACCESS_TOKEN` | Admin dashboard and PATCH API access |
| `AI_PHONE_SERVICE_WEBHOOK_SECRET` | AI phone-service webhook access |

## Neon MCP for Codex

The Neon MCP server is for development and testing only. Review requested database actions before execution.

Project-level OAuth setup:

```powershell
npm run neon:mcp
```

Project-level API key setup:

```powershell
$env:NEON_API_KEY = "<local-neon-api-key>"
npm run neon:mcp -- -ApiKeyAuth
```

Global Codex setup:

```powershell
npm run neon:mcp -- -Global
```

After setup, restart Codex or reload MCP servers, then ask the assistant to get started with Neon.

## Secret handling

Do not commit:

- Neon API keys
- `DATABASE_URL`
- `.env.local`
- MCP config files that include bearer tokens

If a key is pasted into chat or committed by mistake, revoke it from the Neon Console and create a replacement.
