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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var documents_service_1 = require('../../../Models/Documents/documents.service');
//import {DocumentAddEditComponent} from '../../../Whatever/Documents/Documents/documentaddedit.component';
var documentaddedit_component_1 = require('../Documents/documentaddedit.component');
var DocumentExplorerDetails = (function () {
    function DocumentExplorerDetails(notificationService, documentService) {
        this.notificationService = notificationService;
        this.documentService = documentService;
        this.dataKey = "Id";
        this.firstColumObj = [];
        this.secondColumObj = [];
        this.isFirstField = true;
        this.menuData = [
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": null
            },
        ];
        this.enableMenu = [1];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.editSuccess = new core_1.EventEmitter();
        this.totalItems = 1;
    }
    DocumentExplorerDetails.prototype.ngOnInit = function () {
        var contextObj = this;
        var selectDocumentId = 0;
        if (this.fieldDetails && this.fieldDetails.length > 0) {
            selectDocumentId = this.fieldDetails[this.fieldDetails.length - 1]["DocumentId"];
            this.enableMenu = [];
            this.totalItems = 0;
        }
        else {
            selectDocumentId = this.fieldDetails.DocumentId;
            this.enableMenu = [1];
        }
        this.documentService.loadDocumentExplorerDetails(selectDocumentId).subscribe(function (resultData) {
            var _loop_1 = function(i) {
                if (resultData["Data"][i].DataEntryControlId == 7) {
                    if (resultData["Data"][i].LookupDetails.LookupValues != null || resultData["Data"][i].LookupDetails.LookupValues != undefined) {
                        var _loop_2 = function(j) {
                            resultData["Data"][i].MultiFieldValues.find(function (item) {
                                if (item == resultData["Data"][i].LookupDetails.LookupValues[j].Id) {
                                    if (resultData["Data"][i].FieldValue == null)
                                        resultData["Data"][i].FieldValue = resultData["Data"][i].LookupDetails.LookupValues[j].Value;
                                    else
                                        resultData["Data"][i].FieldValue = resultData["Data"][i].FieldValue + ', ' + resultData["Data"][i].LookupDetails.LookupValues[j].Value;
                                }
                            });
                        };
                        for (var j = 0; j < resultData["Data"][i].LookupDetails.LookupValues.length; j++) {
                            _loop_2(j);
                        }
                    }
                }
            };
            for (var i = 0; i < resultData["Data"].length; i++) {
                _loop_1(i);
            }
            //for (let i = 0; i < resultData["Data"].length; i++) {
            //    resultData["Data"][i].DataEntryControlId = 1;
            //    resultData["Data"][i].GenericDataTypeId = 6;
            //    resultData["Data"][i].WhitelistId = 3;
            //    resultData["Data"][i].IsEnabled = false; 
            //    resultData["Data"][i].IsMandatory = false;
            //    resultData["Data"][i].IsLocallyValidated = true;
            //    resultData["Data"][i].HasValidationError = false;
            //}          
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData["Data"][i].IsVisible == true) {
                    if (contextObj.isFirstField == true) {
                        contextObj.firstColumObj.push(resultData["Data"][i]);
                        contextObj.isFirstField = false;
                    }
                    else if (contextObj.isFirstField == false) {
                        contextObj.secondColumObj.push(resultData["Data"][i]);
                        contextObj.isFirstField = true;
                    }
                }
            }
            contextObj.fieldDetailsObj = resultData["Data"];
        });
    };
    DocumentExplorerDetails.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                this.pageTitle = "Edit Document";
                this.editClick();
                break;
            case 2:
                this.pageTitle = "View Document";
                break;
        }
    };
    DocumentExplorerDetails.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (contextObj.fieldDetails["Document Status"] == "Active") {
            this.documentService.loadDocumentAddEditFields(contextObj.fieldDetails.DocumentId, 2).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i].FieldId == 2423) {
                        contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                        contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                        if (contextObj.fieldDetailsAddEdit[i].FieldValue == "1")
                            contextObj.fieldDetailsAddEdit[i].FieldValue = "70";
                    }
                    if (contextObj.fieldDetailsAddEdit[i].FieldId == 2414) {
                        contextObj.fieldDetailsAddEdit[i].IsVisible = false;
                    }
                    else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2415) {
                        contextObj.fieldDetailsAddEdit[i].DataEntryControlId = 1;
                        contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                    }
                    else if (contextObj.fieldDetailsAddEdit[i].FieldId == 2424) {
                        contextObj.fieldDetailsAddEdit[i].FieldLabel = "Date of Upload";
                        contextObj.fieldDetailsAddEdit[i].IsVisible = true;
                    }
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Document is not in Active status, cannot be edited", 2);
        }
    };
    DocumentExplorerDetails.prototype.OnSuccessfulSubmit = function (event) {
        this.editSuccess.emit({ status: event });
    };
    DocumentExplorerDetails.prototype.onSubmitData = function (event) {
    };
    DocumentExplorerDetails.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentExplorerDetails.prototype, "editSuccess", void 0);
    DocumentExplorerDetails = __decorate([
        core_1.Component({
            selector: 'documentEplorer-details',
            templateUrl: 'app/Views/Documents/Document Explorer/document-details-component.html',
            directives: [fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, notify_component_1.Notification, split_view_component_1.SplitViewComponent, documentaddedit_component_1.DocumentAddEditComponent],
            providers: [notify_service_1.NotificationService, documents_service_1.DocumentService],
            inputs: ['fieldDetails']
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, documents_service_1.DocumentService])
    ], DocumentExplorerDetails);
    return DocumentExplorerDetails;
}());
exports.DocumentExplorerDetails = DocumentExplorerDetails;
//# sourceMappingURL=document-details-component.js.map