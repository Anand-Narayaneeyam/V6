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
var WidgetComponent = (function () {
    function WidgetComponent(el) {
        this.el = el;
    }
    WidgetComponent = __decorate([
        core_1.Component({
            selector: 'widget',
            templateUrl: 'app/Framework/Views/Dashboard/widget.component.html',
            directives: [],
            inputs: [],
            styleUrls: ['app/Framework/Views/Dashboard/widget.component.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], WidgetComponent);
    return WidgetComponent;
}());
exports.WidgetComponent = WidgetComponent;
//# sourceMappingURL=widget.component.js.map