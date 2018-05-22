import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { ScheduleReportAddEdit } from '../../../Common/ScheduleReport/schedule-report-addedit.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { CommonService } from '../../../../Models/Common/common.service';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';




@Component({
    selector: 'employees-AverageSquareFootAnalysisReport',
    template: `<page [pagetitle]="pagePath">
    <content>
        <split-view [splitviewObject]="splitviewInput" [pageTitle]="pageTitle" (onSecondaryClose)="onSplitViewClose($event)">
            <primary-view>
            <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>
            </div>
         </primary-view>
            <secondary-view *ngIf="showSheduleReportAddEdit && splitviewInput.showSecondaryView == true && ReportData.ExportFileName!='' ">
                <schedule-report-addedit [reportData]="ReportData" (insertSuccess)="handleInsertSuccess($event)"></schedule-report-addedit>
            </secondary-view>
            </split-view>
</content>
</page>
  `,
    directives: [Html5ViewerComponent, PageComponent, ScheduleReportAddEdit, SplitViewComponent],
    providers: [CommonService],
    inputs: ['Ids', 'reportBy', 'orgName']
})


export class EmployeesAverageSquareFootAnalysisComponent implements OnInit, IReportDataEntity {
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
    orgName: string;


    showSheduleReportAddEdit: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    pageTitle: string;
    reportCatId: number = 99;
    IsCustomRprt = 0;
    hasScheduledReport: boolean = false;


    ngOnInit() {
        var CommonService: any;
        this.ReportData = new EmployeesAverageSquareFootAnalysisComponent(CommonService);
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 5; 
        this.ReportData.ReportCategoryId = 99; 
        this.ReportData.ReportSubTitle = "";

        switch (this.reportBy) {
            case 1: this.ReportData.ReportTitle = "Average Square Foot Analysis by Site ";
                this.ReportData.ExportFileName = "Average Square Foot Analysis by Site ";
                break;
            case 2: this.ReportData.ReportTitle = "Average Square Foot Analysis by Building";
                this.ReportData.ExportFileName = "Average Square Foot Analysis by Building";
                break;
            case 3: this.ReportData.ReportTitle = "Average Square Foot Analysis by Floor ";
                this.ReportData.ExportFileName = "Average Square Foot Analysis by Floor ";
                break;
            case 14: this.ReportData.ReportTitle = "Average Square Foot Analysis by "+ this.orgName;
                this.ReportData.ExportFileName = "Average Square Foot Analysis by "+ this.orgName;
                this.reportBy = 4;
                break;          
            default: this.ReportData.ReportTitle = "Average Square Foot Analysis by Floor";
                this.ReportData.ExportFileName = "Average Square Foot Analysis by Floor";
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
            ReportFieldId: 1960,
            Value: this.orgName.toString()
        })

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Employees / Square Foot Analysis";

        this.checkForScheduledReport();
    }

    showSheduleReport(event) {
        debugger
        var contextObj = this;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.showSheduleReportAddEdit = true;
    }

    handleInsertSuccess(event) {

        this.splitviewInput.showSecondaryView = false;
    }

    constructor(private commonService: CommonService) { }

    checkForScheduledReport() {
        var contextObj = this;
        contextObj.commonService.CheckHasScheduledReport(contextObj.reportCatId, contextObj.IsCustomRprt).subscribe(function (result) {

            if (result.ServerId == 1) {
                contextObj.hasScheduledReport = true;
            }
            else {
                contextObj.hasScheduledReport = false;
            }
        });
    }

}