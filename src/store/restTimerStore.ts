import { create } from "zustand";

import type { RestTimer } from "../types/restTimer";

import {
  getRestTimer,
  saveRestTimer,
  clearRestTimer,
} from "../utils/restTimer";

type Store = {
  timer: RestTimer;

  start(duration?: number): void;
  pause(): void;
  resume(): void;
  stop(): void;
};

export const useRestTimerStore =
create<Store>((set, get) => ({

  timer: getRestTimer(),

  start(duration = 90) {

    const timer = {
      duration,
      endAt: Date.now() + duration * 1000,
      running: true,
    };

    saveRestTimer(timer);

    set({ timer });

  },

  pause() {

    const { timer } = get();

    if (!timer.running || timer.endAt === null) {
      return;
    }

    const remaining = Math.max(
      0,
      Math.ceil((timer.endAt - Date.now()) / 1000),
    );

    const updated = {
      duration: remaining,
      endAt: null,
      running: false,
    };

    saveRestTimer(updated);

    set({ timer: updated });

  },

  resume() {

    const { timer } = get();

    if (timer.running) {
      return;
    }

    const updated = {
      ...timer,
      endAt: Date.now() + timer.duration * 1000,
      running: true,
    };

    saveRestTimer(updated);

    set({ timer: updated });

  },

  stop() {

    clearRestTimer();

    set({
      timer: {
        duration: 90,
        endAt: null,
        running: false,
      },
    });

  },

}));
