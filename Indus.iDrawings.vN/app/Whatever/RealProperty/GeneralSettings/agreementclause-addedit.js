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
var AgreementClauseAddEditComponent = (function () {
    function AgreementClauseAddEditComponent(realPropertyService, notificationService) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.IsServiceClause = false;
        this.isPayable = false;
        this.submitSuccess = new core_1.EventEmitter();
    }
    AgreementClauseAddEditComponent.prototype.onSubmitData = function (event) {
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
    AgreementClauseAddEditComponent.prototype.checkBoxChange = function (event) {
        var contextObj = this;
        if (event.chkBoxObject.fieldId == 899) {
            contextObj.IsServiceClause = event.chkBoxObject.IsChecked;
        }
        if (event.chkBoxObject.fieldId == 900) {
            contextObj.isPayable = event.chkBoxObject.IsChecked;
        }
    };
    AgreementClauseAddEditComponent.prototype.postSubmit = function (contextObj, pageDetails, target) {
        this.realPropertyService.postSubmitAddEditAgreementClauses(pageDetails, this.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Agreement Clause added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Agreement Clause updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Agreement Clause already exists", 5);
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
    ], AgreementClauseAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AgreementClauseAddEditComponent.prototype, "submitSuccess", void 0);
    AgreementClauseAddEditComponent = __decorate([
        core_1.Component({
            selector: 'agreementclause-addedit',
            templateUrl: 'app/Views/RealProperty/GeneralSettings/agreementclause-addedit.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'action', 'fieldDetailsAddEdit', 'btnName'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService])
    ], AgreementClauseAddEditComponent);
    return AgreementClauseAddEditComponent;
}());
exports.AgreementClauseAddEditComponent = AgreementClauseAddEditComponent;
//# sourceMappingURL=agreementclause-addedit.js.map