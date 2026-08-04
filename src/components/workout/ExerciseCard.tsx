import { Plus, Trash2 } from "lucide-react";

import type {
  Exercise,
  WorkoutSet,
} from "../../types/workout";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

import SetRow from "./SetRow";
import { useRestTimerStore } from "../../store/restTimerStore";
import { useSettingsStore } from "../../store/settingsStore";
import { getPreviousPerformance } from "../../utils/previousPerformance";
import { lightHaptic } from "../../utils/haptics";

type Props = {
  exercise: Exercise;
  onChange: (exercise: Exercise) => void;
  onDelete: () => void;
};

export default function ExerciseCard({
  exercise,
  onChange,
  onDelete,
}: Props) {

  const previous =
    getPreviousPerformance(
      exercise.name,
    );

  const { start } = useRestTimerStore();

  const {
    settings,
  } = useSettingsStore();

  const completedSets = exercise.sets.filter(
    set => set.completed,
  ).length;

  const exerciseCompleted =
    exercise.sets.length > 0 &&
    completedSets === exercise.sets.length;

  function updateSet(
    index: number,
    values: Partial<WorkoutSet>,
  ) {

    const updated = [...exercise.sets];

    updated[index] = {
      ...updated[index],
      ...values,
    };

    onChange({
      ...exercise,
      sets: updated,
    });

  }

  function completeSet(index: number) {

    const completed = !exercise.sets[index].completed;

    updateSet(index, {
      completed,
    });
    if (completed) {
      void lightHaptic();
    }
    if (
      completed &&
      settings.autoStartRestTimer
    ) {
      start(
        settings.defaultRestTimer,
      );
    }

  }

  function addSet() {

    const previous =
      exercise.sets[
        exercise.sets.length - 1
      ];

    onChange({

      ...exercise,

      sets: [

        ...exercise.sets,

        {

          id: crypto.randomUUID(),

          weight:
            previous?.weight ?? 0,

          reps:
            previous?.reps ?? 0,

          completed: false,

        },

      ],

    });

  }

  function deleteSet(index: number) {

    onChange({

      ...exercise,

      sets: exercise.sets.filter(
        (_, i) => i !== index,
      ),

    });

  }

  return (

    <Card
      className={`!p-4 ${
        exerciseCompleted
          ? "border-2 border-green-500"
          : ""
      }`}
    >

      <div className="mb-3 flex items-start justify-between">

        <div>

          <h2 className="flex items-center gap-2 text-xl font-semibold">
            {exerciseCompleted && (
              <span className="text-green-400">
                ✓
              </span>
            )}
            {exercise.name}
          </h2>

          {previous && previous.sets.length > 0 && (
            <div className="mt-1 text-sm text-zinc-400">
              Last • {" "}
              {previous.sets[0].weight}
              {" "}×{" "}
              {previous.sets[0].reps}
            </div>
          )}

          <p className="text-xs text-zinc-500">
            {exercise.muscleGroup}
          </p>

        </div>

        <div className="flex gap-2">

          <Badge
            className={`text-xs ${
              exerciseCompleted
                ? "bg-green-600"
                : ""
            }`}
          >
            {completedSets}/{exercise.sets.length}
          </Badge>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 p-2 hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      <div className="mb-2 grid grid-cols-[40px_1fr_1fr_48px_48px] gap-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">

        <div>Set</div>
        <div className="text-center">
          {settings.weightUnit}
        </div>
        <div className="text-center">
          Reps
        </div>
        <div></div>
        <div></div>

      </div>

      {exercise.sets.map((set, index) => (

        <SetRow

          key={set.id}

          setNumber={index + 1}

          weight={set.weight}

          reps={set.reps}

          completed={set.completed}

          onWeightChange={(v) =>
            updateSet(index, {
              weight: v,
            })
          }

          onRepsChange={(v) =>
            updateSet(index, {
              reps: v,
            })
          }

          onComplete={() =>
            completeSet(index)
          }

          onDelete={() =>
            deleteSet(index)
          }

        />

      ))}

      <div className="mt-3">

        <Button
          className="h-11 w-full"
          onClick={addSet}
        >

          <Plus size={18} />

          <span className="ml-2">
            Add Set
          </span>

        </Button>

      </div>

    </Card>

  );

}
