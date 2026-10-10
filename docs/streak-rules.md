# Streak and Points Rules (M1)

Plain-language spec for `src/lib/streaks.ts` and `src/lib/scoring.ts`. Decisions live in `docs/decisions.md`.

## Days and weeks
- A day = the user's local calendar day (midnight to midnight, phone's current timezone).
- A week = Saturday to Friday.

## Done day
- Any progress counts: 1 of 5 prayers is a done day.

## Personal streak (private)
- Counts done days in a row.
- Any past day can be logged anytime, and it repairs the streak.
- Rest days: each habit allows 0-3 missed days per week (default 1). They keep the streak alive but do not add +1.
- More misses than allowed in one week breaks the streak. No carry-over between weeks.
- Today, before logging: "pending" (gentle at-risk). It never breaks the streak until the day is over.

## Group streak (friends see it)
- Same rules, but a day counts only if logged within 2 days of the day.
- Revive: 3 per calendar month (reset on the 1st). After a late log, the app offers "Revive?" only if it raises the current group streak.
- A revive saves the streak only. It never adds leaderboard points.

## Points
- 1 point per unit done, capped at the daily target (3 of 5 prayers = 3 points).
- Personal totals count every check-in, however late. Points are never lost.

## Group leaderboard (opt-in, per category)
- Weekly, resets Saturday. Only check-ins logged within 2 days count.
- "Weeks won": lifetime count of finished weeks won since joining the group.
- A member competes from the week they joined. Ties all win. A week where nobody scored has no winner.
