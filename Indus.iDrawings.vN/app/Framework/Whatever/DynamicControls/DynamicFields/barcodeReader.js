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
var validate_directive_1 = require('../../Validation/validate.directive');
var notify_service_1 = require('../../../Models/Notification/notify.service');
var administration_service_1 = require('../../../../models/administration/administration.service');
var General_1 = require('../../../../Models/Common/General');
//import { ImageUploadComponent } from './imageuploadcomponent.component';
var fileuploadcomponent_component_1 = require('./fileuploadcomponent.component');
var BarcodeReaderComponent = (function () {
    function BarcodeReaderComponent(notificationService, administrationService, getData) {
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.getData = getData;
        this.barcodeData = new core_1.EventEmitter();
        this.validFileExt = [".jpg", ".jpeg"];
    }
    BarcodeReaderComponent.prototype.ngOnInit = function () {
    };
    BarcodeReaderComponent.prototype.getImageData = function (event) {
        var context = this;
        context.administrationService.getBarCodeData(JSON.stringify(event)).subscribe(function (result) {
            context.barcodeResult = result.Data;
            if (context.barcodeResult != null && context.barcodeResult != '') {
                context.barcodeData.emit({
                    barcode: context.barcodeResult
                });
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarcodeReaderComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarcodeReaderComponent.prototype, "barcodeData", void 0);
    BarcodeReaderComponent = __decorate([
        core_1.Component({
            selector: 'barcodeReader',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/barcodeReader.html',
            inputs: ['fieldObject'],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            directives: [validate_directive_1.Validation, fileuploadcomponent_component_1.FileUploadComponent],
            providers: [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions])
    ], BarcodeReaderComponent);
    return BarcodeReaderComponent;
}());
exports.BarcodeReaderComponent = BarcodeReaderComponent;
//# sourceMappingURL=barcodeReader.js.map