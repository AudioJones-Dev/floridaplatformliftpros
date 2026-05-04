# Deployment

## Pipeline

`.github/workflows/ci.yml` runs lint + typecheck + build on every push and PR.
`.github/workflows/deploy.yml` triggers on **CI success** for `main` (production) and on **manual `workflow_dispatch`** (preview or production).

CI is the deploy gate — Vercel does not auto-deploy from raw `git push`. A failed CI run leaves `main` un-deployed.

## Required GitHub Secrets

Set these on the repo at <https://github.com/AudioJones-Dev/floridaplatformliftpros/settings/secrets/actions> or via:

```bash
gh secret set VERCEL_TOKEN      --repo AudioJones-Dev/floridaplatformliftpros
gh secret set VERCEL_ORG_ID     --repo AudioJones-Dev/floridaplatformliftpros
gh secret set VERCEL_PROJECT_ID --repo AudioJones-Dev/floridaplatformliftpros
```

| Secret | Value | Source |
|---|---|---|
| `VERCEL_TOKEN` | personal access token | <https://vercel.com/account/tokens> — scope to the `audiojones` team |
| `VERCEL_ORG_ID` | `team_BHxIkAGPW6qEKKQBAt9c0NGz` | from `.vercel/project.json` (gitignored) |
| `VERCEL_PROJECT_ID` | `prj_cRGQlJxKdfeopr60piZPlysU0zn2` | from `.vercel/project.json` (gitignored) |

`VERCEL_TOKEN` is the only true secret. The other two are public Vercel identifiers — kept as repo secrets to keep the workflow declarative (and so rotating the project doesn't require a workflow PR).

## GitHub App

The Vercel GitHub App must be installed on the **`AudioJones-Dev`** org for status checks to land on PRs. Install at <https://vercel.com/dashboard/integrations>.

The CLI-based deploy in `deploy.yml` does NOT require the GitHub App — it works with the token alone. The App only enables: PR comment with preview URL, status checks visible on the PR, native Vercel integration UI on the repo.

## Manual deploy

```bash
# Preview (default for non-main branches)
npx vercel deploy

# Production (alias updates immediately)
npx vercel deploy --prod

# Inspect a deployment
npx vercel inspect <url-or-id>
```

The CLI uses `.vercel/project.json` (gitignored, written by `vercel link`) for project resolution. Re-link via `npx vercel link --yes --project floridaplatformliftpros` if that file is missing.

## Deployment Protection

Vercel project has Deployment Protection enabled by default. All deployment URLs return HTTP 401 + auth interstitial unless the requester has a Vercel session for the `audiojones` team. To smoke-test from CI or scripts, use `vercel curl <path> --deployment <url>` (CLI-injected auth) or generate a bypass token in project settings.

Disabling Deployment Protection is a project-wide setting; do not disable without a deliberate decision (it would expose preview URLs publicly).
