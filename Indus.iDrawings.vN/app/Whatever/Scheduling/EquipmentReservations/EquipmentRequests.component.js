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
var MyEquipmentRequest_component_1 = require('./MyEquipmentRequest.component');
var ActiveEquipmentRequest_component_1 = require('./ActiveEquipmentRequest.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var EquipmentBookingRequests = (function () {
    function EquipmentBookingRequests(schedulingService, administrationService) {
        this.schedulingService = schedulingService;
        this.administrationService = administrationService;
        this.selectedTab = 0;
        this.pagePath = "Scheduling / Equipment Reservation / Reservations / My Reservations";
        this.sessionUserRoleId = 0;
        this.isShowActiveRequest = false;
        this.isSiteAdmin = false;
    }
    EquipmentBookingRequests.prototype.getSelectedTab = function (event) {
        debugger;
        if (event[0] == 0) {
            this.selectedTab = 0;
            this.pagePath = "Scheduling / Equipment Reservation / Reservations / My Reservations";
        }
        else if (event[0] == 1) {
            this.selectedTab = 1;
            this.pagePath = "Scheduling / Equipment Reservation / Reservations / Active Reservations";
        }
    };
    EquipmentBookingRequests.prototype.ngOnInit = function () {
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
    EquipmentBookingRequests = __decorate([
        core_1.Component({
            selector: 'equipment-requests',
            templateUrl: './app/Views/Scheduling/EquipmentReservations/EquipmentRequests.component.html',
            directives: [page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, MyEquipmentRequest_component_1.MyEquipmentRequestGridComponent, ActiveEquipmentRequest_component_1.ActiveEquipmentRequestGridComponent],
            providers: [scheduling_service_1.SchedulingService]
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, administration_service_1.AdministrationService])
    ], EquipmentBookingRequests);
    return EquipmentBookingRequests;
}());
exports.EquipmentBookingRequests = EquipmentBookingRequests;
//# sourceMappingURL=EquipmentRequests.component.js.map