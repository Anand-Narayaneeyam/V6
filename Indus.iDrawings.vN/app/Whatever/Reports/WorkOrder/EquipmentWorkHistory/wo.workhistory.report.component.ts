import {Component, Input, OnInit} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { CommonReportService } from '../../../../Models/reports/common.service';
import { CustomCheckBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import {CustomReportAddEdit} from '../../../common/custom reports/customreport-addedit.component';
import {IField} from  '../../../../Framework/Models/Interface/IField';
import {CommonService} from '../../../../Models/Common/common.service';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'woWorkHistoryReportComponent-report',
    templateUrl: './app/Views/Reports/WorkOrder/EquipmentWorkHistory/wo.workhistory.report.html',
    directives: [Html5ViewerComponent, PageComponent, CustomCheckBoxComponent, SplitViewComponent,CustomReportAddEdit ],
    providers: [CommonReportService, CommonService, NotificationService],
    inputs: ['selectedIds', 'equipmentCategoryId']
})


export class WOWorkHistoryReportComponent implements OnInit, IReportDataEntity {
    ReportData: IReportDataEntity = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string = "Reports / Work Order / General / Equipment Work History";    
    selectedIds: any;
    selectedEntity: any = "1,2,3";
    selectedEntitySR: any = undefined;
    selectedEntityPM: any = undefined;
    equipmentCategoryId: any = 0;
    isSRselected: boolean = true;
    isPMselected: boolean = true;

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
    constructor(private commonreportservice: CommonReportService, private commonService: CommonService, private notificationService: NotificationService) { }
    IsCustomize: any = 0;
            ngOnInit()
            {
                
                    var contextObj = this;
                    contextObj.commonreportservice.selectEntityCategory().subscribe(function (result) {
                        contextObj.selectedEntitySR = result.Data[0];
                        contextObj.selectedEntityPM = result.Data[1];
                        contextObj.selectedEntitySR["FieldValue"] = "1";
                        contextObj.selectedEntityPM["FieldValue"] = "1";                          
                            })

                    this.pagePath = "Reports / Work Order / General / Equipment Work History";
                    contextObj.ReportData = undefined;
                    setTimeout(function () {
                        contextObj.LoadReportData(0);
                    }, 50);
            }



        LoadReportData(Customize)
        {

            this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
            var arrRptFieldIds = new Array<ReportFieldArray>();
            this.ReportData.ModuleId = 9;
            this.ReportData.ReportCategoryId = 343;
            this.ReportData.ExportFileName = "Work History Report";
            this.ReportData.ReportTitle = "Work History Report";
            this.ReportData.ReportSubTitle = "";
            if (this.isSRselected == true && this.isPMselected == true) {
                this.selectedEntity = "1,2,3";
            }
            else if (this.isSRselected == true && this.isPMselected == false) {
                this.selectedEntity = "1,2";
            }
            else if (this.isSRselected == false && this.isPMselected == true) {
                this.selectedEntity = "3";
            }
            else{
                this.selectedEntity = "";
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
                ReportFieldId: 7611,
                Value: this.selectedEntity.toString()
            })
            arrRptFieldIds.push({
                ReportFieldId: 1366,
                Value: this.selectedIds.toString()
            })
            if (Customize == 1) {
                this.IsCustomize = 1;
                this.ReportData.IsCustomize = 1;
            }
            else {
                this.IsCustomize = 0;
                this.ReportData.IsCustomize = 0;
            }
            this.ReportData.ListReportFieldIdValues = arrRptFieldIds;
           
        }


        selectedEntitySRChange(event: any) {
                var contextObj = this;
                contextObj.isSRselected = event.IsChecked;
                contextObj.ReportData = undefined;
                setTimeout(function () {
                    contextObj.LoadReportData(contextObj.IsCustomize);
                }, 50);
            }

        selectedEntityPMChange(event: any) {
                var contextObj = this;
                contextObj.isPMselected = event.IsChecked;
                contextObj.ReportData = undefined;
                setTimeout(function () {
                    contextObj.LoadReportData(contextObj.IsCustomize);
                }, 50);
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
                { ReportFieldId: 4491, Value: this.equipmentCategoryId }                
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