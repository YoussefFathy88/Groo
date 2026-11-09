import type { HabitTemplate } from '@/data/templates';

export const NAME_MAX = 30;
export const TARGET_MIN = 1;
export const TARGET_MAX = 10;

export type Lang = 'ar' | 'en';

/** A habit row as the app reads it. */
export type Habit = {
  id: string;
  name: string;
  icon: string;
  daily_target: number;
  category_key: string | null;
  rest_days_per_week: number;
  created_at: string;
};

/** Columns the client may insert (user_id comes from auth.uid()). */
export type HabitInsert = {
  name: string;
  icon: string;
  daily_target: number;
  category_key: string | null;
};

/** Trim and collapse spaces. Returns null when empty or too long. */
export function cleanName(raw: string): string | null {
  const name = raw.replace(/\s+/g, ' ').trim();
  if (name.length === 0 || [...name].length > NAME_MAX) return null;
  return name;
}

export function clampTarget(n: number): number {
  if (!Number.isFinite(n)) return TARGET_MIN;
  return Math.min(TARGET_MAX, Math.max(TARGET_MIN, Math.round(n)));
}

/** Template names are saved in the user's current language (decided 2026-11-09). */
export function templateToInsert(template: HabitTemplate, lang: Lang): HabitInsert {
  return {
    name: template.name[lang],
    icon: template.icon,
    daily_target: template.dailyTarget,
    category_key: template.categoryKey,
  };
}

/**
 * A template counts as added when the user has an active habit from it:
 * same fixed category, or (for personal templates) same icon and its name in either language.
 */
export function isTemplateAdded(template: HabitTemplate, habits: readonly Habit[]): boolean {
  if (template.categoryKey) {
    return habits.some((h) => h.category_key === template.categoryKey);
  }
  const names = [template.name.ar, template.name.en];
  return habits.some((h) => h.category_key === null && h.icon === template.icon && names.includes(h.name));
}
