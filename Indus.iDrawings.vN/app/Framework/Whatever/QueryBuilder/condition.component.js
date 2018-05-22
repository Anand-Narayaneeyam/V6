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
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var datecomponent_component_1 = require('../dynamiccontrols/dynamicfields/datecomponent.component');
var textareacomponent_component_1 = require('../dynamiccontrols/dynamicfields/textareacomponent.component');
var labelcomponent_component_1 = require('../dynamiccontrols/dynamicfields/labelcomponent.component');
var datetimecomponent_component_1 = require('../dynamiccontrols/dynamicfields/datetimecomponent.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var ConditionComponent = (function () {
    function ConditionComponent(_validateService, administrationService, notificationService) {
        var _this = this;
        this._validateService = _validateService;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.fieldValueType = 6;
        this.fieldValueVisible = true;
        this.datetimeRegularExpression = "";
        this.datetimeformatstring = "";
        this.dateRegularExpression = "";
        this.stringRegularExp = "";
        this.dateformatstring = "";
        this.eliminateParentGroup = new core_1.EventEmitter();
        this.conditionLookUp = [
            { Id: 1, Value: "Equal to", Exp: '=', Sp: "Ç" },
            { Id: 2, Value: "Not equal to", Exp: '<>', Sp: "ß" },
            { Id: 3, Value: "Contains", Exp: 'LIKE', Sp: "Ñ" },
            { Id: 4, Value: "Is Blank", Exp: 'IS NULL', Sp: "þ" },
            { Id: 5, Value: "Is not Blank", Exp: 'IS NOT NULL', Sp: "¢" }
        ];
        this.conditionLookUpInt = [
            { Id: 1, Value: "Equal to", Exp: '=', Sp: "Ç" },
            { Id: 2, Value: "Not equal to", Exp: '<>', Sp: "ß" },
            { Id: 4, Value: "Is Blank", Exp: 'IS NULL', Sp: "þ" },
            { Id: 5, Value: "Is not Blank", Exp: 'IS NOT NULL', Sp: "¢" },
            { Id: 6, Value: "Less than", Exp: '<', Sp: "é" },
            { Id: 7, Value: "Greater than", Exp: '>', Sp: "ü" }
        ];
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    ConditionComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        console.log("ConditionComponent", contextObj.conditionFields);
        if (contextObj.conditionFields.ConditionFieldObj.FieldValue == "4" || contextObj.conditionFields.ConditionFieldObj.FieldValue == "5")
            contextObj.fieldValueVisible = false;
        console.log("ConditionComponent-groupFields", contextObj.groupFields);
        contextObj.getdateRegularex();
        contextObj.getdatetimeRegularex();
        contextObj.getStringRegularex();
    };
    ConditionComponent.prototype.removeCondition = function (datasrc) {
        debugger;
        var contextObj = this;
        if (contextObj.groupFields.SubGroups.length > 0) {
            contextObj.notificationService.ShowToaster("Child group exists", 5);
        }
        else {
            var index = contextObj.groupFields.Conditions.findIndex(function (el) { return el['ConditionId'] == datasrc.ConditionId; });
            contextObj.groupFields.Conditions.splice(index, 1);
        }
    };
    ConditionComponent.prototype.ddlChangeOperator = function (event, object) {
        // this.groupFields.Conditions = this.groupFields.Conditions.slice();
    };
    ConditionComponent.prototype.getdateRegularex = function () {
        var contextObj = this;
        contextObj.administrationService.getWhitelistDetails(7).subscribe(function (resultData) {
            contextObj.dateRegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
            contextObj.dateformatstring = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
        });
    };
    ConditionComponent.prototype.getdatetimeRegularex = function () {
        var contextObj = this;
        contextObj.administrationService.getWhitelistDetails(8).subscribe(function (resultData) {
            contextObj.datetimeRegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
            contextObj.datetimeformatstring = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
        });
    };
    ConditionComponent.prototype.getStringRegularex = function () {
        var contextObj = this;
        contextObj.administrationService.getWhitelistDetails(3).subscribe(function (resultData) {
            contextObj.stringRegularExp = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
        });
    };
    ConditionComponent.prototype.ddlChangeFldName = function (event, conditionObj) {
        debugger;
        var contextObj = this;
        for (var i = 0; i < contextObj.groupFields.Conditions.length; i++) {
            if (contextObj.groupFields.Conditions[i].FldNameFieldObj.FieldValue == event.ChildFieldObject.FieldValue) {
                var item = contextObj.groupFields.Conditions[i].FldNameFieldObj.LookupDetails.LookupValues.find(function (item) {
                    if (item.Id.toString() == contextObj.groupFields.Conditions[i].FldNameFieldObj.FieldValue && conditionObj.ConditionId == contextObj.groupFields.Conditions[i].ConditionId) {
                        var test = item.Type.toString();
                        contextObj.groupFields.Conditions[i].FldValueFieldObj.GenericDataTypeId = item.Type;
                        contextObj.groupFields.Conditions[i].FldValueFieldObj.FieldValue = "";
                        contextObj.groupFields.Conditions[i].FldValueFieldObj.IsLocallyValidated = false;
                        switch (item.Type) {
                            case 1:
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 5;
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                break;
                            case 2:
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 2;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 7;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9a-zA-Z ]+$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = contextObj.dateformatstring;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["WhitelistExpression"] = "^[0-9a-zA-Z ]+$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["WhitelistId"] = 7;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.Id = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.RegularExpression = contextObj.dateRegularExpression;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.FormatString = "dd MMM yyyy";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 20;
                                break;
                            case 3:
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 8;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["DataFormat"] = "dd MMM yyyy hh:mm a/pm";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.RegularExpression = contextObj.datetimeRegularExpression;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.FormatString = "d MMM yyyy hh:mm a/pm"; //contextObj.datetimeformatstring;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 8;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.Id = 2;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9a-zA-Z-: ]+$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = "dd-mmm-yyyy HH:mm:ss";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["WhitelistExpression"] = "^[0-9a-zA-Z-: ]+$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["WhitelistId"] = 8;
                                //contextObj.groupFields.Conditions[i].FldValueFieldObj["DataFormat"] = contextObj.groupFields.Conditions[i].FldValueFieldObj.Format.FormatString;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj["DataExpression"] = contextObj.datetimeRegularExpression;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 25;
                                break;
                            case 4:
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 19;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9]*(\.[0-9]+)?$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;
                                break;
                            case 5:
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 5;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 14;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9]+$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;
                                break;
                            case 6:
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUp;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 100;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = contextObj.stringRegularExp;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 3;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;
                                break;
                            case 7:
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.DataEntryControlId = 1;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 5;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 20;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9.]+$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;
                                break;
                            case 8:
                                contextObj.groupFields.Conditions[i].ConditionFieldObj.LookupDetails.LookupValues = contextObj.conditionLookUpInt;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.Id = 8;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.MaxLength = 20;
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.RegularExpression = "^[0-9a-zA-Z-: ]+$";
                                contextObj.groupFields.Conditions[i].FldValueFieldObj.Whitelist.FormatString = null;
                                break;
                        }
                        return true;
                    }
                });
            }
        }
    };
    ConditionComponent.prototype.ddlChangeCondition = function (event, object, fieldObject) {
        var value = event.ChildFieldObject.FieldValue;
        if (value == 4 || value == 5) {
            this.fieldValueVisible = false;
            object.IsMandatory = false;
            fieldObject.FieldValue = "";
        }
        else {
            this.fieldValueVisible = true;
            object.IsMandatory = true;
        }
    };
    ConditionComponent.prototype.showComponent = function (isVisible) {
        if (isVisible) {
            return "block";
        }
        else {
            return "none";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConditionComponent.prototype, "conditionFields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ConditionComponent.prototype, "groupFields", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ConditionComponent.prototype, "eliminateParentGroup", void 0);
    ConditionComponent = __decorate([
        core_1.Component({
            selector: 'qbcondition',
            templateUrl: 'app/Framework/Views/QueryBuilder/condition.component.html',
            directives: [labelcomponent_component_1.LabelComponent, dropdownlistcomponent_component_1.DropDownListComponent, stringtextbox_component_1.StringTextBoxComponent, datecomponent_component_1.DateComponent, textareacomponent_component_1.TextAreaComponent, datetimecomponent_component_1.DateTimeComponent],
            providers: [validation_service_1.ValidateService, administration_service_1.AdministrationService, notify_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], ConditionComponent);
    return ConditionComponent;
}());
exports.ConditionComponent = ConditionComponent;
//# sourceMappingURL=condition.component.js.map