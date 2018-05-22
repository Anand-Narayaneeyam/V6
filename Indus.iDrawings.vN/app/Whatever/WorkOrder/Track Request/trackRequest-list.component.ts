import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { searchBox } from '../../../framework/whatever/search/search.component';
import { DropDownListComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component';

@Component({
    selector: 'trackRequest-list',
    templateUrl: './app/Views/WorkOrder/Track Request/trackRequest-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent, TabsComponent, TabComponent, searchBox, DropDownListComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['itemsSource', 'totalItems', 'userDetails', 'inputItems', 'itemsPerPage', 'isActive', 'target'],
})

export class TrackRequestListComponent implements OnInit {

    @Output() editClicked = new EventEmitter();
    @Output() itemSourceUpdate = new EventEmitter();
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    types: boolean = false;
    inputItems: IGrid;
    totalItems: number;
    itemsPerPage: number;
    pageIndex: number = 0;
    isActive: boolean;
    secondaryTarget: number = 0;
    isTimeSpentSubscribed: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    action: string;
    btnName: string;
    userDetails: UserDetails;
    target: number = 1;
    enableMenu = [];
    cardButtonPrivilege = [false, false];
    requester: string = "14";

    keyWordLookup: any[];
    advanceValue = "[]";
    keywordFieldObject: IField[];
    advancelookup: any[];
    filter: string = "";
    isKeyWordSearch: number = 0;
    isAdvanceSearch: number = 0;
    disable: boolean = false;
    ddlWorkType: IField;

    //Form id : 226-- page id 722
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (226))
    menuData = [
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "subMenu": null,
            "privilegeId": 3479
        }
    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;

    constructor(private administrationServices: AdministrationService, private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        if (contextObj.isActive) {
            contextObj.menuData = [
                {
                    "id": 1,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "subMenu": null,
                    "privilegeId": 3479
                }
            ];
        } else {
            contextObj.menuData = [];
        }

        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 720, contextObj.administrationServices, contextObj.menuData.length);
        this.workOrderService.getTrackRequestListFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"]//.filter(function (item) { return item.FieldId != 1261 });
            //contextObj.ddlWorkType = (result["Data"].filter(function (item) { return item.FieldId != 1261 }))[0];
            //if (contextObj.ddlWorkType.LookupDetails.LookupValues) {
            //    contextObj.ddlWorkType.FieldValue = contextObj.ddlWorkType.LookupDetails.LookupValues[0].Id.toString();
            //}
            if (!contextObj.isActive) {
                var fieldIdToBeRemoved = [1245, 1248]; /* Current Action Point and For Action By*/
                contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return fieldIdToBeRemoved.indexOf(item.FieldId) == -1 });
            }
            if (contextObj.itemsSource == null || contextObj.itemsSource.length == 0) {
                contextObj.dataLoad(1);
            } else {
                contextObj.enableMenu = [1];
            }
        });

        contextObj.workOrderService.getserviceRequestKeywordField(contextObj.getReportFieldIdValues()).subscribe(function (resultData) {
            contextObj.keywordFieldObject = resultData["FieldBinderList"];
        });

        //contextObj.workOrderService.checkSubscribedFeature('198').subscribe(function (result) {
        //    if (result["Data"] == null || result["Data"].length == 0) return;

        //    contextObj.isTimeSpentSubscribed = result["Data"][0]["IsSubscribed"];
        //});
        //form id :  226-- page id 722
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 732, contextObj.administrationServices, contextObj.menuData.length);
        var callBack = function (data) {
            if (data != undefined && data.length != 0)
                data.filter(function (el) {
                    if (el.title == "Edit") {
                        contextObj.cardButtonPrivilege[0] = true;
                    }
                    else if (el.title == "Delete") {
                        contextObj.cardButtonPrivilege[1] = true;
                    }
                });
            this.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);

    }

    public dataLoad(target?: number) {
        var contextObj = this;

        contextObj.workOrderService.getTrackRequestListData(contextObj.getReportFieldIdValues(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {

            contextObj.totalItems = result["Data"].DataCount;

            if (contextObj.totalItems > 0) {
                contextObj.disable = false;
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1];
                contextObj.itemSourceUpdate.emit({
                    itemSource: contextObj.itemsSource,
                    rowsPerPage: contextObj.itemsPerPage,
                    totalItems: contextObj.totalItems
                });
            }
            else {
                contextObj.disable = true;
                contextObj.notificationService.ShowToaster("No Requests exist", 2);
                contextObj.enableMenu = [];
            }
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.reviewClick();
                break;
        }
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.checkAndLoadData();
    };

    public onSort(objGrid: any) {
        this.checkAndLoadData();
    }

    public checkAndLoadData() {
        if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 0)
            this.dataLoad(0);
        else if (this.isKeyWordSearch == 1 && this.isAdvanceSearch == 0)
            this.getKeywordSearchdata();
        else if (this.isKeyWordSearch == 0 && this.isAdvanceSearch == 1)
            this.getAdvancedSearchdata();
    }


    public onKeyWordSearch(event) {
        this.filter = event.value;
        this.isKeyWordSearch = 1;
        this.isAdvanceSearch = 0;
        this.pageIndex = 0;
        this.getKeywordSearchdata();
    }

    public getKeywordSearchdata() {
        if (this.filter == "") {
            this.dataLoad(0);
            return;
        }
        var contextObj = this;
        contextObj.workOrderService.getWorkOrderKeyWordListData(2, contextObj.getReportFieldIdValues(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
            debugger;
            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1];
            }
        });
    }

    public loadadvanceSearch() {
        var contextObj = this;
        this.workOrderService.getServiceRequestAdvnceSearchLookup(contextObj.getReportFieldIdValues()).subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
        });
    }

    public onAdvanceSearch(event) {
        this.advanceValue = event.fieldobject;
        this.isAdvanceSearch = 1;
        this.isKeyWordSearch = 0;
        this.pageIndex = 0;
        this.getAdvancedSearchdata();
    }

    public getAdvancedSearchdata() {
        var contextObj = this;
        contextObj.workOrderService.getWorkOrderAdvanceSearchListData(2, contextObj.getReportFieldIdValues(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.advanceValue).subscribe(function (resultData) {

            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = [];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1];
            }
        });
    }

    public reviewClick() {
        this.action = "review";
        this.btnName = "Save Changes";
        var contextObj = this;

        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
        } else if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (contextObj.inputItems.rowData["StatusId"] != 25) {
            contextObj.notificationService.ShowToaster("Selected Request is already accepted", 2);
        } else {
            contextObj.workOrderService.loadReviewServiceRequest(contextObj.inputItems.rowData.WorkRequestId,
                "track", contextObj.inputItems.rowData["WorkTypeId"], 0, 1, contextObj.inputItems.rowData["WorkFlowEntityId"]).subscribe(function (resultData) {
                    contextObj.workOrderService.getRequesterDetails(contextObj.inputItems.rowData.WorkRequestId).subscribe(function (requesterData) {
                        debugger;
                        contextObj.updateRequesterDetails(JSON.parse(requesterData.Data)[0]);
                        contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetailsForEdit(resultData["Data"]["FieldBinderList"]);
                        contextObj.updateDateTimeAdditionalDataFields(contextObj.fieldDetailsAdd1);
                        contextObj.editClicked.emit({
                            fieldobject: contextObj.fieldDetailsAdd1,
                            outComes: resultData["Data"]["FieldBinderData"] == null ? [] : JSON.parse(resultData["Data"]["FieldBinderData"]),
                            action: contextObj.action,
                            buttonName: contextObj.btnName,
                            input: contextObj.inputItems,
                        });
                    });
                });
        }
    }

    public updateRequesterDetails(requesterData: any) {
        if (requesterData) {
            this.userDetails.UserFirstName = requesterData.FirstName;
            this.userDetails.UserLastName = requesterData.LastName;
            this.userDetails.UserMiddleName = requesterData.MiddleName ? requesterData.MiddleName : "";
            this.userDetails.UserEmail = requesterData.Email;
            this.requester = requesterData.Requester;
        }
    }

    public updateFieldDetailsForEdit(fieldDetailsArray: any) {

        var contextObj = this;
        fieldDetailsArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 1481:  /*RequestId*/
                    item.FieldValue = contextObj.inputItems.rowData["WorkRequestId"];
                    break;
                case 5859:
                    item.FieldValue = contextObj.inputItems.rowData["WorkFlowEntityId"];
                    break;
                case 1492:  //Request No
                    item.IsVisible = true;
                    break;
                case 1367:  //Requested by
                    item.IsVisible = true;
                    break;
                case 5834:  //Select an Action
                    item.IsVisible = false;
                    break;
                case 7521:  //Time Spent ((Hours)
                    item.IsVisible = false;
                    break;
                case 12254:   //Send to
                    item.IsVisible = false;
                    item.FieldLabel = "Next Action Point User(s)";
                    break;
                case 5988:  //Description
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.inputItems.rowData["Description"];

                    break;
                case 1478:  //Previous Review Comments
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    var replaceString = "** ";
                    item.FieldValue = contextObj.inputItems.rowData["Previous Review Comments"].replace(new RegExp(replaceString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), "\n");
                    break;
                case 5978:  //Review Comments
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    break;
                case 5873:  //WorkType
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.inputItems.rowData["WorkTypeId"];
                    break;
                case 1471:  //Description
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    break;
                case 1369:   //Requester (First Name)
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserFirstName;
                    break;
                case 1370:  //Requester (Middle Name)
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserMiddleName;
                    break;
                case 1371:  //Requester (Last Name)
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserLastName;
                    break;
                case 1486:  //Requested Date
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.FieldValue = contextObj.inputItems.rowData["Requested Date"];
                    item.ReadOnlyMode = true;
                    break;
                case 1374:  //Requester Email
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserEmail;
                    break;
                case 1488:  //Priority
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = contextObj.inputItems.rowData["PriorityId"];
                    break;
                case 1487:  //Expected Date of Completion
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    var date = new Date()
                    date.setDate(date.getDate() + 1)
                    item.FieldValue = date.toDateString();
                    break;
                case 489:   //Site
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = contextObj.inputItems.rowData["SiteId"];
                    break;
                case 487:  //Building
                    item.IsVisible = true;
                    item.FieldValue = contextObj.inputItems.rowData["BuildingId"];
                    break;
                case 9548:  //Floor
                    item.IsVisible = true;
                    item.FieldValue = contextObj.inputItems.rowData["FloorId"];
                    break;
                case 290:   /*Org Unit*/
                    item.FieldValue = contextObj.inputItems.rowData[item.FieldLabel];
                    break;
                case 1372: //Requester
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.requester;
                    break;
                //Fields specially for For WorkOrder. Enables only in Review of WorkOrder
                case 1440: //Work Order Date
                    item.IsVisible = false;
                    break;
                case 6562:  //Hold Details
                    item.IsVisible = false;
                    break;
                case 6202:  //Hold Reason
                    item.IsVisible = false;
                    break;
                case 6201:  //Hold time
                    item.IsVisible = false;
                    break;
                case 6203:  //Date of Completion
                    item.IsVisible = false;
                    break;
                case 6175:  //Work In Progress
                    item.IsVisible = false;
                    break;
                case 1454: //Remarks
                    item.IsVisible = false;
                    break;
            }
        });

        return fieldDetailsArray;
    }

    public getReportFieldIdValues() {
        var contextObj = this;
        var returnArray: ReportFieldIdValues[] = [];
        if (contextObj.target == 1) {
            returnArray.push({
                ReportFieldId: 5809,
                Value: contextObj.userDetails.UserId
            })
        }

        if (contextObj.isActive) {
            returnArray.push(
                {
                    ReportFieldId: 1490,
                    Value: 11
                },
                {
                    ReportFieldId: 1490,
                    Value: 17
                },
                {
                    ReportFieldId: 1490,
                    Value: 18
                },
                {
                    ReportFieldId: 1490,
                    Value: 19
                },
                {
                    ReportFieldId: 1490,
                    Value: 22
                },
                {
                    ReportFieldId: 1490,
                    Value: 25
                },
                {
                    ReportFieldId: 1490,
                    Value: 28
                },
                {
                    ReportFieldId: 1490,
                    Value: 38
                }
                //{
                //    ReportFieldId: 5873,
                //    Value: contextObj.ddlWorkType.FieldValue == "-1" ? "0" : contextObj.ddlWorkType.FieldValue
                //}
            );
        } else {
            returnArray.push(
                {
                    ReportFieldId: 1490,
                    Value: 3
                }
                //{
                //    ReportFieldId: 5873,
                //    Value: contextObj.ddlWorkType.FieldValue == "-1" ? "0" : contextObj.ddlWorkType.FieldValue
                //}
            );
        }
        return JSON.stringify(returnArray);
    }

    public updateDateTimeAdditionalDataFields(fieldDetailsArray: any[]) {
        var tempArray: IField[] = fieldDetailsArray.filter(function (item: IField) {
            return item.ReportFieldId > 1000000 && item.DataEntryControlId == 8;
        });

        for (var item of tempArray) {
            if (item.FieldValue != "" && item.FieldValue) {
                if (item.FieldValue.includes("AM")) {
                    var value = item.FieldValue.split("AM")[0];
                    item.FieldValue = value + " AM";
                } else if (item.FieldValue.includes("PM")) {
                    var value = item.FieldValue.split("PM")[0];
                    item.FieldValue = value + " PM";
                }
            }
        }
    }
}


interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}

interface UserDetails {
    UserId: number;
    UserName: string;
    UserEmail: string;
    UserFirstName: string;
    UserMiddleName: string;
    UserLastName: string;
}

