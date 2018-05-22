import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';



@Component({
    selector: 'woPMWorkFlowHistoryComponent-report',
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
    inputs: ['selectedIds','selectedworkTypeId']
})


export class WOPMWorkFlowHistoryReportComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    selectedworkTypeId: number;
    selectedIds: number;



    ngOnInit() {

        this.ReportData = new WOPMWorkFlowHistoryReportComponent();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 295;
        this.ReportData.ExportFileName = "Workflow History Report";
        this.ReportData.ReportTitle = "Workflow History Report";
        this.ReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 7611,
            Value: "3"
        })
        arrRptFieldIds.push({              
            ReportFieldId: 5861,
            Value: this.selectedworkTypeId.toString()
        })
        arrRptFieldIds.push({             
            ReportFieldId: 1438,
            Value: this.selectedIds.toString()
        })


        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Work Order / PM Work Orders / Workflow History";

    }

}