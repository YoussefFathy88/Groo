import type { IconName } from '@/components/icons';

// The 12 icons in the Add habit picker, in canvas order, with each icon's color.
// A habit has no color column: its color always comes from its icon.
export const HABIT_ICONS = [
  { icon: 'mosque', color: '#15A655' },
  { icon: 'book', color: '#1C8CC4' },
  { icon: 'dumbbell', color: '#F08A00' },
  { icon: 'read', color: '#7C4DDB' },
  { icon: 'walk', color: '#D9437E' },
  { icon: 'moon', color: '#4C5FD5' },
  { icon: 'drop', color: '#1C8CC4' },
  { icon: 'sun', color: '#F08A00' },
  { icon: 'heart', color: '#D9437E' },
  { icon: 'pen', color: '#4C5FD5' },
  { icon: 'cap', color: '#7C4DDB' },
  { icon: 'leaf', color: '#15A655' },
] as const satisfies readonly { icon: IconName; color: string }[];

export type HabitIcon = (typeof HABIT_ICONS)[number]['icon'];

const FALLBACK_COLOR = '#15A655';

export function isHabitIcon(icon: string): icon is HabitIcon {
  return HABIT_ICONS.some((h) => h.icon === icon);
}

export function habitColor(icon: string): string {
  return HABIT_ICONS.find((h) => h.icon === icon)?.color ?? FALLBACK_COLOR;
}

/** Icon box background: the habit color at ~12% opacity (canvas uses alpha 1F). */
export function habitTint(icon: string): string {
  return `${habitColor(icon)}1F`;
}
