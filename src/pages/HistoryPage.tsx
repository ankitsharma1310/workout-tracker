import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Page from "../components/layout/Page";
import Card from "../components/ui/Card";

import { getWorkoutHistory } from "../utils/storage";
import { getWorkoutVolume } from "../utils/volume";

function formatDuration(
  startedAt: number,
  finishedAt: number | null,
) {
  if (!finishedAt) return "In progress";

  const minutes = Math.floor(
    Math.max(
      0,
      finishedAt - startedAt,
    ) / 60000,
  );

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  return remaining
    ? `${hours}h ${remaining}m`
    : `${hours}h`;
}

export default function HistoryPage() {
  const navigate = useNavigate();

  const workouts = useMemo(
    () => getWorkoutHistory(),
    [],
  );

  return (
    <Page>
      <div className="pt-2">
        <h1 className="text-3xl font-bold tracking-tight">
          History
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Your completed workouts
        </p>

        <div className="mt-6 space-y-3">
          {workouts.length === 0 ? (
            <Card className="p-5">
              <p className="text-sm text-zinc-500">
                No workouts yet.
              </p>
            </Card>
          ) : (
            workouts.map(workout => (
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
                        {new Date(
                          workout.finishedAt ??
                            workout.startedAt,
                        ).toLocaleDateString()}
                        {" • "}
                        {workout.exercises.length} exercises
                        {" • "}
                        {formatDuration(
                          workout.startedAt,
                          workout.finishedAt,
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-right font-semibold">
                      {getWorkoutVolume(
                        workout.exercises,
                      ).toLocaleString()}
                      <div className="text-xs font-normal text-zinc-500">
                        kg
                      </div>
                    </div>
                  </div>
                </Card>
              </button>
            ))
          )}
        </div>
      </div>
    </Page>
  );
}
