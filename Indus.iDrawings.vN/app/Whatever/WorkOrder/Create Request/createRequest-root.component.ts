import { Component, OnInit, AfterViewInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { GeneralFunctions} from '../../../Models/Common/General';

import { ReviewServiceRequestComponent } from '../Review/reviewServiceRequests.component';
import { ReviewDocumentListComponent } from '../Review/reviewDocument-list.component';
import { SetRuleForChildRequest, SetRuleData } from '../review/set rule/setruleforchildrequest';

@Component({
    selector: 'create-Request',
    templateUrl: './app/Views/WorkOrder/Create Request/createRequest-root.component.html',
    directives: [SectionComponent, PageComponent, TabsComponent, TabComponent, ReviewDocumentListComponent, SetRuleForChildRequest, forwardRef(() => ReviewServiceRequestComponent)], /*forwardRef() :- to avoid circular reference while creating child request*/
    inputs: ['isChildRequest', 'parentEntityId','objectId'],
    providers: [NotificationService, WorkOrdereService, GeneralFunctions],
})

export class CreateServiceRequestComponent implements OnInit {
    pageTitle: string = "Review";
    pagePath: string = "Work Order / Create Request";
    selectedTab: number = 0;
    documentSource: any = [];
    linkArray: any = undefined;
    requestId: number = 0;
    workOrderId: number = 0;
    tabDeleteIndex: number = 0;
    objectId: number = 0;
    entityCategoryId: number = 1;
    createRequestEnabled: boolean = false;
    documentTabEnabled: boolean = false;
    ruleTabEnabled: boolean = false;
    workFlowEntityIds: any = "";
    action: string;
    btnName: string;
    fieldDetailsAdd1: IField[] = [];
    userDetails: UserDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "", UserPhoneNo: "" };
    serviceRequestInputItems: IGrid = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    submitOutput: ReviewSubmitOutput = {
        WFEntityInput: null,
        WFEntityDocumentInput: null,
        //WFEntityEquipmentInput: null,
        ParentFormId: 0
    };
    isChildRequest: boolean = false;
    parentEntityId: number = 0;
    addOnTabName: string = "Documents";
    addOnTabEnabled: boolean = false;
    ruleData: SetRuleData[];
    boolcheck: boolean = false;

    @Output() onChildRequestCreate = new EventEmitter();

    constructor(private notificationService: NotificationService, private workOrdereService: WorkOrdereService, private generalFunctions: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.action = "add";
        contextObj.btnName = "Save";
        contextObj.requestId = 0;
        contextObj.workOrderId = 0;
        contextObj.workFlowEntityIds = "";
        contextObj.workOrdereService.getValuesWithDbObjectDetails(50781, '').subscribe(function (resultData) {
            if (resultData["Data"] != "[]") {
                resultData = (JSON.parse(resultData["Data"]))[0];
                contextObj.userDetails.UserFirstName = resultData["FirstName"];
                contextObj.userDetails.UserMiddleName = resultData["MiddleName"];
                contextObj.userDetails.UserLastName = resultData["LastName"];
                contextObj.userDetails.UserId = resultData["UserId"];
                contextObj.userDetails.UserName = resultData["Name"];
                contextObj.userDetails.UserEmail = resultData["Email"];
                contextObj.userDetails.UserPhoneNo = resultData["Phone Number"];
            }
            contextObj.loadFields();
        });
    }

    ngAfterViewInit() {
        this.updateRequesterFieldDetails(this.fieldDetailsAdd1);
    }

    /***********************************************************************************************************
    * Function:     loadFields
    * Description:  Loads the fields for create
    *
    ************************************************************************************************************/

    public loadFields() {
        var contextObj = this;
        this.workOrdereService.loadReviewServiceRequest(0, "add", 0, 0, 1, 0).subscribe(function (resultData) {
            contextObj.boolcheck = !contextObj.boolcheck;
            contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetailsForAdd(resultData["Data"]["FieldBinderList"]);
            contextObj.updateLinkArray(null, 0);
            contextObj.createRequestEnabled = true;
        });
    }

    /***********************************************************************************************************
    * Function:     getSelectedTab
    * Description:  Fires when Tab is selected.
    * Comments:     Logic of tab closing while clicking each tab is done here
    *               Do Not Change Anything Without Discussing and Proper Testing
    *
    ************************************************************************************************************/

    public getSelectedTab(event: any) {
        switch (event[0]) {
            case 0:
                if (event[1] && this.addOnTabEnabled) {
                    this.closeTab(1);
                    this.documentTabEnabled = false;
                    this.ruleTabEnabled = false;
                }
                break;
        }
        this.selectedTab = event[0];
    }

    /***********************************************************************************************************
    * Function:     closeTab
    * Description:  Deletes the tab with given index.
    * Comments:     Changes the boolean values for other tabs to false
    *
    ************************************************************************************************************/

    public closeTab(index: number) {
        var contextObj = this
        contextObj.addOnTabEnabled = false;
        contextObj.documentTabEnabled = false;
        contextObj.ruleTabEnabled = false;
        setTimeout(function () {
            contextObj.tabDeleteIndex = index;
        }, 50);
        setTimeout(function () {
            contextObj.tabDeleteIndex = 0;
        }, 50);
    }

    /************************************************************************
     * Source Update Events
     * 
     *************************************************************************/

    public onDocumentSourceUpdated(event) {
        this.documentSource = event;
    }

    /***********************************************************************************************************
    * Function:     onRequesterPermissionUpdate
    * Description:  Gets the permissions for requester while changing WorkType in Review Page.
    * Comments:     Refer function getRequesterPermissionDetails() in reviewServiceRequest.component.ts
    *
    ************************************************************************************************************/

    public onRequesterPermissionUpdate(event) {
        var filteredForRequester = event.filter(function (item) { return (item.Id != 2 && item.Id != 13) })
        this.updateLinkArray(filteredForRequester, 0)
    }

    /***********************************************************************************************************
    * Function:     updateLinkArray
    * Description:  Pushes the items which have Permissions into linkArray. Items in linkArray are shown
    *               in the Review Page as Links
    * Comments:     Set Rule is Static Permission for Create Child Request. It is pushed manually
    *
    ************************************************************************************************************/

    public updateLinkArray(fieldDetailsArray, dataKeyId: number) {
        this.linkArray = undefined;
        if (fieldDetailsArray == null || fieldDetailsArray == undefined || fieldDetailsArray.length == 0) return;
        var temp = new Array<LinkDetails>();
        for (var item of fieldDetailsArray) {       /*Now only document is done.Do Equipment also */
            if (item["Has Permission"] == 1 && (item.Id == 14 || item.Id == 3) && item.EntityCategoryId == this.entityCategoryId) { /* remove this while doing the link tabs.*/
                temp.push({
                    Id: item.Id,
                    Name: item.Name,
                    DataKeyId: dataKeyId
                });
            }
        }
        if (this.isChildRequest) {
            temp.push({
                Id: 99999,
                Name: "Set Rule",
                DataKeyId: dataKeyId
            });
        }
        this.linkArray = temp;
    }

    /***********************************************************************************************************
    * Function:     onLinkClick
    * Description:  Fires when Permission Link is Clicked 
    * Comments:     Corresponding boolean variables are changed and new tab is shown
    *
    ************************************************************************************************************/

    public onLinkClick(linkDetails: LinkDetails) {
        var contextObj = this;
        contextObj.documentTabEnabled = false;
        contextObj.ruleTabEnabled = false;
        contextObj.addOnTabEnabled = true;
        contextObj.requestId = linkDetails.DataKeyId;

        switch (linkDetails.Id) {
            case 1:     //Manage Drawing
            case 15:    //View Drawing
                return;
            case 2:     //Manage Equipment
            case 13:    //View Equipment
                return;
            case 3:     //Manage Documents
            case 14:    //View Documents
                contextObj.documentTabEnabled = true;
                contextObj.addOnTabName = "Documents";
                break;
            case 11:    //Manage Cost
                break;
            case 99999:  /*Set Rule*/
                contextObj.ruleTabEnabled = true;
                contextObj.addOnTabName = "Set Rule";
                break;
            default:
                return;
        }
        contextObj.tabDeleteIndex = 0;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 50);
    }

    /***********************************************************************************************************
    * Function:     onTabClose
    * Description:  Fires when Tab Close button clicked.
    * Comments:     Logic of tab closing while Close button is done here
    *               Do Not Change Anything Without Discussing and Proper Testing
    *
    ************************************************************************************************************/

    public onTabClose(event) {
        var contextObj = this;
        contextObj.addOnTabEnabled = false;
        contextObj.documentTabEnabled = false;
        contextObj.ruleTabEnabled = false;
        contextObj.tabDeleteIndex = 0;
        setTimeout(function () {
            contextObj.selectedTab = 0;
        }, 50);
    }

    /***********************************************************************************************************
    * Function:     onSubmitClick
    * Description:  Submit click of Create Service Request.
    * Comments:     Custom Model is used for submition. Refer interface - IReviewSubmitData for better
    *               understanding.
    *               Document input is also passed along with it, since document is inserted against
    *               a request. Documented added before a request creation is stored
    *               locally in contextObj.submitOutput.WFEntityDocumentInput
    *
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/

    public onSubmitClick(event) {
        var contextObj = this;
        if (this.objectId != 0) {
            var reptIdValues: ReportFieldIdValues[] = JSON.parse(event.fieldObject);
            reptIdValues.push({ ReportFieldId: 656, Value: this.objectId })
            event.fieldObject = JSON.stringify(reptIdValues);
        }
        var entityInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: 0, WFReportFieldIdValues: contextObj.isChildRequest ? contextObj.updateSubmitDataForChildRequests(JSON.parse(event.fieldObject)) : JSON.parse(event.fieldObject) }
        contextObj.submitOutput.WFEntityInput = entityInput;
        contextObj.submitOutput.ParentFormId = 226;
        contextObj.submitOutput.WFEntityDocumentInput = (contextObj.submitOutput.WFEntityDocumentInput == null) ? null : contextObj.submitOutput.WFEntityDocumentInput;
        var jsonOut = JSON.stringify(contextObj.submitOutput);
        debugger;
        contextObj.workOrdereService.submitAddUpdateServiceRequest(jsonOut, 0, 1).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                contextObj.loadFields();
                if (contextObj.documentTabEnabled) {
                    contextObj.tabDeleteIndex = 1;
                    setTimeout(function () {
                        contextObj.documentTabEnabled = false;
                    }, 50);
                }
                contextObj.documentSource = [];

                var retUpdatedSrc = [];
                var requestNumber = "";
                var temp = (resultData["Data"]["Data"]).split("****")[0];
                try {
                    retUpdatedSrc = JSON.parse(temp);
                }
                catch (err) {
                    requestNumber = temp.replace("[", "")
                    requestNumber = requestNumber.replace("]", "");
                }
                if (retUpdatedSrc == undefined || retUpdatedSrc.length == 0) {
                    contextObj.notificationService.ShowToaster("New Request '" + requestNumber + "' created", 3);
                } else {
                    contextObj.notificationService.ShowToaster("New Request '" + retUpdatedSrc[0]["Request Number"] + "' created", 3);
                }
                contextObj.linkArray = undefined;
                contextObj.submitOutput = {
                    WFEntityInput: null,
                    WFEntityDocumentInput: null,
                    //WFEntityEquipmentInput: null,
                    ParentFormId: 0
                };

                if (!contextObj.isChildRequest) {
                    //contextObj.updateFieldDetailsForAdd(contextObj.fieldDetailsAdd1);
                    contextObj.loadFields();
                    contextObj.createRequestEnabled = false;
                    setTimeout(function () {
                        contextObj.createRequestEnabled = true;
                    }, 300);
                } else {
                    contextObj.onChildRequestCreate.emit(retUpdatedSrc);
                }

            } else if (resultData["Data"]["StatusId"] == 3) {
                contextObj.notificationService.ShowToaster("No matching Space exists for the specified field values", 5);
            } else {
                //contextObj.updateFieldDetailsForAdd(contextObj.fieldDetailsAdd1);
                contextObj.loadFields();
                contextObj.linkArray = undefined;
                contextObj.submitOutput = {
                    WFEntityInput: null,
                    WFEntityDocumentInput: null,
                    //WFEntityEquipmentInput: null,
                    ParentFormId: 0
                };
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });

    }

    /***********************************************************************************************************
    * Function:     onDocumentSubmitClick
    * Description:  Document Submit click of Create Service Requests.
    * Comments:     Custom Model is used for submition. Refer interface - DocumentInput for better
    *               understanding. Value is stored locally.
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    public onDocumentSubmitClick(event) {
        var contextObj = this;
        var documentInput: DocumentInput = { FormId: 0, WFEntityId: 0, ListDocumentReportFieldIdValues: [] };
        var documentdata: DocumentDataInput = { DocumentId: 0, FileDataInput: '', WFReportFieldIdValues: [] };
        documentdata.DocumentId = event.Id;
        documentdata.FileDataInput = event.fileData;
        documentdata.WFReportFieldIdValues = event.fieldObject;
        contextObj.documentSource = event.itemSource;
        contextObj.notificationService.ShowToaster("Selected Document uploaded", 3)
        if (contextObj.submitOutput.WFEntityDocumentInput == null) {
            documentInput.FormId = 240;
            documentInput.WFEntityId = 0;
            documentInput.ListDocumentReportFieldIdValues.push(documentdata);
            contextObj.submitOutput.WFEntityDocumentInput = documentInput;
        } else {
            contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.push(documentdata);
        }

    }

    /***********************************************************************************************************
    * Function:     onDocumentDelete
    * Description:  Document Delete click of Review Service Requests.
    * Comments:     Selected document is deleted from Local storage (submitOutput.WFEntityDocumentInput).
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/
    public onDocumentDelete(event) {
        var contextObj = this;

        if (contextObj.submitOutput.WFEntityDocumentInput != null) {
            var itemToDelete = contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.find(function (item) {
                return item.DocumentId === event.itemToBeDeleted["AttachmentId"];
            });

            var index = contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.indexOf(itemToDelete);

            if (index > -1) {
                contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.splice(index, 1);
                contextObj.notificationService.ShowToaster("Selected Document deleted", 3);
            }
            if (contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.length == 0) {
                contextObj.documentSource = [];
            }
        }
    }

    /***********************************************************************************************************
    * Function:     onRuleUpdate
    * Description:  Sets Rule for final submit.
    *
    ************************************************************************************************************/

    public onRuleUpdate(event) {
        var contextObj = this;
        this.ruleData = event.SetRuleData;
        console.log(contextObj.ruleData);

        contextObj.closeTab(1);
        contextObj.selectedTab = 0;


    }

    /***********************************************************************************************************
    * Function:     updateSubmitDataForChildRequests
    * Description:  Updates the field details for child request submit
    *
    ************************************************************************************************************/

    public updateSubmitDataForChildRequests(submitData: ReportFieldIdValues[]) {
        debugger;
        var parentEntityItem = submitData.find(function (item) { return item.ReportFieldId === 5859 });
        parentEntityItem.Value = this.parentEntityId;
        submitData.push(
            {
                ReportFieldId: 7490,    /*WorkflowEntityRelationshipTypeId*/
                Value: this.ruleData ? this.ruleData[0].RadioButton : 1
            },
            {
                ReportFieldId: 7492,    /*HasRejectedSettings*/
                Value: this.ruleData ? (this.ruleData[0].Checkbox ? 1 : 0) : 0
            },
            {
                ReportFieldId: 7493,    /*StatusId*/
                Value: 16
            },
            {
                ReportFieldId: 7494,    /*WorkflowEntityRelationshipId*/
                Value: 0
            }
        )
        if (this.ruleData && this.ruleData[0].ActionPoint) {
            for (var item of this.ruleData[0].ActionPoint) {
                submitData.push({ ReportFieldId: 7495, Value: item });
            }
        }
        return submitData;
    }

    public updateFieldDetailsForAdd(fieldDetailsArray: IField[]) {

        var contextObj = this;
        for (var item of fieldDetailsArray) {
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
                //case 5873:  //WorkType
                //    item.IsVisible = true;
                //    item.IsMandatory = true;
                //    item.FieldValue = "-1";
                //    if (item.LookupDetails == null || item.LookupDetails.LookupValues == null || item.LookupDetails.LookupValues.length == 0) contextObj.notificationService.ShowToaster("No Work Types exist", 2);
                //    break;
                case 1471:  //Description
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = "";
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
                    item.FieldValue = "-1";
                    break;
                case 539:  //Floor
                    item.IsVisible = true;
                    item.FieldValue = "-1";
                    break;
                case 1372: //Requester
                    item.IsVisible = true;
                    item.IsMandatory = true;
                    item.FieldValue = "14";
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
                case 7807: /*Requester Phone*/
                    item.IsVisible = true;
                    item.IsEnabled = false;
                    item.FieldValue = contextObj.userDetails.UserPhoneNo;
                    break;
            }
        };

        return fieldDetailsArray;
    }

    public updateRequesterFieldDetails(fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item: IField) {

            switch (item.ReportFieldId) {
                case 1369:   //Requester (First Name)
                    item.FieldValue = contextObj.userDetails.UserFirstName;
                    break;
                case 1370:  //Requester (Middle Name)
                    item.FieldValue = contextObj.userDetails.UserMiddleName;
                    break;
                case 1371:  //Requester (Last Name)
                    item.FieldValue = contextObj.userDetails.UserLastName;
                    break;
                case 1374:  //Requester Email
                    item.FieldValue = contextObj.userDetails.UserEmail;
                    break;
                case 7807: /*Requester Phone*/
                    item.FieldValue = contextObj.userDetails.UserPhoneNo;
                    break;
            }
        });

        return fieldDetailsArray;
    }

    getFormattedDate(value: string) {
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

}

interface LinkDetails {
    Id: number;
    Name: string;
    DataKeyId: number;
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

interface EquipmentInput {
    FormId: number;
    ListAssetReportFieldIdValues: any;
}

interface UserDetails {
    UserId: number;
    UserName: string;
    UserEmail: string;
    UserFirstName: string;
    UserMiddleName: string;
    UserLastName: string;
    UserPhoneNo: string;
}

interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}
