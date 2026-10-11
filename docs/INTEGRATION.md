# Core bot ↔ Core app

The bot ([Ekene-Azubuko/core](https://github.com/Ekene-Azubuko/core)) does all the work: it reads the group, finds the lore, runs the vote, makes the product with Arcade and creates checkouts. The app (this repo) is a **read-only window onto the bot's Postgres database**. The bot doesn't call the app, and the app never writes to the bot's tables.

```
Telegram group ⇄ Core bot (Python) ──writes──▶ Postgres ◀──reads── Core app (Next.js, Vercel)
                     │                                                │
                     └── posts "View in Core" links ──────────────────┘
```

## How each app screen gets its data

| App screen | URL | Bot tables it reads |
|---|---|---|
| **Projects**: one card per group | `/` | `groups`, `generated_products` + `lore_proposals` |
| **Project**: the group's products, plus lore being voted on now | `/projects/{chat_id}` | `generated_products`, `lore_proposals` (status `voting` / `generating`) |
| **Product**: image, price, the lore, the chat messages behind it, vote count, **Get yours** | `/projects/{chat_id}/products/{proposal_id}` | `generated_products`, `lore_proposals.lore.evidence_message_ids` → `messages`, `votes` |
| **Tracking**: every "Get yours" checkout and its manufacturing stage | `/tracking`, `/tracking/{checkout row id}` | `checkouts` (**new, see below**) + Arcade `orders/get` |
| **Profile** | `/profile` | placeholder |

"Get yours" in the app opens the bot's existing deep link, `https://t.me/{bot}?start=buy_{proposal_id}`, so membership checks and checkout stay in the bot.

The app refreshes product images itself with Arcade `products/get`, because the stored `image_url` expires after about an hour. Nothing changes in the bot for this.

## What the bot needs to add (small)

### 1. Host Postgres and share a connection URL
The deployed app has to reach the database, so it can't be `localhost`. Neon, Supabase or InsForge all work. Give the app a **read-only** user:

```sql
create role core_app login password '…';
grant connect on database core to core_app;
grant usage on schema public to core_app;
grant select on all tables in schema public to core_app;
alter default privileges in schema public grant select on tables to core_app;
```

### 2. Save the group's name: `groups.title`
Without it every project is called "Telegram group".

```python
# models.py, Group
title = Column(String)
```
Set it whenever a group message or membership update arrives: `group.title = update.effective_chat.title`.

### 3. Save each checkout: new `checkouts` table
Tracking can't work without this, because Arcade only reports order status for a known `checkoutId`.

```python
# models.py
class Checkout(Base):
    __tablename__ = "checkouts"
    id = Column(String, primary_key=True, default=new_id)
    proposal_id = Column(String, ForeignKey("lore_proposals.id", ondelete="CASCADE"), index=True, nullable=False)
    chat_id = Column(BigInteger, ForeignKey("groups.chat_id", ondelete="CASCADE"), index=True, nullable=False)
    buyer_id = Column(BigInteger, nullable=False)
    buyer_name = Column(String, nullable=False)
    arcade_checkout_id = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=now, nullable=False)
```
In `handlers.checkout`, right after `core.arcade.checkout(...)` succeeds, save
`Checkout(proposal_id=proposal_id, chat_id=proposal.chat_id, buyer_id=update.effective_user.id, buyer_name=update.effective_user.first_name, arcade_checkout_id=result["checkoutId"])`.
Only the ID is stored, not the checkout URL, so the "checkout URLs are not stored" rule still holds.

### 4. Link to the app from the bot
Add a second button next to **Get yours** on the product post, and post the project link once after `/resume`:

```python
# keyboards.buy_keyboard
InlineKeyboardButton("View in Core", url=f"{APP_URL}/projects/{proposal.chat_id}/products/{proposal.id}")
# after /resume
f"{APP_URL}/projects/{chat_id}"
```
`APP_URL` is the Vercel URL (new env var on the bot, e.g. `CORE_APP_URL`).

**The app works before any of this.** Missing `title` shows "Telegram group", and a missing `checkouts` table shows an empty Tracking tab.

## Going live: connection checklist

Do these in order. The app keeps working on demo data until step 3.

| # | Who | Step |
|---|---|---|
| 1 | Ekene | Move the bot's database to hosted Postgres (Neon, Supabase or InsForge). Restart the bot against it and check `/status`. |
| 2 | Ekene | Create the read-only `core_app` user (SQL above) and send its connection URL privately. |
| 3 | Rachel | In Vercel → Project → Settings → Environment Variables, set `DATABASE_URL`, `CORE_VISIBLE_CHAT_IDS`, `ARCADE_API_KEY` and `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` (table below). |
| 4 | Rachel | **Redeploy** (Deployments → ⋯ → Redeploy). `NEXT_PUBLIC_` values are built into the page, so a redeploy is required after changing them. |
| 5 | Ekene | Set `CORE_APP_URL` on the bot to the Vercel URL and ship the **View in Core** button (step 4 above). |
| 6 | Ekene | Ship `groups.title` and `checkouts` (steps 2 and 3 above). The app picks them up with no redeploy. |
| 7 | Both | Run the demo script. Check: Projects shows "Wedding party"; **View in Core** opens the right product; "From the chat" shows the round's messages; **Get yours** opens the bot; after paying, Tracking shows a stage. |

### App environment (Vercel)

| Variable | Value |
|---|---|
| `DATABASE_URL` | Read-only URL from step 2. Blank = demo data. |
| `CORE_VISIBLE_CHAT_IDS` | The demo group's Telegram chat ID, e.g. `-1001234567890`. Comma-separate several. **Any group not listed is never shown.** |
| `ARCADE_API_KEY` | The same Arcade account the bot uses (products and orders belong to that account). |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | Bot username without `@`. Blank disables **Get yours**. |

To find the chat ID: `select chat_id, title from groups;` in the bot's database, or open the group in [Telegram Web](https://web.telegram.org) and read the number in the URL.

## Differences from Ekene's `core-app.md`

Ekene's [`core-app.md`](https://github.com/Ekene-Azubuko/core/blob/main/core-app.md) describes a fuller companion app: accounts, Telegram login, a membership check on every page, and code in a `companion/` folder of the bot repo. For the hackathon we're doing a smaller version. Agree on these with Ekene:

| `core-app.md` | This app | Why |
|---|---|---|
| Sign-in plus a Telegram membership check before showing a group | No login; only groups in `CORE_VISIBLE_CHAT_IDS` are shown | Only the consenting demo group is ever visible. Real accounts are post-hackathon. |
| Don't read `messages` or `votes` | Reads the evidence messages and the winning vote count for the product page | "From the chat" and vote counts are central to the demo, and only for the allowlisted group |
| No Arcade credentials in the app | Uses the team's Arcade key, server-side only | Stored image URLs expire after about an hour, and order status only comes from Arcade |
| Code in `companion/` of the bot repo | Separate repo, [o0shikaru0o/core](https://github.com/o0shikaru0o/core) | Already built and deploying; no bot files are touched either way |
| Gallery link at `/groups/<id>` | `/projects/<id>` and `/projects/<id>/products/<proposal_id>` | Use these paths for the bot's buttons |
| No `groups.title` (schema not changed by the app team) | Asks Ekene, as schema owner, to add it | Otherwise every project shows "Telegram group" |

## Rules for both sides

- The bot owns the schema. If a column the app reads changes (see `lib/data.ts`), tell the app side in the same PR.
- Product URLs use `proposal_id` (a random hex ID), and project URLs use the Telegram `chat_id`.
- Order stages come from Arcade `orders/get` `status` and are mapped in `lib/types.ts`.
