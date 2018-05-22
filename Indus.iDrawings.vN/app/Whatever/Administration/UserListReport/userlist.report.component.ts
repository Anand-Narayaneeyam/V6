import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../Models/Common/General';


@Component({
    selector: 'report',
    template: `
    <div style="width:100%;height:100%" *ngIf="adminReportData != undefined">
    <reportviewer [reportData]=adminReportData > Loading ...</reportviewer>
    </div>

  `,
    directives: [Html5ViewerComponent]
})


export class UserListComponent implements OnInit, IReportDataEntity {
    public adminReportData: IReportDataEntity;


    ModuleId: number ;
    ReportCategoryId: number ;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
   // pageTitle: string = "Reports";
    pagePath: string;
   
    @Input() MId: string;
    @Input() RCId: string;
    @Input() FileName: string;

    //get ModuleId(): number {
    //    return this._ModuleId;
    //}
    //set ModuleId(moduelid: number) {
    //    this._ModuleId = moduelid;
    //}

    //get ReportCategoryId(): number {
    //    return this._ReportCategoryId;
    //}
    //set ReportCategoryId(reportcategory: number) {
    //    this._ReportCategoryId = reportcategory;
    //}

    //  get ExportFileNamed(): string {
    //      return this._ExportFileName;
    //}
    //set ExportFileName(exportfilename: string) {
    //    this._ExportFileName = exportfilename;
    //}

    ngOnInit() {
       
        this.adminReportData = new UserListComponent();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.adminReportData.ModuleId = 0; //this.MId;
        this.adminReportData.ReportCategoryId = 3; //this.RCId;
        this.adminReportData.ExportFileName = "SiteList"; //this.FileName
        this.adminReportData.ReportTitle= "Technicians";
        this.adminReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.adminReportData.ModuleId .toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.adminReportData.ReportCategoryId.toString()
        })
        this.adminReportData.ListReportFieldIdValues = arrRptFieldIds;

     
        this.pagePath = "Administration / Reports";
        
    }

}