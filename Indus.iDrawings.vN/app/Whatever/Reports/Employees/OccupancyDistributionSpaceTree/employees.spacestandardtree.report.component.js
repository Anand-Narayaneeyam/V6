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
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var floorselection_report_component_1 = require('../../Common/ReportFloorSelection/floorselection.report.component');
var employees_spacestandard_report_component_1 = require('../OccupancyDistributionSpace/employees.spacestandard.report.component');
var common_service_1 = require('../../../../Models/reports/common.service');
var dropdownlistcomponent_component_1 = require('../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var EmployeesNominallyOccupiedSpacesTreeComponent = (function () {
    function EmployeesNominallyOccupiedSpacesTreeComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ddlcriteriareport = undefined;
        this.selectedCriteria = 3;
        this.ReportCategoryId = 326;
        this.tabTitle = "Select Floors";
        this.next = undefined;
        this.selectedTab = 0;
        this.isInitialised = false;
        this.onCriteriaChange = true;
    }
    EmployeesNominallyOccupiedSpacesTreeComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        this.commonreportservice.ddlLoadReportCriteria().subscribe(function (resultData) {
            contexObj.ddlcriteriareport = resultData.Data[0];
            contexObj.ddlcriteriareport.FieldValue = "13";
            contexObj.ddlcriteriareport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });
        });
        contexObj.alignContent = "horizontal";
    };
    EmployeesNominallyOccupiedSpacesTreeComponent.prototype.onChangeType = function (event) {
        this.tabTitle = "Select Floors";
        this.onCriteriaChange = false;
        switch (event) {
            case "11":
                this.selectedCriteria = 1;
                this.onCriteriaChange = true;
                this.tabTitle = "Select Sites";
                break;
            case "12":
                this.selectedCriteria = 2;
                this.onCriteriaChange = true;
                this.tabTitle = "Select Buildings";
                break;
            case "13":
                this.selectedCriteria = 3;
                this.onCriteriaChange = true;
                this.tabTitle = "Select Floors";
                break;
            default:
                this.selectedCriteria = 3;
                this.onCriteriaChange = true;
                this.tabTitle = "Select Floors";
                break;
        }
        var contexObj = this;
        contexObj.selectedTab = undefined;
        setTimeout(function () {
            contexObj.selectedTab = 0;
            contexObj.onCriteriaChange = true;
        }, 50);
    };
    EmployeesNominallyOccupiedSpacesTreeComponent.prototype.submit = function (value) {
        this.isInitialised = false;
        this.next = value;
        var contexObj = this;
        setTimeout(function () {
            contexObj.isInitialised = true;
        }, 50);
        setTimeout(function () {
            contexObj.selectedTab = 1;
        }, 100);
    };
    EmployeesNominallyOccupiedSpacesTreeComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    EmployeesNominallyOccupiedSpacesTreeComponent = __decorate([
        core_1.Component({
            selector: 'employee-spacestandardtree-report',
            templateUrl: './app/Views/Reports/Employee/OccupancyDistributionSpaceTree/employees.spacestandardtree.report.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, floorselection_report_component_1.FloorSelectionReportComponent, employees_spacestandard_report_component_1.EmployeesSpaceStandardComponent, dropdownlistcomponent_component_1.DropDownListComponent],
            providers: [common_service_1.CommonReportService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], EmployeesNominallyOccupiedSpacesTreeComponent);
    return EmployeesNominallyOccupiedSpacesTreeComponent;
}());
exports.EmployeesNominallyOccupiedSpacesTreeComponent = EmployeesNominallyOccupiedSpacesTreeComponent;
//# sourceMappingURL=employees.spacestandardtree.report.component.js.map