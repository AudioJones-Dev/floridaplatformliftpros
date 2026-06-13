# DOX framework

- DOX is highly performant AGENTS.md hierarchy installed here
- Agent must follow DOX instructions across any edits

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it

## Read Before Editing

1. Read the root AGENTS.md
2. Identify every file or folder you expect to touch
3. Walk from the repository root to each target path
4. Read every AGENTS.md found along each route
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:

- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- AGENTS.md creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the DOX pass still must happen.

## Hierarchy

- Root AGENTS.md is the DOX rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child DOX Index
- Child AGENTS.md files own domain-specific instructions and their own Child DOX Index
- Each parent explains what its direct children cover and what stays owned by the parent
- The closer a doc is to the work, the more specific and practical it must be

## Child Doc Shape

- Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards
- Work Guidance must reflect the current standards of the project or user instructions; if there are no specific standards or instructions yet, leave it empty
- Verification must reflect an existing check; if no verification framework exists yet, leave it empty and update it when one exists

Default section order:
- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child DOX Index

## Style

- Keep docs concise, current, and operational
- Document stable contracts, not diary entries
- Put broad rules in parent docs and concrete details in child docs
- Prefer direct bullets with explicit names
- Do not duplicate rules across many files unless each scope needs a local version
- Delete stale notes instead of explaining history
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist

## Closeout

1. Re-check changed paths against the DOX chain
2. Update nearest owning docs and any affected parents or children
3. Refresh every affected Child DOX Index
4. Remove stale or contradictory text
5. Run existing verification when relevant
6. Report any docs intentionally left unchanged and why

## User Preferences

- graphifyy v0.8.36+ must be installed before working on any repo: `uv tool install graphifyy` (preferred) or `pip install graphifyy`. Run `uv tool list | grep graphify` to verify. Used for /graphify codebase analysis and knowledge graph generation.

## Child DOX Index

This project is not yet indexed. Before continuing you must scan the project, build the DOX tree and replace this message with the actual index. Go deep and scan files recursively to properly evaluate complexity and create nested DOX files where needed.

---

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
- All schema helpers live in `src/lib/seo/schema.ts` (LocalBusinessSchema, ServiceSchema, FAQPageSchema, ArticleSchema, BreadcrumbSchema, HowToSchema, OrganizationSchema).
- Schema helpers read from `siteConfig` in `src/lib/seo/metadata.ts`.
- Inject schemas via inline `<script type="application/ld+json">` tags rendered by `RenderPage` (using `config.schemas` array).

## Page Engine
- All money pages are driven by `PageEngineConfig` objects in `src/lib/page-engine/types.ts`.
- `RenderPage` in `src/lib/page-engine/render-page.tsx` dispatches over 12 section types.
- Add new section types to both `types.ts` and `render-page.tsx`; create the component in `src/lib/page-engine/sections/`.

## Secrets & Environment Files
- Do **not** commit `.env`, `.env.local`, or any file containing real secrets.
- `.env.example` is the only env file tracked in git; keep it up to date with placeholder values.
- `LEAD_STORAGE_PROVIDER=mock` is for local development only — never commit a production env file.


