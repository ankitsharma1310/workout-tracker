import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import { useSettingsStore } from "../../store/settingsStore";

import type { Workout } from "../../types/workout";

import { formatDuration } from "../../utils/duration";
import { getWorkoutVolume } from "../../utils/volume";

type Props = {
  workout: Workout;
};

export default function HistoryCard({
  workout,
}: Props) {

  const navigate = useNavigate();

  const {
    settings,
  } = useSettingsStore();

  return (

    <button
      className="block w-full text-left"
      onClick={() => navigate(`/history/${workout.id}`)}
    >

      <Card>

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              {workout.name || "Untitled Workout"}
            </h2>

            <p className="text-sm text-zinc-400 mt-1">
              {new Date(workout.startedAt).toLocaleDateString()}
            </p>

          </div>

          <div className="text-right">

            <div className="font-semibold">
              {formatDuration(
                workout.startedAt,
                workout.finishedAt ?? workout.startedAt,
              )}
            </div>

            <div className="text-sm text-zinc-400">
              {getWorkoutVolume(workout.exercises)} {settings.weightUnit}
            </div>

          </div>

        </div>

      </Card>

    </button>

  );

}
