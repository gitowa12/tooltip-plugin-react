import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TableComponent from "../components/Table";

const App = ({ beforeConfig }) => {
  return (
    <>
      <TableComponent beforeConfig={beforeConfig}></TableComponent>
    </>
  );
};

export default App;
