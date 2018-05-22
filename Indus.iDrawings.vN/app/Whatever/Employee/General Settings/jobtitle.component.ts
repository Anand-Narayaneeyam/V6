import { Component, OnInit } from '@angular/core';
import { IField } from  '../../../Framework/Models/Interface/IField'
import { EmployeeService } from '../../../Models/Employee/employee.services';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ConfirmationComponent } from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {JobTitleAddEditComponent} from './jobtitle-add-edit.component';

@Component({
    selector: 'jobtitle',
    templateUrl: './app/Views/Employee/General Settings/jobtitle.component.html',
    directives: [SubMenu, Sorting, PagingComponent, ListComponent, FieldComponent, CardComponent, Notification, ConfirmationComponent, SlideComponent, SplitViewComponent, GridComponent, JobTitleAddEditComponent],
    providers: [HTTP_PROVIDERS, EmployeeService, NotificationService, ConfirmationService, GeneralFunctions, AdministrationService]
})

export class JobTitleComponent implements OnInit{
    public fieldDetails: IField[];
    public errorMessage: string;
    private fields: IField[];
    sourceData: any[];
    jobtitledataSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Job Title]', sortDir: 'ASC', selectioMode:"single" };
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 1528   
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 1529
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 1530
        }
    ];
    gridcount = 0;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    enableMenu = []; 
    selIds = new Array();
    public totalItems: number = 0;
    public itemsPerPage: number = 10;
    success = "";
    types = true;
    pageIndex: number = 0;
    message: string;
    submitSuccess: any[] = [];
    action: string;
    btnName: string;
    pageTitle: string;
    fieldDetailsAdd1: IField[];
    refreshgrid
    constructor(private employeeService: EmployeeService, private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private generFunctions: GeneralFunctions) {
    }

    ngOnInit(): void {
        var contextObj = this;
        this.employeeService.getJobTitleFields().subscribe(function (list) {
            if (contextObj.generFunctions.checkForUnhandledErrors(list)) {
                for (var i = 0; i < list["Data"].length; i++) {
                    list.Data[i]["Width"] = 200;
                }
                contextObj.fields = (list["Data"]);
                contextObj.getJobTitle();
            }
        });
        var callBack = function (data) {
            this.menuData = data;
        };
        this.generFunctions.GetPrivilegesOfPage(this.menuData, callBack, 310, this.administrationService, this.menuData.length);     
    }

    public getJobTitle() {
        var contextObj = this;
        this.employeeService.getJobTitleData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            if (contextObj.generFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.changeEnableMenu();
            }
        });  
    }

    public changeEnableMenu() {
        var contextObj = this;
        contextObj.enableMenu = [0, 1, 2];
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [0];
            contextObj.notificationService.ShowToaster("No Job Titles exist", 2);
        }
    }

    public onSubMenuChange(event: any) {
        if (event.value == 0) // Add
        {
            this.addClick();
        }
        else if (event.value == 1) // Edit
        {
            this.editClick();
        }
        else if (event.value == 2) // Delete
        {
            this.deleteClick();
        }
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        contextObj.getJobTitle();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getJobTitle();
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Job Title";
        this.employeeService.loadJobTitleAddEdit(0, 1).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Job Title";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.employeeService.loadJobTitleAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 1) {
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Job Title?", "Yes");
            var dbObject = new Array<ReportFieldArray>();
            dbObject.push({ ReportFieldId: 173, Value: "37" })
            this.employeeService.CheckIsEntityReferenceFound(dbObject, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == false) {
                    contextObj.message = "Are you sure you want to delete the selected Employee Job Title?";
                    contextObj.showSlide = !contextObj.showSlide; 
                }
                else {
                    contextObj.message = "Selected Job Title is in use. Are you sure you want to delete the selected Employee Job Title?";
                    contextObj.showSlide = !contextObj.showSlide; 
                }
            });
            
        }
        else if (this.inputItems.selectedIds.length > 0) {
            this.notificationService.ShowToaster("This operation is performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Job Title", 2);
        }
    }

    okDelete(event: Event) {    
        var contextObj = this;
        //if (event.returnOk == true) {
        this.employeeService.deleteJobTitle(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (contextObj.generFunctions.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"]["StatusId"] == 1) {
                        let retUpdatedSrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.sourceData = retUpdatedSrc["itemSrc"];
                        contextObj.totalItems = retUpdatedSrc["itemCount"];
                        if (contextObj.totalItems < 1) {
                            contextObj.enableMenu = [0];
                        }
                        contextObj.notificationService.ShowToaster("Selected Job Title deleted", 3);
                    } else {
                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                            case 3:
                                if (resultData["Data"].ServerId == -1) {
                                    contextObj.notificationService.ShowToaster("Selected Job Title in use, cannot be deleted", 5);
                                }
                                break;
                        }
                    }
                }
            });
        //}
        this.showSlide = !this.showSlide;
    }

    onDelete(e: Event) {
        this.deleteClick();
    }

    onCancel(e) {
        this.enableMenu = [0, 2];
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFunctions.updateDataSource(contextObj.sourceData, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.sourceData = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
        } else if (this.action == "edit") {
            retUpdatedSrc = this.generFunctions.updateDataSource(contextObj.sourceData, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
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