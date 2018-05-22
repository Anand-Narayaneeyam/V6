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
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var notificationRecipients_checkboxgrid_1 = require('../Set Workflow/notificationRecipients-checkboxgrid');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var SetNotificationComponent = (function () {
    function SetNotificationComponent(workFlowService, notificationService, validateService) {
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.validateService = validateService;
        this.dataKey = "Id";
        this.tempRecipientsList = "";
        this.notificationRecipientsListForInsert = "";
        this.recipientUserIds = "";
        this.recipientUserGroupIds = "";
        this.tempRecipientId = "";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.submitSuccess = new core_1.EventEmitter();
        this.recipientsList = new core_1.EventEmitter();
    }
    SetNotificationComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        if (contextObj.fieldDetailsSetNotification != undefined) {
            var ddlActionPoint1 = contextObj.fieldDetailsSetNotification.find(function (item) {
                return item.FieldId === 2801;
            });
            var ddlOutcome1 = this.fieldDetailsSetNotification.find(function (item) {
                return item.FieldId === 2802;
            });
            var dylstBxRecipients = this.fieldDetailsSetNotification.find(function (item) {
                return item.FieldId === 2804;
            });
            contextObj.chkBxValuesforRecipients = dylstBxRecipients.LookupDetails.LookupValues;
            if (ddlActionPoint1.FieldValue != null) {
                contextObj.workFlowService.loadOutcome(ddlActionPoint1.FieldValue, 2801).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"].length != "") {
                        ddlOutcome1.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        if (ddlOutcome1.LookupDetails.LookupValues.length == 1) {
                            ddlOutcome1.FieldValue = ddlOutcome1.LookupDetails.LookupValues[0].Id.toString();
                            ddlOutcome1.HasValidationError = false;
                            contextObj.initiateValidation(ddlOutcome1.FieldId, ddlOutcome1);
                        }
                    }
                });
            }
        }
    };
    SetNotificationComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var lstbox = contextObj.fieldDetailsSetNotification.find(function (item) {
            return item.FieldId === 2804;
        });
        if (this.action == "setNotification") {
            if (contextObj.recipientUserIds == "" && contextObj.recipientUserGroupIds == "") {
                var dylstBxRecipients = this.fieldDetailsSetNotification.find(function (item) {
                    return item.FieldId === 2804;
                });
                var notificationRecipientsDetails = dylstBxRecipients.LookupDetails.LookupValues ? dylstBxRecipients.LookupDetails.LookupValues : [];
                for (var j = 0; j < notificationRecipientsDetails.length; j++) {
                    var userCatergoryId = notificationRecipientsDetails[j]["CategoryId"].toString().split("µ");
                    ;
                    if (userCatergoryId[1] == "1") {
                        contextObj.tempRecipientId = notificationRecipientsDetails[j].Id.toString();
                        contextObj.recipientUserIds = contextObj.recipientUserIds + contextObj.tempRecipientId + "µ";
                    }
                    else if (userCatergoryId[1] == "2") {
                        contextObj.tempRecipientId = notificationRecipientsDetails[j].Id.toString();
                        contextObj.recipientUserGroupIds = contextObj.recipientUserGroupIds + contextObj.tempRecipientId + "µ";
                    }
                }
            }
            this.postSubmit(contextObj, event["fieldobject"]);
        }
    };
    SetNotificationComponent.prototype.postSubmit = function (contextObj, pageDetails) {
        this.workFlowService.postSetNotification(pageDetails, contextObj.recipientUserIds, contextObj.recipientUserGroupIds).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Workflow Notification updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    break;
            }
        });
    };
    SetNotificationComponent.prototype.fieldChange = function (event) {
        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        var ddlActionPoint = this.fieldDetailsSetNotification.find(function (item) {
            return item.FieldId === 2801;
        });
        var ddlOutcome = this.fieldDetailsSetNotification.find(function (item) {
            return item.FieldId === 2802;
        });
        var ddlMessageTemplate = this.fieldDetailsSetNotification.find(function (item) {
            return item.FieldId === 2803;
        });
        var dylstBxRecipients = this.fieldDetailsSetNotification.find(function (item) {
            return item.FieldId === 2804;
        });
        if (fieldLabel == "Action Point") {
            this.actionPointId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            var actionPointFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
            if (this.actionPointId > -1) {
                var actionPoint = this.actionPointDetails.find(function (item) {
                    return item.Id === parseInt(event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"]);
                });
                this.entityCategoryId = actionPoint.EntityCategoryId;
                if (this.entityCategoryId == 1) {
                    this.messageTemplateCategoryId = 1;
                }
                else if (this.entityCategoryId == 3) {
                    this.messageTemplateCategoryId = 11;
                }
                this.workFlowService.loadOutcome(contextObj.actionPointId, actionPointFieldId).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        ddlOutcome.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        if (ddlOutcome.LookupDetails.LookupValues.length == 1) {
                            ddlOutcome.FieldValue = ddlOutcome.LookupDetails.LookupValues[0].Id.toString();
                            ddlOutcome.HasValidationError = false;
                            contextObj.initiateValidation(ddlOutcome.FieldId, ddlOutcome);
                            ddlMessageTemplate.IsMandatory = true;
                            ddlMessageTemplate.HasValidationError = true;
                            ddlMessageTemplate.IsLocallyValidated = false;
                            if (ddlMessageTemplate.LookupDetails.LookupValues) {
                                ddlMessageTemplate.LookupDetails.LookupValues = [];
                                ddlMessageTemplate.FieldValue = "-1";
                            }
                            contextObj.initiateValidation(ddlMessageTemplate.FieldId, ddlMessageTemplate);
                            //dylstBxRecipients.IsMandatory = true;
                            //dylstBxRecipients.HasValidationError = true;
                            //dylstBxRecipients.IsLocallyValidated = false;
                            if (ddlMessageTemplate.LookupDetails.LookupValues)
                                dylstBxRecipients.LookupDetails.LookupValues = [];
                            var actionId = ddlOutcome.FieldValue;
                            var actionData = new Array();
                            actionData.push({
                                ReportFieldId: 5834,
                                Value: actionId
                            });
                            contextObj.workFlowService.loadMessageTemplate(51211, JSON.stringify(actionData)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    //ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                    ddlMessageTemplate.FieldValue = JSON.parse(resultData["Data"])[0].Id.toString();
                                }
                            });
                            contextObj.workFlowService.loadNotificationRecipients(51203, JSON.stringify(actionData)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    dylstBxRecipients.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                    contextObj.chkBxValuesforRecipients = dylstBxRecipients.LookupDetails.LookupValues;
                                }
                            });
                            actionData = [];
                        }
                    }
                });
                var arrList = new Array();
                arrList.push({
                    ReportFieldId: 5472,
                    Value: contextObj.messageTemplateCategoryId
                });
                this.workFlowService.loadMessageTemplate(50783, JSON.stringify(arrList)).subscribe(function (resultData) {
                    if (resultData["Data"] != "[]") {
                        ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    }
                });
                arrList = [];
            }
            else {
                ddlOutcome.LookupDetails.LookupValues = [];
                ddlOutcome.FieldValue = "-1";
                this.initiateValidation(ddlOutcome.FieldId, ddlOutcome);
                ddlMessageTemplate.IsMandatory = true;
                ddlMessageTemplate.HasValidationError = true;
                ddlMessageTemplate.IsLocallyValidated = false;
                ddlMessageTemplate.LookupDetails.LookupValues = [];
                ddlMessageTemplate.FieldValue = "-1";
                this.initiateValidation(ddlMessageTemplate.FieldId, ddlMessageTemplate);
                dylstBxRecipients.LookupDetails.LookupValues = [];
            }
        }
        else if (fieldLabel == "Outcome") {
            this.outcomeId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            var outcomeFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
            if (this.outcomeId > -1) {
                //ddlMessageTemplate.IsMandatory = true;
                //ddlMessageTemplate.HasValidationError = true;
                //ddlMessageTemplate.IsLocallyValidated = false;
                //ddlMessageTemplate.LookupDetails.LookupValues = [];
                ddlMessageTemplate.FieldValue = "-1";
                this.initiateValidation(ddlMessageTemplate.FieldId, ddlMessageTemplate);
                //dylstBxRecipients.IsMandatory = true;
                //dylstBxRecipients.HasValidationError = true;
                //dylstBxRecipients.IsLocallyValidated = false;
                dylstBxRecipients.LookupDetails.LookupValues = [];
                var arrMessageTemplate = new Array();
                arrMessageTemplate.push({
                    ReportFieldId: 5834,
                    Value: contextObj.outcomeId
                });
                this.workFlowService.loadMessageTemplate(51211, JSON.stringify(arrMessageTemplate)).subscribe(function (resultData) {
                    if (resultData["Data"] != "[]") {
                        //ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                        ddlMessageTemplate.FieldValue = JSON.parse(resultData["Data"])[0].Id.toString();
                    }
                });
                var arrRecipients = new Array();
                arrRecipients.push({
                    ReportFieldId: 5834,
                    Value: contextObj.outcomeId
                });
                contextObj.workFlowService.loadNotificationRecipientsInWotkType(51203, JSON.stringify(arrRecipients)).subscribe(function (resultData) {
                    if (resultData["Data"] != "[]") {
                        dylstBxRecipients.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    }
                });
            }
            else {
                //ddlMessageTemplate.IsMandatory = true;
                //ddlMessageTemplate.HasValidationError = true;
                //ddlMessageTemplate.IsLocallyValidated = false;
                //ddlMessageTemplate.LookupDetails.LookupValues = [];
                ddlMessageTemplate.FieldValue = "-1";
                this.initiateValidation(ddlMessageTemplate.FieldId, ddlMessageTemplate);
                dylstBxRecipients.LookupDetails.LookupValues = [];
            }
        }
    };
    SetNotificationComponent.prototype.initiateValidation = function (id, fieldObject) {
        var contextObj = this;
        var el = document.getElementById(id);
        setTimeout(function () {
            contextObj.validateService.initiateValidation(fieldObject, contextObj, true, el);
        }, 100);
    };
    SetNotificationComponent.prototype.listbuttonadd = function (event) {
        var contextObj = this;
        contextObj.pageTitle = "Select Notification Recipients";
        //contextObj.recipients = event["FieldObject"];
        var i = contextObj.fieldDetailsSetNotification.findIndex(function (item) { return item.FieldId === 2804; });
        contextObj.fieldDetailsSetNotification[i] = i > -1 ? event["FieldObject"] : contextObj.fieldDetailsSetNotification[i];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    SetNotificationComponent.prototype.listbuttondelete = function (event) {
        var contextObj = this;
        contextObj.tempRecipientsList = "";
        if (event["SelectedId"] == -1 && event["FieldObject"] != undefined)
            contextObj.notificationService.ShowToaster("Select a Recipient", 2);
        else {
            var dylstBxRecipients = this.fieldDetailsSetNotification.find(function (item) {
                return item.FieldId === event["FieldObject"].FieldId;
            });
            //contextObj.recipients = event["FieldObject"];
            var i = contextObj.fieldDetailsSetNotification.findIndex(function (item) { return item.FieldId === 2804; });
            contextObj.fieldDetailsSetNotification[i] = i > -1 ? event["FieldObject"] : contextObj.fieldDetailsSetNotification[i];
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
        }
    };
    SetNotificationComponent.prototype.Remove = function () {
        var ContextObj = this;
        var temp = ContextObj;
    };
    SetNotificationComponent.prototype.OnSuccessfulSubmit = function (event) {
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
        contextObj.fieldDetailsSetNotification.find(function (item) { return item.FieldId === 2804; })["LookupDetails"]["LookupValues"]
            = contextObj.chkBxValuesforRecipients;
        //contextObj.recipients["LookupDetails"]["LookupValues"] = contextObj.chkBxValuesforRecipients;
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
        contextObj.recipientsList.emit({ "RecipientsList": contextObj.notificationRecipientsListForInsert });
        //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SetNotificationComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SetNotificationComponent.prototype, "submitSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SetNotificationComponent.prototype, "recipientsList", void 0);
    SetNotificationComponent = __decorate([
        core_1.Component({
            selector: 'set-notification',
            templateUrl: 'app/Views/Common/Define Work Type/set-notification.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, split_view_component_1.SplitViewComponent, notificationRecipients_checkboxgrid_1.NotificationRecipientsComponent],
            providers: [workflow_service_1.WorkFlowService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            inputs: ['action', 'fieldDetailsSetNotification', 'btnName', 'actionPointDetails', 'notificationRecipientsDetails']
        }), 
        __metadata('design:paramtypes', [workflow_service_1.WorkFlowService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], SetNotificationComponent);
    return SetNotificationComponent;
}());
exports.SetNotificationComponent = SetNotificationComponent;
//# sourceMappingURL=set-notification.js.map