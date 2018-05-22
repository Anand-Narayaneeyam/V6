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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var Equipment_list_component_1 = require('./Equipment-list.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var Routes_AddEdit_component_1 = require('./Routes-AddEdit.component');
var RoutesListComponent = (function () {
    function RoutesListComponent(administrationServices, workOrderService, notificationService, getData) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.types = true;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: 'Route', sortDir: 'ASC', selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.cardButtonPrivilege = [false, false];
        //Form ID : 235
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (235))
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "privilegeId": 3358
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "privilegeId": 3359
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": 3360
            },
            {
                "id": 4,
                "title": "Equipment",
                "image": "Equipment",
                "path": "Equipment",
                "privilegeId": 3360
            }
        ];
        this.gridcount = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.showSlideAdd = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.submitSuccess = [];
        this.refreshgrid = [];
    }
    RoutesListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.getData.GetPrivilegesOfPage(contextObj.menuData, callBack, 2545, contextObj.administrationServices, contextObj.menuData.length);
        contextObj.workOrderService.getRoutesFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            contextObj.administrationServices.getCustomerSubscribedFeatures("189").subscribe(function (rt) {
                var customerFeatureobj = rt["Data"];
                for (var i = 0; i < customerFeatureobj.length; i++) {
                    switch (customerFeatureobj[i]["Id"]) {
                        case 189:
                            contextObj.isSiteAdmin = customerFeatureobj[i]["IsSubscribed"];
                            break;
                    }
                }
                if (contextObj.isSiteAdmin == false) {
                    contextObj.fields[3].IsVisible = false;
                }
                contextObj.getRoutes();
            });
        });
    };
    RoutesListComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        contextObj.enableMenu = [1, 2, 3, 4];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Routes exist", 2);
        }
    };
    RoutesListComponent.prototype.getRoutes = function () {
        var contextObj = this;
        this.workOrderService.getRoutesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            }
            else {
                contextObj.RoutesSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
            contextObj.changeEnableMenu();
        });
    };
    RoutesListComponent.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
    };
    RoutesListComponent.prototype.onSubMenuChange = function (event, Id) {
        this.menuClickValue = event.value;
        if (event.value == 1) {
            this.onMenuAddClick();
        }
        else if (event.value == 2) {
            this.onMenuEditClick();
        }
        else if (event.value == 3) {
            this.onMenuDeleteClick();
        }
        else if (event.value == 4) {
            this.onMenuEquipmentClick(1);
        }
    };
    RoutesListComponent.prototype.onMenuEquipmentClick = function (target) {
        var contextObj = this;
        this.target = target;
        this.showSlideAdd = false;
        this.menuClickValue = 4;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            for (var i = 0; i <= contextObj.RoutesSource.length; i++) {
                if (contextObj.RoutesSource[i]["Id"] == contextObj.inputItems.selectedIds[0]) {
                    contextObj.routeName = contextObj.RoutesSource[i]["Route"];
                    break;
                }
            }
            contextObj.action = "Equipment";
            contextObj.pageTitle = "Equipment";
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
        else {
            this.notificationService.ShowToaster("Select a Route", 2);
        }
    };
    RoutesListComponent.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    RoutesListComponent.prototype.onMenuAddClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Route";
        this.workOrderService.loadRoutesAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd = resultData["Data"];
            if (contextObj.isSiteAdmin == false) {
                contextObj.fieldDetailsAdd[3].IsVisible = false;
            }
            else {
                contextObj.fieldDetailsAdd[3].IsMandatory = true;
            }
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    RoutesListComponent.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Route";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrderService.loadRoutesAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd = result["Data"];
                    if (contextObj.isSiteAdmin == false) {
                        contextObj.fieldDetailsAdd[3].IsVisible = false;
                    }
                    else {
                        contextObj.fieldDetailsAdd[3].IsMandatory = true;
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    RoutesListComponent.prototype.onMenuDeleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.workOrderService.checkRouteInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == 1)
                    contextObj.notificationService.ShowToaster("Selected Route in use, cannot be deleted", 5);
                else
                    contextObj.showSlide = !contextObj.showSlide;
            });
        }
    };
    RoutesListComponent.prototype.okDelete = function (event) {
        this.deleteRoutes();
        this.showSlide = !this.showSlide;
    };
    RoutesListComponent.prototype.deleteRoutes = function () {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.workOrderService.postDeleteRoutesDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.RoutesSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.RoutesSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Route deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Route in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
        //}
    };
    RoutesListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
        this.showSlideAdd = false;
    };
    RoutesListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
        this.showSlideAdd = value.value;
    };
    RoutesListComponent.prototype.okAddEquip = function (event) {
        this.onMenuEquipmentClick(2);
    };
    RoutesListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getRoutes();
    };
    RoutesListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getRoutes();
    };
    RoutesListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.RoutesSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.RoutesSource = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
            contextObj.showSlideAdd = true;
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.RoutesSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        if (this.action == "add" || this.action == "edit") {
            contextObj.splitviewInput.showSecondaryView = false;
        }
    };
    RoutesListComponent = __decorate([
        core_1.Component({
            selector: 'Routes-list',
            templateUrl: './app/Views/WorkOrder/Maintenance/Routes-list.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, Equipment_list_component_1.EquipmentListComponent, Routes_AddEdit_component_1.RoutesAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], RoutesListComponent);
    return RoutesListComponent;
}());
exports.RoutesListComponent = RoutesListComponent;
//# sourceMappingURL=Routes-list.component.js.map