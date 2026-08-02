import { getWorkoutHistory } from "./storage";

import type { Workout } from "../types/workout";

export function getLastWorkout(): Workout | null {

  const history = getWorkoutHistory();

  return history.length
    ? history[0]
    : null;

}
