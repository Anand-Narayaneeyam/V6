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
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var select_period_report_component_1 = require('../../common/selectperiod/select.period.report.component');
var common_service_1 = require('../../../../Models/reports/common.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var SpaceUsersComponent = (function () {
    function SpaceUsersComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        this.StatusId = "0";
        this.ddluserfilterreport = undefined;
        this.ToDate = "";
        this.FromDate = "";
        this.splitViewStatus = false;
        this.okSelected = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    }
    SpaceUsersComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        this.commonreportservice.ddlLoadUserStatus().subscribe(function (resultData) {
            contexObj.ddluserfilterreport = resultData.Data[0];
            contexObj.ddluserfilterreport.FieldValue = "3";
            contexObj.ddluserfilterreport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });
        });
        this.pagePath = "Reports / Space / Users";
        contexObj.alignContent = "horizontal";
        contexObj.LoadReportData();
    };
    SpaceUsersComponent.prototype.LoadReportData = function () {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 2;
        this.ReportData.ExportFileName = "Users";
        this.ReportData.ReportTitle = "Users";
        this.ReportData.ReportSubTitle = "";
        switch (this.StatusId) {
            case "0":
                this.ReportData.ReportSubTitle = "All Users";
                break;
            case "1":
                this.ReportData.ReportSubTitle = "Active Users";
                break;
            case "2":
                this.ReportData.ReportSubTitle = "Blocked Users";
                break;
            case "4":
                this.ReportData.ReportSubTitle = "Deleted Users";
                break;
            case "5":
                this.ReportData.ReportSubTitle = "Account Expired Users";
                break;
            case "7":
                this.ReportData.ReportSubTitle = "Users Deleted during " + this.FromDate + " and " + this.ToDate;
                break;
            case "8":
                this.ReportData.ReportSubTitle = "Users added during " + this.FromDate + " and " + this.ToDate;
                break;
            case "9":
                this.ReportData.ReportSubTitle = "Account expiring during " + this.FromDate + " and " + this.ToDate;
                break;
            default:
                this.ReportData.ReportSubTitle = "All Users";
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
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    };
    SpaceUsersComponent.prototype.ngAfterViewChecked = function () {
        if (this.splitviewInput.showSecondaryView == false && this.splitViewStatus == true && this.okSelected == false) {
            this.splitViewStatus = false;
            this.okSelected = true;
            this.ddluserfilterreport.FieldValue = "3";
            this.onChangeType(3);
        }
    };
    SpaceUsersComponent.prototype.onChangeType = function (event) {
        switch (event) {
            case "3":
                this.StatusId = "0";
                break;
            case "4":
                this.StatusId = "1";
                break;
            case "5":
                this.StatusId = "2";
                break;
            case "6":
                this.StatusId = "4";
                break;
            case "7":
                this.StatusId = "5";
                break;
            case "8":
                this.StatusId = "7";
                this.splitViewStatus = true;
                this.okSelected = false;
                this.showPeriodSelector();
                break;
            case "9":
                this.StatusId = "8";
                this.splitViewStatus = true;
                this.okSelected = false;
                this.showPeriodSelector();
                break;
            case "10":
                this.StatusId = "9";
                this.splitViewStatus = true;
                this.okSelected = false;
                this.showPeriodSelector();
                break;
            default:
                this.StatusId = "0";
                break;
        }
        if (this.StatusId == "0" || this.StatusId == "1" || this.StatusId == "2" || this.StatusId == "4" || this.StatusId == "5") {
            var contexObj = this;
            contexObj.ReportData = undefined;
            setTimeout(function () {
                contexObj.LoadReportData();
            }, 50);
        }
    };
    SpaceUsersComponent.prototype.showPeriodSelector = function () {
        this.splitviewInput.showSecondaryView = true;
    };
    SpaceUsersComponent.prototype.dateSelect = function (event) {
        this.splitviewInput.showSecondaryView = false;
        this.okSelected = true;
        this.FromDate = event["0"].FieldValue;
        this.ToDate = event["1"].FieldValue;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);
    };
    SpaceUsersComponent = __decorate([
        core_1.Component({
            selector: 'report',
            templateUrl: './app/Views/Reports/Space/Users/space.users.report.html',
            directives: [reportviewercomponent_1.Html5ViewerComponent, dropdownlistcomponent_component_1.DropDownListComponent, fieldGeneration_component_1.FieldComponent, split_view_component_1.SplitViewComponent, select_period_report_component_1.SelectPeriodReportComponent, page_component_1.PageComponent],
            providers: [common_service_1.CommonReportService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], SpaceUsersComponent);
    return SpaceUsersComponent;
}());
exports.SpaceUsersComponent = SpaceUsersComponent;
//# sourceMappingURL=space.users.report.component.js.map