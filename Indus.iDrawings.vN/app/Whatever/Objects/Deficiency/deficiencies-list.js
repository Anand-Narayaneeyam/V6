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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var deficiencies_addedit_component_1 = require('./deficiencies-addedit.component');
var ListDeficiencyComponent = (function () {
    function ListDeficiencyComponent(generFun, objectsService, AdministrationService, notificationService, differs) {
        this.generFun = generFun;
        this.objectsService = objectsService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.differs = differs;
        this.showSlide = false;
        this.position = "top-right";
        this.slidewidth = 300;
        this.moduleId = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.hasFieldValue = false;
        this.gridcount = 1;
        this.isinUse = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Name]' };
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 4203
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 4204
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 4205
            }
        ];
        this.differ = differs.find({}).create(null);
    }
    ListDeficiencyComponent.prototype.ngOnInit = function () {
        this.enableMenu = [0];
        var contextObj = this;
        contextObj.objectsService.getDeficiencyFieldList().subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
            contextObj.dataLoad();
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 200, contextObj.AdministrationService, contextObj.menuData.length);
    };
    ListDeficiencyComponent.prototype.dataLoad = function () {
        var contextObj = this;
        this.objectsService.getDeficiencyList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2];
            }
            else {
                // contextObj.notificationService.ShowToaster("No Object Classes exist", 2);
                contextObj.notificationService.ShowToaster("No Deficiencies exist", 2);
                contextObj.enableMenu = [0];
            }
        });
    };
    ListDeficiencyComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.objectsService.getDeficiencyList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    ListDeficiencyComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.objectsService.getDeficiencyList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    ListDeficiencyComponent.prototype.onSubMenuChange = function (event) {
        this.menuClickValue = event.value;
        switch (event.value) {
            case 0:
                this.pageTitle = "New Deficiency";
                this.addClick();
                break;
            case 1:
                this.pageTitle = "Edit Deficiency";
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    };
    ListDeficiencyComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        this.objectsService.getDeficiencyFieldAddEdit(0, 1, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.DeficiencyAddEdit = resultData["Data"];
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ListDeficiencyComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        var compntCatgry = "";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.objectsService.getDeficiencyFieldAddEdit(this.inputItems.selectedIds[0], 2, this.objectCategoryId).subscribe(function (resultData) {
                contextObj.DeficiencyAddEdit = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    ListDeficiencyComponent.prototype.deleteClick = function () {
        var contextObj = this;
        var Isinuse;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            contextObj.objectsService.IsDeficiencyInuse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                Isinuse = resultData;
                if (Isinuse == 0) {
                    contextObj.message = "Are you sure you want to delete the selected Deficiency?";
                    contextObj.showSlide = !contextObj.showSlide;
                }
                else {
                    contextObj.notificationService.ShowToaster("Selected Deficiency is in use, cannot be deleted", 2);
                }
            });
        }
    };
    ListDeficiencyComponent.prototype.OnSuccessfulSubmit = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        var retUpdatedSrc;
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemsSource = retUpdatedSrc["itemSrc"];
            if (this.totalItems >= 1)
                contextObj.enableMenu = [0, 1, 2];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    ListDeficiencyComponent.prototype.deleteDeficiency = function () {
        var contextObj = this;
        contextObj.objectsService.postDeleteDeficiency(contextObj.inputItems.selectedIds[0], this.objectCategoryId, this.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Deficiency deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Deficiency is in use, cannot be deleted", 2);
                        }
                        break;
                }
            }
        });
    };
    ListDeficiencyComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteDeficiency();
    };
    ListDeficiencyComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ListDeficiencyComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ListDeficiencyComponent.prototype.loadControl = function (eventValue, contextObj, action) {
    };
    ListDeficiencyComponent.prototype.Successfulladd = function (event) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ListDeficiencyComponent.prototype, "objectCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ListDeficiencyComponent.prototype, "moduleId", void 0);
    ListDeficiencyComponent = __decorate([
        core_1.Component({
            selector: 'ListDeficiency',
            templateUrl: './app/Views/Objects/Deficiency/deficiencies-list.html',
            directives: [slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, deficiencies_addedit_component_1.DeficienciesAddEdit],
            providers: [http_1.HTTP_PROVIDERS, objects_service_1.ObjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, objects_service_1.ObjectsService, administration_service_1.AdministrationService, notify_service_1.NotificationService, core_1.KeyValueDiffers])
    ], ListDeficiencyComponent);
    return ListDeficiencyComponent;
}());
exports.ListDeficiencyComponent = ListDeficiencyComponent;
//# sourceMappingURL=deficiencies-list.js.map