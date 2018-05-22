import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { DropDownListComponent } from '../../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { SelectPeriodReportComponent } from '../../common/selectperiod/select.period.report.component';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'adminUsers-report',
    templateUrl: './app/Views/Reports/Administration/Users/admin.users.report.html',
    directives: [Html5ViewerComponent, DropDownListComponent, FieldComponent, SplitViewComponent, SelectPeriodReportComponent, PageComponent],
    providers: [CommonReportService]
})


export class AdminUsersComponent implements OnInit, AfterViewChecked {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues:[] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    StatusId: string = "0";
    ddluserfilterreport: IField = undefined;
    alignContent: string;
    ToDate: string = "";
    FromDate: string = "";
    splitViewStatus: boolean = false;
    okSelected: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };

    constructor(private commonreportservice: CommonReportService) { }
    
    ngOnInit()
    {
        var contexObj = this;
        this.commonreportservice.ddlLoadUserStatus().subscribe(function (resultData) {          
            contexObj.ddluserfilterreport = resultData.Data[0];
            contexObj.ddluserfilterreport.FieldValue = "3";        
            contexObj.ddluserfilterreport.LookupDetails.LookupValues.sort(function (a, b) {
                return a.Id - b.Id;
            });

        });
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / Administration / Users";
        contexObj.LoadReportData();
    }


    LoadReportData()
    {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues:[] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 0; 
        this.ReportData.ReportCategoryId = 2; 
        this.ReportData.ExportFileName = "Users";
        this.ReportData.ReportTitle = "Users";
        this.ReportData.ReportSubTitle = "";

        switch (this.StatusId)
        {
            case "0": this.ReportData.ReportSubTitle = "All Users";
                break;
            case "1": this.ReportData.ReportSubTitle = "Active Users";
                break;
            case "2": this.ReportData.ReportSubTitle = "Blocked Users";
                break;
            case "4": this.ReportData.ReportSubTitle = "Deleted Users";
                break;
            case "5": this.ReportData.ReportSubTitle = "Account Expired Users";
                break;
            case "7": this.ReportData.ReportSubTitle = "Users Deleted during " + this.FromDate + " and " + this.ToDate;
                break;
            case "8": this.ReportData.ReportSubTitle = "Users added during " + this.FromDate + " and " + this.ToDate;
                break;
            case "9": this.ReportData.ReportSubTitle = "Account expiring during " + this.FromDate + " and " + this.ToDate;
                break;
            default: this.ReportData.ReportSubTitle = "All Users";
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
            ReportFieldId: 1992,
            Value: this.StatusId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.FromDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.ToDate.toString()
        })
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
     
        this.alignContent = "horizontal";

    }

    ngAfterViewChecked() {
        if (this.splitviewInput.showSecondaryView == false && this.splitViewStatus == true && this.okSelected == false)
            {
            this.splitViewStatus = false;
            this.okSelected = true;
            this.ddluserfilterreport.FieldValue = "3";
            this.onChangeType(3);
           }
    }

    onChangeType(event: any) {
        switch (event)
        {         
           case "3": this.StatusId = "0";
               break;
           case "4": this.StatusId = "1";
               break;
           case "5": this.StatusId = "2";
               break;
           case "6": this.StatusId = "4";
               break;
           case "7": this.StatusId = "5";
               break;
           case "8": this.StatusId = "7";
                this.splitViewStatus = true;
                this.okSelected = false;
                this.showPeriodSelector();
               break;
           case "9": this.StatusId = "8";
                this.splitViewStatus = true;
                this.okSelected = false;
                this.showPeriodSelector();
               break;
           case "10": this.StatusId = "9";
                this.splitViewStatus = true;
                this.okSelected = false;
                this.showPeriodSelector();
               break;

           default: this.StatusId = "0";
               break;
        }

        if (this.StatusId == "0" || this.StatusId == "1" || this.StatusId == "2" || this.StatusId == "4" || this.StatusId == "5") {
            var contexObj = this;
            contexObj.ReportData = undefined;
            setTimeout(function () {
                contexObj.LoadReportData();
            }, 50);
        }
    }


    showPeriodSelector() {
        this.splitviewInput.showSecondaryView = true;
    }

    dateSelect(event) {
        this.splitviewInput.showSecondaryView = false;
        this.okSelected = true;
        this.FromDate = event["0"].FieldValue;
        this.ToDate = event["1"].FieldValue;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData();
        }, 50);      
    }
   
}