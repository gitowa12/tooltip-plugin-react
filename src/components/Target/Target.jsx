import React, { memo, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Stack, TextField, TextareaAutosize } from "@mui/material";
import generateUniqueId from "../../utils/UnipueId";
import AddButton from "../common/AddButton";
import RemoveButton from "../common/RemoveButton";
import SelectBox from "../common/SelectBox";

import GetKintoneFields from "../../services/GetKintoneFields";
import TextArea from "../common/TextArea";
import UnstyledTextareaIntroduction from "../common/TextArea";
import AutoComplete from "../common/AutoComplete";
import LabelAndHelperText from "../common/AutoComplete";

const Targets = memo(({ parentId, updateTableData, beforeData }) => {
  /* console.log(fieldsData); */
  const createRow = () => {
    const obj = {
      id: generateUniqueId(),
      fieldName: {
        fieldId: "default",
        fieldCode: "default",
        label: "-----",
      },
      display: "tooltip",
      message: "",
      url: "",
    };
    return obj;
  };

  const [targetData, setTargetData] = useState(beforeData || [createRow()]);

  useEffect(() => {
    // console.log(targetData);
    updateTableData(parentId, targetData);
  }, [targetData]);

  const addRow = useCallback((index) => {
    const newRow = createRow();
    setTargetData((prevTargetData) => {
      const newData = [...prevTargetData];
      newData.splice(index + 1, 0, newRow);
      return newData;
    });
  }, []);

  const removeRow = (idToRemove) => {
    const updatedData = targetData.filter((row) => row.id !== idToRemove);
    setTargetData(updatedData);
  };

  const handleChange = useCallback((e, stackId) => {
    // 新しい値を取得
    const newValue = e.target.value;
    // console.log("handleChange", e);
    // 状態を更新
    setTargetData((prevTargetData) => {
      return prevTargetData.map((data) => {
        if (data.id === stackId) {
          if (e.target.id === "display") {
            console.log(newValue);
            return { ...data, display: newValue };
          }
          if (e.target.id === "message") {
            return { ...data, message: newValue };
          }
          if (e.target.id === "url") {
            return { ...data, url: newValue };
          }
        }
        return data;
      });
    });
  }, []);

  const selectChange = useCallback((newValue, stackId) => {
    // console.log("selectChange", newValue);
    // 状態を更新
    setTargetData((prevTargetData) => {
      return prevTargetData.map((data) => {
        if (data.id === stackId) {
          return { ...data, fieldName: newValue };
        }
        return data;
      });
    });
  }, []);

  //AutoCompleteに渡す選択肢に初期値を追加
  const fieldsData = GetKintoneFields();
  const defaultOption = {
    fieldId: "default",
    fieldCode: "default",
    label: "-----",
  };
  fieldsData.unshift(defaultOption);

  return (
    <Box
      sx={{
        width: "fit-content",
        minWidth: "1109px",
        boxShadow: 2,
        borderRadius: 0,
        padding: "4px",
      }}
      noValidate
      autoComplete="off"
    >
      {targetData.map((data, index) => (
        <Stack
          key={data.id}
          direction="row"
          alignItems="flex-start"
          spacing={1}
          sx={{ m: 1 }}
        >
          <AutoComplete
            id="field-name"
            label="フィールド名"
            value={data.fieldName}
            options={fieldsData}
            stackId={data.id}
            onChange={selectChange}
            parentId={parentId}
          ></AutoComplete>
          <SelectBox
            id="display"
            label="表示方法"
            value={data.display}
            onChange={(e) => handleChange(e, data.id)}
            options={[
              { value: "tooltip", label: "ツールチップ" },
              { value: "alert", label: "アラート" },
              { value: "subWindow", label: "サブウィンドウ" },
              { value: "link", label: "リンク" },
              // { value: "button", label: "ボタン" },
            ]}
          ></SelectBox>
          <TextArea
            id={"message"}
            label={"メッセージ"}
            value={data.message}
            onChange={(e) => handleChange(e, data.id)}
          ></TextArea>
          <TextArea
            id={"url"}
            label={"URL (サブウィンドウ・リンク選択時)"}
            value={data.url}
            onChange={(e) => handleChange(e, data.id)}
          ></TextArea>
          <Stack direction="row" alignItems="center">
            <AddButton onClick={() => addRow(index)}></AddButton>
            {targetData.length > 1 && (
              <RemoveButton onClick={() => removeRow(data.id)}></RemoveButton>
            )}
          </Stack>
        </Stack>
      ))}
    </Box>
  );
});

export default Targets;