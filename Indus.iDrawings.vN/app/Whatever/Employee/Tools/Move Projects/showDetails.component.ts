import {Component, ChangeDetectorRef, SimpleChange, Output, KeyValueDiffers, EventEmitter, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import {EmployeeService} from '../../../../Models/Employee/employee.services';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid'
import {IField} from '../../../../Framework/Models//Interface/IField'
import {SubMenu} from '../../../../Framework/Whatever/Submenu/submenu.component';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';


@Component({
    selector: 'show-details',
    templateUrl: './app/Views/Employee/Tools/Move Projects/showDetails.component.html',
    directives: [GridComponent, PagingComponent, SubMenu, Notification],
    providers: [NotificationService, EmployeeService],
    inputs: ['projectId', 'MoveProjectStatus']
})

export class ShowDetailsComponent {

    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    itemsSource: any[];
    pageIndex: number = 0;
    projectId: number;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '[Id]', selectioMode: "single" };
    fieldObject: IField[];
    MoveProjectStatus: string;

    blnPlanned: boolean = false;
    blnMoved: boolean = false;
    blnAssigned: boolean = false;
    blnDeleted: boolean = false;
    blnAssignedSpaceIdNull: boolean = false;

    showDetailsMenu: any;
    showDetailsMenuTotalItems: number = 8;
    enableshowDetailsMenu: any[];


    constructor(private employeeService: EmployeeService, private _notificationService: NotificationService) {
        
    }
    updateshowDetailsMenu(event: any) {
        var contextObj = this;
        if (this.validation(event.value)) {
            if (event.value == 1) {
                //var value = "";
                var fieldobj = new Array<ReportFieldArray>();
                fieldobj.push({ ReportFieldId: 885, Value: this.projectId.toString() })
                for (let i = 0; i < this.inputItems.selectedIds.length; i++) {
                    // value = value + this.inputItems.selectedIds[i] + ",";
                    fieldobj.push({ ReportFieldId: 884, Value: this.inputItems.selectedIds[i] })
                }
                //value = value.substring(0, value.length - 1);
                // fieldobj.push({ ReportFieldId: 884, Value: value })
                this.employeeService.executeEmployee(fieldobj, this.inputItems.selectedIds).subscribe(function (resultData) {
                    if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"])
                        if (contextObj.inputItems.selectedIds.length == 1)
                            contextObj._notificationService.ShowToaster("Selected Employee is moved", 3)
                        else
                            contextObj._notificationService.ShowToaster("Selected Employees are moved", 3)
                    }
                    else if (resultData["Data"]["StatusId"] == 3)
                        if (contextObj.inputItems.selectedIds.length == 1)
                            contextObj._notificationService.ShowToaster("Scenario is already created for the selected Employee", 2);
                        else
                            contextObj._notificationService.ShowToaster("Scenario is already created for some of the selected Employees", 2);
                });
            }
            else if (event.value == 2) {
                var fieldobj = new Array<ReportFieldArray>();
                fieldobj.push({ ReportFieldId: 885, Value: this.projectId.toString() })
                for (let i = 0; i < this.itemsSource.length; i++) {
                    // value = value + this.inputItems.selectedIds[i] + ",";
                    fieldobj.push({ ReportFieldId: 884, Value: this.itemsSource[i].Id })
                }
                //value = value.substring(0, value.length - 1);
                // fieldobj.push({ ReportFieldId: 884, Value: value })
                this.employeeService.executeEmployee(fieldobj, this.inputItems.selectedIds).subscribe(function (resultData) {
                    if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["Data"])
                        if (contextObj.itemsSource.length == 1)
                            contextObj._notificationService.ShowToaster("Selected Employee is moved", 3)
                        else
                            contextObj._notificationService.ShowToaster("Selected Employees are moved", 3)
                    }
                    else if (resultData["Data"]["StatusId"] == 3)
                        if (contextObj.inputItems.selectedIds.length == 1)
                            contextObj._notificationService.ShowToaster("Scenario is already created for the selected Employee", 2);
                        else
                            contextObj._notificationService.ShowToaster("Scenario is already created for some of the selected Employees", 2);
                });
            }
        }
    }
    validation(menu) {
        var selection;
        var status = true;
        switch (menu) {
            case 1://execute
                if (this.inputItems.selectedIds.length > 0) {
                    this.setStatusOfSelectedRow(this.inputItems.rowData.MoveProjectDetailsStatusId);
                }
                break;
            case 2:
                selection = this.itemsSource.length;
                break;
        }
        for (let i = 0; i < selection; i++) {
         
            var moveprojectdetailStatusId = this.itemsSource[i].MoveProjectDetailsStatusId;
            this.setStatusOfSelectedRow(moveprojectdetailStatusId);
            var assignedSpaceId = this.itemsSource[i].AssignedSpaceId;
           
            if (assignedSpaceId == null)
                this.blnAssigned = true;
        }
        if (this.blnDeleted == true) {
            if (selection > 1)
                this._notificationService.ShowToaster("One or more selected employee(s) are deleted from the selected Move Project", 2)
            else if (selection == 1)
                this._notificationService.ShowToaster("Selected Employee is deleted from the selected Move Project", 2)
            status = false;
        }
        else if ((this.blnAssigned == false || this.blnPlanned == true) && this.blnMoved == false) {
            if (selection > 1)
                this._notificationService.ShowToaster("Some of the Employees are not assigned a Space", 2)
            else if (selection == 1)
                this._notificationService.ShowToaster("Selected Employee is not  assigned a Space", 2)
            status = false;
        }
        else if (this.blnMoved == true) {
            if (selection > 1)
                this._notificationService.ShowToaster("Some of the Employees are already moved", 2)
            else if (selection == 1)
                this._notificationService.ShowToaster("Selected Employee is already moved", 2)
            status = false;
        }
        //blnAssignedSpaceIdNull condition not written as its dealt with blnAssigned
        else
            status = true;
        return status;    

    }
    setStatusOfSelectedRow(moveprojectdetailStatusId) {
        switch (moveprojectdetailStatusId) {
            case 9:
                this.blnAssigned = true;
                break;
            case 12:
                this.blnPlanned = true;
                break;
            case 13:
                this.blnMoved = true;
                break;
            case 4:
                this.blnDeleted = true;
                break;
        }
    }
    pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.loadData();
    }
    onSort(event: any) {
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.loadData();
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["projectId"] && changes["projectId"] && changes["projectId"]["currentValue"] != changes["projectId"]["previousValue"])
            this.loadData();
    }
    loadData() {
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 885,
            Value: this.projectId.toString()
        }, {
                ReportFieldId: 884,
                Value: null
            })
        var contextObj = this;
        this.employeeService.getShowDetailsReadOnlyData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, fieldobj).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            //for (let i = 0; i < contextObj.itemsSource.length; i++) {
            //    if (contextObj.itemsSource[i].StatusId == 30)
            //        contextObj.itemsSource[i].Status = "Approved";
            //}
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableshowDetailsMenu = [];
                contextObj.itemsSource = null;
                contextObj._notificationService.ShowToaster("No Employee Move Details added to this Move Project", 2);
            }
            else {
                if (contextObj.MoveProjectStatus == "Approved")
                    contextObj.enableshowDetailsMenu = [0, 1];
                else
                    contextObj.enableshowDetailsMenu = [0];
            }

            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        })
    }
    ngOnInit() {
        var contextObj = this;
        if (contextObj.MoveProjectStatus == "Work Order Generated") {
            this.showDetailsMenu = [];
        } else {
            this.showDetailsMenu = [
                //    {
                //    "id": 0,
                //    "title": "Show Resources",
                //    "image": "",
                //    "path": "",
                //    "submenu": null
                //},
                {
                    "id": 1,
                    "title": "Execute",
                    "image": "Execute",
                    "path": "Execute",
                    "submenu": null
                }
                //,{
                //    "id": 2,
                //    "title": "Execute All",
                //    "image": "Execute All",
                //    "path": "Execute All",
                //    "submenu": null
                //}
            ];
        }
        this.employeeService.getShowDetailsReadOnlyField().subscribe(function (resultData) {
            var filtereddata = resultData["Data"].filter(function (item) { return (item.FieldId != 2997) }); 
            filtereddata = filtereddata.filter(function (item) { return (item.FieldId != 2998) }); 
            contextObj.fieldObject = filtereddata;
        })
        //this.loadData();
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}