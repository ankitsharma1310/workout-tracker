import { create } from "zustand";

import type {
  Exercise,
  Workout,
} from "../types/workout";

import { saveWorkout } from "../utils/storage";

function emptyWorkout(): Workout {
  return {
    id: crypto.randomUUID(),
    name: "Push Day",
    startedAt: Date.now(),
    finishedAt: null,
    exercises: [],
  };
}

interface WorkoutStore {
  workout: Workout;

  setWorkoutName(name: string): void;

  addExercise(exercise: Exercise): void;

  updateExercise(exercise: Exercise): void;

  removeExercise(id: string): void;

  finishWorkout(): void;

  resetWorkout(): void;
}

export const useWorkoutStore =
create<WorkoutStore>((set, get) => ({

  workout: emptyWorkout(),

  setWorkoutName(name) {
    set(state => ({
      workout: {
        ...state.workout,
        name,
      },
    }));
  },

  addExercise(exercise) {
    set(state => ({
      workout: {
        ...state.workout,
        exercises: [
          ...state.workout.exercises,
          exercise,
        ],
      },
    }));
  },

  updateExercise(exercise) {
    set(state => ({
      workout: {
        ...state.workout,
        exercises:
          state.workout.exercises.map(e =>
            e.id === exercise.id ? exercise : e
          ),
      },
    }));
  },

  removeExercise(id) {
    set(state => ({
      workout: {
        ...state.workout,
        exercises:
          state.workout.exercises.filter(
            e => e.id !== id
          ),
      },
    }));
  },

  finishWorkout() {

    const workout = {
      ...get().workout,
      finishedAt: Date.now(),
    };

    saveWorkout(workout);

    set({
      workout: emptyWorkout(),
    });
  },

  resetWorkout() {
    set({
      workout: emptyWorkout(),
    });
  },

}));
