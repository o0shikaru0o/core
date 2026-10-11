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

## App environment

```
DATABASE_URL=                       # read-only URL from step 1; blank = demo data
ARCADE_API_KEY=                     # same Arcade account as the bot
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=  # bot username without @
```

## Rules for both sides

- The bot owns the schema. If a column the app reads changes (see `lib/data.ts`), tell the app side in the same PR.
- Product URLs use `proposal_id` (a random hex ID), and project URLs use the Telegram `chat_id`.
- Order stages come from Arcade `orders/get` `status` and are mapped in `lib/types.ts`.
