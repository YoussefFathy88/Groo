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
| 2026-10-09 | Freeze | ~~1 free freeze per week~~ replaced by "rest days per week" (see below). |
| 2026-10-09 | Backfill | Any past day can be logged and repairs the streak. Late logs are marked "late" (stored flag) so a leaderboard can treat them fairly. |
| 2026-10-09 | Shared streak | Each member's own streak, shown together. Celebrate when everyone checked in today. |
| 2026-10-09 | Fixed categories | Prayer, Quran, Sport. |
| 2026-10-09 | Frequency | Daily only in M1. |
| 2026-10-09 | Scoring | 1 point per unit done (3/5 prayers = 3 points), per category. Points never lost. |
| 2026-10-09 | Leaderboard | In M1 (opt-in). |
| 2026-10-09 | Group size | Max 50 members. |
| 2026-10-09 | Week start | Week starts Saturday (rest days, leaderboard). |
| 2026-10-09 | Rest days | Each habit has rest days per week: default 1, user picks 0-3. Missing up to that many days in a week does not break the streak. No carry-over. |
| 2026-10-09 | Rest day in count | A rest day keeps the streak alive but does not add +1. The number = days actually done. |
| 2026-10-09 | Today before logging | Today shows a gentle "not yet" / at-risk state until logged (never red, never shaming). |
| 2026-10-10 | Two streaks | Personal streak (private, any past day counts) + group streak (friends see it; a day counts only if logged within 2 days). Rest days apply to both. |
| 2026-10-10 | Revives | 3 per calendar month (reset on the 1st). After a late log, the app offers "Revive? (N left)"; one tap. A revive saves the group streak only, not leaderboard points. |
| 2026-10-10 | Leaderboard ties | Everyone tied wins the week. A week with 0 points has no winner. |
| 2026-10-10 | Joining mid-week | Member competes in the week they joined. |
| 2026-10-10 | Logs before habit start | Count for the personal streak. |
| 2026-10-10 | Bilingual | Full Arabic and English versions in M1 (Gen Z and Saudi users often prefer English). Design Arabic first, then English. |
| 2026-10-10 | Responsive | Every screen works on phone and desktop. Mobile-first, checked at 390px and 1280px. |
| 2026-10-10 | Default language | Follows the phone's language; switch anytime in settings. No language step on first open. |
| 2026-10-10 | Desktop layout | Logging grid in the center, groups panel on the side, nav on the start side. |
| 2026-10-10 | Visual style | Inspired by Duolingo's energy (own identity, no copying). Every habit always has an icon. Opening the app must feel exciting: bright visuals, fun animations, never boring. |
| 2026-10-10 | Direction | Direction 1 "Chunky Play": white habit cards with 3D bottom edge, weekly streak banner on top, playful rounded font (Baloo Bhaijaan 2). |
| 2026-10-10 | Done state | Card stays white. Done = one shared green style (green border + green check badge); the habit's own color appears only in its icon box. No fully colored cards. |
| 2026-10-09 | Partial day | Any progress (e.g. 1/5) counts as a done day for the streak. |
| 2026-10-09 | Habit templates | Ready-made habits users add in one tap (e.g. "Prayer (5)", "Daily Sport"). Starter list: `OPEN`. |
| 2026-10-09 | Late logs on leaderboard | Count only if logged within 2 days of the day. |
| 2026-10-09 | Leaderboard period | Weekly, inside each group, resets Saturday. Plus a lifetime "weeks won" count per member since joining the group. |
| 2026-10-09 | Multi-count tap | Each tap adds +1 and fills a ring (e.g. 3/5). Long-press to correct. |
| 2026-10-09 | Daily target | Fixed categories have a set target (Prayer = 5, Quran = 1, Sport = 1). Custom habits pick 1-10 at creation. Fixed categories will power a global leaderboard later. |
| 2026-10-09 | Personal history (M1) | Private, per habit: calendar of done days, monthly consistency %, best streak. Advanced filters and comparisons later (M2). |
| 2026-10-09 | Unified logging | One place logs all habits (personal + shared). A shared habit is logged once and shows in every group it is shared with. |

## Open: must close before coding (from PRD)
Grouped by when they block us.

**Batch A: blocks project setup**: closed 2026-10-09 (see Decided).

**Batch B: blocks core logic**: closed 2026-10-09 (see Decided).

**Follow-ups from Batch B**
- Habit templates starter list.

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
