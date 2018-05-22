import {Component, Input, OnInit, AfterViewChecked,SimpleChange} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { CommonReportService } from '../../../../Models/reports/common.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';




@Component({
    selector: 'spaceSpaceFunctionsComponent-report',
    template: `
    <page *ngIf="ExportFileNameCustomized != undefined" [pagetitle]="pagePath">
        <content>
            <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>
            </div>
        </content>
    </page>

  `,
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService]
})


export class SpaceSpaceFunctionsComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string = "Reports / Space / Space Functions ";
    ExportFileNameCustomized: string = "";



    constructor(private commonreportservice: CommonReportService) { }

    ngOnInit() {
        var contexObj = this;
        this.commonreportservice.getSpaceFunctionCustomizedName().subscribe(function (resultData) {
            if (resultData.Data != undefined) {
                contexObj.ExportFileNameCustomized = resultData.Data;

                if (contexObj.ExportFileNameCustomized != "")
                {
                    contexObj.pagePath = "Reports / Space / " + contexObj.ExportFileNameCustomized;
                }
            }
            setTimeout(function () {
                contexObj.LoadReportData();
            }, 50);
        });
    }




    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 97;
        this.ReportData.ExportFileName = this.ExportFileNameCustomized;
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
   

    }



}