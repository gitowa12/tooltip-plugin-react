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
import Conditions from "./Condition/Condition";
import Targets from "./Target/Target";
import RadioButton from "./common/RadioButton/RadioButton";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./ConfigTable.module.css";
import Swal from "sweetalert2";

const ConfigTable = ({ beforeConfig }) => {
  // テーブルのデータを管理する状態
  // console.log("config", config);
  // console.log(Object.values(config));

  //React-Hook-Form
  const methods = useForm({});
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const createRow = () => {
    const obj = {
      id: generateUniqueId(), // 新しい行のIDを生成
      conditionData: [
        {
          id: generateUniqueId(),
          fieldName: {
            fieldId: "default",
            fieldCode: "default",
            label: "常に表示",
          },
          fieldValue: "",
        },
      ],
      conditionSwitch: "and",
      targetData: [
        {
          id: generateUniqueId(),
          fieldName: {
            fieldId: "default",
            fieldCode: "default",
            label: "-----",
          },
          display: "tooltip",
          subWindowId: "1",
          message: "",
          url: "",
        },
      ],
    };
    return obj;
  };
  const [tableData, setTableData] = useState(beforeConfig || [createRow()]);
  // useEffect(() => {
  //   console.log("tableData", tableData);
  // }, [tableData]);

  const addRow = () => {
    const newRow = createRow();
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
      config[`key${index}`] = JSON.stringify(el);
    });

    // kintoneの設定情報を保存するメソッドを呼び出す
    kintone.plugin.app.setConfig(config);
    //検証用（前のページに自動で飛ばない）
    // kintone.plugin.app.setConfig(config, () => {
    //   console.log(config);
    // });
  };

  const updateConditionData = (parentId, newData) => {
    // 既存のテーブルデータをコピーして変更
    const updatedTableData = tableData.map((row) => {
      if (row.id === parentId) {
        return { ...row, conditionData: newData };
      }
      return row;
    });
    // console.log("updateConditionData", updatedTableData);
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
    // console.log("updateTrgetsData", updatedTableData);
    setTableData(updatedTableData);
  };

  const onError = (errors, e) => {
    Swal.fire({
      title: "保存失敗",
      text: "入力内容に不備があるため、設定を保存できません。\n入力内容を確認してください。",
      icon: "error",
      confirmButtonText: "了解",
      confirmButtonColor: "#1976d2",
      showClass: {
        icon: "", // アイコンの表示アニメーションクラスを空にする
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        // onSubmit={handleSubmit(handleSave)}
        sx={{
          width: "fit-content",
        }}
      >
        <Button
          variant="contained"
          onClick={() => addRow()}
          sx={{ m: 1, mt: 0 }}
        >
          行の追加
        </Button>
        <TableContainer
          component={Paper}
          sx={{
            width: "fit-content",
            border: 1,
            borderColor: "#e5eaf1",
          }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead sx={{ background: "#fdfdfe" }}>
              <TableRow>
                <TableCell>条件元フィールド</TableCell>
                <TableCell>対象とするフィールド</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell
                    sx={{
                      verticalAlign: "top",
                      padding: "12px",
                    }}
                  >
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
                  <TableCell sx={{ verticalAlign: "top", padding: "12px" }}>
                    <Targets
                      parentId={data.id}
                      updateTableData={updateTargetData}
                      beforeData={data.targetData}
                    />
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top", padding: "12px" }}>
                    <Button
                      variant="outlined"
                      color="error"
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
            type="button"
            onClick={handleSubmit(handleSave, onError)}
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
      </Box>
    </FormProvider>
  );
};

export default ConfigTable;
