import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const DisplaySelect = ({ handleChange, stackId, value }) => {
  return (
    <FormControl size="small" sx={{ width: 180 }}>
      <InputLabel id="display-select">表示方法</InputLabel>
      <Select
        labelId="display-select"
        id="display"
        value={value}
        label="表示方法"
        onChange={(e) => handleChange(e, stackId, "display")}
      >
        <MenuItem value={"tooltip"}>ツールチップ</MenuItem>
        <MenuItem value={"alert"}>アラート</MenuItem>
        <MenuItem value={"subWindow"}>サブウィンドウ</MenuItem>
        <MenuItem value={"link"}>リンク</MenuItem>
        <MenuItem value={"button"}>ボタン</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DisplaySelect;
