import { Component, OnInit, AfterViewInit } from '@angular/core';
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

import { TrackRequestListComponent } from './trackRequest-list.component';
import { ReviewServiceRequestComponent } from '../Review/reviewServiceRequests.component';
import { ReviewDocumentListComponent } from '../Review/reviewDocument-list.component';

@Component({
    selector: 'track-Request',
    templateUrl: './app/Views/WorkOrder/Track Request/track-Request.component.html',
    directives: [SectionComponent, PageComponent, TabsComponent, TabComponent, TrackRequestListComponent, ReviewServiceRequestComponent, ReviewDocumentListComponent],
    providers: [NotificationService, WorkOrdereService, GeneralFunctions],
})

export class TrackServiceRequestComponent implements OnInit {
    pageTitle: string = "Review";
    pagePath: string = "Work Order / My Requests / Active Requests";
    selectedTab: number = 0;
    tabDeleteIndex: number = 0;
    action: string = "";
    btnName: string = "";
    fieldDetailsAdd1: IField[];
    linkArray: any = undefined;
    entityCategoryId: number = 1;
    outComeData: any[];
    reviewTabEnabled: boolean = false;
    documentTabEnabled: boolean = false;
    requestId: number = 0;
    activeRequestListSource: any[] = [];
    closedRequestListSource: any[] = [];
    documentSource: any[] = [];
    activeRequestListTotalItems: number = 0;
    activeRequestListItemsPerPage: number = 0;
    closedRequestListTotalItems: number = 0;
    closedRequestListItemsPerPage: number = 0;
    reviewServiceRequestEnabled: boolean = false;
    initList: boolean = false;
    activeRequestInputItems: IGrid = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    closedRequestInputItems: IGrid = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    userDetails: UserDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "" };
    submitOutput: ReviewSubmitOutput = {
        WFEntityInput: null,
        WFEntityDocumentInput: null,
        //WFEntityEquipmentInput: null,
        ParentFormId: 0
    };
    documentEnableMenu: number[] = [];

    constructor(private notificationService: NotificationService, private workOrderService: WorkOrdereService, private generalFunctions: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.workOrderService.getValuesWithDbObjectDetails(50781, '').subscribe(function (resultData) {
            if (resultData["Data"] != "[]") {
                resultData = (JSON.parse(resultData["Data"]))[0];
                contextObj.userDetails.UserFirstName = resultData["FirstName"];
                contextObj.userDetails.UserMiddleName = resultData["MiddleName"];
                contextObj.userDetails.UserLastName = resultData["LastName"];
                contextObj.userDetails.UserId = resultData["UserId"];
                contextObj.userDetails.UserName = resultData["Name"];
                contextObj.userDetails.UserEmail = resultData["Email"];
                contextObj.initList = true;
            }
        });
    }

    public getPermissionDetails(workTypeId: number, dataKeyId: number) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push(
            {
                ReportFieldId: 5873,
                Value: workTypeId
            }
        );
        contextObj.workOrderService.getValuesWithDbObjectDetails(50847, JSON.stringify(tempArray)).subscribe(function (permission) {
            contextObj.updateLinkArray(JSON.parse(permission["Data"]), contextObj.action == "review" ? dataKeyId : 0);
        });
    }

    public updateLinkArray(fieldDetailsArray, dataKeyId: number) {
        
        this.linkArray = undefined;
        if (fieldDetailsArray == null || fieldDetailsArray == undefined || fieldDetailsArray.length == 0) return;
        var temp = new Array<LinkDetails>();
        for (var item of fieldDetailsArray) {
            if (item["Has Permission"] == 1 && (item.Id == 14 || item.Id == 3 /*|| item.Id == 2 || item.Id == 13*/) && item.EntityCategoryId == this.entityCategoryId) { /* remove this while doing the link tabs */
                temp.push({
                    Id: item.Id,
                    Name: item.Name,
                    DataKeyId: dataKeyId
                });
            }
        }
        this.linkArray = temp;
    }

    public getEditableFields() {

        var check 
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push(
            {
                ReportFieldId: 5873,
                Value: contextObj.activeRequestInputItems.rowData["WorkTypeId"]
            }
        );
        contextObj.workOrderService.getValuesWithDbObjectDetails(50699, JSON.stringify(tempArray)).subscribe(function (resultData) {
            
            var editableFields: any[] = JSON.parse(resultData["Data"]);
            var reportFields: any[] = [];

            for (var item of contextObj.fieldDetailsAdd1) {
                var editableObject = editableFields.find(function (fieldItem) {
                    if ((fieldItem.ReportFieldId == item.ReportFieldId) && (contextObj.entityCategoryId == fieldItem.EntityCategoryId)) {
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
        });
    }

    public getSelectedTab(event: any) {
        switch (event[0]) {
            case 0:
            case 1:
                if (event[1]) {
                    if (this.documentTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                        this.closeTab(2);
                    } else if (this.documentTabEnabled || this.reviewTabEnabled) {
                        this.closeTab(2);
                    }
                }
                this.pagePath = event[0] == 0 ? "Work Order / My Requests / Active Requests" : "Work Order / My Requests / Closed Requests"
                break;
            case 2:
                if (event[1]) {
                    if (this.documentTabEnabled && this.reviewTabEnabled) {
                        this.closeTab(3);
                    }
                } else {
                    var contextObj = this;
                    setTimeout(function () {
                        contextObj.reviewServiceRequestEnabled = true;
                    }, 300)
                }
                break;
        }

        this.selectedTab = event[0];
    }

    public onTabClose(event) {
        switch (event[0]) {
            case 0:
                this.reviewTabEnabled = false;
                break;
            case 1:
                if (this.documentTabEnabled && this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    this.reviewServiceRequestEnabled = false;
                    this.selectedTab = 2;
                } else if (!this.documentTabEnabled && this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    this.reviewServiceRequestEnabled = false;
                    this.selectedTab = 0;
                } else if (this.documentTabEnabled && !this.reviewTabEnabled) {
                    this.documentTabEnabled = false;
                    this.selectedTab = 0;
                }
                break;
            case 2:
                this.documentTabEnabled = false;
                this.selectedTab = 2;
                break;
            case 3:
                if (this.reviewTabEnabled) {
                    this.reviewTabEnabled = false;
                    this.reviewServiceRequestEnabled = false;
                }
                break;
            default:
                break;
        }
    }

    public closeTab(index: number) {
        var contextObj = this
        switch (index) {
            case 2:
                this.reviewTabEnabled = false;
                break;
            case 3:
                this.documentTabEnabled = false;
                break;
        }
        setTimeout(function () {
            contextObj.tabDeleteIndex = index;
        }, 50);
        setTimeout(function () {
            contextObj.tabDeleteIndex = 0;
        }, 50);
    }

    public onActiveRequestListSourceUpdated(event) {
        this.activeRequestListSource = event.itemSource;
        this.activeRequestListItemsPerPage = event.rowsPerPage;
        this.activeRequestListTotalItems = event.totalItems;
    }

    public onClosedRequestListSourceUpdated(event) {
        this.closedRequestListSource = event.itemSource;
        this.closedRequestListItemsPerPage = event.rowsPerPage;
        this.closedRequestListTotalItems = event.totalItems;
    }

    public onDocumentSourceUpdated(event) {
        this.documentSource = event;
    }

    public onEditClicked(event) {
        
        this.reviewTabEnabled = false;
        this.fieldDetailsAdd1 = event.fieldobject;
        this.action = event.action;
        this.btnName = event.buttonName;
        this.activeRequestInputItems = event.input;
        this.outComeData = event.outComes;
        this.documentSource = [];
        this.requestId = this.activeRequestInputItems.rowData.WorkRequestId;
        this.pagePath = "Work Order / My Requests / Active Requests / Edit";
        this.action = "review";
        this.btnName = "Save Changes";
        this.getEditableFields();
        this.getPermissionDetails(this.activeRequestInputItems.rowData["WorkTypeId"], this.activeRequestInputItems.rowData[this.activeRequestInputItems.dataKey]);

        var contextObj = this;
        setTimeout(function () {
            contextObj.selectedTab = 2;
        }, 500);
        this.reviewTabEnabled = true;

    }

    public onSubmitClick(event) {
        var contextObj = this;
        
        var entityInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: contextObj.activeRequestInputItems.rowData.WorkRequestId, WFReportFieldIdValues: contextObj.updateSubmitFieldObjectForStatus(JSON.parse(event.fieldObject)) }
        contextObj.submitOutput.WFEntityInput = entityInput;
        contextObj.submitOutput.ParentFormId = 293;
        contextObj.submitOutput.WFEntityDocumentInput = (contextObj.submitOutput.WFEntityDocumentInput == null) ? null : contextObj.submitOutput.WFEntityDocumentInput;
        var jsonOut = JSON.stringify(contextObj.submitOutput);
        
        contextObj.workOrderService.submitAddUpdateServiceRequest(jsonOut, contextObj.requestId, 3).subscribe(function (resultData) {
            
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"]["Data"] != "[]") {
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
                        if (retUpdatedSrc.length == 0 && requestNumber != "") {
                            contextObj.activeRequestListSource = contextObj.activeRequestListSource.filter(function (item) {
                                return item[contextObj.activeRequestInputItems.dataKey] != contextObj.activeRequestInputItems.rowData.WorkRequestId;
                            });
                            contextObj.activeRequestListTotalItems = contextObj.activeRequestListTotalItems - 1;
                        } else {
                            for (let i = 0; i < contextObj.activeRequestListSource.length; i++) {
                                if (contextObj.activeRequestListSource[i][contextObj.activeRequestInputItems.dataKey] == retUpdatedSrc[0][contextObj.activeRequestInputItems.dataKey]) {
                                    contextObj.activeRequestListSource[i] = retUpdatedSrc[0];
                                }
                            }
                        }
                        contextObj.notificationService.ShowToaster("Request details updated", 3);
                    } 
                    break;
                default:
                    break;
            }
            contextObj.submitOutput = {
                WFEntityInput: null,
                WFEntityDocumentInput: null,
                //WFEntityEquipmentInput: null,
                ParentFormId: 0
            };
            contextObj.tabDeleteIndex = 2;
            setTimeout(function () {
                contextObj.selectedTab = 0;
                contextObj.tabDeleteIndex = 0;
                contextObj.reviewTabEnabled = false;
            }, 50);
        });
    }

    public onLinkClick(linkDetails: LinkDetails) {
        var contextObj = this;
        contextObj.documentTabEnabled = false;

        switch (linkDetails.Id) {
            case 2:     //Manage Equipment
            case 13:    //View Equipment
                return;
            case 3:     //Manage Documents
            case 14:    //View Documents
                contextObj.documentTabEnabled = true;
                break;

            default:
                return;
        }
        setTimeout(function () {
            contextObj.tabDeleteIndex = 0;
            contextObj.selectedTab = 3;
        }, 50);
    }

    public onDocumentSubmitClick(event) {
        var contextObj = this;
        var documentInput: DocumentInput = { FormId: 0, WFEntityId: 0, ListDocumentReportFieldIdValues: [] };
        var documentdata: DocumentDataInput = { DocumentId: 0, FileDataInput: event.fileData, WFReportFieldIdValues: [] };
        documentdata.DocumentId = event.Id;
        documentdata.FileDataInput = event.fileData;
        documentdata.WFReportFieldIdValues = event.fieldObject;
        documentInput.FormId = 240;
        documentInput.WFEntityId = contextObj.requestId;
        documentInput.ListDocumentReportFieldIdValues.push(documentdata);
        var reviewdocumentInput: ReviewDocumentInput = { WFEntityDocumentInput: documentInput };

        contextObj.workOrderService.submitReviewDocumentData(JSON.stringify(reviewdocumentInput), 1).subscribe(function (resultData) {
            
            switch (resultData["Data"].StatusId) {
                case 0:
                    if (resultData["Data"]["Message"] == "Invalid file") contextObj.notificationService.ShowToaster("Select a valid file", 5);
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"]["Data"] != "[]") {
                        contextObj.documentSource = JSON.parse(resultData["Data"]["Data"])
                        contextObj.documentEnableMenu = contextObj.documentSource.length > 0 ? [1, 2, 4] : [1];
                        contextObj.notificationService.ShowToaster("Selected Document uploaded", 3)
                    }
                default:
                    break;

            }
            contextObj.submitOutput.WFEntityDocumentInput = null;
        });
    }

    public updateSubmitFieldObjectForStatus(fieldDetailsArray: ReportFieldIdValues[]) {
        fieldDetailsArray.push({
            ReportFieldId: 1490,
            Value: 25
        });

        return fieldDetailsArray;
    }

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
                contextObj.documentSource = event.itemSource;
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
            contextObj.workOrderService.submitReviewDocumentData(JSON.stringify(reviewdocumentInput), 3).subscribe(function (resultData) {
                
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.documentSource = JSON.parse(resultData["Data"]["Data"])
                        contextObj.documentEnableMenu = contextObj.documentSource.length > 0 ? [1, 2, 4] : [1];
                        contextObj.notificationService.ShowToaster("Selected Document deleted", 3)
                    default:
                        break;

                }
            });
        }
    }
}

interface UserDetails {
    UserId: number;
    UserName: string;
    UserEmail: string;
    UserFirstName: string;
    UserMiddleName: string;
    UserLastName: string;
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

interface ReviewDocumentInput {
    WFEntityDocumentInput: DocumentInput;
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

interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}
