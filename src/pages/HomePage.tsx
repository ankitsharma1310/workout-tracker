import { useNavigate } from "react-router-dom";
import { Dumbbell, History } from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { useWorkoutStore } from "../store/workoutStore";

export default function HomePage() {

  const navigate = useNavigate();

  const resetWorkout = useWorkoutStore(
    state => state.resetWorkout
  );

  function startWorkout() {
    resetWorkout();
    navigate("/workout");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">

      <Card>

        <div className="flex flex-col items-center gap-5">

          <div className="rounded-full bg-blue-600 p-5">
            <Dumbbell size={40}/>
          </div>

          <h1 className="text-4xl font-bold">
            Workout Tracker
          </h1>

          <p className="text-center text-zinc-400">
            Train smarter. Track every workout.
          </p>

          <Button
            onClick={startWorkout}
          >
            Start Workout
          </Button>

          <Button
            className="bg-zinc-800 hover:bg-zinc-700"
            onClick={() => navigate("/history")}
          >
            <History size={18}/>
            <span className="ml-2">
              Workout History
            </span>
          </Button>

        </div>

      </Card>

    </div>
  );

}
