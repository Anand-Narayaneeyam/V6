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
import { SchedulingReportCancelledReservationDetails } from './scheduling.cancelledreservationdetails.report';
import { ListBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component';

@Component({
    selector: 'CancelledReservationDetails',
    templateUrl: './app/Views/Reports/Scheduling/CancelledReservation/scheduling.cancelledreservationdetails.select.html',
    directives: [ListBoxComponent, Notification, DateComponent, PageComponent, TabsComponent, TabComponent, DropDownListComponent, SubMenu, SchedulingReportCancelledReservationDetails],
    providers: [SchedulingService, NotificationService],
})

export class CancelledReservationDetails implements OnInit {
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
    pagePath: any = "Reports / Scheduling / Cancelled Reservation Details";
    teamListField: IField;
    selectedTeam: string = "";
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
            var index = contextObj.dateSelectorField.findIndex(function (el) { return el.FieldId == 2586 });
            if (index != -1)
                contextObj.teamListField = contextObj.dateSelectorField[index];
            contextObj.schedulingService.getSessionData().subscribe(function (data) {
                var retData = data["Data"];
                var UserRoleId = retData["UserRoleId"];
                if (UserRoleId >= 4) {
                    contextObj.ddlSite = undefined;
                    contextObj.ddlBuilding = undefined;
                    contextObj.ddlFloor = undefined;
                } else {
                    contextObj.ddlSite = resultData.Data[2];
                    contextObj.ddlBuilding = resultData.Data[3];
                    contextObj.ddlFloor = resultData.Data[4];
                }
            });
        });
    }

    onSubMenuChange(event) {
        var contextObj = this;
        contextObj.nextClicked = false;
        contextObj.fromDate = contextObj.dateSelectorField[0].FieldValue;
        contextObj.toDate = contextObj.dateSelectorField[1].FieldValue;
        var toDate = new Date(contextObj.toDate);
        var fromDate = new Date(contextObj.fromDate);
        contextObj.selectedTeam = null;
        contextObj.selectedTeam = "";
        if (contextObj.teamListField.MultiFieldValues != null && contextObj.teamListField.MultiFieldValues != undefined && contextObj.teamListField.MultiFieldValues.length > 0) {
            for (var i = 0; i < contextObj.teamListField.MultiFieldValues.length; i++)
                contextObj.selectedTeam += contextObj.teamListField.MultiFieldValues[i] + ",";
            contextObj.selectedTeam = contextObj.selectedTeam.substring(0, contextObj.selectedTeam.length - 1);
        }
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
    SelectAllTeamOnClick(event: any) {

    }
    singleTeamNameOnClick(event: any) {

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
