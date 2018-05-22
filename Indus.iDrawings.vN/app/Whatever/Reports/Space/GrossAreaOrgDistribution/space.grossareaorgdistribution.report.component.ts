import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { CommonService } from '../../../../Models/Common/common.service';
import { ScheduleReportAddEdit } from '../../../Common/ScheduleReport/schedule-report-addedit.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'spacegrossareaorgdistribution-report',
    templateUrl: './app/Views/Reports/Space/GrossAreaOrgDistribution/space.grossareaorgdistribution.report.html',
    directives: [Html5ViewerComponent, DropDownListComponent, PageComponent, ScheduleReportAddEdit, SplitViewComponent, GridComponent],
    providers: [CommonReportService, CommonService, NotificationService],
    inputs: ['Ids', 'reportBy']
})

export class SpaceGrossAreaOrgDistributionComponent implements OnInit {
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
    IsTextType: boolean = false;
    reportCatId: number = 90;
    IsCustomRprt = 0;
    hasScheduledReport: boolean = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    showSheduleReportAddEdit: boolean = false;
    pageTitle: string;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    showCustomize: boolean = false;
    selectedRptFldValues: string = "290,292,294,296,298,2428,2426,2377,2494"; 


    constructor(private commonreportservice: CommonReportService, private commonService: CommonService, private notificationService: NotificationService) { }

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
        this.pagePath = "Reports / Space / Gross Area Organizational Distribution";
        contexObj.LoadReportData();
        contexObj.checkForScheduledReport();
    }



    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var contexObj = this;
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 3;
        this.ReportData.ReportCategoryId = 90;
        this.ReportData.ExportFileName = "Gross Area Organizational Distribution";
        this.ReportData.ReportTitle = "Gross Area Organizational Distribution";
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
        arrRptFieldIds.push({
            ReportFieldId: 1966,
            Value: this.selectedRptFldValues.toString()
        })
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

    onChangeType(event: any) {
        switch (event) {
           
            case "16":  this.ReportType = "0";
                        this.IsTextType = false;
                        break;
            case "17":  this.ReportType = "1";
                        this.IsTextType = true;
                        break;
            case "18":  this.ReportType = "2";
                        this.IsTextType = true;
                        break;            
            default:    this.ReportType = "0";
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
        contextObj.showCustomize = false;
        contextObj.splitviewInput.secondaryArea = 90;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "New Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    }

    onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
        this.showSheduleReportAddEdit = false;
        this.showCustomize = false;
    }
    handleInsertSuccess(event) {

        this.splitviewInput.showSecondaryView = false;
    }

    customizeClick(event) {
        var contexObj = this;

        contexObj.showSheduleReportAddEdit = false;
        contexObj.showCustomize = true;
        contexObj.splitviewInput.secondaryArea = 50;
        contexObj.pageTitle = "Customize Report";
        contexObj.splitviewInput.showSecondaryView = true;

        this.commonreportservice.getGetReportItemLookupFields().subscribe(function (result) {
            contexObj.fieldObject = (result["Data"]);
            if (contexObj.fieldObject.length > 1) {
                contexObj.commonreportservice.getGetReportItemLookup(contexObj.pageIndex, contexObj.inputItems.sortCol, contexObj.inputItems.sortDir).subscribe(function (result) {
                    if (result["Data"].DataCount > 0) {
                        var selectedIds = contexObj.selectedRptFldValues.split(",");
                        var items = JSON.parse(result["Data"].FieldBinderData);
                        selectedIds.forEach(function (id) {
                            var newItem = { "Id": id }; 
                            items.forEach(function (item) {
                                if (newItem.Id === item.Id.toString()) {
                                    item.View = true;
                                }
                            });
                        });
                        contexObj.itemsSource = items;//JSON.parse(result["Data"].FieldBinderData);
                    } else {

                    }
                });
            }
        });

        //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    setReportSettings(event) {
        var status = true;
        var contexObj = this;
        contexObj.selectedRptFldValues = '';
        for (var item of contexObj.itemsSource) {
            if (item['View'] == true) {
                contexObj.selectedRptFldValues += item['Id'] + ",";
            }
        }
        if (contexObj.selectedRptFldValues.length > 0) {
            contexObj.splitviewInput.showSecondaryView = false;
            contexObj.showSheduleReportAddEdit = false;
            contexObj.showCustomize = false;
            contexObj.ReportData = undefined;
            setTimeout(function () {
                contexObj.LoadReportData();
            }, 50);
        } else {
            contexObj.notificationService.ShowToaster("Select at least one Report Column", 2);
        }
    }

}