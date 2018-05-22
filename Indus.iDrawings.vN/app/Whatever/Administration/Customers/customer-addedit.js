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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var CustomerAddEditComponent = (function () {
    function CustomerAddEditComponent(administrationService, _notificationService, generFun) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.dataKey = "CustomerId";
        this.submitSuccess = new core_1.EventEmitter();
    }
    CustomerAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    CustomerAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var reportfieldIdValues = JSON.parse(strsubmitField);
        for (var i = 0; i < reportfieldIdValues.length; i++) {
            if (reportfieldIdValues[i].ReportFieldId == 6309) {
                reportfieldIdValues[i].Value = "1";
            }
            else if (reportfieldIdValues[i].ReportFieldId == 6310) {
                if (reportfieldIdValues[i].Value == "true" || reportfieldIdValues[i].Value == "True" || reportfieldIdValues[i].Value == "1")
                    reportfieldIdValues[i].Value = "1";
                else
                    reportfieldIdValues[i].Value = "0";
            }
            else if (reportfieldIdValues[i].ReportFieldId == 119) {
                if (reportfieldIdValues[i].Value == "0") {
                    contextObj._notificationService.ShowToaster("Max. Sites should be greater than zero", 5);
                    return false;
                }
            }
            else if (reportfieldIdValues[i].ReportFieldId == 120) {
                if (reportfieldIdValues[i].Value == "0") {
                    contextObj._notificationService.ShowToaster("Max. Buildings per Site should be greater than zero", 5);
                    return false;
                }
            }
        }
        strsubmitField = JSON.stringify(reportfieldIdValues);
        contextObj.administrationService.postsubmitCustomerDetails(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData.StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Customer added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Customer updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"] });
                    break;
                case 3:
                    if (resultData.ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Customer already exists", 5);
                    }
                    if (resultData.ServerId == -2) {
                        contextObj._notificationService.ShowToaster("Customer Folder Name already exists", 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CustomerAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CustomerAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CustomerAddEditComponent.prototype, "submitSuccess", void 0);
    CustomerAddEditComponent = __decorate([
        core_1.Component({
            selector: 'customer-addedit',
            templateUrl: 'app/Views/Administration/Customers/customer-addedit.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], CustomerAddEditComponent);
    return CustomerAddEditComponent;
}());
exports.CustomerAddEditComponent = CustomerAddEditComponent;
//# sourceMappingURL=customer-addedit.js.map