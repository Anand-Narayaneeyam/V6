import { Component, OnChanges, SimpleChange } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField} from  '../../../../Framework/Models/Interface/IField'
import { ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import { EmployeeService } from '../../../../Models/Employee/employee.services';
import { LabelComponent } from '../../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { GridComponent } from '../../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { SubMenu} from '../../../../Framework/Whatever/Submenu/submenu.component';
import { GeneralFunctions } from '../../../../Models/Common/General';
import { AssignLocationComponent } from './assign-location';
import {EmployeeResourceListComponent} from '../../Data/employeeresourcelist'
import { SlideComponent} from '../../../../Framework/Whatever/Slide/slide.component';


@Component({
    selector: 'stackplan-details',
    templateUrl: './app/Views/Employee/Tools/SpacePlanning/stackplan-details.html',
    directives: [GridComponent, PagingComponent, FieldComponent, Notification, LabelComponent, SubMenu, SplitViewComponent, AssignLocationComponent,
        EmployeeResourceListComponent, SlideComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, EmployeeService],
    inputs: ["selectedId","stackPlanRowData"]
})

export class StackPlanDetailsComponent implements OnChanges {

    success = "";
    position: any = "top-right";
    showSlide = false;
    pageTitle: string;
    stackPlanRowData: any;
    floorId: any;
    selectedId: number;
    fieldObject: IField[];
    fieldDetailsAssign: IField[];
    fieldProjectName: IField[];
    fieldDateRequested: IField[];
    fieldDateToComplete: IField[];
    dateRequested: any;
    dateToComplete: any;
    fieldStatus: any;
    employeeId: any;
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    target: number = 0;
    projectId: any;
    gridcount = 1;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    menuData = [
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "subMenu": null
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null
        },
       /* {
            "id": 3,
            "title": "Show Resources",
            "image": "Show Resources",
            "path": "Show Resources",
            "subMenu": null
        },*/
        {
            "id": 5,
            "title": "Assign Location",
            "image": "Assign Locations",
            "path": "Assign Location",
            "subMenu":null
          /*  [
                {
                    "id": 5,
                    "title": "By Data Entry",
                    "image": "By Data Entry",
                    "path": "By Data Entry",
                    "subMenu": null
            },
                {
                    "id": 6,
                    "title": "In Drawing",
                    "image": "In Drawing",
                    "path": "In Drawing",
                    "subMenu": null
                }
            ]*/
        }
    ];
    enableMenu: any[];
    refreshgrid;

    constructor(private employeeService: EmployeeService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        this.enableMenu = [];
        this.fieldStatus = changes["stackPlanRowData"]["currentValue"]["Status"];
        this.floorId = changes["stackPlanRowData"]["currentValue"]["ScheduledFloorId"];

        var contextObj = this;
        if (changes["selectedId"] && changes["selectedId"]["currentValue"] != changes["selectedId"]["previousValue"]) {
            contextObj.employeeService.getStackPlanDetailsFields().subscribe(function (resultData) {
                contextObj.fieldProjectName = resultData["Data"].find(function (el) { return el.ReportFieldId === 895; });
                contextObj.fieldDateRequested = resultData["Data"].find(function (el) { return el.ReportFieldId === 897; });
                contextObj.fieldDateToComplete = resultData["Data"].find(function (el) { return el.ReportFieldId === 898; });
                if (changes["stackPlanRowData"]["currentValue"]) {
                    contextObj.fieldProjectName["FieldValue"] = changes["stackPlanRowData"]["currentValue"]["Project Name"]
                    contextObj.fieldDateRequested["FieldValue"] = changes["stackPlanRowData"]["currentValue"]["Date Requested"]
                    contextObj.fieldDateToComplete["FieldValue"] = changes["stackPlanRowData"]["currentValue"]["Date to Complete"]    
                    contextObj.dateRequested = contextObj.fieldDateRequested["FieldValue"]
                    contextObj.dateToComplete = contextObj.fieldDateToComplete["FieldValue"]   

                }
                var removeArr = [895, 897, 898];
                contextObj.fieldObject = resultData["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                })
            })

            if (contextObj.fieldStatus == "Approved")
                contextObj.enableMenu = [1, 2, 3, 4, 5, 6];
            else
                contextObj.enableMenu = [3];

            contextObj.projectId = changes["selectedId"]["currentValue"];
            contextObj.getstackPlanDetailsList();
        }
    }

    public getstackPlanDetailsList()
    {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray1>();
        fieldobj.push({
            ReportFieldId: 885,
            Value: contextObj.projectId
        },
            {
                ReportFieldId: 884,
                Value: null
            })
        contextObj.employeeService.getStackPlanDetailsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
            if (contextObj.totalItems < 1) {
                contextObj.notificationService.ShowToaster("No data exists", 2);
                contextObj.enableMenu = [];
            }
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.target = 1;
                this.editClick();
                break;

            case 2:
                this.target = 2;
                this.deleteClick();
                break;
          
            case 3:
                this.target = 3;
                this.showResourceClick();
                break;
            case 5:
                this.target = 5;
                this.assignLocation();
                break;
        }
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Move Details";

        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.rowData["Move Status"] == "Planned" || this.inputItems.rowData["Move Status"] == "Moved") {
            contextObj.notificationService.ShowToaster("Cannot edit Planned or Moved Employees", 2);
        } else {
            var drawingId = contextObj.inputItems.rowData["ScheduledDrawingId"];
            var fieldObj = new Array<ReportFieldArray>();

            fieldObj.push({
                FieldId: 221,
                ReportFieldId: 5090,
                Value: "0"
            });
            fieldObj.push({
                FieldId: 222,
                ReportFieldId: 5090,
                Value: "0"
            });
            fieldObj.push({
                FieldId: 223,
                ReportFieldId: 5090,
                Value: "0"
            });
            fieldObj.push({
                FieldId: 1569,
                ReportFieldId: 5090,
                Value: "0"
            });
            fieldObj.push({
                FieldId: 1569,
                ReportFieldId: 3059,
                Value: drawingId
            });

            this.employeeService.editMoveDetails(fieldObj, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAssign = resultData["Data"];

                for (let i = 0; i < contextObj.fieldDetailsAssign.length; i++) {

                    if (contextObj.fieldDetailsAssign[i].ReportFieldId == 895) {// Project Name 
                        contextObj.fieldDetailsAssign[i]["FieldValue"] = contextObj.fieldProjectName["FieldValue"];
                    }
                    else if (contextObj.fieldDetailsAssign[i].ReportFieldId == 897) {//DateRequested
                        contextObj.fieldDetailsAssign[i]["FieldValue"] = contextObj.fieldDateRequested["FieldValue"];
                    }
                    else if (contextObj.fieldDetailsAssign[i].ReportFieldId == 898) {//DateToComplete
                        contextObj.fieldDetailsAssign[i]["FieldValue"] = contextObj.fieldDateToComplete["FieldValue"];
                    }
                    if (contextObj.inputItems.rowData["To Floor"] != "") {
                        if (contextObj.fieldDetailsAssign[i].ReportFieldId == 523) {
                            contextObj.fieldDetailsAssign[i]["FieldValue"] = drawingId;
                            contextObj.fieldDetailsAssign[i]["IsEnabled"] = false;
                        }
                        if (contextObj.fieldDetailsAssign[i].ReportFieldId == 489) {
                            contextObj.fieldDetailsAssign[i]["IsEnabled"] = false;
                        }
                        if (contextObj.fieldDetailsAssign[i].ReportFieldId == 473) {
                            contextObj.fieldDetailsAssign[i]["IsEnabled"] = false;
                        }
                    }
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.showSlide = !this.showSlide;
        }
    }

    public deleteMoveProjectDetails() {
        var contextObj = this;
        if (this.inputItems.selectedIds[0] != null) {
            this.employeeService.deleteMoveProjectDetails(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"].StatusId > 0) {
                    let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [];
                    }
                    contextObj.notificationService.ShowToaster("Selected Employee is deleted from the Move Project", 3);
                }
                else {
                    contextObj.notificationService.ShowToaster("Delete failed", 5);
                }
            });
        }
    }

    public inlineDelete(event: any) {
        this.deleteMoveProjectDetails();
    }

    okDelete(event: Event) {
        this.deleteMoveProjectDetails();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    public showResourceClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select an Employee", 2);
        } else {
            this.splitviewInput.showSecondaryView = true;
        }
    }

    public assignLocation() {
        this.action = "assign";
        this.btnName = "Assign";
        this.pageTitle = "Assign Location";

        var contextObj = this;
        var isAssigned = 0;
        var drawingId = "";

        if (this.inputItems.selectedIds.length > 1)
        {
            for (var i = 0; i < this.inputItems.selectedIds.length; i++) {
                if (this.inputItems.rowData[i]["Move Status"] == "Assigned")
                    isAssigned = isAssigned + 1;
                if (i > 0)
                {
                    if (contextObj.inputItems.rowData[i]["ScheduledDrawingId"] != contextObj.inputItems.rowData[i - 1]["ScheduledDrawingId"])
                    {
                        contextObj.notificationService.ShowToaster("Only Employees scheduled to same floor can be assigned a location", 2);
                        return false;
                    }
                }
            }
            if (isAssigned > 0) {
                contextObj.notificationService.ShowToaster("One or more selected Employee(s) are already assigned or moved", 2);
                return false;
            }
            drawingId = contextObj.inputItems.rowData[0]["ScheduledDrawingId"];
        }

        else if (this.inputItems.selectedIds.length == 1)
        {
            if (this.inputItems.rowData["Move Status"] == "Assigned") {
                contextObj.notificationService.ShowToaster("Selected Employee is already assigned", 2);
                return false;
            }
            drawingId = contextObj.inputItems.rowData["ScheduledDrawingId"];
        }

        var fieldObj = new Array<ReportFieldArray>();

        fieldObj.push({
            FieldId: 221,
            ReportFieldId: 5090,
            Value: "0"
        });
        fieldObj.push({
            FieldId: 222,
            ReportFieldId: 5090,
            Value: "0"
        });
        fieldObj.push({
            FieldId: 223,
            ReportFieldId: 5090,
            Value: "0"
        });
        fieldObj.push({
            FieldId: 1569,
            ReportFieldId: 5090,
            Value: "0"
        });
        fieldObj.push({
            FieldId: 1569,
            ReportFieldId: 3059,
            Value: drawingId
        });

        this.employeeService.loadAssignLocation(fieldObj, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            contextObj.fieldDetailsAssign = resultData["Data"];
            for (let i = 0; i < contextObj.fieldDetailsAssign.length; i++) {
                    
                if (contextObj.fieldDetailsAssign[i].ReportFieldId == 3011) {
                    contextObj.fieldDetailsAssign[i]["IsVisible"] = false;
                }
                else if (contextObj.fieldDetailsAssign[i].ReportFieldId == 895) {
                    contextObj.fieldDetailsAssign[i]["FieldValue"] = contextObj.fieldProjectName["FieldValue"];
                }
                else if (contextObj.fieldDetailsAssign[i].ReportFieldId == 897) {
                    contextObj.fieldDetailsAssign[i]["FieldValue"] = contextObj.fieldDateRequested["FieldValue"];
                }
                else if (contextObj.fieldDetailsAssign[i].ReportFieldId == 898) {
                    contextObj.fieldDetailsAssign[i]["FieldValue"] = contextObj.fieldDateToComplete["FieldValue"];
                }
                if (contextObj.inputItems.rowData["To Floor"] != ""){
                    if (contextObj.fieldDetailsAssign[i].ReportFieldId == 523) {
                        contextObj.fieldDetailsAssign[i]["FieldValue"] = drawingId;
                        contextObj.fieldDetailsAssign[i]["IsEnabled"] = false;
                    }
                    if (contextObj.fieldDetailsAssign[i].ReportFieldId == 489) {
                        contextObj.fieldDetailsAssign[i]["IsEnabled"] = false;
                    }
                    if (contextObj.fieldDetailsAssign[i].ReportFieldId == 473) {
                        contextObj.fieldDetailsAssign[i]["IsEnabled"] = false;
                    }
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    OnSuccessfulSubmit(event: any) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "assign") {
                if (this.inputItems.selectedIds.length > 1) {
                    contextObj.getstackPlanDetailsList();
                }
                else {
                    retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                    this.itemsSource = retUpdatedSrc["itemSrc"];
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                //this.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        var fieldobj = new Array<ReportFieldArray1>();
       
        fieldobj.push({
            ReportFieldId: 885,
            Value: contextObj.projectId
        },
        {
            ReportFieldId: 884,
            Value: null
        })

        contextObj.employeeService.getStackPlanDetailsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray1>();

        fieldobj.push({
            ReportFieldId: 885,
            Value: contextObj.projectId
        },
        {
            ReportFieldId: 884,
            Value: null
        })
        contextObj.employeeService.getStackPlanDetailsListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = resultData["Data"]["RowsPerPage"];
        });
    }
}

export interface ReportFieldArray {
    FieldId: number;
    ReportFieldId: number;
    Value: string;
}


export interface ReportFieldArray1 {
    ReportFieldId: number;
    Value: string;
}