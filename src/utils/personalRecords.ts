import type { Workout } from "../types/workout";

export interface PersonalRecord {
  exercise: string;
  weight: number;
  reps: number;
}

export function getPersonalRecords(
  workouts: Workout[],
): PersonalRecord[] {

  const records = new Map<
    string,
    PersonalRecord
  >();

  workouts.forEach(workout => {

    workout.exercises.forEach(exercise => {

      exercise.sets.forEach(set => {

        const current =
          records.get(exercise.name);

        if (
          !current ||
          set.weight > current.weight
        ) {

          records.set(
            exercise.name,
            {
              exercise: exercise.name,
              weight: set.weight,
              reps: set.reps,
            },
          );

        }

      });

    });

  });

  return [...records.values()]
    .sort(
      (a, b) =>
        b.weight - a.weight,
    );

}
