var Delimeter = (function () {
    function Delimeter() {
        this.RowDelimeter = "§";
        this.ValueDelimeter = "¶";
        this.ColumnDelimeter = "µ";
        this.TypeDelimeter = "ǂ";
    }
    return Delimeter;
}());
exports.Delimeter = Delimeter;
var GeneralFunctions = (function () {
    function GeneralFunctions() {
    }
    GeneralFunctions.prototype.getFieldValuesAsReportFieldArray = function (fieldObject) {
        var arrayList = new Array();
        if (fieldObject.length > 0) {
            for (var i = 0; i < fieldObject.length; i++) {
                var fldObject = fieldObject[i];
                if ((fldObject.IsComputationalField == null || fldObject.IsComputationalField == undefined) || fldObject.IsComputationalField == false) {
                    if (fldObject.IsMultiValued && fldObject.MultiFieldValues != null) {
                        for (var j = 0; j < fldObject.MultiFieldValues.length; j++) {
                            arrayList.push({
                                ReportFieldId: fldObject.ReportFieldId,
                                Value: fldObject.MultiFieldValues[j]
                            });
                        }
                    }
                    else {
                        arrayList.push({
                            ReportFieldId: fldObject.ReportFieldId,
                            Value: fldObject.FieldValue
                        });
                    }
                }
            }
        }
        return JSON.stringify(arrayList);
    };
    GeneralFunctions.prototype.getFieldValuesAsReportFieldArrayForFileUpload = function (event) {
        var fieldObject = event["fieldobject"];
        var filedata = event["filedata"];
        var arrayList = new Array();
        if (fieldObject.length > 0) {
            for (var i = 0; i < fieldObject.length; i++) {
                var fldObject = fieldObject[i];
                if ((fldObject.IsComputationalField == null || fldObject.IsComputationalField == undefined) || fldObject.IsComputationalField == false) {
                    if (fldObject.IsMultiValued && fldObject.MultiFieldValues != null) {
                        for (var j = 0; j < fldObject.MultiFieldValues.length; j++) {
                            arrayList.push({
                                ReportFieldId: fldObject.ReportFieldId,
                                Value: fldObject.MultiFieldValues[j]
                            });
                        }
                    }
                    else {
                        arrayList.push({
                            ReportFieldId: fldObject.ReportFieldId,
                            Value: fldObject.FieldValue
                        });
                    }
                }
            }
        }
        return { "fieldobject": JSON.stringify(arrayList), "filedata": JSON.stringify(filedata) };
    };
    /*getFieldValuesAsReportFieldArrayForFileUpload(event) {
        var fieldObject = event["fieldobject"];
        var filedata = event["filedata"];
        var arrayList = new Array<ReportFieldArray>();
        if (fieldObject.length > 0) {
            for (let i = 0; i < fieldObject.length; i++) {
                arrayList.push({
                    ReportFieldId: fieldObject [i].ReportFieldId,
                    Value: fieldObject[i].FieldValue
                });
            }
        }
        return { "fieldobject": JSON.stringify(arrayList), "filedata": JSON.stringify(filedata) };
    } */
    /* itemSource,totalItems change on add,update,delete*/
    GeneralFunctions.prototype.updateDataSource = function (itemsSource, action, returnData, selectedIds, dataKey, totalItems) {
        var updatedData = new Array();
        switch (action) {
            case "add":
                if (totalItems == 0) {
                    itemsSource = [];
                    itemsSource.push(JSON.parse(returnData["returnData"])[0]);
                }
                else {
                    itemsSource.unshift(JSON.parse(returnData["returnData"])[0]);
                }
                break;
            case "edit":
                if (selectedIds.length == 1) {
                    for (var i = 0; i < itemsSource.length; i++) {
                        if (itemsSource[i][dataKey] == JSON.parse(returnData["returnData"])[0][dataKey]) {
                            itemsSource[i] = JSON.parse(returnData["returnData"])[0];
                        }
                    }
                }
                else {
                    for (var i = 0; i < itemsSource.length; i++) {
                        for (var j = 0; j < selectedIds.length; j++) {
                            if (itemsSource[i][dataKey] == JSON.parse(returnData["returnData"])[j][dataKey]) {
                                itemsSource[i] = JSON.parse(returnData["returnData"])[j];
                            }
                        }
                    }
                }
                break;
            case "delete":
                function findEntity(entity) {
                    return entity[dataKey] === selectedIds[0];
                }
                itemsSource.splice(itemsSource.findIndex(findEntity), 1);
                break;
        }
        updatedData = updatedData.concat(itemsSource);
        var totalItms = this.updateTotalItems(totalItems, action);
        return { "itemSrc": updatedData, "itemCount": totalItms };
    };
    GeneralFunctions.prototype.updateTotalItems = function (totalItems, action) {
        switch (action) {
            case "add":
                totalItems = totalItems + 1;
                break;
            case "delete":
                totalItems = totalItems - 1;
                break;
        }
        return totalItems;
    };
    GeneralFunctions.prototype.addCardForGrid = function (drawingLayersSource, fields) {
        if (drawingLayersSource == null) {
            drawingLayersSource = [];
        }
        var obj = [];
        var jsonData = {};
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].GenericDataTypeId == 5)
                jsonData[fields[i].FieldLabel] = null;
            else {
                switch (fields[i].DataEntryControlId) {
                    case 4:
                        jsonData[fields[i].FieldLabel] = -1;
                        break;
                    case 2:
                        var dateformat = new Date();
                        var arr = dateformat.toDateString().split(" ");
                        jsonData[fields[i].FieldLabel] = arr[2] + " " + arr[1] + " " + arr[3];
                        break;
                    case 8:
                        jsonData[fields[i].FieldLabel] = this.formatDateTime();
                        break;
                    case 6:
                        jsonData[fields[i].FieldLabel] = false;
                        break;
                    default:
                        jsonData[fields[i].FieldLabel] = null;
                        break;
                }
            }
        }
        obj.push(jsonData);
        drawingLayersSource.push(obj[0]);
        return drawingLayersSource;
    };
    GeneralFunctions.prototype.formatDateTime = function () {
        /*dd MMM yyyy hh:mm tt --format*/
        var time;
        var hh;
        var hour;
        var min;
        var meridian;
        var date = new Date();
        hh = date.getHours();
        min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        if (hh > 12) {
            meridian = "PM";
            hh = hh - 12;
        }
        else if (hh == 12) {
            meridian = "PM";
            hh = 12;
        }
        else {
            meridian = "AM";
        }
        if (meridian == "AM") {
            if (hh == 0) {
                hh = 12;
            }
        }
        hour = hh.toString();
        hour = (hh < 10 ? '0' : '') + hour;
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        var formatteddate = dd + " " + mon + " " + yy + " " + hour + ":" + min + " " + meridian;
        return formatteddate;
    };
    GeneralFunctions.prototype.getMultipleFieldValuesAsReportFieldArray = function (fieldObject) {
        var arrayList = new Array();
        if (fieldObject.length > 0) {
            for (var i = 0; i < fieldObject.length; i++) {
                var fldObject = fieldObject[i];
                if ((fldObject.IsComputationalField == null || fldObject.IsComputationalField == undefined) || fldObject.IsComputationalField == false) {
                    arrayList.push({
                        ReportFieldId: fldObject.ReportFieldId,
                        Value: fldObject.FieldValue
                    });
                }
            }
        }
        return JSON.stringify(arrayList);
    };
    GeneralFunctions.prototype.updateDisplaySettingsinUI = function (fieldObjects, displaySettingsObject) {
        for (var i = 0; i < displaySettingsObject.length; i++) {
            var dispSettingObj = displaySettingsObject[i];
            if (dispSettingObj.FieldName == "DWG File Name") {
                var blnShowDwgFileName = dispSettingObj.ShowinGrid;
                var dwgFieldobj = fieldObjects.find(function (item) { return item.FieldLabel.trim() == "DWG File"; });
                if (dwgFieldobj) {
                    if (blnShowDwgFileName == false) {
                        dwgFieldobj.IsVisible = false;
                    }
                    else {
                        dwgFieldobj.IsVisible = true;
                    }
                }
            }
            var fieldObj = fieldObjects.find(function (item) { return item.FieldLabel.trim() == dispSettingObj.FieldName.trim(); });
            if (fieldObj) {
                fieldObj.IsVisible = dispSettingObj.ShowinGrid;
                if ((dispSettingObj.ReportFieldId == 900017) || (dispSettingObj.ReportFieldId == 900007)) {
                    var rate = fieldObjects.find(function (item) { return item.ReportFieldId == 744; });
                    rate.IsVisible = dispSettingObj.ShowinGrid;
                    var ratecode = fieldObjects.find(function (item) { return item.ReportFieldId == 740; });
                    ratecode.IsVisible = dispSettingObj.ShowinGrid;
                    var grossareacost = fieldObjects.find(function (item) { return item.ReportFieldId == 779; });
                    grossareacost.IsVisible = dispSettingObj.ShowinGrid;
                }
            }
        }
        return fieldObjects;
    };
    GeneralFunctions.prototype.updateSpacePrefixInDisplaySettings = function (displaySettingsObject) {
        var TempDisplaySettingObj = JSON.parse(JSON.stringify(displaySettingsObject));
        for (var i = 0; i < TempDisplaySettingObj.length; i++) {
            var dispSettingObj = TempDisplaySettingObj[i];
            if ((dispSettingObj.ReportFieldId > 1000000) || (dispSettingObj.ReportFieldId == 900009)) {
                dispSettingObj.FieldName = 'Space.' + dispSettingObj.FieldName;
            }
        }
        return TempDisplaySettingObj;
    };
    /*Passing menu details from the form, cross check with the db privileges*/
    /*Push all menu items into a new array excluding : the menu item with hasPrivilege :0*/
    /*return the new array : so that the form displays all the menus except the menu item with no privilege*/
    GeneralFunctions.prototype.GetPrivilegesOfPage = function (menu, callBack, pageId, adminService, length) {
        var fieldobj = new Array();
        fieldobj.push({ ReportFieldId: 343, Value: pageId.toString() });
        adminService.getPagePrivilege(fieldobj).subscribe(function (resultData) {
            var privilegeData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            //debugger; 
            var menunew = [];
            var subMenuNew = [];
            for (var i = 0; i < length; i++) {
                if (menu[i].hasOwnProperty('privilegeId')) {
                    var privilegeId;
                    if (menu[i].privilegeId != undefined)
                        privilegeId = menu[i].privilegeId;
                    else
                        privilegeId = 0;
                    var contextmenu = privilegeData.find(function (item) { return item.Id === privilegeId; });
                    if (contextmenu) {
                        if (contextmenu.hasOwnProperty('HasRight')) {
                            if (contextmenu.HasRight != undefined) {
                                if (contextmenu.HasRight == true) {
                                    menunew.push(menu[i]);
                                }
                            }
                        }
                        else {
                            menunew.push(menu[i]);
                        }
                    }
                    else {
                        menunew.push(menu[i]);
                    }
                }
                else {
                    menunew.push(menu[i]);
                }
                if (menu[i].subMenu != null && menu[i].subMenu != undefined) {
                    if (menu[i].subMenu.length > 0) {
                        subMenuNew = [];
                        for (var j = 0; j < menu[i].subMenu.length; j++) {
                            if (menu[i].subMenu[j].hasOwnProperty('privilegeId')) {
                                if (menu[i].subMenu[j].privilegeId != undefined)
                                    privilegeId = menu[i].subMenu[j].privilegeId;
                                else
                                    privilegeId = 0;
                                var contextmenu = privilegeData.find(function (item) { return item.Id === privilegeId; });
                                if (contextmenu) {
                                    if (contextmenu.hasOwnProperty('HasRight')) {
                                        if (contextmenu.HasRight != undefined) {
                                            if (contextmenu.HasRight == true) {
                                                subMenuNew.push(menu[i].subMenu[j]);
                                            }
                                        }
                                    }
                                    else {
                                        subMenuNew.push(menu[i].subMenu[j]);
                                    }
                                }
                                else {
                                    subMenuNew.push(menu[i].subMenu[j]);
                                }
                            }
                            else {
                                subMenuNew.push(menu[i].subMenu[j]);
                            }
                        }
                        var menunewcnt = menunew.length;
                        var subMenuNewcnt = subMenuNew.length;
                        menunew[menunewcnt - 1].subMenu = [];
                        for (var cnt = 0; cnt < subMenuNewcnt; cnt++) {
                            menunew[menunewcnt - 1].subMenu[cnt] = subMenuNew[cnt];
                        }
                    }
                }
            }
            callBack(menunew);
        });
    };
    /* *************************************************************************************************************** */
    GeneralFunctions.prototype.checkForUnhandledErrors = function (resultData) {
        var checkValid = true;
        if (resultData) {
            if (resultData["Data"]) {
                if (resultData["Data"]["StatusId"] == "-9999") {
                    var isIE11 = /msie|Trident/.test(navigator.userAgent);
                    if (isIE11 == false) {
                        window.BrowserName = "IE11";
                        var baseUrl = window.document.baseURI;
                    }
                    else {
                        var baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';
                    }
                    if (baseUrl.includes("undefined/")) {
                        baseUrl.replace("undefined/", "");
                    }
                    var logoutUrl = baseUrl + "/Account/LogOff";
                    window.location.href = logoutUrl;
                    checkValid = false;
                }
            }
            else if (resultData["StatusId"]) {
                if (resultData["StatusId"] == "-9999") {
                    var isIE11 = /msie|Trident/.test(navigator.userAgent);
                    if (isIE11 == false) {
                        window.BrowserName = "IE11";
                        var baseUrl = window.document.baseURI;
                    }
                    else {
                        var baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';
                    }
                    if (baseUrl.includes("undefined/")) {
                        baseUrl.replace("undefined/", "");
                    }
                    var logoutUrl = baseUrl + "/Account/LogOff";
                    window.location.href = logoutUrl;
                    checkValid = false;
                }
            }
        }
        return checkValid;
    };
    GeneralFunctions.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    return GeneralFunctions;
}());
exports.GeneralFunctions = GeneralFunctions;
//# sourceMappingURL=General.js.map