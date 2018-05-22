import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { CommonReportService } from '../../../../../Models/reports/common.service'
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { SplitViewComponent } from '../../../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../../../Framework/Models/Interface/ISplit-view';
import { CommonService } from '../../../../../Models/Common/common.service';
import { ScheduleReportAddEdit } from '../../../../Common/ScheduleReport/schedule-report-addedit.component';
import {CustomReportAddEdit} from '../../../../common/custom reports/customreport-addedit.component';
import {IField} from  '../../../../../Framework/Models/Interface/IField';
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'wo-srdelayedwo-report',
    templateUrl: './app/Views/Reports/WorkOrder/SR/DelayedWorkOrders/delayedworkorders.showreport.html',
    directives: [Html5ViewerComponent, PageComponent, SplitViewComponent, ScheduleReportAddEdit, CustomReportAddEdit],
    providers: [CommonReportService, CommonService, NotificationService],
    inputs: ['WorkTypeId']
})


export class DelayedWorkOrdersComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    WorkTypeId: number = 0;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    reportCatId: number = 150;
    IsCustomRprt = 0;
    hasScheduledReport: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    showSheduleReportAddEdit: boolean = false;
    showCustomize: boolean = false;
    pageTitle: string;

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
        var contexObj = this;
        this.pagePath = "Reports / Work Order / Service Requests / Delayed Work Orders";
        contexObj.LoadReportData(0);
        contexObj.checkForScheduledReport();
    }


    LoadReportData(IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 150;
        this.ReportData.ExportFileName = "Delayed Work Orders";
        this.ReportData.ReportTitle = "Delayed Work Orders";
        this.ReportData.ReportSubTitle = "";

        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 1416,
            Value: this.WorkTypeId.toString()
        })
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    }

    checkForScheduledReport() {
        var contextObj = this;
        contextObj.commonService.CheckHasScheduledReport(contextObj.reportCatId, contextObj.IsCustomRprt).subscribe(function (result) {
            debugger
            if (result.ServerId == 1) {
                contextObj.hasScheduledReport = true;
            }
            else {
                contextObj.hasScheduledReport = false;
            }
        });
    }

    showSheduleReport(event) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
        this.showCustomize = false;
        contextObj.splitviewInput.secondaryArea = 90;
    }


    handleInsertSuccess(event) {

        this.splitviewInput.showSecondaryView = false;
    }

    onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
    }

    customizeClick(event) {
        this.showSheduleReportAddEdit = false;
        var contextObj = this;
        var isLoadAddEdit = true;
        contextObj.showCustomize = true;
        contextObj.splitviewInput.secondaryArea = 79;
        contextObj.pageTitle = "Customize Report";
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
            { ReportFieldId: 6558, Value: "2" }
        );
        contextObj.listFieldDetails = JSON.parse(JSON.stringify(listParams));
        contextObj.commonService.loadCustomizeReportData(JSON.stringify(listParams), 0, false).subscribe(function (result) {
            contextObj.itemsSourceAddEdit = JSON.parse(result);
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    applyCustomRptClick(event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    }

}