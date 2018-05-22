﻿import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { WorkFlowService } from '../../../Models/Common/workflow.service';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { NotificationRecipientsComponent } from './notificationRecipients-checkboxgrid';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';

@Component({
    selector: 'workflowoutcomes-addedit',
    templateUrl: 'app/Views/Common/Set Workflow/workflowoutcomes-addedit.html',
    directives: [FieldComponent, Notification, NotificationRecipientsComponent, SplitViewComponent],
    providers: [WorkFlowService, NotificationService, ValidateService],
    inputs: ['workFlowCategoryId', 'moduleId', 'workTypeId', 'selectedId', 'workflowActionPointId', 'actionPointTypeId',
        'action', 'fieldDetailsAddEdit', 'btnName', 'userLookUpDetails', 'notificationRecipientsDetails']
})

export class WorkflowOutcomeAddEditComponent {
    pageTitle: string;
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
    isNotification: boolean = false;
    needRepeatReminder: boolean = false;
    selectedId: number;
    recipients: IField[];
    notificationRecipientsDetails: any[];
    chkBxValuesforRecipients: any[];
    tempRecipientsList: string = "";
    notificationRecipientsListForInsert: string = "";
    recipientUserIds: string = "";
    recipientUserGroupIds: string = "";
    recipientNames: string = "";
    tempRecipientId: string = "";
    ShowinListItem: string;
    public fieldDetailsAddEdit: IField[];
    @Input() action: string;
    @Output() recipientsList = new EventEmitter();
    @Output() submitSuccess = new EventEmitter();
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };

    constructor(private workFlowService: WorkFlowService, private notificationService: NotificationService, private _validateService: ValidateService) {
    }

    ngOnInit(): void {
        var contextObj = this;
        if (this.moduleId == 9)
            contextObj.chkBxValuesforRecipients = contextObj.notificationRecipientsDetails;
    }

    onSubmitData(event) {
        debugger
        var contextObj = this;
        if (this.moduleId == 9) {
            var lstbox = contextObj.fieldDetailsAddEdit.find(function (item) {
                return item.FieldId === 2817;
            });
            var notif = contextObj.fieldDetailsAddEdit.find(function (item) {
                return item.FieldId === 2813;
            });
            if (lstbox.LookupDetails.LookupValues != null) {
                if ((!contextObj.recipients && lstbox.LookupDetails.LookupValues.length <= 0 && notif.FieldValue == "true") ||
                    (contextObj.recipients && contextObj.recipients["HasValidationError"]))
                    return;
            }
        }
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
        var arrRptField = [5827, 5832, 7517, 5838];
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
                case 7517:
                    if (contextObj.moduleId == 9) {
                        var NotificationString = "";
                        if (contextObj.recipients && contextObj.recipients.LookupDetails.LookupValues && contextObj.recipients.LookupDetails.LookupValues.length > 0)
                            for (var itemVal of contextObj.recipients.LookupDetails.LookupValues)
                                NotificationString += itemVal.CategoryId.toString() + "§";
                        item.Value = NotificationString;
                        count--;
                    }
                    break;
                case 5838:
                    if (item.Value == "No")
                        item.Value = false;
                    else if (item.Value == "Yes")
                        item.Value = true;
                    count--;
                    break;
            }
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
        var contextObj = this;
        var chkBoxNotifyRequester = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1086;
        });
        var chkBoxNotification = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2813;
        });
        var ddlMessageTemplate = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2814;
        });
        var chkBoxRepeatReminder = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2815;
        });
        var txtEveryDays = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2816;
        });
        var dylstBxRecipients = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2817;
        });
        if (event.chkBoxObject.fieldId == 1086) {
            contextObj.isNotifyRequester = event.chkBoxObject.IsChecked;
            if (contextObj.isNotifyRequester == true) {
                chkBoxNotifyRequester.FieldValue = "true";
            }
            else if (contextObj.isNotifyRequester == false) {
                chkBoxNotifyRequester.FieldValue = "false";
            }
        } else if (event.chkBoxObject.fieldId == 2813) {
            contextObj.isNotification = event.chkBoxObject.IsChecked;
            if (contextObj.isNotification == true) {
                chkBoxNotification.FieldValue = "true";
                ddlMessageTemplate.IsEnabled = true;
                ddlMessageTemplate.IsMandatory = true;
                ddlMessageTemplate.HasValidationError = true;
                ddlMessageTemplate.IsLocallyValidated = false;

                chkBoxRepeatReminder.IsEnabled = true;
                //txtEveryDays.IsEnabled = true;
                dylstBxRecipients.IsEnabled = true;
                dylstBxRecipients.IsMandatory = true;
                dylstBxRecipients.HasValidationError = true;
                dylstBxRecipients.IsLocallyValidated = false;

                contextObj.chkBxValuesforRecipients = [];
                contextObj.notificationRecipientsDetails = [];
                if (contextObj.recipients)
                    toEnable(true);
            } else if (contextObj.isNotification == false) {
                chkBoxNotification.FieldValue = "false";
                ddlMessageTemplate.IsEnabled = false;
                ddlMessageTemplate.IsMandatory = false;
                ddlMessageTemplate.HasValidationError = false;
                ddlMessageTemplate.IsLocallyValidated = false;
                ddlMessageTemplate.FieldValue = "-1";

                chkBoxRepeatReminder.IsEnabled = false;
                chkBoxRepeatReminder.FieldValue = "false";

                txtEveryDays.IsMandatory = false;
                txtEveryDays.HasValidationError = false;
                txtEveryDays.IsLocallyValidated = false
                txtEveryDays.IsEnabled = false;
                txtEveryDays.FieldValue = "";

                dylstBxRecipients.IsEnabled = false;
                dylstBxRecipients.IsMandatory = false;
                dylstBxRecipients.HasValidationError = false;
                dylstBxRecipients.IsLocallyValidated = false;
                dylstBxRecipients["LookupDetails"]["LookupValues"] = [];
           

                contextObj.chkBxValuesforRecipients = [];
                contextObj.notificationRecipientsDetails = [];
                if (contextObj.recipients)
                    toEnable(false);
             
             
                
            }

        } else if (event.chkBoxObject.fieldId == 2815) {
            contextObj.needRepeatReminder = event.chkBoxObject.IsChecked;
            if (contextObj.needRepeatReminder == true) {
                chkBoxRepeatReminder.FieldValue = "true";
                txtEveryDays.IsEnabled = true;
                txtEveryDays.IsMandatory = true;
                txtEveryDays.HasValidationError = true;
                txtEveryDays.IsLocallyValidated = false;
                txtEveryDays.FieldValue = "1";
            }
            else if (contextObj.needRepeatReminder == false) {
                chkBoxRepeatReminder.FieldValue = "false";
                txtEveryDays.IsEnabled = false;
                txtEveryDays.IsMandatory = false;
                txtEveryDays.HasValidationError = false;
                txtEveryDays.FieldValue = "";
            }
        }
        function toEnable(value) {
            contextObj.recipients["IsEnabled"] = value;
            contextObj.recipients["IsMandatory"] = value;
            contextObj.recipients["HasValidationError"] = value;
            contextObj.recipients["LookupDetails"]["LookupValues"] = [];
        }   
    }

    fieldChange(event: any) {
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
        var ddlUser = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1171;
        }); 
        var notifyRequester = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 1086;
        });
        var chkBxNotification = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2813;
        });        
        var ddlMessageTemplate = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2814;
        });  
        var chkBxRepeatReminder = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2815;
        }); 
        var txtBxEveryDays = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2816;
        }); 
        var dyLstBxRecipients = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2817;
        }); 
        if (this.action == "add") {
            if (fieldLabel == "Workflow Entity") {
                this.workflowEntityCategoryId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
                var workflowEntityFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];  
                ddlOutcomeType.IsMandatory = false;
                ddlOutcomeType.HasValidationError = false;
                ddlOutcomeType.IsEnabled = false;
                ddlOutcomeType.IsVisible = true;
                ddlOutcomeType.FieldValue = "-1";

                notifyRequester.IsEnabled = false;
                notifyRequester.IsVisible = false;               
               
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

                if (this.moduleId == 9) {
                    ddlMessageTemplate.IsEnabled = false;
                    ddlMessageTemplate.IsVisible = true;
                    ddlMessageTemplate.IsMandatory = false;
                    ddlMessageTemplate.HasValidationError = false;
                    ddlMessageTemplate.FieldValue = "-1";

                    chkBxNotification.IsEnabled = false;
                    chkBxNotification.IsVisible = true;
                    chkBxNotification.FieldValue = "false";

                    chkBxRepeatReminder.IsEnabled = false;
                    chkBxRepeatReminder.IsVisible = true;
                    chkBxRepeatReminder.FieldValue = "false";

                    txtBxEveryDays.IsMandatory = false;
                    txtBxEveryDays.HasValidationError = false;
                    txtBxEveryDays.IsLocallyValidated = false;
                    txtBxEveryDays.IsEnabled = false;
                    txtBxEveryDays.IsVisible = true;
                    txtBxEveryDays.FieldValue = "";

                    dyLstBxRecipients.IsEnabled = false;
                    dyLstBxRecipients.IsVisible = true;
                    dyLstBxRecipients.IsMandatory = false;
                    dyLstBxRecipients.HasValidationError = false;
                    dyLstBxRecipients.LookupDetails.LookupValues = [];
                }
                                      
                if (this.workflowEntityCategoryId > -1 && workflowEntityFieldId == 1080) {
                    chkBxNotification.IsEnabled = true;

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

                    var arrList = new Array();
                    arrList.push(
                        {
                            ReportFieldId: 6557,
                            Value: this.workflowEntityCategoryId
                        }
                    );
                    this.workFlowService.loadMessageTemplateforOutcome(51200, JSON.stringify(arrList)).subscribe(function (resultData) {
                        if (resultData["Data"] != "[]") {
                            ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                        }
                    });
                    if (this.moduleId == 9) {
                        chkBxNotification.IsEnabled = true;
                        chkBxNotification.IsVisible = true;
                    }                   
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
                    if (this.moduleId == 9) {
                        notifyRequester.IsEnabled = false;
                        notifyRequester.IsVisible = false;

                        ddlMessageTemplate.IsEnabled = false;
                        ddlMessageTemplate.IsVisible = true;
                        ddlMessageTemplate.IsMandatory = false;
                        ddlMessageTemplate.HasValidationError = false;
                        ddlMessageTemplate.FieldValue = "-1";

                        chkBxNotification.FieldValue = "false";

                        chkBxRepeatReminder.IsEnabled = false;
                        chkBxRepeatReminder.IsVisible = true;
                        chkBxRepeatReminder.FieldValue = "false";

                        txtBxEveryDays.IsMandatory = false;
                        txtBxEveryDays.HasValidationError = false;
                        txtBxEveryDays.IsLocallyValidated = false;
                        txtBxEveryDays.IsEnabled = false;
                        txtBxEveryDays.IsVisible = true;
                        txtBxEveryDays.FieldValue = "";

                        dyLstBxRecipients.IsEnabled = false;
                        dyLstBxRecipients.IsVisible = true;
                        dyLstBxRecipients.IsMandatory = false;
                        dyLstBxRecipients.HasValidationError = false;
                        dyLstBxRecipients.LookupDetails.LookupValues = [];
                    }
                }
            } 
            if (this.workflowEntityCategoryId != 1) {
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

    listbuttonadd(event: any) {
        var contextObj = this;
        contextObj.pageTitle = "Add Reminder Recipients";
        contextObj.recipients = event["FieldObject"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    listbuttondelete(event: any) {
        var contextObj = this;
        contextObj.tempRecipientsList = "";
        if (event["SelectedId"] == -1 && event["FieldObject"] != undefined)
            contextObj.notificationService.ShowToaster("Select Recipient(s)", 2);
        else {
            contextObj.recipients = event["FieldObject"];
            for (let i = 0; i < contextObj.recipients["LookupDetails"]["LookupValues"].length; i++) {
                contextObj.tempRecipientsList = contextObj.recipients["LookupDetails"]["LookupValues"][i].Value;
                contextObj.notificationRecipientsListForInsert = contextObj.notificationRecipientsListForInsert + contextObj.tempRecipientsList;
            }
        }
        
        if (event.SelectedId && event.SelectedId.toString().indexOf('li') > -1){
            var recipientIds = event["SelectedId"].split("li")[0];
            if (this.chkBxValuesforRecipients != undefined) {
                var index = contextObj.chkBxValuesforRecipients.findIndex(function (item) {
                    return item.Id == recipientIds;
                });
                if (index > -1)
                    contextObj.chkBxValuesforRecipients.splice(index, 1);
            } else if (this.notificationRecipientsDetails != undefined) {
                var index = contextObj.notificationRecipientsDetails.findIndex(function (item) {
                    return item.Id == recipientIds;
                });
                if (index > -1)
                    contextObj.notificationRecipientsDetails.splice(index, 1);

            }
        }
    }

    Remove() {
        var ContextObj = this;
        var temp = ContextObj;
    }

    OnSuccessfulSubmit(event: any) {
        var contextObj = this;
        contextObj.tempRecipientId = "";
        contextObj.recipientUserIds = "";
        contextObj.recipientUserGroupIds = "";
        contextObj.notificationRecipientsListForInsert = "";
        var temp = new Array();
        if (contextObj.chkBxValuesforRecipients != undefined && contextObj.chkBxValuesforRecipients.length > 0) {
            contextObj.chkBxValuesforRecipients = contextObj.chkBxValuesforRecipients.concat(event["arrayList"]);
            var InsertValues = [];
            var uniquesData = [];
            var index;
            for (var i = 0; i < contextObj.chkBxValuesforRecipients.length; i++) {
                index = InsertValues.indexOf(contextObj.chkBxValuesforRecipients[i].CategoryId);
                if (index == -1) {
                    InsertValues.push(contextObj.chkBxValuesforRecipients[i].CategoryId);
                    uniquesData.push(contextObj.chkBxValuesforRecipients[i]);
                } else {
                    uniquesData[index].DIFF += contextObj.chkBxValuesforRecipients[i].DIFF;
                }
            }
            contextObj.chkBxValuesforRecipients = uniquesData;
        } else {
            contextObj.chkBxValuesforRecipients = event["arrayList"];
        }
        contextObj.recipients["LookupDetails"]["LookupValues"] = contextObj.chkBxValuesforRecipients;
        for (var j = 0; j < contextObj.chkBxValuesforRecipients.length; j++) {
            var userCatergoryId = contextObj.chkBxValuesforRecipients[j].CategoryId.toString();
            contextObj.recipientNames = contextObj.recipientNames + userCatergoryId + "§";
            contextObj.tempRecipientsList = contextObj.tempRecipientsList + contextObj.chkBxValuesforRecipients[j].Value;
            contextObj.notificationRecipientsListForInsert += contextObj.tempRecipientsList;            
        }
        contextObj.recipientsList.emit({ "RecipientsList": contextObj.notificationRecipientsListForInsert });
        //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
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