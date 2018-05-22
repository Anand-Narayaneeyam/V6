import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'printServiceRequest-report',
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
    inputs: ['rowDatas', 'selectedIds']
})

export class PrintServiceRequestReportComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    rowDatas: any;
    selectedIds: any;

    ngOnInit() {
        this.ReportData = new PrintServiceRequestReportComponent();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 431;
        this.ReportData.ExportFileName = "Print Service Request Report";
        this.ReportData.ReportTitle = "Print Service Request Report";
        this.ReportData.ReportSubTitle = "";
        var arrRptFieldIds = new Array<ReportFieldArray>();
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
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
        if (this.selectedIds.length > 1) {
            for (var i = 0; i < this.rowDatas.length; i++) {
                arrRptFieldIds.push({
                    ReportFieldId: 5861,
                    Value: this.rowDatas[i]["WorkTypeId"]
                })
                if (this.rowDatas[i]["WorkflowEntityCategoryId"] == 1) {
                    arrRptFieldIds.push({
                        ReportFieldId: 1438,
                        Value: this.rowDatas[i]["WorkRequestId"]
                    })
                } else if (this.rowDatas[i]["WorkflowEntityCategoryId"] == 2) {
                    arrRptFieldIds.push({
                        ReportFieldId: 1438,
                        Value: this.rowDatas[i]["WorkOrderId"]
                    })
                }
                arrRptFieldIds.push({
                    ReportFieldId: 5863,
                    Value: this.rowDatas[i]["CurrentWorkFlowActionPointId"]
                })
            }
        } else {
            arrRptFieldIds.push({
                ReportFieldId: 5861,
                Value: this.rowDatas["WorkTypeId"]
            })
            if (this.rowDatas["WorkflowEntityCategoryId"] == 1) {
                arrRptFieldIds.push({
                    ReportFieldId: 1438,
                    Value: this.rowDatas["WorkRequestId"]
                })
            } else if (this.rowDatas["WorkflowEntityCategoryId"] == 2) {
                arrRptFieldIds.push({
                    ReportFieldId: 1438,
                    Value: this.rowDatas["WorkOrderId"]
                })
            }
            arrRptFieldIds.push({
                ReportFieldId: 5863,
                Value: this.rowDatas["CurrentWorkFlowActionPointId"]
            })
        }
       
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Work Order / Service Requests / Print Service Request Report";
    }
}