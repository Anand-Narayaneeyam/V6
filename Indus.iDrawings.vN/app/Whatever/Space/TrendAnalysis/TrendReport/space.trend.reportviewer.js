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
var reportviewercomponent_1 = require('../../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var common_service_1 = require('../../../../Models/reports/common.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var SpaceTrendReportViewer = (function () {
    function SpaceTrendReportViewer(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.showButton = false;
        this.snapshotId = 0;
        this.reportType = 0;
        this.fromDate = "";
        this.toDate = "";
        this.reportTitle = "";
        this.IsHistorybool = false;
        this.IsHistory = 0;
        this.divRptMargin = "0px";
    }
    SpaceTrendReportViewer.prototype.ngOnInit = function () {
        this.pagePath = this.pagePath;
        if (this.reportType == 11 || this.reportType == 12 || this.reportType == 13 || this.reportType == 14) {
            this.showButton = true;
            this.divRptMargin = "45px";
        }
        else {
            this.showButton = false;
        }
        this.LoadReportData();
    };
    SpaceTrendReportViewer.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 0;
        this.ReportData.ExportFileName = this.reportTitle;
        this.ReportData.ReportTitle = this.reportTitle;
        this.ReportData.ReportSubTitle = "";
        this.ReportData.ReportsTypeId = this.reportType;
        if (this.IsHistorybool == false) {
            this.IsHistory = 0;
        }
        else if (this.IsHistorybool == true) {
            this.IsHistory = 11;
        }
        if (this.showButton == true) {
            this.ReportData.ReportSubTitle = "Trend Period: " + this.fromDate + " to " + this.toDate;
        }
        else {
            this.ReportData.ReportSubTitle = "";
        }
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4307,
            Value: this.IsHistory.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.fromDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.toDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 2483,
            Value: this.snapshotId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    };
    SpaceTrendReportViewer.prototype.onSubmit = function (event) {
        this.IsHistorybool = !this.IsHistorybool;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);
    };
    SpaceTrendReportViewer = __decorate([
        core_1.Component({
            selector: 'space-trend-reportviewer',
            templateUrl: './app/Views/Space/TrendAnalysis/TrendReport/space.trend.reportviewer.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService],
            inputs: ['snapshotId', 'reportType', 'fromDate', 'toDate', 'reportTitle', 'pagePath']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], SpaceTrendReportViewer);
    return SpaceTrendReportViewer;
}());
exports.SpaceTrendReportViewer = SpaceTrendReportViewer;
//# sourceMappingURL=space.trend.reportviewer.js.map