# Core — experience direction and full flow

Status: working UX draft. Source: `PRD.md`, `docs/INTEGRATION.md`, and the current Next.js routes. This document defines the experience before screen design or implementation.

## Product promise

**A shared joke becomes an object your group can hold.** Core should make the transition from chat memory to physical product feel personal, surprising, and credible. The product image earns attention; the story and real chat evidence give it meaning; a clear purchase and production path give it trust.

## Experience principles

1. **Object first.** Show the finished product at generous size, with natural proportions, strong crop control, and a quiet surrounding surface. Avoid decorative UI over the image.
2. **Story close to object.** The lore and source messages should be one short scroll from the image. The product should never feel like generic merch.
3. **Group agency.** Make the vote, the choice of product type, and the ability to say No understandable. Core proposes; the group decides in Telegram.
4. **Honest commerce.** Show the real unit price, state that shipping and tax are extra, identify where checkout happens, and distinguish a created checkout from a paid order.
5. **Calm motion.** Transitions can make product discovery feel tactile, but status, payment, and navigation must remain quick and predictable. Respect reduced motion.
6. **Private by design.** The app may be opened by a link; chat quotes and order information need an access model before public deployment. The current PRD excludes accounts, so this is a product decision, not merely visual polish.

## Primary journeys

### A. First group setup

1. An admin adds Core to a Telegram group and sends `/resume`.
2. The bot explains that only new text messages are considered and gives `/pause` and `/delete_data` controls.
3. The bot posts a **View your Core** link to the group page.
4. The linked group page starts with a welcoming empty state: the group name, a clear explanation of what will appear, and a link back to Telegram. Do not fabricate products in live mode.

**Success:** members know what Core does and where to return after a product is made.

### B. Lore becomes a product

1. The group chats normally. The bot spots a candidate and posts a short, specific description with evidence.
2. The bot offers three real Arcade product types and **No**. The vote remains in Telegram for the initial release.
3. A Core group page opened during voting shows a quiet **In the making** section: the lore, state, and a button to return to the Telegram vote. It must not imply the design is final.
4. Once the group chooses a category, the group page changes to **Designing your product**. Explain that a render may take time; existing products remain available.
5. When Arcade returns a product, the bot posts its image, price, **Get yours**, and **View in Core**. The Core link opens directly to the new product page.

**Success:** users can follow the idea from a familiar message to a tangible object without losing context.

### C. Product discovery and purchase

1. Deep link lands on the product, not a generic home screen.
2. First viewport: large image, product name, category, price, and a single clear action. Keep the image visible before asking for commitment.
3. Next: **The story** in one short sentence, then a small set of cited **From the chat** messages. Show the group’s chosen product type and vote count as supporting details.
4. **Get yours** opens the bot’s private chat. The bot confirms group membership and creates that member’s Arcade checkout.
5. Arcade handles payment. Core should explain that payment occurs there and that each member orders separately.
6. Returning from checkout should lead to the product or tracking view. The app should handle an unpaid checkout distinctly from a paid order.

**Success:** a member can understand why this product exists, its cost, and where payment happens in seconds.

### D. Production and delivery

1. Tracking lists orders with product image, product name, group, buyer, and the current stage.
2. Order detail leads with the current stage and a human explanation, followed by the full timeline: Ordered → Design review → In production → Shipped → Delivered.
3. Where present, show the maker and shipment link. If payment is pending, say so. If refunded, show a distinct terminal state.
4. If Arcade status is temporarily unavailable, show the last verified status with a clear freshness label rather than silently claiming that payment is pending.

**Success:** a buyer understands what is happening now and what happens next.

## Information architecture

| Destination | Job | Recommended hierarchy |
|---|---|---|
| **Projects** `/` | Enter a group collection | Wordmark → group collections with an image led cover → product count and current activity |
| **Group** `/projects/{chat_id}` | See what this group has made | Group identity → current vote or generation → featured recent product → product collection |
| **Product** `/projects/{chat_id}/products/{proposal_id}` | Fall in love with and understand one object | Full bleed product image → name and price → action → lore and evidence → production details |
| **Tracking** `/tracking` | Find an order | Active orders first → current stage in words → completed history |
| **Order** `/tracking/{id}` | Understand progress | Current status → next step → timeline → maker and shipment → linked product |
| **Profile** `/profile` | Support and account context | For this release, a truthful informational page with connected groups and privacy/help links; do not imply shipping or payment settings work in Core |

Keep the existing three navigation destinations for now. On product and order pages, let the object and status dominate; the global navigation can remain but should not compete with the primary action or safe areas.

## Screen details and edge states

### Projects

- Use one strong lead image per group. A restrained collage is useful only when the group has multiple visually distinct products.
- Group name should be the largest text after the product imagery. Product count is secondary.
- Empty group: explain that Core is listening only after consent, then send members back to the Telegram group.
- Multiple groups: keep scan rhythm stable and avoid repeating heavy rounded cards within cards.

### Group

- Give the newest product a larger editorial tile and put the rest in a simple image grid.
- A voting or generating state is a compact live chapter above the collection, with state wording and the relevant Telegram action.
- Show an explicit image fallback if Arcade’s signed image URL expires or cannot be refreshed. Preserve product name and story so the collection remains useful.

### Product

- Prefer a single hero image with the full object visible. If the source image is a pattern or print swatch, label it honestly as a design preview and consider a contextual product mockup when one exists.
- Use a sticky purchase action only after the initial in-flow action scrolls away. Avoid two simultaneous dominant buttons.
- Story order: one-line lore → brief explanation → cited messages. Quotes need sender attribution and should remain compact.
- Price copy: **$X each** and **Shipping and tax calculated at checkout**.
- Never expose the entire group transcript; show only the evidence messages attached to this product.

### Tracking and order

- Group orders by active and completed, with stage text visible without opening each row.
- Use a linear timeline for a paid order. Pending payment and refund need their own state treatment.
- An empty list should point to the product collection. Missing checkout data should not be presented as proof of no purchases.

## Visual direction

**Apple inspired restraint with a subtle cosmic atmosphere.** The interface should feel precise and material, while product photography provides most of the color. The cosmic quality comes through depth, soft light, dark ink, and occasional luminous transitions, not star fields or gradients on every surface.

### Apple Store reference translation

The current Core UI pass borrows three visible patterns from [Apple Store's For You screen](https://mobbin.com/screens/ba37bf1c-39bb-4053-ac6c-7882855f82c8), [Apple Store's accessory product card](https://mobbin.com/screens/ef2ee2e4-ea3b-4a38-918e-7e813e746ce7), and [Apple Store's purchase detail](https://mobbin.com/screens/ede2c428-cb98-4a7b-bf18-289a7c076846): generous imagery on a quiet light surface, a direct heading and price hierarchy, and a persistent primary purchase action. Core uses those patterns for group creations and keeps the lore and source chat messages close to each object. These are pattern references, not screens to copy one for one.

**Core screen path:** Projects → group collection → product detail → Telegram bot handoff → Arcade checkout → Tracking → order detail. The Telegram vote and product reveal remain external entry points that deep link into the relevant Core screen. Empty group, vote in progress, design in progress, unavailable checkout, and order stage variations are states of these screens rather than extra navigation destinations.

- **Surface:** warm white or near black, chosen per screen or theme. Avoid the current gray desktop canvas and simulated phone bezel in the shipped web experience.
- **Type:** one clean sans family for UI; optional editorial face only for brief story moments. Product names and prices remain legible at mobile size.
- **Color:** neutral structure plus one muted spectral accent for focus or progress. Do not tint product imagery.
- **Shape:** modest radii on controls; images can use a larger radius where it helps the collection. Reduce nested pills and card borders.
- **Motion:** subtle image reveal, short shared continuity between grid and detail where performance allows, and a calm stage change. No motion should delay checkout.
- **Images:** reserve dimensions to prevent layout shift; generate suitable image sizes; preserve aspect ratio; avoid forced square crops for non-square objects; use a good fallback and only load the hero eagerly.
- **Accessibility:** readable contrast, 44px touch targets, descriptive image alt text, visible focus, semantic headings, and reduced motion support.

## UI library decision

**Recommended foundation:** keep Next.js 14, React 18, and the repository’s Tailwind 3.4. Use the existing `next/image` for local imagery. Build a small Core component layer (navigation, image frame, product tile, primary action, status timeline). Add **Radix Primitives** only when a real interaction needs a dialog, popover, or other complex accessible behavior. Radix is unstyled, so Core retains full control of the visual language. The app already includes Framer Motion; use it sparingly for transitions instead of introducing a second motion system.

**Why this stack:** most Core surfaces are images, links, and status, not complex forms. A large pre-styled kit would impose card, input, and dashboard patterns that work against the editorial product presentation. The existing stack is enough to build the flow while keeping bundle and design overhead controlled.

**Alternative:** Base UI is another unstyled accessible primitive set compatible with Tailwind. Pick one primitive family after the first interactive component is specified; do not mix Base UI and Radix for the same patterns. shadcn/ui can accelerate internal tools, but for the customer-facing Core surfaces its defaults should be heavily restyled, so it is not the starting point.

## Priority and sequence

1. Resolve access and privacy for group links, chat quotes, and order visibility.
2. Lock a single hero product page as the visual benchmark, using real Arcade image shapes.
3. Design the group collection and its voting, generating, empty, and image failure states.
4. Design purchase handoff copy and tracking states.
5. Apply the component language across Projects and Profile.
6. Compare Mobbin references once connected, selecting examples for image galleries, product detail, checkout handoffs, and tracking. Borrow interaction patterns, not surface decoration.

## Decisions to confirm after the flow review

- Are Core links public, restricted to Telegram group members, or protected by a share token? This determines whether product quotes and buyer names can be shown.
- Is the target primarily Telegram’s in-app browser, mobile Safari/Chrome, or both? Test the primary action and safe areas accordingly.
- Should the visual baseline be warm light, cinematic dark, or adaptive? The imagery should decide after reviewing actual Arcade renders.
- Can Arcade supply contextual product mockups as well as design previews? The current demo imagery includes prints and jewelry, which need different crops and captions.
- Does Profile have real connected group, shipping, and payment data? If not, replace the current pretend controls with useful privacy and support content.

## Current implementation observations

- The routes and data model cover the PRD’s main app screens, but the presentation is mostly repeated rounded cards and square images. The strongest change is hierarchy and image treatment, not a library swap.
- `components/PhoneFrame.tsx` draws a device bezel on desktop; that is useful for demos but constrains a responsive web experience.
- The product CTA points to Telegram as specified. The current screen does not explain the private bot → Arcade checkout handoff.
- `app/profile/page.tsx` contains placeholder identity and settings that appear functional. Replace or label these before a public release.
- `lib/data.ts` treats a failed Arcade order lookup as awaiting payment. The tracking UI needs an unknown or temporarily unavailable state to avoid a false status.
- `README.md` describes an unrelated jewelry app and stale shared contracts. Update it when this UX direction is approved.
