import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { BuildingAddArchiveComponent } from './add-archive';
import {SpaceService} from '../../../../Models/Space/space.service'
import { CommonService } from '../../../../Models/Common/common.service';
import {CustomReportAddEdit} from '../../../common/custom reports/customreport-addedit.component';
import {IField} from  '../../../../Framework/Models/Interface/IField';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';


@Component({
    selector: 'CAI.buildingStatus.report',
    templateUrl: './app/Views/Reports/CAI/BuildingStatus/building-status.html',
    directives: [Html5ViewerComponent, PageComponent, BuildingAddArchiveComponent, SplitViewComponent, CustomReportAddEdit],
    providers: [SpaceService, CommonService, NotificationService]
})


export class BuildingStatusReport implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    pageTitle: string;
    showArchive: boolean = false;
    isEnableButton: boolean = false;
    showCustomize: boolean = false;

    fieldObjectAddEdit: IField[];
    itemsSourceAddEdit: any[];
    needModulePrefix: any = 0;
    isFromCorrectionProject: any = 0;
    listFieldDetails: any[];
    showMyDef: boolean = true;
    showSetMyDef: boolean = true;
    IsMobile: boolean = window["IsMobile"]; 
    constructor(private spaceService: SpaceService, private commonService: CommonService, private notificationService: NotificationService) { }

    ngOnInit() {
        this.LoadReportData(0);
        this.pagePath = "Reports / CAI / Building Status";
    }

    LoadReportData(IsCustomize) {
        var contextObj = this;
        var service: any;
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();

        this.ReportData.ModuleId = 12;
        this.ReportData.ReportCategoryId = 21;
        this.ReportData.ExportFileName = "Building Status";
        this.ReportData.ReportTitle = "Building Status";
        this.ReportData.ReportSubTitle = "";
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;

        this.spaceService.getAllocatedDrawings("12").subscribe(function (resultData) {
            var temp = JSON.parse(resultData.Data.FieldBinderData);
            if (temp.length == 0)
                contextObj.isEnableButton = false;
            else if (temp.length >= 1)
                contextObj.isEnableButton = true;
        });
    }

    onSubmitArchive() {
        this.pageTitle = "Add Archive";
        this.showArchive = true;
        this.showCustomize = false;
        this.splitviewInput.secondaryArea = 70;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    submitReturn(event: any) {
        this.showCustomize = false;
        this.showArchive = false;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
        this.showArchive = false;
        this.showCustomize = false;
    }

    customizeClick(event) {
        this.showArchive = false;
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
        this.showArchive = false;
        this.showCustomize = false;
        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(1);
        }, 50);
    }
}