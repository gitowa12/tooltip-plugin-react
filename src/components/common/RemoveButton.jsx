import { RemoveCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const RemoveButton = ({ onClick }) => {
  return (
    <IconButton
      sx={{ padding: 0 }}
      aria-label="delete"
      fontSize="small"
      color="secondary"
      onClick={onClick}
    >
      <RemoveCircle fontSize="inherit" />
    </IconButton>
  );
};

export default RemoveButton;
