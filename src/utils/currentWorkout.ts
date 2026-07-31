import type { Workout } from "../types/workout";

const KEY = "current-workout";

export function saveCurrentWorkout(workout: Workout) {
  localStorage.setItem(
    KEY,
    JSON.stringify(workout),
  );
}

export function getCurrentWorkout(): Workout | null {

  const data = localStorage.getItem(KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export function clearCurrentWorkout() {
  localStorage.removeItem(KEY);
}
