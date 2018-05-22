import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';



@Component({
    selector: 'realProperty-rentRolls-report-list',
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


export class realPropertyRentRollsReportList implements OnInit, IReportDataEntity {
    @Input() FromRpDate: string = "";
    @Input() ToRpDate: string = "";

    public ReportData: IReportDataEntity;
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
 
    ngOnInit() {

        
        this.ReportData = new realPropertyRentRollsReportList();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 30;
        this.ReportData.ReportCategoryId = 389;
        this.ReportData.ExportFileName = "Rent Rolls";
        this.ReportData.ReportTitle = "Rent Rolls";
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
            ReportFieldId: 5768,
            Value: "0"
        })
        arrRptFieldIds.push({
            ReportFieldId: 5694 ,
            Value: '0'
        })
        if (this.FromRpDate != null || this.FromRpDate != undefined) {
            arrRptFieldIds.push({
                ReportFieldId: 900197,
                Value: this.FromRpDate.toString()
            })
        }
        if (this.ToRpDate != null || this.ToRpDate != undefined) {
            arrRptFieldIds.push({
                ReportFieldId: 900198,
                Value: this.ToRpDate.toString()
            })
        }
        
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Real Property / Rent Rolls";

    }

}