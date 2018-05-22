import {Component, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import { ObjectsService } from '../../../Models/Objects/objects.service';


@Component({
    selector: 'objectclasses-addedit',
    templateUrl: 'app/Views/Objects/General Settings/objectclasses-addedit.component.html',
    directives: [FieldComponent, Notification],
    providers: [ObjectsService, NotificationService],
    inputs: ['objectCategoryId', 'selectedId', 'action', 'fieldDetailsAddEdit', 'btnName', 'messages', 'moduleId']
})

export class ObjectClassesAddEditComponent {
    success: any;
    objectCategoryId: number;
    dataKey: string = "Id";
    selectedId: number;
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();
    messages: any[];
    fieldDetailsAddEdit: IField[];
    isInvalid: boolean = false;
    moduleId: number=0;
    constructor(private objectsService: ObjectsService, private _notificationService: NotificationService) {
    }

    onSubmitData(event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    }

    postSubmit(contextObj, pageDetails: string, target: number) {

        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 283) {
                arr[i].Value = this.objectCategoryId.toString();
            }
            if (arr[i].ReportFieldId == 648) {
                if (/^([0-9]*)$/.test(arr[i].Value) == true) {
                    this._notificationService.ShowToaster(this.messages["InValidClassName"], 5);
                    return false;
                }
            }
            if (arr[i].ReportFieldId == 649) {
                arr[i].Value = this.objectCategoryId.toString();
            }
            if (arr[i].ReportFieldId == 651) {
                if (/^([0-9]*)$/.test(arr[i].Value) == true) {
                    this._notificationService.ShowToaster(this.messages["InValidANoPrefix"], 5);
                    return false;
                }
            }
        }
        arr.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });//Module
       
        this.objectsService.postSubmitObjectClass(JSON.stringify(arr), this.selectedId, target, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("Action Failure", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster(contextObj.messages["AddSuccess"], 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else {
                        contextObj._notificationService.ShowToaster(contextObj.messages["UpdateSuccess"], 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1 ) {
                        contextObj._notificationService.ShowToaster(contextObj.messages["ClassAlreadyExist"], 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj._notificationService.ShowToaster(contextObj.messages["ClassPrefixAlreadyExist"], 5);
                    }
                    break;
            }
        });
    }

   
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}