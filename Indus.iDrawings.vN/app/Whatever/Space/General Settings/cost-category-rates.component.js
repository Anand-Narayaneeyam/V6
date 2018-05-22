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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var General_1 = require('../../../Models/Common/General');
var space_service_1 = require('../../../models/space/space.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var addedit_cost_category_rates_1 = require('./addedit-cost-category-rates');
var CostCategoryRates = (function () {
    function CostCategoryRates(spaceService, notificationService, generFun) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.alignContent = "horizontal";
        this.itemsSource = null;
        this.fieldDetailsAddEdit = [];
        this.showSlide = false;
        this.position = "top-right";
        this.message = "Are you sure you want to delete the selected Cost Category Rate?";
        this.splitviewCostCategoryInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: false, selectioMode: 'single', allowEdit: false };
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
    CostCategoryRates.prototype.ngOnInit = function () {
        var contextObj = this;
        this.spaceService.getCostCategoryRtsColumns().subscribe(function (resultData) {
            console.log("resultData", resultData);
            contextObj.fieldObject = resultData["Data"];
            contextObj.ddlFieldObject = resultData["Data"].find(function (el) { return el.ReportFieldId === 742; });
            contextObj.fieldObject = resultData["Data"];
            for (var i = 0; i < resultData["Data"].length; i++) {
                var updatedData = new Array();
                contextObj.fieldObject = resultData["Data"].splice(2, 5);
                break;
            }
            var reportFieldArray = new Array();
            contextObj.ddlFieldObject.FieldValue = contextObj.SelectedCostCategoryId;
            reportFieldArray.push({
                ReportFieldId: 742,
                Value: contextObj.SelectedCostCategoryId
            });
            contextObj.ddlSelectedId = contextObj.SelectedCostCategoryId;
            contextObj.spaceService.getCostCategoryRtsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.enableMenu = [1, 2, 3];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Cost Category Rates exist", 2);
                    contextObj.enableMenu = [1];
                }
            });
        });
    };
    CostCategoryRates.prototype.ddlStyleNameChange = function (event) {
        var contextObj = this;
        if (event == "-1") {
            contextObj.notificationService.ShowToaster("Select a Cost Category", 2);
            contextObj.enableMenu = [];
            contextObj.itemsSource = null;
            contextObj.itemsPerPage = 0;
        }
        else {
            contextObj.ddlSelectedId = event;
            var reportFieldArray = new Array();
            reportFieldArray.push({
                ReportFieldId: 742,
                Value: event
            });
            contextObj.spaceService.getCostCategoryRtsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.enableMenu = [1, 2, 3];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Cost Category Rates exist", 2);
                    contextObj.enableMenu = [1];
                    contextObj.itemsSource = null;
                    contextObj.itemsPerPage = 0;
                }
            });
        }
    };
    CostCategoryRates.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        var reportFieldArray = new Array();
        reportFieldArray.push({
            ReportFieldId: 742,
            Value: contextObj.ddlSelectedId
        });
        contextObj.spaceService.getCostCategoryRtsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Cost Category Rates exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    CostCategoryRates.prototype.onSubMenuChange = function (event) {
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
    CostCategoryRates.prototype.addClick = function () {
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Cost Category Rate";
        var contextObj = this;
        this.fieldDetailsAddEdit = [];
        this.fieldDetailsAddEdit = this.fieldDetailsAddEdit.concat(this.fieldObject);
        this.splitviewCostCategoryInput.showSecondaryView = !this.splitviewCostCategoryInput.showSecondaryView;
        this.spaceService.AddCostCategoriesRates().subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
        });
    };
    CostCategoryRates.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Cost Category Rate";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            var reportFieldArray = new Array();
            contextObj.ddlFieldObject.FieldValue = contextObj.SelectedCostCategoryId;
            reportFieldArray.push({
                ReportFieldId: 742,
                Value: contextObj.SelectedCostCategoryId
            });
            this.spaceService.EditCostCategoriesRates(this.inputItems.selectedIds[0], JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewCostCategoryInput.showSecondaryView = !contextObj.splitviewCostCategoryInput.showSecondaryView;
            });
        }
    };
    CostCategoryRates.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Cost Category Rate to delete", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    CostCategoryRates.prototype.submitReturnData = function (event) {
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
        contextObj.splitviewCostCategoryInput.showSecondaryView = !contextObj.splitviewCostCategoryInput.showSecondaryView;
    };
    CostCategoryRates.prototype.deleteCostCategoryRate = function () {
        var contextObj = this;
        contextObj.spaceService.DeleteCostCategoryRate(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.itemsSource.length < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("Selected Cost Category Rate deleted", 3);
                    contextObj.notificationService.ShowToaster("No Cost Category Rates exist", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Selected Cost Category Rate deleted", 3);
            }
            else if (resultData["Data"].Message == "Already in use") {
                contextObj.notificationService.ShowToaster("Selected Cost Category Rate in use, cannot be deleted", 5);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Cost Category Rate in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    };
    CostCategoryRates.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteCostCategoryRate();
    };
    CostCategoryRates.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    CostCategoryRates.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CostCategoryRates.prototype, "SelectedCostCategoryId", void 0);
    CostCategoryRates = __decorate([
        core_1.Component({
            selector: 'cost-category-rates',
            templateUrl: 'app/Views/Space/General Settings/cost-category-rates.component.html',
            directives: [grid_component_1.GridComponent, split_view_component_1.SplitViewComponent, dropdownlistcomponent_component_1.DropDownListComponent, submenu_component_1.SubMenu, addedit_cost_category_rates_1.AddEditCostCategoryRatesComponent, slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], CostCategoryRates);
    return CostCategoryRates;
}());
exports.CostCategoryRates = CostCategoryRates;
//# sourceMappingURL=cost-category-rates.component.js.map