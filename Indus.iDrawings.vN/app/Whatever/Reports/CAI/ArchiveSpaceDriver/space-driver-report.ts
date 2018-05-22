import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';



@Component({
    selector: 'archiveSpaceDriver-report',
    templateUrl: './app/Views/Reports/CAI/ArchiveSpaceDriver/space-driver-report.html',
    directives: [Html5ViewerComponent, DropDownListComponent],
    providers: [CommonReportService],
    inputs: ['Ids', 'reportBy', 'archiveName','createOn']
})



export class ArchiveSpaceDriverReportComponent implements OnInit {
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
    disableButton: boolean = false;
    archiveName: string = "";
    createOn: string = "";

    constructor(private commonreportservice: CommonReportService) { }

    ngOnInit() {
        
        var contexObj = this;
        this.commonreportservice.ddlCAILoadReportType().subscribe(function (resultData) {
            
            contexObj.ddlspacegrossareareport = resultData.Data[0];
            contexObj.ddlspacegrossareareport.FieldValue = "86";
            contexObj.ddlspacegrossareareport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });

        });
      //  contexObj.alignContent = "horizontal";
      //  this.pagePath = "Reports / CAI / CAI Space Driver";
        contexObj.LoadReportData();
    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 12;
        this.ReportData.ReportCategoryId = 35;
        this.ReportData.ExportFileName = "Gross Area Distribution by CAI Space Driver";
        this.ReportData.ReportTitle = "Gross Area Distribution by CAI Space Driver";
        this.ReportData.ReportSubTitle = "Archive Name: " + this.archiveName + "          Created On: " + this.createOn;
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
            ReportFieldId: 1609,
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

}