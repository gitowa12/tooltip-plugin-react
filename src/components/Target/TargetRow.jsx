import { Stack } from "@mui/material";
import React, { useCallback, useState } from "react";
import AutoComplete from "../common/AutoComplete";
import SelectBox from "../common/SelectBox";
import TextArea from "../common/TextArea";
import AddButton from "../common/AddButton";
import RemoveButton from "../common/RemoveButton";
import GetConfig from "../../services/GetConfig";
import generateUniqueId from "../../utils/UnipueId";
import GetKintoneFields from "../../services/GetKintoneData";

const TargetRow = ({ rowId, dataId, index }) => {
  // const dataId = generateUniqueId();
  const beforeConfig = GetConfig(rowId, dataId, "targetData");
  console.log("beforeConfig", beforeConfig);
  const fieldsData = useCallback(GetKintoneFields(), []);

  const createData = () => {
    const obj = {
      rowId: rowId,
      index: index,
      dataId: dataId,
      fieldName: {
        fieldId: "",
        fieldCode: "",
        label: "",
      },
      display: "tooltip",
      message: "",
      url: "",
    };
    return obj;
  };

  const [data, setData] = useState(beforeConfig !== undefined || createData());
  // console.log(data);

  const handleChange = useCallback((e) => {
    // 新しい値を取得
    const newValue = e.target.value;
    // 状態を更新
    setData((prevData) => ({
      ...prevData,
      [e.target.id]: newValue,
    }));
  }, []);

  const selectChange = useCallback((newValue) => {
    // 状態を更新
    setData((prevData) => ({
      ...prevData,
      fieldName: newValue,
    }));
  }, []);

  return (
    <Stack
      key={dataId}
      dataId={dataId}
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
        // parentId={parentId}
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
        label={"URL"}
        value={data.url}
        onChange={(e) => handleChange(e, data.id)}
      ></TextArea>
    </Stack>
  );
};

export default TargetRow;
