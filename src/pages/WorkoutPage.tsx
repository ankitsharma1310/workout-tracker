import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  CheckCircle2,
} from "lucide-react";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

import ExerciseCard from "../components/workout/ExerciseCard";

import { exerciseLibrary } from "../data/exercises";

import { useWorkoutStore } from "../store/workoutStore";

import { getWorkoutVolume } from "../utils/volume";
import { saveCurrentWorkout } from "../utils/currentWorkout";

export default function WorkoutPage() {

  const navigate = useNavigate();

  const {
    workout,
    addExercise,
    updateExercise,
    removeExercise,
    finishWorkout,
    setWorkoutName,
  } = useWorkoutStore();

  useEffect(() => {
    saveCurrentWorkout(workout);
  }, [workout]);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);

  }, []);

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

  function addNextExercise() {

    const remaining = exerciseLibrary.find(
      lib =>
        !workout.exercises.some(
          e => e.name === lib.name,
        ),
    );

    if (!remaining) {

      alert("All exercises added");

      return;

    }

    addExercise({

      ...remaining,

      id: crypto.randomUUID(),

      sets: [],

    });

  }

  function finish() {

    finishWorkout();

    navigate("/");

  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-5xl p-5">

        <div className="flex items-center justify-between mb-6">

          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-zinc-800 p-3"
          >
            <ArrowLeft />
          </button>

          <Button
            className="w-auto px-6"
            onClick={finish}
          >
            <CheckCircle2 size={18} />
            <span className="ml-2">
              Finish
            </span>
          </Button>

        </div>

        <Card>

          <Input
            value={workout.name}
            onChange={e =>
              setWorkoutName(
                e.target.value,
              )
            }
          />

          <div className="grid grid-cols-3 gap-4 mt-6">

            <div>

              <div className="text-zinc-500">
                Time
              </div>

              <div className="text-xl font-bold">
                {time}
              </div>

            </div>

            <div>

              <div className="text-zinc-500">
                Exercises
              </div>

              <div className="text-xl font-bold">
                {workout.exercises.length}
              </div>

            </div>

            <div>

              <div className="text-zinc-500">
                Volume
              </div>

              <div className="text-xl font-bold">
                {getWorkoutVolume(
                  workout.exercises,
                )} kg
              </div>

            </div>

          </div>

        </Card>

        <div className="h-6" />

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

        <Button
          className="mt-5"
          onClick={addNextExercise}
        >
          <Plus size={18} />
          <span className="ml-2">
            Add Exercise
          </span>
        </Button>

      </div>

    </div>

  );

}
