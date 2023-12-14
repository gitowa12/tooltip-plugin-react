import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TableComponent from "../components/Table";

const App = ({ config }) => {
  return (
    <>
      <TableComponent config={config}></TableComponent>
    </>
  );
};

export default App;
