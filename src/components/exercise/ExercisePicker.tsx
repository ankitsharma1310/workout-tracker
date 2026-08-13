import { useMemo, useState } from "react";
import {
  Search,
  Star,
  X,
} from "lucide-react";

import type { Exercise } from "../../types/workout";
import { exerciseLibrary } from "../../data/exercises";
import { useFavoriteExerciseStore } from "../../store/favoriteExerciseStore";
import { muscleIcons } from "../../utils/muscleIcons";

type Props = {
  open: boolean;
  onClose(): void;
  onSelect(exercise: Exercise): void;
};

export default function ExercisePicker({
  open,
  onClose,
  onSelect,
}: Props) {
  const [search, setSearch] =
    useState("");

  const {
    favorites,
    toggle,
  } =
    useFavoriteExerciseStore();

  const filtered =
    useMemo(
      () =>
        exerciseLibrary.filter(
          exercise =>
            exercise.name
              .toLowerCase()
              .includes(
                search.toLowerCase(),
              ),
        ),
      [search],
    );

  const favoriteItems =
    filtered.filter(exercise =>
      favorites.includes(
        exercise.name,
      ),
    );

  const grouped =
    useMemo(() => {
      const groups: Record<
        string,
        typeof filtered
      > = {};

      filtered
        .filter(
          exercise =>
            !favorites.includes(
              exercise.name,
            ),
        )
        .forEach(exercise => {
          if (
            !groups[
              exercise.muscleGroup
            ]
          ) {
            groups[
              exercise.muscleGroup
            ] = [];
          }

          groups[
            exercise.muscleGroup
          ].push(exercise);
        });

      return groups;
    }, [filtered, favorites]);

  function select(
    exercise: (typeof exerciseLibrary)[number],
  ) {
    onSelect({
      id: crypto.randomUUID(),
      name: exercise.name,
      muscleGroup:
        exercise.muscleGroup,
      sets: [],
    });

    onClose();
    setSearch("");
  }

  if (!open) return null;

  const renderExercise = (
    exercise: (typeof exerciseLibrary)[number],
  ) => (
    <div
      key={exercise.name}
      className="flex items-center gap-2"
    >
      <button
        type="button"
        onClick={() =>
          toggle(exercise.name)
        }
        aria-label={
          favorites.includes(
            exercise.name,
          )
            ? `Remove ${exercise.name} from favorites`
            : `Favorite ${exercise.name}`
        }
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-zinc-500 active:scale-95"
      >
        <Star
          size={18}
          className={
            favorites.includes(
              exercise.name,
            )
              ? "fill-yellow-400 text-yellow-400"
              : ""
          }
        />
      </button>

      <button
        type="button"
        onClick={() =>
          select(exercise)
        }
        className="min-w-0 flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-left active:bg-zinc-800"
      >
        <div className="font-medium">
          {exercise.name}
        </div>

        <div className="mt-1 text-xs text-zinc-500">
          {exercise.equipment}
        </div>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-white">
      <div className="flex min-h-dvh flex-col pt-[max(env(safe-area-inset-top),16px)]">
        <div className="border-b border-zinc-800 px-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-400">
                Exercise Library
              </div>

              <h2 className="mt-1 text-2xl font-bold">
                Add Exercise
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close exercise picker"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative mt-4">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              autoFocus
              type="search"
              value={search}
              onChange={e =>
                setSearch(e.target.value)
              }
              placeholder="Search exercises..."
              className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-11 pr-4 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-[max(env(safe-area-inset-bottom),24px)] pt-5">
          {favoriteItems.length > 0 && (
            <section className="mb-7">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-yellow-400">
                <Star size={16} className="fill-yellow-400" />
                Favorites
              </div>

              <div className="space-y-2">
                {favoriteItems.map(
                  renderExercise,
                )}
              </div>
            </section>
          )}

          {Object.entries(grouped).map(
            ([group, exercises]) => (
              <section
                key={group}
                className="mb-7"
              >
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
                  <span>
                    {muscleIcons[group] ??
                      "•"}
                  </span>
                  <span>{group}</span>
                </div>

                <div className="space-y-2">
                  {exercises.map(
                    renderExercise,
                  )}
                </div>
              </section>
            ),
          )}

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-lg font-semibold">
                No exercises found
              </div>

              <div className="mt-1 text-sm text-zinc-500">
                Try a different search.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
