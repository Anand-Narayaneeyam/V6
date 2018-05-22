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
var EmployeeTrendReportViewer = (function () {
    function EmployeeTrendReportViewer(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.snapshotId = 0;
        this.reportType = 0;
        this.reportTitle = "";
    }
    EmployeeTrendReportViewer.prototype.ngOnInit = function () {
        this.LoadReportData();
    };
    EmployeeTrendReportViewer.prototype.LoadReportData = function () {
        this.pagePath = "Employees / Snapshots";
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId = 0;
        this.ReportData.ExportFileName = this.reportTitle;
        this.ReportData.ReportTitle = this.reportTitle;
        this.ReportData.ReportSubTitle = "";
        this.ReportData.ReportsTypeId = this.reportType;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 2483,
            Value: this.snapshotId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    };
    EmployeeTrendReportViewer = __decorate([
        core_1.Component({
            selector: 'employee-trend-reportviewer',
            templateUrl: './app/Views/Employee/TrendAnalysis/TrendReport/employee.trend.reportviewer.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService],
            inputs: ['snapshotId', 'reportType', 'reportTitle']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], EmployeeTrendReportViewer);
    return EmployeeTrendReportViewer;
}());
exports.EmployeeTrendReportViewer = EmployeeTrendReportViewer;
//# sourceMappingURL=employee.trend.reportviewer.js.map