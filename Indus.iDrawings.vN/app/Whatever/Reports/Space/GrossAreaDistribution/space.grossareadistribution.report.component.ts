import { Component, Input, OnInit } from '@angular/core';
import { Html5ViewerComponent } from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import { IReportDataEntity } from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray } from '../../../../Models/Common/General';
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import { ScheduleReportAddEdit } from '../../../Common/ScheduleReport/schedule-report-addedit.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { CommonService } from '../../../../Models/Common/common.service';


@Component({
    selector: 'spacegrossareadistribution-report',
    templateUrl: './app/Views/Reports/Space/GrossAreaDistribution/space.grossareadistribution.report.html',
    directives: [Html5ViewerComponent, DropDownListComponent, PageComponent, SplitViewComponent, ScheduleReportAddEdit],
    providers: [CommonReportService, CommonService],
    inputs: ['Ids', 'reportBy']
})

export class SpaceGrossAreaDistributionComponent implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    ddlspacegrossareareport: IField = undefined;
    alignContent: string;
    ReportType: any = 0;
    reportBy: any;
    Ids: string;
    IsFloorbool: boolean = false;
    IsFloor: any = 0;
    showSheduleReportAddEdit: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    pageTitle: string;
    reportCatId: number = 89;
    IsCustomRprt = 0;
    hasScheduledReport: boolean = false;
    IsTextType: boolean = false;

    constructor(private commonreportservice: CommonReportService, private commonService: CommonService) { }

    ngOnInit() {
        var contexObj = this;
        this.commonreportservice.ddlLoadReportType().subscribe(function (resultData) {
            contexObj.ddlspacegrossareareport = resultData.Data[0];
            contexObj.ddlspacegrossareareport.FieldValue = "16";
            contexObj.ddlspacegrossareareport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });

        });
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / Space / Gross Area Distribution";
        contexObj.LoadReportData();
        contexObj.checkForScheduledReport();
    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 89;
        this.ReportData.ExportFileName = "Gross Area Distribution";
        this.ReportData.ReportTitle = "Gross Area Distribution";
        this.ReportData.ReportSubTitle = "";
        if (this.IsFloorbool == false) {
            this.IsFloor = 0;
        }
        else if (this.IsFloorbool == true) {
            this.IsFloor = 1;
        }
        if (this.ReportType == "1" || this.ReportType == "2") {
            this.IsFloor = 0;
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
            ReportFieldId: 4307,
            Value: this.IsFloor.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 1986,
            Value: this.ReportType.toString()
        })
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    }

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

    onChangeType(event: any) {
        switch (event) {

            case "16": this.ReportType = "0";
                this.IsTextType = false;
                break;
            case "17": this.ReportType = "1";
                this.IsTextType = true;
                break;
            case "18": this.ReportType = "2";
                this.IsTextType = true;
                break;
            default: this.ReportType = "0";
                this.IsTextType = false;
                break;
        }
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);

    }

    onSubmit(event) {
        this.IsFloorbool = !this.IsFloorbool;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);

    }

    showSheduleReport(event) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    }

    onSplitViewClose(event) {

        this.splitviewInput.showSecondaryView = false;
    }
    
    handleInsertSuccess(event) {

        this.splitviewInput.showSecondaryView = false;
    }


}