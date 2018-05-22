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
var confirm_service_1 = require('../../Models/Notification/confirm.service');
var ConfirmationComponent = (function () {
    function ConfirmationComponent(confirmationService) {
        this.confirmationService = confirmationService;
        this.onConfirm = new core_1.EventEmitter();
        this.confirmationService = confirmationService;
    }
    ConfirmationComponent.prototype.okConfirm = function (e) {
        this.onConfirm.emit(e);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ConfirmationComponent.prototype, "onConfirm", void 0);
    ConfirmationComponent = __decorate([
        core_1.Component({
            selector: 'confirmation',
            directives: [angular2_toaster_1.ConfirmContainerComponent],
            providers: [confirm_service_1.ConfirmationService],
            styleUrls: ['app/Framework/Views/Notification/toaster.css'],
            template: "\n        <confirm-container (onConfirmAction)=\"okConfirm($event)\"></confirm-container>"
        }), 
        __metadata('design:paramtypes', [confirm_service_1.ConfirmationService])
    ], ConfirmationComponent);
    return ConfirmationComponent;
}());
exports.ConfirmationComponent = ConfirmationComponent;
//# sourceMappingURL=confirm.component.js.map