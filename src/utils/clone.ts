import type {
  Exercise,
  Workout,
  WorkoutSet,
} from "../types/workout";

export function cloneSet(
  set: WorkoutSet,
): WorkoutSet {

  return {
    ...set,
    id: crypto.randomUUID(),
    completed: false,
  };

}

export function cloneExercise(
  exercise: Exercise,
): Exercise {

  return {

    ...structuredClone(exercise),

    id: crypto.randomUUID(),

    sets: exercise.sets.map(
      cloneSet,
    ),

  };

}

export function cloneWorkout(
  workout: Workout,
): Workout {

  return {

    ...structuredClone(workout),

    id: crypto.randomUUID(),

    startedAt: Date.now(),

    finishedAt: null,

    exercises:
      workout.exercises.map(
        cloneExercise,
      ),

  };

}
