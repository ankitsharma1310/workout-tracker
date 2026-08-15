import type { Workout } from "../types/workout";

const KEY = "workout-history";

export function getWorkoutHistory(): Workout[] {
  const data = localStorage.getItem(KEY);
  if (!data) return [];
  try { return JSON.parse(data); } catch { return []; }
}

export function saveWorkout(workout: Workout) {
  const history = getWorkoutHistory();
  history.unshift(workout);
  localStorage.setItem(KEY, JSON.stringify(history));
}

export function deleteWorkout(id: string) {
  const history = getWorkoutHistory().filter(workout => workout.id !== id);
  localStorage.setItem(KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
