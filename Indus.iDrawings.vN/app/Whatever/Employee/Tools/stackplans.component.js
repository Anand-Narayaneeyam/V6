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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var viewstack_component_1 = require('./viewstack.component');
var General_1 = require('../../../Models/Common/General');
var StackPlansComponent = (function () {
    function StackPlansComponent(employeeService, _notificationService, generFun) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.enablePlansMenu = [0, 1, 2, 3, 4];
        this.Position = "top-right";
        this.width = 300;
        this.change = false;
        this.showSlide = false;
        this.showstack = false;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Id]' };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.pageTitle = "Space Assignment Plan";
        this.stackplansMenu = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Approve",
                "image": "Approve",
                "path": "Approve",
                "submenu": null
            },
            {
                "id": 4,
                "title": "View Stack",
                "image": "View Stack",
                "path": "View Stack",
                "submenu": null
            }
        ];
        this.isApproved = new core_1.EventEmitter();
        this.fieldobj = new Array();
    }
    StackPlansComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        var stackplansMenuDl = this.stackplansMenu.filter(function (el) {
            if (contextObj.prjstatusId != 1) {
                if (el["title"] == "View Stack")
                    return true;
                else
                    return false;
            }
            else {
                if (el["title"] != "View Stack")
                    return true;
                else
                    return false;
            }
        });
        this.stackplansMenu = stackplansMenuDl;
        this.employeeService.getStackPlansListField().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        contextObj.fieldobj.push({
            ReportFieldId: 8972,
            Value: this.MoveProjectId
        }, {
            ReportFieldId: 8971,
            Value: this.StackPlanId
        });
        this.dataLoad(1, contextObj);
    };
    StackPlansComponent.prototype.updatePlanningMenu = function (event) {
        this.showstack = false;
        switch (event.value) {
            case 0:
                this.selectedIdForStack = 0;
                this.addEditStack();
                break;
            case 1:
                this.selectedIdForStack = this.inputItems.selectedIds[0];
                this.addEditStack();
                break;
            case 2: {
                this.deleteStackPlan();
                break;
            }
            case 3: {
                this.approveStackPlan();
                break;
            }
            case 4: {
                this.selectedIdForStack = this.inputItems.selectedIds[0];
                this.addEditStack();
                break;
            }
        }
    };
    StackPlansComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    StackPlansComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    StackPlansComponent.prototype.dataLoad = function (target, context) {
        context.employeeService.getStackPlansListData(context.fieldobj, context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {
            if (context.generFun.checkForUnhandledErrors(result)) {
                context.totalItems = result["Data"]["DataCount"];
                if (context.totalItems == 0) {
                    context._notificationService.ShowToaster("No Stack Plans exist", 2);
                    if (context.prjstatusId == 1) {
                        context.enablePlansMenu = [0];
                    }
                    else {
                        context.enablePlansMenu = [4];
                    }
                }
                else {
                    context.itemsSource = JSON.parse(result["Data"]["FieldBinderData"]);
                    context.itemsPerPage = result["Data"]["RowsPerPage"];
                }
            }
        });
    };
    StackPlansComponent.prototype.addEditStack = function () {
        this.showstack = true;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    StackPlansComponent.prototype.saveStackRow = function (event) {
        var retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, event["actionName"], event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        this.itemsSource = retUpdatedSrc["itemSrc"];
        if (event["actionName"] == "add") {
            this.totalItems = retUpdatedSrc["itemCount"];
            this.enablePlansMenu = [0, 1, 2, 3];
        }
        this.showstack = false;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    StackPlansComponent.prototype.deleteStackPlan = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            contextObj.menuDeleteClick();
        }
    };
    StackPlansComponent.prototype.approveStackPlan = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            var fieldobj1 = new Array();
            fieldobj1.push({
                ReportFieldId: 8972,
                Value: this.MoveProjectId
            }, {
                ReportFieldId: 8971,
                Value: this.inputItems.selectedIds[0]
            });
            this.employeeService.approveStackPlans(fieldobj1, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.employeeService.getStackPlansListData(contextObj.fieldobj, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        contextObj._notificationService.ShowToaster("Selected Stack Plan approved", 3);
                        contextObj.stackplansMenu = [
                            {
                                "id": 4,
                                "title": "View Stack",
                                "image": "View Stack",
                                "path": "View Stack",
                                "submenu": null
                            }
                        ];
                        contextObj.enablePlansMenu = [4];
                        contextObj.prjstatusId = 27;
                    });
                    contextObj.isApproved.emit({ "approved": true });
                }
                else {
                    contextObj._notificationService.ShowToaster(resultData["Data"].Message, 2);
                }
            });
        }
    };
    StackPlansComponent.prototype.okDelete = function ($event) {
        var contextObj = this;
        this.employeeService.deleteStackPlans(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems == 0) {
                    contextObj.enablePlansMenu = [0];
                }
                contextObj._notificationService.ShowToaster("Selected Stack plan deleted", 3);
            }
        });
        this.showSlide = !this.showSlide;
    };
    StackPlansComponent.prototype.menuDeleteClick = function () {
        this.width = 300;
        this.change = !this.change;
        this.showSlide = !this.showSlide;
    };
    StackPlansComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    StackPlansComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StackPlansComponent.prototype, "MoveProjectId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StackPlansComponent.prototype, "StackPlanId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StackPlansComponent.prototype, "prjstatusId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StackPlansComponent.prototype, "isApproved", void 0);
    StackPlansComponent = __decorate([
        core_1.Component({
            selector: 'stack-plans',
            templateUrl: './app/Views/Employee/Tools/stackplans.component.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, page_component_1.PageComponent, planningproject_component_1.PlanningProjectComponent, floor_selection_component_1.FloorSelectionComponent, grid_component_1.GridComponent, page_component_1.PageComponent,
                submenu_component_1.SubMenu, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, viewstack_component_1.ViewStacktComponent, paging_component_1.PagingComponent],
            providers: [notify_service_1.NotificationService, employee_services_1.EmployeeService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], StackPlansComponent);
    return StackPlansComponent;
}());
exports.StackPlansComponent = StackPlansComponent;
//# sourceMappingURL=stackplans.component.js.map