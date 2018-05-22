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
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var assignedemployeemainlist_1 = require('../data/assignedemployeemainlist');
var assignedemployeelist_1 = require('../data/assignedemployeelist');
var assignedemployee_addedit_1 = require('../data/assignedemployee-addedit');
var employeeResourceList_1 = require('../data/employeeResourceList');
var unassignedEmployeeList_1 = require('../data/unassignedEmployeeList');
var unassignedemployee_addedit_1 = require('../data/unassignedemployee-addedit');
var general_1 = require('../../../models/common/general');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var administration_service_1 = require('../../../models/administration/administration.service');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var common_service_1 = require('../../../models/common/common.service');
var multiple_edit_component_1 = require('../../../framework/whatever/multipleedit/multiple-edit.component');
var AssignedEmployeeComponent = (function () {
    function AssignedEmployeeComponent(cdr, employeeService, notificationService, generFun, administrationService, commonService) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.commonService = commonService;
        this.enableunassignedEmployeeMenu = [4];
        this.filterResourceChkbx = true; // resource
        this.showview = false;
        this.assignedEmployeeTotalItems = 0;
        this.enableassignedEmployeeMenu = [1, 8, 9];
        this.selectedDrawingId = [];
        this.splitviewAssignedEmployee = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.splitviewUnassignedEmployee = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.selectedTab = 0;
        this.blnIsGrid = true;
        this.unassignedEmployeeTotalItems = 0;
        this.unassignedEmployeeSelectedId = [-1];
        this.isUnassigned = false;
        this.moduleId = 5;
        this.showZoomOnClick = new core_1.EventEmitter();
        this.showInDrawingOnClick = new core_1.EventEmitter();
        this.assignSpaceOnClick = new core_1.EventEmitter();
        this.onEditSuccess = new core_1.EventEmitter();
        this.onDeleteEmployee = new core_1.EventEmitter();
        this.assignedSplitViewTarget = -1;
        this.unAssignedSplitViewTarget = -1;
        this.onDeletedAssignedEmployee = new core_1.EventEmitter();
        this.onSearchInDrawing = new core_1.EventEmitter();
        this.arrHighlightRowIds = [];
        this.multipleEditChange = false;
        this.userRoleId = 0;
        this.isScheduledMoves = undefined;
        this.isModuleAdmin = false;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Employee Code]', sortDir: 'ASC' };
        this.itemsPerPage = 0;
        this.checkAssignPossible = function (empData) {
            debugger;
            var contextObj = this;
            var employeeData;
            if (this.unassignedEmployeeSelectedId.length > 1)
                employeeData = empData;
            else if (this.unassignedEmployeeSelectedId.length == 1)
                employeeData = [empData];
            else {
                this.notificationService.ShowToaster("Select Employee(s)", 2);
                return false;
            }
            var empDataLength = employeeData.length;
            var empIds = [];
            for (var index = 0; index < empDataLength; index++) {
                var empDataitem = employeeData[index];
                empIds.push(empDataitem['Id']);
                var statusId = empDataitem['StatusId'];
                if (statusId == 15 || statusId == 45 || statusId == 46 || statusId == 47) {
                    if (empDataLength == 1)
                        this.notificationService.ShowToaster("Employee is not Active", 2);
                    else
                        this.notificationService.ShowToaster("Some of the selected Employee(s) are not Active", 2);
                    return;
                }
                //if (empDataitem['SpaceAllotId'] > 0 && empDataitem['AssignedSpaceId'] == null)
                //    this._notificationService.ShowToaster("One or more Employee is backed up for re-linking. Do you want to assign? ", 2);
                if (empDataitem['SpaceAllotId'] > 0) {
                    this.notificationService.ShowToaster("One or more Employee has already been assigned a Space", 2);
                    return;
                }
                //if (this.getEmployeeAssignRequestStatusforDtaPage(empDataitem['Id'])) {
                //    this.notificationService.ShowToaster("One or more Employee has already requested for Space assigning", 2);
                //    return false;
                //}
                if (empDataitem['Assigned?'] != "No") {
                    this.notificationService.ShowToaster("One or more Employee has already been assigned a Space", 2);
                    return;
                }
            }
            var assignRequestStatus;
            this.employeeService.getEmployeeAssignRequestStatus(empIds).subscribe(function (resultData) {
                assignRequestStatus = JSON.parse(resultData["Data"].FieldBinderData)[0].Column1;
                if (assignRequestStatus > 0) {
                    if (empIds.length == 1)
                        contextObj.notificationService.ShowToaster("Selected Employee has already requested for Space assigning", 2);
                    else
                        contextObj.notificationService.ShowToaster("One or more Employee has already requested for Space assigning", 2);
                }
                else {
                    contextObj.assignSpaceOnClick.emit({ "SelectedId": contextObj.unassignedEmployeeSelectedId, "RowData": contextObj.employeeData });
                }
            });
            //this.getEmployeeAssignRequestStatusforDtaPage(empIds, function (check) {
            //    if (check) {
            //        if (empIds.length == 1)
            //            contextObj.notificationService.ShowToaster("Selected Employee already requested for Space assigning", 2);
            //         else
            //            contextObj.notificationService.ShowToaster("One or more Employee has already requested for Space assigning", 2);
            //        return false;
            //    } else {
            //        return true;
            //    }
            //});
        };
        this.getEmployeeAssignRequestStatusforDtaPage = function (employeeIds, resCallback) {
            var assignRequestStatus;
            this.employeeService.getEmployeeAssignRequestStatus(employeeIds).subscribe(function (resultData) {
                assignRequestStatus = JSON.parse(resultData["Data"].FieldBinderData)[0].Column1;
                if (assignRequestStatus > 0)
                    resCallback(true);
                else
                    resCallback(false);
            });
        };
        var contextObj = this;
        this.cdr = cdr;
        this.employeeService.getIsModuleAdmin(5).subscribe(function (moduleAdminData) {
            contextObj.isModuleAdmin = moduleAdminData["Data"];
        });
        this.employeeService.getEmployeeMenu(2).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.assignedEmployeeMenu = resultData["assignedEmployeeMenu"];
                var callBack = function (data) {
                    var showView = false;
                    var showEdit = false;
                    var index = 0;
                    data.filter(function (el) {
                        if (el.title == "Edit") {
                            showEdit = true;
                        }
                        else if (el.title == "View Details") {
                            showView = true;
                        }
                        if (showEdit == true && showView == true) {
                            var keys = Object.keys(data);
                            var len = keys.length;
                            for (var i = 0; i < len; i++) {
                                if (data[i]["title"] == "View Details") {
                                    data.pop(data[i]);
                                    showView = false;
                                    showEdit = false;
                                    break;
                                }
                            }
                        }
                    });
                    contextObj.assignedEmployeeMenu = data;
                };
                contextObj.generFun.GetPrivilegesOfPage(contextObj.assignedEmployeeMenu, callBack, 304, contextObj.administrationService, contextObj.assignedEmployeeMenu.length);
            }
        });
        this.employeeService.getEmployeeMenu(2).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.unassignedEmployeeMenu = resultData["unassignedEmployeeMenu"];
                var callBack = function (data) {
                    var showView = false;
                    var showEdit = false;
                    var index = 0;
                    data.filter(function (el) {
                        if (el.title == "Edit") {
                            showEdit = true;
                        }
                        else if (el.title == "View Details") {
                            showView = true;
                        }
                        if (showEdit == true && showView == true) {
                            var keys = Object.keys(data);
                            var len = keys.length;
                            for (var i = 0; i < len; i++) {
                                if (data[i]["title"] == "View Details") {
                                    data.pop(data[i]);
                                    showView = false;
                                    showEdit = false;
                                    break;
                                }
                            }
                        }
                    });
                    contextObj.unassignedEmployeeMenu = data;
                };
                contextObj.generFun.GetPrivilegesOfPage(contextObj.unassignedEmployeeMenu, callBack, 304, contextObj.administrationService, contextObj.unassignedEmployeeMenu.length);
            }
        });
    }
    AssignedEmployeeComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        if (this.selectedTab == 0) {
            this.employeeService.getAssignedEmployeeColumnDataChanges().subscribe(function (resultData) {
                contextObj.fieldObject = resultData["Data"];
            });
            this.selectedDrawingId.push(+this.DrawingId);
        }
        if (contextObj.Targetforstyle != 1 && contextObj.Targetforstyle != 2)
            contextObj.pagetargetStyle = 3;
        else
            contextObj.pagetargetStyle = contextObj.Targetforstyle;
        contextObj.employeeService.getSessionData().subscribe(function (resultDataSession) {
            contextObj.userRoleId = resultDataSession.Data["UserRoleId"];
            if (contextObj.userRoleId <= 3 || (contextObj.userRoleId > 3 && contextObj.isModuleAdmin)) {
                contextObj.isScheduledMoves = true;
            }
        });
    };
    AssignedEmployeeComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.employeeService.getScheduledMoveRequestLists(0, this.inputItems.sortCol, this.inputItems.sortDir, this.DrawingId).subscribe(function (resultData) {
            // if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
            contextObj.movesitemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            //  }
        });
        //var sortedData = new Array();/*To notify the watcher about the change*/
        //sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        //this.itemsSource = sortedData;
    };
    AssignedEmployeeComponent.prototype.ngOnChanges = function (changes) {
        if (changes['IsAssignSpace'] && changes['IsAssignSpace']['currentValue']) {
            if (changes['IsAssignSpace']['currentValue'] == true) {
                if (this.selectedTab == 0)
                    this.assignedEmployeeAction = "employeeAssigned";
                else if (this.selectedTab == 1)
                    this.unassignedEmployeeAction = "employeeAssigned";
                this.cdr.detectChanges();
                this.unassignedEmployeeAction = "";
                this.assignedEmployeeAction = "";
            }
        }
        if (changes['IsDeassignEmp'] && changes['IsDeassignEmp']['currentValue']) {
            if (changes['IsDeassignEmp']['currentValue'] == true) {
                this.assignedEmployeeAction = "employeeDeAssigned";
                this.cdr.detectChanges();
                this.assignedEmployeeAction = "";
            }
        }
        if (changes['deAssignedEmpId'] && changes['deAssignedEmpId']['currentValue']) {
            if (changes['deAssignedEmpId']['currentValue'] > 0) {
                this.assignedEmployeeAction = "";
                this.assignedEmployeeAction = "employeeDeAssigned";
                this.cdr.detectChanges();
            }
        }
        if (changes["highlightRows"] && changes["highlightRows"]["currentValue"]) {
            this.arrHighlightRowIds = [];
            this.arrHighlightRowIds = this.arrHighlightRowIds.concat(this.highlightRows);
        }
    };
    AssignedEmployeeComponent.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        if (event[0] == 0) {
            this.filterResourceChkbx = true;
            if (this.assignedEmployeeTotalItems != 0)
                this.enableassignedEmployeeMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 15];
            else
                this.enableassignedEmployeeMenu = [];
            this.employeeService.getAssignedEmployeeColumnDataChanges().subscribe(function (resultData) {
                contextObj.fieldObject = resultData["Data"];
            });
            this.selectedDrawingId.push(+this.DrawingId);
            this.arrHighlightRowIds = [];
            this.arrHighlightRowIds = this.arrHighlightRowIds.concat(this.highlightRows);
        }
        else if (event[0] == 1) {
            this.filterResourceChkbx = false;
            if (this.unassignedEmployeeTotalItems != 0)
                this.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 11, 15];
            else
                this.enableunassignedEmployeeMenu = [];
            this.employeeService.getAssignedEmployeeColumnDataChanges().subscribe(function (resultData) {
                contextObj.fieldObject = resultData["Data"];
            });
        }
        else if (event[0] == 2 && event[1] == true) {
            this.employeeService.getScheduledMoveRequestFields().subscribe(function (resultData) {
                contextObj.movesfieldObject = resultData["Data"]; //edit enabling for file name
            });
            this.employeeService.getScheduledMoveRequestLists(0, this.inputItems.sortCol, this.inputItems.sortDir, this.DrawingId).subscribe(function (resultData) {
                if (resultData["Data"] == "[]") {
                    resultData["Data"] = null;
                }
                contextObj.movesitemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.movestotalItems = JSON.parse(resultData["Data"]["DataCount"]);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (contextObj.movesitemsSource.length == 0) {
                    contextObj.notificationService.ShowToaster("No Employees exist", 2);
                }
            });
        }
        this.splitviewAssignedEmployee.showSecondaryView = false;
        this.splitviewUnassignedEmployee.showSecondaryView = false;
        this.selectedTab = event[0];
    };
    AssignedEmployeeComponent.prototype.OnSuccessfulSubmit = function (event) {
        if (event["status"] == "success") {
            if ((event["returnData"]["Data"]) != "") {
                this.returnData = event["returnData"]["Data"];
                this.cdr.detectChanges();
                this.employeeData = JSON.parse(event["returnData"]["Data"])[0];
                if (this.selectedTab == 0 && this.assignedEmployeeAction == "edit")
                    this.onEditSuccess.emit(event);
                if (this.selectedTab == 0 && this.employeeData["StatusId"] != 1) {
                    this.deAssignedEmpId = this.employeeData["Id"];
                    this.assignedEmployeeAction = "employeeDeAssigned";
                    this.cdr.detectChanges();
                    this.assignedEmployeeAction = "";
                }
            }
            this.assignedEmployeeAction = "";
            this.unassignedEmployeeAction = "";
            this.assignedSplitViewTarget = -1;
            this.unAssignedSplitViewTarget = -1;
            this.splitviewAssignedEmployee.showSecondaryView = false;
            this.splitviewUnassignedEmployee.showSecondaryView = false;
        }
    };
    AssignedEmployeeComponent.prototype.onSubmenuChange = function (event) {
        this.showview = false;
        if (this.selectedTab == 0) {
            switch (event.value) {
                case 1:
                    this.editOnClick(this.splitviewAssignedEmployee);
                    //this.assignedSplitViewTarget = 1;
                    //this.assignedEmployeeAction = "edit";
                    //this.splitViewTitle = "Edit Employee";
                    //this.splitviewAssignedEmployee.showSecondaryView = true;
                    break;
                case 2:
                    if (this.assignedEmployeeSelectedId.length == 0)
                        this.notificationService.ShowToaster("Select an Employee", 2);
                    else if (this.assignedEmployeeSelectedId.length > 1)
                        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    else {
                        this.assignedEmployeeAction = "delete";
                        this.cdr.detectChanges();
                        this.assignedEmployeeAction = "";
                    }
                    break;
                case 3:
                    if (this.assignedEmployeeSelectedId.length == 0)
                        this.notificationService.ShowToaster("Select an Employee", 2);
                    else if (this.assignedEmployeeSelectedId.length > 1) {
                        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    }
                    else {
                        this.assignedSplitViewTarget = 2;
                        this.splitViewTitle = "Resources";
                        this.assignedEmployeeAction = "resource";
                        this.target = 2;
                        this.cdr.detectChanges();
                        this.splitviewAssignedEmployee.showSecondaryView = true;
                    }
                    break;
                case 6:
                    if (this.assignedEmployeeSelectedId.length == 0)
                        this.notificationService.ShowToaster("Select an Employee", 2);
                    else if (this.assignedEmployeeSelectedId.length > 1) {
                        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    }
                    else {
                        this.assignedSplitViewTarget = 3;
                        this.splitViewTitle = "Attachment";
                        this.assignedEmployeeAction = "attachment";
                        this.cdr.detectChanges();
                        this.splitviewAssignedEmployee.showSecondaryView = true;
                    }
                    break;
                case 7:
                    this.assignedSplitViewTarget = 4;
                    this.splitViewTitle = "Display Settings";
                    this.DisplaySettings(this.splitviewAssignedEmployee);
                    break;
                case 8:
                    this.showview = true;
                    this.editOnClick(this.splitviewAssignedEmployee);
                    break;
                case 9:
                    if (this.assignedEmployeeSelectedId.length == 0)
                        this.notificationService.ShowToaster("Select an Employee", 2);
                    else
                        this.showInDrawingOnClick.emit({ "SelectedId": this.assignedEmployeeSelectedId, "RowData": this.employeeData });
                    break;
                case 10:
                    if (this.assignedEmployeeSelectedId.length == 0)
                        this.notificationService.ShowToaster("Select an Employee", 2);
                    else if (this.assignedEmployeeSelectedId.length > 1)
                        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    else
                        this.showZoomOnClick.emit({ "SelectedId": this.assignedEmployeeSelectedId, "RowData": this.employeeData });
                    break;
                case 15:
                    this.Export(this.splitviewAssignedEmployee);
                    break;
            }
        }
        else if (this.selectedTab == 1) {
            //this.unAssignedSplitViewTarget = -1;
            switch (event.value) {
                case 0:
                    this.unAssignedSplitViewTarget = 1;
                    this.splitViewTitle = "New Employee";
                    this.splitviewUnassignedEmployee.showSecondaryView = true;
                    this.unassignedEmployeeAction = "add";
                    var unassingedEmployeeSelectedId = this.unAssignedEmployeeId;
                    if (unassingedEmployeeSelectedId)
                        if (unassingedEmployeeSelectedId.length == 0)
                            this.unAssignedEmployeeId = [-1];
                    //this.cdr.detectChanges();
                    break;
                case 1:
                    this.editOnClick(this.splitviewUnassignedEmployee);
                    // this.unAssignedSplitViewTarget = -1;
                    break;
                case 2:
                    if (this.unassignedEmployeeSelectedId.length == 1) {
                        this.unassignedEmployeeAction = "delete";
                        this.cdr.detectChanges();
                        this.unassignedEmployeeAction = "";
                    }
                    else {
                        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    }
                    break;
                case 3:
                    if (this.unassignedEmployeeSelectedId.length == 1) {
                        this.unAssignedSplitViewTarget = 3;
                        this.splitViewTitle = "Resources";
                        this.splitviewUnassignedEmployee.showSecondaryView = true;
                        this.unassignedEmployeeAction = "resource";
                        this.target = 3;
                        this.cdr.detectChanges();
                    }
                    else {
                        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    }
                    break;
                case 4:
                    var contextObj = this;
                    this.checkAssignPossible(this.employeeData);
                    break;
                case 6:
                    if (this.unassignedEmployeeSelectedId.length == 1) {
                        this.unAssignedSplitViewTarget = 4;
                        this.splitViewTitle = "Attachment";
                        this.splitviewUnassignedEmployee.showSecondaryView = true;
                        this.unassignedEmployeeAction = "attachment";
                        this.cdr.detectChanges();
                    }
                    else {
                        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    }
                    break;
                case 7:
                    this.unAssignedSplitViewTarget = 5;
                    this.splitViewTitle = "Display Settings";
                    this.DisplaySettings(this.splitviewUnassignedEmployee);
                    break;
                case 8:
                    this.showview = true;
                    this.editOnClick(this.splitviewUnassignedEmployee);
                    break;
                case 15:
                    this.Export(this.splitviewAssignedEmployee);
                    break;
            }
        }
    };
    AssignedEmployeeComponent.prototype.onDeleteAssignedEmployee = function (event) {
        this.onDeleteEmployee.emit(event);
    };
    AssignedEmployeeComponent.prototype.Export = function (SplitView) {
        switch (this.selectedTab) {
            case 0:
                var EmployeeSelectedId = this.assignedEmployeeSelectedId;
                if (EmployeeSelectedId.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    this.assignedEmployeeAction = "assignedemployeeexport";
                    this.cdr.detectChanges();
                    this.assignedEmployeeAction = "";
                }
                break;
            case 1:
                this.unassignedEmployeeAction = "unassignedemployeeexport";
                this.cdr.detectChanges();
                this.unassignedEmployeeAction = "";
                break;
        }
    };
    AssignedEmployeeComponent.prototype.editOnClick = function (splitView) {
        var contextObj = this;
        var employeeSelectedId = [];
        switch (contextObj.selectedTab) {
            case 0:
                employeeSelectedId = contextObj.assignedEmployeeSelectedId;
                this.assignedSplitViewTarget = 1;
                break;
            case 1:
                employeeSelectedId = contextObj.unassignedEmployeeSelectedId;
                this.unAssignedSplitViewTarget = 2;
                break;
        }
        if (employeeSelectedId.length == 0)
            this.notificationService.ShowToaster("Select an Employee", 2);
        else if (employeeSelectedId.length > 1) {
            if (!contextObj.showview) {
                if (contextObj.userRoleId <= 3 || (contextObj.userRoleId > 3 && contextObj.isModuleAdmin)) {
                    contextObj.onMultipleEditClick();
                    contextObj.assignedEmployeeAction = "";
                }
                else {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
            }
            else {
                contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
        }
        else {
            if (contextObj.showview == false) {
                contextObj.employeeService.checkEditPrivilageExist(employeeSelectedId[0]).subscribe(function (resultData) {
                    if (resultData["Data"].ServerId <= 0)
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected employee", 2);
                    else {
                        switch (contextObj.selectedTab) {
                            case 0:
                                contextObj.assignedEmployeeAction = "edit";
                                this.assignedSplitViewTarget = 1;
                                break;
                            case 1:
                                contextObj.unassignedEmployeeAction = "edit";
                                this.unAssignedSplitViewTarget = 2;
                                break;
                        }
                        contextObj.splitViewTitle = "Edit Employee";
                        splitView.showSecondaryView = true;
                    }
                });
            }
            else
                splitView.showSecondaryView = true;
        }
    };
    AssignedEmployeeComponent.prototype.updateAssignedEmployeeSelectedId = function (event) {
        this.assignedEmployeeSelectedId = event["assignedEmployeeId"];
        this.employeeData = event['RowData'];
        this.cdr.detectChanges();
    };
    AssignedEmployeeComponent.prototype.getUpdatedDisplaySettings = function (event) {
        if (event["dispSettingObject"] != undefined) {
            var contextObj = this;
            var SpaceDisplayFields = this.generFun.updateSpacePrefixInDisplaySettings(event["dispSettingObject"]);
            this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, SpaceDisplayFields);
            //this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, event["dispSettingObject"]);
            //setTimeout(function () {
            contextObj.splitviewAssignedEmployee.showSecondaryView = false;
            contextObj.splitviewUnassignedEmployee.showSecondaryView = false;
        }
    };
    AssignedEmployeeComponent.prototype.updateUnassignedEmployeeSelectedId = function (event) {
        this.unassignedEmployeeSelectedId = event["unassignedEmployeeId"];
        this.employeeData = event["RowData"];
        this.cdr.detectChanges();
    };
    AssignedEmployeeComponent.prototype.emitMenuItems = function (event) {
        var contextObj = this;
        if (event["TotalItems"] == 0) {
            switch (this.selectedTab) {
                case 0:
                    this.assignedEmployeeTotalItems = event["TotalItems"];
                    this.enableassignedEmployeeMenu = [];
                    break;
                case 1:
                    this.unassignedEmployeeTotalItems = event["TotalItems"];
                    this.enableunassignedEmployeeMenu = [0];
                    break;
            }
        }
        else {
            switch (this.selectedTab) {
                case 0:
                    this.assignedEmployeeTotalItems = event["TotalItems"];
                    this.employeeService.customerSubscribedFeatures("44").subscribe(function (customerSettingsData) {
                        if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                            contextObj.enableassignedEmployeeMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 15];
                        }
                        else {
                            contextObj.enableassignedEmployeeMenu = [1, 2, 4, 6, 7, 8, 9, 10, 11, 15];
                        }
                    });
                    //this.enableassignedEmployeeMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 15];
                    break;
                case 1:
                    this.unassignedEmployeeTotalItems = event["TotalItems"];
                    this.employeeService.customerSubscribedFeatures("44").subscribe(function (customerSettingsData) {
                        if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                            contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 11, 15];
                        }
                        else {
                            contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 11, 15];
                        }
                    });
                    this.employeeService.customerSubscribedFeatures("195").subscribe(function (customerSettingsData) {
                        if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                            contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 11, 15];
                        }
                        else {
                            contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 11, 15];
                        }
                    });
                    //this.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 11, 15];
                    break;
            }
        }
    };
    AssignedEmployeeComponent.prototype.attachmentSuccess = function (event) {
        console.log("attachment", event["status"]);
        this.employeeAttachmentSuccess = event;
    };
    AssignedEmployeeComponent.prototype.DisplaySettings = function (splitview) {
        this.splitViewTitle = "Display Settings";
        switch (this.selectedTab) {
            case 1:
                {
                    this.assignedEmployeeAction = "displaySettings";
                }
                break;
            case 2:
                {
                    this.unassignedEmployeeAction = "displaySettings";
                }
                break;
        }
        splitview.showSecondaryView = true;
    };
    AssignedEmployeeComponent.prototype.displaySettingassignedEmployee = function (event) {
        this.splitViewTitle = "Display Settings";
        if (event != "cancel") {
            //server call to update
            this.notificationService.ShowToaster("Field Order for Employee updated", 3);
        }
        this.splitviewAssignedEmployee.showSecondaryView = false;
    };
    AssignedEmployeeComponent.prototype.displaySettingunassignedEmployee = function (event) {
        this.splitViewTitle = "Display Settings";
        if (event != "cancel") {
            //server call to update
            this.notificationService.ShowToaster("Field Order for Employee updated", 3);
        }
        this.splitviewUnassignedEmployee.showSecondaryView = false;
    };
    AssignedEmployeeComponent.prototype.onSecondaryClose = function () {
        if (this.assignedSplitViewTarget == 5 || this.unAssignedSplitViewTarget == 6) {
            this.multipleEditChange = !this.multipleEditChange;
        }
        this.assignedSplitViewTarget = -1;
        this.unAssignedSplitViewTarget = -1;
        var context = this;
        this.assignedEmployeeAction = "";
        this.unassignedEmployeeAction = "";
        var fieldResourceCount = context.fieldObject.find(function (item) {
            return item.FieldLabel === "Resource Count";
        });
        if (fieldResourceCount.IsVisible) {
            switch (this.selectedTab) {
                case 0:
                    this.assignedEmployeeId = this.returnEmployeeId;
                    this.assignedEmpResourceCount = this.returnEmployeeResourceCount;
                    break;
                case 1:
                    this.unAssignedEmployeeId = this.returnEmployeeId;
                    this.unAssignedEmpResourceCount = this.returnEmployeeResourceCount;
                    break;
            }
        }
        this.cdr.detectChanges();
    };
    AssignedEmployeeComponent.prototype.onSearchEmployeeInDrawing = function (data) {
        this.onSearchInDrawing.emit(data);
    };
    //onUpdateResourceCount(event: any) {
    //    switch (this.selectedTab) {
    //        case 0:
    //            this.assignedEmployeeId = event.employeeId;
    //            this.assignedEmpResourceCount = event.resourceCount;
    //            break
    //        case 1:
    //            this.unAssignedEmployeeId = event.employeeId;
    //            this.unAssignedEmpResourceCount = event.resourceCount;
    //            break;
    //    }
    //    this.cdr.detectChanges();
    //}
    AssignedEmployeeComponent.prototype.onUpdateResourceCount = function (event) {
        this.returnEmployeeId = event.employeeId;
        this.returnEmployeeResourceCount = event.resourceCount;
    };
    AssignedEmployeeComponent.prototype.onMultipleEditClick = function () {
        var contextObj = this;
        contextObj.commonService.getFieldsForMultipleEdit(contextObj.employeeService.allemployeeAddEditFormId).subscribe(function (resultData) {
            contextObj.multipleEditFieldDetails = JSON.parse(resultData);
            contextObj.splitViewTitle = "Multiple Update";
            switch (contextObj.selectedTab) {
                case 0:
                    contextObj.assignedSplitViewTarget = 5;
                    contextObj.splitviewAssignedEmployee.showSecondaryView = !contextObj.splitviewAssignedEmployee.showSecondaryView;
                    break;
                case 1:
                    contextObj.unAssignedSplitViewTarget = 6;
                    contextObj.splitviewUnassignedEmployee.showSecondaryView = !contextObj.splitviewUnassignedEmployee.showSecondaryView;
                    break;
            }
        });
    };
    AssignedEmployeeComponent.prototype.onMultipleEditUpdate = function (event) {
        var contextObj = this;
        var EmployeeSelectedId;
        switch (contextObj.selectedTab) {
            case 0:
                EmployeeSelectedId = contextObj.assignedEmployeeSelectedId;
                break;
            case 1:
                EmployeeSelectedId = contextObj.unassignedEmployeeSelectedId;
                break;
        }
        for (var _i = 0, EmployeeSelectedId_1 = EmployeeSelectedId; _i < EmployeeSelectedId_1.length; _i++) {
            var item = EmployeeSelectedId_1[_i];
            event.ReportFieldIdValuesArray.push({ ReportFieldId: 866, Value: item });
        }
        contextObj.employeeService.updateMultipleEmployeeData(JSON.stringify(event.ReportFieldIdValuesArray), event.ReportFieldId, event.NewValue, event.OrgUnitId).subscribe(function (resultData) {
            debugger;
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Employee details updated", 2);
                    break;
                default:
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssignedEmployeeComponent.prototype, "UpdateDrawingGridMoveEmployee", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AssignedEmployeeComponent.prototype, "EmployeMoveGridDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AssignedEmployeeComponent.prototype, "DrawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AssignedEmployeeComponent.prototype, "IsAssignSpace", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AssignedEmployeeComponent.prototype, "IsDeassignEmp", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AssignedEmployeeComponent.prototype, "deAssignedEmpId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AssignedEmployeeComponent.prototype, "highlightRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AssignedEmployeeComponent.prototype, "Targetforstyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AssignedEmployeeComponent.prototype, "assignedEmpIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AssignedEmployeeComponent.prototype, "assignedEmpsData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignedEmployeeComponent.prototype, "showZoomOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignedEmployeeComponent.prototype, "showInDrawingOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignedEmployeeComponent.prototype, "assignSpaceOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignedEmployeeComponent.prototype, "onEditSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignedEmployeeComponent.prototype, "onDeleteEmployee", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignedEmployeeComponent.prototype, "onDeletedAssignedEmployee", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssignedEmployeeComponent.prototype, "onSearchInDrawing", void 0);
    AssignedEmployeeComponent = __decorate([
        core_1.Component({
            selector: 'assigned-emp-data',
            templateUrl: './app/Views/Employee/Drawings/employeelistindrawing.component.html',
            directives: [unassignedEmployeeList_1.UnassignedEmployeeListComponent, unassignedemployee_addedit_1.UnassignedEmployeeAddEditComponent, assignedemployee_addedit_1.AssignedEmployeeAddEditComponent, assignedemployeelist_1.AssignedEmployeeListComponent, assignedemployeemainlist_1.AssignedMainListComponent, split_view_component_1.SplitViewComponent,
                page_component_1.PageComponent, submenu_component_1.SubMenu, displaysettings_component_1.DisplaySettingsComponent, attachments_component_1.AttachmentsComponent, employeeResourceList_1.EmployeeResourceListComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, notify_component_1.Notification, grid_component_1.GridComponent, multiple_edit_component_1.MultipleEdit],
            providers: [notify_service_1.NotificationService, employee_services_1.EmployeeService, general_1.GeneralFunctions, administration_service_1.AdministrationService, exporttoexcel_service_1.ExportToExcel, common_service_1.CommonService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, employee_services_1.EmployeeService, notify_service_1.NotificationService, general_1.GeneralFunctions, administration_service_1.AdministrationService, common_service_1.CommonService])
    ], AssignedEmployeeComponent);
    return AssignedEmployeeComponent;
}());
exports.AssignedEmployeeComponent = AssignedEmployeeComponent;
//# sourceMappingURL=employeelistindrawing.component.js.map