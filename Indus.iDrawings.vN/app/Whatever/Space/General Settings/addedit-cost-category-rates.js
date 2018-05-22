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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var space_service_1 = require('../../../Models/Space/space.service');
var AddEditCostCategoryRatesComponent = (function () {
    function AddEditCostCategoryRatesComponent(SpaceService, _notificationService, generalFunctions) {
        this.SpaceService = SpaceService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    AddEditCostCategoryRatesComponent.prototype.ngOnInit = function () {
    };
    AddEditCostCategoryRatesComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    AddEditCostCategoryRatesComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var reportFieldArray = new Array();
        if (strsubmitField != "") {
            reportFieldArray = JSON.parse(strsubmitField);
            for (var i = 0; i < reportFieldArray.length; i++) {
                if (reportFieldArray[i].ReportFieldId == 742) {
                    reportFieldArray[i].Value = this.ddlSelectedId;
                }
            }
            contextObj.SpaceService.AddEditCostCategoryRts(JSON.stringify(reportFieldArray), this.selectedId, target).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Cost Category Rate added", 3);
                            contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        }
                        else if (target == 2) {
                            contextObj._notificationService.ShowToaster("Cost Category Rate updated", 3);
                            contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        }
                        break;
                    case 3:
                        contextObj._notificationService.ShowToaster("Cost Category Rate Code already exists", 5);
                        break;
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddEditCostCategoryRatesComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddEditCostCategoryRatesComponent.prototype, "ddlSelectedId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AddEditCostCategoryRatesComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddEditCostCategoryRatesComponent.prototype, "submitSuccess", void 0);
    AddEditCostCategoryRatesComponent = __decorate([
        core_1.Component({
            selector: 'add-edit-cost-category-rates',
            templateUrl: './app/Views/Space/General Settings/addedit-cost-category-rates.html',
            providers: [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], AddEditCostCategoryRatesComponent);
    return AddEditCostCategoryRatesComponent;
}());
exports.AddEditCostCategoryRatesComponent = AddEditCostCategoryRatesComponent;
//# sourceMappingURL=addedit-cost-category-rates.js.map