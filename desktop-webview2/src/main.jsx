import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/vietnamese-400.css";
import "@fontsource/roboto/latin-400-italic.css";
import "@fontsource/roboto/vietnamese-400-italic.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/vietnamese-500.css";
import "@fontsource/roboto/latin-700.css";
import "@fontsource/roboto/vietnamese-700.css";
import "@fontsource/luxurious-roman/latin-400.css";
import "@fontsource/luxurious-roman/vietnamese-400.css";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
