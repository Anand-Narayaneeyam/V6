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
var reserveseats_component_1 = require('./reserveseats.component');
var reserveroom_schedulingopendrawing_component_1 = require('../drawings/reserveroom.schedulingopendrawing.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var ReserveseatsMainComponenet = (function () {
    function ReserveseatsMainComponenet(schedulingService) {
        this.schedulingService = schedulingService;
        this.disableDates = ["Sunday", "Saturday"];
        this.selectedTab = 0;
        this.viewDrawing = false;
        this.IsOpenDrawingComponentActive = false;
        this.isSpecialRoom = false;
        this.closeTbFuns = undefined;
        this.pagePath = "Scheduling / Reserve Workspace";
        this.isFromRoomClick = false;
        this.seattxt = "Workspace";
    }
    ReserveseatsMainComponenet.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.seattxt = result["Data"][0].Value;
                contextObj.pagePath = "Scheduling / Reserve " + contextObj.seattxt;
            }
        });
        contextObj.pagePath = "Scheduling / Reserve " + contextObj.seattxt;
    };
    ReserveseatsMainComponenet.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
        if (this.selectedTab == 0 && event[1] == true)
            this.onFirstTabClick();
        //this.deleteIndex = 0;
        //if (this.localselection > 0 && event[0] == 0) {
        //    this.deleteIndex = this.localselection;
        //}
    };
    ReserveseatsMainComponenet.prototype.floorCellOnClick = function (event) {
        debugger;
        if (event['isFromRoomClick'] == true)
            this.isFromRoomClick = true;
        else
            this.isFromRoomClick = false;
        this.drawingId = event["selRowData"]["DrawingId"];
        this.selectedData = event["selRowData"];
        this.isSpecialRoom = event["isSpecialRoom"];
        var contextObj = this;
        contextObj.pagePath = "Scheduling / Reserve " + contextObj.seattxt + " / Daily Reservation Summary";
        if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
            contextObj.deleteIndex = 1;
            this.IsOpenDrawingComponentActive = false;
            this.viewDrawing = false;
        }
        setTimeout(function () {
            contextObj.viewDrawing = true;
            contextObj.deleteIndex = 0;
        }, 50);
        this.localselection = 1;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 200);
        setTimeout(function () {
            contextObj.IsOpenDrawingComponentActive = true;
        }, 250);
    };
    //onTabBeforeClose($event) {
    //    var contextObj = this;
    //    contextObj.closeTbFuns = $event;
    //    this.onTabClose();
    //}
    //onTabClose() {
    //    var callBackForCloseTab = this.closeTbFuns[1];
    //    var selectedTabObj = this.closeTbFuns[2];
    //    var tabContextObj = this.closeTbFuns[3];
    //    callBackForCloseTab(selectedTabObj, tabContextObj, "out");
    //}
    ReserveseatsMainComponenet.prototype.onTabClose = function (event) {
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
        this.localselection = 0;
        this.pagePath = "Scheduling / Reserve " + this.seattxt;
    };
    ReserveseatsMainComponenet.prototype.onFirstTabClick = function () {
        this.deleteIndex = 1;
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
        this.localselection = 0;
        this.pagePath = "Scheduling / Reserve " + this.seattxt;
    };
    ReserveseatsMainComponenet = __decorate([
        core_1.Component({
            selector: 'reserveseatmain',
            templateUrl: './app/Views/Scheduling/Seat Booking/reserveseatmain.component.html',
            directives: [page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, reserveseats_component_1.ReserveSeatComponenet, reserveroom_schedulingopendrawing_component_1.ReserveRoomSchedulingOpenDrawing],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService])
    ], ReserveseatsMainComponenet);
    return ReserveseatsMainComponenet;
}());
exports.ReserveseatsMainComponenet = ReserveseatsMainComponenet;
//# sourceMappingURL=reserveseatmain.component.js.map