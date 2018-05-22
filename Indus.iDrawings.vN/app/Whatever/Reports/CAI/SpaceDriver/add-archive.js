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
var AddArchiveComponent = (function () {
    function AddArchiveComponent(commonReportService, _notificationService, generalFunctions) {
        this.commonReportService = commonReportService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.nameFieldwithMap = "";
        this.nameFieldwithoutMap = "";
    }
    AddArchiveComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.btnName = "Save";
        contextObj.commonReportService.ddlArchiveReportType().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 12096) {
                    item.FieldValue = "88";
                    item.FieldLabel = null;
                }
            });
            //contextObj.fieldDetailsAdd = resultData["Data"];
            //contextObj.fieldDetailsAdd[0].LookupDetails.LookupValues.sort(function (a, b) {
            //    return a.Id - b.Id;
            //});
            contextObj.commonReportService.getArchiveName("1").subscribe(function (result) {
                resultData["Data"].find(function (item) {
                    if (item.ReportFieldId == 1611) {
                        item.FieldValue = result;
                    }
                });
                contextObj.fieldDetailsAdd = resultData["Data"];
                contextObj.fieldDetailsAdd[0].LookupDetails.LookupValues.sort(function (a, b) {
                    return a.Id - b.Id;
                });
                contextObj.nameFieldwithMap = result;
            });
            contextObj.commonReportService.getArchiveName("2").subscribe(function (result) {
                contextObj.nameFieldwithoutMap = result;
            });
        });
    };
    AddArchiveComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var arrayList = new Array();
        var tempIds = this.selectedId.split(",");
        arrayList = JSON.parse(event.fieldobject);
        arrayList.find(function (item) {
            if (item.ReportFieldId == 12096) {
                item.ReportFieldId = 1612;
                if (item.Value == "88")
                    item.Value = "1";
                else if (item.Value == "89")
                    item.Value = "0";
                return true;
            }
        });
        for (var i = 0; i < tempIds.length; i++) {
            arrayList.push({
                ReportFieldId: 781,
                Value: tempIds[i]
            });
        }
        contextObj.commonReportService.insertArchive(JSON.stringify(arrayList), tempIds).subscribe(function (resultData) {
            switch (resultData) {
                case 0:
                    //contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    contextObj._notificationService.ShowToaster("Archive Name already exists", 5);
                    break;
                case 1:
                    contextObj._notificationService.ShowToaster("CAI Space Driver Report archived", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData });
                    break;
                case -1:
                    // contextObj._notificationService.ShowToaster("Archive Name already exists", 5);
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                default:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
            }
        });
    };
    AddArchiveComponent.prototype.rbnChange = function (event) {
        var contextObj = this;
        if (event.rbtnObject.fieldobject.FieldValue == "88") {
            this.fieldDetailsAdd.find(function (item) {
                if (item.ReportFieldId == 1611) {
                    item.FieldValue = contextObj.nameFieldwithMap;
                    return true;
                }
            });
        }
        else if (event.rbtnObject.fieldobject.FieldValue == "89") {
            this.fieldDetailsAdd.find(function (item) {
                if (item.ReportFieldId == 1611) {
                    item.FieldValue = contextObj.nameFieldwithoutMap;
                    return true;
                }
            });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddArchiveComponent.prototype, "submitSuccess", void 0);
    AddArchiveComponent = __decorate([
        core_1.Component({
            selector: 'archive-add',
            templateUrl: './app/Views/Reports/CAI/SpaceDriver/add-archive.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId'],
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], AddArchiveComponent);
    return AddArchiveComponent;
}());
exports.AddArchiveComponent = AddArchiveComponent;
//# sourceMappingURL=add-archive.js.map