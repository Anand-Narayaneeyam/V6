import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {AdministrationService} from '../../../models/administration/administration.service'
import { IField } from  '../../../Framework/Models/Interface/IField';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { DocumentService } from '../../../Models/Documents/documents.service';
import { ScheduleReportAddEdit } from '../../Common/ScheduleReport/schedule-report-addedit.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'


@Component({
    selector: 'manageReports',
    templateUrl: './app/Views/Administration/General Settings/manage-reports-component.html',
    directives: [Notification, GridComponent,
        SubMenu, Sorting,
        PagingComponent, SlideComponent, SplitViewComponent, ScheduleReportAddEdit],
    providers: [AdministrationService, HTTP_PROVIDERS,
        NotificationService, GeneralFunctions, DocumentService]
})

export class ManageReportsComponent implements OnInit {

    fields: IField[];
    itemsSource: any[];
    errorMessage: string;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single" };
    pageIndex: number = 0;
    documentgroupId: any;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    @Input() moduleId;
    @Input() target;
    nameDisplayFormatId: string;
    types = true;
    refreshgrid;
    menuData = [
        {
            "id": 0,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Activate ",
            "image": "Activate",
            "path": "Activate",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Block ",
            "image": "Block",
            "path": "Block",
            "submenu": null
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }
    ];
    enableMenu = [0,1, 2, 3];
    position: any = "top-right";
    showSlide: boolean = false;
    DocumentGroupName: string;
    deleteMsg: string;
    countTitle: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    showSheduleReportAddEdit: boolean = false;
    pageTitle: string;
    reportName: string;
    isEdit: boolean = false;
    fieldDetailsEdit: IField;

    constructor(private administrationService: AdministrationService,private notificationService: NotificationService,private generFun: GeneralFunctions,private documentService: DocumentService) { }

    ngOnInit(): void {
        var contextObj = this;
        this.enableMenu = [];
        
        this.administrationService.getManageReportFieldObject().subscribe(function (resultData) {
            
            contextObj.fields = resultData["Data"];

            contextObj.administrationService.getSessionData().subscribe(function (data) {
                var userId = data["Data"]["UserId"];
                contextObj.administrationService.getPersonalSettingsFieldWithData(userId).subscribe(function (resultData) {
                    
                    var displayOptnFormat = resultData["Data"].find(function (item) { return item.FieldId === 2303 })
                    contextObj.nameDisplayFormatId = displayOptnFormat.FieldValue;
                    contextObj.loadData(1);
                });
            });
            contextObj.itemsSource = [];
        });
    }

    loadData(target?: number) {
        var contextObj = this;

        this.administrationService.getManageReportData(Number(contextObj.moduleId), Number(contextObj.target), Number(contextObj.nameDisplayFormatId), 0, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            
            contextObj.totalItems = result.DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                contextObj.enableMenu = [0, 1, 2, 3];
                if (target == 1) {
                    contextObj.itemsPerPage = result.RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Scheduled Reports exist", 2);                                                                       
                contextObj.enableMenu = [];
            }
        });
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                this.editClick(this.inputItems);
                break;
            case 1:
                this.StatusClick(event.value);
                break;
            case 2:
                this.StatusClick(event.value);
                break;
            case 3:
                this.deleteClick(this.inputItems.selectedIds);
                break;
        }
    }

    editClick(inputItems) {

        
        this.reportName = this.inputItems.rowData.Name;
        this.fieldDetailsEdit = this.inputItems.rowData;
        this.isEdit = true;
        debugger
        this.showSheduleReport();
        
    }

    StatusClick(status: any) {
        var contextObj = this;
        this.refreshgrid = [];
        
        var selectedItem = contextObj.itemsSource.find(function (item) {
            if (item.Id == contextObj.inputItems.selectedIds[0])
                return true;
        });
        var obj = new Array<ReportFieldArray>();
        obj.push(
            {
                ReportFieldId: 8646,
                Value: status
            });
        if (selectedItem.StatusId == 59)
            contextObj.notificationService.ShowToaster("Only active Report can be Blocked", 5)
        else if (status == 1) {   //Active click
            if (selectedItem.StatusId == 1)
                contextObj.notificationService.ShowToaster("Selected Report is already Activated", 5)
            else {
                contextObj.administrationService.manageReportDataStatus(JSON.stringify(obj), contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    
                    if (resultData.Message == "Success") {
                        contextObj.inputItems.rowData["Status"] = "Active";
                        contextObj.inputItems.rowData["StatusId"] = 1;
                        //contextObj.itemsSource.find(function (item) {
                        //    if (item.Id == contextObj.inputItems.selectedIds[0]) {
                        //        item.Status = "Active";
                        //        item.StatusId = 1;
                        //        return true;
                        //    }
                        //});
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                       // contextObj.loadData(0);
                        contextObj.notificationService.ShowToaster("Selected report has been Activated", 3);
                    }
                    else if (resultData.Message == "Failure")
                        contextObj.notificationService.ShowToaster("Report Status Update Failed", 5);
                    else
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5)
                });
            }
        }
        else if (status == 2) {   //Block click
            if (selectedItem.StatusId == 2)
                contextObj.notificationService.ShowToaster("Selected Report is already Blocked", 5)
            else {
                contextObj.administrationService.manageReportDataStatus(JSON.stringify(obj), contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    
                    if (resultData.Message == "Success") {
                        contextObj.inputItems.rowData["Status"] = "Blocked";
                        contextObj.inputItems.rowData["StatusId"] = 2;
                        //contextObj.itemsSource.find(function (item) {
                        //    if (item.Id == contextObj.inputItems.selectedIds[0]) {
                        //        item.Status = "Blocked";
                        //        item.StatusId = 2;
                        //        return true;
                        //    }
                        //});
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                       // contextObj.loadData(0);
                        contextObj.notificationService.ShowToaster("Selected report has been Blocked", 3);
                    }
                    else if (resultData.Message == "Failure")
                        contextObj.notificationService.ShowToaster("Report Status Update Failed", 5);
                    else
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5)
                });
            }
        }
        
    }

    public deleteClick(userIds) {
        if (userIds.length == 1) {
            this.showSlide = !this.showSlide;
            this.deleteMsg = "Are you sure you want to delete the selected Scheduled Report?";
        }
        else if (userIds.length < 1) {
            this.notificationService.ShowToaster("Select a Report", 2);
        }
        else if (userIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
    }

    deleteReports() {

        var contextObj = this;
        contextObj.administrationService.manageReportDataDelete(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            
            if (resultData["Data"].Message == "Success") {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Scheduled Reports exist", 2);
                    contextObj.enableMenu = [];
                }
                contextObj.notificationService.ShowToaster("Selected Report has been deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5)
            }
        });
    }

    okDelete(event: any) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        this.deleteReports();
    }
    closeSlideDialog(event: any) {
        this.showSlide = event.value;
    }
    cancelClick(event: any) {
        this.showSlide = false;
    }

    public onSort(objGrid: any) {
        this.loadData(0);
    }


    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.loadData(0);
    }
    showSheduleReport() {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = true;
        contextObj.pageTitle = "Edit Scheduled Report";
        contextObj.showSheduleReportAddEdit = true;
    }
    onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
    }
    handleUpdateSuccess(event) {
        debugger
        var context = this;
        this.refreshgrid = [];
        this.splitviewInput.showSecondaryView = false;
        let retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        this.refreshgrid = this.refreshgrid.concat([true]);
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
