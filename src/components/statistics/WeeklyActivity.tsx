import Card from "../ui/Card";

import type { Workout } from "../../types/workout";

type Props = {
  workouts: Workout[];
};

export default function WeeklyActivity({
  workouts,
}: Props) {

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const counts = Array(7).fill(0);

  workouts.forEach(workout => {

    const day =
      new Date(
        workout.finishedAt ??
        workout.startedAt,
      ).getDay();

    counts[day]++;

  });

  const max =
    Math.max(...counts, 1);

  return (

    <Card>

      <h2 className="mb-5 text-lg font-bold">
        Weekly Activity
      </h2>

      <div className="space-y-3">

        {days.map((day, index) => (

          <div
            key={day}
            className="flex items-center gap-3"
          >

            <div className="w-10">
              {day}
            </div>

            <div className="h-3 flex-1 rounded bg-zinc-800">

              <div
                className="h-3 rounded bg-blue-600"
                style={{
                  width: `${
                    counts[index] /
                    max *
                    100
                  }%`,
                }}
              />

            </div>

            <div className="w-6 text-right">
              {counts[index]}
            </div>

          </div>

        ))}

      </div>

    </Card>

  );

}
