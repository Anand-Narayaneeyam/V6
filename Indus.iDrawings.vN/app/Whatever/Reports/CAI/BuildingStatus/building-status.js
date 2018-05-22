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
var add_archive_1 = require('./add-archive');
var space_service_1 = require('../../../../Models/Space/space.service');
var common_service_1 = require('../../../../Models/Common/common.service');
var customreport_addedit_component_1 = require('../../../common/custom reports/customreport-addedit.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var BuildingStatusReport = (function () {
    function BuildingStatusReport(spaceService, commonService, notificationService) {
        this.spaceService = spaceService;
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.showArchive = false;
        this.isEnableButton = false;
        this.showCustomize = false;
        this.needModulePrefix = 0;
        this.isFromCorrectionProject = 0;
        this.showMyDef = true;
        this.showSetMyDef = true;
        this.IsMobile = window["IsMobile"];
    }
    BuildingStatusReport.prototype.ngOnInit = function () {
        this.LoadReportData(0);
        this.pagePath = "Reports / CAI / Building Status";
    };
    BuildingStatusReport.prototype.LoadReportData = function (IsCustomize) {
        var contextObj = this;
        var service;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 12;
        this.ReportData.ReportCategoryId = 21;
        this.ReportData.ExportFileName = "Building Status";
        this.ReportData.ReportTitle = "Building Status";
        this.ReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.spaceService.getAllocatedDrawings("12").subscribe(function (resultData) {
            var temp = JSON.parse(resultData.Data.FieldBinderData);
            if (temp.length == 0)
                contextObj.isEnableButton = false;
            else if (temp.length >= 1)
                contextObj.isEnableButton = true;
        });
    };
    BuildingStatusReport.prototype.onSubmitArchive = function () {
        this.pageTitle = "Add Archive";
        this.showArchive = true;
        this.showCustomize = false;
        this.splitviewInput.secondaryArea = 70;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    BuildingStatusReport.prototype.submitReturn = function (event) {
        this.showCustomize = false;
        this.showArchive = false;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    BuildingStatusReport.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showArchive = false;
        this.showCustomize = false;
    };
    BuildingStatusReport.prototype.customizeClick = function (event) {
        this.showArchive = false;
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
    BuildingStatusReport.prototype.applyCustomRptClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showArchive = false;
        this.showCustomize = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    };
    BuildingStatusReport = __decorate([
        core_1.Component({
            selector: 'CAI.buildingStatus.report',
            templateUrl: './app/Views/Reports/CAI/BuildingStatus/building-status.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, page_component_1.PageComponent, add_archive_1.BuildingAddArchiveComponent, split_view_component_1.SplitViewComponent, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [space_service_1.SpaceService, common_service_1.CommonService, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, common_service_1.CommonService, notify_service_1.NotificationService])
    ], BuildingStatusReport);
    return BuildingStatusReport;
}());
exports.BuildingStatusReport = BuildingStatusReport;
//# sourceMappingURL=building-status.js.map