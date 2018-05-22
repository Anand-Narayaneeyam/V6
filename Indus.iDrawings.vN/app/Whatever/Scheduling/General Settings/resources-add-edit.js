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
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var ResourcesAddEditComponent = (function () {
    function ResourcesAddEditComponent(SchedulingService, _notificationService, generalFunctions) {
        this.SchedulingService = SchedulingService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    ResourcesAddEditComponent.prototype.ngOnInit = function () {
    };
    ResourcesAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    ResourcesAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        contextObj.SchedulingService.AddUpdateResources(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (contextObj.action == "add") {
                        contextObj._notificationService.ShowToaster("Resource added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Resource updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    contextObj._notificationService.ShowToaster("Resource already exists", 5);
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ResourcesAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ResourcesAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ResourcesAddEditComponent.prototype, "submitSuccess", void 0);
    ResourcesAddEditComponent = __decorate([
        core_1.Component({
            selector: 'resources-add-edit',
            templateUrl: './app/Views/Scheduling/General Settings/resources-add-edit.html',
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ResourcesAddEditComponent);
    return ResourcesAddEditComponent;
}());
exports.ResourcesAddEditComponent = ResourcesAddEditComponent;
//# sourceMappingURL=resources-add-edit.js.map