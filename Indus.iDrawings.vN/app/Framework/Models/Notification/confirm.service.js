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
require('rxjs/add/operator/share');
var notify_getsettings_service_1 = require('./notify.getsettings.service');
var ConfirmationService = (function () {
    function ConfirmationService(confirmToasterService, getToasterSettings) {
        this.getToasterSettings = getToasterSettings;
        this.confirmToasterService = confirmToasterService;
    }
    ConfirmationService.prototype.ShowPrompt = function (messagetext, okButtonText) {
        this.options = {
            title: this.getToasterSettings.title.name,
            timeout: 0,
            expandedTimeout: 0,
            tapToDismiss: false,
            theme: this.getToasterSettings.themes[1].code,
            type: 'info',
            position: this.getToasterSettings.position[0].code,
            showCloseButton: false,
            showNoButton: true,
            showOkButton: true,
            newestOnTop: false,
            autoDismiss: false,
            body: messagetext,
            toastContainerId: Date.now(),
            closeHtml: '<button class="buttons-toast" >No</button> ',
            OkHtml: '<button class="buttons-toast" >' + okButtonText + '</button> '
        };
        this.confirmToasterService.popAsync(this.options);
    };
    ConfirmationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_toaster_1.ConfirmToasterService, notify_getsettings_service_1.GetToasterSettings])
    ], ConfirmationService);
    return ConfirmationService;
}());
exports.ConfirmationService = ConfirmationService;
(function (NotificationType) {
    NotificationType[NotificationType["Default"] = 1] = "Default";
    NotificationType[NotificationType["Success"] = 2] = "Success";
    NotificationType[NotificationType["Info"] = 3] = "Info";
    NotificationType[NotificationType["Wait"] = 4] = "Wait";
    NotificationType[NotificationType["Error"] = 5] = "Error";
    NotificationType[NotificationType["Warning"] = 6] = "Warning";
})(exports.NotificationType || (exports.NotificationType = {}));
var NotificationType = exports.NotificationType;
//# sourceMappingURL=confirm.service.js.map