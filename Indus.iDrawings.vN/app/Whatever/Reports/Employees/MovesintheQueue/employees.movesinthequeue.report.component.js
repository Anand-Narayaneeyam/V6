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
var customreport_addedit_component_1 = require('../../../common/custom reports/customreport-addedit.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var EmployeesMovesintheQueueComponent = (function () {
    function EmployeesMovesintheQueueComponent(commonService, notificationService) {
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.reportCatId = 54;
        this.IsCustomRprt = 0;
        this.hasScheduledReport = false;
        this.needModulePrefix = 0;
        this.isFromCorrectionProject = 0;
        this.showMyDef = true;
        this.showSetMyDef = true;
        this.IsMobile = window["IsMobile"];
    }
    EmployeesMovesintheQueueComponent.prototype.ngOnInit = function () {
        var CommonService;
        this.LoadReportData(0);
        this.pagePath = "Reports / Employees / Moves in the Queue";
        this.checkForScheduledReport();
    };
    EmployeesMovesintheQueueComponent.prototype.LoadReportData = function (IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId = 54;
        this.ReportData.ExportFileName = "EmployeeMoveDetailsReport(MovesintheQueue)";
        this.ReportData.ReportTitle = "Employee Move Details Report (Moves in the Queue)";
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
            ReportFieldId: 3356,
            Value: "1"
        });
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    };
    EmployeesMovesintheQueueComponent.prototype.showSheduleReport = function (event) {
        debugger;
        var contextObj = this;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.showSheduleReportAddEdit = true;
        this.showCustomize = false;
        contextObj.splitviewInput.secondaryArea = 70;
    };
    EmployeesMovesintheQueueComponent.prototype.handleInsertSuccess = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    EmployeesMovesintheQueueComponent.prototype.checkForScheduledReport = function () {
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
    EmployeesMovesintheQueueComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
    };
    EmployeesMovesintheQueueComponent.prototype.customizeClick = function (event) {
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
        listParams.push({ ReportFieldId: 353, Value: this.ReportData.ModuleId }, { ReportFieldId: 346, Value: this.ReportData.ReportCategoryId }, { ReportFieldId: 3792, Value: this.needModulePrefix }, { ReportFieldId: 1243, Value: this.isFromCorrectionProject }, { ReportFieldId: 66, Value: "" });
        contextObj.listFieldDetails = JSON.parse(JSON.stringify(listParams));
        contextObj.commonService.loadCustomizeReportData(JSON.stringify(listParams), 0, false).subscribe(function (result) {
            contextObj.itemsSourceAddEdit = JSON.parse(result);
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    EmployeesMovesintheQueueComponent.prototype.applyCustomRptClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    };
    EmployeesMovesintheQueueComponent = __decorate([
        core_1.Component({
            selector: 'employees-MovesintheQueueReport',
            templateUrl: './app/Views/Reports/Employee/MovesintheQueue/employees.movesinthequeue.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit, split_view_component_1.SplitViewComponent, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [common_service_1.CommonService, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, notify_service_1.NotificationService])
    ], EmployeesMovesintheQueueComponent);
    return EmployeesMovesintheQueueComponent;
}());
exports.EmployeesMovesintheQueueComponent = EmployeesMovesintheQueueComponent;
//# sourceMappingURL=employees.movesinthequeue.report.component.js.map