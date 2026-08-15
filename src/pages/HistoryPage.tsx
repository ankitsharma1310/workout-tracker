import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Page from "../components/layout/Page";
import Card from "../components/ui/Card";
import { getWorkoutHistory, deleteWorkout } from "../utils/storage";
import { getWorkoutVolume } from "../utils/volume";
import { useSettingsStore } from "../store/settingsStore";
import { exportHistoryPdf } from "../utils/historyPdf";

function formatDuration(startedAt: number, finishedAt: number | null) {
  if (!finishedAt) return "In progress";
  const minutes = Math.floor(Math.max(0, finishedAt - startedAt) / 60000);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining ? `${hours}h ${remaining}m` : `${hours}h`;
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const { settings } = useSettingsStore();
  const [workouts, setWorkouts] = useState(() => getWorkoutHistory());

  function removeWorkout(id: string, name: string) {
    if (!window.confirm(`Delete \"${name || "Untitled Workout"}\" from history?`)) return;
    deleteWorkout(id);
    setWorkouts(getWorkoutHistory());
  }

  return (
    <Page>
      <div className="pt-2 pb-24">
        <div className="flex items-start justify-between gap-3">
          <div><h1 className="text-3xl font-bold tracking-tight">History</h1><p className="mt-1 text-sm text-zinc-500">Your completed workouts</p></div>
          {workouts.length > 0 && <button type="button" onClick={() => exportHistoryPdf(workouts, settings.weightUnit)} className="flex h-11 shrink-0 items-center rounded-xl bg-zinc-800 px-3 text-sm font-semibold active:scale-[0.98]"><Download size={17} /><span className="ml-2">Export PDF</span></button>}
        </div>
        <div className="mt-6 space-y-3">
          {workouts.length === 0 ? <Card className="p-5"><p className="text-sm text-zinc-500">No workouts yet.</p></Card> : workouts.map(workout => (
            <Card key={workout.id} className="p-4">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(`/history/${workout.id}`)} className="min-w-0 flex-1 text-left active:scale-[0.99]"><div className="truncate font-semibold">{workout.name || "Untitled Workout"}</div><div className="mt-1 text-xs text-zinc-500">{new Date(workout.finishedAt ?? workout.startedAt).toLocaleDateString()} • {workout.exercises.length} exercises • {formatDuration(workout.startedAt, workout.finishedAt)}</div></button>
                <div className="shrink-0 text-right"><div className="font-semibold">{getWorkoutVolume(workout.exercises).toLocaleString()}</div><div className="text-xs font-normal text-zinc-500">kg</div></div>
                <button type="button" onClick={() => removeWorkout(workout.id, workout.name)} aria-label={`Delete ${workout.name || "workout"}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-red-400 active:scale-95"><Trash2 size={18} /></button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
}
