# Groo: Design Brief

Input for /design in Claude Code (or Claude Design). Approve designs before building.

## Feel
- Joyful, gamified, fresh. A supportive friend, not a productivity tool.
- Duolingo-level energy, own identity. Do not copy Duolingo's mascot, logo, or UI.
- Motivation first, numbers second.

## Brand
- Palette: green (primary) + amber/yellow (accent, celebrations) + some black (text, contrast).
- Exact hex values: `OPEN`. Explore 2-3 options and ask Joee.
- Logo: flat wordmark "Groo", the "r" is a growth arrow (amber), "G-o-o" green.
- Must support light mode. Dark mode: `OPEN`.

## Design system first
Before any screen, define and get approval for:
- Color tokens (primary, accent, background, surface, text, success, muted)
- Type scale. Must have strong Arabic support. Arabic + Latin font pair: `OPEN`.
- Spacing and radius scale (rounded, soft shapes)
- Components: habit widget (done / not done), button, card, avatar, feed item, toast, celebration overlay
- Icon set: one consistent style for fixed and custom icons

## Hard UI rules
- Logging a habit = 1 tap. If it takes more, the design is wrong.
- Big touch targets (min 48px), minimal text.
- No nested menus. Core actions in 1-2 taps.
- If a screen needs explanation, simplify it.
- RTL first: design every screen in Arabic RTL, then check English LTR.
- Must work on phone width first, then scale up to web desktop.

## Logging grid (most important screen)
- Grid of big widgets: catchy icon + habit name + current streak.
- Done state must be obvious at a glance (color fill, check, icon animates).
- No stats on this screen.

## Feedback and motion
- Check-in: short funny message + small animation (bounce, sparkle, growth).
- Milestones: bigger celebration (confetti-like, streak badge).
- Missed day: warm, encouraging, never red "failure" styling.
- Motion must be smooth on web and native. Keep it short (under ~1s for normal check-in).

## Screens to design (in order)
1. Design system page
2. Logging grid (empty state, partial, all done)
3. Check-in celebration (normal + milestone)
4. Add habit + icon picker
5. Group view (members, today's feed, cheers)
6. Create / join group
7. Habit detail
8. Landing page + waitlist

## Process
- For each screen: ask for 2-3 directions, Joee picks one, then refine.
- Save approved designs into the repo (e.g. docs/designs/) so the coding step can reference them.
- Build only from approved designs.
