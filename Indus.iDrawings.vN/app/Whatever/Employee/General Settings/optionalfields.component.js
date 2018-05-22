var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../models/employee/employee.services.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var OptionalFieldComponent = (function () {
    function OptionalFieldComponent(employeeService, notificationService) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.fieldSubscriptionCategoryId = 2;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
    }
    OptionalFieldComponent.prototype.ngOnInit = function () {
        var context = this;
        this.employeeService.getOptionalFieldsListFields().subscribe(function (result) {
            context.fieldObject = (result["Data"]);
            if (context.fieldObject.length > 1) {
                context.employeeService.getOptionalFieldsListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.fieldSubscriptionCategoryId).subscribe(function (result) {
                    context.totalItems = result["Data"].DataCount;
                    context.itemsPerPage = result["Data"].RowsPerPage;
                    var objItemSource = JSON.parse(result["Data"].FieldBinderData);
                    objItemSource.find(function (item) {
                        if (item.Id == 974) {
                            item["Field Name"] = "Uploaded By";
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    context.itemsSource = objItemSource; //JSON.parse(result["Data"].FieldBinderData);
                });
            }
            else
                context.notificationService.ShowToaster("No Optional Fields Exist", 2);
        });
    };
    OptionalFieldComponent.prototype.updateOptionalFieldSettings = function () {
        var contextObj = this;
        var fieldobj = new Array();
        var contextObj = this;
        debugger;
        for (var _i = 0, _a = this.itemsSource; _i < _a.length; _i++) {
            var item = _a[_i];
            fieldobj.push({
                FieldSubscriptionCategoryId: this.fieldSubscriptionCategoryId,
                ReportFieldId: item['Id'],
                IsSubscribed: item['Required?']
            });
        }
        this.employeeService.updateOptionalFields(JSON.stringify(fieldobj)).subscribe(function (resultData) {
            if (resultData.ServerId == 1) {
                contextObj.notificationService.ShowToaster("Optional Field Settings updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
        ;
    };
    OptionalFieldComponent.prototype.onCellEdit = function (event) {
        var context = this;
        if (event["dataKeyValue"] == 7576) {
            context.itemsSource.find(function (item) {
                if (item.Id == 7577) {
                    item["IsSubscribed"] = event["isChecked"];
                    item["Required?"] = event["isChecked"];
                    return true;
                }
                else
                    return false;
            });
        }
        else if (event["dataKeyValue"] == 7577) {
            context.itemsSource.find(function (item) {
                if (item.Id == 7576) {
                    item["IsSubscribed"] = event["isChecked"];
                    item["Required?"] = event["isChecked"];
                    return true;
                }
                else
                    return false;
            });
        }
    };
    OptionalFieldComponent = __decorate([
        core_1.Component({
            selector: 'optionalfield',
            templateUrl: 'app/Views/Employee/General Settings/optionalFields.component.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [employee_services_1.EmployeeService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], OptionalFieldComponent);
    return OptionalFieldComponent;
}());
exports.OptionalFieldComponent = OptionalFieldComponent;
//# sourceMappingURL=optionalfields.component.js.map