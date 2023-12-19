import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import generateUniqueId from "../../utils/UnipueId";
import AddButton from "../common/AddButton";
import RemoveButton from "../common/RemoveButton";
import TextInput from "../common/TextInput";
import SelectBox from "../common/SelectBox";
import SelectBoxSerch from "../common/SelectBoxSerch";
import GetKintoneFields from "../../services/GetKintoneData";

const Targets = ({ parentId, updateTableData, beforeData }) => {
  const fieldsData = GetKintoneFields();
  console.log(fieldsData);

  const initData = [
    {
      id: generateUniqueId(),
      fieldName: {
        id: "",
        label: "",
      },
      display: "",
      message: "",
      url: "",
    },
  ];

  const [targetData, setTargetData] = useState(beforeData || initData);

  useEffect(() => {
    console.log(targetData);
    updateTableData(parentId, targetData, "targets");
  }, [targetData]);

  const addRow = (index) => {
    const newRow = {
      id: generateUniqueId(),
      fieldName: {
        id: "",
        label: "",
      },
      display: "",
      message: "",
      url: "",
    };

    setTargetData((prevTargetData) => {
      const newData = [...prevTargetData];
      newData.splice(index + 1, 0, newRow);
      return newData;
    });
  };

  const removeRow = (idToRemove) => {
    const updatedData = targetData.filter((row) => row.id !== idToRemove);
    setTargetData(updatedData);
  };

  const handleChange = (e, stackId, type) => {
    // 新しい値を取得
    const newValue = e.target.value;
    console.log("handleChange", e, type);
    // 状態を更新
    setTargetData((prevTargetData) => {
      return prevTargetData.map((data) => {
        if (data.id === stackId) {
          if (type === "fieldName") {
            return { ...data, fieldName: newValue };
          }
          if (type === "display") {
            return { ...data, display: newValue };
          }
          if (type === "message") {
            return { ...data, message: newValue };
          }
          if (type === "url") {
            return { ...data, url: newValue };
          }
        }
        return data;
      });
    });
  };
  const selectChange = (newValue, stackId) => {
    // 新しい値を取得
    console.log("selectChange", newValue);
    // 状態を更新
    setTargetData((prevTargetData) => {
      return prevTargetData.map((data) => {
        if (data.id === stackId) {
          return { ...data, fieldName: newValue };
        }
        return data;
      });
    });
  };

  const displayOptions = [
    { value: "tooltip", label: "ツールチップ" },
    { value: "alert", label: "アラート" },
    { value: "subWindow", label: "サブウィンドウ" },
  ];

  return (
    <Box
      component="form"
      sx={{
        boxShadow: 2,
        borderRadius: 0,
        padding: 1,
      }}
      noValidate
      autoComplete="off"
    >
      {targetData.map((data, index) => (
        <Stack key={data.id} direction="row" alignItems="center">
          <SelectBoxSerch
            id={"fieldName"}
            label={"フィールド名"}
            value={data.fieldName}
            options={fieldsData}
            stackId={data.id}
            onChange={selectChange}
          ></SelectBoxSerch>
          <SelectBox
            id={"display"}
            lebel={"表示方法"}
            value={data.display}
            onChange={(e) => handleChange(e, data.id, "display")}
            options={displayOptions}
          ></SelectBox>
          <TextInput
            id={"message"}
            label={"メッセージ"}
            value={data.message}
            onChange={(e) => handleChange(e, data.id, "message")}
          ></TextInput>
          <TextInput
            id={"url"}
            label={"URL"}
            value={data.url}
            onChange={(e) => handleChange(e, data.id, "url")}
          ></TextInput>
          <AddButton onClick={() => addRow(index)}></AddButton>
          {targetData.length > 1 && <RemoveButton onClick={() => removeRow(data.id)}></RemoveButton>}
        </Stack>
      ))}
    </Box>
  );
};

export default Targets;
