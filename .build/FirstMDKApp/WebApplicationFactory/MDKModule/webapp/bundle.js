(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/Store_App/i18n/i18n.properties":
/*!**********************************************************!*\
  !*** ./build.definitions/Store_App/i18n/i18n.properties ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/Store_App/Rules/AppUpdateFailure.js":
/*!***************************************************************!*\
  !*** ./build.definitions/Store_App/Rules/AppUpdateFailure.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/Store_App/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/Store_App/Rules/AppUpdateSuccess.js":
/*!***************************************************************!*\
  !*** ./build.definitions/Store_App/Rules/AppUpdateSuccess.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/Store_App/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/Store_App/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/Store_App/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Store_App/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
  context.count('/Store_App/Services/com_sap_edm_sampleservice_v2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/Store_App/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/Store_App/Rules/OnWillUpdate.js":
/*!***********************************************************!*\
  !*** ./build.definitions/Store_App/Rules/OnWillUpdate.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/Store_App/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/Store_App/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/Store_App/Rules/ResetAppSettingsAndLogout.js":
/*!************************************************************************!*\
  !*** ./build.definitions/Store_App/Rules/ResetAppSettingsAndLogout.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/Store_App/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/Store_App/Styles/Styles.css":
/*!*******************************************************!*\
  !*** ./build.definitions/Store_App/Styles/Styles.css ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/Store_App/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Store_App/Styles/Styles.less":
/*!********************************************************!*\
  !*** ./build.definitions/Store_App/Styles/Styles.less ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/Store_App/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Store_App/Styles/Styles.nss":
/*!*******************************************************!*\
  !*** ./build.definitions/Store_App/Styles/Styles.nss ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/api.js":
/*!***********************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/api.js ***!
  \***********************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!******************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.8.0/node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \******************************************************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/Store_App/Pages/Customers/Customers_Detail.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/Customers/Customers_Detail.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customer Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{FirstName}","Subhead":"{City}","BodyText":"","Footnote":"{CustomerId}","Description":"{Country}","StatusText":"{DateOfBirth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{EmailAddress}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"City","Value":"{City}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"CustomerId","Value":"{CustomerId}"},{"KeyName":"DateOfBirth","Value":"{DateOfBirth}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"FirstName","Value":"{FirstName}"},{"KeyName":"HouseNumber","Value":"{HouseNumber}"},{"KeyName":"LastName","Value":"{LastName}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"PostalCode","Value":"{PostalCode}"},{"KeyName":"Street","Value":"{Street}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Address"},"KeyAndValues":[{"KeyName":"HouseNumber","Value":"{Address/HouseNumber}"},{"KeyName":"Street","Value":"{Address/Street}"},{"KeyName":"City","Value":"{Address/City}"},{"KeyName":"Country","Value":"{Address/Country}"},{"KeyName":"PostalCode","Value":"{Address/PostalCode}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValueAddress","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"SalesOrders"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}","OnPress":"/Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrders","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/Customers/Customers_List.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/Customers/Customers_List.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Customers","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Country}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Store_App/Actions/Customers/NavToCustomers_Detail.action","StatusImage":"","Title":"{FirstName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{DateOfBirth}","Subhead":"{City}","SubstatusText":"{EmailAddress}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Customers","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/ErrorArchive/ErrorArchive_List.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/Store_App/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/Main.page":
/*!*****************************************************!*\
  !*** ./build.definitions/Store_App/Pages/Main.page ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton2","Title":"Products","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","OnPress":"/Store_App/Actions/Products/NavToProducts_List.action"},{"_Name":"SectionButton9","Title":"Suppliers","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","OnPress":"/Store_App/Actions/Suppliers/NavToSuppliers_List.action"},{"_Name":"SectionButton0","Title":"Customers","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","OnPress":"/Store_App/Actions/Customers/NavToCustomers_List.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"LogoutToolbarItem","Caption":"Logout","Enabled":true,"Visible":true,"Clickable":true,"OnPress":"/Store_App/Actions/LogoutMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UploadToolbarItem","Caption":"Sync","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/Store_App/Actions/Service/SyncStartedMessage.action"},{"_Type":"Control.Type.ToolbarItem","_Name":"UpdateToolbarItem","Caption":"Update","Enabled":true,"Visible":"$(PLT,true,true,false)","Clickable":true,"OnPress":"/Store_App/Actions/AppUpdateProgressBanner.action"}]}}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/ProductCategories/ProductCategories_Detail.page":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/ProductCategories/ProductCategories_Detail.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"ProductCategory Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"ProductCategories","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{CategoryName}","Subhead":"{Category}","BodyText":"","Footnote":"{MainCategoryName}","Description":"{MainCategory}","StatusText":"{NumberOfProducts}","StatusImage":"","SubstatusImage":"","SubstatusText":"{UpdatedTimestamp}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"MainCategory","Value":"{MainCategory}"},{"KeyName":"MainCategoryName","Value":"{MainCategoryName}"},{"KeyName":"NumberOfProducts","Value":"{NumberOfProducts}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"ProductCategories_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/ProductCategories/ProductCategories_List.page":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/ProductCategories/ProductCategories_List.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"ProductCategories","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{MainCategory}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Store_App/Actions/ProductCategories/NavToProductCategories_Detail.action","StatusImage":"","Title":"{CategoryName}","Footnote":"{MainCategoryName}","PreserveIconStackSpacing":false,"StatusText":"{NumberOfProducts}","Subhead":"{Category}","SubstatusText":"{UpdatedTimestamp}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"ProductCategories","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"ProductCategories_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/ProductTexts/ProductTexts_Detail.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/ProductTexts/ProductTexts_Detail.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"ProductText Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"ProductTexts","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{Name}","Subhead":"{Id}","BodyText":"","Footnote":"{LongDescription}","Description":"{Language}","StatusText":"{ProductId}","StatusImage":"","SubstatusImage":"","SubstatusText":"{ShortDescription}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Id","Value":"{Id}"},{"KeyName":"Language","Value":"{Language}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"ProductTexts_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/ProductTexts/ProductTexts_List.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/ProductTexts/ProductTexts_List.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"ProductTexts","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Language}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Store_App/Actions/ProductTexts/NavToProductTexts_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{LongDescription}","PreserveIconStackSpacing":false,"StatusText":"{ProductId}","Subhead":"{Id}","SubstatusText":"{ShortDescription}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"ProductTexts","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"ProductTexts_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/Products/Products_Detail.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/Products/Products_Detail.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Product Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/Store_App/Services/com_sap_edm_sampleservice_v2.service/{@odata.readLink}/$value","HeadlineText":"{Name}","Subhead":"{Category}","BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/Products/Products_List.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/Products/Products_List.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Header":{"_Name":"SectionHeader0","AccessoryType":"none","UseTopPadding":false},"_Type":"Section.Type.ObjectTable","Target":{"EntitySet":"Products","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Name":"SectionObjectTable0","EmptySection":{"Caption":"No record found!","FooterVisible":false},"ObjectCell":{"Title":"{Name}","Subhead":"{Category}","StatusText":"{Price}","SubstatusText":"{CurrencyCode} ","PreserveIconStackSpacing":false,"AccessoryType":"disclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[{"Image":"/Store_App/Services/com_sap_edm_sampleservice_v2.service/{@odata.readLink}/$value"}],"ImageIsCircular":false},"OnPress":"/Store_App/Actions/Products/NavToProducts_Detail.action","ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true}},"Search":{"Enabled":true,"Placeholder":"Search","BarcodeScanner":true,"Delay":250,"MinimumCharacterThreshold":2},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."}}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."}}],"_Type":"Page","_Name":"Products_List","Caption":"Products","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeader Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"PurchaseOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{PurchaseOrderId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{NetAmount}","Description":"{GrossAmount}","StatusText":"{SupplierId}","StatusImage":"","SubstatusImage":"","SubstatusText":"{TaxAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}","OnPress":"/Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["PurchaseOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeaders","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action","StatusImage":"","Title":"{PurchaseOrderId}","Footnote":"{NetAmount}","PreserveIconStackSpacing":false,"StatusText":"{SupplierId}","Subhead":"{CurrencyCode}","SubstatusText":"{TaxAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{ItemNumber}","Description":"{GrossAmount}","StatusText":"{NetAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PurchaseOrderId}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItems","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action","StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeader Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{LifeCycleStatusName}","Subhead":"{CreatedAt}","BodyText":"","Footnote":"{CustomerId}","Description":"{CurrencyCode}","StatusText":"{GrossAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{LifeCycleStatus}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CreatedAt","Value":"{CreatedAt}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"CustomerId","Value":"{CustomerId}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"LifeCycleStatus","Value":"{LifeCycleStatus}"},{"KeyName":"LifeCycleStatusName","Value":"{LifeCycleStatusName}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"SalesOrderId","Value":"{SalesOrderId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderHeaders","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action","StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerId}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/SalesOrderItems/SalesOrderItems_Detail.page":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/SalesOrderItems/SalesOrderItems_Detail.page ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderItem Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{GrossAmount}","Description":"{DeliveryDate}","StatusText":"{ItemNumber}","StatusImage":"","SubstatusImage":"","SubstatusText":"{NetAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DeliveryDate","Value":"{DeliveryDate}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"SalesOrderId","Value":"{SalesOrderId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/SalesOrderItems/SalesOrderItems_List.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/SalesOrderItems/SalesOrderItems_List.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SalesOrderItems","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action","StatusImage":"","Title":"{ProductId}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SalesOrderItems","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/Stock/Stock_Detail.page":
/*!*******************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/Stock/Stock_Detail.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Stock Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"Stock","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{LotSize}","BodyText":"","Footnote":"{Quantity}","Description":"{MinStock}","StatusText":"{QuantityLessMin}","StatusImage":"","SubstatusImage":"","SubstatusText":"{UpdatedTimestamp}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"LotSize","Value":"{LotSize}"},{"KeyName":"MinStock","Value":"{MinStock}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityLessMin","Value":"{QuantityLessMin}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Stock_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/Stock/Stock_List.page":
/*!*****************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/Stock/Stock_List.page ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Stock","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{MinStock}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Store_App/Actions/Stock/NavToStock_Detail.action","StatusImage":"","Title":"{ProductId}","Footnote":"{Quantity}","PreserveIconStackSpacing":false,"StatusText":"{QuantityLessMin}","Subhead":"{LotSize}","SubstatusText":"{UpdatedTimestamp}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Stock","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Stock_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/Suppliers/Suppliers_Detail.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/Suppliers/Suppliers_Detail.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Supplier Detail","DesignTimeTarget":{"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"Suppliers","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{SupplierName}","Subhead":"{City}","BodyText":"","Footnote":"{EmailAddress}","Description":"{Country}","StatusText":"{HouseNumber}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PhoneNumber}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"City","Value":"{City}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"HouseNumber","Value":"{HouseNumber}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"PostalCode","Value":"{PostalCode}"},{"KeyName":"Street","Value":"{Street}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"SupplierName","Value":"{SupplierName}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Address"},"KeyAndValues":[{"KeyName":"HouseNumber","Value":"{Address/HouseNumber}"},{"KeyName":"Street","Value":"{Address/Street}"},{"KeyName":"City","Value":"{Address/City}"},{"KeyName":"Country","Value":"{Address/Country}"},{"KeyName":"PostalCode","Value":"{Address/PostalCode}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValueAddress","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Products"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CategoryName}","AvatarStack":{"Avatars":[{"Image":"/Store_App/Services/com_sap_edm_sampleservice_v2.service/{@odata.readLink}/$value"}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}","OnPress":"/Store_App/Actions/Products/NavToProducts_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Products","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"PurchaseOrders"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{PurchaseOrderId}","Footnote":"{NetAmount}","PreserveIconStackSpacing":false,"StatusText":"{SupplierId}","Subhead":"{CurrencyCode}","SubstatusText":"{TaxAmount}","OnPress":"/Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/PurchaseOrders","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Products","PurchaseOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Suppliers_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Store_App/Pages/Suppliers/Suppliers_List.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/Store_App/Pages/Suppliers/Suppliers_List.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Suppliers","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Country}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Store_App/Actions/Suppliers/NavToSuppliers_Detail.action","StatusImage":"","Title":"{SupplierName}","Footnote":"{EmailAddress}","PreserveIconStackSpacing":false,"StatusText":"{HouseNumber}","Subhead":"{City}","SubstatusText":"{PhoneNumber}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Suppliers","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Suppliers_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"Store_App","Version":"/Store_App/Globals/AppDefinition_Version.global","MainPage":"/Store_App/Pages/Main.page","OnLaunch":["/Store_App/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/Store_App/Rules/OnWillUpdate.js","OnDidUpdate":"/Store_App/Actions/Service/InitializeOffline.action","Styles":"/Store_App/Styles/Styles.less","Localization":"/Store_App/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/Store_App/Styles/Styles.css","ios":"/Store_App/Styles/Styles.nss","android":"/Store_App/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/AppUpdate.action":
/*!**************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/AppUpdate.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/Store_App/Rules/AppUpdateFailure.js","OnSuccess":"/Store_App/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/AppUpdateFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/AppUpdateFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/AppUpdateProgressBanner.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/AppUpdateProgressBanner.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/Store_App/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/AppUpdateSuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/AppUpdateSuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/CloseModalPage_Cancel.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/CloseModalPage_Cancel.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/CloseModalPage_Complete.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/CloseModalPage_Complete.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/ClosePage.action":
/*!**************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/ClosePage.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Customers/NavToCustomers_Detail.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Customers/NavToCustomers_Detail.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/Customers/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Customers/NavToCustomers_List.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Customers/NavToCustomers_List.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/Customers/Customers_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/Store_App/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Logout.action":
/*!***********************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Logout.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/LogoutMessage.action":
/*!******************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/LogoutMessage.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/Store_App/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/OnWillUpdate.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/OnWillUpdate.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/ProductCategories/NavToProductCategories_Detail.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/ProductCategories/NavToProductCategories_Detail.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/ProductCategories/ProductCategories_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/ProductCategories/NavToProductCategories_List.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/ProductCategories/NavToProductCategories_List.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/ProductCategories/ProductCategories_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/ProductTexts/NavToProductTexts_Detail.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/ProductTexts/NavToProductTexts_Detail.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/ProductTexts/ProductTexts_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/ProductTexts/NavToProductTexts_List.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/ProductTexts/NavToProductTexts_List.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/ProductTexts/ProductTexts_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Products/NavToProducts_Detail.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Products/NavToProducts_Detail.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/Products/Products_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Products/NavToProducts_List.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Products/NavToProducts_List.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/Products/Products_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/SalesOrderItems/SalesOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_List.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_List.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/SalesOrderItems/SalesOrderItems_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/CloseOffline.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/CloseOffline.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/Store_App/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/Store_App/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/CloseOfflineFailureMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/CloseOfflineFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/CloseOfflineSuccessMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/DownloadOffline.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/DownloadOffline.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"ProductCategories","Query":"ProductCategories"},{"Name":"Products","Query":"Products"},{"Name":"ProductTexts","Query":"ProductTexts"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Stock","Query":"Stock"},{"Name":"Suppliers","Query":"Suppliers"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/Store_App/Actions/Service/SyncFailureMessage.action","OnSuccess":"/Store_App/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/DownloadStartedMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/DownloadStartedMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/Store_App/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/InitializeOffline.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/InitializeOffline.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"ProductCategories","Query":"ProductCategories"},{"Name":"Products","Query":"Products"},{"Name":"ProductTexts","Query":"ProductTexts"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Stock","Query":"Stock"},{"Name":"Suppliers","Query":"Suppliers"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/Store_App/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/Store_App/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/InitializeOfflineFailureMessage.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/SyncFailureMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/SyncFailureMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/SyncStartedMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/SyncStartedMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/Store_App/Actions/Service/UploadOffline.action","OnFailure":"/Store_App/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/SyncSuccessMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/SyncSuccessMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Service/UploadOffline.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Service/UploadOffline.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/Store_App/Services/com_sap_edm_sampleservice_v2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/Store_App/Actions/Service/DownloadStartedMessage.action","OnFailure":"/Store_App/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Stock/NavToStock_Detail.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Stock/NavToStock_Detail.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/Stock/Stock_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Stock/NavToStock_List.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Stock/NavToStock_List.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/Stock/Stock_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Suppliers/NavToSuppliers_Detail.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Suppliers/NavToSuppliers_Detail.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/Suppliers/Suppliers_Detail.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Actions/Suppliers/NavToSuppliers_List.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Store_App/Actions/Suppliers/NavToSuppliers_List.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Store_App/Pages/Suppliers/Suppliers_List.page"}

/***/ }),

/***/ "./build.definitions/Store_App/Globals/AppDefinition_Version.global":
/*!**************************************************************************!*\
  !*** ./build.definitions/Store_App/Globals/AppDefinition_Version.global ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Store_App/Services/com_sap_edm_sampleservice_v2.service":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Store_App/Services/com_sap_edm_sampleservice_v2.service ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"com.sap.edm.sampleservice.v2","OfflineEnabled":true,"SourceType":"Mobile"}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let store_app_actions_appupdate_action = __webpack_require__(/*! ./Store_App/Actions/AppUpdate.action */ "./build.definitions/Store_App/Actions/AppUpdate.action")
let store_app_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./Store_App/Actions/AppUpdateFailureMessage.action */ "./build.definitions/Store_App/Actions/AppUpdateFailureMessage.action")
let store_app_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./Store_App/Actions/AppUpdateProgressBanner.action */ "./build.definitions/Store_App/Actions/AppUpdateProgressBanner.action")
let store_app_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./Store_App/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/Store_App/Actions/AppUpdateSuccessMessage.action")
let store_app_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./Store_App/Actions/CloseModalPage_Cancel.action */ "./build.definitions/Store_App/Actions/CloseModalPage_Cancel.action")
let store_app_actions_closemodalpage_complete_action = __webpack_require__(/*! ./Store_App/Actions/CloseModalPage_Complete.action */ "./build.definitions/Store_App/Actions/CloseModalPage_Complete.action")
let store_app_actions_closepage_action = __webpack_require__(/*! ./Store_App/Actions/ClosePage.action */ "./build.definitions/Store_App/Actions/ClosePage.action")
let store_app_actions_customers_navtocustomers_detail_action = __webpack_require__(/*! ./Store_App/Actions/Customers/NavToCustomers_Detail.action */ "./build.definitions/Store_App/Actions/Customers/NavToCustomers_Detail.action")
let store_app_actions_customers_navtocustomers_list_action = __webpack_require__(/*! ./Store_App/Actions/Customers/NavToCustomers_List.action */ "./build.definitions/Store_App/Actions/Customers/NavToCustomers_List.action")
let store_app_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./Store_App/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/Store_App/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let store_app_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./Store_App/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/Store_App/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let store_app_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./Store_App/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/Store_App/Actions/ErrorArchive/NavToErrorArchive_List.action")
let store_app_actions_logout_action = __webpack_require__(/*! ./Store_App/Actions/Logout.action */ "./build.definitions/Store_App/Actions/Logout.action")
let store_app_actions_logoutmessage_action = __webpack_require__(/*! ./Store_App/Actions/LogoutMessage.action */ "./build.definitions/Store_App/Actions/LogoutMessage.action")
let store_app_actions_onwillupdate_action = __webpack_require__(/*! ./Store_App/Actions/OnWillUpdate.action */ "./build.definitions/Store_App/Actions/OnWillUpdate.action")
let store_app_actions_productcategories_navtoproductcategories_detail_action = __webpack_require__(/*! ./Store_App/Actions/ProductCategories/NavToProductCategories_Detail.action */ "./build.definitions/Store_App/Actions/ProductCategories/NavToProductCategories_Detail.action")
let store_app_actions_productcategories_navtoproductcategories_list_action = __webpack_require__(/*! ./Store_App/Actions/ProductCategories/NavToProductCategories_List.action */ "./build.definitions/Store_App/Actions/ProductCategories/NavToProductCategories_List.action")
let store_app_actions_products_navtoproducts_detail_action = __webpack_require__(/*! ./Store_App/Actions/Products/NavToProducts_Detail.action */ "./build.definitions/Store_App/Actions/Products/NavToProducts_Detail.action")
let store_app_actions_products_navtoproducts_list_action = __webpack_require__(/*! ./Store_App/Actions/Products/NavToProducts_List.action */ "./build.definitions/Store_App/Actions/Products/NavToProducts_List.action")
let store_app_actions_producttexts_navtoproducttexts_detail_action = __webpack_require__(/*! ./Store_App/Actions/ProductTexts/NavToProductTexts_Detail.action */ "./build.definitions/Store_App/Actions/ProductTexts/NavToProductTexts_Detail.action")
let store_app_actions_producttexts_navtoproducttexts_list_action = __webpack_require__(/*! ./Store_App/Actions/ProductTexts/NavToProductTexts_List.action */ "./build.definitions/Store_App/Actions/ProductTexts/NavToProductTexts_List.action")
let store_app_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action = __webpack_require__(/*! ./Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action */ "./build.definitions/Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action")
let store_app_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action = __webpack_require__(/*! ./Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action */ "./build.definitions/Store_App/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action")
let store_app_actions_purchaseorderitems_navtopurchaseorderitems_detail_action = __webpack_require__(/*! ./Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action */ "./build.definitions/Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action")
let store_app_actions_purchaseorderitems_navtopurchaseorderitems_list_action = __webpack_require__(/*! ./Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action */ "./build.definitions/Store_App/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action")
let store_app_actions_salesorderheaders_navtosalesorderheaders_detail_action = __webpack_require__(/*! ./Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action */ "./build.definitions/Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action")
let store_app_actions_salesorderheaders_navtosalesorderheaders_list_action = __webpack_require__(/*! ./Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action */ "./build.definitions/Store_App/Actions/SalesOrderHeaders/NavToSalesOrderHeaders_List.action")
let store_app_actions_salesorderitems_navtosalesorderitems_detail_action = __webpack_require__(/*! ./Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action */ "./build.definitions/Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_Detail.action")
let store_app_actions_salesorderitems_navtosalesorderitems_list_action = __webpack_require__(/*! ./Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_List.action */ "./build.definitions/Store_App/Actions/SalesOrderItems/NavToSalesOrderItems_List.action")
let store_app_actions_service_closeoffline_action = __webpack_require__(/*! ./Store_App/Actions/Service/CloseOffline.action */ "./build.definitions/Store_App/Actions/Service/CloseOffline.action")
let store_app_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./Store_App/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/Store_App/Actions/Service/CloseOfflineFailureMessage.action")
let store_app_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./Store_App/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/Store_App/Actions/Service/CloseOfflineSuccessMessage.action")
let store_app_actions_service_downloadoffline_action = __webpack_require__(/*! ./Store_App/Actions/Service/DownloadOffline.action */ "./build.definitions/Store_App/Actions/Service/DownloadOffline.action")
let store_app_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./Store_App/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/Store_App/Actions/Service/DownloadStartedMessage.action")
let store_app_actions_service_initializeoffline_action = __webpack_require__(/*! ./Store_App/Actions/Service/InitializeOffline.action */ "./build.definitions/Store_App/Actions/Service/InitializeOffline.action")
let store_app_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./Store_App/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/Store_App/Actions/Service/InitializeOfflineFailureMessage.action")
let store_app_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./Store_App/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/Store_App/Actions/Service/InitializeOfflineSuccessMessage.action")
let store_app_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./Store_App/Actions/Service/SyncFailureMessage.action */ "./build.definitions/Store_App/Actions/Service/SyncFailureMessage.action")
let store_app_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./Store_App/Actions/Service/SyncStartedMessage.action */ "./build.definitions/Store_App/Actions/Service/SyncStartedMessage.action")
let store_app_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./Store_App/Actions/Service/SyncSuccessMessage.action */ "./build.definitions/Store_App/Actions/Service/SyncSuccessMessage.action")
let store_app_actions_service_uploadoffline_action = __webpack_require__(/*! ./Store_App/Actions/Service/UploadOffline.action */ "./build.definitions/Store_App/Actions/Service/UploadOffline.action")
let store_app_actions_stock_navtostock_detail_action = __webpack_require__(/*! ./Store_App/Actions/Stock/NavToStock_Detail.action */ "./build.definitions/Store_App/Actions/Stock/NavToStock_Detail.action")
let store_app_actions_stock_navtostock_list_action = __webpack_require__(/*! ./Store_App/Actions/Stock/NavToStock_List.action */ "./build.definitions/Store_App/Actions/Stock/NavToStock_List.action")
let store_app_actions_suppliers_navtosuppliers_detail_action = __webpack_require__(/*! ./Store_App/Actions/Suppliers/NavToSuppliers_Detail.action */ "./build.definitions/Store_App/Actions/Suppliers/NavToSuppliers_Detail.action")
let store_app_actions_suppliers_navtosuppliers_list_action = __webpack_require__(/*! ./Store_App/Actions/Suppliers/NavToSuppliers_List.action */ "./build.definitions/Store_App/Actions/Suppliers/NavToSuppliers_List.action")
let store_app_globals_appdefinition_version_global = __webpack_require__(/*! ./Store_App/Globals/AppDefinition_Version.global */ "./build.definitions/Store_App/Globals/AppDefinition_Version.global")
let store_app_i18n_i18n_properties = __webpack_require__(/*! ./Store_App/i18n/i18n.properties */ "./build.definitions/Store_App/i18n/i18n.properties")
let store_app_jsconfig_json = __webpack_require__(/*! ./Store_App/jsconfig.json */ "./build.definitions/Store_App/jsconfig.json")
let store_app_pages_customers_customers_detail_page = __webpack_require__(/*! ./Store_App/Pages/Customers/Customers_Detail.page */ "./build.definitions/Store_App/Pages/Customers/Customers_Detail.page")
let store_app_pages_customers_customers_list_page = __webpack_require__(/*! ./Store_App/Pages/Customers/Customers_List.page */ "./build.definitions/Store_App/Pages/Customers/Customers_List.page")
let store_app_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./Store_App/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/Store_App/Pages/ErrorArchive/ErrorArchive_Detail.page")
let store_app_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./Store_App/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/Store_App/Pages/ErrorArchive/ErrorArchive_List.page")
let store_app_pages_main_page = __webpack_require__(/*! ./Store_App/Pages/Main.page */ "./build.definitions/Store_App/Pages/Main.page")
let store_app_pages_productcategories_productcategories_detail_page = __webpack_require__(/*! ./Store_App/Pages/ProductCategories/ProductCategories_Detail.page */ "./build.definitions/Store_App/Pages/ProductCategories/ProductCategories_Detail.page")
let store_app_pages_productcategories_productcategories_list_page = __webpack_require__(/*! ./Store_App/Pages/ProductCategories/ProductCategories_List.page */ "./build.definitions/Store_App/Pages/ProductCategories/ProductCategories_List.page")
let store_app_pages_products_products_detail_page = __webpack_require__(/*! ./Store_App/Pages/Products/Products_Detail.page */ "./build.definitions/Store_App/Pages/Products/Products_Detail.page")
let store_app_pages_products_products_list_page = __webpack_require__(/*! ./Store_App/Pages/Products/Products_List.page */ "./build.definitions/Store_App/Pages/Products/Products_List.page")
let store_app_pages_producttexts_producttexts_detail_page = __webpack_require__(/*! ./Store_App/Pages/ProductTexts/ProductTexts_Detail.page */ "./build.definitions/Store_App/Pages/ProductTexts/ProductTexts_Detail.page")
let store_app_pages_producttexts_producttexts_list_page = __webpack_require__(/*! ./Store_App/Pages/ProductTexts/ProductTexts_List.page */ "./build.definitions/Store_App/Pages/ProductTexts/ProductTexts_List.page")
let store_app_pages_purchaseorderheaders_purchaseorderheaders_detail_page = __webpack_require__(/*! ./Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page */ "./build.definitions/Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page")
let store_app_pages_purchaseorderheaders_purchaseorderheaders_list_page = __webpack_require__(/*! ./Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page */ "./build.definitions/Store_App/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page")
let store_app_pages_purchaseorderitems_purchaseorderitems_detail_page = __webpack_require__(/*! ./Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page */ "./build.definitions/Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page")
let store_app_pages_purchaseorderitems_purchaseorderitems_list_page = __webpack_require__(/*! ./Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page */ "./build.definitions/Store_App/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page")
let store_app_pages_salesorderheaders_salesorderheaders_detail_page = __webpack_require__(/*! ./Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page */ "./build.definitions/Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_Detail.page")
let store_app_pages_salesorderheaders_salesorderheaders_list_page = __webpack_require__(/*! ./Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page */ "./build.definitions/Store_App/Pages/SalesOrderHeaders/SalesOrderHeaders_List.page")
let store_app_pages_salesorderitems_salesorderitems_detail_page = __webpack_require__(/*! ./Store_App/Pages/SalesOrderItems/SalesOrderItems_Detail.page */ "./build.definitions/Store_App/Pages/SalesOrderItems/SalesOrderItems_Detail.page")
let store_app_pages_salesorderitems_salesorderitems_list_page = __webpack_require__(/*! ./Store_App/Pages/SalesOrderItems/SalesOrderItems_List.page */ "./build.definitions/Store_App/Pages/SalesOrderItems/SalesOrderItems_List.page")
let store_app_pages_stock_stock_detail_page = __webpack_require__(/*! ./Store_App/Pages/Stock/Stock_Detail.page */ "./build.definitions/Store_App/Pages/Stock/Stock_Detail.page")
let store_app_pages_stock_stock_list_page = __webpack_require__(/*! ./Store_App/Pages/Stock/Stock_List.page */ "./build.definitions/Store_App/Pages/Stock/Stock_List.page")
let store_app_pages_suppliers_suppliers_detail_page = __webpack_require__(/*! ./Store_App/Pages/Suppliers/Suppliers_Detail.page */ "./build.definitions/Store_App/Pages/Suppliers/Suppliers_Detail.page")
let store_app_pages_suppliers_suppliers_list_page = __webpack_require__(/*! ./Store_App/Pages/Suppliers/Suppliers_List.page */ "./build.definitions/Store_App/Pages/Suppliers/Suppliers_List.page")
let store_app_rules_appupdatefailure_js = __webpack_require__(/*! ./Store_App/Rules/AppUpdateFailure.js */ "./build.definitions/Store_App/Rules/AppUpdateFailure.js")
let store_app_rules_appupdatesuccess_js = __webpack_require__(/*! ./Store_App/Rules/AppUpdateSuccess.js */ "./build.definitions/Store_App/Rules/AppUpdateSuccess.js")
let store_app_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./Store_App/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/Store_App/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let store_app_rules_onwillupdate_js = __webpack_require__(/*! ./Store_App/Rules/OnWillUpdate.js */ "./build.definitions/Store_App/Rules/OnWillUpdate.js")
let store_app_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./Store_App/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/Store_App/Rules/ResetAppSettingsAndLogout.js")
let store_app_services_com_sap_edm_sampleservice_v2_service = __webpack_require__(/*! ./Store_App/Services/com_sap_edm_sampleservice_v2.service */ "./build.definitions/Store_App/Services/com_sap_edm_sampleservice_v2.service")
let store_app_styles_styles_css = __webpack_require__(/*! ./Store_App/Styles/Styles.css */ "./build.definitions/Store_App/Styles/Styles.css")
let store_app_styles_styles_json = __webpack_require__(/*! ./Store_App/Styles/Styles.json */ "./build.definitions/Store_App/Styles/Styles.json")
let store_app_styles_styles_less = __webpack_require__(/*! ./Store_App/Styles/Styles.less */ "./build.definitions/Store_App/Styles/Styles.less")
let store_app_styles_styles_nss = __webpack_require__(/*! ./Store_App/Styles/Styles.nss */ "./build.definitions/Store_App/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	store_app_actions_appupdate_action : store_app_actions_appupdate_action,
	store_app_actions_appupdatefailuremessage_action : store_app_actions_appupdatefailuremessage_action,
	store_app_actions_appupdateprogressbanner_action : store_app_actions_appupdateprogressbanner_action,
	store_app_actions_appupdatesuccessmessage_action : store_app_actions_appupdatesuccessmessage_action,
	store_app_actions_closemodalpage_cancel_action : store_app_actions_closemodalpage_cancel_action,
	store_app_actions_closemodalpage_complete_action : store_app_actions_closemodalpage_complete_action,
	store_app_actions_closepage_action : store_app_actions_closepage_action,
	store_app_actions_customers_navtocustomers_detail_action : store_app_actions_customers_navtocustomers_detail_action,
	store_app_actions_customers_navtocustomers_list_action : store_app_actions_customers_navtocustomers_list_action,
	store_app_actions_errorarchive_errorarchive_syncfailure_action : store_app_actions_errorarchive_errorarchive_syncfailure_action,
	store_app_actions_errorarchive_navtoerrorarchive_detail_action : store_app_actions_errorarchive_navtoerrorarchive_detail_action,
	store_app_actions_errorarchive_navtoerrorarchive_list_action : store_app_actions_errorarchive_navtoerrorarchive_list_action,
	store_app_actions_logout_action : store_app_actions_logout_action,
	store_app_actions_logoutmessage_action : store_app_actions_logoutmessage_action,
	store_app_actions_onwillupdate_action : store_app_actions_onwillupdate_action,
	store_app_actions_productcategories_navtoproductcategories_detail_action : store_app_actions_productcategories_navtoproductcategories_detail_action,
	store_app_actions_productcategories_navtoproductcategories_list_action : store_app_actions_productcategories_navtoproductcategories_list_action,
	store_app_actions_products_navtoproducts_detail_action : store_app_actions_products_navtoproducts_detail_action,
	store_app_actions_products_navtoproducts_list_action : store_app_actions_products_navtoproducts_list_action,
	store_app_actions_producttexts_navtoproducttexts_detail_action : store_app_actions_producttexts_navtoproducttexts_detail_action,
	store_app_actions_producttexts_navtoproducttexts_list_action : store_app_actions_producttexts_navtoproducttexts_list_action,
	store_app_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action : store_app_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action,
	store_app_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action : store_app_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action,
	store_app_actions_purchaseorderitems_navtopurchaseorderitems_detail_action : store_app_actions_purchaseorderitems_navtopurchaseorderitems_detail_action,
	store_app_actions_purchaseorderitems_navtopurchaseorderitems_list_action : store_app_actions_purchaseorderitems_navtopurchaseorderitems_list_action,
	store_app_actions_salesorderheaders_navtosalesorderheaders_detail_action : store_app_actions_salesorderheaders_navtosalesorderheaders_detail_action,
	store_app_actions_salesorderheaders_navtosalesorderheaders_list_action : store_app_actions_salesorderheaders_navtosalesorderheaders_list_action,
	store_app_actions_salesorderitems_navtosalesorderitems_detail_action : store_app_actions_salesorderitems_navtosalesorderitems_detail_action,
	store_app_actions_salesorderitems_navtosalesorderitems_list_action : store_app_actions_salesorderitems_navtosalesorderitems_list_action,
	store_app_actions_service_closeoffline_action : store_app_actions_service_closeoffline_action,
	store_app_actions_service_closeofflinefailuremessage_action : store_app_actions_service_closeofflinefailuremessage_action,
	store_app_actions_service_closeofflinesuccessmessage_action : store_app_actions_service_closeofflinesuccessmessage_action,
	store_app_actions_service_downloadoffline_action : store_app_actions_service_downloadoffline_action,
	store_app_actions_service_downloadstartedmessage_action : store_app_actions_service_downloadstartedmessage_action,
	store_app_actions_service_initializeoffline_action : store_app_actions_service_initializeoffline_action,
	store_app_actions_service_initializeofflinefailuremessage_action : store_app_actions_service_initializeofflinefailuremessage_action,
	store_app_actions_service_initializeofflinesuccessmessage_action : store_app_actions_service_initializeofflinesuccessmessage_action,
	store_app_actions_service_syncfailuremessage_action : store_app_actions_service_syncfailuremessage_action,
	store_app_actions_service_syncstartedmessage_action : store_app_actions_service_syncstartedmessage_action,
	store_app_actions_service_syncsuccessmessage_action : store_app_actions_service_syncsuccessmessage_action,
	store_app_actions_service_uploadoffline_action : store_app_actions_service_uploadoffline_action,
	store_app_actions_stock_navtostock_detail_action : store_app_actions_stock_navtostock_detail_action,
	store_app_actions_stock_navtostock_list_action : store_app_actions_stock_navtostock_list_action,
	store_app_actions_suppliers_navtosuppliers_detail_action : store_app_actions_suppliers_navtosuppliers_detail_action,
	store_app_actions_suppliers_navtosuppliers_list_action : store_app_actions_suppliers_navtosuppliers_list_action,
	store_app_globals_appdefinition_version_global : store_app_globals_appdefinition_version_global,
	store_app_i18n_i18n_properties : store_app_i18n_i18n_properties,
	store_app_jsconfig_json : store_app_jsconfig_json,
	store_app_pages_customers_customers_detail_page : store_app_pages_customers_customers_detail_page,
	store_app_pages_customers_customers_list_page : store_app_pages_customers_customers_list_page,
	store_app_pages_errorarchive_errorarchive_detail_page : store_app_pages_errorarchive_errorarchive_detail_page,
	store_app_pages_errorarchive_errorarchive_list_page : store_app_pages_errorarchive_errorarchive_list_page,
	store_app_pages_main_page : store_app_pages_main_page,
	store_app_pages_productcategories_productcategories_detail_page : store_app_pages_productcategories_productcategories_detail_page,
	store_app_pages_productcategories_productcategories_list_page : store_app_pages_productcategories_productcategories_list_page,
	store_app_pages_products_products_detail_page : store_app_pages_products_products_detail_page,
	store_app_pages_products_products_list_page : store_app_pages_products_products_list_page,
	store_app_pages_producttexts_producttexts_detail_page : store_app_pages_producttexts_producttexts_detail_page,
	store_app_pages_producttexts_producttexts_list_page : store_app_pages_producttexts_producttexts_list_page,
	store_app_pages_purchaseorderheaders_purchaseorderheaders_detail_page : store_app_pages_purchaseorderheaders_purchaseorderheaders_detail_page,
	store_app_pages_purchaseorderheaders_purchaseorderheaders_list_page : store_app_pages_purchaseorderheaders_purchaseorderheaders_list_page,
	store_app_pages_purchaseorderitems_purchaseorderitems_detail_page : store_app_pages_purchaseorderitems_purchaseorderitems_detail_page,
	store_app_pages_purchaseorderitems_purchaseorderitems_list_page : store_app_pages_purchaseorderitems_purchaseorderitems_list_page,
	store_app_pages_salesorderheaders_salesorderheaders_detail_page : store_app_pages_salesorderheaders_salesorderheaders_detail_page,
	store_app_pages_salesorderheaders_salesorderheaders_list_page : store_app_pages_salesorderheaders_salesorderheaders_list_page,
	store_app_pages_salesorderitems_salesorderitems_detail_page : store_app_pages_salesorderitems_salesorderitems_detail_page,
	store_app_pages_salesorderitems_salesorderitems_list_page : store_app_pages_salesorderitems_salesorderitems_list_page,
	store_app_pages_stock_stock_detail_page : store_app_pages_stock_stock_detail_page,
	store_app_pages_stock_stock_list_page : store_app_pages_stock_stock_list_page,
	store_app_pages_suppliers_suppliers_detail_page : store_app_pages_suppliers_suppliers_detail_page,
	store_app_pages_suppliers_suppliers_list_page : store_app_pages_suppliers_suppliers_list_page,
	store_app_rules_appupdatefailure_js : store_app_rules_appupdatefailure_js,
	store_app_rules_appupdatesuccess_js : store_app_rules_appupdatesuccess_js,
	store_app_rules_errorarchive_errorarchive_checkforsyncerror_js : store_app_rules_errorarchive_errorarchive_checkforsyncerror_js,
	store_app_rules_onwillupdate_js : store_app_rules_onwillupdate_js,
	store_app_rules_resetappsettingsandlogout_js : store_app_rules_resetappsettingsandlogout_js,
	store_app_services_com_sap_edm_sampleservice_v2_service : store_app_services_com_sap_edm_sampleservice_v2_service,
	store_app_styles_styles_css : store_app_styles_styles_css,
	store_app_styles_styles_json : store_app_styles_styles_json,
	store_app_styles_styles_less : store_app_styles_styles_less,
	store_app_styles_styles_nss : store_app_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/Store_App/Styles/Styles.json":
/*!********************************************************!*\
  !*** ./build.definitions/Store_App/Styles/Styles.json ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/Store_App/jsconfig.json":
/*!***************************************************!*\
  !*** ./build.definitions/Store_App/jsconfig.json ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map