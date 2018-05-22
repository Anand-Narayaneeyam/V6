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
var schedule_report_addedit_component_1 = require('../../../Common/ScheduleReport/schedule-report-addedit.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var common_service_2 = require('../../../../Models/Common/common.service');
var SpaceGrossAreaDistributionComponent = (function () {
    function SpaceGrossAreaDistributionComponent(commonreportservice, commonService) {
        this.commonreportservice = commonreportservice;
        this.commonService = commonService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.ddlspacegrossareareport = undefined;
        this.ReportType = 0;
        this.IsFloorbool = false;
        this.IsFloor = 0;
        this.showSheduleReportAddEdit = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.reportCatId = 89;
        this.IsCustomRprt = 0;
        this.hasScheduledReport = false;
        this.IsTextType = false;
    }
    SpaceGrossAreaDistributionComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        this.commonreportservice.ddlLoadReportType().subscribe(function (resultData) {
            contexObj.ddlspacegrossareareport = resultData.Data[0];
            contexObj.ddlspacegrossareareport.FieldValue = "16";
            contexObj.ddlspacegrossareareport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });
        });
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / Space / Gross Area Distribution";
        contexObj.LoadReportData();
        contexObj.checkForScheduledReport();
    };
    SpaceGrossAreaDistributionComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 89;
        this.ReportData.ExportFileName = "Gross Area Distribution";
        this.ReportData.ReportTitle = "Gross Area Distribution";
        this.ReportData.ReportSubTitle = "";
        if (this.IsFloorbool == false) {
            this.IsFloor = 0;
        }
        else if (this.IsFloorbool == true) {
            this.IsFloor = 1;
        }
        if (this.ReportType == "1" || this.ReportType == "2") {
            this.IsFloor = 0;
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
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    SpaceGrossAreaDistributionComponent.prototype.checkForScheduledReport = function () {
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
    SpaceGrossAreaDistributionComponent.prototype.onChangeType = function (event) {
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
    SpaceGrossAreaDistributionComponent.prototype.onSubmit = function (event) {
        this.IsFloorbool = !this.IsFloorbool;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);
    };
    SpaceGrossAreaDistributionComponent.prototype.showSheduleReport = function (event) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    };
    SpaceGrossAreaDistributionComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    SpaceGrossAreaDistributionComponent.prototype.handleInsertSuccess = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    SpaceGrossAreaDistributionComponent = __decorate([
        core_1.Component({
            selector: 'spacegrossareadistribution-report',
            templateUrl: './app/Views/Reports/Space/GrossAreaDistribution/space.grossareadistribution.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, dropdownlistcomponent_component_1.DropDownListComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService],
            inputs: ['Ids', 'reportBy']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService])
    ], SpaceGrossAreaDistributionComponent);
    return SpaceGrossAreaDistributionComponent;
}());
exports.SpaceGrossAreaDistributionComponent = SpaceGrossAreaDistributionComponent;
//# sourceMappingURL=space.grossareadistribution.report.component.js.map