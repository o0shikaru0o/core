# PRD — Core

> **Event:** Shopping 3.0 — AI Commerce Hackathon with Arcade · Sun Oct 11, 10am–6pm
> **Judges:** Kirsten Green (Forerunner), Mariam Naficy (Arcade / Minted), Ash Herr + surprise guests
> **Prizes:** $10k / $5k
> **Team:** Rachel (Core app, design, pitch) · Ekene (Core bot)
> **Repos:** app [o0shikaru0o/core](https://github.com/o0shikaru0o/core) · bot [Ekene-Azubuko/core](https://github.com/Ekene-Azubuko/core) · how they connect: [`docs/INTEGRATION.md`](docs/INTEGRATION.md)

---

## 1. One-liner

**Core turns your group chat's inside jokes into real products.**

The Core bot sits in a Telegram group. It notices the group's shared lore (a running joke, a memorable night, a catchphrase), asks the group whether to make it into a product, and has Arcade design and manufacture the winner. Members buy their own copy, and the **Core app** shows everything the group has made and where each order is in production.

## 2. Problem

- The best things about a friend group live in the group chat: inside jokes, nicknames, legendary nights. Nothing captures them.
- Custom merch for a group means someone designs it, finds a manufacturer, collects sizes and money, and chases the order. Nobody does it.
- Generic personalized gifts (a name on a mug) don't capture what makes the group *the group*.

## 3. Solution / "Shopping 3.0" framing

| Shopping 1.0 | Shopping 2.0 | **Shopping 3.0 (Core)** |
|---|---|---|
| Walk into a store | Search + recommendations | **The product is invented from your conversation and made on demand** |

- **AI finds the lore:** OpenAI reads windows of the group's messages and picks the strongest shared joke, citing the messages that prove it.
- **Humans decide:** the group votes on a product type, or "No". Nothing is made unless the group chooses it.
- **Arcade makes it real:** a real, manufacturable product with a real price, made by Arcade's maker network.

## 4. User flow

1. **Add Core to a Telegram group.** An admin sends `/resume` to consent. Only new messages after consent are collected.
2. **Chat as usual.** Every N messages (100 by default, 10 for demos), the bot looks for lore.
3. **Lore found → vote.** The bot posts the lore and why, with 3 real Arcade product types plus **No**. Members vote. The highest count wins, ties go to **No**, and category ties trigger a runoff.
4. **Arcade makes it.** The bot posts the product image, real unit price, **Get yours** and **View in Core**.
5. **Get yours.** Opens a private chat with the bot, which checks the buyer is in the group and creates their own Arcade checkout (one item, drop-shipped). The buyer pays on Arcade's page.
6. **Core app.** Members open the link to browse the group's products, see the lore and chat messages behind each one, and track their order through manufacturing.

## 5. Core app

Mobile-first web app, opened from Telegram links. Bottom menu: **Projects · Tracking · Profile**.

| Screen | What it shows |
|---|---|
| **Projects** (`/`) | One card per Telegram group: product collage, name, product count |
| **Project** (`/projects/{chat_id}`) | Lore being voted on or made right now, then a grid of the group's products |
| **Product** (`/projects/{chat_id}/products/{proposal_id}`) | Image, name, price (before shipping and tax), Arcade selection, **the lore** and explanation, **From the chat** (the messages the lore came from), vote count, orders, **Get yours in Telegram** |
| **Tracking** (`/tracking`) | Every checkout with buyer, group and stage bar |
| **Order** (`/tracking/{id}`) | Stage timeline, maker, shipment tracking links |
| **Profile** (`/profile`) | Placeholder: connected groups, shipping, payment, notifications |

**Order stages** (from Arcade `orders/get` `status`): Awaiting payment → Ordered → Design review → In production → Shipped → Delivered (or Refunded).

**Stretch:** in-app chat; voting from the app.

## 6. Architecture

- **Bot (Ekene):** Python, python-telegram-bot long polling, OpenAI structured output, Arcade API, Postgres. Owns all writes. See its `summary.md`.
- **App (Rachel):** Next.js 14 + Tailwind 3.4 on Vercel. **Reads the bot's Postgres read-only**; uses Arcade only to refresh expiring image URLs and read order status. Without `DATABASE_URL` it shows demo data.
- **Bot changes needed:** hosted Postgres with a read-only user, `groups.title`, a `checkouts` table, and **View in Core** links. Details and code in [`docs/INTEGRATION.md`](docs/INTEGRATION.md).

## 7. Scope

**In (today):** the full bot flow above; app screens in §5; demo mode in both.

**Out (mention in the pitch):** group orders / one person paying for everyone, choosing variants (size, color), other chat apps, accounts and login, editing a design after it's made.

## 8. Demo plan

1. Demo group with 3–4 phones, bot window size 10, vote duration 30s.
2. Pre-seed a group with 2–3 finished products and one paid order, so Projects and Tracking look alive.
3. Live: send ~10 messages building a joke → bot posts the lore → everyone votes → (cut to a pre-made product while Arcade works) → tap **View in Core** → product page with "From the chat" → **Get yours** → Tracking.
4. Fallback: app demo data (no `DATABASE_URL`) + screen recording of the bot.

## 9. Build timeline (from 1:00)

| Time | Bot (Ekene) | App (Rachel) |
|---|---|---|
| 1:00–2:00 | Live run with real keys; hosted Postgres | Deploy to Vercel; polish screens on demo data |
| 2:00–3:00 | `groups.title`, `checkouts`, View in Core links | Connect `DATABASE_URL`; verify every screen with real data |
| 3:00–4:30 | Demo group seeded; one real paid order | Tracking with a real order; empty and error states |
| 4:30–5:00 | End-to-end run-throughs together | |
| 5:00–6:00 | **Feature freeze.** Pitch deck + 3 run-throughs | |

## 10. Pitch (3 minutes)

1. **Hook:** "Every group chat has lore. Ours has 'the final rose'. Until now, it only lived in the chat."
2. **Demo:** the joke builds in the chat → Core spots it → the group votes → Arcade makes it → View in Core → Get yours → tracking.
3. **Why it works:** AI finds the lore, the group decides, Arcade makes it. Every product is one of a kind and grounded in real messages.
4. **Business:** every group is a demand engine for made-to-order products with zero inventory, and every member sees every product in the chat, so distribution is built in.
5. **Close:** "Shopping 3.0 isn't a store. It's your group chat, made real."

## 11. Risks

| Risk | Mitigation |
|---|---|
| Arcade generation is slow on stage | Pre-made products; cut away during generation |
| Lore is weak or off | Scripted demo conversation; "No" vote shows the group stays in control |
| App can't reach the database | Hosted Postgres + read-only user; demo data fallback |
| Tracking empty | Place one real order before the pitch |
| Privacy concerns | Admin consent with `/resume`, `/pause`, `/delete_data`; only new text messages stored |
