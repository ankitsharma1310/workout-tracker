import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2500,
      }}
    />

    <App />
  </StrictMode>
);