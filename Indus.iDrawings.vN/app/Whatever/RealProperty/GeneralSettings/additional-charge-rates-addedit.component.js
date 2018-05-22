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
var General_1 = require('../../../Models/Common/General');
var AdditionalChargeRatesAddEditComponent = (function () {
    function AdditionalChargeRatesAddEditComponent(realPropertyService, _notificationService, generalFunctions) {
        this.realPropertyService = realPropertyService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Financial Head Id";
        this.fromToCheckFlag = false;
        this.submitSuccess = new core_1.EventEmitter();
    }
    AdditionalChargeRatesAddEditComponent.prototype.ngOnInit = function () {
    };
    AdditionalChargeRatesAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    AdditionalChargeRatesAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj = JSON.parse(strsubmitField);
        var financialHeadId = fieldobj.find(function (item) { return item.ReportFieldId === 5705; });
        financialHeadId.Value = this.selectedAdditionalChargeId;
        var isFlatRate = fieldobj.find(function (item) { return item.ReportFieldId === 5706; });
        var amountFrom = fieldobj.find(function (item) { return item.ReportFieldId === 5709; });
        var amountTo = fieldobj.find(function (item) { return item.ReportFieldId === 5710; });
        var rate = fieldobj.find(function (item) { return item.ReportFieldId === 5708; });
        if (Number(amountFrom.Value) > 0) {
            if (this.fromToCheckFlag == false) {
                if (Number(amountFrom.Value) >= Number(amountTo.Value)) {
                    contextObj._notificationService.ShowToaster("Amount To must be greater than Amount From", 5);
                    return;
                }
            }
            if (this.fromToCheckFlag == true) {
                if (amountTo.Value != null && amountTo.Value != undefined && amountTo.Value != "") {
                    if (Number(amountFrom.Value) >= Number(amountTo.Value)) {
                        contextObj._notificationService.ShowToaster("Amount To should be greater than Amount From", 5);
                        return;
                    }
                }
            }
            if (Number(amountFrom.Value) >= Number(amountTo.Value) && this.fromToCheckFlag == false) {
                contextObj._notificationService.ShowToaster("Amount To should be greater than Amount From", 5);
                return;
            }
            else if (Number(rate.Value) == 0) {
                contextObj._notificationService.ShowToaster("Rate should be greater than zero", 5);
                return;
            }
            else if (isFlatRate.Value.toString() == "true") {
                if (Number(amountTo.Value) < Number(rate.Value) && amountTo.Value != "" && amountTo.Value != null && amountTo.Value != undefined) {
                    contextObj._notificationService.ShowToaster("Rate should be less than or equal to Amount To", 5);
                    return;
                }
            }
            else if (isFlatRate.Value.toString() == "false") {
                if (Number(rate.Value) > 100) {
                    contextObj._notificationService.ShowToaster("Rate should be less than or equal to 100", 5);
                    return;
                }
            }
        }
        else {
            contextObj._notificationService.ShowToaster("Amount From should be greater than 0", 5);
            return;
        }
        contextObj.realPropertyService.AddUpdateAdditionalChargeRates(JSON.stringify(fieldobj), this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Additional Charge Rate added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Additional Charge Rate updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Additional Charge Rates already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj._notificationService.ShowToaster("Additional Charge Rates already exists", 5);
                    }
                    break;
            }
        });
    };
    AdditionalChargeRatesAddEditComponent.prototype.chkChangeevent = function (event) {
        var isFlatRate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 5706; });
        var rate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 5708; });
        if (isFlatRate.FieldValue == "false") {
            rate.MaxLength = 5;
            rate.FieldLabel = "Rate (%)";
        }
        else if (isFlatRate.FieldValue == "true") {
            rate.MaxLength = 14;
            rate.FieldLabel = "Rate";
        }
        setTimeout(function () {
            var el = document.getElementById("911"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/
            if (el != null && el != undefined) {
                el.focus();
                el.blur();
            }
        }, 20);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AdditionalChargeRatesAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AdditionalChargeRatesAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AdditionalChargeRatesAddEditComponent.prototype, "submitSuccess", void 0);
    AdditionalChargeRatesAddEditComponent = __decorate([
        core_1.Component({
            selector: 'additional-charge-rates-add-edit',
            templateUrl: './app/Views/RealProperty/GeneralSettings/additional-charge-rates-addedit.component.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'selectedAdditionalChargeId', 'totalItems', 'fromToCheckFlag'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], AdditionalChargeRatesAddEditComponent);
    return AdditionalChargeRatesAddEditComponent;
}());
exports.AdditionalChargeRatesAddEditComponent = AdditionalChargeRatesAddEditComponent;
//# sourceMappingURL=additional-charge-rates-addedit.component.js.map