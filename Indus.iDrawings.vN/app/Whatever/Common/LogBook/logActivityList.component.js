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
var LogActivityListComponent = (function () {
    function LogActivityListComponent(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true };
        this.activityIds = new Array();
        this.sendActivityOutput = new core_1.EventEmitter();
    }
    LogActivityListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.administrationService.getLogActivityListColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            if (contextObj.logActivity != undefined) {
                contextObj.itemsSourceLogActivity = contextObj.logActivity;
            }
        });
    };
    LogActivityListComponent.prototype.getActivitySelection = function (event) {
        var contextObj = this;
        var count = 0;
        var strSelectedentityIds = "";
        var arrayList = new Array();
        for (var i = 0; i < contextObj.itemsSourceLogActivity.length; i++) {
            if (contextObj.itemsSourceLogActivity[i]["Select All"]) {
                if (contextObj.itemsSourceLogActivity[i]["Select All"] == true) {
                    count = count + 1;
                    if (count == 1) {
                        strSelectedentityIds = contextObj.itemsSourceLogActivity[i].Id.toString();
                    }
                    else {
                        strSelectedentityIds = strSelectedentityIds + "," + contextObj.itemsSourceLogActivity[i].Id.toString();
                    }
                }
            }
        }
        if (strSelectedentityIds != "") {
            arrayList.push({
                ReportFieldId: 1713,
                Value: strSelectedentityIds
            });
            contextObj.sendActivityOutput.emit({
                logParamList: contextObj.RptFields,
                logUserList: contextObj.getlogUser,
                logEntityList: contextObj.getLogEntity,
                logActivityList: arrayList
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Select Activity from List", 2);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LogActivityListComponent.prototype, "getlogUser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LogActivityListComponent.prototype, "getLogEntity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LogActivityListComponent.prototype, "RptFields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LogActivityListComponent.prototype, "logActivity", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LogActivityListComponent.prototype, "sendActivityOutput", void 0);
    LogActivityListComponent = __decorate([
        core_1.Component({
            selector: 'log-activity-list',
            templateUrl: 'app/Views/Common/LogBook/logActivityList.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, page_component_1.PageComponent, grid_component_1.GridComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'action', 'fieldDetails', 'btnName']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], LogActivityListComponent);
    return LogActivityListComponent;
}());
exports.LogActivityListComponent = LogActivityListComponent;
//# sourceMappingURL=logActivityList.component.js.map