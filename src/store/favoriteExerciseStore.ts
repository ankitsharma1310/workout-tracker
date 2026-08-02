import { create } from "zustand";

type Store = {
  favorites: string[];

  toggle(name: string): void;

  isFavorite(name: string): boolean;
};

const KEY = "favorite-exercises";

function load(): string[] {

  const data =
    localStorage.getItem(KEY);

  return data
    ? JSON.parse(data)
    : [];

}

export const useFavoriteExerciseStore =
create<Store>((set, get) => ({

  favorites: load(),

  toggle(name) {

    const favorites =
      get().favorites.includes(name)
        ? get().favorites.filter(
            f => f !== name,
          )
        : [...get().favorites, name];

    localStorage.setItem(
      KEY,
      JSON.stringify(favorites),
    );

    set({ favorites });

  },

  isFavorite(name) {

    return get().favorites.includes(name);

  },

}));
