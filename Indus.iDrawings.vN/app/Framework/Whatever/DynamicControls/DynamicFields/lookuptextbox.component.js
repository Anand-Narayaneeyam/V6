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
var LookupStringTextBoxComponent = (function () {
    function LookupStringTextBoxComponent() {
        this.stringValue = "";
        this.validate = true;
        this.filteredList = [];
        this.filterArray = [];
        this.lookupSelectEmit = new core_1.EventEmitter();
    }
    LookupStringTextBoxComponent.prototype.ngOnInit = function () {
        if (this.fieldObject.LookupDetails != null) {
            this.filterArray = JSON.parse(JSON.stringify(this.fieldObject.LookupDetails.LookupValues));
        }
        else {
            this.filterArray = null;
        }
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
    LookupStringTextBoxComponent.prototype.filter = function (value) {
        var context = this;
        this.stringValue = value.target.value;
        if (this.stringValue !== "" && this.stringValue.length >= 3 && this.filterArray != null) {
            this.filteredList = this.filterArray.filter(function (el) {
                if (el.Value != null)
                    return el.Value.toLowerCase().indexOf(this.stringValue.toLowerCase()) !== -1;
                // return (el.Value.toLowerCase().substr(0, this.stringValue.length) === this.stringValue.toLowerCase()) == true;
            }.bind(this));
        }
        else {
            this.filteredList = [];
        }
    };
    LookupStringTextBoxComponent.prototype.select = function (item) {
        this.fieldObject.FieldValue = item.Value;
        this.lookupSelectEmit.emit({ selectedItem: item });
        this.filteredList = [];
    };
    LookupStringTextBoxComponent.prototype.onBlurMethod = function () {
        this.filteredList = [];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LookupStringTextBoxComponent.prototype, "fieldValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LookupStringTextBoxComponent.prototype, "alignContent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LookupStringTextBoxComponent.prototype, "SetAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LookupStringTextBoxComponent.prototype, "labelwidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LookupStringTextBoxComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LookupStringTextBoxComponent.prototype, "inttabIndex", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LookupStringTextBoxComponent.prototype, "lookupSelectEmit", void 0);
    LookupStringTextBoxComponent = __decorate([
        core_1.Component({
            selector: 'LookupStringTextBox',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/lookuptextbox.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/Search/searchFields.css'],
            directives: [validate_directive_1.Validation]
        }), 
        __metadata('design:paramtypes', [])
    ], LookupStringTextBoxComponent);
    return LookupStringTextBoxComponent;
}());
exports.LookupStringTextBoxComponent = LookupStringTextBoxComponent;
//# sourceMappingURL=lookuptextbox.component.js.map