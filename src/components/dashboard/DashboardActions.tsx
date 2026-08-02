import {
  Dumbbell,
  History,
  Repeat,
  Settings,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

type Props = {
  onWorkout(): void;
  onRepeat(): void;
  onHistory(): void;
  onSettings(): void;
};

export default function DashboardActions({
  onWorkout,
  onRepeat,
  onHistory,
  onSettings,
}: Props) {

  return (

    <Card>

      <h2 className="mb-4 text-lg font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">

        <Button onClick={onWorkout}>
          <Dumbbell size={18}/>
          <span className="ml-2">
            New Workout
          </span>
        </Button>

        <Button
          className="bg-zinc-800 hover:bg-zinc-700"
          onClick={onRepeat}
        >
          <Repeat size={18}/>
          <span className="ml-2">
            Repeat Last Workout
          </span>
        </Button>

        <Button
          className="bg-zinc-800 hover:bg-zinc-700"
          onClick={onHistory}
        >
          <History size={18}/>
          <span className="ml-2">
            History
          </span>
        </Button>

        <Button
          className="bg-zinc-800 hover:bg-zinc-700"
          onClick={onSettings}
        >
          <Settings size={18}/>
          <span className="ml-2">
            Settings
          </span>
        </Button>

      </div>

    </Card>

  );

}
