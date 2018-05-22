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
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../../Models/Common/General');
var addeditscenario_component_1 = require('./addeditscenario.component');
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var scenario_drawings_component_1 = require('./scenario-drawings.component');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var ScenariosComponent = (function () {
    function ScenariosComponent(employeeService, _notificationService, generFun) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.selectedTab = 0;
        this.showSlide = false;
        this.Position = "top-right";
        this.inputItems = { dataKey: "Id", sortCol: "Id", sortDir: "ASC", selectedIds: [], allowAdd: false, allowEdit: false, isautosizecolms: false };
        this.menuData = [
            {
                "id": 0,
                "title": "Edit Scenario",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Drawings",
                "image": "Drawings",
                "path": "Drawings",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Create a Move Project",
                "image": "Users",
                "path": "Users",
                "submenu": null
            },
        ];
        this.enableMenu = [0, 1, 2];
        this.pageTitle = "";
        this.splitViewScenario = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    }
    ScenariosComponent.prototype.ngOnInit = function () {
        this.pagePath = "Employee / Scenarios ";
        var contextObj = this;
        this.employeeService.getScenarioListColumns().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                item.Width = "0.5*";
            });
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad(1, contextObj);
    };
    ScenariosComponent.prototype.dataLoad = function (target, context) {
        context.employeeService.scenarioListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context._notificationService.ShowToaster("No Scenarios exist", 2);
                context.enableMenu = [];
            }
        });
    };
    ScenariosComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    ScenariosComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    ScenariosComponent.prototype.onSubMenuChange = function (event) {
        this.target = 0;
        this.pageTitle = "";
        this.splitViewScenario.secondaryArea = 60;
        switch (event.value) {
            case 0:
                this.target = 1;
                this.pageTitle = "Edit Scenario";
                this.editScenario();
                break;
            case 1:
                this.showSlide = false;
                this.createMoveProject();
                break;
            case 2:
                this.target = 2;
                this.pageTitle = "Scenario Drawings";
                this.splitViewScenario.secondaryArea = 79;
                this.scenarioDrawings();
                break;
        }
    };
    ScenariosComponent.prototype.editScenario = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this._notificationService.ShowToaster("Select a Scenario", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            if (this.inputItems.rowData.StatusId == "1") {
                this.employeeService.loadEditScenario(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    //resultData["Data"].find(function (item) {
                    //    if(item.FieldId =)
                    //})
                    contextObj.fieldDetailsAddEdit = resultData["Data"];
                });
                contextObj.splitViewScenario.showSecondaryView = !contextObj.splitViewScenario.showSecondaryView;
            }
            else {
                this._notificationService.ShowToaster("Scenario is not active", 2);
            }
        }
    };
    ScenariosComponent.prototype.createMoveProject = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this._notificationService.ShowToaster("Select a Scenario", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            switch (this.inputItems.rowData.StatusId) {
                case 1:
                    contextObj.showSlide = true;
                    break;
                case 30:
                    this._notificationService.ShowToaster("Move Project is already created", 2);
                    break;
                default:
                    this._notificationService.ShowToaster("Select an Active Scenario", 2);
                    break;
            }
        }
    };
    ScenariosComponent.prototype.convertToMovePrjtClick = function (event) {
        var contextObj = this;
        var PageTarget;
        var rptArray = new Array();
        rptArray.push({
            ReportFieldId: 907,
            Value: this.inputItems.selectedIds[0]
        });
        this.employeeService.convertScenarioToMoveProject(JSON.stringify(rptArray)).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.refreshgrid = [];
                contextObj.showSlide = !contextObj.showSlide;
                contextObj._notificationService.ShowToaster("Scenario is converted to Move Project", 3);
                contextObj.dataLoad(0, contextObj);
            }
            else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    ScenariosComponent.prototype.ChangeStatus = function (context) {
        context.itemSource.find(function (item) {
            if (item.Id == context.inputItems.selectedIds[0]) {
                item.Status = "Move Project Created";
                item.StatusId = "30";
                context.refreshgrid = context.refreshgrid.concat([true]);
                return true;
            }
            else
                return false;
        });
    };
    ScenariosComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    ScenariosComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ScenariosComponent.prototype.OnSuccessfulSubmit = function (event) {
        this.refreshgrid = [];
        var retUpdatedSrc = this.generFun.updateDataSource(this.itemSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        this.refreshgrid = this.refreshgrid.concat([true]);
        this.splitViewScenario.showSecondaryView = !this.splitViewScenario.showSecondaryView;
    };
    ScenariosComponent.prototype.scenarioDrawings = function () {
        switch (this.selectedTab) {
            case 0:
                this.scenarioDrawingGrid();
                break;
            case 1:
                /*code block for Open Drawing*/
                break;
        }
    };
    ScenariosComponent.prototype.scenarioDrawingGrid = function () {
        var contextObj = this;
        contextObj.target = 2;
        contextObj.selectedScenarioId = contextObj.inputItems.rowData.Id;
        contextObj.strScenarioName = contextObj.inputItems.rowData["Scenario Name"];
        if (contextObj.selectedScenarioId != null) {
            contextObj.splitViewScenario.showSecondaryView = true;
        }
    };
    ScenariosComponent = __decorate([
        core_1.Component({
            selector: 'scenarios',
            templateUrl: './app/Views/Employee/Tools/SpacePlanning/scenarios.component.html',
            directives: [page_component_1.PageComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, addeditscenario_component_1.AddEditScenariosComponent, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, scenario_drawings_component_1.ScenarioDrawingComponent],
            providers: [employee_services_1.EmployeeService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ScenariosComponent);
    return ScenariosComponent;
}());
exports.ScenariosComponent = ScenariosComponent;
//# sourceMappingURL=scenarios.component.js.map