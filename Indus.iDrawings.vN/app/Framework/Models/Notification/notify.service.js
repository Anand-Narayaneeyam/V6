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
var NotificationService = (function () {
    function NotificationService(toasterService, getToasterSettings) {
        this.getToasterSettings = getToasterSettings;
        this.toasterService = toasterService;
    }
    NotificationService.prototype.ShowToaster = function (messagetext, messageType, position, timeout) {
        this.options = {
            title: this.getToasterSettings.title.name,
            showClose: true,
            timeout: timeout == null ? 5000 : timeout,
            tapToDismiss: true,
            theme: this.getToasterSettings.themes[1].code,
            type: this.getToasterSettings.types[messageType - 1].code,
            positionClass: position == null ? 'toast-top-right' : 'toast-top-left',
            showCloseButton: true,
            showNoButton: false,
            showOkButton: false,
            newestOnTop: true,
            autoDismiss: true,
            body: messagetext,
            toastContainerId: Guid.newGuid(),
            toastId: Guid.newGuid()
        };
        this.toasterService.popAsync(this.options);
        var ActiveElement = document.activeElement, currentTimeout = timeout == null ? 5000 : timeout;
        setTimeout(function () {
            var RootClass = document.getElementsByClassName("toast-message");
            if (RootClass && RootClass.length > 0) {
                RootClass[0].title = messagetext;
                RootClass[0].setAttribute('aria-label', messagetext);
                RootClass[0].tabIndex = 0;
                if (window["GlobalFocusVariable"]) {
                    ActiveElement = window["GlobalFocusVariable"];
                    window["GlobalFocusVariable"] = null;
                }
                else
                    ActiveElement = document.activeElement;
                RootClass[0].focus();
                RootClass[0].addEventListener('focusout', function (event) {
                    ActiveElement.focus();
                    window["GlobalFocusVariable"] = null;
                });
            }
        }, (currentTimeout / 4));
        setTimeout(function () {
            if (document.activeElement == null) {
                ActiveElement.focus();
                window["GlobalFocusVariable"] = null;
            }
        }, ((6 * currentTimeout) / 5));
    };
    NotificationService.prototype.ClearAllToasts = function () {
        this.toasterService.clear();
    };
    NotificationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_toaster_1.ToasterService, notify_getsettings_service_1.GetToasterSettings])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
var Guid = (function () {
    function Guid() {
    }
    Guid.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
}());
(function (NotificationType) {
    NotificationType[NotificationType["Default"] = 1] = "Default";
    NotificationType[NotificationType["Info"] = 2] = "Info";
    NotificationType[NotificationType["Success"] = 3] = "Success";
    NotificationType[NotificationType["Wait"] = 4] = "Wait";
    NotificationType[NotificationType["Error"] = 5] = "Error";
    NotificationType[NotificationType["Warning"] = 6] = "Warning";
})(exports.NotificationType || (exports.NotificationType = {}));
var NotificationType = exports.NotificationType;
//# sourceMappingURL=notify.service.js.map