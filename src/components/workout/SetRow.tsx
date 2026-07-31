import { Trash2 } from "lucide-react";

type Props = {
  setNumber: number;
  weight: number;
  reps: number;

  onWeightChange: (value: number) => void;
  onRepsChange: (value: number) => void;
  onDelete: () => void;
};

export default function SetRow({
  setNumber,
  weight,
  reps,
  onWeightChange,
  onRepsChange,
  onDelete,
}: Props) {
  return (
    <div className="grid grid-cols-[55px_1fr_1fr_50px] gap-3 items-center mb-3">

      <div className="rounded-xl bg-zinc-800 py-3 text-center font-bold">
        {setNumber}
      </div>

      <input
        type="number"
        value={weight}
        placeholder="kg"
        onChange={(e) => onWeightChange(Number(e.target.value))}
        className="rounded-xl bg-zinc-800 border border-zinc-700 py-3 text-center outline-none focus:border-blue-500"
      />

      <input
        type="number"
        value={reps}
        placeholder="reps"
        onChange={(e) => onRepsChange(Number(e.target.value))}
        className="rounded-xl bg-zinc-800 border border-zinc-700 py-3 text-center outline-none focus:border-blue-500"
      />

      <button
        onClick={onDelete}
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 hover:bg-red-700"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}
