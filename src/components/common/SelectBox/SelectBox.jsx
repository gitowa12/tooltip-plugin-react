import * as React from "react";
import styles from "./SelectBox.module.css";
import { memo } from "react";

const SelectBox = ({ id, value, label, onChange, options }) => {
  const menuItems = (options || []).map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <select
        id={id}
        className={styles.selectBox}
        value={value}
        onChange={onChange}
      >
        {menuItems}
      </select>
    </div>
  );
};

export default SelectBox;
// export default function SelectBox({ id, value, label, onChange, options }) {
//   const menuItems = (options || []).map((option) => (
//     <option key={option.value} value={option.value}>
//       {option.label}
//     </option>
//   ));
//   return (
//     <div className="container">
//       <label className={styles.label}>{label}</label>
//       <select id={id} className={styles.selectBox} value={value} onChange={onChange}>
//         {menuItems}
//       </select>
//     </div>
//   );
// }
