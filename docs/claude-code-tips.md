# Claude Code Tips: Building Apps

Practical tips from building Groo with Claude Code. Copy what helps.

---

## Tip 1: Give Claude your plan, then split it into separate docs

**What we did:** Wrote the whole app idea in one big message. Then asked Claude Code to split it into separate documents, one per topic.

**Prompt you can copy:**
> Here is my app plan: [paste plan]. Split it into separate docs in `docs/`: a business doc, a PRD for the first milestone, a design brief, and a decision log. Mark each item as DECIDED, PROPOSED, or OPEN. Ask me about anything unclear before writing.

**The docs we ended up with:**

| File | What it holds | When Claude reads it |
|---|---|---|
| `docs/business.md` | Vision, market, pricing, later milestones | Only for scope or pricing |
| `docs/prd-m1.md` | What we build now + acceptance criteria | Every feature |
| `docs/design-brief.md` | Brand, UI rules, screens, motion | Before any UI work |
| `docs/decisions.md` | Every decision with a date | Always |
| `docs/roadmap.md` | Build order (small vertical slices) | Every step |
| `docs/progress.md` | Done, in progress, next, waiting on me | First thing every session |
| `docs/parking-lot.md` | Good ideas for later | When a new idea comes up |

**Why it works:**
- Each doc stays short and focused. Easy to track and update.
- Claude reads only what it needs. Less noise, better answers.
- `DECIDED / PROPOSED / OPEN` stops Claude from guessing. OPEN = it must ask you.
- `progress.md` lets any new session pick up exactly where you stopped.
- Parking lot keeps scope small without losing ideas.

---

## Tip 2: A CLAUDE.md you can copy into your project

`CLAUDE.md` sits in your project root. Claude Code loads it at the start of every session. Put your rules there once instead of repeating them.

**Good to know** (from the official docs: code.claude.com/docs/en/memory):
- `@path/to/file` inside CLAUDE.md imports another file. We use it for `progress.md`, the PRD, and decisions.
- Files in `.claude/rules/` load automatically. Good for keeping CLAUDE.md short.
- Keep CLAUDE.md under ~200 lines. Longer files get followed less.

**Template** (replace the `[brackets]`):

```markdown
# [App name]: Claude Code Instructions

[App name] is [one line: what it is and who it is for].
Solo developer: [your name]. Launch target: [where and for whom].

## Top 3 rules (always)
1. **Decide together.** Never decide alone. Ask me with 2-3 options + a recommendation.
2. **Compact replies.** Answer first, then short bullets. Simple English.
3. **Improve the workflow.** If we repeat a task or a correction, suggest a rule or skill.

## Where we are (read first)
@docs/progress.md
Plan: `docs/roadmap.md`. Follow it; propose changes, never skip silently.
Update `docs/progress.md` at the end of every step and commit it.

## Source of truth
- @docs/prd.md : what we build now, acceptance criteria
- @docs/decisions.md : decision log (DECIDED, PROPOSED, OPEN)
- `docs/design-brief.md` : brand and UI rules. Read before any UI work.
- `docs/business.md` : vision and pricing. Read only for scope questions.
- `docs/parking-lot.md` : ideas outside the current milestone.

If code and docs disagree, stop and ask. Do not silently follow either one.
When I make a decision, update `docs/decisions.md` in the same change.
Anything PROPOSED or OPEN is undecided. Never pick a value yourself.

## Always ask before
- Adding a library, changing the data model, adding a screen
- Touching auth, billing, or a database migration
- Deleting files

## Simplicity
- Core actions in 1-2 taps. No setup wizards.
- If a screen needs explaining, it is too complex. Simplify, then ask.
- No features outside the current milestone. Add them to `docs/parking-lot.md`.

## Engineering
- Stack: [framework, backend, styling].
- Business logic in pure functions with unit tests.
- All user-facing text through i18n keys. [Remove if one language only.]

## Commands
- `[run command]` : run the app
- `[typecheck]` · `[lint]` · `[test]` : run all three before saying a task is done

## Workflow
- Plan mode for any feature touching more than 2 files. Show the plan, wait for approval.
- Vertical slices: one feature end to end (UI + logic + data) before the next.
- Small commits, clear messages. Report test results honestly, including failures.
- UI: design first, I approve, then build.

## Response style
- Answer or result first, in 1-2 lines. Then max ~5 short bullets.
- Max ~150 words unless I ask for more.
- Flag uncertainty. Never present a guess as fact.
- End with what you need from me (if anything).
```

**Tips for using it:**
- Start small. Add a rule each time you correct Claude twice on the same thing.
- Move long sections (engineering, collaboration) into `.claude/rules/*.md` files.
- Commit it to git so every session and teammate gets the same rules.
