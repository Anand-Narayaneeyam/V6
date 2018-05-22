import {Component, Output, EventEmitter, Input} from '@angular/core';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'contractors-add-edit',
    templateUrl: 'app/Views/WorkOrder/GeneralSettings/contractors-addedit.component.html',
    providers: [WorkOrdereService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class ContractorsAddEditComponent {
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
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    }

    postSubmit(strsubmitField: string, target: number) {
        var contextObj = this;

        contextObj.workOrdereService.AddUpdateContractors(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Contractor added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Contractor updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Contractor already exists", 5);
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