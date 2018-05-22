import { Component, Output, OnInit, Input } from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from '../../../framework/models/interface/ifield';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { CustomCheckBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { EmployeeService } from '../../../Models/Employee/employee.services';
import { AdministrationService } from '../../../Models/Administration/administration.service'

@Component({
    selector: 'employee-to-workOrderUser',
    templateUrl: 'app/Views/Employee/General Settings/employee-to-workOrderUser.html',
    directives: [GridComponent, SubMenu, CustomCheckBoxComponent, PagingComponent, searchBox],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, EmployeeService, AdministrationService]
})

export class EmployeeToWorkOrderUserComponent implements OnInit {
    fieldObject: IField[];
    itemsSource: any[];
    totalItems: number = 0;
    pageIndex: number = 0;
    sortCol: string = "[Employee Name]";
    sortDir: string = "ASC";
    public keyWordLookup: any[];  
    KeywordFieldObject: any;
    loadSearch: any;
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    showSearchFilter: any;
    txtBxComment: IField;
    isBtnVisible: boolean = true;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, isHeaderCheckBx: true, sortCol: "[Employee Name]", sortDir: "ASC", selectedIds: [], allowAdd: false };

    constructor(private employeeService: EmployeeService, private notificationService: NotificationService, private generFun: GeneralFunctions, private administrationService: AdministrationService) { }

    ngOnInit() {
        var contextObj = this;
        this.employeeService.getEmployeeToWorkOrderUserFields().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            contextObj.txtBxComment = resultData["Data"].find(function (el) { return el.ReportFieldId === 874; });
            contextObj.inputItems.isHeaderCheckBx = true;
            contextObj.dataLoad(0);  
            contextObj.loadKeywordSearch();
        });
    }

    public dataLoad(target: any) {
        var contextObj = this;
        contextObj.employeeService.getEmployeeToWorkOrderUserList(contextObj.pageIndex, contextObj.sortCol, contextObj.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            } else {
                if (target == 1) {
                    contextObj.notificationService.ShowToaster("No Employees exist for selected filter condition", 2);
                } else {
                    contextObj.notificationService.ShowToaster("No Employees having email id exist", 2);
                }
            }
        });
    }
    
    private loadKeywordSearch() {
        var contextObj = this;
        contextObj.employeeService.getKeywordSearchField(587).subscribe(function (resultData) {
            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            contextObj.keyWordLookup = resultData["FieldBinderList"];
        });
    }

    onloadSearch(event: any) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.itemsSource = [];
        this.pageIndex = 0;
        var contextObj = this;
        contextObj.dataLoad(1);
    }

    Clear(event: any) {
        this.filter = "";
        this.IsKeyWordSearch = 0;
        var contextObj = this;
        contextObj.dataLoad(1);
    }

    Submit(event: any) {
        this.showSearchFilter = [];
    }

    updateEmployeeToWorkOrderUser(event: any) {
        var contextObj = this;
        var hasSelectedIds: boolean = false;
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true && contextObj.itemsSource[i]["Select All"] != undefined) {
                hasSelectedIds = true;
                arrayList.push({
                    ReportFieldId: 939,
                    Value: contextObj.itemsSource[i]["Id"].toString()
                });
            } 
        }
        if (hasSelectedIds == true) {
            this.employeeService.postSubmitEmployeeToWorkOrderUser(JSON.stringify(arrayList)).subscribe(function (resultData) {
                if (resultData.StatusId == 1 && resultData.ServerId > 0) {
                    contextObj.notificationService.ShowToaster("Conversion of Employee to Work Order User updated", 3);
                    contextObj.txtBxComment.IsVisible = true;
                    contextObj.itemsSource = JSON.parse(resultData.Data);
                    contextObj.isBtnVisible = false;
                    contextObj.fieldObject.find(function (el) { return el.ReportFieldId === 459; }).IsVisible = false;                        
                } else if (resultData.ServerId == -2) {
                    contextObj.notificationService.ShowToaster("Maximum allowed Work Order users for the customer already created", 2);
                } else if (resultData.ServerId == -4){
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            });
        } else {
            contextObj.notificationService.ShowToaster("Select an Employee", 2);
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string; 
}

