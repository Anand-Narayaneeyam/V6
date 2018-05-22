import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { WOSRWeeklyReportComponent } from './wo.srweekly.report.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DateComponent} from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'wo-srweekly-report',
    templateUrl: './app/Views/Reports/WorkOrder/SR/WeeklyReport/wo.srweeklyreport.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, DropDownListComponent, DateComponent, TabsComponent, TabComponent, SubMenu, WOSRWeeklyReportComponent]
})

export class WOSRWeeklyReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    dateSelectorField: any = undefined;
    ddlPriority: IField = undefined;
    ddlWorkType: IField = undefined;
    FromDate: string = "";
    ToDate: string = "";
    alignContent: string;
    WorkTypeId: number = 0;
    WorkTypeName: any = "";
    Priority: any = "";
    PriorityId: number = 0;
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
        this.pagePath = "Reports / Work Order / Service Requests / Weekly Report";
        var contextObj = this;

        this.commonreportservice.getSRWeeklyReportFields().subscribe(function (result) {
            var tempArray = new Array();
            tempArray.push(result.Data[0]);
            tempArray.push(result.Data[1]);
            contextObj.dateSelectorField = tempArray;
            //contextObj.dateSelectorField.FieldLabel = "Date";
            contextObj.setDates();
            contextObj.ddlWorkType = result.Data[2];
            contextObj.getdata();
            contextObj.ddlPriority = result.Data[3];
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

    setDates() {
        var contextObj = this;
        this.commonreportservice.getFirstLastdaysofWeekforReport().subscribe(function (result) {
            contextObj.dateSelectorField[0].FieldValue = result.Data[0];
            contextObj.dateSelectorField[1].FieldValue = result.Data[1];
        });
    }

    onChangeWorkType(event: any) {
        this.WorkTypeId = event;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    }

    onChangePriority(event: any) {
        this.PriorityId = event;
        var lookUp = this.ddlPriority.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.Priority = lookUp.Value;
    }

    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;
        this.FromDate = this.dateSelectorField[0].FieldValue;
        this.ToDate = this.dateSelectorField[1].FieldValue;
        var contextObj = this;

        if (this.FromDate != "" && this.ToDate != "") {
            var toDate = new Date(this.ToDate);
            var fromDate = new Date(this.FromDate);
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('From Date must be less than or equal to To Date', 2);
            }
            else {
                if (this.PriorityId == -1)
                    this.PriorityId = 0;
                contextObj.commonreportservice.setFirstLastdaysofWeekforReport(contextObj.FromDate, contextObj.ToDate).subscribe(function (result) {
                    contextObj.FromDate = result.Data[0];
                    contextObj.ToDate = result.Data[1];
                    var dateselectorFrom: IField = contextObj.dateSelectorField[0];
                    var dateselectorTo: IField = contextObj.dateSelectorField[1];
                    if (contextObj.WorkTypeId == undefined || contextObj.WorkTypeName == "" || contextObj.WorkTypeId == -1 || dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
                        contextObj.isNextClicked = false;
                    }
                    else {
                        contextObj.isnext = 1;
                        setTimeout(function () {
                            contextObj.isNextClicked = true;
                        }, 50);
                        setTimeout(function () {
                            contextObj.selectedTab = 1;
                        }, 100);
                    }
                });
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