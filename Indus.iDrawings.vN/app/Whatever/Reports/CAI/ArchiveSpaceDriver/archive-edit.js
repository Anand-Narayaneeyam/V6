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
var common_service_1 = require('../../../../Models/reports/common.service');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../../Models/Common/General');
var SpaceArchiveEditComponent = (function () {
    function SpaceArchiveEditComponent(commonReportService, _notificationService, generalFunctions) {
        this.commonReportService = commonReportService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    SpaceArchiveEditComponent.prototype.ngOnInit = function () {
    };
    SpaceArchiveEditComponent.prototype.onSubmitData = function (event) {
        this.postSubmit(event["fieldobject"]);
    };
    SpaceArchiveEditComponent.prototype.postSubmit = function (strsubmitField) {
        var contextObj = this;
        contextObj.commonReportService.UpdateSpaceArchive(strsubmitField, this.selectedId, 2, Number(this.selectedId), this.fromDate, this.toDate).subscribe(function (resultData) {
            debugger;
            switch (resultData.StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj._notificationService.ShowToaster("Archived CAI Space Driver updated", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"] });
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SpaceArchiveEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SpaceArchiveEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceArchiveEditComponent.prototype, "submitSuccess", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceArchiveEditComponent.prototype, "fromDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceArchiveEditComponent.prototype, "toDate", void 0);
    SpaceArchiveEditComponent = __decorate([
        core_1.Component({
            selector: 'spaceArchive-add-edit',
            templateUrl: './app/Views/Reports/CAI/ArchiveSpaceDriver/archive-edit.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'fieldDetailsAdd', 'btnName', 'fromDate', 'toDate'],
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SpaceArchiveEditComponent);
    return SpaceArchiveEditComponent;
}());
exports.SpaceArchiveEditComponent = SpaceArchiveEditComponent;
//# sourceMappingURL=archive-edit.js.map