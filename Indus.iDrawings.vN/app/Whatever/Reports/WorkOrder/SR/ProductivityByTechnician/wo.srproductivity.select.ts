import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { WOSRProductivityReportComponent } from './wo.srproductivity.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'wo-srproductivity-report',
    templateUrl: './app/Views/Reports/WorkOrder/SR/ProductivityByTechnician/wo.srproductivity.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, DropDownListComponent, TabsComponent, TabComponent, SubMenu, WOSRProductivityReportComponent]
})

export class WOSRProductivityReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    ddlWorkType: IField = undefined;
    ddlTrade: IField = undefined;
    ddlTechnician: IField = undefined;
    alignContent: string;
    WorkTypeId: number = 0;
    TradeId: number = 0;
    TechnicianId: number = 0;
    WorkTypeName: any = "";
    TradeName: any = "";
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
        this.pagePath = "Reports / Work Order / Service Requests / Work Order Productivity by Technician";
        var contextObj = this;
        this.commonreportservice.getWorkTypesforforProductivityTechnicianReport(1219, 2).subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[0];
            contextObj.ddlWorkType.FieldValue = "-1";
            contextObj.ddlTrade = result.Data[1];
            contextObj.ddlTrade.FieldValue = "-1";
            contextObj.ddlTechnician = result.Data[2];
            contextObj.ddlTechnician.FieldValue = "-1";
        });
        contextObj.alignContent = "horizontal";
    }

    onChangeWorkType(event: any) {
        this.ddlTrade.LookupDetails.LookupValues = null;
        this.ddlTechnician.LookupDetails.LookupValues = null;
        this.WorkTypeId = event;
        this.WorkTypeName = "";
        if (this.WorkTypeId != -1) {
            var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.WorkTypeName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadTradeLookupforWorkType(contextObj.WorkTypeId, 1219, 2).subscribe(function (result) {
            contextObj.ddlTrade.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlTrade.FieldValue = "-1";
            contextObj.ddlTechnician.FieldValue = "-1";
        });
    }

    onChangeTrade(event: any) {
        this.ddlTechnician.LookupDetails.LookupValues = null;
        this.TradeId = event;
        this.TradeName = "";
        if (this.TradeId != -1) {
            var lookUp = this.ddlTrade.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.TradeName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadTechnicianLookupforWorkType(contextObj.TradeId, contextObj.WorkTypeId, 2627, 2).subscribe(function (result) {
            contextObj.ddlTechnician.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlTechnician.FieldValue = "-1";
        });
    }

    onChangeTechnician(event: any) {
        this.TechnicianId = event;
        if (this.TechnicianId == -1)
            this.TechnicianId = 0;

        var lookUp = this.ddlTechnician.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
    }

    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;

        if (this.WorkTypeId == undefined || this.WorkTypeName == "" || this.TradeId == undefined || this.TradeName == "" || this.TradeId == -1 || this.WorkTypeId == -1) {
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