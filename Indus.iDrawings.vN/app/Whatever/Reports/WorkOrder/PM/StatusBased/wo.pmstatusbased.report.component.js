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
var customreport_addedit_component_1 = require('../../../../common/custom reports/customreport-addedit.component');
var common_service_2 = require('../../../../../Models/Common/common.service');
var notify_service_1 = require('../../../../../Framework/Models/Notification/notify.service');
var WOPMStatusBasedReportComponent = (function () {
    function WOPMStatusBasedReportComponent(commonreportservice, commonService, notificationService) {
        this.commonreportservice = commonreportservice;
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.EquipmentCategoryId = 39;
        this.EquipmentClassId = -1;
        this.EquipmentNoId = 0;
        this.WorkTypeId = 67;
        this.StatusId = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.pageTitle = "Customize Report";
        this.needModulePrefix = 1;
        this.isFromCorrectionProject = 0;
        this.showMyDef = false;
        this.showSetMyDef = false;
        this.IsMobile = window["IsMobile"];
    }
    WOPMStatusBasedReportComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / PM Work Orders / Status based Reports";
        contextObj.LoadReportData(0);
    };
    WOPMStatusBasedReportComponent.prototype.LoadReportData = function (IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 293;
        this.ReportData.ExportFileName = this.StatusName;
        this.ReportData.ReportTitle = this.StatusName;
        this.ReportData.ReportSubTitle = this.DateRange;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4491,
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
            ReportFieldId: 5873,
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
            ReportFieldId: 1490,
            Value: this.StatusId.toString()
        });
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    WOPMStatusBasedReportComponent.prototype.onSubmit = function (event) {
        var contextObj = this;
        contextObj.ReportData = undefined;
        setTimeout(function () {
            contextObj.LoadReportData(0);
        }, 50);
    };
    WOPMStatusBasedReportComponent.prototype.customizeClick = function (event) {
        var contextObj = this;
        var isLoadAddEdit = true;
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
    WOPMStatusBasedReportComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    WOPMStatusBasedReportComponent.prototype.applyCustomRptClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    };
    WOPMStatusBasedReportComponent = __decorate([
        core_1.Component({
            selector: 'wo-pmstatusbased-report',
            templateUrl: './app/Views/Reports/WorkOrder/PM/StatusBased/wo.pmstatusbased.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService],
            inputs: ['ScheduledFromDate', 'ScheduledToDate', 'DateRange', 'WorkTypeId', 'EquipmentCategoryId', 'EquipmentClassId', 'EquipmentNoId', 'WorkTypeName', 'StatusId', 'StatusName']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService])
    ], WOPMStatusBasedReportComponent);
    return WOPMStatusBasedReportComponent;
}());
exports.WOPMStatusBasedReportComponent = WOPMStatusBasedReportComponent;
//# sourceMappingURL=wo.pmstatusbased.report.component.js.map