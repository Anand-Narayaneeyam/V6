import { Component, OnChanges, SimpleChange, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { LabelComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { EmployeeService } from '../../../Models/Employee/employee.services';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { IField } from '../../../Framework/Models//Interface/IField'
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { NewResourcesComponent } from './new-employee_resources';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';

@Component({
    selector: 'employeeResourceList',
    templateUrl: 'app/Views/Employee/Data/employeeResourceList.html',
    directives: [SlideComponent, SubMenu, Sorting, PagingComponent, FieldComponent, ListComponent, CardComponent, Notification, LabelComponent, searchBox, TabsComponent, TabComponent, NewResourcesComponent, GridComponent],
    providers: [EmployeeService, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['selectedId', 'EmployeeData', 'target', 'filterResourceChkbx'],
    encapsulation: ViewEncapsulation.None
})

export class EmployeeResourceListComponent {
    showSlide: boolean = false;
    position: any = "top-right";
    target: number;
    selectedTab: number = 0;
    newResourceTab: boolean = false;
    localselection: number;
    deleteIndex: number;
    action: string;
    selectedId: number;
    fieldEmployeeName: IField[];
    fieldEmployeeCode: IField[];
    sourceData: any[];
    EmployeeData: any;
    assigned: any;
    filterResourceChkbx: boolean;
    public totalItems: number;// = 1000;
    public itemsPerPage: number;// = 200;
    pageIndex: number = 0;
    blnShowSort: boolean = true;
    sortCol: string = "[Resource Type]";
    sortDir: string = "ASC";
    success = "";
    isDeleteVisible: boolean = false;
    selIds = new Array();
    private fields: IField[];
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 1829          
        },
        {
            "id": 1,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 1831          
        }
    ];
    gridcount = 8;
    enableMenu = [0, 1];
    @Output() employeeResourceCount = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single" };
    constructor(private administrationService: AdministrationService,private employeeService: EmployeeService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;
        if (this.target == 4) {
            this.blnShowSort = false;
            this.isDeleteVisible = true;
        } else {
            this.blnShowSort = true;
            this.isDeleteVisible = false;
        }  
        if (contextObj.EmployeeData) {
            this.assigned = contextObj.EmployeeData["Assigned?"];
        }
        this.loadData();                
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes["selectedId"] && changes["selectedId"]["currentValue"] != changes["selectedId"]["previousValue"]) {
        }
    }
   
    loadData() {
        var contextObj = this;
        this.employeeService.getEmployeeResourceColumnData().subscribe(function (resultData) {
            contextObj.fieldEmployeeCode = resultData["Data"].find(function (el) { return el.ReportFieldId === 871; });
            contextObj.fieldEmployeeName = resultData["Data"].find(function (el) { return el.ReportFieldId === 3011; });
            if (contextObj.EmployeeData) {
                contextObj.fieldEmployeeName["FieldValue"] = contextObj.EmployeeData["Employee Name"];
                contextObj.fieldEmployeeCode["FieldValue"] = contextObj.EmployeeData["Employee Code"];
                contextObj.assigned = contextObj.EmployeeData["Assigned?"];              
            }
            var removeArr = [871, 3011,7891];
            contextObj.fields = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
        })
        this.employeeService.getEmployeeResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.gridcount = contextObj.totalItems;
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.gridcount == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Resources added", 2);
                contextObj.blnShowSort = false;
            } else {
                contextObj.enableMenu = [0, 1];
            }
            if (contextObj.assigned == "No") {
                contextObj.employeeService.getSessionData().subscribe(function (data) {
                    var retData = data["Data"];
                    if (retData["UserRoleId"] == 4) {
                        contextObj.enableMenu = [];
                    } else if (retData["UserRoleId"] == 7) {
                        contextObj.checkEditPrivilageExist(contextObj.gridcount);
                    }
                });
            } else if (contextObj.assigned == "Yes") {
                contextObj.checkEditPrivilageExist(contextObj.gridcount);
            }  
        });
    }

    getSelectedTab(event: any) {
        this.deleteIndex = 0;
        var contextObj = this;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    }

    onTabClose(event: any) {
        this.newResourceTab = false;
        this.selectedTab = event[0];
    }

    public loadTabContent() {
        var contextObj = this;
        this.localselection = 1;
        contextObj.newResourceTab = true;
        setTimeout(function () {
            contextObj.selectedTab = 1;
        }, 100);
    }

    public checkEditPrivilageExist(gridcount) {
        var contextObj = this;
        var empId = this.EmployeeData["Id"];
        if (empId != undefined) {
            this.employeeService.checkEditPrivilageExist(empId).subscribe(function (resultData) {
                if (resultData["Data"].ServerId == 0) {
                    contextObj.enableMenu = [];
                    //contextObj.notificationService.ShowToaster("You do not have the privilege to add resource to the selected employee", 2);
                } else {
                    if (gridcount > 0)
                        contextObj.enableMenu = [0, 1];
                    else
                        contextObj.enableMenu = [0];

                }
            });
        }
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                this.loadTabContent();
                break;
            case 1:
                this.deleteResources(this.inputItems.selectedIds);             
                break;
        }
    }

    public onSort(event: any) {
        var contextObj = this;
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.employeeService.sortEmployeeResource(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [0, 1];
            }
        });
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.employeeService.sortEmployeeResource(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.selectedId).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [0, 1];
            }
        });
    };

    public deleteResources(resourceIds) {
        if (resourceIds.length > 0) {
            this.showSlide = !this.showSlide;
        }
        else {
            this.notificationService.ShowToaster("Select Resource(s)", 2);
        }
    }

    okDelete(event: any) {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < contextObj.inputItems.selectedIds.length; i++) {
            arrayList.push({
                ReportFieldId: 865,
                Value: this.inputItems.selectedIds[i].toString()
            });
        }
        this.showSlide = !this.showSlide;               
        this.employeeService.postResourcesDelete(JSON.stringify(arrayList), this.selectedId).subscribe(function (resultData) {               
            if (resultData["Data"].StatusId == "1") {
                contextObj.notificationService.ShowToaster("Selected Resource(s) deleted", 3);     
                contextObj.employeeService.getEmployeeResourceData(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.selectedId).subscribe(function (resultData) {
                    contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    if (contextObj.gridcount == 0) {
                        contextObj.notificationService.ShowToaster("No Resources added", 2);
                        contextObj.enableMenu = [0];
                        contextObj.blnShowSort = false;
                    }
                    contextObj.toUpdateEmployeeRowData(resultData);
                });            
            }           
        });                   
    }

    onDelete(e: Event) {
        this.deleteResources(this.inputItems.selectedIds);
    }

    closeSlideDialog(event: any) {
        this.showSlide = event.value;
    }

    cancelClick(event: any) {
        this.showSlide = false;
    }

    submitSuccess(event: any) {
        var contextObj = this;
        if (event["status"] == "success") {
            this.employeeService.getEmployeeResourceData(this.pageIndex, this.sortCol, this.sortDir, this.selectedId).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.gridcount = contextObj.totalItems;
                    contextObj.enableMenu = [0,1];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Resources added", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.selectedTab = 0;
                contextObj.deleteIndex = contextObj.deleteIndex + 1;
                contextObj.newResourceTab = false;
                contextObj.toUpdateEmployeeRowData(resultData);
            });
        }
    }

    public toUpdateEmployeeRowData(data) {
        var contextObj = this;
        var jsonData = JSON.parse(data["Data"].FieldBinderData);
        contextObj.employeeResourceCount.emit({
            employeeId: contextObj.selectedId,
            resourceCount: contextObj.totalItems
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}



