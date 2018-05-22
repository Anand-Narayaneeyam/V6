import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';



@Component({
    selector: 'wo-srwocostdetails-report',
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
    inputs: ['WorkOrderId', 'RequestNo', 'Description']
})


export class WOSRCostDetailsReportComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    WorkOrderId: number;
    RequestNo: any;
    Description: any;

    ngOnInit() {

        this.ReportData = new WOSRCostDetailsReportComponent();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 161;
        this.ReportData.ExportFileName = "SR Work Order Cost Details Report";
        this.ReportData.ReportTitle = "SR Work Order Cost Details Report";
        this.ReportData.ReportSubTitle = "Request Number: " + this.RequestNo + "   Description: " + this.Description;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 4177,
            Value: this.WorkOrderId.toString()
        })

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Work Order / Service Requests / Work Order Cost Details";

    }

}