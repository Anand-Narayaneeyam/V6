﻿import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { CommonReportService } from '../../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { SplitViewComponent } from '../../../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../../../Framework/Models/Interface/ISplit-view';
import { CommonService } from '../../../../../Models/Common/common.service';
import { ScheduleReportAddEdit } from '../../../../Common/ScheduleReport/schedule-report-addedit.component';


@Component({
    selector: 'wo-pmproductivity-report',
    template: `
<page [pagetitle]="pagePath">
    <content>
        <split-view [splitviewObject]="splitviewInput" [pageTitle]="pageTitle" (onSecondaryClose)="onSplitViewClose($event)">
            <primary-view>

        <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
        <div *ngIf="!IsTextType" style="padding-left: 1%;margin-top:9px;display:inline-flex;">                        
                        <div *ngIf="hasScheduledReport">
                            <button class="Savebutton " style="margin-right:5px;" type="button" (click)="showSheduleReport($event)">Schedule this report</button>
                        </div>
                    </div>
        <reportviewer [reportData]=ReportData > Loading ...</reportviewer>
        </div>

            </primary-view>
            <secondary-view *ngIf="showSheduleReportAddEdit && splitviewInput.showSecondaryView == true && ReportData.ExportFileName!='' ">
                <schedule-report-addedit [reportData]="ReportData" (insertSuccess)="handleInsertSuccess($event)"></schedule-report-addedit>
            </secondary-view>
            </split-view>
</content>
</page>
    `,
    directives: [Html5ViewerComponent, PageComponent, SplitViewComponent,ScheduleReportAddEdit],
    providers: [CommonReportService, CommonService],
    inputs: ['TradeId', 'TechnicianId', 'WorkTypeId']
})



export class WOPMProductivityReportComponent implements OnInit {
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
    TradeId: any = 0;
    TechnicianId: any = 0;

    reportCatId: number = 140;
    IsCustomRprt = 0;
    hasScheduledReport: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    showSheduleReportAddEdit: boolean = false;
    pageTitle: string;

    constructor(private commonreportservice: CommonReportService, private commonService: CommonService) { }

    ngOnInit() {
        var contextObj = this;

        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / PM Work Orders / Work Order Productivity by Technician";
        contextObj.LoadReportData();
        contextObj.checkForScheduledReport();
    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 140;
        this.ReportData.ExportFileName = "Work Order Productivity by Technician";
        this.ReportData.ReportTitle = "Work Order Productivity by Technician";
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
            ReportFieldId: 1416,
            Value: this.WorkTypeId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 1388,
            Value: this.TradeId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 7503,
            Value: this.TechnicianId.toString()
        });

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";

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
        debugger
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    }


    handleInsertSuccess(event) {

        this.splitviewInput.showSecondaryView = false;
    }


}