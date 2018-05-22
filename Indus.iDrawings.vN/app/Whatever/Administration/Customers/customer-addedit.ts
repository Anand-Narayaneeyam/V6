import {Component, Output, EventEmitter, Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'customer-addedit',
    templateUrl: 'app/Views/Administration/Customers/customer-addedit.html',
    directives: [FieldComponent, Notification],
    providers: [AdministrationService, NotificationService, GeneralFunctions],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class CustomerAddEditComponent {
    dataKey: string = "CustomerId";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService, private generFun: GeneralFunctions) { }

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
        var reportfieldIdValues = JSON.parse(strsubmitField);
        for (let i = 0; i < reportfieldIdValues.length; i++) {
            if (reportfieldIdValues[i].ReportFieldId == 6309) {
                reportfieldIdValues[i].Value = "1";
            }
            else if (reportfieldIdValues[i].ReportFieldId == 6310) {
                if (reportfieldIdValues[i].Value == "true" || reportfieldIdValues[i].Value == "True" || reportfieldIdValues[i].Value == "1")
                    reportfieldIdValues[i].Value = "1";
                else
                    reportfieldIdValues[i].Value = "0";
            }
            else if (reportfieldIdValues[i].ReportFieldId == 119) {
                if (reportfieldIdValues[i].Value == "0") {
                    contextObj._notificationService.ShowToaster("Max. Sites should be greater than zero", 5);
                    return false;
                }
            }
            else if (reportfieldIdValues[i].ReportFieldId == 120) {
                if (reportfieldIdValues[i].Value == "0") {
                    contextObj._notificationService.ShowToaster("Max. Buildings per Site should be greater than zero", 5);
                    return false;
                }
            }
        }
        strsubmitField = JSON.stringify(reportfieldIdValues);
        contextObj.administrationService.postsubmitCustomerDetails(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData.StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Customer added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Customer updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"] });
                    break;
                case 3:
                    if (resultData.ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Customer already exists", 5);
                    }
                    if (resultData.ServerId == -2) {
                        contextObj._notificationService.ShowToaster("Customer Folder Name already exists", 5);
                    }
                    break;
            }
        });
    }
}