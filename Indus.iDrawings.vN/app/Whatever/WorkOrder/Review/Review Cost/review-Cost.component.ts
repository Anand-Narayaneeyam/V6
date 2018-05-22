import { Component, OnInit, AfterViewInit,Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {IField} from  '../../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../../Framework/Models/Interface/Igrid'
import { WorkOrdereService } from '../../../../Models/WorkOrder/workorder.service'
import { GeneralFunctions} from '../../../../Models/Common/General';
import { SlideComponent} from '../../../../Framework/Whatever/Slide/slide.component';

import { ReviewTechniciansComponent } from './reviewCost-Technician-list.component'
import { ReviewToolsComponent } from './reviewCost-Tools-list.component'
import { ReviewPartsComponent } from './reviewCost-Parts-list.component'
import { ReviewOtherCostComponent } from './reviewCost-Other-list.component'


@Component({
    selector: 'review-Cost',
    templateUrl: './app/Views/WorkOrder/Review/Review Cost/review-Cost.component.html',
    directives: [PageComponent, ReviewTechniciansComponent, ReviewToolsComponent, ReviewPartsComponent, ReviewOtherCostComponent, SlideComponent],
    providers: [NotificationService, WorkOrdereService, GeneralFunctions],
    inputs: ['workFlowEntityCategoryId', 'workFlowEntityIds','requestNumber'],
})

export class ReviewCostComponent implements OnInit {

    @Output() onCostSubmit = new EventEmitter();

    pageTitle: string = "Review";
    pagePath: string = "Work Order / Manage Cost";
    userDetails: UserDetails;
    technicianListSource: any[] = [];
    technicianListItemsPerPage: number = 0;
    technicianListTotalItems: number = 0;
    technicianEnableMenu: number[] = [];
    technicianFieldObject: IField[] = [];

    toolsListSource: any[] = [];
    toolsListItemsPerPage: number = 0;
    toolsListTotalItems: number = 0;
    toolsEnableMenu: number[] = [];
    toolsFieldObject: IField[] = [];

    partsListSource: any[] = [];
    partsListItemsPerPage: number = 0;
    partsListTotalItems: number = 0;
    partsEnableMenu: number[] = [];
    partsFieldObject: IField[] = [];

    otherCostListSource: any[] = [];
    otherCostListItemsPerPage: number = 0;
    otherCostListTotalItems: number = 0;
    otherCostEnableMenu: number[] = [];
    otherCostFieldObject: IField[] = [];
    requestNumber: string = "";
    labelName: string = "";

    totalCostItems: TotalCostItems = { TechnicianTotalCost: 0.00, PartsTotalCost: 0.00, ToolsTotalCost: 0.00, OtherTotalCost: 0.00 };

    technicianInputItems: IGrid = { dataKey: "Id", allowAdd: false, allowEdit: true, allowSort: false };
    partsInputItems: IGrid = { dataKey: "Id", sortDir: "ASC", allowAdd: false, allowEdit: true, allowSort: false };
    toolsInputItems: IGrid = { dataKey: "Id", allowAdd: false, allowEdit: true, allowSort: false };
    otherCostInputItems: IGrid = { dataKey: "Id", allowAdd: false, allowEdit: true, allowSort: false };

    workFlowEntityCategoryId: number;
    workFlowEntityIds: any;
    workFlowEntityReportFieldIdValues: ReportFieldIdValues[] = [];

    slidewidth: number = 250;
    position: string = "top-right";
    showSlide: boolean = false;

    constructor(private notificationService: NotificationService, private workOrderService: WorkOrdereService, private generalFunctions: GeneralFunctions) { }

    ngOnInit() {
        this.workFlowEntityReportFieldIdValues = JSON.parse(this.getWorkFlowEntityReportFieldIdValues(5859));
        this.labelName = this.workFlowEntityCategoryId == 3 ? "Work Order Number: " : "Request Number: ";
    }

    /**************************************************
     * Data Load Events
     * 
     **************************************************/

    public loadTechnicianData() {
        var contextObj = this;
        contextObj.workOrderService.getReviewTechnicianData(contextObj.getWorkFlowEntityReportFieldIdValues(7502)).subscribe(function (result) {
            contextObj.technicianListTotalItems = result["Data"].DataCount;
            if (contextObj.technicianListTotalItems > 0) {
                contextObj.technicianListSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.technicianEnableMenu = [1, 2];
            } else {
                contextObj.technicianListSource = [];
                contextObj.technicianEnableMenu = [1];
            }
            contextObj.onTechnicianCostUpdate(null);
        });
    }

    public loadPartsData() {
        var contextObj = this;
        contextObj.workOrderService.getReviewPartsData(contextObj.getWorkFlowEntityReportFieldIdValues(7498)).subscribe(function (result) {
            contextObj.partsListTotalItems = result["Data"].DataCount;
            if (contextObj.partsListTotalItems > 0) {
                contextObj.partsListSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.partsEnableMenu = [1, 2];
            } else {
                contextObj.partsListSource = [];
                contextObj.partsEnableMenu = [1];
            }
            contextObj.onPartsCostUpdate(null);
        });
    }

    public loadToolsData() {
        var contextObj = this;
        contextObj.workOrderService.getReviewToolsData(contextObj.getWorkFlowEntityReportFieldIdValues(7506)).subscribe(function (result) {
            contextObj.toolsListTotalItems = result["Data"].DataCount;
            if (contextObj.toolsListTotalItems > 0) {
                contextObj.toolsListSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.toolsEnableMenu = [1, 2];
            } else {
                contextObj.toolsListSource = [];
                contextObj.toolsEnableMenu = [1];
            }
            contextObj.onToolsCostUpdate(null);
        });
    }

    public loadOtherCostsData() {
        var contextObj = this;
        contextObj.workOrderService.getReviewOtherCostData(contextObj.getWorkFlowEntityReportFieldIdValues(7486)).subscribe(function (result) {
            contextObj.otherCostListTotalItems = result["Data"].DataCount;
            if (contextObj.otherCostListTotalItems > 0) {
                contextObj.otherCostListSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.otherCostEnableMenu = [1, 2];
            } else {
                contextObj.otherCostListSource = [];
                contextObj.otherCostEnableMenu = [1];
            }
            contextObj.onOtherCostUpdate(null);
        });
    }

    /**************************************************
     * Item Source Updates
     * 
     **************************************************/

    public onTechnicianListSourceUpdated(event) {
        this.technicianListSource = event.itemSource;
        this.technicianListItemsPerPage = event.rowsPerPage;
        this.technicianListTotalItems = event.totalItems;
        this.technicianFieldObject = event.fieldObject;
        this.onTechnicianCostUpdate(null);
    }

    public onToolsListSourceUpdated(event) {
        this.toolsListSource = event.itemSource;
        this.toolsListItemsPerPage = event.rowsPerPage;
        this.toolsListTotalItems = event.totalItems;
        this.toolsFieldObject = event.fieldObject;
        this.onToolsCostUpdate(null);
    }

    public onPartsListSourceUpdated(event) {
        this.partsListSource = event.itemSource;
        this.partsListItemsPerPage = event.rowsPerPage;
        this.partsListTotalItems = event.totalItems;
        this.partsFieldObject = event.fieldObject;
        this.onPartsCostUpdate(null);
    }

    public onOtherCostListSourceUpdated(event) {
        this.otherCostListSource = event.itemSource;
        this.otherCostListItemsPerPage = event.rowsPerPage;
        this.otherCostListTotalItems = event.totalItems;
        this.otherCostFieldObject = event.fieldObject;
        this.onOtherCostUpdate(null);
    }

    public getWorkFlowEntityReportFieldIdValues(reportFieldId) {
        var tempArray: ReportFieldIdValues[] = [];
        for (var item of this.workFlowEntityIds) {
            tempArray.push({
                ReportFieldId: reportFieldId,
                Value: item
            })
        }
        return JSON.stringify(tempArray);
    }

    /**************************************************
     * Individual Total Cost Calculations
     * 
     **************************************************/

    public onTechnicianCostUpdate(event) {
        
        this.totalCostItems.TechnicianTotalCost = 0.00
        debugger;
        for (var item of this.technicianListSource) {
            if (item["Time Spent (Hours)"] == "") {
                item["Time Spent (Hours)"] = "0.00";
            } else if (!isNaN(Number(item["Time Spent (Hours)"]))) {  /*If integer, number is fixed to 2 decimal points.... else 8 decimal points*/
                item["Time Spent (Hours)"] = Number.isInteger(parseFloat(item["Time Spent (Hours)"])) ? parseFloat(item["Time Spent (Hours)"]).toFixed(2).toString() : (parseFloat(item["Time Spent (Hours)"])).toString();
                this.totalCostItems.TechnicianTotalCost += parseFloat(item["Rate/Hr."]) * parseFloat(item["Time Spent (Hours)"]);
            }  
        }
        this.totalCostItems.TechnicianTotalCost = parseFloat(this.totalCostItems.TechnicianTotalCost.toFixed(2));
    }

    public onPartsCostUpdate(event) {
        this.totalCostItems.PartsTotalCost = 0.00;
        for (var item of this.partsListSource) {
            if (!isNaN(parseInt(item["Quantity"]))) {
                this.totalCostItems.PartsTotalCost += parseFloat(item["Cost/Unit"]) * parseFloat(item["Quantity"]);
            } else if (item["Quantity"] == ""){
                item["Quantity"] = "0";
            }
        }
        this.totalCostItems.PartsTotalCost = parseFloat(this.totalCostItems.PartsTotalCost.toFixed(2));
    }

    public onToolsCostUpdate(event) {
        this.totalCostItems.ToolsTotalCost = 0.00;
        for (var item of this.toolsListSource) {
            if (item["Hours Used"] == "") {
                item["Hours Used"] = "0.00";
            } else if (!isNaN(Number(item["Hours Used"]))) {
                item["Hours Used"] = Number.isInteger(parseFloat(item["Hours Used"])) ? parseFloat(item["Hours Used"]).toFixed(2).toString() : (parseFloat(item["Hours Used"])).toString();
                this.totalCostItems.ToolsTotalCost += parseFloat(item["Rate/Hr."]) * parseFloat(item["Hours Used"]);
            } 
        }
        this.totalCostItems.ToolsTotalCost = parseFloat(this.totalCostItems.ToolsTotalCost.toFixed(2));
    }

    public onOtherCostUpdate(event) {
        this.totalCostItems.OtherTotalCost = 0.00;
        for (var item of this.otherCostListSource) {
            if (item["Other Cost"] == "") {
                item["Other Cost"] = "0.00";
            } else if (!isNaN(Number(item["Other Cost"]))) {
                item["Other Cost"] = Number.isInteger(parseFloat(item["Other Cost"])) ? parseFloat(item["Other Cost"]).toFixed(2).toString() : (parseFloat(item["Other Cost"])).toString();
                this.totalCostItems.OtherTotalCost += parseFloat(item["Other Cost"]);
            }  
        }
        this.totalCostItems.OtherTotalCost = parseFloat(this.totalCostItems.OtherTotalCost.toFixed(2));
    }

    /**************************************************
     * Individual Add Events
     * 
     **************************************************/
    public onTechnicianAdd(event) {
        var contextObj = this;
        var costData: CostDataInput[] = [];
        costData.push({
            CostTypeId: 3,
            WFReportFieldIdValues: event
        });

        var costSubmitOutput: ReviewCostOutPut = {
            WFEntityCostInput: {
                FormId: 254, ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues, ListOtherCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: null, ListToolsCostReportFieldIdValues: null, ListTechniciansCostReportFieldIdValues: costData
            }
        };

        contextObj.workOrderService.submitReviewIndividualCostData(JSON.stringify(costSubmitOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempArray: any[] = JSON.parse(resultData["Data"]["Data"][0])
                    var updatedData = new Array();/*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.technicianListSource);
                    for (var item of tempArray) {
                        updatedData.push(item);
                    }
                    contextObj.technicianListSource = [];
                    contextObj.technicianListSource = updatedData;
                    contextObj.technicianEnableMenu = contextObj.technicianListSource.length == 0 ? [1] : [1, 2];
                    contextObj.notificationService.ShowToaster("Technician(s) added", 3);
                    break;
                default:
                    break;
            }
        });
    }

    public onToolsAdd(event) {
        var contextObj = this;
        var costData: CostDataInput[] = [];
        costData.push({
            CostTypeId: 4,
            WFReportFieldIdValues: event
        });

        var costSubmitOutput: ReviewCostOutPut = {
            WFEntityCostInput: {
                FormId: 257, ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues, ListOtherCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: null, ListToolsCostReportFieldIdValues: costData, ListTechniciansCostReportFieldIdValues: null
            }
        };

        contextObj.workOrderService.submitReviewIndividualCostData(JSON.stringify(costSubmitOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempArray: any[] = JSON.parse(resultData["Data"]["Data"][0])
                    var updatedData = new Array();/*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.toolsListSource);
                    for (var item of tempArray) {
                        updatedData.push(item);
                    }
                    contextObj.toolsListSource = [];
                    contextObj.toolsListSource = updatedData;
                    contextObj.toolsEnableMenu = contextObj.toolsListSource.length == 0 ? [1] : [1, 2];
                    contextObj.notificationService.ShowToaster("Tool(s) added", 3);
                    break;
                default:
                    break;
            }
        });
    }

    public onPartsAdd(event) {
        var contextObj = this;
        var costData: CostDataInput[] = [];
        costData.push({
            CostTypeId: 2,
            WFReportFieldIdValues: event
        });

        var costSubmitOutput: ReviewCostOutPut = {
            WFEntityCostInput: {
                FormId: 256, ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues, ListOtherCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: costData, ListToolsCostReportFieldIdValues: null, ListTechniciansCostReportFieldIdValues: null
            }
        };

        contextObj.workOrderService.submitReviewIndividualCostData(JSON.stringify(costSubmitOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempArray: any[] = JSON.parse(resultData["Data"]["Data"][0])
                    var updatedData = new Array();/*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.partsListSource);
                    for (var item of tempArray) {
                        updatedData.push(item);
                    }
                    contextObj.partsListSource = [];
                    contextObj.partsListSource = updatedData;
                    contextObj.partsEnableMenu = contextObj.partsListSource.length == 0 ? [1] : [1, 2];
                    contextObj.notificationService.ShowToaster("Part(s) added", 3);
                    break;
                default:
                    break;
            }
        });
    }

    public onOtherCostAdd(event) {
        var contextObj = this;
        var costData: CostDataInput[] = [];
        costData.push({
            CostTypeId: 1,
            WFReportFieldIdValues: event
        });

        var costSubmitOutput: ReviewCostOutPut = {
            WFEntityCostInput: {
                FormId: 259, ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues, ListOtherCostReportFieldIdValues: costData,
                ListPartsCostReportFieldIdValues: null, ListToolsCostReportFieldIdValues: null, ListTechniciansCostReportFieldIdValues: null
            }
        };

        contextObj.workOrderService.submitReviewIndividualCostData(JSON.stringify(costSubmitOutput)).subscribe(function (resultData) {
            
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var tempArray: any[] = JSON.parse(resultData["Data"]["Data"][0])
                    var updatedData = new Array();/*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.otherCostListSource);
                    for (var item of tempArray) {
                        updatedData.push(item);
                    }
                    contextObj.otherCostListSource = [];
                    contextObj.otherCostListSource = updatedData;
                    contextObj.otherCostEnableMenu = contextObj.otherCostListSource.length == 0 ? [1] : [1, 2];
                    contextObj.notificationService.ShowToaster("Other Cost added", 3);
                    break;
                default:
                    break;
            }
        });
    }

    /**************************************************
     * Final Submit Event
     * 
     **************************************************/

    public onSubmit() {
        var contextObj = this;
        debugger;
        setTimeout(function () {
            if (contextObj.hasAnyValidationError()) return;

            var reviewCostOutput: ReviewCostOutPut = {
                WFEntityCostInput: {
                    FormId: 249,
                    ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                    ListTechniciansCostReportFieldIdValues: contextObj.getFinalTechnicianCostData(),
                    ListPartsCostReportFieldIdValues: contextObj.getFinalPartsCostData(),
                    ListToolsCostReportFieldIdValues: contextObj.getFinalToolsCostData(),
                    ListOtherCostReportFieldIdValues: contextObj.getFinalOtherCostData()
                }
            }
            contextObj.workOrderService.submitReviewMultipleCostData(JSON.stringify(reviewCostOutput), contextObj.workFlowEntityIds).subscribe(function (resultData) {
                console.log(resultData);
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Cost details updated", 3);
                        contextObj.onCostSubmit.emit(contextObj.totalCostItems);
                        break;
                    default:
                        break;
                }
            });
        }, 100);
        
    }

    public hasAnyValidationError() {
        var timeSpent = this.technicianFieldObject.find(function (item) { return item.ReportFieldId === 7521 })
        if (timeSpent && timeSpent.HasValidationError) {
            return true;
        }
        var quantity = this.partsFieldObject.find(function (item) { return item.ReportFieldId === 12046 })
        if (quantity && quantity.HasValidationError) {
            return true;
        }
        var hoursUsed = this.toolsFieldObject.find(function (item) { return item.ReportFieldId === 1390 })
        if (hoursUsed && hoursUsed.HasValidationError) {
            return true;
        }
        var otherCost = this.otherCostFieldObject.find(function (item) { return item.ReportFieldId === 7488 })
        if (otherCost && otherCost.HasValidationError) {
            return true;
        }
        return false;
    }

     /**************************************************
     * Getting Individual Cost Data For Final
     * Submission
     **************************************************/

    public getFinalTechnicianCostData() {
        var returnData: CostDataInput[] = [];
        for (var item of this.technicianListSource) {
            returnData.push({ CostTypeId: 3, WFReportFieldIdValues: [{ ReportFieldId: 1383, Value: item.Id }, { ReportFieldId: 7521, Value: item["Time Spent (Hours)"] }] });
        }
        return returnData;
    }

    public getFinalPartsCostData() {
        var returnData: CostDataInput[] = [];
        for (var item of this.partsListSource) {
            returnData.push({ CostTypeId: 2, WFReportFieldIdValues: [{ ReportFieldId: 1378, Value: item.Id }, { ReportFieldId: 12046, Value: item["Quantity"] }] });
        }
        return returnData;
    }

    public getFinalToolsCostData() {
        var returnData: CostDataInput[] = [];
        for (var item of this.toolsListSource) {
            returnData.push({ CostTypeId: 4, WFReportFieldIdValues: [{ ReportFieldId: 1389, Value: item.Id }, { ReportFieldId: 1390, Value: item["Hours Used"] }] });
        }
        return returnData;
    }

    public getFinalOtherCostData() {
        var returnData: CostDataInput[] = [];
        for (var item of this.otherCostListSource) {
            returnData.push({ CostTypeId: 1, WFReportFieldIdValues: [{ ReportFieldId: 7487, Value: item["Cost Item"] }, { ReportFieldId: 7488, Value: item["Other Cost"] }] })
        }
        return returnData;
    }

    /**************************************************
    * Individual Delete Events
    * 
    **************************************************/

    public onTechnicianCostDelete(event: number[]) {
        var contextObj = this;
        var reviewCostOutput: ReviewCostOutPut = {
            WFEntityCostInput: {
                FormId: 249,
                ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                ListTechniciansCostReportFieldIdValues: contextObj.getDeleteTechnicianCostData(event),
                ListPartsCostReportFieldIdValues: null,
                ListToolsCostReportFieldIdValues: null,
                ListOtherCostReportFieldIdValues: null
            }
        }
        contextObj.workOrderService.deleteReviewCostData(JSON.stringify(reviewCostOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Selected Cost deleted", 3);
                    contextObj.technicianListSource = contextObj.technicianListSource.filter(function (item) { return event.indexOf(item.Id) == -1 });
                    contextObj.onTechnicianCostUpdate(null);
                    contextObj.technicianEnableMenu = contextObj.technicianListSource.length == 0 ? [1] : [1, 2];
                    break;
                default:
                    break;
            }
        });
    }

    public onPartsCostDelete(event) {
        
        var contextObj = this;
        var reviewCostOutput: ReviewCostOutPut = {
            WFEntityCostInput: {
                FormId: 250,
                ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                ListTechniciansCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: contextObj.getDeletePartsCostData(event),
                ListToolsCostReportFieldIdValues: null,
                ListOtherCostReportFieldIdValues: null
            }
        }
        contextObj.workOrderService.deleteReviewCostData(JSON.stringify(reviewCostOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Selected Cost deleted", 3);
                    contextObj.partsListSource = contextObj.partsListSource.filter(function (item) { return event.indexOf(item.Id) == -1 });
                    contextObj.onPartsCostUpdate(null);
                    contextObj.partsEnableMenu = contextObj.partsListSource.length == 0 ? [1] : [1, 2];
                    break;
                default:
                    break;
            }
        });
    }

    public onToolsCostDelete(event) {
        
        var contextObj = this;
        var reviewCostOutput: ReviewCostOutPut = {
            WFEntityCostInput: {
                FormId: 251,
                ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                ListTechniciansCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: null,
                ListToolsCostReportFieldIdValues: contextObj.getDeleteToolsCostData(event),
                ListOtherCostReportFieldIdValues: null
            }
        }
        contextObj.workOrderService.deleteReviewCostData(JSON.stringify(reviewCostOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Selected Cost deleted", 3);
                    contextObj.toolsListSource = contextObj.toolsListSource.filter(function (item) { return event.indexOf(item.Id) == -1 });
                    contextObj.onToolsCostUpdate(null);
                    contextObj.toolsEnableMenu = contextObj.toolsListSource.length == 0 ? [1] : [1, 2];
                    break;
                default:
                    break;
            }
        });
    }

    public onOthersCostDelete(event) {
        
        var contextObj = this;
        var reviewCostOutput: ReviewCostOutPut = {
            WFEntityCostInput: {
                FormId: 252,
                ListWorkflowEntityReportFieldIdValues: contextObj.workFlowEntityReportFieldIdValues,
                ListTechniciansCostReportFieldIdValues: null,
                ListPartsCostReportFieldIdValues: null,
                ListToolsCostReportFieldIdValues: null,
                ListOtherCostReportFieldIdValues: contextObj.getDeleteOtherCostData(event)
            }
        }
        contextObj.workOrderService.deleteReviewCostData(JSON.stringify(reviewCostOutput)).subscribe(function (resultData) {
            console.log(resultData);
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Selected Cost deleted", 3);
                    contextObj.otherCostListSource = contextObj.otherCostListSource.filter(function (item) { return event.indexOf(item.Id) == -1 });
                    contextObj.onOtherCostUpdate(null);
                    contextObj.otherCostEnableMenu = contextObj.otherCostListSource.length == 0 ? [1] : [1, 2];
                    break;
                default:
                    break;
            }
        });
    }

    /**************************************************
     * Getting Individual Cost Data For Delete
     *
     **************************************************/

    public getDeleteTechnicianCostData(selectedIds: number[]) {
        var returnData: CostDataInput[] = [];
        for (var id of selectedIds) {
            returnData.push({ CostTypeId: 3, WFReportFieldIdValues: [{ ReportFieldId: 1383, Value: id }] });
        }
        return returnData;
    }

    public getDeletePartsCostData(selectedIds: number[]) {
        var returnData: CostDataInput[] = [];
        for (var id of selectedIds) {
            returnData.push({ CostTypeId: 2, WFReportFieldIdValues: [{ ReportFieldId: 1378, Value: id }] });
        }
        return returnData;
    }

    public getDeleteToolsCostData(selectedIds: number[]) {
        var returnData: CostDataInput[] = [];
        for (var id of selectedIds) {
            returnData.push({ CostTypeId: 4, WFReportFieldIdValues: [{ ReportFieldId: 1389, Value: id }] });
        }
        return returnData;
    }

    public getDeleteOtherCostData(selectedIds: number[]) {
        var returnData: CostDataInput[] = [];
        for (var id of selectedIds) {
            var otherCostItem = this.otherCostListSource.find(function (item) { return item.Id === id });
            returnData.push({ CostTypeId: 1, WFReportFieldIdValues: [{ ReportFieldId: 7487, Value: otherCostItem["Cost Item"] }] })
        }
        return returnData;
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

interface ReviewCostOutPut {
    WFEntityCostInput: CostEntityInput
}

interface CostEntityInput {
    FormId: number,
    ListWorkflowEntityReportFieldIdValues: ReportFieldIdValues[],
    ListPartsCostReportFieldIdValues: CostDataInput[],
    ListTechniciansCostReportFieldIdValues: CostDataInput[],
    ListToolsCostReportFieldIdValues: CostDataInput[],
    ListOtherCostReportFieldIdValues: CostDataInput[]
}

interface CostDataInput {
    CostTypeId: number
    WFReportFieldIdValues: ReportFieldIdValues[]
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


