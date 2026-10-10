// Points and the weekly group leaderboard. Source of truth: docs/decisions.md.
import { addDays, type LocalDate, weekStart } from './dates';
import { type CheckIn, isOnTimeForGroup } from './streaks';

export type ScoredCheckIn = CheckIn & { dailyTarget: number };

/** 1 point per unit done, capped at the habit's daily target. */
export function pointsFor(checkIn: ScoredCheckIn): number {
  return Math.max(0, Math.min(checkIn.count, checkIn.dailyTarget));
}

/** Personal total: every check-in counts, however late. Points are never lost. */
export function totalPoints(checkIns: ScoredCheckIn[]): number {
  return checkIns.reduce((sum, c) => sum + pointsFor(c), 0);
}

export type LeaderboardMember = {
  userId: string;
  joinedOn: LocalDate;
  /** Check-ins for this category only. The caller filters by category and opt-in. */
  checkIns: ScoredCheckIn[];
};

export type WeeklyScore = { userId: string; points: number };

/** Points for the week starting `week` (a Saturday). Only on-time check-ins count. Revives never add points. */
export function weeklyScores(members: LeaderboardMember[], week: LocalDate): WeeklyScore[] {
  return members
    .map((m) => ({
      userId: m.userId,
      points: m.checkIns
        .filter((c) => weekStart(c.date) === week && isOnTimeForGroup(c))
        .reduce((sum, c) => sum + pointsFor(c), 0),
    }))
    .sort((a, b) => b.points - a.points);
}

/**
 * Lifetime "weeks won" per member, over finished weeks only.
 * A member competes from the week they joined. Ties all win. A week with 0 points has no winner.
 */
export function weeksWon(members: LeaderboardMember[], today: LocalDate): Map<string, number> {
  const won = new Map(members.map((m) => [m.userId, 0]));
  if (members.length === 0) return won;

  const thisWeek = weekStart(today);
  let week = weekStart(members.reduce((min, m) => (m.joinedOn < min ? m.joinedOn : min), today));

  for (; week < thisWeek; week = addDays(week, 7)) {
    const weekEnd = addDays(week, 6);
    const competing = members.filter((m) => m.joinedOn <= weekEnd);
    const scores = weeklyScores(competing, week);
    const best = scores[0]?.points ?? 0;
    if (best === 0) continue;
    for (const s of scores) {
      if (s.points === best) won.set(s.userId, (won.get(s.userId) ?? 0) + 1);
    }
  }
  return won;
}
