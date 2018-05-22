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
var CopyWorkflowComponent = (function () {
    function CopyWorkflowComponent(workFlowService, notificationService) {
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    CopyWorkflowComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        if (this.action == "copy") {
            this.postSubmit(contextObj, event["fieldobject"]);
        }
    };
    CopyWorkflowComponent.prototype.postSubmit = function (contextObj, pageDetails) {
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 5873) {
                arr[i].Value = this.workTypeId.toString();
            }
        }
        this.workFlowService.postCopyWorkflow(JSON.stringify(arr)).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Workflow added", 3);
                    contextObj.submitSuccess.emit({ status: "success", NewWorkTypeId: resultData["Data"].ServerId });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -2) {
                        contextObj.notificationService.ShowToaster("Work Type already exists", 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CopyWorkflowComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CopyWorkflowComponent.prototype, "submitSuccess", void 0);
    CopyWorkflowComponent = __decorate([
        core_1.Component({
            selector: 'copy-workflow',
            templateUrl: 'app/Views/Common/Set Workflow/copy-workflow.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [workflow_service_1.WorkFlowService, notify_service_1.NotificationService],
            inputs: ['action', 'fieldDetailsCloneWorkflow', 'btnName', 'workTypeId']
        }), 
        __metadata('design:paramtypes', [workflow_service_1.WorkFlowService, notify_service_1.NotificationService])
    ], CopyWorkflowComponent);
    return CopyWorkflowComponent;
}());
exports.CopyWorkflowComponent = CopyWorkflowComponent;
//# sourceMappingURL=copy-workflow.js.map