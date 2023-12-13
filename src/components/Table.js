import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import generateUniqueId from "../utility/UnipueId";
import Conditions from "./Conditions";

const TableComponent = ({ config }) => {
  // テーブルのデータを管理する状態
  // console.log("config", config);
  // console.log(Object.values(config));

  const [tableData, setTableData] = useState(Object.values(config));

  useEffect(() => {
    console.log(tableData);
  }, [tableData]);

  // 新しい行を追加する関数
  const addRow = () => {
    const newRow = {
      rowNum: `${tableData.length}`,
      id: generateUniqueId(), // 新しい行のIDを生成
      name: `Row ${tableData.length + 1}`, // 新しい行の名前を生成
      conditionData: "",
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
  const updateTableData = (parentId, newData) => {
    // 既存のテーブルデータをコピーして変更
    const updatedTableData = tableData.map((row) => {
      if (row.id === parentId) {
        return { ...row, conditionData: newData };
      }
      return row;
    });

    // 更新されたデータをセット
    setTableData(updatedTableData);
  };

  return (
    <>
      {/* ボタンをクリックしたときに新しい行を追加 */}
      <Button variant="contained" onClick={addRow}>
        追加
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>条件</TableCell>
              <TableCell>name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data) => (
              <TableRow key={data.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {data.id}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: 2 }}>
                  <Conditions parentId={data.id} updateTableData={updateTableData} />
                </TableCell>
                <TableCell>
                  <input value={data.name} onChange={(e) => handleInputChange(e, data.id)} />
                </TableCell>
                <TableCell>
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
      <Button variant="contained">キャンセル</Button>
    </>
  );
};

export default TableComponent;
