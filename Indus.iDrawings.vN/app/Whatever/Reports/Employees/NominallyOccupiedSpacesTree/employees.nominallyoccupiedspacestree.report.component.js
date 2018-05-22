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
var employees_nominallyoccupiedspaces_report_component_1 = require('../NominallyOccupiedSpaces/employees.nominallyoccupiedspaces.report.component');
var common_service_1 = require('../../../../Models/reports/common.service');
var dropdownlistcomponent_component_1 = require('../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var select_orgunit_report_component_1 = require('../../Common/SelectOrgUnitForReport/select.orgunit.report.component');
var EmployeesNominallyOccupiedSpacesTreeComponent = (function () {
    function EmployeesNominallyOccupiedSpacesTreeComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ddlcriteriareport = undefined;
        this.selectedCriteria = 3;
        this.ReportCategoryId = 103;
        this.tabTitle = "Select Floors";
        this.next = undefined;
        this.selectedTab = 0;
        this.isInitialised = false;
        this.onCriteriaChange = true;
        this.orgLevelSelect = false;
    }
    EmployeesNominallyOccupiedSpacesTreeComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        var id = 1;
        this.commonreportservice.ddlLoadReportCriteria().subscribe(function (resultData) {
            contexObj.ddlcriteriareport = resultData.Data[0];
            contexObj.commonreportservice.criteriaforReport(id).subscribe(function (result) {
                contexObj.ddlcriteriareport.LookupDetails.LookupValues = result.Data.LookupValues;
                contexObj.ddlcriteriareport.FieldValue = "13";
                contexObj.L1Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[3].Value;
                contexObj.L1Org = contexObj.L1Org.slice(3);
            });
        });
        contexObj.alignContent = "horizontal";
    };
    EmployeesNominallyOccupiedSpacesTreeComponent.prototype.onChangeType = function (event) {
        this.onCriteriaChange = false;
        this.tabTitle = "Select Floors";
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
            case "14":
                this.selectedCriteria = 14;
                this.orgLevelSelect = true;
                this.onCriteriaChange = true;
                this.orgName = this.L1Org;
                this.tabTitle = "Select " + this.orgName;
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
    EmployeesNominallyOccupiedSpacesTreeComponent.prototype.Selected = function (event) {
        this.isInitialised = false;
        var newselectedIds = '';
        for (var count = 0; count < event.length; count++) {
            newselectedIds = newselectedIds + event[count] + ',';
        }
        newselectedIds = newselectedIds.slice(0, -1);
        this.next = newselectedIds;
        var contexObj = this;
        setTimeout(function () {
            contexObj.selectedTab = 1;
            contexObj.isInitialised = true;
        }, 50);
    };
    EmployeesNominallyOccupiedSpacesTreeComponent = __decorate([
        core_1.Component({
            selector: 'employee-nominallyoccupiedspacestree-report',
            templateUrl: './app/Views/Reports/Employee/NominallyOccupiedSpacesTree/employees.nominallyoccupiedspacestree.report.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, floorselection_report_component_1.FloorSelectionReportComponent, employees_nominallyoccupiedspaces_report_component_1.EmployeesNominallyOccupiedSpacesComponent, dropdownlistcomponent_component_1.DropDownListComponent, select_orgunit_report_component_1.SelectOrgUnitReportComponent],
            providers: [common_service_1.CommonReportService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], EmployeesNominallyOccupiedSpacesTreeComponent);
    return EmployeesNominallyOccupiedSpacesTreeComponent;
}());
exports.EmployeesNominallyOccupiedSpacesTreeComponent = EmployeesNominallyOccupiedSpacesTreeComponent;
//# sourceMappingURL=employees.nominallyoccupiedspacestree.report.component.js.map