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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var reviewMoveExecution_Request_component_1 = require('./reviewMoveExecution-Request.component');
var showdetails_component_1 = require('../tools/move projects/showdetails.component');
var MoveExecutionRequestListComponent = (function () {
    function MoveExecutionRequestListComponent(employeeService, workOrdereService, _notificationService) {
        this.employeeService = employeeService;
        this.workOrdereService = workOrdereService;
        this._notificationService = _notificationService;
        this.pagePath = "Employee / Move Project Work Orders";
        this.selectedTab = 0;
        this.tabDeleteIndex = 0;
        this.action = "review";
        this.btnName = "Save Changes";
        this.menuData = [{
                "id": 1,
                "title": "Review",
                "image": "Review",
                "path": "Review",
                "subMenu": null
            }];
        this.types = true;
        this.enableMenu = [1];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.splitViewTitle = "";
        this.secondaryTarget = 0;
        this.activeTotalItems = 0;
        this.activeItemsPerPage = 0;
        this.activeInputItems = { dataKey: "RequestId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'DESC', sortCol: '[Request Number]' };
        this.activePageIndex = 0;
        this.allTotalItems = 0;
        this.allItemsPerPage = 0;
        this.allInputItems = { dataKey: "RequestId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'DESC', sortCol: '[Request Number]' };
        this.allPageIndex = 0;
        this.reviewTabEnabled = false;
        this.reviewRequestEnabled = false;
        this.addOnTabEnabled = false;
        this.showDetailsEnabled = false;
        this.isTimeSpentSubscribed = false;
        this.isAllTabEnabled = false;
        this.userRoleId = 0;
        this.moveProjectStatus = "Work Order Generated";
    }
    MoveExecutionRequestListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.employeeService.getMoveProjectExecutionTaskListFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
        });
        contextObj.employeeService.checkSubscribedFeature('198').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0)
                return;
            contextObj.isTimeSpentSubscribed = result["Data"][0]["IsSubscribed"];
        });
        contextObj.employeeService.getSessionData().subscribe(function (resultData) {
            debugger;
            console.log(resultData);
            contextObj.userRoleId = resultData["Data"]["UserRoleId"];
            contextObj.isAllTabEnabled = (contextObj.userRoleId == 1 || contextObj.userRoleId == 3 || contextObj.userRoleId == 6);
        });
    };
    /***********************************************************************
     * Data Load Events
     *
     ***********************************************************************/
    MoveExecutionRequestListComponent.prototype.loadActiveData = function (target) {
        var contextObj = this;
        var tempArray = [{ ReportFieldId: 12291, Value: "19" }];
        contextObj.employeeService.getMoveProjectExecutionTasksList(1, JSON.stringify(tempArray), contextObj.activePageIndex, contextObj.activeInputItems.sortCol, contextObj.activeInputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.activeTotalItems = resultData["Data"].DataCount;
            if (contextObj.activeTotalItems > 0) {
                contextObj.activeItemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.activeItemsPerPage = resultData["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.activeItemsSource = [];
                contextObj._notificationService.ShowToaster("No Move Project Work Orders exist", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    MoveExecutionRequestListComponent.prototype.loadAllData = function (target) {
        var contextObj = this;
        var tempArray = [{ ReportFieldId: 12291, Value: "19" }, { ReportFieldId: 12291, Value: "28" }, { ReportFieldId: 12291, Value: "29" }];
        contextObj.employeeService.getMoveProjectExecutionTasksList(1, JSON.stringify(tempArray), contextObj.allPageIndex, contextObj.allInputItems.sortCol, contextObj.allInputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.allTotalItems = resultData["Data"].DataCount;
            if (contextObj.allTotalItems > 0) {
                contextObj.allItemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.allItemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                contextObj._notificationService.ShowToaster("No Move Project Work Orders exist", 2);
            }
        });
    };
    /***********************************************************************
     * Tab Events
     *
     ***********************************************************************/
    MoveExecutionRequestListComponent.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        switch (event[0]) {
            case 0:
                if (event[1] && contextObj.reviewTabEnabled) {
                    if (contextObj.addOnTabEnabled) {
                        contextObj.addOnTabEnabled = false;
                        contextObj.showDetailsEnabled = false;
                        contextObj.tabDeleteIndex = contextObj.isAllTabEnabled ? 3 : 2;
                    }
                    contextObj.reviewTabEnabled = false;
                    contextObj.reviewRequestEnabled = false;
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = contextObj.isAllTabEnabled ? 2 : 1;
                        ;
                    }, 100);
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                }
                contextObj.loadActiveData(1);
                break;
            case 1:
                if (contextObj.isAllTabEnabled) {
                    if (event[1] && contextObj.reviewTabEnabled) {
                        if (contextObj.addOnTabEnabled) {
                            contextObj.addOnTabEnabled = false;
                            contextObj.showDetailsEnabled = false;
                            contextObj.tabDeleteIndex = contextObj.isAllTabEnabled ? 3 : 2;
                        }
                        contextObj.reviewTabEnabled = false;
                        contextObj.reviewRequestEnabled = false;
                        setTimeout(function () {
                            contextObj.tabDeleteIndex = contextObj.isAllTabEnabled ? 2 : 1;
                        }, 100);
                        setTimeout(function () {
                            contextObj.tabDeleteIndex = 0;
                        }, 100);
                    }
                    contextObj.loadAllData(1);
                }
                else {
                    if (!event[1] && contextObj.reviewTabEnabled) {
                        setTimeout(function () {
                            contextObj.reviewRequestEnabled = true;
                        }, 50);
                    }
                    else if (event[1] && contextObj.addOnTabEnabled) {
                        contextObj.addOnTabEnabled = false;
                        contextObj.showDetailsEnabled = false;
                        contextObj.tabDeleteIndex = contextObj.isAllTabEnabled ? 3 : 2;
                        setTimeout(function () {
                            contextObj.tabDeleteIndex = 0;
                        }, 50);
                    }
                }
                break;
            case 2:
                if (contextObj.isAllTabEnabled) {
                    if (!event[1] && contextObj.reviewTabEnabled) {
                        setTimeout(function () {
                            contextObj.reviewRequestEnabled = true;
                        }, 50);
                    }
                    else if (event[1] && contextObj.addOnTabEnabled) {
                        contextObj.addOnTabEnabled = false;
                        contextObj.showDetailsEnabled = false;
                        contextObj.tabDeleteIndex = contextObj.isAllTabEnabled ? 3 : 2;
                        setTimeout(function () {
                            contextObj.tabDeleteIndex = 0;
                        }, 50);
                    }
                }
                else {
                    if (!event[1] && contextObj.addOnTabEnabled) {
                        setTimeout(function () {
                            contextObj.showDetailsEnabled = true;
                        }, 50);
                    }
                }
                break;
            case 3:
                if (!event[1] && contextObj.addOnTabEnabled) {
                    setTimeout(function () {
                        contextObj.showDetailsEnabled = true;
                    }, 50);
                }
                break;
        }
        contextObj.selectedTab = event[0];
    };
    /***********************************************************************
     * Submenu Click
     *
     ***********************************************************************/
    MoveExecutionRequestListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.reviewClick();
                break;
        }
    };
    MoveExecutionRequestListComponent.prototype.reviewClick = function () {
        var contextObj = this;
        contextObj.employeeService.getReviewMoveProjectExecutionData(contextObj.activeInputItems.selectedIds[0], contextObj.activeInputItems.rowData["WorkTypeId"], contextObj.activeInputItems.rowData["CurrentWorkFlowActionPointId"]).subscribe(function (resultData) {
            debugger;
            console.log(resultData);
            contextObj.reviewFields = contextObj.updateFieldObject(resultData["Data"]["FieldBinderList"]);
            contextObj.outcomeData = JSON.parse(resultData["Data"]["OutcomeData"]);
            contextObj.employeeData = JSON.parse(resultData["Data"]["EmployeeData"]);
            contextObj.removeTimeOutActionFromLookUps(contextObj.outcomeData);
            //if (contextObj.isTimeSpentSubscribed)
            //    contextObj.getAutoPopulatedTimeSpentValue();
            contextObj.reviewTabEnabled = true;
            setTimeout(function () {
                contextObj.selectedTab = contextObj.isAllTabEnabled ? 2 : 1;
            }, 50);
        });
    };
    MoveExecutionRequestListComponent.prototype.removeTimeOutActionFromLookUps = function (outcomes) {
        var actionfield = this.reviewFields.find(function (item) {
            return item.ReportFieldId === 5834;
        });
        if (outcomes != null && outcomes.length != 0) {
            actionfield.LookupDetails.LookupValues = outcomes.filter(function (item) {
                return item["OutcomeTypeId"] != 28;
            });
        }
    };
    MoveExecutionRequestListComponent.prototype.getAutoPopulatedTimeSpentValue = function () {
        var contextObj = this;
        contextObj.workOrdereService.getAutoPopulatedTimeSpentValue(contextObj.activeInputItems.rowData["WorkFlowEntityId"]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var timeSpentField = contextObj.reviewFields.find(function (item) { return item.ReportFieldId === 7521; });
                timeSpentField.FieldValue = resultData["Data"];
            }
        });
    };
    MoveExecutionRequestListComponent.prototype.updateFieldObject = function (fieldObjectArray) {
        for (var _i = 0, fieldObjectArray_1 = fieldObjectArray; _i < fieldObjectArray_1.length; _i++) {
            var item = fieldObjectArray_1[_i];
            switch (item.ReportFieldId) {
                case 12254:
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    item.HasValidationError = false;
                    break;
                case 5873:
                    item.IsEnabled = false;
                    item.FieldValue = this.activeInputItems.rowData["WorkTypeId"];
                    break;
                case 12292:
                    item.IsEnabled = false;
                    break;
                case 12299:
                    item.IsEnabled = false;
                    break;
                case 7521:
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    item.FieldValue = "0.01";
                    break;
                case 12294:
                    item.ReadOnlyMode = true;
                    break;
                case 12295:
                    item.IsVisible = false;
                    break;
                case 5978:
                    item.IsMandatory = true;
                    item.HasValidationError = true;
                    break;
                case 1478:
                    var replaceString = "** ";
                    item.FieldValue = item.FieldValue.replace(new RegExp(replaceString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), "\n");
                    break;
                default:
                    break;
            }
        }
        return fieldObjectArray;
    };
    MoveExecutionRequestListComponent.prototype.onLinkClick = function () {
        var contextObj = this;
        contextObj.addOnTabEnabled = true;
        setTimeout(function () {
            contextObj.selectedTab = contextObj.isAllTabEnabled ? 3 : 2;
        }, 100);
    };
    /***********************************************************************
     * Paging and Sorting Events
     *
     ***********************************************************************/
    MoveExecutionRequestListComponent.prototype.activePageChanged = function (event) {
        this.activePageIndex = event.pageEvent.page;
        this.loadActiveData(0);
    };
    MoveExecutionRequestListComponent.prototype.onActiveSort = function (event) {
        this.loadActiveData(0);
    };
    MoveExecutionRequestListComponent.prototype.allPageChanged = function (event) {
        this.allPageIndex = event.pageEvent.page;
        this.loadAllData(0);
    };
    MoveExecutionRequestListComponent.prototype.onAllSort = function ($event) {
        this.loadAllData(0);
    };
    /***********************************************************************
     * Review Submit events
     *
     ***********************************************************************/
    MoveExecutionRequestListComponent.prototype.onSubmitClick = function (event) {
        var contextObj = this;
        contextObj.employeeService.submitMoveExecutionRequestDetails(2, event.fieldObject, contextObj.activeInputItems.selectedIds[0], contextObj.activeInputItems.rowData["MoveProjectId"]).subscribe(function (resultData) {
            debugger;
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var retUpdatedSrc = JSON.parse(resultData["Data"]["Data"]);
                    //for (let i = 0; i < contextObj.itemsSource.length; i++) {
                    //    if (contextObj.itemsSource[i][contextObj.inputItems.dataKey] == retUpdatedSrc[0][contextObj.inputItems.dataKey]) {
                    //        contextObj.itemsSource[i] = retUpdatedSrc[0];
                    //    }
                    //}
                    //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                    contextObj._notificationService.ShowToaster("Work Order details updated", 3);
                    contextObj.tabDeleteIndex = 2;
                    contextObj.reviewTabEnabled = false;
                    contextObj.reviewRequestEnabled = false;
                    setTimeout(function () {
                        contextObj.selectedTab = 0;
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                    break;
            }
        });
    };
    MoveExecutionRequestListComponent = __decorate([
        core_1.Component({
            selector: 'moveExecutionRequest-list',
            templateUrl: './app/Views/Employee/Move Execution Requests/moveExecutionRequest-list.component.html',
            directives: [page_component_1.PageComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, reviewMoveExecution_Request_component_1.ReviewMoveExecutionComponent, showdetails_component_1.ShowDetailsComponent],
            providers: [notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, employee_services_1.EmployeeService, workorder_service_1.WorkOrdereService],
            inputs: [],
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService])
    ], MoveExecutionRequestListComponent);
    return MoveExecutionRequestListComponent;
}());
exports.MoveExecutionRequestListComponent = MoveExecutionRequestListComponent;
//# sourceMappingURL=moveExecutionRequest-list.component.js.map