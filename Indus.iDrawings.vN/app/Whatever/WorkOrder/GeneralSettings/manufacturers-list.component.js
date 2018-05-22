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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
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
//importing addedit component
var manufacturers_addedit_component_1 = require('./manufacturers-addedit.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var ManufacturersListComponent = (function () {
    function ManufacturersListComponent(workOrdereService, AdministrationService, notificationService, generFun) {
        this.workOrdereService = workOrdereService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Manufacturer Name]", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.enableMenu = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 3233
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 3234
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 3235
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    ManufacturersListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.workOrdereService.getManufacturersField().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    };
    ManufacturersListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.workOrdereService.getManufacturersData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Manufacturers exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 702, contextObj.AdministrationService, contextObj.menuData.length);
    };
    ManufacturersListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    };
    ManufacturersListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    ManufacturersListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    ManufacturersListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Manufacturer";
        this.workOrdereService.loadManufacturersAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    ManufacturersListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Manufacturer";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Manufacturer", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrdereService.loadManufacturersAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    ManufacturersListComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Manufacturer", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null)
                this.workOrdereService.checkManufacturerIsInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData["Data"] == 1) {
                        contextObj.notificationService.ShowToaster("Selected Manufacturer in use, cannot be deleted", 5);
                    }
                    else {
                        contextObj.showSlide = !contextObj.showSlide;
                    }
                });
        }
    };
    ManufacturersListComponent.prototype.inlineAdd = function (event) {
        var contextObj = this;
        var contextObj = this;
        contextObj.workOrdereService.InlineAddUpdateManufacturers(event, contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Manufacturer added", 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Manufacturer already exists", 5);
                    }
                    break;
            }
        });
    };
    ManufacturersListComponent.prototype.inlineEdit = function (event) {
        var contextObj = this;
        contextObj.workOrdereService.InlineAddUpdateManufacturers(event, contextObj.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Manufacturer details updated", 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Manufacturer already exists", 5);
                    }
                    break;
            }
        });
    };
    ManufacturersListComponent.prototype.inlineDelete = function (event) {
        this.deleteContacts();
    };
    ManufacturersListComponent.prototype.submitReturn = function (event) {
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
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ManufacturersListComponent.prototype.deleteContacts = function () {
        var contextObj = this;
        contextObj.workOrdereService.deleteManufacturers(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Manufacturer deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Manufacturer in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    //slide events/////
    ManufacturersListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteContacts();
    };
    ManufacturersListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ManufacturersListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ManufacturersListComponent = __decorate([
        core_1.Component({
            selector: 'manufacturers-list',
            templateUrl: './app/Views/WorkOrder/GeneralSettings/manufacturers-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, manufacturers_addedit_component_1.ManufacturersAddEditComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ManufacturersListComponent);
    return ManufacturersListComponent;
}());
exports.ManufacturersListComponent = ManufacturersListComponent;
//# sourceMappingURL=manufacturers-list.component.js.map