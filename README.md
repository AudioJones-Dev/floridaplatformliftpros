# Florida Platform Lift Pros

Production-oriented scaffold — Next.js 16 marketing site for a Florida accessibility contractor.  
Stack: **Next.js 16 · TypeScript · Tailwind v4 · ESLint**

---

## Local Setup

1. **Clone the repo and install dependencies**

   ```bash
   git clone https://github.com/AudioJones-Dev/floridaplatformliftpros.git
   cd floridaplatformliftpros
   npm install
   ```

2. **Copy the environment file and fill in your values**

   ```bash
   cp .env.example .env.local
   ```

   Key variables (see `.env.example` for the full list):

   | Variable | Purpose |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | Canonical site URL used in metadata and JSON-LD |
   | `NEXT_PUBLIC_SITE_NAME` | Display name in page titles |
   | `LEAD_STORAGE_PROVIDER` | `mock` (local JSON) — see [Lead Capture](#lead-capture-limitations) |
   | `INTERNAL_ALERT_EMAIL` | Optional email for lead-alert notifications |

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## Build Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Production build (outputs to `.next/`) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## Lead Capture Limitations

The `POST /api/lead` route validates and stores lead submissions.  
The active storage back-end is controlled by `LEAD_STORAGE_PROVIDER` in your `.env.local`.

**`mock` (default — local dev only)**  
Appends submissions to `/data/leads.json` at the project root (gitignored).  
This uses the Node.js `fs` module and **will not work** on serverless/edge runtimes such as Vercel without a writable filesystem layer.

**⚠️ Production deploy requires database-backed lead storage. Do not deploy with `LEAD_STORAGE_PROVIDER=mock`.**

---

## Next Steps: Database Integration

The lead storage layer lives in `src/lib/leads/store.ts` and exposes a single `LeadStore` interface:

```ts
interface LeadStore {
  save(lead: LeadSubmission): Promise<LeadSubmission>;
}
```

To swap in **Neon + Prisma** (or any other database):

1. Install and configure Prisma with your Neon connection string:
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```
2. Add a `Lead` model to `prisma/schema.prisma`.
3. Run `npx prisma generate` and `npx prisma migrate dev`.
4. Add a new `neonStore` implementation in `src/lib/leads/store.ts` (a commented skeleton is already there).
5. Set `LEAD_STORAGE_PROVIDER=neon` and `DATABASE_URL=<your-neon-url>` in your environment.

No changes to `src/app/api/lead/route.ts` are needed — the route already calls `getLeadStore()` and is provider-agnostic.
