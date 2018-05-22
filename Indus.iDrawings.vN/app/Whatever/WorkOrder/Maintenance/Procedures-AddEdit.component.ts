﻿import {Component, Output, EventEmitter, Input} from '@angular/core';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'procedures-add-edit',
    templateUrl: 'app/Views/WorkOrder/Maintenance/Procedures-AddEdit.component.html',
    providers: [WorkOrdereService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class ProceduresAddEditComponent {
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
        var field = new Array<ReportFieldArray>();
        field = JSON.parse(strsubmitField);
        field.push({
            ReportFieldId: 5511,
            Value: "0"
        });
        strsubmitField = JSON.stringify(field);
        contextObj.workOrdereService.AddUpdateProcedures(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Procedure added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Procedure updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Procedure already exists", 5);
                        setTimeout(function () {
                            var el = <HTMLElement>document.getElementById("1450");

                            if (el != null && el != undefined) {
                                el.focus();
                            }
                        }, 100);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Unknown problem", 1);
                    }
                    break;
            }
        });


        //contextObj.workOrdereService.AddUpdateProcedures(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
        //    switch (resultData["Data"].StatusId) {
        //        case 0:
        //            contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

        //            break;
        //        case 1:
        //            if (target == 1) {
        //                contextObj._notificationService.ShowToaster("Manufacturer details added", 3);
        //            }
        //            else {
        //                contextObj._notificationService.ShowToaster("Manufacturer details updated", 3);
        //            }
        //            contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
        //            break;
        //        case 3:
        //            if (resultData["Data"].ServerId == -1) {
        //                contextObj._notificationService.ShowToaster("Manufacturer already exists", 3);
        //            }
        //            else {
        //                contextObj._notificationService.ShowToaster("Unknown problem", 1);
        //            }
        //            break;
        //    }


        //});

    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}