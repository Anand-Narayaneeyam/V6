import {Component, ChangeDetectorRef, Output,Input, EventEmitter, ViewEncapsulation} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'
import {IField} from '../../../Framework/Models/Interface/Ifield'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {AttachmentsComponent} from '../../Common/Attachments/attachments.component';
import {EmployeeService} from '../../../Models/Employee/employee.services'
import {AllEmployeeList} from './allEmployeeList'
import {AllEmployeeAddEditComponent} from './allemployeeaddedit'
import {AssignedMainListComponent} from './assignedemployeemainlist'
import {AssignedEmployeeListComponent} from './assignedemployeelist'
import {AssignedEmployeeAddEditComponent} from './assignedemployee-addedit'
import {UnassignedEmployeeListComponent} from './unassignedEmployeeList'
import {UnassignedEmployeeAddEditComponent} from './unassignedemployee-addedit'
import {FloorSelectionComponent} from '../../space/space data/floor-selection.component'
import {EmployeeResourceListComponent} from './employeeResourceList'
import {GeneralFunctions} from '../../../models/common/general'
import {AdministrationService} from '../../../models/administration/administration.service'
import {OpenDrawing} from '../../common/opendrawing/opendrawing.component';
import { ExportEmployeeData } from './employeeDataExport';
import {DomSanitizationService} from '@angular/platform-browser';
import {AssignEmployees} from '../drawings/assignemployees.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {AssignOrMoveEmpDataEntry } from './assignormoveemployeedataentry.component';

import { CommonService } from '../../../models/common/common.service';
import { MultipleEdit, IMultipleSubmitOutput } from '../../../framework/whatever/multipleedit/multiple-edit.component';
@Component({
    selector: 'employee_data',
    templateUrl: './app/Views/Employee/Data/employeeData.html',
    directives: [AssignOrMoveEmpDataEntry,SlideComponent,UnassignedEmployeeAddEditComponent, FloorSelectionComponent, UnassignedEmployeeListComponent, AssignedEmployeeAddEditComponent,
        AssignedEmployeeListComponent, AssignedMainListComponent, AllEmployeeAddEditComponent, AllEmployeeList, TabsComponent, TabComponent, SplitViewComponent,
        PageComponent, SubMenu, DisplaySettingsComponent, AttachmentsComponent, EmployeeResourceListComponent, OpenDrawing, ExportEmployeeData, AssignEmployees, MultipleEdit],
    providers: [NotificationService, EmployeeService, GeneralFunctions, AdministrationService, CommonService],
    encapsulation: ViewEncapsulation.None
})

export class EmployeeDataComponent {
    @Input() isQuerybuilder: boolean = false;
    @Input() buildarray: any;
    @Input() qResult: any;
    isNotification: boolean;
    pagePath: string = "Employees / Data";
    selectedTab: number = 0;
    fieldObject: IField[];
    dataKey: string[];
    cdr: any;
    returnData: any;
    target: any;
    returnEmployeeId: any;
    returnEmployeeResourceCount: any;
    allEmployeeId: any;
    allEmpResourceCount: any;
    assignedEmployeeId: any;
    assignedEmpResourceCount: any;
    unAssignedEmployeeId: any;
    unAssignedEmpResourceCount: any;
    blnIsGrid: boolean = true;
    dispSettingCategoryId = 6;
    additionalDataField = 8;
    employeeAttachmentSuccess: any;
    filterResourceChkbx: boolean = true;
    splitViewTitle: any;

    @Output() updateResourceCount = new EventEmitter();

    splitviewAllEmployee: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 }
    allEmployeeMenu;
    allEmployeeTotalItems: number = 9
    enableallEmployeeMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8,12,13, 15, 16,17,20,21.22]
    allEmployeeAction: string;
    showview: boolean = false;
    viewDrawing: boolean = false;
    IsOpenDrawingComponentActive: boolean = false;
    selectedDrawingId: number;
    selectedEmpIds: any;
    drawingType: number = 1;
    dwgPageTarget: number;
    objiWhiz: any;
    isAssigneEmployees: boolean = false;
    empDetails: any;
    innerwidthAssign: any;
    assignedEmpIds: number[] = [];
    showslide :boolean= false;
    orphanassign: boolean = false;
    empDataForAssigOrMoveDataEntry: any[] = [];
    assignOrMoveEmpAction: string = '';
    updateAllEmpData: any[] = [];
    updateAssignedEmpData: any[] = [];
    updateUnassignedEmpData: any[] = [];
    isEmployeeResourcesEnabled :boolean;
    isAllowMoveResourcesBasedonEmployeeLocationEnabled :boolean;
    updateAllEmployeeMenu(event: any) {
        var contextObj = this;
        this.showview = false;
        /*76844*/
        this.allEmployeeAction = "";
        this.unassignedEmployeeAction = "";
        switch (this.selectedTab) {
            case 0: {
                if (event.value == 0)
                    this.Add(this.splitviewAllEmployee);
                else if (event.value == 1)
                    this.Edit(this.splitviewAllEmployee);
                else if (event.value == 2)
                    this.Delete(this.splitviewAllEmployee);
                else if (event.value == 3) {
                    var assigned = this.EmployeeData["Assigned?"];
                    // this.employeeService.customerSubscribedFeatures("195").subscribe(function (customerSettingsData) {
                    if (contextObj.isAllowMoveResourcesBasedonEmployeeLocationEnabled == true) {
                            if (assigned == "No"){
                                contextObj._notificationService.ShowToaster("Resources cannot be attached to Unassigned Employee", 2);
                            } else {
                                contextObj.filterResourceChkbx = true;
                                contextObj.Resource(contextObj.splitviewAllEmployee);
                            }
                        } else {
                            contextObj.filterResourceChkbx = true;
                            contextObj.Resource(contextObj.splitviewAllEmployee);
                        }
                   // });
                    //this.filterResourceChkbx = true;
                    //this.Resource(this.splitviewAllEmployee);
                } else if (event.value == 20) {
                    this.splitviewAllEmployee.secondaryArea = 30;
                    this.assignOrMoveEmpAction = '';
                    this.assignSpaceToEmp(this.splitviewAllEmployee, this.allEmployeeSelectedId,1);
                }
                else if (event.value == 21) {
                    this.updateAllEmpData = [];
                    this.assignOrMoveEmpAction = 'Assign Employee';
                    this.assignSpaceToEmp(this.splitviewAllEmployee, this.allEmployeeSelectedId,1);
                }
                else if (event.value == 22) {
                    this.assignOrMoveEmpAction = 'Move Employee';
                    this.assignSpaceToEmp(this.splitviewAllEmployee, this.allEmployeeSelectedId, 2);
                }
                else if (event.value == 7)
                    this.DisplaySettings(this.splitviewAllEmployee);
                else if (event.value == 6)
                    this.Attachment(this.splitviewAllEmployee);
                else if (event.value == 8) {
                    this.showview = true;
                    this.Edit(this.splitviewAllEmployee);
                }
                else if (event.value == 12) {
                    if (this.allEmployeeSelectedId.length == 0)
                        this._notificationService.ShowToaster("Select an Employee", 2);
                    else
                        this.drawingView(1);
                }else if (event.value == 13) {
                    if (this.isSingleSelection()) 
                        this.drawingView(2);
                }
                else if (event.value == 15) {
                    this.Export(this.splitviewAllEmployee);
                }
                else if (event.value == 16) {
                    this.ExportEmployeeData(this.splitviewAllEmployee);
                }
                else if (event.value == 17) {
                    this.InportFromExtApp(this.splitviewAllEmployee);
                }
            } break;
            case 1: {
                if (event.value == 0)
                    this.Add(this.splitviewAssignedEmployee);
                else if (event.value == 1)
                    this.Edit(this.splitviewAssignedEmployee);
                else if (event.value == 2)
                    this.Delete(this.splitviewAssignedEmployee);
                else if (event.value == 3) {
                    this.filterResourceChkbx = true;
                    this.Resource(this.splitviewAssignedEmployee);
                }else if (event.value == 7)
                    this.DisplaySettings(this.splitviewAssignedEmployee);
                else if (event.value == 6)
                    this.Attachment(this.splitviewAssignedEmployee);
                else if (event.value == 8) {
                    this.showview = true;
                    this.Edit(this.splitviewAssignedEmployee);
                } else if (event.value == 15) {
                    this.Export(this.splitviewAssignedEmployee);
                }else if (event.value == 16) {
                    this.ExportEmployeeData(this.splitviewAssignedEmployee);
                } else if (event.value == 12) {
                    if (this.assignedEmployeeSelectedId.length == 0)
                        this._notificationService.ShowToaster("Select an Employee", 2);
                    else
                        this.drawingView(1);
                }else if (event.value == 13) {
                    if (this.isSingleSelection()) 
                        this.drawingView(2);
                }
                else if (event.value == 22) {
                    this.updateAssignedEmpData = [];
                    this.assignOrMoveEmpAction = 'Move Employee';
                    this.assignSpaceToEmp(this.splitviewAssignedEmployee, this.assignedEmployeeSelectedId, 2);
                }
            } break;
            case 2: {
                if (event.value == 0)
                    this.Add(this.splitviewUnassignedEmployee);
                else if (event.value == 1)
                    this.Edit(this.splitviewUnassignedEmployee);
                else if (event.value == 2)
                    this.Delete(this.splitviewUnassignedEmployee);
                else if (event.value == 3) {                    
                    this.filterResourceChkbx = false;
                    this.Resource(this.splitviewUnassignedEmployee);
                } else if (event.value == 20) {
                    this.splitviewAllEmployee.secondaryArea = 30;
                    this.assignOrMoveEmpAction = '';
                    this.assignSpaceToEmp(this.splitviewUnassignedEmployee, this.unassignedEmployeeSelectedId,1);
                }
                else if (event.value == 21) {
                    this.updateUnassignedEmpData = [];
                    this.assignOrMoveEmpAction = 'Assign Employee';
                    this.assignSpaceToEmp(this.splitviewUnassignedEmployee, this.unassignedEmployeeSelectedId,1);
                }else if (event.value == 7)
                    this.DisplaySettings(this.splitviewUnassignedEmployee);
                else if (event.value == 6)
                    this.Attachment(this.splitviewUnassignedEmployee);
                else if (event.value == 8) {
                    this.showview = true;
                    this.Edit(this.splitviewUnassignedEmployee);
                } else if (event.value == 15) {
                    this.Export(this.splitviewUnassignedEmployee);
                }else if (event.value == 16) {
                    this.ExportEmployeeData(this.splitviewUnassignedEmployee);
                }
            }
        }
    }

    allEmployeeSelectedId = [-1];
    unassignedEmployeeSelectedId = [-1];
    moduleId: any = 5;

    splitviewAssignedEmployee = { showSecondaryView: false, showButton: false, secondaryArea: 60 }
    assignedEmployeeMenu;
    assignedEmployeeTotalItems: number = 3;
    enableassignedEmployeeMenu = [1, 2, 3, 4, 5, 6, 8, 15, 16,22]
    assignedEmployeeAction: string;
    floorSelected: boolean = false;
    selectedFloorId: number[];
    assignedEmployeeSelectedId: number[];
    EmployeeData: any;

    splitviewUnassignedEmployee: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 }
    unassignedEmployeeMenu;
    unassignedEmployeeTotalItems: number = 11;
    enableunassignedEmployeeMenu;/*= [0, 1, 2, 4, 5];*/
    unassignedEmployeeAction: string;
    exportTab: number = 0;
    isMultipleEditEnabled: boolean = false;
    isassignmovedataentry: boolean = false;
    multipleEditChange: boolean = false;
    multipleEditFieldDetails: any;
    secondaryTarget: number = 0;
    userRoleId: number = 0;
    isModuleAdmin: boolean = false;

    ngOnInit() {
        var contextObj = this;
        switch (this.selectedTab) {
            case 0:
                this.employeeService.getAllEmployeeColumnData().subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.fieldObject = resultData["Data"];
                    }
                });
                break;
            case 1:
                this.employeeService.getAssignedEmployeeColumnData().subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.fieldObject = resultData["Data"];
                    }
                });
                break;
            case 2:
                this.employeeService.getUnassignedEmployeeColumnData().subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.fieldObject = resultData["Data"];
                    }
                });
                break;
        }
        if (this.isQuerybuilder == true) {
            contextObj.isNotification = false;
            contextObj.employeeService.customerSubscribedFeatures("44,195").subscribe(function (resultData1) {
                var customerFeatureobj = resultData1["Data"];
                for (let i = 0; i < customerFeatureobj.length; i++) {
                    switch (customerFeatureobj[i]["Id"]) {
                        case 44:
                            if (customerFeatureobj[i]["IsSubscribed"]) {
                                contextObj.enableallEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 12, 13, 15, 16, 17,20,21,22];
                            }
                            else {
                                contextObj.enableallEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 12, 13, 15, 16, 17,20,21,22];
                            }
                            break;
                        case 195:
                            if (customerFeatureobj[i]["IsSubscribed"]) {
                                contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 10, 15, 16, 20, 21];
                            }
                            else {
                                contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 10, 15, 16, 20, 21];
                            }
                            break;
                    }
                }
            });

          
           
            this.pagePath = "Employees / Query Builder";
        }
    }
    Add(splitView: ISplitView) {

        splitView.showSecondaryView = true;
        this.splitViewTitle = "New Employee";
        this.secondaryTarget = 1;
        switch (this.selectedTab) {
            case 0: this.allEmployeeAction = "add";
                var allEmployeeSelectedId = this.allEmployeeSelectedId;
                if (allEmployeeSelectedId) {
                    if (allEmployeeSelectedId.length == 0)
                        this.allEmployeeSelectedId = [-1]
                }
                else
                    this.allEmployeeSelectedId = [-1]

                break;
            case 2: this.unassignedEmployeeAction = "add";
                var unassingedEmployeeSelectedId = this.unAssignedEmployeeId;
                if (unassingedEmployeeSelectedId) {
                    if (unassingedEmployeeSelectedId.length == 0)
                        this.unAssignedEmployeeId = [-1];
                }
                else
                    this.unAssignedEmployeeId = [-1];
                break;
        }
    }

    Edit(splitView: ISplitView) {
        debugger
        var contextObj = this;
        var EmployeeSelectedId;
        switch (contextObj.selectedTab) {
            case 0: contextObj.allEmployeeAction = "edit";
                EmployeeSelectedId = contextObj.allEmployeeSelectedId;
                break;
            case 1: contextObj.assignedEmployeeAction = "edit";
                EmployeeSelectedId = contextObj.assignedEmployeeSelectedId;
                break;
            case 2: contextObj.unassignedEmployeeAction = "edit";
                EmployeeSelectedId = contextObj.unassignedEmployeeSelectedId;
                break;
        }
        if (EmployeeSelectedId.length == 0) {
            contextObj._notificationService.ShowToaster("Select an Employee", 2);
            return;
        }
        if (EmployeeSelectedId.length > 1) {
            if (!contextObj.showview) {
                if (contextObj.userRoleId <= 3 || (contextObj.userRoleId > 3 && contextObj.isModuleAdmin)) {
                    contextObj.onMultipleEditClick();
                    contextObj.assignedEmployeeAction = "";
                } else {
                    contextObj._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
            } else {
                contextObj._notificationService.ShowToaster("This operation can be performed only one row at a time",2);
            }
          
        } else {
            if (contextObj.showview == false) {
                contextObj.employeeService.checkEditPrivilageExist(EmployeeSelectedId).subscribe(function (resultData) {
                    if (resultData["Data"].ServerId <= 0)
                        contextObj._notificationService.ShowToaster("You do not have the privilege to edit the data of the selected employee", 2);

                    else {
                        contextObj.secondaryTarget = 1;
                        splitView.showSecondaryView = true;

                    }
                });
            }
            else
                splitView.showSecondaryView = true;
        }
        if (contextObj.showview == true)
            contextObj.splitViewTitle = "Employee Details";
        else contextObj.splitViewTitle = "Edit Employee";
    }


    Export(SplitView: ISplitView) {


        switch (this.selectedTab) {
            case 0: {
                this.allEmployeeAction = "allemployeeexport";
                this.cdr.detectChanges();
                this.allEmployeeAction = "";
            }
                break;
            case 1: {
                    this.assignedEmployeeAction = "assignedemployeeexport";
                    this.cdr.detectChanges();
                    this.assignedEmployeeAction = "";
                }
                break;
            case 2: {
                this.unassignedEmployeeAction = "unassignedemployeeexport";
                this.cdr.detectChanges();
                this.unassignedEmployeeAction = "";
            } break;
        }

    }
    isSingleSelection() {
        var EmployeeSelectedIds;
        switch (this.selectedTab) {
            case 0: EmployeeSelectedIds = this.allEmployeeSelectedId;
                break;
            case 1: EmployeeSelectedIds = this.assignedEmployeeSelectedId;
                break;
            case 2: EmployeeSelectedIds = this.unassignedEmployeeSelectedId;
                break;
        }
        if (EmployeeSelectedIds.length > 1) {
            this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            return false;
        }else if (EmployeeSelectedIds.length == 1)
            return true;
        else {
            this._notificationService.ShowToaster("Select an Employee", 2);
            return false;
        }
            
    }
    Delete(splitview: ISplitView) {
        splitview.showSecondaryView = false;
        if (this.isSingleSelection()) {
            switch (this.selectedTab) {
                case 0: {
                    this.allEmployeeAction = "delete";
                    this.cdr.detectChanges();
                    this.allEmployeeAction = "";
                } break;
                case 1: {
                    this.assignedEmployeeAction = "delete";
                    this.cdr.detectChanges();
                    this.assignedEmployeeAction = "";
                }
                    break;
                case 2: {
                    this.unassignedEmployeeAction = "delete";
                    this.cdr.detectChanges();
                    this.unassignedEmployeeAction = "";
                } break;
            }
        }
    }

    DisplaySettings(splitview: ISplitView) {
        splitview.showSecondaryView = false;
        this.splitViewTitle = "";
        switch (this.selectedTab) {
            case 0: {
                splitview.showSecondaryView = true;
                this.allEmployeeAction = "displaySettings";
                this.splitViewTitle = "Display Settings";
                this.cdr.detectChanges();
            } break;
            case 1: {
                splitview.showSecondaryView = true;
                this.assignedEmployeeAction = "displaySettings";
                this.splitViewTitle = "Display Settings";
                this.cdr.detectChanges();
            } break;
            case 2: {
                splitview.showSecondaryView = true;
                this.unassignedEmployeeAction = "displaySettings";
                this.splitViewTitle = "Display Settings";
                this.cdr.detectChanges();
            } break;
        }
    }

    InportFromExtApp(splitview: ISplitView) {
        splitview.showSecondaryView = false;
        this.splitViewTitle = "Import From External App";
        switch (this.selectedTab) {
            case 0: {
                splitview.showSecondaryView = true;
                this.allEmployeeAction = "importFromExtApp";
                this.cdr.detectChanges();
            } break;
            case 1: {
                splitview.showSecondaryView = true;
                this.assignedEmployeeAction = "importFromExtApp";
                this.cdr.detectChanges();
            } break;
            case 2: {
                splitview.showSecondaryView = true;
                this.unassignedEmployeeAction = "importFromExtApp";
                this.cdr.detectChanges();
            } break;
        }
    }

    ExportEmployeeData(splitview: ISplitView) {
        splitview.showSecondaryView = false;
        this.splitViewTitle = "Export to External App";
        switch (this.selectedTab) {
            case 0: {
                splitview.showSecondaryView = true;
                this.allEmployeeAction = "exportEmployeData";
                this.cdr.detectChanges();
            } break;
            case 1: {
                splitview.showSecondaryView = true;
                this.assignedEmployeeAction = "exportEmployeData";
                this.cdr.detectChanges();
            } break;
            case 2: {
                splitview.showSecondaryView = true;
                this.unassignedEmployeeAction = "exportEmployeData";
                this.cdr.detectChanges();
            } break;
        }
    }

    Attachment(splitview: ISplitView) {
        if (this.isSingleSelection()) {
            this.splitViewTitle = "Attachments";
            this.secondaryTarget = 1;
            switch (this.selectedTab) {
                case 0:
                    splitview.showSecondaryView = true;
                    this.allEmployeeAction = "attachment";
                    this.cdr.detectChanges();
                    break;
                case 1: {
                    splitview.showSecondaryView = true;
                    this.assignedEmployeeAction = "attachment";
                    this.cdr.detectChanges();
                }
                    break;
                case 2: {
                    splitview.showSecondaryView = true;
                    this.unassignedEmployeeAction = "attachment";
                    this.cdr.detectChanges();
                } break;
            }
        }
    }

    Resource(splitview: ISplitView) {
        if (this.isSingleSelection()) {
            this.splitViewTitle = "Resources";
            this.secondaryTarget = 1;
            switch (this.selectedTab) {
                case 0: {
                    splitview.showSecondaryView = true;
                    this.allEmployeeAction = "resource";
                    this.target = 1;
                    this.cdr.detectChanges();
                } break;
                case 1: var EmployeeSelectedId = this.assignedEmployeeSelectedId;
                    if (EmployeeSelectedId.length > 1) {
                        this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    } else {
                        splitview.showSecondaryView = true;
                        this.assignedEmployeeAction = "resource";
                        this.target = 2;
                        this.cdr.detectChanges();
                    }
                    break;
                case 2: {
                    splitview.showSecondaryView = true;
                    this.unassignedEmployeeAction = "resource";
                    this.target = 3;
                    this.cdr.detectChanges();
                } break;
            }
        }
    }
    drawingView(viewTarget: number) {
        switch (this.selectedTab) {
            case 0: if (viewTarget == 1) {
                if (this.checkAllEmpSelectedDetails(this.EmployeeData)) {
                    this.dwgPageTarget = 3;
                    this.selectedEmpIds = this.allEmployeeSelectedId;
                    this.openDrawing();
                    console.log("EmpData", this.EmployeeData);
                }
            } else {
                if (this.checkAllEmpSelectedDetails(this.EmployeeData)) {
                    this.dwgPageTarget = 4;
                    this.selectedEmpIds = this.allEmployeeSelectedId[0];
                    this.openDrawing();
                }

            }

                break;
            case 1:
                if (viewTarget == 1) {
                    if (this.isDifferentFloor()) {
                        this._notificationService.ShowToaster("The selected records are of different floors", 2);
                        return;
                    }
                    else {
                        if (this.assignedEmployeeSelectedId.length > 1)
                            this.selectedDrawingId = +this.EmployeeData[0]['AssignedDrawingId'];
                        else if (this.assignedEmployeeSelectedId.length == 1)
                            this.selectedDrawingId = +this.EmployeeData['AssignedDrawingId'];
                        this.dwgPageTarget = 3;
                        this.selectedEmpIds = this.assignedEmployeeSelectedId;
                        this.openDrawing();
                    }
                }
                else {
                    this.selectedDrawingId = +this.EmployeeData['AssignedDrawingId'];
                    this.dwgPageTarget = 4;
                    this.selectedEmpIds = this.assignedEmployeeSelectedId[0];
                    this.openDrawing();
                }
                break;
        }
    }
    isDifferentFloor() {
        var contextObj = this;
        var isCheck: boolean = false;
        if (this.selectedFloorId.length > 1 && this.assignedEmployeeSelectedId.length > 1) {
            for (var i = 0; this.assignedEmployeeSelectedId.length > i; i++) {
                var index = this.EmployeeData.findIndex(function (el) { return el.Id == contextObj.assignedEmployeeSelectedId[i] });
                var currentDrawingID = this.EmployeeData[index]['AssignedDrawingId'];
                if (i > 0) {
                    if (currentDrawingID != this.EmployeeData[index - 1]['AssignedDrawingId'])
                        isCheck = true;
                }
            }
        }
        return isCheck
    }
    checkAllEmpSelectedDetails(empData) {
        var employeeData;
        if (this.allEmployeeSelectedId.length > 1)
            employeeData = empData;
        else if (this.allEmployeeSelectedId.length == 1)
            employeeData = [empData];
        else {
            this._notificationService.ShowToaster("Select Employee(s)", 2);
            return false;
        }
        var empDataLength = employeeData.length;
        for (var index = 0; index < empDataLength; index++) {
            var empDataitem = employeeData[index];
            if (empDataitem['Assigned?'] != "Yes") {
                //if (empDataitem['SpaceAllotId'] > 0 && empDataitem['AssignedSpaceId'] == null)
                //    this._notificationService.ShowToaster("Selected Employee is backed up for re-linking", 2);
                //else {
                    if (empDataLength == 1) {
                        if (empDataitem['StatusId'] == 15)
                            this._notificationService.ShowToaster("Employee is Terminated", 2);
                        else {
                            if (empDataitem['AssignedDrawingId'] != null)
                            { this._notificationService.ShowToaster("Drawing may be locked or not selected for Employee or Space Management", 2);}
                            else
                            { this._notificationService.ShowToaster("Employee is not assigned to any space", 2); }
                        }
                    } else {
                        if (empDataitem['StatusId'] == 15)
                            this._notificationService.ShowToaster("Some of the selected Employee(s) are Terminated", 2);
                        else {
                            if (empDataitem['AssignedDrawingId'] != null)
                            { this._notificationService.ShowToaster("Drawing may be locked or not selected for Employee/Space Management for some of the selected Employee(s)", 2);}
                            else
                                this._notificationService.ShowToaster("Some of the selected Employee(s) are not assigned to any space", 2);
                        }
                    }
                //}
                return false;
            }
            var spaceKey = empDataitem['Space Key'];
            if (spaceKey == null || spaceKey == 0) {
                this._notificationService.ShowToaster("Drawing may be locked or not selected for Employee or Space Management", 2);
                return false;
            }
            if (index == 0) {
                this.selectedDrawingId = empDataitem['AssignedDrawingId'];
            } else {
                if (this.selectedDrawingId != empDataitem['AssignedDrawingId']) {
                    this._notificationService.ShowToaster("The selected records are of different floors", 2);
                    return false;
                }
            }
        }
        return true;
    }
    openDrawing() {
        var contextObj = this;
        this.splitViewTitle = "Drawing View";
        if (contextObj.IsOpenDrawingComponentActive) {
            this.IsOpenDrawingComponentActive = false;
        }
        setTimeout(function () {
            contextObj.IsOpenDrawingComponentActive = true;
        }, 50);
        if (this.selectedTab == 0) {
            //this.splitviewAllEmployee.secondaryArea = 79;
            contextObj.splitviewAllEmployee.showSecondaryView = !contextObj.splitviewAssignedEmployee.showSecondaryView;
        }
        else {
            //this.splitviewAssignedEmployee.secondaryArea = 79;
            contextObj.splitviewAssignedEmployee.showSecondaryView = !contextObj.splitviewAssignedEmployee.showSecondaryView;
        }
    }
    assignSpaceToEmp(splitview: ISplitView, selectedIds,target) {
        debugger
        var contextObj = this;
        var employeeData;
        contextObj.splitViewTitle = "iDrawings V6";
        if (selectedIds.length > 1)
            employeeData = this.EmployeeData;
        else if (selectedIds.length == 1)
            employeeData = [this.EmployeeData];
        else {
            this._notificationService.ShowToaster("Select Employee(s)", 2);
            return;
        }
        var empIds: number[] = [];
        var empDataLength = employeeData.length;
        for (var index = 0; index < empDataLength; index++) {
            var empDataitem = employeeData[index];
            empIds.push(empDataitem['Id']);
            var statusId = empDataitem['StatusId'];
            if (statusId == 15 || statusId == 45 || statusId == 46 || statusId == 47) {
                if (empDataLength == 1)
                    this._notificationService.ShowToaster("Employee is not Active", 2);
                else
                    this._notificationService.ShowToaster("Some of the selected Employee(s) are not Active", 2);
                return ;
            }
            if (target == 1 && empDataitem['SpaceAllotId'] > 0 && empDataitem['AssignedSpaceId'] == null && empDataitem['Assigned?'] == "No") {
                this.orphanassign = true;
                //    this._notificationService.ShowToaster("One or more Employee is backed up for re-linking. Do you want to assign? ", 2);
            }
            else if (target==1 && empDataitem['SpaceAllotId'] > 0) {
                //change code to solve bug 80244
                //this.orphanassign = true;
                this._notificationService.ShowToaster("One or more Employee(s) has already been assigned a Space", 2);
                return ;
            }
            else if (target == 1 && empDataitem['Assigned?'] != "No") {
                this._notificationService.ShowToaster("One or more Employee(s) has already been assigned a Space", 2);
                return ;
            }
            else if (target == 2 && empDataitem['Assigned?'] == "No") {
                this._notificationService.ShowToaster("One or more Employee(s) not assigned a Space", 2);
                return;
            }
        }
            var assignRequestStatus: number;
            this.employeeService.getEmployeeAssignRequestStatus(empIds).subscribe(function (resultData) {
                assignRequestStatus = JSON.parse(resultData["Data"].FieldBinderData)[0].Column1;
                if (assignRequestStatus > 0) {
                    if (empIds.length == 1)
                        contextObj._notificationService.ShowToaster("Selected Employee has already requested for Space assigning", 2);
                    else
                        contextObj._notificationService.ShowToaster("One or more Employee(s) has already requested for Space assigning", 2);
                } else {
                    if (contextObj.assignOrMoveEmpAction == '' && target==1) {
                        contextObj.empDetails = { "SelectedId": selectedIds, "RowData": contextObj.EmployeeData };
                        if (contextObj.orphanassign)
                            contextObj.showslide = true;
                        else {
                            if (contextObj.isAssigneEmployees) {
                                contextObj.isAssigneEmployees = false;
                            }

                            setTimeout(function () {
                                contextObj.isAssigneEmployees = true;
                                splitview.showSecondaryView = true;
                            }, 100);
                        }
                    } else if (contextObj.assignOrMoveEmpAction == 'Assign Employee' && target == 1 || (contextObj.assignOrMoveEmpAction == 'Move Employee' && target == 2)) {
                        contextObj.empDataForAssigOrMoveDataEntry = employeeData;
                        if (contextObj.assignOrMoveEmpAction == 'Move Employee' && target == 2){
                            contextObj.employeeService.getEmployeeSheduledToMove(employeeData).subscribe(function (resultData) {
                                if (JSON.parse(resultData["Data"].FieldBinderData)[0].IsEmployeeSheduledToMove) {
                                    contextObj._notificationService.ShowToaster("One or more Employee(s) are already scheduled for a Move", 2);
                                }
                                else if (JSON.parse(resultData["Data"].FieldBinderData)[0].IsEmployeeApprovalForMove) {
                                    contextObj._notificationService.ShowToaster("Move Request for one or more Employee(s) is already sent for Approval", 2);
                                }
                                else {
                                    contextObj.setAssignOrMoveEmpShowVariable(splitview);
                                }
                            });
                        }
                        else
                            contextObj.setAssignOrMoveEmpShowVariable(splitview);
                    }
                }
            });
            //splitview.showSecondaryView = true;
            //splitview.secondaryArea = 79;

    }
    setAssignOrMoveEmpShowVariable(splitview) {
        this.splitViewTitle = this.assignOrMoveEmpAction + "(s)";
        this.secondaryTarget = 3;
        this.isassignmovedataentry = true;
        splitview.showSecondaryView = true;
    }
    checkDeAssignPossible(empData, selectedIds) {
        var employeeData;
        if (selectedIds.length > 1)
            employeeData = empData;
        else if (selectedIds.length == 1)
            employeeData = [empData];
        else {
            this._notificationService.ShowToaster("Select Employee(s)", 2);
            return false;
        }
        var empDataLength = employeeData.length;
        for (var index = 0; index < empDataLength; index++) {
            var empDataitem = employeeData[index];
                        //if (empDataitem['SpaceAllotId'] > 0 && empDataitem['AssignedSpaceId'] == null)
            //    this._notificationService.ShowToaster("One or more Employee is backed up for re-linking. Do you want to assign? ", 2);
            var statusId = empDataitem['StatusId'];
            if (empDataLength == 1) {
                if (statusId == 15 || statusId == 45 || statusId == 46 || statusId == 47)
                    this._notificationService.ShowToaster("Employee is not Active", 2);
                else
                    this._notificationService.ShowToaster("Employee is not assigned to any space", 2);
                return false;
            }
            if (empDataLength >1){
                if (statusId == 15 || statusId == 45 || statusId == 46 || statusId == 47)
                    this._notificationService.ShowToaster("Some of the selected Employee(s) are not Active", 2);
                else
                    this._notificationService.ShowToaster("Some of the selected Employee(s) are not assigned to any space", 2);
                return false;
            }
            if (empDataitem['SpaceAllotId'] > 0) {
                this._notificationService.ShowToaster("One or more Employee has already been assigned a Space", 2);
                return false;
            }
            //if (this.getEmployeeAssignRequestStatusforDataPage(empDataitem['Id'])) {
            //    this._notificationService.ShowToaster("One or more Employee has already requested for Space assigning", 2);
            //    return false;
            //}
            if (empDataitem['Assigned?'] != "No") {
                this._notificationService.ShowToaster("One or more Employee has already been assigned a Space", 2);
                return false;
            }
        }
        return true;
    }
    empAssignSuccess(empIds: any) {
        this.assignedEmpIds = empIds;
    }
    //getEmployeeAssignRequestStatusforDataPage(employeeId) {
    //    var assignRequestStatus: number;
    //    this.employeeService.getEmployeeAssignRequestStatus(employeeId).subscribe(function (resultData) {
    //        assignRequestStatus = JSON.parse(resultData["Data"].FieldBinderData)[0].Column1;
    //        if (assignRequestStatus== 0)
    //            return false;
    //        else
    //            return  true;
    //    });
    //}
    getDrawingObject(event) {
        this.objiWhiz = event.dwgObject;
    }
    constructor(cdr: ChangeDetectorRef, private employeeService: EmployeeService, private _notificationService: NotificationService, private generFun: GeneralFunctions, private administrationService: AdministrationService, private commonService: CommonService, private sanitizer: DomSanitizationService) {
        var contextObj = this;
        this.cdr = cdr;
        var UserRole;
        this.innerwidthAssign = window.innerWidth - 100;
        console.log(" this.innerwidthAssign", this.innerwidthAssign);
        this.employeeService.getSessionData().subscribe(function (resultDataSession) {
            UserRole = resultDataSession.Data["UserRoleId"];
            contextObj.userRoleId = resultDataSession.Data["UserRoleId"];
        });

        this.employeeService.getIsModuleAdmin(5).subscribe(function (moduleAdminData) {
            contextObj.isModuleAdmin = moduleAdminData["Data"];
        });
        contextObj.employeeService.customerSubscribedFeatures("44,195").subscribe(function (resultData1) {
            var customerFeatureobj = resultData1["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 44: contextObj.isEmployeeResourcesEnabled = customerFeatureobj[i]["IsSubscribed"]
                        break;
                    case 195: contextObj.isAllowMoveResourcesBasedonEmployeeLocationEnabled = customerFeatureobj[i]["IsSubscribed"]
                        break;
                }
            }
        });
        this.employeeService.getEmployeeMenu(1).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {

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
                                    data.splice(i, 1);
                                    showView = false;
                                    showEdit = false;
                                    break;
                                }
                            }
                        }
                    });

                    if (UserRole != 3) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].id == 16) {
                                data.splice(i, 1);
                            }
                          }
                                               
                        contextObj.allEmployeeMenu = data;
                    }
                    else {
                        contextObj.allEmployeeMenu = data;
                    }


                };
                contextObj.generFun.GetPrivilegesOfPage(resultData["allemployee"], callBack, 304, contextObj.administrationService, resultData["allemployee"].length);
            }
        });
        this.employeeService.getEmployeeMenu(1).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.assignedEmployeeMenu = resultData["assignedEmployee"];
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
                                    data.splice(i, 1);
                                    showView = false;
                                    showEdit = false;
                                    break;
                                }
                            }
                        }
                    });

                    if (UserRole != 3) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].id == 16) {
                                data.splice(i, 1);
                            }
                        }
                        
                        contextObj.assignedEmployeeMenu = data;
                    }
                    else {
                        
                        contextObj.assignedEmployeeMenu = data;
                    }
                };
                contextObj.generFun.GetPrivilegesOfPage(resultData["assignedEmployee"], callBack, 304, contextObj.administrationService, resultData["assignedEmployee"].length);
            }
        });

        this.employeeService.getEmployeeMenu(1).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.unassignedEmployeeMenu = resultData["unassignedEmployee"];
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
                                    data.splice(i, 1);
                                    showView = false;
                                    showEdit = false;
                                    break;
                                }
                            }
                        }
                    });

                    if (UserRole != 3) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].id == 16) {
                                data.splice(i, 1);
                            }
                        }

                        

                        contextObj.unassignedEmployeeMenu = data;
                    }
                    else {

                        
                        contextObj.unassignedEmployeeMenu = data;
                    }
                };
                contextObj.generFun.GetPrivilegesOfPage(resultData["unassignedEmployee"], callBack, 304, contextObj.administrationService, resultData["unassignedEmployee"].length);
            }
        });

    }

    getSelectedTab(event: any) {
        this.selectedTab = event[0];
        this.secondaryTarget = -1;
        if (this.selectedTab == 1)
            this.floorSelected = false;
        this.updateAllEmpData = [];
        this.updateAssignedEmpData = [];
        this.updateUnassignedEmpData = [];
        this.splitviewAllEmployee.showSecondaryView = false;
        this.splitviewAssignedEmployee.showSecondaryView = false;
        this.splitviewUnassignedEmployee.showSecondaryView = false;
    }
    OnSuccessfulSubmi(event: any) {
        if (event["status"] == "success") {
            if ((event["returnData"]["Data"]) != "") {
                this.returnData = event["returnData"]["Data"];
            }
            this.secondaryTarget = -1;          
             /*commented bugid 76844*/
            //this.allEmployeeAction = "";
           // this.unassignedEmployeeAction = "";
            //this.assignedEmployeeAction = "";
            this.splitviewAllEmployee.showSecondaryView = false;
            this.splitviewAssignedEmployee.showSecondaryView = false;
            this.splitviewUnassignedEmployee.showSecondaryView = false;
        }
    }

    updateAllEmployeeSelectedId(event: any) {

        if (event["allEmployeeId"])
            this.allEmployeeSelectedId = event["allEmployeeId"];
        this.EmployeeData = event["RowData"];
        //  this.assignedSpaceId = event.rowData.AssignedSpaceId

        this.cdr.detectChanges();
    }

    getSelectedFloor(event: any) {
        this.selectedFloorId = event["selectedFloor"];
    }
    floorSelectedEvent(event: any) {
        if (event["floorselected"])
            this.floorSelected = true;

    }
    getSelectedIds(event: any) {
        if (event["SelectedIds"].length > 0) {
            this.floorSelected = true;
            this.selectedFloorId = event["SelectedIds"]
        }

    }
    updateAssignedEmployeeSelectedId(event: any) {

        this.assignedEmployeeSelectedId = event["assignedEmployeeId"];
        // console.log("full", event["RowData"])
        this.EmployeeData = event["RowData"];

        this.cdr.detectChanges();
    }
    displaySettingassignedEmployee(event: any) {
        if (event != "cancel") {
            this._notificationService.ShowToaster("Field Order for Employee updated", 3)
        }
        this.splitviewAssignedEmployee.showSecondaryView = false;
    }


    updateUnassignedEmployeeSelectedId(event: any) {
        this.unassignedEmployeeSelectedId = event["unassignedEmployeeId"];
        this.EmployeeData = event["RowData"];
        this.cdr.detectChanges();
    }
    displaySettingunassignedEmployee(event: any) {
        if (event != "cancel") {
            this._notificationService.ShowToaster("Field Order for Employee updated", 3)
        }
        this.splitviewUnassignedEmployee.showSecondaryView = false;
    }

    emitMenu(event: any) {
        var contextObj = this;
        if (event["TotalItems"] == 0) {
            switch (this.selectedTab) {
                case 0:
                    this.enableallEmployeeMenu = [0];
                    break
                case 1: this.enableassignedEmployeeMenu = [];
                    break
                case 2: this.enableunassignedEmployeeMenu = [0];
                    break;
            }
        }
        else {
            switch (this.selectedTab) {
                case 0:
                    if (contextObj.isEmployeeResourcesEnabled)
                        contextObj.enableallEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 12, 13, 15, 16, 17, 20, 21, 22];
                    else
                        contextObj.enableallEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 12, 13, 15, 16, 17, 20, 21, 22];
                    //this.employeeService.customerSubscribedFeatures("44").subscribe(function (customerSettingsData) {
                    //    if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    //        contextObj.enableallEmployeeMenu = [0, 1, 2, 3,4, 6, 7, 8, 12, 13, 15, 16,17,20,21,22];
                    //    } else {
                    //        contextObj.enableallEmployeeMenu = [0, 1, 2,4, 6, 7, 8, 12, 13, 15, 16,17,20,21,22];
                    //    }
                    //});
                    //this.employeeService.customerSubscribedFeatures("195").subscribe(function (customerSettingsData) {
                    //    if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    //        contextObj.enableallEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 12, 13, 15, 16, 17,20,21,22];
                    //    } else {
                    //        contextObj.enableallEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 12, 13, 15, 16, 17, 20, 21,22];
                    //    }
                    //});
                    //this.enableallEmployeeMenu = [0, 1, 2, 3, 6, 7, 8,12,13, 15, 16]
                    break
                case 1:
                    if (contextObj.isEmployeeResourcesEnabled)
                        contextObj.enableassignedEmployeeMenu = [1, 2, 3, 6, 7, 8, 12, 13, 15, 16, 22];
                    else
                        contextObj.enableassignedEmployeeMenu = [1, 2, 6, 7, 8, 12, 13, 15, 16, 22];
                    //this.employeeService.customerSubscribedFeatures("44").subscribe(function (customerSettingsData) {
                    //    if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    //        contextObj.enableassignedEmployeeMenu = [1, 2, 3, 6, 7, 8, 12, 13, 15, 16,22];
                    //    } else {
                    //        contextObj.enableassignedEmployeeMenu = [1, 2, 6, 7, 8, 12, 13, 15, 16,22];
                    //    }
                    //});
                    //this.enableassignedEmployeeMenu = [1, 2, 3, 6, 7, 8, 12, 13, 15, 16];
                    break
                case 2:
                    if (contextObj.isEmployeeResourcesEnabled && contextObj.isAllowMoveResourcesBasedonEmployeeLocationEnabled == false)
                        contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 10, 15, 16, 20, 21];
                    else
                        contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 10, 15, 16, 20, 21];
                    //this.employeeService.customerSubscribedFeatures("44").subscribe(function (customerSettingsData) {
                    //    if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    //        contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 10, 15, 16, 20, 21];
                    //    } else {
                    //        contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 10, 15, 16, 20, 21];
                    //    }
                    //});
                    //this.employeeService.customerSubscribedFeatures("195").subscribe(function (customerSettingsData) {
                    //    if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                    //        contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 4, 6, 7, 8, 10, 15, 16, 20, 21];
                    //    } else {
                    //        contextObj.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 10, 15, 16, 20, 21];
                    //    }
                    //});
                    //this.enableunassignedEmployeeMenu = [0, 1, 2, 3, 4, 6, 7, 8, 10, 15, 16];
                    break;
            }
        }
    }


    getUpdatedDisplaySettings(event) {
        if (event["dispSettingObject"] != undefined) {
            var contextObj = this;
            var SpaceDisplayFields = this.generFun.updateSpacePrefixInDisplaySettings(event["dispSettingObject"]);
            this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, SpaceDisplayFields);
            //this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, event["dispSettingObject"]);
            setTimeout(function () {
                contextObj.splitviewAllEmployee.showSecondaryView = false;
                contextObj.splitviewAssignedEmployee.showSecondaryView = false;
                contextObj.splitviewUnassignedEmployee.showSecondaryView = false;
            }, 8000);
        }
    }

    onUpdateResourceCount(event: any) {
        this.returnEmployeeId = event.employeeId;
        this.returnEmployeeResourceCount = event.resourceCount;
    }

    onSplitViewClose(event) {
        var context = this;
        this.secondaryTarget = -1;
        this.updateAllEmpData = [];
        this.updateAssignedEmpData = [];
        this.updateUnassignedEmpData = [];
        this.isassignmovedataentry = false;
        if (!context.isMultipleEditEnabled) {
            this.isAssigneEmployees = false;
            var fieldResourceCount = context.fieldObject.find(function (item) {
                return item.FieldLabel === "Resource Count";
            });
            if (fieldResourceCount.IsVisible) {
                switch (this.selectedTab) {
                    case 0:
                        this.allEmployeeId = this.returnEmployeeId;
                        this.allEmpResourceCount = this.returnEmployeeResourceCount;
                        this.splitviewAllEmployee.showSecondaryView = false;
                        this.splitviewAllEmployee.secondaryArea = 30;
                        if (context.assignedEmpIds.length > 0) {
                            this.allEmployeeAction = "employeeAssigned";
                            this.cdr.detectChanges();
                        }
                        this.allEmployeeAction = "";
                        context.assignedEmpIds = [];
                        if (this.objiWhiz) {
                            this.IsOpenDrawingComponentActive = false;
                            this.objiWhiz.close(function (returnCode) {
                            });
                        }
                        break;
                    case 1:
                        this.assignedEmployeeId = this.returnEmployeeId;
                        this.assignedEmpResourceCount = this.returnEmployeeResourceCount;
                        this.splitviewAssignedEmployee.showSecondaryView = false;
                        this.assignedEmployeeAction = "";
                        this.splitviewAssignedEmployee.secondaryArea = 30;
                        if (this.objiWhiz) {
                            this.IsOpenDrawingComponentActive = false;
                            this.objiWhiz.close(function (returnCode) {
                            });
                        }
                        break
                    case 2: this.unassignedEmployeeAction = "";
                        this.unAssignedEmployeeId = this.returnEmployeeId;
                        this.unAssignedEmpResourceCount = this.returnEmployeeResourceCount;
                        this.splitviewUnassignedEmployee.showSecondaryView = false;
                        if (context.assignedEmpIds.length > 0) {
                            this.unassignedEmployeeAction = "employeeAssigned";
                            this.cdr.detectChanges();
                        }
                        this.unassignedEmployeeAction = "";
                        context.assignedEmpIds = [];
                        if (this.objiWhiz) {
                            this.IsOpenDrawingComponentActive = false;
                            this.objiWhiz.close(function (returnCode) {
                            });
                        }
                        break;
                }
            } else {
                switch (this.selectedTab) {
                    case 0:
                        this.allEmployeeId = this.returnEmployeeId;
                        this.splitviewAllEmployee.showSecondaryView = false;
                        this.splitviewAllEmployee.secondaryArea = 30;
                        if (context.assignedEmpIds.length > 0) {
                            this.allEmployeeAction = "employeeAssigned";
                            this.cdr.detectChanges();
                        }
                        this.allEmployeeAction = "";
                        context.assignedEmpIds = [];
                        if (this.objiWhiz) {
                            this.IsOpenDrawingComponentActive = false;
                            this.objiWhiz.close(function (returnCode) {
                            });
                        }
                        break;
                    case 1:
                        this.assignedEmployeeId = this.returnEmployeeId;
                        this.splitviewAssignedEmployee.showSecondaryView = false;
                        this.assignedEmployeeAction = "";
                        this.splitviewAssignedEmployee.secondaryArea = 30;
                        if (this.objiWhiz) {
                            this.IsOpenDrawingComponentActive = false;
                            this.objiWhiz.close(function (returnCode) {
                            });
                        }
                        break
                    case 2: this.unassignedEmployeeAction = "";
                        this.unAssignedEmployeeId = this.returnEmployeeId;
                        this.splitviewUnassignedEmployee.showSecondaryView = false;
                        if (context.assignedEmpIds.length > 0) {
                            this.unassignedEmployeeAction = "employeeAssigned";
                            this.cdr.detectChanges();
                        }
                        this.unassignedEmployeeAction = "";
                        context.assignedEmpIds = [];
                        if (this.objiWhiz) {
                            this.IsOpenDrawingComponentActive = false;
                            this.objiWhiz.close(function (returnCode) {
                            });
                        }
                        break;
                }
            }
        } else {
            this.allEmployeeAction = "";
            this.unassignedEmployeeAction = "";
            this.assignedEmployeeAction = "";
            context.isMultipleEditEnabled = false;
            context.multipleEditChange = !context.multipleEditChange;
        }
        this.cdr.detectChanges();
    }

    attachmentSuccess(event: any) {
        this.employeeAttachmentSuccess = event;
    }

    
    getSelectedTabExport(event: any) {
        this.selectedTab = event[0];
    }

    public onMultipleEditClick() {
        var contextObj = this;
        contextObj.commonService.getFieldsForMultipleEdit(contextObj.employeeService.allemployeeAddEditFormId).subscribe(function (resultData) {
            contextObj.multipleEditFieldDetails = JSON.parse(resultData);
            contextObj.secondaryTarget = 2;
            contextObj.isMultipleEditEnabled = true;
            contextObj.splitViewTitle = "Multiple Update";
            switch (contextObj.selectedTab) {
                case 0:
                    contextObj.splitviewAllEmployee.showSecondaryView = !contextObj.splitviewAllEmployee.showSecondaryView;
                    break;
                case 1:
                    contextObj.splitviewAssignedEmployee.showSecondaryView = !contextObj.splitviewAssignedEmployee.showSecondaryView;
                    break;
                case 2:
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
                EmployeeSelectedId = contextObj.allEmployeeSelectedId;
                break;
            case 1:
                EmployeeSelectedId = contextObj.assignedEmployeeSelectedId;
                break;
            case 2:
                EmployeeSelectedId = contextObj.unassignedEmployeeSelectedId;
                break;
        }
        for (var item of EmployeeSelectedId) {
            event.ReportFieldIdValuesArray.push({ ReportFieldId: 866, Value: item });
        }
        contextObj.employeeService.updateMultipleEmployeeData(JSON.stringify(event.ReportFieldIdValuesArray), event.ReportFieldId, event.NewValue, event.OrgUnitId).subscribe(function (resultData) {

            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj._notificationService.ShowToaster("Employee details updated", 2);
                    break;
                default:
                    break;

            }
        });
    }
    submitSuccessAssignOrMoveDataEntry(updatedEmpData) {
        this.secondaryTarget = -1;
        this.isassignmovedataentry = false;
        switch (this.selectedTab) {
            case 0:
                if (updatedEmpData != "") {    //grid updation
                    this.updateAllEmpData = updatedEmpData;
                    if (updatedEmpData.length==1)
                        this.EmployeeData = updatedEmpData[0];
                    else
                        this.EmployeeData = updatedEmpData;
                }
                this.splitviewAllEmployee.showSecondaryView = !this.splitviewAllEmployee.showSecondaryView;
                break;
            case 1:
                if (updatedEmpData != "") {    //grid updation
                    this.updateAssignedEmpData = updatedEmpData;
                }
                this.splitviewAssignedEmployee.showSecondaryView = !this.splitviewAssignedEmployee.showSecondaryView;
                break;
            case 2:
                if (updatedEmpData != "") {    //grid updation
                    this.updateUnassignedEmpData = updatedEmpData;
                }
                this.splitviewUnassignedEmployee.showSecondaryView = !this.splitviewUnassignedEmployee.showSecondaryView;
                break;
        }
    }
    closeSlideDialog(value: any) {
        this.showslide = false;
        this.orphanassign=false
    }
    noClick() {
        this.orphanassign = false;
        this.showslide = false;
    }
    yesClick() {
        var context = this;
        var splitview: ISplitView
        this.showslide = false;
        this.orphanassign = false
        if (this.selectedTab == 0)
            splitview = this.splitviewAllEmployee;
        //else if (this.selectedTab == 1) //might not come for assigned tab
        //    splitview = this.splitviewAssignedEmployee;
        else if (this.selectedTab == 2)
            splitview = this.splitviewUnassignedEmployee;
        if (this.isAssigneEmployees) {
            this.isAssigneEmployees = false;
        }

        setTimeout(function () {
            context.isAssigneEmployees = true;
            splitview.showSecondaryView = true;
        }, 100);
    }

}

