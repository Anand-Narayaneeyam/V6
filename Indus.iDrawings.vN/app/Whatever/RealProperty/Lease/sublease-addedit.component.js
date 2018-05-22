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
var SubLeaseAddEditComponent = (function () {
    function SubLeaseAddEditComponent(realpropertyservice, notificationService) {
        this.realpropertyservice = realpropertyservice;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    SubLeaseAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"]);
                break;
        }
    };
    SubLeaseAddEditComponent.prototype.onRadioButtonChange = function (event) {
    };
    SubLeaseAddEditComponent.prototype.updateIsToRentOut = function (fieldObjectArray) {
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 5771) {
                if (item.Value == 1) {
                    item.Value = 0;
                }
                else {
                    item.Value = 0;
                }
            }
        });
        return JSON.stringify(fieldObjectArray);
    };
    SubLeaseAddEditComponent.prototype.postSubmit = function (strsubmitField) {
        var contextObj = this;
        contextObj.realpropertyservice.submitAddUpdateSubLease(strsubmitField, this.selectedId).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Sublease added", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Sublease Identifier already exists", 5);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SubLeaseAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SubLeaseAddEditComponent.prototype, "fieldDetailsAddEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SubLeaseAddEditComponent.prototype, "submitSuccess", void 0);
    SubLeaseAddEditComponent = __decorate([
        core_1.Component({
            selector: 'sublease-addedit',
            templateUrl: 'app/Views/RealProperty/Lease/sublease-addedit.component.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAddEdit', 'btnName'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService])
    ], SubLeaseAddEditComponent);
    return SubLeaseAddEditComponent;
}());
exports.SubLeaseAddEditComponent = SubLeaseAddEditComponent;
//# sourceMappingURL=sublease-addedit.component.js.map