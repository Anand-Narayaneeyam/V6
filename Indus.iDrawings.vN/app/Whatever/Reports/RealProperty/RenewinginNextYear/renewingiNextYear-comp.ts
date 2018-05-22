import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';



@Component({
    selector: 'realProperty.LeaseRenewinginNextYear.report',
    template: `
    <page  [pagetitle]="pagePath">
        <content>
            <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>
            </div>
        </content>
    </page>

  `,
    directives: [Html5ViewerComponent, PageComponent]
})


export class realPropertyLeaseRenewinginNextYearReport implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;

    ngOnInit() {

        this.ReportData = new realPropertyLeaseRenewinginNextYearReport();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 30;
        this.ReportData.ReportCategoryId = 315;
        this.ReportData.ExportFileName = "Lease Renewing in Next Year";
        this.ReportData.ReportTitle = "Lease Renewing in Next Year";
        this.ReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Real Property / Lease Renewing in Next Year";

    }

}
