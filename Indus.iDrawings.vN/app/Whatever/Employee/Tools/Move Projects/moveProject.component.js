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
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var showdetails_component_1 = require('./showdetails.component');
var General_1 = require('../../../../Models/Common/General');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var MoveProjectComponent = (function () {
    function MoveProjectComponent(employeeService, _notificationService, generFun) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.moveProjectMenuTotalItems = 8;
        this.pagePath = "Employees / Move Projects ";
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
        this.btnName = "Generate";
        this.dataKey = "Id";
        this.pageTitle = "Move Project Work Order";
        this.selectedTab = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Id]' };
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.isMoveExecutionFlowSubscribed = false;
    }
    MoveProjectComponent.prototype.updatemoveProjectMenu = function (event) {
        switch (this.moduleId) {
            case 5:
                switch (this.targetId) {
                    case 2:
                        this.MenuClickMoveProjectInSpacePlanning(event);
                        break;
                }
                break;
        }
    };
    MoveProjectComponent.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
            this.loaddata();
        }
    };
    MoveProjectComponent.prototype.onTabClose = function (event) {
        this.eventAction = "";
        this.enablemoveProjectMenu = [0, 1, 2];
        this.selectedTab = event[0];
        this.pagePath = "Employees / Move Projects ";
    };
    MoveProjectComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.loaddata();
    };
    MoveProjectComponent.prototype.onSort = function (event) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.loaddata();
    };
    MoveProjectComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.employeeService.checkSubscribedFeature('234').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0)
                return;
            contextObj.isMoveExecutionFlowSubscribed = result["Data"][0]["IsSubscribed"];
        });
        contextObj.employeeService.getMoveProjectList().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        this.loaddata();
        this.loadMenu();
    };
    MoveProjectComponent.prototype.loaddata = function () {
        var contextObj = this;
        switch (this.moduleId) {
            case 5:
                switch (this.targetId) {
                    case 2:
                        var fieldobj = new Array();
                        fieldobj.push({
                            ReportFieldId: 893,
                            Value: null
                        });
                        this.employeeService.getMoveProjectListData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                                if (contextObj.itemsSource[i].StatusId == 30) {
                                    contextObj.itemsSource[i].Status = "Approved";
                                }
                            }
                            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                            if (contextObj.totalItems == 0) {
                                contextObj.enablemoveProjectMenu = [];
                                contextObj._notificationService.ShowToaster("No Move Projects exist", 2);
                            }
                            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                        });
                        break;
                }
                break;
        }
    };
    MoveProjectComponent.prototype.loadMenu = function () {
        switch (this.moduleId) {
            case 5:
                switch (this.targetId) {
                    case 2:
                        this.moveProjectMenu = [
                            //    {
                            //    "id": 0,
                            //    "title": "View Stack Plan",
                            //    "image": "",
                            //    "path": "",
                            //    "submenu": null
                            //},
                            {
                                "id": 1,
                                "title": "Show Details",
                                "image": "Show Details",
                                "path": "Show Details",
                                "submenu": null
                            },
                            {
                                "id": 2,
                                "title": "Execute",
                                "image": "Execute",
                                "path": "Execute",
                                "submenu": null
                            }];
                        this.enablemoveProjectMenu = [0, 1, 2];
                        break;
                }
                break;
        }
    };
    MoveProjectComponent.prototype.MenuClickMoveProjectInSpacePlanning = function (event) {
        var contextObj = this;
        var selected = contextObj.itemsSource.find(function (item) {
            return item.Id === contextObj.inputItems.selectedIds[0];
        });
        debugger;
        switch (event.value) {
            case 1:
                this.eventAction = "ShowDetails";
                this.localselection = 1;
                this.pagePath = "Employees / Move Projects / Show Details  ";
                this.enablemoveProjectMenu = [];
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
                contextObj.MoveProjectStatus = selected.Status;
                break;
            case 2:
                if (selected.Status == "Executed")
                    contextObj._notificationService.ShowToaster("Move Project is already executed", 2);
                else if (selected.Status == "Deleted")
                    contextObj._notificationService.ShowToaster("Move Project is already deleted", 2);
                else if (selected.Status == "Discarded")
                    contextObj._notificationService.ShowToaster("Move Project is discarded", 2);
                else if (selected.Status == "Work Order Generated")
                    contextObj._notificationService.ShowToaster("Work Order is generated for the selected Move Project", 2);
                else if (contextObj.isMoveExecutionFlowSubscribed)
                    contextObj.showSlide = !contextObj.showSlide;
                else
                    contextObj.executeMoveProject();
                break;
        }
    };
    /**
     * slide events
     */
    MoveProjectComponent.prototype.onYesClick = function (event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        contextObj.employeeService.getMoveProjectExecutionRequestFields().subscribe(function (resultData) {
            debugger;
            contextObj.executeFlowFields = resultData["Data"];
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    MoveProjectComponent.prototype.onWorkFlowSubmit = function (event) {
        var contextObj = this;
        debugger;
        var fieldObjectArray = JSON.parse(event["fieldobject"]).filter(function (item) { return item.ReportFieldId != 12254; });
        var actionUser = contextObj.executeFlowFields.find(function (item) {
            return item.ReportFieldId === 12254;
        });
        if (actionUser.MultiFieldValues != null) {
            for (var _i = 0, _a = actionUser.MultiFieldValues; _i < _a.length; _i++) {
                var item = _a[_i];
                fieldObjectArray.push({
                    ReportFieldId: 12254,
                    Value: item
                });
            }
        }
        contextObj.employeeService.submitMoveExecutionRequestDetails(1, JSON.stringify(fieldObjectArray), 0, contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            debugger;
            contextObj.refreshgrid = [];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var retUpdatedSrc = JSON.parse(resultData["Data"]["Data"]);
                    if (retUpdatedSrc && retUpdatedSrc.length > 0) {
                        for (var i = 0; i < contextObj.itemsSource.length; i++) {
                            if (contextObj.itemsSource[i][contextObj.inputItems.dataKey] == retUpdatedSrc[0][contextObj.inputItems.dataKey]) {
                                contextObj.itemsSource[i] = retUpdatedSrc[0];
                            }
                        }
                    }
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    contextObj._notificationService.ShowToaster("Move Project Work Order generated", 3);
                    break;
            }
        });
    };
    MoveProjectComponent.prototype.onNoClick = function (event) {
        this.showSlide = !this.showSlide;
        this.executeMoveProject();
    };
    MoveProjectComponent.prototype.executeMoveProject = function () {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 893,
            Value: this.inputItems.selectedIds[0].toString()
        }, {
            ReportFieldId: 885,
            Value: this.inputItems.selectedIds[0].toString()
        }, {
            ReportFieldId: 884,
            Value: null
        });
        contextObj.refreshgrid = [];
        contextObj.employeeService.executeMoveProject(fieldobj).subscribe(function (resultData) {
            if (resultData["Data"]["ServerId"] > 0) {
                contextObj.itemsSource.find(function (item) {
                    if (item["Id"] == contextObj.inputItems.selectedIds[0]) {
                        item["StatusId"] = 29;
                        item["Status"] = "Executed";
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        contextObj._notificationService.ShowToaster("Move Project executed", 2);
                        return true;
                    }
                    else
                        return false;
                });
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Already exist", 5);
                        }
                        else if (resultData["Data"].ServerId == -3)
                            contextObj._notificationService.ShowToaster("No Employee Move Details added to this Move Project", 2);
                        break;
                }
            }
        });
    };
    MoveProjectComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    MoveProjectComponent.prototype.onDropDownChange = function (event) {
        var contextObj = this;
        var actionUser = contextObj.executeFlowFields.find(function (item) {
            return item.ReportFieldId === 12254;
        });
        if (event.FieldValue == "-1") {
            actionUser.IsVisible = false;
            actionUser.IsMandatory = false;
            actionUser.HasValidationError = false;
            actionUser.LookupDetails.LookupValues = [];
            actionUser.MultiFieldValues = [];
            return;
        }
        contextObj.employeeService.getActionPointUserLookupValues(0, parseInt(event.FieldValue), 5, 20).subscribe(function (resultData) {
            if (resultData["FieldBinderData"] != "[]") {
                var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                actionUser.LookupDetails.LookupValues = lookUpArray;
                actionUser.IsVisible = true;
                actionUser.IsMandatory = true;
            }
            else {
                actionUser.IsVisible = false;
                actionUser.IsMandatory = false;
                actionUser.HasValidationError = false;
                actionUser.LookupDetails.LookupValues = [];
                actionUser.MultiFieldValues = [];
            }
        });
    };
    MoveProjectComponent = __decorate([
        core_1.Component({
            selector: 'move-project',
            templateUrl: './app/Views/Employee/Tools/Move Projects/moveProject.component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, showdetails_component_1.ShowDetailsComponent, notify_component_1.Notification, page_component_1.PageComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent],
            providers: [notify_service_1.NotificationService, employee_services_1.EmployeeService],
            inputs: ['moduleId', 'targetId']
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], MoveProjectComponent);
    return MoveProjectComponent;
}());
exports.MoveProjectComponent = MoveProjectComponent;
//# sourceMappingURL=moveProject.component.js.map