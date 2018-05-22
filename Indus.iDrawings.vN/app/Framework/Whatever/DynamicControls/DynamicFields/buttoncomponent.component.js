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
var ButtonComponent = (function () {
    function ButtonComponent() {
        this.btnChange = new core_1.EventEmitter();
    }
    ButtonComponent.prototype.ngOnInit = function () {
    };
    ButtonComponent.prototype.btnCompClick = function (event) {
        this.btnChange.emit({
            fieldData: this.fieldObject
        });
        event.stopPropagation();
        return false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ButtonComponent.prototype, "btnChange", void 0);
    ButtonComponent = __decorate([
        core_1.Component({
            selector: 'ButtonComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/buttoncomponent.component.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ButtonComponent);
    return ButtonComponent;
}());
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=buttoncomponent.component.js.map