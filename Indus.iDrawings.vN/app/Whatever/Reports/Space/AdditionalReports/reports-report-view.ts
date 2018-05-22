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
    selector: 'additionalReport-report',
    templateUrl: './app/Views/Reports/Space/AdditionalReports/reports-report-view.html',
    directives: [Html5ViewerComponent, DropDownListComponent, PageComponent, SplitViewComponent, ScheduleReportAddEdit],
    providers: [CommonReportService, CommonService],
    inputs: ['Ids', 'reportBy', 'reportFieldId', 'reportName']
})

export class AdditionalReportComponent implements OnInit {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    ddladdtnlreport: IField = undefined;
    alignContent: string;
    ReportType: any = 0;
    reportBy: any;
    Ids: string;
    IsFloorbool: boolean = false;
    IsFloor: any = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    pageTitle: string;
    reportFieldId: number;
    reportName: string = "";
    fieldId: number;
    disableButton: boolean = false;

    constructor(private commonreportservice: CommonReportService, private commonService: CommonService) { }

    ngOnInit() {
        
        var contexObj = this;
        this.commonreportservice.ddlCAILoadReportType().subscribe(function (resultData) {

            contexObj.ddladdtnlreport = resultData.Data[0];
            contexObj.ddladdtnlreport.FieldValue = "86";
            contexObj.ddladdtnlreport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });

        });
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / Space / Additional Reports - " + this.reportName;

        if (this.reportFieldId == -1)
            this.fieldId = 193;
        else if (this.reportFieldId == 0)
            this.fieldId = 59;
        else
            this.fieldId = this.reportFieldId;

        contexObj.LoadReportData();
    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 0;
        this.ReportData.ReportsTypeId = 6;
        this.ReportData.ExportFileName = "Area Distribution by " + this.reportName;
        this.ReportData.ReportTitle = "Area Distribution by " + this.reportName;
        this.ReportData.ReportSubTitle = "";
        if (this.IsFloorbool == false) {
            this.IsFloor = 0;
        }
        else if (this.IsFloorbool == true) {
            this.IsFloor = 1;
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
            ReportFieldId: 781,
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
        arrRptFieldIds.push({
            ReportFieldId: 22,
            Value: this.reportFieldId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 1904,
            Value: this.reportName.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 3428,
            Value: this.fieldId.toString()
        })
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.alignContent = "horizontal";
    }

    onChangeType(event: any) {
        switch (event) {

            case "86": this.ReportType = "0";
                break;
            case "87": this.ReportType = "1";
                break;
            default: this.ReportType = "0";
                break;
        }
        var contexObj = this;
        contexObj.ReportData = undefined;
        if (this.IsFloorbool == false && this.ReportType == "1")
            this.disableButton = true;
        else
            this.disableButton = false;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);

    }

    onSubmit(event) {
        this.IsFloorbool = !this.IsFloorbool;

        var tempDdl = <HTMLInputElement>(document.getElementById("2738"));
        if (this.IsFloorbool == true) {
            tempDdl.style.backgroundColor = "lightgray";
            tempDdl.disabled = true;
        }
        else if (this.IsFloorbool == false) {
            tempDdl.style.backgroundColor = "white";
            tempDdl.disabled = false;
        }

        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);

    }
    onSplitViewClose(event) {

        this.splitviewInput.showSecondaryView = false;
    }


}