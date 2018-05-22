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
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var radiocomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var buttoncomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/buttoncomponent.component');
var PasswordPolicyComponent = (function () {
    function PasswordPolicyComponent(administrationService, el, _validateService, notificationService, generFun, _renderer) {
        var _this = this;
        this.administrationService = administrationService;
        this.el = el;
        this._validateService = _validateService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this._renderer = _renderer;
        this.btnName = "Save Changes";
        this.position = "top-left";
        this.horizontal = "horizontal";
        this.showSlide = false;
        this.blnIsFocused = false;
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    PasswordPolicyComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.administrationService.getpasswordPolicyFields().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.fieldDetailsPasswordPolicy = resultData["Data"];
                contextObj.fieldDetailsPasswordPolicy[6].LookupDetails.LookupValues = [
                    {
                        "Id": 1,
                        "Value": "Password Never Expires",
                    },
                    {
                        "Id": 2,
                        "Value": "Expire after",
                    }
                ];
                contextObj.fieldDetailsPasswordPolicy[13].LookupDetails.LookupValues = [
                    {
                        "Id": 3,
                        "Value": "Account Never Locked",
                    },
                    {
                        "Id": 4,
                        "Value": "Locked after",
                    }
                ];
                for (var i = 0; i < contextObj.fieldDetailsPasswordPolicy.length; i++) {
                    if (i == 0 || (i >= 7 && i <= 12) || i == 14) {
                        contextObj.fieldDetailsPasswordPolicy[i].Width = "50";
                    }
                    if (i == 6) {
                        if (contextObj.fieldDetailsPasswordPolicy[6].FieldValue == "True" || contextObj.fieldDetailsPasswordPolicy[6].FieldValue == null || contextObj.fieldDetailsPasswordPolicy[6].FieldValue == "")
                            contextObj.fieldDetailsPasswordPolicy[6].FieldValue = "1";
                        else {
                            contextObj.fieldDetailsPasswordPolicy[6].FieldValue = "2";
                            contextObj.fieldDetailsPasswordPolicy[6].IsMandatory = true;
                        }
                        contextObj.RbnChange(contextObj.fieldDetailsPasswordPolicy[6].FieldLabel, contextObj);
                    }
                    else if (i == 13) {
                        if (contextObj.fieldDetailsPasswordPolicy[13].FieldValue == "False" || contextObj.fieldDetailsPasswordPolicy[13].FieldValue == null || contextObj.fieldDetailsPasswordPolicy[13].FieldValue == "")
                            contextObj.fieldDetailsPasswordPolicy[13].FieldValue = "3";
                        else {
                            contextObj.fieldDetailsPasswordPolicy[13].FieldValue = "4";
                            contextObj.fieldDetailsPasswordPolicy[6].IsMandatory = true;
                        }
                        contextObj.RbnChange(contextObj.fieldDetailsPasswordPolicy[13].FieldLabel, contextObj);
                    }
                    else if (i == 0) {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldLabel = contextObj.fieldDetailsPasswordPolicy[i].FieldLabel + " (Minimum 8 Characters)";
                    }
                    else if (i == 8) {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldLabel = contextObj.fieldDetailsPasswordPolicy[i].FieldLabel + " (Hours)";
                    }
                    else if (i == 9) {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldLabel = contextObj.fieldDetailsPasswordPolicy[i].FieldLabel + " (Maximum 20)";
                    }
                    else if (i == 12 || i == 11) {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldLabel = contextObj.fieldDetailsPasswordPolicy[i].FieldLabel + " (Minutes)";
                    }
                    if (contextObj.fieldDetailsPasswordPolicy[i].FieldId == 184 && (contextObj.fieldDetailsPasswordPolicy[i].FieldValue == null || contextObj.fieldDetailsPasswordPolicy[i].FieldValue == "")) {
                        contextObj.fieldDetailsPasswordPolicy[i].FieldValue = "8";
                    }
                }
                contextObj.fieldDetailsPasswordPolicy[14].FieldLabel = "Days";
                contextObj.checkboxEnable(contextObj.fieldDetailsPasswordPolicy[1].FieldValue, contextObj);
                contextObj.fieldDetailsPasswordPolicy;
            }
        });
    };
    PasswordPolicyComponent.prototype.ngAfterViewChecked = function () {
        if (this.blnIsFocused != true) {
            var input = null;
            var idtoFocus;
            idtoFocus = 184;
            input = document.getElementById(idtoFocus.toString());
            if (input != undefined) {
                this._renderer.invokeElementMethod(input, 'focus');
                this.blnIsFocused = true;
            }
        }
    };
    PasswordPolicyComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var message = "";
        debugger;
        var data = JSON.parse(event);
        for (var i = 0; i < data.length; i++) {
            if (data[i].ReportFieldId == 321) {
                if (data[i].Value == "2") {
                    data[i].Value = "0";
                }
                else {
                    data[i + 1].Value = "";
                }
            }
            if (data[i].ReportFieldId == 325) {
                if (data[i].Value == "") {
                    if (data[i + 1].Value != "") {
                        message = "Enter Maximum number of consecutive failed attempts before the account gets locked";
                    }
                    if (data[i + 2].Value != "") {
                        message = "Enter Maximum number of consecutive failed attempts before the account gets locked";
                    }
                }
                else {
                    if (data[i + 1].Value == "") {
                        message = "Enter Time interval for counting failed attempts to lock the account";
                    }
                    if (data[i + 2].Value == "") {
                        message = "Enter Account locked out period";
                    }
                }
            }
            if (data[i].ReportFieldId == 6315) {
                if (data[i].Value == "3") {
                    data[i].Value = "0";
                    data[i + 1].Value = "";
                }
                else {
                    data[i].Value = "1";
                }
            }
            if (data[i].ReportFieldId == 316) {
                if (data[i].FieldValue == "False" || data[i].FieldValue == "false") {
                    data[i + 1].FieldValue = "False";
                    data[i + 2].FieldValue = "False";
                }
            }
        }
        if (message == "") {
            data = JSON.stringify(data);
            this.administrationService.updatePasswordPolicy(data).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"].Message == "Success")
                        contextObj.notificationService.ShowToaster("Password Policy updated", 3);
                    else
                        contextObj.notificationService.ShowToaster("Action Failure", 5);
                }
            });
        }
        else {
            contextObj.notificationService.ShowToaster(message, 5);
        }
    };
    PasswordPolicyComponent.prototype.menuClick = function (value) {
        this.showSlide = !this.showSlide;
    };
    PasswordPolicyComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    PasswordPolicyComponent.prototype.RbnChange = function (value, contextObj) {
        if (value == "Password expiry") {
            for (var i = 0; i < this.fieldDetailsPasswordPolicy.length; i++) {
                if (contextObj.fieldDetailsPasswordPolicy[i].ReportFieldId == 321) {
                    if (contextObj.fieldDetailsPasswordPolicy[i].FieldValue != 1) {
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsEnabled = true;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = false;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsMandatory = true;
                    }
                    else {
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsEnabled = false;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = true;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsMandatory = false;
                    }
                }
            }
        }
        if (value == "Inactive Account Locking") {
            for (var i = 0; i < contextObj.fieldDetailsPasswordPolicy.length; i++) {
                if (contextObj.fieldDetailsPasswordPolicy[i].ReportFieldId == 6315) {
                    if (contextObj.fieldDetailsPasswordPolicy[i].FieldValue == 4) {
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsEnabled = true;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = false;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsMandatory = true;
                    }
                    else {
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsEnabled = false;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = true;
                        contextObj.fieldDetailsPasswordPolicy[i + 1].IsMandatory = false;
                    }
                }
            }
        }
    };
    PasswordPolicyComponent.prototype.checkboxEnable = function (value, contextObj) {
        if (value == true || value == "True") {
            contextObj.fieldDetailsPasswordPolicy[2].IsEnabled = true;
            contextObj.fieldDetailsPasswordPolicy[3].IsEnabled = true;
        }
        else {
            contextObj.fieldDetailsPasswordPolicy[2].IsEnabled = false;
            contextObj.fieldDetailsPasswordPolicy[3].IsEnabled = false;
            contextObj.fieldDetailsPasswordPolicy[2].FieldValue = false;
            contextObj.fieldDetailsPasswordPolicy[3].FieldValue = false;
        }
    };
    PasswordPolicyComponent.prototype.emitKeyUp = function (value) {
    };
    PasswordPolicyComponent.prototype.txtBoxChanges = function (value) {
    };
    PasswordPolicyComponent.prototype.chkBoxChange = function (value) {
        debugger;
        var contextObj = this;
        for (var i = 0; i < contextObj.fieldDetailsPasswordPolicy.length; i++) {
            if (contextObj.fieldDetailsPasswordPolicy[i].FieldId == value.fieldId) {
                contextObj.fieldDetailsPasswordPolicy[i].FieldValue = value.IsChecked;
            }
        }
        if (value.fieldId == 185) {
            this.checkboxEnable(value.IsChecked, contextObj);
        }
    };
    PasswordPolicyComponent.prototype.rbtnChange = function (value) {
        debugger;
        if (value.fieldobject.FieldLabel == "Password expiry") {
            var _loop_1 = function(i) {
                if (this_1.fieldDetailsPasswordPolicy[i].ReportFieldId == 321) {
                    if (value.fieldobject.FieldValue != 1) {
                        this_1.fieldDetailsPasswordPolicy[i + 1].IsEnabled = true;
                        this_1.fieldDetailsPasswordPolicy[i + 1].IsMandatory = true;
                        this_1.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = false;
                    }
                    else {
                        this_1.fieldDetailsPasswordPolicy[i + 1].IsEnabled = false;
                        this_1.fieldDetailsPasswordPolicy[i + 1].IsMandatory = false;
                        this_1.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = true;
                    }
                    contextObj = this_1;
                    el = document.getElementById("196");
                    setTimeout(function () {
                        contextObj._validateService.initiateValidation(contextObj.fieldDetailsPasswordPolicy[i + 1], contextObj, true, el);
                    }, 100);
                }
            };
            var this_1 = this;
            var contextObj, el;
            for (var i = 0; i < this.fieldDetailsPasswordPolicy.length; i++) {
                _loop_1(i);
            }
        }
        if (value.fieldobject.FieldLabel == "Inactive Account Locking") {
            var _loop_2 = function(i) {
                if (this_2.fieldDetailsPasswordPolicy[i].ReportFieldId == 6315) {
                    if (value.fieldobject.FieldValue == 4) {
                        this_2.fieldDetailsPasswordPolicy[i + 1].IsEnabled = true;
                        this_2.fieldDetailsPasswordPolicy[i + 1].IsMandatory = true;
                        this_2.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = false;
                    }
                    else {
                        this_2.fieldDetailsPasswordPolicy[i + 1].IsEnabled = false;
                        this_2.fieldDetailsPasswordPolicy[i + 1].IsMandatory = false;
                        this_2.fieldDetailsPasswordPolicy[i + 1].IsLocallyValidated = true;
                    }
                    el = document.getElementById("199");
                    contextObj = this_2;
                    setTimeout(function () {
                        contextObj._validateService.initiateValidation(contextObj.fieldDetailsPasswordPolicy[i + 1], contextObj, true, el);
                    }, 100);
                }
            };
            var this_2 = this;
            var el, contextObj;
            for (var i = 0; i < this.fieldDetailsPasswordPolicy.length; i++) {
                _loop_2(i);
            }
        }
    };
    PasswordPolicyComponent.prototype.onSubmit = function (form, value) {
        var checkForErrors = function (fieldObject) {
            return fieldObject.HasValidationError;
        };
        if (this.fieldDetailsPasswordPolicy.find(checkForErrors)) {
            return;
        }
        var retObj;
        this.reportFieldArray = this.generFun.getFieldValuesAsReportFieldArray(this.fieldDetailsPasswordPolicy);
        debugger;
        var isValid = true;
        if (isValid == true) {
            this.onSubmitData(this.reportFieldArray);
        }
        else {
        }
    };
    PasswordPolicyComponent.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], PasswordPolicyComponent.prototype, "input", void 0);
    PasswordPolicyComponent = __decorate([
        core_1.Component({
            selector: 'password-policy',
            templateUrl: './app/Views/Administration/General Settings/password-policy.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, stringtextbox_component_1.StringTextBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, radiocomponent_component_1.CustomRadioComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, buttoncomponent_component_1.ButtonComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, core_1.ElementRef, validation_service_1.ValidateService, notify_service_1.NotificationService, General_1.GeneralFunctions, core_1.Renderer])
    ], PasswordPolicyComponent);
    return PasswordPolicyComponent;
}());
exports.PasswordPolicyComponent = PasswordPolicyComponent;
//# sourceMappingURL=password-policy.component.js.map