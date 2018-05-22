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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var http_1 = require('@angular/http');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var General_1 = require('../../../Models/Common/General');
var employeedrawing_services_1 = require('../../../models/employee/employeedrawing.services');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var RelinkEmployeeListComponent = (function () {
    function RelinkEmployeeListComponent(employeeService, http, empDrawingService, differs, _notificationService, confirmationService, generFun) {
        this.employeeService = employeeService;
        this.http = http;
        this.empDrawingService = empDrawingService;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.confirmationService = confirmationService;
        this.generFun = generFun;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Employee Code]', sortDir: 'ASC', showContextMenu: true };
        this.totalItems = 1000;
        this.itemsPerPage = 200;
        this.relinkEmployeeTotalItems = 1;
        this.enablerelinkEmployeeMenu = [0];
        this.relinkSubmit = new core_1.EventEmitter();
        this.empDrawingService = new employeedrawing_services_1.EmployeeDrawingService(this.http);
    }
    RelinkEmployeeListComponent.prototype.ngOnInit = function () {
        this.relinkEmployeeMenu = [{
                "id": 1,
                "title": "Re Link",
                "image": "Revise",
                "path": "Revise",
                "submenu": null
            }];
        var contextObj = this;
        var fieldcopy;
        this.empDrawingService.getRelinkEmployeeField().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.fieldObject = resultData["Data"];
                console.log('fields', contextObj.fieldObject);
            }
        });
        this.dataLoad();
    };
    RelinkEmployeeListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataLoad();
    };
    RelinkEmployeeListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    RelinkEmployeeListComponent.prototype.dataLoad = function () {
        var contextObj = this;
        if (contextObj.InpItemsource) {
            if (contextObj.count == 0)
                contextObj.enablerelinkEmployeeMenu = [];
            contextObj.itemsSource = contextObj.InpItemsource;
            contextObj.totalItems = contextObj.count;
        }
    };
    RelinkEmployeeListComponent.prototype.updaterelinkEmployeeMenu = function (event) {
        switch (event.value) {
            case 1:
                this.RelinkEmployee();
                break;
        }
    };
    RelinkEmployeeListComponent.prototype.RelinkEmployee = function () {
        var rowdata = [];
        if (this.inputItems.selectedIds.length == 1)
            rowdata.push(this.inputItems.rowData);
        else if (this.inputItems.selectedIds.length > 1)
            rowdata = this.inputItems.rowData;
        this.relinkSubmit.emit(rowdata);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RelinkEmployeeListComponent.prototype, "relinkSubmit", void 0);
    RelinkEmployeeListComponent = __decorate([
        core_1.Component({
            selector: 'relinkEmployeeList',
            templateUrl: 'app/Views/Employee/Drawings/relinkEmployeeList.html',
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, employeedrawing_services_1.EmployeeDrawingService],
            inputs: ['InpItemsource', 'count'],
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, paging_component_1.PagingComponent, notify_component_1.Notification, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent],
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, http_1.Http, employeedrawing_services_1.EmployeeDrawingService, core_1.KeyValueDiffers, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], RelinkEmployeeListComponent);
    return RelinkEmployeeListComponent;
}());
exports.RelinkEmployeeListComponent = RelinkEmployeeListComponent;
//# sourceMappingURL=relinkemployeelist.js.map