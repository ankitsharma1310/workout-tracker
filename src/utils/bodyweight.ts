import type { BodyweightEntry } from "../types/bodyweight";

const KEY = "bodyweight-log";

export function getLocalDateKey(
  date = new Date(),
): string {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");
  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function loadEntries(): BodyweightEntry[] {
  const raw =
    localStorage.getItem(KEY);

  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      entry =>
        typeof entry?.date === "string" &&
        typeof entry?.weightKg === "number",
    );
  } catch {
    return [];
  }
}

export function getBodyweightEntries(): BodyweightEntry[] {
  return loadEntries().sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export function saveBodyweight(
  weightKg: number,
  date = getLocalDateKey(),
): void {
  const entries =
    getBodyweightEntries().filter(
      entry => entry.date !== date,
    );

  entries.push({
    date,
    weightKg,
  });

  localStorage.setItem(
    KEY,
    JSON.stringify(entries),
  );
}

export function deleteBodyweight(
  date: string,
): void {
  const entries =
    getBodyweightEntries().filter(
      entry => entry.date !== date,
    );

  localStorage.setItem(
    KEY,
    JSON.stringify(entries),
  );
}

export function getBodyweightForDate(
  date = getLocalDateKey(),
): BodyweightEntry | null {
  return (
    getBodyweightEntries().find(
      entry => entry.date === date,
    ) ?? null
  );
}

export function getRecentAverageBodyweight(
  days = 7,
): number | null {
  const entries =
    getBodyweightEntries();

  const cutoff =
    new Date();

  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(
    cutoff.getDate() - (days - 1),
  );

  const cutoffKey =
    getLocalDateKey(cutoff);

  const recent = entries.filter(
    entry => entry.date >= cutoffKey,
  );

  if (recent.length === 0) {
    return null;
  }

  return (
    recent.reduce(
      (sum, entry) =>
        sum + entry.weightKg,
      0,
    ) / recent.length
  );
}

export function kgToUnit(
  kg: number,
  unit: "kg" | "lb",
): number {
  return unit === "lb"
    ? kg * 2.2046226218
    : kg;
}

export function unitToKg(
  value: number,
  unit: "kg" | "lb",
): number {
  return unit === "lb"
    ? value / 2.2046226218
    : value;
}
