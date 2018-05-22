import {Component, Output, EventEmitter, Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';

@Component({
    selector: 'defineworktype-addedit',
    templateUrl: 'app/Views/Common/Define Work Type/define-worktypeaddedit.html',
    directives: [FieldComponent, Notification],
    providers: [SchedulingService, NotificationService],
    inputs: ['workFlowCategoryId', 'moduleId', 'selectedId', 'action', 'fieldDetailsAddEdit', 'btnName']
})

export class DefineWorkTypeAddEditComponent {
    success: any;
    dataKey: string = "Id";
    moduleId: any;
    selectedId: number;
    fieldDetailsAddEdit: IField[];
    strLstBoxValidateMessage: string = "Select at least one Workflow entity";
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();

    constructor(private schedulingService: SchedulingService, private notificationService: NotificationService) {
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
            if (arr[i].ReportFieldId == 5854) {
                arr[i].Value = this.moduleId;
            }
            if (arr[i].ReportFieldId == 5880) {
                arr[i].Value = "1";
            }
        }
        this.schedulingService.postSubmitDefineWorkTypes(JSON.stringify(arr), this.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Work Type added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    } else {
                        contextObj.notificationService.ShowToaster("Work Type updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Work Type already exists", 5);
                    }
                    break;
            }
        });   
    }

    public onDropDownChange(event: IField) {
        if (event.FieldId == 1001) {
            var contextObj = this;
            var workFlowEntity = contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 1937 });
            workFlowEntity.MultiFieldValues = null;
            if (event.FieldValue == "-1") {
                workFlowEntity.LookupDetails.LookupValues = null;
                return;
            }
            contextObj.schedulingService.loadWorkFlowEntityLookups(event.FieldValue, event.FieldId, contextObj.moduleId).subscribe(function (resultData) {
                if (resultData["Data"]["LookupValues"].length > 0) {
                    workFlowEntity.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                    if (workFlowEntity.LookupDetails.LookupValues.length == 1) {
                        var entityIds = [];
                        entityIds.push(workFlowEntity.LookupDetails.LookupValues[0].Id.toString());
                        workFlowEntity.MultiFieldValues = entityIds;
                    }
                } 
            });
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}