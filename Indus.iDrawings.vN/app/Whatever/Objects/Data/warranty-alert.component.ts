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
import { ObjectsService } from '../../../Models/Objects/objects.service'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';



@Component({
    selector: 'warranty-alert',
    templateUrl: './app/Views/Objects/Data/warranty-alert.component.html',
    directives: [SectionComponent, DropDownListComponent, Notification, GridComponent, ListBoxComponent, PagingComponent],
    providers: [WorkOrdereService, ObjectsService, NotificationService, GeneralFunctions],
    inputs: ['objectId','warrantyNotificationDate']
})

export class WarrantyAlert {

    ddlEmailRecipientNotificationTemplate: IField;
    btnEnable: boolean = true;
    sectionExpansionStatus = [{ "title": "iDrawings Users", "isExpanded": false }, { "title": "Contacts", "isExpanded": false }];
    objectId: any;
    warrantyNotificationDate: any;
    sectionEnable: number = -1;
    fieldObjectiDrawingsUser: IField[];
    itemsSourceiDrawingsUser: any[];
    inputItemsiDrawingsUser: IGrid = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
    totalItemsiDrawingsUser: number = 0;
    itemsPerPageiDrawingsUser: number = 0;
    pageIndexiDrawingsUser: number = 0;
    fieldObjectContacts: IField[];
    itemsSourceContacts: any[];
    inputItemsContacts: IGrid = { dataKey: "Id", sortCol: "", sortDir: "ASC", allowAdd: false, isHeaderCheckBx: true };
    totalItemsContacts: number = 0;
    itemsPerPageContacts: number = 0;
    pageIndexContacts: number = 0;
    actionPointUserId: string = "-1";
    @Output() generateSuccess = new EventEmitter();
    messageTemplateId: number = 0;

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

        if (obj[1].title == "iDrawings Users") {
            if (this.itemsSourceiDrawingsUser == undefined || this.itemsSourceiDrawingsUser == null || this.itemsSourceiDrawingsUser.length == 0)
                this.loadiDrawingsUsers();
        }
        else if (obj[1].title == "Contacts") {
            if (this.itemsSourceContacts == undefined || this.itemsSourceContacts == null || this.itemsSourceContacts.length == 0)
                this.loadContacts();
        }

    };

    constructor(private workOrderService: WorkOrdereService, private objectsService: ObjectsService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
        var contextObj = this;
        debugger
        var rptFieldArray = new Array<ReportFieldArray>();
        rptFieldArray.push({
            ReportFieldId: 5472,
            Value: "24"
        });

        var lookupRptFieldArray = new Array<LookupReportFieldArray>();
        lookupRptFieldArray.push({
            FieldId: 1505,
            ReportFieldId: 5472,
            Value: "24"
        });

        this.objectsService.getEmailRecipientField(JSON.stringify(lookupRptFieldArray)).subscribe(function (resultData) {
            var data = resultData["Data"];
            resultData["Data"][0].IsMandatory = true;
            contextObj.ddlEmailRecipientNotificationTemplate = resultData["Data"].splice(0, 1)[0];
            contextObj.loadiDrawingsUsers();
            contextObj.loadContacts();
        });

    }

    public loadiDrawingsUsers() {

        var contextObj = this;
        let rptField = [448, 447];
        let count = rptField.length;
        this.objectsService.getIdrawingsUsersFields().subscribe(function (resultData) {
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
        this.objectsService.getIdrawingsUserstData(this.objectId, contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {

            contextObj.totalItemsiDrawingsUser = resultData["Data"].DataCount;
            if (contextObj.totalItemsiDrawingsUser > 0) {
                contextObj.itemsSourceiDrawingsUser = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageiDrawingsUser = resultData["Data"].RowsPerPage;
                //contextObj.btnEnable = true;
            }
            else {
                contextObj.notificationService.ShowToaster("No Users exist", 2);
            }
        });
    }

    public loadContacts() {

        var contextObj = this;
        let rptField = [1305, 1315];
        let count = rptField.length;
        this.objectsService.getContactsListFields().subscribe(function (resultData) {
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
            contextObj.fieldObjectContacts = (resultData["Data"]);


        });
        this.objectsService.getContactsListtData(this.objectId, contextObj.pageIndexContacts, contextObj.inputItemsContacts.sortCol, contextObj.inputItemsContacts.sortDir).subscribe(function (resultData) {

            contextObj.totalItemsContacts = resultData["Data"].DataCount;
            if (contextObj.totalItemsContacts > 0) {
                contextObj.itemsSourceContacts = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPageContacts = resultData["Data"].RowsPerPage;
                //contextObj.btnEnable = true;
            }
            else {
                contextObj.notificationService.ShowToaster("No Contacts exist", 2);

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
        var contextObj = this;
        var arr = new Array<ReportFieldArray>();
        if (this.messageTemplateId > 0) { //...........if no template exit no need to take users....
            //..............iDrawingsUser
            this.inputItemsiDrawingsUser.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceiDrawingsUser != undefined) {
                for (let i = 0; i < this.itemsSourceiDrawingsUser.length; i++) {
                    if (this.itemsSourceiDrawingsUser[i]["Select All"] == true) {
                        this.inputItemsiDrawingsUser.selectedIds.push(this.itemsSourceiDrawingsUser[i]["Id"]);
                        arr.push({ ReportFieldId: 12306, Value: this.itemsSourceiDrawingsUser[i]["Id"] });
                    }
                }
            }
            //..................Contacts
            this.inputItemsContacts.selectedIds = [];
            var arrayList = new Array();
            if (this.itemsSourceContacts != undefined) {
                for (let i = 0; i < this.itemsSourceContacts.length; i++) {
                    if (this.itemsSourceContacts[i]["Select All"] == true) {
                        this.inputItemsContacts.selectedIds.push(this.itemsSourceContacts[i]["Id"]);
                        arr.push({ ReportFieldId: 12308, Value: this.itemsSourceContacts[i]["Id"] });
                    }
                }
            }
        }
        
        arr.push({ ReportFieldId: 12302, Value: this.objectId });
        arr.push({ ReportFieldId: 12303, Value: this.messageTemplateId.toString() });
        arr.push({ ReportFieldId: 12304, Value: this.warrantyNotificationDate });
        var strRptFields = JSON.stringify(arr);

        if (this.messageTemplateId > 0 && this.inputItemsiDrawingsUser.selectedIds.length == 0 && this.inputItemsContacts.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select at least one User", 2);
            return;
        }
        if (this.messageTemplateId > 0) {
            this.objectsService.updateWarrantyAlert(strRptFields).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.generateSuccess.emit({ returnData: "success" });
                    contextObj.notificationService.ShowToaster("Alert updated", 3);
                }
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Select a Notification Template", 2);
        }
        
    }

    public onSortiDrawingsUser(objGrid: any) {
        var contextObj = this;
        this.objectsService.getIdrawingsUserstData(this.objectId,contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {

            contextObj.totalItemsiDrawingsUser = resultData["Data"].DataCount;
            contextObj.itemsSourceiDrawingsUser = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageiDrawingsUser = resultData["Data"].RowsPerPage;

        });
    }

    public onSortContacts(objGrid: any) {
        var contextObj = this;
        this.objectsService.getContactsListtData(this.objectId,contextObj.pageIndexContacts, contextObj.inputItemsContacts.sortCol, contextObj.inputItemsContacts.sortDir).subscribe(function (resultData) {

            contextObj.totalItemsContacts = resultData["Data"].DataCount;
            contextObj.itemsSourceContacts = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageContacts = resultData["Data"].RowsPerPage;

        });
    }

    public iDrawingpageChanged(event: any) {
        var contextObj = this;
        contextObj.pageIndexiDrawingsUser = event.pageEvent.page;
        this.objectsService.getIdrawingsUserstData(this.objectId,contextObj.pageIndexiDrawingsUser, contextObj.inputItemsiDrawingsUser.sortCol, contextObj.inputItemsiDrawingsUser.sortDir).subscribe(function (resultData) {

            contextObj.totalItemsiDrawingsUser = resultData["Data"].DataCount;
            contextObj.itemsSourceiDrawingsUser = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageiDrawingsUser = resultData["Data"].RowsPerPage;

        });
    }
    public contactpageChanged(event: any) {
        var contextObj = this;
        contextObj.pageIndexContacts = event.pageEvent.page;
        this.objectsService.getContactsListtData(this.objectId,contextObj.pageIndexContacts, contextObj.inputItemsContacts.sortCol, contextObj.inputItemsContacts.sortDir).subscribe(function (resultData) {

            contextObj.totalItemsContacts = resultData["Data"].DataCount;
            contextObj.itemsSourceContacts = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPageContacts = resultData["Data"].RowsPerPage;

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




