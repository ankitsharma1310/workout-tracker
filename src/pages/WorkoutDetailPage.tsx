import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { getWorkoutHistory } from "../utils/storage";
import { getWorkoutVolume } from "../utils/volume";
import { formatDuration } from "../utils/duration";

export default function WorkoutDetailPage() {

  const navigate = useNavigate();

  const { id } = useParams();

  const workout = getWorkoutHistory().find(
    workout => workout.id === id,
  );

  if (!workout) {

    return (

      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">

        Workout not found.

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-5xl mx-auto p-5">

        <button
          onClick={() => navigate("/history")}
          className="bg-zinc-800 rounded-xl p-3 mb-6"
        >

          <ArrowLeft />

        </button>

        <h1 className="text-4xl font-bold">

          {workout.name}

        </h1>

        <p className="text-zinc-400 mt-2">

          {new Date(workout.startedAt).toLocaleString()}

        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <div>

            <div className="text-zinc-500">

              Duration

            </div>

            <div className="text-xl font-bold">

              {formatDuration(
                workout.startedAt,
                workout.finishedAt,
              )}

            </div>

          </div>

          <div>

            <div className="text-zinc-500">

              Volume

            </div>

            <div className="text-xl font-bold">

              {getWorkoutVolume(workout.exercises)} kg

            </div>

          </div>

        </div>

        <div className="mt-10 space-y-8">

          {workout.exercises.map(exercise => (

            <div
              key={exercise.id}
              className="rounded-2xl bg-zinc-900 p-5"
            >

              <h2 className="text-2xl font-bold mb-4">

                {exercise.name}

              </h2>

              <table className="w-full">

                <thead>

                  <tr className="text-zinc-500">

                    <th className="text-left">Set</th>
                    <th className="text-left">Weight</th>
                    <th className="text-left">Reps</th>

                  </tr>

                </thead>

                <tbody>

                  {exercise.sets.map((set, index) => (

                    <tr
                      key={set.id}
                      className="border-t border-zinc-800"
                    >

                      <td className="py-3">

                        {index + 1}

                      </td>

                      <td>

                        {set.weight}

                      </td>

                      <td>

                        {set.reps}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}
