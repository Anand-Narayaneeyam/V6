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
var DropDownListComponent = (function () {
    function DropDownListComponent(elemRef) {
        this.ischange = false;
        this.blnPopupImage = true;
        this.ShowSelectOption = true;
        this.ddlChange = new core_1.EventEmitter();
        this.popupClick = new core_1.EventEmitter();
        this.el = elemRef;
    }
    DropDownListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.fieldObject) {
            if (this.fieldObject.FieldValue == null || this.fieldObject.FieldValue == "") {
                this.fieldObject.FieldValue = "-1";
            }
            else {
                if (this.fieldObject.ReportFieldId > 1000000) {
                    if (this.fieldObject.LookupDetails.LookupValues) {
                        var lookupObj;
                        if (this.fieldObject.GenericDataTypeId == 2 || this.fieldObject.GenericDataTypeId == 3) {
                            var datevalue, datefieldvalue, contextObj = this;
                            datefieldvalue = new Date(contextObj.fieldObject.FieldValue);
                            this.fieldObject.LookupDetails.LookupValues.find(function (item) {
                                datevalue = new Date(item.Value);
                                if (datefieldvalue && datevalue && datevalue.valueOf() == datefieldvalue.valueOf()) {
                                    lookupObj = item;
                                    return true;
                                }
                                else
                                    return false;
                            });
                        }
                        else {
                            lookupObj = this.fieldObject.LookupDetails.LookupValues.find(function (item) { return item.Value == _this.fieldObject.FieldValue; });
                        }
                        if (lookupObj != null) {
                            this.fieldObject.FieldValue = lookupObj.Id.toString();
                        }
                        else {
                            this.fieldObject.FieldValue = "-1";
                        }
                    }
                }
                if (this.fieldObject.ReportFieldId >= 290 && this.fieldObject.ReportFieldId < 300) {
                    if (this.fieldObject.LookupDetails.LookupValues) {
                        var lookupObj = this.fieldObject.LookupDetails.LookupValues.find(function (item) { return item.Value == _this.fieldObject.FieldValue; });
                        if (lookupObj != null) {
                            this.fieldObject.FieldValue = lookupObj.Id.toString();
                        }
                        else {
                            this.fieldObject.FieldValue = "-1";
                        }
                    }
                }
            }
            if (this.SetAlignment == "horizontal") {
                this.setAlignment = "inline-flex";
            }
            else {
                this.setAlignment = "block";
            }
            if (this.labelWidth == undefined) {
                this.drplabelWidth = "auto";
            }
            else {
                this.drplabelWidth = this.labelWidth + "px";
            }
            if ((this.fieldObject.Height != null) || (this.fieldObject.Height != undefined)) {
                this.fieldHeight = this.fieldObject.Height;
            }
            else {
                this.fieldHeight = 30;
            }
            if ((this.fieldObject.Width != null) || (this.fieldObject.Width != undefined)) {
                this.fieldWidth = this.fieldObject.Width;
                if (this.fieldObject.LookupDetails.PopupComponent)
                    this.drplabelWidthPopup = this.labelWidth + 45;
            }
            else {
                this.fieldWidth = "250";
            }
            if ((this.labelWidth != null) || (this.labelWidth != undefined)) {
                this.drplabelWidth = this.labelWidth;
            }
            else {
                this.labelWidth = "150";
            }
            if (this.fieldObject.LookupDetails.LookupValues != null) {
                var selectedId = this.fieldObject.FieldValue;
                if (this.fieldObject.IsMandatory == true) {
                    if (selectedId == null || selectedId.length == 0 || selectedId == "-1") {
                        if (this.fieldObject.LookupDetails.LookupValues.length == 1) {
                            this.fieldObject.FieldValue = this.fieldObject.LookupDetails.LookupValues[0].Id.toString();
                            selectedId = this.fieldObject.FieldValue;
                            this.onddlChange(selectedId);
                            this.ischange = true;
                        }
                    }
                }
                for (var i = 0; i < this.fieldObject.LookupDetails.LookupValues.length; i++) {
                    if (this.fieldObject.LookupDetails.LookupValues[i].Id.toString() == selectedId) {
                        this.selectedLabel = this.fieldObject.LookupDetails.LookupValues[i].Value;
                    }
                }
            }
        }
    };
    DropDownListComponent.prototype.ngAfterViewInit = function () {
        var context = this;
        if (this.ischange) {
            setTimeout(function () {
                context.fireChangeEventOnWindow();
                context.ischange = false;
            }, 100);
        }
    };
    DropDownListComponent.prototype.fireChangeEventOnWindow = function () {
        var context = this;
        if (context.fieldObject && context.fieldObject.FieldId) {
            var input = document.getElementById(context.fieldObject.FieldId.toString());
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent('change', true, false);
            input.dispatchEvent(evt);
        }
    };
    DropDownListComponent.prototype.onddlChange = function (event) {
        if (this.fieldObject.FieldValue == null || this.fieldObject.FieldValue == "") {
            this.fieldObject.FieldValue = "-1";
        }
        else {
            this.fieldObject.FieldValue = event;
        }
        if (this.strPopupText != "" || this.strPopupText != null) {
            this.strPopupstring = this.strPopupText;
        }
        this.ddlChange.emit({
            ChildFieldObject: this.fieldObject
        });
    };
    DropDownListComponent.prototype.getSelectedValueDDL = function () {
        if (this.selectedLabel != null && this.selectedLabel != "" && this.selectedLabel != undefined) {
            this.ddlSelectedTitle = this.selectedLabel;
        }
    };
    DropDownListComponent.prototype.popupAdd = function (event) {
        var reportfieldId = this.fieldObject.FieldId;
        this.popupClick.emit({
            reportfieldId: reportfieldId
        });
    };
    DropDownListComponent.prototype.onPopupKeyPress = function (Keyevent) {
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            Keyevent.preventDefault();
            this.popupAdd(Keyevent);
        }
    };
    DropDownListComponent.prototype.ondropdownfocusin = function () {
        var ContextObj = this;
        var labelclass = ContextObj.el.nativeElement.getElementsByClassName("ddllabel_" + ContextObj.fieldObject.FieldId.toString());
        if (labelclass && labelclass.length) {
            if (labelclass[0].tabIndex != 0) {
                var selectclass = ContextObj.el.nativeElement.getElementsByClassName("ddl");
                labelclass[0].setAttribute('aria-label', selectclass[0].getAttribute('aria-label'));
                labelclass[0].tabIndex = 0;
                labelclass[0].focus();
                setTimeout(function () {
                    if (selectclass && selectclass.length) {
                        selectclass[0].focus();
                    }
                }, 400);
            }
            else {
                labelclass[0].tabIndex = -1;
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DropDownListComponent.prototype, "blnPopupImage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DropDownListComponent.prototype, "ShowSelectOption", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropDownListComponent.prototype, "strPopupText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropDownListComponent.prototype, "SetAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropDownListComponent.prototype, "alignContent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropDownListComponent.prototype, "labelWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DropDownListComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DropDownListComponent.prototype, "ddlChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DropDownListComponent.prototype, "popupClick", void 0);
    DropDownListComponent = __decorate([
        core_1.Component({
            selector: 'DropDownListComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/dropdownlistcomponent.component.html',
            inputs: ['fieldObject', 'setAlignment'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            directives: [validate_directive_1.Validation]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DropDownListComponent);
    return DropDownListComponent;
}());
exports.DropDownListComponent = DropDownListComponent;
//# sourceMappingURL=dropdownlistcomponent.component.js.map