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
var documents_service_1 = require('../../../Models/Documents/documents.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var sendforapproval_component_1 = require('../../common/review/sendforapproval.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var common_service_1 = require('../../../models/common/common.service');
var DocumentAddEditComponent = (function () {
    function DocumentAddEditComponent(documentService, _validateService, _notificationService, getData, commonService, administrationService) {
        this.documentService = documentService;
        this._validateService = _validateService;
        this._notificationService = _notificationService;
        this.getData = getData;
        this.commonService = commonService;
        this.administrationService = administrationService;
        this.DocumentAddEditFormId = 439;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isDocPublishSubscribed = false;
        this.rowData = [];
        this.submitSuccess = new core_1.EventEmitter();
    }
    DocumentAddEditComponent.prototype.onSubmitData = function (event) {
        debugger;
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event, 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event, 2);
                break;
            case "revise":
                this.postSubmit(contextObj, event, 3);
                break;
            case "replace":
                this.postSubmit(contextObj, event, 4);
                break;
        }
    };
    DocumentAddEditComponent.prototype.OnSuccessfullRequestSent = function (event) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = false;
        contextObj._notificationService.ShowToaster("Document uploaded", 3);
        contextObj.submitSuccess.emit({ status: "success", returnData: event.returnData });
    };
    DocumentAddEditComponent.prototype.postSubmit = function (contextObj, event, target) {
        //var contextObj = this;      
        var temp = JSON.parse(event["fieldobject"]);
        //contextObj.rowData = [];
        //contextObj.rowData: any[];// = new Array("Mary", "Tom", "Jack", "Jill")  
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].ReportFieldId == 972) {
                if (temp[i]["Value"] == "70")
                    temp[i]["Value"] = 1;
                else
                    temp[i]["Value"] = 2;
            }
            if (temp[i].ReportFieldId == 973) {
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = null;
            }
            if (temp[i].ReportFieldId == 967) {
                contextObj.rowData["Document Number"] = temp[i]["Value"];
            }
            if (temp[i].ReportFieldId == 960) {
                contextObj.rowData["File Name"] = temp[i]["Value"];
            }
        }
        //var docNum = temp.find(function (item) { return item.ReportFieldId === 967 });
        //var fileName = temp.find(function (item) { return item.ReportFieldId === 960 });
        event["fieldobject"] = JSON.stringify(temp);
        contextObj.rowData["Latest Revision No"] = 0;
        contextObj.documentService.postSubmitDocument(event["fieldobject"], event["filedata"], contextObj.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData;
            contextObj.DocId = resultData.ServerId;
            switch (resultData.StatusId) {
                case -1:
                    contextObj._notificationService.ShowToaster("Document Number already exists", 5);
                    break;
                case -2:
                    contextObj._notificationService.ShowToaster("Last Modified Date must be greater than or equal to Document Date", 5);
                    break;
                case -3:
                    contextObj._notificationService.ShowToaster("Selected Document and File Type are not matching", 5);
                    break;
                case -4:
                    contextObj._notificationService.ShowToaster("Select a valid File", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj.getCustomerSubscribedFeatures1(contextObj);
                    }
                    else if (target == 2) {
                        contextObj._notificationService.ShowToaster("Document updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else if (target == 3) {
                        contextObj._notificationService.ShowToaster("Document revised", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else if (target == 4) {
                        contextObj._notificationService.ShowToaster("Document replaced", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    ////contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    break;
            }
        });
    };
    DocumentAddEditComponent.prototype.getCustomerSubscribedFeatures1 = function (contextObj) {
        contextObj.administrationService.getCustomerSubscribedFeatures("233").subscribe(function (result) {
            if (contextObj.getData.checkForUnhandledErrors(result)) {
                var customerFeatureobj = result["Data"];
                contextObj.isDocPublishSubscribed = customerFeatureobj[0]["IsSubscribed"];
                if (contextObj.isDocPublishSubscribed == true) {
                    //contextObj.selectedId = contextObj.selectedId;             
                    contextObj.action = "sendforapproval";
                    contextObj.pageTitle = "Request for Publish";
                    contextObj.splitviewInput.showSecondaryView = true;
                }
                else {
                    contextObj._notificationService.ShowToaster("Document uploaded", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                }
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentAddEditComponent.prototype, "submitSuccess", void 0);
    DocumentAddEditComponent = __decorate([
        core_1.Component({
            selector: 'documents-add-edit',
            templateUrl: 'app/Views/Documents/Documents/documentaddedit.component.html',
            providers: [documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService, administration_service_1.AdministrationService, common_service_1.CommonService],
            //providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, ConfirmationService, GeneralFunctions, DocumentService, CommonService]
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, sendforapproval_component_1.SendForApprovalComponent, split_view_component_1.SplitViewComponent],
            inputs: ['rowData', 'selectedId', 'action', 'fieldDetailsAddEdit', 'btnName']
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, validation_service_1.ValidateService, notify_service_1.NotificationService, General_1.GeneralFunctions, common_service_1.CommonService, administration_service_1.AdministrationService])
    ], DocumentAddEditComponent);
    return DocumentAddEditComponent;
}());
exports.DocumentAddEditComponent = DocumentAddEditComponent;
//# sourceMappingURL=documentaddedit.component.js.map