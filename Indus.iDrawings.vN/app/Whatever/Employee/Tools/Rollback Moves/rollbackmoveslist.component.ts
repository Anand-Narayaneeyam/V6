import {Component, ChangeDetectorRef, EventEmitter, Output, Input, KeyValueDiffers, ViewEncapsulation, ElementRef, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../../Framework/Whatever/Page/page.component';
import {SplitViewComponent} from '../../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid';
import {IField} from  '../../../../Framework/Models/Interface/IField';
import { SlideComponent} from '../../../../Framework/Whatever/Slide/slide.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { EmployeeService } from '../../../../models/employee/employee.services';
import { MoveHistory} from './movehistorylist.component';
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component';
import { GeneralFunctions} from '../../../../Models/Common/General';

@Component({
    selector: 'rollbackmoves',
    templateUrl: './app/Views/Employee/Tools/Rollback Moves/rollbackmoveslist.component.html',
    directives: [PageComponent, SplitViewComponent, Notification, GridComponent, PagingComponent, SubMenu, MoveHistory, SlideComponent, TabsComponent, TabComponent],
    providers: [NotificationService, EmployeeService, GeneralFunctions],
    encapsulation: ViewEncapsulation.None
})
export class RollbackMoves implements OnInit {
    inputItems: IGrid = { dataKey: "EmployeeId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol:"" };
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    fieldObject: IField[];
    itemsSource: any[];
    menuData = [];
    enableMenu = [1, 2];
    changedDay: number=1;
    totalDays: any[];
    selectedemployeeName: string = "";
    selectedMoveId: number;
    pageTitle: string = "";
    multipleRollbackFail: any;
    slidewidth = 450;
    position: string = "center";
    showSlideTable: boolean = false;
    refreshgrid: any;
    selectedTab = 0;
    selectedTabName = 'Recent Moves';
    pagePath="Employees / Rollback Moves"
    ngOnInit() {
        this.menuData = [{
            "id": 1,
            "title": "Roll back",
            "image": "Move Rollback",
            "path": "Move Rollback",
            "submenu": null,
        },
            {
                "id": 2,
                "title": "History",
                "image": "History",
                "path": "History",
                "submenu": null,
            }

        ];
        this.dataLoad();
    }
    constructor(private notificationService: NotificationService, private empServices: EmployeeService, private genFun: GeneralFunctions) {
        var contextObj = this;
        contextObj.totalDays = contextObj.createRange(30);
        debugger
        this.empServices.getRollbackMovesFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
        });
    }
    onSubMenuChange(event) {
        var contextObj = this;
        switch (event.value) {
            case 1: this.moveRollBack_OnClick();
                break;
            case 2: this.history_OnClick();
                break;
        }
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.dataLoad();
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    createRange(number) {
        var items: number[] = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }
    onChangeDays(value: number) {
        this.changedDay = +value;
        this.dataLoad();

    }

    dataLoad() {
        var contextObj = this;
        this.empServices.getEmployeeMovesForRollBack(this.changedDay, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result.DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                contextObj.itemsPerPage = result.RowsPerPage;
            } else {
                contextObj.notificationService.ShowToaster("No Moves exist for the selected days", 2);
                contextObj.enableMenu = [];
            }
        });
    }
    moveRollBack_OnClick() {
        var contextObj = this;
        var selectedIds = this.inputItems.selectedIds;
        var idsLength = selectedIds.length;
        var moveId;
        if (idsLength == 0) {
            this.notificationService.ShowToaster("Select an Employee", 2);
        } else if (idsLength > 1) {
            moveId = [];
            for (var item of this.inputItems.rowData) {
                moveId.push(item['MoveId'])
            }
            this.multiplEmployeeRollback(moveId);
        } else {
            moveId = this.inputItems.rowData['MoveId'];
            this.empServices.checkEmployeeRollbackPossible(moveId).subscribe(function (resultStatus) {
                switch (resultStatus) {
                    case 0: //var moveId = contextObj.itemsSource.find(function (el) { return el.EmployeeId == selectedIds[0] })['MoveId'];
                        contextObj.empServices.employeeMoveRollback(moveId, contextObj.changedDay, selectedIds[0]).subscribe(function (result) {                        
                        if (result.ServerId == 1) {
                            contextObj.changeGrid(result["Data"][0], selectedIds[0]);
                            contextObj.notificationService.ShowToaster("Employee move rolled back", 3);
                        }
                        else
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    });
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Employee move cannot be rolled back, selected employee is in Terminated status now", 5);
                        break;
                    case 2:
                        contextObj.notificationService.ShowToaster("Employee move cannot be rolled back, selected employee is in Resigned status now", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster(" Employee move cannot be rolled back, selected employee is in Retired status now", 5);
                        break;
                    case 4:
                        contextObj.notificationService.ShowToaster(" Employee move cannot be rolled back, selected employee is in Transferred status now", 5);
                        break;
                    case 5:
                        contextObj.notificationService.ShowToaster("Employee move cannot be rolled back, selected employee is de-assigned now", 5);
                        break;
                    case 6:
                        contextObj.notificationService.ShowToaster("Employee move cannot be rolled back, selected employee is scheduled for another move", 5);
                        break;
                    case 7:
                        contextObj.notificationService.ShowToaster("Employee move cannot be rolled back, selected employee is part of a move Request", 5);
                        break;
                    case 8:
                        contextObj.notificationService.ShowToaster("Selected Employee move cannot be rolled back, previous space is UnAssignable now", 5);
                        break;
                    case 9:
                        contextObj.notificationService.ShowToaster("Selected Employee move cannot be rolled back, previous space is a Scheduling Space now", 5);
                        break;
                    case 10:
                        contextObj.notificationService.ShowToaster("Selected Employee move cannot be rolled back, Seating Capacity of previous space is zero now", 5);
                        break;
                }
            });
        }

    }
    multiplEmployeeRollback(selectedMoveIds) {
        var contextObj = this;
        var moveId: number=0;
        var empName = "";
        var empId: number=0;
        var status = "0";
        var moveStatus = "";
        var isAllSuccess = true;
        var tbl = "<p>Following Employee Moves cannot be rolled back</p><table id='tblvalidation'>";
        var thead = "<tr><th>Employee Name</th><th>Status</th></tr>";
        var tbody = "";
        var moveCount = 0;
        this.mutipleRollback(contextObj, 0, selectedMoveIds, moveId, empName, empId, moveStatus, moveCount, tbody, isAllSuccess, function (moveStatus, moveCount, tbody1, isAllSuccess) {
        tbl += thead + tbody1 + "</table>";
        if (isAllSuccess) {
            contextObj.notificationService.ShowToaster("Employee move rolled back",3);
        } else {
            contextObj.multipleRollbackFail = tbl;
            contextObj.showSlideTable = true;
        }
        });
    }
    mutipleRollback = function (contextObj, count, selectedMoveIds, moveId, empName, empId, moveStatus, moveCount, tbody, isAllSuccess,resCllback) {

        if (selectedMoveIds.length > count) {
            moveId = selectedMoveIds[count]
            empName = this.itemsSource.find(function (el) { return el.MoveId == moveId })['Employee Name'];
            empId = this.itemsSource.find(function (el) { return el.MoveId == moveId })['EmployeeId'];
            this.empServices.checkEmployeeRollbackPossible(moveId).subscribe(function (resultStatus) {
                switch (resultStatus) {
                    case 0:
                        moveStatus = "Success";
                        contextObj.empServices.employeeMoveRollback(moveId, contextObj.changedDay, empId).subscribe(function (result) {
                            if (result.ServerId == 1) {
                                moveStatus = "Success";
                                moveCount++;
                                contextObj.changeGrid(result["Data"][0], empId);
                            }
                            else {
                                moveStatus = "Not Moved";
                                //   contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                            tbody += "<tr><td>" + "&nbsp;" + empName + "</td><td>" + "&nbsp;" + moveStatus + "</td></tr>";
                            if (moveStatus != "Success") {
                                isAllSuccess = false;
                            }
                            count++;
                            contextObj.mutipleRollback(contextObj, count, selectedMoveIds, moveId, empName, empId, moveStatus, moveCount, tbody, isAllSuccess, resCllback);
                        });

                        break;
                    case 1:
                        moveStatus = "Employee is in Terminated status now";

                        break;
                    case 2:
                        moveStatus = "Employee is in Resigned status now";
                        break;
                    case 3:
                        moveStatus = "Employee is in Retired status now";
                        break;
                    case 4:
                        moveStatus = "Employee is in Transferred status now";
                        break;
                    case 5:
                        moveStatus = "Employee is de-assigned now";
                        break;
                    case 6:
                        moveStatus = "Employee is scheduled for another move";
                        break;
                    case 7:
                        moveStatus = "Employee is part of a move Request";
                        break;
                    case 8:
                        moveStatus = "Previous space is UnAssignable now";
                        break;
                    case 9:
                        moveStatus = "Previous space is a Scheduling Space now";
                        break;
                    case 10:
                        moveStatus = "Seating Capacity of previous space is zero now";
                        break;
                    default:
                        break;
                }
                if (resultStatus != 0) {
                    tbody += "<tr><td>" + "&nbsp;" + empName + "</td><td>" + "&nbsp;" + moveStatus + "</td></tr>";
                    if (moveStatus != "Success") {
                        isAllSuccess = false;
                    }
                    count++;
                    contextObj.mutipleRollback(contextObj, count, selectedMoveIds, moveId, empName, empId, moveStatus, moveCount, tbody, isAllSuccess, resCllback);
                }
                
            });
        } else {
            resCllback(moveStatus, moveCount, tbody, isAllSuccess);
        }
    }
    changeGrid(data: any, empId: number) {
        var action: string = "";
        if (data == "[]") {
            action = "delete";
        } else {
            action = "edit";
        }
        this.refreshgrid = [];
        var event = { "returnData": data };
        var retUpdatedSrc = this.genFun.updateDataSource(this.itemsSource, action, event, [empId], this.inputItems.dataKey, this.totalItems);

        this.refreshgrid = this.refreshgrid.concat([true]);
        //var updatedData = JSON.parse(data);
        //if (updatedData.length==0) {
        //    var contextObj = this;
        //    function findEntity(entity) {
        //        return entity.MoveId === moveId;
        //    }
        //    contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
        //    var updatedList = new Array();/*To notify the watcher about the change*/
        //    updatedList = updatedList.concat(contextObj.itemsSource);
        //    contextObj.itemsSource = updatedList;
        //    contextObj.totalItems--;
        //} else {
        //    this.refreshgrid = [];
        //    updatedData = updatedData[0];
        //    var key = "EmployeeId";
        //    for (let i = 0; i < this.itemsSource.length; i++) {
        //        if (this.itemsSource[i][key] == updatedData[key]) {
        //            this.itemsSource[i] = updatedData;
        //            this.refreshgrid = this.refreshgrid.concat([true]);
        //        }
        //    }
        //}
       
    }
    closeSlideDialog() {
        this.showSlideTable = false;
    }
    history_OnClick() {
        var contextObj = this;
        var selectedIds = this.inputItems.selectedIds;
        var idsLength = selectedIds.length;
        if (idsLength == 0) {
            this.notificationService.ShowToaster("Select an Employee", 2);
        } else if (idsLength > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.selectedMoveId = this.inputItems.rowData['MoveId'];
            var previousMoveCount = this.inputItems.rowData['Previous Moves'];
            if (previousMoveCount > 0) {
                this.pageTitle = "History";
                this.selectedemployeeName = this.inputItems.rowData['Employee Name'];
                this.splitviewInput.showSecondaryView = true;

            } else {
                this.notificationService.ShowToaster("No Previous Moves exist for the selected Employee", 2);
            }
        }
    }
    
}