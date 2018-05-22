import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';



@Component({
    selector: 'woSRWorkFlowHistoryComponent-report',
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
    inputs: ['selectedIds', 'selectedworkTypeId', 'workflowEntityCategoryId','currentWorkFlowActionPointId']
})


export class WOSRWorkFlowHistoryReportComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    selectedworkTypeId: number;
    selectedIds: number;
    workflowEntityCategoryId: any;
    currentWorkFlowActionPointId: any;


    ngOnInit() {
        this.ReportData = new WOSRWorkFlowHistoryReportComponent();
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 9;

        if (this.workflowEntityCategoryId == 1) {
            this.ReportData.ReportCategoryId = 157;
        }
        else {
            this.ReportData.ReportCategoryId = 297; 
        }

        this.ReportData.ExportFileName = "Workflow History Report";
        this.ReportData.ReportTitle = "Workflow History Report";
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
            ReportFieldId: 7611,               
            Value: this.workflowEntityCategoryId.toString()
        })
        arrRptFieldIds.push({             
            ReportFieldId: 5861,
            Value: this.selectedworkTypeId.toString()
        })
        arrRptFieldIds.push({               
            ReportFieldId: 1438,
            Value: this.selectedIds.toString()
        })

        arrRptFieldIds.push({             
            ReportFieldId: 5863,
            Value: this.currentWorkFlowActionPointId.toString()
        })

        arrRptFieldIds.push({              
            ReportFieldId: 67,
            Value: "5"
        })

        arrRptFieldIds.push({              
            ReportFieldId: 3382,
            Value: "0"
        })

        arrRptFieldIds.push({              
            ReportFieldId: 3884,
            Value: "7"
        })

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Work Order / Service Requests / Workflow History";

    }

}