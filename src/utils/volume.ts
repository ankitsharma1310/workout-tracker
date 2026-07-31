import type { Exercise } from "../types/workout";

export function getWorkoutVolume(exercises: Exercise[]) {
  return exercises.reduce((total, exercise) => {
    return (
      total +
      exercise.sets.reduce(
        (sum, set) => sum + set.weight * set.reps,
        0
      )
    );
  }, 0);
}
