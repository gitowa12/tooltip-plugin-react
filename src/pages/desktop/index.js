import pdfIcon_BASE64 from "../../images/pdf-icon.js";

// console.log(pdfIcon_BASE64);
jQuery.noConflict();

(function ($, PLUGIN_ID) {
  "use strict";

  const CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID);

  const mainFields = Object.values(
    cybozu.data.page.FORM_DATA.schema.table.fieldList
  );
  const subTables = Object.values(cybozu.data.page.FORM_DATA.schema.subTable);
  // console.log("mainFields", mainFields);
  // console.log("subTables", subTables);

  function tooltip(field_id, message, display, subWindowId, url) {
    //フィールド名とサブテーブル名とスペースフィールドの要素を取得
    const parentElement =
      document.querySelector(`.label-${field_id}`) ||
      document.querySelector(`.subtable-row-label-${field_id}`) ||
      kintone.app.record.getSpaceElement(field_id);

    // console.log(parentElement);
    if (display === "tooltip") {
      //ツールチップ要素を作成
      const obj = document.createElement("div");
      obj.innerHTML = "?";
      obj.dataset.tooltip = message;
      obj.className = "help-tooltip";
      //要素の配置
      parentElement.appendChild(obj);

      //ツールチップの表示・非表示の切り替え
      let isTooltipVisible = false;
      obj.onclick = function () {
        let tooltips = $(this).find(".tooltips");
        if (isTooltipVisible) {
          tooltips.remove();
        } else {
          const text = $(this).attr("data-tooltip");
          tooltips = $('<div class="tooltips">' + text + "</div>");
          $(this).append(tooltips);
        }
        isTooltipVisible = !isTooltipVisible;
      };
    } else if (display === "alert") {
      //ツールチップの要素を作成
      const obj = document.createElement("div");
      obj.innerHTML = "?";
      obj.dataset.tooltip = message;
      obj.className = "help-alert";
      parentElement.appendChild(obj);

      obj.onclick = function () {
        swal({
          title: "インフォメーション",
          text: message,
          icon: "info",
        });
      };
    } else if (display === "subWindow") {
      //ツールチップの要素を作成
      const obj = document.createElement("div");
      obj.innerHTML = "?";
      obj.dataset.tooltip = message;
      obj.className = "help-subWindow";
      parentElement.appendChild(obj);

      obj.onclick = () => {
        openSubWindow(subWindowId, url);
      };
    } else if (display === "link") {
      //ツールチップ要素の作成
      const linkContainer = document.createElement("div");
      linkContainer.className = "link-container";

      const obj = document.createElement("div");
      obj.innerText = message;
      obj.className = "help-link";

      const pdfIcon = document.createElement("img");
      pdfIcon.className = "link-icon";

      pdfIcon.src = pdfIcon_BASE64;
      // pdfIcon.src =
      //   "https://www.adobe.com/content/dam/cc/en/legal/images/badges/PDF_24.png";

      linkContainer.appendChild(obj);
      linkContainer.appendChild(pdfIcon);
      parentElement.appendChild(linkContainer);

      linkContainer.onclick = () => {
        openSubWindow(subWindowId, url);
      };
    } else if (display === "button") {
      //ツールチップ要素の作成
      const obj = document.createElement("div");
      obj.innerText = message;
      obj.className = "help-button";

      parentElement.appendChild(obj);
      obj.onclick = () => {
        openSubWindow(subWindowId, url);
      };
    }
  }

  function deleteTooltips() {
    const tooltipElements = document.querySelectorAll(
      ".help-tooltip, .help-alert, .help-subWindow, .link-container"
    );
    tooltipElements.forEach((el) => {
      el.remove();
    });
  }

  // let subWindow = ""; //サブウィンドウの開閉を追跡する変数
  function openSubWindow(subWindowId, url) {
    // //既にサブウィンドウを開いていたら、閉じる
    // if (subWindow) {
    //   console.log("subWindow", subWindow);
    //   subWindow.close();
    // }

    // サブウィンドウの横幅を画面の1/3に設定
    // const windowWidth = window.outerWidth / 3;
    // const windowHeight = window.outerHeight; // 現在のウィンドウの高さをそのまま使用

    const windowWidth = window.screen.width / 3; //モニターサイズの横ピクセル1/3
    const windowHeight = windowWidth * 1.1414; // A4比の立幅を計算

    const subTop = screenY + (window.outerHeight - windowHeight) / 2;
    const subLeft = screenX + window.outerWidth * 0.8; //画面左
    const subWindow = window.open(
      url,
      subWindowId,
      `width = ${windowWidth}, height = ${windowHeight}, top = ${subTop}, left = ${subLeft}, toolbar = yes, resizable = yes, scrollbar = yes`
    );

    // console.log("subWindow", subWindow);
    //画面リロードのタイミングでサブウィンドウが開いていれば、サブウィンドウ閉じる
    window.addEventListener("beforeunload", () => {
      if (subWindow) {
        subWindow.close();
      }
    });
  }

  //条件元となるフィールドをプラグイン設定から取得して、イベント配列を生成
  let conditionAllay = new Set();
  Object.keys(CONFIG).forEach((key) => {
    const obj = JSON.parse(CONFIG[key]);
    const conditionData = obj.conditionData || [];
    conditionData.forEach((data) => {
      conditionAllay.add(data.fieldName.fieldCode);
    });
  });
  // console.log("conditionAllay", conditionAllay);

  const changeEvents = [];
  conditionAllay.forEach((el) => {
    changeEvents.push(`app.record.create.change.${el}`);
    changeEvents.push(`app.record.edit.change.${el}`);
  });

  kintone.events.on(
    [
      "app.record.detail.show",
      "app.record.create.show",
      "app.record.edit.show",
      changeEvents,
    ],
    (e) => {
      deleteTooltips();
      const record = e.record;

      // console.log(record);
      if (CONFIG) {
        if (Object.keys(CONFIG).length) {
          Object.keys(CONFIG).forEach((key) => {
            const obj = JSON.parse(CONFIG[key]);
            // console.log(obj);
            const conditionData = obj.conditionData;
            const conditionSwitch = obj.conditionSwitch;
            const targetData = obj.targetData;
            // console.log("conditionData", conditionData);

            let conditionBoolean = true;
            if (conditionData[0].fieldName.fieldCode !== "default") {
              if (conditionSwitch === "and") {
                conditionData.forEach((data) => {
                  const fieldCode = data.fieldName.fieldCode;
                  // console.log("AND", record[fieldCode].value);
                  if (record[fieldCode].value !== data.fieldValue) {
                    conditionBoolean = false;
                  }
                });
              } else if (conditionSwitch === "or") {
                for (let i = 0; i < conditionData.length; i++) {
                  const fieldCode = conditionData[i].fieldName.fieldCode;
                  // console.log("OR", record[fieldCode].value);
                  if (record[fieldCode].value === conditionData[i].fieldValue) {
                    conditionBoolean = true;
                    break;
                  } else {
                    conditionBoolean = false;
                  }
                }
              }
            }

            if (conditionBoolean) {
              // console.log("targetData", targetData);
              targetData.forEach((data) => {
                if (data.fieldName.fieldId === "default") {
                  return;
                }
                const field_id = data.fieldName.fieldId;
                const message = data.message;
                const display = data.display;
                const subWindowId = data.subWindowId;
                const url = data.url;
                tooltip(field_id, message, display, subWindowId, url);
              });
            }
          });
        }
      }
      return e;
    }
  );
})(jQuery, kintone.$PLUGIN_ID);
