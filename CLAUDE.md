# Groo: Claude Code Instructions

Groo is a motivation app built on **shared streaks with friends**. Slogan: "Small steps, real growth."
Not a normal habit tracker. Encouraging, "healthy Snapchat vibes", never competitive or shaming.
Solo developer: Joee. Launch: public web beta for his Arabic YouTube audience.

## Top 3 rules (always)
1. **Decide together.** Never decide alone. Ask Joee with options + a recommendation. See `.claude/rules/collaboration.md`
2. **Compact replies.** Short, simple, clear. Answer first. See the response style in the same file.
3. **Improve the ecosystem.** Spot repeated work and propose a rule or skill. See `.claude/rules/ecosystem.md`

## Source of truth
- @docs/prd-m1.md : what we build now (Milestone 1), acceptance criteria, open decisions
- @docs/decisions.md : decision log. What is DECIDED, PROPOSED, OPEN
- `docs/design-brief.md` : brand, UI rules, screens, motion. Read before any UI work.
- `docs/business.md` : vision, market, pricing, later milestones. Read only for scope/pricing/roadmap.
- `docs/parking-lot.md` : ideas outside the current milestone.
- `docs/designs/style-guide.md` : approved look (Direction 1). `docs/designs/screens.md` : screen status.
- `docs/streak-rules.md` : plain-language streak and points rules. Keep in sync with `src/lib/streaks.ts` and `src/lib/scoring.ts`.

If code and docs disagree, stop and ask. Do not silently follow either one.
When Joee makes a decision, update `docs/decisions.md` (and the PRD status) in the same change.

## Simplicity is a product feature
- Logging a habit = 1 tap. No forms, no dialogs, no confirm step.
- Core actions reachable in 1-2 taps. No nested menus, no setup wizard.
- If a screen needs explaining, it is too complex. Simplify, then ask.
- No features outside the current milestone. Add them to `docs/parking-lot.md` and tell Joee.

## Engineering rules
Stack, code, data, and testing rules: `.claude/rules/engineering.md` (auto-loaded, like all files in `.claude/rules/`).

## Commands
- `npm run web` : run the app in the browser
- `npm run typecheck` · `npm run lint` · `npm test` : run all three before saying a task is done
- `npm run export:web` : static web build into `dist/` (what Cloudflare Workers serves)
- Add packages with `npx expo install <pkg>` (SDK-matched versions). Ask Joee first.

## Expo guidance
@AGENTS.md

## Workflow
- Plan mode for any feature touching more than 2 files. Show the plan, wait for approval.
- Vertical slices: one feature end to end (UI + logic + data) before the next.
- Small commits, one feature per branch, clear messages.
- After each slice: typecheck, lint, tests. Report results honestly, including failures.
- UI: design first (design brief + /design), Joee approves, then build. Save approved designs in `docs/designs/`.
