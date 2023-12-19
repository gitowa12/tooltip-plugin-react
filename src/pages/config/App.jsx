import React, { useEffect, useState } from "react";
import ConfigTable from "../../components/ConfigTable";

const App = ({ beforeConfig }) => {
  return (
    <>
      <ConfigTable beforeConfig={beforeConfig}></ConfigTable>
    </>
  );
};

export default App;
