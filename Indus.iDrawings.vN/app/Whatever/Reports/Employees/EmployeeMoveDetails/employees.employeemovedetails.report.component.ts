import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component'; 
import {DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';

import { ScheduleReportAddEdit } from '../../../Common/ScheduleReport/schedule-report-addedit.component';
import { CommonService } from '../../../../Models/Common/common.service';
import {CustomReportAddEdit} from '../../../common/custom reports/customreport-addedit.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';


@Component({
    selector: 'employee-MoveDetailsReport',
    templateUrl: './app/Views/Reports/Employee/EmployeeMoveDetails/employees.employeemovedetails.report.html',
    directives: [Html5ViewerComponent, PageComponent, DateComponent, SplitViewComponent, DropDownListComponent, ScheduleReportAddEdit, CustomReportAddEdit],
    providers: [CommonReportService, CommonService, NotificationService],
    styleUrls: ['app/Views/Reports/Employee/EmployeeMoveDetails/employeemove.css'],
    inputs: ['StatusId', 'EmployeeId', 'ToDate', 'FromDate'] 
})


export class EmployeeMoveDetailsComponent implements OnInit, IReportDataEntity {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;

    StatusId: string = "0";
    EmployeeId: string = "0";
    ToDate: string = "";
    FromDate: string = "";

    alignContent: string;
    dateSelectorField: any = undefined;
    ddlmoveStatus: IField = undefined;
    ddlemployee: IField = undefined;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };

    showSheduleReportAddEdit: boolean = false;    
    pageTitle: string;
    reportCatId: number = 299;
    IsCustomRprt = 0;
    hasScheduledReport: boolean = false;

    showCustomize: boolean = false;
    fieldObjectAddEdit: IField[];
    itemsSourceAddEdit: any[];
    needModulePrefix: any = 0;
    isFromCorrectionProject: any = 0;
    listFieldDetails: any[];
    showMyDef: boolean = true;
    showSetMyDef: boolean = true;
    IsMobile: boolean = window["IsMobile"]; 
    constructor(private reportservice: CommonReportService, private commonService: CommonService, private notificationService: NotificationService) { }

    ngOnInit() {
        var contexObj = this;
            //contexObj.reportservice.getddlemployeemove().subscribe(function (resultData1) {
            //    contexObj.ddlmoveStatus = resultData1.Data[2];
            //    contexObj.ddlemployee = resultData1.Data[3];
            //    var tempArray = new Array();
            //    tempArray.push(resultData1.Data[0]);
            //    tempArray.push(resultData1.Data[1]);
            //    contexObj.dateSelectorField = tempArray;
            //    contexObj.dateSelectorField[0].IsMandatory = false;
            //    contexObj.dateSelectorField[1].IsMandatory = false;
            //});
        contexObj.LoadReportData(0);
        contexObj.checkForScheduledReport();
    }

    LoadReportData(IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId = 299;
        this.ReportData.ExportFileName = "Employee Move Details";
        this.ReportData.ReportTitle = "Employee Move Details";
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
            arrRptFieldIds.push({
                ReportFieldId: 866,
                Value: this.EmployeeId.toString()
            })

            if (IsCustomize == 1)
                this.ReportData.IsCustomize = 1;
            else
                this.ReportData.IsCustomize = 0;

        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
        this.pagePath = "Reports / Employees / Employee Move Details";

    }

    getDateData(event) {

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

    showSheduleReport(event) {
        debugger
        var contextObj = this;
        contextObj.splitviewInput.secondaryArea = 90;
        contextObj.showCustomize = false;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.splitviewInput.showSecondaryView = true;       
        contextObj.showSheduleReportAddEdit = true;
    }

    handleInsertSuccess(event) {

        this.splitviewInput.showSecondaryView = false;
    }

    onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
    }

    customizeClick(event) {
        this.showSheduleReportAddEdit = false;
        var contextObj = this;
        var isLoadAddEdit = true;
        contextObj.showCustomize = true;
        contextObj.splitviewInput.secondaryArea = 79;
        contextObj.pageTitle = "Customize Report";
        contextObj.commonService.loadCustomRptAddEditCol().subscribe(function (result) {
            contextObj.fieldObjectAddEdit = result["Data"];//filter(function (item) { return item.FieldId != 1625 });
        });

        var listParams = new Array();
        listParams.push(
            { ReportFieldId: 353, Value: this.ReportData.ModuleId },
            { ReportFieldId: 346, Value: this.ReportData.ReportCategoryId },
            { ReportFieldId: 3792, Value: this.needModulePrefix },
            { ReportFieldId: 1243, Value: this.isFromCorrectionProject },
            { ReportFieldId: 66, Value: "" }
        );
        contextObj.listFieldDetails = JSON.parse(JSON.stringify(listParams));
        contextObj.commonService.loadCustomizeReportData(JSON.stringify(listParams), 0, false).subscribe(function (result) {
            contextObj.itemsSourceAddEdit = JSON.parse(result);
        });
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    applyCustomRptClick(event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    }

}