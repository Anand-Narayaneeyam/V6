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
var BuildingAddArchiveComponent = (function () {
    function BuildingAddArchiveComponent(commonReportService, _notificationService, generalFunctions) {
        this.commonReportService = commonReportService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.nameFieldwithMap = "";
        this.nameFieldwithoutMap = "";
    }
    BuildingAddArchiveComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.btnName = "Save";
        contextObj.commonReportService.getArchiveFields().subscribe(function (resultData) {
            contextObj.commonReportService.getArchiveName("3").subscribe(function (result) {
                resultData["Data"].find(function (item) {
                    if (item.ReportFieldId == 1618) {
                        item.FieldValue = result;
                    }
                });
                contextObj.fieldDetailsAdd = resultData["Data"];
            });
        });
    };
    BuildingAddArchiveComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        contextObj.commonReportService.insertBuildingArchive(event.fieldobject).subscribe(function (resultData) {
            if (resultData.Data.Message == "Success") {
                contextObj._notificationService.ShowToaster("Building Status Report archived", 3);
                contextObj.submitSuccess.emit({ returnData: resultData });
            }
            else if (resultData.Data.Message == "Already Exists")
                contextObj._notificationService.ShowToaster("Archive Name already exists", 5);
            else if (resultData.Data.Message == "Failure")
                contextObj._notificationService.ShowToaster("Building Status report archive failed", 5);
            else
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingAddArchiveComponent.prototype, "submitSuccess", void 0);
    BuildingAddArchiveComponent = __decorate([
        core_1.Component({
            selector: 'building-archive-add',
            templateUrl: './app/Views/Reports/CAI/BuildingStatus/add-archive.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: [],
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], BuildingAddArchiveComponent);
    return BuildingAddArchiveComponent;
}());
exports.BuildingAddArchiveComponent = BuildingAddArchiveComponent;
//# sourceMappingURL=add-archive.js.map