import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";

import { useBodyweightStore } from "../../store/bodyweightStore";
import { useSettingsStore } from "../../store/settingsStore";

import { getRecentAverageBodyweight, kgToUnit } from "../../utils/bodyweight";

export default function BodyweightSummary() {
  const navigate = useNavigate();

  const { entries } =
    useBodyweightStore();

  const { settings } =
    useSettingsStore();

  const averageKg =
    getRecentAverageBodyweight(7);

  const average =
    averageKg === null
      ? null
      : kgToUnit(
          averageKg,
          settings.weightUnit,
        );

  return (
    <button
      type="button"
      onClick={() =>
        navigate("/bodyweight")
      }
      className="w-full text-left"
    >
      <Card className="p-4 active:scale-[0.99]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Body
            </div>

            <div className="mt-1 text-lg font-semibold">
              {average !== null
                ? `${average.toFixed(1)} ${settings.weightUnit}`
                : "Log bodyweight"}
            </div>

            <div className="mt-1 text-xs text-zinc-500">
              7-day average
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-zinc-500">
              Height
            </div>

            <div className="mt-1 font-semibold">
              {settings.heightCm > 0
                ? `${settings.heightCm} cm`
                : "Set height"}
            </div>
          </div>
        </div>

        {entries.length === 0 && (
          <div className="mt-3 text-xs text-blue-400">
            Tap to log today's weight
          </div>
        )}
      </Card>
    </button>
  );
}
