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
var common_service_1 = require('../../../../Models/reports/common.service');
var checkboxcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var customreport_addedit_component_1 = require('../../../common/custom reports/customreport-addedit.component');
var common_service_2 = require('../../../../Models/Common/common.service');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var WOWorkHistoryReportComponent = (function () {
    function WOWorkHistoryReportComponent(commonreportservice, commonService, notificationService) {
        this.commonreportservice = commonreportservice;
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.pagePath = "Reports / Work Order / General / Equipment Work History";
        this.selectedEntity = "1,2,3";
        this.selectedEntitySR = undefined;
        this.selectedEntityPM = undefined;
        this.equipmentCategoryId = 0;
        this.isSRselected = true;
        this.isPMselected = true;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.pageTitle = "Customize Report";
        this.needModulePrefix = 1;
        this.isFromCorrectionProject = 0;
        this.showMyDef = false;
        this.showSetMyDef = false;
        this.IsMobile = window["IsMobile"];
        this.IsCustomize = 0;
    }
    WOWorkHistoryReportComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.commonreportservice.selectEntityCategory().subscribe(function (result) {
            contextObj.selectedEntitySR = result.Data[0];
            contextObj.selectedEntityPM = result.Data[1];
            contextObj.selectedEntitySR["FieldValue"] = "1";
            contextObj.selectedEntityPM["FieldValue"] = "1";
        });
        this.pagePath = "Reports / Work Order / General / Equipment Work History";
        contextObj.ReportData = undefined;
        setTimeout(function () {
            contextObj.LoadReportData(0);
        }, 50);
    };
    WOWorkHistoryReportComponent.prototype.LoadReportData = function (Customize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 343;
        this.ReportData.ExportFileName = "Work History Report";
        this.ReportData.ReportTitle = "Work History Report";
        this.ReportData.ReportSubTitle = "";
        if (this.isSRselected == true && this.isPMselected == true) {
            this.selectedEntity = "1,2,3";
        }
        else if (this.isSRselected == true && this.isPMselected == false) {
            this.selectedEntity = "1,2";
        }
        else if (this.isSRselected == false && this.isPMselected == true) {
            this.selectedEntity = "3";
        }
        else {
            this.selectedEntity = "";
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
            ReportFieldId: 7611,
            Value: this.selectedEntity.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1366,
            Value: this.selectedIds.toString()
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
    };
    WOWorkHistoryReportComponent.prototype.selectedEntitySRChange = function (event) {
        var contextObj = this;
        contextObj.isSRselected = event.IsChecked;
        contextObj.ReportData = undefined;
        setTimeout(function () {
            contextObj.LoadReportData(contextObj.IsCustomize);
        }, 50);
    };
    WOWorkHistoryReportComponent.prototype.selectedEntityPMChange = function (event) {
        var contextObj = this;
        contextObj.isPMselected = event.IsChecked;
        contextObj.ReportData = undefined;
        setTimeout(function () {
            contextObj.LoadReportData(contextObj.IsCustomize);
        }, 50);
    };
    WOWorkHistoryReportComponent.prototype.customizeClick = function (event) {
        var contextObj = this;
        var isLoadAddEdit = true;
        contextObj.commonService.loadCustomRptAddEditCol().subscribe(function (result) {
            contextObj.fieldObjectAddEdit = result["Data"]; //filter(function (item) { return item.FieldId != 1625 });
        });
        var listParams = new Array();
        listParams.push({ ReportFieldId: 353, Value: this.ReportData.ModuleId }, { ReportFieldId: 346, Value: this.ReportData.ReportCategoryId }, { ReportFieldId: 3792, Value: this.needModulePrefix }, { ReportFieldId: 1243, Value: this.isFromCorrectionProject }, { ReportFieldId: 66, Value: "" }, { ReportFieldId: 4491, Value: this.equipmentCategoryId });
        contextObj.listFieldDetails = JSON.parse(JSON.stringify(listParams));
        contextObj.commonService.loadCustomizeReportData(JSON.stringify(listParams), 0, false).subscribe(function (result) {
            contextObj.itemsSourceAddEdit = JSON.parse(result);
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    WOWorkHistoryReportComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    WOWorkHistoryReportComponent.prototype.applyCustomRptClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    };
    WOWorkHistoryReportComponent = __decorate([
        core_1.Component({
            selector: 'woWorkHistoryReportComponent-report',
            templateUrl: './app/Views/Reports/WorkOrder/EquipmentWorkHistory/wo.workhistory.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, split_view_component_1.SplitViewComponent, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService],
            inputs: ['selectedIds', 'equipmentCategoryId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService])
    ], WOWorkHistoryReportComponent);
    return WOWorkHistoryReportComponent;
}());
exports.WOWorkHistoryReportComponent = WOWorkHistoryReportComponent;
//# sourceMappingURL=wo.workhistory.report.component.js.map