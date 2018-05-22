/// <reference path="../../../framework/whatever/search/search.component.ts" />
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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var stringtextbox_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component');
var fileuploadcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/fileuploadcomponent.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var BarCodeComponent = (function () {
    function BarCodeComponent(administrationServices, generFun, workOrderService) {
        this.administrationServices = administrationServices;
        this.generFun = generFun;
        this.workOrderService = workOrderService;
        this.objectId = new core_1.EventEmitter();
        this.fileUploadField = undefined;
        this.textField = undefined;
        this.strFileExtensions = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];
        this.dynamicFields = undefined;
        this.btnName = 'Search';
        this.dataKey = '';
    }
    BarCodeComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        //contextObj.dynamicFields = [contextObj.fileUploadField, contextObj.textField];
    };
    BarCodeComponent.prototype.txtBoxChanges = function (event) {
    };
    BarCodeComponent.prototype.getFileData = function (event) {
    };
    BarCodeComponent.prototype.onSubmit = function (event) {
        var value = this.textField.FieldValue;
        var dbobjectId = 50881;
        var contextObj = this;
        contextObj.workOrderService.getObjectIdforEquipment(dbobjectId, value).subscribe(function (resultData) {
            var objId = JSON.parse(resultData["Data"]);
            contextObj.objectId.emit(objId[0].ObjectId);
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarCodeComponent.prototype, "objectId", void 0);
    BarCodeComponent = __decorate([
        core_1.Component({
            selector: 'barCode',
            templateUrl: './app/Views/WorkOrder/BarCode/barCode.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, stringtextbox_component_1.StringTextBoxComponent, fileuploadcomponent_component_1.FileUploadComponent],
            providers: [General_1.GeneralFunctions, administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService],
            inputs: ['fileUploadField', 'textField'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, General_1.GeneralFunctions, workorder_service_1.WorkOrdereService])
    ], BarCodeComponent);
    return BarCodeComponent;
}());
exports.BarCodeComponent = BarCodeComponent;
//# sourceMappingURL=barcode.component.js.map