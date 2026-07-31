import { create } from "zustand";

import type { Exercise } from "../types/workout";
import type { ExerciseTemplate } from "../types/template";

import {
  getTemplates,
  saveTemplates,
} from "../utils/templates";

type Store = {
  templates: ExerciseTemplate[];

  addTemplate(exercise: Exercise): void;

  deleteTemplate(id: string): void;
};

export const useTemplateStore =
create<Store>((set, get) => ({

  templates: getTemplates(),

  addTemplate(exercise) {

    const templates = [...get().templates];

    const index = templates.findIndex(
      t => t.exercise.name === exercise.name,
    );

    const template = {
      id: crypto.randomUUID(),
      exercise,
    };

    if (index >= 0) {
      templates[index] = template;
    } else {
      templates.push(template);
    }

    saveTemplates(templates);

    set({ templates });

  },

  deleteTemplate(id) {

    const templates =
      get().templates.filter(
        t => t.id !== id,
      );

    saveTemplates(templates);

    set({ templates });

  },

}));
