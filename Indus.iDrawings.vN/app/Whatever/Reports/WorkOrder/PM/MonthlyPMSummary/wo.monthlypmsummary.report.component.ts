import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CommonReportService } from '../../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { ISplitView } from '../../../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../../../Framework/Whatever/Split-View/split-view.component';
import {CustomReportAddEdit} from '../../../../common/custom reports/customreport-addedit.component';
import {CommonService} from '../../../../../Models/Common/common.service';
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'wo-monthlypmsummary-report',
    templateUrl: './app/Views/Reports/WorkOrder/PM/MonthlyPMSummary/wo.monthlypmsummary.report.component.html',
    directives: [Html5ViewerComponent, DropDownListComponent, PageComponent, SplitViewComponent, CustomReportAddEdit],
    providers: [CommonReportService, CommonService, NotificationService],
    inputs: ['ScheduledFromDate','ScheduledToDate','DateRange','WorkTypeId','EquipmentCategoryId','EquipmentClassId','EquipmentNoId','EquipmentCategoryName','EquipmentClassName','EquipmentNoName','WorkTypeName','StatusId']
})



export class WOMonthlyPMSummaryReportComponent implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    ddlRecurrencePattern: IField = undefined;
    alignContent: string;
    IsSummarybool: boolean = false;
    EquipmentCategoryName: any ;
    EquipmentClassName: any ;
    EquipmentNoName: any;
    DateRange: any;
    WorkTypeName: any;
    EquipmentCategoryId: any =39;
    EquipmentClassId: any= -1;
    EquipmentNoId: any = 0 ;
    RecurrencePatternId: any = 0;
    WorkTypeId: any = 67;
    ScheduledFromDate: any;
    ScheduledToDate: any;
    StatusId: any = 0;

    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    pageTitle: string = "Customize Report";
    fieldObjectAddEdit: IField[];
    itemsSourceAddEdit: any[];
    needModulePrefix: any = 1;
    isFromCorrectionProject: any = 0;
    listFieldDetails: any[];
    showMyDef: boolean = true;
    showSetMyDef: boolean = true;
    constructor(private commonreportservice: CommonReportService, private commonService: CommonService, private notificationService: NotificationService) { }
    IsCustomize: any = 0;
    IsMobile: boolean = window["IsMobile"]; 
    ngOnInit() {
        var contextObj = this;
        this.commonreportservice.ddlRecurrencePattern().subscribe(function (resultData) {
            contextObj.ddlRecurrencePattern = resultData.Data[0];
            contextObj.ddlRecurrencePattern.FieldValue = "27";
            contextObj.ddlRecurrencePattern.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });

        });
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / PM Work Orders / Monthly PM Summary";
        contextObj.LoadReportData(0);
    }


    LoadReportData(Customize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 391;
        this.ReportData.ReportSubTitle = "";

        if (this.IsSummarybool == false) {
            this.ReportData.ReportCategoryId = 391;
            this.ReportData.ExportFileName = "Summary Report";
            this.ReportData.ReportTitle = "Summary Report";
            switch (this.RecurrencePatternId) {
                case "0":
                    this.ReportData.ExportFileName = "Summary Report";
                    this.ReportData.ReportTitle = "Summary Report";
                    break;
                case "1":
                    this.ReportData.ExportFileName = "Summary Report - Daily";
                    this.ReportData.ReportTitle = "Summary Report - Daily";
                    break;
                case "2":
                    this.ReportData.ExportFileName = "Summary Report - Weekly";
                    this.ReportData.ReportTitle = "Summary Report - Weekly";
                    break;
                case "3":
                    this.ReportData.ExportFileName = "Summary Report - Monthly";
                    this.ReportData.ReportTitle = "Summary Report - Monthly";
                    break;
                case "4":
                    this.ReportData.ExportFileName = "Summary Report - Yearly";
                    this.ReportData.ReportTitle = "Summary Report - Yearly";
            }
        }
        else if (this.IsSummarybool == true) {
            this.ReportData.ReportCategoryId = 392;
            this.ReportData.ExportFileName = "Details Report";
            this.ReportData.ReportTitle = "Details Report";
                switch (this.RecurrencePatternId)
                {
                    case "0": 
                        this.ReportData.ExportFileName = "Details Report";
                        this.ReportData.ReportTitle = "Details Report";
                        break;
                    case "1": 
                        this.ReportData.ExportFileName = "Details Report - Daily";
                        this.ReportData.ReportTitle = "Details Report - Daily";
                        break;
                    case "2": 
                        this.ReportData.ExportFileName = "Details Report - Weekly";
                        this.ReportData.ReportTitle = "Details Report - Weekly";
                        break;
                    case "3":
                        this.ReportData.ExportFileName = "Details Report - Monthly";
                        this.ReportData.ReportTitle = "Details Report - Monthly";
                        break;
                    case "4": 
                        this.ReportData.ExportFileName = "Details Report - Yearly";
                        this.ReportData.ReportTitle = "Details Report - Yearly";
                }
        }


        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });

        arrRptFieldIds.push({
            ReportFieldId: 6374,
            Value: this.EquipmentCategoryName.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4153,
            Value: this.EquipmentClassName.toString()
        });

        arrRptFieldIds.push({
            ReportFieldId: 6377,
            Value: this.EquipmentNoName.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 5577,
            Value: this.DateRange.toString()
        });

        arrRptFieldIds.push({
            ReportFieldId: 3896,
            Value: this.WorkTypeName.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 7632,
            Value: this.EquipmentCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4140,
            Value: this.EquipmentClassId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4141,
            Value: this.EquipmentNoId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 5573,
            Value: this.RecurrencePatternId.toString()
        });

        arrRptFieldIds.push({
            ReportFieldId: 5861,
            Value: this.WorkTypeId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 500076,
            Value: this.ScheduledFromDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 500077,
            Value: this.ScheduledToDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1992,
            Value: this.StatusId.toString()
        });

        if (Customize == 1) {
            this.IsCustomize = 1;
            this.ReportData.IsCustomize = 1;
        }
        else {
            this.IsCustomize = 0;
            this.ReportData.IsCustomize = 0;
        }

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";

    }

    onChangeType(event: any) {
        switch (event) {

            case "27": this.RecurrencePatternId = "0";
                break;
            case "28": this.RecurrencePatternId = "1";
                break;
            case "29": this.RecurrencePatternId = "3";
                break;
            case "30": this.RecurrencePatternId = "2";
                break;
            case "31": this.RecurrencePatternId = "4";
                break;
            default: this.RecurrencePatternId = "0";
                break;
        }
        var contextObj = this;
        contextObj.ReportData = undefined;
        setTimeout(function () {
            contextObj.LoadReportData(contextObj.IsCustomize);
        }, 50);

    }

    onSubmit(event) {
        this.IsSummarybool = !this.IsSummarybool;
        var contextObj = this;
        contextObj.ReportData = undefined;
        setTimeout(function () {
            contextObj.LoadReportData(contextObj.IsCustomize);
        }, 50);

    }

    customizeClick(event) {
        var contextObj = this;
        var isLoadAddEdit = true;
        contextObj.commonService.loadCustomRptAddEditCol().subscribe(function (result) {
            contextObj.fieldObjectAddEdit = result["Data"];//filter(function (item) { return item.FieldId != 1625 });
        });

        var listParams = new Array();
        listParams.push(
            { ReportFieldId: 353, Value: this.ReportData.ModuleId },
            { ReportFieldId: 346, Value: this.ReportData.ReportCategoryId },
            { ReportFieldId: 3792, Value: this.needModulePrefix },
            { ReportFieldId: 1243, Value: this.isFromCorrectionProject },
            { ReportFieldId: 66, Value: "" },
            { ReportFieldId: 4491, Value: this.EquipmentCategoryId }
        );
        contextObj.listFieldDetails = JSON.parse(JSON.stringify(listParams));
        contextObj.commonService.loadCustomizeReportData(JSON.stringify(listParams), 0, false).subscribe(function (result) {
            contextObj.itemsSourceAddEdit = JSON.parse(result);
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
    }

    applyCustomRptClick(event) {
        this.splitviewInput.showSecondaryView = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    }

}