import { RemoveCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { memo } from "react";

const RemoveButton = ({ onClick }) => {
  return (
    <IconButton
      sx={{ mt: "10px", padding: "5px" }}
      aria-label="delete"
      fontSize="small"
      color="error"
      onClick={onClick}
    >
      <RemoveCircle fontSize="inherit" />
    </IconButton>
  );
};

export default RemoveButton;
