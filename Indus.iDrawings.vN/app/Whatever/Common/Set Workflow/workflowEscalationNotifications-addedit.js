var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var workflow_service_1 = require('../../../Models/Common/workflow.service');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var notificationRecipients_checkboxgrid_1 = require('./notificationRecipients-checkboxgrid');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var WorkflowEscalationNotificationsAddEditComponent = (function () {
    function WorkflowEscalationNotificationsAddEditComponent(workFlowService, notificationService, validateService) {
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.validateService = validateService;
        this.showMessageTemplate = false;
        this.position = "top-right";
        this.strLstBoxValidateMessage = "Select Recipients";
        this.dataKey = "Id";
        this.currentMessage = "";
        this.newMessage = "";
        this.tempRecipientsList = "";
        this.notificationRecipientsListForInsert = "";
        this.recipientUserIds = "";
        this.recipientUserGroupIds = "";
        this.tempRecipientId = "";
        this.userIds = "";
        this.userGroupIds = "";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.recipientsList = new core_1.EventEmitter();
        this.submitSuccess = new core_1.EventEmitter();
    }
    WorkflowEscalationNotificationsAddEditComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        if (this.action == "edit") {
            this.chkBxValuesforRecipients = this.notificationRecipientsDetails;
            var msgTemplate = this.fieldDetailsAddEdit.find(function (item) {
                return item.FieldId === 2772;
            });
            this.currentMessage = msgTemplate.FieldValue;
        }
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.onSubmitData = function (event) {
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
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.postSubmit = function (contextObj, pageDetails, target) {
        var lstbox = contextObj.fieldDetailsAddEdit.find(function (item) {
            return item.FieldId === 2775;
        });
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        arr.push({
            ReportFieldId: 12568,
            Value: "1"
        }, {
            ReportFieldId: 5873,
            Value: contextObj.workTypeId
        });
        if (lstbox && lstbox.LookupDetails.LookupValues && lstbox.LookupDetails.LookupValues.length > 0) {
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
        }
        else {
            this.submitEscalationData(this.submitDetails, this.recipientUserIds, this.recipientUserGroupIds, this.selectedId, this.pageTarget);
        }
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.submitEscalationData = function (jsonArry, userIds, userGroupIds, selectedId, target) {
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
                    }
                    else {
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
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.okDelete = function (event) {
        this.submitEscalationData(this.submitDetails, this.recipientUserIds, this.recipientUserGroupIds, this.selectedId, this.pageTarget);
        this.showMessageTemplate = !this.showMessageTemplate;
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.cancelClick = function (event) {
        var tempData = JSON.parse(this.submitDetails);
        var message = tempData.find(function (item) { return item.ReportFieldId === 5475; });
        message.Value = this.currentMessage;
        this.submitDetails = JSON.stringify(tempData);
        this.submitEscalationData(this.submitDetails, this.recipientUserIds, this.recipientUserGroupIds, this.selectedId, this.pageTarget);
        this.showMessageTemplate = !this.showMessageTemplate;
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.closeSlideDialog = function (value) {
        this.showMessageTemplate = value.value;
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.fieldChange = function (event) {
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
            }
            else {
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
                        ddlOutcomefromSourceActionPoint.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                    }
                });
            }
        }
        else if (fieldLabel == "Outcome from Source Action Point") {
            this.outcomefromSourceActionPointId = ddlOutcomefromSourceActionPoint.FieldValue;
            ddlDestinationActionPoint.FieldValue = "-1";
            ddlDestinationActionPoint.LookupDetails.LookupValues = [];
            this.initiateValidation(ddlDestinationActionPoint.FieldId, ddlDestinationActionPoint);
            ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = [];
            ddlOutcomefromDestinationActionPoint.FieldValue = "-1";
            this.initiateValidation(ddlOutcomefromDestinationActionPoint.FieldId, ddlOutcomefromDestinationActionPoint);
            if (this.outcomefromSourceActionPointId > -1) {
                var arrList = new Array();
                arrList.push({
                    ReportFieldId: 5873,
                    Value: this.workTypeId
                });
                this.workFlowService.loadDestinationActionPoint(51174, JSON.stringify(arrList)).subscribe(function (resultData) {
                    if (resultData["Data"] != "[]") {
                        ddlDestinationActionPoint.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    }
                });
            }
        }
        else if (fieldLabel == "Destination Action Point") {
            this.destinationActionPointId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            var destinationActionPointFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
            if (this.destinationActionPointId == -1) {
                ddlOutcomefromDestinationActionPoint.HasValidationError = true;
                ddlOutcomefromDestinationActionPoint.IsLocallyValidated = false;
                ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = [];
                ddlOutcomefromDestinationActionPoint.FieldValue = "-1";
                this.initiateValidation(ddlOutcomefromDestinationActionPoint.FieldId, ddlOutcomefromDestinationActionPoint);
            }
            else {
                ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = [];
                ddlOutcomefromDestinationActionPoint.FieldValue = "-1";
                this.initiateValidation(ddlOutcomefromDestinationActionPoint.FieldId, ddlOutcomefromDestinationActionPoint);
                this.workFlowService.loadOutcomefromDestinationActionPoint(contextObj.destinationActionPointId, destinationActionPointFieldId, contextObj.workTypeId, contextObj.outcomefromSourceActionPointId).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        ddlOutcomefromDestinationActionPoint.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                    }
                });
            }
        }
        else if (fieldLabel == "Notification Subject") {
            if (ddlNotificationSubject.FieldValue == "-1") {
                txtArNotificationMessage.FieldValue = "";
                txtArNotificationMessage.HasValidationError = true;
                txtArNotificationMessage.IsLocallyValidated = false;
                this.initiateValidation(txtArNotificationMessage.FieldId, txtArNotificationMessage);
            }
            else {
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
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.initiateValidation = function (id, fieldObject) {
        var contextObj = this;
        var el = document.getElementById(id);
        setTimeout(function () {
            contextObj.validateService.initiateValidation(fieldObject, contextObj, true, el);
        }, 100);
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.listbuttonadd = function (event) {
        var contextObj = this;
        contextObj.pageTitle = "Select Notification Recipients";
        //contextObj.recipients = event["FieldObject"];
        var i = contextObj.fieldDetailsAddEdit.findIndex(function (item) { return item.FieldId === 2775; });
        contextObj.fieldDetailsAddEdit[i] = i > -1 ? event["FieldObject"] : contextObj.fieldDetailsAddEdit[i];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.listbuttondelete = function (event) {
        var contextObj = this;
        contextObj.tempRecipientsList = "";
        if (event["SelectedId"] == -1 && event["FieldObject"] != undefined)
            contextObj.notificationService.ShowToaster("Select a Recipient", 2);
        else {
            var i = contextObj.fieldDetailsAddEdit.findIndex(function (item) { return item.FieldId === 2775; });
            contextObj.fieldDetailsAddEdit[i] = i > -1 ? event["FieldObject"] : contextObj.fieldDetailsAddEdit[i];
            //contextObj.recipients = event["FieldObject"];
            for (var i_1 = 0; i_1 < event["FieldObject"]["LookupDetails"]["LookupValues"].length; i_1++) {
                contextObj.tempRecipientsList = event["FieldObject"]["LookupDetails"]["LookupValues"][i_1].Value;
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
            }
            else if (this.notificationRecipientsDetails != undefined) {
                var index = contextObj.notificationRecipientsDetails.findIndex(function (item) {
                    return item.Id == recipientIds;
                });
                if (index > -1)
                    contextObj.notificationRecipientsDetails.splice(index, 1);
            }
        }
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.Remove = function () {
        var contextObj = this;
    };
    WorkflowEscalationNotificationsAddEditComponent.prototype.OnSuccessfulSubmit = function (event) {
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
                }
                else {
                    uniquesData[index].DIFF += contextObj.chkBxValuesforRecipients[i].DIFF;
                }
            }
            contextObj.chkBxValuesforRecipients = uniquesData;
        }
        else {
            contextObj.chkBxValuesforRecipients = event["arrayList"];
        }
        contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 2775; })["LookupDetails"]["LookupValues"]
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WorkflowEscalationNotificationsAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WorkflowEscalationNotificationsAddEditComponent.prototype, "recipientsList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WorkflowEscalationNotificationsAddEditComponent.prototype, "submitSuccess", void 0);
    WorkflowEscalationNotificationsAddEditComponent = __decorate([
        core_1.Component({
            selector: 'workflowEscalationNotifications-addedit',
            templateUrl: 'app/Views/Common/Set Workflow/workflowEscalationNotifications-addedit.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, notificationRecipients_checkboxgrid_1.NotificationRecipientsComponent, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent],
            providers: [workflow_service_1.WorkFlowService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            inputs: ['workTypeId', 'selectedId', 'action', 'fieldDetailsAddEdit', 'btnName', 'notificationSubjectLookUpDetails', 'notificationRecipientsDetails'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [workflow_service_1.WorkFlowService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], WorkflowEscalationNotificationsAddEditComponent);
    return WorkflowEscalationNotificationsAddEditComponent;
}());
exports.WorkflowEscalationNotificationsAddEditComponent = WorkflowEscalationNotificationsAddEditComponent;
//# sourceMappingURL=workflowEscalationNotifications-addedit.js.map