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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var AttachmentAddEditComponent = (function () {
    function AttachmentAddEditComponent(administrationService, _notificationService, generalFunctions) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "AttachmentId";
        this.submitSuccess = new core_1.EventEmitter();
        this.messageLabel = "";
    }
    AttachmentAddEditComponent.prototype.ngOnInit = function () {
    };
    AttachmentAddEditComponent.prototype.onSubmitData = function (event) {
        this.fileData = event["filedata"];
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    AttachmentAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        //if (Number(contextObj.attachmentCategoryId) != 18)
        //    contextObj.messageLabel = "Attachment";
        if (Number(contextObj.attachmentCategoryId) == 18)
            contextObj.messageLabel = "Document";
        else if (Number(contextObj.attachmentCategoryId) == 12)
            contextObj.messageLabel = "Invoice";
        else
            contextObj.messageLabel = "Attachment";
        var temp = JSON.parse(strsubmitField);
        var newTemp = [];
        for (var i = 0; i < temp.length; i++) {
            if (i != 2) {
                newTemp.push(temp[i]);
            }
        }
        newTemp.push({
            ReportFieldId: 52,
            Value: "11"
        });
        newTemp.push({
            ReportFieldId: 51,
            Value: contextObj.attachmentCategoryId.toString()
        });
        if (contextObj.fileData != undefined) {
            newTemp.push({
                ReportFieldId: 54,
                Value: JSON.parse(contextObj.fileData).FileSize
            });
        }
        else {
            newTemp.push({
                ReportFieldId: 54,
                Value: ""
            });
        }
        for (var i = 0; i < newTemp.length; i++) {
            if (newTemp[i].ReportFieldId == 53 && newTemp[i].Value == null) {
                newTemp[i].Value = "";
                if (contextObj.fileData != undefined) {
                    var fileDataTemp = JSON.parse(contextObj.fileData);
                    fileDataTemp["FileData"] = "";
                    fileDataTemp["FileSize"] = "";
                    //contextObj.fileData = JSON.stringify(fileDataTemp);
                    contextObj.fileData = undefined;
                }
            }
        }
        newTemp.push({
            ReportFieldId: 5741,
            Value: contextObj.baseEnityIdSample
        });
        newTemp.push({
            ReportFieldId: 5742,
            Value: contextObj.leaseRenewalCount
        });
        if (target == 1) {
            this.administrationService.postSubmitAddtAttachmentList(JSON.stringify(newTemp), contextObj.fileData, contextObj.attachmentCategoryId.toString(), contextObj.baseEnityIdSample.toString()).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj._notificationService.ShowToaster(contextObj.messageLabel + " uploaded", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                }
                else if (resultData["Data"].Message == "Invalid File") {
                    contextObj._notificationService.ShowToaster("Select a valid File", 2);
                }
                else {
                    contextObj._notificationService.ShowToaster(contextObj.messageLabel + " already exists", 5);
                }
            });
        }
        else {
            var oldFilName = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 53; });
            if (contextObj.fileData != undefined) {
                var fileDataTemp = JSON.parse(contextObj.fileData);
                fileDataTemp["OldCustAtchmtCategoryId"] = contextObj.customerAttachmentCategoryId;
                fileDataTemp["OldFileName"] = oldFilName.FieldValue;
                contextObj.fileData = JSON.stringify(fileDataTemp);
            }
            this.administrationService.postSubmitEditAttachmentList(JSON.stringify(newTemp), this.fileData, this.selectedId[0], this.attachmentCategoryId.toString(), contextObj.customerAttachmentCategoryId, this.baseEnityIdSample.toString(), oldFilName.FieldValue).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj._notificationService.ShowToaster(contextObj.messageLabel + " updated", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                }
                else if (resultData["Data"].Message == "Object Class Attachment") {
                    contextObj._notificationService.ShowToaster("Asset Class Attachment cannot be edited", 5);
                }
                else if (resultData["Data"].Message == "Invalid File") {
                    contextObj._notificationService.ShowToaster("Select a valid File", 2);
                }
                else {
                    contextObj._notificationService.ShowToaster(contextObj.messageLabel + " already exists", 5);
                }
            });
        }
    };
    AttachmentAddEditComponent.prototype.onFileUpload = function (event) {
        var contextObj = this;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AttachmentAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AttachmentAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AttachmentAddEditComponent.prototype, "submitSuccess", void 0);
    AttachmentAddEditComponent = __decorate([
        core_1.Component({
            selector: 'attachment-add-edit',
            templateUrl: './app/Views/Common/Attachments/attachments-addedit.component.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'attachmentCategoryId', 'customerAttachmentCategoryId', 'baseEnityIdSample', 'leaseRenewalCount'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], AttachmentAddEditComponent);
    return AttachmentAddEditComponent;
}());
exports.AttachmentAddEditComponent = AttachmentAddEditComponent;
//# sourceMappingURL=attachments-addedit.component.js.map