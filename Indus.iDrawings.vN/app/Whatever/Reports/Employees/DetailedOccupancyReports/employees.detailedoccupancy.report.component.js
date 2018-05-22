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
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var schedule_report_addedit_component_1 = require('../../../Common/ScheduleReport/schedule-report-addedit.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var common_service_1 = require('../../../../Models/Common/common.service');
var EmployeesDetailedOccupancyReportsComponent = (function () {
    function EmployeesDetailedOccupancyReportsComponent(commonService) {
        this.commonService = commonService;
        this.showSheduleReportAddEdit = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.reportCatId = 100;
        this.IsCustomRprt = 0;
        this.hasScheduledReport = false;
    }
    EmployeesDetailedOccupancyReportsComponent.prototype.ngOnInit = function () {
        var CommonService;
        this.ReportData = new EmployeesDetailedOccupancyReportsComponent(CommonService);
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId = 100;
        this.ReportData.ReportTitle = "Detailed Occupancy Report";
        this.ReportData.ReportSubTitle = "";
        switch (this.reportBy) {
            case 1:
                this.ReportData.ReportTitle = "Detailed Occupancy Report by Site ";
                this.ReportData.ExportFileName = "Detailed Occupancy Report by Site ";
                break;
            case 2:
                this.ReportData.ReportTitle = "Detailed Occupancy Report by Building";
                this.ReportData.ExportFileName = "Detailed Occupancy Report by Building";
                break;
            case 3:
                this.ReportData.ReportTitle = "Detailed Occupancy Report by Floor ";
                this.ReportData.ExportFileName = "Detailed Occupancy Report by Floor ";
                break;
            case 14:
                this.ReportData.ReportTitle = "Detailed Occupancy Report by " + this.orgName;
                ;
                this.ReportData.ExportFileName = "Detailed Occupancy Report by " + this.orgName;
                this.reportBy = 4;
                break;
            default:
                this.ReportData.ReportTitle = "Detailed Occupancy Report by Floor";
                this.ReportData.ExportFileName = "Detailed Occupancy Report by Floor";
                break;
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
            ReportFieldId: 3356,
            Value: this.reportBy.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 3650,
            Value: this.Ids.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 3455,
            Value: "1"
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Employees / Detailed Occupancy";
        this.checkForScheduledReport();
    };
    EmployeesDetailedOccupancyReportsComponent.prototype.showSheduleReport = function (event) {
        debugger;
        var contextObj = this;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.showSheduleReportAddEdit = true;
    };
    EmployeesDetailedOccupancyReportsComponent.prototype.handleInsertSuccess = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    EmployeesDetailedOccupancyReportsComponent.prototype.checkForScheduledReport = function () {
        var contextObj = this;
        contextObj.commonService.CheckHasScheduledReport(contextObj.reportCatId, contextObj.IsCustomRprt).subscribe(function (result) {
            if (result.ServerId == 1) {
                contextObj.hasScheduledReport = true;
            }
            else {
                contextObj.hasScheduledReport = false;
            }
        });
    };
    EmployeesDetailedOccupancyReportsComponent = __decorate([
        core_1.Component({
            selector: 'employees-DetailedOccupancyReport',
            template: "<page [pagetitle]=\"pagePath\">\n    <content>\n        <split-view [splitviewObject]=\"splitviewInput\" [pageTitle]=\"pageTitle\" (onSecondaryClose)=\"onSplitViewClose($event)\">\n            <primary-view>\n                <div *ngIf=\"hasScheduledReport\" style=\"height: 40px; padding-left: 1%; margin-top:9px; display:inline-flex;\">\n                    <button class=\"Savebutton \" style=\"margin-right:5px;\" type=\"button\" (click)=\"showSheduleReport($event)\">Schedule this report</button>\n                </div>\n                <div style=\"width:100%;height: calc(100% - 40px)\" *ngIf=\"ReportData != undefined\">\n                    <reportviewer [reportData]=ReportData> Loading ...</reportviewer>\n                </div>\n       </primary-view>\n            <secondary-view *ngIf=\"showSheduleReportAddEdit && splitviewInput.showSecondaryView == true && ReportData.ExportFileName!='' \">\n                <schedule-report-addedit [reportData]=\"ReportData\" (insertSuccess)=\"handleInsertSuccess($event)\"></schedule-report-addedit>\n            </secondary-view>\n            </split-view>\n</content>\n</page>\n\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit, split_view_component_1.SplitViewComponent],
            providers: [common_service_1.CommonService],
            inputs: ['Ids', 'reportBy', 'orgName']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService])
    ], EmployeesDetailedOccupancyReportsComponent);
    return EmployeesDetailedOccupancyReportsComponent;
}());
exports.EmployeesDetailedOccupancyReportsComponent = EmployeesDetailedOccupancyReportsComponent;
//# sourceMappingURL=employees.detailedoccupancy.report.component.js.map