---
name: screen-design
description: Design a new Groo screen as a clickable prototype in the Claude Design canvas, in Arabic + English and phone + desktop, using the approved style. Use whenever Joee asks to design, mock up, or change the look of any screen or flow.
---

# Screen design (Groo)

Every screen is decided from something Joee can see and tap, never from text alone.

## Before designing
1. Read `docs/designs/style-guide.md` (approved look) and the screen's section in `docs/prd-m1.md`.
2. Check `docs/decisions.md` for rules that affect the screen (streaks, points, groups, etc.).
3. Restate the screen's goal in 1-2 lines. List assumptions. If anything is `OPEN`, ask Joee first (one message, options + recommendation).

## Build (Claude Design canvas)
- Canvas: https://claude.ai/artifact/RdTWiwykazLZjU2uBXpUh7 (read `project/canvas.json` first; add a new page per screen, e.g. "Add habit").
- One interactive phone artboard (390 wide) with the real tap flow, `is_interactive: true`.
- A toggle at the top for عربي / English (RTL/LTR flips).
- One desktop artboard (1280 wide, fluid page) of the same screen.
- Use the style guide exactly: Baloo Bhaijaan 2, white chunky cards, green done badge, habit colors only in icon boxes, Egyptian Arabic + casual English copy.
- Every habit shows an icon. Big touch targets (48px+). No red failure styling.
- Show the important states: empty, normal, done/success, and any error or edge case.
- Add a short sticky note on the page: what to tap and what to look for.

## Hard checks
- Core action in 1-2 taps. Logging is always 1 tap.
- No nested menus, no setup wizards, no forms longer than 3 inputs.
- Nothing outside the current milestone (put ideas in `docs/parking-lot.md`).

## After Joee reacts
- Apply feedback, republish, ask again until approved.
- When approved: log the decision in `docs/decisions.md`, update `docs/designs/style-guide.md` if the style changed, and note the screen as approved in `docs/designs/screens.md`.

## Reply format
- The link, 3-5 bullets of what to try, 1-3 numbered questions. Short and simple.
