import React, { memo, useState } from "react";
import styles from "./RadioButton.module.css";

const RadioButton = memo(({ onChange, options, beforeData, parentId }) => {
  let checker = "";
  if (beforeData !== "") {
    options.forEach((option) => {
      if (option.value === beforeData) {
        checker = option.value;
      }
    });
  } else {
    checker = "and";
  }

  const optionItems = (options || []).map((option) => (
    <div className={styles.item} key={option.value}>
      <input
        type="radio"
        name={parentId}
        id={option.value}
        value={option.value}
        checked={checker === option.value}
        onChange={() => onChange(parentId, option.value, "conditionSwicth")}
      />
      <label htmlFor={option.value}>{option.label}</label>
    </div>
  ));

  return <div className={styles.container}>{optionItems}</div>;
});

export default RadioButton;
