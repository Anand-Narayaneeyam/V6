import { Component, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
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

    selector: 'new-procedure-associate-equipment',
    templateUrl: 'app/Views/WorkOrder/Maintenance/Procedures-newAEC.component.html',
    directives: [GridComponent, SubMenu, DropDownListComponent, CustomCheckBoxComponent, PagingComponent],
    providers: [HTTP_PROVIDERS, WorkOrdereService, NotificationService, GeneralFunctions, ValidateService],
    inputs: ['target', 'equipmentId']
})

export class NewProcedureAssociateEquipmentComponent implements AfterViewInit {
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
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: false, sortCol: "[Equipment Class]", sortDir: "ASC", selectedIds: [], allowAdd: false };

    constructor(private workOrderService: WorkOrdereService, private notificationService: NotificationService, private getData: GeneralFunctions, private validateService: ValidateService) {
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.workOrderService.getProcedureNewAssociateEquipmentColumnData().subscribe(function (resultData) {
            contextObj.ddlEquipmentCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 4491; });
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (resultData.Data[i].FieldLabel.length > 13)
                    resultData.Data[i]["Width"] = 200;
                if (resultData.Data[i].FieldLabel.length > 28)
                    resultData.Data[i]["Width"] = 250;
            }
            var removeArr = [4491];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
            if (contextObj.ddlEquipmentCategory["LookupDetails"]["LookupValues"].length == 1) {
                var selId = contextObj.ddlEquipmentCategory["LookupDetails"]["LookupValues"][0].Id;
                contextObj.ddlEquipmentCategory["FieldValue"] = selId.toString();
                contextObj.onChangeEquipmentCategory(selId);
                if (<HTMLElement>document.getElementById("1426")) {
                    var el = <HTMLElement>document.getElementById("1426");
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
            this.workOrderService.getProcedureNewAssociateEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, /*contextObj.equipmentTypeId*/0, contextObj.equipmentId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                for (let i = 0; i < contextObj.itemsSource.length; i++) {
                    contextObj.equipmentIds.push({
                     Id: contextObj.itemsSource[i].Id
                    });
                }
                if (contextObj.totalItems == 0) {
                    contextObj.inputItems.isHeaderCheckBx = false;
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                }
                else {
                    contextObj.inputItems.isHeaderCheckBx = true;
                }
            });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.workOrderService.getProcedureNewAssociateEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, /*contextObj.equipmentTypeId*/0, contextObj.equipmentId).subscribe(function (resultData) {
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
                contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                contextObj.itemsSource = null;
            }
        });
    }

    insertEquipmentList(event: any) {
        var contextObj = this;
        //var selectedRowIds: string = "";
        var arrayList = new Array<ReportFieldArray>();

        //for (let i = 0, j = 0; i < contextObj.itemsSource.length, j < contextObj.equipmentIds.length; i++ , j++) {
        //    if (contextObj.itemsSource[i].Id == true) { // need to change Id to something else for checking JN
        //        if (i == 0) {
        //            selectedRowIds = contextObj.equipmentIds[i].Id.toString();
        //        }
        //        else {
        //            selectedRowIds = selectedRowIds + "," + contextObj.equipmentIds[i].Id.toString();
        //        }
        //    }
        //}
        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            if (this.objectCategoryId > 0) {
                contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
            }
            else {
                contextObj.notificationService.ShowToaster("Select an Equipment Category", 2);
            }
            return;
        }
        else {
            var hasSelectedIds: boolean = false;
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 5511,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            //if (selectedRowIds != "") {
            //var array = selectedRowIds.split(',');
            //for (let c = 0; c < array.length; c++) {
            //    if (array[c] != "") {
            //        arrayList.push({
            //            ReportFieldId: 5511,
            //            Value: array[c]
            //        });
            //    }
            //}
            if (hasSelectedIds == true) {
                arrayList.push({
                    ReportFieldId: 5510,
                    Value: contextObj.equipmentId.toString()
                });
                //var test = JSON.stringify(arrayList);
                this.workOrderService.postSubmitActionProcedureAssociateEquipment(JSON.stringify(arrayList)/*selectedRowIds*/, contextObj.equipmentId).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        contextObj.notificationService.ShowToaster("Equipment Class added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
                });
            }
            else {
                if (contextObj.totalItems > 0)
                    contextObj.notificationService.ShowToaster("Select an Equipment Class", 2);
                else {
                    contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
                }
            }
        }
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getProcedureNewAssociateEquipmentData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.objectCategoryId, /*contextObj.equipmentTypeId*/0, contextObj.equipmentId).subscribe(function (resultData) {
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
                contextObj.notificationService.ShowToaster("No Equipment Classes exist", 2);
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