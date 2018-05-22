import {Component, Output, EventEmitter, Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { WorkFlowService } from '../../../Models/Common/workflow.service';

@Component({
    selector: 'copy-workflow',
    templateUrl: 'app/Views/Common/Set Workflow/copy-workflow.html',
    directives: [FieldComponent, Notification],
    providers: [WorkFlowService, NotificationService],
    inputs: ['action', 'fieldDetailsCloneWorkflow', 'btnName', 'workTypeId']
})

export class CopyWorkflowComponent {
    success: any;
    dataKey: string = "Id";
    workTypeId: number;
    fieldDetailsCloneWorkflow: IField[];
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();

    constructor(private workFlowService: WorkFlowService, private notificationService: NotificationService) {

    }

    onSubmitData(event) {
        var contextObj = this;
        if (this.action == "copy") {
            this.postSubmit(contextObj, event["fieldobject"]);
        }
    }

    postSubmit(contextObj, pageDetails: string) {
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 5873) {
                arr[i].Value = this.workTypeId.toString();
            }
        }
        this.workFlowService.postCopyWorkflow(JSON.stringify(arr)).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Workflow added", 3);
                    contextObj.submitSuccess.emit({ status: "success", NewWorkTypeId: resultData["Data"].ServerId });                    
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster("Work Type already exists", 5);
                    }
                    break;
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}