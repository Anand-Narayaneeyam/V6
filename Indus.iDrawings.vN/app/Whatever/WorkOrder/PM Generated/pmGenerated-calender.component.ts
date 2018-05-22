/// <reference path="../review/reviewpmworkorder-list.component.ts" />
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { CalendarComponent } from '../../../framework/whatever/calendar/calendar.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component';
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';

import { ListReviewPMWorkOrderComponent } from '../review/reviewpmworkorder-list.component';
import { ReviewPMWorkorderComponent } from '../review/reviewPMWorkorder.component';
import { ReviewCostComponent } from '../review/Review Cost/review-Cost.component';

@Component({
    selector: 'pm-generated',
    templateUrl: './app/Views/WorkOrder/PM Generated/pmGenerated-calender.component.html',
    directives: [CalendarComponent, SlideComponent, TabsComponent, TabComponent, ListReviewPMWorkOrderComponent, PageComponent, ReviewPMWorkorderComponent, ReviewCostComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, WorkOrdereService],
    encapsulation: ViewEncapsulation.None
})

export class PMGeneratedCalendarComponent implements OnInit {

    calendarObj: CalendarObjArray[];
    selectedTab: number = 0;
    tabDeleteIndex: number = 0;

    pagePath: string = "Work Order / PM WOs Generated";

    reviewTabEnabled: boolean = false;
    listTabEnabled: boolean = false;
    reviewPmListEnabled: boolean = false;
    pmWorkOrderReviewEnabled: boolean = false;
    documentTabEnabled: boolean = false;
    costTabEnabled: boolean = false;
    equipmentTabEnabled: boolean = false;
    addOnTabEnabled: boolean = false;
    isTimeSpentSubscribed: boolean = false;

    dateToPerform: string = "";
    blockPrevMnthClick: boolean = false;
    blockNextMnthClick: boolean = false;

    pmListSource: any[] = [];
    documentSource: any[] = [];
    equipmentListSource: any[] = [];
    outComeData: any[] = [];
    linkArray: any = undefined;
    requestId: number = 0;
    workOrderId: number = 0;
    requestNumber: string = "";
    entityCategoryId: number = 3;
    workFlowEntityIds: any[] = [];
    statusId: number = 0;
    action: string;
    btnName: string;
    addOnTabName: string = "";
    shouldReload: boolean = false;

    fieldDetailsAdd1: IField[];
    documentEnableMenu: number[] = [];
    equipmentListItemsPerPage: number = 0;
    equipmentListTotalItems: number = 0;
    pmListTotalItems: number = 0;
    pmListItemsPerPage: number = 0;
    userDetails: UserDetails = { UserId: 0, UserName: "", UserEmail: "", UserFirstName: "", UserMiddleName: "", UserLastName: "" };
    pmListInputItems: IGrid = { dataKey: "WorkOrderId", groupBy: [], grpWithCheckBx: false, sortCol: "[Scheduled Date]", sortDir: "DESC", allowAdd: false, allowEdit: false };
    equipmentListInputtems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalCostItems: TotalCostItems = { TechnicianTotalCost: 0.00, PartsTotalCost: 0.00, ToolsTotalCost: 0.00, OtherTotalCost: 0.00 };
    submitOutput: ReviewSubmitOutput = {
        WFEntityInput: null,
        WFEntityDocumentInput: null,
        //WFEntityEquipmentInput: null,
        ParentFormId: 0
    };

    constructor(private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit() {
        this.loadCalendarData(this.formatDate());
    }

    /*************************************************************************
     * Calender Events
     * 
     *************************************************************************/

    public loadCalendarData(date: string) {
        var contextObj = this;
        contextObj.workOrderService.getGenerateWorkOrderCalenderList(date, 0, 0, 0, 0).subscribe(function (resultData) {
            
            var tempData = JSON.parse(resultData["Data"].FieldBinderData);

            var tempCalendarObj = new Array<CalendarObjArray>();

            for (var item of tempData) {
                tempCalendarObj.push({
                    strDate: item.Day,
                    count: Number(item.WOCount)
                });
            }

            contextObj.calendarObj = tempCalendarObj;
            contextObj.blockPrevMnthClick = false;
            contextObj.blockNextMnthClick = false;
        });
    }

    public clearCalendarData() {
        if (this.calendarObj) {
            var tempData: CalendarObjArray[] = [];
            tempData = tempData.concat(this.calendarObj);
            for (var item of tempData) {
                item.count = 0;
            }
            this.calendarObj = [];
            this.calendarObj = tempData;
        }
    }

    public prevMonthClick(event) {
        this.blockPrevMnthClick = true;
        this.blockNextMnthClick = true;
        this.clearCalendarData();
        this.loadCalendarData(event.selectedDate);
    }

    public nextMonthClick(event) {
        this.blockNextMnthClick = true;
        this.blockPrevMnthClick = true;
        this.clearCalendarData();
        this.loadCalendarData(event.selectedDate);
    }

    public onDayViewClick(event) {
        var contextObj = this;
        contextObj.pmWorkOrderReviewEnabled = false;
        contextObj.dateToPerform = event.selectedDate;
        contextObj.listTabEnabled = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 100);
    }

    /*************************************************************************
     * Tab Events
     * 
     *************************************************************************/

    public getSelectedTab(event) {
        var contextObj = this;
        switch (event[0]) {
            case 0:
                if (event[1] && contextObj.listTabEnabled) {
                    contextObj.loadCalendarData(contextObj.dateToPerform);
                    if (contextObj.addOnTabEnabled) {
                        contextObj.addOnTabEnabled = false;
                        contextObj.costTabEnabled = false;
                        contextObj.tabDeleteIndex = 3;
                    }
                    if (contextObj.reviewTabEnabled) {
                        setTimeout(function () {
                            contextObj.reviewTabEnabled = false;
                            contextObj.pmWorkOrderReviewEnabled = false;
                            contextObj.tabDeleteIndex = 2;
                        }, 100);
                    }
                    setTimeout(function () {
                        contextObj.listTabEnabled = false;
                        contextObj.reviewPmListEnabled = false;
                        contextObj.tabDeleteIndex = 1;
                    }, 100);
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                }
                contextObj.pagePath = "Work Order / PM WOs Generated";
                break;
            case 1:
                if (event[1] && contextObj.reviewTabEnabled) {
                    if (contextObj.addOnTabEnabled) {
                        contextObj.addOnTabEnabled = false;
                        contextObj.costTabEnabled = false;
                        contextObj.tabDeleteIndex = 3;
                    }
                    setTimeout(function () {
                        contextObj.reviewTabEnabled = false;
                        contextObj.pmWorkOrderReviewEnabled = false;
                        contextObj.tabDeleteIndex = 2;
                    }, 100);
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                } else if (contextObj.listTabEnabled) {
                    contextObj.reviewPmListEnabled = true;
                }
                contextObj.pagePath = "Work Order / PM WOs Generated / PM Work Orders";
                break;
            case 2:
                if (event[1] && contextObj.addOnTabEnabled) {
                    contextObj.addOnTabEnabled = false;
                    contextObj.costTabEnabled = false;
                    contextObj.tabDeleteIndex = 3;
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                    }, 100);
                } else if (contextObj.reviewTabEnabled) {
                    contextObj.pmWorkOrderReviewEnabled = true;
                }
                contextObj.pagePath = "Work Order / PM WOs Generated / PM Work Orders / Review";
                break;
            case 3:

                break;

        }
        contextObj.selectedTab = event[0];
    }

    /*************************************************************************
     * Review Click Events
     * 
     *************************************************************************/

    public onPMReviewClick(event) {
        var contextObj = this;
        contextObj.linkArray = undefined;
        contextObj.fieldDetailsAdd1 = event.fieldobject;
        contextObj.action = event.action;
        contextObj.btnName = event.buttonName;
        contextObj.pmListInputItems = event.input;
        contextObj.outComeData = event.outComes;
        contextObj.statusId = contextObj.pmListInputItems.rowData["StatusId"];
        contextObj.workFlowEntityIds = [contextObj.pmListInputItems.rowData.WorkFlowEntityId];
        contextObj.workOrderId = contextObj.pmListInputItems.rowData.WorkOrderId;
        contextObj.requestNumber = contextObj.pmListInputItems.rowData["Work Order No."];
        contextObj.getPermissionDetails(contextObj.pmListInputItems.rowData["CurrentWorkFlowActionPointId"], contextObj.pmListInputItems.rowData[contextObj.pmListInputItems.dataKey]);
        contextObj.getEditableFields();
        contextObj.getReviewCostDetails();
        if (contextObj.isTimeSpentSubscribed) contextObj.getAutoPopulatedTimeSpentValue();

        contextObj.reviewTabEnabled = true;
        setTimeout(function () {
            contextObj.selectedTab = 2;
        }, 100);
    }

    public onPMListSourceUpdated(event) {
        this.pmListSource = event.itemSource;
        this.pmListItemsPerPage = event.rowsPerPage;
        this.pmListTotalItems = event.totalItems;
    }

    /************************************************************************
     * Permissions, Link Click Events, 
     * Editable Fields settings, Time Spent, Cost Details
     *************************************************************************/

    public getPermissionDetails(workFlowActionPointId: number, dataKeyId: number) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push(
            {
                ReportFieldId: 5825,
                Value: workFlowActionPointId
            }
        );
        contextObj.workOrderService.getValuesWithDbObjectDetails(50694, JSON.stringify(tempArray)).subscribe(function (permission) {
            contextObj.updateLinkArray(JSON.parse(permission["Data"]), contextObj.action == "review" ? dataKeyId : 0);
        });
    }

    public onRequesterPermissionUpdate(event: any[]) {
        var filteredForRequester = event.filter(function (item) { return (item.Id != 2 && item.Id != 13) })
        this.updateLinkArray(filteredForRequester, 0)
    }

    public updateLinkArray(fieldDetailsArray, dataKeyId: number) {
        this.linkArray = undefined;
        if (fieldDetailsArray == null || fieldDetailsArray == undefined || fieldDetailsArray.length == 0) return;
        var temp = new Array<LinkDetails>();
        for (var item of fieldDetailsArray) {
            if (item["Has Permission"] == 1 && (item.Id == 14 || item.Id == 3 || item.Id == 2 || item.Id == 13 || item.Id == 11) && item.EntityCategoryId == (this.entityCategoryId == 2 ? 1 : this.entityCategoryId)) { /* remove this while doing the link tabs */
                temp.push({
                    Id: item.Id,
                    Name: item.Name,
                    DataKeyId: dataKeyId
                });
            }
        }
        this.linkArray = temp;
    }

    public onLinkClick(linkDetails: LinkDetails) {     /* link clicks from review page - documents from create page */
        var contextObj = this;
        contextObj.addOnTabEnabled = false;
        contextObj.documentTabEnabled = false;
        contextObj.costTabEnabled = false;
        contextObj.equipmentTabEnabled = false;
        contextObj.addOnTabEnabled = true;
        switch (linkDetails.Id) {
            case 1:     /*Manage Drawing */
            case 15:    /*View Drawing */
                return;
            case 2:     /*Manage Equipment */
            case 13:    /*View Equipment */
                contextObj.equipmentListSource = [];
                contextObj.equipmentListItemsPerPage = 0;
                contextObj.equipmentListTotalItems = 0;
                contextObj.equipmentTabEnabled = true;
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
            default:
                return;
        }
        contextObj.tabDeleteIndex = 0;
        setTimeout(function () {
            contextObj.selectedTab = 3;
        }, 50);
    }

    public getWorkFlowEntityIds() {
        if (this.pmListInputItems.selectedIds.length == 1) {
            this.workFlowEntityIds = [this.pmListInputItems.rowData["WorkFlowEntityId"]];
        } else {
            for (var item of this.pmListInputItems.rowData) {
                this.workFlowEntityIds.push(item["WorkFlowEntityId"]);
            }
        }
    }

    public getEditableFields() {

        var contextObj = this;
        var tempArray = new Array();
        tempArray.push(
            {
                ReportFieldId: 5827,
                Value: contextObj.pmListInputItems.rowData["CurrentWorkFlowActionPointId"]
            }
        );
        contextObj.workOrderService.getValuesWithDbObjectDetails(50699, JSON.stringify(tempArray)).subscribe(function (resultData) {

            var editableFields: any[] = JSON.parse(resultData["Data"]);
            var reportFields: any[] = [];
            for (var item of editableFields) {
                var fieldObject = contextObj.fieldDetailsAdd1.find(function (fieldItem) {
                    return fieldItem.ReportFieldId === item.ReportFieldId;
                });
                if (fieldObject != undefined && (contextObj.entityCategoryId != 3 ? 1 : 3) == item.EntityCategoryId) {
                    fieldObject.IsVisible = item.Visible;
                    fieldObject.ReadOnlyMode = !item.Editable;
                    if (fieldObject.IsVisible) reportFields.push(fieldObject.ReportFieldId);
                }
            }

            //contextObj.fieldDetailsAdd1 = contextObj.fieldDetailsAdd1.filter(function (item) {
            //    return !(reportFields.indexOf(item.ReportFieldId) == -1 && item.ReportFieldId > 100000);
            //});

            for (var index = 0; index < contextObj.fieldDetailsAdd1.length; index++) {
                if ((reportFields.indexOf(contextObj.fieldDetailsAdd1[index].ReportFieldId) == -1 && contextObj.fieldDetailsAdd1[index].ReportFieldId > 100000)) {
                    contextObj.fieldDetailsAdd1.splice(index, 1);
                    index -= 1;
                }
            }

        });
    }

    public getAutoPopulatedTimeSpentValue() {
        var contextObj = this;
        contextObj.workOrderService.getAutoPopulatedTimeSpentValue(contextObj.workFlowEntityIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var timeSpentField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 7521; });
                timeSpentField.FieldValue = resultData["Data"];
            }
        });
    }

    public getReviewCostDetails() {
        var contextObj = this;
        contextObj.workOrderService.getReviewCostDetails(contextObj.workFlowEntityIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]) {
                var costData = JSON.parse(resultData["Data"]["FieldBinderData"])[0];
                contextObj.totalCostItems.TechnicianTotalCost = costData["Technician Cost"] ? costData["Technician Cost"] : 0.00;
                contextObj.totalCostItems.PartsTotalCost = costData["Spare Cost"] ? costData["Spare Cost"] : 0.00;
                contextObj.totalCostItems.ToolsTotalCost = costData["Tools Cost"] ? costData["Tools Cost"] : 0.00;
                contextObj.totalCostItems.OtherTotalCost = costData["Other Cost"] ? costData["Other Cost"] : 0.00;
            }
        });
    }

    /************************************************************************
    * Request and WorkOrder details submition
    * 
    *************************************************************************/

    public onSubmitClick(event) {
        var contextObj = this;
        var entityId = contextObj.workOrderId;

        var entityInput: WorkFlowEntityInput = { FormId: 228, WFEntityId: entityId, WFReportFieldIdValues: JSON.parse(event.fieldObject) }
        contextObj.submitOutput.WFEntityInput = entityInput;
        contextObj.submitOutput.ParentFormId = 226;
        contextObj.submitOutput.WFEntityDocumentInput = null;
        var jsonOut = JSON.stringify(contextObj.submitOutput);

        contextObj.workOrderService.submitAddUpdateServiceRequest(jsonOut, contextObj.workOrderId == 0 ? contextObj.requestId : contextObj.workOrderId, contextObj.action == "add" ? 1 : 2).subscribe(function (resultData) {
            debugger;
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.shouldReload = !contextObj.shouldReload;
                    contextObj.notificationService.ShowToaster("Work Order details updated", 3);
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
            contextObj.documentSource = [];
            contextObj.reviewTabEnabled = false;
            contextObj.pmWorkOrderReviewEnabled = false;
            contextObj.tabDeleteIndex = 2;
            setTimeout(function () {
                contextObj.selectedTab =  1;
                contextObj.tabDeleteIndex = 0;
            }, 50);
        });

    }

    /************************************************************************
     * Cost Table update events
     * 
     *************************************************************************/

    public onCostSubmit(event: TotalCostItems) {
        var contextObj = this;
        contextObj.totalCostItems = event;
        contextObj.selectedTab = 2;
    }

    public formatDate() {
        /*dd MMM yyyy  --format*/
        var date = new Date();
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        let formatteddate = dd + " " + mon + " " + yy ;
        return formatteddate;
    }


}

interface CalendarObjArray {
    strDate: string,
    count: number
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
