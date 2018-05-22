
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { FieldComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { GridComponent} from '../../../../../Framework/Whatever/Grid/grid.component';
import { PrintServiceRequestReportComponent} from './PrintServiceRequest_Report';
import {PagingComponent} from '../../../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component'
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';

@Component({
    selector: 'print-serviverequest',
    templateUrl: './app/Views/Reports/WorkOrder/SR/PrintServiceRequest/PrintServiceRequest_Report.html',
    providers: [CommonReportService, NotificationService],
    directives: [GridComponent, PrintServiceRequestReportComponent, PagingComponent, Notification, PageComponent,
        TabsComponent, TabComponent, SubMenu, FieldComponent]
})

export class SelectPrintServiceRequest implements OnInit {
    equipmentCategoryId: any = 0;
    equipmentClassId: any = 0;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "WorkRequestId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", selectedIds: [], allowAdd: false, allowEdit: false };
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    isNextClicked: boolean = false;
    selectedIds: any;
    totalItems: number = 0;
    workTypeId: number = 0;
    selectedworkTypeId: number;
    pagePath: string;
    workOrderId: any;
    workflowEntityCategoryId: any;
    currentWorkFlowActionPointId: any;
    filter: string;
    selectedTab: number = 0;
    statusid: any = 0;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    rowDatas: any;

    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService) { }

    ngOnInit() {
        this.pagePath = "Reports / Work Order / Service Requests / Print Service Request Report";            
        var contextObj = this;
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
        this.commonreportservice.getPrintSRFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            contextObj.loadData(1);
        });                     
    }

    loadData(target?: number) {
        var contextObj = this;
        contextObj.commonreportservice.getPrintSRData(contextObj.statusid, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            } else {
                contextObj.notificationService.ShowToaster("No Requests exist", 2);
                contextObj.enableMenu = [];
            }
        });
    }

    public onSort(objGrid: any) {
        this.loadData(0);
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.loadData(0);
    }

    onSubMenuChange(event: any) {
        this.isNextClicked = false;
        if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a row", 2);
        } else {
            this.selectedIds = this.inputItems.selectedIds;
            this.rowDatas = this.inputItems.rowData;
            if (this.selectedIds == undefined) {
                this.isNextClicked = false;
            } else {
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

    getSelectedTab(event) {
        this.selectedTab = event[0];
        if (event[0] == 0 && event[1] == true) {
            this.loadData(0);
        }
    }
}