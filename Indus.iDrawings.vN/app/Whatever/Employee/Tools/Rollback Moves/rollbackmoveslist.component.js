var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var split_view_component_1 = require('../../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../../Framework/Whatever/Paging/paging.component');
var slide_component_1 = require('../../../../Framework/Whatever/Slide/slide.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var employee_services_1 = require('../../../../models/employee/employee.services');
var movehistorylist_component_1 = require('./movehistorylist.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var General_1 = require('../../../../Models/Common/General');
var RollbackMoves = (function () {
    function RollbackMoves(notificationService, empServices, genFun) {
        this.notificationService = notificationService;
        this.empServices = empServices;
        this.genFun = genFun;
        this.inputItems = { dataKey: "EmployeeId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.menuData = [];
        this.enableMenu = [1, 2];
        this.changedDay = 1;
        this.selectedemployeeName = "";
        this.pageTitle = "";
        this.slidewidth = 450;
        this.position = "center";
        this.showSlideTable = false;
        this.selectedTab = 0;
        this.selectedTabName = 'Recent Moves';
        this.pagePath = "Employees / Rollback Moves";
        this.mutipleRollback = function (contextObj, count, selectedMoveIds, moveId, empName, empId, moveStatus, moveCount, tbody, isAllSuccess, resCllback) {
            if (selectedMoveIds.length > count) {
                moveId = selectedMoveIds[count];
                empName = this.itemsSource.find(function (el) { return el.MoveId == moveId; })['Employee Name'];
                empId = this.itemsSource.find(function (el) { return el.MoveId == moveId; })['EmployeeId'];
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
            }
            else {
                resCllback(moveStatus, moveCount, tbody, isAllSuccess);
            }
        };
        var contextObj = this;
        contextObj.totalDays = contextObj.createRange(30);
        debugger;
        this.empServices.getRollbackMovesFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
        });
    }
    RollbackMoves.prototype.ngOnInit = function () {
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
    };
    RollbackMoves.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                this.moveRollBack_OnClick();
                break;
            case 2:
                this.history_OnClick();
                break;
        }
    };
    RollbackMoves.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad();
    };
    RollbackMoves.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    ;
    RollbackMoves.prototype.createRange = function (number) {
        var items = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    };
    RollbackMoves.prototype.onChangeDays = function (value) {
        this.changedDay = +value;
        this.dataLoad();
    };
    RollbackMoves.prototype.dataLoad = function () {
        var contextObj = this;
        this.empServices.getEmployeeMovesForRollBack(this.changedDay, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result.DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                contextObj.itemsPerPage = result.RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Moves exist for the selected days", 2);
                contextObj.enableMenu = [];
            }
        });
    };
    RollbackMoves.prototype.moveRollBack_OnClick = function () {
        var contextObj = this;
        var selectedIds = this.inputItems.selectedIds;
        var idsLength = selectedIds.length;
        var moveId;
        if (idsLength == 0) {
            this.notificationService.ShowToaster("Select an Employee", 2);
        }
        else if (idsLength > 1) {
            moveId = [];
            for (var _i = 0, _a = this.inputItems.rowData; _i < _a.length; _i++) {
                var item = _a[_i];
                moveId.push(item['MoveId']);
            }
            this.multiplEmployeeRollback(moveId);
        }
        else {
            moveId = this.inputItems.rowData['MoveId'];
            this.empServices.checkEmployeeRollbackPossible(moveId).subscribe(function (resultStatus) {
                switch (resultStatus) {
                    case 0:
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
    };
    RollbackMoves.prototype.multiplEmployeeRollback = function (selectedMoveIds) {
        var contextObj = this;
        var moveId = 0;
        var empName = "";
        var empId = 0;
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
                contextObj.notificationService.ShowToaster("Employee move rolled back", 3);
            }
            else {
                contextObj.multipleRollbackFail = tbl;
                contextObj.showSlideTable = true;
            }
        });
    };
    RollbackMoves.prototype.changeGrid = function (data, empId) {
        var action = "";
        if (data == "[]") {
            action = "delete";
        }
        else {
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
    };
    RollbackMoves.prototype.closeSlideDialog = function () {
        this.showSlideTable = false;
    };
    RollbackMoves.prototype.history_OnClick = function () {
        var contextObj = this;
        var selectedIds = this.inputItems.selectedIds;
        var idsLength = selectedIds.length;
        if (idsLength == 0) {
            this.notificationService.ShowToaster("Select an Employee", 2);
        }
        else if (idsLength > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.selectedMoveId = this.inputItems.rowData['MoveId'];
            var previousMoveCount = this.inputItems.rowData['Previous Moves'];
            if (previousMoveCount > 0) {
                this.pageTitle = "History";
                this.selectedemployeeName = this.inputItems.rowData['Employee Name'];
                this.splitviewInput.showSecondaryView = true;
            }
            else {
                this.notificationService.ShowToaster("No Previous Moves exist for the selected Employee", 2);
            }
        }
    };
    RollbackMoves = __decorate([
        core_1.Component({
            selector: 'rollbackmoves',
            templateUrl: './app/Views/Employee/Tools/Rollback Moves/rollbackmoveslist.component.html',
            directives: [page_component_1.PageComponent, split_view_component_1.SplitViewComponent, notify_component_1.Notification, grid_component_1.GridComponent, paging_component_1.PagingComponent, submenu_component_1.SubMenu, movehistorylist_component_1.MoveHistory, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent],
            providers: [notify_service_1.NotificationService, employee_services_1.EmployeeService, General_1.GeneralFunctions],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, employee_services_1.EmployeeService, General_1.GeneralFunctions])
    ], RollbackMoves);
    return RollbackMoves;
}());
exports.RollbackMoves = RollbackMoves;
//# sourceMappingURL=rollbackmoveslist.component.js.map