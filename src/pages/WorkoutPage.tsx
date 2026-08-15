import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Page from "../components/layout/Page";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import ExerciseCard from "../components/workout/ExerciseCard";
import { useWorkoutStore } from "../store/workoutStore";
import { useSettingsStore } from "../store/settingsStore";
import { getWorkoutVolume } from "../utils/volume";
import RestTimer from "../components/rest/RestTimer";
import ExercisePicker from "../components/exercise/ExercisePicker";
import { useTimer } from "../hooks/useTimer";
import type { Exercise } from "../types/workout";
import { lightHaptic, successHaptic } from "../utils/haptics";

export default function WorkoutPage() {
  const navigate = useNavigate();
  const { workout, addExercise, updateExercise, removeExercise, finishWorkout, setWorkoutName } = useWorkoutStore();
  const now = useTimer();
  const { settings } = useSettingsStore();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);

  const time = useMemo(() => {
    const elapsed = Math.max(0, Math.floor((now - new Date(workout.startedAt).getTime()) / 1000));
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    return [h, m, s].map(v => String(v).padStart(2, "0")).join(":");
  }, [now, workout.startedAt]);

  function finish() {
    const workoutSummary = finishWorkout();
    void successHaptic();
    navigate("/workout-complete", { state: { workout: workoutSummary } });
  }

  function addSelectedExercise(exercise: Exercise) {
    addExercise(exercise);
    setActiveExerciseId(exercise.id);
    void lightHaptic();
  }

  function toggleExercise(id: string) {
    setActiveExerciseId(current => current === id ? null : id);
  }

  return (
    <Page>
      <div className="pb-24">
        <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold">Workout</h1><p className="text-sm text-zinc-400">{time}</p></div><Button className="h-11 w-auto px-5 text-sm" onClick={finish}>Finish</Button></div>
        </div>
        <Card>
          <Input value={workout.name} placeholder="Workout name" onFocus={e => e.currentTarget.select()} onChange={e => setWorkoutName(e.target.value)} />
          <div className="mt-4 text-sm text-zinc-400">{workout.exercises.length} exercises • {getWorkoutVolume(workout.exercises)} {settings.weightUnit}</div>
        </Card>
        <div className="mt-5"><RestTimer /></div>
        <div className="mt-5 space-y-5">
          {workout.exercises.map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onChange={updateExercise}
              onDelete={() => removeExercise(exercise.id)}
              collapsed={activeExerciseId !== null && activeExerciseId !== exercise.id}
              onToggle={() => toggleExercise(exercise.id)}
              onAddSet={() => setActiveExerciseId(exercise.id)}
            />
          ))}
        </div>
      </div>
      <ExercisePicker open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={addSelectedExercise} />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800/80 bg-zinc-950/95 px-4 pt-2 pb-[max(env(safe-area-inset-bottom),8px)] backdrop-blur-xl">
        <div className="mx-auto w-full max-w-md"><Button className="h-12 w-full text-sm" onClick={() => setPickerOpen(true)}><Plus size={18}/><span className="ml-2">Add Exercise</span></Button></div>
      </div>
    </Page>
  );
}
