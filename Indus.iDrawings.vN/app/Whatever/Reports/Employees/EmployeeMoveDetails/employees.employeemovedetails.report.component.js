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
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var common_service_1 = require('../../../../Models/reports/common.service');
var dropdownlistcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var schedule_report_addedit_component_1 = require('../../../Common/ScheduleReport/schedule-report-addedit.component');
var common_service_2 = require('../../../../Models/Common/common.service');
var customreport_addedit_component_1 = require('../../../common/custom reports/customreport-addedit.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var EmployeeMoveDetailsComponent = (function () {
    function EmployeeMoveDetailsComponent(reportservice, commonService, notificationService) {
        this.reportservice = reportservice;
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.StatusId = "0";
        this.EmployeeId = "0";
        this.ToDate = "";
        this.FromDate = "";
        this.dateSelectorField = undefined;
        this.ddlmoveStatus = undefined;
        this.ddlemployee = undefined;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.showSheduleReportAddEdit = false;
        this.reportCatId = 299;
        this.IsCustomRprt = 0;
        this.hasScheduledReport = false;
        this.showCustomize = false;
        this.needModulePrefix = 0;
        this.isFromCorrectionProject = 0;
        this.showMyDef = true;
        this.showSetMyDef = true;
        this.IsMobile = window["IsMobile"];
    }
    EmployeeMoveDetailsComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        //contexObj.reportservice.getddlemployeemove().subscribe(function (resultData1) {
        //    contexObj.ddlmoveStatus = resultData1.Data[2];
        //    contexObj.ddlemployee = resultData1.Data[3];
        //    var tempArray = new Array();
        //    tempArray.push(resultData1.Data[0]);
        //    tempArray.push(resultData1.Data[1]);
        //    contexObj.dateSelectorField = tempArray;
        //    contexObj.dateSelectorField[0].IsMandatory = false;
        //    contexObj.dateSelectorField[1].IsMandatory = false;
        //});
        contexObj.LoadReportData(0);
        contexObj.checkForScheduledReport();
    };
    EmployeeMoveDetailsComponent.prototype.LoadReportData = function (IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId = 299;
        this.ReportData.ExportFileName = "Employee Move Details";
        this.ReportData.ReportTitle = "Employee Move Details";
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
            ReportFieldId: 1992,
            Value: this.StatusId.toString()
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
            ReportFieldId: 866,
            Value: this.EmployeeId.toString()
        });
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Employees / Employee Move Details";
    };
    EmployeeMoveDetailsComponent.prototype.getDateData = function (event) {
    };
    EmployeeMoveDetailsComponent.prototype.checkForScheduledReport = function () {
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
    EmployeeMoveDetailsComponent.prototype.showSheduleReport = function (event) {
        debugger;
        var contextObj = this;
        contextObj.splitviewInput.secondaryArea = 90;
        contextObj.showCustomize = false;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.showSheduleReportAddEdit = true;
    };
    EmployeeMoveDetailsComponent.prototype.handleInsertSuccess = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    EmployeeMoveDetailsComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
    };
    EmployeeMoveDetailsComponent.prototype.customizeClick = function (event) {
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
    EmployeeMoveDetailsComponent.prototype.applyCustomRptClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    };
    EmployeeMoveDetailsComponent = __decorate([
        core_1.Component({
            selector: 'employee-MoveDetailsReport',
            templateUrl: './app/Views/Reports/Employee/EmployeeMoveDetails/employees.employeemovedetails.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, datecomponent_component_1.DateComponent, split_view_component_1.SplitViewComponent, dropdownlistcomponent_component_1.DropDownListComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService],
            styleUrls: ['app/Views/Reports/Employee/EmployeeMoveDetails/employeemove.css'],
            inputs: ['StatusId', 'EmployeeId', 'ToDate', 'FromDate']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService])
    ], EmployeeMoveDetailsComponent);
    return EmployeeMoveDetailsComponent;
}());
exports.EmployeeMoveDetailsComponent = EmployeeMoveDetailsComponent;
//# sourceMappingURL=employees.employeemovedetails.report.component.js.map