import { ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

import HistoryCard from "../components/history/HistoryCard";

import { getWorkoutHistory } from "../utils/storage";

export default function HistoryPage() {

  const navigate = useNavigate();

  const history = getWorkoutHistory();

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-5xl mx-auto p-5">

        <button

          onClick={() => navigate("/")}

          className="bg-zinc-800 rounded-xl p-3 mb-6"

        >

          <ArrowLeft />

        </button>

        <h1 className="text-3xl font-bold mb-6">

          Workout History

        </h1>

        {history.length === 0 ? (

          <p className="text-zinc-400">

            No workouts completed yet.

          </p>

        ) : (

          <div className="space-y-4">

            {history
              .slice()
              .reverse()
              .map(workout => (

                <HistoryCard

                  key={workout.id}

                  workout={workout}

                />

              ))}

          </div>

        )}

      </div>

    </div>

  );

}
