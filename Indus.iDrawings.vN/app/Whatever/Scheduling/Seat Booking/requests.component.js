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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var myseatrequests_component_1 = require('./myseatrequests.component');
var allactiveseatrequests_component_1 = require('./allactiveseatrequests.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var RequestsSeatBooking = (function () {
    function RequestsSeatBooking(schedulingService, administrationService) {
        this.schedulingService = schedulingService;
        this.administrationService = administrationService;
        this.selectedTab = 0;
        this.pagePath = "Scheduling / Workspace Reservation / Reservations / My Reservations";
        this.sessionUserRoleId = 0;
        this.isShowActiveRequest = false;
        this.isSiteAdmin = false;
        this.seattxt = "Workspace";
    }
    RequestsSeatBooking.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.seattxt = result["Data"][0].Value;
            }
            if (event[0] == 0) {
                contextObj.selectedTab = 0;
                contextObj.pagePath = "Scheduling / " + contextObj.seattxt + " Reservation / Reservations / My Reservations";
            }
            else if (event[0] == 1) {
                contextObj.selectedTab = 1;
                contextObj.pagePath = "Scheduling / " + contextObj.seattxt + " Reservation / Reservations / Active Reservations";
            }
        });
    };
    RequestsSeatBooking.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.schedulingService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            contextObj.administrationService.CheckIsSiteLevelAdmin(1).subscribe(function (result) {
                contextObj.isSiteAdmin = result == 1 ? true : false;
                if (contextObj.sessionUserRoleId != 4) {
                    if (!contextObj.isSiteAdmin) {
                        contextObj.isShowActiveRequest = true;
                    }
                }
            });
        });
    };
    RequestsSeatBooking = __decorate([
        core_1.Component({
            selector: 'seat-requests',
            templateUrl: './app/Views/Scheduling/Seat Booking/requests.component.html',
            directives: [page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, myseatrequests_component_1.MySeatRequestGridComponent, allactiveseatrequests_component_1.ActiveSeatReqGridComponent],
            providers: [scheduling_service_1.SchedulingService]
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, administration_service_1.AdministrationService])
    ], RequestsSeatBooking);
    return RequestsSeatBooking;
}());
exports.RequestsSeatBooking = RequestsSeatBooking;
//# sourceMappingURL=requests.component.js.map