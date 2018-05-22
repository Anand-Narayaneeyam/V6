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
var toaster_config_1 = require('./toaster-config');
var confirmtoaster_service_1 = require('./confirmtoaster.service');
var toast_component_1 = require('./toast.component');
var ConfirmContainerComponent = (function () {
    function ConfirmContainerComponent(confirmToasterService, ref) {
        this.ref = ref;
        this.onConfirmAction = new core_1.EventEmitter();
        this.toasts = [];
        this.confirmToasterService = confirmToasterService;
    }
    ConfirmContainerComponent.prototype.ngOnInit = function () {
        this.registerSubscribers();
        if (this.toasterconfig === null || typeof this.toasterconfig === 'undefined') {
            this.toasterconfig = new toaster_config_1.ToasterConfig();
        }
    };
    // event handlers 
    ConfirmContainerComponent.prototype.okClickHandle = function (event) {
        event.returnOk = true;
        this.onConfirmAction.emit(event);
        this.removeToast(event);
    };
    // event handlers 
    ConfirmContainerComponent.prototype.closeClickHandle = function (toast, isCloseButton) {
        if (this.toasterconfig.tapToDismiss || (toast.showCloseButton && isCloseButton)) {
            var removeToast = true;
            if (toast.clickHandler) {
                if (typeof toast.clickHandler === "function") {
                    removeToast = toast.clickHandler(toast, isCloseButton);
                }
                else {
                    console.log("The toast click handler is not a callable function.");
                    return false;
                }
            }
            if (removeToast) {
                this.removeToast(toast);
            }
        }
    };
    ConfirmContainerComponent.prototype.stopTimer = function (toast) {
        if (this.toasterconfig.mouseoverTimerStop) {
            if (toast.timeoutId) {
                window.clearTimeout(toast.timeoutId);
                toast.timeoutId = null;
            }
        }
    };
    ConfirmContainerComponent.prototype.restartTimer = function (toast) {
        if (this.toasterconfig.mouseoverTimerStop) {
            if (toast.timeoutId) {
                this.configureTimer(toast);
            }
        }
        else if (toast.timeoutId === null) {
            this.removeToast(toast);
        }
    };
    // private functions 
    ConfirmContainerComponent.prototype.registerSubscribers = function () {
        var _this = this;
        this.addToastSubscriber = this.confirmToasterService.addToast.subscribe(function (toast) {
            _this.addToast(toast);
        });
        this.clearToastsSubscriber = this.confirmToasterService.clearToasts.subscribe(function (clearWrapper) {
            _this.clearToasts(clearWrapper);
        });
    };
    ConfirmContainerComponent.prototype.addToast = function (toast) {
        toast.toasterConfig = this.toasterconfig;
        if (toast.toastContainerId && this.toasterconfig.toastContainerId
            && toast.toastContainerId !== this.toasterconfig.toastContainerId)
            return;
        if (!toast.type) {
            toast.type = this.toasterconfig.defaultTypeClass;
        }
        if (this.toasterconfig.preventDuplicates && this.toasts.length > 0) {
            if (toast.toastId && this.toasts.some(function (t) { return t.toastId === toast.toastId; })) {
                return;
            }
            else if (this.toasts.some(function (t) { return t.body === toast.body; })) {
                return;
            }
        }
        if (toast.showCloseButton === null || typeof toast.showCloseButton === "undefined") {
            if (typeof this.toasterconfig.showCloseButton === "object") {
                toast.showCloseButton = this.toasterconfig.showCloseButton[toast.type];
            }
            else if (typeof this.toasterconfig.showCloseButton === "boolean") {
                toast.showCloseButton = this.toasterconfig.showCloseButton;
            }
        }
        if (toast.showNoButton === null || typeof toast.showNoButton === "undefined") {
            if (typeof this.toasterconfig.showNoButton === "object") {
                toast.showNoButton = this.toasterconfig.showNoButton[toast.type];
            }
            else if (typeof this.toasterconfig.showCloseButton === "boolean") {
                toast.showNoButton = this.toasterconfig.showNoButton;
            }
        }
        if (toast.showOkButton === null || typeof toast.showOkButton === "undefined") {
            if (typeof this.toasterconfig.showOkButton === "object") {
                toast.showOkButton = this.toasterconfig.showOkButton[toast.type];
            }
            else if (typeof this.toasterconfig.showOkButton === "boolean") {
                toast.showOkButton = this.toasterconfig.showOkButton;
            }
        }
        if (toast.showCloseButton) {
            toast.closeHtml = toast.closeHtml || this.toasterconfig.closeHtml;
        }
        if (toast.showNoButton) {
            toast.closeHtml = toast.closeHtml || this.toasterconfig.closeHtml;
        }
        if (toast.showOkButton) {
            toast.OkHtml = toast.OkHtml || this.toasterconfig.OkHtml;
        }
        toast.bodyOutputType = toast.bodyOutputType || this.toasterconfig.bodyOutputType;
        this.configureTimer(toast);
        if (this.toasterconfig.newestOnTop) {
            this.toasts.unshift(toast);
            if (this.isLimitExceeded()) {
                this.toasts.pop();
            }
        }
        else {
            this.toasts.push(toast);
            if (this.isLimitExceeded()) {
                this.toasts.shift();
            }
        }
        if (toast.onShowCallback) {
            toast.onShowCallback(toast);
        }
    };
    ConfirmContainerComponent.prototype.configureTimer = function (toast) {
        var _this = this;
        var timeout = (typeof toast.timeout === "number")
            ? toast.timeout : this.toasterconfig.timeout;
        if (typeof timeout === "object")
            timeout = timeout[toast.type];
        if (timeout > 0) {
            toast.timeoutId = window.setTimeout(function () {
                _this.ref.markForCheck();
                _this.removeToast(toast);
            }, timeout);
        }
    };
    ConfirmContainerComponent.prototype.isLimitExceeded = function () {
        return this.toasterconfig.limit && this.toasts.length > this.toasterconfig.limit;
    };
    ConfirmContainerComponent.prototype.removeToast = function (toast) {
        var index = this.toasts.indexOf(toast);
        if (index < 0)
            return;
        this.toasts.splice(index, 1);
        if (toast.timeoutId) {
            window.clearTimeout(toast.timeoutId);
            toast.timeoutId = null;
        }
        if (toast.onHideCallback)
            toast.onHideCallback(toast);
    };
    ConfirmContainerComponent.prototype.removeAllToasts = function () {
        for (var i = this.toasts.length - 1; i >= 0; i--) {
            this.removeToast(this.toasts[i]);
        }
    };
    ConfirmContainerComponent.prototype.clearToasts = function (clearWrapper) {
        var toastId = clearWrapper.toastId;
        var toastContainerId = clearWrapper.toastContainerId;
        if (toastContainerId === null || typeof toastContainerId === 'undefined') {
            this.clearToastsAction(toastId);
        }
        else if (toastContainerId === this.toasterconfig.toastContainerId) {
            this.clearToastsAction(toastId);
        }
    };
    ConfirmContainerComponent.prototype.clearToastsAction = function (toastId) {
        if (toastId) {
            this.removeToast(this.toasts.filter(function (t) { return t.toastId === toastId; })[0]);
        }
        else {
            this.removeAllToasts();
        }
    };
    ConfirmContainerComponent.prototype.ngOnDestroy = function () {
        if (this.addToastSubscriber) {
            this.addToastSubscriber.unsubscribe();
        }
        if (this.clearToastsSubscriber) {
            this.clearToastsSubscriber.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', toaster_config_1.ToasterConfig)
    ], ConfirmContainerComponent.prototype, "toasterconfig", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ConfirmContainerComponent.prototype, "onConfirmAction", void 0);
    ConfirmContainerComponent = __decorate([
        core_1.Component({
            selector: 'confirm-container',
            directives: [toast_component_1.ToastComponent],
            template: " \n         <div id=\"toast-container\" [ngClass]=\"[toasterconfig.positionClass, toasterconfig.animationClass]\" class=\"ng-animate\"> \n             <div toastComp *ngFor=\"let toast of toasts\" class=\"toast\" [toast]=\"toast\" \n                 [iconClass]=\"toasterconfig.iconClasses[toast.type]\"  \n                 [ngClass]=\"toasterconfig.typeClasses[toast.type]\" \n                 (closeClickEvent)=\"closeClickHandle($event.value.toast,$event.value.isCloseButton)\"  (okClickEvent)=\"okClickHandle($event.value.toast)\"  \n                 (mouseover)=\"stopTimer(toast)\" (mouseout)=\"restartTimer\"> \n             </div> \n         </div> " //,
        }), 
        __metadata('design:paramtypes', [confirmtoaster_service_1.ConfirmToasterService, core_1.ChangeDetectorRef])
    ], ConfirmContainerComponent);
    return ConfirmContainerComponent;
}());
exports.ConfirmContainerComponent = ConfirmContainerComponent;
//# sourceMappingURL=confirmtoaster-container.js.map