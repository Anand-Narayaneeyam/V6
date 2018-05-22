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
var WorkOrder_service_1 = require('../../../Models/WorkOrder/WorkOrder.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var TechniciansAddEditComponent = (function () {
    function TechniciansAddEditComponent(workOrdereService, _notificationService, generalFunctions) {
        this.workOrdereService = workOrdereService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    TechniciansAddEditComponent.prototype.ngOnInit = function () {
    };
    TechniciansAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.submitDataCheck(event["fieldobject"], 1);
                break;
            case "edit":
                this.submitDataCheck(event["fieldobject"], 2);
                break;
        }
    };
    TechniciansAddEditComponent.prototype.submitDataCheck = function (event, target) {
        var contextObj = this;
        var emailObj = this.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 5386;
        });
        if (emailObj.FieldValue == null || emailObj.FieldValue == "") {
            contextObj.postSubmit(event, target);
        }
        else {
            this.workOrdereService.checkMailDomain(emailObj.FieldValue).subscribe(function (result) {
                if (contextObj.generalFunctions.checkForUnhandledErrors(result)) {
                    if (result["Data"]) {
                        contextObj.postSubmit(event, target);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Specified mail domain not added in iDrawings", 5);
                    }
                }
            });
        }
    };
    TechniciansAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        contextObj.workOrdereService.AddUpdateTechnicians(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Technician added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Technician details updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Technician Code already exists", 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TechniciansAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TechniciansAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TechniciansAddEditComponent.prototype, "submitSuccess", void 0);
    TechniciansAddEditComponent = __decorate([
        core_1.Component({
            selector: 'technicians-add-edit',
            templateUrl: './app/Views/WorkOrder/GeneralSettings/technicians-addedit.component.html',
            providers: [WorkOrder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [WorkOrder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], TechniciansAddEditComponent);
    return TechniciansAddEditComponent;
}());
exports.TechniciansAddEditComponent = TechniciansAddEditComponent;
//# sourceMappingURL=technicians-addedit.component.js.map