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
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../../Framework/Whatever/Sort/sort.component');
var http_1 = require('@angular/http');
var list_component_1 = require('../../../../Framework/Whatever/List/list.component');
var field_component_1 = require('../../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var SpacePlanningRequestComponent = (function () {
    function SpacePlanningRequestComponent(notificationService, employeeService) {
        this.notificationService = notificationService;
        this.employeeService = employeeService;
        this.menuData = [
            {
                "id": 1,
                "title": "Review",
                "image": "Review",
                "path": "Review",
                "submenu": null
            },
        ];
        this.types = false;
        this.enableMenu = [];
        this.selIds = new Array();
    }
    SpacePlanningRequestComponent.prototype.ngOnInit = function () {
        this.pagePath = "Employee / Tools/ SpacePlanning";
        var contextObj = this;
        this.employeeService.getSpacePlanningRequestFields().subscribe(function (resultData) {
            console.log('SpacePlanningRequest listcol', resultData["Data"]);
            contextObj.fields = (resultData["Data"]);
        });
        this.employeeService.getSpacePlanningRequestData().subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                //  contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                console.log("data: ", resultData["Data"]);
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Space Planning Request Approved", 2);
            }
        });
    };
    SpacePlanningRequestComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 1) {
        }
    };
    SpacePlanningRequestComponent.prototype.onSorting = function (event) {
        var _this = this;
        this.employeeService.getSpacePlanningRequestDataSort(event.sortDirection, event.selectedField).subscribe(function (resultData) { return _this.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]); });
    };
    SpacePlanningRequestComponent = __decorate([
        core_1.Component({
            selector: 'space-planning-request',
            templateUrl: './app/Views/Employee/Tools/SpacePlanning/space-planning-request.component.html',
            directives: [submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, page_component_1.PageComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, employee_services_1.EmployeeService]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, employee_services_1.EmployeeService])
    ], SpacePlanningRequestComponent);
    return SpacePlanningRequestComponent;
}());
exports.SpacePlanningRequestComponent = SpacePlanningRequestComponent;
//# sourceMappingURL=space-planning-request.component.js.map