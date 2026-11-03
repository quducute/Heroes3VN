import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PrefsProvider } from "@shared/desktop/components/Prefs.jsx";
import { loadPrefs } from "./lib/prefs.js";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/vietnamese-400.css";
import "@fontsource/roboto/latin-400-italic.css";
import "@fontsource/roboto/vietnamese-400-italic.css";
import "@fontsource/roboto/latin-700.css";
import "@fontsource/roboto/vietnamese-700.css";
import "@fontsource/luxurious-roman/latin-400.css";
import "@fontsource/luxurious-roman/vietnamese-400.css";
import "./styles.css";

const prefs = await Promise.race([
  loadPrefs(),
  new Promise((resolve) => setTimeout(resolve, 1000)),
]).catch(() => undefined);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrefsProvider initial={prefs}>
      <App />
    </PrefsProvider>
  </React.StrictMode>,
);
