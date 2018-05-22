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
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var RenewLeaseComponent = (function () {
    function RenewLeaseComponent(realPropertyService, notificationService) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.dataKey = "LeaseId";
        this.submitSuccess = new core_1.EventEmitter();
    }
    RenewLeaseComponent.prototype.ngAfterViewInit = function () {
    };
    RenewLeaseComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(this.updateFieldValuesForSubmit(JSON.parse(event["fieldobject"])));
                break;
        }
    };
    RenewLeaseComponent.prototype.updateFieldValuesForSubmit = function (fieldObjectArray) {
        var contextObj = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 5771) {
                if (item.Value == 1) {
                    item.Value = 0;
                }
                else {
                    item.Value = 1;
                }
            }
            else if (item.ReportFieldId == 5779) {
                if (item.Value === "true") {
                    item.Value = 1;
                }
                else {
                    item.Value = 0;
                }
            }
            else if (item.ReportFieldId == 5778) {
                if (item.Value === "true") {
                    item.Value = 1;
                }
                else {
                    item.Value = 0;
                }
                item.IsVisible = false; // temporary hidden 
            }
            else if (item.ReportFieldId == 5697) {
                contextObj.renewleaseExecutionDate = new Date(item.Value);
            }
            else if (item.ReportFieldId == 5695) {
                contextObj.renewleaseCommencementDate = new Date(item.Value);
            }
            else if (item.ReportFieldId == 5698) {
                contextObj.renewrentCommencementDate = new Date(item.Value);
            }
            else if (item.ReportFieldId == 5696) {
                contextObj.renewleaseExpiryDate = new Date(item.Value);
            }
        });
        return JSON.stringify(fieldObjectArray);
    };
    RenewLeaseComponent.prototype.postSubmit = function (pageDetails) {
        var contextObj = this;
        if (contextObj.renewleaseExecutionDate > contextObj.renewleaseCommencementDate) {
            contextObj.notificationService.ShowToaster("Lease Commencement Date should be greater than or equal to Lease Execution Date", 2);
            return;
        }
        if (contextObj.renewleaseCommencementDate > contextObj.renewrentCommencementDate) {
            contextObj.notificationService.ShowToaster("Rent Commencement Date should be greater than or equal to Lease Commencement Date", 2);
            return;
        }
        if (new Date(contextObj.leaseExpiryDate) >= contextObj.renewleaseCommencementDate) {
            contextObj.notificationService.ShowToaster("Lease Commencement Date should be greater than '" + contextObj.leaseExpiryDate + "'", 2);
            return;
        }
        if (contextObj.renewrentCommencementDate >= contextObj.renewleaseExpiryDate) {
            contextObj.notificationService.ShowToaster("Lease Expiry Date should be greater than Rent Commencement Date", 2);
            return;
        }
        if (contextObj.renewleaseExpiryDate <= new Date()) {
            contextObj.notificationService.ShowToaster("Lease Expiry Date should be a future date", 2);
            return;
        }
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        arr.push({
            ReportFieldId: 5693,
            Value: this.leaseId
        }, {
            ReportFieldId: 5694,
            Value: this.leaseRenewalCount
        });
        this.realPropertyService.postSubmitRenewLease(JSON.stringify(arr)).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 1:
                    contextObj.notificationService.ShowToaster("Lease renewed", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Already exists", 4);
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
    ], RenewLeaseComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RenewLeaseComponent.prototype, "submitSuccess", void 0);
    RenewLeaseComponent = __decorate([
        core_1.Component({
            selector: 'renew-lease',
            templateUrl: './app/Views/RealProperty/Lease/renew-lease.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            inputs: ['action', 'fieldDetailsRenew', 'btnName', 'leaseId', 'leaseRenewalCount', 'leaseExpiryDate']
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService])
    ], RenewLeaseComponent);
    return RenewLeaseComponent;
}());
exports.RenewLeaseComponent = RenewLeaseComponent;
//# sourceMappingURL=renew-lease.js.map