import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import generateUniqueId from "../../utility/UnipueId";
import { Add, AddCircle, Remove, RemoveCircle } from "@mui/icons-material";
import DisplaySelect from "./DisplaySelect";
import FieldSelect from "./FieldSelect";
import MessageInput from "./MessageInput";
import UrlInput from "./UrlInput";

console.log(kintone.$PLUGIN_ID);
const PLUGIN_ID = kintone.$PLUGIN_ID;

const Targets = ({ parentId, updateTableData, beforeData }) => {
  // const PLUGIN_ID = "mofcheiabnjlbmjpieaiobdmgnpdngck";
  const getConfig = kintone.plugin.app.getConfig(PLUGIN_ID);
  console.log(getConfig);

  // const configKeys = Object.keys(getConfig);
  // console.log(configKeys);

  // let config = [];
  // configKeys.forEach((key) => {
  //   config[key] = JSON.parse(getConfig[key]);
  // });
  // console.log(config);

  // config = Object.values(config);
  // console.log(config);

  const initData = [
    {
      id: generateUniqueId(),
      fieldName: "",
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
      fieldName: "",
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
          if (type === "field-name") {
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
          <FieldSelect handleChange={handleChange} stackId={data.id} value={data.fieldName}></FieldSelect>
          <DisplaySelect handleChange={handleChange} stackId={data.id} value={data.display}></DisplaySelect>
          <MessageInput handleChange={handleChange} stackId={data.id} value={data.message}></MessageInput>
          <UrlInput handleChange={handleChange} stackId={data.id} value={data.url}></UrlInput>
          <IconButton
            sx={{ paddingRight: 1 }}
            aria-label="add"
            fontSize="small"
            color="primary"
            onClick={() => addRow(index)}
          >
            <AddCircle fontSize="inherit" />
          </IconButton>
          <IconButton
            sx={{ padding: 0 }}
            aria-label="delete"
            fontSize="small"
            color="secondary"
            onClick={() => removeRow(data.id)}
          >
            <RemoveCircle fontSize="inherit" />
          </IconButton>
        </Stack>
      ))}
    </Box>
  );
};

export default Targets;
