import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Stack, createFilterOptions } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import generateUniqueId from "../utils/UnipueId";
import Conditions from "./Condition/Conditions";
import Targets from "./Target/Targets";
import RadioButton from "./common/RadioButton";

const ConfigTable = ({ beforeConfig }) => {
  // テーブルのデータを管理する状態
  // console.log("config", config);
  // console.log(Object.values(config));

  const [tableData, setTableData] = useState(beforeConfig);

  // useEffect(() => {
  //   console.log("tableData", tableData);
  // }, [tableData]);

  // 新しい行を追加する関数
  const addRow = () => {
    const newRow = {
      id: generateUniqueId(), // 新しい行のIDを生成
      conditionData: [
        {
          id: generateUniqueId(),
          fieldName: {
            fieldId: "defaultValue",
            fieldCode: "defaultValue",
            label: "",
          },
          fieldValue: "",
        },
      ],
      conditionSwitch: "and",
      targetData: [
        {
          id: generateUniqueId(),
          fieldName: {
            fieldId: "defaultValue",
            fieldCode: "defaultValue",
            label: "",
          },
          display: "tooltip",
          message: "",
          url: "",
        },
      ],
    };
    setTableData([...tableData, newRow]);
  };

  const removeRow = (idToRemove) => {
    const updatedTableData = tableData.filter((row) => row.id !== idToRemove);
    setTableData(updatedTableData);
  };

  const handleSave = () => {
    // 保存する設定情報を作成
    let config = {};
    tableData.forEach((el, index) => {
      config[`key-${index}`] = JSON.stringify(el);
    });
    // console.log(config);
    // kintoneの設定情報を保存するメソッドを呼び出す

    kintone.plugin.app.setConfig(config);
  };

  // //子コンポーネントに渡す
  // const updateTableData = useCallback(
  //   (parentId, newData, category) => {
  //     // 既存のテーブルデータをコピーして変更
  //     const updatedTableData = tableData.map((row) => {
  //       if (row.id === parentId) {
  //         if (category === "conditions") {
  //           return { ...row, conditionData: newData };
  //         }
  //         if (category === "conditionSwicth") {
  //           return { ...row, conditionSwitch: newData };
  //         }
  //         if (category === "targets") {
  //           return { ...row, targetData: newData };
  //         }
  //       }
  //       return row;
  //     });

  //     // 更新されたデータをセット
  //     setTableData(updatedTableData);
  //   },
  //   [tableData]
  // );

  const updateConditionData = (parentId, newData) => {
    // 既存のテーブルデータをコピーして変更
    const updatedTableData = tableData.map((row) => {
      if (row.id === parentId) {
        return { ...row, conditionData: newData };
      }
      return row;
    });
    console.log("updateConditionData", updatedTableData);
    setTableData(updatedTableData);
  };

  const updateConditionSwitchData = (parentId, newData) => {
    // 既存のテーブルデータをコピーして変更
    const updatedTableData = tableData.map((row) => {
      if (row.id === parentId) {
        return { ...row, conditionSwitch: newData };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  const updateTargetData = (parentId, newData) => {
    // 既存のテーブルデータをコピーして変更
    const updatedTableData = tableData.map((row) => {
      if (row.id === parentId) {
        return { ...row, targetData: newData };
      }
      return row;
    });
    console.log("updateTrgetsData", updatedTableData);
    setTableData(updatedTableData);
  };

  return (
    <>
      <Button variant="contained" onClick={() => addRow()} sx={{ m: 1 }}>
        行の追加
      </Button>
      <TableContainer
        component={Paper}
        sx={{ width: "fit-content", minWidth: "1895px" }}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>条件</TableCell>
              <TableCell>対象のフィールド</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell sx={{ verticalAlign: "top", padding: 2 }}>
                  <Conditions
                    parentId={data.id}
                    updateTableData={updateConditionData}
                    beforeData={data.conditionData}
                  />
                  <RadioButton
                    options={[
                      { value: "and", label: "すべての条件を満たす" },
                      { value: "or", label: "いずれかの条件を満たす" },
                    ]}
                    parentId={data.id}
                    onChange={updateConditionSwitchData}
                    beforeData={data.conditionSwitch}
                  ></RadioButton>
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", padding: 2 }}>
                  <Targets
                    parentId={data.id}
                    updateTableData={updateTargetData}
                    beforeData={data.targetData}
                  />
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", padding: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => removeRow(data.id)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        sx={{ m: 1 }}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ width: "110px" }}
        >
          保存
        </Button>
        <Button
          variant="outlined"
          onClick={() => history.back()}
          sx={{ width: "110px" }}
        >
          キャンセル
        </Button>
      </Stack>
    </>
  );
};

export default ConfigTable;
