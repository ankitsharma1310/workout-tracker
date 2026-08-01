import type { WorkoutRoutine } from "../types/routine";

const KEY = "workout-routines";

export function getRoutines(): WorkoutRoutine[] {

  const data = localStorage.getItem(KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }

}

export function saveRoutines(
  routines: WorkoutRoutine[],
) {

  localStorage.setItem(
    KEY,
    JSON.stringify(routines),
  );

}
