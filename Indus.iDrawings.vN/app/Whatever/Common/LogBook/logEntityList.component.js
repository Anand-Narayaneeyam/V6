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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var General_1 = require('../../../Models/Common/General');
var LogEntityListComponent = (function () {
    function LogEntityListComponent(administrationService, _notificationService, generFun) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true };
        this.entityIds = new Array();
        this.sendEntityOutput = new core_1.EventEmitter();
    }
    LogEntityListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.administrationService.getLogEntityListColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            if (contextObj.logEntities != undefined) {
                contextObj.itemsSourceLogEntities = contextObj.logEntities;
            }
        });
    };
    LogEntityListComponent.prototype.getEntitySelection = function (event) {
        var contextObj = this;
        var count = 0;
        var strSelectedentityIds = "";
        var arrayList = new Array();
        for (var i = 0; i < contextObj.itemsSourceLogEntities.length; i++) {
            if (contextObj.itemsSourceLogEntities[i]["Select All"]) {
                if (contextObj.itemsSourceLogEntities[i]["Select All"] == true) {
                    count = count + 1;
                    if (count == 1) {
                        strSelectedentityIds = contextObj.itemsSourceLogEntities[i].Id.toString();
                    }
                    else {
                        strSelectedentityIds = strSelectedentityIds + "," + contextObj.itemsSourceLogEntities[i].Id.toString();
                    }
                }
            }
        }
        if (strSelectedentityIds != "") {
            arrayList.push({
                ReportFieldId: 1707,
                Value: strSelectedentityIds
            });
            this.administrationService.postLogentitiesListFieldInsert(JSON.stringify(arrayList), contextObj.RptFields, contextObj.getlogUser).subscribe(function (resultData) {
                if (resultData["Data"].DataCount > 0) {
                    contextObj.sendEntityOutput.emit({
                        logParameterData: contextObj.RptFields,
                        logUserData: contextObj.getlogUser,
                        logEntities: JSON.stringify(arrayList),
                        logActivityInput: JSON.parse(resultData["Data"].FieldBinderData)
                    });
                    contextObj._notificationService.ShowToaster("Select Activities", 2);
                }
                else {
                    contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                }
            });
        }
        else {
            contextObj._notificationService.ShowToaster("Select Entity from List", 2);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LogEntityListComponent.prototype, "getlogUser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LogEntityListComponent.prototype, "logEntities", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LogEntityListComponent.prototype, "RptFields", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LogEntityListComponent.prototype, "sendEntityOutput", void 0);
    LogEntityListComponent = __decorate([
        core_1.Component({
            selector: 'log-entity-list',
            templateUrl: 'app/Views/Common/LogBook/logEntityList.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, page_component_1.PageComponent, grid_component_1.GridComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'action', 'fieldDetails', 'btnName']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], LogEntityListComponent);
    return LogEntityListComponent;
}());
exports.LogEntityListComponent = LogEntityListComponent;
//# sourceMappingURL=logEntityList.component.js.map