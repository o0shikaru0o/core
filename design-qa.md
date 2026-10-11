# Core design QA

## Reference and scope

- Reference: the Apple Store Products screen in the user-provided composite screenshot (1084 × 610), plus [Mobbin's Apple Store For You screen](https://mobbin.com/screens/ba37bf1c-39bb-4053-ac6c-7882855f82c8).
- Implementation: Core's local prototype at `http://127.0.0.1:3000`, reviewed at a 390 × 844 mobile viewport and in a desktop side-by-side comparison.
- Design direction: generous space, large product imagery, clear type hierarchy, quiet neutral surfaces, compact navigation, and a single prominent action. Core's content and brand remain distinct from Apple's.

## Review

| Area | Result |
| --- | --- |
| Projects → group → product journey | Passed: cards and product images lead clearly to the next screen. |
| Product hierarchy | Passed: hero image, product name, price, story, and action appear in a readable sequence. |
| Tracking and order detail | Passed: current state and milestones are visible without relying on color alone. |
| Profile and empty states | Passed: available functionality is described accurately. |
| Mobile layout | Passed at 390 × 844: content, bottom navigation, and sticky product action fit without horizontal overflow. |
| Checkout handoff | Demo limitation: no bot username is configured, so the action is disabled and labeled accordingly. |

## Verification

- `npm run build` passed after the main UI changes.
- `npx tsc --noEmit` and `git diff --check` passed after the final copy adjustments.
- Browser inspection covered home, group collection, product detail, tracking, order detail, and profile. The browser console showed no errors before a dev/build output collision; the dev server was restarted cleanly afterward.

The Apple Store comparison establishes the visual direction, not pixel parity: the Core screen uses different imagery, content, and product actions. The source screenshot is a compressed Mobbin composite, so exact typography and spacing measurements are not reliable.

## Live demo site QA

- Reference structure: [Objectify case study](https://annabbbang.com/objectify), inspected at desktop width. Core uses its own copy, palette, product imagery, and navigation.
- The new `/demo` page follows the reference's editorial sequence: project introduction and metadata, hero visual, problem and idea, process, product moments, app showcase, and final action.
- Desktop and 390 × 844 mobile layouts were inspected in the browser. Text, image crops, cards, and navigation were readable without horizontal overflow.
- The **Launch live demo** action opened the Core app successfully. Browser console errors: none.
- Production build, TypeScript check, and whitespace check passed.

Final result: passed.
