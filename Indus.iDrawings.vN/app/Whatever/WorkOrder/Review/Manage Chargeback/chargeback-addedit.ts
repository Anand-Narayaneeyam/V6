import {Component, Output, EventEmitter, Input} from '@angular/core';
import { WorkOrdereService } from '../../../../Models/WorkOrder/workorder.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../../Framework/Models//Interface/IField'

@Component({
    selector: 'chargeback-addedit',
    templateUrl: 'app/Views/WorkOrder/Review/Manage Chargeback/chargeback-addedit.html',
    providers: [WorkOrdereService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAddEdit', 'btnName', 'workOrderId','chargeBackType'],
})

export class ChargebackAddEditComponent {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    action: string;
    chargeBackPercentage :any;
    fieldDetailsAddEdit: IField[];
    workOrderId;
    chargeBackType;
    @Output() submitSuccess = new EventEmitter();

    constructor(private workOrdereService: WorkOrdereService, private _notificationService: NotificationService) { }

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

    postSubmit(event: string, target: number) {
        var contextObj = this;
        var temp = JSON.parse(event);
        for (let i = 0; i < temp.length; i++) {

            if (temp[i].ReportFieldId == 1424) {
                temp[i]["Value"] = this.workOrderId;
            }
            else if (temp[i].ReportFieldId == 1425) {
                temp[i]["Value"] = this.chargeBackType;
            } else if (temp[i].ReportFieldId == 1426) {
                this.chargeBackPercentage = temp[i]["Value"] ;
            }
        }
        event = JSON.stringify(temp);
        if (this.chargeBackPercentage != 0) {

            contextObj.workOrdereService.AddUpdateChargeback(event, this.selectedId, target).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Chargeback added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Chargeback details updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Chargeback already exists", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj._notificationService.ShowToaster("Total Percentage cannot exceed 100", 5);
                        }
                        break;
                }
            });
        }
        else
        { contextObj._notificationService.ShowToaster("Enter a valid numeric value between between 0 and 100 for Percentage", 5);}
    }
}