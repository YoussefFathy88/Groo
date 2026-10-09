# Groo: Decision Log

One place for every product and tech decision. Update it whenever Joee decides something.
Status: `DECIDED` build it · `PROPOSED` ask first · `OPEN` never pick, ask Joee.

## Decided
| Date | Area | Decision |
|---|---|---|
| 2026-10-02 | Platform | Expo + Expo Router, one codebase. Web first, then Google Play, then App Store. |
| 2026-10-02 | Backend | Supabase (Postgres + Auth). Free plan in dev, Pro when real users depend on it. |
| 2026-10-02 | Hosting | Cloudflare Pages, static Expo web export. Not Vercel Hobby (no commercial use). |
| 2026-10-02 | Language | Arabic-first, RTL from day one. English available. |
| 2026-10-02 | Logging | One tap = logged. Grid of big widgets. No stats on that screen. |
| 2026-10-02 | Scoring | Per category, not global. Leaderboards opt-in. |

## Open: must close before coding (from PRD)
Grouped by when they block us.

**Batch A: blocks project setup**
1. Styling library (proposal: NativeWind)
2. Animations: Reanimated (proposed)
3. Install Expo agent skills (proposed)
4. Sign-in methods (Google, Apple, email?)

**Batch B: blocks core logic**
5. Streak rules: day boundary, timezone/travel, freeze/grace, backfill
6. Shared streak meaning: individual streaks shown together, or one group streak
7. Starting fixed categories (candidates: Prayer, Quran, Sport/Gym)
8. Habit frequency (daily only in M1?)
9. Scoring formula
10. Leaderboard in M1 or M1.5
11. Group size limit

**Batch C: blocks design and launch**
12. Brand hex colors, Arabic + Latin font pair, dark mode
13. Message tone (Egyptian Arabic, MSA, both) + mascot
14. Milestone days (e.g. 3, 7, 30, 100)
15. Reminders in M1?
16. Landing page inside Expo or separate site
17. Domain name

## Proposed (confirm with Joee)
- Undo a mistaken tap (tap again or undo toast, same day)
- Profile: display name + avatar from set or initials
- Cheer / nudge reaction in groups
- Draft data model in PRD
