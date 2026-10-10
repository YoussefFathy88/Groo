import { addDays, daysBetween, monthKey, toLocalDate, weekStart } from './dates';

describe('addDays', () => {
  test('crosses month and year ends', () => {
    expect(addDays('2026-01-31', 1)).toBe('2026-02-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });

  test('handles leap years', () => {
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29');
  });
});

describe('daysBetween', () => {
  test('counts whole days both ways', () => {
    expect(daysBetween('2026-10-10', '2026-10-12')).toBe(2);
    expect(daysBetween('2026-10-12', '2026-10-10')).toBe(-2);
    expect(daysBetween('2026-10-10', '2026-10-10')).toBe(0);
  });
});

describe('weekStart (Saturday)', () => {
  test('a Saturday is its own week start', () => {
    expect(weekStart('2026-10-10')).toBe('2026-10-10');
  });

  test('Friday belongs to the previous Saturday', () => {
    expect(weekStart('2026-10-16')).toBe('2026-10-10');
  });

  test('Sunday belongs to the Saturday before it', () => {
    expect(weekStart('2026-10-11')).toBe('2026-10-10');
  });
});

describe('monthKey', () => {
  test('returns year and month', () => {
    expect(monthKey('2026-10-10')).toBe('2026-10');
  });
});

describe('toLocalDate', () => {
  // 2026-10-10 22:30 UTC
  const instant = new Date(Date.UTC(2026, 9, 10, 22, 30));

  test('Cairo is already the next day', () => {
    expect(toLocalDate(instant, 'Africa/Cairo')).toBe('2026-10-11');
  });

  test('New York is still the same day', () => {
    expect(toLocalDate(instant, 'America/New_York')).toBe('2026-10-10');
  });
});
