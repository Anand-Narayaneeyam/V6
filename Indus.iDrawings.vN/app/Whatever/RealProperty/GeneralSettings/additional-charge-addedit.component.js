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
var AdditinalchargeAddEdit = (function () {
    function AdditinalchargeAddEdit(RealPropertyService, _notificationService, _renderer, el) {
        this.RealPropertyService = RealPropertyService;
        this._notificationService = _notificationService;
        this._renderer = _renderer;
        this.el = el;
        this.btnName = "Add";
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.hasFieldValue = false;
        this.isinUse = false;
    }
    AdditinalchargeAddEdit.prototype.ngOnInit = function () {
        if (this.addEdit == "add") {
            this.btnName = "Save";
        }
        else if (this.addEdit == "edit") {
            this.btnName = "Save Changes";
        }
    };
    AdditinalchargeAddEdit.prototype.fieldChange = function (event) {
    };
    AdditinalchargeAddEdit.prototype.onSubmitData = function (event) {
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
    AdditinalchargeAddEdit.prototype.postSubmit = function (contextObj, pageDetails, target) {
        var fieldDetails = pageDetails;
        var arr = new Array();
        arr = JSON.parse(fieldDetails);
        if (arr[2].Value == "NaN")
            arr[2].Value = "0";
        var NewfieldDetails = JSON.stringify(arr);
        if (contextObj.action == "edit") {
            this.RealPropertyService.postEditAdditionalChargesDetails(NewfieldDetails, contextObj.selectedId).subscribe(function (resultData) {
                //if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    contextObj._notificationService.ShowToaster("Additional Charge updated", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                }
                else {
                    contextObj.notificationService.ShowToaster("Additional Charge Name already exists", 5);
                }
                //contextObj.changeEnableMenu();
                //}
            });
        }
        else {
            this.RealPropertyService.postAddAdditionalChargesDetails(NewfieldDetails).subscribe(function (resultData) {
                //if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    contextObj.totalItems = contextObj.totalItems + 1;
                    contextObj._notificationService.ShowToaster("Additional Charge added", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                }
                else {
                    //contextObj.additionalchargesSource.splice(contextObj.additionalchargesSource.length - 1, 1);
                    contextObj._notificationService.ShowToaster("Additional Charge Name already exists", 5);
                }
                //contextObj.changeEnableMenu();
                //}
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AdditinalchargeAddEdit.prototype, "action", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AdditinalchargeAddEdit.prototype, "submitSuccess", void 0);
    AdditinalchargeAddEdit = __decorate([
        core_1.Component({
            selector: 'additionalcharge-addedit',
            templateUrl: './app/Views/RealProperty/GeneralSettings/additional-charge-addedit.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'action', 'AdditionalChargeAddEdit', 'btnName', 'messages'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, core_1.Renderer, core_1.ElementRef])
    ], AdditinalchargeAddEdit);
    return AdditinalchargeAddEdit;
}());
exports.AdditinalchargeAddEdit = AdditinalchargeAddEdit;
//# sourceMappingURL=additional-charge-addedit.component.js.map