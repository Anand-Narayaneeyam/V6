import { Component, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { SpaceService } from '../../../Models/Space/space.service'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { IField } from '../../../Framework/Models//Interface/IField'
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { NewResourcesComponent } from './new-space_resources';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'spaceResourceList',
    templateUrl: './app/Views/Space/Space Data/spaceResourceList.html',
    directives: [SubMenu, Sorting, PagingComponent, FieldComponent, ListComponent, CardComponent, Notification, LabelComponent, searchBox, TabsComponent, TabComponent, NewResourcesComponent, SlideComponent],
    providers: [SpaceService, NotificationService],
    inputs: ['selectedId', 'SpaceData']
})

export class SpaceResourceListComponent {
    showSlide: boolean = false;
    position: any = "top-right";
    target: number;
    selectedTab: number = 0;
    localselection: number;
    deleteIndex: number;
    newResourceTab: boolean = false;
    selectedId: number;
    fieldSpaceKey: IField[];
    fieldRoomNo: IField[];
    sourceData: any[];
    SpaceData: any;
    public totalItems: number;// = 1000;
    public itemsPerPage: number;// = 200;
    pageIndex: number = 0;
    sortCol: string = "[Resource Type]";
    sortDir: string = "ASC";
    blnShowSort: boolean = true;
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
    isDeleteVisible: boolean = false;
    @Output() spaceResourceCount = new EventEmitter();

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions) {      
    }

    ngOnInit() {
        var contextObj = this;
        this.isDeleteVisible = false;
        this.loadData();
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes["selectedId"] && changes["selectedId"]["currentValue"] != changes["selectedId"]["previousValue"]) {
        }
    }

    loadData() {
        var contextObj = this;
        this.spaceService.getSpaceResourceColumnData().subscribe(function (resultData) {
            contextObj.fieldSpaceKey = resultData["Data"].find(function (el) { return el.ReportFieldId === 782; });
            contextObj.fieldRoomNo = resultData["Data"].find(function (el) { return el.ReportFieldId === 793; });
            if (contextObj.SpaceData) {
                contextObj.fieldSpaceKey["FieldValue"] = contextObj.SpaceData["Space Key"]
                contextObj.fieldRoomNo["FieldValue"] = contextObj.SpaceData["Room No."]
            }
            var removeArr = [782, 793];
            contextObj.fields = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
        })
        this.spaceService.getSpaceResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Resources added", 2);
                contextObj.blnShowSort = false;
            } else {
                contextObj.enableMenu = [0, 1];
                contextObj.blnShowSort = true;
            }
        });
    }

    onSorting(event: any) {
        var contextObj = this;
        this.sortDir = event["sortDirection"];
        this.sortCol = event["selectedField"];
        this.spaceService.sortSpaceResource(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [0, 1];
            }
        });
    }

    getSelectedTab(event: any) {
        this.deleteIndex = 0;
        var contextObj = this;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    }

    onTabClose(event: any) {
        this.newResourceTab = false;
        this.selectedTab = event[0];
    }

    public loadTabContent() {
        var contextObj = this;
        this.localselection = 1;
        contextObj.newResourceTab = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 50);
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                this.loadTabContent();
                break;
            case 1:
                this.deleteResources(this.selIds);
                break;
        }
    }

    public deleteResources(resourceIds) {
        if (resourceIds.length > 0) {
            this.showSlide = !this.showSlide;
        }  else {
            this.notificationService.ShowToaster("Select Resource(s)", 2);
        }
    }

    okDelete(event: any) {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < contextObj.selIds.length; i++) {
            arrayList.push({
                ReportFieldId: 656,
                Value: this.selIds[i].toString()
            });
        }
        //var fieldobj = new Array<ReportFieldArray>();
        //fieldobj.push({
        //    ReportFieldId: 665,
        //    Value: this.selectedId.toString()
        //});
        this.showSlide = !this.showSlide;
        this.spaceService.postResourcesDelete(JSON.stringify(arrayList), this.selectedId).subscribe(function (resultData) {
            contextObj.success = resultData["Data"].Message;
            if (resultData["Data"].StatusId == "1") {                
                contextObj.notificationService.ShowToaster("Selected Resource(s) deleted", 3);                
            }
        });
        this.spaceService.getSpaceResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.blnShowSort = false;
            }
            contextObj.toUpdateSpaceRowData(contextObj.selectedId, contextObj.totalItems);
        });
    }

    onDelete(e: Event) {
        this.deleteResources(this.selIds);
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
            this.spaceService.getSpaceResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
                contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                if (contextObj.totalItems > 0) {
                    contextObj.enableMenu = [0, 1];
                    contextObj.blnShowSort = true;
                }
                contextObj.toUpdateSpaceRowData(contextObj.selectedId, contextObj.totalItems);
            });
        }
    }

    public toUpdateSpaceRowData(selectedId, count) {
        var contextObj = this;
        contextObj.spaceResourceCount.emit({
            spaceId: selectedId,
            resourceCount: count
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}



