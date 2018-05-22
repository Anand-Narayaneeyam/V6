import {Component, ChangeDetectorRef, EventEmitter, Output, Input, KeyValueDiffers, ElementRef, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import { MySeatRequestGridComponent} from './myseatrequests.component';
import {ActiveSeatReqGridComponent } from './allactiveseatrequests.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { AdministrationService } from '../../../Models/Administration/administration.service'
@Component({
    selector: 'seat-requests',
    templateUrl: './app/Views/Scheduling/Seat Booking/requests.component.html',
    directives: [PageComponent, TabsComponent, TabComponent, MySeatRequestGridComponent, ActiveSeatReqGridComponent],
    providers: [SchedulingService]
})
export class RequestsSeatBooking implements OnInit{
    selectedTab = 0;
    pagePath = "Scheduling / Workspace Reservation / Reservations / My Reservations";
    sessionUserRoleId = 0;
    isShowActiveRequest: boolean = false;
    isSiteAdmin: boolean = false;
    seattxt = "Workspace";
    getSelectedTab(event: any) {
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
    }
    constructor(private schedulingService: SchedulingService, private administrationService: AdministrationService) {

    }
    ngOnInit() {
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
    }
}