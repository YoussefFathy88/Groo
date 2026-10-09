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
| 2026-10-09 | Styling | NativeWind. |
| 2026-10-09 | Animations | Reanimated. |
| 2026-10-09 | Tooling | Install Expo official agent skills. |
| 2026-10-09 | Sign-in | Google + email for M1. Apple added at iOS launch (M4). |
| 2026-10-09 | Hosting | Cloudflare Workers static assets (replaces Pages, per Cloudflare's own recommendation for new projects). Free plan. |
| 2026-10-09 | Quality bar | Production quality. Extra setup/installs are fine when they improve quality. |
| 2026-10-09 | Flexibility | The app is forgiving. Users can return after a break and log what they remember. No "you must log daily" pressure. |
| 2026-10-09 | Day boundary | Local midnight. |
| 2026-10-09 | Timezone | Phone's current timezone at check-in. Store the check-in's local date. |
| 2026-10-09 | Freeze | 1 free freeze per week, applied automatically. |
| 2026-10-09 | Backfill | Any past day can be logged and repairs the streak. Late logs are marked "late" (stored flag) so a leaderboard can treat them fairly. |
| 2026-10-09 | Shared streak | Each member's own streak, shown together. Celebrate when everyone checked in today. |
| 2026-10-09 | Fixed categories | Prayer, Quran, Sport. |
| 2026-10-09 | Frequency | Daily only in M1. |
| 2026-10-09 | Scoring | 1 point per check-in, per category. Points never lost. |
| 2026-10-09 | Leaderboard | In M1 (opt-in). |
| 2026-10-09 | Group size | Max 50 members. |
| 2026-10-09 | Freeze week | Week starts Saturday. |
| 2026-10-09 | Freeze carry-over | No carry-over. Max 1 freeze per week. |
| 2026-10-09 | Late logs on leaderboard | Count only if logged within 2 days of the day. |

## Open: must close before coding (from PRD)
Grouped by when they block us.

**Batch A: blocks project setup**: closed 2026-10-09 (see Decided).

**Batch B: blocks core logic**: closed 2026-10-09 (see Decided).

**Follow-ups from Batch B**
- Leaderboard period (weekly / all-time). Scope: inside each friends group only.

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
