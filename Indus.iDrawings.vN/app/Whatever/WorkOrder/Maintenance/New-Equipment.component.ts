import { Component, Output, EventEmitter, AfterViewInit, Input, ElementRef } from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { IField} from '../../../framework/models/interface/ifield';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomCheckBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

@Component({

    selector: 'new-equipment',
    templateUrl: 'app/Views/WorkOrder/Maintenance/New-Equipment.component.html',
    directives: [GridComponent, SubMenu, DropDownListComponent, CustomCheckBoxComponent, PagingComponent],
    providers: [HTTP_PROVIDERS, WorkOrdereService, NotificationService, GeneralFunctions, ValidateService],
    inputs: ['target','equipmentId']
})

export class NewEquipmentComponent implements AfterViewInit {
    target: number;
    equipmentId: number;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    errorMessage: string;
    fieldObject: IField[];
    itemsSource: any[];
    //filterByEmployeeLocation: any;
    ddlEquipmentCategory: any;
    ddlEquipmentType: any;
    objectCategoryId: any;
    equipmentTypeId: any;
    alignContent: string;
    isFilterLocation: boolean = false;
    isDdlEquipmentTypeLoaded: boolean = false;
    equipmentIds = new Array<IdsArray>();
    resourceWithFilterIds = new Array<IdsArray>();
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: false, sortCol: "Id", sortDir: "ASC", selectedIds: [], allowAdd: false };

    constructor(private workOrderService: WorkOrdereService, private notificationService: NotificationService, private el: ElementRef, private validateService: ValidateService, private getData: GeneralFunctions) {
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.alignContent = "horizontal";
        console.log(this.equipmentId);
        this.workOrderService.getNewEquipmentColumnData().subscribe(function (resultData) {
            contextObj.ddlEquipmentCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 4491; });
            contextObj.ddlEquipmentType = resultData["Data"].find(function (el) { return el.ReportFieldId === 657; });
            var updatedData = new Array();/*To notify the watcher about the change*/
            resultData["Data"].splice(2, 2)
            updatedData = updatedData.concat(resultData["Data"]);
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData.Data[i].FieldLabel.length > 13)
                    resultData.Data[i]["Width"] = 200;
                if (resultData.Data[i].FieldLabel.length > 28)
                    resultData.Data[i]["Width"] = 250;
            }
            contextObj.fieldObject = updatedData;
            if (contextObj.ddlEquipmentCategory["LookupDetails"]["LookupValues"].length == 1) {
                var selIdcat = contextObj.ddlEquipmentCategory["LookupDetails"]["LookupValues"][0].Id;
                contextObj.ddlEquipmentCategory["FieldValue"] = selIdcat.toString();
                contextObj.onChangeEquipmentCategory(selIdcat);
                if (<HTMLElement>document.getElementById("1357")) {
                    var el = <HTMLElement>document.getElementById("1357");
                    var fldObj = contextObj.ddlEquipmentCategory;
                    setTimeout(function () {
                        contextObj.validateService.initiateValidation(fldObj, contextObj, true, el);
                    }, 100);
                }
            }
        });
    }

    onChangeEquipmentCategory(event: any) {
        this.objectCategoryId = event;
        var contextObj = this;
        this.workOrderService.getEquipmentType(this.objectCategoryId, 1357).subscribe(function (resultData) {
                if (resultData["Data"]["LookupValues"] != "") {
                    if (contextObj.ddlEquipmentType["FieldId"] == 1358) {
                        contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                        if (contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"].length == 1) {
                            var selId = contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"][0].Id;
                            contextObj.ddlEquipmentType["FieldValue"] = selId.toString();
                            contextObj.onChangeEquipmentType(selId);
                            //
                            if (<HTMLElement>document.getElementById("1358")) {
                                var el = <HTMLElement>document.getElementById("1358");
                                var fldObj = contextObj.ddlEquipmentType;
                                setTimeout(function () {
                                    contextObj.validateService.initiateValidation(fldObj, contextObj, true, el);
                                }, 100);
                            }
                            //
                        }
                        else {
                            contextObj.ddlEquipmentType["FieldValue"] = "-1";
                        }
                    }
                    
                }
                else {
                    if (contextObj.ddlEquipmentType["FieldId"] == 1358) {
                        contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"] = null;
                        contextObj.ddlEquipmentType["FieldValue"] = "-1";
                        contextObj.equipmentTypeId = -1;
                        contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                        if (<HTMLElement>document.getElementById("1358")) {
                            var el = <HTMLElement>document.getElementById("1358");
                            var fldObj = contextObj.ddlEquipmentType;
                            setTimeout(function () {
                                contextObj.validateService.initiateValidation(fldObj, contextObj, true, el);
                            }, 100);
                        }
                    }
                }
            });
            this.isDdlEquipmentTypeLoaded = true;
            contextObj.inputItems.isHeaderCheckBx = false;
        this.itemsSource = [];
    }

    onChangeEquipmentType(event: any) {
        this.equipmentTypeId = event;
        var contextObj = this;
        if (contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"] == null) { this.equipmentTypeId = -1; }
        //if (this.equipmentTypeId > 0) {
            if (this.isDdlEquipmentTypeLoaded == true) {
                this.workOrderService.getNewEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, contextObj.equipmentTypeId, contextObj.equipmentId).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;                    
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    for (let i = 0; i < contextObj.itemsSource.length; i++) {
                        contextObj.equipmentIds.push({
                        Id: contextObj.itemsSource[i].Id
                        });
                    }
                    if (contextObj.totalItems == 0 && contextObj.equipmentTypeId != -1) {
                        contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                        contextObj.inputItems.isHeaderCheckBx = false;
                    }
                    else {
                        contextObj.inputItems.isHeaderCheckBx = true;
                    }
                });

            }
        //}
    }

    //public onSort(objGrid: any) {
    //    var contextObj = this;
    //    this.inputItems.sortCol = objGrid.sortCol;
    //    this.inputItems.sortDir = objGrid.sortDir;
    //    this.workOrderService.getNewEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, contextObj.equipmentTypeId, contextObj.equipmentId).subscribe(function (resultData) {
    //        contextObj.totalItems = resultData["Data"].DataCount;
    //        if (contextObj.totalItems > 0) {
    //            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
    //            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
    //            for (let i = 0; i < contextObj.itemsSource.length; i++) {
    //                contextObj.equipmentIds.push({
    //                    Id: contextObj.itemsSource[i].Id
    //                });
    //            }
    //        }
    //        else {
    //            contextObj.notificationService.ShowToaster("No Equipment exists", 2);
    //            contextObj.itemsSource = null;
    //        }
    //    });
    //}

    insertEquipmentList(event: any) {
        var contextObj = this;
        var selectedRowIds: string = "";
        var arrayList = new Array<ReportFieldArray>();
        if (contextObj.equipmentIds.length > 0) {
            var hasSelectedIds: boolean = false;
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 5633,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                arrayList.push({
                    ReportFieldId: 5632,
                    Value: contextObj.equipmentId.toString()
                });
                //var test = JSON.stringify(arrayList);
                this.workOrderService.postSubmitActionEquipment(JSON.stringify(arrayList)/*selectedRowIds*/, contextObj.equipmentId).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        contextObj.notificationService.ShowToaster("Equipment added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
                });
            }
            else {
                if (this.objectCategoryId >= 0 && this.equipmentTypeId >= 0 /*&& contextObj.ddlEquipmentType["LookupDetails"]["LookupValues"] != null*/) {
                    if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
                        contextObj.notificationService.ShowToaster("No Equipment exist", 2);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select an Equipment", 2);
                    }
                }
            }
        }
        else {
            //contextObj.notificationService.ShowToaster("Select an Equipment", 2);
        }
        
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getNewEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, contextObj.equipmentTypeId, contextObj.equipmentId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                for (let i = 0; i < contextObj.itemsSource.length; i++) {
                    contextObj.equipmentIds.push({
                        Id: contextObj.itemsSource[i].Id
                    });
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Equipment exists", 2);
                contextObj.itemsSource = null;
            }
        });
    }
}

export interface IdsArray {
    Id: number;
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}