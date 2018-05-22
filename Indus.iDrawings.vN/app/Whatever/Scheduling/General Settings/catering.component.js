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
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var catering_assignworktype_component_1 = require('./catering-assignworktype.component');
var catering_add_edit_component_1 = require('./catering-add-edit.component');
var CateringComponent = (function () {
    function CateringComponent(schedulingService, notificationService, getData) {
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.types = true;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Catering Item]', sortDir: 'ASC', selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
        this.fieldDetailsAdd1 = [];
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
            },
            {
                "id": 4,
                "title": "Assign Work Type",
                "image": "Assign Work Type",
                "path": "Assign Work Type"
            }
        ];
        this.gridcount = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.isApprovalProcessSubscribed = false;
        this.pageTitle = "";
    }
    CateringComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('201').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0)
                return;
            contextObj.isApprovalProcessSubscribed = result["Data"][0]["IsSubscribed"];
        });
        this.schedulingService.getCateringFields().subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.fields = resultData["Data"];
                contextObj.getCatering();
            }
        });
    };
    CateringComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        contextObj.enableMenu = contextObj.isApprovalProcessSubscribed ? [1, 2, 3, 4] : [1, 2, 3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Catering Item exists", 5);
        }
    };
    CateringComponent.prototype.getCatering = function () {
        var contextObj = this;
        this.schedulingService.getCateringData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"] == "") {
                    resultData["Data"] = null;
                }
                else {
                    contextObj.cateringSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                }
                contextObj.changeEnableMenu();
            }
        });
    };
    CateringComponent.prototype.onCardSubmit = function (event) {
        var contextObj = this;
        var fieldDetails = event.fieldObject;
        if (event["dataKeyValue"]) {
            this.schedulingService.postEditCateringDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.notificationService.ShowToaster("Catering Item updated", 3);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Catering Item already exists", 5);
                        contextObj.getCatering();
                    }
                    contextObj.changeEnableMenu();
                }
            });
        }
        else {
            this.schedulingService.postAddCateringDetails(fieldDetails).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Catering Item added", 3);
                        contextObj.types = false;
                        contextObj.cateringSource[contextObj.cateringSource.length - 1].Id = resultData["Data"].ServerId;
                        contextObj.totalItems = contextObj.totalItems + 1;
                    }
                    else {
                        //contextObj.cateringSource.splice(contextObj.cateringSource.length - 1, 1);
                        if (resultData["Data"].ServerId == 0) {
                            contextObj.notificationService.ShowToaster("Enter Catering Item", 5);
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Catering Item already exists", 5);
                        }
                    }
                    contextObj.changeEnableMenu();
                }
            });
        }
    };
    CateringComponent.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
    };
    CateringComponent.prototype.onSubMenuChange = function (event, Id) {
        this.menuclick = event.value;
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
            this.onMenuAssignWorkTypeClick();
        }
    };
    CateringComponent.prototype.onMenuAssignWorkTypeClick = function () {
        this.action = "assign";
        this.btnName = "Save Changes";
        this.pageTitle = "Work Type";
        var contextObj = this;
        contextObj.schedulingService.loadAssignWorkTypeEdit().subscribe(function (result) {
            contextObj.fieldDetailsAdd = result["Data"];
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    CateringComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.cateringSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.cateringSource = retUpdatedSrc["itemSrc"];
            this.enableMenu = [1, 2, 3];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.cateringSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    CateringComponent.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    CateringComponent.prototype.onMenuAddClick = function () {
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Catering";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.schedulingService.getCateringAddLoad().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[2].MaxLength = 14;
            contextObj.schedulingService.loadAssignWorkTypeEdit().subscribe(function (result) {
                contextObj.fieldDetailsAdd = result["Data"];
                if (contextObj.fieldDetailsAdd[1].FieldValue != "") {
                    contextObj.fieldDetailsAdd1[4].IsVisible = true;
                    contextObj.fieldDetailsAdd1[4].FieldValue = contextObj.fieldDetailsAdd[1].FieldValue;
                }
                else {
                    contextObj.fieldDetailsAdd1[4].IsVisible = false;
                }
            });
            //var workTypeField = contextObj.fields.find(function (item) { return item.ReportFieldId === 8755 });
            //workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
        });
    };
    CateringComponent.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Catering";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.schedulingService.getCateringEditLoad(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                contextObj.fieldDetailsAdd1[2].MaxLength = 14;
                contextObj.schedulingService.loadAssignWorkTypeEdit().subscribe(function (result) {
                    contextObj.fieldDetailsAdd = result["Data"];
                    if (contextObj.fieldDetailsAdd[1].FieldValue != "") {
                        contextObj.fieldDetailsAdd1[4].IsVisible = true;
                        contextObj.fieldDetailsAdd1[4].FieldValue = contextObj.fieldDetailsAdd[1].FieldValue;
                    }
                    else {
                        contextObj.fieldDetailsAdd1[4].IsVisible = false;
                    }
                });
                //var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8755 });
                //workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;                
            });
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
    };
    CateringComponent.prototype.onMenuDeleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Catering Item", 2);
        }
        else {
            var isInUse = this.inputItems.rowData["IsInUse"];
            if (isInUse == 1)
                this.notificationService.ShowToaster("Selected Catering Item in use, cannot be deleted", 5);
            else
                this.showSlide = !this.showSlide;
        }
    };
    CateringComponent.prototype.okDelete = function (event) {
        this.deleteCatering();
        this.showSlide = !this.showSlide;
    };
    CateringComponent.prototype.deleteCatering = function () {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.schedulingService.postDeleteCateringDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.cateringSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.cateringSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Catering Item deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Catering Item in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
        //}
    };
    CateringComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    CateringComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    CateringComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getCatering();
    };
    CateringComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getCatering();
    };
    CateringComponent = __decorate([
        core_1.Component({
            selector: 'catering',
            templateUrl: './app/Views/Scheduling/General Settings/catering.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, catering_assignworktype_component_1.CateringAssignWorkTypeComponent, grid_component_1.GridComponent, catering_add_edit_component_1.CateringAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], CateringComponent);
    return CateringComponent;
}());
exports.CateringComponent = CateringComponent;
//# sourceMappingURL=catering.component.js.map