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
var objects_service_1 = require('../../../Models/Objects/objects.service');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var DeficienciesAddEdit = (function () {
    function DeficienciesAddEdit(objectsService, _notificationService, _renderer, el, _validateService) {
        this.objectsService = objectsService;
        this._notificationService = _notificationService;
        this._renderer = _renderer;
        this.el = el;
        this._validateService = _validateService;
        this.moduleId = 0;
        this.btnName = "Add";
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.hasFieldValue = false;
        this.isinUse = false;
    }
    DeficienciesAddEdit.prototype.ngOnInit = function () {
        this.formHeight = window.innerHeight - 200;
        this.formHeight = this.formHeight + "px";
    };
    DeficienciesAddEdit.prototype.loadControl = function (eventValue, contextObj, action) {
    };
    DeficienciesAddEdit.prototype.fieldChange = function (event) {
        var contextObj = this;
        if (event.ddlRelationShipEvent.ChildFieldObject.FieldId == 2365) {
            this.objectsService.getDeficiencyClassLookups(1, 1, event.ddlRelationShipEvent.ChildFieldObject.FieldValue).subscribe(function (resultData) {
                contextObj.AttributesAddEdit.filter(function (el) {
                    if (el.FieldId == 2366) {
                        el.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        el.FieldValue = "-1";
                        return true;
                    }
                    else
                        return false;
                });
            });
        }
    };
    DeficienciesAddEdit.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var tempdata1 = JSON.parse(event["fieldobject"]);
        tempdata1.push({ ReportFieldId: 271, Value: this.moduleId.toString() });
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, JSON.stringify(tempdata1), 1);
                break;
            case "edit":
                this.postSubmit(contextObj, JSON.stringify(tempdata1), 2);
                break;
        }
    };
    DeficienciesAddEdit.prototype.postSubmit = function (contextObj, pageDetails, target) {
        contextObj.objectsService.postSubmitDeficiency(pageDetails, target, contextObj.selectedId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("Code already exists", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Deficiency added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Deficiency updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    //if (resultData["Data"].ServerId == -1 || resultData["Data"].ServerId == -2) {
                    contextObj._notificationService.ShowToaster("Deficiency already exists", 5);
                    //}
                    break;
            }
        });
    };
    DeficienciesAddEdit.prototype.filterFieldtypeValidation = function (fieldtype) {
    };
    DeficienciesAddEdit.prototype.filterFieldtypeInUse = function (fieldType) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DeficienciesAddEdit.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DeficienciesAddEdit.prototype, "submitSuccess", void 0);
    DeficienciesAddEdit = __decorate([
        core_1.Component({
            selector: 'deficiencies-addedit',
            templateUrl: 'app/Views/Objects/Deficiency/deficiencies-addedit.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [objects_service_1.ObjectsService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            inputs: ['selectedId', 'action', 'AttributesAddEdit', 'btnName', 'messages', 'moduleId']
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, notify_service_1.NotificationService, core_1.Renderer, core_1.ElementRef, validation_service_1.ValidateService])
    ], DeficienciesAddEdit);
    return DeficienciesAddEdit;
}());
exports.DeficienciesAddEdit = DeficienciesAddEdit;
//# sourceMappingURL=deficiencies-addedit.component.js.map