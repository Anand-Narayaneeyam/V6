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
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var drawingdetails_service_1 = require('../../../Models/Common/drawingdetails.service');
var ModuleSwitchComponent = (function () {
    function ModuleSwitchComponent(drawingDetailsService) {
        var _this = this;
        this.drawingDetailsService = drawingDetailsService;
        this.onChange = new core_1.EventEmitter();
        this.drawingDetailsService.getModuleSwitchData().subscribe(function (fieldDetails) { return _this.moduleSwitchList = fieldDetails["data"]; }, function (error) { return _this.errorMessage = error; });
    }
    //    private changeModules(event) {
    //        console.log("Array", event.MultiFieldValues);
    //        this.onChange
    //}
    ModuleSwitchComponent.prototype.selectAllOptions = function (event) {
        //this.changeModules(this.moduleSwitchList)
        this.onChange.emit(this.moduleSwitchList);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ModuleSwitchComponent.prototype, "onChange", void 0);
    ModuleSwitchComponent = __decorate([
        core_1.Component({
            selector: 'module-switch',
            templateUrl: 'app/Views/Common/DrawingDetails/moduleswitch.component.html',
            directives: [listboxcomponent_component_1.ListBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, drawingdetails_service_1.DrawingDetailsService],
            inputs: ["selectedIds"]
        }), 
        __metadata('design:paramtypes', [drawingdetails_service_1.DrawingDetailsService])
    ], ModuleSwitchComponent);
    return ModuleSwitchComponent;
}());
exports.ModuleSwitchComponent = ModuleSwitchComponent;
//# sourceMappingURL=moduleswitch.component.js.map