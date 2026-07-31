import { useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { useWorkoutStore } from "../store/workoutStore";

export default function HomePage() {

  const navigate = useNavigate();

  const startWorkout =
    useWorkoutStore(state => state.resetWorkout);

  function begin() {

    startWorkout();

    navigate("/workout");

  }

  return (

    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">

      <Card>

        <div className="flex flex-col items-center">

          <div className="rounded-full bg-blue-600 p-5 mb-6">

            <Dumbbell size={40}/>

          </div>

          <h1 className="text-4xl font-bold mb-3">
            Workout Tracker
          </h1>

          <p className="text-zinc-400 text-center mb-8">
            Train smarter.
            Track everything.
          </p>

          <Button
            onClick={begin}
          >
            Start Workout
          </Button>

        </div>

      </Card>

    </div>

  );

}
