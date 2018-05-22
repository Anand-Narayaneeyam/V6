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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var ProceduresSafetyStepsAddEditComponent = (function () {
    function ProceduresSafetyStepsAddEditComponent(workOrdereService, notificationService) {
        this.workOrdereService = workOrdereService;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.submitSuccess2 = new core_1.EventEmitter();
    }
    ProceduresSafetyStepsAddEditComponent.prototype.ngOnInit = function () {
        setTimeout(function () {
            var el = document.getElementById("1494");
            if (el != null && el != undefined) {
                el.focus();
            }
        }, 100);
    };
    ProceduresSafetyStepsAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    ProceduresSafetyStepsAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var arr = new Array();
        arr = JSON.parse(strsubmitField);
        var val = arr[2].Value.toString();
        if (this.action != "add") {
            this.workOrdereService.postEditSafetyStepsDetails(this.procId[0], val, this.selectedId).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.notificationService.ShowToaster("Safety Step updated", 3);
                    contextObj.workOrdereService.getSafetyStepsDataforgridupdate(contextObj.pageIndex, 'Safety Step', 'ASC', contextObj.procId, contextObj.selectedId[0]).subscribe(function (resultData) {
                        contextObj.submitSuccess2.emit({ status: "success", returnData: resultData["Data"]["FieldBinderData"] });
                    });
                }
            });
        }
        else {
            this.workOrdereService.postAddSafetyStepsDetails(this.procId[0], val).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.notificationService.ShowToaster("Safety Step added", 3);
                    contextObj.workOrdereService.getSafetyStepsDataforgridupdate(contextObj.pageIndex, 'Safety Step', 'ASC', contextObj.procId, resultData["Data"].ServerId).subscribe(function (resultData) {
                        contextObj.submitSuccess2.emit({ status: "success", returnData: resultData["Data"]["FieldBinderData"] });
                    });
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ProceduresSafetyStepsAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ProceduresSafetyStepsAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProceduresSafetyStepsAddEditComponent.prototype, "submitSuccess2", void 0);
    ProceduresSafetyStepsAddEditComponent = __decorate([
        core_1.Component({
            selector: 'add-edit-safety',
            templateUrl: 'app/Views/WorkOrder/Maintenance/Procedures-Safetysteps-AddEdit.component.html',
            providers: [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'procId', 'pageIndex'],
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService])
    ], ProceduresSafetyStepsAddEditComponent);
    return ProceduresSafetyStepsAddEditComponent;
}());
exports.ProceduresSafetyStepsAddEditComponent = ProceduresSafetyStepsAddEditComponent;
//# sourceMappingURL=Procedures-SafetySteps-AddEdit.component.js.map