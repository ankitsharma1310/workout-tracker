import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";

import { useBodyweightStore } from "../../store/bodyweightStore";
import { useSettingsStore } from "../../store/settingsStore";

import {
  getLocalDateKey,
  getRecentAverageBodyweight,
  kgToUnit,
} from "../../utils/bodyweight";

export default function BodyweightSummary() {
  const navigate = useNavigate();

  const { entries } =
    useBodyweightStore();

  const { settings } =
    useSettingsStore();

  const today =
    entries.find(
      entry =>
        entry.date ===
        getLocalDateKey(),
    );

  const averageKg =
    getRecentAverageBodyweight(7);

  const todayWeight =
    today
      ? kgToUnit(
          today.weightKg,
          settings.weightUnit,
        )
      : null;

  const average =
    averageKg !== null
      ? kgToUnit(
          averageKg,
          settings.weightUnit,
        )
      : null;

  return (
    <button
      type="button"
      onClick={() =>
        navigate("/bodyweight")
      }
      className="w-full text-left"
    >
      <Card className="p-4 active:scale-[0.99]">

        <div className="flex items-start justify-between gap-4">

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Body
            </div>

            <div className="mt-2 text-xl font-bold tabular-nums">
              {todayWeight !== null
                ? `${todayWeight.toFixed(1)} ${settings.weightUnit}`
                : "Log today's weight"}
            </div>

            <div className="mt-1 text-xs text-zinc-500">
              Today
            </div>
          </div>

          <div className="text-right">

            <div className="text-xs text-zinc-500">
              7-day avg
            </div>

            <div className="mt-1 text-lg font-semibold tabular-nums">
              {average !== null
                ? `${average.toFixed(1)} ${settings.weightUnit}`
                : "—"}
            </div>

            <div className="mt-1 text-xs text-zinc-500">
              {settings.heightCm > 0
                ? `${settings.heightCm} cm`
                : "Set height"}
            </div>

          </div>

        </div>

      </Card>
    </button>
  );
}
