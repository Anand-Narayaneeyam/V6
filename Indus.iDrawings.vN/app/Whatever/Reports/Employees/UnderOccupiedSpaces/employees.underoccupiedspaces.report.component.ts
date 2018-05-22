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
    selector: 'employees-UnderOccupiedSpacesReport',
    template: `<page [pagetitle]="pagePath">
    <content>
        <split-view [splitviewObject]="splitviewInput" [pageTitle]="pageTitle" (onSecondaryClose)="onSplitViewClose($event)">
            <primary-view>
            <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <div style="padding-left: 1%;margin-top:9px;display:inline-flex;">
                                                    <div *ngIf="hasScheduledReport">
                                                        <button class="Savebutton " style="margin-right:5px;" type="button" (click)="showSheduleReport($event)">Schedule this report</button>
                                                    </div>
                                                </div>
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


export class EmployeesUnderOccupiedSpacesComponent implements OnInit, IReportDataEntity {
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
    reportCatId: number = 101;
    IsCustomRprt = 0;
    hasScheduledReport: boolean = false;


    ngOnInit() {
        var CommonService: any;
        this.ReportData = new EmployeesUnderOccupiedSpacesComponent(CommonService);
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 5; 
        this.ReportData.ReportCategoryId = 101;
        this.ReportData.ReportSubTitle = "";

        switch (this.reportBy) {
            case 1: this.ReportData.ReportTitle = "Under Occupied Spaces by Site ";
                this.ReportData.ExportFileName = "Under Occupied Spaces by Site ";
                break;
            case 2: this.ReportData.ReportTitle = "Under Occupied Spaces by Building";
                this.ReportData.ExportFileName = "Under Occupied Spaces by Building";
                break;
            case 3: this.ReportData.ReportTitle = "Under Occupied Spaces by Floor ";
                this.ReportData.ExportFileName = "Under Occupied Spacesby Floor ";
                break;

            case 14: this.ReportData.ReportTitle = "Under Occupied Spaces by " + this.orgName;;
                this.ReportData.ExportFileName = "Under Occupied Spaces by " + this.orgName;
                this.reportBy = 4;
                break;
            default: this.ReportData.ReportTitle = "Under Occupied Spaces by Floor";
                this.ReportData.ExportFileName = "Under Occupied Spaces by Floor";
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
            ReportFieldId: 3455,
            Value: "2"
        })

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Employees / Under Occupied Spaces";

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