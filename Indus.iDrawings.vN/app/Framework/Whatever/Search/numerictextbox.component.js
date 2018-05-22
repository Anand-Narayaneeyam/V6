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
var validate_directive_1 = require('../Validation/validate.directive');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../Models/Validation/validation.service');
var NumericTextBoxComponent = (function () {
    function NumericTextBoxComponent(limeter, _validateService) {
        this._validateService = _validateService;
        this.integerValue = "";
        this.readOnly = false;
        this.dropDownValue = "";
        this.filteredList = [];
        this.filterArray = [];
        this.dropdownForText = [{ Id: "", Value: "--Select--" }, { Id: "Ç", Value: "Equal to" }, { Id: "ü", Value: "Greater than" }, { Id: "é", Value: "Less than" }];
        this.limeter = limeter;
    }
    NumericTextBoxComponent.prototype.ngOnInit = function () {
        this.fieldObject.IsMandatory = false;
        if (this.fieldObject.LookupDetails != null) {
            var JsonObj = this.fieldObject.LookupDetails.LookupValues;
            for (var i in JsonObj) {
                if (JsonObj.hasOwnProperty(i) && !isNaN(+i)) {
                    this.filterArray[+i] = JsonObj[i].Value;
                }
            }
        }
        else {
            this.filterArray = null;
        }
        if (this.fieldObject.FieldValue == undefined) {
            this.fieldObject.FieldValue = "";
        }
        if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue.indexOf(this.limeter.ColumnDelimeter) <= -1) {
            if (this.fieldObject.FieldValue.indexOf(this.limeter.TypeDelimeter) > -1) {
                var arr1 = this.fieldObject.FieldValue.split(this.limeter.TypeDelimeter);
                this.integerValue = arr1[0];
                if (arr1[1] == ">")
                    this.dropDownValue = "ü";
                else if (arr1[1] == "=")
                    this.dropDownValue = "Ç";
                else if (arr1[1] == "<")
                    this.dropDownValue = "é";
            }
            else {
                this.dropDownValue = "";
                this.integerValue = this.fieldObject.FieldValue = "";
                this.readOnly = true;
                this.fieldObject.ReadOnlyMode = true;
            }
            this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.integerValue;
        }
        else {
            this.dropDownValue = "";
            this.integerValue = "";
            this.readOnly = true;
            this.fieldObject.FieldValue = "";
        }
        if (this.dropDownValue == "") {
            this.fieldObject.IsMandatory = false;
            this.fieldObject.IsLocallyValidated = true;
        }
        else {
            this.fieldObject.IsMandatory = true;
            this.fieldObject.IsLocallyValidated = false;
        }
        this.currentfocus = document.activeElement;
    };
    NumericTextBoxComponent.prototype.onChange = function (value) {
        var localObj = this;
        this.fieldObject.IsLocallyValidated = true;
        if (value.target.value == "") {
            localObj.fieldObject.FieldValue = "";
        }
        else {
            setTimeout(function () {
                localObj.integerValue = value.target.value;
                ;
                localObj.fieldObject.FieldValue = localObj.dropDownValue + localObj.limeter.ColumnDelimeter + value.target.value;
            }, 500);
        }
    };
    NumericTextBoxComponent.prototype.drpDwnChange = function (value) {
        this.dropDownValue = value;
        if (value == "") {
            this.readOnly = true;
            this.dropDownValue = "";
            this.fieldObject.IsMandatory = false;
            this.fieldObject.IsLocallyValidated = true;
            this.integerValue = "";
        }
        else {
            this.integerValue = "";
            this.readOnly = false;
            this.fieldObject.IsMandatory = true;
            this.fieldObject.IsLocallyValidated = false;
        }
        this.fieldObject.FieldValue = "";
        var contextObj = this;
        var el = document.getElementById(contextObj.fieldObject.FieldId.toString());
        setTimeout(function () {
            contextObj._validateService.initiateValidation(contextObj.fieldObject, contextObj, true, el);
        }, 100);
        //this.fieldObject.FieldValue =  value + this.limeter.ColumnDelimeter + this.integerValue;
    };
    NumericTextBoxComponent.prototype.filter = function (value) {
        this.integerValue = value.target.value;
        ;
        this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + value.target.value;
        if (this.integerValue !== "" && this.integerValue.length >= 3 && this.filterArray != null) {
            this.filteredList = this.filterArray.filter(function (el) {
                if (el != null) {
                    this.currentfocus = value.srcElement;
                    return (el.toLowerCase().substr(0, this.integerValue.length) === this.integerValue.toLowerCase()) == true;
                }
            }.bind(this));
        }
        else {
            this.filteredList = [];
        }
    };
    NumericTextBoxComponent.prototype.select = function (item) {
        this.integerValue = item;
        this.filteredList = [];
        this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.integerValue;
    };
    NumericTextBoxComponent.prototype.selectonkeypress = function (Keyevent, item) {
        var contextobj = this;
        var key = Keyevent.keyCode || Keyevent.which;
        if (key == 13 || key == 32) {
            setTimeout(function () {
                if (contextobj.currentfocus) {
                    contextobj.currentfocus.focus();
                    contextobj.currentfocus = null;
                }
            }, 150);
            this.select(item);
        }
    };
    NumericTextBoxComponent.prototype.onBlurMethod = function () {
        this.filteredList = [];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NumericTextBoxComponent.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NumericTextBoxComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NumericTextBoxComponent.prototype, "fieldValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumericTextBoxComponent.prototype, "validationData", void 0);
    NumericTextBoxComponent = __decorate([
        core_1.Component({
            selector: 'NumericTextBoxSearch',
            template: "\n               <div style=\"float:left;width:100%;\">\n                <div  control-group class=\"floating-label\" style=\"float:left;\">\n                    <label>\n                       {{fieldObject.FieldLabel}}\n                     </label>\n               </div>\n               <div control-group class=\"floating-label\" style=\"float:left;width:100%;\"> \n                    <label *ngIf=\"fieldObject.IsReadOnly === true\" class=\"readOnly\"  readOnly>{{fieldObject.FieldValue}}</label>\n                    <select class=\"form-control\" #t (change)=\"drpDwnChange(t.value)\" style=\"width:90px!important;float:left;height:24px;padding:2px 4px;background-color: #f1f1f1;border: 1px solid #ababab;\"  [ngModel]=\"dropDownValue\">\n                        <option *ngFor=\"let type of dropdownForText\" [value]=\"type.Id\">{{type.Value}}</option>\n                    </select>\n                    <input autocomplete=\"off\" onpaste=\"return false;\" name=\"IntegerTextBox\" id=\"{{fieldObject.FieldId}}\" validatetext [validationData]=\"validationData\"  [fieldObject]='fieldObject'  [(readonly)]=readOnly type=\"text\"  (change)=\"onChange($event)\" floating-label [(ngModel)]=\"integerValue\" style=\"width:132px!important;float:right\"  class=\"numtype\"(keyup)=filter($event) >\n                    <div class=\"suggestions\" *ngIf=\"filteredList.length > 0\" style=\"height:140px!important;margin-left:75px!important;\" >\n                        <ul>\n                            <li *ngFor=\"let item of filteredList\" (click)=\"select(item)\" tabindex=\"0\" [attr.aria-label]=\"''+item\" (keypress)=\"selectonkeypress($event,item)\">\n                                <a>{{item}}</a>\n                            </li>\n                        </ul>\n                    </div>\n               </div>     \n             </div> ",
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/Search/searchFields.css'],
            directives: [validate_directive_1.Validation],
            providers: [General_1.Delimeter, validation_service_1.ValidateService]
        }), 
        __metadata('design:paramtypes', [General_1.Delimeter, validation_service_1.ValidateService])
    ], NumericTextBoxComponent);
    return NumericTextBoxComponent;
}());
exports.NumericTextBoxComponent = NumericTextBoxComponent;
//# sourceMappingURL=numerictextbox.component.js.map