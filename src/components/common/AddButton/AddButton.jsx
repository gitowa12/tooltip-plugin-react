import { AddCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { memo } from "react";
import styles from "./AddButton.module.css";

const AddButton = ({ onClick }) => {
  return (
    <IconButton
      sx={{ mt: "10px", padding: "5px" }}
      aria-label="add"
      fontSize="small"
      color="primary"
      onClick={onClick}
      className={styles.container}
    >
      <AddCircle fontSize="inherit" />
    </IconButton>
  );
};

export default AddButton;
