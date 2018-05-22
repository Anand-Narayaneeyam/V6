import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import {DatePipe } from '@angular/common'
import { Http } from '@angular/http';
import { GeneralFunctions} from '../../../Models/Common/General';

@Injectable()
export class ExportToExcel extends HttpHelpers {
    private ExportToExcel = 'Common/ExportToExcel';
    private CommonListExport = "Common/GetAppFormDataListExport";
    private ListObjectSpaceDataUrl = 'Object/GetObjectsSpaceDetailsExport';
    private employeeListDataListUrl = 'Employee/GetEmployeeListExport';
    private getSpaceDataUrl = 'Space/GetAllSharedSpaceDetailsExport';
    private getLogDataUrl = 'Logbook/GetLogDetailsExport';
    private GetQueryBuilderSeachResultExportUrl = 'Common/GetQueryBuilderSeachResultExport';
    private GetQueryBuilderSearchResultsForObjectsExport = 'Common/GetQueryBuilderSearchResultsForObjectsExport';

    constructor(private http: Http) {
        super(http);
    }
    ExportDataFromServer = function (input, target, fileName, resCallback) {
        var contextObj = this;

        contextObj.exportToExcel(input, target).subscribe(function (resultData) {
            /*debugger*/
            /*   bytes    */
            contextObj.strFileName = fileName + ".xlsx";
            if (resultData._body == "Data is Null") {
                resCallback(-1);
            }
            else if (resultData._body == "-9999" || resultData._body == "") {
                var objGeneralFunc: GeneralFunctions = new GeneralFunctions();

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

                } catch (ex) {
                    resCallback(-1);
                    console.log(ex);
                }
            }
        });
    }
    exportToExcel(data: string, target: any) {

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
    }

    ExportData = function (dataSource, fieldObjects, fileName, resCallback) {
        var contextObj = this;
        var fields = fieldObjects;
        var Datasource = dataSource;
        // var json = JSON.parse(Datasource);
        let filterArray11 = [];
        var singlecheck = fieldObjects.filter(function (item) {
            if (item.IsVisible == true) {
                filterArray11.push(item.FieldLabel)
                return true;
            }
            else return false;

        });


        contextObj.exportToExcelHighlighted(dataSource, fileName, filterArray11).subscribe(function (resultData) {

            //   bytes    
            contextObj.strFileName = fileName + ".xlsx";
            if (resultData._body == "Data is Null") {
                resCallback(-1);
            }
            else if (resultData._body == "-9999" || resultData._body == "") {
                var objGeneralFunc: GeneralFunctions = new GeneralFunctions();
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

                } catch (ex) {
                    resCallback(-1);
                    console.log(ex);
                }
            }
        });
    }
    exportToExcelHighlighted(data: string, fileName: string, fieldsObjects: any) {

        var contextObj = this;
        return contextObj.downloadaction({ Input: data, fileName: fileName, fields: fieldsObjects, baseClassInput: null }, contextObj.ExportToExcel);
    }

    base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }


}