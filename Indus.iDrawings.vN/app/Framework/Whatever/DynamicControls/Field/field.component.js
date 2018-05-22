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
var stringtextbox_component_1 = require('../DynamicFields/stringtextbox.component');
var FieldComponent = (function () {
    function FieldComponent(myElement) {
        this.myElement = myElement;
        this.readOnly = true;
    }
    FieldComponent.prototype.onFieldDoubleClick = function (event) {
        this.readOnly = false;
    };
    FieldComponent.prototype.updateField = function (fldObj) {
        fldObj.FieldValue = this.fieldValue;
        fldObj.ReadOnlyMode = this.readOnly;
        fldObj.NotificationType = "1";
        return fldObj;
    };
    FieldComponent = __decorate([
        core_1.Component({
            selector: 'field',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/field.component.html',
            inputs: ['fieldObject', 'fieldValue'],
            directives: [stringtextbox_component_1.StringTextBoxComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], FieldComponent);
    return FieldComponent;
}());
exports.FieldComponent = FieldComponent;
//# sourceMappingURL=field.component.js.map