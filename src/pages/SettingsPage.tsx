import Page from "../components/layout/Page";

import { useSettingsStore } from "../store/settingsStore";

export default function SettingsPage() {
  const {
    settings,
    update,
  } = useSettingsStore();

  return (
    <Page>
      <div className="pt-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Keep the workout experience the way you like it.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              Workout
            </div>
          </div>

          <div className="border-b border-zinc-800 p-4">
            <label className="block">
              <span className="text-sm font-medium">
                Default Rest Timer
              </span>

              <select
                value={settings.defaultRestTimer}
                onChange={e =>
                  update({
                    defaultRestTimer:
                      Number(e.target.value),
                  })
                }
                className="mt-3 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 outline-none focus:border-blue-500"
              >
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
                <option value={90}>90 seconds</option>
                <option value={120}>120 seconds</option>
              </select>
            </label>
          </div>

          <div className="border-b border-zinc-800 p-4">
            <label className="block">
              <span className="text-sm font-medium">
                Weight Unit
              </span>

              <select
                value={settings.weightUnit}
                onChange={e =>
                  update({
                    weightUnit:
                      e.target.value as
                        | "kg"
                        | "lb",
                  })
                }
                className="mt-3 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 outline-none focus:border-blue-500"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="lb">Pounds (lb)</option>
              </select>
            </label>
          </div>

          <label className="flex items-center justify-between gap-4 p-4">
            <div>
              <div className="text-sm font-medium">
                Auto Start Rest Timer
              </div>

              <div className="mt-1 text-xs text-zinc-500">
                Start the rest timer when you complete a set.
              </div>
            </div>

            <input
              type="checkbox"
              checked={settings.autoStartRestTimer}
              onChange={e =>
                update({
                  autoStartRestTimer:
                    e.target.checked,
                })
              }
              className="h-5 w-5 accent-blue-500"
            />
          </label>
        </div>
      </div>
    </Page>
  );
}
