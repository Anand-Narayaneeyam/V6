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
var workorder_service_1 = require('../../../../Models/WorkOrder/workorder.service');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var ChargebackAddEditComponent = (function () {
    function ChargebackAddEditComponent(workOrdereService, _notificationService) {
        this.workOrdereService = workOrdereService;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    ChargebackAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    ChargebackAddEditComponent.prototype.postSubmit = function (event, target) {
        var contextObj = this;
        var temp = JSON.parse(event);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].ReportFieldId == 1424) {
                temp[i]["Value"] = this.workOrderId;
            }
            else if (temp[i].ReportFieldId == 1425) {
                temp[i]["Value"] = this.chargeBackType;
            }
            else if (temp[i].ReportFieldId == 1426) {
                this.chargeBackPercentage = temp[i]["Value"];
            }
        }
        event = JSON.stringify(temp);
        if (this.chargeBackPercentage != 0) {
            contextObj.workOrdereService.AddUpdateChargeback(event, this.selectedId, target).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Chargeback added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Chargeback details updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Chargeback already exists", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj._notificationService.ShowToaster("Total Percentage cannot exceed 100", 5);
                        }
                        break;
                }
            });
        }
        else {
            contextObj._notificationService.ShowToaster("Enter a valid numeric value between between 0 and 100 for Percentage", 5);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ChargebackAddEditComponent.prototype, "submitSuccess", void 0);
    ChargebackAddEditComponent = __decorate([
        core_1.Component({
            selector: 'chargeback-addedit',
            templateUrl: 'app/Views/WorkOrder/Review/Manage Chargeback/chargeback-addedit.html',
            providers: [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAddEdit', 'btnName', 'workOrderId', 'chargeBackType'],
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService])
    ], ChargebackAddEditComponent);
    return ChargebackAddEditComponent;
}());
exports.ChargebackAddEditComponent = ChargebackAddEditComponent;
//# sourceMappingURL=chargeback-addedit.js.map