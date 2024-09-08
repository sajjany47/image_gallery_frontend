import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../node_modules/primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
