export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
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
  startedAt: string;
  finishedAt: string;
  exercises: Exercise[];
}
