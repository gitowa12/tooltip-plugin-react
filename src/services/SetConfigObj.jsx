import React, { useState, useEffect } from "react";

const SetConfigObj = ({ obj = [], label = "" }) => {
  const [configObj, setConfigObj] = useState(null);
  const [orderAllay, setOrderAllay] = useState([]);
  const [dataAllay, setDataAllay] = useState([]);

  useEffect(() => {
    if (label === "targetData") {
      setOrderAllay(obj);
    }
    if (label === "targetRow") {
      setDataAllay(obj);
    }
  }, [label, obj]);

  useEffect(() => {
    if (orderAllay.length > 0 && dataAllay.length > 0) {
      // 共通のキーで紐づけて新しい配列を生成
      const newArray = orderAllay.map((orderItem) => {
        const matchingItem = dataAllay.find((dataItem) => dataItem.dataId === orderItem.dataId);

        if (matchingItem) {
          return { ...orderItem, ...matchingItem };
        }
        return orderItem; // マッチングしなかった場合は元のオブジェクトを返す
      });

      setConfigObj(newArray);
      console.log(newArray);
    }
  }, [orderAllay, dataAllay]);

  return null; // 何かを返す必要がある場合は変更してください
};

export default SetConfigObj;
