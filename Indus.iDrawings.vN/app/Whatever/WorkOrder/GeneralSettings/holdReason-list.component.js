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
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var holdReason_addedit_component_1 = require('./holdReason-addedit.component');
var HoldReasonListComponent = (function () {
    function HoldReasonListComponent(workOrderService, AdministrationService, notificationService, getData) {
        this.workOrderService = workOrderService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.types = false;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: 'Reason', sortDir: 'ASC', selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "privilegeId": 9511
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "privilegeId": 9512
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": 9513
            }
        ];
        this.gridcount = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.submitSuccess = [];
        this.cardButtonPrivilege = [false, false];
        this.showsort = true;
    }
    HoldReasonListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.getData.GetPrivilegesOfPage(contextObj.menuData, callBack, 835, contextObj.AdministrationService, contextObj.menuData.length);
        this.workOrderService.getHoldReasonFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            contextObj.getHoldReason();
        });
    };
    HoldReasonListComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Reasons exist", 2);
        }
        else {
            contextObj.enableMenu = [1, 2, 3];
        }
    };
    HoldReasonListComponent.prototype.getHoldReason = function () {
        var contextObj = this;
        this.workOrderService.getHoldReasonData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            }
            else {
                contextObj.holdReasonSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
            contextObj.changeEnableMenu();
        });
    };
    HoldReasonListComponent.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
        this.showsort = true;
    };
    HoldReasonListComponent.prototype.onSubMenuChange = function (event, Id) {
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
    HoldReasonListComponent.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    HoldReasonListComponent.prototype.onMenuAddClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Reason";
        this.workOrderService.loadHoldReasonAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    HoldReasonListComponent.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Reason";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Reason", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrderService.loadHoldReasonAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    HoldReasonListComponent.prototype.onMenuDeleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Reason", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.workOrderService.checkHoldReasonIsInUse(this.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == 1)
                    contextObj.notificationService.ShowToaster("Selected Reason in use, cannot be deleted", 5);
                else
                    contextObj.showSlide = !contextObj.showSlide;
            });
        }
    };
    HoldReasonListComponent.prototype.okDelete = function (event) {
        this.deleteholdReason();
        this.showSlide = !this.showSlide;
    };
    HoldReasonListComponent.prototype.deleteholdReason = function () {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.workOrderService.postDeleteHoldReasonDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.holdReasonSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.holdReasonSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Reason deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Reason in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
        //}
    };
    HoldReasonListComponent.prototype.cancelClick = function (event) {
        this.selIds = [];
        this.showSlide = !this.showSlide;
    };
    HoldReasonListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    HoldReasonListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getHoldReason();
    };
    HoldReasonListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getHoldReason();
    };
    HoldReasonListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.holdReasonSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.holdReasonSource = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.holdReasonSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = false;
    };
    HoldReasonListComponent = __decorate([
        core_1.Component({
            selector: 'holdReason-list',
            templateUrl: './app/Views/WorkOrder/GeneralSettings/holdReason-list.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, holdReason_addedit_component_1.HoldReasonAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], HoldReasonListComponent);
    return HoldReasonListComponent;
}());
exports.HoldReasonListComponent = HoldReasonListComponent;
//# sourceMappingURL=holdReason-list.component.js.map