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
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var DefineWorkTypeAddEditComponent = (function () {
    function DefineWorkTypeAddEditComponent(schedulingService, notificationService) {
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    DefineWorkTypeAddEditComponent.prototype.onSubmitData = function (event) {
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
    DefineWorkTypeAddEditComponent.prototype.postSubmit = function (contextObj, pageDetails, target) {
        console.log(this.moduleId);
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 5854) {
                arr[i].Value = this.moduleId;
            }
        }
        this.schedulingService.postSubmitDefineWorkTypes(JSON.stringify(arr), this.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Work Type added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Work Type updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Work Type already exists", 4);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Action Failure", 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DefineWorkTypeAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DefineWorkTypeAddEditComponent.prototype, "submitSuccess", void 0);
    DefineWorkTypeAddEditComponent = __decorate([
        core_1.Component({
            selector: 'defineworktype-addedit',
            templateUrl: 'app/Views/Scheduling/General Settings/define-worktypeaddedit.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService],
            inputs: ['workFlowCategoryId', 'moduleId', 'selectedId', 'action', 'fieldDetailsAddEdit', 'btnName']
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService])
    ], DefineWorkTypeAddEditComponent);
    return DefineWorkTypeAddEditComponent;
}());
exports.DefineWorkTypeAddEditComponent = DefineWorkTypeAddEditComponent;
//# sourceMappingURL=define-worktypeaddedit.js.map