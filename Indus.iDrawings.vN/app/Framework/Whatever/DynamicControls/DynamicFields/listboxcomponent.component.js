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
var validate_directive_1 = require('../../Validation/validate.directive');
var ListBoxComponent = (function () {
    function ListBoxComponent(_el) {
        this._el = _el;
        this.header1 = "";
        this.header2 = "";
        this.showDiv = "none";
        this.strValidation = "";
        this.blnDisableSelectAll = false;
        this.blnHasValidationError = false;
        this.IsChecked = true;
        this.lstBox = new core_1.EventEmitter();
        this.selAll = new core_1.EventEmitter();
        this.labeltitle = "";
    }
    ListBoxComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        if (this.SetAlignment == "horizontal") {
            this.setAlignment = "flex";
        }
        else {
            this.setAlignment = "block";
        }
        if (contextObj.heading1 != "") {
            contextObj.header1 = contextObj.heading1;
            contextObj.showDiv = "flex";
        }
        if (contextObj.heading1 != "") {
            contextObj.header2 = this.heading2;
        }
        if (contextObj.blnSelectAllChecked == true) {
            contextObj.IsSelectAllChecked = true;
        }
        else {
            contextObj.IsSelectAllChecked = false;
        }
        if (contextObj.fieldObject.MultiFieldValues != undefined && contextObj.fieldObject.LookupDetails.LookupValues != null) {
            if (contextObj.fieldObject.LookupDetails.LookupValues.length == contextObj.fieldObject.MultiFieldValues.length) {
                contextObj.IsSelectAllChecked = true;
            }
            else {
                contextObj.IsSelectAllChecked = false;
            }
        }
        if (contextObj.fieldObject.LookupDetails.LookupValues == null) {
            contextObj.blnDisableSelectAll = true;
        }
        else {
            contextObj.blnDisableSelectAll = false;
        }
        if (contextObj.fieldObject.LookupDetails.LookupValues) {
            contextObj.IsSelectAllChecked = false;
        }
        if (contextObj.fieldObject.IsEnabled == false) {
            contextObj.blnDisableSelectAll = true;
        }
        else {
            contextObj.blnDisableSelectAll = false;
        }
        if (contextObj.fieldObject.Width != undefined) {
            contextObj.fieldWidth = contextObj.fieldObject.Width;
        }
        else {
            contextObj.fieldWidth = "250";
        }
        if (contextObj.fieldObject.FieldLabel)
            contextObj.labeltitle = contextObj.fieldObject.FieldLabel + ' ListBox';
        contextObj.validationMessage();
    };
    ListBoxComponent.prototype.ngAfterViewChecked = function () {
        var contextObj = this;
        if (contextObj.fieldObject.MultiFieldValues != undefined && contextObj.fieldObject.LookupDetails.LookupValues != null) {
            if (contextObj.fieldObject.LookupDetails.LookupValues.length == contextObj.fieldObject.MultiFieldValues.length) {
                contextObj.IsSelectAllChecked = true;
            }
            else {
                contextObj.IsSelectAllChecked = false;
            }
        }
        if (contextObj.fieldObject.LookupDetails.LookupValues == null) {
            contextObj.blnDisableSelectAll = true;
        }
        else {
            contextObj.blnDisableSelectAll = false;
        }
        if (this.fieldObject.MultiFieldValues != null) {
            for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                var element = document.getElementsByName(contextObj.fieldObject.ReportFieldId.toString()).item(i);
                if (element != undefined) {
                    element.checked = false;
                }
            }
            for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                for (var j = 0; j < this.fieldObject.MultiFieldValues.length; j++) {
                    if (this.fieldObject.LookupDetails.LookupValues[i].Id.toString() == this.fieldObject.MultiFieldValues[j].toString()) {
                        var element = document.getElementsByName(contextObj.fieldObject.ReportFieldId.toString()).item(i);
                        if (element != undefined) {
                            element.checked = true;
                        }
                    }
                }
            }
        }
        this.validationMessage();
    };
    ListBoxComponent.prototype.update = function (value) {
    };
    ListBoxComponent.prototype.checkedOption = function (fieldObj) {
        if (!fieldObj["IsChecked"] || this.IsChecked == true) {
            fieldObj["IsChecked"] = false;
            if (this.fieldObject.MultiFieldValues != null) {
                for (var i = 0; i < this.fieldObject.MultiFieldValues.length; i++) {
                    if (this.fieldObject.MultiFieldValues[i] == fieldObj["Id"]) {
                        fieldObj["IsChecked"] = true;
                        break;
                    }
                }
            }
        }
        this.validationMessage();
        return fieldObj["IsChecked"];
    };
    ListBoxComponent.prototype.updateCheckedOptions = function (option, event) {
        var mulFieldArrlen;
        var contextObj = this;
        var lookupArrLength = this.fieldObject.LookupDetails.LookupValues.length;
        if (contextObj.fieldObject.MultiFieldValues == null) {
            contextObj.fieldObject.MultiFieldValues = [];
            this.validationMessage();
            if (contextObj.fieldObject != undefined) {
                if (contextObj.fieldObject.FieldId != null) {
                    var element = document.getElementById(contextObj.fieldObject.FieldId.toString());
                    if (element != undefined) {
                        element.checked = false;
                    }
                }
            }
        }
        var index = this.fieldObject.MultiFieldValues.indexOf(option["Id"].toString());
        if (event.target.checked == true) {
            if (index == -1) {
                contextObj.fieldObject.MultiFieldValues.push(option["Id"].toString());
            }
            mulFieldArrlen = this.fieldObject.MultiFieldValues.length;
            if (lookupArrLength == mulFieldArrlen) {
                contextObj.IsSelectAllChecked = true;
                if (contextObj.fieldObject != undefined) {
                    if (contextObj.fieldObject.FieldId != null) {
                        var element = document.getElementById(contextObj.fieldObject.FieldId.toString());
                        if (element != undefined) {
                            element.checked = true;
                        }
                    }
                }
            }
            else {
                contextObj.IsSelectAllChecked = false;
                if (contextObj.fieldObject != undefined) {
                    if (contextObj.fieldObject.FieldId != null) {
                        var element = document.getElementById(contextObj.fieldObject.FieldId.toString());
                        if (element != undefined) {
                            element.checked = false;
                        }
                    }
                }
            }
        }
        else if (event.target.checked == false) {
            if (index > -1) {
                this.fieldObject.MultiFieldValues.splice(index, 1);
            }
            this.IsSelectAllChecked = false;
            if (contextObj.fieldObject != undefined) {
                if (contextObj.fieldObject.FieldId != null) {
                    var element = document.getElementById(contextObj.fieldObject.FieldId.toString());
                    if (element != undefined) {
                        element.checked = false;
                    }
                }
            }
        }
        this.lstBox.emit({
            chkevent: event,
            fieldObject: this.fieldObject
        });
    };
    ListBoxComponent.prototype.validationMessage = function () {
        var contextObj = this;
        if (contextObj.fieldObject.IsMandatory == true) {
            if (contextObj.fieldObject.MultiFieldValues == [] || contextObj.fieldObject.MultiFieldValues == null || contextObj.fieldObject.MultiFieldValues.length == 0) {
                contextObj.fieldObject.HasValidationError = true;
                contextObj.blnHasValidationError = true;
                if (contextObj.strLstBoxValidateMessage != undefined) {
                    contextObj.strValidation = contextObj.strLstBoxValidateMessage;
                }
                else {
                    contextObj.strValidation = "Select  at least one " + contextObj.fieldObject.FieldLabel;
                }
            }
            else {
                contextObj.fieldObject.HasValidationError = false;
                contextObj.blnHasValidationError = false;
            }
        }
        else {
            contextObj.fieldObject.HasValidationError = false;
            contextObj.blnHasValidationError = false;
        }
    };
    ListBoxComponent.prototype.selectAllOptions = function (event) {
        var contextObj = this;
        if (event.target.checked == true) {
            contextObj.IsChecked = true;
            contextObj.fieldObject.MultiFieldValues = [];
            if (contextObj.fieldObject.LookupDetails.LookupValues != null) {
                for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                    contextObj.fieldObject.MultiFieldValues.push(contextObj.fieldObject.LookupDetails.LookupValues[i].Id.toString());
                    var element = document.getElementsByName(contextObj.fieldObject.ReportFieldId.toString()).item(i);
                    if (element != undefined) {
                        element.checked = true;
                    }
                }
            }
        }
        else if (event.target.checked == false) {
            if (contextObj.fieldObject.MultiFieldValues != null) {
                for (var i = 0; i < this.fieldObject.MultiFieldValues.length; i++) {
                    contextObj.fieldObject.MultiFieldValues.pop();
                    contextObj.IsChecked = false;
                }
                if (contextObj.fieldObject.LookupDetails.LookupValues != null) {
                    for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                        var element = document.getElementsByName(contextObj.fieldObject.ReportFieldId.toString()).item(i);
                        if (element != undefined) {
                            element.checked = false;
                        }
                    }
                }
            }
            contextObj.fieldObject.MultiFieldValues = [];
            contextObj.IsChecked = false;
        }
        if (contextObj.fieldObject.LookupDetails.LookupValues == null) {
            contextObj.blnDisableSelectAll = true;
        }
        else {
            contextObj.blnDisableSelectAll = false;
        }
        this.selAll.emit({
            chkevent: event.target.checked,
            fieldObject: this.fieldObject
        });
    };
    ListBoxComponent.prototype.setlabeltitle = function () {
        var label = '';
        label = this.labeltitle;
        if (this.fieldObject.IsMandatory)
            label = label + ' Mandatory Field ';
        if (this.blnHasValidationError == true)
            label = label + this.strValidation;
        return label;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ListBoxComponent.prototype, "blnSelectAllChecked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ListBoxComponent.prototype, "SetAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListBoxComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ListBoxComponent.prototype, "strLstBoxValidateMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListBoxComponent.prototype, "heading1", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListBoxComponent.prototype, "heading2", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListBoxComponent.prototype, "lstBox", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ListBoxComponent.prototype, "selAll", void 0);
    ListBoxComponent = __decorate([
        core_1.Component({
            selector: 'ListBoxComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/listboxcomponent.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            directives: [validate_directive_1.Validation]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ListBoxComponent);
    return ListBoxComponent;
}());
exports.ListBoxComponent = ListBoxComponent;
//# sourceMappingURL=listboxcomponent.component.js.map