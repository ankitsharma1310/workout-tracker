import Card from "../ui/Card";

import { getWorkoutHistory } from "../../utils/storage";

export default function DashboardRecent() {

  const workouts =
    getWorkoutHistory()
      .slice()
      .reverse()
      .slice(0,5);

  return (

    <Card>

      <h2 className="mb-4 text-lg font-bold">
        Recent Workouts
      </h2>

      {workouts.length === 0 && (

        <p className="text-zinc-500">
          No workouts yet.
        </p>

      )}

      <div className="space-y-3">

        {workouts.map(workout => (

          <div
            key={workout.id}
            className="flex justify-between"
          >

            <div>

              <div className="font-semibold">
                {workout.name}
              </div>

              <div className="text-sm text-zinc-500">
                {workout.exercises.length} exercises
              </div>

            </div>

          </div>

        ))}

      </div>

    </Card>

  );

}
