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
var SetWorkFlowAddEditComponent = (function () {
    function SetWorkFlowAddEditComponent(workFlowService, notificationService) {
        this.workFlowService = workFlowService;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.strLstBoxValidateMessage = "Select at least one Workflow entity";
        this.submitSuccess = new core_1.EventEmitter();
    }
    SetWorkFlowAddEditComponent.prototype.onSubmitData = function (event) {
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
    SetWorkFlowAddEditComponent.prototype.postSubmit = function (contextObj, pageDetails, target) {
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 5832) {
                arr[i].Value = this.workTypeId;
            }
            if (arr[i].ReportFieldId == 5829) {
                arr[i].Value = "-1";
            }
        }
        this.workFlowService.postSubmitWorkFlow(JSON.stringify(arr), this.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Action Point added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Action Point updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Action Point already exists", 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SetWorkFlowAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SetWorkFlowAddEditComponent.prototype, "submitSuccess", void 0);
    SetWorkFlowAddEditComponent = __decorate([
        core_1.Component({
            selector: 'setworkflow-addedit',
            templateUrl: 'app/Views/Common/Set Workflow/setworkflow-addedit.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [workflow_service_1.WorkFlowService, notify_service_1.NotificationService],
            inputs: ['workFlowCategoryId', 'moduleId', 'workTypeId', 'selectedId', 'action', 'fieldDetailsAddEdit', 'btnName']
        }), 
        __metadata('design:paramtypes', [workflow_service_1.WorkFlowService, notify_service_1.NotificationService])
    ], SetWorkFlowAddEditComponent);
    return SetWorkFlowAddEditComponent;
}());
exports.SetWorkFlowAddEditComponent = SetWorkFlowAddEditComponent;
//# sourceMappingURL=setworkflow-addedit.js.map