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
var priority_add_edit_component_1 = require('./priority-add-edit.component');
var PriorityListComponent = (function () {
    function PriorityListComponent(workOrderService, AdministrationService, notificationService, getData) {
        this.workOrderService = workOrderService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.types = false;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Priority Number]', sortDir: 'ASC', selectioMode: "single" };
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "privilegeId": 3273
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "privilegeId": 3274
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": 3275
            }
        ];
        this.gridcount = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.cardButtonPrivilege = [false, false];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    }
    PriorityListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.getData.GetPrivilegesOfPage(contextObj.menuData, callBack, 704, contextObj.AdministrationService, contextObj.menuData.length);
        this.workOrderService.getPriorityFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            contextObj.getPriority();
        });
    };
    PriorityListComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        if (contextObj.totalItems < 1) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Priority added", 2);
        }
        else {
            contextObj.enableMenu = [1, 2, 3];
        }
    };
    PriorityListComponent.prototype.getPriority = function () {
        var contextObj = this;
        this.workOrderService.getPriorityData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            }
            else {
                contextObj.prioritySource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
            contextObj.changeEnableMenu();
        });
    };
    //onCardSubmit(event: any) {
    //    var contextObj = this;
    //    let fieldDetails = event.fieldObject;
    //    if (event["dataKeyValue"]) {
    //        this.workOrderService.postEditPriorityDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
    //            contextObj.success = resultData["Data"].Message;
    //            if (contextObj.success == "Success") {
    //                contextObj.notificationService.ShowToaster("Priority updated", 3);
    //            }
    //            else if (contextObj.success == "Already Exists") {
    //                contextObj.notificationService.ShowToaster("Priority Name already exists", 5);
    //                contextObj.getPriority();
    //            }
    //            else {
    //                contextObj.notificationService.ShowToaster("Enter Priority", 5);
    //                contextObj.getPriority();
    //            }
    //            contextObj.changeEnableMenu();
    //        })
    //    } else {
    //        this.workOrderService.postAddPriorityDetails(fieldDetails).subscribe(function (resultData) {
    //            contextObj.success = resultData["Data"].Message;
    //            if (contextObj.success == "Success") {
    //                contextObj.totalItems = contextObj.totalItems + 1;
    //                contextObj.notificationService.ShowToaster("Priority added", 3);
    //                contextObj.types = false;
    //                contextObj.prioritySource[contextObj.prioritySource.length - 1].Id = resultData["Data"].ServerId;
    //                contextObj.totalItems = contextObj.totalItems + 1;
    //            }
    //            else if (contextObj.success == "Already Exists") {
    //                contextObj.prioritySource.splice(contextObj.prioritySource.length - 1, 1);
    //                contextObj.notificationService.ShowToaster("Priority Name already exists", 5);
    //            }
    //            else {
    //                contextObj.prioritySource.splice(contextObj.prioritySource.length - 1, 1);
    //                contextObj.notificationService.ShowToaster("Enter Priority", 5);
    //            }
    //            contextObj.changeEnableMenu();
    //        });
    //    }
    //}
    PriorityListComponent.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
    };
    PriorityListComponent.prototype.onSubMenuChange = function (event, Id) {
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
    };
    PriorityListComponent.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    PriorityListComponent.prototype.onMenuAddClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Priority";
        this.workOrderService.loadPriorityAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[2].IsVisible = false;
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    PriorityListComponent.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Priority";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Priority", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrderService.loadPriorityAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.fieldDetailsAdd1[2].IsVisible = true;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    PriorityListComponent.prototype.onMenuDeleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Priority", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.workOrderService.checkItemIdIsInUse(this.inputItems.selectedIds[0], 5).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Priority in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    PriorityListComponent.prototype.okDelete = function (event) {
        this.deletePriotity();
        this.showSlide = !this.showSlide;
    };
    PriorityListComponent.prototype.deletePriotity = function () {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.workOrderService.postDeletePriorityDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            //contextObj.success = resultData["Data"].Message;
            //if (contextObj.success == "Success") {
            //    contextObj.totalItems = contextObj.totalItems - 1;
            //    for (var count = 0; count < contextObj.selIds.length; count++) {
            //        var index = contextObj.prioritySource.indexOf(contextObj.prioritySource.filter(x => x["Id"] == contextObj.selIds[count])[0]);
            //        if (index > -1)
            //            contextObj.prioritySource.splice(index, 1);
            //    }
            //    contextObj.notificationService.ShowToaster("Selected priority deleted", 3);
            //    contextObj.totalItems = contextObj.totalItems - 1;
            //    if (contextObj.totalItems == 0) {
            //        contextObj.enableMenu = [1];
            //    }
            //    contextObj.selIds = [];
            //} else {
            //    contextObj.notificationService.ShowToaster("Selected priority is in use, cannot be deleted", 5);
            //}
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.prioritySource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.prioritySource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Priority deleted", 3);
                contextObj.getPriority();
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Priority in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
        //}
    };
    PriorityListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    PriorityListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    PriorityListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getPriority();
    };
    PriorityListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getPriority();
    };
    PriorityListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.prioritySource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.prioritySource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.prioritySource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        else {
            var retUpdatedSrc_1 = contextObj.getData.updateDataSource(contextObj.prioritySource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.totalItems = retUpdatedSrc_1["itemCount"];
            contextObj.prioritySource = retUpdatedSrc_1["itemSrc"];
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        // contextObj.prioritySource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = false;
    };
    PriorityListComponent = __decorate([
        core_1.Component({
            selector: 'priority-list',
            templateUrl: './app/Views/WorkOrder/GeneralSettings/priority-list.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, grid_component_1.GridComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, priority_add_edit_component_1.PriorityAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], PriorityListComponent);
    return PriorityListComponent;
}());
exports.PriorityListComponent = PriorityListComponent;
//# sourceMappingURL=priority-list.component.js.map