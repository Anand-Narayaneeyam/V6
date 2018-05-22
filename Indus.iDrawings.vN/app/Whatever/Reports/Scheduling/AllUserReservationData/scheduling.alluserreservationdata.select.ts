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
import { SchedulingReportAllUserReservationData } from './scheduling.alluserreservationdata.report';
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { ListBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component';


@Component({
    selector: 'alluserreservationdata-selector',
    templateUrl: './app/Views/Reports/Scheduling/AllUserReservationData/scheduling.alluserreservations.select.html',
    directives: [ListBoxComponent, DropDownListComponent, Notification, DateComponent, PageComponent, TabsComponent, TabComponent, SubMenu, SchedulingReportAllUserReservationData],
    providers: [SchedulingService, NotificationService],
})

export class AllUserReservationData implements OnInit {
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
    pagePath: any = "Reports / Scheduling / All User Reservation Data";
    teamDropdownField: IField;
    teamListField: IField;
    selectedTeam: string = "";
    constructor(private notificationService: NotificationService, private schedulingService: SchedulingService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        debugger
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
            var index = contextObj.dateSelectorField.findIndex(function (el) { return el.FieldId == 2586 });
            if (index != -1)
                contextObj.teamListField = contextObj.dateSelectorField[index];
            //var index = contextObj.dateSelectorField.findIndex(function (el) { return el.ReportFieldId == 500368 });
            //if (index != -1)
            //    contextObj.teamDropdownField = contextObj.dateSelectorField[index];
        });

    }

    onSubMenuChange(event) {
        var contextObj = this;
        contextObj.nextClicked = false;

        contextObj.fromDate = this.dateSelectorField[0].FieldValue;
        contextObj.toDate = this.dateSelectorField[1].FieldValue;
        contextObj.selectedTeam = null;
        contextObj.selectedTeam = "";

        if (contextObj.teamListField.MultiFieldValues != null && contextObj.teamListField.MultiFieldValues != undefined && contextObj.teamListField.MultiFieldValues.length > 0) {
            for (var i = 0; i < contextObj.teamListField.MultiFieldValues.length; i++)
                contextObj.selectedTeam += contextObj.teamListField.MultiFieldValues[i] + ",";
            contextObj.selectedTeam = contextObj.selectedTeam.substring(0, contextObj.selectedTeam.length - 1);
        }

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
    onChangeDataFieldTeam(event: any) {
        this.selectedTeam = event;
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
}