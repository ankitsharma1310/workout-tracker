import { useNavigate } from "react-router-dom";

import DashboardRecent from "../components/dashboard/DashboardRecent";
import Page from "../components/layout/Page";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import { useWorkoutStore } from "../store/workoutStore";
import { getCurrentWorkout } from "../utils/currentWorkout";
import { cloneWorkout } from "../utils/cloneWorkout";
import { getLastWorkout } from "../utils/repeatWorkout";
import { useState } from "react";

export default function HomePage() {

  const navigate = useNavigate();
  const [resumePromptOpen, setResumePromptOpen] =
    useState(false);

  const {
    resetWorkout,
    setWorkout,
  } = useWorkoutStore();

  function startWorkout() {

    const savedWorkout =
      getCurrentWorkout();

    if (
      savedWorkout &&
      savedWorkout.exercises.length > 0
    ) {

      setResumePromptOpen(true);
      return;

    }

    resetWorkout();

    navigate("/workout");

  }

  function resumeWorkout() {
    const savedWorkout = getCurrentWorkout();

    if (savedWorkout) {
      setWorkout(savedWorkout);
      navigate("/workout");
    }

    setResumePromptOpen(false);
  }

  function startNewWorkout() {
    setResumePromptOpen(false);
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

    <Page>

      <h1 className="text-3xl font-bold">
        Workout Tracker
      </h1>

      <p className="mt-1 text-zinc-400">
        Ready to train?
      </p>

      <Button
        className="mt-8 h-14 w-full text-lg"
        onClick={startWorkout}
      >
        ▶ Start Workout
      </Button>

      <Button
        className="mt-3 h-14 w-full bg-zinc-800"
        onClick={repeatLastWorkout}
      >
        🔁 Repeat Last Workout
      </Button>

      <div className="mt-8">

        <h2 className="mb-4 text-xl font-semibold">
          Recent Workouts
        </h2>

        <DashboardRecent />

      </div>

      <ConfirmDialog
        open={resumePromptOpen}
        title="Resume workout?"
        message="You have an unfinished workout saved."
        confirmLabel="Resume"
        onConfirm={resumeWorkout}
        onCancel={startNewWorkout}
      />

    </Page>

  );

}
