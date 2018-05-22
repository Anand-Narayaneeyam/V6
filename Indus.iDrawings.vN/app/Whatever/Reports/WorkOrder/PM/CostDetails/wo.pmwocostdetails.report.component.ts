import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';



@Component({
    selector: 'wo-pmwocostdetails-report',
    template: `
    <page  [pagetitle]="pagePath">
        <content>
            <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>
            </div>
        </content>
    </page>

  `,
    directives: [Html5ViewerComponent, PageComponent],
    inputs: ['WorkFlowEntityId', 'WorkOrderNo', 'Date']
})


export class WOPMCostDetailsReportComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    WorkFlowEntityId: number;
    WorkOrderNo: any;
    Date: any;

    ngOnInit() {

        this.ReportData = new WOPMCostDetailsReportComponent();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 160;
        this.ReportData.ExportFileName = "PM Work Order Cost Details Report";
        this.ReportData.ReportTitle = "PM Work Order Cost Details Report";
        this.ReportData.ReportSubTitle = "Work Order Number: " + this.WorkOrderNo + "   Scheduled Date: " + this.Date;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 7498,
            Value: this.WorkFlowEntityId.toString()
        })

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Work Order / PM Work Orders / Work Order Cost Details";

    }

}