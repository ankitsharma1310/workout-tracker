import Card from "../ui/Card";
import { useSettingsStore } from "../../store/settingsStore";

import type { Workout } from "../../types/workout";
import { getPersonalRecords } from "../../utils/personalRecords";

type Props = {
  workouts: Workout[];
};

export default function PersonalRecords({
  workouts,
}: Props) {

  const {
    settings,
  } = useSettingsStore();

  const records =
    getPersonalRecords(workouts);

  return (

    <Card>

      <h2 className="mb-5 text-lg font-bold">
        🏆 Personal Records
      </h2>

      {records.length === 0 && (

        <p className="text-zinc-500">
          No records yet.
        </p>

      )}

      <div className="space-y-3">

        {records.map(record => (

          <div
            key={record.exercise}
            className="flex justify-between"
          >

            <div>

              <div className="font-semibold">
                {record.exercise}
              </div>

              <div className="text-sm text-zinc-500">
                {record.reps} reps
              </div>

            </div>

            <div className="text-xl font-bold">
              {record.weight} {settings.weightUnit}
            </div>

          </div>

        ))}

      </div>

    </Card>

  );

}
