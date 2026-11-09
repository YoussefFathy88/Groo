import type { HabitIcon } from '@/lib/habitIcons';

// Ready-made habits, added with one tap (decided 2026-10-10, list in docs/decisions.md).
// This is data: edit the list here to change templates.
export type HabitTemplate = {
  id: string;
  icon: HabitIcon;
  dailyTarget: number;
  /** Fixed category (leaderboard-eligible) or null for a personal habit. */
  categoryKey: 'prayer' | 'quran' | 'sport' | null;
  name: { ar: string; en: string };
};

export const TEMPLATES: readonly HabitTemplate[] = [
  { id: 'prayer', icon: 'mosque', dailyTarget: 5, categoryKey: 'prayer', name: { ar: 'الصلاة في المسجد', en: 'Prayer at masjid' } },
  { id: 'quran', icon: 'book', dailyTarget: 1, categoryKey: 'quran', name: { ar: 'ورد القرآن', en: 'Daily Quran' } },
  { id: 'sport', icon: 'dumbbell', dailyTarget: 1, categoryKey: 'sport', name: { ar: 'رياضة يومية', en: 'Daily workout' } },
  { id: 'read', icon: 'read', dailyTarget: 1, categoryKey: null, name: { ar: 'قراءة ١٠ صفحات', en: 'Read 10 pages' } },
  { id: 'walk', icon: 'walk', dailyTarget: 1, categoryKey: null, name: { ar: 'مشي ٣٠ دقيقة', en: 'Walk 30 min' } },
  { id: 'water', icon: 'drop', dailyTarget: 8, categoryKey: null, name: { ar: '٨ كوبايات مية', en: 'Drink 8 glasses' } },
  { id: 'adhkar', icon: 'sun', dailyTarget: 2, categoryKey: null, name: { ar: 'أذكار الصباح والمسا', en: 'Morning & evening adhkar' } },
  { id: 'sleep', icon: 'moon', dailyTarget: 1, categoryKey: null, name: { ar: 'نوم بدري', en: 'Sleep early' } },
];
