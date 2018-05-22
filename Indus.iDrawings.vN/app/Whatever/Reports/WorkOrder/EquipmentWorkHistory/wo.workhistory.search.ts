
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service';
import { DropDownListComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { IGrid} from '../../../../Framework/Models/Interface/Igrid';
import { GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import { WOWorkHistoryReportComponent} from './wo.workhistory.report.component';
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';



@Component({
    selector: 'workhistory-selector',
    templateUrl: './app/Views/Reports/WorkOrder/EquipmentWorkHistory/wo.workhistory.search.html',
    providers: [CommonReportService, NotificationService],
    directives: [DropDownListComponent, GridComponent, WOWorkHistoryReportComponent, PagingComponent, Notification, PageComponent, TabsComponent, TabComponent, SubMenu]
})

export class WorkHistorySearchReportComponent implements OnInit {



    ddlEquipmentCategory: IField;
    ddlEquipmentType: IField;
    alignContent: string;
    equipmentCategoryId: any = 0;
    equipmentClassId: any = 0;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, allowEdit: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    isNextClicked: boolean = false;
    selectedIds: any;
    pagePath: string;
    selectedTab: number = 0;
    menuData: any;
    iscard = true;
    enableMenu: any[];




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
        this.pagePath = "Reports / Work Order / General / Equipment Work History";
        var contextObj = this;
        contextObj.commonreportservice.getEquipmentColumn(contextObj.equipmentCategoryId).subscribe(function (resultData) {
            contextObj.ddlEquipmentCategory = resultData.Data.FieldBinderList[0];
            contextObj.ddlEquipmentType = resultData.Data.FieldBinderList[1];
            var updatedData = new Array();
            resultData["Data"]["FieldBinderList"].splice(0, 2)
            updatedData = updatedData.concat(resultData["Data"]["FieldBinderList"]);
            contextObj.fieldObject = updatedData;
            if (resultData.Data.FieldBinderList[0].LookupDetails.LookupValues != null) {
                if (resultData.Data.FieldBinderList[0].LookupDetails.LookupValues.length == 0) {
                    contextObj.notificationService.ShowToaster("No Equipment Catogories exist", 2);
                }
            }
            
        });
        this.alignContent = "horizontal";

    }

    onChangeEquipmentCategory(event: any) {
        this.equipmentCategoryId = event;
        this.ddlEquipmentType.FieldValue = "-1";
            var contextObj = this;
            contextObj.commonreportservice.getEquipmentColumn(contextObj.equipmentCategoryId).subscribe(function (resultData) {
                var updatedData = new Array();
                resultData["Data"]["FieldBinderList"].splice(0, 2)
                updatedData = updatedData.concat(resultData["Data"]["FieldBinderList"]);
                contextObj.fieldObject = updatedData;

                });
            if (event == -1) {
                contextObj.ddlEquipmentType.LookupDetails.LookupValues = [];
                contextObj.ddlEquipmentType.FieldValue = "-1";   
               
            }
            contextObj.commonreportservice.getEquipmentType(contextObj.equipmentCategoryId, 1535).subscribe(function (resultData) {
                if (resultData.Data.LookupValues.length != 0){
                    contextObj.ddlEquipmentType.LookupDetails.LookupValues = resultData.Data["LookupValues"];
                }
                else {
                    if (event != -1) {
                        contextObj.ddlEquipmentType.LookupDetails.LookupValues = [];
                        contextObj.ddlEquipmentType.FieldValue = "-1";   
                        contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                    }
                }
                    });
            contextObj.itemsSource = [];
        }

    onChangeEquipmentType(event: any) {
                this.equipmentClassId = event;
                this.PageLOad();

            }


    onSubMenuChange(event: any) {
                        this.isNextClicked = false;
                        if (this.inputItems.selectedIds.length > 1) {
                                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else if (this.inputItems.selectedIds.length < 1) {
                            return
                            /*this.notificationService.ShowToaster("Select an Equipment", 2);*/
                        }
                        else {
                                event = this.inputItems.selectedIds;
                                var newselectedIds = '';
                                for (let count = 0; count < event.length; count++) {
                                    newselectedIds = newselectedIds + event[count] + ','
                                }
                                newselectedIds = newselectedIds.slice(0, -1);
                                this.selectedIds = newselectedIds;    
                                var contexObj = this;
                                setTimeout(function () {
                                    contexObj.isNextClicked = true;
                                }, 50);
                                setTimeout(function () {
                                    contexObj.selectedTab = 1;
                                }, 100);
                        }

                }

        getSelectedTab(event) {
            this.selectedTab = event[0];
        }


            public pageChanged(event: any) {
                this.pageIndex = event.pageEvent.page;
                this.PageLOad();
            };


            PageLOad() {

                var contextObj = this;
                contextObj.commonreportservice.getGridData(contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                    if (resultData["Data"].FieldBinderData != "[]") {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    }
                    else {
                        if (contextObj.equipmentClassId != -1) {
                            contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                        }
                    }
                });

            }
}