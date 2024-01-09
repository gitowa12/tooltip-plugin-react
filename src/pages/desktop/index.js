jQuery.noConflict();
(function ($, PLUGIN_ID) {
  "use strict";

  const CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID);

  const mainFields = Object.values(cybozu.data.page.FORM_DATA.schema.table.fieldList);
  const subTables = Object.values(cybozu.data.page.FORM_DATA.schema.subTable);
  console.log("mainFields", mainFields);
  console.log("subTables", subTables);

  function tooltip(field_id, message, display, url) {
    //フィールド名とサブテーブル名とスペースフィールドの要素を取得
    const parentElement =
      document.querySelector(`.label-${field_id}`) ||
      document.querySelector(`.subtable-row-label-${field_id}`) ||
      kintone.app.record.getSpaceElement(field_id);

    console.log(parentElement);
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
        openSubWindow(url, 600, 500);
      };
    } else if (display === "link") {
      //ツールチップ要素の作成
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.alignItems = "center";

      const obj = document.createElement("div");
      obj.innerText = message;
      obj.className = "help-link";
      obj.style.display = "inline-block";
      obj.style.color = "red";
      obj.style.textDecoration = "underline";
      obj.style.cursor = "pointer";

      const icon = document.createElement("img");
      icon.src = "https://www.adobe.com/content/dam/cc/en/legal/images/badges/PDF_24.png";
      icon.style.width = "21px";

      container.appendChild(obj);
      container.appendChild(icon);
      parentElement.appendChild(container);

      container.onclick = () => {
        openSubWindow(url, 600, 500);
      };
    } else if (display === "button") {
      //ツールチップ要素の作成
      const obj = document.createElement("div");
      obj.innerText = message;
      obj.className = "help-button";

      parentElement.appendChild(obj);
      obj.onclick = () => {
        openSubWindow(url, 600, 500);
      };
    }
  }

  function deleteTooltips() {
    const tooltipElements = document.querySelectorAll(
      ".help-tooltip, .help-alert, .help-subWindow, .help-link"
    );
    tooltipElements.forEach((el) => {
      el.remove();
    });
  }

  //サブウィンドウが開閉を追跡する変数
  let subWindow = "";
  function openSubWindow(url, windowHeight, windowWidth) {
    //既にサブウィンドウを開いていたら、閉じる
    if (subWindow) {
      subWindow.close();
    }

    const subTop = screenY + (window.outerHeight - windowHeight) / 2;
    const subLeft = screenX + window.outerWidth / 1.2; //画面左
    subWindow = window.open(
      url,
      "url",
      `width = ${windowWidth}, height = ${windowHeight}, top = ${subTop}, left = ${subLeft}, toolbar = yes, resizable = yes, scrollbar = yes`
    );

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
  console.log("conditionAllay", conditionAllay);

  const changeEvents = [];
  conditionAllay.forEach((el) => {
    changeEvents.push(`app.record.create.change.${el}`);
    changeEvents.push(`app.record.edit.change.${el}`);
  });

  kintone.events.on(
    ["app.record.detail.show", "app.record.create.show", "app.record.edit.show", changeEvents],
    (e) => {
      deleteTooltips();
      const record = e.record;

      // console.log(record);
      if (CONFIG) {
        if (Object.keys(CONFIG).length) {
          Object.keys(CONFIG).forEach((key) => {
            const obj = JSON.parse(CONFIG[key]);
            console.log(obj);
            const conditionData = obj.conditionData;
            const conditionSwitch = obj.conditionSwitch;
            console.log(conditionData);

            let conditionBoolean = true;
            if (conditionSwitch === "and") {
              conditionData.forEach((data) => {
                const fieldCode = data.fieldName.fieldCode;
                if (fieldCode !== "") {
                  console.log(record[fieldCode].value);
                  if (record[fieldCode].value !== data.fieldValue) {
                    conditionBoolean = false;
                    console.log("and条件でfalseにしたよ");
                  }
                }
              });
            }
            if (conditionSwitch === "or") {
              for (let i = 0; i < conditionData.length; i++) {
                const fieldCode = conditionData[i].fieldName.fieldCode;
                if (fieldCode !== "") {
                  console.log(record[fieldCode].value);
                  if (record[fieldCode].value === conditionData[i].fieldValue) {
                    conditionBoolean = true;
                    console.log("or条件でtrueにしたよ");
                    break;
                  } else {
                    conditionBoolean = false;
                    console.log("or条件でfalseにしたよ");
                  }
                }
              }
            }

            if (conditionBoolean) {
              const targetData = obj.targetData;
              console.log(targetData);
              targetData.forEach((data) => {
                const field_id = data.fieldName.fieldId;
                const message = data.message;
                const display = data.display;
                const url = data.url;
                tooltip(field_id, message, display, url);
              });
            }
          });
        }
      }
      return e;
    }
  );
})(jQuery, kintone.$PLUGIN_ID);
