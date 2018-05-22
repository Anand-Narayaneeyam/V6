var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../models/common/drawingdetails.service.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var drawingdetails_service_1 = require('../../../Models/Common/drawingdetails.service');
var UserDrawingsAccessComponent = (function () {
    function UserDrawingsAccessComponent(administrationService, notificationService, DrawingDetailsService) {
        var _this = this;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.DrawingDetailsService = DrawingDetailsService;
        this.moduleId = 0;
        this.inputItems = { dataKey: "Id", groupBy: ["Site", "Building"], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true };
        this.totalItems = 0;
        this.itemsPerPage = 10;
        administrationService.getUserDrawingAccessModules().subscribe(function (fieldDetails) { return _this.accessDrawingModulesList = fieldDetails["data"]; }, function (error) { return _this.errorMessage = error; });
        DrawingDetailsService.getDrawingFloorAccessFieldsList().subscribe(function (result) { return _this.fieldObject = result["data"]; }, function (error) { return _this.errorMessage = error; });
        DrawingDetailsService.getDrawingFloorAccessList().subscribe(function (fieldDetails) { return _this.itemsSource = fieldDetails["data"]; }, function (error) { return _this.errorMessage = error; });
        DrawingDetailsService.getDrawingFloorAccessList().subscribe(function (result) { return _this.totalItems = result["count"].TotalItems; }, function (error) { return _this.errorMessage = error; });
    }
    UserDrawingsAccessComponent.prototype.onPageChanged = function (event) {
        var _this = this;
        this.DrawingDetailsService.getDrawingFloorAccessList().subscribe(function (result) { return _this.itemsSource = result["data"]; }, function (error) { return _this.errorMessage = error; });
        console.log(event.pageEvent.page, "page");
    };
    UserDrawingsAccessComponent.prototype.updateDrawingsAccessData = function () {
        this.DrawingDetailsService.updateDrawingAccess(this.itemsSource);
        console.log("this.itemsSource", this.itemsSource);
        this.notificationService.ShowToaster("Module wise Drawing Access Control updated", 3);
    };
    UserDrawingsAccessComponent = __decorate([
        core_1.Component({
            selector: 'user-drawings-access',
            templateUrl: './app/Views/Common/DrawingDetails/userdrawingsaccess.component.html',
            directives: [notify_component_1.Notification, listboxcomponent_component_1.ListBoxComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, drawingdetails_service_1.DrawingDetailsService],
            inputs: ["selectedIds", "moduleId"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, drawingdetails_service_1.DrawingDetailsService])
    ], UserDrawingsAccessComponent);
    return UserDrawingsAccessComponent;
}());
exports.UserDrawingsAccessComponent = UserDrawingsAccessComponent;
//# sourceMappingURL=userdrawingsaccess.component.js.map