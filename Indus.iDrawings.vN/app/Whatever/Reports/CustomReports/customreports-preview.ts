import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Html5ViewerComponent} from '../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../Models/Common/General';
import { CommonReportService } from '../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';


@Component({
    selector: 'custom-reportviewer',
    template: `
    <page  [pagetitle]="pagePath">
        <content>
            <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <reportviewer *ngIf ="dataForCustomReport != undefined" [reportData]=ReportData > Loading ...</reportviewer>
            </div>
        </content>
    </page>

  `,
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService],
    inputs: ['moduleId', 'fieldData', 'customReportFields', 'isPreview', 'reportId','filterQuery']
})


export class CustomReportViewerComponent implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [], CustomReportFields: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string ;
    reportTitle: string = "";
    moduleId: number = 0 ;
    fieldData: any;
    customReportFields: any;
    isPreview: boolean = false;
    Orientation: number = 0;       /*0 - portrait, 1- landscape */
    forPreview: number = 0;
    reportId: number = 0 ;
    needPrefix: string = "False";
    dataForCustomReport: any = undefined;
    moduleName: string = "";
    filterQuery: any;


    constructor(private commonreportservice: CommonReportService) { }

    ngOnInit() {
        if (this.isPreview == true) {
            this.forPreview = 1;
            var reportData = JSON.parse(this.fieldData);
            this.reportTitle = reportData[1].Value;
            if (reportData[2].Value == "35") {
                this.Orientation = 0;
            }
            else if (reportData[2].Value == "36") {
                this.Orientation = 1;
            }
            this.dataForCustomReport = "";
            this.LoadReportData();
        }
        else {
            this.forPreview = 0;
            this.getData(); 
        }       
        
    }


    getData() {
        var contextObj = this;
        contextObj.commonreportservice.getDetailsforCustomReport(50897, contextObj.reportId).subscribe(function (resultData) {
            contextObj.dataForCustomReport = JSON.parse(resultData["Data"]);
            contextObj.moduleId = contextObj.dataForCustomReport[0]["ModuleId"];
            contextObj.needPrefix = contextObj.dataForCustomReport[0]["NeedPrefixForField"];
            contextObj.reportTitle = contextObj.dataForCustomReport[0]["Heading"];

            if (contextObj.dataForCustomReport.length == 1) {
                contextObj.LoadReportData();
            }
        });
    }

    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = this.moduleId;
        this.ReportData.ReportCategoryId = 0;
        this.ReportData.ExportFileName = this.reportTitle;
        this.ReportData.ReportTitle = this.reportTitle;
        this.ReportData.ReportSubTitle = "";
        this.ReportData.ReportsTypeId = 0;
        this.ReportData.CustomReportFields = this.customReportFields;
       
        this.ReportData.CustomReportFilterQuery = "";
     
        if (this.filterQuery != "" && this.filterQuery != undefined) {
            this.ReportData.ListCustomReportFilterFieldIdValues = JSON.parse(this.filterQuery);
        }


        if (this.forPreview == 0) {
            switch (this.moduleId) {
                case 2:
                    this.moduleName = "Projects";
                    break;
                case 3: this.moduleName = "Space";
                    break;
                case 5: this.moduleName = "Employees";
                    break;
                case 7: this.moduleName = "Assets";
                    break;
                case 9: this.moduleName = "Work Order";
                    break;
                case 30: this.moduleName = "Real Property";
                    break;
                case 8: this.moduleName = "Furniture";
                    break;
                case 12: this.moduleName = "CAI";
                    break;
                default: this.moduleName = "Custom Reports";
            }
            this.pagePath = "Reports / " + this.moduleName + " / Custom Reports - " + this.reportTitle;
        }
        else {
            switch (this.moduleId) {
                case 2:
                    this.pagePath = "Settings / Projects / General Settings";
                    break;
                case 3: this.pagePath = "Settings / Space / General Settings";
                    break;
                case 5: this.pagePath = "Settings / Employees / General Settings";
                    break;
                case 7: this.pagePath = "Settings / Assets / General Settings";
                    break;
                case 9: this.pagePath = "Settings / Work Order / PM Settings";
                    break;
                case 30: this.pagePath = "Settings / Real Property / GeneralSettings";
                    break;
                case 8: this.pagePath = "Settings / Furniture / GeneralSettings";
                    break;
                case 12: this.pagePath = "Settings / CAI / GeneralSettings";
                    break;
            }
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
            ReportFieldId: 154,
            Value: this.Orientation.toString()
        })

        arrRptFieldIds.push({
            ReportFieldId: 3356,
            Value: this.forPreview.toString()
        })

        arrRptFieldIds.push({
            ReportFieldId: 147,
            Value: this.reportId.toString()
        })

        arrRptFieldIds.push({
            ReportFieldId: 500044,
            Value: this.needPrefix.toString()
        })

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
      
    }
}