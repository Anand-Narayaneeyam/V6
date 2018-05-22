import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { ScheduleReportAddEdit } from '../../../Common/ScheduleReport/schedule-report-addedit.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { CommonService } from '../../../../Models/Common/common.service';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import {CustomReportAddEdit} from '../../../common/custom reports/customreport-addedit.component';
import {IField} from  '../../../../Framework/Models/Interface/IField';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'employees-CancelledMoves',
    templateUrl: './app/Views/Reports/Employee/CancelledMoves/employees.cancelledmoves.report.html',
    directives: [Html5ViewerComponent, PageComponent, ScheduleReportAddEdit, SplitViewComponent, CustomReportAddEdit],
    providers: [CommonService, NotificationService]
})


export class EmployeesCancelledMovesComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;

    reportCatId: number = 56;
    IsCustomRprt: number = 0;
    showSheduleReportAddEdit: boolean = false;
    showCustomize: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    pageTitle: string;        
    hasScheduledReport: boolean = false;

    fieldObjectAddEdit: IField[];
    itemsSourceAddEdit: any[];
    needModulePrefix: any = 0;
    isFromCorrectionProject: any = 0;
    listFieldDetails: any[];
    showMyDef: boolean = true;
    showSetMyDef: boolean = true;
    IsMobile: boolean = window["IsMobile"]; 
    constructor(private commonService: CommonService, private notificationService: NotificationService) { }

    ngOnInit() {
        var CommonService: any;
        this.LoadReportData(0);
        this.pagePath = "Reports / Employees / Cancelled Moves";
        this.checkForScheduledReport()
    }

    LoadReportData(IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId = 56;
        this.ReportData.ExportFileName = "Employee Move Details Report(CancelledMoves)";
        this.ReportData.ReportTitle = "Employee Move Details Report (Cancelled Moves)";
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
            ReportFieldId: 3356,
            Value: "3"
        })
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    }

    showSheduleReport(event) {
        debugger
        var contextObj = this;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.showSheduleReportAddEdit = true;
        contextObj.showCustomize = false;
        contextObj.splitviewInput.secondaryArea = 70;
    }

    handleInsertSuccess(event) {

        this.splitviewInput.showSecondaryView = false;
    }

    checkForScheduledReport() {
        var contextObj = this;
        contextObj.commonService.CheckHasScheduledReport(contextObj.reportCatId, contextObj.IsCustomRprt).subscribe(function (result) {

            if (result.ServerId == 1) {
                contextObj.hasScheduledReport = true;
            }
            else {
                contextObj.hasScheduledReport = false;
            }
        });
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
            { ReportFieldId: 66, Value: "" }
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





   
