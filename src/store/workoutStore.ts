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
  name: "New Workout",
  startedAt: Date.now(),
  finishedAt: null,
  exercises: [],
});

const initialWorkout =
  getCurrentWorkout() ?? createWorkout();

type Store = {
  workout: Workout;

  setWorkout(workout: Workout): void;
  setWorkoutName(name: string): void;
  addExercise(exercise: Exercise): void;
  updateExercise(exercise: Exercise): void;
  removeExercise(id: string): void;
  finishWorkout(): void;
  resetWorkout(): void;
};

export const useWorkoutStore =
create<Store>((set, get) => ({

  workout: initialWorkout,

  setWorkout(workout) {
    saveCurrentWorkout(workout);
    set({ workout });
  },

  setWorkoutName(name) {
    set(state => {
      const workout = {
        ...state.workout,
        name,
      };

      saveCurrentWorkout(workout);

      return { workout };
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

      saveCurrentWorkout(workout);

      return { workout };
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

      saveCurrentWorkout(workout);

      return { workout };
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

      saveCurrentWorkout(workout);

      return { workout };
    });
  },

  finishWorkout() {
    const workout = {
      ...get().workout,
      finishedAt: Date.now(),
    };

    saveWorkout(workout);

    clearCurrentWorkout();

    set({
      workout: createWorkout(),
    });
  },

  resetWorkout() {
    const workout = createWorkout();

    saveCurrentWorkout(workout);

    set({
      workout,
    });
  },

}));
