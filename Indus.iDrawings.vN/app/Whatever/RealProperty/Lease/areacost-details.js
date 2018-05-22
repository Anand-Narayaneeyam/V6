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
var AreaCostDetailsComponent = (function () {
    function AreaCostDetailsComponent(realpropertyservice, notificationService) {
        this.realpropertyservice = realpropertyservice;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    AreaCostDetailsComponent.prototype.ngOnInit = function () {
    };
    AreaCostDetailsComponent.prototype.onSubmitData = function (event) {
        this.postSubmit(event["fieldobject"]);
    };
    AreaCostDetailsComponent.prototype.postSubmit = function (pageDetails) {
        var contextObj = this;
        var arr = new Array();
        arr = JSON.parse(pageDetails);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 5757) {
                arr[i].Value = this.leaseRenewalCount;
            }
            if (arr[i].ReportFieldId == 5756) {
                arr[i].Value = this.selectedId.toString();
            }
            if (arr[i].ReportFieldId == 5760) {
                if (arr[i].Value == "29") {
                    arr[i].Value = "3";
                }
                else if (arr[i].Value == "31") {
                    arr[i].Value = "4";
                }
            }
        }
        this.realpropertyservice.submitAreaCostDetails(JSON.stringify(arr)).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Area and Cost details saved", 3);
                    contextObj.submitSuccess.emit({ status: "success" });
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AreaCostDetailsComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AreaCostDetailsComponent.prototype, "fieldDetailsAreaCost", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaCostDetailsComponent.prototype, "submitSuccess", void 0);
    AreaCostDetailsComponent = __decorate([
        core_1.Component({
            selector: 'areacost-details',
            templateUrl: 'app/Views/RealProperty/Lease/areacost-details.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAreaCost', 'btnName', 'leaseRenewalCount', 'showButton'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService])
    ], AreaCostDetailsComponent);
    return AreaCostDetailsComponent;
}());
exports.AreaCostDetailsComponent = AreaCostDetailsComponent;
//# sourceMappingURL=areacost-details.js.map