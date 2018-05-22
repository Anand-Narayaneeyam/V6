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
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var employee_services_1 = require('../../../../models/employee/employee.services');
var MoveHistory = (function () {
    function MoveHistory(notificationService, empServices) {
        this.notificationService = notificationService;
        this.empServices = empServices;
        this.inputItems = { dataKey: "MoveId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.menuData = [];
        this.enableMenu = [1, 2];
        var contextObj = this;
    }
    MoveHistory.prototype.ngOnInit = function () {
        this.fieldObject = JSON.parse(JSON.stringify(this.fieldObject));
        var rptField = [871, 868, 7425];
        var count = rptField.length;
        this.fieldObject.find(function (item) {
            if (rptField.indexOf(item.ReportFieldId) >= 0) {
                item.IsVisible = false;
                count--;
                if (count == 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
        this.dataLoad();
    };
    MoveHistory.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad();
    };
    MoveHistory.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    ;
    MoveHistory.prototype.dataLoad = function () {
        var contextObj = this;
        this.empServices.getEmployeeMovesForRollBackHistory(this.moveId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result.DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoveHistory.prototype, "fieldObject", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MoveHistory.prototype, "employeeName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MoveHistory.prototype, "moveId", void 0);
    MoveHistory = __decorate([
        core_1.Component({
            selector: 'move-history',
            templateUrl: './app/Views/Employee/Tools/Rollback Moves/movehistorylist.component.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [notify_service_1.NotificationService, employee_services_1.EmployeeService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, employee_services_1.EmployeeService])
    ], MoveHistory);
    return MoveHistory;
}());
exports.MoveHistory = MoveHistory;
//# sourceMappingURL=movehistorylist.component.js.map