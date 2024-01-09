import React, { useEffect, useState } from "react";
import ConfigTable from "../../components/ConfigTable";

// 前回の設定の取得とデータの整形
// console.log(kintone.$PLUGIN_ID);
const PLUGIN_ID = kintone.$PLUGIN_ID;
const getConfig = kintone.plugin.app.getConfig(PLUGIN_ID);
// console.log(getConfig);
const configKeys = Object.keys(getConfig);
// console.log(configKeys);
let config = [];
configKeys.forEach((key) => {
  config[key] = JSON.parse(getConfig[key]);
});
config = Object.values(config);
// console.log(config);
// console.log("Hello, World!");

const App = () => {
  return (
    <>
      <ConfigTable beforeConfig={config}></ConfigTable>
    </>
  );
};

export default App;
