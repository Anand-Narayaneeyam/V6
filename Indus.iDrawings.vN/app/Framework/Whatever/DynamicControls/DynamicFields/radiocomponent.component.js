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
var CustomRadioComponent = (function () {
    function CustomRadioComponent(elemRef) {
        this.rbtnClick = new core_1.EventEmitter();
        this.radiochange = false;
        this.el = elemRef;
    }
    CustomRadioComponent.prototype.ngOnInit = function () {
        if (this.fieldObject.GenericDataTypeId == 1) {
        }
    };
    CustomRadioComponent.prototype.ngAfterViewChecked = function () {
        var contextobj = this;
        if (contextobj.radiochange) {
            var focusset = $(contextobj.el.nativeElement).find('input[checked="checked"]');
            if (focusset && focusset.length > 0)
                contextobj.currentfocus = focusset[0];
            if (contextobj.currentfocus) {
                contextobj.currentfocus.focus();
                contextobj.radiochange = false;
            }
        }
    };
    CustomRadioComponent.prototype.onRbtnChange = function (event) {
        var contextobj = this;
        var currentfocus;
        this.fieldObject.FieldValue = event.target.id; /*Selected value*/
        this.rbtnClick.emit({
            fieldobject: this.fieldObject
        });
        this.radiochange = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CustomRadioComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CustomRadioComponent.prototype, "rbtnClick", void 0);
    CustomRadioComponent = __decorate([
        core_1.Component({
            selector: 'RadioComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/radiocomponent.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CustomRadioComponent);
    return CustomRadioComponent;
}());
exports.CustomRadioComponent = CustomRadioComponent;
//# sourceMappingURL=radiocomponent.component.js.map