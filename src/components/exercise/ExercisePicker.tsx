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

const muscleGroups = [
  "All",
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Forearms",
  "Legs",
  "Glutes",
  "Core",
  "Cardio",
];

export default function ExercisePicker({
  open,
  onClose,
  onSelect,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] =
    useState("All");

  const {
    favorites,
    toggle,
  } = useFavoriteExerciseStore();

  const searchTerm = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    return exerciseLibrary.filter(exercise => {
      const matchesGroup =
        selectedGroup === "All" ||
        exercise.muscleGroup === selectedGroup;

      const matchesSearch =
        !searchTerm ||
        exercise.name
          .toLowerCase()
          .includes(searchTerm) ||
        exercise.equipment
          .toLowerCase()
          .includes(searchTerm) ||
        exercise.muscleGroup
          .toLowerCase()
          .includes(searchTerm);

      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchTerm]);

  const favoriteItems = useMemo(
    () =>
      filtered.filter(exercise =>
        favorites.includes(exercise.name),
      ),
    [filtered, favorites],
  );

  const grouped = useMemo(() => {
    const groups: Record<
      string,
      typeof filtered
    > = {};

    filtered
      .filter(
        exercise =>
          !favorites.includes(exercise.name),
      )
      .forEach(exercise => {
        if (!groups[exercise.muscleGroup]) {
          groups[exercise.muscleGroup] = [];
        }

        groups[exercise.muscleGroup].push(
          exercise,
        );
      });

    return groups;
  }, [filtered, favorites]);

  function select(
    exercise: (typeof exerciseLibrary)[number],
  ) {
    onSelect({
      id: crypto.randomUUID(),
      name: exercise.name,
      muscleGroup: exercise.muscleGroup,
      sets: [],
    });

    onClose();
    setSearch("");
    setSelectedGroup("All");
  }

  function handleClose() {
    onClose();
    setSearch("");
    setSelectedGroup("All");
  }

  if (!open) return null;

  const renderExercise = (
    exercise: (typeof exerciseLibrary)[number],
  ) => {
    const isFavorite = favorites.includes(
      exercise.name,
    );

    return (
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
            isFavorite
              ? `Remove ${exercise.name} from favorites`
              : `Favorite ${exercise.name}`
          }
          className={[
            "flex h-11 w-11 shrink-0",
            "items-center justify-center",
            "rounded-xl bg-zinc-900",
            "text-zinc-500",
            "active:scale-95",
          ].join(" ")}
        >
          <Star
            size={18}
            className={
              isFavorite
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
          className={[
            "min-w-0 flex-1",
            "rounded-xl bg-zinc-900",
            "px-4 py-3",
            "text-left",
            "active:bg-zinc-800",
          ].join(" ")}
        >
          <div className="truncate text-[15px] font-medium">
            {exercise.name}
          </div>

          <div className="mt-0.5 text-xs text-zinc-500">
            {exercise.equipment}
          </div>
        </button>
      </div>
    );
  };

  const showingSearchResults =
    searchTerm.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-white">
      <div className="flex min-h-dvh flex-col pt-[max(env(safe-area-inset-top),12px)]">

        {/* HEADER */}
        <div className="border-b border-zinc-800 px-4 pb-3">

          <div className="flex items-center justify-between">

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-blue-400">
                Exercise Library
              </div>

              <h2 className="mt-0.5 text-2xl font-bold">
                Add Exercise
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">
                {exerciseLibrary.length} exercises
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close exercise picker"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 active:scale-95"
            >
              <X size={20} />
            </button>

          </div>

          {/* SEARCH */}
          <div className="relative mt-3">

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
              className={[
                "h-12 w-full",
                "rounded-xl",
                "border border-zinc-800",
                "bg-zinc-900",
                "pl-11 pr-4",
                "text-base",
                "outline-none",
                "focus:border-blue-500",
              ].join(" ")}
            />

          </div>

          {/* MUSCLE FILTERS */}
          {!showingSearchResults && (
            <div className="mt-3 -mx-4 overflow-x-auto px-4 scrollbar-none">
              <div className="flex w-max gap-2 pb-1">

                {muscleGroups.map(group => {
                  const active =
                    selectedGroup === group;

                  return (
                    <button
                      key={group}
                      type="button"
                      onClick={() =>
                        setSelectedGroup(group)
                      }
                      className={[
                        "h-9 rounded-full px-4",
                        "text-xs font-semibold",
                        "whitespace-nowrap",
                        "transition",
                        active
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-900 text-zinc-400",
                      ].join(" ")}
                    >
                      {group}
                    </button>
                  );
                })}

              </div>
            </div>
          )}

        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 pb-[max(env(safe-area-inset-bottom),24px)] pt-4">

          {/* SEARCH RESULTS */}
          {showingSearchResults ? (
            <>
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {filtered.length} result
                {filtered.length !== 1
                  ? "s"
                  : ""}
              </div>

              {filtered.length > 0 ? (
                <div className="space-y-2">
                  {filtered.map(
                    renderExercise,
                  )}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <Search
                    size={30}
                    className="mx-auto text-zinc-700"
                  />

                  <div className="mt-3 text-base font-semibold">
                    No exercises found
                  </div>

                  <div className="mt-1 text-sm text-zinc-500">
                    Try another exercise name,
                    muscle group, or equipment.
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* FAVORITES */}
              {favoriteItems.length > 0 && (
                <section className="mb-6">

                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-2 text-sm font-semibold text-yellow-400">
                      <Star
                        size={15}
                        className="fill-yellow-400"
                      />
                      Favorites
                    </div>

                    <span className="text-xs text-zinc-600">
                      {favoriteItems.length}
                    </span>

                  </div>

                  <div className="space-y-2">
                    {favoriteItems.map(
                      renderExercise,
                    )}
                  </div>

                </section>
              )}

              {/* GROUPS */}
              {Object.entries(grouped).map(
                ([group, exercises]) => (
                  <section
                    key={group}
                    className="mb-6"
                  >

                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span className="text-base">
                          {muscleIcons[group] ??
                            "•"}
                        </span>

                        <span className="text-sm font-semibold">
                          {group}
                        </span>

                      </div>

                      <span className="text-xs text-zinc-600">
                        {exercises.length}
                      </span>

                    </div>

                    <div className="space-y-2">
                      {exercises.map(
                        renderExercise,
                      )}
                    </div>

                  </section>
                ),
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
