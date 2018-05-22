import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component';
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { EmployeeService } from '../../../Models/Employee/employee.services';
import { ReviewMoveExecutionComponent } from './reviewMoveExecution-Request.component';
import { ShowDetailsComponent } from '../tools/move projects/showdetails.component';


@Component({
    selector: 'moveExecutionRequest-list',
    templateUrl: './app/Views/Employee/Move Execution Requests/moveExecutionRequest-list.component.html',
    directives: [PageComponent, SubMenu, SplitViewComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent, TabsComponent, TabComponent, ReviewMoveExecutionComponent, ShowDetailsComponent],
    providers: [NotificationService, GeneralFunctions, AdministrationService, EmployeeService, WorkOrdereService],
    inputs: [],
})

export class MoveExecutionRequestListComponent implements OnInit {

    pagePath: string = "Employee / Move Project Work Orders";
    selectedTab: number = 0;
    tabDeleteIndex: number = 0;

    outcomeData: any[];
    employeeData: any[];
    reviewFields: IField[];
    action: string = "review";
    btnName: string = "Save Changes";

    menuData: any[] = [{
        "id": 1,
        "title": "Review",
        "image": "Review",
        "path": "Review",
        "subMenu": null
    }];
    types: boolean = true;
    enableMenu: number[] = [1];

    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    splitViewTitle: string = "";
    secondaryTarget: number = 0;

    activeTotalItems: number = 0;
    activeItemsPerPage: number = 0;
    activeItemsSource: any[];
    activeInputItems: IGrid = { dataKey: "RequestId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'DESC', sortCol: '[Request Number]' };
    fieldObject: IField[];
    activePageIndex: number = 0;

    allTotalItems: number = 0;
    allItemsPerPage: number = 0;
    allItemsSource: any[];
    allInputItems: IGrid = { dataKey: "RequestId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'DESC', sortCol: '[Request Number]' };
    allPageIndex: number = 0;

    reviewTabEnabled: boolean = false;
    reviewRequestEnabled: boolean = false;
    addOnTabEnabled: boolean = false;
    showDetailsEnabled: boolean = false;
    isTimeSpentSubscribed: boolean = false;
    isAllTabEnabled: boolean = false;
    userRoleId: number = 0;

    moveProjectStatus: string = "Work Order Generated";

    constructor(private employeeService: EmployeeService, private workOrdereService: WorkOrdereService, private _notificationService: NotificationService) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.employeeService.getMoveProjectExecutionTaskListFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
        });
        contextObj.employeeService.checkSubscribedFeature('198').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0) return;

            contextObj.isTimeSpentSubscribed = result["Data"][0]["IsSubscribed"];
        });
        contextObj.employeeService.getSessionData().subscribe(function (resultData) {
            debugger;
            console.log(resultData);
            contextObj.userRoleId = resultData["Data"]["UserRoleId"];
            contextObj.isAllTabEnabled = (contextObj.userRoleId == 1 || contextObj.userRoleId == 3 || contextObj.userRoleId == 6) ;
        });
    }

    /***********************************************************************
     * Data Load Events
     *
     ***********************************************************************/

    public loadActiveData(target: number) {
        var contextObj = this;
        var tempArray: ReportFieldArray[] = [{ ReportFieldId: 12291, Value: "19" }];
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
    }

    public loadAllData(target: number) {
        var contextObj = this;
        var tempArray: ReportFieldArray[] = [{ ReportFieldId: 12291, Value: "19" }, { ReportFieldId: 12291, Value: "28" }, { ReportFieldId: 12291, Value: "29" }];
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
    }

    /***********************************************************************
     * Tab Events
     *
     ***********************************************************************/

    public getSelectedTab(event) {
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
                        contextObj.tabDeleteIndex = contextObj.isAllTabEnabled ? 2 : 1;;
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
                } else {
                    if (!event[1] && contextObj.reviewTabEnabled) {
                        setTimeout(function () {
                            contextObj.reviewRequestEnabled = true;
                        }, 50);
                    } else if (event[1] && contextObj.addOnTabEnabled) {
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
                    } else if (event[1] && contextObj.addOnTabEnabled) {
                        contextObj.addOnTabEnabled = false;
                        contextObj.showDetailsEnabled = false;
                        contextObj.tabDeleteIndex = contextObj.isAllTabEnabled ? 3 : 2;
                        setTimeout(function () {
                            contextObj.tabDeleteIndex = 0;
                        }, 50);
                    }
                } else {
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
    }

    /***********************************************************************
     * Submenu Click
     *
     ***********************************************************************/

    public onSubMenuChange(event) {
        switch (event.value) {
            case 1:
                this.reviewClick();
                break;
        }
    }

    public reviewClick() {
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
    }

    public removeTimeOutActionFromLookUps(outcomes: any[]) {
        var actionfield = this.reviewFields.find(function (item) {
            return item.ReportFieldId === 5834;
        });
        if (outcomes != null && outcomes.length != 0) {
            actionfield.LookupDetails.LookupValues = outcomes.filter(function (item) {
                return item["OutcomeTypeId"] != 28;
            });
        }
    }

    public getAutoPopulatedTimeSpentValue() {
        var contextObj = this;
        contextObj.workOrdereService.getAutoPopulatedTimeSpentValue(contextObj.activeInputItems.rowData["WorkFlowEntityId"]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var timeSpentField = contextObj.reviewFields.find(function (item) { return item.ReportFieldId === 7521; });
                timeSpentField.FieldValue = resultData["Data"];
            }
        });
    }

    public updateFieldObject(fieldObjectArray: IField[]) {

        for (var item of fieldObjectArray) {
            switch (item.ReportFieldId) {
                case 12254: /*Next Action Point User(s)*/
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    item.HasValidationError = false;
                    break;
                case 5873: /*Work Type*/
                    item.IsEnabled = false;
                    item.FieldValue = this.activeInputItems.rowData["WorkTypeId"];
                    break;
                case 12292: /*Request Number*/
                    item.IsEnabled = false;
                    break;
                case 12299: /*Request by*/
                    item.IsEnabled = false;
                    break;
                case 7521:  //Time Spent ((Hours)
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
                case 1478:  //Previous Review Comments
                    var replaceString = "** ";
                    item.FieldValue = item.FieldValue.replace(new RegExp(replaceString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), "\n");
                    break;
                default:
                    break;
            }
        }
        return fieldObjectArray;
    }

    public onLinkClick() {
        var contextObj = this;
        contextObj.addOnTabEnabled = true;
        setTimeout(function () {
            contextObj.selectedTab = contextObj.isAllTabEnabled ? 3 : 2;
        }, 100);
    }

    /***********************************************************************
     * Paging and Sorting Events
     *
     ***********************************************************************/

    public activePageChanged(event) {
        this.activePageIndex = event.pageEvent.page;
        this.loadActiveData(0);
    }

    public onActiveSort(event) {
        this.loadActiveData(0);
    }

    public allPageChanged(event) {
        this.allPageIndex = event.pageEvent.page;
        this.loadAllData(0);
    }

    public onAllSort($event) {
        this.loadAllData(0);
    }

    /***********************************************************************
     * Review Submit events
     *
     ***********************************************************************/

    public onSubmitClick(event) {
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
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
