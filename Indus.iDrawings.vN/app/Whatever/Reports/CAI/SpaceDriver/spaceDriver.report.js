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
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var add_archive_1 = require('./add-archive');
var CAISpaceDriverComponent = (function () {
    function CAISpaceDriverComponent(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.ddlspacegrossareareport = undefined;
        this.ReportType = 0;
        this.IsFloorbool = false;
        this.IsFloor = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.showArchive = false;
        this.disableButton = false;
    }
    CAISpaceDriverComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        this.commonreportservice.ddlCAILoadReportType().subscribe(function (resultData) {
            contexObj.ddlspacegrossareareport = resultData.Data[0];
            contexObj.ddlspacegrossareareport.FieldValue = "86";
            contexObj.ddlspacegrossareareport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });
        });
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / CAI / CAI Space Driver";
        contexObj.LoadReportData();
    };
    CAISpaceDriverComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 12;
        this.ReportData.ReportCategoryId = 108;
        this.ReportData.ExportFileName = "Gross Area Distribution by CAI Space Driver";
        this.ReportData.ReportTitle = "Gross Area Distribution by CAI Space Driver";
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
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    CAISpaceDriverComponent.prototype.onChangeType = function (event) {
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
    CAISpaceDriverComponent.prototype.onSubmit = function (event) {
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
    CAISpaceDriverComponent.prototype.onSubmitArchive = function () {
        this.pageTitle = "Add Archive";
        this.showArchive = true;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    CAISpaceDriverComponent.prototype.submitReturn = function (event) {
        this.showArchive = false;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    CAISpaceDriverComponent = __decorate([
        core_1.Component({
            selector: 'CAISpaceDriver-report',
            templateUrl: './app/Views/Reports/CAI/SpaceDriver/spaceDriver.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, dropdownlistcomponent_component_1.DropDownListComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, notify_component_1.Notification, add_archive_1.AddArchiveComponent],
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            inputs: ['Ids', 'reportBy']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], CAISpaceDriverComponent);
    return CAISpaceDriverComponent;
}());
exports.CAISpaceDriverComponent = CAISpaceDriverComponent;
//# sourceMappingURL=spaceDriver.report.js.map