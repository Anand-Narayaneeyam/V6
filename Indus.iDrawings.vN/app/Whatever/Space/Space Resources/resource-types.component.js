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
var space_service_1 = require('../../../Models/Space/space.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var http_1 = require('@angular/http');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var ResouceTypesComponent = (function () {
    function ResouceTypesComponent(spaceService, notificationService, confirmationService) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.gridcount = 8;
        this.enableMenu = [0, 2];
        this.selIds = new Array();
        this.totalItems = 30;
        this.itemsPerPage = 10;
    }
    ResouceTypesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spaceService.getResourceTypes().subscribe(function (list) { return _this.sourceData = list["data"]; }, function (error) { return _this.errorMessage = error; });
        this.spaceService.getResourceTypesFields().subscribe(function (fields) { return _this.fields = fields["data"]; }, function (error) { return _this.errorMessage = error; });
    };
    ResouceTypesComponent.prototype.onCardSubmit = function (event) {
        console.log("selectedids", this.selIds);
        if (event["dataKeyValue"]) {
            //this.spaceService.postSubmit(this.fieldDetails).subscribe(fieldDetails => this.fieldDetails = fieldDetails["data"],
            //    error => this.errorMessage = <any>error);
            this.notificationService.ShowToaster("Resource Type updated", 3);
        }
        else {
            //this.spaceService.postSubmit(this.fieldDetails).subscribe(fieldDetails => this.fieldDetails = fieldDetails["data"],
            //    error => this.errorMessage = <any>error);
            this.notificationService.ShowToaster("Resource Type added", 3);
        }
    };
    ResouceTypesComponent.prototype.onSubMenuChange = function (event) {
        if (event.value == 0) {
            this.addClick();
        }
        else if (event.value == 2) {
            this.deleteClick(this.selIds);
        }
    };
    ResouceTypesComponent.prototype.onSorting = function (event) {
        console.log("sort action");
    };
    ResouceTypesComponent.prototype.pageChanged = function (event) {
        var _this = this;
        this.spaceService.getResourceTypes().subscribe(function (list) { return _this.sourceData = list["data"]; }, function (error) { return _this.errorMessage = error; });
    };
    ;
    ResouceTypesComponent.prototype.addClick = function () {
        var newDataSource;
        newDataSource = {
            "Resource Type": "",
            "Resource Category": ""
        };
        this.sourceData.push(newDataSource);
    };
    ResouceTypesComponent.prototype.deleteClick = function (id) {
        console.log("ID", id);
        if (id.length > 0) {
            this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Resource Type?", "Yes");
        }
        else {
            this.notificationService.ShowToaster("Select a Resource Type", 2);
        }
    };
    ResouceTypesComponent.prototype.okDelete = function (event) {
        var _this = this;
        if (event.returnOk == true) {
            for (var j = 0; j < this.selIds.length; j++) {
                var index = this.sourceData.indexOf(this.sourceData.filter(function (x) { return x["Id"] == _this.selIds[j]; })[0]);
                if (index > -1)
                    this.sourceData.splice(index, 1);
            }
            this.spaceService.postResourceTypesyDelete(this.selIds);
            this.notificationService.ShowToaster("Selected Resource Type deleted", 3);
        }
    };
    ResouceTypesComponent.prototype.onDelete = function (e) {
        this.deleteClick(this.selIds);
    };
    ResouceTypesComponent = __decorate([
        core_1.Component({
            selector: 'resource-types',
            templateUrl: './app/Views/Space/Space Resources/resource-types.component.html',
            directives: [submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, confirm_component_1.ConfirmationComponent],
            providers: [http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService])
    ], ResouceTypesComponent);
    return ResouceTypesComponent;
}());
exports.ResouceTypesComponent = ResouceTypesComponent;
//# sourceMappingURL=resource-types.component.js.map