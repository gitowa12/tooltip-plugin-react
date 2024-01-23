import React, { useEffect, useState } from "react";
import ConfigTable from "../../components/ConfigTable";

// 前回の設定の取得とデータの整形
// console.log(kintone.$PLUGIN_ID);
const PLUGIN_ID = kintone.$PLUGIN_ID;
const getConfig = kintone.plugin.app.getConfig(PLUGIN_ID);
// console.log("生データ", getConfig);

const keysArray = Object.keys(getConfig);
// console.log(keysArray);

keysArray.sort((a, b) => {
  const numA = parseInt(a.replace("key", ""));
  const numB = parseInt(b.replace("key", ""));
  return numA - numB;
});

// console.log(keysArray);

let config = {}; // config を最初に初期化
keysArray.forEach((key) => {
  config[key] = JSON.parse(getConfig[key]); // configオブジェクトに挿入
});
// console.log("config(オブジェクト)", config);

const configArray = Object.values(config); //configオブジェクトを配列化
// console.log("config(配列)", configArray);

const App = () => {
  return (
    <>
      <ConfigTable beforeConfig={configArray}></ConfigTable>
    </>
  );
};

export default App;
