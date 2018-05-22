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
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var RentInformationComponent = (function () {
    function RentInformationComponent(realpropertyservice, notificationService) {
        this.realpropertyservice = realpropertyservice;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    RentInformationComponent.prototype.ngOnInit = function () {
    };
    RentInformationComponent.prototype.onSubmitData = function (event) {
        this.postSubmit(event["fieldobject"]);
    };
    RentInformationComponent.prototype.postSubmit = function (submitdata) {
        debugger;
        var contextObj = this;
        var arr = new Array();
        var toPay = "0";
        var selId;
        var radionBtn;
        var d1;
        var d2;
        var d3;
        var d4;
        var dueDate;
        var data = JSON.parse(submitdata);
        data.find(function (item) {
            switch (item.ReportFieldId) {
                case 5756:
                    selId = item;
                    break;
                case 6240:
                    radionBtn = item;
                    if (item.Value == "44") {
                        toPay = "0";
                    }
                    else if (item.Value == "45") {
                        toPay = "1";
                    }
                    break;
                case 5770:
                    d1 = item;
                    break;
                case 5758:
                    d2 = item;
                    break;
                case 5708:
                    d3 = item;
                    break;
                case 5763:
                    d4 = item;
                    break;
                case 5762:
                    dueDate = new Date(item.Value);
                    break;
            }
        });
        var index = data.indexOf(selId);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(radionBtn);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d1);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d2);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d3);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d4);
        if (index > -1) {
            data.splice(index, 1);
        }
        data.push({
            ReportFieldId: 5757,
            Value: contextObj.leaseRenewalCount.toString()
        });
        data.push({
            ReportFieldId: 5756,
            Value: contextObj.selectedId.toString()
        });
        data.push({
            ReportFieldId: 6240,
            Value: toPay.toString()
        });
        var rentCommence = new Date(this.rentCommenceDate);
        if (dueDate > rentCommence) {
            this.realpropertyservice.submitRentInfoDetails(JSON.stringify(data)).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Rent Informataion saved", 3);
                        contextObj.submitSuccess.emit({ status: "success" });
                }
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Due Date should be greater than Rent Commencement Date ( " + this.rentCommenceDate + " )", 2);
            return;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RentInformationComponent.prototype, "fieldDetailsRentInfo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RentInformationComponent.prototype, "submitSuccess", void 0);
    RentInformationComponent = __decorate([
        core_1.Component({
            selector: 'rent-information',
            templateUrl: 'app/Views/RealProperty/Lease/rent-information.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'fieldDetailsRentInfo', 'btnName', 'annualBaseRent', 'showButton', 'leaseRenewalCount', 'rentCommenceDate'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService])
    ], RentInformationComponent);
    return RentInformationComponent;
}());
exports.RentInformationComponent = RentInformationComponent;
//# sourceMappingURL=rent-information.js.map