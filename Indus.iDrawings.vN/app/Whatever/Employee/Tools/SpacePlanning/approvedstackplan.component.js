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
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var http_1 = require('@angular/http');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../../Models/Common/General');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var stackplan_details_1 = require('./stackplan-details');
var viewstack_component_1 = require('../viewstack.component');
var addeditscenario_component_1 = require('./addeditscenario.component');
var ApprovedStackPlanComponent = (function () {
    function ApprovedStackPlanComponent(employeeService, _notificationService, generFun) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.pageTitle = "";
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, allowEdit: false };
        this.selectedTab = 0;
        this.isTabOpen = false;
        this.showSlide = false;
        this.scenarioSlideText = "";
        this.showSlideMoveProject = false;
        this.Position = "top-right";
        this.splitViewApprovedStackPlan = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.menuData = [
            {
                "id": 0,
                "title": "View Stack",
                "image": "View Stack",
                "path": "View Stack",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Show Details",
                "image": "Show Details",
                "path": "Show Details",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Create a Scenario",
                "image": "Create a Scenario",
                "path": "Create a Scenario",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Convert to Move Project",
                "image": "Convert to Move Project",
                "path": "Convert to Move Project",
                "submenu": null
            }
        ];
        this.enableMenu = [0, 1, 2, 3];
        this.rptFieldArray = new Array();
    }
    ApprovedStackPlanComponent.prototype.ngOnInit = function () {
        this.pagePath = "Employees / Approved Stack Plans ";
        var contextObj = this;
        this.employeeService.getApprovedStackPlanListColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        contextObj.loadData();
    };
    ApprovedStackPlanComponent.prototype.loadData = function () {
        this.rptFieldArray.push({
            ReportFieldId: 893,
            Value: "20"
        });
        var contextObj = this;
        this.employeeService.postApprovedStackPlanListData(JSON.stringify(this.rptFieldArray), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            if (resultData["Data"].DataCount > 0) {
                contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
            }
            else {
                contextObj._notificationService.ShowToaster("No Approved Stack Plans exist", 2);
            }
        });
    };
    ApprovedStackPlanComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        this.rptFieldArray = new Array();
        contextObj.ProjectId = this.inputItems.selectedIds[0];
        this.rptFieldArray.push({
            ReportFieldId: 893,
            Value: contextObj.ProjectId.toString()
        });
        if (this.inputItems.selectedIds.length == 0) {
            this._notificationService.ShowToaster("Select a Stack Plan", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            if (event.value == 0) {
                this.target = 1;
                this.pageTitle = "Space Assignment Plan";
                this.StackPlanDetailsId;
                this.employeeService.getGetApprovedStackPlanforaProject(JSON.stringify(this.rptFieldArray)).subscribe(function (resultData) {
                    if (resultData.Data != undefined) {
                        if (resultData.Data.FieldBinderData != "[]") {
                            if (JSON.parse(resultData.Data.FieldBinderData)[0] != undefined) {
                                contextObj.StackPlanDetailsId = JSON.parse(resultData.Data.FieldBinderData)[0].StackPlanId;
                                contextObj.splitViewApprovedStackPlan.showSecondaryView = !contextObj.splitViewApprovedStackPlan.showSecondaryView;
                            }
                        }
                        else {
                            contextObj._notificationService.ShowToaster("No stack plans exist", 2);
                        }
                    }
                });
            }
            else if (event.value == 1) {
                var contextObj = this;
                this.localselection = 1;
                contextObj.isTabOpen = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 100);
            }
            else if (event.value == 2) {
                this.showSlide = false;
                this.createScenario();
            }
            else if (event.value == 3) {
                if (this.inputItems.rowData.Status == "Approved") {
                    if (this.inputItems.rowData.PlannedEmployeeExist == 1) {
                        contextObj._notificationService.ShowToaster("Move locations of all employees should be assigned before converting to Move Project", 2);
                        this.showSlideMoveProject = false;
                    }
                    else {
                        this.GetMoveProjectEmployeeDetails(1);
                    }
                }
                else if (this.inputItems.rowData.Status == "Move Project Created") {
                    contextObj._notificationService.ShowToaster("Selected Stack Plan is already converted to Move Project", 2);
                    this.showSlideMoveProject = false;
                }
                else if (this.inputItems.rowData.Status == "Executed") {
                    contextObj._notificationService.ShowToaster("Executed Space Planning Project cannot be converted to Move Project", 2);
                    this.showSlideMoveProject = false;
                }
                else if (this.inputItems.rowData.Status == "Discarded") {
                    contextObj._notificationService.ShowToaster("Discarded Space Planning Project cannot be converted to Move Project", 2);
                    this.showSlideMoveProject = false;
                }
                else if (this.inputItems.rowData.Status == "Scenario Created") {
                    contextObj._notificationService.ShowToaster("Scenario is already created for the selected Stack Plan. Move Project can be created through Scenarios", 2);
                    this.showSlideMoveProject = false;
                }
                else if (this.inputItems.rowData.StatusId == 19) {
                    contextObj._notificationService.ShowToaster("Selected Stack Plan is already converted to Move Project", 2);
                    this.showSlideMoveProject = false;
                }
            }
        }
    };
    ApprovedStackPlanComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        var contextObj = this;
        this.employeeService.postApprovedStackPlanListData(JSON.stringify(this.rptFieldArray), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            if (resultData["Data"].DataCount > 0) {
                contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
            }
            else {
                contextObj._notificationService.ShowToaster("No Approved Stack Plans exist", 2);
            }
        });
    };
    ApprovedStackPlanComponent.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    };
    ApprovedStackPlanComponent.prototype.onTabClose = function (event) {
        var contextObj = this;
        this.isTabOpen = false;
        this.selectedTab = event[0];
        contextObj.loadData();
    };
    ApprovedStackPlanComponent.prototype.scenarioOKClick = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        contextObj.employeeService.convertApprovedStackPlanToScenario(JSON.stringify(this.rptFieldArray)).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.itemSource.find(function (item) {
                    if (item["Id"] == contextObj.ProjectId) {
                        item["StatusId"] = 31;
                        item["Status"] = "Scenario Created";
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        contextObj._notificationService.ShowToaster("Scenario created for the Approved Stack Plan", 2);
                        return true;
                    }
                    else
                        return false;
                });
            }
            else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
            contextObj.showSlide = false;
        });
    };
    ApprovedStackPlanComponent.prototype.cancelScenarioClick = function (value) {
        var contextObj = this;
        this.showSlide = false;
    };
    ApprovedStackPlanComponent.prototype.PromptConvertToMoveProject = function (event) {
        /*prompt for Creating a Move Project*/
        var contextObj = this;
        this.ProjectId = this.inputItems.selectedIds[0];
        var reportFieldArray = new Array();
        reportFieldArray.push({
            ReportFieldId: 907,
            Value: this.ProjectId.toString()
        });
        contextObj.refreshgrid = [];
        this.employeeService.postCreateMoveProject(JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.itemSource.find(function (item) {
                    if (item["Id"] == contextObj.ProjectId) {
                        item["StatusId"] = 30;
                        item["Status"] = "Move Project Created";
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        contextObj._notificationService.ShowToaster("Approved Stack Plan is converted to Move Project", 2);
                        return true;
                    }
                    else
                        return false;
                });
            }
            else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
        this.showSlideMoveProject = false;
    };
    ApprovedStackPlanComponent.prototype.ConvertToMoveProjectcancelClick = function (value) {
        var contextObj = this;
        this.showSlideMoveProject = false;
    };
    ApprovedStackPlanComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = false;
        this.showSlideMoveProject = false;
    };
    ApprovedStackPlanComponent.prototype.createScenario = function () {
        var statusId = this.inputItems.rowData.StatusId;
        if (statusId == 29) {
            this._notificationService.ShowToaster("Scenarios cannot be created for executed Stack Plans", 2);
        }
        else if (statusId == 30) {
            this._notificationService.ShowToaster("Selected Stack Plan is already converted to Move Project", 2);
        }
        else if (statusId == 28) {
            this._notificationService.ShowToaster("Scenarios cannot be created for discarded Stack Plans", 2);
        }
        else if (statusId == 19) {
            this._notificationService.ShowToaster("Scenarios cannot be created for Stack Plans in Work Order generated status", 2);
        }
        else if (this.inputItems.rowData.PlannedEmployeeExist == 1) {
            this._notificationService.ShowToaster("Move locations of all employees should be assigned before creating a Scenario", 2);
        }
        else {
            this.GetMoveProjectEmployeeDetails(2);
        }
    };
    ApprovedStackPlanComponent.prototype.GetMoveProjectEmployeeDetails = function (target) {
        var retData = "";
        var context = this;
        this.employeeService.postGetMoveProjectDetailBasedOnStatusId(JSON.stringify(context.rptFieldArray), context.pageIndex, "", context.inputItems.sortDir).subscribe(function (resultData) {
            retData = resultData["Data"].FieldBinderData;
            if (retData == "1") {
                if (target == 1) {
                    context.showSlideMoveProject = true;
                }
                else {
                    context.scenarioSlideText = "Are you sure you want to create a Scenario for the selected Stack Plan?"; //"Are you sure you want to create a Scenario for the selected " + context.inputItems.rowData["Project Name"] + "?";
                    context.showSlide = true;
                }
            }
            else {
                context._notificationService.ShowToaster("No Employee Move Details added to the Space Planning Project: " + context.inputItems.rowData["Project Name"], 2);
            }
        });
        return retData;
    };
    ApprovedStackPlanComponent = __decorate([
        core_1.Component({
            selector: 'approvedstackplan',
            templateUrl: './app/Views/Employee/Tools/SpacePlanning/approvedstackplan.component.html',
            directives: [page_component_1.PageComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, stackplan_details_1.StackPlanDetailsComponent, viewstack_component_1.ViewStacktComponent, addeditscenario_component_1.AddEditScenariosComponent],
            providers: [employee_services_1.EmployeeService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ApprovedStackPlanComponent);
    return ApprovedStackPlanComponent;
}());
exports.ApprovedStackPlanComponent = ApprovedStackPlanComponent;
//# sourceMappingURL=approvedstackplan.component.js.map