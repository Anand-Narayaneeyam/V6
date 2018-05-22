import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';


@Component({
    selector: 'employee-trend-reportviewer',
    templateUrl: './app/Views/Employee/TrendAnalysis/TrendReport/employee.trend.reportviewer.html',
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService],
    inputs: ['snapshotId', 'reportType','reportTitle']
})



export class EmployeeTrendReportViewer implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    snapshotId :any = 0;
    reportType: any = 0;
    reportTitle: string = "";


    constructor(private commonreportservice: CommonReportService) { }

    ngOnInit() {

        this.LoadReportData();
    }


    LoadReportData() {
        this.pagePath = "Employees / Snapshots";
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId =0;
        this.ReportData.ExportFileName = this.reportTitle;
        this.ReportData.ReportTitle = this.reportTitle;
        this.ReportData.ReportSubTitle = "";
        this.ReportData.ReportsTypeId = this.reportType;

        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 2483,
            Value: this.snapshotId.toString()
        })
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    }



}