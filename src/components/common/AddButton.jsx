import { AddCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const AddButton = ({ onClick }) => {
  return (
    <IconButton
      sx={{ paddingRight: 1 }}
      aria-label="add"
      fontSize="small"
      color="primary"
      onClick={onClick}
    >
      <AddCircle fontSize="inherit" />
    </IconButton>
  );
};

export default AddButton;