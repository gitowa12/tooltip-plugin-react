import { FormControl, TextField } from "@mui/material";
import React from "react";

const TextInput = ({ id, label, value, onChange }) => {
  return (
    <FormControl>
      <TextField
        sx={{
          width: 240,
          padding: 1,
        }}
        id={id}
        label={label}
        size="small"
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default TextInput;
