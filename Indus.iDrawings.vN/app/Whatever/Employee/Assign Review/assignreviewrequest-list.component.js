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
var reviewAssign_Request_component_1 = require('./reviewAssign-Request.component');
var ReviewAssignRequestListComponent = (function () {
    function ReviewAssignRequestListComponent(employeeService, workOrdereService, _notificationService) {
        this.employeeService = employeeService;
        this.workOrdereService = workOrdereService;
        this._notificationService = _notificationService;
        this.pagePath = "Employee / Request / Employee Assign";
        this.selectedTab = 0;
        this.tabDeleteIndex = 0;
        this.action = "review";
        this.btnName = "Save Changes";
        this.menuData = [
            {
                "id": 1,
                "title": "Review",
                "image": "Review",
                "path": "Review",
                "subMenu": null
            },
        ];
        this.types = true;
        this.enableMenu = [1];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.splitViewTitle = "";
        this.secondaryTarget = 0;
        this.activeTotalItems = 0;
        this.activeItemsPerPage = 0;
        this.activeInputItems = { dataKey: "RequestId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'DESC', sortCol: '' };
        this.activePageIndex = 0;
        this.reviewTabEnabled = false;
        this.reviewRequestEnabled = false;
        this.isTimeSpentSubscribed = false;
        this.isAllTabEnabled = false;
        this.userRoleId = 0;
        this.moveProjectStatus = "Work Order Generated";
    }
    ReviewAssignRequestListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.employeeService.getEmployeeAssignRequestListFields().subscribe(function (result) {
            contextObj.fieldObject = contextObj.updateGridFieldObject(result["Data"]);
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
        contextObj.loadData(1);
    };
    /***********************************************************************
     * Data Load Events
     *
     ***********************************************************************/
    ReviewAssignRequestListComponent.prototype.loadData = function (target) {
        var contextObj = this;
        var tempArray = [{ ReportFieldId: 12291, Value: "19" }];
        contextObj.employeeService.getEmployeeAssignRequestList(1, contextObj.activePageIndex, contextObj.activeInputItems.sortCol, contextObj.activeInputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.activeTotalItems = resultData["Data"].DataCount;
            if (contextObj.activeTotalItems > 0) {
                contextObj.activeItemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.activeItemsPerPage = resultData["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1, 2];
            }
            else {
                contextObj.activeItemsSource = [];
                contextObj._notificationService.ShowToaster("No Employee Assign requests exist", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    ReviewAssignRequestListComponent.prototype.updateGridFieldObject = function (fieldObjectArray) {
        for (var _i = 0, fieldObjectArray_1 = fieldObjectArray; _i < fieldObjectArray_1.length; _i++) {
            var item = fieldObjectArray_1[_i];
            switch (item.ReportFieldId) {
                case 7861:
                case 7862:
                    item.IsVisible = false;
                default:
                    break;
            }
        }
        return fieldObjectArray;
    };
    /***********************************************************************
     * Tab Events
     *
     ***********************************************************************/
    ReviewAssignRequestListComponent.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        debugger;
        switch (event[0]) {
            case 0:
                if (event[1] && contextObj.reviewTabEnabled) {
                    contextObj.reviewTabEnabled = false;
                    contextObj.reviewRequestEnabled = false;
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 1;
                        ;
                    }, 100);
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                }
                break;
            case 1:
                if (!event[1] && contextObj.reviewTabEnabled) {
                    setTimeout(function () {
                        contextObj.reviewRequestEnabled = true;
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
    ReviewAssignRequestListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.reviewClick();
                break;
        }
    };
    ReviewAssignRequestListComponent.prototype.reviewClick = function () {
        var contextObj = this;
        if (contextObj.activeInputItems.rowData["StatusId"] == 39) {
            contextObj._notificationService.ShowToaster("Request is in Cancelled status. Cannot be reviewed.", 3);
            return;
        }
        if (contextObj.activeInputItems.rowData["StatusId"] == 27) {
            contextObj._notificationService.ShowToaster("Request already approved. Cannot be reviewed.", 3);
            return;
        }
        contextObj.employeeService.getReviewEmployeeAssignData(contextObj.activeInputItems.selectedIds[0], contextObj.activeInputItems.rowData["WorkTypeId"], contextObj.activeInputItems.rowData["CurrentWorkFlowActionPointId"]).subscribe(function (resultData) {
            debugger;
            console.log(resultData);
            contextObj.reviewFields = contextObj.updateFieldObject(resultData["Data"]["FieldBinderList"]);
            contextObj.outcomeData = JSON.parse(resultData["Data"]["OutcomeData"]);
            contextObj.employeeDetailsfieldObject = contextObj.updateEmployeeFieldObject(JSON.parse(resultData["Data"]["FieldBinderData"]));
            contextObj.employeeData = JSON.parse(resultData["Data"]["EmployeeData"]);
            contextObj.removeTimeOutActionFromLookUps(contextObj.outcomeData);
            contextObj.reviewTabEnabled = true;
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 50);
        });
    };
    ReviewAssignRequestListComponent.prototype.removeTimeOutActionFromLookUps = function (outcomes) {
        var actionfield = this.reviewFields.find(function (item) {
            return item.ReportFieldId === 5834;
        });
        if (outcomes != null && outcomes.length != 0) {
            actionfield.LookupDetails.LookupValues = outcomes.filter(function (item) {
                return item["OutcomeTypeId"] != 28;
            });
        }
    };
    ReviewAssignRequestListComponent.prototype.getAutoPopulatedTimeSpentValue = function () {
        var contextObj = this;
        contextObj.workOrdereService.getAutoPopulatedTimeSpentValue(contextObj.activeInputItems.rowData["WorkFlowEntityId"]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var timeSpentField = contextObj.reviewFields.find(function (item) { return item.ReportFieldId === 7521; });
                timeSpentField.FieldValue = resultData["Data"];
            }
        });
    };
    ReviewAssignRequestListComponent.prototype.updateFieldObject = function (fieldObjectArray) {
        for (var _i = 0, fieldObjectArray_2 = fieldObjectArray; _i < fieldObjectArray_2.length; _i++) {
            var item = fieldObjectArray_2[_i];
            switch (item.ReportFieldId) {
                case 5834:
                    item.IsMandatory = true;
                    break;
                case 12254:
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    item.HasValidationError = false;
                    break;
                case 5873:
                    item.IsEnabled = false;
                    item.FieldValue = this.activeInputItems.rowData["WorkTypeId"];
                    break;
                case 7456:
                    item.FieldValue = this.activeInputItems.rowData["RequestId"].toString();
                    break;
                case 12299:
                    item.IsEnabled = false;
                    item.FieldValue = this.activeInputItems.rowData["Added by"];
                    break;
                case 7459: //Time Spent ((Hours)
                case 7461:
                case 7467:
                    item.IsEnabled = false;
                    break;
                case 5978:
                    item.IsMandatory = true;
                    item.HasValidationError = true;
                    break;
                case 1478:
                    var replaceString = "** ";
                    item.FieldValue = this.activeInputItems.rowData["Previous Review Comments"] ? this.activeInputItems.rowData["Previous Review Comments"].replace(new RegExp(replaceString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), "\n") : "";
                    break;
                default:
                    break;
            }
        }
        return fieldObjectArray;
    };
    ReviewAssignRequestListComponent.prototype.updateEmployeeFieldObject = function (fieldObjectArray) {
        for (var _i = 0, fieldObjectArray_3 = fieldObjectArray; _i < fieldObjectArray_3.length; _i++) {
            var item = fieldObjectArray_3[_i];
            switch (item.FieldId) {
                case 811:
                case 812:
                case 813:
                case 814:
                case 815:
                case 816:
                case 817:
                case 818:
                case 819:
                case 820:
                case 822:
                case 823:
                case 828:
                case 829:
                case 830:
                case 834:
                case 831:
                case 832:
                case 833:
                case 2998:
                case 2997:
                    item.IsVisible = false;
                    break;
                default:
                    break;
            }
        }
        return fieldObjectArray;
    };
    ReviewAssignRequestListComponent.prototype.onLinkClick = function () {
        var contextObj = this;
        setTimeout(function () {
            contextObj.selectedTab = 2;
        }, 100);
    };
    /***********************************************************************
     * Paging and Sorting Events
     *
     ***********************************************************************/
    ReviewAssignRequestListComponent.prototype.activePageChanged = function (event) {
        this.activePageIndex = event.pageEvent.page;
        this.loadData(0);
    };
    ReviewAssignRequestListComponent.prototype.onActiveSort = function (event) {
        this.loadData(0);
    };
    /***********************************************************************
     * Review Submit events
     *
     ***********************************************************************/
    ReviewAssignRequestListComponent.prototype.onSubmitClick = function (event) {
        var contextObj = this;
        contextObj.employeeService.submitEmployeeAssignRequestDetails(event.fieldObject, contextObj.activeInputItems.selectedIds[0], event.employeeDetails).subscribe(function (resultData) {
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
                    contextObj._notificationService.ShowToaster("Request details updated", 3);
                    contextObj.tabDeleteIndex = 1;
                    contextObj.reviewRequestEnabled = false;
                    contextObj.reviewTabEnabled = false;
                    setTimeout(function () {
                        contextObj.selectedTab = 0;
                        contextObj.tabDeleteIndex = 0;
                        contextObj.loadData(1);
                    }, 100);
                    break;
            }
        });
    };
    ReviewAssignRequestListComponent = __decorate([
        core_1.Component({
            selector: 'reviewAssignRequest-list',
            templateUrl: './app/Views/Employee/Assign Review/assignReviewRequest-list.component.html',
            directives: [page_component_1.PageComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, reviewAssign_Request_component_1.ReviewAssignRequestComponent],
            providers: [notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, employee_services_1.EmployeeService, workorder_service_1.WorkOrdereService],
            inputs: [],
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService])
    ], ReviewAssignRequestListComponent);
    return ReviewAssignRequestListComponent;
}());
exports.ReviewAssignRequestListComponent = ReviewAssignRequestListComponent;
//# sourceMappingURL=assignreviewrequest-list.component.js.map