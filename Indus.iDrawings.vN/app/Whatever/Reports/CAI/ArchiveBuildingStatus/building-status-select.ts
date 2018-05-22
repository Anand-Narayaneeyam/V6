import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import { NgControl } from '@angular/common';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import {FloorSelectionReportComponent} from '../../Common/ReportFloorSelection/floorselection.report.component'
import {CAISpaceDriverComponent} from '../SpaceDriver/spaceDriver.report'
import { CommonReportService } from '../../../../Models/reports/common.service'
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../../Framework/Models//Interface/IField'
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { GeneralFunctions} from '../../../../Models/Common/General';
import {DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { ArchiveBuildingStatusEditComponent } from './archive-edit';
import { ArchiveBuildingStatusReport } from './building-status-report';


@Component({
    selector: 'archive-buildingStatus-report',
    templateUrl: './app/Views/Reports/CAI/ArchiveBuildingStatus/building-status-select.html',
    directives: [TabsComponent, TabComponent, FloorSelectionReportComponent, CAISpaceDriverComponent, FieldComponent, Notification, PageComponent, DateComponent, GridComponent, PagingComponent, SubMenu, SplitViewComponent, ArchiveBuildingStatusEditComponent, ArchiveBuildingStatusReport],
    providers: [CommonReportService, NotificationService, GeneralFunctions],
})


export class ArchiveBuildingStatusComponent implements OnInit {

    next: any = undefined;
    fieldObject: IField[];
    selectedTab: number = 0;
    isInitialised: boolean = false;
    selectedCriteria: number = 3;
    pagePath: string;
    blnShowDate: boolean = true;
    fromDate: any;
    toDate: any;
    FromDateInput: any;
    ToDateInput: any;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    dateSelectorField: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    refreshgrid;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    isEnableGrid: boolean = false;
    btnName: string;
    pageTitle: string;
    fieldDetailsEdit: IField[];
    fromDateInput: any;
    toDateinput: any;
    archiveNameInput: string = "";
    createOnInput: string = "";

    constructor(private commonReportService: CommonReportService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }
    ngOnInit() {
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null
            }
        ];
        this.enableMenu = [];
        this.pagePath = "CAI / Archives / CAI Space Driver";
        var contextObj = this;
        contextObj.commonReportService.archiveDateSelector().subscribe(function (resultData) {

            contextObj.dateSelectorField = resultData.Data;

            var date = new Date();

            //let arr: any[];
            //arr = date.toDateString().split(" ");
            //this.selectedDateValue = arr[2] + " " + arr[1] + " " + arr[3];

            var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var fromMon = monthNames[date.getMonth() - 1];
            var toMon = monthNames[date.getMonth()];
            var year = date.getFullYear();
            // contextObj.dateSelectorField[0].FieldValue = (Number(dd) - 1).toString + " " + fromMon + " " + year;
            contextObj.dateSelectorField[0].FieldValue = contextObj.setPrevMonthsDate();
            contextObj.dateSelectorField[1].FieldValue = dd + " " + toMon + " " + year;
        });
    }
    getData() {
        var contextObj = this;

        this.commonReportService.getArchivesData(3, 0, this.dateSelectorField[0].FieldValue, this.dateSelectorField[1].FieldValue, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {

            contextObj.totalItems = result.DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                contextObj.itemsPerPage = result.RowsPerPage;
                contextObj.enableMenu = [0, 1];
                contextObj.isEnableGrid = true;
            }
            else {
                contextObj._notificationService.ShowToaster("No Archives exist for the selected period", 2);
                contextObj.enableMenu = [];
                contextObj.isEnableGrid = false;
            }
        });
    }

    getSelectedTab(event) {
        this.selectedTab = event[0];
    }

    onSubMenuChange(event) {
        switch (event.value) {
            case 0:
                this.archiveNameInput = this.inputItems.rowData["Archive Name"];
                this.createOnInput = this.inputItems.rowData["Date of Creation"];
                this.isInitialised = false;
                this.next = this.inputItems.selectedIds;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.isInitialised = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);
                break;
            case 1:
                this.editClick();
                break;
        }
    }
    public editClick() {

        this.btnName = "Save Changes";
        this.pageTitle = "Edit Archive";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this._notificationService.ShowToaster("Select an Archive", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.commonReportService.getArchiveBuildingStatusEditFields().subscribe(function (result) {

                contextObj.fromDateInput = contextObj.dateSelectorField[0].FieldValue;
                contextObj.toDateinput = contextObj.dateSelectorField[1].FieldValue;
                //result["Data"].find(function (item) {
                //    if (item.FieldId == 2786)
                //        item.FieldValue = contextObj.inputItems.rowData["Id"];
                //});
                result["Data"].find(function (item) {
                    if (item.FieldId == 2753) {
                        item.FieldValue = contextObj.inputItems.rowData["Archive Name"];
                        item.IsEnabled = false;
                    }

                });
                result["Data"].find(function (item) {
                    if (item.FieldId == 2754)
                        item.FieldValue = contextObj.inputItems.rowData["Description"];
                });
                contextObj.fieldDetailsEdit = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    onNextClick(event: any) {

        var contextObj = this;
        this.fromDate = this.dateSelectorField[0].FieldValue;
        this.toDate = this.dateSelectorField[1].FieldValue;

        var toDate = new Date(this.toDate);
        var fromDate = new Date(this.fromDate);

        this.ToDateInput = toDate;
        this.FromDateInput = fromDate;

        if (this.fromDate != "" && this.toDate != "") {
            if (toDate < fromDate) {
                this._notificationService.ShowToaster('From Date must be less than To Date', 2);
                contextObj.totalItems = 0;
                contextObj.itemsSource = [];
                contextObj.itemsPerPage = 0;
                contextObj.enableMenu = [];
                contextObj.isEnableGrid = false;
            }
            else {
                var dateselectorFrom: IField = this.dateSelectorField[0];
                var dateselectorTo: IField = this.dateSelectorField[1];
                if (dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError)
                    return;

                this.commonReportService.getArchiveSpaceDriverFields().subscribe(function (result) {

                    //let rptField = [1611,1613,1614,1615,1541];
                    //let count = rptField.length;
                    //result["Data"].find(function (item) {
                    //    if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    //        item.Width = "*";
                    //        count--;
                    //        if (count == 0) {
                    //            return true;
                    //        } else {
                    //            return false;
                    //        }
                    //    } else {
                    //        return false;
                    //    }
                    //});
                    result["Data"].find(function (item) {
                        if (item.FieldId == 2781) {
                            item.IsEnabled = false;
                            item.IsVisible = false;
                        }
                    });
                    contextObj.fieldObject = (result["Data"]);
                    contextObj.getData();
                });
            }
        }
        else {
            return
        }
    }
    setPrevMonthsDate() { /*function to set previous month*/
        var currentDate = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var prevMonth; var eoy;
        if (currentDate.getMonth() - 1 < 0) {
            prevMonth = monthNames[monthNames.length - 1]
            eoy = true;
        }
        else
            prevMonth = monthNames[currentDate.getMonth() - 1];
        let arr: any[];
        arr = currentDate.toDateString().split(" ");
        if (eoy)
            arr[3] = (Number(arr[3]) - 1).toString();
        return arr[2] + " " + prevMonth + " " + arr[3];
    }
    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        retUpdatedSrc = this.generalFunctions.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }
    public onSort(objGrid: any) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getData();

    }
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.getData();
    };
}