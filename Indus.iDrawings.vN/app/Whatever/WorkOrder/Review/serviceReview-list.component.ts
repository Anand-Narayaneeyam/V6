import {Component, EventEmitter, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
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
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { DropDownListComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component';
import { searchBox } from '../../../framework/whatever/search/search.component';
import { SetRuleForChildRequest, SetRuleData } from './set rule/setruleforchildrequest';

@Component({
    selector: 'serviceReview-list',
    templateUrl: './app/Views/WorkOrder/Review/serviceReview-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent, TabsComponent, TabComponent, searchBox, DropDownListComponent, SetRuleForChildRequest],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ValidateService],
    inputs: ['itemsSource', 'totalItems', 'userDetails', 'inputItems', 'itemsPerPage', 'isTimeSpentSubscribed', 'isInProgressSubscribed', 'reloadData'],
})

export class ServiceReviewListComponent implements OnInit, OnChanges {

    @Output() addEditClicked = new EventEmitter();
    @Output() itemSourceUpdate = new EventEmitter();
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    completeCloseFieldObject: IField[];
    reminderObject: IField[];
    overrideFieldObject: IField[];
    itemsSource: any[];
    types: boolean = false;
    inputItems: IGrid;
    totalItems: number;
    itemsPerPage: number;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    isTimeSpentSubscribed: boolean;
    isInProgressSubscribed: boolean;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    action: string;
    btnName: string;
    userDetails: any;
    keyWordLookup: any[];
    advanceValue = "[]";
    keywordFieldObject: IField[];
    advancelookup: any[];
    filter: string = "";
    isKeyWordSearch: number = 0;
    isAdvanceSearch: number = 0;
    disable: boolean = false;
    outComeId: number = 0;
    CompleteOrClose: number;
    pageTitle: string;
    ddlWorkType: IField;
    reloadData: boolean = false;
    advancelookupDefault: IField[];
    enableMenu = [];
    cardButtonPrivilege = [false, false];
    position = "top-right";
    showSlide: boolean = false;
    parentChildRelations: IParentChildRelation;
    showSearchFilter: any;
    //Form id : 226-- page id 722
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (226))
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "subMenu": null,
            "privilegeId": 3448//3500
        },
        {
            "id": 2,
            "title": "Review",
            "image": "Review",
            "path": "Review",
            "subMenu": null,
            "privilegeId": 3471
        },
        {
            "id": 3,
            "title": "More",
            "image": "More",
            "path": "More",
            "subMenu": [
                {

                    "id": 4,
                    "title": "Complete",
                    "image": "Complete",
                    "path": "Complete",
                    "subMenu": null,
                    "privilegeId": null
                },
                {

                    "id": 5,
                    "title": "Close",
                    "image": "Close",
                    "path": "Close",
                    "subMenu": null,
                    "privilegeId": null
                },
                {
                    "id": 6,
                    "title": "Discard",
                    "image": "Discard",
                    "path": "Discard",
                    "subMenu": null,
                    "privilegeId": null
                },
                {
                    "id": 7,
                    "title": "Override",
                    "image": "Override",
                    "path": "Override",
                    "subMenu": null,
                    "privilegeId": 3466
                },
                {
                    "id": 8,
                    "title": "Reminder",
                    "image": "Reminder",
                    "path": "Reminder",
                    "subMenu": null,
                    "privilegeId": 3467
                },
                {
                    "id": 9,
                    "title": "Edit Rule",
                    "image": "Edit Rule",
                    "path": "Edit Rule",
                    "subMenu": null,
                    "privilegeId": 9518
                },


            ]
        }


    ];
    slidewidth = 250;

    constructor(private administrationServices: AdministrationService, private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions,
        private _validateService: ValidateService) { }

    ngOnInit() {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 722, contextObj.administrationServices, contextObj.menuData.length);
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 717, contextObj.administrationServices, contextObj.menuData.length);

        //this.workOrderService.GetPrivilegesOfMultiplePagesForUser("717,722", null).subscribe(function (result) {
        //    debugger

        //});
        this.workOrderService.getServiceRequestFields().subscribe(function (result) {

            contextObj.fieldObject = result["Data"]//.filter(function (item) { return item.FieldId != 1261 });
            //contextObj.ddlWorkType = (result["Data"].filter(function (item) { return item.FieldId == 1261 }))[0];
            //if (contextObj.ddlWorkType.LookupDetails.LookupValues) {
            //    contextObj.ddlWorkType.FieldValue = contextObj.ddlWorkType.LookupDetails.LookupValues[0].Id.toString();
            //}
            if (contextObj.itemsSource == null || contextObj.itemsSource.length == 0) {
                contextObj.dataLoad(1);
            } else {
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
        });

        contextObj.workOrderService.getserviceRequestKeywordField(contextObj.getReportFieldIdValuesForSearch()).subscribe(function (resultData) {
            contextObj.keywordFieldObject = resultData["FieldBinderList"];
        });



        //form id :  226-- page id 722
        //var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 732, contextObj.administrationServices, contextObj.menuData.length);
        //var callBack = function (data) {
        //    if (data != undefined && data.length != 0)
        //        data.filter(function (el) {
        //            if (el.title == "Edit") {
        //                contextObj.cardButtonPrivilege[0] = true;
        //            }
        //            else if (el.title == "Delete") {
        //                contextObj.cardButtonPrivilege[1] = true;
        //            }
        //        });
        //    this.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);

    }

    ngOnChanges(changes: SimpleChanges) {
        debugger;
        if (changes && changes["reloadData"] && changes["reloadData"]["currentValue"]) {
            this.dataLoad(0)
        }
    }

    public onChangeWorkTye(event) {
        this.dataLoad(0);
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        contextObj.workOrderService.getServiceRequestListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir/*, contextObj.ddlWorkType.FieldValue == "-1" ? "0" : contextObj.ddlWorkType.FieldValue*/).subscribe(function (result) {

            contextObj.totalItems = result["Data"].DataCount;

            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.disable = false;
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                contextObj.itemSourceUpdate.emit({
                    itemSource: contextObj.itemsSource,
                    rowsPerPage: contextObj.itemsPerPage,
                    totalItems: contextObj.totalItems
                });
            }
            else {
                    contextObj.itemSourceUpdate.emit({
                    itemSource: [],
                    rowsPerPage: 0,
                    totalItems: 0
                });

                contextObj.notificationService.ShowToaster("No Requests exist", 2);
                contextObj.enableMenu = [1];
                contextObj.disable = true;
            }
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.reviewClick();
                break;
            case 4:     //complete
                this.onCompleteClick();
                break;
            case 5:     //close
                this.onClose();
                break;
            case 6:     //Discard
                this.discard();
                break;
            case 7:     //over-ride
                this.override();
                break;

            case 8:     //reminder
                this.reminder();
                break;

            case 9:     //edit rule
                this.onEditRuleClick();
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

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";

        this.workOrderService.loadReviewServiceRequest(0, "add", 0, 0, 1, 0).subscribe(function (resultData) {

            contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetailsForAdd(resultData["Data"]["FieldBinderList"]);
            contextObj.addEditClicked.emit({
                fieldobject: contextObj.fieldDetailsAdd1,
                outComes: [],//JSON.parse(resultData["Data"]["FieldBinderData"]),
                action: "add",
                buttonName: contextObj.btnName,
                input: contextObj.inputItems,
            });
        });
    }


    public onEditRuleClick() {
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
        } else if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (!contextObj.inputItems.rowData.ParentWorkflowEntityId) {
            contextObj.notificationService.ShowToaster("No Rule set for the selected " + (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? "Request" : "Work Order"), 2);
        } else {
            contextObj.secondaryTarget = 4;
            contextObj.pageTitle = "Edit Rule";
            setTimeout(function () {
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            }, 200);
        }
    }

    public onRuleUpdate(event) {
        this.secondaryTarget = -1;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.checkAndLoadData();
    }

    public onSplitViewClose(event) {
        this.secondaryTarget = -1;
    }

    public fieldChange(event) {

        var contextObj = this;

        if (contextObj.inputItems.selectedIds.length == 1) {
            var entityCategoryId = contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
            var workTypeId = contextObj.inputItems.rowData["WorkTypeId"];
            var actionPointId = event.ddlRelationShipEvent.ChildFieldObject.FieldValue//contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
        }


        contextObj.workOrderService.getActionPointUserLookupForOverride(0, parseInt(workTypeId), 9, entityCategoryId, actionPointId).subscribe(function (resultData) {

            var actionUser: IField = contextObj.overrideFieldObject.find(function (item) {

                return item.FieldId === 1488
            });

            if (resultData["FieldBinderData"] != "[]") {
                var sendTo = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 12254 });
                sendTo.IsVisible = true;
                var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                actionUser.LookupDetails.LookupValues = lookUpArray;
                actionUser.IsVisible = true;
                actionUser.IsMandatory = true;
                actionUser.FieldLabel = "Next Action Point User(s)";
            } else {
                actionUser.IsVisible = false;
                actionUser.IsMandatory = false;
                actionUser.HasValidationError = false;
                contextObj.initiateValidation(actionUser);
                actionUser.LookupDetails.LookupValues = [];
                actionUser.MultiFieldValues = [];
            }
        });
    }

    public reviewClick() {
        this.action = "review";
        this.btnName = "Save Changes";
        var contextObj = this;
        debugger;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
        } else if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            contextObj.workOrderService.loadReviewServiceRequest((contextObj.inputItems.rowData.WorkOrderId == 0 || contextObj.inputItems.rowData.WorkOrderId == null) ? contextObj.inputItems.rowData.WorkRequestId : contextObj.inputItems.rowData.WorkOrderId, // after generate workorder workorderId is datakey
                "review", contextObj.inputItems.rowData["WorkTypeId"], contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"], contextObj.inputItems.rowData["WorkflowEntityCategoryId"], contextObj.inputItems.rowData["WorkFlowEntityId"]).subscribe(function (resultData) {
                    debugger;
                    contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetailsForEdit(resultData["Data"]["FieldBinderList"]);
                    contextObj.updateDateTimeAdditionalDataFields(contextObj.fieldDetailsAdd1);
                    if (resultData["Data"]["FieldBinderData"] != null) {
                        contextObj.removeTimeOutActionFromLookUps(JSON.parse(resultData["Data"]["FieldBinderData"]));
                    }
                    contextObj.addEditClicked.emit({
                        fieldobject: contextObj.fieldDetailsAdd1,
                        outComes: resultData["Data"]["FieldBinderData"] == null ? [] : JSON.parse(resultData["Data"]["FieldBinderData"]),
                        action: contextObj.action,
                        buttonName: contextObj.btnName,
                        input: contextObj.inputItems,
                    });
                });
        }
    }
    public initiateValidation(fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    }

    public removeTimeOutActionFromLookUps(outcomeData: any[]) {

        var actionfield = this.fieldDetailsAdd1.find(function (item) {
            return item.ReportFieldId === 5834;
        });

        if (outcomeData != null && outcomeData.length != 0) {
            actionfield.LookupDetails.LookupValues = outcomeData.filter(function (item) {
                return item["OutcomeTypeId"] != 28;
            });
        }

    }

    public onKeyWordSearch(event) {
        this.filter = event.value;
        this.isKeyWordSearch = 1;
        this.isAdvanceSearch = 0;
        this.pageIndex = 0;
        this.advanceValue = "[]";
        this.itemsSource = [];
        this.getKeywordSearchdata();
    }

    public getKeywordSearchdata() {

        var contextObj = this;
        contextObj.workOrderService.getWorkOrderKeyWordListData(2, contextObj.getReportFieldIdValuesForSearch(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {

            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
        });
    }

    public loadadvanceSearch() {
        var contextObj = this;
        this.workOrderService.getServiceRequestAdvnceSearchLookup(contextObj.getReportFieldIdValuesForSearch()).subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            //contextObj.advancelookupDefault = contextObj.advancelookup;
        });
    }

    public onAdvanceSearch(event) {
        this.advanceValue = event.fieldobject;
        this.showSearchFilter = [];
        if (this.isSearch(event)) {
            this.isAdvanceSearch = 1;
            this.isKeyWordSearch = 0;
            this.pageIndex = 0;
            this.getAdvancedSearchdata();
        }
        else
            this.showSearchFilter = this.showSearchFilter.concat(true);
    }
    isSearch(event) {
        var isSubmit = true;
        console.log('event in advance search submit', event)
        var eventObj = JSON.parse(event.fieldobject);
        var requesteeddate = undefined;
        var cnt = 1;
        eventObj.find(function (el) {
            switch (el.ReportFieldId) {
                case 1486: //requested date
                    if (el.Value.indexOf('æ') > -1) {
                        requesteeddate = el.Value;
                    }
                    cnt--;
                    break;               
            }
            if (cnt == 0) {
                return true
            }
            else
                return false
        });
        if (requesteeddate != undefined) {
            var splittedVal = requesteeddate.split('ô')
            if (new Date(splittedVal[1]) > new Date(splittedVal[3])) {
                this.notificationService.ShowToaster("Requested To date must be greater than From date", 2);
                isSubmit = false;
            } 
        }
        return isSubmit;
    }
    public getAdvancedSearchdata() {
        var contextObj = this;
        contextObj.workOrderService.getWorkOrderAdvanceSearchListData(2, contextObj.getReportFieldIdValuesForSearch(), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.advanceValue).subscribe(function (resultData) {

            contextObj.totalItems = resultData["Data"]["DataCount"];
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                contextObj.itemsSource = [];
                contextObj.enableMenu = [1];
            }
            else {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
        });
    }
    Clear(event: any) {
        this.filter = "";
        this.isKeyWordSearch = 0;
        this.isAdvanceSearch = 0;
        var contextObj = this;
        // contextObj.advancelookup = JSON.parse(JSON.stringify(contextObj.advancelookupDefault));
        this.dataLoad(0)
    }
    public getReportFieldIdValuesForSearch() {
        var contextObj = this;
        var tempArray: ReportFieldIdValues[] = [];
        tempArray.push(
            {
                ReportFieldId: 1490, /*Status*/
                Value: 0
            }
            //{
            //    ReportFieldId: 5873,
            //    Value: contextObj.ddlWorkType.FieldValue == "-1" ? "0" : contextObj.ddlWorkType.FieldValue
            //}
        );
        return JSON.stringify(tempArray);
    }

    public updateFieldDetailsForAdd(fieldDetailsArray) {


        var contextObj = this;
        fieldDetailsArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 1492:  //Request No
                    item.IsVisible = false;
                    break;
                case 1367:  //Requested by
                    item.IsVisible = false;
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
                    item.IsVisible = false;
                    break;
                case 1478:  //Previous Review Comments
                    item.IsVisible = false;
                    break;
                case 5978:  //Review Comments
                    item.IsVisible = false;
                    break;
                case 5873:  //WorkType
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    if (item.LookupDetails == null || item.LookupDetails.LookupValues == null || item.LookupDetails.LookupValues.length == 0) contextObj.notificationService.ShowToaster("No Work Types exist", 2);
                    break;
                case 1471:  //Description
                    item.IsVisible = true;
                    item.IsMandatory = true;
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
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    break;
                case 1374:  //Requester Email
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserEmail;
                    break;
                case 1488:  //Priority
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = (item.LookupDetails.LookupValues && item.LookupDetails.LookupValues.length > 0) ? item.LookupDetails.LookupValues[0].Id.toString() : "-1";
                    break;
                case 1487:  //Expected Date of Completion
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    var date = new Date()
                    date.setDate(date.getDate() + 1)
                    item.FieldValue = contextObj.getFormattedDate(date.toDateString());
                    break;
                case 489:   //Site
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    break;
                case 487:  //Building
                    item.IsVisible = true;
                    break;
                case 9548:  //Floor
                    item.IsVisible = true;
                    break;
                case 1372: //Requester
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = "14";
                    break;
                //Fields specially for For WorkOrder. Enables only in Review of WorkOrder
                case 1440:
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
                case 292:
                case 294:
                case 296:
                case 298:
                    item.IsVisible = false;
                    break;
                case 7807: /*Requester Phone*/
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserPhoneNo;
                    break;
            }
        });

        return fieldDetailsArray;
    }

    public updateFieldDetailsForEdit(fieldDetailsArray: any) {

        var contextObj = this;

        fieldDetailsArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 1492:  //Request No
                    item.IsVisible = true;
                    break;
                case 1367:  //Requested by
                    item.IsVisible = true;
                    break;
                case 5834:  //Select an Action
                    item.IsVisible = true;
                    break;
                case 7521:  //Time Spent ((Hours)
                    item.IsVisible = contextObj.isTimeSpentSubscribed;
                    item.IsMandatory = contextObj.isTimeSpentSubscribed;
                    item.FieldValue = "0.01";
                    break;
                case 12254:   //Send to
                    item.IsVisible = false;
                    item.FieldLabel = "Next Action Point User(s)";
                    break;
                case 5988:  //Description
                    item.IsVisible = true;
                    break;
                case 1478:  //Previous Review Comments
                    item.IsVisible = true;
                    var replaceString = "** ";
                    item.FieldValue = item.FieldValue ? item.FieldValue.replace(new RegExp(replaceString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), "\n") : "";
                    break;
                case 5978:  //Review Comments
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.IsLocallyValidated = false;
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
                    break;
                case 1370:  //Requester (Middle Name)
                    item.IsVisible = true;
                    break;
                case 1371:  //Requester (Last Name)
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    break;
                case 1486:  //Requested Date
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = true;
                    item.ReadOnlyMode = true;
                    break;
                case 1374:  //Requester Email
                    item.IsVisible = false;
                    break;
                case 1488:  //Priority
                    item.IsVisible = true;
                    item.IsMandatory = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? true : false;
                    item.ReadOnlyMode = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? false : true;
                    break;
                case 1487:  //Expected Date of Completion
                    item.IsVisible = true;
                    item.IsMandatory = false;
                    item.IsEnabled = true;
                    item.ReadOnlyMode = true;
                    break;
                case 489:   //Site
                    item.IsVisible = true;
                    item.IsMandatory = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? true : false;;
                    item.ReadOnlyMode = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? false : true;
                    break;
                case 473:  //Building
                    item.IsVisible = true;
                    item.ReadOnlyMode = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? false : true;
                    break;
                case 9548:  //Floor
                    item.IsVisible = true;
                    // item.FieldValue = contextObj.inputItems.rowData["FloorId"];
                    item.ReadOnlyMode = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? false : true;
                    break;
                case 290:
                    item.ReadOnlyMode = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? false : true;
                    item.FieldValue = contextObj.inputItems.rowData[item.FieldLabel];
                    break;
                case 1372: //Requester
                    item.IsVisible = false;
                    item.IsMandatory = false;
                    break;
                //Fields specially for For WorkOrder
                case 1440:
                    item.IsVisible = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? false : true;
                    break;
                case 6562:  //Hold Details
                    item.IsVisible = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? false : true;
                    item.FieldValue = contextObj.inputItems.rowData["StatusId"] == 22 ? "1" : "0";
                    item.IsEnabled = contextObj.inputItems.rowData["StatusId"] != 11;
                    break;
                case 6202:  //Hold Reason
                    item.IsVisible = contextObj.inputItems.rowData["StatusId"] != 22 ? false : true;
                    item.FieldValue = (contextObj.inputItems.rowData["CurrentOnHoldReasonId"] == null || contextObj.inputItems.rowData["StatusId"] != 22) ? "-1" : contextObj.inputItems.rowData["CurrentOnHoldReasonId"];
                    item.IsEnabled = false;
                    break;
                case 6201:  //Hold time
                    item.IsVisible = contextObj.inputItems.rowData["StatusId"] != 22 ? false : true;
                    item.FieldValue = (contextObj.inputItems.rowData["CurrentOnHoldStartTime"] == null || contextObj.inputItems.rowData["StatusId"] != 22) ? "" : contextObj.inputItems.rowData["CurrentOnHoldStartTime"];
                    item.ReadOnlyMode = true;
                    break;
                case 6203:  //Date of Completion
                    item.IsVisible = false;
                    break;
                case 6175:  //Work In Progress
                    item.IsVisible = false;
                    break;
                case 1454: //Remarks
                    item.IsVisible = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? false : true;
                    break;
                case 292:
                case 294:
                case 296:
                case 298:
                    if (item.FieldValue && item.FieldValue != '' && item.LookupDetails.LookupValues && item.LookupDetails.LookupValues.length > 0) {
                        var selectedItem = item.LookupDetails.LookupValues.find(function (lookUps) { return lookUps.Id.toString() === item.FieldValue });
                        if (selectedItem) {
                            item.FieldValue = selectedItem.Value;
                        }
                    }
                    item.IsVisible = false;
                    item.IsEnabled = false;
                    break;
            }
        });

        return fieldDetailsArray;
    }

    public getFormattedDate(value: string) {
        var strDate = "";
        var date;
        if (value != undefined) {
            date = new Date(value);
        }
        else {
            date = new Date();
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        console.log(strDate.length);
        return strDate;
    }

    public updateFieldDetailsForComplete(fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 1500:  //Date of Completion
                    item.IsVisible = true;
                    break;
                case 1454:  //Remarks
                    item.IsVisible = contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 ? false : true;
                    break;
                case 12254:  //Send to
                    item.IsVisible = true;
                    break;
                case 7521:  //Time Spent (Hours)
                    item.IsVisible = contextObj.isTimeSpentSubscribed;
                    item.IsMandatory = contextObj.isTimeSpentSubscribed;
                    break;
            }
        });

        return fieldDetailsArray;
    }

    public onCompleteClick() {
        var contextObj = this;
        contextObj.CompleteOrClose = 1;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length > 1) {
            var preivousWorkTypeId;
            for (var item of contextObj.inputItems.rowData) {
                if (preivousWorkTypeId && preivousWorkTypeId != item["WorkTypeId"]) {
                    contextObj.notificationService.ShowToaster("Request(s) of different Work Types cannot be completed", 2);
                    return;
                }
                preivousWorkTypeId = item["WorkTypeId"];
            }

            var preivousCategoryId;
            for (var item of contextObj.inputItems.rowData) {
                if (preivousCategoryId && preivousCategoryId != item["WorkflowEntityCategoryId"]) {
                    contextObj.notificationService.ShowToaster("Selected Request(s) are from different Entities, cannot be completed", 2);
                    return;
                }
                preivousCategoryId = item["WorkflowEntityCategoryId"];
            }

        }

        var reportFieldIds: ReportFieldIdValues[] = [];
        if (contextObj.inputItems.selectedIds.length > 1) {
            if (contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 1) {
                for (var item of contextObj.inputItems.rowData) {

                    reportFieldIds.push(
                        {
                            ReportFieldId: 1481,
                            Value: item["WorkRequestId"]
                        }
                    )
                }
                reportFieldIds.push({
                    ReportFieldId: 6561,
                    Value: 1
                });
            } else {
                for (var item of contextObj.inputItems.rowData) {
                    reportFieldIds.push(
                        {
                            ReportFieldId: 1481,
                            Value: item["WorkOrderId"]
                        }
                    )
                }
                reportFieldIds.push({
                    ReportFieldId: 6561,
                    Value: 2
                });
            }
        } else {
            if (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1) {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: contextObj.inputItems.rowData["WorkRequestId"]
                    },
                    {
                        ReportFieldId: 6561,
                        Value: 1
                    }
                )
            } else {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: contextObj.inputItems.rowData["WorkOrderId"]
                    },
                    {
                        ReportFieldId: 6561,
                        Value: 2
                    }
                )
            }
        }

        var workFlowInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };

        contextObj.workOrderService.CheckMultipleCompleteorClose(JSON.stringify(reviewSubmitOutput), 2).subscribe(function (result) {


            var WorkflowEntityCategoryId = (contextObj.inputItems.selectedIds.length > 1) ? contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] : contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
            if (result["Data"] == -2 || result["Data"] == -12 || result["Data"] == -11) {
                if (WorkflowEntityCategoryId == 1)
                    contextObj.notificationService.ShowToaster("Selected Service Request(s) cannot be completed", 2);
                else
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be completed", 2);
            }
            else if (result["Data"] == -3) {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) in On Hold status, cannot be completed", 2);
            }

            else if (result["Data"] == -1) {
                contextObj.notificationService.ShowToaster("Some of the selected Work Order(s) cannot be completed", 2);
            }

            else if (result["Data"] == 0) {
                if (WorkflowEntityCategoryId == 1)
                    contextObj.notificationService.ShowToaster("Some of the selected Request(s) are already completed", 2);
                else
                    contextObj.notificationService.ShowToaster("Some of the selected Work Order(s) are already completed", 2);
            }
            else if (result["Data"] == 1) {
                contextObj.btnName = "Save";
                contextObj.action = "Complete";
                contextObj.workOrderService.getCompleteOrCloseRequestFields().subscribe(function (resultData) {
                    contextObj.completeCloseFieldObject = contextObj.updateFieldDetailsForComplete(resultData["Data"]);
                    if (WorkflowEntityCategoryId == 1) {
                        contextObj.pageTitle = "Complete Service Requests";
                        var DateCompletion = resultData["Data"].find(function (item) { return item.ReportFieldId === 1487 })
                        DateCompletion.IsVisible = false;
                    }
                    else {
                        contextObj.pageTitle = "Complete Work Orders";
                    }
                    if (contextObj.isTimeSpentSubscribed == false) {

                        var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 })
                        TimeSpent.IsVisible = false;
                        TimeSpent.FieldValue = "0.01";
                        if (contextObj.inputItems.selectedIds.length == 1) {
                            if (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1 || contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 2) {
                                var Remarks = resultData["Data"].find(function (item) { return item.ReportFieldId === 1454 })
                                Remarks.IsVisible = false;
                            }
                        }
                        else if (contextObj.inputItems.selectedIds.length > 1) {
                            for (var item of contextObj.inputItems.rowData) {
                                if (contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 1 || contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 2) {
                                    var Remarks = resultData["Data"].find(function (item) { return item.ReportFieldId === 1454 })
                                    Remarks.IsVisible = false;

                                    break;
                                }
                            }
                        }
                    }
                    else if (contextObj.isTimeSpentSubscribed == true) {
                        if (contextObj.inputItems.selectedIds.length == 1) {
                            if (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1) {
                                var Remarks = resultData["Data"].find(function (item) { return item.ReportFieldId === 1454 })
                                Remarks.IsVisible = false;

                            }

                        }
                        else if (contextObj.inputItems.selectedIds.length > 1) {
                            for (var item of contextObj.inputItems.rowData) {
                                if (contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 1) {
                                    var Remarks = resultData["Data"].find(function (item) { return item.ReportFieldId === 1454 })
                                    Remarks.IsVisible = false;
                                    break;
                                }
                            }
                        }
                    }
                    if (contextObj.inputItems.selectedIds.length == 1) {
                        var entityCategoryId = contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
                        var workTypeId = contextObj.inputItems.rowData["WorkTypeId"];
                        var actionPointId = contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
                    }
                    else if (contextObj.inputItems.selectedIds.length > 1) {
                        var entityCategoryId = contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"];
                        var workTypeId = contextObj.inputItems.rowData[0]["WorkTypeId"];
                        var actionPointId = contextObj.inputItems.rowData[0]["CurrentWorkFlowActionPointId"];

                    }




                    contextObj.workOrderService.getActionPointUserLookupForComplete(0, parseInt(workTypeId), 9, entityCategoryId, actionPointId).subscribe(function (resultData) {

                        var actionUser: IField = contextObj.completeCloseFieldObject.find(function (item) {
                            return item.FieldId === 1562
                        });

                        if (resultData["FieldBinderData"] != "[]") {

                            var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                            actionUser.LookupDetails.LookupValues = lookUpArray;
                            actionUser.IsVisible = true;
                            actionUser.IsMandatory = true;
                            actionUser.FieldLabel = "Next Action Point User(s)";
                        } else {// Direct complete condition

                            actionUser.IsVisible = false;
                            actionUser.IsMandatory = false;
                            actionUser.HasValidationError = false;
                            contextObj.initiateValidation(actionUser);
                            actionUser.LookupDetails.LookupValues = [];
                            actionUser.MultiFieldValues = [];
                            if (contextObj.isTimeSpentSubscribed == false && WorkflowEntityCategoryId == 1) {
                                contextObj.splitviewInput.showSecondaryView = false;

                                var dateofcompletion = contextObj.completeCloseFieldObject.find(function (item) {
                                    return item.ReportFieldId === 1487
                                });
                                var remarks = contextObj.completeCloseFieldObject.find(function (item) {
                                    return item.ReportFieldId === 1454
                                });

                                var reportfieldIdArray: ReportFieldIdValues[] = [];

                                if (contextObj.inputItems.selectedIds.length > 1) {
                                    if (contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 1) {
                                        for (var item of contextObj.inputItems.rowData) {
                                            reportFieldIds.push(
                                                {
                                                    ReportFieldId: 1481,
                                                    Value: item["WorkRequestId"]
                                                }
                                            )
                                        }
                                        reportFieldIds.push({
                                            ReportFieldId: 6561,
                                            Value: 1
                                        });
                                    }
                                } else {
                                    if (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1) {
                                        reportFieldIds.push(
                                            {
                                                ReportFieldId: 1481,
                                                Value: contextObj.inputItems.rowData["WorkRequestId"]
                                            },
                                            {
                                                ReportFieldId: 6561,
                                                Value: 1
                                            }
                                        )
                                    }
                                }

                                reportfieldIdArray.push(
                                    {
                                        ReportFieldId: 7521,
                                        Value: 0.01
                                    },
                                    {
                                        ReportFieldId: 1454,
                                        Value: remarks.FieldValue
                                    },

                                    {
                                        ReportFieldId: 1487,
                                        Value: dateofcompletion.FieldValue
                                    }

                                )

                                var tobepassed = { fieldobject: JSON.stringify(reportfieldIdArray) }
                                contextObj.onCompleteOrCloseSubmit(tobepassed);

                            }
                        }
                    });

                    contextObj.secondaryTarget = 1;
                    contextObj.splitviewInput.showSecondaryView = true;
                });



            }
            else {
                if (WorkflowEntityCategoryId == 1)
                    contextObj.notificationService.ShowToaster("Selected Service Request(s) cannot be completed", 2);
                else
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be completed", 2);
                return;
            }
        });


    }

    public onClose() {


        var contextObj = this;
        contextObj.CompleteOrClose = 2;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length > 1) {

            var preivousWorkTypeId;
            for (var item of contextObj.inputItems.rowData) {
                if (preivousWorkTypeId && preivousWorkTypeId != item["WorkTypeId"]) {
                    contextObj.notificationService.ShowToaster("Request(s) of different Work Types cannot be closed", 2);
                    return;
                }
                preivousWorkTypeId = item["WorkTypeId"];
            }

            var preivousCategoryId;
            for (var item of contextObj.inputItems.rowData) {
                if (preivousCategoryId && preivousCategoryId != item["WorkflowEntityCategoryId"]) {
                    contextObj.notificationService.ShowToaster("Selected Request(s) are from different Entities, cannot be closed", 2);
                    return;
                }
                preivousCategoryId = item["WorkflowEntityCategoryId"];
            }
        }

        var reportFieldIds: ReportFieldIdValues[] = [];
        if (contextObj.inputItems.selectedIds.length > 1) {
            if (contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 1) {
                for (var item of contextObj.inputItems.rowData) {
                    reportFieldIds.push(
                        {
                            ReportFieldId: 1481,
                            Value: item["WorkRequestId"]
                        }
                    )
                }
                reportFieldIds.push({
                    ReportFieldId: 6561,
                    Value: 1
                });
            } else {
                for (var item of contextObj.inputItems.rowData) {
                    reportFieldIds.push(
                        {
                            ReportFieldId: 1481,
                            Value: item["WorkOrderId"]
                        }
                    )
                }
                reportFieldIds.push({
                    ReportFieldId: 6561,
                    Value: 2
                });
            }
        } else {
            if (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1) {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: contextObj.inputItems.rowData["WorkRequestId"]
                    },
                    {
                        ReportFieldId: 6561,
                        Value: 1
                    }
                )
            } else {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: contextObj.inputItems.rowData["WorkOrderId"]
                    },
                    {
                        ReportFieldId: 6561,
                        Value: 2
                    }
                )
            }
        }

        var workFlowInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };

        contextObj.workOrderService.CheckMultipleCompleteorClose(JSON.stringify(reviewSubmitOutput), 1).subscribe(function (result) {


            var WorkflowEntityCategoryId = (contextObj.inputItems.selectedIds.length > 1) ? contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] : contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
            if (result["Data"] == -2 || result["Data"] == -12 || result["Data"] == -11) {
                if (WorkflowEntityCategoryId == 1)
                    contextObj.notificationService.ShowToaster("Selected Service Request(s) cannot be closed", 2);
                else
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be closed", 2);
                return;
            }

            else if (result["Data"] == -3) {
                contextObj.notificationService.ShowToaster("Selected Work Order(s) in On Hold status, cannot be closed", 2);
            }

            else if (result["Data"] == -1) {
                contextObj.notificationService.ShowToaster("Some of the selected Work Order(s) cannot be closed", 2);
            }

            else if (result["Data"] == 0) {
                if (WorkflowEntityCategoryId == 1) {
                    contextObj.notificationService.ShowToaster("Some of the selected Request(s) are already closed", 2);
                }
                else if (WorkflowEntityCategoryId != 1)
                    contextObj.notificationService.ShowToaster("Some of the selected Work Order(s) are already closed", 2);
            }
            else if (result["Data"] == 1) {

                contextObj.btnName = "Save";
                contextObj.action = "Close";
                contextObj.workOrderService.getCompleteOrCloseRequestFields().subscribe(function (resultData) {
                    contextObj.completeCloseFieldObject = contextObj.updateFieldDetailsForComplete(resultData["Data"]);

                    if (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1) {
                        contextObj.pageTitle = "Close Service Requests";

                    }
                    else {
                        contextObj.pageTitle = "Close Work Orders";
                    }
                    var SendTo = resultData["Data"].find(function (item) { return item.ReportFieldId === 12254 });
                    SendTo.IsVisible = false;
                    if (contextObj.isTimeSpentSubscribed == false) {

                        if (contextObj.inputItems.selectedIds.length == 1) {
                            if ((contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1) || (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 2)) {
                                var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 })
                                TimeSpent.IsVisible = false;
                                TimeSpent.FieldValue = "0.01";
                            }
                        }
                        else if (contextObj.inputItems.selectedIds.length > 1) {
                            for (var item of contextObj.inputItems.rowData) {
                                if (contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 2 || contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 2) {
                                    var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 })
                                    TimeSpent.IsVisible = false;
                                    TimeSpent.FieldValue = "0.01";
                                    break;
                                }
                            }
                        }

                    }
                    if (contextObj.isTimeSpentSubscribed == true) {

                        var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 })
                        TimeSpent.IsVisible = false;
                        TimeSpent.FieldValue = "0.01";


                    }
                    if (WorkflowEntityCategoryId == 1) {

                        contextObj.splitviewInput.showSecondaryView = false;
                        var reportfieldIdArray: ReportFieldIdValues[] = [];
                        //reportfieldIdArray.push({ ReportFieldId: 12254, Value: "" });

                        //var actionPointField: IField = contextObj.completeCloseFieldObject.find(function (item) {
                        //    return item.ReportFieldId === 12254;
                        //});



                        var Remarks: IField = contextObj.completeCloseFieldObject.find(function (item) {
                            return item.ReportFieldId === 1454;
                        });
                        var TimeSpent: IField = contextObj.completeCloseFieldObject.find(function (item) {
                            return item.ReportFieldId === 7521;
                        });
                        if (TimeSpent != null) {

                            reportfieldIdArray.push({
                                ReportFieldId: 7521,
                                Value: TimeSpent.FieldValue
                            });
                        }
                        if (Remarks != null) {

                            reportfieldIdArray.push({
                                ReportFieldId: 1454,
                                Value: Remarks.FieldValue
                            });
                        }

                        var toBePassed = { fieldobject: JSON.stringify(reportfieldIdArray) }
                        contextObj.onCompleteOrCloseSubmit(toBePassed);
                        return;
                    }

                    else {
                        contextObj.secondaryTarget = 1;
                        contextObj.splitviewInput.showSecondaryView = true;
                    }
                });
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Request(s) cannot be Closed", 2);
                return;
            }

        });


    }

    public discard() {
        var contextObj = this;
        this.pageTitle = "Discard Work Orders";
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
            return;
        }
        if (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1) {

            contextObj.notificationService.ShowToaster("Request(s) cannot be discarded", 2);
        }
        else {
            var contextObj = this;

            for (var item of contextObj.inputItems.rowData)
                if (item["WorkflowEntityCategoryId"] == 1) {
                    contextObj.notificationService.ShowToaster("Request(s) cannot be discarded", 2);
                    return;
                }

            contextObj.CompleteOrClose = 3;
            if (contextObj.inputItems.selectedIds.length > 1) {

                var preivousCategoryId;
                for (var item of contextObj.inputItems.rowData) {
                    if (preivousCategoryId && preivousCategoryId != item["WorkflowEntityCategoryId"]) {
                        contextObj.notificationService.ShowToaster("Selected Request(s) cannot be discarded", 2);
                        return;
                    }
                    preivousCategoryId = item["WorkflowEntityCategoryId"];
                }



                var preivousWorkTypeId;
                for (var item of contextObj.inputItems.rowData) {
                    if (preivousWorkTypeId && preivousWorkTypeId != item["WorkTypeId"]) {
                        contextObj.notificationService.ShowToaster("Request(s) of different Work Types cannot be completed", 2);
                        return;
                    }
                    preivousWorkTypeId = item["WorkTypeId"];
                }
            }

            var reportFieldIds: ReportFieldIdValues[] = [];
            if (contextObj.inputItems.selectedIds.length > 1) {
                if (contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 1) {
                    for (var item of contextObj.inputItems.rowData) {
                        reportFieldIds.push(
                            {
                                ReportFieldId: 1481,
                                Value: item["WorkRequestId"]
                            }
                        )
                    }
                    reportFieldIds.push({
                        ReportFieldId: 6561,
                        Value: 1
                    });
                } else {
                    for (var item of contextObj.inputItems.rowData) {
                        reportFieldIds.push(
                            {
                                ReportFieldId: 1481,
                                Value: item["WorkOrderId"]
                            }
                        )
                    }
                    reportFieldIds.push({
                        ReportFieldId: 6561,
                        Value: 2
                    });
                }
            } else {
                if (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1) {
                    reportFieldIds.push(
                        {
                            ReportFieldId: 1481,
                            Value: contextObj.inputItems.rowData["WorkRequestId"]
                        },
                        {
                            ReportFieldId: 6561,
                            Value: 1
                        }
                    )
                } else {
                    reportFieldIds.push(
                        {
                            ReportFieldId: 1481,
                            Value: contextObj.inputItems.rowData["WorkOrderId"]
                        },
                        {
                            ReportFieldId: 6561,
                            Value: 2
                        }
                    )
                }
            }

            var workFlowInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
            var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };

            contextObj.workOrderService.CheckMultipleCompleteorClose(JSON.stringify(reviewSubmitOutput), 3).subscribe(function (result) {
                if (result["Data"] == -2 || result["Data"] == -12 || result["Data"] == -11) {
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) cannot be discarded", 2);
                }
                else if (result["Data"] == -3) {
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) in On Hold status, cannot be discarded", 2);
                }

                else if (result["Data"] == -1) {
                    contextObj.notificationService.ShowToaster("Some of the selected Work Order(s) cannot be discarded", 2);
                }

                else if (result["Data"] == 0) {
                    contextObj.notificationService.ShowToaster("Selected Work Order(s) are already discarded", 2);
                }
                else if (result["Data"] == 1) {


                    contextObj.btnName = "Save";
                    contextObj.action = "Complete";
                    contextObj.workOrderService.getCompleteOrCloseRequestFields().subscribe(function (resultData) {
                        contextObj.completeCloseFieldObject = contextObj.updateFieldDetailsForComplete(resultData["Data"]);

                        var TimeSpent: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 7521 });
                        var DateofCompletion: IField = resultData["Data"].find(function (item) { return item.ReportFieldId === 1487 });
                        var SendTo = resultData["Data"].find(function (item) { return item.ReportFieldId === 12254 });
                        var Remarks = resultData["Data"].find(function (item) { return item.ReportFieldId === 1454 });
                        Remarks.IsMandatory = true;
                        TimeSpent.IsVisible = false;
                        DateofCompletion.IsVisible = false;
                        SendTo.IsVisible = false;
                        TimeSpent.FieldValue = "0.01";

                        contextObj.secondaryTarget = 1;
                        contextObj.splitviewInput.showSecondaryView = true;
                    });
                }
            });
        }
    }

    public onCompleteOrCloseSubmit(event) {

        var contextObj = this;

        var reportFieldIds = JSON.parse(event.fieldobject);

        var actionPoint = reportFieldIds.find(function (items) { return items.ReportFieldId === 12254 });

        var index = reportFieldIds.indexOf(actionPoint);

        if (index > -1) {
            reportFieldIds.splice(index, 1);
        }

        if (contextObj.CompleteOrClose == 3) {

            var DateOfCompletionRemove = reportFieldIds.find(function (items) { return items.ReportFieldId === 1487 });
            var index = reportFieldIds.indexOf(DateOfCompletionRemove);
            if (index > -1) {
                reportFieldIds.splice(index, 1);
            }
        }
        if (contextObj.CompleteOrClose == 1) {

            var DateRemove = reportFieldIds.find(function (items) { return items.ReportFieldId === 1481 });
            var index = reportFieldIds.indexOf(DateRemove);
            if (index > -1) {
                reportFieldIds.splice(index, 1);
            }
        }

        var actionPointField: IField = contextObj.completeCloseFieldObject.find(function (item) {
            return item.ReportFieldId === 12254;
        });
        if (actionPointField.MultiFieldValues != null) {

            for (var items of actionPointField.MultiFieldValues) {
                reportFieldIds.push({
                    ReportFieldId: 12254,
                    Value: items
                });
            }
        }

        if (contextObj.inputItems.selectedIds.length > 1) {
            if (contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] == 1) {
                for (var item of contextObj.inputItems.rowData) {
                    reportFieldIds.push(
                        {
                            ReportFieldId: 1481,
                            Value: item["WorkRequestId"]
                        }, {
                            ReportFieldId: 5859,
                            Value: item["WorkFlowEntityId"]
                        }

                    )
                }
                reportFieldIds.push({
                    ReportFieldId: 6561,
                    Value: 1
                });

            } else {
                for (var item of contextObj.inputItems.rowData) {
                    reportFieldIds.push(
                        {
                            ReportFieldId: 1481,
                            Value: item["WorkOrderId"]
                        }, {
                            ReportFieldId: 5859,
                            Value: item["WorkFlowEntityId"]
                        }
                    )
                }
                reportFieldIds.push({
                    ReportFieldId: 6561,
                    Value: 2
                });
            }

        } else {
            if (contextObj.inputItems.rowData["WorkflowEntityCategoryId"] == 1) {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: contextObj.inputItems.rowData["WorkRequestId"]
                    },
                    {
                        ReportFieldId: 6561,
                        Value: 1
                    },
                    {
                        ReportFieldId: 5859,
                        Value: contextObj.inputItems.rowData["WorkFlowEntityId"]
                    }
                )
            } else {
                reportFieldIds.push(
                    {
                        ReportFieldId: 1481,
                        Value: contextObj.inputItems.rowData["WorkOrderId"]
                    },
                    {
                        ReportFieldId: 6561,
                        Value: 2
                    },
                    {
                        ReportFieldId: 5859,
                        Value: contextObj.inputItems.rowData["WorkFlowEntityId"]
                    }
                )
            }
        }


        var workFlowInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: reportFieldIds };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };



        if (contextObj.CompleteOrClose == 1) {

            var itemDate;
            var WorkflowEntityCategoryId = (contextObj.inputItems.selectedIds.length > 1) ? contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] : contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
            var DateofCompletion: IField = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 1487 });
            var dateofCompletionValue = new Date(new Date(DateofCompletion.FieldValue).toDateString());
            var TimeSpent: IField = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 7521 });
            if (TimeSpent && TimeSpent.FieldValue == "0") {
                contextObj.notificationService.ShowToaster("Time Spent (Hours) must be greater than zero", 2);
                return;
            }

            if (contextObj.inputItems.selectedIds.length > 1) {


                if (WorkflowEntityCategoryId == 2)
                    for (var item of contextObj.inputItems.rowData) {
                        itemDate = new Date(item["Work Order Date"]);
                        if (dateofCompletionValue < itemDate) {
                            contextObj.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
                            return;
                        }

                    } else if (WorkflowEntityCategoryId == 1) {
                        for (var item of contextObj.inputItems.rowData) {
                            itemDate = new Date(item["Requested Date"]);
                            if (dateofCompletionValue < itemDate) {
                                contextObj.notificationService.ShowToaster("Date of Completion should be greater than Requested Date", 2);
                                return;
                            }

                        }
                    }

            } else if (contextObj.inputItems.selectedIds.length == 1) {
                if (WorkflowEntityCategoryId == 2) {
                    itemDate = new Date(contextObj.inputItems.rowData["Work Order Date"]);
                    if (dateofCompletionValue < itemDate) {
                        contextObj.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
                        return;
                    }
                    else if (WorkflowEntityCategoryId == 1) {
                        itemDate = new Date(contextObj.inputItems.rowData["Requested Date"]);
                        if (dateofCompletionValue < itemDate) {
                            contextObj.notificationService.ShowToaster("Date of Completion should be greater than Requested Date", 2);
                            return;
                        }
                    }
                }
            }
            contextObj.workOrderService.CompleteUpdateData(JSON.stringify(reviewSubmitOutput), 2).subscribe(function (result) {

                if (result.Message == "Success") {
                    contextObj.checkAndLoadData();
                    var WorkflowEntityCategoryId = (contextObj.inputItems.selectedIds.length > 1) ? contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] : contextObj.inputItems.rowData["WorkflowEntityCategoryId"];

                    if (WorkflowEntityCategoryId == 1)
                        contextObj.notificationService.ShowToaster("Request(s) completed", 2);
                    else
                        contextObj.notificationService.ShowToaster("Work Order(s) completed", 2);

                    contextObj.splitviewInput.showSecondaryView = false;
                }


            });
        }
        else if (contextObj.CompleteOrClose == 2) {

            var WorkflowEntityCategoryId = (contextObj.inputItems.selectedIds.length > 1) ? contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] : contextObj.inputItems.rowData["WorkflowEntityCategoryId"];

            if (TimeSpent && TimeSpent.FieldValue == "0") {
                contextObj.notificationService.ShowToaster("Time Spent (Hours) must be greater than zero", 2);
                return;
            }
            if (WorkflowEntityCategoryId == 2) {
                var itemDate;
                var WorkflowEntityCategoryId = (contextObj.inputItems.selectedIds.length > 1) ? contextObj.inputItems.rowData[0]["WorkflowEntityCategoryId"] : contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
                var DateofCompletion: IField = contextObj.completeCloseFieldObject.find(function (item) { return item.ReportFieldId === 1487 });
                var dateofCompletionValue = new Date(new Date(DateofCompletion.FieldValue).toDateString());

                if (contextObj.inputItems.selectedIds.length > 1) {


                    if (WorkflowEntityCategoryId == 2)
                        for (var item of contextObj.inputItems.rowData) {
                            itemDate = new Date(item["Work Order Date"]);
                            if (dateofCompletionValue < itemDate) {
                                contextObj.notificationService.ShowToaster("Date of Completion should be greater than Work Order Date", 2);
                                return;
                            }

                        } else if (WorkflowEntityCategoryId == 1) {
                            for (var item of contextObj.inputItems.rowData) {
                                itemDate = new Date(item["Requested Date"]);
                                if (dateofCompletionValue < itemDate) {
                                    contextObj.notificationService.ShowToaster("Date of Completion should be greater than Requested Date", 2);
                                    return;
                                }

                            }
                        }

                } else if (contextObj.inputItems.selectedIds.length == 1) {
                    if (WorkflowEntityCategoryId == 2) {
                        itemDate = new Date(contextObj.inputItems.rowData["Work Order Date"]);
                        if (dateofCompletionValue < itemDate) {
                            contextObj.notificationService.ShowToaster("Date of completion should be greater than Work Order Date", 2);
                            return;
                        }
                        else if (WorkflowEntityCategoryId == 1) {
                            itemDate = new Date(contextObj.inputItems.rowData["Requested Date"]);
                            if (dateofCompletionValue < itemDate) {
                                contextObj.notificationService.ShowToaster("Date of completion should be greater than Requested Date", 2);
                                return;
                            }
                        }
                    }
                }
            }
            contextObj.workOrderService.CompleteUpdateData(JSON.stringify(reviewSubmitOutput), 1).subscribe(function (result) {
                if (result.Message == "Success") {
                    contextObj.checkAndLoadData();


                    if (WorkflowEntityCategoryId == 1)
                        contextObj.notificationService.ShowToaster("Request(s) closed", 2);
                    else
                        contextObj.notificationService.ShowToaster("Work Order(s) closed", 2);

                    contextObj.splitviewInput.showSecondaryView = false;
                }

            });
        }
        else if (contextObj.CompleteOrClose == 3) {
            contextObj.workOrderService.CompleteUpdateData(JSON.stringify(reviewSubmitOutput), 3).subscribe(function (result) {

                if (result.Message == "Success") {
                    contextObj.checkAndLoadData();
                    contextObj.notificationService.ShowToaster("Work Order(s) discarded", 2);

                    contextObj.splitviewInput.showSecondaryView = false;
                }

            });
        }


    }

    public override() {
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
            return;
        }
        var WorkflowEntityCategoryId = contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
        if (WorkflowEntityCategoryId == 1)
            contextObj.pageTitle = "Override Request";
        else
            contextObj.pageTitle = "Override Work Order";
        this.btnName = "Save";

        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            contextObj.workOrderService.getOverrideRequestFields().subscribe(function (resultData) {

                contextObj.overrideFieldObject = resultData["Data"];

                var overrideFieldObjectlookUp = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 5828 })

                var WorkflowActionPointid = contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
                var WorkTypeId = contextObj.inputItems.rowData["WorkTypeId"];
                var WorkflowEntity = contextObj.inputItems.rowData["WorkFlowEntityId"];

                var sendTo = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 12254 });
                sendTo.IsVisible = false;
                contextObj.workOrderService.loadNextActionPointDetails(WorkflowActionPointid, WorkTypeId, WorkflowEntity).subscribe(function (resultData) {


                    overrideFieldObjectlookUp.LookupDetails.LookupValues = JSON.parse(resultData["FieldBinderData"]);


                });
                var CurrActionPoint = contextObj.overrideFieldObject.find(function (item) { return item.ReportFieldId === 5830 });

                CurrActionPoint.FieldValue = contextObj.inputItems.rowData["Current Action Point"];
                CurrActionPoint.IsEnabled = false;


            });



            contextObj.secondaryTarget = 2;
            contextObj.splitviewInput.showSecondaryView = true;
        }
    }

    public overrideRequestSubmit(event) {
        var contextObj = this;
        var EntityCategoryId = contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
        var CurrentWorkFlowActionPointId = contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"];
        var WorkflowEntityId = contextObj.inputItems.rowData["WorkFlowEntityId"]
        var submitDetails = JSON.parse(event.fieldobject);
        var actionPointId = submitDetails.find(function (item) {

            return item.ReportFieldId === 5828;

        });
        if (EntityCategoryId == 1) {
            var EntityId = contextObj.inputItems.rowData["WorkRequestId"];
        }
        else {
            var EntityId = contextObj.inputItems.rowData["WorkOrderId"];
        }


        var nextActionUserID = submitDetails.find(function (items) { return items.ReportFieldId === 12254 });
        var index = submitDetails.indexOf(nextActionUserID);
        if (index > -1) {
            submitDetails.splice(index, 1);
        }
        var reportfieldIdArray: ReportFieldIdValues[] = [];
        var nextActionPointUsers = contextObj.overrideFieldObject.find(function (items) { return items.ReportFieldId === 12254 });
        if (nextActionPointUsers.MultiFieldValues != null) {
            for (var items of nextActionPointUsers.MultiFieldValues) {
                reportfieldIdArray.push({
                    ReportFieldId: 5864,
                    Value: items
                });
            }
        }


        var EntityIds;
        var WorkFlowEntityIds;
        var CurrentWorkFlowActionPointIds;
        var EntityCategoryIds;


        reportfieldIdArray.push({
            ReportFieldId: 5868,
            Value: EntityId
        });


        reportfieldIdArray.push({
            ReportFieldId: 5859,
            Value: WorkflowEntityId
        });


        reportfieldIdArray.push({
            ReportFieldId: 5863,
            Value: actionPointId.Value
        });


        reportfieldIdArray.push({
            ReportFieldId: 6561,
            Value: EntityCategoryId
        });


        var workFlowInput: WorkFlowEntityInput = { FormId: 375, WFEntityId: 0, WFReportFieldIdValues: reportfieldIdArray };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };
        contextObj.workOrderService.overrideUpdateData(JSON.stringify(reviewSubmitOutput)).subscribe(function (result) {


            if (result.Message == "Success") {
                if (EntityCategoryId == 1) {
                    contextObj.notificationService.ShowToaster("Workflow of the selected Request has been overridden", 2);

                } else {
                    contextObj.notificationService.ShowToaster("Workflow of the selected Work Order has been overridden", 2);
                }
                contextObj.checkAndLoadData();
            }
            else {
                contextObj.notificationService.ShowToaster("Failed", 2);
            }


        });
        contextObj.secondaryTarget = 2;
        contextObj.splitviewInput.showSecondaryView = false;
    }

    public reminder() {

        var contextObj = this;
        contextObj.pageTitle = "Reminder";
        contextObj.btnName = "Send";
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
            return;
        }
        if (contextObj.inputItems.selectedIds.length == 1) {

            contextObj.workOrderService.GetReminderData().subscribe(function (resultData) {


                contextObj.reminderObject = resultData.Data;

                var requestId;
                var entityCategoryId = contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
                var workflowEntityId = contextObj.inputItems.rowData["WorkFlowEntityId"];
                if (Number(entityCategoryId) == 1)
                    requestId = contextObj.inputItems.rowData["WorkRequestId"];
                else if (Number(entityCategoryId) == 2 || Number(entityCategoryId) == 3)
                    requestId = contextObj.inputItems.rowData.WorkOrderId;

                contextObj.workOrderService.GetReminderDatas(entityCategoryId, workflowEntityId, requestId).subscribe(function (resultData) {

                    var pageDetails = JSON.parse(resultData.FieldBinderData);
                    var from = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2070
                    });
                    var to = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2071
                    });
                    var subject = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2072
                    });
                    var message = contextObj.reminderObject.find(function (item) {
                        return item.FieldId === 2073
                    });

                    from.FieldValue = pageDetails[0].From;
                    to.FieldValue = pageDetails[0].ToEmail;
                    subject.FieldValue = pageDetails[0].Subject;
                    message.FieldValue = pageDetails[0].Message;

                    setTimeout(function () {
                        var el = <HTMLElement>document.getElementById("2071"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                        if (el != null && el != undefined) {
                            el.focus();
                            el.blur();
                        }
                    }, 20);
                    setTimeout(function () {
                        var el = <HTMLElement>document.getElementById("2072"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                        if (el != null && el != undefined) {
                            el.focus();
                            el.blur();
                        }
                    }, 20);
                    setTimeout(function () {
                        var el = <HTMLElement>document.getElementById("2073"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                        if (el != null && el != undefined) {
                            el.focus();
                            el.blur();
                        }
                    }, 20);


                    contextObj.secondaryTarget = 3;
                    contextObj.splitviewInput.showSecondaryView = true;

                });

            });
        }
        else {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }


    }

    public onRemiderSubmit(event: any) {


        var contextObj = this;
        var requestId;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Request", 2);
            return;
        }
        var entityCategoryId = contextObj.inputItems.rowData["WorkflowEntityCategoryId"];
        var workflowEntityId = contextObj.inputItems.rowData["WorkFlowEntityId"];
        if (Number(entityCategoryId) == 1)
            requestId = contextObj.inputItems.rowData["WorkRequestId"];
        else if (Number(entityCategoryId) == 2 || Number(entityCategoryId) == 3)
            requestId = contextObj.inputItems.rowData.WorkOrderId;

        var pageDetails = JSON.parse(event.fieldobject);

        pageDetails.push({
            ReportFieldId: 6561,
            Value: entityCategoryId
        });
        pageDetails.push({
            ReportFieldId: 5859,
            Value: workflowEntityId
        });
        pageDetails.push({
            ReportFieldId: 1481,
            Value: requestId
        });

        var workFlowInput: WorkFlowEntityInput = { FormId: 385, WFEntityId: 0, WFReportFieldIdValues: pageDetails };
        var reviewSubmitOutput: ReviewSubmitOutput = { WFEntityInput: workFlowInput, WFEntityDocumentInput: null, ParentFormId: 226 };

        var EmailTo = contextObj.reminderObject.find(function (item) { return item.ReportFieldId === 6715 });

        var emailToArray = [] = EmailTo.FieldValue.split(",");
        var checkvalidationEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailToArray.length > 0) {

            for (var item of emailToArray)
                if (checkvalidationEmail.test(item) == false) {
                    if (item != "") {
                        contextObj.notificationService.ShowToaster("Email Id (" + item + ") is not valid", 2);
                        return;
                    } else
                        contextObj.notificationService.ShowToaster("To Email is not valid", 2);
                    return;
                }

        }


        contextObj.workOrderService.sendReminderDatas(reviewSubmitOutput).subscribe(function (resultData) {


            if (resultData.Message == "Success")
                contextObj.notificationService.ShowToaster("Reminder Email has been sent", 2);
            else
                contextObj.notificationService.ShowToaster("Reminder email sent failed", 3);

            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = false;
        });
    }

    public updateDateTimeAdditionalDataFields(fieldDetailsArray: any[]) {
        var tempArray: IField[] = fieldDetailsArray.filter(function (item: IField) {
            return item.ReportFieldId > 1000000 && item.DataEntryControlId == 8;
        });

        for (var item of tempArray) {
            if (item.FieldValue && item.FieldValue != "") {
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
    ReportFieldId: number,
    Value: any
}
interface ReviewSubmitOutput {
    WFEntityInput: WorkFlowEntityInput;
    WFEntityDocumentInput: DocumentInput;
    //WFEntityEquipmentInput: EquipmentInput;
    ParentFormId: number;
}
interface WorkFlowEntityInput {
    FormId: number;
    WFEntityId: number;
    WFReportFieldIdValues: any;
}

interface DocumentInput {
    FormId: number;
    WFEntityId: number;
    ListDocumentReportFieldIdValues: DocumentDataInput[];
}

interface DocumentDataInput {
    DocumentId: number;
    WFReportFieldIdValues: any;
    FileDataInput: any;
}

interface IParentChildRelation {
    ChildRequestCurrentActionPoint: string;
    ChildRequestToComplete: string;
    ChildWorkOrderCurrentActionPoint: string;
    ChildWorkOrderToComplete: string;
    ParentRequestName: string;
}