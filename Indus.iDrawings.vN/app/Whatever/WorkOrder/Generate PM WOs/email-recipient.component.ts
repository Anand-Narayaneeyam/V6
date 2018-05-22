import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../Models/Common/General';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { ListBoxComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/listboxcomponent.component';





@Component({
    selector: 'email-recipient',
    templateUrl: './app/Views/WorkOrder/Generate PM WOs/email-recipient.component.html',
    directives: [SectionComponent, DropDownListComponent, Notification, GridComponent, ListBoxComponent],
    providers: [WorkOrdereService, NotificationService, GeneralFunctions],
    inputs: ['workTypeId', 'gridDetails','siteId']
})

export class EmailRecipient {

    ddlEmailRecipientActionPointUser: IField;
    ddlEmailRecipientNotificationTemplate: IField;
    btnEnable: boolean = false;
    actionPointUserNumber: boolean = false;
    sectionExpansionStatus = [{ "title": "iDrawings Users", "isExpanded": false }, { "title": "Contractors", "isExpanded": false }, { "title": "Technicians", "isExpanded": false }];
    workTypeId: any;
    gridDetails: any;
    sectionEnable: number = -1;
    fieldObjectiDrawingsUser: IField[];
    itemsSourceiDrawingsUser: any[];
    inputItemsiDrawingsUser: IGrid = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
    totalItemsiDrawingsUser: number = 0;
    itemsPerPageiDrawingsUser: number = 0;
    pageIndexiDrawingsUser: number = 0;
    fieldObjectContractors: IField[];
    itemsSourceContractors: any[];
    inputItemsContractors: IGrid = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
    totalItemsContractors: number = 0;
    itemsPerPageContractors: number = 0;
    pageIndexContractors: number = 0;
    fieldObjectTechnicians: IField[];
    itemsSourceTechnicians: any[];
    inputItemsTechnicians: IGrid = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
    totalItemsTechnicians: number = 0;
    itemsPerPageTechnicians: number = 0;
    pageIndexTechnicians: number = 0;
    actionPointUserId: string = "-1";
    @Output() generateSuccess = new EventEmitter();
    messageTemplateId: number = 0;
    siteId;

    onSectionExpandChange(obj) {
        for (var i = 0; i < this.sectionExpansionStatus.length; i++) {
            if (this.sectionExpansionStatus[i].title !== obj[1].title) {
                this.sectionExpansionStatus[i].isExpanded = false;
            } else {
                this.sectionExpansionStatus[i].isExpanded = true;
            }
        }
        var updatedData = new Array();/*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.sectionExpansionStatus);
        this.sectionExpansionStatus = updatedData;

        if (obj[1].title == "iDrawings Users")
        {
            if (this.itemsSourceiDrawingsUser == undefined || this.itemsSourceiDrawingsUser == null || this.itemsSourceiDrawingsUser.length == 0)
                this.loadiDrawingsUsers();
        }
        else if (obj[1].title == "Contractors")
        {
            if (this.itemsSourceContractors == undefined || this.itemsSourceContractors == null || this.itemsSourceContractors.length == 0)
                this.loadContractors();
        }           
        else if (obj[1].title == "Technicians")
        {
            if (this.itemsSourceTechnicians == undefined || this.itemsSourceTechnicians == null || this.itemsSourceTechnicians.length == 0)
                this.loadTechnicians();
        }
                 
    };

    constructor(private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
        var contextObj = this;
        var rptFieldArray = new Array<ReportFieldArray>();
        rptFieldArray.push({
            ReportFieldId: 1419,
            Value: "0"
        });
        rptFieldArray.push({
            ReportFieldId: 271,
            Value: "9"
        });
        rptFieldArray.push({
            ReportFieldId: 5873,
            Value: this.workTypeId
        });
        rptFieldArray.push({
            ReportFieldId: 6573,
            Value: "3"
        });
        rptFieldArray.push({
            ReportFieldId: 5472,
            Value: "7"
        });

        var lookupRptFieldArray = new Array<LookupReportFieldArray>();
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 1419,
            Value: "0"
        });
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 271,
            Value: "9"
        });
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 5873,
            Value: this.workTypeId
        });
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 6573,
            Value: "3"
        });
        lookupRptFieldArray.push({
            FieldId: 1504,
            ReportFieldId: 12449,
            Value: this.siteId.toString()
        });
        lookupRptFieldArray.push({
            FieldId: 1505,
            ReportFieldId: 5472,
            Value: "7"
        });

        /* this.workOrderService.getEmailRecipientField(0, 9, this.workTypeId,3,0).subscribe(function (resultData) { */
        this.workOrderService.getEmailRecipientField(JSON.stringify(lookupRptFieldArray)).subscribe(function (resultData) {
            
            var data = resultData["Data"];
            contextObj.ddlEmailRecipientActionPointUser = resultData["Data"].splice(0, 1)[0];
            /*var tempArray = [];
            for (let i = 0; i < contextObj.ddlEmailRecipientActionPointUser.LookupDetails.LookupValues.length; i++) {
                tempArray.push(contextObj.ddlEmailRecipientActionPointUser.LookupDetails.LookupValues[i]);
            }
            contextObj.ddlEmailRecipientActionPointUser.MultiFieldValues = tempArray; */
            if (contextObj.ddlEmailRecipientActionPointUser.LookupDetails.LookupValues.length == 0) {
                contextObj.ddlEmailRecipientActionPointUser.IsEnabled = false;
                contextObj.ddlEmailRecipientActionPointUser.IsMandatory = false;
                contextObj.ddlEmailRecipientActionPointUser.IsVisible = false;
                contextObj.actionPointUserNumber = false;
            }
            else
                contextObj.actionPointUserNumber = true;
            contextObj.ddlEmailRecipientNotificationTemplate = resultData["Data"].splice(0, 1)[0];
     

        });


        /*this.loadiDrawingsUsers();
        this.loadContractors();
        this.loadTechnicians(); */
    }

    public loadiDrawingsUsers() {
        
        var contextObj = this;
        let rptField = [448, 447];
        let count = rptField.length;
        this.workOrderService.getGenerateWorkOrderIdrawingsUsersFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            contextObj.fieldObjectiDrawingsUser = (resultData["Data"]);


        });
        this.workOrderService.getGenerateWorkOrderIdrawingsUserstData(contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {
            
            contextObj.totalItemsiDrawingsUser = resultData["Data"].DataCount;
            if (contextObj.totalItemsiDrawingsUser > 0) {
                contextObj.itemsSourceiDrawingsUser = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageiDrawingsUser = resultData["Data"].RowsPerPage;               
            }
            else {
                contextObj.notificationService.ShowToaster("No Users exist", 2);
            }
        });
    }

    public loadContractors() {
        
        var contextObj = this;
        let rptField = [1305, 1315];
        let count = rptField.length;
        this.workOrderService.getGenerateWorkOrdercontractorsListFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            contextObj.fieldObjectContractors = (resultData["Data"]);


        });
        this.workOrderService.getGenerateWorkOrdercontractorsListtData(contextObj.pageIndexContractors, contextObj.inputItemsContractors.sortCol, contextObj.inputItemsContractors.sortDir).subscribe(function (resultData) {
            
            contextObj.totalItemsContractors = resultData["Data"].DataCount;
            if (contextObj.totalItemsContractors > 0) {
                contextObj.itemsSourceContractors = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageContractors = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Contractors exist", 2);
 
            }
        });
    }

    public loadTechnicians() {
        
        var contextObj = this;
        let rptField = [1384, 5386];
        let count = rptField.length;
        this.workOrderService.getGenerateWorkOrdertechniciansListFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
            contextObj.fieldObjectTechnicians = (resultData["Data"]);


        });
        this.workOrderService.getGenerateWorkOrdertechniciansListtData(contextObj.pageIndexTechnicians, contextObj.inputItemsTechnicians.sortCol, contextObj.inputItemsTechnicians.sortDir).subscribe(function (resultData) {
            
            contextObj.totalItemsTechnicians = resultData["Data"].DataCount;
            if (contextObj.totalItemsTechnicians > 0) {
                contextObj.itemsSourceTechnicians = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageTechnicians = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Technicians exist", 2);
            }
        });
    }

    /*onChnageEmailRecipientActionPointUser(event: any) {
        
        this.btnEnable = this.ddlEmailRecipientActionPointUser.HasValidationError;
        this.actionPointUserId = event;
    } */

    onChnageEmailRecipientNotificationTemplate(event: any) {
        this.sectionEnable = Number(event);
        this.messageTemplateId = Number(event);
    }

    selectAllOptions(event: any) {
        /*if (event.fieldObject.MultiFieldValues.length)
            this.btnEnable = false;
        else
            this.btnEnable = true; */
    }
    
    selectAOneOptions(event: any) {
        /*if (event.fieldObject.MultiFieldValues.length)
            this.btnEnable = false;
        else
            this.btnEnable = true; */
    }
    Updateclick() {

        if (this.actionPointUserNumber == true && this.ddlEmailRecipientActionPointUser.MultiFieldValues == null) {
            this.notificationService.ShowToaster("Select at least one Action Point User", 2);
            return;
        }

        var contextObj = this;
        var userDetails: string = "";
        var actionPointUsers = new Array();
        var id = new Array();
        var pmId = new Array();
        var userDetailsString = new Array();

        if (this.messageTemplateId > 0) { //...........if no template exit no need to take users....
            //..............iDrawingsUser
            this.inputItemsiDrawingsUser.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceiDrawingsUser != undefined) {
                for (let i = 0; i < this.itemsSourceiDrawingsUser.length; i++) {
                    if (this.itemsSourceiDrawingsUser[i]["Select All"] == true) {
                        this.inputItemsiDrawingsUser.selectedIds.push(this.itemsSourceiDrawingsUser[i]["Id"]);
                        arrayList[arrayList.length == 0 ? 0 : arrayList.length] = this.itemsSourceiDrawingsUser[i]["Email"]

                    }
                }
                if (this.inputItemsiDrawingsUser.selectedIds.length > 0) {
                    userDetails = JSON.stringify(arrayList);
                }
            }
            //..................Contractors
            this.inputItemsContractors.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceContractors != undefined) {
                for (let i = 0; i < this.itemsSourceContractors.length; i++) {
                    if (this.itemsSourceContractors[i]["Select All"] == true) {
                        this.inputItemsContractors.selectedIds.push(this.itemsSourceContractors[i]["Id"]);
                        arrayList[arrayList.length == 0 ? 0 : arrayList.length] = this.itemsSourceContractors[i]["Email"]

                    }
                }
                if (this.inputItemsContractors.selectedIds.length > 0) {
                    if (userDetails.length > 0 && JSON.stringify(arrayList).length > 0)
                        userDetails = userDetails.substring(0, String(userDetails).length - 1) + "," + JSON.stringify(arrayList).substring(1, JSON.stringify(arrayList).length);
                    else if (JSON.stringify(arrayList).length > 0)
                        userDetails = JSON.stringify(arrayList);
                }
            }
            //...................Technicians
            this.inputItemsTechnicians.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceTechnicians != undefined) {
                for (let i = 0; i < this.itemsSourceTechnicians.length; i++) {
                    if (this.itemsSourceTechnicians[i]["Select All"] == true) {
                        this.inputItemsTechnicians.selectedIds.push(this.itemsSourceTechnicians[i]["Id"]);
                        arrayList[arrayList.length == 0 ? 0 : arrayList.length] = this.itemsSourceTechnicians[i]["Email"]

                    }
                }
                if (this.inputItemsTechnicians.selectedIds.length > 0) {
                    if (userDetails.length > 0 && JSON.stringify(arrayList).length > 0)
                        userDetails = userDetails.substring(0, String(userDetails).length - 1) + "," + JSON.stringify(arrayList).substring(1, JSON.stringify(arrayList).length);
                    else if (JSON.stringify(arrayList).length > 0)
                        userDetails = JSON.stringify(arrayList);
                }
            }
            //...................Technicians
        }

        /*   if (userDetails.length > 0 || this.ddlEmailRecipientActionPointUser.MultiFieldValues != null) { */
        var pageDetails;
        var f: ReportFieldArray[] = JSON.parse(this.gridDetails);
        if (this.ddlEmailRecipientActionPointUser.MultiFieldValues != null) {
            for (var i = 0; i < this.ddlEmailRecipientActionPointUser.MultiFieldValues.length; i++) {
                actionPointUsers[i] = this.ddlEmailRecipientActionPointUser.MultiFieldValues[i];
                f.push({
                    ReportFieldId: 12254,
                    Value: this.ddlEmailRecipientActionPointUser.MultiFieldValues[i]
                });
            }
        }
        f.push({
            ReportFieldId: 5873,
            Value: this.workTypeId
        });
        f.push({
            ReportFieldId: 5827,
            Value: "0"
        });
        pageDetails = JSON.stringify(f);

        this.ddlEmailRecipientActionPointUser.MultiFieldValues;
        if (userDetails.length > 0)
            userDetailsString = JSON.parse(userDetails);
        else
            userDetailsString = [];

        if (this.messageTemplateId > 0 && userDetailsString.length == 0) {
            this.notificationService.ShowToaster("Select Email Recipients", 2);
            return;
        }
            /*this.workOrderService.generateWorkOrderForActionPointUser(this.gridDetails, this.workTypeId, "0", this.actionPointUserId).subscribe(function (resultData) { */
            this.workOrderService.generateWorkOrderForActionPointUser(pageDetails, userDetailsString, this.messageTemplateId).subscribe(function (resultData) {
                

                if (resultData["Data"].Message == "Success") {

                    if (userDetailsString.length > 0)
                        contextObj.notificationService.ShowToaster("Work Order generated and an email has been sent to the Notification Email Recipients", 3);
                    else
                        contextObj.notificationService.ShowToaster("Work order generated", 3);
                    contextObj.generateSuccess.emit({ status: "success" });
                }
                else {
                    contextObj.notificationService.ShowToaster("Work order generated failed", 2);
                    contextObj.generateSuccess.emit({ status: "failed" });
                }
            });
       /* }
        else {
            contextObj.notificationService.ShowToaster("Select either an action point user or technicians", 2);
        } */
    }

    public onSortiDrawingsUser(objGrid: any) {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrderIdrawingsUserstData(contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {

            contextObj.totalItemsiDrawingsUser = resultData["Data"].DataCount;
                contextObj.itemsSourceiDrawingsUser = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageiDrawingsUser = resultData["Data"].RowsPerPage;
                      
        });
    }

    public onSortContractors(objGrid: any) {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrdercontractorsListtData(contextObj.pageIndexContractors, contextObj.inputItemsContractors.sortCol, contextObj.inputItemsContractors.sortDir).subscribe(function (resultData) {

            contextObj.totalItemsContractors = resultData["Data"].DataCount;
                contextObj.itemsSourceContractors = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageContractors = resultData["Data"].RowsPerPage;
     
        });
    }

    public onSortTechnicians(objGrid: any) {
        var contextObj = this;
        this.workOrderService.getGenerateWorkOrdertechniciansListtData(contextObj.pageIndexTechnicians, contextObj.inputItemsTechnicians.sortCol, contextObj.inputItemsTechnicians.sortDir).subscribe(function (resultData) {

            contextObj.totalItemsTechnicians = resultData["Data"].DataCount;
                contextObj.itemsSourceTechnicians = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageTechnicians = resultData["Data"].RowsPerPage;
            
        });
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
export interface LookupReportFieldArray {
    FieldId: number;
    ReportFieldId: number;
    Value: string;
}




