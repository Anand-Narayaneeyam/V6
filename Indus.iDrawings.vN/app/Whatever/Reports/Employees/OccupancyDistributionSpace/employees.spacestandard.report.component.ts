import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';




@Component({
    selector: 'employees-SpaceStandardReport',
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
    inputs: ['Ids', 'reportBy']
})


export class EmployeesSpaceStandardComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


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

        this.ReportData = new EmployeesSpaceStandardComponent();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 5; 
        this.ReportData.ReportCategoryId = 326;
        this.ReportData.ReportSubTitle = "";

        switch (this.reportBy) {
            case 1: this.ReportData.ReportTitle = "Occupancy Distribution by Site ";
                this.ReportData.ExportFileName = "Occupancy Distribution by Site ";
                break;
            case 2: this.ReportData.ReportTitle = "Occupancy Distribution by Building";
                this.ReportData.ExportFileName = "Occupancy Distribution by Building";
                break;
            case 3: this.ReportData.ReportTitle = "Occupancy Distribution by Floor ";
                this.ReportData.ExportFileName = "Occupancy Distribution by Floor ";
                break;
            default: this.ReportData.ReportTitle = "Occupancy Distribution by Floor";
                this.ReportData.ExportFileName = "Occupancy Occupancy by Floor";
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

        arrRptFieldIds.push({
            ReportFieldId: 1959,
            Value: "0"      /*  OrgLevel for space standard */
        })
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Employees / Occupancy Distribution - Space Standard";



    }

}