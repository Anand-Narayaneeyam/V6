import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { WorkOrdereService } from '../../../Models/WorkOrder/WorkOrder.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'technicians-add-edit',
    templateUrl: './app/Views/WorkOrder/GeneralSettings/technicians-addedit.component.html',
    providers: [WorkOrdereService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class TechniciansAddEditComponent implements OnInit {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();


    ngOnInit(): void {
        
    }
    constructor(private workOrdereService: WorkOrdereService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }

    onSubmitData(event) {
        
        switch (this.action) {
            case "add":
                this.submitDataCheck(event["fieldobject"], 1);
                break;
            case "edit":
                this.submitDataCheck(event["fieldobject"], 2);
                break;
        }
    }

    submitDataCheck(event,target) {
        var contextObj = this;
        var emailObj = this.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 5386
        });
        if (emailObj.FieldValue == null || emailObj.FieldValue == "") {
            contextObj.postSubmit(event, target);

        }
        else {
            this.workOrdereService.checkMailDomain(emailObj.FieldValue).subscribe(function (result) {
                if (contextObj.generalFunctions.checkForUnhandledErrors(result)) {
                    if (result["Data"]) {
                        contextObj.postSubmit(event, target);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Specified mail domain not added in iDrawings", 5);
                    }
                }
            })
        }
    }

    postSubmit(strsubmitField: string, target: number) {
        var contextObj = this;

        contextObj.workOrdereService.AddUpdateTechnicians(strsubmitField, this.selectedId, target).subscribe(function (resultData) {           
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Technician added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Technician details updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {                       
                        contextObj._notificationService.ShowToaster("Technician Code already exists", 5);
                    }
                    break;
            }
        });
    }
}