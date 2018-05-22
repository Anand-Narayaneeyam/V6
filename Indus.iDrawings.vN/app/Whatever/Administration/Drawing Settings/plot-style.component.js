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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var plotstyleadd_component_1 = require('./plotstyleadd.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var PlotStyleComponent = (function () {
    function PlotStyleComponent(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        //inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Style Name]", sortDir: "ASC" }; 
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Style Name]' };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.pageTitle = '';
        this.enableMenu = [1, 2, 3];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        var contextObj = this;
        this.administrationService.getPlotStyleColumns().subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                contextObj.fieldObject = (result["Data"]);
            }
        });
        this.dataLoad(1, contextObj);
    }
    PlotStyleComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    PlotStyleComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    PlotStyleComponent.prototype.dataLoad = function (target, context) {
        context.administrationService.getPlotStyleData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (result) {
            context.totalItems = result["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                context.notificationService.ShowToaster("No Plot Style Settings exist", 2);
                context.enableMenu = [1];
            }
        });
    };
    PlotStyleComponent.prototype.onSubMenuChange = function (event) {
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
    PlotStyleComponent.prototype.addClick = function () {
        var contextObj = this;
        contextObj.action = "add";
        contextObj.btnName = "Save";
        this.pageTitle = "New Plot Style";
        contextObj.administrationService.loadPlotStyleAddEdit(contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
            }
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    PlotStyleComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Plot Style";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            console.log("editid", this.inputItems.selectedIds[0]);
            this.administrationService.loadPlotStyleAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                if (contextObj.generFun.checkForUnhandledErrors(result)) {
                    var retItem = result["Data"].find(function (item) {
                        return item.ReportFieldId === 8341; //chkbx
                    });
                    contextObj.fieldDetailsAdd1 = contextObj.findDataObj(retItem.FieldValue, result["Data"]);
                    //contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
            });
        }
    };
    PlotStyleComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    PlotStyleComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        this.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
        this.itemsSource = retUpdatedSrc["itemSrc"];
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    //slide events/////
    PlotStyleComponent.prototype.okDelete = function (event) {
        this.deletePltStyle();
        this.showSlide = !this.showSlide;
    };
    PlotStyleComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    PlotStyleComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    //grid inline events
    PlotStyleComponent.prototype.inlineAdd = function (event) {
        var contextObj = this;
        var contextObj = this;
        contextObj.administrationService.InlineAddUpdatePlotStyle(event, contextObj.inputItems.selectedIds[0], 1).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Plot Style added", 3);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Style Name already exists", 5);
                        }
                        break;
                }
            }
        });
    };
    PlotStyleComponent.prototype.inlineEdit = function (event) {
        var contextObj = this;
        contextObj.administrationService.InlineAddUpdatePlotStyle(event, contextObj.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Plot Style details updated", 3);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Style Name already exists", 5);
                        }
                        break;
                }
            }
        });
    };
    PlotStyleComponent.prototype.inlineDelete = function (event) {
        this.deletePltStyle();
    };
    PlotStyleComponent.prototype.deletePltStyle = function () {
        var contextObj = this;
        contextObj.administrationService.deletePlotStyle(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                else {
                    contextObj.enableMenu = [1, 2, 3];
                }
                contextObj.notificationService.ShowToaster("Selected Plot Style Setting deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Plot Style Setting in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    PlotStyleComponent.prototype.findDataObj = function (objlinChecked, data) {
        //lineweight = 4442
        data.find(function (item) {
            if (item.ReportFieldId == 4442) {
                if (objlinChecked == "True") {
                    item.IsEnabled = false;
                    item.FieldValue = "0";
                }
                else {
                    item.IsEnabled = true;
                }
            }
            return item.ReportFieldId === 4442;
        });
        return data;
    };
    PlotStyleComponent = __decorate([
        core_1.Component({
            selector: 'plot-style',
            templateUrl: './app/Views/Administration/Drawing Settings/plot-style.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, checkboxcomponent_component_1.CustomCheckBoxComponent, plotstyleadd_component_1.PlotStyleAddComponent, slide_component_1.SlideComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], PlotStyleComponent);
    return PlotStyleComponent;
}());
exports.PlotStyleComponent = PlotStyleComponent;
//# sourceMappingURL=plot-style.component.js.map