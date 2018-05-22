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
var core_2 = require('@angular/core');
var http_1 = require('@angular/http');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var space_service_1 = require('../../../Models/Space/space.service');
var space_drivers_add_edit_component_1 = require('./space-drivers-add-edit.component');
var SpaceDrivers = (function () {
    function SpaceDrivers(spaceService, AdministrationService, notificationService, generFun) {
        this.spaceService = spaceService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.enableMenu = [1, 2, 3];
        this.pageIndex = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.pagePath = "";
        this.showSlide = false;
        this.position = "top-right";
        this.slidewidth = 250;
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 2008
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 2009
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": 2010
            }];
    }
    SpaceDrivers.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.spaceService.getSpaceDriversFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    };
    SpaceDrivers.prototype.dataLoad = function (target) {
        var contextObj = this;
        debugger;
        contextObj.spaceService.getSpaceDriversList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No CAI Space Drivers exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 735, contextObj.AdministrationService, contextObj.menuData.length);
        if (contextObj.userRoleId == 4 || contextObj.userRoleId == 7) {
            contextObj.enableMenu = [];
        }
    };
    SpaceDrivers.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.pageTitle = "New CAI Space Driver";
                this.addClick();
                break;
            case 2:
                this.pageTitle = "Edit CAI Space Driver";
                this.editClick();
                break;
            case 3:
                this.action = "delete";
                this.deleteClick();
                break;
        }
    };
    SpaceDrivers.prototype.addClick = function () {
        var contextObj = this;
        contextObj.action = "add";
        contextObj.btnName = "Save";
        this.pageTitle = "New CAI Space Driver";
        contextObj.spaceService.loadSpaceDriversAddEdit(0, 1).subscribe(function (result) {
            contextObj.fieldDetailsAddEdit = (result["Data"]);
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    SpaceDrivers.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit CAI Space Driver";
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Relationship", 2);
        }
        else if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (contextObj.inputItems.selectedIds.length == 1) {
            if (contextObj.inputItems.selectedIds[0] != null) {
                contextObj.spaceService.loadSpaceDriversAddEdit(contextObj.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAddEdit = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    SpaceDrivers.prototype.deleteClick = function () {
        var contextObj = this;
        var rptFldVal = [{ ReportFieldId: 173, Value: "305" }];
        contextObj.spaceService.CheckIsCIASpaceDriverReferenceFound(rptFldVal, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"] == false) {
                contextObj.showSlide = true;
                contextObj.slideMessage = "Are you sure you want to delete the selected CAI Space Driver?";
            }
            else {
                contextObj.slideMessage = "Selected CAI Space Driver is in use. Are you sure you want to delete the selected Space Driver ?";
                contextObj.showSlide = true;
            }
        });
    };
    SpaceDrivers.prototype.deleteSpaceDriver = function () {
        var contextObj = this;
        contextObj.spaceService.DeleteSpaceDrivers(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("CAI Space Driver deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Space Driver in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    SpaceDrivers.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    SpaceDrivers.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteSpaceDriver();
    };
    SpaceDrivers.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    SpaceDrivers.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    SpaceDrivers.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    SpaceDrivers.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceDrivers.prototype, "userRoleId", void 0);
    SpaceDrivers = __decorate([
        core_2.Component({
            selector: 'space-drivers',
            templateUrl: './app/Views/CAI/General Settings/space-drivers.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, space_drivers_add_edit_component_1.SpaceDriversAddEdit],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, space_service_1.SpaceService],
            inputs: ["objectCategoryId"]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SpaceDrivers);
    return SpaceDrivers;
}());
exports.SpaceDrivers = SpaceDrivers;
//# sourceMappingURL=space-drivers.component.js.map