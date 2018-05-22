import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { iDrawingsUsersComponent } from './iDrawings-users.component';
import { EmployeeUsersComponent } from './employees-users.component';
import { TechniciansUsersComponent } from './technicians-users.component';
import { ContractorsUsersComponent } from './contractors-users.component';
import { LogbookComponent } from '../../Common/LogBook/logbook.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { UserGroupAddEditComponent } from './user-groups-add-edit.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';


@Component({
    selector: 'user-groups',
    templateUrl: './app/Views/Administration/User Groups/user-groups.component.html',
    directives: [LogbookComponent, PageComponent, SubMenu, Sorting, ListComponent, CardComponent, FieldComponent, Notification, ConfirmationComponent, PagingComponent, SplitViewComponent, GridComponent, SectionComponent, iDrawingsUsersComponent, EmployeeUsersComponent, TechniciansUsersComponent, ContractorsUsersComponent, UserGroupAddEditComponent, SlideComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, ConfirmationService, GeneralFunctions]
})

export class UserGroupsComponent implements OnInit {
    pagePath: string;
    public fieldDetails: IField[];
    public errorMessage: string;
    private fields: IField[];
    sourceData: any[];
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        },
        {
            "id": 3,
            "title": "Users",
            "image": "Users",
            "path": "Users",
            "subMenu": [
                {
                    "id": 4,
                    "title": "iDrawings Users",
                    "image": "iDrawings Users",
                    "path": "iDrawings Users",
                    "subMenu": null
                }//,
                //{
                //    "id": 5,
                //    "title": "Employees",
                //    "image": "Employees",
                //    "path": "Employees",
                //    "subMenu": null
                //},
                //{
                //    "id": 6,
                //    "title": "Technicians",
                //    "image": "Technicians",
                //    "path": "Technicians",
                //    "subMenu": null
                //},
                //{
                //    "id": 7,
                //    "title": "Contractors",
                //    "image": "Contractors",
                //    "path": "Contractors",
                //    "subMenu": null
                //}
            ]
        }
    ];
    gridcount = 8;
    enableMenu = [0, 2, 3];
    selIds = new Array();
    public totalItems: number = 30;
    public itemsPerPage: number = 10;
    pageTitle: string;
    btnName: string;
    fieldDetailsAdd1: IField[];
    action: string;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    refreshgrid;
    UserCategory: number = 0
    pageIndex: number = 0;
    SiteId: any;
    UserGroupName: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    inputItems: IGrid = { dataKey: "Id", selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single" };
    deleteMessage: string;
    isSiteAdmin: boolean;
    types = true;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private genFun: GeneralFunctions) {
    }

    ngOnInit(): void {
        var contextObj = this;
        this.administrationService.getUserGroupsFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            contextObj.getUserGroup();
            contextObj.administrationService.CheckIsSiteLevelAdmin(1).subscribe(function (result) {
                contextObj.isSiteAdmin = result == 1 ? true : false;
            });
        });
        this.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var accesibleModules = resultData["Data"];
            if (contextObj.menuData[3]["subMenu"] != null)
            {
                var menu1 = new Array<SubMenuArray>();
                menu1 = contextObj.menuData[3]["subMenu"];
                for (let c = 0; c < accesibleModules.length; c++)
                {
                    if (accesibleModules[c].ModuleId == 5) {
                        menu1.push({
                            id: 5,
                            title: "Employees",
                            image: "Employees",
                            path: "Employees",
                            subMenu: null
                        });
                    }
                    if (accesibleModules[c].ModuleId == 9) {
                        menu1.push({
                            id: 6,
                            title: "Technicians",
                            image: "Technicians",
                            path: "Technicians",
                            subMenu: null
                        });
                        menu1.push({
                            id: 7,
                            title: "Contractors",
                            image: "Contractors",
                            path: "Contractors",
                            subMenu: null
                        });
                    }
                }
            }
        });
    }

    getUserGroup() {
        var contextObj = this;
        this.administrationService.getUserGroupsData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            contextObj.changeEnableMenu();
        });
    }
    public changeEnableMenu() {
        var contextObj = this;
        if (contextObj.totalItems == 0) {
            contextObj.enableMenu = [0];
            contextObj.notificationService.ShowToaster("No User Groups exist", 2);
        }
        else {
            contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7];
        }
    }

    onCardSubmit(event: any) {
        console.log("selectedids", this.selIds);
        if (event["dataKeyValue"]) {
            this.notificationService.ShowToaster("User Group updated", 3);
        }
        else {
            this.notificationService.ShowToaster("User Group added", 3);
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
        else if (event.value == 4) // add users to user group
        {
            this.iDrawingsuserClick();
        }
        else if (event.value == 5) // add users to user group
        {
            this.employeeClick();
        }
        else if (event.value == 6) // add users to user group
        {
            this.technicianClick();
        }
        else if (event.value == 7) // add users to user group
        {
            this.contractorClick();
        }
    }

    public onSort(event: any) {
        var contextObj = this;
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        contextObj.getUserGroup();
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        contextObj.getUserGroup();
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New User Group";
        this.administrationService.loadUserGroupAddEdit(0, 1).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd1 = resultData["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;           
                if (contextObj.isSiteAdmin == true)
                {
                    contextObj.fieldDetailsAdd1[3].IsMandatory = true;
                    if (contextObj.fieldDetailsAdd1[3]
                        && contextObj.fieldDetailsAdd1[3].LookupDetails
                        && contextObj.fieldDetailsAdd1[3].LookupDetails.LookupValues
                        && contextObj.fieldDetailsAdd1[3].LookupDetails.LookupValues.length == 1)
                    {
                        contextObj.fieldDetailsAdd1[3].IsEnabled = false;
                    }
                }
        });
        
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit User Group";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.administrationService.loadUserGroupAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    if (contextObj.isSiteAdmin == true)
                    {
                        contextObj.fieldDetailsAdd1[3].IsMandatory = true;
                        if (contextObj.fieldDetailsAdd1[3]
                            && contextObj.fieldDetailsAdd1[3].LookupDetails
                            && contextObj.fieldDetailsAdd1[3].LookupDetails.LookupValues
                            && contextObj.fieldDetailsAdd1[3].LookupDetails.LookupValues.length == 1)
                        {
                            contextObj.fieldDetailsAdd1[3].IsEnabled = false;
                        }
                    }
                });
            }
        }
    }
    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            //this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Service?", "Yes");
            this.administrationService.checkUserGroupInUse(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.deleteMessage = "Selected User Group is in use. Are you sure you want to delete the selected User Group?";
                    contextObj.showSlide = !contextObj.showSlide;
                }
                else {
                    contextObj.deleteMessage = "Are you sure you want to delete the selected User Group?";
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    }
    public iDrawingsuserClick() {      
        this.pageTitle = "iDrawings Users";
        this.UserCategory = 1;
        this.action = "User";
        this.SiteId = this.inputItems.rowData["SiteId"];
        this.UserGroupName = this.inputItems.rowData["User Group Name"];
        this.splitviewInput.showSecondaryView = true;
    }
    public employeeClick() {
        this.pageTitle = "Employees";
        this.UserCategory = 2;
        this.action = "User";
        this.SiteId = this.inputItems.rowData["SiteId"];
        this.UserGroupName = this.inputItems.rowData["User Group Name"];
        this.splitviewInput.showSecondaryView = true;
    }
    public technicianClick() {
        this.pageTitle = "Technicians";
        this.UserCategory = 3;
        this.action = "User";
        this.SiteId = this.inputItems.rowData["SiteId"];
        this.UserGroupName = this.inputItems.rowData["User Group Name"];
        this.splitviewInput.showSecondaryView = true;
    }
    public contractorClick() {
        this.pageTitle = "Contractors";
        this.UserCategory = 4;
        this.action = "User";
        this.SiteId = this.inputItems.rowData["SiteId"];
        this.UserGroupName = this.inputItems.rowData["User Group Name"];
        this.splitviewInput.showSecondaryView = true;
    }

    okDelete(event: any) {
        this.deleteUserGroup();
        this.showSlide = !this.showSlide;
    }
    deleteUserGroup() {
        var contextObj = this;
        this.administrationService.DeleteUserGroup(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.genFun.updateDataSource(contextObj.sourceData, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.sourceData = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected User Group deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected User Group in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }
    onDelete(e: Event) {
        this.deleteClick();
    }
    closeSlideDialog(value: any) {
        this.showSlide = false;
    }
    submitReturn(event: any) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.genFun.updateDataSource(contextObj.sourceData, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.sourceData = retUpdatedSrc["itemSrc"];
            contextObj.changeEnableMenu();
        } else if (this.action == "edit") {
            retUpdatedSrc = this.genFun.updateDataSource(contextObj.sourceData, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = false;
    }
    cancelClick(event: Event) {
        this.showSlide = false;
    }
}
export interface SubMenuArray {
    id: number;
    title: string;
    image: string;
    path: string;
    subMenu: string;
}