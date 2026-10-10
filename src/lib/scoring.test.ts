import { addDays, type LocalDate } from './dates';
import {
  type LeaderboardMember,
  pointsFor,
  type ScoredCheckIn,
  totalPoints,
  weeklyScores,
  weeksWon,
} from './scoring';

// Weeks start on Saturday: 2026-10-03, 2026-10-10, 2026-10-17, ...
const prayer = (date: LocalDate, count: number, daysLate = 0): ScoredCheckIn => ({
  date,
  count,
  loggedOn: addDays(date, daysLate),
  dailyTarget: 5,
});

describe('pointsFor', () => {
  test('1 point per unit: 3 of 5 prayers = 3 points', () => {
    expect(pointsFor(prayer('2026-10-03', 3))).toBe(3);
  });

  test('capped at the daily target', () => {
    expect(pointsFor(prayer('2026-10-03', 7))).toBe(5);
  });

  test('never negative', () => {
    expect(pointsFor(prayer('2026-10-03', -1))).toBe(0);
  });
});

describe('totalPoints (personal)', () => {
  test('late logs still count for personal points', () => {
    expect(totalPoints([prayer('2026-10-03', 5), prayer('2026-10-04', 2, 30)])).toBe(7);
  });
});

describe('weeklyScores', () => {
  const members: LeaderboardMember[] = [
    {
      userId: 'joee',
      joinedOn: '2026-10-01',
      checkIns: [prayer('2026-10-03', 5), prayer('2026-10-04', 4)],
    },
    {
      userId: 'ali',
      joinedOn: '2026-10-01',
      checkIns: [prayer('2026-10-03', 5), prayer('2026-10-05', 5)],
    },
  ];

  test('sums points for the week and sorts high to low', () => {
    expect(weeklyScores(members, '2026-10-03')).toEqual([
      { userId: 'ali', points: 10 },
      { userId: 'joee', points: 9 },
    ]);
  });

  test('ignores check-ins from other weeks', () => {
    expect(weeklyScores(members, '2026-10-10')).toEqual([
      { userId: 'joee', points: 0 },
      { userId: 'ali', points: 0 },
    ]);
  });

  test('late logs count only within 2 days', () => {
    const m: LeaderboardMember[] = [
      {
        userId: 'joee',
        joinedOn: '2026-10-01',
        checkIns: [prayer('2026-10-03', 5, 2), prayer('2026-10-04', 5, 3)],
      },
    ];
    expect(weeklyScores(m, '2026-10-03')).toEqual([{ userId: 'joee', points: 5 }]);
  });
});

describe('weeksWon', () => {
  test('counts finished weeks only, from the week a member joined', () => {
    const members: LeaderboardMember[] = [
      {
        userId: 'joee',
        joinedOn: '2026-10-03',
        checkIns: [prayer('2026-10-03', 5), prayer('2026-10-10', 5), prayer('2026-10-17', 5)],
      },
      {
        userId: 'ali',
        joinedOn: '2026-10-10',
        checkIns: [prayer('2026-10-11', 5), prayer('2026-10-12', 5)],
      },
    ];
    // Today is in week 3, so weeks 1 and 2 are finished. Joee wins week 1, Ali week 2.
    const won = weeksWon(members, '2026-10-18');
    expect(won.get('joee')).toBe(1);
    expect(won.get('ali')).toBe(1);
  });

  test('ties all win', () => {
    const members: LeaderboardMember[] = [
      { userId: 'joee', joinedOn: '2026-10-03', checkIns: [prayer('2026-10-03', 3)] },
      { userId: 'ali', joinedOn: '2026-10-03', checkIns: [prayer('2026-10-04', 3)] },
    ];
    const won = weeksWon(members, '2026-10-10');
    expect(won.get('joee')).toBe(1);
    expect(won.get('ali')).toBe(1);
  });

  test('a week where nobody scored has no winner', () => {
    const members: LeaderboardMember[] = [{ userId: 'joee', joinedOn: '2026-10-03', checkIns: [] }];
    expect(weeksWon(members, '2026-10-20').get('joee')).toBe(0);
  });

  test('no members gives an empty result', () => {
    expect(weeksWon([], '2026-10-20').size).toBe(0);
  });
});
