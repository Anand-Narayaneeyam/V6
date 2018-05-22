import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'wo-srfeedback-report',
    template: `
        <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
        <reportviewer [reportData]=ReportData > Loading ...</reportviewer>
        </div>
    `,
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService],
    inputs: ['FromDate', 'ToDate', 'WorkTypeId', 'Title']
})



export class WOSRFeedbackReportComponent implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    alignContent: string;
    WorkTypeId: any = 67;
    FromDate: any;
    ToDate: any;
    Title: any = "";

    constructor(private commonreportservice: CommonReportService) { }

    ngOnInit() {
        var contextObj = this;

        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / General / Service Request Feedback";            
        contextObj.LoadReportData();
    }

    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 385;
        this.ReportData.ExportFileName = "Service Request Feedback";
        this.ReportData.ReportTitle = "Service Request Feedback";
        this.ReportData.ReportSubTitle = this.Title;

        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });

        arrRptFieldIds.push({
            ReportFieldId: 1416,
            Value: this.WorkTypeId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.FromDate.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.ToDate.toString()
        });

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    }
}