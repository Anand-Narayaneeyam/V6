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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var PlotStyleAddComponent = (function () {
    function PlotStyleAddComponent(administrationService, _notificationService, generFun) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    PlotStyleAddComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    };
    PlotStyleAddComponent.prototype.postSubmit = function (contextObj, strsubmitField, target) {
        var temp = JSON.parse(strsubmitField);
        var colorData = temp.find(function (item) { return item.ReportFieldId === 4434; });
        if (colorData) {
            if (colorData.Value == "" || colorData.Value == null) {
                contextObj._notificationService.ShowToaster("Select a Color", 3);
            }
            else {
                contextObj.administrationService.AddUpdatePlotStyle(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            if (target == 1) {
                                contextObj._notificationService.ShowToaster("Plot Style added", 3);
                            }
                            else {
                                contextObj._notificationService.ShowToaster("Plot Style details updated", 3);
                            }
                            contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj._notificationService.ShowToaster("Style Name already exists", 5);
                            }
                            break;
                    }
                });
            }
        }
    };
    PlotStyleAddComponent.prototype.objLineWtChange = function (event) {
        this.findData(event.chkBoxObject.IsChecked);
    };
    PlotStyleAddComponent.prototype.findData = function (objlinChecked) {
        //lineweight = 4442
        this.fieldDetailsAdd.find(function (item) {
            if (item.ReportFieldId == 4442) {
                if (objlinChecked) {
                    item.IsEnabled = false;
                    item.FieldValue = "0";
                }
                else {
                    item.IsEnabled = true;
                }
            }
            return item.ReportFieldId === 4442;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PlotStyleAddComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PlotStyleAddComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlotStyleAddComponent.prototype, "submitSuccess", void 0);
    PlotStyleAddComponent = __decorate([
        core_1.Component({
            selector: 'plotstyle-add-edit',
            templateUrl: 'app/Views/Administration/Drawing Settings/plotstyleadd.component.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
            styleUrls: ['app/Views/Administration/Drawing Settings/plotstyleadd.component.css']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], PlotStyleAddComponent);
    return PlotStyleAddComponent;
}());
exports.PlotStyleAddComponent = PlotStyleAddComponent;
//# sourceMappingURL=plotstyleadd.component.js.map