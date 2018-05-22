
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../../Models/reports/common.service';
import { IGrid} from '../../../../../Framework/Models/Interface/Igrid';
import { GridComponent} from '../../../../../Framework/Whatever/Grid/grid.component';
import { WOSRCostDetailsReportComponent } from './wo.srwocostdetails.report.component';
import {PagingComponent} from '../../../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../../Framework/Models/Notification/notify.service';
import { DropDownListComponent } from '../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { PageComponent } from '../../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../../Framework/Whatever/Tab/tab.component'
import { SubMenu } from '../../../../../Framework/Whatever/Submenu/submenu.component';



@Component({
    selector: 'wo-srwocostdetails-report',
    templateUrl: './app/Views/Reports/WorkOrder/SR/CostDetails/wo.srwocostdetails.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [GridComponent, WOSRCostDetailsReportComponent, PagingComponent, Notification, PageComponent, TabsComponent, TabComponent, SubMenu, DropDownListComponent]
})

export class WOSRCostDetailsSelect implements OnInit {

    ddlWorkType: IField = undefined;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "WorkOrderId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false };
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    isNextClicked: boolean = false;
    selectedIds: any;
    totalItems: number = 0;
    selectedworkTypeId: number = 0;
    WorkOrderId: number;
    WorkTypeName: any = "";
    RequestNo: any = "";
    Description: any = "";
    pagePath: string;
    selectedTab: number = 0;
    statusid: number = 0;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    alignContent: string;

    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService) { }

    ngOnInit() {

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
        this.pagePath = "Reports / Work Order / Service Requests / Work Order Cost Details";
        var contextObj = this;
        this.commonreportservice.getGridDataSRworkflowColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
        });

        this.commonreportservice.getWOCostDetailsReportFields().subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[0];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    }

    getdata() {
        var contextObj = this;
        this.commonreportservice.ddlgetWorkTypeLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    }

    onChangeWorkType(event: any) {
        this.selectedworkTypeId = event;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
        var contextObj = this;
        contextObj.LoadData(1);
    }

    LoadData(target?: number) {

        var contextObj = this;
        contextObj.commonreportservice.getGridDataSRWOCostDetailsReport(contextObj.selectedworkTypeId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, '').subscribe(function (result) {
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
        else {

            event = this.inputItems.selectedIds;
            var newselectedIds = '';
            for (let count = 0; count < event.length; count++) {
                newselectedIds = newselectedIds + event[count] + ','
            }
            newselectedIds = newselectedIds.slice(0, -1);
            this.selectedIds = newselectedIds;
            this.WorkOrderId = this.inputItems.rowData["WorkOrderId"];
            this.RequestNo = this.inputItems.rowData["Request Number"];
            this.Description = this.inputItems.rowData["Description"];
            if (this.selectedIds == undefined || this.WorkOrderId == undefined || this.selectedworkTypeId == -1) {
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