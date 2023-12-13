import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.scss";

console.log(kintone.$PLUGIN_ID);
const PLUGIN_ID = kintone.$PLUGIN_ID;

const container = document.getElementById("config-root");
const root = createRoot(container);
root.render(<App PLUGIN_ID={PLUGIN_ID} />);
