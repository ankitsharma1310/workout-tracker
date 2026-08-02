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
      className={
        exerciseCompleted
          ? "border-2 border-green-500"
          : ""
      }
    >

      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            {exerciseCompleted && (
              <span className="text-green-400">
                ✓
              </span>
            )}
            {exercise.name}
          </h2>

          {previous && previous.sets.length > 0 && (
            <div className="mt-1 text-sm text-zinc-400">
              Last workout:{" "}
              {previous.sets[0].weight}
              {" "}
              kg ×{" "}
              {previous.sets[0].reps}
            </div>
          )}

          <p className="text-sm text-zinc-400">
            {exercise.muscleGroup}
          </p>

        </div>

        <div className="flex gap-2">

          <Badge
            className={
              exerciseCompleted
                ? "bg-green-600"
                : ""
            }
          >
            {completedSets} / {exercise.sets.length}{" "}Sets
          </Badge>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 p-2 hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      <div className="grid grid-cols-[55px_1fr_1fr_50px_50px] gap-3 text-xs uppercase tracking-widest text-zinc-500 mb-3">

        <div>Set</div>
        <div className="text-center">{settings.weightUnit}</div>

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

      <div className="mt-5 flex gap-3">

        <Button onClick={addSet}>

          <Plus size={18} />

          <span className="ml-2">
            Add Set
          </span>

        </Button>

      </div>

    </Card>

  );

}
