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
var space_service_1 = require('../../../Models/Space/space.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var spacestandard_AddEdit_component_1 = require('./spacestandard-AddEdit.component');
var SpaceStandardComponent = (function () {
    function SpaceStandardComponent(spaceService, administrationService, generFun, notificationService, getData) {
        this.spaceService = spaceService;
        this.administrationService = administrationService;
        this.generFun = generFun;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 30;
        this.itemsPerPage = 10;
        this.types = false;
        this.submitSuccess = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "privilegeId": 364
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "privilegeId": 365
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "privilegeId": 366
            }
        ];
        this.addCard = false;
        this.Position = "top-right";
        this.width = 300;
        this.change = false;
        this.showSlide = false;
        this.gridcount = 20;
        this.enableMenu = [];
        this.selIds = new Array();
        this.message = "";
        this.entity = false;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.pageIndex = 0;
        this.Id = 11;
    }
    SpaceStandardComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.types = true;
        this.enableMenu = [1, 2, 3];
        var callBack = function (data) {
            this.menuData = data;
        };
        this.generFun.GetPrivilegesOfPage(this.menuData, callBack, 104, this.administrationService, this.menuData.length);
        this.spaceService.getSpaceStandardFields().subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                for (var i = 0; i < resultData["Data"].length; i++) {
                    resultData.Data[i]["Width"] = 200;
                }
                contextObj.fields = resultData["Data"];
            }
        });
        this.spaceService.getSpaceStandard(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData1) {
            contextObj.spacestandardsource = JSON.parse(resultData1["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData1["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData1["Data"]["RowsPerPage"]);
            if (contextObj.totalItems <= 0) {
                contextObj.enableMenu = [1];
                contextObj.notificationService.ShowToaster("No Space Standards exist", 2);
            }
        });
    };
    SpaceStandardComponent.prototype.onSorting = function (event) {
        console.log("sort action");
    };
    SpaceStandardComponent.prototype.onSubMenuChange = function (event, id) {
        if (event.value == 1) {
            this.menuAddClick();
        }
        else if (event.value == 2) {
            this.menuEditClick();
        }
        else if (event.value == 3) {
            this.menuDeleteClick();
        }
    };
    SpaceStandardComponent.prototype.menuAddClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Space Standard";
        this.spaceService.loadSpaceStandardAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    SpaceStandardComponent.prototype.menuEditClick = function () {
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Space Standard";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.spaceService.loadSpaceStandardAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    SpaceStandardComponent.prototype.menuDeleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            var contextObj = this;
            var fieldObj = new Array();
            fieldObj.push({ ReportFieldId: 173, Value: "160" });
            this.spaceService.CheckIsEntityReferenceFound(fieldObj, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.entity = resultData["Data"];
                if (resultData["Data"] == false) {
                    contextObj.message = "Are you sure you want to delete the selected Space Standard?";
                    contextObj.width = 300;
                    contextObj.showSlide = !this.showSlide;
                }
                else {
                    contextObj.notificationService.ShowToaster("Selected Space Standard is in use, cannot be deleted.", 5);
                }
            });
        }
    };
    SpaceStandardComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.spaceService.getSpaceStandard(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.spacestandardsource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems <= 0) {
                contextObj.notificationService.ShowToaster("No Space Standards exist", 2);
            }
        });
    };
    ;
    SpaceStandardComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.spaceService.getSpaceStandard(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.spacestandardsource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems <= 0) {
                contextObj.notificationService.ShowToaster("No Space Standards exist", 2);
            }
        });
    };
    SpaceStandardComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        if (contextObj.entity == false) {
            this.spaceService.postSpaceStandardDelete(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"]["StatusId"] == 1) {
                    var retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.spacestandardsource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.spacestandardsource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    contextObj.notificationService.ShowToaster("Selected Space Standard deleted", 3);
                }
                else {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Selected Space Standard is in use, cannot be deleted", 5);
                            }
                            break;
                    }
                }
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Selected Space Standard is in use, cannot be deleted", 5);
        }
        this.showSlide = !this.showSlide;
    };
    SpaceStandardComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    SpaceStandardComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    SpaceStandardComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.spacestandardsource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.spacestandardsource = retUpdatedSrc["itemSrc"];
            contextObj.enableMenu = [1, 2, 3];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.spacestandardsource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = false;
    };
    SpaceStandardComponent = __decorate([
        core_1.Component({
            selector: 'space-standard',
            templateUrl: 'app/Views/Space/General Settings/spacestandard.html',
            directives: [slide_component_1.SlideComponent, list_component_1.ListComponent, field_component_1.FieldComponent, card_component_1.CardComponent, notify_component_1.Notification, submenu_component_1.SubMenu, paging_component_1.PagingComponent, sort_component_1.Sorting, grid_component_1.GridComponent, split_view_component_1.SplitViewComponent, spacestandard_AddEdit_component_1.SpaceStandardAddEditComponent],
            providers: [General_1.GeneralFunctions, http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, administration_service_1.AdministrationService, General_1.GeneralFunctions, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SpaceStandardComponent);
    return SpaceStandardComponent;
}());
exports.SpaceStandardComponent = SpaceStandardComponent;
//# sourceMappingURL=spacestandard.component.js.map