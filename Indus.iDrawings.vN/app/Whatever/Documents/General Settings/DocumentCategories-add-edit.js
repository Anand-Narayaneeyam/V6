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
var General_1 = require('../../../Models/Common/General');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var DocumentCategoriesAddEditComponent = (function () {
    function DocumentCategoriesAddEditComponent(DocumentService, _notificationService, generalFunctions) {
        this.DocumentService = DocumentService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    DocumentCategoriesAddEditComponent.prototype.ngOnInit = function () {
    };
    DocumentCategoriesAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    DocumentCategoriesAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        debugger;
        var contextObj = this;
        contextObj.DocumentService.AddUpdateDocumentCategory(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            debugger;
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (contextObj.action == "add") {
                        contextObj._notificationService.ShowToaster("Document Category added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Document Category updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    contextObj._notificationService.ShowToaster("Document Category already exists", 5);
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DocumentCategoriesAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DocumentCategoriesAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DocumentCategoriesAddEditComponent.prototype, "submitSuccess", void 0);
    DocumentCategoriesAddEditComponent = __decorate([
        core_1.Component({
            selector: 'DocumentCategories-add-edit',
            templateUrl: './app/Views/Documents/General Settings/DocumentCategories-add-edit.html',
            providers: [documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], DocumentCategoriesAddEditComponent);
    return DocumentCategoriesAddEditComponent;
}());
exports.DocumentCategoriesAddEditComponent = DocumentCategoriesAddEditComponent;
//# sourceMappingURL=DocumentCategories-add-edit.js.map