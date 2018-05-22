import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { WorkFlowService } from '../../../Models/Common/workflow.service';

@Component({
    selector: 'setworkflow-addedit',
    templateUrl: 'app/Views/Common/Set Workflow/setworkflow-addedit.html',
    directives: [FieldComponent, Notification],
    providers: [WorkFlowService, NotificationService],
    inputs: ['workFlowCategoryId', 'moduleId', 'workTypeId', 'selectedId', 'action', 'fieldDetailsAddEdit', 'btnName']
})

export class SetWorkFlowAddEditComponent {
    success: any;
    dataKey: string = "Id";
    moduleId: any;
    workTypeId: any;
    selectedId: number;
    strLstBoxValidateMessage: string = "Select at least one Workflow entity";
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();

    constructor(private workFlowService: WorkFlowService, private notificationService: NotificationService) {
    }

    onSubmitData(event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    }

    postSubmit(contextObj, pageDetails: string, target: number) {
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 5832) {
                arr[i].Value = this.workTypeId;
            }
            if (arr[i].ReportFieldId == 5829) {
                arr[i].Value = "-1";
            }
        }
        this.workFlowService.postSubmitWorkFlow(JSON.stringify(arr), this.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Action Point added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    } else {
                        contextObj.notificationService.ShowToaster("Action Point updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Action Point already exists", 5);
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