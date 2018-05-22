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
var http_1 = require('@angular/http');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var OrgWiseEmpGridComponent = (function () {
    function OrgWiseEmpGridComponent(empService) {
        this.empService = empService;
        this.inputItems = { dataKey: "EmployeeId", allowAdd: false, allowEdit: false, allowSort: false };
    }
    OrgWiseEmpGridComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.empService.getOrgWiseEmpListField().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
        });
        var orgDetails = contextObj.orgDetailsObj;
    };
    OrgWiseEmpGridComponent = __decorate([
        core_1.Component({
            selector: 'orgwiseemp-grid',
            templateUrl: './app/Views/Employee/Tools/orgwiseemployee-grid.component.html',
            directives: [grid_component_1.GridComponent],
            providers: [http_1.HTTP_PROVIDERS, employee_services_1.EmployeeService],
            inputs: ['itemsSource', 'target']
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService])
    ], OrgWiseEmpGridComponent);
    return OrgWiseEmpGridComponent;
}());
exports.OrgWiseEmpGridComponent = OrgWiseEmpGridComponent;
//# sourceMappingURL=orgwiseemployee-grid.component.js.map