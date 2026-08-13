import { create } from "zustand";

import type {
  Workout,
  Exercise,
} from "../types/workout";

import { saveWorkout } from "../utils/storage";

import {
  getCurrentWorkout,
  saveCurrentWorkout,
  clearCurrentWorkout,
} from "../utils/currentWorkout";

const createWorkout = (): Workout => ({
  id: crypto.randomUUID(),
  name: "",
  startedAt: Date.now(),
  finishedAt: null,
  exercises: [],
});

const initialWorkout =
  getCurrentWorkout() ?? createWorkout();

function persistWorkout(workout: Workout) {
  saveCurrentWorkout(workout);
  return { workout };
}

type Store = {
  workout: Workout;

  setWorkout(workout: Workout): void;
  setWorkoutName(name: string): void;
  addExercise(exercise: Exercise): void;
  updateExercise(exercise: Exercise): void;
  removeExercise(id: string): void;
  finishWorkout(): Workout;
  resetWorkout(): void;
};

export const useWorkoutStore =
create<Store>((set, get) => ({

  workout: initialWorkout,

  setWorkout(workout) {
    set(persistWorkout(workout));
  },

  setWorkoutName(name) {
    set(state => {
      const workout = {
        ...state.workout,
        name,
      };

      return persistWorkout(workout);
    });
  },

  addExercise(exercise) {
    set(state => {
      const workout = {
        ...state.workout,
        exercises: [
          ...state.workout.exercises,
          exercise,
        ],
      };

      return persistWorkout(workout);
    });
  },

  updateExercise(exercise) {
    set(state => {
      const workout = {
        ...state.workout,
        exercises:
          state.workout.exercises.map(e =>
            e.id === exercise.id
              ? exercise
              : e
          ),
      };

      return persistWorkout(workout);
    });
  },

  removeExercise(id) {
    set(state => {
      const workout = {
        ...state.workout,
        exercises:
          state.workout.exercises.filter(
            e => e.id !== id
          ),
      };

      return persistWorkout(workout);
    });
  },

  finishWorkout() {
    const workout = {
      ...get().workout,
      finishedAt: Date.now(),
    };

    saveWorkout(workout);

    clearCurrentWorkout();

    set({ workout });

    return workout;
  },

  resetWorkout() {
    const workout = createWorkout();

    set(persistWorkout(workout));
  },

}));
