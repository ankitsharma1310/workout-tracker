import type { Exercise, Workout, WorkoutSet } from "../types/workout";
import { getFiveThreeOneLifts, getTrainingMax, roundToPlate } from "./strength";

export type FiveThreeOneWeek = 1 | 2 | 3 | 4;

const days = [
  { name: "Overhead Press", muscleGroup: "Shoulders" },
  { name: "Deadlift", muscleGroup: "Back" },
  { name: "Bench Press", muscleGroup: "Chest" },
  { name: "Squat", muscleGroup: "Legs" },
] as const;

const percentages: Record<FiveThreeOneWeek, [number, number, number]> = {
  1: [0.65, 0.75, 0.85],
  2: [0.70, 0.80, 0.90],
  3: [0.75, 0.85, 0.95],
  4: [0.40, 0.50, 0.60],
};

const reps: Record<FiveThreeOneWeek, [number, number, number]> = {
  1: [5, 5, 5],
  2: [3, 3, 3],
  3: [5, 3, 1],
  4: [5, 5, 5],
};

function makeSet(weight: number, targetReps: number, amrap: boolean): WorkoutSet {
  return {
    id: crypto.randomUUID(),
    weight: roundToPlate(weight),
    reps: targetReps,
    completed: false,
    ...(amrap ? { targetLabel: `${targetReps}+` } : {}),
  } as WorkoutSet;
}

function getLiftForDay(name: string) {
  return getFiveThreeOneLifts().find(item => item.name === name)?.lift;
}

export function canGenerateFiveThreeOne() {
  return days.every(day => Boolean(getLiftForDay(day.name)));
}

export function generateFiveThreeOneWorkout(week: FiveThreeOneWeek, dayIndex: number): Workout | null {
  const day = days[dayIndex];
  if (!day) return null;

  const lift = getLiftForDay(day.name);
  if (!lift) return null;

  const tm = getTrainingMax(lift.estimatedOneRepMaxKg);
  const pct = percentages[week];
  const repTargets = reps[week];
  const sets: WorkoutSet[] = pct.map((percentage, index) =>
    makeSet(tm * percentage, repTargets[index], week !== 4 && index === 2),
  );

  if (week !== 4) {
    const bbbWeight = roundToPlate(tm * 0.5);
    for (let i = 0; i < 5; i += 1) sets.push(makeSet(bbbWeight, 10, false));
  }

  const exercise: Exercise = {
    id: crypto.randomUUID(),
    name: day.name,
    muscleGroup: day.muscleGroup,
    notes: week === 4
      ? "5/3/1 deload week. No AMRAP."
      : "5/3/1 main work + Boring But Big 5x10.",
    sets,
  };

  return {
    id: crypto.randomUUID(),
    name: `5/3/1 — Week ${week} — ${day.name}`,
    startedAt: Date.now(),
    finishedAt: null,
    exercises: [exercise],
  };
}

export function getFiveThreeOneDays() {
  return days;
}

export function getFiveThreeOneTrainingMax(name: string) {
  const lift = getLiftForDay(name);
  return lift ? getTrainingMax(lift.estimatedOneRepMaxKg) : null;
}
