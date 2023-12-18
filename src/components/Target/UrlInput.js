import { FormControl, TextField } from "@mui/material";
import React from "react";

const UrlInput = ({ handleChange, stackId, value }) => {
  return (
    <FormControl>
      <TextField
        sx={{
          width: 240,
          padding: 1,
        }}
        id="url"
        label="URL"
        size="small"
        value={value}
        onChange={(e) => handleChange(e, stackId, "url")}
      />
    </FormControl>
  );
};

export default UrlInput;
