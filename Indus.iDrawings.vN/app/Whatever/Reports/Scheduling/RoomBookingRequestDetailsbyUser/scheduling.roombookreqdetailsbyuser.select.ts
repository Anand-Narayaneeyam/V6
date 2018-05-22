
import { Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { IField} from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SchedulingService } from '../../../../Models/Scheduling/scheduling.service';
import {SchedulingReportRoomBookingRequestDetailsByUser} from './scheduling.roombookreqdetailsbyuser.report';


@Component({
    selector: 'RoomBookingRequestDetailsByUser',
    templateUrl: './app/Views/Reports/Scheduling/RoomBookingRequestDetailsbyUser/scheduling.roombookreqdetailsbyuser.select.html',
    directives: [Notification, DateComponent, PageComponent, TabsComponent, TabComponent, SubMenu, SchedulingReportRoomBookingRequestDetailsByUser],
    providers: [SchedulingService, NotificationService],
})

export class RoomBookingRequestDetailsByUser implements OnInit {
    dateSelectorField: IField[];
    EndDate: string = "";
    StartDate: string = "";
    nextClicked: boolean = false;
    blnShowDate: boolean = true;
    nextEnabled: boolean = false;
    reportType: any = undefined;
    fromDate: any = "";
    toDate: any = "";
    selectedTab: number = 0;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: any = 0;
    pagePath: any = "Reports / Scheduling / Room Reservation Details by User";
    roomtxt = "Room";
    constructor(private notificationService: NotificationService, private schedulingService: SchedulingService,private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];

        var contextObj = this;
        contextObj.schedulingService.SchedulingReportDateSelect().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;
        });
        contextObj.schedulingService.checkSubscribedFeature('275').subscribe(function (result) {//275
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtxt = result["Data"][0].Value;
            }
            contextObj.pagePath = "Reports / Scheduling / " + contextObj.roomtxt +" Reservation Details by User";
        });
    }

    onSubMenuChange(event) {
        this.nextClicked = false;
        this.fromDate = this.dateSelectorField[0].FieldValue;
        this.toDate = this.dateSelectorField[1].FieldValue;

        var toDate = new Date(this.toDate);
        var fromDate = new Date(this.fromDate);

        if (this.fromDate != "" && this.toDate != "") {
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('From Date must be less than or equal to To Date', 2);
            }
            else {
                this.reportType = 1;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.nextClicked = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);

            }
        }
        else {
            return
        }

    }

    getSelectedTab(event) {
        if (event[0] == 0) {
            this.selectedTab = 0;

            if (event[1] == true && this.reportType != undefined) {
                this.nextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.reportType = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);


            }
        }
    }
}





