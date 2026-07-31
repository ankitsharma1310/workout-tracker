import type { RestTimer } from "../types/restTimer";

const KEY = "rest-timer";

export function saveRestTimer(timer: RestTimer) {
  localStorage.setItem(KEY, JSON.stringify(timer));
}

export function getRestTimer(): RestTimer {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return {
      duration: 90,
      endAt: null,
      running: false,
    };
  }

  return JSON.parse(data);
}

export function clearRestTimer() {
  localStorage.removeItem(KEY);
}
