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
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SchedulingService } from '../../../../Models/Scheduling/scheduling.service';
import { SchedulingReportUserReservationDetails } from './scheduling.userreservationdetails.report';

@Component({
    selector: 'UserReservationDetails',
    templateUrl: './app/Views/Reports/Scheduling/UserReservation/scheduling.userreservationdetails.select.html',
    directives: [Notification, DateComponent, PageComponent, TabsComponent, TabComponent, DropDownListComponent, SubMenu, SchedulingReportUserReservationDetails],
    providers: [SchedulingService, NotificationService],
})

export class UserReservationDetails implements OnInit {
    dateSelectorField: IField[];
    ddlSite: IField;
    ddlBuilding: IField;
    ddlFloor: IField;
    EndDate: string = "";
    StartDate: string = "";
    nextClicked: boolean = false;
    blnShowDate: boolean = true;
    nextEnabled: boolean = false;
    reportType: any = undefined;
    fromDate: any = "";
    toDate: any = "";
    SiteId: any = 0;
    BuildingId: any = 0;
    FloorId: any = 0;
    selectedTab: number = 0;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: any = 0;
    pagePath: any = "Reports / Scheduling / User Reservation Details";

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

        var contextObj = this;
        contextObj.schedulingService.UserReservationReportSelect().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;
            contextObj.ddlSite = resultData.Data[2];
            contextObj.ddlBuilding = resultData.Data[3];
            contextObj.ddlFloor = resultData.Data[4];

            contextObj.schedulingService.getSessionData().subscribe(function (data) {
                var retData = data["Data"];
                var UserRoleId = retData["UserRoleId"];
                if (UserRoleId >= 4) {
                    contextObj.ddlSite = undefined;
                    contextObj.ddlBuilding = undefined;
                    contextObj.ddlFloor = undefined;
                }
            });
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

    onChangeSite(siteId: string) {
        var contextObj = this;
        contextObj.SiteId = parseInt(siteId);
        contextObj.ddlBuilding.FieldValue = "-1";
        contextObj.ddlFloor.FieldValue = "-1";
        contextObj.ddlBuilding.LookupDetails.LookupValues = null;
        contextObj.ddlFloor.LookupDetails.LookupValues = null;

        if (siteId == "-1") {
            contextObj.SiteId = 0;
            return;
        }
        contextObj.schedulingService.loadBuilding(siteId, 1302).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"].length > 0) {
                contextObj.ddlBuilding.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (contextObj.ddlBuilding.LookupDetails.LookupValues.length == 1) {
                    contextObj.ddlBuilding.FieldValue = contextObj.ddlBuilding.LookupDetails.LookupValues[0].Id.toString();
                    contextObj.onChangeBuilding(contextObj.ddlBuilding.FieldValue);
                }
            }
        });
    }

    onChangeBuilding(buildingId: string) {
        var contextObj = this;
        contextObj.BuildingId = parseInt(buildingId);
        contextObj.ddlFloor.FieldValue = "-1";
        contextObj.ddlFloor.LookupDetails.LookupValues = null;

        if (buildingId == "-1") {
            contextObj.BuildingId = 0;
            return;
        }
        contextObj.schedulingService.loadFloor(buildingId, 1303).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"].length > 0) {
                contextObj.ddlFloor.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (contextObj.ddlFloor.LookupDetails.LookupValues.length == 1) {
                    contextObj.ddlFloor.FieldValue = contextObj.ddlFloor.LookupDetails.LookupValues[0].Id.toString();
                }
            }
        });
    }

    onChangeFloor(floorId: string) {
        var contextObj = this;
        contextObj.FloorId = parseInt(floorId);
    }
}
