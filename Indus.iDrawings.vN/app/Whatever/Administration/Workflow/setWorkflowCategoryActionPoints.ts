import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { DropDownListComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component';
import { ListBoxComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/listboxcomponent.component';
import { AdministrationService} from '../../../models/administration/administration.service';
import { IField} from '../../../framework/models/interface/ifield';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'setworkflow-categoryactionpoints',
    templateUrl: 'app/Views/Administration/Workflow/setWorkflowCategoryActionPoints.html',
    directives: [ListBoxComponent, DropDownListComponent, Notification],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService],
    inputs: []
})

export class SetWorkflowCategoryActionPoints implements OnInit{
    public header1;
    public header2;
    btnEnable: boolean = false;
    strSelectedIds: string;
    errorMessage: string;
    setAlignment: string; 
    selectedid: number;
    field: IField;
    fieldlist: IField;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
        this.header1 = "Required";
        this.header2 = "Action Point";
    }

    ngOnInit() {
        var contextObj = this;
        contextObj.setAlignment = "horizontal";
        this.administrationService.getWorkflowCategoryActionPoint(this.selectedid).subscribe(function (resultData) {
            if (resultData["Data"]) { 
                contextObj.field = resultData["Data"].find(function (el) { return el.ReportFieldId === 5843; });
                contextObj.fieldlist = resultData["Data"].find(function (el) { return el.ReportFieldId === 5844; });
            }
        });
    }

    ddlcategoryChange(event: any) {
        this.selectedid = event.ChildFieldObject.FieldValue;
        var arrayList = new Array<ReportFieldArray>();
        var contextObj = this;
        if (event.ChildFieldObject.FieldValue == "-1") {
            contextObj.btnEnable = false;
        }
        else {
            contextObj.btnEnable = true;
            arrayList.push({
                ReportFieldId: 5843,
                Value: event.ChildFieldObject.FieldValue
            });
            this.administrationService.getWorkflowddCategoryActionPoint(JSON.stringify(arrayList)).subscribe(function (resultData) {
                if (resultData["Data"]["DataCount"] > 0) {
                    contextObj.fieldlist = resultData["Data"];
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
            ReportFieldId: 5843,
            Value: contextObj.selectedid.toString()
        });
        if (contextObj.fieldlist != null) {
            for (let i = 0; i < contextObj.fieldlist.MultiFieldValues.length; i++) {
                arrayList.push({
                    ReportFieldId: 5844,
                    Value: contextObj.fieldlist.MultiFieldValues[i]
                });
            }
        }
        this.administrationService.postSubmitWorkflowCategoryActionPoint(JSON.stringify(arrayList)).subscribe(function (resultData) {
            if (resultData["Data"].ServerId == 1) {
                contextObj.notificationService.ShowToaster("Workflow Category Action Points updated", 3);
            }
            else if (resultData["Data"].ServerId == -1) {
                contextObj.notificationService.ShowToaster("Workflow Category Action Points already exist", 5);
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}