import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { WOSchedulesbyEquipmentReportComponent } from './wo.schedulesbyequipment.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'wo-schedulesbyequipment-report',
    templateUrl: './app/Views/Reports/WorkOrder/Maintenance/SchedulesbyEquipment/wo.schedulesbyequipment.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, DropDownListComponent, TabsComponent, TabComponent, SubMenu, WOSchedulesbyEquipmentReportComponent]
})

export class WOSchedulesbyEquipmentReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    ddlEquipmentCategory: IField = undefined;
    ddlEquipmentClass: IField = undefined;
    ddlEquipmentNo: IField = undefined;
    alignContent: string;
    EquipmentCategoryId: number = 0;
    EquipmentClassId: number = 0;
    EquipmentNoId: number = 0;
    EquipmentCategoryName: any = "";
    EquipmentClassName: any = "";
    EquipmentName: any = "";
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
        this.pagePath = "Reports / Work Order / General / Schedules by Equipment";
        var contextObj = this;
        this.commonreportservice.getFieldsforSchedulesbyEquipmentReport().subscribe(function (result) {
            contextObj.ddlEquipmentCategory = result.Data[0];
            contextObj.ddlEquipmentCategory.FieldValue = "-1";
            contextObj.ddlEquipmentClass = result.Data[1];
            contextObj.ddlEquipmentClass.FieldValue = "-1";
            contextObj.ddlEquipmentNo = result.Data[2];
            contextObj.ddlEquipmentNo.FieldValue = "-1";
        });
        contextObj.alignContent = "horizontal";
    }

    onChangeEquipmentCategory(event: any) {
        this.ddlEquipmentClass.LookupDetails.LookupValues = null;
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.EquipmentCategoryId = event;
        this.EquipmentCategoryName = "";
        if (this.EquipmentCategoryId != -1) {
            var lookUp = this.ddlEquipmentCategory.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentCategoryName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadEquipmentClassLookupforCategorySchedulesbyEquipment(contextObj.EquipmentCategoryId, 1535).subscribe(function (result) {
            contextObj.ddlEquipmentClass.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlEquipmentClass.FieldValue = "-1";
            contextObj.ddlEquipmentNo.FieldValue = "-1";
        });
        this.EquipmentClassId = -1;
        this.EquipmentNoId = -1;
    }

    onChangeEquipmentClass(event: any) {
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.EquipmentClassId = event;
        this.EquipmentClassName = "";

        if (this.EquipmentClassId != -1) {
            var lookUp = this.ddlEquipmentClass.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentClassName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadEquipmentLookupforClassSchedulesbyEquipment(contextObj.EquipmentClassId, 1536).subscribe(function (result) {
            contextObj.ddlEquipmentNo.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlEquipmentNo.FieldValue = "-1";
        });
        if (this.EquipmentClassId == 0) {
            contextObj.ddlEquipmentNo.IsMandatory = false;
            this.EquipmentNoId = 0;
        } else {
            contextObj.ddlEquipmentNo.IsMandatory = true;
            this.EquipmentNoId = -1;
        }
    }

    onChangeEquipmentNo(event: any) {
        this.EquipmentNoId = event;
        if (this.EquipmentNoId != -1) {
            var lookUp = this.ddlEquipmentNo.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentName = lookUp.Value;
        }
    }

    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;
        if (this.EquipmentCategoryId == undefined || this.EquipmentCategoryName == "" || this.EquipmentClassId == undefined || this.EquipmentClassName == "" || this.EquipmentNoId == -1) {
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