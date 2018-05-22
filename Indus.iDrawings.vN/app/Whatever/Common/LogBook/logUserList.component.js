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
var LogUserListComponent = (function () {
    function LogUserListComponent(administrationService, _notificationService, generFun) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[User Name]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true };
        this.sendUserOutput = new core_1.EventEmitter();
    }
    LogUserListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.administrationService.getLogUserListColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            if (contextObj.logUser != undefined) {
                contextObj.itemsSource = contextObj.logUser;
            }
        });
    };
    LogUserListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.administrationService.postLogBookParameterFieldInsert(contextObj.RptFields, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            if (JSON.parse(resultData["Data"].FieldBinderData).length > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            }
        });
    };
    LogUserListComponent.prototype.getUserSelection = function (event) {
        var contextObj = this;
        var strSelectedUserIds = "";
        var count = 0;
        var rptFieldArray = new Array();
        if (contextObj.itemsSource.length > 0) {
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"]) {
                    if (contextObj.itemsSource[i]["Select All"] == true) {
                        count = count + 1;
                        if (count == 1) {
                            strSelectedUserIds = contextObj.itemsSource[i].UserId.toString();
                        }
                        else {
                            strSelectedUserIds = strSelectedUserIds + "," + contextObj.itemsSource[i].UserId.toString();
                        }
                    }
                }
            }
        }
        if (strSelectedUserIds != "") {
            rptFieldArray.push({
                ReportFieldId: 443,
                Value: strSelectedUserIds
            });
            this.administrationService.postLogUserListFieldInsert(JSON.stringify(rptFieldArray), contextObj.RptFields).subscribe(function (resultData) {
                if (resultData["Data"].DataCount > 0) {
                    contextObj.sendUserOutput.emit({
                        logParameterData: contextObj.RptFields,
                        logUserData: JSON.stringify(rptFieldArray),
                        logEntitiesInput: JSON.parse(resultData["Data"].FieldBinderData)
                    });
                    contextObj._notificationService.ShowToaster("Select Entities", 2);
                }
                else {
                    contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                }
            });
        }
        else {
            contextObj._notificationService.ShowToaster("Select Users from List", 2);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LogUserListComponent.prototype, "logUser", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LogUserListComponent.prototype, "RptFields", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LogUserListComponent.prototype, "sendUserOutput", void 0);
    LogUserListComponent = __decorate([
        core_1.Component({
            selector: 'log-user-list',
            templateUrl: 'app/Views/Common/LogBook/logUserList.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, page_component_1.PageComponent, grid_component_1.GridComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'action', 'fieldDetails', 'btnName']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], LogUserListComponent);
    return LogUserListComponent;
}());
exports.LogUserListComponent = LogUserListComponent;
//# sourceMappingURL=logUserList.component.js.map