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
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var opendrawing_component_1 = require('../../../common/opendrawing/opendrawing.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var ScenarioDrawingComponent = (function () {
    function ScenarioDrawingComponent(employeeService, _notificationService) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        //drawingId: number = 0;
        //revisionNo: number = -1;
        //pageTarget: number = 5;
        //drawingType: number = 1;
        //moduleId: number = 5;
        this.inputItems = { dataKey: "DrawingId", groupBy: [], grpWithCheckBx: false, sortCol: "[DrawingId]", sortDir: "ASC", selectedIds: [], allowAdd: false };
        this.selectedTab = 0;
        this.viewDrawing = false;
        this.IsOpenDrawingComponentActive = false;
        // scenarioDetails: any;
        this.menuData = [
            {
                "id": 0,
                "title": "View Drawing",
                "image": "View",
                "path": "View",
                "submenu": null
            }
        ];
        this.enableMenu = [0];
        this.splitViewDataGrid = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    }
    ScenarioDrawingComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    ScenarioDrawingComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.employeeService.getScenarioDrawingListColumns().subscribe(function (resultData) {
            contextObj.fieldDetScenarioDrawing = resultData["Data"];
        });
        this.dataLoad(1, contextObj);
    };
    ScenarioDrawingComponent.prototype.dataLoad = function (target, context) {
        context.employeeService.scenarioListDrawingsData(context.selctedRowData["Id"], context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context._notificationService.ShowToaster("No Drawings exist", 2);
                context.enableMenu = [];
            }
        });
    };
    ScenarioDrawingComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    ScenarioDrawingComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    ScenarioDrawingComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.openDrawing();
        }
    };
    //onDrawingListSelectionChange(event: any) {
    //this.drawingId = event.rowData.DrawingId;
    //this.scenarioDetails = event.rowData;
    //}
    ScenarioDrawingComponent.prototype.openDrawing = function () {
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            contextObj.inputItems.rowData.ScenarioId = contextObj.selctedRowData["Id"];
            contextObj.inputItems.rowData.ScenarioStatusId = contextObj.selctedRowData["StatusId"];
            if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                this.IsOpenDrawingComponentActive = false;
                this.viewDrawing = false;
            }
            setTimeout(function () {
                contextObj.IsOpenDrawingComponentActive = true;
                contextObj.viewDrawing = true;
            }, 50);
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 100);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScenarioDrawingComponent.prototype, "selctedRowData", void 0);
    ScenarioDrawingComponent = __decorate([
        core_1.Component({
            selector: 'scenario-drawings',
            templateUrl: './app/Views/Employee/Tools/SpacePlanning/scenario-drawing.component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, opendrawing_component_1.OpenDrawing],
            providers: [employee_services_1.EmployeeService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], ScenarioDrawingComponent);
    return ScenarioDrawingComponent;
}());
exports.ScenarioDrawingComponent = ScenarioDrawingComponent;
//# sourceMappingURL=scenario-drawings.component.js.map