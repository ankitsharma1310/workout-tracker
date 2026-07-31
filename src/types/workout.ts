export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
}

export interface Exercise {
  id: string;
  name: string;
  notes?: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;

  name: string;

  startedAt: number;

  finishedAt: number | null;

  exercises: Exercise[];
}
