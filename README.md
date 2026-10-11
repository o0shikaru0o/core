# Core

Core turns a group chat's shared lore into real products. A Telegram bot finds a recurring moment, lets the group vote, and asks Arcade to make the winning product. This Next.js app is the image-led collection and order-tracking experience.

## Run locally

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Without `DATABASE_URL`, the app uses the demo group, products, and orders in `lib/demo.ts`. Set `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` to enable the **Get yours** Telegram handoff; the demo does not link to an assumed bot username.

## Product and integration

- [Product requirements](PRD.md)
- [Core bot integration](docs/INTEGRATION.md)
- [UX flow and visual direction](docs/UX_FLOW.md)

The app reads the bot's Postgres database. The bot owns writes, voting, group membership checks, and Arcade checkout. Tailwind is pinned to 3.4.x.
