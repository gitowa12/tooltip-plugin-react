import generateUniqueId from "../utils/UnipueId";

const GetKintoneFields = () => {
  const mainFields = Object.values(cybozu.data.page.FORM_DATA.schema.table.fieldList);
  const subTables = Object.values(cybozu.data.page.FORM_DATA.schema.subTable);
  console.log("mainFields", mainFields);
  console.log("subTables", subTables);

  //スペースフィールドのフィールドコードを取得
  const layoutAllay = JSON.parse(cybozu.data.page.FORM_DATA.layout);
  console.log("layoutAllay", layoutAllay);
  const spaceFields = [];
  layoutAllay.forEach((el) => {
    el.controlList.forEach((el) => {
      if (el.type === "SPACER" && el.elementId !== "") {
        spaceFields.push({ id: el.elementId });
      }
    });
  });
  console.log("spaceFields", spaceFields);

  const conbinedData = [...mainFields, ...subTables, ...spaceFields];
  const fieldsData = [];
  fieldsData.push({
    fieldId: "",
    fieldCode: "",
    label: "",
  });
  conbinedData.forEach((data) => {
    if (data.label !== undefined) {
      fieldsData.push({
        fieldId: data.id,
        fieldCode: data.var,
        label: `${data.label} (${data.var})`,
      });
    } else {
      fieldsData.push({
        fieldIdd: data.id,
        fieldCode: data.var,
        label: `スペース(${data.id}) `,
      });
    }
  });
  return fieldsData;
};

export default GetKintoneFields;
