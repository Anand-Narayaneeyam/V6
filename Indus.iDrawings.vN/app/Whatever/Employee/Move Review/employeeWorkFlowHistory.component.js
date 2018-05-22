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
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var EmpWorkFlowHistory = (function () {
    function EmpWorkFlowHistory(empService) {
        this.empService = empService;
        this.inputItems = { dataKey: "Id", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
    }
    EmpWorkFlowHistory.prototype.ngOnInit = function () {
        var contextObj = this;
        this.empService.getEmpWorkflowHistoryColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad(1, contextObj);
    };
    EmpWorkFlowHistory.prototype.dataLoad = function (target, context) {
        context.empService.getEmpWorkflowHistoryListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.workflowCatId).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context.notificationService.ShowToaster("No Resources exist");
            }
        });
    };
    EmpWorkFlowHistory.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    EmpWorkFlowHistory.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EmpWorkFlowHistory.prototype, "workflowCatId", void 0);
    EmpWorkFlowHistory = __decorate([
        core_1.Component({
            selector: 'empreviewhistory',
            templateUrl: 'app/Views/Employee/Move Review/employeeWorkFlowHistory.component.html',
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [http_1.HTTP_PROVIDERS, employee_services_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService])
    ], EmpWorkFlowHistory);
    return EmpWorkFlowHistory;
}());
exports.EmpWorkFlowHistory = EmpWorkFlowHistory;
//# sourceMappingURL=employeeWorkFlowHistory.component.js.map