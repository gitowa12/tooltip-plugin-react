import React from "react";

const PLUGIN_ID = kintone.$PLUGIN_ID;
const getConfig = kintone.plugin.app.getConfig(PLUGIN_ID);
const configKeys = Object.keys(getConfig);
let config = [];
configKeys.forEach((key) => {
  config[key] = JSON.parse(getConfig[key]);
});
config = Object.values(config);

const GetConfig = (rowId, cellId, type, name) => {
  const rowObj = config.find((row) => row.id === rowId);
  if (!rowObj) return undefined;

  const cellAllay = rowObj[type];
  const data = cellAllay.find((el) => el.id === cellId);
  const target = data[name];
  console.log(target);
  return target;
};

export default GetConfig;
