import React, { memo } from "react";
import styles from "../../css/Input.module.css";

const Input = memo(({ id, label, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        id={id}
        className={styles.input}
        onChange={onChange}
        defaultValue={value}
      ></input>
    </div>
  );
});

export default Input;
