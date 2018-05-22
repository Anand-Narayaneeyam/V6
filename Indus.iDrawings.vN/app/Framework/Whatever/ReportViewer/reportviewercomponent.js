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
var common_service_1 = require('../../../Models/reports/common.service');
var viewer = null;
var element;
var currentZoom;
var reportName;
var documentFileName;
var Html5ViewerComponent = (function () {
    //ModuleId: any;
    //ReportCategoryId: any; 
    //ReportDetailId: any =0; 
    //CustomReportId: any =0; 
    //ReportFieldId: any =0; 
    function Html5ViewerComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
    }
    Html5ViewerComponent.prototype.initializeHtml5Viewer = function () {
        documentFileName = this.reportData.ExportFileName;
        var GrapeCity = window["GrapeCity"];
        GrapeCity.ActiveReports.onPDFExportClick = this.exportReportToPDF;
        GrapeCity.ActiveReports.onExcelExportClick = this.exportReportToExcel;
        GrapeCity.ActiveReports.onRTFExportClick = this.exportReportToRTF;
        GrapeCity.ActiveReports.onTextExportClick = this.exportReportToText;
        GrapeCity.ActiveReports.onZoomInClick = this.reportZoomIn;
        GrapeCity.ActiveReports.onZoomOutClick = this.reportZoomOut;
        viewer = GrapeCity.ActiveReports.Viewer({
            reportLoaded: function () {
                currentZoom = 1;
                reportName = documentFileName;
                $("#btnZoomIn").prop("disabled", false);
                $("#btnZoomOut").prop("disabled", false);
            },
            element: '#Viewer',
            reportService: {
                url: './app/CustomReportService.asmx'
            },
            uiType: 'custom',
            documentLoaded: function () {
            },
            error: function (error) {
                error["message"] = "iDrawings encountered a problem while executing your command";
                var isIE11 = /msie|Trident/.test(navigator.userAgent);
                if (isIE11 == false) {
                    window.BrowserName = "IE11";
                    this.IE11Staus = true;
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
            }
        });
        var reportOption = {
            id: JSON.stringify(this.reportData)
        };
        debugger;
        viewer.option('report', reportOption);
    };
    Html5ViewerComponent.prototype.ngOnInit = function () {
        //this.ModuleId = this.reportData.ModuleId;
        //this.ReportCategoryId = this.reportData.ReportCategoryId;
        //var contexObj = this;
        //contexObj.commonreportservice.getReportPrivilegeforUser(contexObj.ModuleId, contexObj.ReportDetailId, contexObj.ReportCategoryId, contexObj.CustomReportId, contexObj.ReportFieldId).subscribe(function (resultData) {
        //    if (resultData["Data"] == 1) {
        //         contexObj.initializeHtml5Viewer();
        //    }
        //    else {
        //        var logoutUrl = window.document.baseURI + "/Account/LogOff";
        //        window.location.href = logoutUrl;                
        //    }
        //});
        debugger;
        this.initializeHtml5Viewer();
    };
    Html5ViewerComponent.prototype.exportReportToPDF = function () {
        viewer.export('Pdf', function (uri) {
            window.location = uri;
        }, true, { FileName: documentFileName });
    };
    Html5ViewerComponent.prototype.exportReportToExcel = function () {
        viewer.export('Xls', function (uri) {
            window.location = uri;
        }, true, { FileName: documentFileName });
    };
    Html5ViewerComponent.prototype.exportReportToRTF = function () {
        viewer.export('Word', function (uri) {
            window.location = uri;
        }, true, { FileName: documentFileName, EnableShapes: true });
    };
    Html5ViewerComponent.prototype.exportReportToText = function () {
        //ToDo:
    };
    Html5ViewerComponent.prototype.reportZoomIn = function () {
        var repExt = reportName.substr(reportName.indexOf(".") + 1);
        if (repExt == "rdlx") {
            element = $(".document-view");
        }
        else {
            element = $(".document-view").find("div").eq(0).children("div");
        }
        currentZoom *= 1.1;
        element.css("zoom", currentZoom);
        element.css("-moz-transform", "Scale(" + currentZoom + ")");
        element.css("-moz-transform-origin", "0 0");
    };
    Html5ViewerComponent.prototype.reportZoomOut = function () {
        var repExt = reportName.substr(reportName.indexOf(".") + 1);
        if (repExt == "rdlx") {
            element = $(".document-view");
        }
        else {
            element = $(".document-view").find("div").eq(0).children("div");
        }
        if (currentZoom > 0.6) {
            currentZoom *= 0.9;
            element.css("zoom", currentZoom);
            element.css("-moz-transform", "Scale(" + currentZoom + ")");
            element.css("-moz-transform-origin", "0 0");
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Html5ViewerComponent.prototype, "reportData", void 0);
    Html5ViewerComponent = __decorate([
        core_1.Component({
            selector: 'reportviewer',
            templateUrl: 'app/Framework/Views/ReportViewer/reportviewertemplate.html',
            providers: [common_service_1.CommonReportService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], Html5ViewerComponent);
    return Html5ViewerComponent;
}());
exports.Html5ViewerComponent = Html5ViewerComponent;
//# sourceMappingURL=reportviewercomponent.js.map