import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';



@Component({
    selector: 'spaceGrossAreaReport-Component',
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
    inputs: ['Ids','reportBy']
})

export class SpaceGrossAreaReportComponent implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    reportBy: number;
    Ids: string;


    ngOnInit() {
        var contexObj = this;
        this.pagePath = "Reports / Space / Gross Area Report";
        contexObj.LoadReportData();

    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 226;
        this.ReportData.ExportFileName = "Gross Area Report";
        this.ReportData.ReportSubTitle = "";
        switch (this.reportBy) {
            case 1: this.ReportData.ReportTitle = "Gross Area Report by Site ";
                    this.ReportData.ExportFileName = "Gross Area Report by Site ";
                    break;
            case 2: this.ReportData.ReportTitle = "Gross Area Report by Building";
                    this.ReportData.ExportFileName = "Gross Area Report by Building";
                    break;
            case 3: this.ReportData.ReportTitle = "Gross Area Report by Floor ";
                    this.ReportData.ExportFileName = "Gross Area Report by Floor ";
                    break;
            default: this.ReportData.ReportTitle = "Gross Area Report by Floor";
                     this.ReportData.ExportFileName = "Gross Area Report by Floor";
                     break;
        }

        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 3356,
            Value: this.reportBy.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 3650,
            Value: this.Ids.toString()
        })

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
  

    }

}