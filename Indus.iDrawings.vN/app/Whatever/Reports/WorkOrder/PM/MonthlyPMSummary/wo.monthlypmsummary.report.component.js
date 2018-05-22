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
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var common_service_1 = require('../../../../../Models/reports/common.service');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var split_view_component_1 = require('../../../../../Framework/Whatever/Split-View/split-view.component');
var customreport_addedit_component_1 = require('../../../../common/custom reports/customreport-addedit.component');
var common_service_2 = require('../../../../../Models/Common/common.service');
var notify_service_1 = require('../../../../../Framework/Models/Notification/notify.service');
var WOMonthlyPMSummaryReportComponent = (function () {
    function WOMonthlyPMSummaryReportComponent(commonreportservice, commonService, notificationService) {
        this.commonreportservice = commonreportservice;
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.ddlRecurrencePattern = undefined;
        this.IsSummarybool = false;
        this.EquipmentCategoryId = 39;
        this.EquipmentClassId = -1;
        this.EquipmentNoId = 0;
        this.RecurrencePatternId = 0;
        this.WorkTypeId = 67;
        this.StatusId = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.pageTitle = "Customize Report";
        this.needModulePrefix = 1;
        this.isFromCorrectionProject = 0;
        this.showMyDef = true;
        this.showSetMyDef = true;
        this.IsCustomize = 0;
        this.IsMobile = window["IsMobile"];
    }
    WOMonthlyPMSummaryReportComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.commonreportservice.ddlRecurrencePattern().subscribe(function (resultData) {
            contextObj.ddlRecurrencePattern = resultData.Data[0];
            contextObj.ddlRecurrencePattern.FieldValue = "27";
            contextObj.ddlRecurrencePattern.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });
        });
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / PM Work Orders / Monthly PM Summary";
        contextObj.LoadReportData(0);
    };
    WOMonthlyPMSummaryReportComponent.prototype.LoadReportData = function (Customize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 391;
        this.ReportData.ReportSubTitle = "";
        if (this.IsSummarybool == false) {
            this.ReportData.ReportCategoryId = 391;
            this.ReportData.ExportFileName = "Summary Report";
            this.ReportData.ReportTitle = "Summary Report";
            switch (this.RecurrencePatternId) {
                case "0":
                    this.ReportData.ExportFileName = "Summary Report";
                    this.ReportData.ReportTitle = "Summary Report";
                    break;
                case "1":
                    this.ReportData.ExportFileName = "Summary Report - Daily";
                    this.ReportData.ReportTitle = "Summary Report - Daily";
                    break;
                case "2":
                    this.ReportData.ExportFileName = "Summary Report - Weekly";
                    this.ReportData.ReportTitle = "Summary Report - Weekly";
                    break;
                case "3":
                    this.ReportData.ExportFileName = "Summary Report - Monthly";
                    this.ReportData.ReportTitle = "Summary Report - Monthly";
                    break;
                case "4":
                    this.ReportData.ExportFileName = "Summary Report - Yearly";
                    this.ReportData.ReportTitle = "Summary Report - Yearly";
            }
        }
        else if (this.IsSummarybool == true) {
            this.ReportData.ReportCategoryId = 392;
            this.ReportData.ExportFileName = "Details Report";
            this.ReportData.ReportTitle = "Details Report";
            switch (this.RecurrencePatternId) {
                case "0":
                    this.ReportData.ExportFileName = "Details Report";
                    this.ReportData.ReportTitle = "Details Report";
                    break;
                case "1":
                    this.ReportData.ExportFileName = "Details Report - Daily";
                    this.ReportData.ReportTitle = "Details Report - Daily";
                    break;
                case "2":
                    this.ReportData.ExportFileName = "Details Report - Weekly";
                    this.ReportData.ReportTitle = "Details Report - Weekly";
                    break;
                case "3":
                    this.ReportData.ExportFileName = "Details Report - Monthly";
                    this.ReportData.ReportTitle = "Details Report - Monthly";
                    break;
                case "4":
                    this.ReportData.ExportFileName = "Details Report - Yearly";
                    this.ReportData.ReportTitle = "Details Report - Yearly";
            }
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
            ReportFieldId: 6374,
            Value: this.EquipmentCategoryName.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4153,
            Value: this.EquipmentClassName.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 6377,
            Value: this.EquipmentNoName.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 5577,
            Value: this.DateRange.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 3896,
            Value: this.WorkTypeName.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 7632,
            Value: this.EquipmentCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4140,
            Value: this.EquipmentClassId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4141,
            Value: this.EquipmentNoId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 5573,
            Value: this.RecurrencePatternId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 5861,
            Value: this.WorkTypeId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 500076,
            Value: this.ScheduledFromDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 500077,
            Value: this.ScheduledToDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1992,
            Value: this.StatusId.toString()
        });
        if (Customize == 1) {
            this.IsCustomize = 1;
            this.ReportData.IsCustomize = 1;
        }
        else {
            this.IsCustomize = 0;
            this.ReportData.IsCustomize = 0;
        }
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    WOMonthlyPMSummaryReportComponent.prototype.onChangeType = function (event) {
        switch (event) {
            case "27":
                this.RecurrencePatternId = "0";
                break;
            case "28":
                this.RecurrencePatternId = "1";
                break;
            case "29":
                this.RecurrencePatternId = "3";
                break;
            case "30":
                this.RecurrencePatternId = "2";
                break;
            case "31":
                this.RecurrencePatternId = "4";
                break;
            default:
                this.RecurrencePatternId = "0";
                break;
        }
        var contextObj = this;
        contextObj.ReportData = undefined;
        setTimeout(function () {
            contextObj.LoadReportData(contextObj.IsCustomize);
        }, 50);
    };
    WOMonthlyPMSummaryReportComponent.prototype.onSubmit = function (event) {
        this.IsSummarybool = !this.IsSummarybool;
        var contextObj = this;
        contextObj.ReportData = undefined;
        setTimeout(function () {
            contextObj.LoadReportData(contextObj.IsCustomize);
        }, 50);
    };
    WOMonthlyPMSummaryReportComponent.prototype.customizeClick = function (event) {
        var contextObj = this;
        var isLoadAddEdit = true;
        contextObj.commonService.loadCustomRptAddEditCol().subscribe(function (result) {
            contextObj.fieldObjectAddEdit = result["Data"]; //filter(function (item) { return item.FieldId != 1625 });
        });
        var listParams = new Array();
        listParams.push({ ReportFieldId: 353, Value: this.ReportData.ModuleId }, { ReportFieldId: 346, Value: this.ReportData.ReportCategoryId }, { ReportFieldId: 3792, Value: this.needModulePrefix }, { ReportFieldId: 1243, Value: this.isFromCorrectionProject }, { ReportFieldId: 66, Value: "" }, { ReportFieldId: 4491, Value: this.EquipmentCategoryId });
        contextObj.listFieldDetails = JSON.parse(JSON.stringify(listParams));
        contextObj.commonService.loadCustomizeReportData(JSON.stringify(listParams), 0, false).subscribe(function (result) {
            contextObj.itemsSourceAddEdit = JSON.parse(result);
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    WOMonthlyPMSummaryReportComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    WOMonthlyPMSummaryReportComponent.prototype.applyCustomRptClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    };
    WOMonthlyPMSummaryReportComponent = __decorate([
        core_1.Component({
            selector: 'wo-monthlypmsummary-report',
            templateUrl: './app/Views/Reports/WorkOrder/PM/MonthlyPMSummary/wo.monthlypmsummary.report.component.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, dropdownlistcomponent_component_1.DropDownListComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService],
            inputs: ['ScheduledFromDate', 'ScheduledToDate', 'DateRange', 'WorkTypeId', 'EquipmentCategoryId', 'EquipmentClassId', 'EquipmentNoId', 'EquipmentCategoryName', 'EquipmentClassName', 'EquipmentNoName', 'WorkTypeName', 'StatusId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService])
    ], WOMonthlyPMSummaryReportComponent);
    return WOMonthlyPMSummaryReportComponent;
}());
exports.WOMonthlyPMSummaryReportComponent = WOMonthlyPMSummaryReportComponent;
//# sourceMappingURL=wo.monthlypmsummary.report.component.js.map