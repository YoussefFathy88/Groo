# Groo: PRD Milestone 1 (Public Beta)

## Goal
Launch the free core to Joee's channel audience. Validate that **shared streaks with friends** drive daily check-ins.

## Success metrics
- D1 / D7 check-in retention
- Number of active groups (2+ members checking in)
- Signups from channel videos

## Platforms
Web first (Expo web). Code must also run on Android and iOS without UI rewrites.

## Status legend
- `DECIDED`: build it.
- `PROPOSED`: suggestion, not confirmed. Ask Joee before building.
- `OPEN`: undecided. Never pick a value. Ask Joee.

---

## In scope (M1)

### 1. Account
- Backend + auth: Supabase. `DECIDED`
- Sign-in methods: Google + email. `DECIDED` (Apple at iOS launch)
- Profile: display name, avatar (pick from set or initials). `PROPOSED`
- Language: Arabic default, English available. `DECIDED` (Arabic-first)

### 2. Habits
- **Fixed categories**: shared by all users, designed icons, leaderboard-eligible. `DECIDED`
  - Starting list: Prayer, Quran, Sport. `DECIDED`
- **Custom habits**: user names it, picks an icon from Groo's curated set. No uploads. `DECIDED`
- Create a habit in 1 short step: name + icon + done. `DECIDED`
- Habit templates: ready-made habits added in one tap (e.g. "Prayer (5)", "Daily Sport"). `DECIDED`. Starter list: `OPEN`.
- Habit frequency: daily only in M1. `DECIDED`
- Daily target: Prayer = 5, Quran = 1, Sport = 1. Custom habits pick 1-10. `DECIDED`
- Multi-count logging: each tap +1 with a progress ring (3/5); long-press to correct. `DECIDED`

Acceptance:
- Adding a habit takes 1 screen, no more than 3 inputs.
- Fixed and custom icons look like one consistent set.

### 3. One-tap logging (the heart of the app)
- Grid of big widgets, one per habit: icon + name + current streak. `DECIDED`
- **One tap = logged.** No form, no dialog, no extra screen. `DECIDED`
- Clear done vs not-done state for today. `DECIDED`
- Undo a mistaken tap: `PROPOSED` (tap again or small undo toast, within the same day).
- No stats or history on this screen. `DECIDED`

Acceptance:
- From app open to logged: max 2 taps.
- State change is visible instantly (optimistic UI).

### 4. Feedback and motivation
- Every check-in: short funny motivating message + small animation. `DECIDED`
- Messages rotate, no repeats back to back. `DECIDED`
- Streak milestones get a bigger celebration. Milestone days: 3, 7, 14, 30, 60, 100, 365. `DECIDED`
- Missed day: encouraging message, never shaming. `DECIDED`
- Message language/tone: Egyptian Arabic + casual English. `DECIDED`
- Mascot: none in M1. `DECIDED`

### 5. Streaks
- Per habit: current streak, longest streak, start date. `DECIDED`
- Streak rules: `DECIDED` (see docs/decisions.md). The app is forgiving, not strict.
  - Day boundary: local midnight.
  - Timezone: phone's current timezone; store the check-in's local date.
  - Rest days: each habit allows 0-3 missed days per week (default 1) without breaking the streak. Week starts Saturday. No carry-over.
  - Partial day (e.g. 1/5) counts as done for the streak.
  - Backfill: any past day; repairs the streak; marked "late".
- Two streaks per habit `DECIDED`:
  - Personal streak: private, fully flexible (any past day counts).
  - Group streak: shown to friends; a day counts only if logged within 2 days.
  - Revives: 3 per calendar month, offered after a late log, one tap. Saves the group streak only, not points.
- All streak logic in pure, unit-tested functions.

### 6. Groups (core differentiator)
- Create a group, invite friends by link/code, join. `DECIDED`
- Select which habits are shared with the group. `DECIDED`
- **Shared streak**: each member's own streak shown together + "everyone checked in today" celebration. `DECIDED`
- "Who checked in today" feed. `DECIDED`
- Encourage a friend (one-tap reaction like a cheer or nudge). `PROPOSED`
- Group size limit: 50. `DECIDED`

### 7. Scoring and ranking
- Score is per category, not one global score. `DECIDED`
- Scoring formula: 1 point per unit done (3/5 = 3 points), per category. Never lost. `DECIDED`
- Leaderboards are opt-in. `DECIDED`
- Leaderboard timing: in M1, inside each friends group only. `DECIDED`. Late logs count only if logged within 2 days. Weekly (resets Saturday) + lifetime "weeks won" per member. `DECIDED`

### 8. Home dashboard
- One clean screen: today's checklist, streaks, score, group snapshot. `DECIDED`
- The logging grid is the home screen. `DECIDED`

### 9. Reminders
- One daily reminder at a user-picked time. `DECIDED`. Web push support is limited; native is better.

### 10. Landing page + waitlist
- Public landing page with waitlist, tied to a launch video. `DECIDED`
- Same Expo project (static route). `DECIDED`
- Hosted on Cloudflare Workers (static assets) with a custom domain. `DECIDED` (domain itself: `OPEN`).

---

## Out of scope (M1)
- Todos, AI chat, weight tracker, Quran study tracker (M2)
- Payments / premium
- Verified "Tracked" habits, photo proof (M3)
- Health integrations, store releases (M4)
- Icon uploads, themes, complex stats

## Draft data model (`PROPOSED`, confirm before migrations)
- User: id, name, avatar, locale, timezone, created_at
- Category: id, key, is_fixed, icon, name_i18n
- Habit: id, user_id, category_id, name, icon, daily_target, rest_days_per_week, created_at, archived_at
- CheckIn: id, habit_id, user_id, local_date, count, created_at, is_late
- Group: id, name, invite_code, owner_id, created_at
- GroupMember: group_id, user_id, role, joined_at, show_on_leaderboard
- GroupHabit: group_id, category_id or habit_id
- Reaction: id, from_user, to_user, checkin_id, type
Streaks and scores: computed from CheckIn (or cached). `OPEN`

## Screen list (for /design)
1. Logging grid (home or tab)
2. Add habit (name + icon picker)
3. Check-in celebration (normal + milestone)
4. Group view (members, today's feed, shared habits)
5. Create / join group (invite link)
6. Habit detail (streaks, start date, calendar of done days, monthly consistency %, best streak)
7. Profile / settings (language, account)
8. Landing page + waitlist

## Open decisions to close before coding
Ask Joee to answer these in one go:
1. Sign-in methods (backend is Supabase, decided)
2. Styling library
3. Starting fixed categories
4. Streak rules (day boundary, freeze, backfill)
5. Shared streak meaning (individual vs group)
6. Scoring formula
7. Leaderboard in M1 or M1.5
8. Message tone + mascot
9. Reminders in M1?
10. Landing page inside Expo or separate
