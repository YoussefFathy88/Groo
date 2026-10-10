# Groo Style Guide (approved 2026-10-10)

Direction 1 "Chunky Play". Live reference: Claude Design canvas "Groo Look Options"
(https://claude.ai/artifact/RdTWiwykazLZjU2uBXpUh7), boards `Chunky`, `ChunkyDesktop`, `Prototype`.

## Feel
- Duolingo-level energy, own identity. Never copy Duolingo's mascot, logo or UI.
- Opening the app feels exciting: big icons, playful taps, rotating fun messages, confetti at milestones.

## Type
- Font: Baloo Bhaijaan 2 (Arabic + Latin), weights 500-800.
- Headings 800, body 600-700. Arabic numerals in Arabic (٣/٥), Western in English.

## Colors
| Token | Hex | Use |
|---|---|---|
| green | #1E9E57 | brand, done badge, active nav |
| green-dark | #157A42 | pressed edges, text on green tint |
| amber | #F5A524 | streak flame, celebrations |
| amber-dark | #E08600 | amber edges |
| ink | #1F2A24 | text |
| muted | #6B7570 | secondary text |
| line | #E5E5E5 | card borders |
| bg | #FFFFFF | screens |
| streak-banner | #FFF6E0 / border #FFE2A3 | weekly streak banner |

Habit icon colors (icon box only, never the whole card): prayer #1E9E57, quran #1C8CC4, sport #F08A00, reading #7C4DDB, walk #D9437E, sleep #4C5FD5. Soft tint behind the icon when not done; solid color with white icon when done.

## Shapes
- Cards: white, 2px #E5E5E5 border, 6px bottom border (3D "pressable" look), radius 20-22px.
- Buttons: same chunky style, min height 48px.
- Pills/chips: radius 14px, 2px border.

## States
- Not done: white card, "دوس هنا / Tap me" + streak.
- Partial (3/5): white card + progress bar in the habit color.
- Done: white card + green check badge (white tick on green) in the top corner. No colored border, no colored card.
- Missed/at risk: warm and gentle, never red.

## Motion
- Tap: pop (scale ~1.09 with a small tilt, ~0.4s).
- Toast message after every check-in, rotating, never the same twice in a row.
- Milestones (3, 7, 14, 30, 60, 100, 365): overlay with big flame + confetti.

## Layout
- Phone 390px: header (logo, streak, points) → streak banner → 2-column grid → bottom nav (Today, Squad, Me).
- Desktop 1280px: nav on the start side, grid center (auto-fill), squad panel + weekly leaderboard on the end side.
- RTL for Arabic, LTR for English. Use start/end, never left/right.
