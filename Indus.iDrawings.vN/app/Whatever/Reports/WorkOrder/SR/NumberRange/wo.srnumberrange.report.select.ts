import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { StringTextBoxComponent } from '../../../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { WOSRNumberRangeReportComponent } from './wo.srnumberrange.report.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'wo-srnumberrange-report',
    templateUrl: './app/Views/Reports/WorkOrder/SR/NumberRange/wo.srnumberrange.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, StringTextBoxComponent, DropDownListComponent, TabsComponent, TabComponent, SubMenu, WOSRNumberRangeReportComponent]
})

export class WOSRNumberRangeReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    fieldnumberfrom: IField = undefined;
    fieldnumberto: IField = undefined;
    ddlWorkType: IField = undefined;
    alignContent: string;
    NumberFrom: number = 0;
    NumberTo: number = 0;
    WorkTypeId: number = 0;
    selectedTab: number = 0;
    WorkTypeName: any = "";
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
        this.pagePath = "Reports / Work Order / Service Requests / Work Orders by Number Range";
        var contextObj = this;

        this.commonreportservice.getSRNumberRangeReportFields().subscribe(function (result) {
            contextObj.fieldnumberfrom = result.Data[0];
            contextObj.fieldnumberto = result.Data[1];
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

        if (this.fieldnumberfrom.HasValidationError || this.fieldnumberto.HasValidationError || this.WorkTypeId == undefined || this.WorkTypeName == "" || this.WorkTypeId == -1) {
            this.isNextClicked = false;
        }
        else {
            this.NumberFrom = Number(this.fieldnumberfrom.FieldValue);
            this.NumberTo = Number(this.fieldnumberto.FieldValue);
            if (this.NumberTo < this.NumberFrom) {
                this.notificationService.ShowToaster('Work Order Number From must be less than or equal to Work Order Number To', 2);
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