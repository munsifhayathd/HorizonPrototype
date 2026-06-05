# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # start Next.js dev server on :3000
yarn build        # production build (will fail until the missing modules below are created)
yarn start        # serve the production build
yarn lint         # next lint (eslint-config-next)
```

There is no test runner configured in this repo.

## Architecture

Next.js 14 App Router prototype. The user journey is:

`/` ([app/page.tsx](app/page.tsx)) → `/create` ([app/create/page.tsx](app/create/page.tsx)) → POST `/api/process-software` ([app/api/process-software/route.ts](app/api/process-software/route.ts))

The page at `/create` renders [components/software-form.tsx](components/software-form.tsx), a client component that posts `softwareDetails` + `email` + `files` as `multipart/form-data`. The API route is intended to:

1. Validate input (shared validator at [middleware/validation.ts](middleware/validation.ts) — imported by both the client form and the API route).
2. Call OpenAI to generate raw prototype guidance.
3. Pass the raw response through a structuring step.
4. Email the structured instructions to the user (currently commented out in the route).

The TypeScript path alias `@/*` resolves to the repo root (see [tsconfig.json](tsconfig.json)).

## ⚠️ Broken imports in the API route

[app/api/process-software/route.ts](app/api/process-software/route.ts) imports four modules that **do not exist** in the repo:

- `@/lib/openai` — `generateInstructions(prompt, files)`
- `@/utils/file-handler` — `handleFileUpload` (imported but not called)
- `@/utils/email-service` — `sendEmailNotification(email, payload)` (currently commented out at the call site)
- `@/services/instruction-generator` — `generatePrototypeInstructions(rawResponse)`

`yarn build` and any request to `/api/process-software` will fail until these are created. The `openai` and `nodemailer` packages are already in [package.json](package.json), so the intent is clearly for these files to be implemented locally. Required env vars (e.g. `OPENAI_API_KEY`, SMTP creds for nodemailer) are not documented anywhere — there is no `.env.example`.

## shadcn/ui is configured but not installed

[components.json](components.json) is set up (style: new-york, base: neutral, CSS variables, lucide icons) and [tailwind.config.ts](tailwind.config.ts) already wires the shadcn token names (`hsl(var(--primary))` etc.). However:

- `app/globals.css` has not been audited here — verify the CSS variables (`--primary`, `--background`, …) are actually defined before assuming shadcn classes render correctly.
- The aliased directories `@/components/ui`, `@/lib`, `@/lib/utils`, and `@/hooks` do not exist yet. Creating any shadcn component (`npx shadcn@latest add …`) will scaffold them on first use.

## Conventions

- App Router only — no `pages/` directory.
- Validation logic lives in [middleware/validation.ts](middleware/validation.ts) and is shared between the client form and the server route; keep it framework-agnostic (no `next/*` imports) so both sides can use it.
- The API route uses `formData()` (not JSON) because the form sends files.
