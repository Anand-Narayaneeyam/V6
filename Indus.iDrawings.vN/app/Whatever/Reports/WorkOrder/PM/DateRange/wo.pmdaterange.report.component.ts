import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { CommonReportService } from '../../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { ISplitView } from '../../../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../../../Framework/Whatever/Split-View/split-view.component';
import {CustomReportAddEdit} from '../../../../common/custom reports/customreport-addedit.component';
import {CommonService} from '../../../../../Models/Common/common.service';
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'wo-pmdaterange-report',
    templateUrl: './app/Views/Reports/WorkOrder/PM/DateRange/wo.pmdaterange.report.html',
    directives: [Html5ViewerComponent, PageComponent, SplitViewComponent, CustomReportAddEdit],
    providers: [CommonReportService, CommonService, NotificationService],
    inputs: ['DateFrom', 'DateTo', 'WorkTypeId']
})



export class WOPMDateRangeReportComponent implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    alignContent: string;
    WorkTypeId: any = 0;
    DateFrom: any;
    DateTo: any;

    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    pageTitle: string = "Customize Report";
    fieldObjectAddEdit: IField[];
    itemsSourceAddEdit: any[];
    needModulePrefix: any = 1;
    isFromCorrectionProject: any = 0;
    listFieldDetails: any[];
    showMyDef: boolean = false;
    showSetMyDef: boolean = false;
    IsMobile: boolean = window["IsMobile"]; 
    constructor(private commonreportservice: CommonReportService, private commonService: CommonService, private notificationService: NotificationService) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / PM Work Orders / Work Orders by Date Range";
        contextObj.LoadReportData(0);
    }


    LoadReportData(IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 138;
        this.ReportData.ExportFileName = "Work Orders by Date Range";
        this.ReportData.ReportTitle = "Work Orders by Date Range";
        this.ReportData.ReportSubTitle = "";

        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });

        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.DateFrom.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.DateTo.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1416,
            Value: this.WorkTypeId.toString()
        });
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";

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
            { ReportFieldId: 6577, Value: this.WorkTypeId },
            { ReportFieldId: 6558, Value: "3" }
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