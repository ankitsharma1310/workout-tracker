import type { BodyMeasurement, BodyProfile } from "../types/body";

const KEY = "workout-body-profile";
const LEGACY_SETTINGS_KEY = "workout-settings";

const defaults: BodyProfile = {
  heightCm: 0,
  measurements: [],
};

function read(): BodyProfile {
  const data = localStorage.getItem(KEY);
  if (!data) return defaults;

  try {
    const parsed = JSON.parse(data) as Partial<BodyProfile>;
    return {
      heightCm: Number(parsed.heightCm) || 0,
      measurements: Array.isArray(parsed.measurements)
        ? parsed.measurements
        : [],
    };
  } catch {
    return defaults;
  }
}

export function getBodyProfile(): BodyProfile {
  const profile = read();

  if (profile.heightCm > 0 || profile.measurements.length > 0) {
    return profile;
  }

  const legacy = localStorage.getItem(LEGACY_SETTINGS_KEY);
  if (!legacy) return profile;

  try {
    const heightCm = Number(JSON.parse(legacy).heightCm) || 0;
    return { ...profile, heightCm };
  } catch {
    return profile;
  }
}

export function saveBodyProfile(profile: BodyProfile) {
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function saveHeight(heightCm: number) {
  const profile = getBodyProfile();
  saveBodyProfile({
    ...profile,
    heightCm: Number.isFinite(heightCm) && heightCm > 0 ? heightCm : 0,
  });
}

export function addBodyMeasurement(name: string, valueCm: number) {
  const trimmed = name.trim();
  if (!trimmed || !Number.isFinite(valueCm) || valueCm <= 0) return;

  const profile = getBodyProfile();
  const measurement: BodyMeasurement = {
    id: crypto.randomUUID(),
    name: trimmed,
    valueCm,
    recordedAt: Date.now(),
  };

  saveBodyProfile({
    ...profile,
    measurements: [measurement, ...profile.measurements],
  });
}

export function deleteBodyMeasurement(id: string) {
  const profile = getBodyProfile();
  saveBodyProfile({
    ...profile,
    measurements: profile.measurements.filter(item => item.id !== id),
  });
}

export function cmToUnit(valueCm: number, unit: "cm" | "in") {
  return unit === "in" ? valueCm / 2.54 : valueCm;
}

export function unitToCm(value: number, unit: "cm" | "in") {
  return unit === "in" ? value * 2.54 : value;
}
