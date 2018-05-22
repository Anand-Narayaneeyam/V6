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
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var roombooking_component_1 = require('../../../framework/whatever/scheduler/roombooking.component');
var ReserveRoomFromDrawing = (function () {
    function ReserveRoomFromDrawing() {
        this.selectedTab = 0;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReserveRoomFromDrawing.prototype, "spaceDataItem", void 0);
    ReserveRoomFromDrawing = __decorate([
        core_1.Component({
            selector: 'reserveroomfromdrawing',
            templateUrl: './app/Views/Scheduling/Drawings/reserveroomfromdrawing.component.html',
            directives: [tabs_component_1.TabsComponent, tab_component_1.TabComponent, roombooking_component_1.RoomBookingComponent],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], ReserveRoomFromDrawing);
    return ReserveRoomFromDrawing;
}());
exports.ReserveRoomFromDrawing = ReserveRoomFromDrawing;
//# sourceMappingURL=reserveroomfromdrawing.component.js.map