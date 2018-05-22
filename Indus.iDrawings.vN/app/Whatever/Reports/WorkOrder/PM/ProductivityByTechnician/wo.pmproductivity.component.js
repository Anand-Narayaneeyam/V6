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
var reportviewercomponent_1 = require('../../../../../Framework/Whatever/ReportViewer/reportviewercomponent');
var common_service_1 = require('../../../../../Models/reports/common.service');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var split_view_component_1 = require('../../../../../Framework/Whatever/Split-View/split-view.component');
var common_service_2 = require('../../../../../Models/Common/common.service');
var schedule_report_addedit_component_1 = require('../../../../Common/ScheduleReport/schedule-report-addedit.component');
var WOPMProductivityReportComponent = (function () {
    function WOPMProductivityReportComponent(commonreportservice, commonService) {
        this.commonreportservice = commonreportservice;
        this.commonService = commonService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.WorkTypeId = 0;
        this.TradeId = 0;
        this.TechnicianId = 0;
        this.reportCatId = 140;
        this.IsCustomRprt = 0;
        this.hasScheduledReport = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.showSheduleReportAddEdit = false;
    }
    WOPMProductivityReportComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / PM Work Orders / Work Order Productivity by Technician";
        contextObj.LoadReportData();
        contextObj.checkForScheduledReport();
    };
    WOPMProductivityReportComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 140;
        this.ReportData.ExportFileName = "Work Order Productivity by Technician";
        this.ReportData.ReportTitle = "Work Order Productivity by Technician";
        this.ReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1416,
            Value: this.WorkTypeId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1388,
            Value: this.TradeId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 7503,
            Value: this.TechnicianId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    WOPMProductivityReportComponent.prototype.checkForScheduledReport = function () {
        var contextObj = this;
        contextObj.commonService.CheckHasScheduledReport(contextObj.reportCatId, contextObj.IsCustomRprt).subscribe(function (result) {
            debugger;
            if (result.ServerId == 1) {
                contextObj.hasScheduledReport = true;
            }
            else {
                contextObj.hasScheduledReport = false;
            }
        });
    };
    WOPMProductivityReportComponent.prototype.showSheduleReport = function (event) {
        debugger;
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    };
    WOPMProductivityReportComponent.prototype.handleInsertSuccess = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    WOPMProductivityReportComponent = __decorate([
        core_1.Component({
            selector: 'wo-pmproductivity-report',
            template: "\n<page [pagetitle]=\"pagePath\">\n    <content>\n        <split-view [splitviewObject]=\"splitviewInput\" [pageTitle]=\"pageTitle\" (onSecondaryClose)=\"onSplitViewClose($event)\">\n            <primary-view>\n\n        <div style=\"width:100%;height:100%\" *ngIf=\"ReportData != undefined\">\n        <div *ngIf=\"!IsTextType\" style=\"padding-left: 1%;margin-top:9px;display:inline-flex;\">                        \n                        <div *ngIf=\"hasScheduledReport\">\n                            <button class=\"Savebutton \" style=\"margin-right:5px;\" type=\"button\" (click)=\"showSheduleReport($event)\">Schedule this report</button>\n                        </div>\n                    </div>\n        <reportviewer [reportData]=ReportData > Loading ...</reportviewer>\n        </div>\n\n            </primary-view>\n            <secondary-view *ngIf=\"showSheduleReportAddEdit && splitviewInput.showSecondaryView == true && ReportData.ExportFileName!='' \">\n                <schedule-report-addedit [reportData]=\"ReportData\" (insertSuccess)=\"handleInsertSuccess($event)\"></schedule-report-addedit>\n            </secondary-view>\n            </split-view>\n</content>\n</page>\n    ",
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService],
            inputs: ['TradeId', 'TechnicianId', 'WorkTypeId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService])
    ], WOPMProductivityReportComponent);
    return WOPMProductivityReportComponent;
}());
exports.WOPMProductivityReportComponent = WOPMProductivityReportComponent;
//# sourceMappingURL=wo.pmproductivity.component.js.map