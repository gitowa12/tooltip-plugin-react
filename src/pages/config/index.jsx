import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// import "destyle.css";
// import "reset-css";
import "normalize.css";
// import "@fontsource-variable/inter";
import "../../css/style.css";

const container = document.getElementById("config-root");
const root = createRoot(container);
root.render(<App />);
