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
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var EmployeeOrgLevel1 = (function () {
    function EmployeeOrgLevel1(commonreportservice, employeeService) {
        this.commonreportservice = commonreportservice;
        this.employeeService = employeeService;
        this.ExportFileName = "Trend Analysis - Seating Capacity by Organizational";
        this.ReportTitle = "Trend Analysis - Seating Capacity by Organizational";
        this.pagePath = "Employees / Organizational";
        this.LevelNameCustomized = "";
        this.OrgUnitId = "0";
        this.FromDate = "";
        this.ToDate = "";
        this.ForcastToYear = "0";
        this.ForcastByPercentage = "0";
    }
    EmployeeOrgLevel1.prototype.ngOnInit = function () {
        var contexObj = this;
        this.employeeService.getOrgLevelCustomizedName().subscribe(function (resultData) {
            if (resultData.Data != undefined) {
                var LevelNames = JSON.parse(resultData.Data);
                contexObj.LevelNameCustomized = LevelNames[0].L1Caption;
                if (contexObj.LevelNameCustomized != "") {
                    contexObj.pagePath = "Employees / Seating Capacities by " + contexObj.LevelNameCustomized;
                }
            }
            setTimeout(function () {
                contexObj.LoadReportData();
            }, 50);
        });
    };
    EmployeeOrgLevel1.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId = 322;
        this.ReportData.ExportFileName = "Trend Analysis - Seating Capacity by " + this.LevelNameCustomized;
        this.ReportData.ReportSubTitle = "";
        this.ReportData.ReportTitle = "Trend Analysis - Seating Capacity by " + this.LevelNameCustomized;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1965,
            Value: this.OrgUnitId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.FromDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.ToDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 7907,
            Value: this.ForcastToYear.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 5080,
            Value: this.ForcastByPercentage.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    };
    EmployeeOrgLevel1 = __decorate([
        core_1.Component({
            selector: 'EmployeeOrgLevel1',
            template: "\n    <page *ngIf=\"LevelNameCustomized != undefined\" [pagetitle]=\"pagePath\">\n        <content>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n        </content>\n    </page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService, employee_services_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, employee_services_1.EmployeeService])
    ], EmployeeOrgLevel1);
    return EmployeeOrgLevel1;
}());
exports.EmployeeOrgLevel1 = EmployeeOrgLevel1;
//# sourceMappingURL=employee.orglevel1.js.map