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
var space_service_1 = require('../../../Models/Space/space.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var checkboxcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var General_1 = require('../../../Models/Common/General');
var NewResourcesComponent = (function () {
    function NewResourcesComponent(spaceService, notificationService, getData) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.isDdlResourceTypeLoaded = false;
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false };
    }
    NewResourcesComponent.prototype.ngAfterViewInit = function () {
        this.dataOption = 1;
        this.objectCategoryId = 16;
        var contextObj = this;
        this.alignContent = "horizontal";
        this.spaceService.getSpaceNewResourceColumnData().subscribe(function (resultData) {
            contextObj.ddlResourceType = resultData["Data"].find(function (el) { return el.ReportFieldId === 647; });
            var removeArr = [647];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
        });
        this.spaceService.getResourceType(this.objectCategoryId, this.dataOption).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"] != "") {
                if (contextObj.ddlResourceType["FieldId"] == 775) {
                    contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                    contextObj.ddlResourceType["FieldValue"] = "-1";
                }
                else {
                    if (contextObj.ddlResourceType["FieldId"] == 775) {
                        contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = null;
                        contextObj.ddlResourceType["FieldValue"] = "-1";
                        contextObj.notificationService.ShowToaster("No Resource Type defined", 2);
                    }
                }
            }
            contextObj.isDdlResourceTypeLoaded = true;
        });
    };
    NewResourcesComponent.prototype.onChangeResourceType = function (event) {
        this.resourceTypeId = event;
        this.onDataLoad();
    };
    NewResourcesComponent.prototype.onDataLoad = function () {
        var contextObj = this;
        if (this.isDdlResourceTypeLoaded == true) {
            this.spaceService.getSpaceNewResourceData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.resourceTypeId, contextObj.spaceId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Resources exist", 2);
                }
            });
        }
        this.itemsSource = [];
    };
    NewResourcesComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.onDataLoad();
    };
    NewResourcesComponent.prototype.insertSpaceResourcesList = function (event) {
        var contextObj = this;
        var hasSelectedIds = false;
        var arrayList = new Array();
        for (var i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                hasSelectedIds = true;
                arrayList.push({
                    ReportFieldId: 865,
                    Value: contextObj.itemsSource[i].Id.toString()
                });
            }
        }
        if (hasSelectedIds == true) {
            this.spaceService.postSubmitActionSpaceRsource(JSON.stringify(arrayList), contextObj.spaceId).subscribe(function (resultData) {
                if (resultData["Data"].StatusId > 0) {
                    contextObj.notificationService.ShowToaster("Resource added", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                }
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Select a Resource", 2);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NewResourcesComponent.prototype, "submitSuccess", void 0);
    NewResourcesComponent = __decorate([
        core_1.Component({
            selector: 'new-space_resources',
            templateUrl: './app/Views/Space/Space Data/new-space_resources.html',
            directives: [grid_component_1.GridComponent, submenu_component_1.SubMenu, dropdownlistcomponent_component_1.DropDownListComponent, checkboxcomponent_component_1.CustomCheckBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['spaceId']
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], NewResourcesComponent);
    return NewResourcesComponent;
}());
exports.NewResourcesComponent = NewResourcesComponent;
//# sourceMappingURL=new-space_resources.js.map