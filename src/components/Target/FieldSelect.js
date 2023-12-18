import { Box, TextField } from "@mui/material";
import React from "react";

const FieldSelect = ({ handleChange, stackId, value }) => {
  return (
    <Box>
      <TextField
        sx={{
          width: 240,
          padding: 1,
        }}
        id="fieldName"
        label="フィールド名"
        size="small"
        value={value}
        onChange={(e) => handleChange(e, stackId, "field-name")}
      />
    </Box>
  );
};

export default FieldSelect;
