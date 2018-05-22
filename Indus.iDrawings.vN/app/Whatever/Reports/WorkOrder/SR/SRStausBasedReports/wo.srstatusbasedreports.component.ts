import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../../Models/Common/General';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import { IField } from  '../../../../../Framework/Models/Interface/IField';
import { ISplitView } from '../../../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../../../Framework/Whatever/Split-View/split-view.component';
import {CustomReportAddEdit} from '../../../../common/custom reports/customreport-addedit.component';
import {CommonService} from '../../../../../Models/Common/common.service';
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'woSRStatusBasedComponent-report',
    templateUrl: './app/Views/Reports/WorkOrder/SR/SRStausBasedReports/wo.srstatusbasedreports.report.html',
    directives: [Html5ViewerComponent, PageComponent, SplitViewComponent, CustomReportAddEdit],
    providers: [CommonService, NotificationService],
    inputs: ['StatusId', 'WorkTypeId', 'WorkTypeName', 'StatusName', 'EntityCategoryId']
})


export class WOSRStatusBasedReportComponent implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;

    StatusId: number = 0;
    WorkTypeId: number = 0;
    EntityCategoryId: number = 0;
    WorkTypeName: any = "";
    StatusName: any = "";

    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;

    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    pageTitle: string = "Customize Report";
    fieldObjectAddEdit: IField[];
    itemsSourceAddEdit: any[];
    needModulePrefix: any = 1;
    isFromCorrectionProject: any = 0;
    listFieldDetails: any[];
    showMyDef: boolean = false;
    showSetMyDef: boolean = false;
    IsMobile: boolean = window["IsMobile"]; 
    constructor( private commonService: CommonService, private notificationService: NotificationService) { }

    ngOnInit() {
        this.LoadReportData(0);
        this.pagePath = "Reports / Work Order / Service Requests / Status based Reports";            

    }

    LoadReportData(IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contextObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 9;
        this.ReportData.ReportCategoryId = 292;
        this.ReportData.ExportFileName = this.StatusName + " Details";
        this.ReportData.ReportTitle = this.StatusName + " Details";
        this.ReportData.ReportSubTitle = "Work Type: " + this.WorkTypeName;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 1490,
            Value: this.StatusId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 5873,
            Value: this.WorkTypeId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 6561,
            Value: this.EntityCategoryId.toString()
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
            { ReportFieldId: 66, Value: "" },
            { ReportFieldId: 6577, Value: this.WorkTypeId },
            { ReportFieldId: 6558, Value: this.EntityCategoryId }
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