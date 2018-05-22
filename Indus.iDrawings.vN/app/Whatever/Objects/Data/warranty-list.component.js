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
var objects_service_1 = require('../../../Models/Objects/objects.service');
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
var warranty_addedit_component_1 = require('./warranty-addedit.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var warranty_alert_component_1 = require('./warranty-alert.component');
var WarrantyListComponent = (function () {
    function WarrantyListComponent(workOrdereService, objectsService, AdministrationService, notificationService, generFun) {
        this.workOrdereService = workOrdereService;
        this.objectsService = objectsService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
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
                "privilegeId": 994
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 994
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 994
            },
            {
                "id": 4,
                "title": "Alert",
                "image": "Alert",
                "path": "Alert",
                "submenu": null,
                "privilegeId": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
    }
    WarrantyListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.objectsService.getWarrantyField().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    };
    WarrantyListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.objectsService.getWarrantyData(contextObj.selectedId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems <= 0) {
                contextObj.notificationService.ShowToaster("No Warranty details exist", 2);
                contextObj.enableMenu = [1];
            }
            if (contextObj.totalItems <= 0 && contextObj.isallattachmentmenuneeded == false) {
                contextObj.enableMenu = [];
            }
            if (contextObj.totalItems <= 0 && contextObj.isallattachmentmenuneeded == true) {
                contextObj.enableMenu = [1];
            }
            if (contextObj.totalItems > 0 && contextObj.isallattachmentmenuneeded == false) {
                contextObj.enableMenu = [4];
            }
            if (contextObj.totalItems > 0 && contextObj.isallattachmentmenuneeded == true) {
                contextObj.enableMenu = [1, 2, 3, 4];
            }
            //if (contextObj.isallattachmentmenuneeded == false) {
            //    contextObj.enableMenu = [4];
            //}
            //else {
            //    contextObj.enableMenu = [1, 2, 3, 4];
            //}           
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
    };
    WarrantyListComponent.prototype.enableSubMenu = function () {
        var contextObj = this;
        if (contextObj.totalItems <= 0) {
            contextObj.notificationService.ShowToaster("No Warranty details exist", 2);
            contextObj.enableMenu = [1];
        }
        if (contextObj.totalItems <= 0 && contextObj.isallattachmentmenuneeded == false) {
            contextObj.enableMenu = [];
        }
        if (contextObj.totalItems <= 0 && contextObj.isallattachmentmenuneeded == true) {
            contextObj.enableMenu = [1];
        }
        if (contextObj.totalItems > 0 && contextObj.isallattachmentmenuneeded == false) {
            contextObj.enableMenu = [4];
        }
        if (contextObj.totalItems > 0 && contextObj.isallattachmentmenuneeded == true) {
            contextObj.enableMenu = [1, 2, 3, 4];
        }
    };
    WarrantyListComponent.prototype.onSubMenuChange = function (event) {
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
            case 4:
                this.alertClick();
                break;
        }
    };
    WarrantyListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    WarrantyListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    WarrantyListComponent.prototype.alertClick = function () {
        var contextObj = this;
        this.action = "alert";
        this.btnName = "Save Alert";
        this.pageTitle = "Warranty Alert";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.warrantyNotificationDate = this.inputItems.rowData["End Date"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            contextObj.notificationService.ShowToaster("Select a Warranty", 2);
        }
    };
    WarrantyListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Warranty";
        this.objectsService.loadWarrantyAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[3].IsVisible = false;
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    WarrantyListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Warranty";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.objectsService.loadWarrantyAddEdit(this.inputItems.selectedIds[0], 2, this.selectedId).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.fieldDetailsAdd1[3].IsVisible = false;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    WarrantyListComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            //this.workOrdereService.checkContractorIsInUse(this.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
            //    if (returnCheck["Data"] == -1)
            //        contextObj.notificationService.ShowToaster("Selected Warranty is in use, cannot be deleted", 5);
            //    else
            contextObj.showSlide = !contextObj.showSlide;
        }
    };
    WarrantyListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.enableSubMenu();
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    WarrantyListComponent.prototype.deleteContacts = function () {
        var contextObj = this;
        contextObj.objectsService.deleteWarranty(contextObj.inputItems.selectedIds[0], this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Warranty deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Warranty Details in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    //slide events/////
    WarrantyListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteContacts();
    };
    WarrantyListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    WarrantyListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    WarrantyListComponent = __decorate([
        core_1.Component({
            selector: 'warranty-list',
            templateUrl: './app/Views/Objects/Data/warranty-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, warranty_addedit_component_1.WarrantyAddEditComponent, warranty_alert_component_1.WarrantyAlert],
            providers: [workorder_service_1.WorkOrdereService, objects_service_1.ObjectsService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ["selectedId", "isallattachmentmenuneeded", "objectCategoryName"],
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, objects_service_1.ObjectsService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], WarrantyListComponent);
    return WarrantyListComponent;
}());
exports.WarrantyListComponent = WarrantyListComponent;
//# sourceMappingURL=warranty-list.component.js.map