import {Component, ChangeDetectorRef, Output, Input, SimpleChange, OnChanges, OnInit, EventEmitter, ViewEncapsulation} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'
import {IField} from '../../../Framework/Models/Interface/Ifield'
import {AttachmentsComponent} from '../../Common/Attachments/attachments.component';
import {EmployeeService} from '../../../Models/Employee/employee.services'
import {AssignedMainListComponent} from '../data/assignedemployeemainlist';
import {AssignedEmployeeListComponent} from '../data/assignedemployeelist';
import {AssignedEmployeeAddEditComponent} from '../data/assignedemployee-addedit';
import {EmployeeResourceListComponent} from '../data/employeeResourceList';
import {UnassignedEmployeeListComponent} from '../data/unassignedEmployeeList'
import {UnassignedEmployeeAddEditComponent} from '../data/unassignedemployee-addedit'
import {GeneralFunctions} from '../../../models/common/general';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {AdministrationService} from '../../../models/administration/administration.service'
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { CommonService } from '../../../models/common/common.service';
import { MultipleEdit, IMultipleSubmitOutput } from '../../../framework/whatever/multipleedit/multiple-edit.component';


@Component({
    selector: 'assigned-emp-data',
    templateUrl: './app/Views/Employee/Drawings/employeelistindrawing.component.html',
    directives: [UnassignedEmployeeListComponent, UnassignedEmployeeAddEditComponent, AssignedEmployeeAddEditComponent, AssignedEmployeeListComponent, AssignedMainListComponent, SplitViewComponent,
        PageComponent, SubMenu, DisplaySettingsComponent, AttachmentsComponent, EmployeeResourceListComponent, TabsComponent, TabComponent, Notification, GridComponent, MultipleEdit],
    providers: [NotificationService, EmployeeService, GeneralFunctions, AdministrationService, ExportToExcel, CommonService],
    encapsulation: ViewEncapsulation.None
})

export class AssignedEmployeeComponent implements OnInit, OnChanges {
    @Input() UpdateDrawingGridMoveEmployee:any;
    @Input() EmployeMoveGridDetails: number;
    @Input() DrawingId: number;
    @Input() IsAssignSpace: boolean;
    @Input() IsDeassignEmp: boolean;
    @Input() deAssignedEmpId: number;
    @Input() highlightRows: any[];
    @Input() Targetforstyle;
    @Input() assignedEmpIds: number[];
    @Input() assignedEmpsData: any[];
    fieldObject: IField[];
    fieldObject1: IField[];
    dataKey: string[];
    cdr: any;
    returnData: any;
    enableunassignedEmployeeMenu = [4];
    employeeAttachmentSuccess: any;
    filterResourceChkbx: boolean = true; // resource
    splitViewTitle: string;
    assignedEmployeeMenu: any;
    unassignedEmployeeMenu: any;
    employeeData: any;
    showview: boolean = false;
    assignedEmployeeTotalItems: number = 0;
    enableassignedEmployeeMenu = [1, 8, 9];
    selectedDrawingId: number[] = [];
    splitviewAssignedEmployee = { showSecondaryView: false, showButton: false, secondaryArea: 30 }
    splitviewUnassignedEmployee: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 }
    assignedEmployeeAction: string;
    unassignedEmployeeAction: string;
    assignedEmployeeSelectedId: number[];
    target: any;
    selectedTab: number = 0;
    blnIsGrid: boolean = true;
    unassignedEmployeeTotalItems: number = 0;
    unassignedEmployeeSelectedId: number[] = [-1];
    isUnassigned: boolean = false;
    moduleId: any = 5;
    @Output() showZoomOnClick = new EventEmitter();
    @Output() showInDrawingOnClick = new EventEmitter();
    @Output() assignSpaceOnClick = new EventEmitter();
    @Output() onEditSuccess = new EventEmitter();
    @Output() onDeleteEmployee = new EventEmitter();
    assignedSplitViewTarget: number = -1;
    unAssignedSplitViewTarget: number = -1;
    loadTarget: number;
    returnEmployeeId: any;
    returnEmployeeResourceCount: any;
    assignedEmployeeId: any;
    assignedEmpResourceCount: any;
    unAssignedEmployeeId: any;
    unAssignedEmpResourceCount: any;
    @Output() onDeletedAssignedEmployee = new EventEmitter();
    @Output() onSearchInDrawing = new EventEmitter();
    arrHighlightRowIds = [];
    movesitemsSource: any;
    movesfieldObject: IField;
    movestotalItems: any;
    pagetargetStyle: any;
    multipleEditChange: boolean = false;
    userRoleId: number = 0;
    isScheduledMoves = undefined;
    isModuleAdmin: boolean = false;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Employee Code]', sortDir: 'ASC' };
    public itemsPerPage: number = 0;
    multipleEditFieldDetails: any;
    constructor(cdr: ChangeDetectorRef, private employeeService: EmployeeService, private notificationService: NotificationService, private generFun: GeneralFunctions, private administrationService: AdministrationService, private commonService: CommonService) {
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
    ngOnInit() {
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

    }

    public onSort(objGrid: any) {
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


    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
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
               // this.assignedEmployeeAction = "";

            }

        }
        if (changes["highlightRows"] && changes["highlightRows"]["currentValue"]) {
            this.arrHighlightRowIds = [];
            this.arrHighlightRowIds = this.arrHighlightRowIds.concat(this.highlightRows);
        }
    }
    getSelectedTab(event: any) {

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
                contextObj.movesfieldObject = resultData["Data"];//edit enabling for file name

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
    }
    OnSuccessfulSubmit(event: any) {
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
            this.assignedEmployeeAction = ""
            this.unassignedEmployeeAction = "";
            this.assignedSplitViewTarget = -1;
            this.unAssignedSplitViewTarget = -1;
            this.splitviewAssignedEmployee.showSecondaryView = false;
            this.splitviewUnassignedEmployee.showSecondaryView = false;
        }
    }
    onSubmenuChange(event: any) {
        this.showview = false;
        if (this.selectedTab == 0) {
            switch (event.value) {
                case 1: this.editOnClick(this.splitviewAssignedEmployee);
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
                    } else {
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
                    } else {
                        this.assignedSplitViewTarget = 3;
                        this.splitViewTitle = "Attachment";
                        this.assignedEmployeeAction = "attachment";
                        this.cdr.detectChanges();
                        this.splitviewAssignedEmployee.showSecondaryView = true;
                    }
                    break;
                case 7: this.assignedSplitViewTarget = 4;
                    this.splitViewTitle = "Display Settings";
                    this.DisplaySettings(this.splitviewAssignedEmployee);
                    break;
                case 8: this.showview = true;
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
        } else if (this.selectedTab == 1) {
            //this.unAssignedSplitViewTarget = -1;
            switch (event.value) {
                case 0: this.unAssignedSplitViewTarget = 1;
                    this.splitViewTitle = "New Employee";
                    this.splitviewUnassignedEmployee.showSecondaryView = true;
                    this.unassignedEmployeeAction = "add";
                    var unassingedEmployeeSelectedId = this.unAssignedEmployeeId;
                    if (unassingedEmployeeSelectedId)
                        if (unassingedEmployeeSelectedId.length == 0)
                            this.unAssignedEmployeeId = [-1]
                    //this.cdr.detectChanges();
                    break;
                case 1: this.editOnClick(this.splitviewUnassignedEmployee);
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
                    } else {
                        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    }
                    break;
                case 4: var contextObj = this;
                    this.checkAssignPossible(this.employeeData);
                    break;
                case 6:
                    if (this.unassignedEmployeeSelectedId.length == 1) {
                        this.unAssignedSplitViewTarget = 4;
                        this.splitViewTitle = "Attachment";
                        this.splitviewUnassignedEmployee.showSecondaryView = true;
                        this.unassignedEmployeeAction = "attachment";
                        this.cdr.detectChanges();
                    } else {
                        this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    }
                    break;
                case 7: this.unAssignedSplitViewTarget = 5;
                    this.splitViewTitle = "Display Settings";
                    this.DisplaySettings(this.splitviewUnassignedEmployee);
                    break;
                case 8: this.showview = true;
                    this.editOnClick(this.splitviewUnassignedEmployee);
                    break;
                case 15:
                    this.Export(this.splitviewAssignedEmployee);
                    break;
            }
        }
    }
    onDeleteAssignedEmployee(event) {
        this.onDeleteEmployee.emit(event);
    }
    checkAssignPossible = function (empData) {
        debugger
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
        var empIds: number[] = [];
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
        var assignRequestStatus: number;
        this.employeeService.getEmployeeAssignRequestStatus(empIds).subscribe(function (resultData) {
            assignRequestStatus = JSON.parse(resultData["Data"].FieldBinderData)[0].Column1;
            if (assignRequestStatus > 0) {
                if (empIds.length == 1)
                    contextObj.notificationService.ShowToaster("Selected Employee has already requested for Space assigning", 2);
                else
                    contextObj.notificationService.ShowToaster("One or more Employee has already requested for Space assigning", 2);
            } else {
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
    }

    getEmployeeAssignRequestStatusforDtaPage = function (employeeIds, resCallback) {
        var assignRequestStatus: number;
        this.employeeService.getEmployeeAssignRequestStatus(employeeIds).subscribe(function (resultData) {
            assignRequestStatus = JSON.parse(resultData["Data"].FieldBinderData)[0].Column1;
            if (assignRequestStatus > 0)
                resCallback(true);
            else
                resCallback(false);
        });
    }
    Export(SplitView: ISplitView) {


        switch (this.selectedTab) {
            case 0:
                var EmployeeSelectedId = this.assignedEmployeeSelectedId;
                if (EmployeeSelectedId.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
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

    }
    editOnClick(splitView: ISplitView) {
        var contextObj = this;
        var employeeSelectedId = [];
        switch (contextObj.selectedTab) {
            case 0: //contextObj.assignedEmployeeAction = "edit";
                employeeSelectedId = contextObj.assignedEmployeeSelectedId;
                this.assignedSplitViewTarget = 1;
                break;
            case 1:// contextObj.unassignedEmployeeAction = "edit";
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
                } else {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
            } else {
                contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
        } else {
            if (contextObj.showview == false) {
                contextObj.employeeService.checkEditPrivilageExist(employeeSelectedId[0]).subscribe(function (resultData) {
                    if (resultData["Data"].ServerId <= 0)
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected employee", 2);

                    else {
                        switch (contextObj.selectedTab) {
                            case 0: contextObj.assignedEmployeeAction = "edit";
                                this.assignedSplitViewTarget = 1;
                                break;
                            case 1: contextObj.unassignedEmployeeAction = "edit";
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
    }
    updateAssignedEmployeeSelectedId(event: any) {
        this.assignedEmployeeSelectedId = event["assignedEmployeeId"];
        this.employeeData = event['RowData']
        this.cdr.detectChanges();
    }
    getUpdatedDisplaySettings(event) {
        if (event["dispSettingObject"] != undefined) {
            var contextObj = this;
            var SpaceDisplayFields = this.generFun.updateSpacePrefixInDisplaySettings(event["dispSettingObject"]);
            this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, SpaceDisplayFields);
            //this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, event["dispSettingObject"]);
            //setTimeout(function () {
            contextObj.splitviewAssignedEmployee.showSecondaryView = false;
            contextObj.splitviewUnassignedEmployee.showSecondaryView = false;
            //}, 8000);
        }
    }
    updateUnassignedEmployeeSelectedId(event: any) {
        this.unassignedEmployeeSelectedId = event["unassignedEmployeeId"];
        this.employeeData = event["RowData"];
        this.cdr.detectChanges();
    }

    emitMenuItems(event: any) {
        var contextObj = this;
        if (event["TotalItems"] == 0) {
            switch (this.selectedTab) {
                case 0:
                    this.assignedEmployeeTotalItems = event["TotalItems"]
                    this.enableassignedEmployeeMenu = [];
                    break
                case 1:
                    this.unassignedEmployeeTotalItems = event["TotalItems"]
                    this.enableunassignedEmployeeMenu = [0];
                    break;
            }
        }
        else {
            switch (this.selectedTab) {
                case 0:
                    this.assignedEmployeeTotalItems = event["TotalItems"]
                    this.employeeService.customerSubscribedFeatures("44").subscribe(function (customerSettingsData) {
                        if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                            contextObj.enableassignedEmployeeMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 15];
                        } else {
                            contextObj.enableassignedEmployeeMenu = [1, 2, 4, 6, 7, 8, 9, 10, 11, 15];
                        }
                    });
                    //this.enableassignedEmployeeMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 15];
                    break
                case 1:
                    this.unassignedEmployeeTotalItems = event["TotalItems"]
                    this.employeeService.customerSubscribedFeatures("44").subscribe(function (customerSettingsData) {
                        if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                            contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 11, 15];
                        } else {
                            contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 11, 15];
                        }
                    });
                    this.employeeService.customerSubscribedFeatures("195").subscribe(function (customerSettingsData) {
                        if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                            contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 11, 15];
                        } else {
                            contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 11, 15];
                        }
                    });
                    //this.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 11, 15];
                    break;
            }
        }
    }

    attachmentSuccess(event: any) {

        console.log("attachment", event["status"]);
        this.employeeAttachmentSuccess = event;
    }
    DisplaySettings(splitview: ISplitView) {
        this.splitViewTitle = "Display Settings";
        switch (this.selectedTab) {
            case 1: {
                this.assignedEmployeeAction = "displaySettings";
            } break;
            case 2: {
                this.unassignedEmployeeAction = "displaySettings";
            } break;
        }
        splitview.showSecondaryView = true;
    }
    displaySettingassignedEmployee(event: any) {
        this.splitViewTitle = "Display Settings";
        if (event != "cancel") {
            //server call to update
            this.notificationService.ShowToaster("Field Order for Employee updated", 3)
        }
        this.splitviewAssignedEmployee.showSecondaryView = false;
    }
    displaySettingunassignedEmployee(event: any) {
        this.splitViewTitle = "Display Settings";
        if (event != "cancel") {
            //server call to update
            this.notificationService.ShowToaster("Field Order for Employee updated", 3)
        }
        this.splitviewUnassignedEmployee.showSecondaryView = false;
    }
    onSecondaryClose() {
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
                    break
                case 1:
                    this.unAssignedEmployeeId = this.returnEmployeeId;
                    this.unAssignedEmpResourceCount = this.returnEmployeeResourceCount;
                    break;
            }
        }

        this.cdr.detectChanges();
    }
    onSearchEmployeeInDrawing(data: any) {
        this.onSearchInDrawing.emit(data);
    }
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

    onUpdateResourceCount(event: any) {
        this.returnEmployeeId = event.employeeId;
        this.returnEmployeeResourceCount = event.resourceCount;
    }

    public onMultipleEditClick() {
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
    }

    public onMultipleEditUpdate(event: IMultipleSubmitOutput) {
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
        for (var item of EmployeeSelectedId) {
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
    }
}
