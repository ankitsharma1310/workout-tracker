import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/Button";
import { getWorkoutHistory, deleteWorkout } from "../utils/storage";
import { getWorkoutVolume } from "../utils/volume";
import { formatDuration } from "../utils/duration";
import { useSettingsStore } from "../store/settingsStore";
import { exportWorkoutPdf } from "../utils/workoutPdf";

export default function WorkoutDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { settings } = useSettingsStore();
  const [refresh, setRefresh] = useState(0);
  void refresh;
  const workout = getWorkoutHistory().find(item => item.id === id);

  if (!workout) {
    return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Workout not found.</div>;
  }

  function remove() {
    if (!window.confirm(`Delete "${workout.name || "Untitled Workout"}" from history?`)) return;
    deleteWorkout(workout.id);
    setRefresh(value => value + 1);
    navigate("/history", { replace: true });
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl p-5 pb-12">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => navigate("/history")} className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800"><ArrowLeft size={20} /></button>
          <div className="flex gap-2">
            <Button className="h-11 px-4 text-sm" onClick={() => exportWorkoutPdf(workout, settings.weightUnit)}><Download size={17} /><span className="ml-2">Export PDF</span></Button>
            <button type="button" onClick={remove} aria-label="Delete workout" className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-red-400"><Trash2 size={18} /></button>
          </div>
        </div>

        <h1 className="mt-7 text-4xl font-bold">{workout.name || "Untitled Workout"}</h1>
        <p className="mt-2 text-zinc-400">{new Date(workout.startedAt).toLocaleString()}</p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div><div className="text-zinc-500">Duration</div><div className="text-xl font-bold">{formatDuration(workout.startedAt, workout.finishedAt ?? workout.startedAt)}</div></div>
          <div><div className="text-zinc-500">Volume</div><div className="text-xl font-bold">{getWorkoutVolume(workout.exercises)} {settings.weightUnit}</div></div>
        </div>

        <div className="mt-10 space-y-8">
          {workout.exercises.map(exercise => (
            <div key={exercise.id} className="rounded-2xl bg-zinc-900 p-5">
              <h2 className="mb-1 text-2xl font-bold">{exercise.name}</h2>
              <p className="mb-4 text-xs text-zinc-500">{exercise.muscleGroup}</p>
              <table className="w-full"><thead><tr className="text-zinc-500"><th className="text-left">Set</th><th className="text-left">Weight</th><th className="text-left">Reps</th><th className="text-left">Status</th></tr></thead><tbody>{exercise.sets.map((set, index) => <tr key={set.id} className="border-t border-zinc-800"><td className="py-3">{index + 1}</td><td>{set.weight}</td><td>{set.reps}</td><td className={set.completed ? "text-green-400" : "text-zinc-500"}>{set.completed ? "Done" : "—"}</td></tr>)}</tbody></table>
              {exercise.notes && <p className="mt-3 text-sm text-zinc-400">{exercise.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
