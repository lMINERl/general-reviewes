/* @refresh reload */
import "./index.css";

import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App/app";
import AppProvider from "./Store/appContext";

const root =
  document.getElementById("root") ??
  Object.assign(document.createElement("div"), { id: "root" });

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  ),
  root,
);
