import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { WOProcedureStepsReportComponent } from './wo.proceduresandsteps.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'wo-proceduresandsteps-report',
    templateUrl: './app/Views/Reports/WorkOrder/Maintenance/ProceduresandSteps/wo.proceduresandsteps.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, DropDownListComponent, TabsComponent, TabComponent, SubMenu, WOProcedureStepsReportComponent]
})

export class WOProcedureStepsReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    ddlEquipmentCategory: IField = undefined;
    ddlEquipmentClass: IField = undefined;
    ddlProcedure: IField = undefined;
    alignContent: string;
    EquipmentCategoryId: number = 0;
    EquipmentClassId: number = 0;
    ProcedureId: number = 0;
    EquipmentCategoryName: any = "";
    EquipmentClassName: any = "";
    ProcedureName: any = "";
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
        this.pagePath = "Reports / Work Order / General / Procedures and Steps";
        var contextObj = this;
        this.commonreportservice.getFieldsforProceduresandStepsReport().subscribe(function (result) {
            contextObj.ddlEquipmentCategory = result.Data[0];
            contextObj.ddlEquipmentCategory.FieldValue = "-1";
            contextObj.ddlEquipmentClass = result.Data[1];
            contextObj.ddlEquipmentClass.FieldValue = "-1";
            contextObj.ddlProcedure = result.Data[2];
            contextObj.ddlProcedure.FieldValue = "-1";
        });
        contextObj.alignContent = "horizontal";
    }

    onChangeEquipmentCategory(event: any) {
        this.ddlEquipmentClass.LookupDetails.LookupValues = null;
        this.ddlProcedure.LookupDetails.LookupValues = null;
        this.EquipmentCategoryId = event;
        this.EquipmentCategoryName = "";
        if (this.EquipmentCategoryId != -1) {
            var lookUp = this.ddlEquipmentCategory.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentCategoryName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadEquipmentClassLookupforCategory(contextObj.EquipmentCategoryId, 1535).subscribe(function (result) {
            contextObj.ddlEquipmentClass.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlEquipmentClass.FieldValue = "-1";
            contextObj.ddlProcedure.FieldValue = "-1";
        });
        this.EquipmentClassId = -1;
        this.ProcedureId = -1;
    }

    onChangeEquipmentClass(event: any) {
        this.ddlProcedure.LookupDetails.LookupValues = null;
        this.EquipmentClassId = event;
        this.EquipmentClassName = "";

        if (this.EquipmentClassId != -1) {
            var lookUp = this.ddlEquipmentClass.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.EquipmentClassName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadProcedureLookupforClassorCategory(contextObj.EquipmentClassId, contextObj.EquipmentCategoryId, 1536).subscribe(function (result) {
            contextObj.ddlProcedure.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlProcedure.FieldValue = "-1";
        });
        this.ProcedureId = -1;
    }

    onChangeProcedure(event: any) {
        this.ProcedureId = event;
        if (this.ProcedureId != -1) {
            var lookUp = this.ddlProcedure.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.ProcedureName = lookUp.Value;
        }
    }

    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;

        if (this.EquipmentCategoryId == undefined || this.EquipmentCategoryName == "" || this.EquipmentClassId == undefined || this.EquipmentClassName == "" || this.ProcedureId == -1 || this.ProcedureName == "") {
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