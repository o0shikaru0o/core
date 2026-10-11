# PRD — Gaise Jewelry (working name)

> **Event:** Shopping 3.0 — AI Commerce Hackathon with Arcade · Sun Oct 11, 10am–6pm
> **Judges:** Kirsten Green (Forerunner), Mariam Naficy (Arcade / Minted), Ash Herr + surprise guests
> **Prizes:** $10k / $5k
> **Builder:** Rachel (fashion design + marketing) · building in Cursor

---

## 1. One-liner

**Show us what you're wearing and what you love — we'll design the jewelry that doesn't exist yet.**

The user takes photos of an outfit for a specific occasion, swipes through jewelry styles to show their taste, and gets 2–3 **custom jewelry designs**. Each design comes with a stylist's explanation and can be ordered through Arcade, which has it made on demand by its vetted makers.

## 2. Problem

- Accessorizing is the last and hardest step of getting dressed. People own an outfit for an event and can't find jewelry that fits **both the outfit and their own taste**.
- Today's shopping is search: endless scrolling, generic results, and the same pieces everyone else owns.
- Stylists solve this, but they're expensive and unavailable to most people.

## 3. Solution / "Shopping 3.0" framing

| Shopping 1.0 | Shopping 2.0 | **Shopping 3.0 (us)** |
|---|---|---|
| Walk into a store | Search + recommendations | **Generate the exact piece, made for you** |

Three inputs drive the design:
1. **Occasion.** What the jewelry is for (formality, setting).
2. **Outfit.** What it has to work with (color, neckline, fabric, silhouette).
3. **Taste.** What the user actually likes to wear (from the swipe step).

**Secret sauce:** a set of professional **styling rules** (neckline → jewelry placement, fabric sheen → metal finish, formality → scale) written by a fashion designer and built into the AI. The output is jewelry a stylist would choose, not just something pretty.

## 4. Target user (for the demo)

"Maya, 29, wedding guest in 3 weeks." She has the dress and nothing to wear with it. She doesn't want fast-fashion earrings that a dozen other guests will also have on, and she has a budget of about $80–$250.

## 5. Scope

### In scope (MVP, today)
- Mobile-first web app with a phone-shaped frame on desktop
- Occasion picker
- Upload of 1–3 outfit photos (camera on mobile)
- Taste swipe deck of about 12 jewelry style cards
- AI "Reading" screen that shows the reasoning
- 2–3 generated jewelry designs with image, name, piece type, materials, stylist note and price
- "Make it" / order handoff to Arcade
- **Demo mode** with cached results so the live demo can't fail

### Out of scope (say it in the pitch, don't build it)
- Full closet upload or a wardrobe that learns over time ("v2: designs that work across 10 of your outfits")
- User accounts and auth
- Saved history and a database
- Native iOS/Android app
- Apparel or other categories

## 6. User flow & screens

```
[1 Landing] → [2 Occasion] → [3 Outfit upload] → [4 Taste swipe] → [5 Reading] → [6 Designs] → [7 Design detail / Order] → [8 Confirmation]
```

### Screen 1 — Landing
- Wordmark **Gaise** (Sansation Bold), tagline: *"The jewelry your outfit is missing — designed for you."*
- CTA: **Start styling**
- Small link: "See a demo look" (enters demo mode)

### Screen 2 — Occasion
- Title: "What's the occasion?"
- Chips: Wedding guest · Work dinner · Date night · Gala / black tie · Brunch · Vacation · Custom (free-text)
- Optional: "When?" date field (decorative, but adds realism: "in 3 weeks")
- Next is enabled once one is selected

### Screen 3 — Outfit upload
- Title: "Show us the outfit"
- 1–3 photo slots. `<input type="file" accept="image/*" capture="environment">` on mobile
- Hint text: "Try it on, or lay it flat. Good light helps."
- Thumbnails with remove (×)
- **Resize client-side to max 1024px longest side, JPEG ~0.85** before upload (speed + API limits)

### Screen 4 — Taste swipe
- Title: "What do you love wearing?"
- Card stack of 12 style cards. Swipe right = love, left = pass. Also show ♥ / ✕ buttons for desktop
- Progress "4 / 12"
- Each card: full-bleed image + style name. Images are generated once ahead of time and stored in `/public/styles/`
- Can finish early after 6 swipes ("That's enough, show me →")

### Screen 5 — The Reading (key demo moment)
- Loading state reveals the analysis line by line (typewriter / staggered fade), so it feels like a stylist thinking:
  ```
  OUTFIT    Emerald satin · cowl neckline · bias-cut midi
  OCCASION  Evening wedding · formal
  TASTE     Sculptural · warm metals · statement over dainty
  ──────────
  DIRECTION Elongated gold drops; skip the necklace — the cowl is the statement.
  ```
- Then: "Designing your pieces…" while images generate
- This screen must look good even while slow. It covers the latency.

### Screen 6 — Designs
- 2–3 cards, each showing:
  - Generated image (on a neutral backdrop)
  - Name (e.g. "Emerald Hour Drops")
  - Piece type + materials ("Drop earrings · 14k gold vermeil · green onyx")
  - **Stylist note** (1–2 sentences on why it works with *this* outfit + *this* taste)
  - Price (from Arcade if available, otherwise an estimate range)
- Action per card: **Make it** · secondary: **Refine** (optional stretch: free-text tweak → regenerate)

### Screen 7 — Design detail / Order
- Large image, full details, the outfit thumbnail beside it ("styled with your look")
- **Order with Arcade** button: see §9 for the integration paths
- Copy: "Made on demand by an independent maker · ships in ~X weeks"

### Screen 8 — Confirmation
- "Your piece is being made." Recap and share button (copy link)

## 7. Taste style cards (the 12)

Each card has an `id`, a display `name`, and `tags` fed to the AI.

| id | Name | Tags |
|---|---|---|
| `sculptural-gold` | Sculptural Gold | organic shapes, chunky, warm metal, statement |
| `delicate-layers` | Delicate Layers | fine chains, layering, dainty, minimal |
| `pearl-modern` | Modern Pearl | pearls, asymmetric, contemporary |
| `vintage-estate` | Vintage Estate | antique cuts, filigree, heirloom, ornate |
| `minimal-silver` | Minimal Silver | clean lines, cool metal, geometric, quiet |
| `bold-color` | Bold Color | colored stones, enamel, playful, saturated |
| `art-deco` | Art Deco | geometric symmetry, baguettes, 1920s glamour |
| `boho-natural` | Boho Natural | raw stones, hammered metal, earthy, textured |
| `statement-hoops` | Statement Hoops | oversized hoops, bold scale |
| `celestial` | Celestial | stars, moons, whimsical, fine |
| `brutalist` | Brutalist | raw, architectural, heavy, mixed metal |
| `classic-diamond` | Classic Sparkle | solitaires, tennis, timeless, refined |

> **Rachel:** edit these to match your taste and what Arcade can actually make.

## 8. AI pipeline

### 8.1 Step A — Read + brief (one vision call)
**Route:** `POST /api/analyze`
**Input:** `{ occasion: string, date?: string, photos: base64[], liked: StyleId[], passed: StyleId[] }`
**Model:** Claude (`claude-sonnet-5-5` for speed; `claude-opus-5-5` if quality matters more than latency) via `@anthropic-ai/sdk`, images passed as base64 image content blocks.
**Output (strict JSON):**

```ts
type Analysis = {
  outfit: {
    summary: string;          // "Emerald satin · cowl neckline · bias-cut midi"
    colors: string[];         // ["emerald", "deep green"]
    neckline: string;         // "cowl"
    fabric: string;           // "satin"
    silhouette: string;       // "bias-cut midi"
    formality: "casual" | "smart" | "cocktail" | "formal" | "black-tie";
  };
  occasion: { summary: string };        // "Evening wedding · formal"
  taste: { summary: string; keywords: string[] };  // "Sculptural · warm metals · statement over dainty"
  direction: string;                    // 1 sentence, stylist voice, includes what to SKIP
  designs: DesignBrief[];               // exactly 3
};

type DesignBrief = {
  name: string;               // "Emerald Hour Drops"
  pieceType: "earrings" | "necklace" | "ring" | "bracelet" | "brooch";
  materials: string;          // "14k gold vermeil, green onyx"
  stylistNote: string;        // why it works with THIS outfit + taste, ≤ 2 sentences
  imagePrompt: string;        // detailed prompt for the product image / Arcade
  priceEstimateUsd: [number, number];
};
```

**Validation:** parse with zod. On failure, retry once with "Return only valid JSON."

### 8.2 System prompt (draft — Rachel to refine the styling rules)

```
You are a senior fashion stylist and jewelry designer. You design custom jewelry that completes a specific outfit for a specific occasion, matched to the client's personal taste.

Analyze the outfit photos, the occasion, and the client's liked/passed jewelry styles. Then propose exactly 3 custom jewelry designs.

STYLING RULES (follow strictly):
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
6. Taste wins ties: when rules allow several options, choose what matches the client's liked styles; avoid anything resembling passed styles.
7. Never reproduce a known brand's signature design, logo, or trademark.

Designs must be physically manufacturable by an artisan jeweler (realistic materials, sizes, settings).
imagePrompt: describe a single jewelry piece as a luxury product photograph on a neutral warm-grey backdrop, soft studio light, sharp focus, no model, no hands, no text.

Return ONLY JSON matching the schema.
```

### 8.3 Step B — Generate design images
**Route:** `POST /api/generate` → `{ briefs: DesignBrief[] }` → `{ designs: Design[] }`

`Design = DesignBrief & { imageUrl: string; arcadeId?: string; priceUsd?: number }`

Run the 3 generations **in parallel**. Wrap the provider behind one interface:

```ts
interface DesignProvider {
  generate(brief: DesignBrief): Promise<{ imageUrl: string; arcadeId?: string; priceUsd?: number }>;
}
```

Implementations, in order of preference:
1. **`ArcadeProvider`**: if the hackathon gives API access, use Arcade to create the design (it returns a real, makeable product + price).
2. **`ImageModelProvider`** (fallback): any image model (e.g. OpenAI `gpt-image-1`, Replicate FLUX, Gemini image) using `imagePrompt`. Price is the estimate range.
3. **`CachedProvider`** (demo mode): returns pre-saved images from `/public/demo/`.

Select it with env var `DESIGN_PROVIDER=arcade|image|cached`.

## 9. Arcade integration (resolve in the first 45 minutes)

Unknowns. Ask the Arcade team first thing:
- [ ] Is there an API / SDK for hackathon teams? Auth method? Rate limits?
- [ ] Can we create a design from a text prompt and/or reference image programmatically?
- [ ] Does it return a price + product ID? Can we create a checkout / order link?
- [ ] Which jewelry types and materials are supported (earrings, rings, necklaces, metals, stones)?
- [ ] Turnaround time for generation (seconds? minutes?)

**Integration paths (pick based on answers):**
- **Path A — Full API:** generate via Arcade → show their render + price → "Order with Arcade" creates the order / checkout link.
- **Path B — Order-only / deep link:** generate images ourselves → "Make it with Arcade" opens Arcade with the prompt pre-filled (or copies the prompt and opens arcade).
- **Path C — No access:** generate ourselves, show "Order with Arcade" → a mocked confirmation. Be honest in the pitch: "Arcade integration is the next step." Judges include Arcade's CEO, so clearly state what's real.

> Note: "Arcade API" search results often show **arcade.dev**, an unrelated AI-agent tooling company. Make sure the docs are for Arcade the product platform (Mariam Naficy's company).

## 10. Tech stack

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS 3.4**. **Pin it; do NOT upgrade to v4.** (`"tailwindcss": "3.4.x"` in package.json)
- **`@anthropic-ai/sdk`** for the vision + brief step
- **zod** for JSON validation
- **framer-motion** for the swipe deck + the Reading reveal (optional; CSS is fine)
- **No database, no auth.** Keep flow state in a React context / `zustand` store held in memory on the client
- Deploy: **Vercel** (QR code on the final pitch slide)

### Env vars (`.env.local`, never commit)
```
ANTHROPIC_API_KEY=
DESIGN_PROVIDER=image        # arcade | image | cached
IMAGE_API_KEY=               # fallback image provider
ARCADE_API_KEY=              # if provided
ARCADE_API_BASE=
```

### Suggested file structure
```
app/
  page.tsx                 # Landing
  occasion/page.tsx
  outfit/page.tsx
  taste/page.tsx
  reading/page.tsx
  designs/page.tsx
  designs/[i]/page.tsx     # Detail / order
  confirmed/page.tsx
  api/analyze/route.ts
  api/generate/route.ts
lib/
  store.ts                 # flow state
  styles.ts                # the 12 style cards
  prompt.ts                # system prompt + schema
  providers/{arcade,image,cached}.ts
  resizeImage.ts
components/
  PhoneFrame.tsx           # centers a ~390px frame on desktop
  SwipeDeck.tsx
  ReadingReveal.tsx
  DesignCard.tsx
public/
  styles/*.jpg             # 12 taste images
  demo/                    # cached demo outfit + results
```

## 11. Design direction

- **Feel:** editorial fashion magazine meets fine jewelry counter. Calm, premium, lots of whitespace.
- **Palette:** warm off-white `#F7F4EF` background, ink `#1A1A1A` text, one accent (champagne gold `#B89B5E`), warm grey `#E8E3DB` for surfaces.
- **Type:** Sansation Bold for the wordmark; a serif for headlines (e.g. Cormorant Garamond or Playfair Display); a clean sans for UI (Inter).
- **Imagery:** product shots on neutral backdrops; no stock-photo models.
- **Motion:** slow, confident fades. The Reading reveal is the one dramatic moment.
- Mobile-first at 390px; on desktop render inside `PhoneFrame` with a soft shadow.

## 12. Demo mode (do not skip)

Live AI demos fail on bad venue Wi-Fi. Before 5pm:
1. Run the full flow on **2 prepared outfits** (e.g. emerald satin evening dress; white linen vacation set).
2. Save the `Analysis` JSON + generated images to `/public/demo/`.
3. `?demo=1` or the "See a demo look" link loads these instantly, but **still plays the Reading animation** so it looks live.
4. Plan: try live first; if it takes over ~10s, switch to demo mode without comment.

## 13. Build timeline (today)

| Time | Milestone | Done when |
|---|---|---|
| 10:00–10:45 | Arcade Q&A (§9), scaffold app, deploy empty app to Vercel | URL loads |
| 10:45–12:30 | Screens 1–4 + store + PhoneFrame + style cards | Can click through to Reading with state kept |
| 12:30–2:30 | `/api/analyze` + prompt + zod, Reading screen | Real photo → sensible Reading in < 15s |
| 2:30–4:00 | `/api/generate` + provider(s), Designs + Detail screens | 3 designs with images render |
| 4:00–5:00 | Order flow, polish, demo mode, cache 2 demo outfits | Full flow works end-to-end in demo mode |
| 5:00–6:00 | **Feature freeze.** Pitch deck + 3 run-throughs | Pitch fits 3 minutes |

**If behind schedule, cut in this order:** Refine button → Confirmation screen → date field → 3rd design (ship 2).

## 14. Acceptance criteria (MVP)

- [ ] Works on a phone browser (camera opens for upload) and on desktop (phone frame)
- [ ] Occasion + ≥1 photo + ≥6 swipes required before analysis
- [ ] Reading shows outfit, occasion, taste and direction, and the direction follows the neckline rule (e.g. cowl → no necklace)
- [ ] 2–3 designs, each with image, name, type, materials, stylist note and price
- [ ] "Order with Arcade" does the best available path from §9
- [ ] Demo mode loads in < 2s and runs the whole flow
- [ ] No API keys in client code or in the repo

## 15. Pitch (3 minutes)

1. **Hook (20s):** "You found the dress. Now you need earrings — and you'll scroll 400 products and settle for what everyone else is wearing."
2. **Insight (20s):** "Jewelry is the most personal part of an outfit, and the least personalized part of shopping. Stylists fix this, but most people don't have one."
3. **Live demo (90s):** Occasion → photo of the dress → swipe taste → **the Reading** (pause on "skip the necklace — the cowl is the statement") → 3 custom designs → Make it with Arcade.
4. **Why it works (20s):** "The design isn't random. It's built on real styling rules written by a fashion designer: neckline, fabric, formality, taste."
5. **Business (20s):** Every purchase is a new, made-to-order product on Arcade, with no inventory and high margins. Next: learn the whole closet and design pieces that work with 10 outfits, not one. Gifting: "design for her look."
6. **Close (10s):** "Shopping 3.0 isn't finding the right thing. It's making it." QR code to try it.

**Judge angles:**
- *Mariam / Arcade:* personalization at scale, plus a new demand engine that sends made-to-order jewelry to Arcade's makers.
- *Kirsten / Forerunner:* a large everyday occasion market, a defensible taste profile that improves over time, and a consumer brand story.

## 16. Risks

| Risk | Mitigation |
|---|---|
| Arcade API unavailable or limited | Provider abstraction + Paths B/C; be clear about what's real |
| Outfit read is wrong | Test early with real clothes; ask for good light; show the Reading so errors are visible and charming, not hidden |
| Image generation slow | Parallel calls; Reading animation covers latency; demo mode |
| Designs look generic / Etsy-ish | Strong `imagePrompt` template (product photography, neutral backdrop); styling rules; curated taste cards |
| Wi-Fi | Demo mode + phone hotspot |

---

### Notes for Cursor
- Build in the order of §13. Get each step working end-to-end before polishing.
- Keep all AI calls server-side in `app/api/*`.
- Pin Tailwind to 3.4.
- Ask Rachel before changing the styling rules in §8.2; they are the product's core.
