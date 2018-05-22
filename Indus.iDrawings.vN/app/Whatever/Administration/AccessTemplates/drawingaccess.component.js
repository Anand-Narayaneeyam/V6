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
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var DrawingAccessComponent = (function () {
    function DrawingAccessComponent(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.drawingAccess = {
            "FieldId": 1,
            "FieldName": "DWG Access",
            "FieldType": 6,
            "FieldValue": "",
            "IsMandatory": false,
            "IsHiddenLabel": false,
            "IsVisible": true,
            "IsDisabled": true,
            "ReadOnlyMode": false
        };
    }
    DrawingAccessComponent.prototype.updateDrawingAccess = function () {
        console.log(this.drawingAccess.FieldValue);
        this.administrationService.updateDrawingAccess(this.drawingAccess.FieldValue);
        this.notificationService.ShowToaster("DWG Access has been updated", 3);
    };
    DrawingAccessComponent = __decorate([
        core_1.Component({
            selector: 'drawing-access',
            templateUrl: './app/Views/Administration/AccessTemplates/drawingaccess.component.html',
            directives: [notify_component_1.Notification, checkboxcomponent_component_1.CustomCheckBoxComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ["selectedIds"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], DrawingAccessComponent);
    return DrawingAccessComponent;
}());
exports.DrawingAccessComponent = DrawingAccessComponent;
//# sourceMappingURL=drawingaccess.component.js.map