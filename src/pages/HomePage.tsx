import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardActions from "../components/dashboard/DashboardActions";
import DashboardRecent from "../components/dashboard/DashboardRecent";

import { useWorkoutStore } from "../store/workoutStore";
import { getCurrentWorkout } from "../utils/currentWorkout";
import { cloneWorkout } from "../utils/cloneWorkout";
import { getLastWorkout } from "../utils/repeatWorkout";
import { getWorkoutHistory } from "../utils/storage";
import { getWorkoutVolume } from "../utils/volume";

export default function HomePage() {

  const navigate = useNavigate();

  const {
    resetWorkout,
    setWorkout,
  } = useWorkoutStore();

  const workouts = useMemo(
    () => getWorkoutHistory(),
    [],
  );

  const totalVolume = useMemo(
    () =>
      workouts.reduce(
        (sum, workout) =>
          sum +
          getWorkoutVolume(
            workout.exercises,
          ),
        0,
      ),
    [workouts],
  );

  function startWorkout() {

    const savedWorkout =
      getCurrentWorkout();

    if (
      savedWorkout &&
      savedWorkout.exercises.length > 0
    ) {

      const resume =
        window.confirm(
          "Resume your unfinished workout?",
        );

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

    if (last) {

      setWorkout(
        cloneWorkout(last),
      );

      navigate("/workout");

    }

  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-6xl p-6 space-y-6">

        <DashboardHeader />

        <DashboardStats
          workouts={workouts.length}
          volume={totalVolume}
          streak={0}
        />

        <DashboardActions
          onWorkout={startWorkout}
          onRepeat={repeatLastWorkout}
          onHistory={() =>
            navigate("/history")
          }
          onSettings={() =>
            navigate("/settings")
          }
        />
        <DashboardRecent />

      </div>

    </div>

  );

}
