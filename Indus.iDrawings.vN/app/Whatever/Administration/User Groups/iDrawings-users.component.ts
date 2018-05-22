import { Component, OnChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { IField } from  '../../../Framework/Models/Interface/IField';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {UserGroupNewUserComponent} from './usergroup-newusers.component'


@Component({
    selector: 'iDrawings-users',
    templateUrl: './app/Views/Administration/User Groups/iDrawings-users.component.html',
    directives: [Notification, GridComponent, SubMenu, Sorting, PagingComponent, TabsComponent, TabComponent, SlideComponent, UserGroupNewUserComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    inputs: ["selectedIds", "UserCategoryId", "SiteId","UserGroupName"],
    encapsulation: ViewEncapsulation.None
})

export class iDrawingsUsersComponent {

    fields: IField[];
    itemsSource: any[];
    errorMessage: string;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '', sortDir: 'ASC', selectioMode: "single"  };
    pageIndex: number = 0;
    selectedIds: any;
    UserCategoryId: any;
    SiteId: any;
    totalItems: number;
    itemsPerPage: number;
    selectedTab: number = 0;
    newUserTab: boolean = false;
    deleteIndex: number = 0;
    types = true;
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
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }
    ];
    enableMenu = [0, 1];
    localselection: number;
    position: any = "top-right";
    showSlide: boolean = false;
    UserGroupName: string;
    tabTitle: string;
    selectTabTitle: string;
    deleteMsg: string;
    countTitle: string;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        this.administrationService.getiDrawingsUsersFields().subscribe(function (resultData) {
            if (contextObj.UserCategoryId == 1) {
                resultData["Data"][1].FieldLabel = "User Name";
                contextObj.tabTitle = "iDrawings Users";
                contextObj.selectTabTitle = "Select iDrawings Users";
                contextObj.inputItems.sortCol = "[User Name]";
                contextObj.countTitle = "iDrawings User(s)";
            }
            if (contextObj.UserCategoryId == 2) {
                resultData["Data"][1].FieldLabel = "Employee Name";
                resultData["Data"][2].FieldLabel = "Employee Code";
                contextObj.tabTitle = "Employees";
                contextObj.selectTabTitle = "Select Employees";
                contextObj.inputItems.sortCol = "[Employee Name]";
                contextObj.countTitle = "Employee(s)";
            }
            if (contextObj.UserCategoryId == 3) {
                resultData["Data"][1].FieldLabel = "Technician Name";
                resultData["Data"][2].FieldLabel = "Trade";
                contextObj.tabTitle = "Technicians";
                contextObj.selectTabTitle = "Select Technicians";
                contextObj.inputItems.sortCol = "[Technician Name]";
                contextObj.countTitle = "Technician(s)";
            }
            if (contextObj.UserCategoryId == 4) {
                resultData["Data"][1].FieldLabel = "Contractor Name";
                resultData["Data"][2].FieldLabel = "Trade";
                contextObj.tabTitle = "Contractors";
                contextObj.selectTabTitle = "Select Contractors";
                contextObj.inputItems.sortCol = "[Contractor Name]";
                contextObj.countTitle = "Contractor(s)";
            }
            contextObj.fields = resultData["Data"];
            contextObj.getUserList();
        });
    }
    getUserList() {
        var contextObj = this;
        if (this.SiteId == null)
            this.SiteId = 0;
        this.administrationService.getiDrawingsUsersData(this.selectedIds, this.UserCategoryId, this.SiteId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems == 0) {
                switch (contextObj.UserCategoryId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("No iDrawings Users added to the selected User Group", 2);
                        break;
                    case 2:
                        contextObj.notificationService.ShowToaster("No Employees added to the selected User Group", 2);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("No Technicians added to the selected User Group", 2);
                        break;
                    case 4:
                        contextObj.notificationService.ShowToaster("No Contractors added to the selected User Group", 2);
                        break;
                }
                contextObj.enableMenu = [0];
            }
            else {
                contextObj.enableMenu = [0,1];
            }
        });
    }
    getSelectedTab(event: any) {
        this.selectedTab = event[0];
        var contextObj = this;
        if (this.selectedTab == 0) {
            if (event[2].children[0].children[1]) {

                event[2].children[0].children[1].style.visibility = "hidden";
                event[2].children[0].children[1].children[1].style.visibility = "hidden"
            }
        } else {
            if (event[2].children[0].children[1]) {

                event[2].children[0].children[1].style.visibility = "visible";
                event[2].children[0].children[1].children[1].style.visibility = "visible"
            }
        }
    }
    onTabClose(event: any) {
        this.newUserTab = false;
        this.selectedTab = event[0];
    }
    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.localselection = 1;
                contextObj.newUserTab = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;
                }, 50);
                break;
            case 1:
                this.deleteUsers(this.inputItems.selectedIds);
                break;
        }
    }
    public deleteUsers(userIds) {
        if (userIds.length == 1) {
            this.showSlide = !this.showSlide;
            switch (this.UserCategoryId) {
                case 1:
                    this.deleteMsg = "Are you sure you want to delete the selected iDrawings User from the User Group?";
                    break;
                case 2:
                    this.deleteMsg = "Are you sure you want to delete the selected Employee from the User Group?";
                    break;
                case 3:
                    this.deleteMsg = "Are you sure you want to delete the selected Technician from the User Group?";
                    break;
                case 4:
                    this.deleteMsg = "Are you sure you want to delete the selected Contractor from the User Group?";
                    break;
            }
        }
        else if (userIds.length < 1) {
            switch (this.UserCategoryId) {
                case 1:
                    this.notificationService.ShowToaster("Select a User", 2);
                    break;
                case 2:
                    this.notificationService.ShowToaster("Select an Employee", 2);
                    break;
                case 3:
                    this.notificationService.ShowToaster("Select a Technician", 2);
                    break;
                case 4:
                    this.notificationService.ShowToaster("Select a Contractor", 2);
                    break;
            }
        }
        else {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
    }
    okDelete(event: any) {
        var contextObj = this;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 406,
            Value: this.UserCategoryId.toString()
        });
        fieldobj.push({
            ReportFieldId: 2807,
            Value: this.selectedIds.toString()
        });
        for (let c = 0; c < this.inputItems.selectedIds.length; c++) {
            fieldobj.push({
                ReportFieldId: 443,
                Value: this.inputItems.selectedIds[c].toString()
            });
        }
        this.showSlide = !this.showSlide;
        var test = JSON.stringify(fieldobj);
        this.administrationService.DeleteUserGroupUsers(JSON.stringify(fieldobj)).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                switch (contextObj.UserCategoryId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("iDrawings User deleted from the selected User Group", 3);
                        break;
                    case 2:
                        contextObj.notificationService.ShowToaster("Employee deleted from the selected User Group", 3);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Technician deleted from the selected User Group", 3);
                        break;
                    case 4:
                        contextObj.notificationService.ShowToaster("Contractor deleted from the selected User Group", 3);
                        break;
                }
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected User(s) in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }
    closeSlideDialog(event: any) {
        this.showSlide = event.value;
    }
    cancelClick(event: any) {
        this.showSlide = false;
    }
    submitSuccess(event) {
        var contextObj = this;
        if (event["status"] == "success") {
            contextObj.getUserList();
            contextObj.selectedTab = 0;
            contextObj.deleteIndex = contextObj.deleteIndex + 1;
            contextObj.newUserTab = false;
        }
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getUserList();
    }


    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getUserList();
    }
    updateiDrawingsUsers() {
        this.administrationService.updateiDrawingsUsers(this.itemsSource);
        this.notificationService.ShowToaster("iDrawings User(s) added to the selected User Group", 3);
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}