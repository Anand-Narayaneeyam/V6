import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';


@Component({
    selector: 'SchedulingReport-CancelledReservationDetails',
    template: `
    <page  [pagetitle]="pagePath">
        <content>
        <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <reportviewer [reportData]=ReportData> Loading ...</reportviewer>
        </div>
        </content>
    </page>
  `,
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService],
    inputs: ['fromDate', 'toDate', 'SiteId', 'BuildingId', 'FloorId', 'selectedTeam']
})



export class SchedulingReportCancelledReservationDetails implements OnInit {
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
    StatusId: any = "39,88";
    selectedTeam: string;

    constructor(private commonreportservice: CommonReportService) { }

    ngOnInit() {
        this.LoadReportData();
        this.pagePath = "Reports / Scheduling / Cancelled Reservation Details";
    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 14;
        this.ReportData.ReportCategoryId = 428;
        this.ReportData.ExportFileName = "Cancelled Reservation Details";
        this.ReportData.ReportTitle = "Cancelled Reservation Details";
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
            ReportFieldId: 900194,
            Value: this.fromDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.toDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 7275,
            Value: this.SiteId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 7276,
            Value: this.BuildingId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 7277,
            Value: this.FloorId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 6716,
            Value: this.StatusId.toString()
        })
        if (this.selectedTeam != undefined && this.selectedTeam != null && this.selectedTeam != "") {
            arrRptFieldIds.push({
                ReportFieldId: 500368,
                Value: this.selectedTeam.toString()
            })
        }
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    }


}