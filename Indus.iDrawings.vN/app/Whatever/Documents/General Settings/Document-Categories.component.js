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
var documents_service_1 = require('../../../Models/Documents/documents.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
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
var DocumentCategories_add_edit_1 = require('./DocumentCategories-add-edit');
var DocumentCategory = (function () {
    function DocumentCategory(notificationService, DocumentService, getData, generFun) {
        this.notificationService = notificationService;
        this.DocumentService = DocumentService;
        this.getData = getData;
        this.generFun = generFun;
        this.fieldDetailsAdd1 = [];
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowEdit: false, selectioMode: "single" };
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.totalItems = 0;
        this.showSlide = false;
        this.position = "top-right";
        this.slidewidth = 280;
        this.showSlideMsg = false;
        this.message = "Are you sure you want to delete the selected Document Category?";
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
    DocumentCategory.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.DocumentService.getdocumentCategoryFeilds().subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
            contextObj.getDocumentCategory(1);
        });
    };
    DocumentCategory.prototype.getDocumentCategory = function (target) {
        var contextObj = this;
        contextObj.DocumentService.getdocumentCategory(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                // contextObj.enableMenu = [1, 2];
                if (target == 1) {
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Document Categories exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    DocumentCategory.prototype.onSubMenuChange = function (event) {
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
    DocumentCategory.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Document Category";
        contextObj.DocumentService.DocumentCategoryAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    DocumentCategory.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Document Category";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document Category", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.DocumentService.DocumentCategoryAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    DocumentCategory.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Document Category to delete", 2);
        }
        else {
            contextObj.DocumentService.CheckDocumentCategoryInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData) {
                    contextObj.notificationService.ShowToaster("Selected Document Category in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    DocumentCategory.prototype.submitReturn = function (event) {
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
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    DocumentCategory.prototype.deleteDocumentCategory = function () {
        var contextObj = this;
        contextObj.DocumentService.postDocumentCategoryDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("Selected Document Category deleted", 3);
                    contextObj.notificationService.ShowToaster("No Document Categories exist", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Selected Document Category deleted", 3);
            }
            else if (resultData["Data"].Message == "Already in use") {
                contextObj.notificationService.ShowToaster("Selected Document Category in use, cannot be deleted", 5);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Document Category in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    };
    DocumentCategory.prototype.onSort = function (objGrid) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getDocumentCategory(0);
    };
    DocumentCategory.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.getDocumentCategory(0);
    };
    ;
    DocumentCategory.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteDocumentCategory();
    };
    DocumentCategory.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    DocumentCategory.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    DocumentCategory = __decorate([
        core_1.Component({
            selector: 'Document-Category',
            templateUrl: './app/Views/Documents/General Settings/Document-Categories.component.html',
            directives: [list_component_1.ListComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, grid_component_1.GridComponent, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, DocumentCategories_add_edit_1.DocumentCategoriesAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, documents_service_1.DocumentService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, documents_service_1.DocumentService, General_1.GeneralFunctions, General_1.GeneralFunctions])
    ], DocumentCategory);
    return DocumentCategory;
}());
exports.DocumentCategory = DocumentCategory;
//# sourceMappingURL=Document-Categories.component.js.map