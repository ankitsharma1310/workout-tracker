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

  return (
    <div
      className={[
        "grid grid-cols-[40px_minmax(0,1fr)_minmax(0,1fr)_44px_44px]",
        "items-center gap-2 py-1",
        "transition-opacity",
        completed ? "opacity-60" : "",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-12 items-center justify-center rounded-xl",
          "text-sm font-semibold",
          completed
            ? "bg-green-600 text-white"
            : "bg-zinc-800 text-zinc-100",
        ].join(" ")}
      >
        {setNumber}
      </div>

      <input
        type="number"
        inputMode="decimal"
        enterKeyHint="next"
        value={weight}
        placeholder={settings.weightUnit}
        onFocus={e => e.target.select()}
        onChange={e =>
          onWeightChange(
            Number(e.target.value),
          )
        }
        className="h-12 w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc-800 px-2 text-center text-base font-semibold outline-none focus:border-blue-500"
      />

      <input
        type="number"
        inputMode="numeric"
        enterKeyHint="done"
        value={reps}
        placeholder="Reps"
        onFocus={e => e.target.select()}
        onChange={e =>
          onRepsChange(
            Number(e.target.value),
          )
        }
        className="h-12 w-full min-w-0 rounded-xl border border-zinc-700 bg-zinc-800 px-2 text-center text-base font-semibold outline-none focus:border-blue-500"
      />

      <button
        type="button"
        onClick={onComplete}
        aria-label={
          completed
            ? "Mark set incomplete"
            : "Complete set"
        }
        className={[
          "flex h-11 w-11 items-center justify-center rounded-xl",
          "transition active:scale-95",
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
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 text-red-400 transition active:scale-95"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
