/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/desktop/index.js":
/*!************************************!*\
  !*** ./src/pages/desktop/index.js ***!
  \************************************/
/***/ (() => {

eval("jQuery.noConflict();\n(function ($, PLUGIN_ID) {\n  \"use strict\";\n\n  var CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID);\n  var mainFields = Object.values(cybozu.data.page.FORM_DATA.schema.table.fieldList);\n  var subTables = Object.values(cybozu.data.page.FORM_DATA.schema.subTable);\n  console.log(\"mainFields\", mainFields);\n  console.log(\"subTables\", subTables);\n  function tooltip(field_id, message, display, url) {\n    //フィールド名とサブテーブル名とスペースフィールドの要素を取得\n    var parentElement = document.querySelector(\".label-\".concat(field_id)) || document.querySelector(\".subtable-row-label-\".concat(field_id)) || kintone.app.record.getSpaceElement(field_id);\n    console.log(parentElement);\n    if (display === \"tooltip\") {\n      //ツールチップ要素を作成\n      var obj = document.createElement(\"div\");\n      obj.innerHTML = \"?\";\n      obj.dataset.tooltip = message;\n      obj.className = \"help-tooltip\";\n      //要素の配置\n      parentElement.appendChild(obj);\n\n      //ツールチップの表示・非表示の切り替え\n      var isTooltipVisible = false;\n      obj.onclick = function () {\n        var tooltips = $(this).find(\".tooltips\");\n        if (isTooltipVisible) {\n          tooltips.remove();\n        } else {\n          var text = $(this).attr(\"data-tooltip\");\n          tooltips = $('<div class=\"tooltips\">' + text + \"</div>\");\n          $(this).append(tooltips);\n        }\n        isTooltipVisible = !isTooltipVisible;\n      };\n    } else if (display === \"alert\") {\n      //ツールチップの要素を作成\n      var _obj = document.createElement(\"div\");\n      _obj.innerHTML = \"?\";\n      _obj.dataset.tooltip = message;\n      _obj.className = \"help-alert\";\n      parentElement.appendChild(_obj);\n      _obj.onclick = function () {\n        swal({\n          title: \"インフォメーション\",\n          text: message,\n          icon: \"info\"\n        });\n      };\n    } else if (display === \"subWindow\") {\n      //ツールチップの要素を作成\n      var _obj2 = document.createElement(\"div\");\n      _obj2.innerHTML = \"?\";\n      _obj2.dataset.tooltip = message;\n      _obj2.className = \"help-subWindow\";\n      parentElement.appendChild(_obj2);\n      _obj2.onclick = function () {\n        openSubWindow(url, 600, 500);\n      };\n    } else if (display === \"link\") {\n      //ツールチップ要素の作成\n      var container = document.createElement(\"div\");\n      container.style.display = \"flex\";\n      container.style.alignItems = \"center\";\n      var _obj3 = document.createElement(\"div\");\n      _obj3.innerText = message;\n      _obj3.className = \"help-link\";\n      _obj3.style.display = \"inline-block\";\n      _obj3.style.color = \"red\";\n      _obj3.style.textDecoration = \"underline\";\n      _obj3.style.cursor = \"pointer\";\n      var icon = document.createElement(\"img\");\n      icon.src = \"https://www.adobe.com/content/dam/cc/en/legal/images/badges/PDF_24.png\";\n      icon.style.width = \"21px\";\n      container.appendChild(_obj3);\n      container.appendChild(icon);\n      parentElement.appendChild(container);\n      container.onclick = function () {\n        openSubWindow(url, 600, 500);\n      };\n    } else if (display === \"button\") {\n      //ツールチップ要素の作成\n      var _obj4 = document.createElement(\"div\");\n      _obj4.innerText = message;\n      _obj4.className = \"help-button\";\n      parentElement.appendChild(_obj4);\n      _obj4.onclick = function () {\n        openSubWindow(url, 600, 500);\n      };\n    }\n  }\n  function deleteTooltips() {\n    var tooltipElements = document.querySelectorAll(\".help-tooltip, .help-alert, .help-subWindow, .help-link\");\n    tooltipElements.forEach(function (el) {\n      el.remove();\n    });\n  }\n\n  //サブウィンドウが開閉を追跡する変数\n  var subWindow = \"\";\n  function openSubWindow(url, windowHeight, windowWidth) {\n    //既にサブウィンドウを開いていたら、閉じる\n    if (subWindow) {\n      subWindow.close();\n    }\n    var subTop = screenY + (window.outerHeight - windowHeight) / 2;\n    var subLeft = screenX + window.outerWidth / 1.2; //画面左\n    subWindow = window.open(url, \"url\", \"width = \".concat(windowWidth, \", height = \").concat(windowHeight, \", top = \").concat(subTop, \", left = \").concat(subLeft, \", toolbar = yes, resizable = yes, scrollbar = yes\"));\n\n    //画面リロードのタイミングでサブウィンドウが開いていれば、サブウィンドウ閉じる\n    window.addEventListener(\"beforeunload\", function () {\n      if (subWindow) {\n        subWindow.close();\n      }\n    });\n  }\n\n  //条件元となるフィールドをプラグイン設定から取得して、イベント配列を生成\n  var conditionAllay = new Set();\n  Object.keys(CONFIG).forEach(function (key) {\n    var obj = JSON.parse(CONFIG[key]);\n    var conditionData = obj.conditionData || [];\n    conditionData.forEach(function (data) {\n      conditionAllay.add(data.fieldName.fieldCode);\n    });\n  });\n  console.log(\"conditionAllay\", conditionAllay);\n  var changeEvents = [];\n  conditionAllay.forEach(function (el) {\n    changeEvents.push(\"app.record.create.change.\".concat(el));\n    changeEvents.push(\"app.record.edit.change.\".concat(el));\n  });\n  kintone.events.on([\"app.record.detail.show\", \"app.record.create.show\", \"app.record.edit.show\", changeEvents], function (e) {\n    deleteTooltips();\n    var record = e.record;\n\n    // console.log(record);\n    if (CONFIG) {\n      if (Object.keys(CONFIG).length) {\n        Object.keys(CONFIG).forEach(function (key) {\n          var obj = JSON.parse(CONFIG[key]);\n          console.log(obj);\n          var conditionData = obj.conditionData;\n          console.log(conditionData);\n          var conditionBoolean = true;\n          conditionData.forEach(function (data) {\n            var fieldCode = data.fieldName.fieldCode;\n            if (fieldCode !== \"\") {\n              console.log(record[fieldCode].value);\n              if (record[fieldCode].value !== data.fieldValue) {\n                conditionBoolean = false;\n              }\n            }\n          });\n          if (conditionBoolean) {\n            var targetData = obj.targetData;\n            targetData.forEach(function (data) {\n              var field_id = data.fieldName.fieldId;\n              var message = data.message;\n              var display = data.display;\n              var url = data.url;\n              tooltip(field_id, message, display, url);\n            });\n          }\n        });\n      }\n    }\n    return e;\n  });\n})(jQuery, kintone.$PLUGIN_ID);\n\n//# sourceURL=webpack://react/./src/pages/desktop/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/pages/desktop/index.js"]();
/******/ 	
/******/ })()
;