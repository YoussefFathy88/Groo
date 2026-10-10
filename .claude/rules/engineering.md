# Engineering rules

Quality bar: this is production. Extra setup or tools are fine when they improve quality. Still ask before adding each new library.

## Stack
- Expo + Expo Router. One codebase for web, Android, iOS. Web ships first. `DECIDED`
- TypeScript strict.
- Backend: Supabase (Postgres + Auth). `DECIDED`. Sign-in: Google + email `DECIDED` (Apple at iOS launch).
- Web hosting: Cloudflare Workers static assets, static export (`npx expo export -p web` → `dist/`). `DECIDED`. Keep the web build static; ask before adding server code.
- Animations: Reanimated. `DECIDED`. Must run on web and native.
- Styling: NativeWind. `DECIDED`
- Expo official agent skills (github.com/expo/skills): install at setup. `DECIDED`

## UI code
- Shared screens use React Native components only (no div/span). Web-only code goes in clearly marked web files.
- Every UI component must work on web AND native. Check the library supports web before using it.
- Arabic-first, RTL from day one. Never hardcode left/right; use start/end.
- All user-facing text goes through i18n keys. No hardcoded strings in components.
- Touch targets min 48px.
- Responsive: every screen must work on phone and desktop web. Test at 390px and 1280px wide before saying a UI task is done.
- Full English version alongside Arabic. Language switch in settings; layout flips RTL/LTR with it.

## Data
- Every table has Row Level Security policies, with tests. Group data visible only to group members.
- Schema changes only through Supabase migrations in `supabase/migrations/`, with pgTAP tests in `supabase/tests/database/`. Ask before any migration.
- Migrations reach the live DB only via the Database GitHub Action (this cloud session cannot reach supabase.co). Before writing SQL, load the `supabase-postgres-best-practices` skill.
- Explicit GRANTs + RLS on every table (new Supabase projects may not expose tables by default).

## Logic and tests
- Business logic (streaks, scoring, dates) lives in pure functions with unit tests.
- Streak/date bugs are the #1 risk. Test day boundaries, timezones, and missed days.
