﻿import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';


@Component({
    selector: 'SchedulingReport-UnderUtilizedSeats',
    template: `
    <page  [pagetitle]="pagePath">
        <content>
        <div *ngIf="ReportData != undefined">
            <reportviewer [reportData]=ReportData> Loading ...</reportviewer>
        </div>
        </content>
    </page>

  `,
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService],
    inputs: ['fromDate', 'toDate']
})



export class SchedulingReportUnderUtilizedSeatsComponent implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    fromDate: any = "";
    toDate: any = "";
    SiteId: any = 0;
    BuildingId: any = 0;
    FloorId: any = 0;


    constructor(private commonreportservice: CommonReportService) { }

    ngOnInit() {
        this.LoadReportData();
        this.pagePath = "Reports / Scheduling / Under Utilized Workspaces (Less than 20%)";
    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 14;
        this.ReportData.ReportCategoryId = 423;
        this.ReportData.ExportFileName = "Under Utilized Workspaces (Less than 20%)";
        this.ReportData.ReportTitle = "Under Utilized Workspaces (Less than 20%)";
        this.ReportData.ReportSubTitle = "Date Period: " + this.fromDate + " to " + this.toDate;

        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 6707,
            Value: this.fromDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 6708,
            Value: this.toDate.toString()
        })

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    }


}