import type { Workout } from "../types/workout";
import { getWorkoutVolume } from "./volume";

function getCurrentStreak(workouts: Workout[]) {

  if (workouts.length === 0) {
    return 0;
  }

  const days = new Set(
    workouts.map(workout =>
      new Date(workout.finishedAt ?? workout.startedAt)
        .toISOString()
        .slice(0, 10),
    ),
  );

  let streak = 0;

  const date = new Date();

  while (true) {

    const key = date
      .toISOString()
      .slice(0, 10);

    if (!days.has(key)) {
      break;
    }

    streak++;

    date.setDate(
      date.getDate() - 1,
    );

  }

  return streak;

}

export function getStatistics(
  workouts: Workout[],
) {

  const totalWorkouts = workouts.length;

  const totalExercises =
    workouts.reduce(
      (sum, workout) =>
        sum + workout.exercises.length,
      0,
    );

  const totalSets =
    workouts.reduce(
      (sum, workout) =>
        sum +
        workout.exercises.reduce(
          (exerciseSum, exercise) =>
            exerciseSum +
            exercise.sets.length,
          0,
        ),
      0,
    );

  const totalVolume =
    workouts.reduce(
      (sum, workout) =>
        sum +
        getWorkoutVolume(
          workout.exercises,
        ),
      0,
    );

  const counts = new Map<string, number>();

  workouts.forEach(workout => {

    workout.exercises.forEach(exercise => {

      counts.set(
        exercise.name,
        (counts.get(exercise.name) ?? 0) + 1,
      );

    });

  });

  const most =
    [...counts.entries()]
      .sort((a, b) => b[1] - a[1])[0];

  return {

    totalWorkouts,

    totalExercises,

    totalSets,

    totalVolume,

    mostTrainedExercise:
      most?.[0] ?? "-",

    mostTrainedCount:
      most?.[1] ?? 0,

    currentStreak:
      getCurrentStreak(workouts),

  };

}
