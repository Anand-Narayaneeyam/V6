import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import {CustomReportAddEdit} from '../../../common/custom reports/customreport-addedit.component';
import {IField} from  '../../../../Framework/Models/Interface/IField';
import {CommonService} from '../../../../Models/Common/common.service';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'employees-AssignedEmployeesReport',
    templateUrl: './app/Views/Reports/Employee/AssignedEmployees/employees.assignedemployees.report.html',
    directives: [Html5ViewerComponent, PageComponent, SplitViewComponent, CustomReportAddEdit],
    providers: [CommonService, NotificationService],
    inputs: ['Ids', 'reportBy','orgName']
})

export class EmployeesAssignedEmployeesComponent implements OnInit, IReportDataEntity {
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

    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    pageTitle: string = "Customize Report";
    fieldObjectAddEdit: IField[];
    itemsSourceAddEdit: any[];
    needModulePrefix: any = 1;
    isFromCorrectionProject: any = 0;
    listFieldDetails: any[];
    showMyDef: boolean = true;
    showSetMyDef: boolean = true;
    IsMobile: boolean = window["IsMobile"]; 
    constructor(private commonService: CommonService, private notificationService: NotificationService) { }

    ngOnInit() {
        this.pagePath = "Reports / Employees / Assigned Employees";
        this.LoadReportData(0);
    }

    LoadReportData(IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportSubTitle = "";

        switch (this.reportBy) {
            case 1: this.ReportData.ReportTitle = "Assigned Employees by Site ";
                this.ReportData.ExportFileName = "Assigned Employees by Site ";
                this.ReportData.ReportCategoryId = 47;
                this.reportBy = 2;
                break;
            case 2: this.ReportData.ReportTitle = "Assigned Employees by Building";
                this.ReportData.ExportFileName = "Assigned Employees by Building";
                this.ReportData.ReportCategoryId = 45;
                this.reportBy = 3;
                break;
            case 3: this.ReportData.ReportTitle = "Assigned Employees by Floor ";
                this.ReportData.ExportFileName = "Assigned Employees by Floor ";
                this.ReportData.ReportCategoryId = 48;
                this.reportBy = 4;
                break;
            case 14: this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 49;
                this.reportBy = 5;
                break;
            case 15: this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 50;
                this.reportBy = 5;
                break;
            case 16: this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 51;
                this.reportBy = 5;
                break;
            case 17: this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 52;
                this.reportBy = 5;
                break;
            case 18: this.ReportData.ReportTitle = "Assigned Employees by " + this.orgName;
                this.ReportData.ExportFileName = "Assigned Employees by " + this.orgName;
                this.ReportData.ReportCategoryId = 53;
                this.reportBy = 5;
                break;
            default: this.ReportData.ReportTitle = "Assigned Employees by Floor";
                this.ReportData.ExportFileName = "Assigned Employees by Floor";
                this.ReportData.ReportCategoryId = 48;
                this.reportBy = 4;
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
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
    }

    customizeClick(event) {
        var contextObj = this;
        var isLoadAddEdit = true;
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

    onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
    }

    applyCustomRptClick(event) {
        this.splitviewInput.showSecondaryView = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    }


}