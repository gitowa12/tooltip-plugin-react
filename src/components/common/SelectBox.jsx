import * as React from "react";
import styles from "../../css/SelectBox.module.css";

export default function SelectBox({ id, value, label, onChange, options }) {
  const menuItems = (options || []).map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="container">
      <label className={styles.label}>{label}</label>
      <select id={id} className={styles.selectBox} value={value} onChange={onChange}>
        {menuItems}
      </select>
    </div>
  );
}
