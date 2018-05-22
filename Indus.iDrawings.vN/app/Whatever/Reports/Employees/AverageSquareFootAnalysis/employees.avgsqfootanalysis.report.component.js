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
var EmployeesAverageSquareFootAnalysisComponent = (function () {
    function EmployeesAverageSquareFootAnalysisComponent(commonService) {
        this.commonService = commonService;
        this.showSheduleReportAddEdit = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.reportCatId = 99;
        this.IsCustomRprt = 0;
        this.hasScheduledReport = false;
    }
    EmployeesAverageSquareFootAnalysisComponent.prototype.ngOnInit = function () {
        var CommonService;
        this.ReportData = new EmployeesAverageSquareFootAnalysisComponent(CommonService);
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId = 99;
        this.ReportData.ReportSubTitle = "";
        switch (this.reportBy) {
            case 1:
                this.ReportData.ReportTitle = "Average Square Foot Analysis by Site ";
                this.ReportData.ExportFileName = "Average Square Foot Analysis by Site ";
                break;
            case 2:
                this.ReportData.ReportTitle = "Average Square Foot Analysis by Building";
                this.ReportData.ExportFileName = "Average Square Foot Analysis by Building";
                break;
            case 3:
                this.ReportData.ReportTitle = "Average Square Foot Analysis by Floor ";
                this.ReportData.ExportFileName = "Average Square Foot Analysis by Floor ";
                break;
            case 14:
                this.ReportData.ReportTitle = "Average Square Foot Analysis by " + this.orgName;
                this.ReportData.ExportFileName = "Average Square Foot Analysis by " + this.orgName;
                this.reportBy = 4;
                break;
            default:
                this.ReportData.ReportTitle = "Average Square Foot Analysis by Floor";
                this.ReportData.ExportFileName = "Average Square Foot Analysis by Floor";
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
            ReportFieldId: 1960,
            Value: this.orgName.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Employees / Square Foot Analysis";
        this.checkForScheduledReport();
    };
    EmployeesAverageSquareFootAnalysisComponent.prototype.showSheduleReport = function (event) {
        debugger;
        var contextObj = this;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.showSheduleReportAddEdit = true;
    };
    EmployeesAverageSquareFootAnalysisComponent.prototype.handleInsertSuccess = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    EmployeesAverageSquareFootAnalysisComponent.prototype.checkForScheduledReport = function () {
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
    EmployeesAverageSquareFootAnalysisComponent = __decorate([
        core_1.Component({
            selector: 'employees-AverageSquareFootAnalysisReport',
            template: "<page [pagetitle]=\"pagePath\">\n    <content>\n        <split-view [splitviewObject]=\"splitviewInput\" [pageTitle]=\"pageTitle\" (onSecondaryClose)=\"onSplitViewClose($event)\">\n            <primary-view>\n            <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n            </div>\n         </primary-view>\n            <secondary-view *ngIf=\"showSheduleReportAddEdit && splitviewInput.showSecondaryView == true && ReportData.ExportFileName!='' \">\n                <schedule-report-addedit [reportData]=\"ReportData\" (insertSuccess)=\"handleInsertSuccess($event)\"></schedule-report-addedit>\n            </secondary-view>\n            </split-view>\n</content>\n</page>\n  ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit, split_view_component_1.SplitViewComponent],
            providers: [common_service_1.CommonService],
            inputs: ['Ids', 'reportBy', 'orgName']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService])
    ], EmployeesAverageSquareFootAnalysisComponent);
    return EmployeesAverageSquareFootAnalysisComponent;
}());
exports.EmployeesAverageSquareFootAnalysisComponent = EmployeesAverageSquareFootAnalysisComponent;
//# sourceMappingURL=employees.avgsqfootanalysis.report.component.js.map