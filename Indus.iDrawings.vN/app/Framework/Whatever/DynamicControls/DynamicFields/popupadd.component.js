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
var PopupAddComponent = (function () {
    function PopupAddComponent() {
        this.addClick = new core_1.EventEmitter();
    }
    PopupAddComponent.prototype.ngOnInit = function () {
    };
    PopupAddComponent.prototype.popupAdd = function (event) {
        this.addClick.emit({
            event: event
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PopupAddComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PopupAddComponent.prototype, "addClick", void 0);
    PopupAddComponent = __decorate([
        core_1.Component({
            selector: 'popupAdd',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/popupaddcomponent.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css']
        }), 
        __metadata('design:paramtypes', [])
    ], PopupAddComponent);
    return PopupAddComponent;
}());
exports.PopupAddComponent = PopupAddComponent;
//# sourceMappingURL=popupadd.component.js.map