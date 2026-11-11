---
name: local-e2e
description: Test a Groo change end to end on Joee's Windows PC against the local Supabase stack, in a real browser (Playwright), in Arabic + English at 390px + 1280px. Use before saying any UI, data, or auth change is done, and whenever Joee asks to "test it", "run e2e", or "check it in the browser". Local tests replace GitHub CI (decided 2026-11-11).
---

# Local end-to-end test (Groo)

Goal: prove the change works for a real signed-in user, with real data, in both languages and both sizes. Never touch the live project here.

## 1. Static checks (run in parallel)
- `npm run typecheck`, `npm run lint`, `npm test`. All must pass.

## 2. Local Supabase
- Docker must be running. If `docker info` fails, start `C:\Program Files\Docker\Docker\Docker Desktop.exe` and wait until `docker info` works (up to ~5 min).
- `npx supabase start` (first run downloads images; run in the background).
- `npx supabase test db`: all pgTAP tests must pass.
- Never print keys. Read them with `npx supabase status -o env` (API_URL, PUBLISHABLE_KEY).

## 3. Point the app at local
- Write `.env.local` (gitignored, overrides `.env`):
  `EXPO_PUBLIC_SUPABASE_URL=<API_URL>` and `EXPO_PUBLIC_SUPABASE_KEY=<PUBLISHABLE_KEY>`.
- Write it **without a BOM** (PowerShell 5 `Out-File utf8` adds one and breaks the first variable). Use `[IO.File]::WriteAllText(path, text, (New-Object Text.UTF8Encoding $false))`.
- Start the dev server with `preview_start` name `web` (`.claude/launch.json`, port 8081). Check the logs say `env: load .env.local .env`. Metro needs ~20-40 s before the page loads.

## 4. Sign in (email link via Mailpit)
- Playwright: resize to 390x844, go to http://localhost:8081, type a test email (e.g. `joee.test@groo.test`), press Enter.
- Get the link from Mailpit **in PowerShell** (the browser fetch is blocked by CORS):
  `Invoke-RestMethod http://127.0.0.1:54324/api/v1/messages`, then `/api/v1/message/<ID>`, regex the `verify` URL from `.HTML`, replace `&amp;` with `&`.
- Navigate Playwright to that link. It redirects back signed in (local `config.toml` allows `http://localhost:8081/**`).

## 5. Test the change
- Do the real user flow with `browser_click` / `browser_type` on snapshot refs. If a click right after navigation says "no match", take a snapshot and retry with the ref.
- Save screenshots only under `.playwright-mcp/` (other paths are refused; the folder is gitignored). Name them `NN-what-lang-width.png` and look at every one.
- Check the data: `docker exec supabase_db_Groo psql -U postgres -At -c "select ... from public.<table>;"`.

## 6. Arabic + desktop
- Arabic: `browser_run_code_unsafe` with `page.addInitScript(() => { Object.defineProperty(navigator,'language',{get:()=>'ar-EG'}); Object.defineProperty(navigator,'languages',{get:()=>['ar-EG','ar']}); })`, then reload. Confirm `document.documentElement.dir === 'rtl'`.
- English after that: open a new page with `page.context().newPage()` (the init script is per page).
- Check both at 390x844 and 1280x800.

## 7. Console
- In a fresh page, collect `console` errors and `pageerror` events through the whole flow. The result must be `[]`.

## 8. Clean up (always)
- Delete `.env.local` (so `npm run web` points at live again).
- `browser_close`, `preview_stop`. Leave Docker and the local stack running unless Joee asks.

## Known traps (found 2026-11-09)
- NativeWind `className` is not applied on `Animated.View`. Put classes on an inner `View`.
- Equal-width grid cells need `flex-1 basis-0 min-w-0`. Filler cells need the same padding + border as real cards.
- Native-only props (`accessibilityElementsHidden`, `importantForAccessibility`) on `Svg` leak to the web DOM and log errors. Use `aria-hidden`.
- Reanimated 4 + React Compiler: use `sv.set(...)` / `sv.get()`, not `sv.value =`.

## Report
List what you tested, the screenshots you checked, data rows confirmed, console result, and any bug found + fixed. Be honest about anything not tested.
