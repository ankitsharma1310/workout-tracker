import { create } from "zustand";

import type { WorkoutRoutine } from "../types/routine";
import type { Workout } from "../types/workout";

import {
  getRoutines,
  saveRoutines,
} from "../utils/routines";

type Store = {

  routines: WorkoutRoutine[];

  saveRoutine(
    workout: Workout,
  ): void;

  deleteRoutine(
    id: string,
  ): void;

};

export const useRoutineStore =
create<Store>((set, get) => ({

  routines: getRoutines(),

  saveRoutine(workout) {

    const routines = [...get().routines];

    const routine = {

      id: crypto.randomUUID(),

      name: workout.name,

      exercises: structuredClone(
        workout.exercises,
      ),

    };

    const index =
      routines.findIndex(
        r => r.name === routine.name,
      );

    if (index >= 0) {
      routines[index] = routine;
    } else {
      routines.push(routine);
    }

    saveRoutines(routines);

    set({ routines });

  },

  deleteRoutine(id) {

    const routines =
      get().routines.filter(
        r => r.id !== id,
      );

    saveRoutines(routines);

    set({ routines });

  },

}));
