<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules — Florida Platform Lift Pros

## SEO / AEO Structure
- Preserve all JSON-LD schema markup on service, location, and resource pages.
- Every page must export a `generateMetadata` function (or static `metadata`) with `title`, `description`, `openGraph`, and `canonical` URL.
- Do not remove or reorder `<head>` metadata; search and AI-answer engines depend on it.

## CTA Placement
- Every commercial page (home, service, location, contact) must have a CTA **above the fold** and a second CTA **at the bottom** of the page.
- Use the shared `<CTASection>` component for bottom-of-page CTAs.

## Contact Information Consistency
- Business phone: **954-613-9330** — use this number everywhere (components, copy, JSON-LD, schema data files).
- Business email: **contact@floridaplatformliftpros.com** — use this address everywhere.
- Never hard-code a different phone number or email address in source files.

## JSON-LD Schema
- Service pages → `src/lib/schema/service.ts`
- Location pages → `src/lib/schema/local-business.ts`
- Blog / resource pages → FAQ schema via `src/lib/schema/faq.ts` where applicable
- Breadcrumb schema → `src/lib/schema/breadcrumb.ts` on every non-root page

## Secrets & Environment Files
- Do **not** commit `.env`, `.env.local`, or any file containing real secrets.
- `.env.example` is the only env file tracked in git; keep it up to date with placeholder values.
- `LEAD_STORAGE_PROVIDER=mock` is for local development only — never commit a production env file.
