import { FormControl } from "@mui/material";
import React, { memo } from "react";
import styles from "./TextArea.module.css";

const TextArea = ({ id, label, value, onChange, displayValue }) => {
  //表示方法によって表示・非表示を切り替え
  let visibleBool = false;
  let linkBool = false;
  if (displayValue !== undefined) {
    if (id === "message") {
      if (displayValue === "subWindow") {
        visibleBool = true;
      }
      if (displayValue === "link") {
        linkBool = true;
      }
    }
    if (id === "url") {
      if (displayValue === "tooltip" || displayValue === "alert") {
        visibleBool = true;
      }
    }
  }

  //リンク時にラベルの変更

  return (
    <div className={visibleBool ? styles.hidden : styles.container}>
      <label className={styles.label}>{linkBool ? "リンク名" : label}</label>
      <textarea
        id={id}
        className={styles.textarea}
        onChange={onChange}
        defaultValue={value}
        // disabled={disabledBool}
      ></textarea>
    </div>
  );
};

export default TextArea;
