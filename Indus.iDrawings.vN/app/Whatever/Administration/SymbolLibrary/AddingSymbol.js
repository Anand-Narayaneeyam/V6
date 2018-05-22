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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var AddingSymbolLibrary = (function () {
    function AddingSymbolLibrary(notificationService, _notificationService, generalFunctions, administrationService) {
        this.notificationService = notificationService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.administrationService = administrationService;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.closeSecondaryView = new core_1.EventEmitter();
    }
    AddingSymbolLibrary.prototype.ngOnInit = function () {
        var contextObj = this;
    };
    AddingSymbolLibrary.prototype.onSubmitData = function (event) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = false;
        var AddSymbolfields = JSON.parse(event["fieldobject"]);
        var symbolName = AddSymbolfields.find(function (item) { return item.ReportFieldId === 678; }).Value;
        var symbolCategory = AddSymbolfields.find(function (item) { return item.ReportFieldId === 679; }).Value;
        var reportfieldIdArray = [];
        reportfieldIdArray.push({
            ReportFieldId: 678,
            Value: symbolName,
        });
        reportfieldIdArray.push({
            ReportFieldId: 679,
            Value: symbolCategory,
        });
        reportfieldIdArray.push({
            ReportFieldId: 681,
            Value: contextObj.EntityText,
        });
        reportfieldIdArray.push({
            ReportFieldId: 682,
            Value: contextObj.TextSize,
        });
        reportfieldIdArray.push({
            ReportFieldId: 680,
            Value: contextObj.Coordinates,
        });
        contextObj.administrationService.AddingSymbol(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
            if (resultData.Data.ServerId > 0) {
                contextObj.closeSecondaryView.emit({ returnData: resultData.Data.ServerId });
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddingSymbolLibrary.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AddingSymbolLibrary.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddingSymbolLibrary.prototype, "Coordinates", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddingSymbolLibrary.prototype, "EntityText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddingSymbolLibrary.prototype, "TextSize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddingSymbolLibrary.prototype, "closeSecondaryView", void 0);
    AddingSymbolLibrary = __decorate([
        core_1.Component({
            selector: 'Adding_Symbol',
            templateUrl: './app/Views/Administration/SymbolLibrary/AddingSymbol.html',
            directives: [notify_component_1.Notification, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, administration_service_1.AdministrationService, notify_service_1.NotificationService],
            inputs: ['fieldDetailsAdd', 'action', 'btnName', 'Coordinates', 'TextSize', 'EntityText'],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], AddingSymbolLibrary);
    return AddingSymbolLibrary;
}());
exports.AddingSymbolLibrary = AddingSymbolLibrary;
//# sourceMappingURL=AddingSymbol.js.map