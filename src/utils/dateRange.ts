export interface DateRange {
  startDate: string;
  endDate: string;
  current: boolean;
}

function parseDate(value: string, endOfPeriod = false): string {
  const trimmed = value.trim();
  const isoDate = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDate && isValidDate(Number(isoDate[1]), Number(isoDate[2]), Number(isoDate[3]))) {
    return trimmed;
  }

  const yearOnly = trimmed.match(/^(\d{4})$/);
  if (yearOnly) return `${yearOnly[1]}-${endOfPeriod ? "12-31" : "01-01"}`;

  const monthNames: Record<string, number> = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3,
    apr: 4, april: 4, may: 5, jun: 6, june: 6, jul: 7, july: 7,
    aug: 8, august: 8, sep: 9, sept: 9, september: 9, oct: 10,
    october: 10, nov: 11, november: 11, dec: 12, december: 12,
  };
  const monthDate = trimmed.match(/^([a-z]+)\s+(\d{1,2})(?:,)?\s+(\d{4})$/i);
  const dayDate = trimmed.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i);
  const monthYear = trimmed.match(/^([a-z]+)\s+(\d{4})$/i);
  const month = monthNames[(monthDate?.[1] ?? dayDate?.[2] ?? monthYear?.[1] ?? "").toLowerCase()];
  const year = Number(monthDate?.[3] ?? dayDate?.[3] ?? monthYear?.[2]);

  if (month && year) {
    const day = Number(monthDate?.[2] ?? dayDate?.[1] ?? (endOfPeriod ? new Date(year, month, 0).getDate() : 1));
    if (!isValidDate(year, month, day)) return "";
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return "";

  const parsedYear = parsed.getFullYear();
  const parsedMonth = parsed.getMonth();
  const day = endOfPeriod && !/\d{1,2},?\s+\d{4}$/.test(trimmed)
    ? new Date(parsedYear, parsedMonth + 1, 0).getDate()
    : parsed.getDate();
  if (!isValidDate(parsedYear, parsedMonth + 1, day)) return "";
  return `${parsedYear}-${String(parsedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day;
}

export function parseDateRange(value: string): DateRange {
  const parts = value.split(/\s*(?:–|—|\s-\s|\bto\b)\s*/i);
  const startDate = parseDate(parts[0] ?? "");
  const endText = parts[1]?.trim() ?? "";
  const current = /^(present|current|now|saat ini)$/i.test(endText);

  if (parts.length > 1) {
    return {
      startDate,
      endDate: current ? "" : parseDate(endText, true),
      current,
    };
  }

  return {
    startDate,
    endDate: startDate && !/^\d{4}$/.test(value.trim()) ? parseDate(value, true) : "",
    current: false,
  };
}

function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatDateRange({ startDate, endDate, current }: DateRange): string {
  if (!parseDate(startDate) || (endDate && !parseDate(endDate))) return "";
  const start = formatDate(startDate);
  if (current) return `${start} – Present`;
  if (!endDate) return start;
  const end = formatDate(endDate);
  return start === end ? start : `${start} – ${end}`;
}

export function sortByLatestDate<T extends { date?: string | null }>(
  items: T[],
): T[] {
  const getTimestamp = (value: string | null | undefined) => {
    const range = parseDateRange(value ?? "");
    if (range.current) return Date.now();

    const latestDate = range.endDate || range.startDate;
    return latestDate
      ? new Date(`${latestDate}T00:00:00Z`).getTime()
      : Number.NEGATIVE_INFINITY;
  };

  return [...items].sort(
    (left, right) => getTimestamp(right.date) - getTimestamp(left.date),
  );
}
