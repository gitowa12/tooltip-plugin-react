import generateUniqueId from "../utils/UnipueId";

const GetKintoneFields = () => {
  //フィールドとテーブルのデータを取得
  const mainFields = Object.values(
    cybozu.data.page.FORM_DATA.schema.table.fieldList
  );
  const subTables = Object.values(cybozu.data.page.FORM_DATA.schema.subTable);
  // console.log("mainFields", mainFields);
  // console.log("subTables", subTables);

  //スペースフィールドのフィールドコードを取得
  const layoutAllay = JSON.parse(cybozu.data.page.FORM_DATA.layout);
  // console.log("layoutAllay", layoutAllay);
  const spaceFields = [];
  layoutAllay.forEach((el) => {
    el.controlList.forEach((el) => {
      if (el.type === "SPACER" && el.elementId !== "") {
        spaceFields.push({ id: el.elementId });
      }
    });
  });
  // console.log("spaceFields", spaceFields);

  //セレクトボックスのリスト用に整形する
  const conbinedData = [...mainFields, ...subTables, ...spaceFields];
  // //初期値の追加
  const fieldsData = [];
  // fieldsData.push({
  //   fieldId: "defaultValue",
  //   fieldCode: "defaultValue",
  //   label: "",
  // });
  //通常のフィールドとスペースフィールドでデータが異なるため、処理を振り分ける
  conbinedData.forEach((data) => {
    if (data.label !== undefined) {
      fieldsData.push({
        fieldId: data.id,
        fieldCode: data.var,
        label: `${data.label} (${data.var})`,
      });
    } else {
      fieldsData.push({
        fieldId: data.id,
        fieldCode: data.var,
        label: `スペース(${data.id}) `,
      });
    }
  });
  return fieldsData;
};

export default GetKintoneFields;
