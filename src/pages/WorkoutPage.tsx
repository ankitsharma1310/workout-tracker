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

  const {
  workout,  addExercise,
  updateExercise,
  removeExercise,
  finishWorkout,
  setWorkoutName,
} = useWorkoutStore();

  const now = useTimer();

  const {
    settings,
  } = useSettingsStore();

  const [pickerOpen, setPickerOpen] = useState(false);

  const time = useMemo(() => {

    const started = new Date(
      workout.startedAt,
    ).getTime();

    const elapsed = Math.max(
      0,
      Math.floor((now - started) / 1000),
    );

    const h = Math.floor(elapsed / 3600);

    const m = Math.floor(
      (elapsed % 3600) / 60,
    );

    const s = elapsed % 60;

    return [h, m, s]
      .map(v => String(v).padStart(2, "0"))
      .join(":");

  }, [now, workout.startedAt]);

  function finish() {

    const workoutSummary =
      finishWorkout();

    void successHaptic();

    navigate("/workout-complete", {
      state: {
        workout: workoutSummary,
      },
    });

  }

  function addSelectedExercise(exercise: Exercise) {
    addExercise(exercise);
    void lightHaptic();
  }

  return (

    <Page>

      <div className="pb-24">

        <div className="sticky top-0 z-20 -mx-4 mb-5 border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-2xl font-bold">
                Workout
              </h1>

              <p className="text-sm text-zinc-400">
                {time}
              </p>

            </div>

            <Button
              className="w-auto px-5"
              onClick={finish}
            >
              Finish
            </Button>

          </div>

        </div>

        <Card>

          <Input
            value={workout.name}
            placeholder="Workout name"
            onFocus={e => e.target.select()}
            onChange={e =>
              setWorkoutName(
                e.target.value,
              )
            }
          />

          <div className="mt-4 text-sm text-zinc-400">
            {workout.exercises.length} exercises • {getWorkoutVolume(
              workout.exercises,
            )} {settings.weightUnit}
          </div>

        </Card>

        <div className="mt-5">
          <RestTimer />
        </div>

        <div className="mt-5 space-y-5">
          {workout.exercises.map(exercise => (

            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onChange={updateExercise}
              onDelete={() =>
                removeExercise(
                  exercise.id,
                )
              }
            />

          ))}
        </div>

      </div>

      <ExercisePicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={addSelectedExercise}
      />

      <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur">

        <div className="mx-auto max-w-md px-4 py-3 pb-[max(env(safe-area-inset-bottom),12px)]">

          <Button
            onClick={() => setPickerOpen(true)}
          >
            <Plus size={18}/>
            <span className="ml-2">
              Add Exercise
            </span>
          </Button>

        </div>

      </div>

    </Page>

  );

}
