import { Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { LabelComponent } from '../../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { SpaceService } from '../../../../Models/Space/space.service';
import { SpaceTrendReportViewer } from '../TrendReport/space.trend.reportviewer';
import {DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { IGrid } from '../../../../Framework/Models/Interface/Igrid';
import { IField} from  '../../../../Framework/Models/Interface/IField'
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'spaceUsableArea',
    templateUrl: './app/Views/Space/TrendAnalysis/UsableArea/space-usablearea.select.html',
    directives: [Notification, SlideComponent, SpaceTrendReportViewer, DateComponent, PageComponent, TabsComponent, TabComponent, SubMenu],
    providers: [SpaceService, NotificationService],
})

export class SpaceUsableAreaComponent implements OnInit {

    dateSelectorField: IField[];
    totalItems: number = 0;
    EndDate: string = "";
    StartDate: string = "";
    nextClicked: boolean = false;
    blnShowDate: boolean = false;
    pageIndex: number = 0;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    nextEnabled: boolean = false;

    reportType: any = undefined;
    fromDate: any = "";
    toDate: any = "";
    ReportTitle: string = "Trend Analysis: Usable Area";
    pagePath: string;
    selectedTab: number = 0;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: any = 0;


    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
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

        this.pagePath = "Space / Usable Area";
        var contextObj = this;
        contextObj.spaceService.trendAnalysisDateSelector().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;
            contextObj.spaceService.getSnapshotsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems < 2) {
                    contextObj.notificationService.ShowToaster('At least 2 snapshots are required to show', 2);
                    contextObj.enableMenu = [];
                }
                else {
                    contextObj.nextEnabled = true;
                    contextObj.enableMenu = [0];
                    contextObj.spaceService.getSnapshotsDates().subscribe(function (resultData) {
                        var date = JSON.parse(resultData.FieldBinderData);
                        contextObj.EndDate = date[0].EndDate.trim();
                        contextObj.StartDate = date[0].StartDate.trim();
                        for (var i = 0; i < contextObj.dateSelectorField.length; i++) {
                            if (i == 0) {
                                contextObj.dateSelectorField[i].FieldValue = date[0].StartDate.trim();
                                contextObj.blnShowDate = true;
                            }
                            if (i == 1) {
                                contextObj.dateSelectorField[1].FieldValue = date[0].EndDate.trim();
                                contextObj.blnShowDate = true;
                            }
                        }
                    });
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
                this.reportType = 14;
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





