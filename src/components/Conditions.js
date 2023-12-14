import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, IconButton, Stack } from "@mui/material";
import generateUniqueId from "../utility/UnipueId";

import { Add, Remove } from "@mui/icons-material";

const Conditions = ({ config, parentId, updateTableData }) => {
  const [conditionData, setConditionData] = useState([
    {
      id: generateUniqueId(),
      fieldName: "",
      filedValue: "",
    },
  ]);
  // console.log(Object.values(config));

  useEffect(() => {
    console.log(conditionData);
    updateTableData(parentId, conditionData);
  }, [conditionData]);

  const addRow = (index) => {
    const newRow = {
      id: generateUniqueId(),
      fieldName: "",
      filedValue: "",
    };

    // 状態を更新して新しい行を追加
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

  const handleTextChange = (e, stackId) => {
    // 新しい値を取得
    const newValue = e.target.value;

    // 状態を更新
    setConditionData((prevConditionData) => {
      return prevConditionData.map((data) => {
        if (data.id === stackId) {
          if (e.target.id === "field-name") {
            return { ...data, fieldName: newValue };
          } else if (e.target.id === "field-value") {
            return { ...data, filedValue: newValue };
          }
        }
        return data;
      });
    });
  };

  return (
    <Box
      component="form"
      sx={{
        width: 600,
        boxShadow: 2,
        borderRadius: 0,
        padding: 1,
      }}
      noValidate
      autoComplete="off"
    >
      {conditionData.map((data, index) => (
        <Stack key={data.id} direction="row" alignItems="center">
          <TextField
            sx={{
              width: 240,
              padding: 1,
            }}
            id="field-name"
            label="フィールド名"
            size="small"
            defaultValue={data.fieldName}
            onChange={(e) => handleTextChange(e, data.id)}
          />
          <TextField
            sx={{
              width: 240,
              padding: 1,
            }}
            id="field-value"
            label="値"
            size="small"
            defaultValue={data.filedValue}
            onChange={(e) => handleTextChange(e, data.id)}
          />
          <IconButton aria-label="delete" fontSize="small" color="primary" onClick={() => addRow(index)}>
            <Add />
          </IconButton>
          <IconButton aria-label="delete" fontSize="small" color="secondary" onClick={() => removeRow(data.id)}>
            <Remove />
          </IconButton>
        </Stack>
      ))}
    </Box>
  );
};

export default Conditions;
