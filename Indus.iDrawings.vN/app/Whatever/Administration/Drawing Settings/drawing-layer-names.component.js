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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var http_1 = require('@angular/http');
var fieldgeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldgeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var drawing_service_1 = require('../../../framework/models/drawings/drawing.service');
var DrawingLayerNamesComponent = (function () {
    function DrawingLayerNamesComponent(administrationService, dwgServices, notificationService, getData) {
        this.administrationService = administrationService;
        this.dwgServices = dwgServices;
        this.notificationService = notificationService;
        this.getData = getData;
        this.btnName = "Save Changes";
        this.success = "";
        this.savedValues = [];
        this.fieldLabel = "";
    }
    DrawingLayerNamesComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.dwgServices.getCustomerSettings().subscribe(function (resultData) {
            for (var i = 0; i < resultData["Data"].length; i++) {
                switch (resultData["Data"][i]["Id"]) {
                    case 31:
                        contextObj.g_IsNetCustomer = resultData["Data"][i]["FeatureLookupId"] == "1" ? false : true;
                        break;
                }
            }
        });
        this.administrationService.getDrawingLayerNames().subscribe(function (resultData) {
            contextObj.fieldDetails = resultData["Data"];
            for (var _i = 0, _a = contextObj.fieldDetails; _i < _a.length; _i++) {
                var value = _a[_i];
                if (value.FieldValue != "" && value.FieldValue != null) {
                    contextObj.savedValues.push(value.FieldValue);
                }
            }
            if (contextObj.g_IsNetCustomer) {
                for (var _b = 0, _c = contextObj.fieldDetails; _b < _c.length; _b++) {
                    var value = _c[_b];
                    if (value.ReportFieldId == 623) {
                        value.IsMandatory = false;
                        value.IsVisible = false;
                    }
                    if (value.ReportFieldId == 624) {
                        value.IsMandatory = false;
                        value.IsVisible = false;
                    }
                }
            }
        });
    };
    DrawingLayerNamesComponent.prototype.onSubmitData = function () {
        var test = this.getData.getFieldValuesAsReportFieldArray(this.fieldDetails);
        var contextObj = this;
        contextObj.fieldLabel = "";
        this.administrationService.postSubmit(test).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"].Message;
                console.log(contextObj.success);
                if (contextObj.success == "Success") {
                    contextObj.notificationService.ShowToaster("iDrawings Layer Names updated", 3);
                }
                else {
                    if (contextObj.savedValues.length > 0) {
                        for (var i = 0; i < contextObj.fieldDetails.length; i++) {
                            for (var j = 0; j < contextObj.savedValues.length; j++) {
                                if (contextObj.fieldDetails[i].FieldValue == contextObj.savedValues[j] && i != j) {
                                    contextObj.fieldLabel = contextObj.fieldDetails[j].FieldLabel;
                                }
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < contextObj.savedValues.length; i++) {
                            for (var j = 0; j < contextObj.savedValues.length; j++) {
                                if (contextObj.savedValues[i] == contextObj.savedValues[j] && i != j) {
                                    contextObj.fieldLabel = contextObj.fieldDetails[j].FieldLabel;
                                }
                            }
                        }
                    }
                    contextObj.notificationService.ShowToaster(contextObj.fieldLabel + " already exists", 5);
                }
            }
        });
    };
    DrawingLayerNamesComponent = __decorate([
        core_1.Component({
            selector: 'drawing-layer-names',
            templateUrl: './app/Views/Administration/Drawing Settings/drawing-layer-names.html',
            directives: [fieldgeneration_component_1.FieldComponent, notify_component_1.Notification],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, drawing_service_1.DrawingService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, drawing_service_1.DrawingService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], DrawingLayerNamesComponent);
    return DrawingLayerNamesComponent;
}());
exports.DrawingLayerNamesComponent = DrawingLayerNamesComponent;
//# sourceMappingURL=drawing-layer-names.component.js.map