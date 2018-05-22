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
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var checkboxcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var General_1 = require('../../../Models/Common/General');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var EmployeeToWorkOrderUserComponent = (function () {
    function EmployeeToWorkOrderUserComponent(employeeService, notificationService, generFun, administrationService) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.totalItems = 0;
        this.pageIndex = 0;
        this.sortCol = "[Employee Name]";
        this.sortDir = "ASC";
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.isBtnVisible = true;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "[Employee Name]", sortDir: "ASC", selectedIds: [], allowAdd: false };
    }
    EmployeeToWorkOrderUserComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.employeeService.getEmployeeToWorkOrderUserFields().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            contextObj.txtBxComment = resultData["Data"].find(function (el) { return el.ReportFieldId === 874; });
            contextObj.inputItems.isHeaderCheckBx = true;
            contextObj.dataLoad(0);
            contextObj.loadKeywordSearch();
        });
    };
    EmployeeToWorkOrderUserComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.employeeService.getEmployeeToWorkOrderUserList(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            }
            else {
                if (target == 1) {
                    contextObj.notificationService.ShowToaster("No Employees exist for selected filter condition", 2);
                }
                else {
                    contextObj.notificationService.ShowToaster("No Employees having email id exist", 2);
                }
            }
        });
    };
    EmployeeToWorkOrderUserComponent.prototype.loadKeywordSearch = function () {
        var contextObj = this;
        contextObj.employeeService.getKeywordSearchField(587).subscribe(function (resultData) {
            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            contextObj.keyWordLookup = resultData["FieldBinderList"];
        });
    };
    EmployeeToWorkOrderUserComponent.prototype.onloadSearch = function (event) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.itemsSource = [];
        this.pageIndex = 0;
        var contextObj = this;
        contextObj.dataLoad(1);
    };
    EmployeeToWorkOrderUserComponent.prototype.Clear = function (event) {
        this.filter = "";
        this.IsKeyWordSearch = 0;
        var contextObj = this;
        contextObj.dataLoad(1);
    };
    EmployeeToWorkOrderUserComponent.prototype.Submit = function (event) {
        this.showSearchFilter = [];
    };
    EmployeeToWorkOrderUserComponent.prototype.updateEmployeeToWorkOrderUser = function (event) {
        var contextObj = this;
        var hasSelectedIds = false;
        var arrayList = new Array();
        for (var i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                hasSelectedIds = true;
                arrayList.push({
                    ReportFieldId: 939,
                    Value: contextObj.itemsSource[i]["Id"].toString()
                });
            }
        }
        if (hasSelectedIds == true) {
            this.employeeService.postSubmitEmployeeToWorkOrderUser(JSON.stringify(arrayList)).subscribe(function (resultData) {
                if (resultData.StatusId == 1 && resultData.ServerId > 0) {
                    contextObj.notificationService.ShowToaster("Conversion of Employee to Work Order User updated", 3);
                    contextObj.txtBxComment.IsVisible = true;
                    contextObj.itemsSource = JSON.parse(resultData.Data);
                    contextObj.isBtnVisible = false;
                    contextObj.fieldObject.find(function (el) { return el.ReportFieldId === 459; }).IsVisible = false;
                }
                else if (resultData.ServerId == -2) {
                    contextObj.notificationService.ShowToaster("Maximum allowed Work Order users for the customer already created", 2);
                }
                else if (resultData.ServerId == -4) {
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Select an Employee", 2);
        }
    };
    EmployeeToWorkOrderUserComponent = __decorate([
        core_1.Component({
            selector: 'employee-to-workOrderUser',
            templateUrl: 'app/Views/Employee/General Settings/employee-to-workOrderUser.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, checkboxcomponent_component_1.CustomCheckBoxComponent, paging_component_1.PagingComponent, search_component_1.searchBox],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, employee_services_1.EmployeeService, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], EmployeeToWorkOrderUserComponent);
    return EmployeeToWorkOrderUserComponent;
}());
exports.EmployeeToWorkOrderUserComponent = EmployeeToWorkOrderUserComponent;
//# sourceMappingURL=employee-to-workorderUser.js.map