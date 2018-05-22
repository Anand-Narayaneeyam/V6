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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var querybuildersearch_component_1 = require('../../../framework/whatever/querybuilder/querybuildersearch.component');
var EmployeeQueryBuilderComponent = (function () {
    function EmployeeQueryBuilderComponent() {
    }
    EmployeeQueryBuilderComponent.prototype.ngOnInit = function () {
        this.pagePath = "Employee / Query Builder";
        this.moduleId = 5;
        this.QueryCategryId = "5";
    };
    EmployeeQueryBuilderComponent = __decorate([
        core_1.Component({
            selector: 'employee-querybuilder',
            templateUrl: './app/Views/Employee/Data/employee-querybuilder.component.html',
            directives: [page_component_1.PageComponent, querybuildersearch_component_1.QueryBuilderComponent],
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployeeQueryBuilderComponent);
    return EmployeeQueryBuilderComponent;
}());
exports.EmployeeQueryBuilderComponent = EmployeeQueryBuilderComponent;
//# sourceMappingURL=employee-querybuilder.component.js.map