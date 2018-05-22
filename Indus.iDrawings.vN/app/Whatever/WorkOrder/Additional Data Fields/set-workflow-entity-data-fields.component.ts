/// <reference path="../../../framework/models/interface/ifield.ts" />
import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { DropDownListComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component';
import { ListBoxComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/listboxcomponent.component';
import { AdministrationService} from '../../../models/administration/administration.service';
import { IField} from '../../../framework/models/interface/ifield';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'set-workflow-entity-data-fields',
    templateUrl: 'app/Views/WorkOrder/Additional Data Fields/set-workflow-entity-data-fields.component.html',
    directives: [ListBoxComponent, DropDownListComponent, Notification],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, WorkOrdereService],
    inputs: ['workTypeId']
})

export class SetWorkflowEntityDataFields implements OnInit {
    public header1;
    public header2;
    btnEnable: boolean = false;
    strSelectedIds: string;
    errorMessage: string;
    setAlignment: string;
    selectedid: number;
    field: IField;
    fieldlist: IField;
    workTypeId: any;

    constructor(private generFun: GeneralFunctions, private administrationService: AdministrationService, private notificationService: NotificationService, private workOrdereService: WorkOrdereService) {
        //this.header1 = "Required";
        //this.header2 = "Action Point";
    }

    ngOnInit() {
        
        this.workTypeId;
        var contextObj = this;
        contextObj.setAlignment = "vertical";
        this.workOrdereService.getWorkflowEntityDataFields("0", this.workTypeId, "9", "0").subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]) {
                    contextObj.field = resultData["Data"].find(function (el) { return el.ReportFieldId === 6578; });
                    contextObj.fieldlist = resultData["Data"].find(function (el) { return el.ReportFieldId === 6579; });
                }
            }
        });
     
    }

    ddlcategoryChange(event: any) {
        this.selectedid = event.ChildFieldObject.FieldValue;
        var arrayList = new Array<ReportFieldArray>();
        var contextObj = this;
        if (event.ChildFieldObject.FieldValue == "-1") {
            contextObj.btnEnable = false;
            contextObj.fieldlist.LookupDetails.LookupValues = [];
        }
        else {
            contextObj.btnEnable = true;

            this.workOrdereService.getWorkflowEntityData(this.selectedid, this.workTypeId).subscribe(function (resultData) {
                console.log("result data after ddl change", resultData["Data"]);
                contextObj.fieldlist.MultiFieldValues = [];
                if (resultData["Data"] != []) {
                    contextObj.fieldlist.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];                  
                    var tempArray = [];
                    for (let i = 0; i < resultData["Data"]["LookupValues"].length; i++)
                    {
                        if (resultData["Data"]["LookupValues"][i].IsChecked == 1) {
                            tempArray.push(resultData["Data"]["LookupValues"][i].Id.toString());
                        }
                    }
              
                    contextObj.fieldlist.MultiFieldValues = tempArray;
                }
            });
        }
    }

    selectAllOptions(event: any) {

    }

    Updateclick() {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        arrayList.push({
            ReportFieldId: 6578,
            Value: contextObj.selectedid.toString()
        });
        arrayList.push({
            ReportFieldId: 6577,
            Value: contextObj.workTypeId
        });
        if (contextObj.fieldlist != null) {
            for (let i = 0; i < contextObj.fieldlist.MultiFieldValues.length; i++) {
                arrayList.push({
                    ReportFieldId: 6579,
                    Value: contextObj.fieldlist.MultiFieldValues[i]
                });
            }
        }
        this.workOrdereService.postSubmitWorkflowEntityData(JSON.stringify(arrayList)).subscribe(function (resultData) {
            console.log("result data after submit", resultData["Data"]);
            if (resultData["Data"].ServerId == 1) {
                contextObj.notificationService.ShowToaster("Workflow Entity Data Fields updated", 3);
            }
            else if (resultData["Data"].ServerId == -1) {
                contextObj.notificationService.ShowToaster("Workflow Entity Data Fields failed", 3);
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}