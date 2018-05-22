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
var space_service_1 = require('../../../Models/Space/space.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var Space_ResourcesComponent = (function () {
    function Space_ResourcesComponent(spaceService, notificationService, confirmationService) {
        var _this = this;
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.totalItems = 0;
        this.itemsPerPage = 10;
        this.inputItems = { dataKey: "ResourceId", groupBy: [], grpWithCheckBx: false, selectedIds: [] };
        this.menuData = [
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.gridcount = 10;
        this.enableMenu = [2];
        spaceService.getDdlResourceType().subscribe(function (result) { return _this.ddlResourceType = result["data"]; }, function (error) { return _this.errorMessage = error; });
        spaceService.getSpaceResourcesFieldList().subscribe(function (result) { return _this.fieldObject = result["data"]; }, function (error) { return _this.errorMessage = error; });
        spaceService.getSpaceResourcesList().subscribe(function (result) { return _this.itemsSource = result["data"]; }, function (error) { return _this.errorMessage = error; });
        spaceService.getSpaceResourcesList().subscribe(function (result) { return _this.totalItems = result["count"][0].TotalItems; }, function (error) { return _this.errorMessage = error; });
    }
    Space_ResourcesComponent.prototype.ngOnInit = function () {
        this.alignContent = "horizontal";
    };
    Space_ResourcesComponent.prototype.pageChanged = function (event) {
        var _this = this;
        this.spaceService.getSpaceResourcesList().subscribe(function (result) { return _this.itemsSource = result["data"]; }, function (error) { return _this.errorMessage = error; });
    };
    Space_ResourcesComponent.prototype.onSort = function (objGrid) {
        var _this = this;
        console.log("onSort", this.inputItems);
        this.spaceService.getSpaceResourcesList().subscribe(function (result) { return _this.itemsSource = result["data"]; }, function (error) { return _this.errorMessage = error; });
    };
    Space_ResourcesComponent.prototype.onAdd = function (event) {
        this.spaceService.addSpaceResources(event);
        this.notificationService.ShowToaster("Space Resource added", 3);
    };
    Space_ResourcesComponent.prototype.onEdit = function (event) {
        console.log("edit:", event);
        if (this.inputItems.selectedIds.length > 0) {
            this.spaceService.updateSpaceResources(this.inputItems.selectedIds);
            this.notificationService.ShowToaster("Space Resource updated", 3);
        }
    };
    Space_ResourcesComponent.prototype.onDelete = function (event) {
        this.deleteOnClick();
    };
    Space_ResourcesComponent.prototype.deleteOnClick = function () {
        if (this.inputItems.selectedIds.length > 0) {
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Resource?", "Yes");
            for (var i = 0; i < this.itemsSource.length; i++) {
                for (var j = 0; j < this.inputItems.selectedIds.length; j++) {
                    if (this.itemsSource[i]["ResourceId"] == this.inputItems.selectedIds[j]) {
                        var index = (this.itemsSource.indexOf(this.itemsSource[i]));
                        if (index > -1) {
                            this.itemsSource.splice(index, 1);
                            var sortedData = new Array(); /*To notify the watcher about the change*/
                            sortedData = sortedData.concat(this.itemsSource);
                            this.itemsSource = sortedData;
                        }
                    }
                }
            }
            this.spaceService.deleteSpaceResources(this.inputItems.selectedIds);
            this.notificationService.ShowToaster("Selected Employee Resource deleted", 3);
        }
        else {
            this.notificationService.ShowToaster("Select a Resource", 2);
        }
    };
    //okDelete(event: any) {
    //    if (event.returnOk == true) {
    //        for (var i = 0; i < this.itemsSource.length; i++) {
    //            for (var j = 0; j < this.inputItems.selectedIds.length; j++) {
    //                if (this.itemsSource[i]["ResourceId"] == this.inputItems.selectedIds[j]) {
    //                    var index = (this.itemsSource.indexOf(this.itemsSource[i]));
    //                    if (index > -1) {
    //                        this.itemsSource.splice(index, 1)
    //                        var sortedData = new Array();/*To notify the watcher about the change*/
    //                        sortedData = sortedData.concat(this.itemsSource);
    //                        this.itemsSource = sortedData;
    //                    }
    //                }
    //            }
    //        }
    //        this.spaceService.deleteSpaceResources(this.inputItems.selectedIds);
    //        this.notificationService.ShowToaster("Selected Employee Resource deleted", 3);
    //    }
    //}
    Space_ResourcesComponent.prototype.ddlResourceTypeChange = function (event) {
        console.log(event);
    };
    Space_ResourcesComponent = __decorate([
        core_1.Component({
            selector: 'space_resources',
            templateUrl: './app/Views/Space/Space Resources/space_resources.component.html',
            directives: [submenu_component_1.SubMenu, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, dropdownlistcomponent_component_1.DropDownListComponent, confirm_component_1.ConfirmationComponent],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, confirm_service_1.ConfirmationService]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService])
    ], Space_ResourcesComponent);
    return Space_ResourcesComponent;
}());
exports.Space_ResourcesComponent = Space_ResourcesComponent;
//# sourceMappingURL=space_resources.component.js.map