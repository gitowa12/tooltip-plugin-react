import React, { memo, useEffect } from "react";
import styles from "../../css/Input.module.css";
import { useFormContext } from "react-hook-form";

const Input = ({ stackId, name, label, value, onChange, fieldName }) => {
  //React-Hook-Formのコンテキストを取得
  const {
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const id = `${name}_${stackId}`;

  let disabledBool = false;
  if (fieldName === null || fieldName.fieldId === "default") {
    disabledBool = true;
  }

  // 必須ルールを含むその他のルールを定義
  const validationRules = {};
  if (!disabledBool) {
    validationRules.required = "入力必須です";
  } else {
    validationRules.required = "";
  }
  // disabledの状態が変更されたときにエラーメッセージをクリア
  // useEffect(() => {
  //   setError(id, {});
  //   // if (!disabledBool) {
  //   //   setError(id, {});
  //   // }
  // }, [fieldName, setError]);

  useEffect(() => {
    clearErrors(id);
  }, [value, fieldName]);

  // // disabledの状態が変更されたときにエラーメッセージをクリア
  // useEffect(() => {
  //   if (disabledBool) {
  //     // disabled の場合はエラーメッセージをクリア
  //     clearErrors(id);
  //   }
  // }, [disabledBool, id, clearErrors]);

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        id={id}
        name={name}
        className={styles.input}
        disabled={disabledBool}
        value={value}
        {...register(id, validationRules)}
        onChange={onChange}
      ></input>
      {errors[id]?.message && (
        <p className={styles.alartMessage}>{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default Input;
