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
var employeeDataExportDemo_1 = require('./employeeDataExportDemo');
var router_1 = require('@angular/router');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var ExportEmployeeData = (function () {
    function ExportEmployeeData(_activtdRoute) {
        this._activtdRoute = _activtdRoute;
        this.splitviewExportExtApp = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.splitViewTitle = 'Employee Data';
    }
    ExportEmployeeData.prototype.ngOnInit = function () {
        this.baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1];
    };
    ExportEmployeeData.prototype.exportClick = function () {
        this.splitviewExportExtApp.showSecondaryView = true;
    };
    ExportEmployeeData = __decorate([
        core_1.Component({
            selector: 'export-employee-data',
            templateUrl: './app/Views/Employee/Data/employeeDataExport.html',
            directives: [employeeDataExportDemo_1.EmployeeDataExportDemo, split_view_component_1.SplitViewComponent],
            inputs: ['exportClick'],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute])
    ], ExportEmployeeData);
    return ExportEmployeeData;
}());
exports.ExportEmployeeData = ExportEmployeeData;
//# sourceMappingURL=employeeDataExport.js.map