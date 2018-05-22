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
var platform_browser_1 = require('@angular/platform-browser');
var bodyOutputType_1 = require('./bodyOutputType');
var ToastComponent = (function () {
    function ToastComponent(resolver, sanitizer) {
        this.resolver = resolver;
        this.sanitizer = sanitizer;
        this.bodyOutputType = bodyOutputType_1.BodyOutputType;
        this.closeClickEvent = new core_1.EventEmitter();
        this.okClickEvent = new core_1.EventEmitter();
        this.clickEvent = new core_1.EventEmitter();
    }
    ToastComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
            this.resolver.resolveComponent(this.toast.body).then(function (factory) {
                _this.componentBody.createComponent(factory, 0, _this.componentBody.injector);
            });
        }
        if (this.toast.closeHtml) {
            this.safeCloseHtml = this.sanitizer.bypassSecurityTrustHtml(this.toast.closeHtml);
        }
        if (this.toast.OkHtml) {
            this.safeOkHtml = this.sanitizer.bypassSecurityTrustHtml(this.toast.OkHtml);
        }
    };
    ToastComponent.prototype.closeButtonClick = function (event, toast) {
        event.stopPropagation();
        this.closeClickEvent.emit({
            value: { toast: toast, isCloseButton: true }
        });
    };
    ToastComponent.prototype.okButtonClick = function (event, toast) {
        event.stopPropagation();
        this.okClickEvent.emit({
            value: { toast: toast, isCloseButton: true }
        });
    };
    ToastComponent.prototype.click = function (event, toast) {
        event.stopPropagation();
        this.clickEvent.emit({
            value: { toast: toast, isCloseButton: true }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ToastComponent.prototype, "toast", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToastComponent.prototype, "iconClass", void 0);
    __decorate([
        core_1.ViewChild('componentBody', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], ToastComponent.prototype, "componentBody", void 0);
    ToastComponent = __decorate([
        core_1.Component({
            selector: '[toastComp]',
            template: " \n         <i class=\"toaster-icon\" [ngClass]=\"iconClass\"></i> \n         <div class=\"toast-content\"> \n             <div [ngClass]=\"toast.toasterConfig.titleClass\">{{toast.title}}</div> \n             <div [ngClass]=\"toast.toasterConfig.messageClass\" [ngSwitch]=\"toast.bodyOutputType\"> \n                 <div *ngSwitchCase=\"bodyOutputType.Component\" #componentBody></div> \n                 <div *ngSwitchCase=\"bodyOutputType.TrustedHtml\" [innerHTML]=\"toast.body\"></div> \n                 <div *ngSwitchCase=\"bodyOutputType.Default\">{{toast.body}}</div> \n             </div>   \n         <div style=\"width:100%\"  *ngIf=\"toast.showOkButton\">      \n             <div   class=\"toast-ok-button\"  *ngIf=\"toast.showOkButton\" (click)=\"okButtonClick($event, toast)\" \n                 [innerHTML]=\"safeOkHtml\"> \n             </div> \n               <div class=\"toast-no-button\"  *ngIf=\"toast.showNoButton\" (click)=\"closeButtonClick($event, toast)\" \n                 [innerHTML]=\"safeCloseHtml\"> \n             </div>\n         </div>\n         </div><div class=\"toast-close-button\" *ngIf=\"toast.showCloseButton\" (click)=\"click($event, toast)\" \n             [innerHTML]=\"safeCloseHtml\"> \n         </div>",
            outputs: ['closeClickEvent', 'okClickEvent', 'clickEvent']
        }), 
        __metadata('design:paramtypes', [core_1.ComponentResolver, platform_browser_1.DomSanitizationService])
    ], ToastComponent);
    return ToastComponent;
}());
exports.ToastComponent = ToastComponent;
//# sourceMappingURL=toast.component.js.map