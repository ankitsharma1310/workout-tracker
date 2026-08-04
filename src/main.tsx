import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
        }}
      />

      <App />
    </ErrorBoundary>
  </StrictMode>
);
