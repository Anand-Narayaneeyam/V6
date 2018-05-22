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
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SpaceOccupancySearchComponent } from './space-occupancy-search-component';
import { CommonService } from '../../../../Models/Common/common.service';
import { ScheduleReportAddEdit } from '../../../Common/ScheduleReport/schedule-report-addedit.component';
import {CustomReportAddEdit} from '../../../common/custom reports/customreport-addedit.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'space-occupancy-report',
    templateUrl: './app/Views/Reports/Space/SpaceOccupancy/space-occupancy-report-component.html',
    directives: [Html5ViewerComponent, DropDownListComponent, FieldComponent, SplitViewComponent, SelectPeriodReportComponent, PageComponent, SubMenu, SpaceOccupancySearchComponent, ScheduleReportAddEdit, CustomReportAddEdit],
    providers: [CommonReportService, CommonService, NotificationService]
})


export class SpaceOccupancyComponent implements OnInit, AfterViewChecked {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string;
    StatusId: string = "0";
    ddlOrganizationUnit: IField = undefined;
    alignContent: string;
    ToDate: string = "";
    FromDate: string = "";
    splitViewStatus: boolean = false;
    menuData: any;
    enableMenu: any[];
    levelNumber: string = "";
    iscard = true;
    okSelected: boolean = false;    
    splitViewTitle: string;
    maxLevels: string = ""; //L1,L2,L3,L4,L5
    OrgUnitId: string = ""; // Value from dropdown
    selectedDdlArray: string = "";
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    reportCatId: number = 311;
    IsCustomRprt = 0;
    hasScheduledReport: boolean = false;
    showSheduleReportAddEdit: boolean = false;   
    showCustomize: boolean = false;
    showSearch: boolean = false;
    pageTitle: string;

    fieldObjectAddEdit: IField[];
    itemsSourceAddEdit: any[];
    needModulePrefix: any = 1;
    isFromCorrectionProject: any = 0;
    listFieldDetails: any[];
    showMyDef: boolean = true;
    showSetMyDef: boolean = true;
    IsMobile: boolean = window["IsMobile"]; 
    constructor(private commonreportservice: CommonReportService, private commonService: CommonService, private notificationService: NotificationService) { }

    ngOnInit() {
        var contexObj = this;

        contexObj.ReportData = undefined;
        this.menuData = [
            {
                "id": 0,
                "title": "Search",
                "image": "Search",
                "path": "Search",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
        contexObj.alignContent = "horizontal";
        this.pagePath = "Reports / Space / Space Occupancy"; 
        this.commonreportservice.ddlLoadOrganizationalUnits().subscribe(function (resultData) {
            
            contexObj.ddlOrganizationUnit = resultData.Data[0];
            contexObj.ddlOrganizationUnit.FieldValue = "1";
            contexObj.StatusId = "1";
            contexObj.LoadReportData(0);
            //contexObj.onChangeDdl(1);
        });  

        contexObj.checkForScheduledReport();
        
    }


    LoadReportData(IsCustomize) {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 311;
        this.ReportData.ExportFileName = "";
        this.ReportData.ReportTitle = "";
        this.ReportData.ReportSubTitle = "";

        switch (this.StatusId) {
            case "1":
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[0].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[0].Value;
              //  this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[0].Value;
                break;
            case "2": 
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[1].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[1].Value;
              //  this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[1].Value;
                break;
            case "3": 
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[2].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[2].Value;
               // this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[2].Value;
                break;
            case "4": 
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[3].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[3].Value;
               // this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[3].Value;
                break;
            case "5": 
                this.ReportData.ExportFileName = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[4].Value;
                this.ReportData.ReportTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[4].Value;
               // this.ReportData.ReportSubTitle = "Space Occupancy Report by " + this.ddlOrganizationUnit.LookupDetails.LookupValues[4].Value;
                break;
            default: this.ReportData.ReportSubTitle = "All Space opccupancy Report";
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
            ReportFieldId: 289,
            Value: this.ddlOrganizationUnit.FieldValue.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 304,
            Value: this.maxLevels
        })
        arrRptFieldIds.push({
            ReportFieldId: 2080,
            Value: this.OrgUnitId
        })
        if (IsCustomize == 1)
            this.ReportData.IsCustomize = 1;
        else
            this.ReportData.IsCustomize = 0;
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;

        this.alignContent = "horizontal";

    }

    checkForScheduledReport() {
        var contextObj = this;
        contextObj.commonService.CheckHasScheduledReport(contextObj.reportCatId, contextObj.IsCustomRprt).subscribe(function (result) {
            debugger
            if (result.ServerId == 1) {
                contextObj.hasScheduledReport = true;
            }
            else {
                contextObj.hasScheduledReport = false;
            }
        });
    }

    ngAfterViewChecked() {
        //if (this.splitviewInput.showSecondaryView == false && this.splitViewStatus == true && this.okSelected == false) {
        //    this.splitViewStatus = false;
        //    this.okSelected = true;
        //    this.ddlOrganizationUnit.FieldValue = "1";
        //    this.onChangeDdl(1);
        //}
    }

    onChangeDdl(event: any) {
        this.selectedDdlArray = "";
        this.maxLevels = "";
        this.OrgUnitId = "";
        switch (event) {
            case "1": this.StatusId = "1";
                break;
            case "2": this.StatusId = "2";
                break;
            case "3": this.StatusId = "3";
                break;
            case "4": this.StatusId = "4";
                break;
            case "5": this.StatusId = "5";
                break;
            default: this.StatusId = "0";
                break;
        }

        if (this.StatusId == "1" || this.StatusId == "2" || this.StatusId == "3"  || this.StatusId == "4" || this.StatusId == "5") {
            var contexObj = this;
            contexObj.ReportData = undefined;
            setTimeout(function () {
                contexObj.LoadReportData(0);
            }, 50);
        }
    }

    onShowSearch(event) {
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        this.splitviewInput.showSecondaryView = false;     
        this.levelNumber = this.StatusId;
        this.splitViewTitle = "Search";
        this.splitviewInput.showSecondaryView = true;
        this.showSearch = true;
    }

    searchClick(event) {
        this.splitviewInput.showSecondaryView = false;
        

        this.maxLevels = event.MaxLevels;
        this.OrgUnitId = event.OrgUnitId;
        this.selectedDdlArray = event.SelectedDdlArray;

        var contexObj = this;
        contexObj.ReportData = undefined;
        setTimeout(function () {
            contexObj.LoadReportData(0);
        }, 50);
    }
    showSheduleReport(event) {
        this.showSearch = false;
        this.showCustomize = false;
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    }

    onSplitViewClose(event) {

        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        this.showSearch = false;
    }
    handleInsertSuccess(event) {

        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
        this.showSearch = false;
    }

    customizeClick(event) {
        this.showSearch = false;
        this.showSheduleReportAddEdit = false;
        var contextObj = this;
        var isLoadAddEdit = true;
        contextObj.showCustomize = true;
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