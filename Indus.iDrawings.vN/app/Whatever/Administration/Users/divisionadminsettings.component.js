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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var DivisionAdminSettingsComponent = (function () {
    function DivisionAdminSettingsComponent(administrationService, notificationService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
    }
    DivisionAdminSettingsComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.administrationService.getDivisionAdminSettingsFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            if (contextObj.fieldObject.length > 1)
                contextObj.dataLoad(1, contextObj);
            else
                contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
        });
    };
    DivisionAdminSettingsComponent.prototype.onPageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    ;
    DivisionAdminSettingsComponent.prototype.onSort = function (objGrid) {
        this.dataLoad();
    };
    DivisionAdminSettingsComponent.prototype.dataLoad = function (target, context) {
        this.administrationService.getOrganizationNamesForMenu().subscribe(function (resultData) {
            if (resultData["Data"].FieldBinderData == "[]") {
                context.notificationService.ShowToaster("No Organizational Units exist", 2);
            }
            else {
                context.administrationService.getDivisionAdminSettings(context.selectedIds[0], context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {
                    context.totalItems = result.DataCount;
                    if (context.totalItems > 0) {
                        context.itemsSource = JSON.parse(result.FieldBinderData);
                        if (target == 1) {
                            context.itemsPerPage = result.RowsPerPage;
                        }
                    }
                    else {
                        var orgName = context.fieldObject.find(function (el) { return el.FieldId == 341; })['FieldLabel'];
                        context.notificationService.ShowToaster(orgName + " access is not to the selected User", 2);
                    }
                });
            }
        });
    };
    //updateDivisionAdminSettings() {
    //    var contextObj = this;
    //    let listObj = new Array();     
    //    for (let i = 0; i < contextObj.itemsSource.length - 1; i++) {
    //        if (contextObj.itemsSource[i]["View"]==true) {
    //            let edit = contextObj.itemsSource[i]["Edit"] == 'TRUE' ? 1 : 0;
    //            listObj.push({
    //                ModuleId: contextObj.itemsSource[i]["Id"],
    //                IsEdit: edit
    //            })
    //        }
    //    }
    //    this.administrationService.updateDivisionAdminSettings(contextObj.selectedIds, JSON.stringify(listObj)).subscribe(function (resultData) {
    //        if (resultData["Data"].StatusId == 1) {
    //            contextObj.notificationService.ShowToaster("Access privilege for selected user updated", 3);
    //        } else
    //            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
    //    });       
    //}
    DivisionAdminSettingsComponent.prototype.updateDivisionAdminSettings = function () {
        var contextObj = this;
        var updatedRptFldValues = '';
        for (var _i = 0, _a = this.itemsSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item['Edit'] == true) {
                updatedRptFldValues += "{\"ReportFieldId\":301,\"Value\":\"" + item['Id'] + "\"},";
            }
        }
        updatedRptFldValues = updatedRptFldValues.substring(0, updatedRptFldValues.length - 1);
        this.administrationService.updateDivisionAdminSettings(updatedRptFldValues, this.selectedIds[0]).subscribe(function (resultData) {
            if (resultData.ServerId == 1) {
                contextObj.notificationService.ShowToaster("Division Administrator Settings updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
        ;
    };
    DivisionAdminSettingsComponent.prototype.onCellEdit = function (event) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DivisionAdminSettingsComponent.prototype, "selectedIds", void 0);
    DivisionAdminSettingsComponent = __decorate([
        core_1.Component({
            selector: 'division-admin-settings',
            templateUrl: './app/Views/Administration/Users/divisionadminsettings.component.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ["selectedIds"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], DivisionAdminSettingsComponent);
    return DivisionAdminSettingsComponent;
}());
exports.DivisionAdminSettingsComponent = DivisionAdminSettingsComponent;
//# sourceMappingURL=divisionadminsettings.component.js.map