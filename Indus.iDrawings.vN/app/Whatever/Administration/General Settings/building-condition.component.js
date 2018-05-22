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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var BuildingConditionComponent = (function () {
    function BuildingConditionComponent(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.enableMenu = [1];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 6193
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 6194
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 6195
            }
        ];
        this.showSlide = false;
        this.slidewidth = 250;
        this.showaddedit = false;
        this.showslide = false;
        this.slideTitle = "";
        this.ConfirmDeleteMsg = "";
        this.slideType = "";
        this.selectedId = 0;
    }
    BuildingConditionComponent.prototype.ngOnInit = function () {
        this.getBuildingConditionListFields();
        this.getBuildingConditionList();
    };
    BuildingConditionComponent.prototype.onSubMenuChange = function (event) {
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
    BuildingConditionComponent.prototype.onSort = function (objGrid) {
        this.getBuildingConditionList();
    };
    BuildingConditionComponent.prototype.addClick = function () {
        this.selectedId = 0;
        this.showaddedit = true;
        this.showSlide = true;
        this.slideTitle = "New Building Condition";
        this.slideType = "dialog";
        this.btnName = "Save";
        this.getAddFields();
    };
    BuildingConditionComponent.prototype.editClick = function () {
        this.selectedId = this.inputItems.selectedIds[0];
        this.showaddedit = true;
        this.showSlide = true;
        this.slideTitle = "Edit Building Condition";
        this.slideType = "dialog";
        this.btnName = "Save Changes";
        this.getEditFields(this.inputItems.selectedIds[0]);
    };
    BuildingConditionComponent.prototype.deleteClick = function () {
        if (this.inputItems.rowData.InUse == 0) {
            this.selectedId = this.inputItems.selectedIds[0];
            this.showaddedit = false;
            this.showSlide = true;
            this.slideTitle = "iDrawings V6";
            this.slideType = "notification";
            this.ConfirmDeleteMsg = "Are you sure you want to delete the selected Building Condition?";
        }
        else {
            this.notificationService.ShowToaster("Selected Building Condition in use, can't be deleted", 2);
            this.showSlide = false;
        }
    };
    BuildingConditionComponent.prototype.getBuildingConditionListFields = function () {
        var contextObj = this;
        this.administrationService.getBuildingConditionGridFields().subscribe(function (resultData) {
            debugger;
            contextObj.fieldObject = resultData.Data;
        });
        return;
    };
    BuildingConditionComponent.prototype.getBuildingConditionList = function () {
        var contextObj = this;
        this.administrationService.getBuildingConditionGridData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            debugger;
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Building Conditions exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    BuildingConditionComponent.prototype.getAddFields = function () {
        debugger;
        var contextObj = this;
        var selId = 0;
        this.administrationService.getBuildingConditionAddEditFields(selId).subscribe(function (resultData) {
            debugger;
            contextObj.fieldObjAdd = resultData.Data;
        });
        return;
    };
    BuildingConditionComponent.prototype.getEditFields = function (selId) {
        debugger;
        var contextObj = this;
        this.administrationService.getBuildingConditionAddEditFields(selId).subscribe(function (resultData) {
            debugger;
            contextObj.fieldObjAdd = resultData.Data;
        });
        return;
    };
    BuildingConditionComponent.prototype.onSubmitData = function (event) {
        event.fieldobject = JSON.parse(event.fieldobject);
        event.fieldobject = event.fieldobject.filter(function (item) {
            return item.ReportFieldId != 6691;
        });
        var context = this;
        if (context.selectedId == 0) {
            this.administrationService.postBuildingConditionInsert(JSON.stringify(event.fieldobject)).subscribe(function (resultData) {
                debugger;
                switch (resultData["Data"].StatusId) {
                    case 1:
                        context.notificationService.ShowToaster("Building Condition added", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        context.showaddedit = false;
                        context.showSlide = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Building Condition already exists", 2);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            context.notificationService.ShowToaster("Building Condition already exists", 2);
                        }
                        break;
                    case 0:
                        context.showaddedit = false;
                        context.showSlide = false;
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }
            });
        }
        else {
            this.administrationService.postBuildingConditionUpdate(JSON.stringify(event.fieldobject), context.selectedId).subscribe(function (resultData) {
                debugger;
                switch (resultData["Data"].StatusId) {
                    case 1:
                        context.notificationService.ShowToaster("Building Condition updated", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        context.showaddedit = false;
                        context.showSlide = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Building Condition already exists", 2);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            context.notificationService.ShowToaster("Building Condition already exists", 2);
                        }
                        break;
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        context.showaddedit = false;
                        context.showSlide = false;
                        break;
                }
            });
        }
        debugger;
    };
    BuildingConditionComponent.prototype.yesOnClick = function (event) {
        var context = this;
        var selId = this.inputItems.selectedIds[0];
        this.administrationService.postBuildingConditioDelete(selId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 1:
                    context.showaddedit = false;
                    context.showSlide = false;
                    context.notificationService.ShowToaster("Selected Building Condition deleted", 3);
                    var retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                    context.itemsSource = retUpdatedSrc["itemSrc"];
                    context.totalItems = retUpdatedSrc["itemCount"];
                    if (context.itemsSource.length < 1) {
                        context.enableMenu = [1];
                    }
                    break;
                case 0:
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    context.showaddedit = false;
                    context.showSlide = false;
                    break;
                case 3:
                    context.notificationService.ShowToaster("Selected Building Condition in use, can't be deleted", 2);
                    context.showaddedit = false;
                    context.showSlide = false;
                    break;
            }
        });
    };
    BuildingConditionComponent.prototype.updateGrid = function (event, selId) {
        var retUpdatedSrc;
        var context = this;
        context.refreshgrid = [];
        if (selId == 0) {
            debugger;
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.itemsSource = retUpdatedSrc["itemSrc"];
            context.totalItems = retUpdatedSrc["itemCount"];
            if (context.totalItems > 0) {
                context.enableMenu = [1, 2, 3];
            }
        }
        else {
            debugger;
            context.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }
    };
    BuildingConditionComponent.prototype.closeSlide = function (value) {
        this.showSlide = value.value;
        this.showaddedit = false;
    };
    BuildingConditionComponent = __decorate([
        core_1.Component({
            selector: 'building-condition',
            templateUrl: './app/Views/Administration/General Settings/building-condition.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, dropdownlistcomponent_component_1.DropDownListComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], BuildingConditionComponent);
    return BuildingConditionComponent;
}());
exports.BuildingConditionComponent = BuildingConditionComponent;
//# sourceMappingURL=building-condition.component.js.map