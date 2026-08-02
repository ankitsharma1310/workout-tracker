import { getWorkoutHistory } from "./storage";

export function getPreviousPerformance(
  exerciseName: string,
) {

  const history = getWorkoutHistory();

  for (const workout of history) {

    const exercise =
      workout.exercises.find(
        e => e.name === exerciseName,
      );

    if (exercise) {
      return exercise;
    }

  }

  return null;

}
