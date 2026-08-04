import { useLocation, useNavigate } from "react-router-dom";

import Page from "../components/layout/Page";
import Button from "../components/ui/Button";
import { useSettingsStore } from "../store/settingsStore";
import { useWorkoutStore } from "../store/workoutStore";
import type { Workout } from "../types/workout";
import { formatDuration } from "../utils/duration";
import { getWorkoutVolume } from "../utils/volume";

type LocationState = {
  workout?: Workout;
};

export default function WorkoutCompletePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { resetWorkout } = useWorkoutStore();
  const { settings } = useSettingsStore();

  const workout =
    (state as LocationState | null)?.workout;

  function done() {
    resetWorkout();
    navigate("/", { replace: true });
  }

  if (!workout) {
    return (
      <Page>
        <div className="pt-16 text-center">
          <h1 className="text-2xl font-bold">
            Workout Complete
          </h1>

          <p className="mt-2 text-zinc-400">
            Your workout summary is unavailable.
          </p>

          <Button
            className="mt-8 h-12"
            onClick={done}
          >
            Done
          </Button>
        </div>
      </Page>
    );
  }

  const completedSets =
    workout.exercises.reduce(
      (total, exercise) =>
        total + exercise.sets.filter(
          set => set.completed,
        ).length,
      0,
    );

  return (
    <Page>
      <div className="pt-16 text-center">
        <div className="text-5xl">🎉</div>

        <h1 className="mt-4 text-3xl font-bold">
          Workout Complete
        </h1>

        <p className="mt-2 text-xl font-semibold">
          {workout.name || "Untitled Workout"}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 text-left">
          <SummaryItem
            label="Duration"
            value={formatDuration(
              workout.startedAt,
              workout.finishedAt ?? Date.now(),
            )}
          />
          <SummaryItem
            label="Volume"
            value={`${getWorkoutVolume(
              workout.exercises,
            )} ${settings.weightUnit}`}
          />
          <SummaryItem
            label="Exercises"
            value={String(workout.exercises.length)}
          />
          <SummaryItem
            label="Completed sets"
            value={String(completedSets)}
          />
        </div>

        <Button
          className="mt-8 h-12"
          onClick={done}
        >
          Done
        </Button>
      </div>
    </Page>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-4">
      <div className="text-sm text-zinc-400">
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}
