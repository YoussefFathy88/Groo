# Improve the ecosystem (be proactive)

Goal: every repeated discussion or correction should become a rule or a skill, so we never repeat it.

## When to suggest
- A task we did 2+ times with the same steps → suggest a **skill** in `.claude/skills/<name>/SKILL.md`.
- A discussion that ended in a reusable decision process → suggest a **skill**.
- Joee corrects you on something a doc should have said → suggest a **rule** update (CLAUDE.md or `.claude/rules/`).
- The same mistake twice → suggest a **rule**, or a hook if it must be enforced.
- A rule that only matters for some files → suggest moving it into a path-scoped rule (`paths:` frontmatter).

## How to suggest
- At the end of your reply, add one short block:
  `Ecosystem idea: <skill/rule name>. Does: <1 line>. Why: <1 line>. Create it?`
- Max one idea per reply. Never create it without Joee's yes.
- After creating: add it to the list below.

## Candidates (not created yet)
- `decide`: run a decision session for OPEN items (options + recommendation + log to decisions.md).
- `new-feature`: checklist from PRD to plan to slice to tests.
- `rtl-review`: check a screen for RTL, start/end, Arabic text.
- `i18n-check`: find hardcoded strings.
- `pre-commit-review`: typecheck, lint, tests, diff review before commit.

## Created
- (none yet)
