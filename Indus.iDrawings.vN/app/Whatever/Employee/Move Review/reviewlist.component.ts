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
import { ReviewMoveRequestComponent } from './reviewmoverequest.component';

@Component({
    selector: 'reviewRequest-list',
    templateUrl: './app/Views/Employee/Move Review/reviewlist.component.html',
    directives: [PageComponent, SubMenu, SplitViewComponent, GridComponent, PagingComponent, FieldComponent, Notification, SlideComponent, TabsComponent, TabComponent, ReviewMoveRequestComponent],
    providers: [NotificationService, GeneralFunctions, AdministrationService, EmployeeService, WorkOrdereService],
    inputs: [],
})

export class ReviewRequestListComponent implements OnInit {

    pagePath: string = "Employee / Request / Employee Move";
    selectedTab: number = 0;
    tabDeleteIndex: number = 0;

    outcomeData: any[];
    employeeData: any[];
    employeeDetailsfieldObject: IField[];
    reviewFields: IField[];
    action: string = "review";
    btnName: string = "Save Changes";

    menuData: any[] = [
        {
            "id": 1,
            "title": "Review",
            "image": "Review",
            "path": "Review",
            "subMenu": null
        },
        //{
        //    "id": 2,
        //    "title": "Cancel",
        //    "image": "Cancel Request",
        //    "path": "Cancel Request",
        //    "subMenu": null
        //}
    ];
    types: boolean = true;
    enableMenu: number[] = [1];

    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    splitViewTitle: string = "";
    secondaryTarget: number = 0;

    activeTotalItems: number = 0;
    activeItemsPerPage: number = 0;
    activeItemsSource: any[];
    activeInputItems: IGrid = { dataKey: "MoveId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'DESC', sortCol: '' };
    fieldObject: IField[];
    activePageIndex: number = 0;

    reviewTabEnabled: boolean = false;
    reviewRequestEnabled: boolean = false;
    isTimeSpentSubscribed: boolean = false;
    isAllTabEnabled: boolean = false;
    userRoleId: number = 0;

    constructor(private employeeService: EmployeeService, private workOrdereService: WorkOrdereService, private _notificationService: NotificationService) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.employeeService.getEmployeeMoveRequestListFields().subscribe(function (result) {
            contextObj.fieldObject = contextObj.updateGridFieldObject(result["Data"]);
        });
        contextObj.employeeService.checkSubscribedFeature('198').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0) return;

            contextObj.isTimeSpentSubscribed = result["Data"][0]["IsSubscribed"];
        });
        contextObj.employeeService.getSessionData().subscribe(function (resultData) {
            debugger;
            console.log(resultData);
            contextObj.userRoleId = resultData["Data"]["UserRoleId"];
            contextObj.isAllTabEnabled = (contextObj.userRoleId == 1 || contextObj.userRoleId == 3 || contextObj.userRoleId == 6);
        });
        contextObj.loadData(1);
    }

    /***********************************************************************
     * Data Load Events
     *
     ***********************************************************************/

    public loadData(target: number) {
        var contextObj = this;
        var tempArray: ReportFieldArray[] = [{ ReportFieldId: 12291, Value: "19" }];
        contextObj.employeeService.getEmployeeMoveRequestList(1, contextObj.activePageIndex, contextObj.activeInputItems.sortCol, contextObj.activeInputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.activeTotalItems = resultData["Data"].DataCount;

            if (contextObj.activeTotalItems > 0) {
                contextObj.activeItemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.activeItemsPerPage = resultData["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1,2];

            }
            else {
                contextObj.activeItemsSource = [];
                contextObj._notificationService.ShowToaster("No Employee Move requests exist", 2);
                contextObj.enableMenu = [];
            }
        }); 
    }

    public updateGridFieldObject(fieldObjectArray: IField[]) {
        for (var item of fieldObjectArray) {
            switch (item.ReportFieldId) {
                case 7463:
                case 7464:
                case 7465:
                    item.IsVisible = false;
                default:
                    break;
            }
        }
        return fieldObjectArray;
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
                    contextObj.reviewTabEnabled = false;
                    contextObj.reviewRequestEnabled = false;
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 1;;
                    }, 100);
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                }
                break;
            case 1:
                debugger;
                if (!event[1] && contextObj.reviewTabEnabled) {
                    setTimeout(function () {
                        contextObj.reviewRequestEnabled = true;
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
        if (contextObj.activeInputItems.rowData["StatusId"] == 39) {
            contextObj._notificationService.ShowToaster("Request is in Cancelled status. Cannot be reviewed.",3);
            return;
        }

        if (contextObj.activeInputItems.rowData["StatusId"] == 27) {
            contextObj._notificationService.ShowToaster("Request already approved. Cannot be reviewed.", 3);
            return;
        }
        contextObj.employeeService.getReviewEmployeeMoveData(contextObj.activeInputItems.selectedIds[0], contextObj.activeInputItems.rowData["WorkTypeId"], contextObj.activeInputItems.rowData["CurrentWorkFlowActionPointId"]).subscribe(function (resultData) {
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
                case 5834:
                    item.IsMandatory = true;
                    break;
                case 12254: /*Next Action Point User(s)*/
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    item.HasValidationError = false;
                    break;
                case 5873: /*Work Type*/
                    item.IsEnabled = false;
                    item.FieldValue = this.activeInputItems.rowData["WorkTypeId"];
                    break;
                case 7456: /*Id*/
                    item.FieldValue = this.activeInputItems.rowData["MoveId"].toString();
                    break;
                case 12299: /*Request by*/
                    item.IsEnabled = false;
                    item.FieldValue = this.activeInputItems.rowData["Added by"];
                    break;
                case 7459:  //Time Spent ((Hours)
                case 7461:
                case 7467:
                    item.IsEnabled = false;
                    break;
                case 5978:
                    item.IsMandatory = true;
                    item.HasValidationError = true;
                    break;
                case 1478:  //Previous Review Comments
                    var replaceString = "** ";
                    item.FieldValue = this.activeInputItems.rowData["Previous Review Comments"] ? this.activeInputItems.rowData["Previous Review Comments"].replace(new RegExp(replaceString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), "\n") : "";
                    break;
                default:
                    break;
            }
        }
        return fieldObjectArray;
    }

    public updateEmployeeFieldObject(fieldObjectArray: IField[]) {

        for (var item of fieldObjectArray) {
            switch (item.ReportFieldId) {
                case 5081:
                case 290:
                case 292:
                case 294:
                case 296:
                case 298:
                case 782:
                case 791:
                case 782:
                case 811:
                case 889:
                case 941:
                case 865:
                case 865:
                case 890:
                    item.IsVisible = false;
                    break;
                case 7410: //resource count
                case 891: //Delete 
                    item.isContentHtml = "hyperlink";
                    break;
                default:
                    break;
            }
        }
        return fieldObjectArray;
    }

    public onLinkClick() {
        var contextObj = this;
        setTimeout(function () {
            contextObj.selectedTab = 2;
        }, 100);
    }

    /***********************************************************************
     * Paging and Sorting Events
     *
     ***********************************************************************/

    public activePageChanged(event) {
        this.activePageIndex = event.pageEvent.page;
        this.loadData(0);
    }

    public onActiveSort(event) {
        this.loadData(0);
    }

    /***********************************************************************
     * Review Submit events
     *
     ***********************************************************************/

    public onSubmitClick(event) {
        var contextObj = this;
        contextObj.employeeService.submitEmployeeMoveRequestDetails(event.fieldObject, contextObj.activeInputItems.selectedIds[0], event.employeeDetails).subscribe(function (resultData) {
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
                    contextObj.reviewTabEnabled = false;
                    contextObj.reviewRequestEnabled = false;
                    setTimeout(function () {
                        contextObj.selectedTab = 0;
                        contextObj.tabDeleteIndex = 0;
                        contextObj.loadData(1);
                    }, 100);
                    break;
            }
        });
    }
    EmployeeRemoved() {
        var contextObj = this;
        this.selectedTab = 0;
        setTimeout(function () {
            contextObj.tabDeleteIndex = 1;;
        }, 100);
        this.loadData(0);
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
