# Groo: M1 Roadmap

How we build Milestone 1 (public web beta). Approach: **vertical slices** (decided 2026-10-10).
Each slice = design (clickable prototype) → Joee approves → data → code → tests → deployed live.
A slice is done only when it works on the live web app, phone + desktop, Arabic + English.

Current position: see `docs/progress.md`.

## Phase 0: Foundations ✅
- [x] Docs, rules, `screen-design` skill
- [x] All product decisions (`docs/decisions.md`)
- [x] Expo app scaffold + CI
- [x] Streak + points logic with tests (`src/lib/`)
- [x] Visual style (`docs/designs/style-guide.md`)
- [x] Designs approved: Home / logging grid, Add habit
- [ ] Group view design approved (in review)

## Slice 1: Personal core loop (log your own habits)
Goal: Joee signs in, adds habits, logs them in 1 tap, sees streaks. Live on the web.
- Before: Supabase account (Joee) · i18n library choice · data model approval (users, categories, habits, check_ins) · first migration
- [ ] Sign-in: Google + email (Supabase Auth)
- [ ] Add habit: templates (1 tap) + custom (name, icon, times per day)
- [ ] Logging grid: 1 tap, multi-count (3/5), done badge, optimistic UI
- [ ] Check-in feedback: rotating messages, pop animation, milestone celebration
- [ ] Streak banner + points (uses `src/lib/`)
- [ ] Arabic + English, RTL/LTR, language follows phone
- [ ] Row Level Security + tests
- [ ] Deploy to Cloudflare Workers (static web)
- Done when: works live on phone + laptop, typecheck/lint/tests green, Joee approves.

## Slice 2: Groups (the core differentiator)
Goal: friends see each other's streaks and push each other.
- Before: design Create/join group · group tables + RLS (members-only access)
- [ ] Create group, invite by link/code, join (max 50)
- [ ] Share habits with groups (after adding a habit)
- [ ] Group view: today's progress, members, streaks
- [ ] Cheer + nudge (max 1 nudge per friend per day)
- [ ] Group streak (2-day window) + revives (3/month)
- [ ] Weekly leaderboard per category + weeks won (opt-in)
- [ ] "Everyone logged" celebration
- Done when: a real group of friends uses it for a few days.

## Slice 3: Habit detail + history
- Before: design Habit detail
- [ ] Calendar of done days, monthly consistency %, best streak
- [ ] Log past days (late mark) + revive offer
- [ ] Edit habit: rest days per week (0-3), archive

## Slice 4: Profile, settings, reminders
- Before: design Profile/settings · decide Proposed items (profile avatar, undo)
- [ ] Profile: name + avatar
- [ ] Language switch, leaderboard opt-in, sign out
- [ ] Daily reminder at a chosen time (web push limits apply)

## Slice 5: Launch
- Before: design Landing page · logo · domain
- [ ] Landing page + waitlist (same Expo project)
- [ ] Custom domain on Cloudflare
- [ ] Basic analytics for success metrics (D1/D7 retention, active groups, signups) · error tracking (decide tools then)
- [ ] Beta test with a small group, fix issues
- [ ] Public beta launch with Joee's video

## Rules
- Do not start a slice's code before its design is approved and its "Before" items are done.
- New ideas go to `docs/parking-lot.md`, not into the current slice.
- Update `docs/progress.md` and tick boxes here as work finishes.
