import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { WorkFlowService } from '../../../Models/Common/workflow.service';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

@Component({
    selector: 'workflowoutcomes-addedit-fromflowchart',
    templateUrl: 'app/Views/Common/Set Workflow/workflowoutcomesfromflowchart-addedit.html',
    directives: [FieldComponent, Notification],
    providers: [WorkFlowService, NotificationService, ValidateService],
    inputs: ['workFlowCategoryId', 'moduleId', 'workTypeId', 'selectedId', 'workflowActionPointId', 'actionPointTypeId', 'action', 'fieldDetailsAddEdit', 'btnName', 'userLookUpDetails', 'target']
})

export class WorkflowOutcomeAddEditComponent {
    success: any;
    dataKey: string = "Id";
    workFlowCategoryId: any;
    moduleId: any;
    workTypeId: any;
    actionPointTypeId: any;
    workflowActionPointId: any;
    workflowEntityCategoryId: any;
    outcomeTypeId: any;
    outcomeTypeValue: any[];
    userLookUpDetails: any[];
    isNotifyRequester: boolean = false;
    selectedId: number;
    public fieldDetailsAddEdit: IField[];
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();
    target: number = 1;

    constructor(private workFlowService: WorkFlowService, private notificationService: NotificationService, private _validateService: ValidateService) {
    }

    ngOnInit(): void {
        debugger
        console.log(this.fieldDetailsAddEdit);
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
        var arrRptField = [5827, 5832];
        var count = arrRptField.length;
        var pageDetlsObj = JSON.parse(pageDetails);
        pageDetlsObj.find(function (item) {
            switch (item.ReportFieldId) {
                case 5827:
                    item.Value = contextObj.workflowActionPointId;
                    count--;
                    break;
                case 5832:
                    item.Value = contextObj.workTypeId;
                    count--;
                    break;
            }
            if (count == 0) {
                return true;
            } else
                return false;
        })
        this.workFlowService.postSubmitWorkflowOutcome(JSON.stringify(pageDetlsObj), this.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Outcome already exists", 5);
                    } else {
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    }
                    break;
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Outcome added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data[0] });
                    } else {
                        contextObj.notificationService.ShowToaster("Outcome updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data[0] });
                    }
                    break;
            }
        });
    }

    checkBoxChange(event: any) {
        debugger
        var contextObj = this;
        var notifyRequester = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1086;
        });
        if (event.chkBoxObject.fieldId == 1086) {
            contextObj.isNotifyRequester = event.chkBoxObject.IsChecked;
            if (contextObj.isNotifyRequester == true) {
                notifyRequester.FieldValue = "true";
            }
            else if (contextObj.isNotifyRequester == false) {
                notifyRequester.FieldValue = "false";
            }
        }
    }

    fieldChange(event: any) {
        debugger
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        var ddlOutcomeType = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1081;
        });
        var outcome = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1082;
        });
        var ddlNextActionPoint = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1083;
        });
        var description = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1084;
        });
        var notifyRequester = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1086;
        });
        var ddlUser = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1171;
        });
        if (this.action == "add") {
            if (fieldLabel == "Workflow Entity") {
                this.workflowEntityCategoryId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var workflowEntityFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                ddlOutcomeType.IsMandatory = false;
                ddlOutcomeType.HasValidationError = false;
                ddlOutcomeType.IsEnabled = false;
                ddlOutcomeType.IsVisible = true;
                notifyRequester.IsEnabled = false;
                notifyRequester.IsVisible = false;
                ddlOutcomeType.FieldValue = "-1";
                outcome.IsMandatory = false;
                outcome.HasValidationError = false;
                outcome.IsEnabled = false;
                outcome.IsVisible = true;
                outcome.FieldValue = "";
                ddlNextActionPoint.IsMandatory = false;
                ddlNextActionPoint.HasValidationError = false;
                ddlNextActionPoint.IsEnabled = false;
                ddlNextActionPoint.IsVisible = true;
                ddlNextActionPoint.FieldValue = "-1";
                description.FieldValue = "";
                ddlUser.IsMandatory = false;
                ddlUser.HasValidationError = false;
                ddlUser.IsEnabled = false;
                ddlUser.IsVisible = false;
                ddlUser.FieldValue = "-1";
                if (this.workflowEntityCategoryId > -1 && workflowEntityFieldId == 1080) {
                    ddlOutcomeType.IsMandatory = true;
                    ddlOutcomeType.IsEnabled = true;
                    ddlOutcomeType.IsVisible = true;
                    ddlOutcomeType.HasValidationError = true;
                    ddlOutcomeType.IsLocallyValidated = false;
                    this.initiateValidation(ddlOutcomeType.FieldId, ddlOutcomeType);
                    this.workFlowService.loadOutcomeType(this.workflowEntityCategoryId, workflowEntityFieldId, this.actionPointTypeId, this.workFlowCategoryId, this.workTypeId, this.workflowActionPointId).subscribe(function (resultData) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            ddlOutcomeType.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                        }
                    });
                }
            } else if (fieldLabel == "Outcome Type") {
                this.outcomeTypeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                this.outcomeTypeValue = event["ddlRelationShipEvent"]["ChildFieldObject"]["LookupDetails"]["LookupValues"];
                outcome.IsMandatory = false;
                outcome.HasValidationError = false;
                outcome.IsEnabled = false;
                outcome.IsVisible = true;
                outcome.FieldValue = "";
                ddlNextActionPoint.IsMandatory = false;
                ddlNextActionPoint.HasValidationError = false;
                ddlNextActionPoint.IsEnabled = false;
                ddlNextActionPoint.IsVisible = true;
                ddlNextActionPoint.FieldValue = "-1";
                description.FieldValue = "";
                ddlUser.IsMandatory = false;
                ddlUser.IsEnabled = false;
                ddlUser.IsVisible = false;
                ddlUser.FieldValue = "-1";
                var outcomeValue;
                for (var i = 0; i < this.outcomeTypeValue.length; i++) {
                    if (this.outcomeTypeValue[i].Id == this.outcomeTypeId) {
                        outcomeValue = this.outcomeTypeValue[i].Value;
                        break;
                    }
                }
                var outcomeTypeFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                if (this.outcomeTypeId > -1 && outcomeTypeFieldId == 1081) {
                    outcome.IsMandatory = true;
                    outcome.IsEnabled = true;
                    outcome.IsVisible = true;
                    outcome.FieldValue = outcomeValue;
                    this.initiateValidation(outcome.FieldId, outcome);
                    ddlNextActionPoint.IsMandatory = true;
                    ddlNextActionPoint.IsEnabled = true;
                    ddlNextActionPoint.IsVisible = true;
                    ddlNextActionPoint.HasValidationError = true;
                    ddlNextActionPoint.IsLocallyValidated = false;
                    notifyRequester.IsEnabled = true;
                    notifyRequester.IsVisible = true;
                    if (this.outcomeTypeId == "2" || this.outcomeTypeId == "18" || this.outcomeTypeId == "7" || this.outcomeTypeId == "8" || this.outcomeTypeId == "9" || this.outcomeTypeId == "11" || this.outcomeTypeId == "16" || this.outcomeTypeId == "21" || this.outcomeTypeId == "23" || this.outcomeTypeId == "19") {
                        notifyRequester.IsVisible = true;
                        notifyRequester.IsEnabled = false;
                        notifyRequester.FieldValue = "true";
                        if (this.outcomeTypeId == "18") {
                            outcome.IsEnabled = false;
                        }
                    } else {
                        notifyRequester.IsEnabled = true;
                        notifyRequester.IsVisible = true;
                        notifyRequester.FieldValue = "";
                    }
                    this.updateNotifyRequesterField(notifyRequester);
                    this.workFlowService.loadNextActionPoint(this.outcomeTypeId, outcomeTypeFieldId, this.workflowEntityCategoryId, this.workTypeId).subscribe(function (resultData) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            ddlNextActionPoint.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                        } else {
                            ddlNextActionPoint.IsMandatory = false;
                            ddlNextActionPoint.HasValidationError = false;
                            ddlNextActionPoint.IsLocallyValidated = false;
                            ddlNextActionPoint.IsEnabled = false;
                            ddlNextActionPoint.IsVisible = true;
                            ddlNextActionPoint.FieldValue = "-1";
                        }
                    });
                } else {
                    notifyRequester.IsEnabled = false;
                    notifyRequester.IsVisible = false;
                }
            }
            if (this.workflowEntityCategoryId == 3) {
                notifyRequester.IsEnabled = false;
                notifyRequester.IsVisible = false;
                notifyRequester.FieldValue = "false";
            }
        } else if (this.action == "edit") {
            var outComeTypeField = this.fieldDetailsAddEdit.find(function (item) {
                return item.ReportFieldId === 5837;
            });
            if (fieldLabel == "Next Action Point" && outComeTypeField.FieldValue == "28") {
                var nextActionPointId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var nextActionPointFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
                var actionPointDetails = this.userLookUpDetails.find(function (item) {
                    return item.Id === parseInt(nextActionPointId);
                });
                ddlUser.IsMandatory = false;
                ddlUser.HasValidationError = false;
                ddlUser.IsEnabled = false;
                ddlUser.IsVisible = false;
                ddlUser.FieldValue = "-1";
                if (nextActionPointId > -1 && actionPointDetails.IsSpecificUser == 1) {
                    this.workFlowService.loadUser(actionPointDetails.ActionPointId, nextActionPointFieldId, this.moduleId, this.selectedId).subscribe(function (resultData) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            ddlUser.IsMandatory = true;
                            ddlUser.HasValidationError = true;
                            ddlUser.IsLocallyValidated = false;
                            ddlUser.IsEnabled = true;
                            ddlUser.IsVisible = true;
                            ddlUser.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        }
                    });
                } else {
                    ddlUser.FieldValue = "-1";
                }
            }
        }
    }

    public updateNotifyRequesterField(field: IField) {
        switch (this.workFlowCategoryId) {
            case 8: /*Scheduling*/
                field.IsVisible = false;
                field.FieldValue = "";
                break;
            default:
                field.IsVisible = true;
                break;
        }
    }

    public initiateValidation(id: any, fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(id);
        setTimeout(function () {
            contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
        }, 100);
    }
}