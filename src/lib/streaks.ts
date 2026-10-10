// Streak rules. Source of truth: docs/decisions.md and docs/streak-rules.md.
import { addDays, daysBetween, type LocalDate, monthKey, weekStart } from './dates';

/** A day can be logged up to this many days late and still count for the group. */
export const GROUP_WINDOW_DAYS = 2;
export const REVIVES_PER_MONTH = 3;

export type CheckIn = {
  /** The local day the habit was done. */
  date: LocalDate;
  /** Units done that day (e.g. 3 of 5 prayers). Any value >= 1 is a done day. */
  count: number;
  /** The local day the check-in was saved. Later than `date` means a late log. */
  loggedOn: LocalDate;
};

export type Revive = {
  /** The day whose late check-in is saved for the group streak. */
  date: LocalDate;
  /** The local day the revive was used. Counts toward that month's allowance. */
  usedOn: LocalDate;
};

export type StreakRules = {
  /** The day the habit was created. */
  startDate: LocalDate;
  /** Missed days per week (Saturday to Friday) that do not break the streak. 0 to 3. */
  restDaysPerWeek: number;
};

export type Streak = {
  /** Done days in the current run. Rest days keep the run alive but add nothing. */
  current: number;
  longest: number;
  /** First done day of the current run, or null when current is 0. */
  currentStartDate: LocalDate | null;
  /** 'pending' means today is not logged yet: the gentle at-risk state. */
  today: 'done' | 'pending';
};

export function isLate(checkIn: CheckIn): boolean {
  return daysBetween(checkIn.date, checkIn.loggedOn) > 0;
}

export function isOnTimeForGroup(checkIn: CheckIn): boolean {
  return daysBetween(checkIn.date, checkIn.loggedOn) <= GROUP_WINDOW_DAYS;
}

function computeStreak(doneDays: Set<LocalDate>, rules: StreakRules, today: LocalDate): Streak {
  let first = rules.startDate;
  for (const day of doneDays) if (day < first) first = day;

  let current = 0;
  let longest = 0;
  let currentStartDate: LocalDate | null = null;
  let week = '';
  let missesThisWeek = 0;

  for (let day = first; day <= today; day = addDays(day, 1)) {
    const done = doneDays.has(day);
    // Today is never a miss: it can still be logged until midnight.
    if (day === today && !done) break;

    if (weekStart(day) !== week) {
      week = weekStart(day);
      missesThisWeek = 0;
    }

    if (done) {
      current += 1;
      currentStartDate ??= day;
      longest = Math.max(longest, current);
    } else {
      missesThisWeek += 1;
      if (missesThisWeek > rules.restDaysPerWeek) {
        current = 0;
        currentStartDate = null;
      }
    }
  }

  return { current, longest, currentStartDate, today: doneDays.has(today) ? 'done' : 'pending' };
}

/** Private streak: every check-in counts, however late it was logged. */
export function personalStreak(checkIns: CheckIn[], rules: StreakRules, today: LocalDate): Streak {
  const done = new Set(checkIns.filter((c) => c.count >= 1).map((c) => c.date));
  return computeStreak(done, rules, today);
}

/** Streak friends see: a day counts if logged within the window, or revived. */
export function groupStreak(
  checkIns: CheckIn[],
  revives: Revive[],
  rules: StreakRules,
  today: LocalDate,
): Streak {
  const revived = new Set(revives.map((r) => r.date));
  const done = new Set(
    checkIns
      .filter((c) => c.count >= 1 && (isOnTimeForGroup(c) || revived.has(c.date)))
      .map((c) => c.date),
  );
  return computeStreak(done, rules, today);
}

export function revivesLeft(revives: Revive[], today: LocalDate): number {
  const used = revives.filter((r) => monthKey(r.usedOn) === monthKey(today)).length;
  return Math.max(0, REVIVES_PER_MONTH - used);
}

/**
 * Whether to offer "Revive?" for a late check-in: it missed the group window,
 * a revive is left this month, and reviving actually raises the group streak.
 */
export function canRevive(
  checkIn: CheckIn,
  checkIns: CheckIn[],
  revives: Revive[],
  rules: StreakRules,
  today: LocalDate,
): boolean {
  if (checkIn.count < 1 || isOnTimeForGroup(checkIn)) return false;
  if (revives.some((r) => r.date === checkIn.date)) return false;
  if (revivesLeft(revives, today) === 0) return false;

  const before = groupStreak(checkIns, revives, rules, today).current;
  const after = groupStreak(
    checkIns,
    [...revives, { date: checkIn.date, usedOn: today }],
    rules,
    today,
  ).current;
  return after > before;
}
