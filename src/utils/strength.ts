import type { StrengthLift } from "../types/strength";

const KEY = "workout-strength-profile";

const defaultLifts = ["Squat", "Deadlift", "Bench Press", "Overhead Press"];

function read(): StrengthLift[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(lifts: StrengthLift[]) {
  localStorage.setItem(KEY, JSON.stringify(lifts));
}

export function getStrengthLifts() {
  return read().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getStrengthLift(name: string) {
  return read().find(lift => lift.name === name);
}

export function estimateOneRepMax(weightKg: number, reps: number) {
  if (reps <= 1) return weightKg;
  return weightKg * (1 + reps / 30);
}

export function roundToPlate(valueKg: number, increment = 2.5) {
  return Math.round(valueKg / increment) * increment;
}

export function getTrainingMax(oneRepMaxKg: number) {
  return roundToPlate(oneRepMaxKg * 0.9);
}

export function saveStrengthLift(name: string, weightKg: number, reps: number) {
  if (!name.trim() || !Number.isFinite(weightKg) || weightKg <= 0 || !Number.isInteger(reps) || reps < 1 || reps > 100) return;

  const estimatedOneRepMaxKg = estimateOneRepMax(weightKg, reps);
  const lift: StrengthLift = {
    id: getStrengthLift(name)?.id ?? crypto.randomUUID(),
    name: name.trim(),
    weightKg,
    reps,
    estimatedOneRepMaxKg,
    updatedAt: Date.now(),
  };

  write([...read().filter(item => item.name !== lift.name), lift]);
}

export function deleteStrengthLift(id: string) {
  write(read().filter(lift => lift.id !== id));
}

export function getFiveThreeOneLifts() {
  return defaultLifts.map(name => ({ name, lift: getStrengthLift(name) }));
}

export { defaultLifts };
