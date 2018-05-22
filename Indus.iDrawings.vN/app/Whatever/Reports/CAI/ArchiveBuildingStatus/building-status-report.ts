import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';


@Component({
    selector: 'archive-buildingStatus-report',
    template: `
    <page  [pagetitle]="pagePath">
        <content>
            <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>
            </div>
        </content>
    </page>
  `,
    directives: [Html5ViewerComponent, PageComponent, SplitViewComponent],
    inputs: ['Ids', 'archiveName', 'createOn']
})


export class ArchiveBuildingStatusReport implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    pageTitle: string;
    showArchive: boolean = false;
    Ids: string;
    archiveName: string = "";
    createOn: string = "";

    ngOnInit() {
        
        this.ReportData = new ArchiveBuildingStatusReport();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 12;
        this.ReportData.ReportCategoryId = 21;
        this.ReportData.ReportsTypeId = 3;
        this.ReportData.ExportFileName = "Building Status on " + this.createOn;
        this.ReportData.ReportTitle = "Building Status on " + this.createOn;
        this.ReportData.ReportSubTitle = "Archive Name: " + this.archiveName;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 1521,
            Value: this.Ids.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 3356,
            Value: "3"
        })
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Archives / Building Status";

    }
}