# Demo script: "Wedding party"

Telegram group **Wedding party**: **Rachel** (bridesmaid), **Chai** and **Ekene** (groomsmen), plus Core. Their friends **Maya & Theo** are getting married.

The bot reads every message but only acts when someone **@mentions it with instructions**. Replace `@CoreBot` below with the bot's real username.

Two rounds, two products:

| Round | Lore | Trigger | Vote for | Who taps "Get yours" |
|---|---|---|---|---|
| 1 | Maya's "peony or nothing" rule | Rachel: *@CoreBot make peony earrings for the bridesmaids* | **Dangle Earrings** | Rachel |
| 2 | Theo and Maya met rescuing a duck | Chai: *@CoreBot make duck pocket squares for me and Ekene* | **Pocket Squares** | Chai and Ekene (one each) |

## Before you start

- Ekene's @mention change is running, and an admin has sent `/resume`. Messages from before that aren't stored.
- `VOTE_DURATION_SECONDS=30`.
- Send the lines as plain text, in order, a few seconds apart.
- Finish round 1's vote before starting round 2.

## Round 1: earrings

| # | Who | Message |
|---|---|---|
| 1 | Chai | Maya just called. the florist only has ranunculus 😬 |
| 2 | Rachel | oh no. she said peony or nothing |
| 3 | Ekene | "peony or nothing" is basically on the save the date |
| 4 | Rachel | she made me promise the bridesmaids would have peonies too |
| 5 | Chai | peony earrings for the bridesmaids. problem solved |
| 6 | Ekene | gold peonies. she'll cry |
| 7 | Rachel | small and dangly though, I'm wearing my hair up |
| 8 | Chai | Maya's peony obsession will outlive us all |
| 9 | Ekene | peony or nothing 🌸 |
| 10 | Rachel | **@CoreBot make peony earrings for the bridesmaids** |

**Bot:** "On it 👀" → **"New lore unlocked"** with the lore, why it was picked, and earring options + No.
**Vote:** all three tap **Dangle Earrings** within 30 seconds. A tie goes to No.
**Then:** Rachel taps **Get yours** on the earrings post.

## Round 2: pocket squares

| # | Who | Message |
|---|---|---|
| 1 | Ekene | Theo practiced his toast on me again. it's 80% about the duck |
| 2 | Chai | THE DUCK. how they met. we know |
| 3 | Rachel | to be fair, rescuing a duck on a first date is elite |
| 4 | Ekene | he wants the groomsmen to quack during the toast |
| 5 | Chai | I'm not quacking. I'll wear a duck though |
| 6 | Rachel | matching duck pocket squares for you two |
| 7 | Ekene | little ducks on navy so it's still classy |
| 8 | Rachel | Maya will pretend to hate it and secretly love it |
| 9 | Chai | **@CoreBot make duck pocket squares for me and Ekene** |

**Vote:** all three tap **Pocket Squares**.
**Then:** Chai and Ekene each tap **Get yours**, so each gets their own checkout.

## What the audience sees

1. The group chats about the wedding → someone @mentions Core with what they want.
2. Core posts the lore it found and the vote → everyone votes.
3. Arcade makes the product. This takes a few minutes, so cut to the copy made earlier.
4. The bot posts the image, price, **Get yours** and **View in Core**.
5. **View in Core** → the product page shows the lore, the messages above under "From the chat", and "3 votes for Dangle Earrings".
6. **Tracking** → Rachel's earrings and both pocket-square orders, each with its manufacturing stage.

## Pre-record before the pitch

- Run both rounds once before 5pm, so you have finished earrings and pocket squares to show while the live ones generate.
- Pay for at least one checkout, so Tracking shows a real stage instead of "Awaiting payment".
- Screen-record the Telegram side as a Wi-Fi backup.

## If something goes wrong

| What you see | Do this |
|---|---|
| No "On it 👀" after the @mention | Check the username is spelled exactly, and that the bot is running. |
| Bot says it found no lore | Send a couple more lines on the joke, then @mention it again. |
| Vote doesn't offer earrings or pocket squares | Make the instruction name the product ("earrings", "pocket squares"); ask Ekene to check the category matching. |
| "No" wins | Someone voted No, or there was a tie. Repeat the round and vote together. |
| Generation fails | An admin sends `/retry`. |
| App shows "Telegram group" instead of "Wedding party" | `groups.title` isn't saved yet (`docs/INTEGRATION.md`, step 2). |
