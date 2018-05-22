import {Component, Output, EventEmitter, Input} from '@angular/core';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { ObjectsService } from '../../../Models/Objects/objects.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'warranty-add-edit',
    templateUrl: './app/Views/Objects/Data/warranty-addedit.component.html',
    providers: [WorkOrdereService, NotificationService, ObjectsService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'objectId','objectCategoryName'],
})

export class WarrantyAddEditComponent {
    dataKey: string = "Id";
    selectedId: number;
    objectId: number;
    retItem: IField;
    objectCategoryName: any;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private workOrdereService: WorkOrdereService, private objectsService: ObjectsService, private _notificationService: NotificationService) { }

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

    postSubmit(strsubmitField: string, target: number) {
        var contextObj = this;
        var fields1 = JSON.parse(strsubmitField);
        var months = fields1[4].Value;
        var date = new Date(fields1[2].Value);        
        date.setMonth(date.getMonth() + parseInt(months));
        var year = date.getFullYear();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        fields1[3].Value = dd + " " + mon + " " + year;
        fields1[7].Value = this.objectId;
        fields1[8].Value = 0;
        fields1[9].Value = 0;
        strsubmitField = JSON.stringify(fields1);
        var endDate = new Date(fields1[3].Value);
        var today = new Date();
        if (endDate < today) {
            contextObj._notificationService.ShowToaster("Warranty End Date should be greater than Current Date", 5);
            return
        }
        else {
            contextObj.objectsService.AddUpdateWarranty(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Warranty added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Warranty Details updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Warranty details exist for the selected " + contextObj.objectCategoryName + " with same Warranty End Date", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj._notificationService.ShowToaster("Specified mail domain not added in iDrawings", 5);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Unknown problem", 1);
                        }
                        break;
                }
            });
        }
    }
}