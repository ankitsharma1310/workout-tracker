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
      className={`mb-2 grid grid-cols-[40px_1fr_1fr_48px_48px] items-center gap-2 rounded-xl transition-all ${
        completed ? "opacity-70" : ""
      }`}
    >
      <div
        className={`flex h-12 items-center justify-center rounded-xl font-semibold ${
          completed
            ? "bg-green-600 text-white"
            : "bg-zinc-800"
        }`}
      >
        {setNumber}
      </div>

      <input
        type="number"
        inputMode="decimal"
        value={weight}
        placeholder={settings.weightUnit}
        onFocus={(e) => e.target.select()}
        onChange={(e) =>
          onWeightChange(Number(e.target.value))
        }
        className="h-12 rounded-xl border border-zinc-700 bg-zinc-800 text-center text-lg font-semibold outline-none transition focus:border-blue-500"
      />

      <input
        type="number"
        inputMode="numeric"
        value={reps}
        placeholder="Reps"
        onFocus={(e) => e.target.select()}
        onChange={(e) =>
          onRepsChange(Number(e.target.value))
        }
        className="h-12 rounded-xl border border-zinc-700 bg-zinc-800 text-center text-lg font-semibold outline-none transition focus:border-blue-500"
      />

      <button
        onClick={onComplete}
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
          completed
            ? "bg-green-600"
            : "bg-zinc-700 active:scale-95"
        }`}
      >
        <Check size={20} />
      </button>

      <button
        onClick={onDelete}
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 transition active:scale-95"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
