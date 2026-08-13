import { useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";

import { useSettingsStore } from "../../store/settingsStore";

type Props = {
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;

  onWeightChange: (value: number) => void;
  onRepsChange: (value: number) => void;
  onComplete: () => void;
  onDelete: () => void;
};

export default function SetRow({
  setNumber,
  weight,
  reps,
  completed,
  onWeightChange,
  onRepsChange,
  onComplete,
  onDelete,
}: Props) {
  const { settings } = useSettingsStore();

  const [weightText, setWeightText] =
    useState(weight > 0 ? String(weight) : "");

  const [repsText, setRepsText] =
    useState(reps > 0 ? String(reps) : "");

  const [editingWeight, setEditingWeight] =
    useState(false);

  const [editingReps, setEditingReps] =
    useState(false);

  useEffect(() => {
    if (!editingWeight) {
      setWeightText(
        weight > 0 ? String(weight) : "",
      );
    }
  }, [weight, editingWeight]);

  useEffect(() => {
    if (!editingReps) {
      setRepsText(
        reps > 0 ? String(reps) : "",
      );
    }
  }, [reps, editingReps]);

  function startWeightEditing() {
    setEditingWeight(true);
    setWeightText("");
  }

  function startRepsEditing() {
    setEditingReps(true);
    setRepsText("");
  }

  function finishWeightEditing() {
    setEditingWeight(false);

    const value = Number(weightText);

    onWeightChange(
      weightText === "" || Number.isNaN(value)
        ? 0
        : value,
    );
  }

  function finishRepsEditing() {
    setEditingReps(false);

    const value = Number(repsText);

    onRepsChange(
      repsText === "" || Number.isNaN(value)
        ? 0
        : value,
    );
  }

  return (
    <div
      className={[
        "mb-2 grid",
        "grid-cols-[34px_minmax(0,1fr)_minmax(0,1fr)_44px]",
        "items-center gap-2",
        completed ? "opacity-60" : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-12 w-[34px] items-center justify-center",
          "rounded-xl text-sm font-semibold",
          completed
            ? "bg-green-600 text-white"
            : "bg-zinc-800",
        ].join(" ")}
      >
        {setNumber}
      </div>

      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          enterKeyHint="next"
          value={weightText}
          placeholder="Weight"
          onFocus={startWeightEditing}
          onBlur={finishWeightEditing}
          onChange={e =>
            setWeightText(e.target.value)
          }
          className="h-12 w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc-800 px-3 pr-10 text-center text-base font-semibold outline-none focus:border-blue-500"
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
          {settings.weightUnit}
        </span>
      </div>

      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          enterKeyHint="done"
          value={repsText}
          placeholder="Reps"
          onFocus={startRepsEditing}
          onBlur={finishRepsEditing}
          onChange={e =>
            setRepsText(e.target.value)
          }
          className="h-12 w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc-800 px-3 pr-10 text-center text-base font-semibold outline-none focus:border-blue-500"
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
          reps
        </span>
      </div>

      <button
        type="button"
        onClick={onComplete}
        aria-label={
          completed
            ? "Mark set incomplete"
            : "Complete set"
        }
        className={[
          "flex h-11 w-11 items-center justify-center",
          "rounded-xl transition active:scale-95",
          completed
            ? "bg-green-600"
            : "bg-zinc-800 active:bg-green-600",
        ].join(" ")}
      >
        <Check size={19} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete set"
        className="col-start-2 flex h-7 items-center justify-center gap-1 text-[11px] text-zinc-600 active:text-red-400"
      >
        <Trash2 size={13} />
        Delete
      </button>
    </div>
  );
}
