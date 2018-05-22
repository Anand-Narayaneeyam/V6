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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var ContractorsUsersComponent = (function () {
    function ContractorsUsersComponent(administrationService, notificationService) {
        var _this = this;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true };
        administrationService.getContractorsUsersFields().subscribe(function (result) { return _this.fieldObject = result["data"]; }, function (error) { return _this.errorMessage = error; });
        administrationService.gettContractorsUsersData().subscribe(function (fieldDetails) { return _this.itemsSource = fieldDetails["data"]; }, function (error) { return _this.errorMessage = error; });
    }
    ContractorsUsersComponent.prototype.updateContractorsUsers = function () {
        this.administrationService.updatetContractorsUsers(this.itemsSource);
        this.notificationService.ShowToaster("Contractor(s) added to the selected User Group", 3);
    };
    ContractorsUsersComponent = __decorate([
        core_1.Component({
            selector: 'contractors-users',
            templateUrl: './app/Views/Administration/User Groups/contractors-users.component.html',
            directives: [notify_component_1.Notification, grid_component_1.GridComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ["selectedIds"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], ContractorsUsersComponent);
    return ContractorsUsersComponent;
}());
exports.ContractorsUsersComponent = ContractorsUsersComponent;
//# sourceMappingURL=contractors-users.component.js.map