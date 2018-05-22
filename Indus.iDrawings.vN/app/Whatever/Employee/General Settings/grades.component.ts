﻿import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { EmployeeService } from '../../../Models/Employee/employee.services';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { FieldOrderComponent } from '../../Common/additional data fields/fieldorder.component';
import { DND_PROVIDERS, DND_DIRECTIVES } from '../../../framework/externallibraries/dnd/ng2-dnd';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {GradesAddEditComponent} from './grades-add-edit.component';

@Component({
    selector: 'grades',
    templateUrl: 'app/Views/Employee/General Settings/grades.component.html',
    directives: [ListComponent, FieldComponent, Notification, SubMenu, PagingComponent, SlideComponent, FieldOrderComponent, DND_DIRECTIVES, SplitViewComponent, GridComponent, GradesAddEditComponent],
    providers: [HTTP_PROVIDERS, EmployeeService, NotificationService, ConfirmationService, GeneralFunctions, DND_PROVIDERS]

})


export class GradesComponent implements OnInit {

    dragEnable: boolean = true;
    public totalItems: number = 0;
    returnData: any;
    types = true;
    pageIndex: number = 0;
    message;
    public itemsPerPage: number = 30;
    success = "";
    public fieldDetails: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: "[Rank Number]", sortDir: "ASC",selectioMode:"single" };
    public errorMessage: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    pageTitle: string;
    GradeSource: any[];
    submitSuccess: any[] = [];
    private fields: IField[];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add"
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit"
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete"
        }
        //, {
        //    "id": 4,
        //    "title": "Rank Order",
        //    "image": "Rank Order",
        //    "path": "Rank Order",
        //    "submenu": null
        //}
    ];
    gridcount = 0;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    enableMenu = [];
    selIds = new Array();
    fieldOrderObj = new Array<FieldObjectArray>();
    menuEventValue: any;
    fieldDetailsAdd1: IField[];
    refreshgrid;
    constructor(private employeeService: EmployeeService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private getData: GeneralFunctions) { }

    ngOnInit(): void {
        var contextObj = this;
        this.employeeService.getGradeFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            for (var i = 0; i < resultData["Data"].length; i++) {
                    resultData.Data[i]["Width"] = 100;               
            }
            contextObj.getGrades();
        });
    }

    public changeEnableMenu() {
        var contextObj = this;
        contextObj.enableMenu = [1,2,3];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [1];
            contextObj.notificationService.ShowToaster("No Grades exist", 2);
        }
    }

    public getGrades() {
        var contextObj = this;
        this.employeeService.getGradeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {

            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"] == "") {
                    resultData["Data"] = null;
                } else {
                    contextObj.GradeSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    for (var i = 0; i < contextObj.GradeSource.length; i++) {
                        contextObj.fieldOrderObj.push({
                            Id: contextObj.GradeSource[i].Id,
                            Value: contextObj.GradeSource[i].Grade,
                            OldPositionNo: contextObj.GradeSource[i]["Rank Number"],
                            NewPositionNo: null
                        })
                    }
                }
                contextObj.changeEnableMenu();
            }
        });
    }


    onCardSubmit(event: any) {
        var contextObj = this;
        let fieldDetails = event.fieldObject;
        if (event["dataKeyValue"]) {
            this.employeeService.postEditGradeDetails(fieldDetails, event["dataKeyValue"]).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.notificationService.ShowToaster("Grade updated", 3);
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Grade already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "1012" });
                    }
                    contextObj.changeEnableMenu();
                }

            })
        } else {
            this.employeeService.postAddGradeDetails(fieldDetails).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"].Message;
                    if (contextObj.success == "Success") {
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.notificationService.ShowToaster("Grade added", 3);
                        contextObj.types = false;
                        contextObj.GradeSource[contextObj.GradeSource.length - 1].Id = resultData["Data"].ServerId;
                        contextObj.GradeSource[contextObj.GradeSource.length - 1] = eval(resultData["Data"].Data)[0];
                        contextObj.totalItems = contextObj.totalItems + 1;
                        contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                    }
                    else {
                        //contextObj.GradeSource.splice(contextObj.GradeSource.length - 1, 1);
                        contextObj.notificationService.ShowToaster("Grade already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "1012" });
                    }
                    contextObj.changeEnableMenu();
                }
            });
        }
    }

    public onCardCancel(event: any) {
        this.changeEnableMenu();
    }

    public onSubMenuChange(event: any, Id: any) {
        this.menuEventValue = event.value;
        if (event.value == 1) // Add
        {
            this.onMenuAddClick();
        }
        else if (event.value == 2) // Edit
        {
            this.onMenuEditClick();
        }
        else if (event.value == 3) // Delete
        {
            this.onMenuDeleteClick();
        }
        else if (event.value == 4) // Add
        {
            this.FieldorderClick();
            this.pageTitle = "Rank Order";
        }
    }

    onDelete(e: Event) {
        this.onMenuDeleteClick();
    }

    public onMenuAddClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Grade";
        this.employeeService.loadGradeAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.fieldDetailsAdd1[2].IsVisible = false;
        })
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    public onMenuEditClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Grade";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Grade", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.employeeService.loadGradeAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }

    public FieldorderClick() {
        //this.GradeSource = this.getData.updateTotalItems(this.totalItems, this.action);
        //this.types = true;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.enableMenu = [1, 2, 3];
    }
    public onMenuDeleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Grade", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            //var dbObject = new Array<ReportFieldArray>();
            //dbObject.push({ ReportFieldId: 173, Value: "732" })
            //this.employeeService.CheckIsEntityReferenceFound(dbObject, this.selIds[0]).subscribe(function (resultData) {
            this.employeeService.IsGradeInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 0) {
                    contextObj.message = "Are you sure you want to delete the selected Empolyee Grade?";
                    contextObj.showSlide = !contextObj.showSlide;
                }
                else {
                    contextObj.notificationService.ShowToaster("Selected Grade in use, cannot be deleted", 5);
                }
            });
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Catering Item?", "Yes");
            
        }
    }

    okDelete(event: Event) {
        this.deleteGrade();
        this.showSlide = !this.showSlide;
    }
    deleteGrade() {
        var contextObj = this;
        //if (event.returnOk == true) {
        this.employeeService.postDeleteGradeDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                if (resultData["Data"]["StatusId"] == 1) {
                    let retUpdatedSrc = contextObj.getData.updateDataSource(contextObj.GradeSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.GradeSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [1];
                    }
                    contextObj.getGrades();
                    contextObj.notificationService.ShowToaster("Selected Grade deleted", 3);
                } else {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Selected Grade in use, cannot be deleted", 5);
                            }
                            break;
                    }
                }
            }
        });
        //}
    }


    cancelClick(event: Event) {
        //this.selIds = [];
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getGrades();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getGrades();
    }
    private rankdorderUpdate(event: any) {
        console.log(event);
    }

    updateFieldOrder(event, fieldOrderObj: FieldObjectArray[]) {
        var contextObj = this;
        var strField: string = "";
        var count = 0;
        var submitArray = new Array<SubmitFieldOrderArray>();
        if (fieldOrderObj != undefined) {
            for (var i = 0; i < fieldOrderObj.length; i++) {
                fieldOrderObj[i].NewPositionNo = i;
                submitArray.push({
                    ReportFieldId: 5089,
                    ApplicationFieldId: fieldOrderObj[i].Id,
                    ApplicationFormId: 184,
                    PositionNo: i
                })
            }
            console.log("out", submitArray);
            this.employeeService.postUpdateEmployeeRankOrder(JSON.stringify(submitArray)).subscribe(function (resultData) {
                debugger
                if (resultData["Data"].StatusId == 1) {
                    contextObj.notificationService.ShowToaster("Rank Order updated", 3);
                    contextObj.employeeService.getGradeData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                        if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                            if (resultData["Data"] == "") {
                                resultData["Data"] = null;
                            } else {
                                contextObj.GradeSource = JSON.parse(resultData["Data"].FieldBinderData);
                                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                                contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                            }
                            contextObj.changeEnableMenu();
                        }
                    });
                }
            });
        }
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.GradeSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.GradeSource = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
        } else if (this.action == "edit") {
            retUpdatedSrc = this.getData.updateDataSource(contextObj.GradeSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            //contextObj.ProceduresSource = retUpdatedSrc["itemSrc"];
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = false;


    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

export interface FieldObjectArray {
    Id: number;
    Value: string;
    OldPositionNo: number;
    NewPositionNo: number;
}

export interface SubmitFieldOrderArray {
    ReportFieldId:  number,
    ApplicationFieldId: number,
    ApplicationFormId: number,
    PositionNo: number   
}
