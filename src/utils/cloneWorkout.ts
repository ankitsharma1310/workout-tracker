import type { Workout } from "../types/workout";

export function cloneWorkout(
  workout: Workout,
): Workout {

  return {

    ...workout,

    id: crypto.randomUUID(),

    startedAt: Date.now(),

    finishedAt: null,

    exercises: workout.exercises.map(
      exercise => ({

        ...exercise,

        id: crypto.randomUUID(),

        sets: exercise.sets.map(
          set => ({

            ...set,

            id: crypto.randomUUID(),

            completed: false,

          }),
        ),

      }),
    ),

  };

}
