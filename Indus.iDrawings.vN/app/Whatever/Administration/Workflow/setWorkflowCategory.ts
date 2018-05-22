import {Component, Input, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService} from '../../../models/administration/administration.service';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';

@Component({
    selector: 'setworkflowcategory',
    templateUrl: './app/Views/Administration/Workflow/setWorkflowCategory.html',
    directives: [Notification, FieldComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ['selectedId','fieldDetailsSetWorkflowCategory']
})

export class SetWorkflowCategoriesComponent {
    fieldDetailsSetWorkflowCategory: IField[];
    selectedId: any;
    btnName: string = "Save Changes";
    @Output() submitSuccess = new EventEmitter();

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) {
    }

    lbSelectAllChange() {
        var arr = new Array();
        var workflowCategory = this.fieldDetailsSetWorkflowCategory.find(function (el) { return el.ReportFieldId === 5843; });
        if (workflowCategory.MultiFieldValues.length == 0) {
            var lookups = workflowCategory["LookupDetails"]["LookupValues"];

            for (var i = 0; i < lookups.length; i++) {
                if (lookups[i]["IsDisabled"] == true) 
                    arr.push(lookups[i]["Id"].toString())
            }
            workflowCategory.MultiFieldValues = arr;
        }
    }

    onSubmitData(event) {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        arrayList.push({
            ReportFieldId: 5844,
            Value: contextObj.selectedId
        });
        if (contextObj.fieldDetailsSetWorkflowCategory != null) {
            for (let i = 0; i < contextObj.fieldDetailsSetWorkflowCategory[0].MultiFieldValues.length; i++) {
                arrayList.push({
                    ReportFieldId: 5843,
                    Value: contextObj.fieldDetailsSetWorkflowCategory[0].MultiFieldValues[i]
                });
            }
        }
        this.administrationService.postSubmitWorkflowCategoryActionPt(JSON.stringify(arrayList)).subscribe(function (resultData) {
            if (resultData["Data"].ServerId == 1) {
                contextObj.notificationService.ShowToaster("Workflow Category Action Points updated", 3);
            }
            else if (resultData["Data"].ServerId == -1) {
                contextObj.notificationService.ShowToaster("Workflow Category Action Points already exist", 5);
            }
            contextObj.submitSuccess.emit({ status: "success", returnData: "" });
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}