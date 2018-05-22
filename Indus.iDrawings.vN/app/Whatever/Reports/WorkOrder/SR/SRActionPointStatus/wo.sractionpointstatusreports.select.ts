
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DateComponent} from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';
import {WOSRActionPointStatusReportComponent} from './wo.sractionpointstatusreports.component';
import { ValidateService } from '../../../../../Framework/Models/Validation/validation.service';


@Component({
    selector: 'sractionpointstatus-selector',
    templateUrl: './app/Views/Reports/WorkOrder/SR/SRActionPointStatus/wo.sractionpointstatus.select.html',
    providers: [CommonReportService, NotificationService, ValidateService],
    directives: [Notification, PageComponent, DropDownListComponent, DateComponent, TabsComponent, TabComponent, SubMenu, WOSRActionPointStatusReportComponent]
})

export class WOSRActionPointStatusReportsSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;

    ddlWorkType: IField = undefined;
    ddlActionPoint: IField = undefined;
    alignContent: string;
    ActionPointId: number = 0;
    WorkTypeId: number = 0;
    WorkTypeName: any = "";
    selectedTab: number = 0;
    isnext: number = undefined;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    tabDeleteIndex: any = 0;



    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService, private _validateService: ValidateService) { }

    ngOnInit() {
        var contextObj = this;
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
        this.pagePath = "Reports / Work Order / Service Requests / Requests based on Action Point";

        this.commonreportservice.ddlgetSRActionTypeStatusFields().subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[0];
            contextObj.ddlActionPoint = result.Data[1];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    }

    getdata() {
        var contextObj = this;
        this.commonreportservice.ddlgetWorkTypeLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
        });
    }


    onChangeWorkType(event: any) {
        this.WorkTypeId = parseInt(event);
        this.ActionPointId = -1;
        this.ddlActionPoint.FieldValue = "-1";
        var contextObj = this;
        this.commonreportservice.ddlgetActionPointLookups(contextObj.WorkTypeId).subscribe(function (result) {
            contextObj.ddlActionPoint.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlActionPoint.FieldValue = "-1";
        });


        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    }

    onChangeActionPoint(event: any) {
        this.ActionPointId = parseInt(event);
    }
    
    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;
        if (this.ddlActionPoint.HasValidationError == true || this.ddlWorkType.HasValidationError == true || this.WorkTypeId == -1 || this.ActionPointId == -1) {
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