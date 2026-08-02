import Card from "../components/ui/Card";

import { useSettingsStore } from "../store/settingsStore";

export default function SettingsPage() {

  const {
    settings,
    update,
  } = useSettingsStore();

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-4xl p-6">

        <h1 className="mb-8 text-4xl font-bold">
          Settings
        </h1>

        <Card>

          <div className="space-y-8">

            <div>

              <label className="mb-2 block font-semibold">
                Default Rest Timer
              </label>

              <select
                value={settings.defaultRestTimer}
                onChange={e =>
                  update({
                    defaultRestTimer:
                      Number(e.target.value),
                  })
                }
                className="w-full rounded-xl bg-zinc-800 p-3"
              >
                <option value={30}>30 sec</option>
                <option value={60}>60 sec</option>
                <option value={90}>90 sec</option>
                <option value={120}>120 sec</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Weight Unit
              </label>

              <select
                value={settings.weightUnit}
                onChange={e =>
                  update({
                    weightUnit:
                      e.target.value as
                        "kg" | "lb",
                  })
                }
                className="w-full rounded-xl bg-zinc-800 p-3"
              >
                <option value="kg">
                  Kilograms
                </option>

                <option value="lb">
                  Pounds
                </option>

              </select>

            </div>

            <label className="flex items-center justify-between">

              <span>
                Auto Start Rest Timer
              </span>

              <input
                type="checkbox"
                checked={
                  settings.autoStartRestTimer
                }
                onChange={e =>
                  update({
                    autoStartRestTimer:
                      e.target.checked,
                  })
                }
              />

            </label>

          </div>

        </Card>

      </div>

    </div>

  );

}
