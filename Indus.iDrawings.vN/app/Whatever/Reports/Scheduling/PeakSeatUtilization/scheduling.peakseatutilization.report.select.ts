import { Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { DateTimeComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datetimecomponent.component';
import { IField} from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SchedulingService } from '../../../../Models/Scheduling/scheduling.service';
import { SchedulingReportPeakSeatUtilizationComponent } from './scheduling.peakseatutilization.report';


@Component({
    selector: 'SeatUtilization',
    templateUrl: './app/Views/Reports/Scheduling/PeakSeatUtilization/scheduling.peakseatutilization.select.html',
    directives: [Notification, DateTimeComponent, PageComponent, TabsComponent, TabComponent, SubMenu, SchedulingReportPeakSeatUtilizationComponent],
    providers: [SchedulingService, NotificationService],
})

export class PeakSeatUtilizationComponent implements OnInit {
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
    pagePath: any = "Reports / Scheduling / Peak Workspace Utilization";

    constructor(private notificationService: NotificationService, private schedulingService: SchedulingService, private generFun: GeneralFunctions) {
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
        debugger;
        var contextObj = this;
        contextObj.schedulingService.SchedulingReportDateTimeSelect().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;

            //contextObj.dateSelectorField[0].FieldValue = contextObj.setPrevMonthsDate();
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

    setPrevMonthsDate() { /*function to set previous month*/
        var currentDate = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var prevMonth; var eoy;
        if (currentDate.getMonth() - 1 < 0) {
            prevMonth = monthNames[monthNames.length - 1]
            eoy = true;
        }
        else
            prevMonth = monthNames[currentDate.getMonth() - 1];
        let arr: any[];
        arr = currentDate.toDateString().split(" ");
        if (eoy)
            arr[3] = (Number(arr[3]) - 1).toString();
        return arr[2] + " " + prevMonth + " " + arr[3];
    }
}