// Plain local dates as 'YYYY-MM-DD' strings. All math runs in UTC on these
// strings, so the device timezone can never shift a day. See docs/decisions.md.

export type LocalDate = string;

const MS_PER_DAY = 86_400_000;
const SATURDAY = 6;

function toUtcMs(date: LocalDate): number {
  const [y, m, d] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function fromUtcMs(ms: number): LocalDate {
  return new Date(ms).toISOString().slice(0, 10);
}

export function addDays(date: LocalDate, days: number): LocalDate {
  return fromUtcMs(toUtcMs(date) + days * MS_PER_DAY);
}

/** Whole days from `from` to `to` (negative if `to` is earlier). */
export function daysBetween(from: LocalDate, to: LocalDate): number {
  return Math.round((toUtcMs(to) - toUtcMs(from)) / MS_PER_DAY);
}

/** The Saturday that starts the week containing `date`. */
export function weekStart(date: LocalDate): LocalDate {
  const day = new Date(toUtcMs(date)).getUTCDay();
  return addDays(date, -((day - SATURDAY + 7) % 7));
}

/** 'YYYY-MM' of a date. Used for the monthly revive allowance. */
export function monthKey(date: LocalDate): string {
  return date.slice(0, 7);
}

/** The local date of `instant` in the given IANA timezone (the phone's current one). */
export function toLocalDate(instant: Date, timeZone: string): LocalDate {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(instant);
}
