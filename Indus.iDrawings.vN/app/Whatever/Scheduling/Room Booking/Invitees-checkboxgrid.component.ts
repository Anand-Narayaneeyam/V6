import { Component, Output, EventEmitter, AfterViewInit, OnInit, Input } from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { IField} from '../../../framework/models/interface/ifield';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomCheckBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';

@Component({

    selector: 'Invitees-checkboxgrid',
    templateUrl: './app/Views/Scheduling/Room Booking/Invitees-checkboxgrid.component.html',
    directives: [GridComponent, SubMenu, DropDownListComponent, CustomCheckBoxComponent, PagingComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, NotificationService, GeneralFunctions],   
})

export class Inviteescheckboxgrid implements OnInit {
    showSlide: boolean = false;
    position: any = "top-right";
    slidewidth = 300;    
    fieldObject: IField[];
    itemsSource: any[];
    messages: any[];
    ddlUserCategory: IField;
    deleteConfrmtnMsg: string;
    fieldType: string;
    ClassId: any;
    addlDataField: number[];   
    differ: any;
    alignContent: string;
    listtarget: number = 1;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    message;
    hasFieldValue: boolean = false;
    @Output() submitSuccess = new EventEmitter();
    isinUse: boolean = false;    
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "[User Name]", sortDir: "ASC", selectedIds: [], allowAdd: false };

    constructor(private SchedulingService: SchedulingService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        this.alignContent = "horizontal";
        contextObj.SchedulingService.getInviteesCheckboxgridFields(contextObj.listtarget).subscribe(function (resultdata) {
            contextObj.ddlUserCategory = resultdata["Data"].find(function (el) { return el.ReportFieldId === 458; }); 
            contextObj.inputItems.isHeaderCheckBx = false;         
            var removeArr = [458];
            contextObj.fieldObject = resultdata["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })       
        });
    }
    onChangeUserCategory(event: any) {
        var contextObj = this;
        contextObj.listtarget = parseInt(event); 
        if (contextObj.listtarget == -1) {
            contextObj.itemsSource = [];
            contextObj.inputItems.isHeaderCheckBx = false;
        }
        else {
            contextObj.inputItems.isHeaderCheckBx = true;
            contextObj.Customfieldgeneration(contextObj.listtarget);
            contextObj.SchedulingService.GetInviteesListForUserCategory(contextObj.listtarget).subscribe(function (data) {
                contextObj.itemsSource = JSON.parse(data.Data["FieldBinderData"]);
            });
        }
    }

    private Customfieldgeneration(Target) {
        var contextObj = this;
        this.SchedulingService.getInviteesCheckboxgridFields(Target).subscribe(function (resultdata) {
            contextObj.fieldObject = resultdata["Data"];
            if (Target == "1")
            {
                var removeArr = [458];
                contextObj.fieldObject = resultdata["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                })       
            }
        });
    }
    insertInviteesList(event: any) {
        debugger
        var contextObj = this;
        if (contextObj.ddlUserCategory.FieldValue == "-1")
            contextObj.notificationService.ShowToaster("Select a User Category", 2)
        else {
            var InsertValue;
            var tempInviteesList = "";
            var Id;
            var arrayList = new Array<ReportFieldArray>();
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    InsertValue = contextObj.itemsSource[i].Id.toString().split("µ")[0] + "µ" + contextObj.itemsSource[i].Id.toString().split("µ")[1];
                    Id = parseInt(contextObj.itemsSource[i].Id.toString().split("µ")[1]);
                    if (contextObj.itemsSource[i].Id.toString().split("µ")[0] == "1")
                        Id = (Id + 2) * -1;
                    var value = contextObj.itemsSource[i].Id.toString().split("µ")[2];
                    //InsertValue = InsertValue + tempInviteesList + "µ1µ§"              
                    arrayList.push({
                        Id: Id,
                        Value: value,
                        InsertValue: InsertValue
                    });
                }
            }
            contextObj.submitSuccess.emit({ arrayList });
        }
    }
}
export interface ReportFieldArray { 
    Id:number,   
    Value: string;
    InsertValue: string;
}
