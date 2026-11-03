import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BASE_PATH } from "./lib/routing.js";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/vietnamese-400.css";
import "@fontsource/roboto/latin-400-italic.css";
import "@fontsource/roboto/vietnamese-400-italic.css";
import "@fontsource/roboto/latin-700.css";
import "@fontsource/roboto/vietnamese-700.css";
import "@fontsource/luxurious-roman/latin-400.css";
import "@fontsource/luxurious-roman/vietnamese-400.css";
import "./styles.css";

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  const updating = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (updating) location.reload();
  });
  navigator.serviceWorker
    .register(`${BASE_PATH}sw.js`, { scope: BASE_PATH })
    .catch(() => {});
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
