import type { Settings } from "../types/settings";

const KEY = "workout-settings";

const defaults: Settings = {
  defaultRestTimer: 90,
  weightUnit: "kg",
  autoStartRestTimer: true,
};

export function getSettings(): Settings {

  const data = localStorage.getItem(KEY);

  if (!data) {
    return defaults;
  }

  try {

    return {
      ...defaults,
      ...JSON.parse(data),
    };

  } catch {

    return defaults;

  }

}

export function saveSettings(
  settings: Settings,
) {

  localStorage.setItem(
    KEY,
    JSON.stringify(settings),
  );

}
