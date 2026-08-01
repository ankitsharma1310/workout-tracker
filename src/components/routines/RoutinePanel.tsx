import { Play, Save, Trash2 } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

import type { Workout } from "../../types/workout";
import { cloneExercise } from "../../utils/clone";
import { useRoutineStore } from "../../store/routineStore";

type Props = {
  workout: Workout;
  onStart: (workout: Workout) => void;
};

export default function RoutinePanel({
  workout,
  onStart,
}: Props) {

  const {
    routines,
    saveRoutine,
    deleteRoutine,
  } = useRoutineStore();

  return (

    <Card>

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-lg font-bold">
          Workout Routines
        </h2>

        <Button
          className="w-auto px-4"
          onClick={() => saveRoutine(workout)}
        >
          <Save size={18} />
          <span className="ml-2">
            Save
          </span>
        </Button>

      </div>

      {routines.length === 0 && (
        <p className="text-zinc-500">
          No saved routines.
        </p>
      )}

      <div className="space-y-3">

        {routines.map(routine => (

          <div
            key={routine.id}
            className="flex items-center justify-between rounded-xl bg-zinc-900 p-3"
          >

            <div>

              <div className="font-semibold">
                {routine.name}
              </div>

              <div className="text-sm text-zinc-500">
                {routine.exercises.length} exercises
              </div>

            </div>

            <div className="flex gap-2">

              <Button
                className="w-auto px-3"
                onClick={() =>
                  onStart({
                    id: crypto.randomUUID(),
                    name: routine.name,
                    startedAt: Date.now(),
                    finishedAt: null,
                    exercises:
                      routine.exercises.map(
                        cloneExercise,
                      ),
                  })
                }
              >
                <Play size={18} />
              </Button>

              <Button
                className="w-auto bg-red-600 px-3 hover:bg-red-700"
                onClick={() =>
                  deleteRoutine(routine.id)
                }
              >
                <Trash2 size={18} />
              </Button>

            </div>

          </div>

        ))}

      </div>

    </Card>

  );

}
