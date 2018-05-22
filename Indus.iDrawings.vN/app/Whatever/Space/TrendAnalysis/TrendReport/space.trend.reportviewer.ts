import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';


@Component({
    selector: 'space-trend-reportviewer',
    templateUrl: './app/Views/Space/TrendAnalysis/TrendReport/space.trend.reportviewer.html',
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService],
    inputs: ['snapshotId', 'reportType', 'fromDate', 'toDate','reportTitle','pagePath']
})



export class SpaceTrendReportViewer implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    showButton: boolean = false;
    snapshotId :any = 0;
    reportType: any = 0;
    fromDate : any = "";
    toDate: any = "";
    reportTitle: string = "";
    IsHistorybool: boolean = false;
    IsHistory: any = 0;
    divRptMargin: string = "0px";


    constructor(private commonreportservice: CommonReportService) { }

    ngOnInit() {
        this.pagePath = this.pagePath;
        if (this.reportType == 11 || this.reportType == 12 || this.reportType == 13 || this.reportType == 14) {
            this.showButton = true;
            this.divRptMargin = "45px";
        }
        else {
            this.showButton = false;
        }

        this.LoadReportData();
    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId =0;
        this.ReportData.ExportFileName = this.reportTitle;
        this.ReportData.ReportTitle = this.reportTitle;
        this.ReportData.ReportSubTitle = "";
        this.ReportData.ReportsTypeId = this.reportType;
        if (this.IsHistorybool == false) {
            this.IsHistory = 0;
        }
        else if (this.IsHistorybool == true) {
            this.IsHistory = 11;
        }

        if (this.showButton == true) {
            this.ReportData.ReportSubTitle = "Trend Period: " + this.fromDate + " to " + this.toDate;
        }
        else {
            this.ReportData.ReportSubTitle = "";
        }

        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 4307,
            Value: this.IsHistory.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.fromDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.toDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 2483,
            Value: this.snapshotId.toString()
        })
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    }

    onSubmit(event) {
        this.IsHistorybool = !this.IsHistorybool;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);

    }

}