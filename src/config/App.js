import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TableComponent from "../components/Table";

const App = ({ PLUGIN_ID }) => {
  const getConfig = kintone.plugin.app.getConfig(PLUGIN_ID);
  console.log(getConfig);
  const configKeys = Object.keys(getConfig);
  console.log(configKeys);

  let config = [];
  configKeys.forEach((key) => {
    config[key] = JSON.parse(getConfig[key]);
  });
  console.log(config);

  return (
    <>
      <TableComponent config={config}></TableComponent>
    </>
  );
};

export default App;
