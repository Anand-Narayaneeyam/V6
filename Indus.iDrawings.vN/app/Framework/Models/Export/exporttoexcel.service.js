var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var HttpHelpers_1 = require('../../../Whatever/utils/HttpHelpers');
var http_1 = require('@angular/http');
var General_1 = require('../../../Models/Common/General');
var ExportToExcel = (function (_super) {
    __extends(ExportToExcel, _super);
    function ExportToExcel(http) {
        _super.call(this, http);
        this.http = http;
        this.ExportToExcel = 'Common/ExportToExcel';
        this.CommonListExport = "Common/GetAppFormDataListExport";
        this.ListObjectSpaceDataUrl = 'Object/GetObjectsSpaceDetailsExport';
        this.employeeListDataListUrl = 'Employee/GetEmployeeListExport';
        this.getSpaceDataUrl = 'Space/GetAllSharedSpaceDetailsExport';
        this.getLogDataUrl = 'Logbook/GetLogDetailsExport';
        this.GetQueryBuilderSeachResultExportUrl = 'Common/GetQueryBuilderSeachResultExport';
        this.GetQueryBuilderSearchResultsForObjectsExport = 'Common/GetQueryBuilderSearchResultsForObjectsExport';
        this.ExportDataFromServer = function (input, target, fileName, resCallback) {
            var contextObj = this;
            contextObj.exportToExcel(input, target).subscribe(function (resultData) {
                /*debugger*/
                /*   bytes    */
                contextObj.strFileName = fileName + ".xlsx";
                if (resultData._body == "Data is Null") {
                    resCallback(-1);
                }
                else if (resultData._body == "-9999" || resultData._body == "") {
                    var objGeneralFunc = new General_1.GeneralFunctions();
                    objGeneralFunc.checkForUnhandledErrors({ StatusId: "-9999" });
                }
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);
                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                            window.navigator.msSaveOrOpenBlob(blob, contextObj.strFileName);
                        }
                        else if (isSafari) {
                            contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);
                        }
                        else {
                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", contextObj.strFileName);
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }
                        resCallback(0);
                    }
                    catch (ex) {
                        resCallback(-1);
                        console.log(ex);
                    }
                }
            });
        };
        this.ExportData = function (dataSource, fieldObjects, fileName, resCallback) {
            var contextObj = this;
            var fields = fieldObjects;
            var Datasource = dataSource;
            // var json = JSON.parse(Datasource);
            var filterArray11 = [];
            var singlecheck = fieldObjects.filter(function (item) {
                if (item.IsVisible == true) {
                    filterArray11.push(item.FieldLabel);
                    return true;
                }
                else
                    return false;
            });
            contextObj.exportToExcelHighlighted(dataSource, fileName, filterArray11).subscribe(function (resultData) {
                //   bytes    
                contextObj.strFileName = fileName + ".xlsx";
                if (resultData._body == "Data is Null") {
                    resCallback(-1);
                }
                else if (resultData._body == "-9999" || resultData._body == "") {
                    var objGeneralFunc = new General_1.GeneralFunctions();
                    objGeneralFunc.checkForUnhandledErrors({ StatusId: "-9999" });
                }
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);
                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                            window.navigator.msSaveOrOpenBlob(blob, contextObj.strFileName);
                        }
                        else if (isSafari) {
                            contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);
                        }
                        else {
                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", contextObj.strFileName);
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }
                        resCallback(0);
                    }
                    catch (ex) {
                        resCallback(-1);
                        console.log(ex);
                    }
                }
            });
        };
    }
    ExportToExcel.prototype.exportToExcel = function (data, target) {
        var contextObj = this;
        if (target == 1)
            return contextObj.downloadaction(data, contextObj.CommonListExport);
        else if (target == 2)
            return contextObj.downloadaction(data, contextObj.ListObjectSpaceDataUrl);
        else if (target == 3)
            return contextObj.downloadaction(data, contextObj.employeeListDataListUrl);
        else if (target == 4)
            return contextObj.downloadaction(data, contextObj.getSpaceDataUrl);
        else if (target == 5)
            return contextObj.downloadaction(data, contextObj.getLogDataUrl);
        else if (target == 6)
            return contextObj.downloadaction(data, contextObj.GetQueryBuilderSeachResultExportUrl);
        else if (target == 7)
            return contextObj.downloadaction(data, contextObj.GetQueryBuilderSearchResultsForObjectsExport);
    };
    ExportToExcel.prototype.exportToExcelHighlighted = function (data, fileName, fieldsObjects) {
        var contextObj = this;
        return contextObj.downloadaction({ Input: data, fileName: fileName, fields: fieldsObjects, baseClassInput: null }, contextObj.ExportToExcel);
    };
    ExportToExcel.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    ExportToExcel = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ExportToExcel);
    return ExportToExcel;
}(HttpHelpers_1.HttpHelpers));
exports.ExportToExcel = ExportToExcel;
//# sourceMappingURL=exporttoexcel.service.js.map