import { Component, Output, EventEmitter, AfterViewInit, OnInit, Input } from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { IField } from '../../../framework/models/interface/ifield';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomCheckBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { WorkFlowService } from '../../../Models/Common/workflow.service';

@Component({
    selector: 'notificationRecipients-checkboxgrid',
    templateUrl: './app/Views/Common/Set Workflow/notificationRecipients-checkboxgrid.html',
    directives: [GridComponent, SubMenu, DropDownListComponent, CustomCheckBoxComponent, PagingComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, NotificationService, GeneralFunctions, WorkFlowService],
    inputs: ['chkBxValuesforRecipients']
})

export class NotificationRecipientsComponent implements OnInit {
    fieldObject: IField[];
    itemsSource: any[];
    arrayList: any;
    chkBxValuesforRecipients: any;
    ddlRecipientType: IField;
    alignContent: string;
    recipientTypeId: any;
    totalItems: number = 0;
    pageIndex: number = 0;
    sortCol: string = "[Name]";
    sortDir: string = "ASC";
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "[Name]", sortDir: "ASC", selectedIds: [], allowAdd: false };

    constructor(private workFlowService: WorkFlowService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.workFlowService.getNotificationRecipientsFields().subscribe(function (resultdata) {
            contextObj.ddlRecipientType = resultdata["Data"].find(function (el) { return el.ReportFieldId === 406; });
            contextObj.inputItems.isHeaderCheckBx = true;
            var removeArr = [406];
            contextObj.fieldObject = resultdata["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            }) 
            contextObj.ddlRecipientType.FieldValue = contextObj.ddlRecipientType.LookupDetails.LookupValues[0].Id.toString(); 
            contextObj.recipientTypeId = contextObj.ddlRecipientType.FieldValue; 
            contextObj.workFlowService.getNotificationRecipientsList(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.recipientTypeId).subscribe(function (data) {
                contextObj.itemsSource = JSON.parse(data.Data["FieldBinderData"]);
                if (contextObj.chkBxValuesforRecipients != undefined) 
                    contextObj.removeItem();
            });         
        });        
    }

    removeItem() {
        var contextObj = this;
        for (var i = 0; i < contextObj.chkBxValuesforRecipients.length; i++) {
            contextObj.itemsSource = contextObj.itemsSource.filter(function (item) {
                return item.Value != contextObj.chkBxValuesforRecipients[i].CategoryId;
            });
        }
    }

    onChangeRecipientType(event: any) {
        var contextObj = this;
        contextObj.recipientTypeId = event;
        if (contextObj.recipientTypeId == -1) {
            contextObj.itemsSource = [];
            contextObj.inputItems.isHeaderCheckBx = false;
        } else if (contextObj.recipientTypeId >= 1){
            contextObj.inputItems.isHeaderCheckBx = true;
            var fieldEmail = contextObj.fieldObject.find(function (el) { return el.ReportFieldId === 447; });
            fieldEmail.IsVisible = true;
            contextObj.workFlowService.getNotificationRecipientsList(this.pageIndex, this.sortCol, this.sortDir, contextObj.recipientTypeId).subscribe(function (data) {
                contextObj.itemsSource = JSON.parse(data.Data["FieldBinderData"]);
                if (contextObj.chkBxValuesforRecipients != undefined)
                    contextObj.removeItem();
            });
        }
        if (contextObj.recipientTypeId == 2) {            
            var fieldEmail = contextObj.fieldObject.find(function (el) { return el.ReportFieldId === 447; });
            fieldEmail.IsVisible = false;
        }
    }

    insertNotificationRecipients(event: any) {
        var contextObj = this;
        var id;
        var name;
        var categoryId;
        var newItemSource = [];
        this.arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                id = contextObj.itemsSource[i].Id.toString();
                name = contextObj.itemsSource[i].Name.toString();
                categoryId = contextObj.itemsSource[i].Value.toString();
                this.arrayList.push({
                    Id: id,
                    Value: name,
                    CategoryId: categoryId
                });
            } else {
                newItemSource.push(contextObj.itemsSource[i]);
            }
        }
        contextObj.itemsSource = [];
        contextObj.itemsSource = newItemSource;
        contextObj.submitSuccess.emit({ arrayList: contextObj.arrayList });
        if (contextObj.arrayList.length > 0)
            contextObj.notificationService.ShowToaster("Recipients added", 2);
        else
            contextObj.notificationService.ShowToaster("Select Recipient(s)", 2);
    }
}
export interface ReportFieldArray {
    Id: number,
    Value: string;
    CategoryId: string;
}
