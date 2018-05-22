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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var ModuleAccessComponent = (function () {
    function ModuleAccessComponent(administrationService, notificationService) {
        var _this = this;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.administrationService.getModuleAccessData().subscribe(function (fieldDetails) { return _this.accessModulesList = fieldDetails["data"]; }, function (error) { return _this.errorMessage = error; });
    }
    ModuleAccessComponent.prototype.updateModuleAccess = function () {
        console.log(this.accessModulesList);
        this.administrationService.updateModuleAccess(this.accessModulesList);
        this.notificationService.ShowToaster("Module Access privilege has been updated", 3);
    };
    ModuleAccessComponent = __decorate([
        core_1.Component({
            selector: 'module-access',
            templateUrl: './app/Views/Administration/AccessTemplates/moduleaccess.component.html',
            directives: [notify_component_1.Notification, listboxcomponent_component_1.ListBoxComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ["selectedIds"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], ModuleAccessComponent);
    return ModuleAccessComponent;
}());
exports.ModuleAccessComponent = ModuleAccessComponent;
//# sourceMappingURL=moduleaccess.component.js.map