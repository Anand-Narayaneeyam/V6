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
var platform_browser_1 = require('@angular/platform-browser');
var TextAreaComponent = (function () {
    function TextAreaComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.maxLength = "";
    }
    TextAreaComponent.prototype.ngOnInit = function () {
        if (this.SetAlignment == "horizontal") {
            this.setAlignment = "flex";
            this.labelWidth = this.labelwidth + "px";
            this.inlinewidth = this.sanitizer.bypassSecurityTrustStyle("calc(100% - " + this.labelwidth + ")");
            this.inlinewidth = this.inlinewidth + "px";
        }
        else {
            this.setAlignment = "block";
            this.labelWidth = "auto";
            this.inlinewidth = "";
        }
        if ((this.fieldObject.Height != null) || (this.fieldObject.Height != undefined)) {
            this.fieldHeight = this.fieldObject.Height;
        }
        else {
            this.fieldHeight = 70;
        }
        if ((this.fieldObject.Width != null) || (this.fieldObject.Width != undefined)) {
            this.fieldWidth = this.fieldObject.Width;
        }
        else {
            this.fieldWidth = "250";
        }
        if ((this.fieldObject.MaxLength == null) || (this.fieldObject.MaxLength == undefined)) {
            this.maxLength = "Max 4000 Chars";
        }
        else {
            this.maxLength = "Max " + this.fieldObject.MaxLength + " Chars";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TextAreaComponent.prototype, "labelwidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TextAreaComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TextAreaComponent.prototype, "SetAlignment", void 0);
    TextAreaComponent = __decorate([
        core_1.Component({
            selector: 'TextAreaComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/textareacomponent.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            directives: [validate_directive_1.Validation]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizationService])
    ], TextAreaComponent);
    return TextAreaComponent;
}());
exports.TextAreaComponent = TextAreaComponent;
//# sourceMappingURL=textareacomponent.component.js.map