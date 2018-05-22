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
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var resources_add_edit_1 = require('./resources-add-edit');
var ResourceScheduling = (function () {
    function ResourceScheduling(notificationService, schedulingService, getData, generFun) {
        this.notificationService = notificationService;
        this.schedulingService = schedulingService;
        this.getData = getData;
        this.generFun = generFun;
        this.fieldDetailsAdd1 = [];
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.types = true;
        this.cardButtonPrivilege = [false, false];
        this.totalItems = 0;
        this.moduleId = "9";
        this.workFlowCategoryId = "1";
        this.EntityCategoryId = "1";
        this.showSlide = false;
        this.position = "top-right";
        this.message = "Are you sure you want to delete the selected Resource?";
        this.isApprovalProcessSubscribed = false;
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "subMenu": null
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null
            }];
    }
    ResourceScheduling.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('201').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0)
                return;
            contextObj.isApprovalProcessSubscribed = result["Data"][0]["IsSubscribed"];
            contextObj.schedulingService.getResourceScheduling(this.moduleId, this.workFlowCategoryId, this.EntityCategoryId).subscribe(function (resultData) {
                contextObj.fieldObject = resultData["Data"];
            });
        });
        contextObj.dataLoad();
    };
    ResourceScheduling.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.schedulingService.getResourceSchedulingData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            if (contextObj.totalItems < 1) {
                contextObj.enableMenu = [1];
                contextObj.notificationService.ShowToaster("No Resources exist", 3);
            }
            else {
                contextObj.enableMenu = [1, 2, 3];
            }
        });
    };
    ResourceScheduling.prototype.onSubMenuChange = function (event) {
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
    ResourceScheduling.prototype.addClick = function () {
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Resource";
        var contextObj = this;
        this.fieldDetailsAdd1 = [];
        this.fieldDetailsAdd1 = this.fieldDetailsAdd1.concat(this.fieldObject);
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.schedulingService.getResourceAddLoad(this.moduleId, this.workFlowCategoryId, this.EntityCategoryId).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8782; });
            workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
        });
    };
    ResourceScheduling.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Resource";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Resource", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.schedulingService.getResourceEditLoad(this.inputItems.selectedIds[0], this.moduleId, this.workFlowCategoryId, this.EntityCategoryId).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                var workTypeField = contextObj.fieldDetailsAdd1.find(function (item) { return item.ReportFieldId === 8782; });
                workTypeField.IsEnabled = contextObj.isApprovalProcessSubscribed;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    ResourceScheduling.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            this.enableMenu = [1, 2, 3];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ResourceScheduling.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Resource to delete", 2);
        }
        else {
            this.schedulingService.CheckResourceinUse(this.inputItems.selectedIds).subscribe(function (resultData) {
                if (resultData.Data == 1) {
                    contextObj.notificationService.ShowToaster("Selected Resource in use, cannot be deleted", 2);
                }
                else {
                    contextObj.showSlide = true;
                }
            });
        }
    };
    ResourceScheduling.prototype.deleteResource = function () {
        var contextObj = this;
        contextObj.schedulingService.postResourceDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("Selected Resource deleted", 3);
                    contextObj.notificationService.ShowToaster("No Resources exist", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Selected Resource deleted", 3);
            }
            else if (resultData["Data"].Message == "Already in use") {
                contextObj.notificationService.ShowToaster("Selected Resource in use, cannot be deleted", 5);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Resource in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    };
    ResourceScheduling.prototype.onSort = function (objGrid) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataLoad();
    };
    ResourceScheduling.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteResource();
    };
    ResourceScheduling.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ResourceScheduling.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ResourceScheduling = __decorate([
        core_1.Component({
            selector: 'resource-scheduling',
            templateUrl: './app/Views/Scheduling/General Settings/resources.html',
            directives: [list_component_1.ListComponent, fieldGeneration_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, grid_component_1.GridComponent, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, resources_add_edit_1.ResourcesAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, scheduling_service_1.SchedulingService, General_1.GeneralFunctions, General_1.GeneralFunctions])
    ], ResourceScheduling);
    return ResourceScheduling;
}());
exports.ResourceScheduling = ResourceScheduling;
//# sourceMappingURL=resources.js.map