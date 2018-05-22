import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { CommonReportService } from '../../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'wo-schedulesbyequipment-report',
    templateUrl: './app/Views/Reports/WorkOrder/Maintenance/SchedulesbyEquipment/wo.schedulesbyequipment.report.component.html',
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService],
    inputs: ['EquipmentCategoryId', 'EquipmentClassId', 'EquipmentNoId']
})



export class WOSchedulesbyEquipmentReportComponent implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    alignContent: string;
    EquipmentCategoryId: number = 0;
    EquipmentClassId: number = 0;
    EquipmentNoId: any = 0;
    reportCatId: number = 152;
    pageTitle: string;

    constructor(private commonreportservice: CommonReportService) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.alignContent = "horizontal";
        this.pagePath = "Reports / Work Order / General / Schedules by Equipment";
        contextObj.LoadReportData();
    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 152;
        this.ReportData.ExportFileName = "Schedules by Equipment Details";
        this.ReportData.ReportTitle = "Schedules by Equipment Details";
        this.ReportData.ReportSubTitle = "";

        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 4491,
            Value: this.EquipmentCategoryId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 647,
            Value: this.EquipmentClassId.toString()
        });
        arrRptFieldIds.push({
            ReportFieldId: 6377,
            Value: this.EquipmentNoId.toString()
        });

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    }

}