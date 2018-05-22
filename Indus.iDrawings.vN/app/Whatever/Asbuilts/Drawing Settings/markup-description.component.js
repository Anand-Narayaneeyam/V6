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
var asbuilt_service_1 = require('../../../Models/Asbuilts/asbuilt.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var MarkupDescriptionComponent = (function () {
    function MarkupDescriptionComponent(asbuiltsService, _notificationService) {
        this.asbuiltsService = asbuiltsService;
        this._notificationService = _notificationService;
        this.btnName = "Add";
        this.submitSuccess = new core_1.EventEmitter();
    }
    MarkupDescriptionComponent.prototype.ngOnInit = function () {
        //if (this.addEdit == "add") {
        this.btnName = "Save";
        //this.asbuiltsService.getmarkupDescription(this.selectedIds, this.addEdit).subscribe(resultData => console.log("fieldDetailsAdd", this.fieldDetailsAdd = resultData["data"]));
        var contextObj = this;
        this.asbuiltsService.getmarkupDescription(this.drawingType).subscribe(function (resultData) {
            console.log('Site list', resultData["Data"]);
            resultData["Data"] = contextObj.setBuildingFieldDetails(resultData["Data"]);
            contextObj.fieldDetailsAdd = resultData["Data"];
            contextObj.dataKey = contextObj.fieldDetailsAdd[1].FieldLabel;
        });
        //}
        //else if (this.addEdit == "edit") {
        //    this.btnName = "EDIT";
        //}
    };
    MarkupDescriptionComponent.prototype.setBuildingFieldDetails = function (jsonobject) {
        //////debugger
        var contextObj = this;
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 555) {
                    jsonobject[i]["IsEnabled"] = true;
                    break;
                }
            }
            return jsonobject;
        }
    };
    MarkupDescriptionComponent.prototype.onSubmitData = function (event) {
        this.submitSuccess.emit(this.fieldDetailsAdd);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MarkupDescriptionComponent.prototype, "drawingType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MarkupDescriptionComponent.prototype, "submitSuccess", void 0);
    MarkupDescriptionComponent = __decorate([
        core_1.Component({
            selector: 'markup-description',
            templateUrl: './app/Views/Asbuilts/Drawing Settings/markup-description.component.html',
            providers: [asbuilt_service_1.AsbuiltService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [asbuilt_service_1.AsbuiltService, notify_service_1.NotificationService])
    ], MarkupDescriptionComponent);
    return MarkupDescriptionComponent;
}());
exports.MarkupDescriptionComponent = MarkupDescriptionComponent;
//# sourceMappingURL=markup-description.component.js.map