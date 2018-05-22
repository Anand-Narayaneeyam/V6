import { Component, Output, OnInit, ElementRef, SimpleChange, OnChanges, Renderer, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { ObjectsService } from '../../../Models/Objects/objects.service';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

@Component({
    selector: 'deficiencies-addedit',
    templateUrl: 'app/Views/Objects/Deficiency/deficiencies-addedit.html',
    directives: [FieldComponent, Notification],
    providers: [ObjectsService, NotificationService, ValidateService],
    inputs: ['selectedId', 'action', 'AttributesAddEdit', 'btnName', 'messages','moduleId']
})

export class DeficienciesAddEdit implements OnInit {
    success: any;
    public AttributesAddEdit: IField[];
    objectCategoryId: number;
    moduleId: number = 0;
    btnName: string = "Add";
    dataKey: string = "Id";
    selectedId: number;
    tempdata: any[];
    addEdit: string;
    CategoryId: string;
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();
    hasFieldValue: boolean = false;
    isinUse: boolean = false;
    formHeight: any;
    constructor(private objectsService: ObjectsService, private _notificationService: NotificationService, private _renderer: Renderer, private el: ElementRef, private _validateService: ValidateService) {
    }

    ngOnInit() {
        this.formHeight = window.innerHeight - 200;
        this.formHeight = this.formHeight + "px";
    }
    loadControl(eventValue: any, contextObj, action) {

    }
    fieldChange(event) {
        var contextObj = this;
        if (event.ddlRelationShipEvent.ChildFieldObject.FieldId == 2365) {
            this.objectsService.getDeficiencyClassLookups(1, 1, event.ddlRelationShipEvent.ChildFieldObject.FieldValue).subscribe(function (resultData) {
                contextObj.AttributesAddEdit.filter(function (el) {
                    if (el.FieldId == 2366) {
                        el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        el.FieldValue = "-1";
                        return true
                    }
                    else
                        return false
                });
            });
        }

    }

    onSubmitData(event) {
        var contextObj = this;
        var tempdata1 = JSON.parse(event["fieldobject"]);
        tempdata1.push({ ReportFieldId: 271, Value: this.moduleId.toString() });   
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, JSON.stringify(tempdata1), 1);
                break;
            case "edit":
                this.postSubmit(contextObj, JSON.stringify(tempdata1), 2);
                break;
        }
    }
    postSubmit(contextObj, pageDetails: string, target: number) {
        contextObj.objectsService.postSubmitDeficiency(pageDetails, target, contextObj.selectedId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("Code already exists", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Deficiency added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Deficiency updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    //if (resultData["Data"].ServerId == -1 || resultData["Data"].ServerId == -2) {
                    contextObj._notificationService.ShowToaster("Deficiency already exists", 5);
                    //}
                    break;
            }
        });
    }

    filterFieldtypeValidation(fieldtype) {

    }
    filterFieldtypeInUse(fieldType) {

    }
}
