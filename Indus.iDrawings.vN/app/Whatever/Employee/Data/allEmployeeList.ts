import {Component, OnInit, Output, SimpleChange, OnChanges, Input, DoCheck, KeyValueDiffers, EventEmitter } from '@angular/core';
import {NgControl} from '@angular/common';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../Framework/Models//Interface/IField'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {SortHelper} from '../../utils/sortHelper'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import {EmployeeService} from '../../../Models/Employee/employee.services';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';
import { CommonService } from '../../../models/common/common.service';
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';

@Component({
    selector: 'allEmployeeList',
    templateUrl: 'app/Views/Employee/Data/allEmployeeList.html',
    providers: [CommonService,EmployeeService, SortHelper, NotificationService, ConfirmationService,  ExportToExcel, AdministrationService],
    inputs: ['action', 'dataKey', 'menuaccess', 'returnData', 'fieldObject', 'attachmentSuccess','allEmpResourceCount','allEmployeeId','multipleEditChange','updateEmpData'],
    directives: [GridComponent, SlideComponent, PagingComponent, Notification, searchBox, ConfirmationComponent, Analytics]

})

export class AllEmployeeList {
    @Input() assignedEmpIds: number[];
    @Input() isQuerybuilder;
    @Input() buildarray: any;
    @Input() qResult: any;
    updateEmpData: any[];
    disable = false;
    id: any;
    allEmployeeId: any;
    allEmpResourceCount: any;
    showSlide = false;
    showdeletionSlide = false;
    position = "top-right";
    pageIndex: number = 0;
    @Output() updateAllEmployeeSelectedId = new EventEmitter();
    @Output() emitMenu = new EventEmitter();
    differ: any;
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
    dataKey: any;
    action: string;
    itemsSource: any[];
    fieldObject: IField[];
    refreshgrid;
    public totalItems: number;// = 1000;
    public itemsPerPage: number;// = 200;
    // inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: this.add, allowEdit: this.edit, sortCol: '[Employee Code]', sortDir: 'ASC', selectioMode: 'single' };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Employee Code]', sortDir: 'ASC', showContextMenu: true};
   
    public keyWordLookup: any[];
    success: any;
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    advancelookup: IField[];
    KeywordFieldObject: any;
    exportDataSource: any;
    arrHighlightRowIds = [];
    //@Output() onSearchInDrawing = new EventEmitter();
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;

    constructor(private commonService:CommonService,private employeeService: EmployeeService, private _sortHelper: SortHelper, private differs: KeyValueDiffers, private _notificationService: NotificationService, private confirmationService: ConfirmationService, private generFun: GeneralFunctions, private exportObject: ExportToExcel,private administrationService: AdministrationService) {
        this.differ = differs.find({}).create(null);
        var contextObj = this;
        setTimeout(function () {
            contextObj.keyWordLookup = contextObj.employeeService.getAllEmployeeSearchKeyWordLookup();
        }, 3000);
    }
    AddChange(added: any) {
        //var lastpage = Math.round(this.totalItems / this.itemsPerPage);
        //this.administrationService.sitePaging(lastpage, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
        var contextObj = this;
        this.itemsSource.unshift(added);
        var updatedData = new Array();/*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.itemsSource);
        this.itemsSource = updatedData;
        this.totalItems = this.generFun.updateTotalItems(this.totalItems, "add");
        this.emitMenu.emit({ TotalItems: this.totalItems });
        var addedId = added[this.inputItems.dataKey];
        setTimeout(function () {
            contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat([addedId]);
        }, 50);
    }
    EditChange(edited: any) {
        this.refreshgrid = [];
        var datakey = this.inputItems.dataKey;
        for (let i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i][datakey] == edited[datakey]) {
                this.itemsSource[i] = edited
                //var updatedData = new Array();/*To notify the watcher about the change*/
                //updatedData = updatedData.concat(this.itemsSource);
                //this.itemsSource = updatedData;
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
        }
    }

    advanceSearch() {
        var contextObj = this;
        this.employeeService.getAllEmployeeAdvnceSearchLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"].filter(function (el) {
                    if (el.FieldId == 604 || el.FieldId==605 || el.FieldId==603)
                    {
                        return false
                    }
                    else {
                        return true
                    }
                });
            }
        });
    }

    ngOnInit() {
        var contextObj = this;
        this.dataKey = ["Id"];
        //this.employeeService.getAllEmployeeColumnData().subscribe(resultData => this.fieldObject = resultData["Data"]);
        this.loadData(1);

        this.employeeService.getAllEmployeeKeywordField().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            }
        });
    }

    public loadData(onload) {
     
        var contextObj = this;
        if (contextObj.qResult) {
            if (onload == 1) {
            contextObj.itemsSource = JSON.parse(contextObj.qResult.FieldBinderData);
                contextObj.itemsPerPage = contextObj.qResult.RowsPerPage;
                contextObj.totalItems = contextObj.qResult.DataCount; }
            else {
                contextObj.commonService.QueryBuilderSeachResult(516, contextObj.buildarray, 5, 0, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol).subscribe(function (result) {
                   
                    contextObj.itemsSource = JSON.parse(result["FieldBinderData"]);
                    contextObj.totalItems = JSON.parse(result["DataCount"]);
                        contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                        if (contextObj.totalItems == 0) {
                            contextObj.disable = true;
                            contextObj._notificationService.ShowToaster("No Employees exist", 2);
                        }
                        contextObj.itemsPerPage = JSON.parse(result["RowsPerPage"]);
                  
                });
            }
        }

        else {
            this.employeeService.getAllEmployeeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                    contextObj.totalItems = JSON.parse(resultData["DataCount"]);
                    contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                    if (contextObj.totalItems == 0) {
                        contextObj.disable = true;
                        contextObj._notificationService.ShowToaster("No Employees exist", 2);
                    }
                    contextObj.itemsPerPage = JSON.parse(resultData["RowsPerPage"]);
                }
            });
        }
    }
    ngDoCheck() {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var allEmployeeId = this.inputItems.selectedIds;
            this.updateAllEmployeeSelectedId.emit({
                allEmployeeId, RowData: this.inputItems.rowData
            })
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var context = this;
        if (changes["multipleEditChange"] && typeof (changes["multipleEditChange"]["previousValue"]) == 'boolean' && changes["multipleEditChange"]["currentValue"] != changes["multipleEditChange"]["previousValue"]) {
            this.loadData(0);
        }
        if (changes["attachmentSuccess"] && changes["attachmentSuccess"]["currentValue"] != undefined) {
            context.refreshgrid = [];
            //console.log("attachment", changes["attachmentSuccess"]["currentValue"].status);
            var g = changes["attachmentSuccess"]["currentValue"].status;
            var selId = context.inputItems.selectedIds[0];
            if (selId != undefined) {
                context.itemsSource.find(function (item) {
                    if (item["Id"] == selId) {
                        switch (changes["attachmentSuccess"]["currentValue"].status) {
                            case "success":
                                if (item["Attachments"] == "None")
                                    item["Attachments"] = "0";
                                item["Attachments"] = (Number(item["Attachments"]) + 1).toString();
                                break;
                            case "delete":
                                item["Attachments"] = (Number(item["Attachments"]) - 1).toString();
                                if (item["Attachments"] == "0")
                                    item["Attachments"] = "0";
                                break;
                        }
                        return true;
                    } else
                        return false;
                });
                context.refreshgrid = context.refreshgrid.concat([true]);

                //var updatedData = new Array();/*To notify the watcher about the change*/
                //updatedData = updatedData.concat(context.itemsSource);
                //context.itemsSource = updatedData;

                // setTimeout(function () {

                // }, 100);
            }
        }

        if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            this.showSlide = !this.showSlide;
        }
        if (changes["updateEmpData"] && changes["updateEmpData"]["currentValue"] && this.updateEmpData && this.updateEmpData.length>0) {
            this.updateEmpDataInGrid();
        }
        if (changes["menuaccess"] && changes["menuaccess"]["currentValue"] != undefined) {
            for (let i = 0; i < changes["menuaccess"]["currentValue"].length; i++) {
                if (changes["menuaccess"]["currentValue"][i]["image"] == "Add")
                    this.add = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Edit")
                    this.edit = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Delete")
                    this.delete = true;

                //this.inputItems.allowAdd = this.add;
                //this.inputItems.allowEdit = this.edit;
            }
        }
        if (changes["action"] && changes["action"]["currentValue"] == "employeeAssigned") {
            this.assignEmployeeSuccess();
        }
        if (changes["returnData"] && changes["returnData"]["currentValue"] != undefined) {
            // let retUpdatedSrc;
            //console.log(changes["returnData"])
            if (this.action == 'add') {
                this.arrHighlightRowIds = [];
                var added = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (this.itemsSource)
                    this.AddChange(added);
            }
            else if (this.action == 'edit') {
                var edited = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (this.inputItems.selectedIds.length == 1) {
                    this.EditChange(edited);
                }
            }
        }
        if (changes["fieldObject"] && changes["fieldObject"]["currentValue"]) {
            this.fieldObject = changes["fieldObject"]["currentValue"];
        }

        if ((changes["allEmpResourceCount"] && changes["allEmpResourceCount"]["currentValue"] != undefined) ||
            (changes["allEmployeeId"] && changes["allEmployeeId"]["currentValue"] != undefined)) { // Resource Count
            context.refreshgrid = [];
            if (context.itemsSource != undefined) {
                var dataList = context.itemsSource.find(function (item) {
                    return item.Id === context.allEmployeeId;
                });
                dataList["Resource Count"] = context.allEmpResourceCount.toString();
                //var updatedData = new Array();/*To notify the watcher about the change*/
                //updatedData = updatedData.concat(context.itemsSource);
                //context.itemsSource = updatedData;
                context.refreshgrid = context.refreshgrid.concat([true]);
            }
        }
        if (changes["action"] && changes["action"]["currentValue"] == "allemployeeexport") {
            // debugger
            var context = this;
            if (context.inputItems.selectedIds.length > 1) {
                context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
                context.exportObject.ExportData(context.exportDataSource, context.fieldObject, "AllEmployees", function (retCode) {
                    if (retCode == 0) {
                        context._notificationService.ShowToaster("Employees data exported", 3);
                    }
                    else { context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
                });
            }
            else {
                
                var input = {};
                var target = 3;
                if (context.qResult) {
                    input = context.commonService.QueryBuilderSeachResultExport(516, context.buildarray, 5, 0, context.fieldObject, "AllEmployees", context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol);

                    target = 6;
                }
                else {
                    input = context.employeeService.getAllEmployeeDataExport(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.fieldObject, "AllEmployees", context.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch, true);
                }
                // context.exportDataSource = resultData["Data"]["FieldBinderData"];
                context.exportObject.ExportDataFromServer(input, target, "AllEmployees", function (retCode) {
                    if (retCode == 0) {
                        context._notificationService.ShowToaster("Employees data exported", 3);;
                    }
                    else { context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
                });
                //  });
            }
        }
    }
    updateEmpDataInGrid() {
        this.refreshgrid = [];
        var index;
        var empItem;
        for (var i = 0; i < this.updateEmpData.length; i++) {
            empItem = this.updateEmpData[i];
            index = this.itemsSource.findIndex(function (el) { return el["Id"] == empItem["Id"] });
            if (index != -1)
                this.itemsSource[index] = empItem;
        }
        this.refreshgrid = this.refreshgrid.concat([true]);
    }
    okDelete(event: any) {

        var contextObj = this;
        this.showSlide = !this.showSlide;
        //check the supervisor check 

        this.employeeService.CheckEmployeeStatus(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                var strEmpCheck = resultData["Data"]
                if (strEmpCheck != 0 && strEmpCheck != 3) {
                    if ((strEmpCheck == 1) || (strEmpCheck == 2) || (strEmpCheck == 4) || (strEmpCheck == 5) || (strEmpCheck == 6))
                        contextObj._notificationService.ShowToaster("The selected Employee is used in Move Projects", 2)
                    else
                        contextObj._notificationService.ShowToaster("The selected Employee is linked to other functions, cannot be deleted", 2);
                }
                else
                    contextObj.employeeService.getSupervisorCount(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            //console.log(resultData["Data"]["FieldBinderData"])
                            var strSuperVisorCount = resultData["Data"]["FieldBinderData"]
                            if (strSuperVisorCount > 0)
                                contextObj.showdeletionSlide = !contextObj.showdeletionSlide;
                            else
                                contextObj.DeleteEmployee();
                        }
                        //contextObj._notificationService.ShowToaster("Selected employee is a supervisor. Do you wish to continue with deletion?",2)
                    })
            }
        })

    }
    okSuperVisorDelete(event: any) {
        var contextObj = this;
        this.showdeletionSlide = !this.showdeletionSlide;
        this.DeleteEmployee();
    }
    assignEmployeeSuccess() {
        this.loadData(0);
        //for (var empId of this.assignedEmpIds)
        //    this.clearEmpFromGrid(empId);
    }
    clearEmpFromGrid(empId) {
        var contextObj = this;
        function findEntity(entity) {
            return entity.Id === empId;
        }
        contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
        var updatedList = new Array();/*To notify the watcher about the change*/
        updatedList = updatedList.concat(contextObj.itemsSource);
        contextObj.itemsSource = updatedList;
        contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
        contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
    }
    DeleteEmployee() {
        var contextObj = this;
        this.employeeService.submitAllEmployeeDelete(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
           // if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.clearEmpFromGrid(contextObj.inputItems.selectedIds[0]);
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Employees exist", 2);
                    }
                    contextObj._notificationService.ShowToaster("Employee deleted", 3);
                }
           // }
        });
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.employeeService.getAllEmployeeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
           // if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
          //  }
        });
        //var sortedData = new Array();/*To notify the watcher about the change*/
        //sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        //this.itemsSource = sortedData;


    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.employeeService.allEmployeePaging(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
           // if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
           /// }
        });
    }
    RowUpdate(event: any) {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds
        this.employeeService.submitinlienAllEmployeeEdit(event, this.id).subscribe(function (resultData) {
           // if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee updated", 3);
                    contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0])
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    // contextObj.itemsSource.pop();
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == 0) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }

                    if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Email is already in use", 5);
                    }
                }
          //  }
        });;
        //this._notificationService.ShowToaster("Employee updated", 3);
    }
    RowDelete(event: any) {
        //if (this.delete == true)
        //    this.showSlide = !this.showSlide;
    }
    RowAdd(event: any) {
        var contextObj = this;
        var temp = JSON.parse(event)
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 2991) {
                temp[i]["Value"] = "1";
                break;
            }
        }
        this.employeeService.submitinlineAllEmployeeAdd(JSON.stringify(temp)).subscribe(function (resultData) {
          //  if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"];
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee added", 3);
                    contextObj.itemsSource.pop();
                    contextObj.AddChange(JSON.parse(contextObj.success["Data"])[0])
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == 0) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }
                    if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Email is already in use", 5);
                    }
                }
            //}
        });
    }
    SaveAs(event: any) {
        //console.log('Entered Save As');
    }
    Delete(event: any) {
        //console.log('Entered Delete');
    }
    onloadSearch(event: any) {
        var contextObj = this;
        contextObj.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.employeeService.AllEmployeeKeywordSeach(event.value, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
           // if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Employees exist", 2);
                }
                else {
                    //if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0)
                        //contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: 5 });
                  
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
           // }
        });
    }
    Clear(event: any) {
        var contextObj = this;
        this.employeeService.getAllEmployeeAdvnceSearchLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
        });
    }
    Submit(event: any) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        this.employeeService.AllEmployeeAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
          //  if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Employees exist", 2);
                } else {
                    //if (contextObj.IsKeyWordSearch == 0 && contextObj.IsAdvanceSearch == 1)
                        //contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: 5 });
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            //}
        });
    }
  
    closeSlideDialog(value: any, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showdeletionSlide = value.value;

    }
    cancelClick(value: any, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showdeletionSlide = value.value;

    }

    allEmployeeResourceCount(event: any) {
        console.log("All Resource Count:", event);
    }
    onContextMenuOnClick(event: any) {       
        var temp: any = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = temp;
            this.analyticsInput.moduleId = 5;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = 102;
            this.analyticsInput.ParentFormId = 127;
            this.showAnalytics = true;
        }
    }
    closeAnalytics() {
        this.showAnalytics = false;
    }
}

