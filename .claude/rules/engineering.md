# Engineering rules

Quality bar: this is production. Extra setup or tools are fine when they improve quality. Still ask before adding each new library.

## Stack
- Expo + Expo Router. One codebase for web, Android, iOS. Web ships first. `DECIDED`
- TypeScript strict.
- Backend: Supabase (Postgres + Auth). `DECIDED`. Sign-in: Google + email `DECIDED` (Apple at iOS launch).
- Web hosting: Cloudflare Pages, static export (`npx expo export -p web`). `DECIDED`. Keep the web build static; ask before adding server routes.
- Animations: Reanimated. `DECIDED`. Must run on web and native.
- Styling: NativeWind. `DECIDED`
- Expo official agent skills (github.com/expo/skills): install at setup. `DECIDED`

## UI code
- Shared screens use React Native components only (no div/span). Web-only code goes in clearly marked web files.
- Every UI component must work on web AND native. Check the library supports web before using it.
- Arabic-first, RTL from day one. Never hardcode left/right; use start/end.
- All user-facing text goes through i18n keys. No hardcoded strings in components.
- Touch targets min 48px.

## Data
- Every table has Row Level Security policies, with tests. Group data visible only to group members.
- Schema changes only through Supabase migrations in the repo. Ask before any migration.

## Logic and tests
- Business logic (streaks, scoring, dates) lives in pure functions with unit tests.
- Streak/date bugs are the #1 risk. Test day boundaries, timezones, and missed days.
