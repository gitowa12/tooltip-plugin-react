import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import generateUniqueId from "../utility/UnipueId";
import Conditions from "./Condition/Conditions";
import Targets from "./Target/Targets";

const TableComponent = ({ beforeConfig }) => {
  // テーブルのデータを管理する状態
  // console.log("config", config);
  // console.log(Object.values(config));

  const [tableData, setTableData] = useState(beforeConfig);

  useEffect(() => {
    console.log(tableData);
  }, [tableData]);

  // 新しい行を追加する関数
  const addRow = (index) => {
    const newRow = {
      id: generateUniqueId(), // 新しい行のIDを生成
      name: `Row ${tableData.length + 1}`, // 新しい行の名前を生成
      conditionData: [
        {
          id: generateUniqueId(),
          fieldName: "",
          filedValue: "",
        },
      ],
      targetData: [
        {
          id: generateUniqueId(),
          fieldName: "",
          display: "",
          massage: "",
          url: "",
        },
      ],
    };
    setTableData((prevTableData) => {
      const newData = [...prevTableData];
      newData.splice(index + 1, 0, newRow);
      return newData;
    });
    // setTableData([...tableData, newRow]);
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
    console.log(config);
    // kintoneの設定情報を保存するメソッドを呼び出す
    kintone.plugin.app.setConfig(config);
  };

  const handleInputChange = (e, id) => {
    // 新しい値を取得
    const newValue = e.target.value;
    // 状態を更新
    setTableData((prevTableData) => {
      return prevTableData.map((row) => {
        if (row.id === id) {
          return { ...row, name: newValue };
        }
        return row;
      });
    });
  };

  //子コンポーネントに渡す
  const updateTableData = (parentId, newData, category) => {
    // 既存のテーブルデータをコピーして変更
    const updatedTableData = tableData.map((row) => {
      if (row.id === parentId) {
        if (category === "conditions") {
          return { ...row, conditionData: newData };
        }
        if (category === "targets") {
          return { ...row, targetData: newData };
        }
      }
      return row;
    });

    // 更新されたデータをセット
    setTableData(updatedTableData);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>条件</TableCell>
              <TableCell>対象のフィールド</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell component="th" scope="row" sx={{ padding: 2 }}>
                  <Conditions
                    parentId={data.id}
                    updateTableData={updateTableData}
                    conditionConfig={data.conditionData}
                  />
                </TableCell>
                <TableCell>
                  <Targets parentId={data.id} updateTableData={updateTableData} beforeData={data.targetData} />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => addRow(index)}>
                    追加
                  </Button>
                  <Button variant="contained" onClick={() => removeRow(data.id)}>
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleSave}>
        保存
      </Button>
      <Button variant="contained" onClick={() => history.back()}>
        キャンセル
      </Button>
    </>
  );
};

export default TableComponent;
