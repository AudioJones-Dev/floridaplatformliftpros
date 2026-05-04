@AGENTS.md

# Carry-over hard rules (Florida Platform Lift Pros)

These rules are carried forward from prior projects and apply to all work in this repo.

## Stack
- **Never reintroduce Firebase** in any form (firebase, firebase-admin, firestore, firebase-functions). The lead-store abstraction is the only persistence boundary.
- **No hardcoded secrets.** Only `.env.example` is tracked. All real secrets live in `.env.local` (gitignored) or platform env vars.
- **Mock adapters for live integrations.** Production adapters must be gated behind an env switch (e.g. `LEAD_STORAGE_PROVIDER`) with the mock as the safe default.

## React / Next.js App Router
- **Wrap any client component using App Router hooks** (`useSearchParams`, `usePathname`, `useRouter`, `useSelectedLayoutSegment*`) in `<Suspense>`. Otherwise the prerender fails on routes that touch those hooks. The `book-assessment` route follows the correct pattern: server-component page wrapper imports a client child.
- Server components by default. Only mark `"use client"` when the file actually uses client APIs (state, effects, browser-only APIs, event handlers).

## Git
- **Explicit `git add <files>`** — never `git add -A` or `git add .`. Surface every file going into a commit.
- **Push via gh credential helper.** Never embed tokens in remote URLs (`https://x-access-token:...@github.com/...`). The remote stays plain HTTPS.
- **`git push --force-with-lease` only.** Never plain `--force`. Never force-push to `main`.
- **No `--no-verify`, no `--no-gpg-sign`** unless the user explicitly requests it.
- **Create new commits to fix things** rather than amending pushed commits.

## CI
- **Linux CI is the build authority.** Local Windows builds may pass or fail in ways that don't reflect production. The merge gate is the GitHub Actions Ubuntu run, not the local terminal.

## Reviews & checkpoints
- Pause for review at meaningful checkpoints (post-clone, post-merge, post-validation, post-deploy).
- Surface destructive or hard-to-reverse actions before executing — never silently force-push, drop branches, or rewrite history.
