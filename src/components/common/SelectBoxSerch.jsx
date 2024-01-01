import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SelectBoxSerch = ({ id, value, options, label, stackId, onChange }) => {
  // options が空の場合、デフォルトで空の配列を設定する
  return (
    <Autocomplete
      sx={{ width: 300, margin: 1 }}
      disablePortal
      id={id}
      options={options}
      value={value}
      getOptionKey={(option) => {
        return option.fieldId;
      }}
      size="small"
      isOptionEqualToValue={(option, value) => {
        return option.fieldId === value.fieldId;
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event, newValue) => {
        // console.log(newValue);
        onChange(newValue, stackId);
      }}
    />
  );
};

export default SelectBoxSerch;
