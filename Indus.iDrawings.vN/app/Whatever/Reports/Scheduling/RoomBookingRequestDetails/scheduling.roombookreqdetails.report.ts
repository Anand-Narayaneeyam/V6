import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { SchedulingService } from '../../../../Models/Scheduling/scheduling.service';

@Component({
    selector: 'SchedulingReport-RoomBookingRequestDetails',
    template: `
    <page  [pagetitle]="pagePath">
        <content>
        <div *ngIf="ReportData != undefined && ReportData.ReportCategoryId > 0">
            <reportviewer [reportData]=ReportData> Loading ...</reportviewer>
        </div>
        </content>
    </page>

  `,
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService, SchedulingService],
    inputs: ['fromDate', 'toDate']
})



export class SchedulingReportRoomBookingRequestDetails implements OnInit {
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
    roomtxt = "Room";

    constructor(private commonreportservice: CommonReportService, private SchedulingService: SchedulingService) { }

    ngOnInit() {
        var contextObj = this;
        this.SchedulingService.checkSubscribedFeature('275').subscribe(function (result) {//275
            debugger
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtxt = result["Data"][0].Value;
            }
            contextObj.pagePath = "Reports / Scheduling / " + contextObj.roomtxt + " Reservation Details";
            contextObj.LoadReportData();           
        });
    }


    LoadReportData() {
        debugger
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 14;
        this.ReportData.ReportCategoryId = 412;
        this.ReportData.ExportFileName = this.roomtxt+" Reservation Details";
        this.ReportData.ReportTitle = this.roomtxt+" Reservation Details";
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
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    }


}