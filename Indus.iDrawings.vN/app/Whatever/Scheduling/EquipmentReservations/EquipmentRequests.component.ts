import {Component, ChangeDetectorRef, EventEmitter, Output, Input, KeyValueDiffers, ElementRef, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import { MyEquipmentRequestGridComponent} from './MyEquipmentRequest.component';
import {ActiveEquipmentRequestGridComponent } from './ActiveEquipmentRequest.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { AdministrationService } from '../../../Models/Administration/administration.service'
@Component({
    selector: 'equipment-requests',
    templateUrl: './app/Views/Scheduling/EquipmentReservations/EquipmentRequests.component.html',
    directives: [PageComponent, TabsComponent, TabComponent, MyEquipmentRequestGridComponent, ActiveEquipmentRequestGridComponent],
    providers: [SchedulingService]
})
export class EquipmentBookingRequests implements OnInit {
    selectedTab = 0;
    pagePath = "Scheduling / Equipment Reservation / Reservations / My Reservations";
    sessionUserRoleId = 0;
    isShowActiveRequest: boolean = false;
    isSiteAdmin: boolean = false;
    getSelectedTab(event: any) {
        debugger
        if (event[0] == 0) {
            this.selectedTab = 0;
            this.pagePath = "Scheduling / Equipment Reservation / Reservations / My Reservations";
        }
        else if (event[0] == 1) {
            this.selectedTab = 1;
            this.pagePath = "Scheduling / Equipment Reservation / Reservations / Active Reservations";
        }
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