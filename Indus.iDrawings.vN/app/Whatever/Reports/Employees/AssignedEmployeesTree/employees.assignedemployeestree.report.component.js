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
var employees_assignedemployees_report_component_1 = require('../AssignedEmployees/employees.assignedemployees.report.component');
var common_service_1 = require('../../../../Models/reports/common.service');
var dropdownlistcomponent_component_1 = require('../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var EmployeesAssignedEmployeesTreeComponent = (function () {
    function EmployeesAssignedEmployeesTreeComponent(commonreportservice) {
        this.commonreportservice = commonreportservice;
        this.ddlcriteriareport = undefined;
        this.selectedCriteria = 3;
        this.ReportCategoryId = 48;
        this.next = undefined;
        this.selectedTab = 0;
        this.isInitialised = false;
        this.onCriteriaChange = true;
        this.tabTitle = "Select Floors";
    }
    EmployeesAssignedEmployeesTreeComponent.prototype.ngOnInit = function () {
        var contexObj = this;
        var id = 0;
        this.commonreportservice.ddlLoadReportCriteria().subscribe(function (resultData) {
            contexObj.ddlcriteriareport = resultData.Data[0];
            contexObj.commonreportservice.criteriaforReport(id).subscribe(function (result) {
                contexObj.ddlcriteriareport.LookupDetails.LookupValues = result.Data.LookupValues;
                contexObj.ddlcriteriareport.FieldValue = "13";
                contexObj.L1Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[3].Value;
                contexObj.L2Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[4].Value;
                contexObj.L3Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[5].Value;
                contexObj.L4Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[6].Value;
                contexObj.L5Org = contexObj.ddlcriteriareport.LookupDetails.LookupValues[7].Value;
                contexObj.L1Org = contexObj.L1Org.slice(3);
                contexObj.L2Org = contexObj.L2Org.slice(3);
                contexObj.L3Org = contexObj.L3Org.slice(3);
                contexObj.L4Org = contexObj.L4Org.slice(3);
                contexObj.L5Org = contexObj.L5Org.slice(3);
            });
        });
        contexObj.alignContent = "horizontal";
    };
    EmployeesAssignedEmployeesTreeComponent.prototype.onChangeType = function (event) {
        this.onCriteriaChange = false;
        this.tabTitle = "Select Floors";
        switch (event) {
            case "11":
                this.selectedCriteria = 1;
                this.onCriteriaChange = true;
                this.orgName = "by Site";
                this.tabTitle = "Select Sites";
                break;
            case "12":
                this.selectedCriteria = 2;
                this.onCriteriaChange = true;
                this.orgName = "by Building";
                this.tabTitle = "Select Buildings";
                break;
            case "13":
                this.selectedCriteria = 3;
                this.onCriteriaChange = true;
                this.orgName = "by Floor";
                this.tabTitle = "Select Floors";
                break;
            case "14":
                this.selectedCriteria = 14;
                this.onCriteriaChange = true;
                this.orgName = this.L1Org;
                break;
            case "15":
                this.selectedCriteria = 15;
                this.onCriteriaChange = true;
                this.orgName = this.L2Org;
                break;
            case "16":
                this.selectedCriteria = 16;
                this.onCriteriaChange = true;
                this.orgName = this.L3Org;
                break;
            case "17":
                this.selectedCriteria = 17;
                this.onCriteriaChange = true;
                this.orgName = this.L4Org;
                break;
            case "18":
                this.selectedCriteria = 18;
                this.onCriteriaChange = true;
                this.orgName = this.L5Org;
                break;
            default:
                this.selectedCriteria = 3;
                this.onCriteriaChange = true;
                break;
        }
        var contexObj = this;
        contexObj.selectedTab = undefined;
        setTimeout(function () {
            contexObj.selectedTab = 0;
            contexObj.onCriteriaChange = true;
        }, 50);
    };
    EmployeesAssignedEmployeesTreeComponent.prototype.submit = function (value) {
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
    EmployeesAssignedEmployeesTreeComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    EmployeesAssignedEmployeesTreeComponent = __decorate([
        core_1.Component({
            selector: 'employees-AssignedEmployeesTreeComponent-report',
            templateUrl: './app/Views/Reports/Employee/AssignedEmployeesTree/employees.assignedemployeestree.report.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, floorselection_report_component_1.FloorSelectionReportComponent, employees_assignedemployees_report_component_1.EmployeesAssignedEmployeesComponent, dropdownlistcomponent_component_1.DropDownListComponent],
            providers: [common_service_1.CommonReportService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService])
    ], EmployeesAssignedEmployeesTreeComponent);
    return EmployeesAssignedEmployeesTreeComponent;
}());
exports.EmployeesAssignedEmployeesTreeComponent = EmployeesAssignedEmployeesTreeComponent;
//# sourceMappingURL=employees.assignedemployeestree.report.component.js.map