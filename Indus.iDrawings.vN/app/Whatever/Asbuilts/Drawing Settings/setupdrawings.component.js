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
var http_1 = require('@angular/http');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var drawingdetails_component_1 = require("../../common/drawingdetails/drawingdetails.component");
var SetupDrawingsComponent = (function () {
    function SetupDrawingsComponent() {
    }
    SetupDrawingsComponent.prototype.ngOnInit = function () {
        this.pagePath = "Settings / As Builts / Drawings";
    };
    SetupDrawingsComponent = __decorate([
        core_1.Component({
            selector: 'setup-drawings',
            templateUrl: './app/Views/Asbuilts/Drawing Settings/asbuilt-setupdrawings.component.html',
            directives: [page_component_1.PageComponent, drawingdetails_component_1.DrawingDetailsComponent],
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], SetupDrawingsComponent);
    return SetupDrawingsComponent;
}());
exports.SetupDrawingsComponent = SetupDrawingsComponent;
//# sourceMappingURL=setupdrawings.component.js.map