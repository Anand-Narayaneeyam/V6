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
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var amenities_add_edit_component_1 = require('./amenities-add-edit.component');
var AmenityComponent = (function () {
    function AmenityComponent(schedulingService, notificationService, getData) {
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.types = false;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.fieldDetailsAdd1 = [];
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: 'Amenity', sortDir: 'ASC', selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add"
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit"
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete"
            }
        ];
        this.gridcount = 0;
        this.enableMenu = [];
        this.selIds = new Array();
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 280;
        this.isApprovalProcessSubscribed = false;
    }
    AmenityComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('201').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0)
                return;
            contextObj.isApprovalProcessSubscribed = result["Data"][0]["IsSubscribed"];
            contextObj.schedulingService.getAmenitiesFields().subscribe(function (resultData) {
                contextObj.fields = resultData["Data"];
                //var workTypeField = contextObj.fields.find(function (item) { return item.ReportFieldId === 8647 });
                //workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
            });
            contextObj.getAmenities();
        });
    };
    AmenityComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        contextObj.enableMenu = [1, 2, 3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Amenities added", 5);
        }
    };
    AmenityComponent.prototype.getAmenities = function () {
        var contextObj = this;
        this.schedulingService.getAmenitiesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            }
            else {
                contextObj.amenitySource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
            contextObj.changeEnableMenu();
        });
    };
    AmenityComponent.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
    };
    AmenityComponent.prototype.onSubMenuChange = function (event, Id) {
        if (event.value == 1) {
            this.onMenuAddClick();
        }
        else if (event.value == 2) {
            this.onMenuEditClick();
        }
        else if (event.value == 3) {
            this.onMenuDeleteClick();
        }
    };
    AmenityComponent.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    AmenityComponent.prototype.onMenuAddClick = function () {
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Amenity";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.schedulingService.getAmenityAddLoad().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8647; });
            workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
        });
    };
    AmenityComponent.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Amenity";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.schedulingService.getAmenityEditLoad(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8647; });
                workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    AmenityComponent.prototype.onMenuDeleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select an Amenity", 2);
        }
        else {
            var isInUse = this.inputItems.rowData["IsInUse"];
            if (isInUse == 1)
                this.notificationService.ShowToaster("Selected Amenity in use, cannot be deleted", 5);
            else
                this.showSlide = !this.showSlide;
        }
    };
    AmenityComponent.prototype.okDelete = function (event) {
        this.deleteAmenity();
        this.showSlide = !this.showSlide;
    };
    AmenityComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    AmenityComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    AmenityComponent.prototype.deleteAmenity = function () {
        var contextObj = this;
        this.schedulingService.postDeleteAmenityDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.amenitySource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.amenitySource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Amenity deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Amenity in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    AmenityComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getAmenities();
    };
    AmenityComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.getAmenities();
    };
    AmenityComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.amenitySource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.amenitySource = retUpdatedSrc["itemSrc"];
            this.enableMenu = [1, 2, 3];
        }
        else {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.amenitySource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    AmenityComponent = __decorate([
        core_1.Component({
            selector: 'amenities',
            templateUrl: './app/Views/Scheduling/General Settings/amenities.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, slide_component_1.SlideComponent, grid_component_1.GridComponent, split_view_component_1.SplitViewComponent, amenities_add_edit_component_1.AmenitiesAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], AmenityComponent);
    return AmenityComponent;
}());
exports.AmenityComponent = AmenityComponent;
//# sourceMappingURL=amenities.component.js.map