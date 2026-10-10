import { addDays, type LocalDate } from './dates';
import {
  canRevive,
  type CheckIn,
  groupStreak,
  isLate,
  personalStreak,
  type Revive,
  revivesLeft,
  type StreakRules,
} from './streaks';

// Weeks start on Saturday: 2026-10-03, 2026-10-10, 2026-10-17, ...
const rules = (restDaysPerWeek = 1, startDate = '2026-10-03'): StreakRules => ({
  startDate,
  restDaysPerWeek,
});

/** On-time check-in. */
const done = (date: LocalDate, count = 1): CheckIn => ({ date, count, loggedOn: date });
/** Check-in logged `daysLate` days after the day. */
const late = (date: LocalDate, daysLate: number, count = 1): CheckIn => ({
  date,
  count,
  loggedOn: addDays(date, daysLate),
});
const days = (from: LocalDate, n: number) => Array.from({ length: n }, (_, i) => addDays(from, i));

describe('personalStreak: basics', () => {
  test('no check-ins gives zero and pending today', () => {
    expect(personalStreak([], rules(), '2026-10-03')).toEqual({
      current: 0,
      longest: 0,
      currentStartDate: null,
      today: 'pending',
    });
  });

  test('consecutive days count up', () => {
    const s = personalStreak(
      days('2026-10-03', 5).map((d) => done(d)),
      rules(),
      '2026-10-07',
    );
    expect(s.current).toBe(5);
    expect(s.currentStartDate).toBe('2026-10-03');
    expect(s.today).toBe('done');
  });

  test('today not logged yet keeps the streak (pending, not broken)', () => {
    const s = personalStreak(
      days('2026-10-03', 4).map((d) => done(d)),
      rules(0),
      '2026-10-07',
    );
    expect(s.current).toBe(4);
    expect(s.today).toBe('pending');
  });

  test('count 0 is not a done day', () => {
    const s = personalStreak([done('2026-10-03', 0)], rules(0), '2026-10-04');
    expect(s.current).toBe(0);
  });
});

describe('personalStreak: partial days', () => {
  test('1 of 5 prayers counts as a done day', () => {
    const s = personalStreak(
      [done('2026-10-03', 1), done('2026-10-04', 5)],
      rules(0),
      '2026-10-04',
    );
    expect(s.current).toBe(2);
  });
});

describe('personalStreak: rest days', () => {
  test('one miss within the allowance keeps the streak, without adding +1', () => {
    const checkIns = ['2026-10-03', '2026-10-04', '2026-10-06'].map((d) => done(d));
    const s = personalStreak(checkIns, rules(1), '2026-10-06');
    expect(s.current).toBe(3);
    expect(s.currentStartDate).toBe('2026-10-03');
  });

  test('missing more than the allowance in one week breaks it', () => {
    // Misses on Sun 10-04 and Mon 10-05 with 1 rest day: break on Mon.
    const checkIns = ['2026-10-03', '2026-10-06', '2026-10-07'].map((d) => done(d));
    const s = personalStreak(checkIns, rules(1), '2026-10-07');
    expect(s.current).toBe(2);
    expect(s.currentStartDate).toBe('2026-10-06');
    expect(s.longest).toBe(2);
  });

  test('0 rest days: any miss breaks', () => {
    const checkIns = ['2026-10-03', '2026-10-05'].map((d) => done(d));
    expect(personalStreak(checkIns, rules(0), '2026-10-05').current).toBe(1);
  });

  test('3 rest days allow 3 misses per week', () => {
    const checkIns = ['2026-10-03', '2026-10-07', '2026-10-08'].map((d) => done(d));
    expect(personalStreak(checkIns, rules(3), '2026-10-08').current).toBe(3);
  });

  test('allowance resets on Saturday (no carry-over)', () => {
    // Fri 10-09 uses week 1's rest day; Sun 10-11 uses week 2's.
    const checkIns = [...days('2026-10-03', 6), '2026-10-10', '2026-10-12'].map((d) => done(d));
    const s = personalStreak(checkIns, rules(1), '2026-10-12');
    expect(s.current).toBe(8);
  });

  test('unused rest days do not carry into the next week', () => {
    // Week 1: no misses. Week 2: two misses with 1 rest day: break.
    const checkIns = [...days('2026-10-03', 7), '2026-10-10', '2026-10-13'].map((d) => done(d));
    const s = personalStreak(checkIns, rules(1), '2026-10-13');
    expect(s.current).toBe(1);
    expect(s.longest).toBe(8);
  });
});

describe('personalStreak: logging past days', () => {
  test('a late log of any past day repairs the personal streak', () => {
    const checkIns = [
      done('2026-10-03'),
      late('2026-10-04', 10),
      late('2026-10-05', 9),
      done('2026-10-06'),
    ];
    expect(personalStreak(checkIns, rules(0), '2026-10-06').current).toBe(4);
  });

  test('coming back after a break: history counts, new run starts', () => {
    const checkIns = [
      ...days('2026-10-03', 5).map((d) => done(d)),
      done('2026-10-20'),
      done('2026-10-21'),
    ];
    const s = personalStreak(checkIns, rules(1), '2026-10-21');
    expect(s.longest).toBe(5);
    expect(s.current).toBe(2);
  });

  test('check-ins before the habit start date are still counted', () => {
    const s = personalStreak(
      [late('2026-10-01', 3), late('2026-10-02', 2), done('2026-10-03')],
      rules(0, '2026-10-03'),
      '2026-10-03',
    );
    expect(s.current).toBe(3);
  });

  test('isLate is true only for logs after the day', () => {
    expect(isLate(done('2026-10-03'))).toBe(false);
    expect(isLate(late('2026-10-03', 1))).toBe(true);
  });
});

describe('groupStreak: 2-day window', () => {
  test('logged within 2 days counts for the group', () => {
    const checkIns = [done('2026-10-03'), late('2026-10-04', 2), done('2026-10-05')];
    expect(groupStreak(checkIns, [], rules(0), '2026-10-06').current).toBe(3);
  });

  test('logged 3+ days late does not count for the group, but does for personal', () => {
    const checkIns = [
      done('2026-10-03'),
      late('2026-10-04', 3),
      done('2026-10-05'),
      done('2026-10-06'),
    ];
    expect(groupStreak(checkIns, [], rules(0), '2026-10-07').current).toBe(2);
    expect(personalStreak(checkIns, rules(0), '2026-10-07').current).toBe(4);
  });

  test('rest days apply to the group streak too', () => {
    const checkIns = [
      done('2026-10-03'),
      late('2026-10-04', 3),
      done('2026-10-05'),
      done('2026-10-06'),
    ];
    expect(groupStreak(checkIns, [], rules(1), '2026-10-07').current).toBe(3);
  });

  test('a revive makes a late log count for the group', () => {
    const checkIns = [
      done('2026-10-03'),
      late('2026-10-04', 3),
      done('2026-10-05'),
      done('2026-10-06'),
    ];
    const revives: Revive[] = [{ date: '2026-10-04', usedOn: '2026-10-07' }];
    expect(groupStreak(checkIns, revives, rules(0), '2026-10-07').current).toBe(4);
  });

  test('a revive with no check-in that day does nothing', () => {
    const checkIns = [done('2026-10-03'), done('2026-10-05'), done('2026-10-06')];
    const revives: Revive[] = [{ date: '2026-10-04', usedOn: '2026-10-07' }];
    expect(groupStreak(checkIns, revives, rules(0), '2026-10-07').current).toBe(2);
  });
});

describe('revives', () => {
  test('3 per calendar month, reset on the 1st', () => {
    const used: Revive[] = [
      { date: '2026-09-28', usedOn: '2026-10-02' },
      { date: '2026-10-05', usedOn: '2026-10-09' },
    ];
    expect(revivesLeft(used, '2026-10-15')).toBe(1);
    expect(revivesLeft(used, '2026-11-01')).toBe(3);
  });

  test('never below 0', () => {
    const used: Revive[] = days('2026-10-01', 4).map((d) => ({ date: d, usedOn: d }));
    expect(revivesLeft(used, '2026-10-20')).toBe(0);
  });

  describe('canRevive', () => {
    const checkIns = [
      done('2026-10-03'),
      late('2026-10-04', 3),
      done('2026-10-05'),
      done('2026-10-06'),
    ];
    const target = checkIns[1];

    test('offered for a late log that would save the group streak', () => {
      expect(canRevive(target, checkIns, [], rules(0), '2026-10-07')).toBe(true);
    });

    test('not offered for an on-time log', () => {
      expect(canRevive(checkIns[0], checkIns, [], rules(0), '2026-10-07')).toBe(false);
    });

    test('not offered when the day is already revived', () => {
      const revives: Revive[] = [{ date: '2026-10-04', usedOn: '2026-10-07' }];
      expect(canRevive(target, checkIns, revives, rules(0), '2026-10-07')).toBe(false);
    });

    test('not offered when none are left this month', () => {
      const revives: Revive[] = days('2026-10-20', 3).map((d) => ({
        date: d,
        usedOn: '2026-10-23',
      }));
      expect(canRevive(target, checkIns, revives, rules(0), '2026-10-25')).toBe(false);
    });

    test('not offered when it would not raise the current group streak', () => {
      // The run broke later anyway (two misses with 0 rest days after 10-05).
      const longAgo = [...checkIns, done('2026-10-08')];
      expect(canRevive(target, longAgo, [], rules(0), '2026-10-08')).toBe(false);
    });
  });
});
