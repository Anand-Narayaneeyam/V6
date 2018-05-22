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
var customreport_addedit_component_1 = require('../../../../common/custom reports/customreport-addedit.component');
var notify_service_1 = require('../../../../../Framework/Models/Notification/notify.service');
var WOPMScheduledForTodayReportComponent = (function () {
    function WOPMScheduledForTodayReportComponent(commonreportservice, commonService, notificationService) {
        this.commonreportservice = commonreportservice;
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.WorkTypeId = 0;
        this.reportCatId = 141;
        this.IsCustomRprt = 0;
        this.hasScheduledReport = false;
        this.showCustomize = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.showSheduleReportAddEdit = false;
        this.alterName = "";
        this.needModulePrefix = 1;
        this.isFromCorrectionProject = 0;
        this.showMyDef = false;
        this.showSetMyDef = false;
        this.IsMobile = window["IsMobile"];
    }
    WOPMScheduledForTodayReportComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / PM Work Orders / Work Orders Scheduled for Today";
        this.alterName = "PM Work Order - Work Orders Scheduled for Today";
        contextObj.LoadReportData(0);
        contextObj.checkForScheduledReport();
    };
    WOPMScheduledForTodayReportComponent.prototype.LoadReportData = function (IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 141;
        this.ReportData.ExportFileName = "Work Orders Scheduled for Today";
        this.ReportData.ReportTitle = "Work Orders Scheduled for Today";
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
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    WOPMScheduledForTodayReportComponent.prototype.checkForScheduledReport = function () {
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
    WOPMScheduledForTodayReportComponent.prototype.showSheduleReport = function (event) {
        debugger;
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
        this.showCustomize = false;
        contextObj.splitviewInput.secondaryArea = 90;
    };
    WOPMScheduledForTodayReportComponent.prototype.handleInsertSuccess = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    WOPMScheduledForTodayReportComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
    };
    WOPMScheduledForTodayReportComponent.prototype.customizeClick = function (event) {
        this.showSheduleReportAddEdit = false;
        var contextObj = this;
        var isLoadAddEdit = true;
        contextObj.showCustomize = true;
        contextObj.splitviewInput.secondaryArea = 79;
        contextObj.pageTitle = "Customize Report";
        contextObj.commonService.loadCustomRptAddEditCol().subscribe(function (result) {
            contextObj.fieldObjectAddEdit = result["Data"]; //filter(function (item) { return item.FieldId != 1625 });
        });
        var listParams = new Array();
        listParams.push({ ReportFieldId: 353, Value: this.ReportData.ModuleId }, { ReportFieldId: 346, Value: this.ReportData.ReportCategoryId }, { ReportFieldId: 3792, Value: this.needModulePrefix }, { ReportFieldId: 1243, Value: this.isFromCorrectionProject }, { ReportFieldId: 66, Value: "" }, { ReportFieldId: 6577, Value: this.WorkTypeId }, { ReportFieldId: 6558, Value: "3" });
        contextObj.listFieldDetails = JSON.parse(JSON.stringify(listParams));
        contextObj.commonService.loadCustomizeReportData(JSON.stringify(listParams), 0, false).subscribe(function (result) {
            contextObj.itemsSourceAddEdit = JSON.parse(result);
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    WOPMScheduledForTodayReportComponent.prototype.applyCustomRptClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    };
    WOPMScheduledForTodayReportComponent = __decorate([
        core_1.Component({
            selector: 'wo-pmscheduledfortoday-report',
            templateUrl: './app/Views/Reports/WorkOrder/PM/ScheduledForToday/wo.pmscheduledfortoday.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService],
            inputs: ['WorkTypeId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService])
    ], WOPMScheduledForTodayReportComponent);
    return WOPMScheduledForTodayReportComponent;
}());
exports.WOPMScheduledForTodayReportComponent = WOPMScheduledForTodayReportComponent;
//# sourceMappingURL=wo.pmscheduledfortoday.component.js.map