import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { DelayedWorkOrdersComponent } from './delayedworkorders.report.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'wo-pmdelayedwo-report',
    templateUrl: './app/Views/Reports/WorkOrder/PM/DelayedWorkOrders/delayedworkorders.report.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, DropDownListComponent, TabsComponent, TabComponent, SubMenu, DelayedWorkOrdersComponent]
})

export class DelayedWorkOrdersReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    ddlWorkType: IField = undefined;
    alignContent: string;
    WorkTypeId: number = 0;
    WorkTypeName: any = "";
    selectedTab: number = 0;
    isnext: number = undefined;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: any = 0;
    DateRange: any = "";

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
        this.pagePath = "Reports / Work Order /  PM Work Orders / Delayed Work Orders";
        var contextObj = this;

        this.commonreportservice.getPMDailyReportFields().subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[1];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    }

    getdata() {
        var contextObj = this;
        this.commonreportservice.ddlgetPMWorkTypeReportLookups(0).subscribe(function (result) {
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
        var contextObj = this;

        if (contextObj.WorkTypeId == undefined || contextObj.WorkTypeName == "" || contextObj.WorkTypeId == -1) {
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