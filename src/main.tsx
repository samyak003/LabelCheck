import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StateProvider } from "./StateProvider.tsx";
import reducer, { initialState } from "./reducer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </StrictMode>,
);
