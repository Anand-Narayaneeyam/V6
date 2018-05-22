import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { WOPMStatusBasedReportComponent } from './wo.pmstatusbased.report.component';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DateComponent} from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';


@Component({
    selector: 'wo-pmstatusbased-report',
    templateUrl: './app/Views/Reports/WorkOrder/PM/StatusBased/wo.pmstatusbased.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [Notification, PageComponent, DropDownListComponent, DateComponent, TabsComponent, TabComponent, SubMenu, WOPMStatusBasedReportComponent]
})

export class WOPMStatusBasedReportSelect implements OnInit {


    isNextClicked: boolean = false;
    pagePath: string;
    dateSelectorField: any = undefined;
    ddlStatus: IField = undefined;
    ddlWorkType: IField = undefined;
    ddlEquipmentCategory: IField = undefined;
    ddlEquipmentClass: IField = undefined;
    ddlEquipmentNo: IField = undefined;
    ScheduledFromDate: string = "";
    ScheduledToDate: string = "";
    alignContent: string;
    StatusId: number = 0;
    WorkTypeId: number = 0;
    EquipmentCategoryId: number = 0;
    EquipmentClassId: number = 0;
    EquipmentNoId: number = 0;
    dropDownType: number;
    EquipmentCategoryName: any = "";
    EquipmentClassName: any = "";
    EquipmentNoName: any = "";
    WorkTypeName: any = "";
    StatusName: any = "";
    DateRange: any = "";
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
        this.pagePath = "Reports / Work Order / PM Work Orders / Status based Reports";
        var contextObj = this;

        this.commonreportservice.ddlgetPMStatusReportFields().subscribe(function (result) {
            contextObj.ddlStatus = result.Data[0];
            contextObj.ddlWorkType = result.Data[1];
            contextObj.getdata();
        });

        this.commonreportservice.getMonthlySummary().subscribe(function (result) {
            //contextObj.ddlWorkType = result.Data[0];
            contextObj.ddlEquipmentCategory = result.Data[1];
            contextObj.ddlEquipmentClass = result.Data[2];
            contextObj.ddlEquipmentNo = result.Data[3];
            var tempArray = new Array();
            tempArray.push(result.Data[4]);
            tempArray.push(result.Data[5]);
            contextObj.dateSelectorField = tempArray;
        });
        contextObj.alignContent = "horizontal";
    }

    getdata() {
        var contextObj = this;
        this.commonreportservice.ddlgetPMStatusReportLookups().subscribe(function (result) {
            contextObj.ddlStatus.LookupDetails.LookupValues = result.LookupValues;
        });
    }

    getDropDownData(StatusId: number, WorkTypeId: number, EquipmentCategoryId: number, EquipmentClassId: number, dropDownType: number) {
        var contextObj = this;
        var tempArray = new Array();
        tempArray.push(
            {
                ReportFieldId: 1992,
                Value: StatusId
            },
            {
                ReportFieldId: 5861,
                Value: WorkTypeId
            },
            {
                ReportFieldId: 7632,
                Value: EquipmentCategoryId
            },
            {
                ReportFieldId: 4140,
                Value: EquipmentClassId
            }
        );
        contextObj.commonreportservice.getEquipmentForReport(50820, JSON.stringify(tempArray)).subscribe(function (data) {
            if (contextObj.dropDownType == 1) {
                contextObj.ddlEquipmentCategory.LookupDetails.LookupValues = JSON.parse(data["Data"]["Table1"]);
            }
            else if (contextObj.dropDownType == 2) {
                contextObj.ddlEquipmentClass.LookupDetails.LookupValues = JSON.parse(data["Data"]["Table2"]);
            }
            else if (contextObj.dropDownType == 3) {
                contextObj.ddlEquipmentNo.LookupDetails.LookupValues = JSON.parse(data["Data"]["Table3"]);
            }

        });
    }

    onChangeStatus(event: any) {
        this.ddlEquipmentCategory.FieldValue = "-1";
        this.ddlEquipmentClass.FieldValue = "-1";
        this.ddlEquipmentNo.FieldValue = "-1";
        this.ddlWorkType.FieldValue = "-1";
        this.ddlEquipmentCategory.LookupDetails.LookupValues = null;
        this.ddlEquipmentClass.LookupDetails.LookupValues = null;
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.ddlWorkType.LookupDetails.LookupValues = null;

        this.StatusId = parseInt(event);
        this.WorkTypeId = -1;
        this.ddlWorkType.FieldValue = "-1";
        var contextObj = this;

        var lookUp = this.ddlStatus.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.StatusName = lookUp.Value;

        this.commonreportservice.ddlgetPMWorkTypeReportLookups(contextObj.StatusId).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    }

    onChangeWorkType(event: any) {
        this.ddlEquipmentCategory.FieldValue = "-1";
        this.ddlEquipmentClass.FieldValue = "-1";
        this.ddlEquipmentNo.FieldValue = "-1";
        this.ddlEquipmentCategory.LookupDetails.LookupValues = null;
        this.ddlEquipmentClass.LookupDetails.LookupValues = null;
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.WorkTypeId = event;
        this.dropDownType = 1;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
        this.getDropDownData(this.StatusId, this.WorkTypeId, this.EquipmentCategoryId, this.EquipmentClassId, this.dropDownType);

    }

    onChangeEquipmentCategory(event: any) {
        this.ddlEquipmentClass.FieldValue = "-1";
        this.ddlEquipmentNo.FieldValue = "-1";
        this.ddlEquipmentClass.LookupDetails.LookupValues = null;
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.EquipmentCategoryId = event;
        this.dropDownType = 2;
        var lookUp = this.ddlEquipmentCategory.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.EquipmentCategoryName = lookUp.Value;
        this.getDropDownData(this.StatusId, this.WorkTypeId, this.EquipmentCategoryId, this.EquipmentClassId, this.dropDownType);
    }

    onChangeEquipmentClass(event: any) {
        this.ddlEquipmentNo.FieldValue = "-1";
        this.ddlEquipmentNo.LookupDetails.LookupValues = null;
        this.EquipmentClassId = event;
        this.dropDownType = 3;
        var lookUp = this.ddlEquipmentClass.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.EquipmentClassName = lookUp.Value;
        this.getDropDownData(this.StatusId, this.WorkTypeId, this.EquipmentCategoryId, this.EquipmentClassId, this.dropDownType);

        if (this.EquipmentClassId == 0) {
            this.EquipmentClassId = -1;
            this.EquipmentClassName = "";
        }

    }

    onChangeEquipmentNo(event: any) {
        this.EquipmentNoId = event;
        var lookUp = this.ddlEquipmentNo.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.EquipmentNoName = lookUp.Value;
        if (this.EquipmentNoId == 0) {
            this.EquipmentNoId = -1;
            this.EquipmentNoName = "";
        }
    }



    onSubMenuChange(event: any) {
        this.isnext = undefined;
        this.isNextClicked = false;
        this.ScheduledFromDate = this.dateSelectorField[0].FieldValue;
        this.ScheduledToDate = this.dateSelectorField[1].FieldValue;
        if (this.ScheduledFromDate != "" && this.ScheduledToDate != "") {
            this.DateRange = this.ScheduledFromDate + " to " + this.ScheduledToDate;

            var toDate = new Date(this.ScheduledToDate);
            var fromDate = new Date(this.ScheduledFromDate);
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('PM Scheduled From must be less than or equal to PM Scheduled To', 2);
            }
            else {
                var dateselectorFrom: IField = this.dateSelectorField[0];
                var dateselectorTo: IField = this.dateSelectorField[1];
                if (this.DateRange == "" || this.WorkTypeId == undefined || this.EquipmentCategoryId == undefined || this.EquipmentClassId == undefined || this.EquipmentNoId == undefined || this.EquipmentCategoryName == "" || this.WorkTypeName == "" || this.StatusId == -1 || this.WorkTypeId == -1 || this.EquipmentCategoryId == -1 || this.ddlEquipmentClass.FieldValue == "-1" || dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
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