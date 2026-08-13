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

  useEffect(() => {
    setWeightText(
      weight > 0 ? String(weight) : "",
    );
  }, [weight]);

  useEffect(() => {
    setRepsText(
      reps > 0 ? String(reps) : "",
    );
  }, [reps]);

  function handleWeightChange(value: string) {
    setWeightText(value);

    if (value === "") {
      onWeightChange(0);
      return;
    }

    const parsed = Number(value);

    if (!Number.isNaN(parsed)) {
      onWeightChange(parsed);
    }
  }

  function handleRepsChange(value: string) {
    setRepsText(value);

    if (value === "") {
      onRepsChange(0);
      return;
    }

    const parsed = Number(value);

    if (!Number.isNaN(parsed)) {
      onRepsChange(parsed);
    }
  }

  return (
    <div
      className={[
        "mb-2",
        "grid grid-cols-[32px_minmax(0,1fr)_minmax(0,1fr)_44px]",
        "items-center gap-2",
        "rounded-xl",
        completed
          ? "opacity-60"
          : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-12 w-8 items-center justify-center",
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
          placeholder="kg"
          onFocus={e => e.target.select()}
          onChange={e =>
            handleWeightChange(
              e.target.value,
            )
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
          onFocus={e => e.target.select()}
          onChange={e =>
            handleRepsChange(
              e.target.value,
            )
          }
          className="h-12 w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc-800 px-3 pr-12 text-center text-base font-semibold outline-none focus:border-blue-500"
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
            : "bg-zinc-800",
        ].join(" ")}
      >
        <Check size={19} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete set"
        className="col-start-2 flex h-9 w-full items-center justify-center gap-2 rounded-lg text-xs text-zinc-500 active:bg-zinc-800 active:text-red-400"
      >
        <Trash2 size={14} />
        Delete set
      </button>
    </div>
  );
}
