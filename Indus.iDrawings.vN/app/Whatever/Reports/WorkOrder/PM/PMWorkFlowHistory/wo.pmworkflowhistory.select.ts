
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { GridComponent} from '../../../../../Framework/Whatever/Grid/grid.component';
import { WOPMWorkFlowHistoryReportComponent} from './wo.pmworkflowhistory.report.component';
import {PagingComponent} from '../../../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component'
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';



@Component({
    selector: 'workhistory-selector',
    templateUrl: './app/Views/Reports/WorkOrder/PM/PMWorkFlowHistory/wo.pmworkflowhistory.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [GridComponent, WOPMWorkFlowHistoryReportComponent, PagingComponent, Notification, PageComponent, TabsComponent, TabComponent, SubMenu]
})

export class WOPMWorkFlowHistorySelect implements OnInit {


    equipmentCategoryId: any = 0;
    equipmentClassId: any = 0;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "WorkOrderId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false, allowEdit: false };
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    isNextClicked: boolean = false;
    selectedIds: any;
    totalItems: number = 0;
    workTypeId: number = 0;
    selectedworkTypeId: number;
    pagePath: string;
    selectedTab: number = 0;
    statusid: number = 0;
    menuData: any;
    iscard = true;
    enableMenu: any[];




    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService) { }

    ngOnInit() {
        this.pagePath = "Reports / Work Order / PM Work Orders / Workflow History";
        var contextObj = this;
        this.commonreportservice.getGridDataPMworkflowColumns().subscribe(function (result) {
                contextObj.fieldObject = (result["Data"]);
                contextObj.LoadData(1);           

        });

        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
    }


    LoadData(target?: number) {
            var contextObj = this;
            contextObj.commonreportservice.getGridDataPMworkflow(contextObj.statusid,contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, '').subscribe(function (result) {
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    if (target == 1) {
                        contextObj.itemsPerPage = result["Data"].RowsPerPage;
                    }
                }
                else {
                    contextObj.notificationService.ShowToaster("No Work Orders exist", 2);
                    contextObj.enableMenu = [];
                }
            });
    }


    onSubMenuChange(event: any) {
        this.isNextClicked = false;      
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else{
            event = this.inputItems.selectedIds;
            var newselectedIds = '';
            for (let count = 0; count < event.length; count++) {
                newselectedIds = newselectedIds + event[count] + ','
            }
            newselectedIds = newselectedIds.slice(0, -1);
            this.selectedIds = newselectedIds;
            this.selectedworkTypeId = this.inputItems.rowData["WorkTypeId"];     
            if (this.selectedIds == undefined || this.selectedworkTypeId == undefined) {
                this.isNextClicked = false;
            }
            else {
                var contexObj = this;
                setTimeout(function () {
                    contexObj.isNextClicked = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);
            }
        }

    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.LoadData(0);
    }
   public onSort(objGrid: any) {
        this.LoadData(0);
    }

    getSelectedTab(event) {
        this.selectedTab = event[0];
        if (event[0] == 0 && event[1] == true) {
            this.LoadData(0);
        }
    }

}