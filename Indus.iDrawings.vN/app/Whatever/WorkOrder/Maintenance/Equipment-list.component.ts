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
import { NewEquipmentComponent } from './New-Equipment.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';

@Component({
    selector: 'Equipment-list',
    templateUrl: './app/Views/WorkOrder/Maintenance/Equipment-list.component.html',
    directives: [SlideComponent, SubMenu, Sorting, PagingComponent, FieldComponent, ListComponent, CardComponent, Notification, LabelComponent, searchBox, TabsComponent, TabComponent, NewEquipmentComponent, GridComponent],
    providers: [WorkOrdereService, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['selectedId', 'equipmentId', 'entityName','target'],
    encapsulation: ViewEncapsulation.None
})

export class EquipmentListComponent {    
    showSlide: boolean = false;
    position: any = "top-right";
    target: number;
    selectedTab: number = 0;
    newEquipmentTab: boolean = false;
    action: string;
    selectedId: any;
    fieldRoute: IField[];
    sourceData: any[];
    EquipmentData: any;
    public totalItems: number;// = 1000;
    public itemsPerPage: number;// = 200;
    pageIndex: number = 0;
    sortCol: string = "[Order]";
    sortDir: string = "ASC";
    success = "";
    selIds = new Array();
    private fields: IField[];
    cardButtonPrivilege = [false, false];
    //Form id : 242
    //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (242))
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 6129
        },
        {
            "id": 1,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 6131
        },
        //for privilege
        {
            "id": 2,
            "title": "Edit",
            "image": null,
            "path": null,
            "submenu": null,
            "isvisible": false,
            "privilegeId": 6131
        }
    ];
    gridcount = 8;
    enableMenu = [0, 1];
    deleteIndex: number = 0;
    localselection: number;
    entityName: string;
    sortFields: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: 'Order', sortDir: 'ASC' };
    constructor(private administrationServices: AdministrationService,private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        
        this.workOrderService.getEquipmentColumnData().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];

                contextObj.fieldRoute = resultData["Data"].find(function (el) { return el.ReportFieldId === 5628; });
                //if (changes["EquipmentData"]["currentValue"]) {
                //    console.log('EquipmentData', this.EquipmentData);
                //    console.log('selectedId', this.selectedId);
                //    contextObj.fieldRoute["FieldValue"] = changes["EquipmentData"]["currentValue"]["Route"];
                //}
                //for (let i = 0; i < resultData["Data"].length; i++) {
                    var updatedData = new Array();/*To notify the watcher about the change*/
                    //resultData["Data"].splice(1, 2)
                    updatedData = updatedData.concat(resultData["Data"]);
                    contextObj.fields = updatedData;
                    contextObj.fields = contextObj.fields.slice(0, 5);
                //    break;
                //}
            })
        this.workOrderService.getEquipmentData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId[0]).subscribe(function (resultData) {
                contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.gridcount = contextObj.totalItems;
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                    if (contextObj.target !=2)
                        contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                }
        });
        if (this.target == 2) {
            this.localselection = 1;
            contextObj.newEquipmentTab = true;
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 50);
        }

        //form id : 242***** PageId :2539
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2539, contextObj.administrationServices, contextObj.menuData.length);
        //var callBack = function (data) {
        //    if (data != undefined && data.length != 0)
        //        data.filter(function (el) {
        //            if (el.title == "Edit") {
        //                contextObj.cardButtonPrivilege[0] = true;
        //            }
        //            else if (el.title == "Delete") {
        //                contextObj.cardButtonPrivilege[1] = true;
        //            }
        //        });
        //    this.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2539, contextObj.administrationServices, contextObj.menuData.length);
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
                this.localselection = 1;
                contextObj.newEquipmentTab = true;
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
        var contextObj = this;
        if (equipmentIds.length == 1) {
            this.workOrderService.checkEquipmentInUse(this.inputItems.selectedIds[0], this.selectedId).subscribe(function (resultData) {
                if (resultData["Data"] == 0)
                    contextObj.showSlide = !contextObj.showSlide;
                else
                    contextObj.notificationService.ShowToaster("Selected Equipment in use, cannot be deleted", 5);
            });
        }
        else if (equipmentIds.length >1){
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.notificationService.ShowToaster("Select Equipment", 2);
        }
    }

    okDelete(event: any) {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 5633,
            Value: this.selectedId.toString()
        });
        this.showSlide = !this.showSlide;
        this.workOrderService.postEquipmentDelete(this.inputItems.selectedIds[0], this.selectedId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == "1") {
                //let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                //contextObj.sourceData = retUpdatedSrc["itemSrc"];
                //contextObj.totalItems = retUpdatedSrc["itemCount"];
                //if (contextObj.totalItems == 0) {
                //    contextObj.enableMenu = [0];
                //}
                contextObj.notificationService.ShowToaster("Selected Equipment deleted", 3);
                contextObj.workOrderService.getEquipmentData(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.selectedId).subscribe(function (resultData) {
                    contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
                    if (contextObj.totalItems == 0) {
                        contextObj.enableMenu = [0];
                    }
                });   
            }
        });       
    }

    onDelete(e: Event) {
        this.deleteEquipment(this.selIds);
    }

    onTabClose(event: any) {
        this.newEquipmentTab = false;
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
            this.workOrderService.getEquipmentData(this.pageIndex,this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
                contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.gridcount = contextObj.totalItems;
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
                contextObj.selectedTab = 0;
                contextObj.deleteIndex = contextObj.deleteIndex + 1;
                contextObj.newEquipmentTab = false;
            });
        }
    }

    onSorting(objGrid: any) {
        console.log('sorting');
        var contextObj = this;
        this.sortCol = objGrid.selectedField;
        this.sortDir = objGrid.sortDirection;
        this.workOrderService.getEquipmentData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId[0]).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getEquipmentData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId[0]).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}



