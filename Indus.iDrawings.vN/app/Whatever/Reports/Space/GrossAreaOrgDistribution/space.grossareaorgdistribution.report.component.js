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
var dropdownlistcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var common_service_1 = require('../../../../Models/reports/common.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var common_service_2 = require('../../../../Models/Common/common.service');
var schedule_report_addedit_component_1 = require('../../../Common/ScheduleReport/schedule-report-addedit.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var SpaceGrossAreaOrgDistributionComponent = (function () {
    function SpaceGrossAreaOrgDistributionComponent(commonreportservice, commonService, notificationService) {
        this.commonreportservice = commonreportservice;
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.ddlspacegrossareareport = undefined;
        this.ReportType = 0;
        this.IsFloorbool = false;
        this.IsFloor = 0;
        this.IsTextType = false;
        this.reportCatId = 90;
        this.IsCustomRprt = 0;
        this.hasScheduledReport = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.showSheduleReportAddEdit = false;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.showCustomize = false;
        this.selectedRptFldValues = "290,292,294,296,298,2428,2426,2377,2494";
    }
    SpaceGrossAreaOrgDistributionComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        this.commonreportservice.ddlLoadReportType().subscribe(function (resultData) {
            contexObj.ddlspacegrossareareport = resultData.Data[0];
            contexObj.ddlspacegrossareareport.FieldValue = "16";
            contexObj.ddlspacegrossareareport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });
        });
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / Space / Gross Area Organizational Distribution";
        contexObj.LoadReportData();
        contexObj.checkForScheduledReport();
    };
    SpaceGrossAreaOrgDistributionComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 90;
        this.ReportData.ExportFileName = "Gross Area Organizational Distribution";
        this.ReportData.ReportTitle = "Gross Area Organizational Distribution";
        this.ReportData.ReportSubTitle = "";
        if (this.IsFloorbool == false) {
            this.IsFloor = 0;
        }
        else if (this.IsFloorbool == true) {
            this.IsFloor = 1;
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
            ReportFieldId: 4307,
            Value: this.IsFloor.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1986,
            Value: this.ReportType.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1966,
            Value: this.selectedRptFldValues.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    SpaceGrossAreaOrgDistributionComponent.prototype.checkForScheduledReport = function () {
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
    SpaceGrossAreaOrgDistributionComponent.prototype.onChangeType = function (event) {
        switch (event) {
            case "16":
                this.ReportType = "0";
                this.IsTextType = false;
                break;
            case "17":
                this.ReportType = "1";
                this.IsTextType = true;
                break;
            case "18":
                this.ReportType = "2";
                this.IsTextType = true;
                break;
            default:
                this.ReportType = "0";
                this.IsTextType = false;
                break;
        }
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);
    };
    SpaceGrossAreaOrgDistributionComponent.prototype.onSubmit = function (event) {
        this.IsFloorbool = !this.IsFloorbool;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);
    };
    SpaceGrossAreaOrgDistributionComponent.prototype.showSheduleReport = function (event) {
        var contextObj = this;
        contextObj.showCustomize = false;
        contextObj.splitviewInput.secondaryArea = 90;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    };
    SpaceGrossAreaOrgDistributionComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
    };
    SpaceGrossAreaOrgDistributionComponent.prototype.handleInsertSuccess = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    SpaceGrossAreaOrgDistributionComponent.prototype.customizeClick = function (event) {
        var contexObj = this;
        contexObj.showSheduleReportAddEdit = false;
        contexObj.showCustomize = true;
        contexObj.splitviewInput.secondaryArea = 50;
        contexObj.pageTitle = "Customize Report";
        contexObj.splitviewInput.showSecondaryView = true;
        this.commonreportservice.getGetReportItemLookupFields().subscribe(function (result) {
            contexObj.fieldObject = (result["Data"]);
            if (contexObj.fieldObject.length > 1) {
                contexObj.commonreportservice.getGetReportItemLookup(contexObj.pageIndex, contexObj.inputItems.sortCol, contexObj.inputItems.sortDir).subscribe(function (result) {
                    if (result["Data"].DataCount > 0) {
                        var selectedIds = contexObj.selectedRptFldValues.split(",");
                        var items = JSON.parse(result["Data"].FieldBinderData);
                        selectedIds.forEach(function (id) {
                            var newItem = { "Id": id };
                            items.forEach(function (item) {
                                if (newItem.Id === item.Id.toString()) {
                                    item.View = true;
                                }
                            });
                        });
                        contexObj.itemsSource = items; //JSON.parse(result["Data"].FieldBinderData);
                    }
                    else {
                    }
                });
            }
        });
        //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    SpaceGrossAreaOrgDistributionComponent.prototype.setReportSettings = function (event) {
        var status = true;
        var contexObj = this;
        contexObj.selectedRptFldValues = '';
        for (var _i = 0, _a = contexObj.itemsSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item['View'] == true) {
                contexObj.selectedRptFldValues += item['Id'] + ",";
            }
        }
        if (contexObj.selectedRptFldValues.length > 0) {
            contexObj.splitviewInput.showSecondaryView = false;
            contexObj.showSheduleReportAddEdit = false;
            contexObj.showCustomize = false;
            contexObj.ReportData = undefined;
            setTimeout(function () {
                contexObj.LoadReportData();
            }, 50);
        }
        else {
            contexObj.notificationService.ShowToaster("Select at least one Report Column", 2);
        }
    };
    SpaceGrossAreaOrgDistributionComponent = __decorate([
        core_1.Component({
            selector: 'spacegrossareaorgdistribution-report',
            templateUrl: './app/Views/Reports/Space/GrossAreaOrgDistribution/space.grossareaorgdistribution.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, dropdownlistcomponent_component_1.DropDownListComponent, page_component_1.PageComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService],
            inputs: ['Ids', 'reportBy']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService, notify_service_1.NotificationService])
    ], SpaceGrossAreaOrgDistributionComponent);
    return SpaceGrossAreaOrgDistributionComponent;
}());
exports.SpaceGrossAreaOrgDistributionComponent = SpaceGrossAreaOrgDistributionComponent;
//# sourceMappingURL=space.grossareaorgdistribution.report.component.js.map