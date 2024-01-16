import React, { memo, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton, Stack } from "@mui/material";
import generateUniqueId from "../../utils/UnipueId";
import { Add, AddCircle, Remove, RemoveCircle } from "@mui/icons-material";
import AddButton from "../common/AddButton";
import RemoveButton from "../common/RemoveButton";
import GetKintoneFields from "../../services/GetKintoneData";
import AutoComplete from "../common/AutoComplete";
import Input from "../common/Input";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/joy";
import RadioButton from "../common/RadioButton";

const Conditions = memo(({ parentId, updateTableData, beforeData }) => {
  const fieldsData = GetKintoneFields();

  const createRow = () => {
    const obj = {
      id: generateUniqueId(),
      fieldName: {
        fieldId: "defaultValue",
        fieldCode: "defaultValue",
        label: "",
      },
      fieldValue: "",
    };
    return obj;
  };

  const [conditionData, setConditionData] = useState(
    beforeData || [createRow()]
  );

  useEffect(() => {
    // console.log(conditionData);
    updateTableData(parentId, conditionData);
  }, [conditionData]);

  const addRow = (index) => {
    const newRow = createRow();
    setConditionData((prevConditionData) => {
      const newData = [...prevConditionData];
      newData.splice(index + 1, 0, newRow);
      return newData;
    });
  };

  const removeRow = (idToRemove) => {
    const updatedData = conditionData.filter((row) => row.id !== idToRemove);
    setConditionData(updatedData);
  };

  const handleTextChange = useCallback((e, stackId) => {
    // 新しい値を取得
    const newValue = e.target.value;

    // 状態を更新
    setConditionData((prevConditionData) => {
      return prevConditionData.map((data) => {
        if (data.id === stackId) {
          if (e.target.id === "field-name") {
            return { ...data, fieldName: newValue };
          } else if (e.target.id === "field-value") {
            return { ...data, fieldValue: newValue };
          }
        }
        return data;
      });
    });
  }, []);

  const selectChange = useCallback((newValue, stackId) => {
    // 新しい値を取得
    // console.log("selectChange", newValue);
    // 状態を更新
    setConditionData((prevTargetData) => {
      return prevTargetData.map((data) => {
        if (data.id === stackId) {
          return { ...data, fieldName: newValue };
        }
        return data;
      });
    });
  }, []);

  return (
    <Box
      component="form"
      sx={{
        width: "fit-content",
        minWidth: "583px",
        boxShadow: 2,
        borderRadius: 0,
        padding: 1,
      }}
      noValidate
      autoComplete="off"
    >
      {conditionData.map((data, index) => (
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
            placeholder={"常に表示"}
          ></AutoComplete>
          <Input
            id="field-value"
            label="値"
            size="small"
            value={data.fieldValue}
            onChange={(e) => handleTextChange(e, data.id)}
          ></Input>
          <Stack direction="row" alignItems="center">
            <AddButton onClick={() => addRow(index)}></AddButton>
            {conditionData.length > 1 && (
              <RemoveButton onClick={() => removeRow(data.id)}></RemoveButton>
            )}
          </Stack>
        </Stack>
      ))}
    </Box>
  );
});

export default Conditions;
