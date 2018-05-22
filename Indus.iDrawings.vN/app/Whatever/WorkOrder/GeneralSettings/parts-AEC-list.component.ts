import { Component, OnChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { IField } from '../../../Framework/Models//Interface/IField'
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { NewAssociateEquipmentComponent } from './parts-newAEC.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';

@Component({
    selector: 'parts-AEC-list',
    templateUrl: './app/Views/WorkOrder/GeneralSettings/parts-AEC-list.component.html',
    directives: [SlideComponent, SubMenu, Sorting, PagingComponent, FieldComponent, ListComponent, CardComponent, Notification, LabelComponent, searchBox, TabsComponent, TabComponent, NewAssociateEquipmentComponent, GridComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    inputs: ['selectedId', 'entityName', 'target'],
    encapsulation: ViewEncapsulation.None
})

export class PartsAECListComponent {

    showSlide: boolean = false;
    position: any = "top-right";
    target: number;
    selectedTab: number = 0;
    newAssociateEquipmentTab: boolean = false;
    action: string;
    selectedId: any;
    fieldRoute: IField[];
    itemsSource: any[];
    EquipmentData: any;
    public totalItems: number;// = 1000;
    public itemsPerPage: number;// = 200;
    pageIndex: number = 0;
    sortCol: string = "[Equipment Class]";
    sortDir: string = "ASC";
    success = "";
    selIds = new Array();
    private fields: IField[];
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
        }
    ];
    gridcount = 8;
    enableMenu = [0, 1];
    deleteIndex: number;
    localselection: number;
    entityName: string;
    types = true;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Equipment Class]', sortDir: 'ASC', selectioMode: "single" };

    constructor(private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        this.workOrderService.getAECField().subscribe(function (resultData) {
            for (var i = 0; i < resultData["Data"].length; i++) {
                resultData.Data[i]["Width"] = 200;
            }
            contextObj.fields = resultData["Data"];
        });
        this.deleteIndex = 0;
        if (this.localselection > 0) {
            this.deleteIndex = this.localselection;
            this.newAssociateEquipmentTab = false;
        }
        contextObj.dataLoad();
    }

    public dataLoad() {
        var contextObj = this;
        contextObj.workOrderService.getAssociateEquipmentClassData(contextObj.selectedId, contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            contextObj.gridcount = contextObj.totalItems;
            if (contextObj.totalItems == 0) {
                if (contextObj.target != 2)
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                contextObj.enableMenu = [0];
            }
            if (contextObj.target == 2) {
                contextObj.localselection = 1;
                contextObj.newAssociateEquipmentTab = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
            }
        });
    }

    getSelectedTab(event: any) {
        this.selectedTab = event[0];
        var contextObj = this;
        if (this.selectedTab == 0) {
            if (event[2].children[0].children[1]) {

                event[2].children[0].children[1].style.visibility = "hidden";
                event[2].children[0].children[1].children[1].style.visibility = "hidden"
            }
        } else {
            if (event[2].children[0].children[1]) {

                event[2].children[0].children[1].style.visibility = "visible";
                event[2].children[0].children[1].children[1].style.visibility = "visible"
            }
        }
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.localselection = 1;
                contextObj.newAssociateEquipmentTab = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
                break;
            case 1:
                this.deleteEquipment(this.inputItems.selectedIds);
                break;
        }
    }

    public deleteEquipment(equipmentIds) {
        if (equipmentIds.length > 0) {
            this.showSlide = !this.showSlide;
        }
        else {
            this.notificationService.ShowToaster("Select an Equipment Class", 2);
        }
    }

    okDelete(event: any) {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 12252,
            Value: this.selectedId.toString()
        });
        for (let c = 0; c < this.inputItems.selectedIds.length; c++) {
            fieldobj.push({
                ReportFieldId: 12251,
                Value: this.inputItems.selectedIds[c].toString()
            });
        }
        this.showSlide = !this.showSlide;
        var test = JSON.stringify(fieldobj);
        this.workOrderService.postAssociateEquipmentDelete(JSON.stringify(fieldobj), this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Equipment Class deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Equipment Class in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }

    onDelete(e: Event) {
        this.deleteEquipment(this.inputItems.selectedIds);
    }

    onTabClose(event: any) {
        this.newAssociateEquipmentTab = false;
        this.selectedTab = event[0];
    }

    closeSlideDialog(event: any) {
        this.showSlide = event.value;
    }
    cancelClick(event: any) {
        this.showSlide = false;
    }

    submitSuccess(event: any) {
        var contextObj = this;
        if (event["status"] == "success") {
            this.workOrderService.getAssociateEquipmentClassData(this.selectedId, this.pageIndex, this.sortCol, this.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.enableMenu = [0,1];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.selectedTab = 0;
                contextObj.deleteIndex = contextObj.deleteIndex + 1;
                contextObj.newAssociateEquipmentTab = false;
            });
        }
    }

    onSort(objGrid: any) {
        console.log('sorting');
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.workOrderService.getAssociateEquipmentClassData(this.selectedId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.gridcount = contextObj.totalItems;
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment Class exists", 2);
                contextObj.enableMenu = [0];
            }
        });
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getAssociateEquipmentClassData(this.selectedId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.gridcount = contextObj.totalItems;
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment Class exists", 2);
                contextObj.enableMenu = [0];
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}