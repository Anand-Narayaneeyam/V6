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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var objectData_list_component_1 = require('../Data/objectData-list.component');
var floor_selection_component_1 = require('../../space/space data/floor-selection.component');
var FurnitureDataComponent = (function () {
    function FurnitureDataComponent(realpropertyservice, notificationService, cdr) {
        this.realpropertyservice = realpropertyservice;
        this.notificationService = notificationService;
        this.pageTitle = "Data";
        this.selectedTab = 0;
        this.floorSelected = false;
        this.selectedDrawingIds = '';
        this.selectedDrawingIds = '';
        this.pagePath = "Furniture / Data";
        this.cdr = cdr;
    }
    FurnitureDataComponent.prototype.getSelectedTab = function (event) {
        this.selectedDrawingIds = '';
        this.selectedTab = event[0];
        this.floorSelected = false;
    };
    FurnitureDataComponent.prototype.getSelectedIds = function (event) {
        this.selectedDrawingIds = '';
        for (var count = 0; count < event.SelectedIds.length; count++) {
            this.selectedDrawingIds = this.selectedDrawingIds + event.SelectedIds[count] + ',';
        }
        this.selectedDrawingIds = this.selectedDrawingIds.slice(0, -1);
        this.floorSelected = true;
    };
    FurnitureDataComponent.prototype.pagepathchange = function (event) {
        this.pagePath = null;
        this.cdr.detectChanges();
        this.pagePath = "Furniture / Data ";
        this.cdr.detectChanges();
    };
    FurnitureDataComponent = __decorate([
        core_1.Component({
            selector: 'furnitureData',
            templateUrl: './app/Views/Objects/Furniture/furnitureData.component.html',
            directives: [section_component_1.SectionComponent, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, objectData_list_component_1.ObjectDataListComponent, floor_selection_component_1.FloorSelectionComponent],
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, core_1.ChangeDetectorRef])
    ], FurnitureDataComponent);
    return FurnitureDataComponent;
}());
exports.FurnitureDataComponent = FurnitureDataComponent;
//# sourceMappingURL=furnitureData.component.js.map