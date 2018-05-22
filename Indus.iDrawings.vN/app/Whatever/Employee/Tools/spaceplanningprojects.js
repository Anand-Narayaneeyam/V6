var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../space/space data/floor-selection.component.ts" />
var core_1 = require('@angular/core');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var planningproject_component_1 = require('./planningproject.component');
var floor_selection_component_1 = require('../../space/space data/floor-selection.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var stackplans_component_1 = require('./stackplans.component');
var SpacePlanningProjectComponent = (function () {
    function SpacePlanningProjectComponent(employeeService, _notificationService) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.pagePath = "Employees / Projects";
        this.selectedTab = 0;
        this.moduleId = 5;
        this.targetId = 2;
        this.stackPlanId = 0;
        this.prjStatusId = 0;
        this.moveProjectId = 0;
        this.localselection = 0;
    }
    SpacePlanningProjectComponent.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
        switch (event[0]) {
            case 0:
                this.pagePath = "Employees / Projects";
                break;
        }
    };
    SpacePlanningProjectComponent.prototype.Action = function (event) {
        var contextObj = this;
        this.eventaction = "";
        if (event["action"] == "Floor") {
            this.pagePath = "Employees / Projects / Select Floors";
            this.localselection = 1;
            this.eventaction = "Flooraction";
            this.id = event["id"];
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 50);
        }
        else if (event["action"] == "StackPlans") {
            this.localselection = 2;
            this.eventaction = "StackPlans";
            this.id = event["id"];
            this.prjStatusId = event["prjtStatusId"];
            this.pagePath = "Employees / Projects / Stack Plans";
            this.moveProjectId = event["id"][0];
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 50);
        }
        else {
            this.pagePath = "Employees / Projects";
            setTimeout(function () {
                contextObj.selectedTab = 0;
            }, 50);
        }
    };
    SpacePlanningProjectComponent.prototype.getSelectedIds = function (event) {
        var contextObj = this;
        console.log(event["SelectedIds"]);
        this.employeeService.updateEmployeeMoveProjectFloors(this.id, event["SelectedIds"]).subscribe(function (resultData) {
            contextObj.success = (resultData["Data"]);
            if (contextObj.success["StatusId"] == 1) {
                contextObj._notificationService.ShowToaster("Floor(s) added", 3);
            }
            else if (contextObj.success["StatusId"] == 0) {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
            else if (contextObj.success["StatusId"] == 3) {
                if (contextObj.success["ServerId"] == 0) {
                    contextObj._notificationService.ShowToaster("Floor(s) added", 3);
                }
            }
        });
    };
    SpacePlanningProjectComponent.prototype.onTabClose = function (event) {
        console.log(event);
        this.eventaction = "";
        this.selectedTab = event[0];
    };
    SpacePlanningProjectComponent = __decorate([
        core_1.Component({
            selector: 'space-planning-project',
            templateUrl: './app/Views/Employee/Tools/spaceplanningprojects.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, page_component_1.PageComponent, planningproject_component_1.PlanningProjectComponent, floor_selection_component_1.FloorSelectionComponent, stackplans_component_1.StackPlansComponent],
            providers: [notify_service_1.NotificationService, employee_services_1.EmployeeService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], SpacePlanningProjectComponent);
    return SpacePlanningProjectComponent;
}());
exports.SpacePlanningProjectComponent = SpacePlanningProjectComponent;
//# sourceMappingURL=spaceplanningprojects.js.map