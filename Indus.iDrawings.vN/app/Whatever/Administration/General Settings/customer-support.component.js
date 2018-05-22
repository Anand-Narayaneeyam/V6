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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var http_1 = require('@angular/http');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var CustomerSupportComponent = (function () {
    function CustomerSupportComponent(administrationService, notificationService, getData) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.btnName = "Save Changes";
        this.status = "1";
        this.success = "";
    }
    CustomerSupportComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.isMailDomain == undefined ? true : contextObj.isMailDomain;
        this.administrationService.getCustomerSupportFields(0).subscribe(function (resultData) {
            contextObj.customerSupportFields = resultData["Data"];
        });
    };
    CustomerSupportComponent.prototype.onSubmitData = function () {
        var contextObj = this;
        var test = this.getData.getFieldValuesAsReportFieldArray(this.customerSupportFields);
        var emailObj = [];
        var count = 0;
        this.customerSupportFields.find(function (item) {
            if (item.ReportFieldId == 44 || item.ReportFieldId == 47) {
                emailObj.push(item.FieldValue);
                return false;
            }
            else
                return false;
        });
        if (contextObj.isMailDomain == true) {
            contextObj.administrationService.checkMailDomain(emailObj[0]).subscribe(function (result) {
                // if (contextObj.getData.checkForUnhandledErrors(result)) {
                if (result["Data"]) {
                    contextObj.administrationService.checkMailDomain(emailObj[1]).subscribe(function (result) {
                        if (result["Data"]) {
                            contextObj.administrationService.customerSupportpostSubmit(test).subscribe(function (resultData) {
                                contextObj.success = resultData["Data"].Message;
                                if (contextObj.success == "Success") {
                                    contextObj.notificationService.ShowToaster("Customer Support details updated", 3);
                                }
                                else {
                                    contextObj.notificationService.ShowToaster("Customer Support details update Failed", 5);
                                }
                            });
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Support Email Domain is not added in iDrawings", 2);
                        }
                    });
                }
                else {
                    contextObj.notificationService.ShowToaster("Sender Email Domain is not added in iDrawings", 2);
                }
            });
        }
        else {
            contextObj.administrationService.customerSupportpostSubmit(test).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    contextObj.notificationService.ShowToaster("Customer Support details updated", 3);
                }
                else {
                    contextObj.notificationService.ShowToaster("Customer Support details update Failed", 5);
                }
            });
        }
    };
    CustomerSupportComponent.prototype.setFormInvalid = function (rptFieldId) {
        this.customerSupportFields.find(function (item) {
            if (item.ReportFieldId == rptFieldId) {
                item.HasValidationError = true;
                item.IsLocallyValidated = true;
                return true;
            }
            else
                return false;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CustomerSupportComponent.prototype, "isMailDomain", void 0);
    CustomerSupportComponent = __decorate([
        core_1.Component({
            selector: 'customer-support',
            templateUrl: './app/Views/Administration/General Settings/customer-support.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], CustomerSupportComponent);
    return CustomerSupportComponent;
}());
exports.CustomerSupportComponent = CustomerSupportComponent;
//# sourceMappingURL=customer-support.component.js.map