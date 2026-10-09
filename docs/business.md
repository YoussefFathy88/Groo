# Groo: Business Context

> For the coding agent: this is background. Build from docs/prd-m1.md. Read this when a task touches scope, pricing, positioning, or roadmap.
> Source: Groo Business Plan artifact (last updated 2026-09-24) + later decisions (2026-10-02).

## Vision
Groo is a motivation app, not just a habit tracker. It helps people take small steps every day toward their goals and a successful life. Consistency comes from streaks shared with friends in small, encouraging groups, not competition.
Starts with shared habit streaks. Grows into a simple life organizer (todos, AI planning, weight, Quran study).

## Positioning
- Core: **shared streaks and collaboration with friends** ("healthy Snapchat vibes").
- Not "another habit tracker". Not competitive. Not guilt-tripping.
- Core message: daily small steps + consistency = a successful life.

## Brand
- Name: Groo (playful twist on "grow"; short, easy for Egyptian speakers).
- Slogan: Small steps, real growth.
- Personality: friendly, funny, motivating. A supportive friend.
- Logo direction: wordmark, flat. The "r" is a growth arrow. "r" in amber, "G-o-o" in green.
- Palette: green + amber/yellow + some black. Joyful, gamified. Same palette used for Joee's channel identity.
- Inspired by Duolingo's energy, but with its own look. Never copy Duolingo's mascot, logo, or UI.

## Market
- Social streak apps already exist (e.g. CTRL Habits, HabitHook, Streakly, Kazu, StreakUp, HabitFriend).
- Islamic habit apps already exist with groups (e.g. Muslim Habits Tracker, My Noors, Niyyah, The Muslim App).
- The mechanic is proven and crowded. We win on differentiation, not base features.

## Differentiation
- Arabic-first product and content (not translated).
- Built-in distribution: Joee's YouTube channel. Development shared as content.
- Channel seeds the first groups (solves group cold start).
- Encouraging-not-competitive design: per-category scoring, feed before leaderboard, opt-in ranking.
- Simplicity and effortless 1-tap logging. Fun feedback on every check-in.
- Premium AI idea-to-todo chat (Joee's AI background).
- Later: verified "Tracked" habits for fair competitions.

## Target audience
- Launch: Arab developer/tech audience of Joee's channel.
- Broader: Arabic speakers who want consistency in sport, faith, study, and personal goals.

## Business model: freemium
- Free: fixed + custom habits, streaks, groups with shared habits, per-category scoring, opt-in leaderboards, home dashboard.
- Premium (subscription): AI idea-to-todo chat, weight tracker, Quran study tracker, advanced stats, verified "Tracked" habits (later).
- Pricing: OPEN.

## Platform strategy
- Decision (2026-10-02): **Expo + Expo Router**, one codebase for web, Android, iOS.
- Order: web public beta first, then Google Play, then App Store.
- Backend: Supabase (Postgres + Auth). Free plan during development; Pro plan once real users depend on it (backups, no inactivity pause).
- Web hosting: Cloudflare Workers static assets (free, commercial use allowed). Static Expo web export. Workers can add server code later (e.g. M2 AI chat). Changed from Pages on 2026-10-09.
- Not Vercel Hobby: its free plan does not allow commercial use.

## Milestones
1. **M1: Shared habits and streaks (public beta)**. See docs/prd-m1.md.
2. **M2: Premium + life tracker**. Simple todo (Today view, push unfinished tasks to tomorrow or Backlog; no Jira/Notion style), AI idea-to-todo chat, weight tracker, Quran study tracker, billing, advanced personal stats (filters, compare habits and periods over months/years).
3. **M3: Verified "Tracked" habits**. Photo-proof check-ins first, then health integrations. "Tracked" badge. Official competitions only on verified habits. Global leaderboard across all users on fixed categories.
4. **M4: Store launches**. Google Play, App Store, HealthKit / Health Connect.
Note: with Expo, M4 is mostly store setup + native integrations, not a rewrite.

## Growth
- Channel-led launch, content-seeded groups.
- Feature top streaks/scores in videos (recurring content + growth loop).
- Friend invites through groups (viral loop).
- YouTube series idea: "building an app from idea to product with AI", Groo as the case study.

## Key risks
- Saturated market: mitigate with audience + Arabic-first + AI premium.
- Group cold start: channel-seeded groups.
- Retention (hardest part): encouraging, low-pressure design must work in practice.
- Free-to-paid conversion: premium must be clearly worth it.
- Feature creep: simplicity principle exists to prevent this.

## Open business decisions
- Premium pricing (monthly/yearly).
- Domain, store names, trademark availability for "Groo".
- How photo-proof verification is reviewed (self vs peer).
