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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var DocumentGroupAddEditComponent = (function () {
    function DocumentGroupAddEditComponent(documentService, _notificationService, generalFunctions) {
        this.documentService = documentService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    DocumentGroupAddEditComponent.prototype.ngOnInit = function () {
    };
    DocumentGroupAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    DocumentGroupAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        contextObj.documentService.DocumentGroupSubmitAddEdit(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Document Group added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Document Group updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Document Group already exists", 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DocumentGroupAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DocumentGroupAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentGroupAddEditComponent.prototype, "submitSuccess", void 0);
    DocumentGroupAddEditComponent = __decorate([
        core_1.Component({
            selector: 'documentGroup-add-edit',
            templateUrl: './app/Views/Documents/Access Control/document-group-addedit-component.html',
            providers: [documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], DocumentGroupAddEditComponent);
    return DocumentGroupAddEditComponent;
}());
exports.DocumentGroupAddEditComponent = DocumentGroupAddEditComponent;
//# sourceMappingURL=document-group-addedit-component.js.map