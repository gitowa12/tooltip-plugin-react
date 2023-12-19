import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
    <FormControl size="small" sx={{ width: 180 }}>
      <InputLabel id={id}>表示方法</InputLabel>
      <Select labelId={id} id={id} value={value} label={label} onChange={onChange}>
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
