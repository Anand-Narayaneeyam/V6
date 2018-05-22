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
var card_component_1 = require('../../../Framework/Whatever/Card/card.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var space_service_1 = require('../../../Models/Space/space.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var field_component_1 = require('../../../Framework/Whatever/Card/field.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var new_space_resources_1 = require('./new-space_resources');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var SpaceResourceListComponent = (function () {
    function SpaceResourceListComponent(spaceService, notificationService, generFun) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.showSlide = false;
        this.position = "top-right";
        this.selectedTab = 0;
        this.newResourceTab = false;
        this.pageIndex = 0;
        this.sortCol = "[Resource Type]";
        this.sortDir = "ASC";
        this.blnShowSort = true;
        this.success = "";
        this.selIds = new Array();
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        this.gridcount = 8;
        this.enableMenu = [0, 1];
        this.isDeleteVisible = false;
        this.spaceResourceCount = new core_1.EventEmitter();
    }
    SpaceResourceListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.isDeleteVisible = false;
        this.loadData();
    };
    SpaceResourceListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["selectedId"] && changes["selectedId"]["currentValue"] != changes["selectedId"]["previousValue"]) {
        }
    };
    SpaceResourceListComponent.prototype.loadData = function () {
        var contextObj = this;
        this.spaceService.getSpaceResourceColumnData().subscribe(function (resultData) {
            contextObj.fieldSpaceKey = resultData["Data"].find(function (el) { return el.ReportFieldId === 782; });
            contextObj.fieldRoomNo = resultData["Data"].find(function (el) { return el.ReportFieldId === 793; });
            if (contextObj.SpaceData) {
                contextObj.fieldSpaceKey["FieldValue"] = contextObj.SpaceData["Space Key"];
                contextObj.fieldRoomNo["FieldValue"] = contextObj.SpaceData["Room No."];
            }
            var removeArr = [782, 793];
            contextObj.fields = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
        });
        this.spaceService.getSpaceResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Resources added", 2);
                contextObj.blnShowSort = false;
            }
            else {
                contextObj.enableMenu = [0, 1];
                contextObj.blnShowSort = true;
            }
        });
    };
    SpaceResourceListComponent.prototype.onSorting = function (event) {
        var contextObj = this;
        this.sortDir = event["sortDirection"];
        this.sortCol = event["selectedField"];
        this.spaceService.sortSpaceResource(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [0, 1];
            }
        });
    };
    SpaceResourceListComponent.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        var contextObj = this;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    };
    SpaceResourceListComponent.prototype.onTabClose = function (event) {
        this.newResourceTab = false;
        this.selectedTab = event[0];
    };
    SpaceResourceListComponent.prototype.loadTabContent = function () {
        var contextObj = this;
        this.localselection = 1;
        contextObj.newResourceTab = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 50);
    };
    SpaceResourceListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                this.loadTabContent();
                break;
            case 1:
                this.deleteResources(this.selIds);
                break;
        }
    };
    SpaceResourceListComponent.prototype.deleteResources = function (resourceIds) {
        if (resourceIds.length > 0) {
            this.showSlide = !this.showSlide;
        }
        else {
            this.notificationService.ShowToaster("Select Resource(s)", 2);
        }
    };
    SpaceResourceListComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        var arrayList = new Array();
        for (var i = 0; i < contextObj.selIds.length; i++) {
            arrayList.push({
                ReportFieldId: 656,
                Value: this.selIds[i].toString()
            });
        }
        //var fieldobj = new Array<ReportFieldArray>();
        //fieldobj.push({
        //    ReportFieldId: 665,
        //    Value: this.selectedId.toString()
        //});
        this.showSlide = !this.showSlide;
        this.spaceService.postResourcesDelete(JSON.stringify(arrayList), this.selectedId).subscribe(function (resultData) {
            contextObj.success = resultData["Data"].Message;
            if (resultData["Data"].StatusId == "1") {
                contextObj.notificationService.ShowToaster("Selected Resource(s) deleted", 3);
            }
        });
        this.spaceService.getSpaceResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.blnShowSort = false;
            }
            contextObj.toUpdateSpaceRowData(contextObj.selectedId, contextObj.totalItems);
        });
    };
    SpaceResourceListComponent.prototype.onDelete = function (e) {
        this.deleteResources(this.selIds);
    };
    SpaceResourceListComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    SpaceResourceListComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    SpaceResourceListComponent.prototype.submitSuccess = function (event) {
        var contextObj = this;
        if (event["status"] == "success") {
            this.spaceService.getSpaceResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
                contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                if (contextObj.totalItems > 0) {
                    contextObj.enableMenu = [0, 1];
                    contextObj.blnShowSort = true;
                }
                contextObj.toUpdateSpaceRowData(contextObj.selectedId, contextObj.totalItems);
            });
        }
    };
    SpaceResourceListComponent.prototype.toUpdateSpaceRowData = function (selectedId, count) {
        var contextObj = this;
        contextObj.spaceResourceCount.emit({
            spaceId: selectedId,
            resourceCount: count
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceResourceListComponent.prototype, "spaceResourceCount", void 0);
    SpaceResourceListComponent = __decorate([
        core_1.Component({
            selector: 'spaceResourceList',
            templateUrl: './app/Views/Space/Space Data/spaceResourceList.html',
            directives: [submenu_component_1.SubMenu, sort_component_1.Sorting, paging_component_1.PagingComponent, field_component_1.FieldComponent, list_component_1.ListComponent, card_component_1.CardComponent, notify_component_1.Notification, labelcomponent_component_1.LabelComponent, search_component_1.searchBox, tabs_component_1.TabsComponent, tab_component_1.TabComponent, new_space_resources_1.NewResourcesComponent, slide_component_1.SlideComponent],
            providers: [space_service_1.SpaceService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'SpaceData']
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SpaceResourceListComponent);
    return SpaceResourceListComponent;
}());
exports.SpaceResourceListComponent = SpaceResourceListComponent;
//# sourceMappingURL=spaceResourceList.js.map