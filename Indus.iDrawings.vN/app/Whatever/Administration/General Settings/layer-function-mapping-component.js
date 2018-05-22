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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var General_1 = require('../../../Models/Common/General');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var LayerFunctionMappingsComponent = (function () {
    function LayerFunctionMappingsComponent(notificationService, genFun, administrationService) {
        this.notificationService = notificationService;
        this.genFun = genFun;
        this.administrationService = administrationService;
        this.inputItems = { dataKey: "DrawingLayerId", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.pageTitle = "";
        this.btnName = "Save";
        this.showaddedit = false;
        this.showslide = false;
        this.slideTitle = "";
        this.ConfirmDeleteMsg = "";
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
        this.enableMenu = [1, 2, 3];
        this.selectedId = 0;
        this.slideType = "";
    }
    LayerFunctionMappingsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.administrationService.getLayerFunctionMappingColms().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        this.dataLoad(1, contextObj);
    };
    LayerFunctionMappingsComponent.prototype.dataLoad = function (target, context) {
        context.administrationService.getLayerFunctionMappingListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                ;
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context.notificationService.ShowToaster("No Layer Functions exist", 2);
                context.enableMenu = [1];
            }
        });
    };
    LayerFunctionMappingsComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    LayerFunctionMappingsComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    LayerFunctionMappingsComponent.prototype.onSubMenuChange = function (event) {
        this.pageTitle = "";
        this.showaddedit = false;
        switch (event.value) {
            case 1:
            case 2:
                this.addEditClick(event.value);
                break;
            case 3:
                this.slideType = "notification";
                this.deleteClick();
                break;
        }
    };
    LayerFunctionMappingsComponent.prototype.addEditClick = function (target) {
        var spaceFunVal = "";
        var contextObj = this;
        if (target == 2) {
            this.selectedId = this.inputItems.selectedIds[0];
            this.pageTitle = "Edit Layer Function Mapping";
            this.btnName = "Save Changes";
        }
        else {
            this.pageTitle = "New Layer Function Mapping";
            this.btnName = "Save";
            this.selectedId = 0;
        }
        this.administrationService.loadLayerFunctionMappingAddEdit(this.selectedId, target).subscribe(function (resultData) {
            if (target == 2) {
                resultData["Data"].find(function (item) {
                    if (item.FieldId == 2850)
                        item.IsEnabled = false;
                });
            }
            contextObj.fieldObjAdd = resultData["Data"];
            contextObj.showaddedit = true;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    LayerFunctionMappingsComponent.prototype.deleteClick = function () {
        this.slideTitle = "iDrawings V6";
        this.showaddedit = false;
        this.ConfirmDeleteMsg = "Are you sure you want to delete the selected Layer Function Mapping?";
        this.showslide = true;
    };
    LayerFunctionMappingsComponent.prototype.onSubmitData = function (event, btnName) {
        var context = this;
        if (btnName == 'Save') {
            this.administrationService.AddLayerFunctionMapping(event["fieldobject"], 0).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 1:
                        context.notificationService.ShowToaster("Layer Function Mapping added", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        context.showslide = false;
                        context.showaddedit = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Mapping for the Drawing Layer already exists", 5);
                        }
                        break;
                }
            });
        }
        else if (btnName == 'Save Changes') {
            this.administrationService.UpdateLayerFunctionMapping(event["fieldobject"], this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 1:
                        context.notificationService.ShowToaster("Layer Function Mapping updated", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        context.showslide = false;
                        context.showaddedit = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Mapping for the Drawing Layer already exists", 5);
                        }
                        break;
                }
            });
        }
    };
    LayerFunctionMappingsComponent.prototype.updateGrid = function (event, selId) {
        this.refreshgrid = [];
        if (selId == 0) {
            var retUpdatedSrc = this.genFun.updateDataSource(this.itemSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemSource = retUpdatedSrc["itemSrc"];
            if (this.totalItems > 0) {
                this.enableMenu = [1, 2, 3];
            }
        }
        else {
            this.genFun.updateDataSource(this.itemSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LayerFunctionMappingsComponent.prototype.yesOnClick = function ($event) {
        var contextObj = this;
        this.administrationService.deleteLayerFunctionMapping(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                var retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.itemSource.length < 1) {
                    contextObj.notificationService.ShowToaster("No Layer Functions exist", 2);
                    contextObj.enableMenu = [1];
                }
                contextObj.showslide = false;
                contextObj.notificationService.ShowToaster("Selected Layer Function Mapping deleted", 3);
            }
        });
    };
    LayerFunctionMappingsComponent.prototype.closeSlide = function (event) {
        this.showslide = false;
    };
    LayerFunctionMappingsComponent = __decorate([
        core_1.Component({
            selector: 'layer-function-mapping',
            templateUrl: './app/Views/Administration/General Settings/layer-function-mapping-component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, fieldGeneration_component_1.FieldComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: [""]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], LayerFunctionMappingsComponent);
    return LayerFunctionMappingsComponent;
}());
exports.LayerFunctionMappingsComponent = LayerFunctionMappingsComponent;
//# sourceMappingURL=layer-function-mapping-component.js.map