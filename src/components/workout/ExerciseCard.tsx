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

  const { start } = useRestTimerStore();

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
      start(90);
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

    <Card>

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold">
          {exercise.name}
        </h2>

        <div className="flex gap-2">

          <Badge>
            {exercise.sets.length} Sets
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
        <div className="text-center">KG</div>
        <div className="text-center">Reps</div>
        <div className="text-center">✓</div>
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
