import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { WOSRDateRangeReportComponent } from './wo.srdaterange.report.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DateComponent} from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'wo-srdaterange-report',
    templateUrl: './app/Views/Reports/WorkOrder/SR/DateRange/wo.srdaterange.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, DropDownListComponent, DateComponent, TabsComponent, TabComponent, SubMenu, WOSRDateRangeReportComponent]
})

export class WOSRDateRangeReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    dateSelectorField: any = undefined;
    ddlWorkType: IField = undefined;
    DateFrom: string = "";
    DateTo: string = "";
    alignContent: string;
    WorkTypeId: number = 0;
    WorkTypeName: any = "";
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
        this.pagePath = "Reports / Work Order / Service Requests / Work Orders by Date Range";
        var contextObj = this;

        this.commonreportservice.getSRWeeklyReportFields().subscribe(function (result) {
            var tempArray = new Array();
            tempArray.push(result.Data[0]);
            tempArray.push(result.Data[1]);
            contextObj.dateSelectorField = tempArray;
            contextObj.dateSelectorField[0].FieldLabel = "Date to Perform From";
            contextObj.dateSelectorField[1].FieldLabel = "Date to Perform To";
            contextObj.ddlWorkType = result.Data[2];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    }

    getdata() {
        var contextObj = this;
        this.commonreportservice.ddlgetWorkTypeLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    }

    onChangeWorkType(event: any) {
        this.WorkTypeId = event;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    }

    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;
        this.DateFrom = this.dateSelectorField[0].FieldValue;
        this.DateTo = this.dateSelectorField[1].FieldValue;

        if (this.DateFrom != "" && this.DateTo != "") {
            var toDate = new Date(this.DateTo);
            var fromDate = new Date(this.DateFrom);
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('Date to Perform From must be less than or equal to Date to Perform To', 2);
            }
            else {
                var dateselectorFrom: IField = this.dateSelectorField[0];
                var dateselectorTo: IField = this.dateSelectorField[1];  
                if (this.WorkTypeId == undefined || this.WorkTypeName == "" || this.WorkTypeId == -1 || dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
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