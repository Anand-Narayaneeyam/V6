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
var StringTextBoxComponent = (function () {
    function StringTextBoxComponent(el) {
        this.el = el;
        this.blnPopupImage = true;
        this.validateMessageForGrid = new core_1.EventEmitter();
        this.txtBoxChange = new core_1.EventEmitter();
        this.keyUpemit = new core_1.EventEmitter();
        this.popupClick = new core_1.EventEmitter();
    }
    StringTextBoxComponent.prototype.ngOnInit = function () {
        if (this.SetAlignment == "horizontal") {
            this.setAlignment = "flex";
        }
        else {
            this.setAlignment = "block";
        }
        if (this.labelwidth == undefined) {
            this.labelWidth = "auto";
        }
        else {
            this.labelWidth = this.labelwidth + "px";
        }
        if ((this.fieldObject.Height != null) || (this.fieldObject.Height != undefined)) {
            this.fieldHeight = this.fieldObject.Height;
        }
        else {
            this.fieldHeight = 30;
        }
        if ((this.fieldObject.Width != null) || (this.fieldObject.Width != undefined)) {
            this.fieldWidth = this.fieldObject.Width;
        }
        else {
            this.fieldWidth = "250";
        }
        if (this.alignContent != "") {
            this.txtAlign = this.alignContent;
        }
        else {
            this.txtAlign = "left";
        }
    };
    StringTextBoxComponent.prototype.ngAfterViewChecked = function () {
    };
    StringTextBoxComponent.prototype.getTxtBoxDetails = function (event) {
        this.txtBoxChange.emit({
            txtBoxData: event,
            fieldObject: this.fieldObject
        });
    };
    StringTextBoxComponent.prototype.onKey = function (event) {
        this.keyUpemit.emit(event.currentTarget.value);
    };
    StringTextBoxComponent.prototype.onPaste = function (event) {
        var copiedText = event.clipboardData.getData('Text');
        var $targetElem = $(event.target);
        if ($targetElem.length > 0) {
            if (this.fieldObject.MaxLength) {
                if (copiedText.length <= this.fieldObject.MaxLength) {
                    var updatedValue = copiedText;
                    this.fieldObject.FieldValue = updatedValue;
                    $targetElem.val(updatedValue);
                    $targetElem.focus();
                }
            }
            else {
                var updatedValue = copiedText;
                this.fieldObject.FieldValue = updatedValue;
                $targetElem.val(updatedValue);
                $targetElem.focus();
            }
        }
        return false;
    };
    StringTextBoxComponent.prototype.validateMessage = function (event) {
        this.validateMessageForGrid.emit(event);
    };
    StringTextBoxComponent.prototype.popupAdd = function (event) {
        var reportfieldId = this.fieldObject.FieldId;
        this.popupClick.emit({
            reportfieldId: reportfieldId
        });
    };
    StringTextBoxComponent.prototype.onPopupKeyPress = function (Keyevent) {
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            Keyevent.preventDefault();
            this.popupAdd(Keyevent);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], StringTextBoxComponent.prototype, "readonlymode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StringTextBoxComponent.prototype, "SetAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StringTextBoxComponent.prototype, "alignContent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], StringTextBoxComponent.prototype, "inttabIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], StringTextBoxComponent.prototype, "labelwidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], StringTextBoxComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], StringTextBoxComponent.prototype, "blnPopupImage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StringTextBoxComponent.prototype, "strPopupText", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StringTextBoxComponent.prototype, "validateMessageForGrid", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StringTextBoxComponent.prototype, "txtBoxChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StringTextBoxComponent.prototype, "keyUpemit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StringTextBoxComponent.prototype, "popupClick", void 0);
    StringTextBoxComponent = __decorate([
        core_1.Component({
            selector: 'StringTextBox',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/stringtextbox.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            directives: [validate_directive_1.Validation]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], StringTextBoxComponent);
    return StringTextBoxComponent;
}());
exports.StringTextBoxComponent = StringTextBoxComponent;
//# sourceMappingURL=stringtextbox.component.js.map