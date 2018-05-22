import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { IField } from '../../../Framework/Models//Interface/IField'
import { ObjectsService } from '../../../Models/Objects/objects.service'

@Component({
    selector: 'relationship-add-edit',
    templateUrl: './app/Views/Objects/Connectivity/relationship-add-edit.component.html',
    providers: [ObjectsService, NotificationService],
    directives: [FieldComponent],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName','objCategoryId'],
})

export class RelationshipAddEdit {
    dataKey: string = "Id";
    public validationArray: rFieldsValidation[]=[];
    //let randomItems: any[] = [];
    selectedId: number;
    retItem: IField;
    objCategoryId: any;
    @Input() action: string;
    isNamesNAN = true;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private objService: ObjectsService, private _notificationService: NotificationService) { }

    onSubmitData(event) {

        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    }

    postSubmit(strsubmitField: string, target: number)
    {
        debugger
        var contextObj = this;
        var strSubValidation = JSON.parse(strsubmitField);
        var findValue = "";
        var valStatus1 = false;
        var valStatus2 = false;
        
        if (strSubValidation.find(function (item) { return item.ReportFieldId == "4458" }))
        {
            findValue = strSubValidation.find(function (item) { return item.ReportFieldId == "4458" });
            var validationStatus = contextObj.textBoxValidation(findValue);
            if (validationStatus == false) {
                this._notificationService.ShowToaster("Enter a non numeric value for Relationship", 5);                
                valStatus1 = false;
            } else {
                valStatus1 = true;
            }                  
        }

        if (strSubValidation.find(function (item) { return item.ReportFieldId == "4459" }))
        {
            findValue = strSubValidation.find(function (item) { return item.ReportFieldId == "4459" })
            var validationStatus = contextObj.textBoxValidation(findValue); 
            if (validationStatus == false)
            {
                this._notificationService.ShowToaster("Enter a non numeric value for Reverse Relationship", 5);                
                valStatus2 = false;
            }
            else {
                valStatus2 = true;
            }                
        }

        if (valStatus1 == true && valStatus2 == true)
        {
            var tempObj = {
                ReportFieldId: 4456,
                Value: contextObj.objCategoryId
            }
            var arrayField = JSON.parse(strsubmitField);
            arrayField = arrayField.concat(tempObj);
            strsubmitField = JSON.stringify(arrayField);
            debugger
            contextObj.objService.AddRelationships(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
                debugger
                switch (resultData["Data"].StatusId) {
                    
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Connection Relationship added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Connection Relationship updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Relationship already exists", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj._notificationService.ShowToaster("Reverse Relationship already exists", 5);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Unknown problem", 1);
                        }
                        break;
                }
            });
        }
    }

    public textBoxValidation(value)
    {
        debugger       
            if (!isNaN(Number(value.Value)))
            {   this.isNamesNAN = false;
                return false;               
            }
            else
            {   this.isNamesNAN = true;
                return true;
            }        
    }  
}

export interface rFieldsValidation {
    rFieldId: string
}


 
