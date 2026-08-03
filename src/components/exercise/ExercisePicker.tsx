import { useMemo, useState } from "react";
import { Star } from "lucide-react";

import Button from "../ui/Button";
import Input from "../ui/Input";

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

  const [search, setSearch] = useState("");

  const {    toggle,
    isFavorite,
  } = useFavoriteExerciseStore();

  const filtered = useMemo(() => {

    return exerciseLibrary.filter(exercise =>
      exercise.name
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  }, [search]);

  const favoritesList =
    filtered.filter(exercise =>
      isFavorite(exercise.name),
    );

  const grouped = useMemo(() => {

    const groups: Record<string, typeof filtered> = {};

    filtered
      .filter(
        exercise =>
          !isFavorite(exercise.name),
      )
      .forEach(exercise => {

        if (!groups[exercise.muscleGroup]) {
          groups[exercise.muscleGroup] = [];
        }

        groups[exercise.muscleGroup].push(exercise);

      });

    return groups;

  }, [filtered, isFavorite]);

  if (!open) {
    return null;
  }

  return (

    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6">

      <div className="h-full w-full bg-zinc-950 p-6 overflow-hidden flex flex-col rounded-none">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Add Exercise
          </h2>

          <Button
            className="w-auto bg-red-600 hover:bg-red-700"
            onClick={onClose}
          >
            Close
          </Button>

        </div>

        <div className="sticky top-0 z-20 bg-zinc-950 pb-4">

          <Input
            placeholder="🔍 Search exercise..."
            value={search}
            onChange={e =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="mt-5 flex-1 overflow-y-auto pr-2">

  {favoritesList.length > 0 && (

    <div className="mb-6">

      <h3 className="sticky top-0 z-10 mb-2 bg-zinc-900 py-2 text-lg font-bold text-yellow-400">
        ⭐ Favorites
      </h3>

      <div className="space-y-2">

        {favoritesList.map(exercise => (

          <Button
            key={exercise.name}
            className="justify-between bg-yellow-900/30 hover:bg-yellow-800"
            onClick={() => {

              onSelect({
                id: crypto.randomUUID(),
                name: exercise.name,
                muscleGroup: exercise.muscleGroup,
                sets: [],
              });

              onClose();

            }}
          >

            <div className="flex w-full items-center justify-between">

              <span>
                {exercise.name}
              </span>

              <span className="text-xs text-zinc-400">
                {exercise.equipment}
              </span>

            </div>

          </Button>

        ))}

      </div>

    </div>

  )}

  {Object.entries(grouped).map(
    ([group, exercises]) => (

      <div
        key={group}
                className="mb-5"
              >

                <h3 className="sticky top-0 z-10 mb-2 bg-zinc-900 py-2 text-lg font-bold text-blue-400">
                  {muscleIcons[group]} {group}
                </h3>

                <div className="space-y-2">

                  {exercises.map(exercise => (

                    <Button
                      key={exercise.name}
                      className="justify-between bg-zinc-800 hover:bg-blue-700 transition-all"
                      onClick={() => {

                        onSelect({
                          id: crypto.randomUUID(),
                          name: exercise.name,
                          muscleGroup: exercise.muscleGroup,
                          sets: [],
                        });

                        onClose();

                      }}
                    >

                      <div className="flex w-full items-center justify-between">

                        <div className="flex items-center gap-3">

                          <button
                            type="button"
                            onClick={(e) => {

                              e.stopPropagation();

                              toggle(exercise.name);

                            }}
                          >

                            <Star
                              size={18}
                              className={
                                isFavorite(exercise.name)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-zinc-500"
                              }
                            />

                          </button>

                          <div>

                            <div>
                              {exercise.name}
                            </div>

                            <div className="text-xs text-zinc-500">
                              {exercise.equipment}
                            </div>

                          </div>

                        </div>

                        <span className="text-xs text-zinc-400">
                          {exercise.muscleGroup}
                        </span>

                      </div>

                    </Button>

                  ))}

                </div>

              </div>

            ),
          )}

        </div>

      </div>

    </div>

  );

}
