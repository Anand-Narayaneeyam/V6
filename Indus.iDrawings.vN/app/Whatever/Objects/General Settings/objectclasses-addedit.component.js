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
var ObjectClassesAddEditComponent = (function () {
    function ObjectClassesAddEditComponent(objectsService, _notificationService) {
        this.objectsService = objectsService;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.isInvalid = false;
        this.moduleId = 0;
    }
    ObjectClassesAddEditComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    };
    ObjectClassesAddEditComponent.prototype.postSubmit = function (contextObj, pageDetails, target) {
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 283) {
                arr[i].Value = this.objectCategoryId.toString();
            }
            if (arr[i].ReportFieldId == 648) {
                if (/^([0-9]*)$/.test(arr[i].Value) == true) {
                    this._notificationService.ShowToaster(this.messages["InValidClassName"], 5);
                    return false;
                }
            }
            if (arr[i].ReportFieldId == 649) {
                arr[i].Value = this.objectCategoryId.toString();
            }
            if (arr[i].ReportFieldId == 651) {
                if (/^([0-9]*)$/.test(arr[i].Value) == true) {
                    this._notificationService.ShowToaster(this.messages["InValidANoPrefix"], 5);
                    return false;
                }
            }
        }
        arr.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() }); //Module
        this.objectsService.postSubmitObjectClass(JSON.stringify(arr), this.selectedId, target, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("Action Failure", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster(contextObj.messages["AddSuccess"], 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else {
                        contextObj._notificationService.ShowToaster(contextObj.messages["UpdateSuccess"], 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster(contextObj.messages["ClassAlreadyExist"], 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj._notificationService.ShowToaster(contextObj.messages["ClassPrefixAlreadyExist"], 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ObjectClassesAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectClassesAddEditComponent.prototype, "submitSuccess", void 0);
    ObjectClassesAddEditComponent = __decorate([
        core_1.Component({
            selector: 'objectclasses-addedit',
            templateUrl: 'app/Views/Objects/General Settings/objectclasses-addedit.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [objects_service_1.ObjectsService, notify_service_1.NotificationService],
            inputs: ['objectCategoryId', 'selectedId', 'action', 'fieldDetailsAddEdit', 'btnName', 'messages', 'moduleId']
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, notify_service_1.NotificationService])
    ], ObjectClassesAddEditComponent);
    return ObjectClassesAddEditComponent;
}());
exports.ObjectClassesAddEditComponent = ObjectClassesAddEditComponent;
//# sourceMappingURL=objectclasses-addedit.component.js.map