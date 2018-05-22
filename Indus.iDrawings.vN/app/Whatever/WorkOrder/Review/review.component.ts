/// <reference path="review history/reviewhistory.ts" />
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/common';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {IField} from  '../../../Framework/Models/Interface/IField';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { ServiceReviewListComponent } from './serviceReview-list.component';
import { ReviewServiceRequestComponent } from './reviewServiceRequests.component';
import { ReviewDocumentListComponent } from './reviewDocument-list.component';
import { ReviewEquipmentListComponent } from './reviewEquipment-list.component';
import { ReviewCostComponent } from './Review Cost/review-Cost.component';
import { ListReviewPMWorkOrderComponent } from './reviewPmWorkorder-list.component';
import { ReviewPMWorkorderComponent } from './reviewPMWorkorder.component'
import { ReviewTeamMemberComponent } from './review team members/reviewteam-members.component';
import { ReviewHistory } from './review history/reviewhistory';
import { ChargebackListComponent } from './Manage Chargeback/chargeback-list';
import {AttachmentsComponent} from '../../Common/Attachments/attachments.component';


@Component({
    selector: 'review-workorder',
    templateUrl: './app/Views/WorkOrder/Review/review.component.html',
    directives: [PageComponent, TabsComponent, TabComponent, ServiceReviewListComponent, ReviewServiceRequestComponent,
        ReviewDocumentListComponent, ListReviewPMWorkOrderComponent, ReviewPMWorkorderComponent, ReviewCostComponent,
        ReviewEquipmentListComponent, ReviewTeamMemberComponent, ReviewHistory, ChargebackListComponent, AttachmentsComponent],
    providers: [NotificationService, WorkOrdereService, GeneralFunctions, ValidateService],
    encapsulation: ViewEncapsulation.None
})

export class ReviewWorkOrderComponent implements OnInit {
    pageTitle: string = "Review";
    pagePath: string = "Work Order";
    createReviewTabName: string = "Create Request";
    addOnTabName: string = "Documents";
    selectedTab: number = 0;
    serviceRequestListSource: any[] = [];
    pmListSource: any[] = [];
    documentSource: any[] = [];
    equipmentListSource: any[] = [];
    outComeData: any[] = [];
    linkArray: any = undefined;
    requestId: number = 0;
    workOrderId: number = 0;
    tabDeleteIndex: number = 0;
    reviewListItemsPerPage: number = 0;
    pmListItemsPerPage: number = 0;
    equipmentListItemsPerPage: number = 0;
    reviewListTotalItems: number = 0;
    pmListTotalItems: number = 0;
    equipmentListTotalItems: number = 0;
    entityCategoryId: number = 0;
    reviewTabEnabled: boolean = false;
    pmWorkOrderReviewEnabled: boolean = false;
    createRequestEnabled: boolean = false;
    documentTabEnabled: boolean = false;
    costTabEnabled: boolean = false;
    invoiceTabEnabled: boolean = false;
    equipmentTabEnabled: boolean = false;
    addOnTabEnabled: boolean = false;
    teamMemberTabEnabled: boolean = false;
    historyTabEnabled: boolean = false;
    chargebackTabEnabled: boolean = false;
    isInProgressSubscribed: boolean = false;
    isTimeSpentSubscribed: boolean = false;
    currentWorkFlowActionPointId: number = 0;
    workFlowEntityIds: any[] = [];
    statusId: number = 0;
    action: string;
    btnName: string;
    fieldDetailsAdd1: IField[];
    documentEnableMenu: number[] = [];
    requestNumber: string = "";
    siteId: number = 0;
    userDetails: UserDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "", UserPhoneNo: "" };
    serviceRequestInputItems: IGrid = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "[Requested Date]", sortDir: "DESC", allowAdd: false, allowEdit: false };
    pmListInputItems: IGrid = { dataKey: "WorkOrderId", groupBy: [], grpWithCheckBx: false, sortCol: "[Scheduled Date]", sortDir: "DESC", allowAdd: false, allowEdit: false };
    equipmentListInputtems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalCostItems: TotalCostItems = { TechnicianTotalCost: 0.00, PartsTotalCost: 0.00, ToolsTotalCost: 0.00, OtherTotalCost: 0.00 };
    submitOutput: ReviewSubmitOutput = {
        WFEntityInput: null,
        WFEntityDocumentInput: null,
        //WFEntityEquipmentInput: null,
        ParentFormId: 0
    };
    isMultiple: boolean = false;
    reloadData: boolean = false;
    refreshgrid;
    constructor(private notificationService: NotificationService, private workOrdereService: WorkOrdereService, private generalFunctions: GeneralFunctions, private _validateService: ValidateService) { }

    ngOnInit() {
        var contextObj = this;
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
        });

        contextObj.workOrdereService.checkSubscribedFeature('231,198').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0) return;
            for (var item of result["Data"]) {
                if (item.Id == 198)
                    contextObj.isTimeSpentSubscribed = item["IsSubscribed"];
                else if (item.Id == 231)
                    contextObj.isInProgressSubscribed = item["IsSubscribed"];
            }
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
                if (event[1]) {
                    if (this.addOnTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                        this.closeTab(2);
                    } else if (this.addOnTabEnabled || this.reviewTabEnabled) {
                        this.closeTab(2);
                    }
                }
                this.pagePath = "Work Order / Current Tasks / Service Requests";
                break;
            case 1:
                if (event[1]) {
                    if (this.addOnTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                        this.closeTab(2);
                    } else if (this.addOnTabEnabled || this.reviewTabEnabled) {
                        this.closeTab(2);
                    }
                }
                this.pagePath = "Work Order / Current Tasks / PM Work Orders";
                break;
            case 2:
                if (event[1]) {
                    if (this.addOnTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                    }
                } else {
                    var contextObj = this;
                    setTimeout(function () {
                        if (contextObj.entityCategoryId == 3) {
                            contextObj.pmWorkOrderReviewEnabled = true;
                        } else {
                            contextObj.createRequestEnabled = true;
                        }
                    }, 500);
                }
                break;
        }

        this.selectedTab = event[0];
    }

    /***********************************************************************************************************
    * Function:     onTabClose
    * Description:  Fires when Tab Close button clicked.
    * Comments:     Logic of tab closing while Close button is done here
    *               Do Not Change Anything Without Discussing and Proper Testing
    *
    ************************************************************************************************************/

    public onTabClose(event) {

        switch (event[0]) {
            case 0:
                this.reviewTabEnabled = false;
                break;
            case 1:
                if (this.addOnTabEnabled && this.reviewTabEnabled) {
                    this.reviewTabEnabled = this.createRequestEnabled = this.pmWorkOrderReviewEnabled = false;
                    this.selectedTab = 2;
                } else if (!this.addOnTabEnabled && this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    if (this.pmWorkOrderReviewEnabled) {
                        this.selectedTab = 1;
                    } else if (this.createRequestEnabled) {
                        this.selectedTab = 0;
                    }
                    this.createRequestEnabled = this.pmWorkOrderReviewEnabled = false;
                } else if (this.addOnTabEnabled && !this.reviewTabEnabled) {
                    this.addOnTabEnabled = this.equipmentTabEnabled = this.documentTabEnabled = this.costTabEnabled = this.teamMemberTabEnabled = this.historyTabEnabled = this.chargebackTabEnabled = false;
                    this.selectedTab = 0;
                }
                break;
            case 2:
                this.addOnTabEnabled = this.equipmentTabEnabled = this.documentTabEnabled = this.costTabEnabled = this.teamMemberTabEnabled = this.historyTabEnabled = this.chargebackTabEnabled = false;
                this.selectedTab = 2;
                break;
            case 3:
                if (this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    if (this.pmWorkOrderReviewEnabled) {
                        this.selectedTab = 1;
                    } else if (this.createRequestEnabled) {
                        this.selectedTab = 0;
                    }
                    this.createRequestEnabled = this.pmWorkOrderReviewEnabled = this.addOnTabEnabled = this.equipmentTabEnabled = this.documentTabEnabled = this.costTabEnabled = this.teamMemberTabEnabled = this.historyTabEnabled = this.chargebackTabEnabled = false;
                    this.closeTab(3);
                }
                break;
            default:
                break;
        }
    }

    /***********************************************************************************************************
    * Function:     closeTab
    * Description:  Deletes the tab with given index.
    * Comments:     Changes the boolean values for other tabs to false
    *
    ************************************************************************************************************/

    public closeTab(index: number) {
        var contextObj = this
        switch (index) {
            case 2:
                contextObj.reviewTabEnabled = contextObj.createRequestEnabled = contextObj.pmWorkOrderReviewEnabled = false;
                break;
            case 3:
                contextObj.addOnTabEnabled = contextObj.equipmentTabEnabled = contextObj.documentTabEnabled = contextObj.costTabEnabled = contextObj.teamMemberTabEnabled = contextObj.historyTabEnabled = contextObj.invoiceTabEnabled = contextObj.chargebackTabEnabled =false;
                break;
        }
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

    public onServiceListSourceUpdated(event) {
        this.serviceRequestListSource = event.itemSource;
        this.reviewListItemsPerPage = event.rowsPerPage;
        this.reviewListTotalItems = event.totalItems;
    }

    public onPMListSourceUpdated(event) {
        this.pmListSource = event.itemSource;
        this.pmListItemsPerPage = event.rowsPerPage;
        this.pmListTotalItems = event.totalItems;
    }

    public onDocumentSourceUpdated(event) {
        this.documentSource = event;
    }

    public onEquipmentListSourceUpdated(event) {
        this.equipmentListSource = event.itemSource;
        this.equipmentListItemsPerPage = event.rowsPerPage;
        this.equipmentListTotalItems = event.totalItems;
    }

    /***********************************************************************************************************
    * Function:     onServiceRequestAddEditClicked
    * Description:  Triggers when Review button is clicked from Service Requests.
    * Comments:     Refer function reviewClick() in serviceReview-List.component.ts
    *
    ************************************************************************************************************/

    public onServiceRequestAddEditClicked(event) {
        var contextObj = this;
        contextObj.createRequestEnabled = contextObj.pmWorkOrderReviewEnabled = contextObj.reviewTabEnabled = false;
        contextObj.linkArray = undefined;
        contextObj.fieldDetailsAdd1 = event.fieldobject;
        contextObj.action = event.action;
        contextObj.btnName = event.buttonName;
        contextObj.serviceRequestInputItems = event.input;
        contextObj.outComeData = event.outComes;
        if (contextObj.action == "review") {
            contextObj.createReviewTabName = "Review Request";
            contextObj.currentWorkFlowActionPointId = contextObj.serviceRequestInputItems.rowData["CurrentWorkFlowActionPointId"];
            contextObj.workFlowEntityIds = [contextObj.serviceRequestInputItems.rowData.WorkFlowEntityId];
            contextObj.requestId = contextObj.serviceRequestInputItems.rowData.WorkRequestId;
            contextObj.workOrderId = contextObj.serviceRequestInputItems.rowData.WorkOrderId == null ? 0 : contextObj.serviceRequestInputItems.rowData.WorkOrderId;
            contextObj.serviceRequestInputItems.dataKey = (contextObj.workOrderId == 0 || contextObj.workOrderId == null) ? "WorkRequestId" : "WorkOrderId";
            contextObj.entityCategoryId = contextObj.serviceRequestInputItems.rowData.WorkflowEntityCategoryId;
            contextObj.statusId = contextObj.serviceRequestInputItems.rowData["StatusId"];
            contextObj.requestNumber = contextObj.serviceRequestInputItems.rowData["Request Number"];
            contextObj.pagePath = "Work Order / Current Tasks / Service Requests / Review"
            contextObj.documentSource = [];
            contextObj.getPermissionDetails(contextObj.currentWorkFlowActionPointId, contextObj.serviceRequestInputItems.rowData[contextObj.serviceRequestInputItems.dataKey]);
            //contextObj.getEditableFields();
            //if (contextObj.isTimeSpentSubscribed) contextObj.getAutoPopulatedTimeSpentValue();
            //contextObj.getReviewCostDetails();
        } else {
            contextObj.createReviewTabName = "Create Request";
            contextObj.requestId = 0;
            contextObj.workOrderId = 0;
            contextObj.entityCategoryId = 1;
            contextObj.workFlowEntityIds = [];
            contextObj.statusId = 0;
            contextObj.serviceRequestInputItems.dataKey = "WorkRequestId";
            contextObj.pagePath = "Work Order / Current Tasks / Service Requests / Create Request";
            contextObj.documentSource = [];
            setTimeout(function () {
                contextObj.selectedTab = 2;
            }, 500);
            this.reviewTabEnabled = true;
        }

        //setTimeout(function () {
        //    contextObj.selectedTab = 2;
        //}, 500);
        //this.reviewTabEnabled = true;
    }

    public changeServiceRequestField( )
    {
        
    }
    /***********************************************************************************************************
    * Function:     onPMReviewClick
    * Description:  Triggers when Review button is clicked from PM Workorder.
    * Comments:     Refer function reviewClick() in reviewPmWorkorder-List.component.ts
    *
    ************************************************************************************************************/

    public onPMReviewClick(event) {
        var contextObj = this;
        contextObj.linkArray = undefined;
        contextObj.createRequestEnabled = contextObj.pmWorkOrderReviewEnabled = contextObj.reviewTabEnabled = false;
        contextObj.currentWorkFlowActionPointId = contextObj.pmListInputItems.rowData["CurrentWorkFlowActionPointId"];
        contextObj.fieldDetailsAdd1 = event.fieldobject;
        contextObj.action = event.action;
        contextObj.btnName = event.buttonName;
        contextObj.pmListInputItems = event.input;
        contextObj.outComeData = event.outComes;
        contextObj.createReviewTabName = "Review Work Order";
        contextObj.pagePath = "Work Order / Current Tasks / PM Work Orders / Review";
        contextObj.statusId = contextObj.pmListInputItems.rowData["StatusId"];
        contextObj.workFlowEntityIds = [contextObj.pmListInputItems.rowData.WorkFlowEntityId];
        contextObj.workOrderId = contextObj.pmListInputItems.rowData.WorkOrderId;
        contextObj.requestNumber = contextObj.pmListInputItems.rowData["Work Order No."];
        contextObj.entityCategoryId = 3;
        contextObj.getPermissionDetails(contextObj.currentWorkFlowActionPointId, contextObj.pmListInputItems.rowData[contextObj.pmListInputItems.dataKey]);
        //contextObj.getEditableFields();
        //contextObj.getReviewCostDetails();
        //if (contextObj.isTimeSpentSubscribed) contextObj.getAutoPopulatedTimeSpentValue();

        //setTimeout(function () {
        //    contextObj.selectedTab = 2;
        //}, 300);
        //this.reviewTabEnabled = true;
    }

    /***********************************************************************************************************
    * Function:     getPermissionDetails
    * Description:  Gets the permissions for the Current Action Point (Manage Documents, etc..).
    *
    ************************************************************************************************************/

    public getPermissionDetails(workFlowActionPointId: number, dataKeyId: number) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push(
            {
                ReportFieldId: 5825,
                Value: workFlowActionPointId
            }
        );
        contextObj.workOrdereService.getValuesWithDbObjectDetails(50694, JSON.stringify(tempArray)).subscribe(function (permission) {
            contextObj.updateLinkArray(JSON.parse(permission["Data"]), contextObj.action == "review" ? dataKeyId : 0);
            contextObj.getEditableFields();
        });
    }

    /***********************************************************************************************************
    * Function:     onRequesterPermissionUpdate
    * Description:  Gets the permissions for requester while changing WorkType in Review Page.
    * Comments:     Refer function getRequesterPermissionDetails() in reviewServiceRequest.component.ts
    *
    ************************************************************************************************************/

    public onRequesterPermissionUpdate(event: any[]) {
        var filteredForRequester = event.filter(function (item) { return (item.Id != 2 && item.Id != 13) })
        this.updateLinkArray(filteredForRequester, 0)
    }

    /***********************************************************************************************************
    * Function:     updateLinkArray
    * Description:  Pushes the items which have Permissions into linkArray. Items in linkArray are shown
    *               in the Review Page as Links
    * Comments:     Team Members and History are Static Permissions, hence they are pushed manually (only if
    *               action is Review)
    *
    ************************************************************************************************************/

    public updateLinkArray(fieldDetailsArray, dataKeyId: number) {
        this.linkArray = undefined;
        if (fieldDetailsArray == null || fieldDetailsArray == undefined || fieldDetailsArray.length == 0) return;
        var temp = new Array<LinkDetails>();        /*Documents, Equipment and Cost are done now. Update here while doing others. Also refer onLinkClick()*/
        for (var item of fieldDetailsArray) {
            if (item["Has Permission"] == 1 && (item.Id == 14 || item.Id == 3 || item.Id == 2 || item.Id == 13 || item.Id == 11 || item.Id == 12  ) && item.EntityCategoryId == (this.entityCategoryId == 2 ? 1 : this.entityCategoryId)) { /* remove this while doing the link tabs */
                temp.push({
                    Id: item.Id,
                    Name: item.Name,
                    DataKeyId: dataKeyId
                });
            }
            else if (item["Has Permission"] == 1 && (item.Id == 16) && item.EntityCategoryId == this.entityCategoryId) { /* remove this while doing the link tabs */
                if ((item.EntityCategoryId == 2 && this.serviceRequestInputItems.rowData["StatusId"] == 11) || (item.EntityCategoryId == 3 && this.pmListInputItems.rowData["StatusId"] == 11)) {
                    temp.push({
                        Id: item.Id,
                        Name: item.Name,
                        DataKeyId: dataKeyId
                    });
                }
            }
        }
        if (this.action == "review") {
            temp.push(
                {
                    Id: 999,
                    Name: "Team Members",
                    DataKeyId: dataKeyId
                },
                {
                    Id: 9999,
                    Name: "History",
                    DataKeyId: dataKeyId
                }
            );
        }
        this.linkArray = temp;
    }

    /***********************************************************************************************************
    * Function:     onLinkClick
    * Description:  Fires when Permission Link is Clicked in Review or Create Page
    * Comments:     Corresponding boolean variables are changed and new tab is shown
    *
    ************************************************************************************************************/

    public onLinkClick(linkDetails: LinkDetails) {
        var contextObj = this;
        contextObj.addOnTabEnabled = contextObj.documentTabEnabled = contextObj.costTabEnabled = contextObj.equipmentTabEnabled = contextObj.chargebackTabEnabled = this.invoiceTabEnabled = false;
        contextObj.addOnTabEnabled = true;
        switch (linkDetails.Id) {   /*Documents, Equipment and Cost are done now. Update here while doing others*/
            case 1:     /*Manage Drawing */
            case 15:    /*View Drawing */
                return;
            case 2:     /*Manage Equipment */
            case 13:    /*View Equipment */
                contextObj.equipmentListSource = [];
                contextObj.equipmentListItemsPerPage = contextObj.equipmentListTotalItems = 0;
                contextObj.equipmentTabEnabled = true;
                contextObj.siteId = contextObj.serviceRequestInputItems.rowData["SiteId"];
                contextObj.addOnTabName = "Equipment";
                break;
            case 3:     /*Manage Documents */
            case 14:    /*View Documents */
                contextObj.documentTabEnabled = true;
                contextObj.addOnTabName = "Documents";
                break;
            case 11:    /*Manage Cost */
                contextObj.getWorkFlowEntityIds();
                contextObj.costTabEnabled = true;
                contextObj.addOnTabName = "Manage Cost";
                break;
            case 12:
                contextObj.addOnTabName = "Manage Invoices";
                contextObj.invoiceTabEnabled = true;
                break;
            case 16:    /*Manage Chargeback */
                contextObj.chargebackTabEnabled = true;
                contextObj.addOnTabName = "Manage Chargeback";
                break;
            case 999:   /*Team Members*/
                contextObj.getWorkFlowEntityIds();
                contextObj.teamMemberTabEnabled = true;
                contextObj.addOnTabName = "Team Members";
                break;
            case 9999:
                contextObj.getWorkFlowEntityIds();
                contextObj.historyTabEnabled = true;
                contextObj.addOnTabName = "History";
                break;
            default:
                return;
        }
        contextObj.tabDeleteIndex = 0;
        setTimeout(function () {
            contextObj.selectedTab = 3;
        }, 50);
    }

    /***********************************************************************************************************
    * Function:     getWorkFlowEntityIds
    * Description:  Gets an Array of Selected WorkflowEntityIds, even if selection is single or multiple.
    * Retun:        An array of Selected WorkflowEntityIds
    *
    ************************************************************************************************************/

    public getWorkFlowEntityIds() {
        var inputItems: IGrid = this.entityCategoryId == 3 ? this.pmListInputItems : this.serviceRequestInputItems;
        if (inputItems.selectedIds.length == 1) {
            this.workFlowEntityIds = [inputItems.rowData["WorkFlowEntityId"]];
        } else {
            for (var item of inputItems.rowData) {
                this.workFlowEntityIds.push(item["WorkFlowEntityId"]);
            }
        }
    }

    /***********************************************************************************************************
    * Function:     getEditableFields
    * Description:  Gets the fields which are editable for the current Action Point
    * Comments:     Fields which are editable and other fields are removed from fieldDetailsAdd1 except
    *               Priority and Expected Date of Completion since conflict in HTML Side.
    *
    ************************************************************************************************************/

    public getEditableFields() {

        var check 
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push(
            {
                ReportFieldId: 5827,
                Value: contextObj.entityCategoryId == 3 ? contextObj.pmListInputItems.rowData["CurrentWorkFlowActionPointId"] : contextObj.serviceRequestInputItems.rowData["CurrentWorkFlowActionPointId"]
            }
        );
        contextObj.workOrdereService.getValuesWithDbObjectDetails(50699, JSON.stringify(tempArray)).subscribe(function (resultData) {

            var editableFields: any[] = JSON.parse(resultData["Data"]);
            var reportFields: any[] = [];

            for (var item of contextObj.fieldDetailsAdd1) {
                var editableObject = editableFields.find(function (fieldItem) {
                    if ((fieldItem.ReportFieldId == item.ReportFieldId) && ((contextObj.entityCategoryId != 3 ? 1 : 3 ) == fieldItem.EntityCategoryId)) {
                        check = true;
                        return true
                    }
                    else {
                        check = false
                        return false;
                    }
                    //return (fieldItem.ReportFieldId === item.ReportFieldId) && contextObj.entityCategoryId === fieldIte
                });
                if (check) {  /*EntityCategoryId will be '1' here for both SR and NPM WO*/
                    item.IsVisible = editableObject.Visible;
                    item.ReadOnlyMode = !editableObject.Editable;
                    item.IsEnabled = editableObject.Editable;
                    if (item.IsVisible) reportFields.push(item.ReportFieldId);  /*Pushes the fields which are not editable to a temp array for removing*/
                }
            }

            for (var index = 0; index < contextObj.fieldDetailsAdd1.length; index++) {
                if ((reportFields.indexOf(contextObj.fieldDetailsAdd1[index].ReportFieldId) == -1) && contextObj.fieldDetailsAdd1[index].ReportFieldId > 1000000) {
                    contextObj.fieldDetailsAdd1.splice(index, 1);       /*Removes the additional data fields which are not editable*/
                    index -= 1;
                }
            }
            contextObj.getReviewCostDetails();
        });
    }

    /***********************************************************************************************************
    * Function:     getAutoPopulatedTimeSpentValue
    * Description:  Gets and Sets the value for Time Spent if it is Subscribed
    *
    ************************************************************************************************************/

    public getAutoPopulatedTimeSpentValue() {
        var contextObj = this;
        contextObj.workOrdereService.getAutoPopulatedTimeSpentValue(contextObj.workFlowEntityIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var timeSpentField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 7521; });
                timeSpentField.FieldValue = resultData["Data"];
            }
        });
    }

    /***********************************************************************************************************
    * Function:     getReviewCostDetails
    * Description:  Gets cost details for the selected entity
    *
    ************************************************************************************************************/

    public getReviewCostDetails() {
        var contextObj = this;
        contextObj.workOrdereService.getReviewCostDetails(contextObj.workFlowEntityIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var costData = JSON.parse(resultData["Data"]["FieldBinderData"])[0];
                contextObj.totalCostItems.TechnicianTotalCost = costData["Technician Cost"] ? costData["Technician Cost"] : 0.00;
                contextObj.totalCostItems.PartsTotalCost = costData["Spare Cost"] ? costData["Spare Cost"] : 0.00;
                contextObj.totalCostItems.ToolsTotalCost = costData["Tools Cost"] ? costData["Tools Cost"] : 0.00;
                contextObj.totalCostItems.OtherTotalCost = costData["Other Cost"] ? costData["Other Cost"] : 0.00;
            }
            if (contextObj.isTimeSpentSubscribed) contextObj.getAutoPopulatedTimeSpentValue();
            setTimeout(function () {
                contextObj.selectedTab = 2;
            }, 500);
            contextObj.reviewTabEnabled = true;
        });
    }

    /***********************************************************************************************************
    * Function:     onSubmitClick
    * Description:  Submit click of SR, NPM and PM WO.
    * Comments:     Custom Model is used for submition. Refer interface - IReviewSubmitData for better
    *               understanding.
    *               If Submit is from Create page, Document input is also passed along with it, since document
    *               is inserted against a request. Documented added before a request creation is stored
    *               locally in contextObj.submitOutput.WFEntityDocumentInput
    *
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/

    public onSubmitClick(event: IReviewSubmitData) {
        var contextObj = this;
        var entityId = 0;
        if (event.isPm) {
            entityId = contextObj.workOrderId;
        } else {
            entityId = contextObj.workOrderId == 0 ? contextObj.requestId : contextObj.workOrderId;
        }

        var entityInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: entityId, WFReportFieldIdValues: JSON.parse(event.fieldObject) };
        contextObj.submitOutput.WFEntityInput = entityInput;
        contextObj.submitOutput.ParentFormId = 226;
        if (contextObj.action == "review") {
            contextObj.submitOutput.WFEntityDocumentInput = null;
        } else {
            contextObj.submitOutput.WFEntityDocumentInput = (contextObj.submitOutput.WFEntityDocumentInput == null) ? null : contextObj.submitOutput.WFEntityDocumentInput;
        }
        var jsonOut = JSON.stringify(contextObj.submitOutput);

        contextObj.workOrdereService.submitAddUpdateServiceRequest(jsonOut, contextObj.workOrderId == 0 ? contextObj.requestId : contextObj.workOrderId, contextObj.action == "add" ? 1 : 2).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"]["Data"] != "[]") {
                        var retUpdatedSrc = [];
                        var requestNumber = "";
                        var temp = (resultData["Data"]["Data"]).split("****")[0];
                        try {                     /* try - catch is done to get Request Number From Retun Value. If the requester is not in the next action point the return will be like [Request Number]*/
                            retUpdatedSrc = JSON.parse(temp);    /*If has next action point access return will be a proper json hence parsing will be success*/
                        }
                        catch (err) {
                            requestNumber = temp.replace("[", "")   /*If parsing fails return is Request Number only. Brackets [] are removed*/
                            requestNumber = requestNumber.replace("]", "");
                        }
                        contextObj.updateListSource(retUpdatedSrc, requestNumber, entityId);
                    } else if (resultData["Data"]["Data"] == "[]") {

                        if (contextObj.entityCategoryId != 3) {
                            contextObj.serviceRequestListSource = contextObj.serviceRequestListSource.filter(function (item) {
                                return item[contextObj.serviceRequestInputItems.dataKey] != entityId;
                            });
                            contextObj.reviewListTotalItems = contextObj.reviewListTotalItems - 1;
                            contextObj.notificationService.ShowToaster("Request details updated", 3);
                        } else {
                            contextObj.pmListSource = contextObj.pmListSource.filter(function (item) {
                                return item[contextObj.pmListInputItems.dataKey] != entityId;
                            });
                            contextObj.pmListTotalItems = contextObj.pmListTotalItems - 1;
                            contextObj.notificationService.ShowToaster("Work Order details updated", 3);
                        }

                    }
                    contextObj.reloadData = false;

                    break;
                case 3:
                    contextObj.notificationService.ShowToaster("No matching Space exists for the specified field values", 5);
                    return;
                default:
                    break;
            }

            contextObj.submitOutput = {
                WFEntityInput: null,
                WFEntityDocumentInput: null,
                //WFEntityEquipmentInput: null,
                ParentFormId: 0
            };
            contextObj.documentSource = [];

            setTimeout(function () {
                contextObj.tabDeleteIndex = 2;
            }, 50);

            setTimeout(function () {
                contextObj.selectedTab = contextObj.entityCategoryId == 3 ? 1 : 0;
                contextObj.tabDeleteIndex = 0;
                contextObj.createRequestEnabled = false;
                if (event.isReject) {
                    contextObj.reloadData = true;
                }
            }, 50);

            if (event.isChildRequests && event.childRequestData && event.childRequestData.length > 0) {
                if (event.isPm) {

                } else {
                    contextObj.serviceRequestListSource.unshift(event.childRequestData[0]);
                }
            }

        });

    }

    /***********************************************************************************************************
    * Function:     updateListSource
    * Description:  Common function to update both SR-NPM and PM List Sources 
    * Comments:     Corresponding Messages are also shown here
    *
    ************************************************************************************************************/

    public updateListSource(retUpdatedSrc: any[], requestNumber, entityId: number) {
        var contextObj = this;
        if (contextObj.action == "add") {
            if (retUpdatedSrc == undefined || retUpdatedSrc.length == 0) {
                contextObj.notificationService.ShowToaster("New Request '" + requestNumber + "' created", 3);
            } else {
                contextObj.serviceRequestListSource.unshift(retUpdatedSrc[0]);
                contextObj.notificationService.ShowToaster("New Request '" + retUpdatedSrc[0]["Request Number"] + "' created", 3);
            }
        } else if (retUpdatedSrc.length == 0 && requestNumber != "") {
            if (contextObj.entityCategoryId != 3) {
                contextObj.serviceRequestListSource = contextObj.serviceRequestListSource.filter(function (item) {
                    return item[contextObj.serviceRequestInputItems.dataKey] != entityId;
                });
                contextObj.reviewListTotalItems = contextObj.reviewListTotalItems - 1;
                contextObj.notificationService.ShowToaster("Request details updated", 3);
            } else {
                contextObj.pmListSource = contextObj.pmListSource.filter(function (item) {
                    return item[contextObj.pmListInputItems.dataKey] != entityId;
                });
                contextObj.pmListTotalItems = contextObj.pmListTotalItems - 1;
                contextObj.notificationService.ShowToaster("Work Order details updated", 3);
            }
        } else {
            if (contextObj.entityCategoryId == 1 || contextObj.entityCategoryId == 2) {
                if (contextObj.serviceRequestInputItems.selectedIds.length == 1) {
                    for (var i = 0; i < contextObj.serviceRequestListSource.length; i++) {
                        if (contextObj.serviceRequestListSource[i][contextObj.serviceRequestInputItems.dataKey] == retUpdatedSrc[0][contextObj.serviceRequestInputItems.dataKey]) {
                            contextObj.serviceRequestListSource[i] = retUpdatedSrc[0];
                        }
                    }
                    contextObj.notificationService.ShowToaster("Request details updated", 3);
                }
            } else if (contextObj.entityCategoryId == 3) {
                if (contextObj.pmListInputItems.selectedIds.length == 1) {
                    for (var i = 0; i < contextObj.pmListSource.length; i++) {
                        if (contextObj.pmListSource[i][contextObj.pmListInputItems.dataKey] == retUpdatedSrc[0][contextObj.pmListInputItems.dataKey]) {
                            contextObj.pmListSource[i] = retUpdatedSrc[0];
                        }
                    }
                    contextObj.notificationService.ShowToaster("Work Order details updated", 3);
                }
            }
        }
    }

    /***********************************************************************************************************
    * Function:     onDocumentSubmitClick
    * Description:  Document Submit click of Review Service Requests.
    * Comments:     Custom Model is used for submition. Refer interface - DocumentInput for better
    *               understanding.
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

        if (contextObj.action == "add") {
            contextObj.documentSource = event.itemSource;
            contextObj.notificationService.ShowToaster("Selected Document uploaded", 3)
        }
        if (contextObj.submitOutput.WFEntityDocumentInput == null) {
            documentInput.FormId = 240;
            documentInput.WFEntityId = contextObj.workOrderId == 0 ? contextObj.requestId : contextObj.workOrderId;
            documentInput.ListDocumentReportFieldIdValues.push(documentdata);
            contextObj.submitOutput.WFEntityDocumentInput = documentInput;
        } else {
            contextObj.submitOutput.WFEntityDocumentInput.ListDocumentReportFieldIdValues.push(documentdata);
        }

        if (contextObj.action == "review") {
            var reviewdocumentInput: ReviewDocumentInput = { WFEntityDocumentInput: contextObj.submitOutput.WFEntityDocumentInput };

            contextObj.workOrdereService.submitReviewDocumentData(JSON.stringify(reviewdocumentInput), 1).subscribe(function (resultData) {

                switch (resultData["Data"].StatusId) {
                    case 0:
                        if (resultData["Data"]["Message"] == "Invalid file") contextObj.notificationService.ShowToaster("Select a valid file", 5);
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (resultData["Data"]["Data"] != "[]") {
                            contextObj.documentSource = JSON.parse(resultData["Data"]["Data"])
                            contextObj.updateDocumentEnableMenu();
                            contextObj.notificationService.ShowToaster("Selected Document uploaded", 3)
                        }
                    default:
                        break;

                }
                contextObj.submitOutput.WFEntityDocumentInput = null;
            });
        }
    }

    /***********************************************************************************************************
    * Function:     onDocumentDelete
    * Description:  Document Delete click of Review Service Requests.
    * Comments:     Custom Model is used for submition. Refer interface - DocumentInput for better
    *               understanding.
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/

    public onDocumentDelete(event) {
        var contextObj = this;
        if (event.itemToBeDeleted["AttachmentId"] < 0) {
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
        } else {
            var documentValues: ReportFieldIdValues[] = [];
            documentValues.push(
                {
                    ReportFieldId: 1350,
                    Value: contextObj.requestId
                },
                {
                    ReportFieldId: 50,
                    Value: event.itemToBeDeleted["AttachmentId"]
                });

            var documentData: DocumentDataInput = { DocumentId: event.itemToBeDeleted["AttachmentId"], FileDataInput: event.fileData, WFReportFieldIdValues: documentValues };
            var documentInput: DocumentInput = { FormId: 240, WFEntityId: contextObj.requestId, ListDocumentReportFieldIdValues: [documentData] };

            var reviewdocumentInput: ReviewDocumentInput = { WFEntityDocumentInput: documentInput };
            contextObj.workOrdereService.submitReviewDocumentData(JSON.stringify(reviewdocumentInput), 3).subscribe(function (resultData) {

                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.documentSource = JSON.parse(resultData["Data"]["Data"]);
                        contextObj.documentSource = contextObj.documentSource.length > 0 ? contextObj.documentSource : [];
                        contextObj.updateDocumentEnableMenu();
                        contextObj.notificationService.ShowToaster("Selected Document deleted", 3);
                        if (contextObj.documentSource.length == 0) {
                            contextObj.notificationService.ShowToaster("No Documents exist", 2);
                        }
                        break;
                    default:
                        break;

                }
            });
        }
    }

    public updateDocumentEnableMenu() {
        if (this.documentSource.length > 0) {
            this.documentEnableMenu = this.entityCategoryId == 3 ? [4] : [1, 2, 4];
        } else {
            this.documentEnableMenu = this.entityCategoryId == 3 ? [] : [1];
        }
    }

    /***********************************************************************************************************
    * Function:     onCostSubmit
    * Description:  Set totalCostItems after cost submit. Closes the Cost Tab
    *
    ************************************************************************************************************/

    public onCostSubmit(event: TotalCostItems) {
        var contextObj = this;
        contextObj.totalCostItems = event;  /* totalCostItems is to show a table of Costs in review page. Not implemented now */
        contextObj.selectedTab = 2;
        setTimeout(function () {
            contextObj.closeTab(3);
        }, 50);
    }

    /***********************************************************************************************************
    * Function:     onTeamMemberUpdate
    * Description:  Team member update events
    * Comments:     Custom Model is used for submition. Refer interface - ITeamMemberInput for better
    *               understanding.
    *               First Team Members is deleted and then inserted.
    *   Do Not Change Any Code Without Discussing and Proper Testing
    *
    ************************************************************************************************************/

    public onTeamMemberUpdate(event) {
        debugger;
        var contextObj = this;
        var teamMemberInput: ITeamMemberInput = { WFEntityTeamMemberInput: { FormId: 429, ListTeamMemberReportFieldIdValues: event.data } };
        var deleteInput: ITeamMemberInput = { WFEntityTeamMemberInput: { FormId: 429, ListTeamMemberReportFieldIdValues: [{ WFReportFieldIdValues: contextObj.getReportfiedlIdValuesForTeamMemberDelete() }] } };

        contextObj.workOrdereService.deleteReviewTeamMemberData(JSON.stringify(deleteInput), event.target).subscribe(function (resultData) {
            debugger;
            switch (resultData.StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (event.data.length > 0) {
                        contextObj.workOrdereService.submitReviewTeamMemberData(JSON.stringify(teamMemberInput), event.target).subscribe(function (resultData) {
                            debugger;
                            switch (resultData.StatusId) {
                                case 0:
                                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                    break;
                                case 1:
                                    contextObj.notificationService.ShowToaster("Team Members updated", 3);
                                    contextObj.selectedTab = 2;
                                    setTimeout(function () {
                                        contextObj.closeTab(3);
                                    }, 50);
                                    break;
                            }
                        });
                    } else {
                        contextObj.notificationService.ShowToaster("Team Members updated", 3);
                        contextObj.selectedTab = 2;
                        setTimeout(function () {
                            contextObj.closeTab(3);
                        }, 50);
                    }
                    break;
            }
        });
    }

    /***********************************************************************************************************
    * Function:     getReportfiedlIdValuesForTeamMemberDelete
    * Description:  Returns an Array of ReportFieldIdValues with CurrentWorkFlowActionPointId and
    *               WorkFlowEntityIds.
    *
    ************************************************************************************************************/

    public getReportfiedlIdValuesForTeamMemberDelete() {
        var tempArray: ReportFieldIdValues[] = [];
        for (var entityId of this.workFlowEntityIds) {
            tempArray.push({ ReportFieldId: 5827, Value: this.currentWorkFlowActionPointId }, { ReportFieldId: 5859, Value: entityId });
        }
        return tempArray;
    }

    /************************************************************************
     * Genaral Functions
     * 
     *************************************************************************/

    public initiateValidation(fieldObject: IField) {

        var contextObj = this;
        var el = <HTMLElement>document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    }
    attachmentSuccess(event) {
        this.refreshgrid = [];
        console.log('attachmentSuccess', event)
        //this.refreshgrid = this.refreshgrid.concat([true]);
    }
}

/************************************************************************
* Interfaces for Create and Review
* 
*************************************************************************/

interface LinkDetails {
    Id: number;
    Name: string;
    DataKeyId: number;
}

interface IReviewSubmitData {
    fieldObject: any;
    action: string;
    isPm: boolean;
    isChildRequests: boolean;
    childRequestData: any[];
    isReject: boolean;
}

interface ReviewSubmitOutput {
    WFEntityInput: WorkFlowEntityInput;
    WFEntityDocumentInput: DocumentInput;
    //WFEntityEquipmentInput: EquipmentInput;
    ParentFormId: number;
}

interface ReviewDocumentInput {
    WFEntityDocumentInput: DocumentInput;
}

interface ReviewEquipmentInput {
    WFEntityEquipmentInput: EquipmentInput;
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
    WFEntityId: number;
    ListEquipmentReportFieldIdValues: EquipmentDataInput[];
}

interface EquipmentDataInput {
    EquipmentId: number;
    WFReportFieldIdValues: any[];
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

interface TotalCostItems {
    TechnicianTotalCost: number;
    PartsTotalCost: number;
    ToolsTotalCost: number;
    OtherTotalCost: number;
}

interface ITeamMemberInput {
    WFEntityTeamMemberInput: ITeamMemberDataInput;
}

interface ITeamMemberDataInput {
    FormId: number;
    ListTeamMemberReportFieldIdValues: ITeamMemberReportFieldIdValues[];
}

interface ITeamMemberReportFieldIdValues {
    WFReportFieldIdValues: ReportFieldIdValues[];
}
