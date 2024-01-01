import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const SelectBox = ({ id, value, label, onChange, options }) => {
  const menuItems = (options || []).map((option) => {
    return (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    );
  });

  // console.log(menuItems);
  return (
    <TextField
      id={id}
      select
      label={label}
      value={value}
      size="small"
      sx={{ width: 180, margin: 1 }}
    >
      {menuItems}
    </TextField>
  );
};

export default SelectBox;
