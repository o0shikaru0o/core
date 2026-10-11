# PRD — Core

> **Event:** Shopping 3.0 — AI Commerce Hackathon with Arcade · Sun Oct 11, 10am–6pm
> **Judges:** Kirsten Green (Forerunner), Mariam Naficy (Arcade / Minted), Ash Herr + surprise guests
> **Prizes:** $10k / $5k
> **Builder:** Rachel (fashion design + marketing) · building in Cursor

---

## 1. One-liner

**Core turns your group chat into a design studio. The Core bot listens, designs custom products for the group, and has them made.**

Core creates and manufactures custom designs for groups. The **Core bot** lives in a Telegram group chat. It reads what the group is planning (the event, colors, photos, who needs what, budget), uses Arcade to generate designs and turn them into real products, posts the images back into the chat, and links members to the **Core app**, where they view the group's products, order them, and track manufacturing.

## 2. Problem

- Groups make things together: matching pieces for a wedding party, table linens for a dinner, gifts for a team, merch for a trip. Coordinating it means endless links, screenshots and "which one do you like?" messages.
- The decision already happens in the group chat, but shopping happens somewhere else. What the group said about colors, outfits, budget and taste is lost when someone opens a store tab.
- Off-the-shelf products are generic, and custom design is out of reach for most groups: it takes a designer, a manufacturer, and someone to manage the order.

## 3. Solution / "Shopping 3.0" framing

| Shopping 1.0 | Shopping 2.0 | **Shopping 3.0 (Core)** |
|---|---|---|
| Walk into a store | Search + recommendations | **An agent in your conversation designs the product and has it made** |

The Core bot extracts five inputs from the chat:
1. **Occasion.** What it's for: event, date, formality, setting.
2. **Visual references.** Photos shared in the chat (outfits, venue, colors, inspiration) and descriptions.
3. **Taste.** What members say they like or dislike, and reactions to earlier designs.
4. **What to make.** Products the group asked for, or suggestions that fit the occasion.
5. **Group logistics.** Who it's for, how many of each, budget, deadline.

**Arcade does generation and manufacturing.** It turns a prompt into a design (a "pattern"), turns patterns into manufacturable products, and runs checkout, production and shipping through its maker network.

**Secret sauce:** designer-written **design rules** (§8.4). They turn a chat into a coherent set of designs, the way a stylist or event designer would.

## 4. Target user (for the demo)

**"Priya & Sam's Wedding" group chat:** the couple plus the wedding party, 6 weeks out. They have shared the bridesmaid dress (dusty-rose satin, cowl neckline) and the venue (garden, late summer). The palette is rose, sage and gold. Priya wants bridesmaid earrings "in gold, not too matchy", Sam wants pocket squares for 4 groomsmen, and they need napkins for the welcome dinner. Budget is about $80 per person for the party.

The demo uses both of Arcade's product families: **jewelry** (bridesmaid earrings) and **print** (pocket squares and napkins sharing one pattern).

## 5. Product catalog (what Arcade can make today)

Pulled from `categories/list`. Always fetch categories at runtime; never hardcode category IDs.

| Family (`world`) | Products |
|---|---|
| **print** (a pattern printed on a product; one pattern can go on many products) | Decorative Pillows, Outdoor Decorative Pillows, Floor Pillows, Scarves, Ribbon Scarf, Pocket Squares, Napkins, Placemats, Outdoor Placemats, Tablecloths, Table Runners, Tea Towels, Duvets, Shams, Quilts, Quilted Shams, Curtains, Drum / Tall Drum / Rectangular Lampshades, Fabric By The Yard |
| **jewelry** (the design is the piece itself) | Rings, Dainty Diamond Ring, Dainty Gemstone Ring, Stud Earrings, Dangle Earrings, Dainty Gemstone Earrings, Initial Earrings, Pendant Necklace |

## 6. Scope

### In scope (MVP, today)
- **Core bot in a Telegram group** that:
  - Reads and stores group messages and photos after it joins
  - Responds to `/design` (or an @mention) by extracting a brief from recent messages
  - Generates designs with Arcade and turns them into products
  - Posts the product images into the chat
  - Posts links to the Core app for the group, each product, and each order
  - Posts manufacturing updates into the chat when an order's status changes
- **Core app** (mobile-first web):
  - Browse **all products** or **group chat orders**
  - Group page, product detail with ordering, order tracking
- **Demo mode** with a cached run so the live demo can't fail

### Stretch (if time allows)
- **In-app chat:** the group's Telegram chat mirrored in the Core app; messages sent from the app are relayed into Telegram by the bot

### Out of scope (say it in the pitch, don't build it)
- Other chat platforms (WhatsApp, iMessage, Discord, Slack)
- User accounts and auth (group pages are protected by unguessable links)
- Splitting payment between members (one person checks out for the group)
- Voting on designs inside Telegram
- Editing designs after generation (Arcade supports edit/recolor; v2)

## 7. User flow

1. **Core bot joins the Telegram group** and can read the conversation.
2. **The bot extracts the group's info from the chat** and generates custom designs, which become products in the Core app.
3. **The bot shares links to the Core app** so members can view products and track manufacturing progress.
4. **The bot shares images of what it created** in the group chat.
5. **In the Core app, members view all products or the group chat's orders.**
6. **Stretch: members chat inside the Core app** as well as in Telegram.

```
TELEGRAM GROUP                                       CORE APP (web)
──────────────                                       ──────────────
[T1 Add Core bot] → [T2 Chat as usual] → [T3 /design]
                                             ↓
                              [T4 Reading message]
                                             ↓
                              [T5 Product images] ───link───→ [Group] ⇄ [Product]
                                                                             ↓ Order
                              [T6 "Order placed"] ←──────────────── [Arcade checkout]
                                             ↓                               ↓
                              [T7 Status updates] ───link───→ [Order tracking]
                                                    [All products · Group orders]   [Chat (stretch)]
```

### Telegram side

**T1 — Add Core bot to the group**
- A member adds `@CoreDesignBot` (name TBD) to the group. The bot greets the group:
  *"Hi, I'm Core. Plan as usual: share photos, colors, dates and who needs what. When you're ready, type /design and I'll design it and have it made."*
- The bot registers the group and posts the group's Core app link.
- Telegram only delivers messages sent **after** the bot joins; it cannot read earlier history.

**T2 — The group chats as usual**
- The bot silently stores every text message and photo (sender, text, photo, time).
- It does not reply unless addressed.

**T3 — Trigger a design**
- `/design` uses the conversation since the last design run. The command can include instructions: `/design pocket squares for the groomsmen`.
- An @mention works too: *"@CoreDesignBot can you make napkins for the welcome dinner?"*
- The bot replies at once: *"On it. Reading the chat…"* and shows "typing…".

**T4 — The Reading (key demo moment)**
- The bot posts what it understood, in a designer's voice:
  ```
  OCCASION  Priya & Sam's wedding · Aug 22 · garden, formal
  PALETTE   Dusty rose · sage · gold (from Ana's dress photo)
  TASTE     "Gold, not too matchy" · Mei: no hoops
  MAKING    5 × bridesmaid earrings · 4 × pocket squares · 40 × napkins
  BUDGET    ~$80 per person
  ──────────
  DIRECTION One garden-rose motif across everything. Gold drops for the
            bridesmaids, skip necklaces (the cowl is the statement); the
            motif becomes a sage-and-rose print for squares and napkins.
  ```
- Then: *"Designing now, about 2 minutes…"*
- If the chat doesn't have enough to go on, the bot asks one question instead: *"What's the occasion, and what should I make?"*

**T5 — Product images in the chat**
- One album of product images, each captioned with product name, product type and price.
- Below it, buttons: **View in Core** (group page) and one **Open** button per product.

**T6 — Order placed**
- *"Ana ordered 5 × Garden Rose Drops. Track it in Core →"*

**T7 — Manufacturing updates**
- When the Arcade order status changes, the bot posts the new stage with the product image and a tracking link:
  *"Garden Rose Drops are in production with [maker]."* · *"Pocket squares shipped: [tracking]."*

### Core app side

Screens are listed here at a summary level; the **information architecture (IA)** for the app is the next step and will define navigation and page structure in detail.

- **All products:** every product Core has made, across groups, newest first, with order status badges.
- **Group orders:** products that have been ordered, grouped by group chat, with manufacturing progress.
- **Group page:** one group's latest Reading, its products (by design run) and its orders.
- **Product detail:** images, name, product type, options (size, material), price, design note, **"Why this design"** (quoted chat messages and photos it drew on), quantity picker (defaults to the count from the brief), **Order with Arcade**.
- **Checkout:** Arcade-hosted (`checkoutUrl`); returns to an "Order placed" confirmation.
- **Order tracking:** stage timeline from Arcade order status, maker, line items, totals, shipment tracking.
- **Chat (stretch):** the group conversation, live, with a composer that posts through the bot.

## 8. AI + Arcade pipeline

### 8.1 Step A — Extract a brief from the chat (one Claude call)
**Input:** messages since the last design run (max 100), up to 4 photos from them (downloaded from Telegram, resized to 1024px), the `/design` instruction, and the live Arcade catalog (category names + world).
**Model:** `claude-sonnet-5-5`, photos as base64 image blocks.
**Output (strict JSON, zod-validated, retry once on failure):**

```ts
type ChatBrief = {
  occasion: { summary: string; date?: string; formality: "casual" | "smart" | "cocktail" | "formal" | "black-tie" };
  visuals: { summary: string; palette: string[]; neckline?: string; fabric?: string; sourcePhotoIds: string[] };
  taste: { summary: string; likes: string[]; dislikes: string[]; quotes: { sender: string; text: string }[] };
  items: { categoryName: string; for: string; quantity: number }[];  // must match catalog names
  budgetPerPersonUsd?: number;
  missing: string[];                                                  // e.g. ["what to make"]
};
```

If `items` is empty and the chat didn't ask for anything, the bot suggests 2–3 products that fit the occasion. If the occasion is also missing, it asks a question (T4) instead of designing.

### 8.2 Step B — Design briefs (one Claude call)
**Input:** `ChatBrief` + photos + design rules (§8.4).
**Output:**

```ts
type DesignPlan = {
  direction: string;                 // 1–3 sentences, designer voice, says what to skip
  designs: DesignBrief[];            // one per jewelry item; one shared pattern per print group
};

type DesignBrief = {
  name: string;                      // "Garden Rose Drops"
  world: "jewelry" | "print";
  categoryNames: string[];           // print: every product this pattern goes on; jewelry: exactly one
  quantityByCategory: Record<string, number>;
  designNote: string;                // why it fits THIS group, ≤ 2 sentences
  prompt: string;                    // Arcade pattern prompt
  priceEstimateUsd: [number, number];
};
```

Cap at **3 designs per run** to keep generation time and cost down.

### 8.3 Step C — Generate and build products with Arcade
Run designs in parallel. For each `DesignBrief`:

- **Jewelry:** `patterns/create` with the prompt and the jewelry category → poll `jobs/get` → the result is the piece. (`products/create` refuses jewelry categories.)
- **Print:** `patterns/create` with the prompt → poll `jobs/get` → for each category: `categories/get` with `selections: {}` → if `canManufacture`, pass the **full returned `selections`** to `products/create` → poll `jobs/get` → `productId`.
- `products/get` for images, maker and price.
- **Copy every image into InsForge Storage.** Arcade image URLs are short-lived; Telegram and the app need permanent links.
- Use stable `requestId`s (`{runId}-{designIndex}-{step}`) so retries are safe.

The existing provider interface stays (`DESIGN_PROVIDER=arcade|image|cached`). `image` is a visual-only fallback (no real product); `cached` is demo mode.

### 8.4 Design rules (Rachel to write and refine)

The Step B system prompt combines general rules with per-family rules.

**General (draft):**
1. One idea per group: designs in a run share a motif, palette or story, so they read as a set without being identical.
2. Palette comes from the chat: photos first, then stated colors. Never add an unrelated third color.
3. Formality sets scale and refinement: formal events → refined and restrained; casual → bolder and playful.
4. Taste wins ties: follow what members liked; avoid anything they rejected.
5. Never reproduce a known brand's signature design, logo or trademark.
6. Everything must be manufacturable in the chosen Arcade category.

**Jewelry (from the original PRD, unchanged):**
1. Neckline → placement:
   - Cowl, halter, high neck, turtleneck, heavy embellishment at neck → NO necklace; focus on earrings, rings, or cuffs.
   - Strapless, sweetheart → necklace or collar welcome; statement earrings OR necklace, not both.
   - V-neck → pendant or Y-necklace echoing the V.
   - Square / straight neckline → collar or short geometric necklace.
   - Crew neck → long pendant over the fabric, or earrings only.
2. Fabric → finish:
   - Satin, silk, sequins (high sheen) → polished metal, smooth stones; avoid competing sparkle.
   - Linen, cotton, knits (matte) → texture welcome: hammered metal, raw stones.
   - Busy prints → simple, solid pieces; pull ONE color from the print.
3. Color:
   - Pick metal by the outfit's temperature: warm palettes → gold; cool → silver/platinum; neutrals → follow client taste.
   - Stones may echo the outfit's color (tonal) OR be its complement — never a third unrelated color.
4. Formality → scale & materials:
   - Black-tie/formal → refined materials, elevated scale, one clear statement piece.
   - Casual/brunch → lighter, layered, playful.
5. One hero rule: every look has ONE statement piece. The other designs are alternatives, not a set competing for attention.

**Print (draft, Rachel to write):**
- Scale to the product: small repeats for pocket squares and napkins; larger motifs for tablecloths, duvets, curtains.
- Wearables (scarves, pocket squares) coordinate with the outfits; table and home goods coordinate with the venue.
- Pocket squares should complement, not match, the bridesmaid palette.

### 8.5 Step D — Order and track
- **Order:** `checkouts/create` with `{ productId, quantity }` lines. Set `dropShip: true` when any line has quantity 1 (unless there's an Arcade subscription). Store `checkoutId` and `checkoutUrl`.
- **Track:** a poller calls `orders/get` with `checkoutId` every 60s for open orders. It returns 404 until payment completes, then `status` and `tracking`. On a status change, update the database and post T6/T7 into the group.

**Arcade order status → Core stage:**

| Arcade `status` | Core stage |
|---|---|
| `ordered` | Ordered |
| `cadReview`, `sampleReview` | Design review |
| `inProduction`, `inReview`, `inCorrection`, `approved`, `updatedInfo` | In production |
| `shipped` | Shipped |
| `delivered`, `fulfilled` | Delivered |
| `refunded` | Refunded |

## 9. Telegram integration

**Setup (once):**
1. Create the bot with [@BotFather](https://t.me/BotFather): `/newbot` → name **Core**, username e.g. `CoreDesignBot`. Save the token as `TELEGRAM_BOT_TOKEN`.
2. **Turn privacy mode off:** BotFather → `/setprivacy` → Disable. Otherwise the bot only sees commands and mentions, not the conversation. Do this **before** adding the bot to a group (or remove and re-add it).
3. Create the demo group and add the bot.

**Receiving messages:** a **long-polling worker** (`npm run bot`, using `getUpdates`) runs on the laptop during the hackathon. It needs no public webhook URL and has no serverless time limit during the 1–2 minute Arcade jobs. Move to a webhook after the event.

**Bot API calls:** `getUpdates`, `getFile` (download photos), `sendMessage` (Reading in a `<pre>` block, inline URL buttons), `sendMediaGroup` (product album), `sendChatAction` ("typing…" while generating).

**Library:** `grammy` (TypeScript; handles polling and file downloads).

## 10. Tech stack

- **Next.js 14 (App Router) + TypeScript** for the Core app and its API routes
- **Tailwind CSS 3.4.** **Pin it; do NOT upgrade to v4.**
- **Bot worker:** `grammy`, run with `tsx scripts/bot.ts`; shares `lib/` with the app
- **`@anthropic-ai/sdk`** for extraction and design briefs · **zod** for validation
- **Arcade API** for patterns, products, checkout and orders
- **InsForge**, shared by the bot and the app:
  - **Database:** groups, messages, runs, designs, products, orders
  - **Storage:** bucket `media` for product images and chat photos
  - **Realtime:** live order status and the in-app chat (stretch)
- Deploy the Core app on Vercel or InsForge hosting; QR code on the final pitch slide

### Data model (InsForge Postgres)

```
groups    id, telegram_chat_id (unique), title, slug (unguessable), member_count, created_at
messages  id, group_id, telegram_message_id, sender_name, text, photo_url, source ('telegram'|'app'), created_at
runs      id, group_id, instruction, brief (jsonb), direction, status ('extracting'|'designing'|'done'|'failed'), created_at
designs   id, run_id, group_id, name, world, design_note, prompt, arcade_pattern_id, image_url, created_at
products  id, design_id, group_id, category_name, arcade_category_id, arcade_product_id, selections (jsonb),
          image_url, maker_name, price_usd, suggested_quantity, created_at
orders    id, product_id, group_id, quantity, ordered_by, checkout_id, checkout_url, arcade_order_id,
          status, stage, tracking (jsonb), updated_at
```

Jewelry designs get one `products` row pointing at the pattern itself (no `arcade_product_id`), so the app treats both families the same.

### Env vars (`.env.local`, never commit)
```
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-5-5
DESIGN_PROVIDER=arcade       # arcade | image | cached
IMAGE_API_KEY=               # fallback image provider
ARCADE_API_KEY=
ARCADE_API_BASE=
TELEGRAM_BOT_TOKEN=
NEXT_PUBLIC_APP_URL=         # base for links the bot posts
NEXT_PUBLIC_INSFORGE_URL=
NEXT_PUBLIC_INSFORGE_ANON_KEY=
```

### Code layout
Routes and components follow the IA (next step). Shared code:
```
lib/
  arcade.ts            # Arcade client (exists; extend for print + orders)
  providers/           # arcade | image | cached (exists)
  prompt.ts            # Step A extraction + Step B design prompts
  schema.ts            # ChatBrief, DesignPlan, DesignBrief
  pipeline.ts          # extract → plan → generate → build products → store
  insforge.ts          # SDK client
  telegram.ts          # Reading formatting, album + button helpers
scripts/
  bot.ts               # long-polling worker: store messages, /design, order poller
```

The old single-user screens (`occasion`, `outfit`, `taste`, `reading`, `designs`, `confirmed`), `store.ts` and the swipe deck are retired.

## 11. Design direction

- **Brand:** **Core.** Wordmark in Sansation Bold.
- **Feel:** editorial design studio. Calm, premium, lots of whitespace; the products are the color.
- **Palette:** warm off-white `#F7F4EF` background, ink `#1A1A1A` text, one accent (champagne gold `#B89B5E`), warm grey `#E8E3DB` for surfaces.
- **Type:** serif for headlines (Cormorant Garamond or Playfair Display); Inter for UI.
- **Imagery:** Arcade product renders on neutral backdrops; no stock photos.
- **Bot voice:** short, warm, designer-like. At most one emoji per message.
- Mobile-first at 390px (most members arrive from a Telegram link on their phone); on desktop render inside `PhoneFrame`.

## 12. Demo mode (do not skip)

Venue Wi-Fi is unreliable and Arcade generation takes 1–2 minutes, too long to wait on stage.
1. Before 5pm, run the full flow in the demo group with the wedding script (§4) and keep the run.
2. `/design demo` (or `DESIGN_PROVIDER=cached`) replays the saved Reading and products with realistic pauses (Reading after 3s, album after 8s).
3. Place one real Arcade order before the pitch so order tracking shows a real status.
4. Trigger live first; if images haven't arrived in ~20s, cut to the saved run without comment.

## 13. Build timeline (from 12:00)

| Time | Milestone | Done when |
|---|---|---|
| 12:00–12:45 | IA for the Core app; BotFather setup; InsForge tables + bucket; bot stores messages | IA agreed; demo group messages land in the database |
| 12:45–1:45 | `/design` → extraction (Step A) → Reading message | Real chat → sensible Reading in < 15s |
| 1:45–3:00 | Steps B + C: designs → Arcade patterns → products; album + links posted | Products appear in Telegram with working links |
| 3:00–4:15 | Core app: All products, Group orders, Group page, Product detail, checkout | Ordering from a Telegram link reaches Arcade checkout |
| 4:15–5:00 | Order tracking + status poller + T6/T7 messages; demo mode | Paid order shows its stage in the app and the chat |
| 5:00–6:00 | **Feature freeze.** Pitch deck + 3 run-throughs (in-app chat only if everything above is done) | Pitch fits 3 minutes |

**If behind schedule, cut in this order:** in-app chat → status updates in the chat (keep the tracking page) → "Why this design" quotes → print products (ship jewelry only) → 3rd design.

## 14. Acceptance criteria (MVP)

- [ ] Core bot in a group stores messages and photos sent after it joins
- [ ] `/design` produces a Reading naming the occasion, palette, taste, items and quantities from the chat
- [ ] Bot posts product images into the chat with name, type and price
- [ ] Bot links open the right group, product and order in the Core app
- [ ] Core app shows **All products** and **Group orders**
- [ ] Ordering creates a real Arcade checkout; after payment, tracking shows the Arcade stage
- [ ] At least one jewelry and one print product made in the demo run
- [ ] Demo mode replays a full run in the chat in < 15s
- [ ] No API keys in client code or in the repo

## 15. Pitch (3 minutes)

1. **Hook (20s):** "Every wedding has a group chat. 400 messages about the dress, the colors, the budget, and nobody has ordered anything."
2. **Insight (20s):** "Group purchase decisions already happen in the conversation. So we put the designer and the factory there."
3. **Live demo (90s):** The wedding chat (dress photo, "gold, not too matchy", pocket squares, napkins) → `/design` → **the Reading** (pause on "skip necklaces: the cowl is the statement") → earrings, pocket squares and napkins land in the chat → tap a link → product page with the chat quotes behind it → order → tracking with Arcade's real production stage.
4. **Why it works (20s):** "Designer-written rules turn a messy chat into one coherent collection, and Arcade makes every piece on demand."
5. **Business (20s):** Every group event becomes a multi-product, multi-unit Arcade order: no inventory, high basket size, and every member of the chat sees the designs, so distribution is built in. Next: WhatsApp and iMessage, editing designs from the chat, and a taste profile for each group.
6. **Close (10s):** "Shopping 3.0 isn't a store you visit. It's a design studio in your group chat." QR code to join the demo group.

**Judge angles:**
- *Mariam / Arcade:* a new demand channel that turns conversations into group orders across Arcade's whole catalog, with real tracking.
- *Kirsten / Forerunner:* distribution through existing group chats, a large occasion market (weddings, trips, teams, holidays), and a consumer brand.

## 16. Risks

| Risk | Mitigation |
|---|---|
| Privacy mode left on, so the bot sees nothing | Disable in BotFather before adding the bot; check messages land in the database first thing |
| Bot can't read history from before it joined | Add the bot to the demo group before writing the demo script |
| Arcade generation takes 1–2 min (longer for print: pattern + product jobs) | Reading + "typing…" cover the wait; parallel jobs; demo mode replay |
| Arcade image URLs expire | Copy every image into InsForge Storage before posting |
| A print category can't be made with default options | Retry with `categories/get` choosing `available: true` values; else drop that product and say so in the chat |
| Jewelry prompt rejected by category check (HTTP 400) | Simplify the prompt and retry once; else fall back to another jewelry category |
| Order status only exists after payment | Place one real order before the pitch |
| Extraction misreads the chat | The Reading is posted first, so mistakes are visible; the demo script is unambiguous |
| Members uneasy that the bot reads everything | Greeting says what it stores; it only replies when called |
| Wi-Fi | Demo mode + phone hotspot |

---

### Notes for Cursor
- Build in the order of §13. Get each step working end-to-end before polishing.
- Keep all AI, Arcade and Telegram calls server-side (`app/api/*` and `scripts/bot.ts`).
- Fetch InsForge docs before writing InsForge code.
- Pin Tailwind to 3.4.
- Ask Rachel before changing the design rules in §8.4; they are the product's core.
