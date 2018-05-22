import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { WOSchedulesbyDateRangeReportComponent } from './wo.schedulesbydaterange.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';
import {DateComponent} from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';


@Component({
    selector: 'wo-schedulesbydaterange-report',
    templateUrl: './app/Views/Reports/WorkOrder/Maintenance/SchedulesbyDateRange/wo.schedulesbydaterange.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, DropDownListComponent, TabsComponent, TabComponent, SubMenu, DateComponent, WOSchedulesbyDateRangeReportComponent]
})

export class WOSchedulesbyDateRangeReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    dateSelectorField: any = undefined;
    ddlRoute: IField = undefined;
    ddlWorkType: IField = undefined;
    ddlAPUser: IField = undefined;
    alignContent: string;
    DateFrom: any;
    DateTo: any;
    RouteId: number = 0;
    WorkTypeId: number = 0;
    APUserId: any = 0;
    RouteName: any = "";
    WorkTypeName: any = "";
    APUserName: any = "";
    selectedTab: number = 0;
    isnext: number = undefined;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: any = 0;

    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService) { }

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
        this.pagePath = "Reports / Work Order / General / Schedules by Date Range";
        var contextObj = this;
        this.commonreportservice.getFieldsforSchedulesbyDateRangeReport().subscribe(function (result) {
            var tempArray = new Array();
            tempArray.push(result.Data[0]);
            tempArray.push(result.Data[1]);
            contextObj.dateSelectorField = tempArray;
            contextObj.ddlRoute = result.Data[2];
            contextObj.ddlRoute.FieldValue = "-1";
            contextObj.ddlWorkType = result.Data[3];
            contextObj.ddlWorkType.FieldValue = "-1";
            contextObj.ddlAPUser = result.Data[4];
            contextObj.ddlAPUser.FieldValue = "-1";
        });
        contextObj.alignContent = "horizontal";
        //contextObj.ddlAPUser.IsEnabled = false;
    }

    onChangeRoute(event: any) {
        this.RouteId = event;
        if (this.RouteId != -1) {
            var lookUp = this.ddlRoute.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.RouteName = lookUp.Value;
        }
    }

    onChangeWorkType(event: any) {
        this.ddlAPUser.LookupDetails.LookupValues = null;
        this.WorkTypeId = event;
        this.WorkTypeName = "";

        if (this.WorkTypeId != -1) {
            var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.WorkTypeName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadAPUserLookupforWorkType(contextObj.WorkTypeId, 1261).subscribe(function (result) {
            contextObj.ddlAPUser.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlAPUser.FieldValue = "-1";
            //if (contextObj.ddlAPUser.LookupDetails.LookupValues.length > 0)
            //    contextObj.ddlAPUser.IsEnabled = true;
        });
        //if (this.EquipmentClassId == 0) {
        //    contextObj.ddlEquipmentNo.IsMandatory = false;
        //    this.EquipmentNoId = 0;
        //} else {
        //    contextObj.ddlEquipmentNo.IsMandatory = true;
        //    this.EquipmentNoId = -1;
        //}
    }

    onChangeAPUser(event: any) {
        this.APUserId = event;
        if (this.APUserId != -1) {
            var lookUp = this.ddlAPUser.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.APUserName = lookUp.Value;
        }
    }

    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;
        this.DateFrom = this.dateSelectorField[0].FieldValue;
        this.DateTo = this.dateSelectorField[1].FieldValue;

        if (this.RouteId == -1)
            this.RouteId = 0;
        if (this.WorkTypeId == -1)
            this.WorkTypeId = 0;
        if (this.APUserId == -1)
            this.APUserId = 0;

        if (this.DateFrom != "" && this.DateTo != "") {
            var toDate = new Date(this.DateTo);
            var fromDate = new Date(this.DateFrom);
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('Date From must be less than or equal to Date To', 2);
            }
            else {
                var dateselectorFrom: IField = this.dateSelectorField[0];
                var dateselectorTo: IField = this.dateSelectorField[1];
                if (dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
                    this.isNextClicked = false;
                }
                else {
                    this.isnext = 1;
                    var contexObj = this;
                    setTimeout(function () {
                        contexObj.isNextClicked = true;
                    }, 50);
                    setTimeout(function () {
                        contexObj.selectedTab = 1;
                    }, 100);
                }
            }
        }
    }

    getSelectedTab(event) {
        if (event[0] == 0) {
            this.selectedTab = 0;

            if (event[1] == true && this.isnext != undefined) {
                this.isNextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.isnext = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
    }

}