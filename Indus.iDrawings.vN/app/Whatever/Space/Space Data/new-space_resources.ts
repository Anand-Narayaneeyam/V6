import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {SpaceService } from '../../../Models/Space/space.service'
import { IField } from '../../../framework/models/interface/ifield';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomCheckBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { GeneralFunctions } from '../../../Models/Common/General';

@Component({
    selector: 'new-space_resources',
    templateUrl: './app/Views/Space/Space Data/new-space_resources.html',
    directives: [GridComponent, SubMenu, DropDownListComponent, CustomCheckBoxComponent],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, GeneralFunctions],
    inputs: ['spaceId']
})

export class NewResourcesComponent implements AfterViewInit {
    spaceId: number;
    dataOption: number;
    objectCategoryId: any;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    errorMessage: string;
    fieldObject: IField[];
    itemsSource: any[]; 
    ddlResourceType: any;
    resourceTypeId: any;
    alignContent: string;
    isDdlResourceTypeLoaded: boolean = false;
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "", selectedIds: [], allowAdd: false };

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private getData: GeneralFunctions) {
    }

    ngAfterViewInit() {
        this.dataOption = 1;
        this.objectCategoryId = 16;
        var contextObj = this;
        this.alignContent = "horizontal";
        this.spaceService.getSpaceNewResourceColumnData().subscribe(function (resultData) {
            contextObj.ddlResourceType = resultData["Data"].find(function (el) { return el.ReportFieldId === 647; });
            var removeArr = [647];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
        })
        this.spaceService.getResourceType(this.objectCategoryId, this.dataOption).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"] != "") {
                if (contextObj.ddlResourceType["FieldId"] == 775) {
                    contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                    contextObj.ddlResourceType["FieldValue"] = "-1";
                }
                else {
                    if (contextObj.ddlResourceType["FieldId"] == 775) {
                        contextObj.ddlResourceType["LookupDetails"]["LookupValues"] = null;
                        contextObj.ddlResourceType["FieldValue"] = "-1";
                        contextObj.notificationService.ShowToaster("No Resource Type defined", 2);
                    }
                }
            }
            contextObj.isDdlResourceTypeLoaded = true; 
        }); 
    }

    onChangeResourceType(event: any) {
        this.resourceTypeId = event;
        this.onDataLoad();
    } 

    public onDataLoad() {
        var contextObj = this;
        if (this.isDdlResourceTypeLoaded == true) {
            this.spaceService.getSpaceNewResourceData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.resourceTypeId, contextObj.spaceId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Resources exist", 2);
                }
            })
        }
        this.itemsSource = [];
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.onDataLoad();
    }

    insertSpaceResourcesList(event: any) {
        var contextObj = this;
        var hasSelectedIds: boolean = false;
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                hasSelectedIds = true;
                arrayList.push({
                    ReportFieldId: 865,
                    Value: contextObj.itemsSource[i].Id.toString()
                });
            }
        }
        if (hasSelectedIds == true) {
            this.spaceService.postSubmitActionSpaceRsource(JSON.stringify(arrayList), contextObj.spaceId).subscribe(function (resultData) {
                if (resultData["Data"].StatusId > 0) {
                    contextObj.notificationService.ShowToaster("Resource added", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                }
            })
        }
        else {
            contextObj.notificationService.ShowToaster("Select a Resource", 2);
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}