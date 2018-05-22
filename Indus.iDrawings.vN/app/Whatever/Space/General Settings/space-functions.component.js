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
var space_service_1 = require('../../../Models/Space/space.service');
var General_1 = require('../../../Models/Common/General');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var SpaceFunctionsComponent = (function () {
    function SpaceFunctionsComponent(spaceService, notificationService, genFun) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.genFun = genFun;
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
    SpaceFunctionsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.spaceService.getSpaceFunctionColms().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            contextObj.fieldObjAdd = JSON.parse(JSON.stringify(resultData["Data"]));
        });
        this.dataLoad(1, contextObj);
    };
    SpaceFunctionsComponent.prototype.dataLoad = function (target, context) {
        context.spaceService.getSpaecFunctionListData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir).subscribe(function (resultData) {
            context.totalItems = resultData["Data"].DataCount;
            if (context.totalItems > 0) {
                context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (target == 1) {
                    context.itemsPerPage = resultData["Data"].RowsPerPage;
                }
            }
            else {
                context.notificationService.ShowToaster("No " + context.customSpacefnName + "s exist", 2);
                context.enableMenu = [1];
            }
        });
    };
    SpaceFunctionsComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    SpaceFunctionsComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    SpaceFunctionsComponent.prototype.onSubMenuChange = function (event) {
        this.pageTitle = "";
        this.showaddedit = false;
        switch (event.value) {
            case 1:
            case 2:
                this.showslide = true;
                this.slideType = "dialog";
                this.addEditSpaceFunClick(event.value);
                break;
            case 3:
                this.slideType = "notification";
                this.deleteSpaceFunClick();
                break;
        }
    };
    SpaceFunctionsComponent.prototype.addEditSpaceFunClick = function (target) {
        var spaceFunVal = "";
        if (target == 2) {
            this.selectedId = this.inputItems.selectedIds[0];
            this.slideTitle = "Edit " + this.customSpacefnName;
            this.btnName = "Save Changes";
            spaceFunVal = this.inputItems.rowData[this.customSpacefnName];
        }
        else {
            this.slideTitle = "New " + this.customSpacefnName;
            this.btnName = "Save";
            this.selectedId = 0;
            spaceFunVal = "";
        }
        this.fieldObjAdd.find(function (el) {
            if (el.FieldId == 2268) {
                el.FieldValue = spaceFunVal;
                return true;
            }
            else
                return false;
        });
        this.showaddedit = true;
    };
    SpaceFunctionsComponent.prototype.deleteSpaceFunClick = function () {
        this.slideTitle = "iDrawings V6";
        var context = this;
        this.showaddedit = false;
        var rptFldVal = [{ ReportFieldId: 173, Value: "158" }];
        this.spaceService.CheckIsEntityReferenceFound(rptFldVal, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"] == false)
                context.ConfirmDeleteMsg = "Are you sure you want to delete the selected " + context.customSpacefnName + "?";
            else
                context.ConfirmDeleteMsg = "Selected " + context.customSpacefnName + " is in use.Are you sure you want to delete the selected " + context.customSpacefnName + "?";
            context.showslide = true;
        });
    };
    SpaceFunctionsComponent.prototype.onSubmitData = function (event) {
        var context = this;
        this.spaceService.addUpdateSpaceFunction(this.selectedId, event["fieldobject"]).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 1:
                    var msg = "";
                    if (context.selectedId == 0) {
                        msg = " added";
                    }
                    else {
                        msg = " updated";
                    }
                    msg = context.customSpacefnName + msg;
                    context.notificationService.ShowToaster(msg, 3);
                    context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                    context.showslide = false;
                    context.showaddedit = false;
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        context.notificationService.ShowToaster(context.customSpacefnName + " already exists", 5);
                    }
                    break;
            }
        });
    };
    SpaceFunctionsComponent.prototype.updateGrid = function (event, selId) {
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
    SpaceFunctionsComponent.prototype.yesOnClick = function ($event) {
        var contextObj = this;
        this.spaceService.deleteSpaecFunction(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                var retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.itemSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.itemSource.length < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.showslide = false;
                contextObj.notificationService.ShowToaster(contextObj.customSpacefnName + " deleted", 3);
            }
        });
    };
    SpaceFunctionsComponent.prototype.closeSlide = function (event) {
        this.showslide = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceFunctionsComponent.prototype, "customSpacefnName", void 0);
    SpaceFunctionsComponent = __decorate([
        core_1.Component({
            selector: 'space-functions',
            templateUrl: './app/Views/Space/General Settings/space-functions.component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, fieldGeneration_component_1.FieldComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, space_service_1.SpaceService],
            inputs: ["customSpacefnName"]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SpaceFunctionsComponent);
    return SpaceFunctionsComponent;
}());
exports.SpaceFunctionsComponent = SpaceFunctionsComponent;
//# sourceMappingURL=space-functions.component.js.map