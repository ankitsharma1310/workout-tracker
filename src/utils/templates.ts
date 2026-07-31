import type { ExerciseTemplate } from "../types/template";

const KEY = "exercise-templates";

export function getTemplates(): ExerciseTemplate[] {
  const raw = localStorage.getItem(KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveTemplates(
  templates: ExerciseTemplate[],
) {
  localStorage.setItem(
    KEY,
    JSON.stringify(templates),
  );
}
