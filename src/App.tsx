import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WorkoutPage from "./pages/WorkoutPage";
import HistoryPage from "./pages/HistoryPage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";
import WorkoutCompletePage from "./pages/WorkoutCompletePage";
import SettingsPage from "./pages/SettingsPage";
import BodyweightPage from "./pages/BodyweightPage";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/workout"
          element={<WorkoutPage />}
        />

        <Route
          path="/workout-complete"
          element={<WorkoutCompletePage />}
        />

        <Route
          path="/history"
          element={<HistoryPage />}
        />

        <Route
          path="/history/:id"
          element={<WorkoutDetailPage />}
        />

        <Route
          path="/bodyweight"
          element={<BodyweightPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}
