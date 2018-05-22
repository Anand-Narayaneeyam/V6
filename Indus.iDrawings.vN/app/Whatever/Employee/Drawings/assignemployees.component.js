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
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var opendrawing_component_1 = require('../../common/opendrawing/opendrawing.component');
var floordrawing_list_component_1 = require('../../common/drawingdetails/floordrawing-list.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var administration_service_1 = require('../../../models/administration/administration.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var AssignEmployees = (function () {
    function AssignEmployees(notificationService, administrationService) {
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.outAssignedEmpIds = new core_1.EventEmitter();
        this.selectedTab = 0;
        this.moduleId = 5;
        this.floorTabName = "Drawings";
        this.viewDrawing = false;
        this.IsOpenDrawingComponentActive = false;
        this.totalItems = 0;
        this.drawingType = 1;
        this.closeTbFuns = undefined;
        this.pageTarget = 2;
        this.outDrawingobject = new core_1.EventEmitter();
        this.onDrawingClose = new core_1.EventEmitter();
        this.splitViewDataGrid = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.assignedEmpId = [];
        this.menuData = [
            {
                "id": 4,
                "title": "View",
                "image": "View",
                "path": "View",
                "submenu": null
            }];
        this.enableMenu = [4];
    }
    AssignEmployees.prototype.getSelectedTab = function (event) {
        //if (event[0] == 0 && event[1] == true && this.IsOpenDrawingComponentActive == true) {
        //    this.outAssignedEmpIds.emit(this.assignedEmpId);
        //    this.onDrawingClose.emit({});
        //}
        if (event[0] == 1) {
        }
    };
    AssignEmployees.prototype.updateFloorDrawingSelectedID = function (event) {
        var contextObj = this;
        contextObj.selectedFloorIds = event["scopefloordrawing"];
        contextObj.totalItems = event.totalItems;
        contextObj.drawingId = event.rowData.DrawingId;
        contextObj.drawingCategoryId = event.rowData.DrawingCategoryId;
        contextObj.revisionNo = event.rowData['Revision No.'];
    };
    AssignEmployees.prototype.onSubMenuChange = function (event) {
        if (event.value == 4) {
            this.viewDrawings();
        }
    };
    AssignEmployees.prototype.viewDrawings = function () {
        var contextObj = this;
        contextObj.splitViewDataGrid.secondaryArea = 79;
        if (contextObj.selectedFloorIds)
            if (contextObj.selectedFloorIds.length > 1) {
                contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else {
                this.menuData = null;
                //if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                //    this.IsOpenDrawingComponentActive = false;
                //    this.viewDrawing = false;
                //}
                setTimeout(function () {
                    contextObj.IsOpenDrawingComponentActive = true;
                    contextObj.floorTabName = "View Drawing";
                    contextObj.updateCrossSession(contextObj.selectedFloorIds[0]);
                }, 50);
                setTimeout(function () {
                    contextObj.selectedTab = 0;
                }, 100);
            }
    };
    AssignEmployees.prototype.updateCrossSession = function (SelectedId) {
        this.administrationService.ChangeCrossSessionValue(16, SelectedId).subscribe(function (resultData) {
        });
    };
    AssignEmployees.prototype.outDrawingObject = function (event) {
        this.objiWhiz = event.dwgObject;
        this.outDrawingobject.emit(event);
    };
    AssignEmployees.prototype.onTabBeforeClose = function ($event) {
        var contextObj = this;
        this.closeTbFuns = $event;
        if (contextObj.objiWhiz) {
            contextObj.objiWhiz.close(function (returnCode) {
                contextObj.onTabClose();
            });
        }
    };
    AssignEmployees.prototype.onTabClose = function () {
        var callBackForCloseTab = this.closeTbFuns[1];
        var selectedTabObj = this.closeTbFuns[2];
        var tabContextObj = this.closeTbFuns[3];
        callBackForCloseTab(selectedTabObj, tabContextObj, "out");
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
        this.onDrawingClose.emit({});
    };
    AssignEmployees.prototype.assignedEmpIds = function (data) {
        this.assignedEmpId = data;
        this.outAssignedEmpIds.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssignEmployees.prototype, "empDetails", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignEmployees.prototype, "outAssignedEmpIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignEmployees.prototype, "outDrawingobject", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignEmployees.prototype, "onDrawingClose", void 0);
    AssignEmployees = __decorate([
        core_1.Component({
            selector: 'assignemployees',
            templateUrl: './app/Views/Employee/Drawings/assignEmployees.component.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, opendrawing_component_1.OpenDrawing, floordrawing_list_component_1.FloorDrawingListComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent],
            providers: [notify_service_1.NotificationService, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService])
    ], AssignEmployees);
    return AssignEmployees;
}());
exports.AssignEmployees = AssignEmployees;
//# sourceMappingURL=assignemployees.component.js.map