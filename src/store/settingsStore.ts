import { create } from "zustand";

import type { Settings } from "../types/settings";

import {
  getSettings,
  saveSettings,
} from "../utils/settings";

type Store = {
  settings: Settings;
  update(
    values: Partial<Settings>,
  ): void;
};

export const useSettingsStore =
  create<Store>((set, get) => ({
    settings: getSettings(),

    update(values) {
      const settings = {
        ...get().settings,
        ...values,
      };

      saveSettings(settings);

      set({ settings });
    },
  }));
