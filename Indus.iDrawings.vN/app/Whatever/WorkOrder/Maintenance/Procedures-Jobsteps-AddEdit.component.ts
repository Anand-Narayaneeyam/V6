﻿import {Component, Output, EventEmitter, Input} from '@angular/core';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'add-edit-job',
    templateUrl: 'app/Views/WorkOrder/Maintenance/Procedures-Jobsteps-AddEdit.component.html',
    providers: [WorkOrdereService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'procId', 'pageIndex'],
})

export class ProceduresJobStepsAddEditComponent {
    dataKey: string = "Id";
    selectedId: number;
    procId: number;
    retItem: IField;
    pageIndex: number;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess2 = new EventEmitter();

    constructor(private workOrdereService: WorkOrdereService, private notificationService: NotificationService) { }

    ngOnInit() {
        setTimeout(function () {
            var el = <HTMLElement>document.getElementById("1491");

            if (el != null && el != undefined) {
                el.focus();
            }
        }, 100);
    }

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
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(strsubmitField);
        var val = arr[2].Value.toString();
        if (this.action != "add") {
            this.workOrdereService.postEditJobStepsDetails(this.procId, val, this.selectedId).subscribe(function (resultData) {
                if (resultData.Data > 0) {
                    contextObj.notificationService.ShowToaster("Job Step updated", 3);
                    contextObj.workOrdereService.getJobStepsDataforgridupdate(contextObj.pageIndex, 'Job Step', 'ASC', contextObj.procId, contextObj.selectedId[0]).subscribe(function (resultData) {

                        contextObj.submitSuccess2.emit({ status: "success", returnData: resultData["Data"]["FieldBinderData"] });
                    });
                }
            })
        } else {
            this.workOrdereService.postAddJobStepsDetails(this.procId, val).subscribe(function (resultData) {
                
                if (resultData.Data > 0) {
                    contextObj.notificationService.ShowToaster("Job Step added", 3);
                    contextObj.workOrdereService.getJobStepsDataforgridupdate(contextObj.pageIndex, 'Job Step', 'ASC', contextObj.procId, resultData.Data).subscribe(function (resultData) {

                        contextObj.submitSuccess2.emit({ status: "success", returnData: resultData["Data"]["FieldBinderData"] });
                    });
                }
            });
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}