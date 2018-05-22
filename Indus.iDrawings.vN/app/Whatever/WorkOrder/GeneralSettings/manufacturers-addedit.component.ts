import {Component, Output, EventEmitter, Input} from '@angular/core';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'manufacturers-add-edit',
    templateUrl: 'app/Views/WorkOrder/GeneralSettings/manufacturers-addedit.component.html',
    providers: [WorkOrdereService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class ManufacturersAddEditComponent {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private workOrdereService: WorkOrdereService, private _notificationService: NotificationService) { }

    onSubmitData(event) {

        switch (this.action) {
            case "add":
                this.checkisValidMmailDomain(event["fieldobject"], 1);
                break;
            case "edit":
                this.checkisValidMmailDomain(event["fieldobject"], 2);
                break;
        }
    }


    checkisValidMmailDomain(event, target: number) {

        var contextObj = this;
        var emailObj = this.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 638
        });
        if (emailObj.FieldValue == null || emailObj.FieldValue == "") {
            contextObj.postSubmit(event, target);
        }
        else {
            this.workOrdereService.checkMailDomain(emailObj.FieldValue).subscribe(function (result) {

                if (result["Data"]) {
                    contextObj.postSubmit(event, target);
                }
                else {

                    contextObj._notificationService.ShowToaster("Specified mail domain not added in iDrawings", 5);
                }
            })
        }
    }

    postSubmit(strsubmitField: string, target: number) {
        var contextObj = this;

        contextObj.workOrdereService.AddUpdateManufacturers(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Manufacturer added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Manufacturer updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Manufacturer already exists", 5);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Unknown problem", 1);
                    }
                    break;
            }


        });

    }
}