import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { AddArchiveComponent } from './add-archive';


@Component({
    selector: 'CAISpaceDriver-report',
    templateUrl: './app/Views/Reports/CAI/SpaceDriver/spaceDriver.report.html',
    directives: [Html5ViewerComponent, DropDownListComponent, PageComponent, SplitViewComponent, Notification, AddArchiveComponent],
    providers: [CommonReportService, NotificationService],
    inputs: ['Ids', 'reportBy']
})



export class CAISpaceDriverComponent implements OnInit {
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
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    pageTitle: string;
    showArchive: boolean = false;
    disableButton: boolean = false;


    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService) { }

    ngOnInit() {
        
        var contexObj = this;
        this.commonreportservice.ddlCAILoadReportType().subscribe(function (resultData) {
            
            contexObj.ddlspacegrossareareport = resultData.Data[0];
            contexObj.ddlspacegrossareareport.FieldValue = "86";
            contexObj.ddlspacegrossareareport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });

        });
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / CAI / CAI Space Driver";
        contexObj.LoadReportData();
    }


    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 12;
        this.ReportData.ReportCategoryId = 108;
        this.ReportData.ExportFileName = "Gross Area Distribution by CAI Space Driver";
        this.ReportData.ReportTitle = "Gross Area Distribution by CAI Space Driver";
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
    onSubmitArchive() {
        
        this.pageTitle = "Add Archive";
        this.showArchive = true;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    submitReturn(event: any) {
        
        this.showArchive = false;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

}