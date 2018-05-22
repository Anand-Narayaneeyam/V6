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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var services_add_edit_component_1 = require('./services-add-edit.component');
var ServiceComponent = (function () {
    function ServiceComponent(schedulingService, notificationService, getData) {
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.types = false;
        this.pageIndex = 0;
        this.itemsPerPage = 30;
        this.success = "";
        this.fieldDetailsAdd1 = [];
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: 'Service', sortDir: 'ASC', selectioMode: "single" };
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
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.enableMenu = [];
        this.selIds = new Array();
        this.isApprovalProcessSubscribed = false;
    }
    ServiceComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('201').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0)
                return;
            contextObj.isApprovalProcessSubscribed = result["Data"][0]["IsSubscribed"];
            contextObj.schedulingService.getServicesFields().subscribe(function (resultData) {
                contextObj.fields = resultData["Data"];
                //var workTypeField = contextObj.fields.find(function (item) { return item.ReportFieldId === 8650 });
                //workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
            });
        });
        contextObj.getServices();
    };
    ServiceComponent.prototype.changeEnableMenu = function () {
        var contextObj = this;
        contextObj.enableMenu = [1, 2, 3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Services added", 5);
        }
    };
    ServiceComponent.prototype.getServices = function () {
        var contextObj = this;
        this.schedulingService.getServicesData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            if (resultData["Data"] == "") {
                resultData["Data"] = null;
            }
            else {
                contextObj.serviceSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            }
            contextObj.changeEnableMenu();
        });
    };
    ServiceComponent.prototype.onCardSubmit = function (event) {
        var contextObj = this;
        var fieldDetails = event.fieldObject;
        if (event["dataKeyValue"]) {
            this.schedulingService.postEditServiceDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    contextObj.notificationService.ShowToaster("Service updated", 3);
                }
                else if (contextObj.success == "Already Exists") {
                    contextObj.notificationService.ShowToaster("Service already exists", 5);
                    contextObj.getServices();
                }
                else {
                    contextObj.notificationService.ShowToaster("Enter Service", 5);
                    contextObj.getServices();
                }
                contextObj.changeEnableMenu();
            });
        }
        else {
            this.schedulingService.postAddServiceDetails(fieldDetails).subscribe(function (resultData) {
                contextObj.success = resultData["Data"].Message;
                if (contextObj.success == "Success") {
                    contextObj.totalItems = contextObj.totalItems + 1;
                    contextObj.notificationService.ShowToaster("Service added", 3);
                    contextObj.types = false;
                    contextObj.serviceSource[contextObj.serviceSource.length - 1].Id = resultData["Data"].ServerId;
                    contextObj.totalItems = contextObj.totalItems + 1;
                }
                else if (contextObj.success == "Already Exists") {
                    contextObj.serviceSource.splice(contextObj.serviceSource.length - 1, 1);
                    contextObj.notificationService.ShowToaster("Service already exists", 5);
                }
                else {
                    contextObj.serviceSource.splice(contextObj.serviceSource.length - 1, 1);
                    contextObj.notificationService.ShowToaster("Enter Service", 5);
                }
                contextObj.changeEnableMenu();
            });
        }
    };
    ServiceComponent.prototype.onCardCancel = function (event) {
        this.changeEnableMenu();
    };
    ServiceComponent.prototype.onSubMenuChange = function (event, Id) {
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
    ServiceComponent.prototype.onDelete = function (e) {
        this.onMenuDeleteClick();
    };
    ServiceComponent.prototype.onMenuAddClick = function () {
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Service";
        var contextObj = this;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.schedulingService.getServiceAddLoad().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8650; });
            workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
        });
    };
    ServiceComponent.prototype.onMenuEditClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Service";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.schedulingService.getServiceEditLoad(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8650; });
                workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    ServiceComponent.prototype.onMenuDeleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Service", 2);
        }
        else {
            var isInUse = this.inputItems.rowData["IsInUse"];
            if (isInUse == 1)
                this.notificationService.ShowToaster("Selected Service in use, cannot be deleted", 5);
            else
                this.showSlide = !this.showSlide;
        }
    };
    ServiceComponent.prototype.okDelete = function (event) {
        this.deleteService();
        this.showSlide = !this.showSlide;
    };
    ServiceComponent.prototype.deleteService = function () {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.schedulingService.postDeleteServiceDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.serviceSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.serviceSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Service deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Service in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
        //}
    };
    ServiceComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ServiceComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ServiceComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getServices();
    };
    ServiceComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getServices();
    };
    ServiceComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.serviceSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.serviceSource = retUpdatedSrc["itemSrc"];
            this.enableMenu = [1, 2, 3];
        }
        else {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.serviceSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ServiceComponent = __decorate([
        core_1.Component({
            selector: 'services',
            templateUrl: './app/Views/Scheduling/General Settings/services.component.html',
            directives: [list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, slide_component_1.SlideComponent, grid_component_1.GridComponent, split_view_component_1.SplitViewComponent, services_add_edit_component_1.ServicesAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ServiceComponent);
    return ServiceComponent;
}());
exports.ServiceComponent = ServiceComponent;
//# sourceMappingURL=services.component.js.map