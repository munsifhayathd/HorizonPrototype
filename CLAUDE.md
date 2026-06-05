# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

**Horizon Digital — internal demo prototype.** A small Next.js 14 App Router
app used as a visual stand-in during the "autonomous delivery" showcase: edit
a value → push → the live URL updates in place ~60s later. **Every piece of
data on the dashboard is mocked.** This is not a real product — there is no
auth, no API, no database.

Live: https://horizon-prototype-fawn.vercel.app

## Commands

```bash
npm run dev       # next dev — :3000 (auto-picks :3001 if busy)
npm run build     # production build (currently green)
npm run start     # serve the production build
npm run lint      # next lint
```

`yarn` and `bun` work too — there's no enforced package manager (both
`yarn.lock` and `package-lock.json` are committed; choose one and stick to
it locally).

No test runner.

## The demo flow

```
/                  Get Started landing            (app/page.tsx)
   ↓ "Get Started"
/login             Mock credentials pre-filled    (app/login/page.tsx)
   ↓ "Sign in" (650ms mock latency, no real auth)
/dashboard         Sidebar + charts + ledger      (app/dashboard/page.tsx)
   ↓ sidebar → Settings
/dashboard/settings  Profile + notifications      (app/dashboard/settings/page.tsx)
```

Mock credentials (pre-filled, accept anything): `brad@horizondigital.au` /
`demo1234`. The mock principal is "Brad Mitchell" — see references in
`app/login/page.tsx`, `app/dashboard/settings/page.tsx`, and
`components/dashboard/sidebar.tsx`.

## Where to edit the demo numbers

All chart and feed data lives in **[lib/mock-data.ts](lib/mock-data.ts)**:

- `adoptionCurve` — 12-month AI tooling adoption %
- `lifecyclePipeline` — projects per lifecycle phase
- `teamAdoption` — % adoption by team
- `kpis` — the four hero KPI cards
- `sparkA/B/C/D` — sparkline series for the KPI cards
- `ledger` — recent ships feed (typed via `LedgerKind` union)
- `practices` — sidebar/bottom-right practices list

For the autonomous-delivery demo beat: edit any value here, commit, push,
the live URL updates with the new number.

## Stack

- Next.js 14.2 App Router (no `pages/`)
- React 18, TypeScript
- Tailwind CSS — design tokens in `app/globals.css`, palette extended in
  `tailwind.config.ts`
- **recharts** for the chart components (`components/charts/*.tsx`)
- `lucide-react` icons
- Fonts via `next/font/local` (Geist Sans + Mono in `app/fonts/`) and
  `next/font/google` (Instrument Serif) — wired in `app/layout.tsx`
- `@/*` path alias → repo root (see `tsconfig.json`)

## Component map

```
components/
├── charts/
│   ├── adoption-line-chart.tsx    AreaChart — AI tooling adoption
│   ├── pipeline-bar-chart.tsx     Horizontal BarChart — lifecycle pipeline
│   ├── team-adoption-chart.tsx    BarChart — adoption by team
│   ├── autonomy-gauge.tsx         Custom SVG radial gauge — Autonomy Index
│   └── mini-sparkline.tsx         Inline sparkline for KPI cards
├── dashboard/
│   ├── sidebar.tsx                Left nav + account chip
│   ├── chart-card.tsx             Frosted-card wrapper for charts
│   └── stat-card.tsx              KPI tile with sparkline
lib/
├── utils.ts                       cn() helper (clsx + tailwind-merge)
├── mock-data.ts                   ALL demo data
└── chart-theme.ts                 Shared recharts colour/tooltip styling
```

## shadcn/ui

`components.json` is configured (style: new-york, neutral, CSS variables,
lucide icons) and the Tailwind theme exposes the shadcn token names
(`hsl(var(--primary))`, etc., shimmed onto our palette in
`app/globals.css`). But **no shadcn components are installed yet**.
Running `npx shadcn@latest add <component>` will scaffold
`@/components/ui` on first use.

## Deploy

Vercel project: **`horizon-prototype`** under team
**`munsif-hayats-projects`** (Horizon Digital).

Auto-deploy is connected to `main` on
`github.com:munsifhayathd/HorizonPrototype`. The loop is:

```
git push origin main → Vercel builds (~60s) → live URL updates in place
```

Stable production aliases (pick whichever you prefer to share):

| URL | Note |
|---|---|
| `horizon-prototype-fawn.vercel.app` | Shortest / demo URL |
| `horizon-prototype-munsif-hayats-projects.vercel.app` | Team-scoped |
| `horizon-prototype-munsifhayathd-munsif-hayats-projects.vercel.app` | Author-scoped |

Per-deployment URLs (with the random hash) exist for rollback/previews —
**don't share them**; they're the source of "the URL changes every push"
confusion.

To deploy from CLI: `vercel --prod --scope munsif-hayats-projects` (must
be `vercel login`'d as `munsif@horizondigital.au`).

## Git remote quirks

The origin uses the SSH host alias **`github.com-horizon`**:

```
git@github.com-horizon:munsifhayathd/HorizonPrototype.git
```

This routes through `~/.ssh/id_ed25519_horizon_digital` (the office
GitHub key) rather than the default key, which auths as a different
account. If you ever see `Permission to munsifhayathd/HorizonPrototype.git
denied to munsifhayat`, the remote got rewritten to plain `github.com:` —
restore the `-horizon` alias.

Local git identity for this repo is set to `munsif@horizondigital.au` /
`Munsif Hayat` so that CLI deploys pass Vercel's "git author must have
access to the team" check.

## Conventions

- App Router only — no `pages/` directory
- Charts are recharts-based, not custom SVG (except `autonomy-gauge.tsx`
  and `mini-sparkline.tsx`)
- All demo data is in `lib/mock-data.ts` — don't scatter it
- Editorial copy uses italics and roman numerals heavily; keep the
  "annual report" tone if you extend it
