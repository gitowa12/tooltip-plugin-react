import { FormControl } from "@mui/material";
import React from "react";
import styles from "../../css/TextArea.module.css";

const TextArea = ({ id, label, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <textarea
        id={id}
        className={styles.textarea}
        onChange={onChange}
        defaultValue={value}
      ></textarea>
    </div>
  );
};

export default TextArea;
