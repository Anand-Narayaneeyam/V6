import { Component, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { IField} from '../../../framework/models/interface/ifield';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { CustomCheckBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';

@Component({

    selector: 'usergroup-newusers',
    templateUrl: 'app/Views/Administration/User Groups/usergroup-newusers.component.html',
    directives: [GridComponent, SubMenu, CustomCheckBoxComponent, PagingComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions],
    inputs: ['UserCategoryId', 'UserGroupId']
})

export class UserGroupNewUserComponent implements AfterViewInit {
    target: number;
    equipmentId: number;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    errorMessage: string;
    fieldObject: IField[];
    itemsSource: any[];
    //filterByEmployeeLocation: any;
    UserCategoryId: any;
    UserGroupId: any;
    objectCategoryId: any;
    equipmentTypeId: any;
    isFilterLocation: boolean = false;
    isDdlEquipmentTypeLoaded: boolean = false;
    equipmentIds = new Array<IdsArray>();
    resourceWithFilterIds = new Array<IdsArray>();
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "", sortDir: "ASC", selectedIds: [], allowAdd: false };

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions) {
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.administrationService.getUserGroupNewUserFields().subscribe(function (resultData) {
            if (contextObj.UserCategoryId == 1) {
                resultData["Data"][2].FieldLabel = "User Name";
                contextObj.inputItems.sortCol = "[User Name]";
            }
            if (contextObj.UserCategoryId == 2) {
                resultData["Data"][2].FieldLabel = "Employee Name";
                resultData["Data"][3].FieldLabel = "Employee Code";
                contextObj.inputItems.sortCol = "[Employee Name]";
            }
            if (contextObj.UserCategoryId == 3) {
                resultData["Data"][2].FieldLabel = "Technician Name";
                resultData["Data"][3].FieldLabel = "Trade";
                contextObj.inputItems.sortCol = "[Technician Name]";
            }
            if (contextObj.UserCategoryId == 4) {
                resultData["Data"][2].FieldLabel = "Contractor Name";
                resultData["Data"][3].FieldLabel = "Trade";
                contextObj.inputItems.sortCol = "[Contractor Name]";
            }
            contextObj.fieldObject = resultData["Data"];
            contextObj.getUserGroupNewUserData();
        });
    }

    getUserGroupNewUserData()
    {
        var contextObj = this;
        this.administrationService.getUserGroupNewUserData(this.UserCategoryId, this.UserGroupId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, '').subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            if (contextObj.totalItems == 0)
                switch (contextObj.UserCategoryId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("No iDrawings Users exist", 2);
                        break;
                    case 2:
                        contextObj.notificationService.ShowToaster("No Employees exist", 2);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("No Technicians exist", 2);
                        break;
                    case 4:
                        contextObj.notificationService.ShowToaster("No Contractors exist", 2);
                        break;
                }
        });
    }

    insertUserList(event:any) {
        var contextObj = this;
        var selectedRowIds: string = "";
        var arrayList = new Array<ReportFieldArray>();
        if (contextObj.itemsSource == undefined || contextObj.itemsSource.length == 0) {
            switch (contextObj.UserCategoryId) {
                case 1:
                    contextObj.notificationService.ShowToaster("No iDrawings Users exist", 2);
                    break;
                case 2:
                    contextObj.notificationService.ShowToaster("No Employees exist", 2);
                    break;
                case 3:
                    contextObj.notificationService.ShowToaster("No Technicians exist", 2);
                    break;
                case 4:
                    contextObj.notificationService.ShowToaster("No Contractors exist", 2);
                    break;
            }
            return;
        }
        else {
            var hasSelectedIds: boolean = false;
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 2806,
                        Value: contextObj.itemsSource[i].Id.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                arrayList.push({
                    ReportFieldId: 406,
                    Value: this.UserCategoryId.toString()
                });
                arrayList.push({
                    ReportFieldId: 2807,
                    Value: this.UserGroupId.toString()
                });
                var test = JSON.stringify(arrayList);
                this.administrationService.UpdateUserGroupUsers(JSON.stringify(arrayList)).subscribe(function (resultData) {
                    if (resultData["Data"].StatusId > 0) {
                        switch (contextObj.UserCategoryId) {
                            case 1:
                                contextObj.notificationService.ShowToaster("iDrawings User(s) added to the selected User Group", 3);
                                break;
                            case 2:
                                contextObj.notificationService.ShowToaster("Employee(s) added to the selected User Group", 3);
                                break;
                            case 3:
                                contextObj.notificationService.ShowToaster("Technician(s) added to the selected User Group", 3);
                                break;
                            case 4:
                                contextObj.notificationService.ShowToaster("Contractor(s) added to the selected User Group", 3);
                                break;
                        }                            
                        contextObj.submitSuccess.emit({ status: "success", returnData: resultData["Data"] });
                    }
                });
            }
            else {
                switch (contextObj.UserCategoryId) {
                    case 1:
                        contextObj.notificationService.ShowToaster("Select an iDrawings User", 2);
                        break;
                    case 2:
                        contextObj.notificationService.ShowToaster("Select an Employee", 2);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Select a Technician", 2);
                        break;
                    case 4:
                        contextObj.notificationService.ShowToaster("Select a Contractor", 2);
                        break;
                }               
            }
        }
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.getUserGroupNewUserData();
    }

   
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.getUserGroupNewUserData();
    }
}

export interface IdsArray {
    Id: number;
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}