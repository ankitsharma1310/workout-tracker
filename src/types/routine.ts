import type { Exercise } from "./workout";

export interface WorkoutRoutine {
  id: string;
  name: string;
  exercises: Exercise[];
}
