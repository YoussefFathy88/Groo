# Improve the ecosystem (be proactive)

Goal: every repeated discussion or correction should become a rule or a skill, so we never repeat it.

## When to suggest
- A task we did 2+ times with the same steps → suggest a **skill** in `.claude/skills/<name>/SKILL.md`.
- A discussion that ended in a reusable decision process → suggest a **skill**.
- Joee corrects you on something a doc should have said → suggest a **rule** update (CLAUDE.md or `.claude/rules/`).
- The same mistake twice → suggest a **rule**, or a hook if it must be enforced.
- A rule that only matters for some files → suggest moving it into a path-scoped rule (`paths:` frontmatter).
- A task you can't fully do or verify yourself (e.g. testing in a browser, reading logs, checking a live service) → suggest an **MCP server**, plugin, or tool that would let you do it. Joee wants you able to run all tests yourself.

## Always recommend (Joee's request, 2026-11-07)
- Proactively recommend rules, skills, MCP servers, plugins, and hooks that improve how we work. Don't wait to be asked.
- Prefer official/well-known MCPs (e.g. Playwright, Supabase, Cloudflare). Say what it unlocks and its cost/risk in 1 line each.
- If a connected MCP fails, say so, find the cause, and give the fix.

## Installs for automation (Joee's rule, 2026-11-11)
- **Pre-approved:** install any dev tool that lets Claude work and test on its own: CLIs, MCP servers, dev-only npm packages, Docker images, browsers for testing. Only from official/well-known sources. Just do it and mention it in one line.
- **Still a `DECISION`:** app libraries that ship in the app bundle (they shape the product and its size), anything paid, anything that writes to live services or needs Joee's account.
- Log each install in the "MCP / tools in use" list below.
- **Global installs must run in Joee's Terminal panel** (`run_in_terminal`), not the Bash/PowerShell tool: that tool is sandboxed, so files outside the project folder never reach the real system (found 2026-11-11). Project-folder installs (`npm install -D`, `npx expo install`) work from either.

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
- `supabase`, `supabase-postgres-best-practices` (2026-10-10): official Supabase agent skills (installed via `npx skills add supabase/agent-skills`, pinned in `skills-lock.json`).
- `screen-design` (2026-10-10): every screen as a clickable AR/EN, phone/desktop prototype in the approved style.
- `local-e2e` (2026-11-11): full end-to-end test on the local Supabase stack with Playwright (sign-in via Mailpit, AR/EN, 390/1280, console, cleanup). Replaces GitHub CI.

## MCP / tools in use (project `.mcp.json`, added 2026-11-07)
- `supabase`: hosted Supabase MCP, scoped to our project, **read-only**. For checking tables, RLS, auth logs, advisors, docs. Schema changes still go only through migrations + GitHub integration. Needs one-time OAuth (`/mcp` → supabase → Authenticate).
- `playwright`: `@playwright/mcp` pinned (0.0.84), uses installed Chrome. Drive the app for UI tests. If "failed to connect", restart the session.
- `cloudflare`: Cloudflare API MCP. For the Workers deploy step and checking it. Needs one-time OAuth.
- Built-in browser pane (Claude desktop app): fallback for visual checks.
- Expo MCP (connected by Joee 2026-11-07, account-level): docs, EAS builds, store data. Local tools (screenshots, taps) need the `expo-mcp` dev package, ask first. Sandbox/simulator tools are billed: never start them without asking.
- Supabase claude.ai connector (connected by Joee 2026-11-07, account-level): **full access** (migrations, pause, delete branch). Use only read tools (`list_tables`, `get_advisors`, `get_logs`, `search_docs`, `execute_sql` for SELECT). Any write: ask Joee first. Schema still only via migrations + GitHub.
- Claude Code CLI 2.1.322 (installed globally via npm in the Terminal panel 2026-11-11): `claude` in a terminal for `/mcp` sign-ins and interactive-only commands.
- If Supabase says "database not accessible": check `get_project`. `INACTIVE` = free plan paused after ~7 idle days. Ask Joee before restoring.
