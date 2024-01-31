import { AddCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { memo } from "react";

const AddButton = memo(({ onClick }) => {
  return (
    <IconButton
      sx={{ mt: "10px", padding: "5px" }}
      aria-label="add"
      fontSize="small"
      color="primary"
      onClick={onClick}
    >
      <AddCircle fontSize="inherit" />
    </IconButton>
  );
});

export default AddButton;
