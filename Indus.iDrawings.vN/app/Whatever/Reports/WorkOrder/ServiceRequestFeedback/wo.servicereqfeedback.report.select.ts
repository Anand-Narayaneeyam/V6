import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service';
import { IGrid} from '../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { WOSRFeedbackReportComponent } from './wo.servicereqfeedback.report.component';
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'wo-srfeedback-report',
    templateUrl: './app/Views/Reports/WorkOrder/ServiceRequestFeedback/wo.srfeedbackreport.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, DropDownListComponent, DateComponent, TabsComponent, TabComponent, SubMenu, WOSRFeedbackReportComponent]
})

export class WOSRFeedbackReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    dateSelectorField: any = undefined;
    ddlWorkType: IField = undefined;
    FromDate: string = "";
    ToDate: string = "";
    alignContent: string;
    WorkTypeId: number = 0;
    WorkTypeName: any = "";
    selectedTab: number = 0;
    isnext: number = undefined;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: any = 0;
    Title: any = "";

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
        this.pagePath = "Reports / Work Order / General / Service Request Feedback";
        var contextObj = this;

        this.commonreportservice.getSRFeedbackReportFields().subscribe(function (result) {
            var tempArray = new Array();
            tempArray.push(result.Data[0]);
            tempArray.push(result.Data[1]);
            contextObj.dateSelectorField = tempArray;
            contextObj.dateSelectorField[0].FieldLabel = "Feedback From";
            contextObj.dateSelectorField[1].FieldLabel = "Feedback To";
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
        this.FromDate = this.dateSelectorField[0].FieldValue;
        this.ToDate = this.dateSelectorField[1].FieldValue;
        var contextObj = this;

        if (this.FromDate != "" && this.ToDate != "") {
            var toDate = new Date(this.ToDate);
            var fromDate = new Date(this.FromDate);
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('Feedback From must be less than or equal to Feedback To', 2);
            }
            else {

                contextObj.Title = "Date Range: " + this.FromDate + " to " + this.ToDate + "    Work Type: " + this.WorkTypeName;;
                var dateselectorFrom: IField = this.dateSelectorField[0];
                var dateselectorTo: IField = this.dateSelectorField[1];  
                if (contextObj.WorkTypeId == undefined || contextObj.WorkTypeName == "" || this.WorkTypeId == -1 || dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
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