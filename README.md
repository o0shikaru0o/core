# Gaise

Custom jewelry designed for your outfit, occasion, and taste. Spec: see `PRD.md`.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in keys; never commit .env.local
npm run dev
```

Tailwind is pinned to 3.4.x — do not upgrade to v4.

## Shared contracts (change only with a heads-up to the team)

- `lib/schema.ts` — `Analysis`, `DesignBrief`, `Design` types + zod schemas
- `lib/store.ts` — client flow state (zustand)
- `lib/styles.ts` — the 12 taste cards (images go in `public/styles/<id>.jpg`)
- `lib/providers/types.ts` — `DesignProvider` interface; select with `DESIGN_PROVIDER`
