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
var CustomCheckBoxComponent = (function () {
    function CustomCheckBoxComponent() {
        this.chkBoxClick = new core_1.EventEmitter();
    }
    CustomCheckBoxComponent.prototype.ngOnInit = function () {
        if (this.fieldObject.GenericDataTypeId == 1) {
            if ((this.fieldObject.FieldValue == null) || (this.fieldObject.FieldValue == "false") || (this.fieldObject.FieldValue == "False")) {
                this.fieldObject.FieldValue = "false";
            }
        }
        else if (this.fieldObject.GenericDataTypeId == 5) {
            if (this.fieldObject.FieldValue == null) {
                this.fieldObject.FieldValue = "0";
            }
        }
        if (this.fieldObject.FieldValue == "True" || this.fieldObject.FieldValue == "true" || this.fieldObject.FieldValue == "1") {
            this.IsSelectAllChecked = true;
        }
        else {
            this.IsSelectAllChecked = false;
        }
    };
    CustomCheckBoxComponent.prototype.ngAfterViewChecked = function () {
        if (this.fieldObject.FieldValue == "True" || this.fieldObject.FieldValue == "true" || this.fieldObject.FieldValue == "1") {
            this.IsSelectAllChecked = true;
        }
        else {
            this.IsSelectAllChecked = false;
        }
    };
    CustomCheckBoxComponent.prototype.selectAllOptions = function (event) {
        var srcelment = event.target || event.srcElement;
        if (this.fieldObject.GenericDataTypeId == 1) {
            if (srcelment.checked == true) {
                this.fieldObject.FieldValue = "true";
            }
            else {
                this.fieldObject.FieldValue = "false";
            }
        }
        else if (this.fieldObject.GenericDataTypeId == 5) {
            if (srcelment.checked == true) {
                this.fieldObject.FieldValue = "1";
            }
            else {
                this.fieldObject.FieldValue = "0";
            }
        }
        this.chkBoxClick.emit({
            fieldobject: this.fieldObject,
            IsChecked: srcelment.checked,
            fieldId: this.fieldObject.FieldId
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CustomCheckBoxComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CustomCheckBoxComponent.prototype, "chkBoxClick", void 0);
    CustomCheckBoxComponent = __decorate([
        core_1.Component({
            selector: 'CheckBoxComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/checkboxcomponent.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
        }), 
        __metadata('design:paramtypes', [])
    ], CustomCheckBoxComponent);
    return CustomCheckBoxComponent;
}());
exports.CustomCheckBoxComponent = CustomCheckBoxComponent;
//# sourceMappingURL=checkboxcomponent.component.js.map