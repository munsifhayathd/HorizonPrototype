# Horizon Prototype

Internal demo prototype for **Horizon Digital** — a small Next.js dashboard
used in the "autonomous delivery" showcase. Every value on screen is mocked;
the demo beat is to edit a number, push to `main`, and watch the live URL
update in place.

**Live:** https://horizon-prototype-fawn.vercel.app

## Demo flow

```
/                    Get Started landing
  → /login           Mock credentials pre-filled (brad@horizondigital.au / demo1234)
  → /dashboard       Sidebar + charts + recent activity
  → /dashboard/settings  Profile, notifications, teams
```

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Where to edit the demo

All chart and feed data lives in [`lib/mock-data.ts`](lib/mock-data.ts).
Change a value, commit, push — Vercel auto-deploys to the same URL in ~60s.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · recharts ·
lucide-react · Instrument Serif + Geist.

## Deploy

Auto-deploy is wired from `main` to Vercel project `horizon-prototype` in
team `munsif-hayats-projects`. See [CLAUDE.md](CLAUDE.md) for the full
deploy notes, including SSH remote alias and CLI scope.
