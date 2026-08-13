import { create } from "zustand";

import {
  deleteBodyweight,
  getBodyweightEntries,
  saveBodyweight,
  unitToKg,
} from "../utils/bodyweight";

import type { BodyweightEntry } from "../types/bodyweight";

type Store = {
  entries: BodyweightEntry[];

  save(
    value: number,
    unit: "kg" | "lb",
    date?: string,
  ): void;

  remove(date: string): void;

  refresh(): void;
};

export const useBodyweightStore =
  create<Store>((set) => ({
    entries:
      getBodyweightEntries(),

    save(value, unit, date) {
      if (
        !Number.isFinite(value) ||
        value <= 0
      ) {
        return;
      }

      saveBodyweight(
        unitToKg(value, unit),
        date,
      );

      set({
        entries:
          getBodyweightEntries(),
      });
    },

    remove(date) {
      deleteBodyweight(date);

      set({
        entries:
          getBodyweightEntries(),
      });
    },

    refresh() {
      set({
        entries:
          getBodyweightEntries(),
      });
    },
  }));
