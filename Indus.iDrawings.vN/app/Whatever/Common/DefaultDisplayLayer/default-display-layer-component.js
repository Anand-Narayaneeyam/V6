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
var General_1 = require('../../../Models/Common/General');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var common_service_1 = require('../../../Models/Common/common.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var DefaultDisplayLayerComponent = (function () {
    function DefaultDisplayLayerComponent(notificationService, genFun, commonService, administrationService) {
        this.notificationService = notificationService;
        this.genFun = genFun;
        this.commonService = commonService;
        this.administrationService = administrationService;
        this.inputItems = { dataKey: "Id", allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", selectioMode: "single" };
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
        this.rptfieldIdValue = [];
        this.isAddFalg = false;
        this.isDeleteFalg = false;
        this.dynamicSlideTitle = "";
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
    DefaultDisplayLayerComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.commonService.getDefaultDrawingLayerColms().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            contextObj.fieldObjAdd = JSON.parse(JSON.stringify(resultData["Data"]));
            contextObj.refAddFieldObj = JSON.stringify(resultData["Data"]);
        });
        this.dataLoad(1, contextObj);
    };
    DefaultDisplayLayerComponent.prototype.dataLoad = function (target, context) {
        var arrayList = new Array();
        arrayList.push({
            ReportFieldId: 501,
            Value: context.ModuleId
        });
        context.commonService.getDefaultDrawingLayerListData(JSON.stringify(arrayList), context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context.notificationService.ShowToaster("No Default Display Layer exist", 2);
                context.enableMenu = [1];
            }
        });
    };
    DefaultDisplayLayerComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    DefaultDisplayLayerComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    DefaultDisplayLayerComponent.prototype.onSubMenuChange = function (event) {
        this.pageTitle = "";
        this.showaddedit = false;
        switch (event.value) {
            case 1:
            case 2:
                this.addEditSpaceFunClick(event.value);
                break;
            case 3:
                this.slideType = "notification";
                this.deleteSpaceFunClick();
                break;
        }
    };
    DefaultDisplayLayerComponent.prototype.addEditSpaceFunClick = function (target) {
        var contextObj = this;
        if (target == 2) {
            if (this.inputItems.rowData['IsDefaultLayer'] == 1) {
                this.notificationService.ShowToaster(this.inputItems.rowData['LayerName'] + " cannot be edited, since it is an iDrawings Layer", 2);
                return;
            }
            else if (this.inputItems.rowData['IsEditable'] == 0) {
                this.notificationService.ShowToaster(this.inputItems.rowData['LayerName'] + " cannot be edited, since it is a System Default Layer", 2);
                return;
            }
            else {
                this.selectedId = this.inputItems.selectedIds[0];
                //  this.pageTitle = "Edit Default Display Layer";
                this.dynamicSlideTitle = "Edit Default Display Layer";
                this.btnName = "Save Changes";
                this.selectedId = this.inputItems.selectedIds[0];
                this.fieldObjAdd.find(function (item) {
                    if (item.FieldId == 2859)
                        item.FieldValue = contextObj.inputItems.rowData["Layer Name"];
                    return true;
                });
                this.showaddedit = true;
            }
        }
        else {
            // this.pageTitle = "New Default Display Layer";
            this.fieldObjAdd = JSON.parse(contextObj.refAddFieldObj);
            this.dynamicSlideTitle = "New Default Display Layer";
            this.btnName = "Save";
            this.selectedId = 0;
            this.fieldObjAdd.find(function (item) {
                if (item.FieldId == 2859)
                    item.FieldValue = "";
                return true;
            });
            this.showaddedit = true;
        }
    };
    DefaultDisplayLayerComponent.prototype.deleteSpaceFunClick = function () {
        var contextObj = this;
        if (this.inputItems.rowData['IsDefaultLayer'] == 1) {
            this.notificationService.ShowToaster(this.inputItems.rowData['LayerName'] + " cannot be deleted, since it is an iDrawings Layer", 2);
            return;
        }
        else if (this.inputItems.rowData['IsEditable'] == 0) {
            this.notificationService.ShowToaster(this.inputItems.rowData['LayerName'] + " cannot be edited, since it is a System Default Layer", 2);
            return;
        }
        else {
            this.slideTitle = "iDrawings V6";
            this.showaddedit = false;
            this.ConfirmDeleteMsg = "Are you sure you want to delete the selected Default Display Layer?";
            this.showslide = true;
            this.isDeleteFalg = true;
            this.isAddFalg = false;
            this.rptfieldIdValue = [];
            if (this.inputItems.rowData["UserId"] == null) {
                this.rptfieldIdValue.push({
                    ReportFieldId: 900221,
                    Value: false
                });
            }
            else {
                this.rptfieldIdValue.push({
                    ReportFieldId: 900221,
                    Value: true
                });
            }
            this.rptfieldIdValue.push({
                ReportFieldId: 501,
                Value: this.ModuleId
            });
            this.rptfieldIdValue.push({
                ReportFieldId: 502,
                Value: this.inputItems.rowData["Layer Name"]
            });
        }
    };
    DefaultDisplayLayerComponent.prototype.onSubmitData = function (event) {
        var context = this;
        this.rptfieldIdValue = [];
        this.rptfieldIdValue.push({
            ReportFieldId: 502,
            Value: JSON.parse(event["fieldobject"])[0].Value
        });
        this.rptfieldIdValue.push({
            ReportFieldId: 501,
            Value: this.ModuleId
        });
        if (this.btnName == 'Save') {
            this.slideType = "notification";
            this.slideTitle = "iDrawings V6";
            this.ConfirmDeleteMsg = "Do you want to save this as Default Settings?";
            this.isAddFalg = true;
            this.showslide = true;
            ;
            this.isDeleteFalg = false;
        }
        else if (this.btnName == 'Save Changes') {
            if (this.inputItems.rowData["UserId"] == null) {
                this.rptfieldIdValue.push({
                    ReportFieldId: 900221,
                    Value: false
                });
            }
            else {
                this.rptfieldIdValue.push({
                    ReportFieldId: 900221,
                    Value: true
                });
            }
            this.commonService.UpdateDefaultDrawingLayer(JSON.stringify(this.rptfieldIdValue), this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 1:
                        context.notificationService.ShowToaster("Default Display Layer updated", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        //  context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                        context.showaddedit = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Default Layer Name already exists", 5);
                        }
                        break;
                }
                context.showslide = false;
                // context.showaddedit = false; 
                context.rptfieldIdValue = [];
            });
        }
    };
    DefaultDisplayLayerComponent.prototype.updateGrid = function (event, selId) {
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
    };
    DefaultDisplayLayerComponent.prototype.yesOnClick = function ($event) {
        var contextObj = this;
        if (this.isAddFalg == true) {
            this.rptfieldIdValue.push({
                ReportFieldId: 900221,
                Value: false
            });
            this.commonService.AddDefaultDrawingLayer(JSON.stringify(this.rptfieldIdValue), 0).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("Default Display Layer added", 3);
                        contextObj.updateGrid({ "returnData": resultData["Data"].Data }, contextObj.selectedId);
                        //  contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;                 
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Default Layer Name already exists", 5);
                        }
                        break;
                }
                contextObj.showslide = false;
                contextObj.isAddFalg = false;
                contextObj.isDeleteFalg = false;
                contextObj.rptfieldIdValue = [];
            });
        }
        else if (this.isDeleteFalg == true) {
            this.commonService.deleteDefaultDrawingLayer(JSON.stringify(this.rptfieldIdValue), 0).subscribe(function (resultData) {
                if (resultData["Data"].StatusId == 1) {
                    var retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.itemSource.length < 1) {
                        contextObj.enableMenu = [1];
                        contextObj.notificationService.ShowToaster("No Default Display Layer exist", 2);
                    }
                    contextObj.showslide = false;
                    contextObj.notificationService.ShowToaster("Default Display Layer deleted", 3);
                }
            });
        }
    };
    DefaultDisplayLayerComponent.prototype.closeSlide = function (event) {
        this.showslide = false;
        this.isAddFalg = false;
        this.isDeleteFalg = false;
        this.showaddedit = false;
        this.rptfieldIdValue = [];
    };
    DefaultDisplayLayerComponent.prototype.noOnClick = function ($event) {
        var contextObj = this;
        if (this.isAddFalg == true) {
            this.rptfieldIdValue.push({
                ReportFieldId: 900221,
                Value: true
            });
            this.commonService.AddDefaultDrawingLayer(JSON.stringify(this.rptfieldIdValue), 0).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("Default Display Layer added", 3);
                        contextObj.updateGrid({ "returnData": resultData["Data"].Data }, contextObj.selectedId);
                        //  contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Default Layer Name already exists", 5);
                        }
                        break;
                }
                contextObj.showslide = false;
                contextObj.isAddFalg = false;
                contextObj.isDeleteFalg = false;
                contextObj.rptfieldIdValue = [];
            });
        }
        else
            this.showslide = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DefaultDisplayLayerComponent.prototype, "ModuleId", void 0);
    DefaultDisplayLayerComponent = __decorate([
        core_1.Component({
            selector: 'default-display-layer',
            templateUrl: './app/Views/Common/DefaultDisplayLayer/default-display-layer-component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, fieldGeneration_component_1.FieldComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, common_service_1.CommonService, administration_service_1.AdministrationService],
            inputs: ["ModuleId"]
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, General_1.GeneralFunctions, common_service_1.CommonService, administration_service_1.AdministrationService])
    ], DefaultDisplayLayerComponent);
    return DefaultDisplayLayerComponent;
}());
exports.DefaultDisplayLayerComponent = DefaultDisplayLayerComponent;
//# sourceMappingURL=default-display-layer-component.js.map