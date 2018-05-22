
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
import {WOSRStatusBasedReportComponent} from './wo.srstatusbasedreports.component';
import { ValidateService } from '../../../../../Framework/Models/Validation/validation.service';


@Component({
    selector: 'srstatusbased-selector',
    templateUrl: './app/Views/Reports/WorkOrder/SR/SRStausBasedReports/wo.srstatusbasedreports.select.html',
    providers: [CommonReportService, NotificationService, ValidateService],
    directives: [Notification, PageComponent, DropDownListComponent, DateComponent, TabsComponent, TabComponent, SubMenu, WOSRStatusBasedReportComponent]
})

export class WOSRStausBasedReportsSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;

    ddlWorkType: IField = undefined;
    ddlStatus: IField = undefined;
    alignContent: string;
    StatusId: number = 0;
    WorkTypeId: number = 0;
    EntityCategoryId: number = 0;
    WorkTypeName: any = "";
    StatusName: any = "";
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
        this.pagePath = "Reports / Work Order / Service Requests / Status based Reports";

        this.commonreportservice.ddlgetSRStatusFields().subscribe(function (result) {
            contextObj.ddlStatus = result.Data[0];
            contextObj.ddlWorkType = result.Data[1];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    }

    getdata() {
        var contextObj = this;
        this.commonreportservice.ddlgetStatusLookups().subscribe(function (result) {
            contextObj.ddlStatus.LookupDetails.LookupValues  = result.LookupValues;
           
        });

    }


    onChangeStatus(event: any) {
        this.StatusId = parseInt(event);
        this.WorkTypeId = -1;
        this.ddlWorkType.FieldValue = "-1";
        var contextObj = this;

        var lookUp = this.ddlStatus.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.StatusName = lookUp.Value;

        if (this.StatusName.indexOf("Requests") > -1) {
            this.EntityCategoryId = 1;
        } else if (this.StatusName.indexOf("Work Orders") > -1){
            this.EntityCategoryId = 2;
        }

        this.commonreportservice.ddlgetWorkTypeLookupsforEntityCategory(contextObj.StatusId, contextObj.EntityCategoryId).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });



    }

    onChangeWorkType(event: any) {
        this.WorkTypeId = parseInt(event);
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    }





    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;
        if (this.ddlStatus.HasValidationError == true || this.ddlWorkType.HasValidationError == true || this.WorkTypeId == -1 || this.StatusId == -1) {
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