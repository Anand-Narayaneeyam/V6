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
var dropdownlistcomponent_component_1 = require('../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var select_period_report_component_1 = require('../../common/selectperiod/select.period.report.component');
var common_service_1 = require('../../../../Models/reports/common.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var space_occupancy_search_component_1 = require('./space-occupancy-search-component');
var common_service_2 = require('../../../../Models/Common/common.service');
var schedule_report_addedit_component_1 = require('../../../Common/ScheduleReport/schedule-report-addedit.component');
var customreport_addedit_component_1 = require('../../../common/custom reports/customreport-addedit.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var SpaceOccupancyComponent = (function () {
    function SpaceOccupancyComponent(commonreportservice, commonService, notificationService) {
        this.commonreportservice = commonreportservice;
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.StatusId = "0";
        this.ddlOrganizationUnit = undefined;
        this.ToDate = "";
        this.FromDate = "";
        this.splitViewStatus = false;
        this.levelNumber = "";
        this.iscard = true;
        this.okSelected = false;
        this.maxLevels = ""; //L1,L2,L3,L4,L5
        this.OrgUnitId = ""; // Value from dropdown
        this.selectedDdlArray = "";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.reportCatId = 311;
        this.IsCustomRprt = 0;
        this.hasScheduledReport = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        this.showSearch = false;
        this.needModulePrefix = 1;
        this.isFromCorrectionProject = 0;
        this.showMyDef = true;
        this.showSetMyDef = true;
        this.IsMobile = window["IsMobile"];
    }
    SpaceOccupancyComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        contexObj.ReportData = undefined;
        this.menuData = [
            {
                "id": 0,
                "title": "Search",
                "image": "Search",
                "path": "Search",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / Space / Space Occupancy";
        this.commonreportservice.ddlLoadOrganizationalUnits().subscribe(function (resultData) {
            contexObj.ddlOrganizationUnit = resultData.Data[0];
            contexObj.ddlOrganizationUnit.FieldValue = "1";
            contexObj.StatusId = "1";
            contexObj.LoadReportData(0);
            //contexObj.onChangeDdl(1);
        });
        contexObj.checkForScheduledReport();
    };
    SpaceOccupancyComponent.prototype.LoadReportData = function (IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 311;
        this.ReportData.ExportFileName = "";
        this.ReportData.ReportTitle = "";
        this.ReportData.ReportSubTitle = "";
        switch (this.StatusId) {
            case "1":
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[0].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[0].Value;
                //  this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[0].Value;
                break;
            case "2":
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[1].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[1].Value;
                //  this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[1].Value;
                break;
            case "3":
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[2].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[2].Value;
                // this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[2].Value;
                break;
            case "4":
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[3].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[3].Value;
                // this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[3].Value;
                break;
            case "5":
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[4].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[4].Value;
                // this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[4].Value;
                break;
            default:
                this.ReportData.ReportSubTitle = "All Space opccupancy Report";
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
            ReportFieldId: 289,
            Value: this.ddlOrganizationUnit.FieldValue.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 304,
            Value: this.maxLevels
        });
        arrRptFieldIds.push({
            ReportFieldId: 2080,
            Value: this.OrgUnitId
        });
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    SpaceOccupancyComponent.prototype.checkForScheduledReport = function () {
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
    SpaceOccupancyComponent.prototype.ngAfterViewChecked = function () {
        //if (this.splitviewInput.showSecondaryView == false && this.splitViewStatus == true && this.okSelected == false) {
        //    this.splitViewStatus = false;
        //    this.okSelected = true;
        //    this.ddlOrganizationUnit.FieldValue = "1";
        //    this.onChangeDdl(1);
        //}
    };
    SpaceOccupancyComponent.prototype.onChangeDdl = function (event) {
        this.selectedDdlArray = "";
        this.maxLevels = "";
        this.OrgUnitId = "";
        switch (event) {
            case "1":
                this.StatusId = "1";
                break;
            case "2":
                this.StatusId = "2";
                break;
            case "3":
                this.StatusId = "3";
                break;
            case "4":
                this.StatusId = "4";
                break;
            case "5":
                this.StatusId = "5";
                break;
            default:
                this.StatusId = "0";
                break;
        }
        if (this.StatusId == "1" || this.StatusId == "2" || this.StatusId == "3" || this.StatusId == "4" || this.StatusId == "5") {
            var contexObj = this;
            contexObj.ReportData = undefined;
            setTimeout(function () {
                contexObj.LoadReportData(0);
            }, 50);
        }
    };
    SpaceOccupancyComponent.prototype.onShowSearch = function (event) {
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        this.splitviewInput.showSecondaryView = false;
        this.levelNumber = this.StatusId;
        this.splitViewTitle = "Search";
        this.splitviewInput.showSecondaryView = true;
        this.showSearch = true;
    };
    SpaceOccupancyComponent.prototype.searchClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.maxLevels = event.MaxLevels;
        this.OrgUnitId = event.OrgUnitId;
        this.selectedDdlArray = event.SelectedDdlArray;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(0);
        }, 50);
    };
    SpaceOccupancyComponent.prototype.showSheduleReport = function (event) {
        this.showSearch = false;
        this.showCustomize = false;
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    };
    SpaceOccupancyComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        this.showSearch = false;
    };
    SpaceOccupancyComponent.prototype.handleInsertSuccess = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        this.showSearch = false;
    };
    SpaceOccupancyComponent.prototype.customizeClick = function (event) {
        this.showSearch = false;
        this.showSheduleReportAddEdit = false;
        var contextObj = this;
        var isLoadAddEdit = true;
        contextObj.showCustomize = true;
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
    SpaceOccupancyComponent.prototype.applyCustomRptClick = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    };
    SpaceOccupancyComponent = __decorate([
        core_1.Component({
            selector: 'space-occupancy-report',
            templateUrl: './app/Views/Reports/Space/SpaceOccupancy/space-occupancy-report-component.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, dropdownlistcomponent_component_1.DropDownListComponent, fieldGeneration_component_1.FieldComponent, split_view_component_1.SplitViewComponent, select_period_report_component_1.SelectPeriodReportComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, space_occupancy_search_component_1.SpaceOccupancySearchComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit, customreport_addedit_component_1.CustomReportAddEdit],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService])
    ], SpaceOccupancyComponent);
    return SpaceOccupancyComponent;
}());
exports.SpaceOccupancyComponent = SpaceOccupancyComponent;
//# sourceMappingURL=space-occupancy-report-component.js.map