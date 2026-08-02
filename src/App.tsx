import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WorkoutPage from "./pages/WorkoutPage";
import HistoryPage from "./pages/HistoryPage";
import WorkoutDetailPage from "./pages/WorkoutDetailPage";
import SettingsPage from "./pages/SettingsPage";

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
          path="/history"
          element={<HistoryPage />}
        />

        <Route
          path="/history/:id"
          element={<WorkoutDetailPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}
