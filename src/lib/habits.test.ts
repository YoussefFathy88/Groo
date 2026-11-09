import { TEMPLATES } from '@/data/templates';
import { HABIT_ICONS, habitColor, habitTint, isHabitIcon } from '@/lib/habitIcons';
import { clampTarget, cleanName, type Habit, isTemplateAdded, NAME_MAX, templateToInsert } from '@/lib/habits';

const habit = (over: Partial<Habit>): Habit => ({
  id: 'h1',
  name: 'x',
  icon: 'leaf',
  daily_target: 1,
  category_key: null,
  rest_days_per_week: 1,
  created_at: '2026-11-09T10:00:00Z',
  ...over,
});

const byId = (id: string) => {
  const t = TEMPLATES.find((x) => x.id === id);
  if (!t) throw new Error(`no template ${id}`);
  return t;
};

describe('cleanName', () => {
  it('trims and collapses spaces', () => {
    expect(cleanName('  ورد   استغفار ')).toBe('ورد استغفار');
  });
  it('rejects empty and whitespace-only names', () => {
    expect(cleanName('')).toBeNull();
    expect(cleanName('   ')).toBeNull();
  });
  it('allows exactly the max length and rejects longer', () => {
    expect(cleanName('a'.repeat(NAME_MAX))).toHaveLength(NAME_MAX);
    expect(cleanName('a'.repeat(NAME_MAX + 1))).toBeNull();
  });
});

describe('clampTarget', () => {
  it('keeps 1-10 and clamps outside', () => {
    expect(clampTarget(5)).toBe(5);
    expect(clampTarget(0)).toBe(1);
    expect(clampTarget(11)).toBe(10);
    expect(clampTarget(Number.NaN)).toBe(1);
    expect(clampTarget(2.6)).toBe(3);
  });
});

describe('templateToInsert', () => {
  it('uses the current language name and template values', () => {
    expect(templateToInsert(byId('prayer'), 'en')).toEqual({
      name: 'Prayer at masjid',
      icon: 'mosque',
      daily_target: 5,
      category_key: 'prayer',
    });
    expect(templateToInsert(byId('water'), 'ar').name).toBe('٨ كوبايات مية');
  });
});

describe('isTemplateAdded', () => {
  it('matches fixed templates by category, whatever the name', () => {
    expect(isTemplateAdded(byId('prayer'), [habit({ category_key: 'prayer', name: 'renamed' })])).toBe(true);
    expect(isTemplateAdded(byId('quran'), [habit({ category_key: 'prayer' })])).toBe(false);
  });
  it('matches personal templates by icon + name in either language', () => {
    expect(isTemplateAdded(byId('sleep'), [habit({ icon: 'moon', name: 'Sleep early' })])).toBe(true);
    expect(isTemplateAdded(byId('sleep'), [habit({ icon: 'moon', name: 'نوم بدري' })])).toBe(true);
    expect(isTemplateAdded(byId('sleep'), [habit({ icon: 'moon', name: 'Nap' })])).toBe(false);
    expect(isTemplateAdded(byId('sleep'), [habit({ icon: 'leaf', name: 'Sleep early' })])).toBe(false);
  });
  it('is false with no habits', () => {
    expect(TEMPLATES.some((t) => isTemplateAdded(t, []))).toBe(false);
  });
});

describe('templates data', () => {
  it('has unique ids, valid icons, targets 1-10, names in both languages', () => {
    expect(new Set(TEMPLATES.map((t) => t.id)).size).toBe(TEMPLATES.length);
    for (const t of TEMPLATES) {
      expect(isHabitIcon(t.icon)).toBe(true);
      expect(t.dailyTarget).toBe(clampTarget(t.dailyTarget));
      expect(cleanName(t.name.ar)).toBe(t.name.ar);
      expect(cleanName(t.name.en)).toBe(t.name.en);
    }
  });
  it('uses only the seeded fixed categories', () => {
    const keys = TEMPLATES.map((t) => t.categoryKey).filter(Boolean);
    expect(keys.sort()).toEqual(['prayer', 'quran', 'sport']);
  });
});

describe('habit icons', () => {
  it('has 12 unique icons with hex colors', () => {
    expect(HABIT_ICONS).toHaveLength(12);
    expect(new Set(HABIT_ICONS.map((h) => h.icon)).size).toBe(12);
    for (const h of HABIT_ICONS) expect(h.color).toMatch(/^#[0-9A-F]{6}$/);
  });
  it('falls back to brand green for unknown icons', () => {
    expect(habitColor('nope')).toBe('#15A655');
    expect(habitTint('book')).toBe('#1C8CC41F');
  });
});
