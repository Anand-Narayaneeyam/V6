import { ViewEncapsulation,Component, Output, EventEmitter, Input } from '@angular/core';
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
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'workflowEscalationNotifications-addedit',
    templateUrl: 'app/Views/Common/Set Workflow/workflowEscalationNotifications-addedit.html',
    directives: [FieldComponent, Notification, NotificationRecipientsComponent, SplitViewComponent, SlideComponent],
    providers: [WorkFlowService, NotificationService, ValidateService],
    inputs: ['workTypeId', 'selectedId', 'action', 'fieldDetailsAddEdit', 'btnName', 'notificationSubjectLookUpDetails', 'notificationRecipientsDetails'],
    encapsulation: ViewEncapsulation.None
})

export class WorkflowEscalationNotificationsAddEditComponent {
    pageTarget: number;
    pageTitle: string;
    showMessageTemplate: boolean = false;
    position: any = "top-right";
    strLstBoxValidateMessage: string = "Select Recipients";
    success: any;
    dataKey: string = "Id";
    moduleId: any;
    workTypeId: any;
    selectedId: number;
    submitDetails: any;
    sourceActionPointId: number;
    destinationActionPointId: number;
    outcomefromSourceActionPointId: any;
    currentMessage: string = "";
    newMessage: string = "";
    recipients: IField[];
    notificationSubjectLookUpDetails: any[];
    notificationRecipientsDetails: any[];
    chkBxValuesforRecipients: any[];
    tempRecipientsList: string = "";
    notificationRecipientsListForInsert: string = "";
    recipientUserIds: string = "";
    recipientUserGroupIds: string = "";
    tempRecipientId: string = "";
    ShowinListItem: string;
    userIds: string = "";
    userGroupIds: string = "";
    public fieldDetailsAddEdit: IField[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    @Input() action: string;
    @Output() recipientsList = new EventEmitter();
    @Output() submitSuccess = new EventEmitter();

    constructor(private workFlowService: WorkFlowService, private notificationService: NotificationService, private validateService: ValidateService) {
    }

    ngOnInit() {
        var contextObj = this;
        if (this.action == "edit") {
            this.chkBxValuesforRecipients = this.notificationRecipientsDetails;
            var msgTemplate = this.fieldDetailsAddEdit.find(function (item) {
                return item.FieldId === 2772;
            });
            this.currentMessage = msgTemplate.FieldValue;
        }
    }

    onSubmitData(event) {
        var contextObj = this;
        var lstbox = contextObj.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2775;
        });
        //if ((!contextObj.recipients && lstbox.LookupDetails.LookupValues.length <= 0) ||
        //    (contextObj.recipients && contextObj.recipients["HasValidationError"]))
        //    return;

        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":               
                //if (contextObj.recipientUserIds == "" || contextObj.recipientUserGroupIds == "") {
                //    for (var j = 0; j < contextObj.chkBxValuesforRecipients.length; j++) {
                //        var userCatergoryId = contextObj.chkBxValuesforRecipients[j].CategoryId.toString().split("µ");
                //        var userId = contextObj.chkBxValuesforRecipients[j].Id;
                //        if (userCatergoryId[1] == "1") 
                //            contextObj.recipientUserIds = contextObj.recipientUserIds + userId + "µ";
                //        else if (userCatergoryId[1] == "2")
                //            contextObj.recipientUserGroupIds = contextObj.recipientUserGroupIds + userId + "µ";
                //    }
                //}
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    }

    postSubmit(contextObj, pageDetails: string, target: number) {
        var lstbox = contextObj.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2775;
        });
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        arr.push(
            {
                ReportFieldId: 12568,
                Value: "1"
            },
            {
                ReportFieldId: 5873,
                Value: contextObj.workTypeId
            }           
        );
        if (lstbox && lstbox.LookupDetails.LookupValues && lstbox.LookupDetails.LookupValues.length > 0){
            for (var j = 0; j < lstbox.LookupDetails.LookupValues.length; j++) {
                var userCatergoryId = lstbox.LookupDetails.LookupValues[j].CategoryId.toString().split("µ");
                var userId = lstbox.LookupDetails.LookupValues[j].Id;
                if (userCatergoryId[1] == "1")
                    contextObj.recipientUserIds = contextObj.recipientUserIds + userId + "µ";
                else if (userCatergoryId[1] == "2")
                    contextObj.recipientUserGroupIds = contextObj.recipientUserGroupIds + userId + "µ";
            }
        }
        this.submitDetails = JSON.stringify(arr);
        this.pageTarget = target;
        var msgTemplate = arr.find(function (item) {
            return item.ReportFieldId === 5475;
        });
        this.newMessage = msgTemplate.Value;
        if (this.newMessage != this.currentMessage) {

            this.showMessageTemplate = !this.showMessageTemplate;
        } else {
            this.submitEscalationData(this.submitDetails, this.recipientUserIds, this.recipientUserGroupIds, this.selectedId, this.pageTarget);
        }
    }

    public submitEscalationData(jsonArry, userIds, userGroupIds, selectedId, target) {
        var contextObj = this;
        this.workFlowService.postWorkflowEscalationsNotifications(jsonArry, userIds, userGroupIds, selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Workflow Escalation Notification added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data[0] });
                    } else {
                        contextObj.notificationService.ShowToaster("Workflow Escalation Notification updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data[0] });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Workflow Escalation Notification already exists", 5);
                    }
                    break;
            }
        });
    }

    okDelete(event: Event) {
        this.submitEscalationData(this.submitDetails, this.recipientUserIds, this.recipientUserGroupIds, this.selectedId, this.pageTarget);
        this.showMessageTemplate = !this.showMessageTemplate;
    }

    cancelClick(event: Event) {
        var tempData = JSON.parse(this.submitDetails);
        var message = tempData.find(function (item) { return item.ReportFieldId === 5475 });
        message.Value = this.currentMessage;
        this.submitDetails = JSON.stringify(tempData);
        this.submitEscalationData(this.submitDetails, this.recipientUserIds, this.recipientUserGroupIds, this.selectedId, this.pageTarget);
        this.showMessageTemplate = !this.showMessageTemplate;
    }

    closeSlideDialog(value: any) {
        this.showMessageTemplate = value.value;
    }

    fieldChange(event: any) {
        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        var ddlOutcomefromSourceActionPoint = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2768;
        });
        var ddlDestinationActionPoint = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2769;
        });
        var ddlOutcomefromDestinationActionPoint = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2770;
        });
        var ddlNotificationSubject = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2771;
        });
        var txtArNotificationMessage = this.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2772;
        });
        if (fieldLabel == "Source Action Point") {
            this.sourceActionPointId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            var sourceActionPointFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
            if (this.sourceActionPointId == -1) {
                ddlDestinationActionPoint.LookupDetails.LookupValues = [];
                ddlDestinationActionPoint.FieldValue = "-1";
                this.initiateValidation(ddlDestinationActionPoint.FieldId, ddlDestinationActionPoint);

                ddlOutcomefromSourceActionPoint.HasValidationError = true;
                ddlOutcomefromSourceActionPoint.IsLocallyValidated = false;
                ddlOutcomefromSourceActionPoint.LookupDetails.LookupValues = [];
                ddlOutcomefromSourceActionPoint.FieldValue = "-1";
                this.initiateValidation(ddlOutcomefromSourceActionPoint.FieldId, ddlOutcomefromSourceActionPoint);

                ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = [];
                ddlOutcomefromDestinationActionPoint.FieldValue = "-1";
                this.initiateValidation(ddlOutcomefromDestinationActionPoint.FieldId, ddlOutcomefromDestinationActionPoint);
            } else {
                ddlOutcomefromSourceActionPoint.LookupDetails.LookupValues = [];
                ddlOutcomefromSourceActionPoint.FieldValue = "-1";
                this.initiateValidation(ddlOutcomefromSourceActionPoint.FieldId, ddlOutcomefromSourceActionPoint);

                if (ddlDestinationActionPoint.LookupDetails.LookupValues && ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues) {
                    ddlDestinationActionPoint.LookupDetails.LookupValues = [];
                    ddlDestinationActionPoint.FieldValue = "-1";
                    this.initiateValidation(ddlDestinationActionPoint.FieldId, ddlDestinationActionPoint);

                    ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = [];
                    ddlOutcomefromDestinationActionPoint.FieldValue = "-1";
                    this.initiateValidation(ddlOutcomefromDestinationActionPoint.FieldId, ddlOutcomefromDestinationActionPoint);
                }
                this.workFlowService.loadOutcomefromSourceActionPoint(contextObj.sourceActionPointId, sourceActionPointFieldId, contextObj.workTypeId).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        ddlOutcomefromSourceActionPoint.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                    }
                });
            }
        } else if (fieldLabel == "Outcome from Source Action Point") {
            this.outcomefromSourceActionPointId = ddlOutcomefromSourceActionPoint.FieldValue;
            ddlDestinationActionPoint.FieldValue = "-1";
            ddlDestinationActionPoint.LookupDetails.LookupValues = [];
            this.initiateValidation(ddlDestinationActionPoint.FieldId, ddlDestinationActionPoint);

            ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = [];
            ddlOutcomefromDestinationActionPoint.FieldValue = "-1";
            this.initiateValidation(ddlOutcomefromDestinationActionPoint.FieldId, ddlOutcomefromDestinationActionPoint);
            if (this.outcomefromSourceActionPointId > -1) {
                var arrList = new Array();
                arrList.push(
                    {
                        ReportFieldId: 5873,
                        Value: this.workTypeId
                    }
                );
                this.workFlowService.loadDestinationActionPoint(51174, JSON.stringify(arrList)).subscribe(function (resultData) {
                    if (resultData["Data"] != "[]") {
                        ddlDestinationActionPoint.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    }
                });  
            }
        }else if (fieldLabel == "Destination Action Point") {
            this.destinationActionPointId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            var destinationActionPointFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
            
            if (this.destinationActionPointId == -1) {
                ddlOutcomefromDestinationActionPoint.HasValidationError = true;
                ddlOutcomefromDestinationActionPoint.IsLocallyValidated = false;
                ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = [];
                ddlOutcomefromDestinationActionPoint.FieldValue = "-1";
                this.initiateValidation(ddlOutcomefromDestinationActionPoint.FieldId, ddlOutcomefromDestinationActionPoint);
            } else {
                ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = [];
                ddlOutcomefromDestinationActionPoint.FieldValue = "-1";
                this.initiateValidation(ddlOutcomefromDestinationActionPoint.FieldId, ddlOutcomefromDestinationActionPoint);
                this.workFlowService.loadOutcomefromDestinationActionPoint(contextObj.destinationActionPointId, destinationActionPointFieldId, contextObj.workTypeId, contextObj.outcomefromSourceActionPointId).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                    }
                });
            }
        } else if (fieldLabel == "Notification Subject") {
            if (ddlNotificationSubject.FieldValue == "-1") {
                txtArNotificationMessage.FieldValue = "";
                txtArNotificationMessage.HasValidationError = true;
                txtArNotificationMessage.IsLocallyValidated = false;
                this.initiateValidation(txtArNotificationMessage.FieldId, txtArNotificationMessage);
            } else {
                var notificationMessage = this.notificationSubjectLookUpDetails.find(function (item) {
                    return item.Id === parseInt(event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"]);
                });
                this.currentMessage = notificationMessage.Message;
                txtArNotificationMessage.FieldValue = notificationMessage.Message;
                txtArNotificationMessage.HasValidationError = false;
                txtArNotificationMessage.IsLocallyValidated = false;
                this.initiateValidation(txtArNotificationMessage.FieldId, txtArNotificationMessage);
            }
        }
    }

    public initiateValidation(id: any, fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(id);
        setTimeout(function () {
            contextObj.validateService.initiateValidation(fieldObject, contextObj, true, el);
        }, 100);
    }

    listbuttonadd(event: any) {
        var contextObj = this;
        contextObj.pageTitle = "Select Notification Recipients";
        //contextObj.recipients = event["FieldObject"];

        var i = contextObj.fieldDetailsAddEdit.findIndex(function (item) { return item.FieldId === 2775 });
        contextObj.fieldDetailsAddEdit[i] = i > -1 ? event["FieldObject"] : contextObj.fieldDetailsAddEdit[i]; 
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    listbuttondelete(event: any) {
        var contextObj = this;
        contextObj.tempRecipientsList = "";
        if (event["SelectedId"] == -1 && event["FieldObject"] != undefined)
            contextObj.notificationService.ShowToaster("Select a Recipient", 2);
        else {
            var i = contextObj.fieldDetailsAddEdit.findIndex(function (item) { return item.FieldId === 2775 });
            contextObj.fieldDetailsAddEdit[i] = i > -1 ? event["FieldObject"] : contextObj.fieldDetailsAddEdit[i]; 
            //contextObj.recipients = event["FieldObject"];
            for (let i = 0; i < event["FieldObject"]["LookupDetails"]["LookupValues"].length; i++) {
                contextObj.tempRecipientsList = event["FieldObject"]["LookupDetails"]["LookupValues"][i].Value;
                contextObj.notificationRecipientsListForInsert = contextObj.notificationRecipientsListForInsert + contextObj.tempRecipientsList;
            }
        }
        if (event.SelectedId && event.SelectedId.toString().indexOf('li') > -1) {
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
        var contextObj = this; 
    }

    OnSuccessfulSubmit(event: any) {
        var contextObj = this;
        contextObj.tempRecipientId = "";
        contextObj.recipientUserIds = "";
        contextObj.recipientUserGroupIds = "";
        if (this.action == "add")
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
        contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 2775 })["LookupDetails"]["LookupValues"]
            = contextObj.chkBxValuesforRecipients;
        //for (var j = 0; j < contextObj.chkBxValuesforRecipients.length; j++) {
        //    var userCatergoryId = contextObj.chkBxValuesforRecipients[j].CategoryId.toString().split("µ");
        //    contextObj.tempRecipientsList = contextObj.tempRecipientsList + contextObj.chkBxValuesforRecipients[j].Value;
        //    contextObj.notificationRecipientsListForInsert += contextObj.tempRecipientsList;
        //    if (userCatergoryId[1] == "1") {
        //        contextObj.tempRecipientId = contextObj.chkBxValuesforRecipients[j].Id;
        //        contextObj.recipientUserIds = contextObj.recipientUserIds + contextObj.tempRecipientId + "µ";
        //    } else if (userCatergoryId[1] == "2") {
        //        contextObj.tempRecipientId = contextObj.chkBxValuesforRecipients[j].Id;
        //        contextObj.recipientUserGroupIds = contextObj.recipientUserGroupIds + contextObj.tempRecipientId + "µ";
        //    }
        //}
        //contextObj.recipientsList.emit({ "RecipientsList": contextObj.notificationRecipientsListForInsert });
        //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;        
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}