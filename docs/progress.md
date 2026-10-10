# Groo: Progress (read first, every session)

Last updated: 2026-10-10 · Branch: `claude/keen-ride-3fn08i` · Keep this file under ~80 lines.

## Where we are
Plan: `docs/roadmap.md` (vertical slices, decided 2026-10-10).
Now: **Slice 1: personal core loop**, "Before" items. Phase 0 done.

## Done
- Docs + Claude Code setup: `CLAUDE.md`, `.claude/rules/` (collaboration, ecosystem, engineering), skill `screen-design`.
- All product decisions closed (Batches A, B, C) → `docs/decisions.md`. Only domain is postponed.
- Expo SDK 57 app scaffold: NativeWind 4, Reanimated 4, TypeScript strict, ESLint, Jest, GitHub Actions CI.
- Streak + points logic with 47 passing tests: `src/lib/{dates,streaks,scoring}.ts`. Plain rules: `docs/streak-rules.md`.
- Look chosen: Direction 1 "Chunky Play" → `docs/designs/style-guide.md`.
- Screens approved: Home / logging grid, Add habit, Group view. Status table: `docs/designs/screens.md`.

## In progress
- First migration `supabase/migrations/20261010120000_personal_core.sql` (profiles, categories, habits, check_ins + RLS). 20 pgTAP tests pass on local Postgres 16 with a stub auth schema; CI runs them on real Supabase.
- GitHub Actions: account locked due to a billing issue (confirmed). Joee to fix in GitHub Billing or contact GitHub Support. CI + DB tests don't run until then.
- Migrations now deploy via Supabase GitHub integration (connected by Joee, production branch `claude/keen-ride-3fn08i`, enabled 2026-10-10). **Live: 4 tables + 3 categories confirmed by Joee 2026-10-10.**
- Supabase client: `src/lib/supabase.ts`, values in `.env`. Avatar style: Avataaars, 20 ready-made.

## Next steps
1. Slice 1 step 1 "App frame": plan shown to Joee, waiting for approval (packages + navigation).
2. Before Slice 1 goes live: create `main`, switch Supabase production branch to `main`, work via PRs.
3. Build Slice 1 (sign-in, add habit, logging, feedback, AR/EN) and deploy to Cloudflare Workers.
Other screens are designed at the start of the slice that needs them (see roadmap).

## Waiting on Joee
- Supabase account created 2026-10-10. URL + publishable key received; region unknown (not critical). Never the secret/service_role key. Has Cloudflare. Develops on Windows.
- Domain: postponed; will pick and link later.
- Logo: mentioned but never received. Ask again when doing the landing page.

## Key links
- Design canvas (Claude Design artifact): https://claude.ai/artifact/RdTWiwykazLZjU2uBXpUh7
  Pages: Options (palettes/fonts/directions), Prototype (home), Add habit, Group view.
  Local working copy is temporary; to edit, `read` the artifact first.

## Still `PROPOSED` (ask before building)
- None right now.

## Working with Joee (reminders)
- Compact, simple replies. Decide together with options + recommendation. Design decisions only with a visual/prototype.
- Suggest rules/skills when work repeats (`.claude/rules/ecosystem.md`).
- Update THIS file at the end of every step, and commit it.
