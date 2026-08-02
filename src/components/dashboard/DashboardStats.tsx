import Card from "../ui/Card";
import { useSettingsStore } from "../../store/settingsStore";

type Props = {
  workouts: number;
  volume: number;
  streak: number;
};

export default function DashboardStats({
  workouts,
  volume,
  streak,
}: Props) {

  const {
    settings,
  } = useSettingsStore();

  return (

    <div className="grid gap-4 md:grid-cols-3">

      <Card>

        <div className="text-zinc-500">
          Workouts
        </div>

        <div className="mt-2 text-3xl font-bold">
          {workouts}
        </div>

      </Card>

      <Card>

        <div className="text-zinc-500">
          Total Volume
        </div>

        <div className="mt-2 text-3xl font-bold">
          {volume.toLocaleString()} {settings.weightUnit}
        </div>

      </Card>

      <Card>

        <div className="text-zinc-500">
          Current Streak
        </div>

        <div className="mt-2 text-3xl font-bold">
          🔥 {streak}
        </div>

      </Card>

    </div>

  );

}
