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
var angular2_toaster_1 = require('../../ExternalLibraries/Notification/angular2-toaster');
var notify_service_1 = require('../../Models/Notification/notify.service');
var Notification = (function () {
    function Notification(notificationService) {
        this.notificationService = notificationService;
        this.notificationService = notificationService;
    }
    Notification = __decorate([
        core_1.Component({
            selector: 'notification',
            directives: [angular2_toaster_1.ToasterContainerComponent],
            providers: [notify_service_1.NotificationService],
            styleUrls: ['app/Framework/Views/Notification/toaster.css'],
            template: "\n        <toaster-container ></toaster-container>",
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService])
    ], Notification);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=notify.component.js.map