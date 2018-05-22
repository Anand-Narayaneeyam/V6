import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';


@Component({
    selector: 'EmployeeHiringRate',
    template: `
    <page  [pagetitle]="pagePath">
        <content>
            <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>
            </div>
        </content>
    </page>

  `,
    directives: [Html5ViewerComponent,  PageComponent]
})


export class EmployeeHiringRate implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    OrgUnitId: string = "0";
    FromDate: string = "";
    ToDate: string = "";
    ForcastToYear: string = "0";
    ForcastByPercentage: string = "0";


    ngOnInit() {

        this.ReportData = new EmployeeHiringRate();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 5; 
        this.ReportData.ReportCategoryId = 325; 
        this.ReportData.ExportFileName = "Trend Analysis - Employee Hiring Rate";
        this.ReportData.ReportTitle = "Trend Analysis - Employee Hiring Rate";
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
            ReportFieldId: 1965,
            Value: this.OrgUnitId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.FromDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.ToDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 7907,
            Value: this.ForcastToYear.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 5080,
            Value: this.ForcastByPercentage.toString()
        })

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = " Employees / Hiring Rate";


   }

}