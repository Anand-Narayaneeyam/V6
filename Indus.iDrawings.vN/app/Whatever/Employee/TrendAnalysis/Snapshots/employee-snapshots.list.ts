import { Component, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField} from  '../../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../../Framework/Whatever/Paging/paging.component';
import { LabelComponent } from '../../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { TabsComponent } from '../../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../../Framework/Whatever/Tab/tab.component'
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../../Models/Common/General';
import {EmployeeService} from '../../../../Models/Employee/employee.services';
import { Sorting } from '../../../../Framework/Whatever/Sort/sort.component';
import { EmployeeTrendReportViewer } from '../TrendReport/employee.trend.reportviewer';
import {DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'employeeSnapshots',
    templateUrl: './app/Views/Employee/TrendAnalysis/Snapshots/employee-snapshots.list.html',
    directives: [SubMenu, Sorting, PagingComponent, FieldComponent, Notification, TabsComponent, TabComponent, SlideComponent, GridComponent, EmployeeTrendReportViewer, DateComponent, PageComponent, SplitViewComponent],
    providers: [EmployeeService, NotificationService],
})

export class EmployeeSnapshotsListComponent implements AfterViewInit {

    selectedTab: number = 0;
    enableMenu = [0];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    fieldObject: IField[];
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    isCreateClicked: boolean = false;
    isViewClicked: boolean = false;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    isReportshown: any = undefined;
    dateSelectorField: any = undefined;
    tabDeleteIndex: any = 0;
    SnapshotDate: string = "";
    StartDate: string = "";
    EndDate: string = "";
    dateCompare: boolean = false;
    dateClicked: boolean = false;
    pagePath: string;

    snapshotId: any = 0; 
    reportType: any = 0;
    ReportTitle: string = "";
    tabTitle: string = "Create Snapshot";
    enableReportMenu = [0];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };

    showReplaceSnapshot = false; 


    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        },
        {
            "id": 2,
            "title": "View",
            "image": "View",
            "path": "View",
            "submenu": null
        }
    ];

    menuReport = [
        {
            "id": 0,
            "title": "Save",
            "image": "Save",
            "path": "Save",
            "submenu": null
        }
    ];


    constructor(private employeeService: EmployeeService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngAfterViewInit() {
        this.pagePath = "Employees / Snapshots";
        var contextObj = this;
        this.employeeService.getEmpSnapshotsFields().subscribe(function (result) {
            var tempArray = new Array();
            tempArray.push(result.Data[0]);
            tempArray.push(result.Data[1]);
            tempArray.push(result.Data[2]);
            contextObj.fieldObject = tempArray;
            contextObj.dateSelectorField = result.Data[3];
            if (contextObj.itemsSource == null || contextObj.itemsSource.length == 0) {
                contextObj.LoadData(1);
            }
        });

    }


    LoadData(target?: number) {
        var contextObj = this;
        contextObj.employeeService.getEmpSnapshotsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.enableMenu = [0,1,2];
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Snapshots exist", 2);
                contextObj.enableMenu = [0];
                contextObj.itemsSource = [];
            }
        });

    }


    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
               this.addClick();
                break;
            case 1:
               this.deleteClick();
                break;
            case 2:
                 this.viewClick();
                break;
        }
    }



    public onSort(objGrid: any) {
        this.LoadData(0);
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.LoadData(0);
    }


    public addClick() {
        this.isCreateClicked = false;
        this.reportType = 36;
        this.ReportTitle = "Organizational Occupancy Snapshot";
        this.tabTitle = "Create Snapshot";
        var contexObj = this;
        this.isReportshown = 1;
        this.tabDeleteIndex = 0;

        setTimeout(function () {
            contexObj.isCreateClicked = true;
            contexObj.selectedTab = 1;
            contexObj.enableReportMenu[0];
        }, 100);


    }

    onSaveSnapshot(event: Event)
    {
        this.SnapshotDate = this.dateSelectorField.FieldValue; 
        if (this.SnapshotDate == "" || this.SnapshotDate == null || this.SnapshotDate.split(" ")[2].length != 4 ) {
            return
        }
        else {
                var contextObj = this;
                var replace = 0;
                contextObj.employeeService.getEmpSnapshotsAdd(contextObj.SnapshotDate, replace).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:

                            contextObj.notificationService.ShowToaster("Snapshot saved", 3);
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            contextObj.isCreateClicked = false;
                            setTimeout(function () {
                                contextObj.tabDeleteIndex = 1;
                                contextObj.isReportshown = undefined;
                            }, 50);

                            setTimeout(function () {
                                contextObj.tabDeleteIndex = 0;
                                contextObj.selectedTab = 0;

                            }, 100);
                            setTimeout(function () {
                                contextObj.LoadData(0);
                            }, 100);
       

                        case 3:
                            if (resultData["Data"].ServerId == -2) {
                                contextObj.ReplaceSnapshot();
                            }
                    }

                });
            } 
   }

    public ReplaceSnapshot() {
        this.showReplaceSnapshot = !this.showReplaceSnapshot;
    }

    public deleteClick() {

        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Snapshot", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.showSlide = !this.showSlide;
        }

    }


    public deleteProcedure() {

        var contextObj = this;
        contextObj.employeeService.getEmpSnapshotsdelete(contextObj.inputItems.rowData["Id"]).subscribe(function (resultData) {

            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (resultData["Data"].ServerId == 0) {
                        contextObj.notificationService.ShowToaster("Snapshot deleted", 3);
                        contextObj.LoadData(0);
                    }
            }
        });

    }


    public replaceSnapshotProcedure() {

        this.SnapshotDate = this.dateSelectorField.FieldValue;
        var contextObj = this;
        var replace = 1;

        contextObj.employeeService.getEmpSnapshotsAdd(contextObj.SnapshotDate, replace).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:

                    contextObj.notificationService.ShowToaster("Snapshot saved", 3);
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    contextObj.isCreateClicked = false;
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 1;
                        contextObj.isReportshown = undefined;
                    }, 50);
                    setTimeout(function () {
                        contextObj.tabDeleteIndex = 0;
                        contextObj.selectedTab = 0;

                    }, 100);
                    setTimeout(function () {
                        contextObj.LoadData(0);
                    }, 100);
            }

        });

    }



    okDelete(event: Event) {
        this.deleteProcedure();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }


    okReplaceSnapshot(event: Event) {
        this.replaceSnapshotProcedure();
        this.showReplaceSnapshot = !this.showReplaceSnapshot;
    }

    cancelReplaceSnapshot(event: Event) {
        this.showReplaceSnapshot = !this.showReplaceSnapshot;
    }

    closeReplaceSnapshot(value: any) {
        this.showReplaceSnapshot = value.value;
    }






    public viewClick() {

        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Snapshot", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.isViewClicked = false;
            this.reportType = 37;
            this.ReportTitle = "Snapshot Details"
            this.tabTitle = "View Snapshot";
            var contexObj = this;
            this.isReportshown = 1;
            this.snapshotId = this.inputItems.selectedIds[0];

            setTimeout(function () {
                contexObj.isViewClicked = true;
                contexObj.selectedTab = 1;
            }, 100);
        }
    }




    getSelectedTab(event: any) {
        if (event[0] == 0) {
            this.selectedTab = 0;
     
            if (event[1] == true && this.isReportshown != undefined) {
                this.isCreateClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.isReportshown = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;                   
                }, 50);
            }
        }
        else if (event[0] == 1) {
            this.dateClicked = false;
            this.selectedTab = 1;
        }
    }

    onTabClose(event: any) {

    }

    divClicked(event) {
        this.dateClicked = !this.dateClicked;
    }

    onSaveClick(event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }



}



