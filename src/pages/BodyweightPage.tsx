import { useMemo, useState } from "react";

import Page from "../components/layout/Page";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

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
    const value =
      Number(weight);

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

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Height
            </div>

            <div className="mt-2 text-2xl font-bold">
              {settings.heightCm > 0
                ? `${settings.heightCm} cm`
                : "Not set"}
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              7-day average
            </div>

            <div className="mt-2 text-2xl font-bold">
              {average !== null
                ? `${average.toFixed(1)} ${settings.weightUnit}`
                : "No data"}
            </div>
          </Card>
        </div>

        <Card className="mt-4 p-4">
          <div className="text-sm font-semibold">
            Log today's weight
          </div>

          <div className="mt-3 flex gap-2">
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              placeholder={`Weight (${settings.weightUnit})`}
              onFocus={e =>
                e.currentTarget.select()
              }
              onChange={e =>
                setWeight(
                  e.target.value,
                )
              }
              className="h-12 min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 text-lg font-semibold outline-none focus:border-blue-500"
            />

            <Button
              className="h-12 w-auto shrink-0 px-5"
              onClick={saveToday}
            >
              Save
            </Button>
          </div>
        </Card>

        <div className="mt-7">
          <h2 className="text-lg font-semibold">
            Recent entries
          </h2>

          <div className="mt-3 space-y-2">
            {entries.length === 0 ? (
              <Card className="p-4">
                <p className="text-sm text-zinc-500">
                  No bodyweight entries yet.
                </p>
              </Card>
            ) : (
              entries
                .slice(0, 30)
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

                  return (
                    <div
                      key={entry.date}
                      className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-3"
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {date.toLocaleDateString(
                            undefined,
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>

                        <div className="text-xs text-zinc-500">
                          {entry.date === today
                            ? "Today"
                            : ""}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="font-semibold">
                          {display.toFixed(1)}{" "}
                          {settings.weightUnit}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            remove(entry.date)
                          }
                          className="text-xs text-zinc-600 active:text-red-400"
                        >
                          Delete
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
