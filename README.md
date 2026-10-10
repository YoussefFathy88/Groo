# Groo

Small steps, real growth. A motivation app built on shared streaks with friends.

## Run it
```bash
npm install
npm run web        # open in browser
npm run typecheck && npm run lint && npm test
```

## Stack
Expo SDK 57 + Expo Router · TypeScript strict · NativeWind 4 · Reanimated 4 · Jest (jest-expo) · Supabase (later) · Cloudflare Workers (static assets)

## Repo map
- `src/app/` : screens (Expo Router)
- `src/lib/` : pure logic + tests
- `CLAUDE.md` : instructions for Claude Code (loaded every session)
- `.claude/rules/` : collaboration, ecosystem, engineering rules (auto-loaded)
- `.claude/skills/` : project skills (added over time)
- `docs/progress.md` : where we are now (auto-loaded every session)
- `docs/roadmap.md` : M1 plan as vertical slices
- `docs/prd-m1.md` : Milestone 1 scope
- `docs/decisions.md` : decision log
- `docs/design-brief.md` : brand and UI
- `docs/business.md` : vision, market, roadmap
- `docs/parking-lot.md` : later ideas
