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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var reserveequipmentlist_component_1 = require('./reserveequipmentlist.component');
var ReserveEquipmentsComponent = (function () {
    function ReserveEquipmentsComponent() {
        this.selectedTab = 0;
        this.pagePath = "Scheduling / Reserve Equipment";
    }
    ReserveEquipmentsComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    ReserveEquipmentsComponent = __decorate([
        core_1.Component({
            selector: 'reserveequipments',
            templateUrl: './app/Views/Scheduling/Equipment Reservation/reserveequipments.component.html',
            directives: [page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, reserveequipmentlist_component_1.ReserveEquipmentListComponent],
            providers: [http_1.HTTP_PROVIDERS],
        }), 
        __metadata('design:paramtypes', [])
    ], ReserveEquipmentsComponent);
    return ReserveEquipmentsComponent;
}());
exports.ReserveEquipmentsComponent = ReserveEquipmentsComponent;
//# sourceMappingURL=reserveequipments.component.js.map