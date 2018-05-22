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
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var objectData_listindrawing_component_1 = require('./objectData-listindrawing.component');
var floor_selection_component_1 = require('../../space/space data/floor-selection.component');
var ObjectDataComponentindrawing = (function () {
    function ObjectDataComponentindrawing(realpropertyservice, notificationService) {
        this.realpropertyservice = realpropertyservice;
        this.notificationService = notificationService;
        //pageTitle: string = "Data";
        //pagePath: string = " Assets / Drawings";
        this.selectedTab = 0;
        this.showZoomOnClick = new core_1.EventEmitter();
        this.showInDrawingOnClick = new core_1.EventEmitter();
        this.ObjectPlaceOnClick = new core_1.EventEmitter();
        this.ObjectDelinkOnClick = new core_1.EventEmitter();
        this.UpdatedSuccess = new core_1.EventEmitter();
        this.onSearchInDrawing = new core_1.EventEmitter();
        this.Attachmentcounts = new core_1.EventEmitter();
        this.ObjectDelinked = [];
        this.floorSelected = false;
        this.selectedDrawingIds = '';
        this.selectedDrawingIds = '';
    }
    ObjectDataComponentindrawing.prototype.ngOnInit = function () {
        this.selectedDrawingIds = '21';
        switch (this.moduleId) {
            case 6:
                this.objectCategoryId = 3;
                break;
            case 7:
                this.objectCategoryId = 1;
                break;
            case 8:
                this.objectCategoryId = 2;
                break;
            case 17:
                this.objectCategoryId = 8;
                break;
            case 18:
                this.objectCategoryId = 9;
                break;
            case 24:
                this.objectCategoryId = 20;
                break;
            case 25:
                this.objectCategoryId = 10;
                break;
            case 26:
                this.objectCategoryId = 11;
                break;
            case 27:
                this.objectCategoryId = 12;
                break;
        }
    };
    ObjectDataComponentindrawing.prototype.getSelectedTab = function (event) {
        this.selectedDrawingIds = '';
        this.selectedTab = event[0];
        this.floorSelected = false;
    };
    ObjectDataComponentindrawing.prototype.getSelectedIds = function (event) {
        this.selectedDrawingIds = '';
        for (var count = 0; count < event.SelectedIds.length; count++) {
            this.selectedDrawingIds = this.selectedDrawingIds + event.SelectedIds[count] + ',';
        }
        this.selectedDrawingIds = this.selectedDrawingIds.slice(0, -1);
        this.floorSelected = true;
    };
    ObjectDataComponentindrawing.prototype.objectShowInDrawingOnClick = function (event) {
        if (event["selectedIds"].length > 0)
            this.showInDrawingOnClick.emit({ "selectedIds": event["selectedIds"], "selectedObjectDetails": event["selectedObjectDetails"] });
        //else {
        //    this.assetsDrawingObj.showSelectedAssetInDrawing(event['SelectedId'][0], event.RowData.BomaHandle, function (retcode) {
        //    });
        //}
    };
    ObjectDataComponentindrawing.prototype.objectShowZoomOnClick = function (event) {
        if (event["selectedIds"].length > 0)
            this.showZoomOnClick.emit({ "selectedIds": event["selectedIds"], "selectedObjectDetails": event["selectedObjectDetails"] });
        //else {
        //    this.assetsDrawingObj.showSelectedAssetInDrawing(event['SelectedId'][0], event.RowData.BomaHandle, function (retcode) {
        //    });
        //}
    };
    ObjectDataComponentindrawing.prototype.PlaceObjectOnClick = function (event) {
        // if (event["selectedIds"].length == 1)
        this.ObjectPlaceOnClick.emit({ "selectedIds": event["selectedIds"], "rowData": event["rowData"] });
    };
    ObjectDataComponentindrawing.prototype.DelinkObjectOnClick = function (event) {
        if (event["selectedIds"].length == 1)
            this.ObjectDelinkOnClick.emit({ "selectedIds": event["selectedIds"], "selectedObjectDetails": event["selectedObjectDetails"] });
    };
    ObjectDataComponentindrawing.prototype.UpdatedSuccessOnClick = function (event) {
        if (event["updatedData"].length > 0)
            this.UpdatedSuccess.emit({ "updatedData": event["updatedData"] });
    };
    ObjectDataComponentindrawing.prototype.onSearchObjectInDrawing = function (data) {
        this.onSearchInDrawing.emit(data);
    };
    ObjectDataComponentindrawing.prototype.AttachmentcountOnClick = function (event) {
        this.Attachmentcounts.emit(event);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataComponentindrawing.prototype, "showZoomOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataComponentindrawing.prototype, "showInDrawingOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataComponentindrawing.prototype, "ObjectPlaceOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataComponentindrawing.prototype, "ObjectDelinkOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataComponentindrawing.prototype, "UpdatedSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataComponentindrawing.prototype, "onSearchInDrawing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataComponentindrawing.prototype, "Attachmentcounts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ObjectDataComponentindrawing.prototype, "updateDataSource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectDataComponentindrawing.prototype, "Targetforstyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ObjectDataComponentindrawing.prototype, "IsObjectPlaced", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ObjectDataComponentindrawing.prototype, "IsObjectMoved", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ObjectDataComponentindrawing.prototype, "ObjectDelinked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectDataComponentindrawing.prototype, "selectedRow", void 0);
    ObjectDataComponentindrawing = __decorate([
        core_1.Component({
            selector: 'objectDataindrawing',
            templateUrl: './app/Views/Objects/Data/objectDataindrawing.component.html',
            directives: [section_component_1.SectionComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, objectData_listindrawing_component_1.ObjectDataListinDrawingComponent, floor_selection_component_1.FloorSelectionComponent],
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            inputs: ["DrawingId", "moduleId", "SiteId", "isBuildingDrawing"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService])
    ], ObjectDataComponentindrawing);
    return ObjectDataComponentindrawing;
}());
exports.ObjectDataComponentindrawing = ObjectDataComponentindrawing;
//# sourceMappingURL=objectDataindrawing.component.js.map