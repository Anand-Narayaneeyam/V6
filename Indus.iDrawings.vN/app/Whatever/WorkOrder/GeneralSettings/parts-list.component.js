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
var parts_AEC_list_component_1 = require('./parts-AEC-list.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var parts_add_edit_component_1 = require('./parts-add-edit.component');
var PartsListComponent = (function () {
    function PartsListComponent(workOrderService, AdministrationService, notificationService, getData) {
        this.workOrderService = workOrderService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.types = false;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.inputItems = { dataKey: "Id", selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Part Name]', sortDir: 'ASC', selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "privilegeId": 3243
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "privilegeId": 3244
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": 3245
            },
            {
                "id": 4,
                "title": "Associated Equipment Classes",
                "image": "Associated Equipment Classes",
                "path": "Associated Equipment Classes",
                "privilegeId": null
            }
        ];
        this.gridcount = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.cardButtonPrivilege = [false, false];
        this.showSlideAdd = false;
    }
    PartsListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.getData.GetPrivilegesOfPage(contextObj.menuData, callBack, 735, contextObj.AdministrationService, contextObj.menuData.length);
        this.workOrderService.getPartsFields().subscribe(function (resultData) {
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData.Data[i].FieldLabel.length > 13)
                    resultData.Data[i]["Width"] = 200;
                if (resultData.Data[i].FieldLabel.length > 26)
                    resultData.Data[i]["Width"] = 250;
            }
            contextObj.fields = resultData["Data"];
            contextObj.getParts();
        });
    };
    PartsListComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Parts exist", 2);
        }
        else {
            contextObj.enableMenu = [1, 2, 3, 4];
        }
    };
    PartsListComponent.prototype.getParts = function () {
        var contextObj = this;
        this.workOrderService.getPartsData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            }
            else {
                contextObj.partsSource = JSON.parse(resultData["Data"].FieldBinderData);
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
    //        this.workOrderService.postEditPartsDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
    //            contextObj.success = resultData["Data"].Message;
    //            if (contextObj.success == "Success") {
    //                contextObj.notificationService.ShowToaster("Part updated", 3);
    //                contextObj.getParts();
    //            }
    //            else if (contextObj.success == "Already Exists") {
    //                contextObj.notificationService.ShowToaster("Part already exists", 5);
    //                contextObj.getParts();
    //            }
    //            else {
    //                contextObj.notificationService.ShowToaster("Enter Part", 5);
    //                contextObj.getParts();
    //            }
    //            contextObj.changeEnableMenu();
    //        })
    //    } else {
    //        this.workOrderService.postAddPartsDetails(fieldDetails).subscribe(function (resultData) {
    //            contextObj.success = resultData["Data"].Message;
    //            if (contextObj.success == "Success") {
    //                contextObj.totalItems = contextObj.totalItems + 1;
    //                contextObj.notificationService.ShowToaster("Part added", 3);
    //                contextObj.types = false;
    //                contextObj.partsSource[contextObj.partsSource.length - 1].Id = resultData["Data"].ServerId;
    //                contextObj.totalItems = contextObj.totalItems + 1;
    //                contextObj.getParts();
    //            }
    //            else if (contextObj.success == "Already Exists") {
    //                contextObj.partsSource.splice(contextObj.partsSource.length - 1, 1);
    //                contextObj.notificationService.ShowToaster("Part already exists", 5);
    //            }
    //            else {
    //                contextObj.partsSource.splice(contextObj.partsSource.length - 1, 1);
    //                contextObj.notificationService.ShowToaster("Enter Part", 5);
    //            }
    //            contextObj.changeEnableMenu();
    //        });
    //    }
    //}
    PartsListComponent.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
    };
    PartsListComponent.prototype.onSubMenuChange = function (event, Id) {
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
            this.onMenuAECClick(1);
        }
    };
    PartsListComponent.prototype.onMenuAECClick = function (target) {
        this.showSlideAdd = false;
        this.menuClickValue = 4;
        this.target = target;
        //if (this.target == 2) {
        //    this.inputItems.selectedIds[0] = this.partsSource[0]["Id"];
        //}
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            for (var i = 0; i <= this.partsSource.length; i++) {
                if (this.partsSource[i]["Id"] == this.inputItems.selectedIds[0]) {
                    this.partName = this.partsSource[i]["Part Name"];
                    break;
                }
            }
            this.pageTitle = "Associated Equipment Classes";
            this.action = "AEC";
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            this.notificationService.ShowToaster("Select a Part", 2);
        }
    };
    PartsListComponent.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    PartsListComponent.prototype.onMenuAddClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Part";
        this.workOrderService.loadPartAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    PartsListComponent.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Part";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrderService.loadPartAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    PartsListComponent.prototype.onMenuDeleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Service?", "Yes");
            this.workOrderService.checkItemIdIsInUse(this.inputItems.selectedIds[0], 4).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Part in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    PartsListComponent.prototype.okDelete = function (event) {
        this.deleteParts();
        this.showSlide = !this.showSlide;
    };
    PartsListComponent.prototype.deleteParts = function () {
        var contextObj = this;
        this.workOrderService.postDeletePartsDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.partsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.partsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Part deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Part in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    PartsListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
        this.showSlideAdd = false;
    };
    PartsListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
        this.showSlideAdd = value.value;
    };
    PartsListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getParts();
    };
    PartsListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getParts();
    };
    PartsListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.partsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.partsSource = retUpdatedSrc["itemSrc"];
            contextObj.showSlideAdd = true;
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.partsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        else {
            var retUpdatedSrc_1 = contextObj.getData.updateDataSource(contextObj.partsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.totalItems = retUpdatedSrc_1["itemCount"];
            contextObj.partsSource = retUpdatedSrc_1["itemSrc"];
        }
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        // contextObj.partsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = false;
    };
    PartsListComponent.prototype.okAddEquip = function (event) {
        this.onMenuAECClick(2);
    };
    PartsListComponent = __decorate([
        core_1.Component({
            selector: 'parts-list',
            templateUrl: './app/Views/WorkOrder/GeneralSettings/parts-list.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, grid_component_1.GridComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, parts_AEC_list_component_1.PartsAECListComponent, parts_add_edit_component_1.PartAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], PartsListComponent);
    return PartsListComponent;
}());
exports.PartsListComponent = PartsListComponent;
//# sourceMappingURL=parts-list.component.js.map