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
var employee_services_1 = require('../../../Models/Employee/employee.services');
var EmployeeDataExportDemo = (function () {
    function EmployeeDataExportDemo(_empDataList) {
        this._empDataList = _empDataList;
        this.dataDescription = [];
        this.gridColumnNames = [];
    }
    EmployeeDataExportDemo.prototype.ngOnInit = function () {
        this.baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1];
        //this.employeeDataList = this._empDataList.getapiAllEmployeeDataExport();
    };
    EmployeeDataExportDemo.prototype.onInvokeApi = function () {
        var currContext = this;
        currContext._empDataList.getSessionData().subscribe(function (resultUserData) {
            var sessionData = resultUserData["Data"];
            currContext._empDataList.getApiAllEmployeeDataExport(sessionData["CustomerId"], sessionData["UserId"], sessionData["TimeOffset"]).subscribe(function (resultData) {
                currContext.employeeDataList = JSON.stringify(resultData.Data);
                currContext.dataDescription = resultData.DataDescription;
                /*
                if( resultData.Data.length >0 ) {
                   for(var col in resultData.Data[0]){
                       if(col.toLowerCase().lastIndexOf('id') != -1)
                       console.log(col);
                   }
                
                }
                */
            });
        });
    };
    EmployeeDataExportDemo = __decorate([
        core_1.Component({
            selector: 'demo-employee-export',
            templateUrl: './app/Views/Employee/Data/EmployeeDataExportDemo.html',
            providers: [employee_services_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService])
    ], EmployeeDataExportDemo);
    return EmployeeDataExportDemo;
}());
exports.EmployeeDataExportDemo = EmployeeDataExportDemo;
//# sourceMappingURL=employeeDataExportDemo.js.map