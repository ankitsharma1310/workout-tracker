import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Page from "../components/layout/Page";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import BodyweightSummary from "../components/bodyweight/BodyweightSummary";

import { useWorkoutStore } from "../store/workoutStore";
import { getCurrentWorkout } from "../utils/currentWorkout";
import { cloneWorkout } from "../utils/cloneWorkout";
import { getLastWorkout } from "../utils/repeatWorkout";
import { getWorkoutHistory } from "../utils/storage";
import { getWorkoutVolume } from "../utils/volume";

export default function HomePage() {
  const navigate = useNavigate();
  const { resetWorkout, setWorkout } = useWorkoutStore();
  const workouts = useMemo(() => getWorkoutHistory(), []);
  const totalVolume = useMemo(() => workouts.reduce((sum, workout) => sum + getWorkoutVolume(workout.exercises), 0), [workouts]);

  function startWorkout() {
    const savedWorkout = getCurrentWorkout();
    if (savedWorkout && savedWorkout.exercises.length > 0) {
      const resume = window.confirm("Resume your unfinished workout?");
      if (resume) {
        setWorkout(savedWorkout);
        navigate("/workout");
        return;
      }
    }
    resetWorkout();
    navigate("/workout");
  }

  function repeatLastWorkout() {
    const last = getLastWorkout();
    if (!last) return;
    setWorkout(cloneWorkout(last));
    navigate("/workout");
  }

  return (
    <Page>
      <div className="pt-2">
        <p className="text-sm font-medium text-blue-400">WORKOUT TRACKER</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Ready to train?</h1>

        <div className="mt-6 grid gap-3">
          <Button className="h-14 w-full text-base font-semibold" onClick={startWorkout}>Start Workout</Button>
          <Button className="h-14 w-full bg-zinc-800 text-base font-semibold hover:bg-zinc-700" onClick={repeatLastWorkout}>Repeat Last Workout</Button>
        </div>

        <div className="mt-8"><BodyweightSummary /></div>

        <button type="button" onClick={() => navigate("/programs")} className="mt-6 w-full text-left">
          <Card className="border-blue-500/30 p-4 transition active:scale-[0.99]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-blue-400">Programs</div>
                <div className="mt-1 text-lg font-bold">5/3/1 + BBB</div>
                <div className="mt-1 text-sm text-zinc-500">Enter your lifts once. Get the workout pre-filled.</div>
              </div>
              <div className="text-2xl text-blue-400">→</div>
            </div>
          </Card>
        </button>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">Workouts</div>
            <div className="mt-2 text-2xl font-bold">{workouts.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs uppercase tracking-wide text-zinc-500">Total Volume</div>
            <div className="mt-2 text-2xl font-bold">{totalVolume.toLocaleString()}<span className="ml-1 text-sm font-medium text-zinc-500">kg</span></div>
          </Card>
        </div>

        <div className="mt-10 pb-2 text-center">
          <p className="text-xs text-zinc-600">Workout Tracker</p>
          <p className="mt-1 text-xs text-zinc-700">Built by Ankit Sharma · v2.0.0</p>
        </div>
      </div>
    </Page>
  );
}
