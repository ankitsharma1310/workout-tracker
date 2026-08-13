import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Page from "../components/layout/Page";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import BodyweightSummary from "../components/bodyweight/BodyweightSummary";

import { useWorkoutStore } from "../store/workoutStore";
import { getCurrentWorkout } from "../utils/currentWorkout";
import { cloneWorkout } from "../utils/cloneWorkout";
import { getLastWorkout } from "../utils/repeatWorkout";
import { getWorkoutHistory } from "../utils/storage";
import { getWorkoutVolume } from "../utils/volume";

function formatDuration(
  startedAt: number,
  finishedAt: number | null,
) {
  if (!finishedAt) return "In progress";

  const seconds = Math.max(
    0,
    Math.floor((finishedAt - startedAt) / 1000),
  );

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  return remaining
    ? `${hours}h ${remaining}m`
    : `${hours}h`;
}

export default function HomePage() {
  const navigate = useNavigate();

  const {
    resetWorkout,
    setWorkout,
  } = useWorkoutStore();

  const workouts = useMemo(
    () => getWorkoutHistory(),
    [],
  );

  const totalVolume = useMemo(
    () =>
      workouts.reduce(
        (sum, workout) =>
          sum +
          getWorkoutVolume(workout.exercises),
        0,
      ),
    [workouts],
  );

  const recentWorkouts = workouts.slice(0, 5);

  function startWorkout() {
    const savedWorkout = getCurrentWorkout();

    if (
      savedWorkout &&
      savedWorkout.exercises.length > 0
    ) {
      const resume = window.confirm(
        "Resume your unfinished workout?",
      );

      if (resume) {
        setWorkout(savedWorkout);
        navigate("/workout");
        return;
      }
    }

    resetWorkout();
    navigate("/workout");
  }

  function repeatLastWorkout() {
    const last = getLastWorkout();

    if (!last) return;

    setWorkout(cloneWorkout(last));
    navigate("/workout");
  }

  return (
    <Page>
      <div className="pt-2">
        <p className="text-sm font-medium text-blue-400">
          WORKOUT TRACKER
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Ready to train?
        </h1>

        <div className="mt-6 grid gap-3">
          <Button
            className="h-14 w-full text-base font-semibold"
            onClick={startWorkout}
          >
            Start Workout
          </Button>

          <Button
            className="h-14 w-full bg-zinc-800 text-base font-semibold hover:bg-zinc-700"
            onClick={repeatLastWorkout}
          >
            Repeat Last Workout
          </Button>
        </div>

        <div className="mt-8">
          <BodyweightSummary />
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Recent Workouts
            </h2>

            <button
              onClick={() => navigate("/history")}
              className="text-sm font-medium text-blue-400"
            >
              See all
            </button>
          </div>

          <div className="space-y-3">
            {recentWorkouts.length === 0 ? (
              <Card className="p-4">
                <p className="text-sm text-zinc-500">
                  No workouts yet.
                </p>
              </Card>
            ) : (
              recentWorkouts.map(workout => (
                <button
                  key={workout.id}
                  onClick={() =>
                    navigate(
                      `/history/${workout.id}`,
                    )
                  }
                  className="w-full text-left"
                >
                  <Card className="p-4 transition active:scale-[0.99]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="truncate font-semibold">
                          {workout.name}
                        </div>

                        <div className="mt-1 text-xs text-zinc-500">
                          {workout.exercises.length} exercises
                          {" • "}
                          {formatDuration(
                            workout.startedAt,
                            workout.finishedAt,
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="font-semibold">
                          {getWorkoutVolume(
                            workout.exercises,
                          ).toLocaleString()} kg
                        </div>

                        <div className="mt-1 text-xs text-zinc-500">
                          {new Date(
                            workout.finishedAt ??
                              workout.startedAt,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Workouts
            </div>

            <div className="mt-2 text-2xl font-bold">
              {workouts.length}
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Total Volume
            </div>

            <div className="mt-2 text-2xl font-bold">
              {totalVolume.toLocaleString()}
              <span className="ml-1 text-sm font-medium text-zinc-500">
                kg
              </span>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
