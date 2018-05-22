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
var AdditionalReportComponent = (function () {
    function AdditionalReportComponent(commonreportservice, commonService) {
        this.commonreportservice = commonreportservice;
        this.commonService = commonService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.ddladdtnlreport = undefined;
        this.ReportType = 0;
        this.IsFloorbool = false;
        this.IsFloor = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.reportName = "";
        this.disableButton = false;
    }
    AdditionalReportComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        this.commonreportservice.ddlCAILoadReportType().subscribe(function (resultData) {
            contexObj.ddladdtnlreport = resultData.Data[0];
            contexObj.ddladdtnlreport.FieldValue = "86";
            contexObj.ddladdtnlreport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });
        });
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / Space / Additional Reports - " + this.reportName;
        if (this.reportFieldId == -1)
            this.fieldId = 193;
        else if (this.reportFieldId == 0)
            this.fieldId = 59;
        else
            this.fieldId = this.reportFieldId;
        contexObj.LoadReportData();
    };
    AdditionalReportComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 0;
        this.ReportData.ReportsTypeId = 6;
        this.ReportData.ExportFileName = "Area Distribution by " + this.reportName;
        this.ReportData.ReportTitle = "Area Distribution by " + this.reportName;
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
            ReportFieldId: 781,
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
            ReportFieldId: 22,
            Value: this.reportFieldId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1904,
            Value: this.reportName.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 3428,
            Value: this.fieldId.toString()
        });
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    AdditionalReportComponent.prototype.onChangeType = function (event) {
        switch (event) {
            case "86":
                this.ReportType = "0";
                break;
            case "87":
                this.ReportType = "1";
                break;
            default:
                this.ReportType = "0";
                break;
        }
        var contexObj = this;
        contexObj.ReportData = undefined;
        if (this.IsFloorbool == false && this.ReportType == "1")
            this.disableButton = true;
        else
            this.disableButton = false;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);
    };
    AdditionalReportComponent.prototype.onSubmit = function (event) {
        this.IsFloorbool = !this.IsFloorbool;
        var tempDdl = (document.getElementById("2738"));
        if (this.IsFloorbool == true) {
            tempDdl.style.backgroundColor = "lightgray";
            tempDdl.disabled = true;
        }
        else if (this.IsFloorbool == false) {
            tempDdl.style.backgroundColor = "white";
            tempDdl.disabled = false;
        }
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);
    };
    AdditionalReportComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    AdditionalReportComponent = __decorate([
        core_1.Component({
            selector: 'additionalReport-report',
            templateUrl: './app/Views/Reports/Space/AdditionalReports/reports-report-view.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, dropdownlistcomponent_component_1.DropDownListComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, schedule_report_addedit_component_1.ScheduleReportAddEdit],
            providers: [common_service_1.CommonReportService, common_service_2.CommonService],
            inputs: ['Ids', 'reportBy', 'reportFieldId', 'reportName']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, common_service_2.CommonService])
    ], AdditionalReportComponent);
    return AdditionalReportComponent;
}());
exports.AdditionalReportComponent = AdditionalReportComponent;
//# sourceMappingURL=reports-report-view.js.map