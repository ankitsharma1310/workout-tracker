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

  const { start } =
    useRestTimerStore();

  const { settings } =
    useSettingsStore();

  const completedSets =
    exercise.sets.filter(
      set => set.completed,
    ).length;

  const exerciseCompleted =
    exercise.sets.length > 0 &&
    completedSets ===
      exercise.sets.length;

  function updateSet(
    index: number,
    values: Partial<WorkoutSet>,
  ) {
    const updated =
      [...exercise.sets];

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
    const completed =
      !exercise.sets[index]
        .completed;

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
    const last =
      exercise.sets[
        exercise.sets.length - 1
      ];

    onChange({
      ...exercise,
      sets: [
        ...exercise.sets,
        {
          id: crypto.randomUUID(),
          weight: last?.weight ?? 0,
          reps: last?.reps ?? 0,
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
      className={[
        "p-4",
        exerciseCompleted
          ? "border border-green-500/70"
          : "",
      ].join(" ")}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {exerciseCompleted && (
              <span className="text-green-400">
                ✓
              </span>
            )}

            <h2 className="truncate text-lg font-semibold">
              {exercise.name}
            </h2>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span>
              {exercise.muscleGroup}
            </span>

            {previous &&
              previous.sets.length > 0 && (
                <>
                  <span>•</span>
                  <span>
                    Last •{" "}
                    {
                      previous.sets[0]
                        .weight
                    }{" "}
                    kg ×{" "}
                    {
                      previous.sets[0]
                        .reps
                    }
                  </span>
                </>
              )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Badge className="px-2 py-1 text-xs">
            {completedSets}/
            {exercise.sets.length}
          </Badge>

          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${exercise.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-red-400 active:scale-95"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-[40px_minmax(0,1fr)_minmax(0,1fr)_44px_44px] items-center gap-2 px-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        <div>Set</div>
        <div className="text-center">
          {settings.weightUnit}
        </div>
        <div className="text-center">
          Reps
        </div>
        <div />
        <div />
      </div>

      <div>
        {exercise.sets.map(
          (set, index) => (
            <SetRow
              key={set.id}
              setNumber={index + 1}
              weight={set.weight}
              reps={set.reps}
              completed={set.completed}
              onWeightChange={v =>
                updateSet(index, {
                  weight: v,
                })
              }
              onRepsChange={v =>
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
          ),
        )}
      </div>

      <Button
        onClick={addSet}
        className="mt-3 h-11 w-full"
      >
        <Plus size={17} />
        <span className="ml-2">
          Add Set
        </span>
      </Button>
    </Card>
  );
}
