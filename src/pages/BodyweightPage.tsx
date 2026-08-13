import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

import Page from "../components/layout/Page";

import { useBodyweightStore } from "../store/bodyweightStore";
import { useSettingsStore } from "../store/settingsStore";

import {
  getLocalDateKey,
  getRecentAverageBodyweight,
  kgToUnit,
} from "../utils/bodyweight";

export default function BodyweightPage() {
  const {
    entries,
    save,
    remove,
  } = useBodyweightStore();

  const { settings } =
    useSettingsStore();

  const today =
    getLocalDateKey();

  const todayEntry =
    entries.find(
      entry => entry.date === today,
    );

  const [weight, setWeight] =
    useState(
      todayEntry
        ? String(
            kgToUnit(
              todayEntry.weightKg,
              settings.weightUnit,
            ).toFixed(1),
          )
        : "",
    );

  const averageKg =
    useMemo(
      () =>
        getRecentAverageBodyweight(7),
      [entries],
    );

  const average =
    averageKg === null
      ? null
      : kgToUnit(
          averageKg,
          settings.weightUnit,
        );

  function saveToday() {
    const value = Number(weight);

    if (
      !Number.isFinite(value) ||
      value <= 0
    ) {
      return;
    }

    save(
      value,
      settings.weightUnit,
    );
  }

  return (
    <Page>
      <div className="pt-2">

        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          Body
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Bodyweight
        </h1>

        {/* Main stats */}
        <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">

          <div className="p-5">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              7-day average
            </div>

            <div className="mt-2 text-3xl font-bold tabular-nums">
              {average !== null
                ? average.toFixed(1)
                : "—"}
              <span className="ml-1 text-sm font-medium text-zinc-500">
                {average !== null
                  ? settings.weightUnit
                  : ""}
              </span>
            </div>
          </div>

          <div className="border-l border-zinc-800 p-5">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Height
            </div>

            <div className="mt-2 text-3xl font-bold">
              {settings.heightCm > 0
                ? settings.heightCm
                : "—"}
              <span className="ml-1 text-sm font-medium text-zinc-500">
                {settings.heightCm > 0
                  ? "cm"
                  : ""}
              </span>
            </div>
          </div>

        </div>

        {/* Today's weight */}
        <div className="mt-6">

          <div className="mb-3">
            <h2 className="text-lg font-semibold">
              Today's weight
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              One entry per day
            </p>
          </div>

          <div className="flex gap-2">

            <div className="relative min-w-0 flex-1">

              <input
                type="number"
                inputMode="decimal"
                value={weight}
                placeholder="Weight"
                onFocus={e => {
                  e.currentTarget.select();
                }}
                onChange={e =>
                  setWeight(
                    e.target.value,
                  )
                }
                className="h-13 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 pr-14 text-lg font-semibold outline-none focus:border-blue-500"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                {settings.weightUnit}
              </span>

            </div>

            <button
              type="button"
              onClick={saveToday}
              className="h-13 shrink-0 rounded-xl bg-blue-600 px-5 text-sm font-semibold active:scale-[0.98]"
            >
              Save
            </button>

          </div>

        </div>

        {/* Recent */}
        <div className="mt-8">

          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Recent
            </h2>

            <span className="text-xs text-zinc-500">
              {entries.length} entries
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">

            {entries.length === 0 ? (

              <div className="p-5 text-sm text-zinc-500">
                No bodyweight entries yet.
              </div>

            ) : (

              entries
                .slice(0, 14)
                .map(entry => {

                  const display =
                    kgToUnit(
                      entry.weightKg,
                      settings.weightUnit,
                    );

                  const date =
                    new Date(
                      `${entry.date}T12:00:00`,
                    );

                  const label =
                    entry.date === today
                      ? "Today"
                      : date.toLocaleDateString(
                          undefined,
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          },
                        );

                  return (
                    <div
                      key={entry.date}
                      className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 last:border-b-0"
                    >
                      <div className="text-sm font-medium">
                        {label}
                      </div>

                      <div className="flex items-center gap-4">

                        <div className="text-sm font-semibold tabular-nums">
                          {display.toFixed(1)}
                          {" "}
                          {settings.weightUnit}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            remove(entry.date)
                          }
                          aria-label={`Delete ${label} entry`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 active:bg-zinc-800 active:text-red-400"
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>
                    </div>
                  );
                })

            )}

          </div>

        </div>

      </div>
    </Page>
  );
}
