import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.scss";

// 前回の設定の取得とデータの整形
console.log(kintone.$PLUGIN_ID);
const PLUGIN_ID = kintone.$PLUGIN_ID;
const getConfig = kintone.plugin.app.getConfig(PLUGIN_ID);
console.log(getConfig);

const configKeys = Object.keys(getConfig);
console.log(configKeys);

let config = [];
configKeys.forEach((key) => {
  config[key] = JSON.parse(getConfig[key]);
});
console.log(config);

config = Object.values(config);
console.log(config);

const container = document.getElementById("config-root");
const root = createRoot(container);
console.log("hello1");
root.render(<App beforeConfig={config} />);
