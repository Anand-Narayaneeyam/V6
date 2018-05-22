import {Component, OnInit, Output, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, EventEmitter, Input } from '@angular/core';
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
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';


@Component({
    selector: 'unassignedEmployeeList',
    templateUrl: 'app/Views/Employee/Data/unassignedEmployeeList.html',
    providers: [EmployeeService, SortHelper, NotificationService, ConfirmationService, GeneralFunctions, AdministrationService, ExportToExcel],
    inputs: ['action', 'dataKey', 'menuaccess', 'returnData', 'fieldObject', 'attachmentSuccess', 'unAssignedEmpResourceCount', 'unAssignedEmployeeId', 'multipleEditChange'],
    directives: [GridComponent, SlideComponent, PagingComponent, Notification, searchBox, ConfirmationComponent, Analytics]

})

export class UnassignedEmployeeListComponent {
    @Input() pageTarget: number;
    @Input() assignedEmpIds: number[];
    @Input() Targetforstyle;
    @Input() updateEmpData: any[];
    gridHeight: any = "100%";
    disable = false;
    success: any;
    showSlide = false;
    showdeletionSlide = false;
    position = "top-right";
    pageIndex: number = 0;
    unAssignedEmployeeId: any;
    unAssignedEmpResourceCount: any;
    @Output() updateUnassignedEmployeeSelectedId = new EventEmitter();
    @Output() emitMenu = new EventEmitter();
    differ: any;
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
    dataKey: any;
    itemsSource: any[];
    fieldObject: IField[];
    public totalItems: number;// = 1000;
    public itemsPerPage: number;// = 200;
    //inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: '[Employee Code]', sortDir: 'ASC', selectioMode: 'single' };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: '[Employee Code]', allowAdd: false, allowEdit: false, sortDir: 'ASC', showContextMenu: true};

    public keyWordLookup: any[];
    action: string;
    id: any;
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    advancelookup: IField[];
    KeywordFieldObject: any;
    isSmartSearch: boolean = false;
    refreshgrid;
    height: string = "100%";
    Stylename = "";
    exportDataSource: any;
    arrHighlightRowIds = [];
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;

    constructor(private employeeService: EmployeeService, private _sortHelper: SortHelper, private differs: KeyValueDiffers, private _notificationService: NotificationService, private confirmationService: ConfirmationService, private generFun: GeneralFunctions, private exportObject: ExportToExcel, private administrationService: AdministrationService) {
        this.differ = differs.find({}).create(null);
        var contextobj = this;
        setTimeout(function () {
            contextobj.keyWordLookup = contextobj.employeeService.getUnassingedEmployeeMainKeyWordLookUp();
        }, 3000);
    }
    AddChange(added: any) {
        //var lastpage = Math.round(this.totalItems / this.itemsPerPage);
        //this.administrationService.sitePaging(lastpage, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
        var contextObj = this;
        //contextObj.arrHighlightRowIds = [];
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
    ngOnInit() {
        var contextObj = this;
        // this.dataKey = ["Site FieldId", "Building FieldId", "Floor FieldID"];
        this.dataKey = ["Id"]
        //his.employeeService.getUnassignedEmployeeColumnData().subscribe(resultData => this.fieldObject = resultData["Data"]);
        if (this.pageTarget == 1) {
            this.isSmartSearch = true;
        }
        this.loadData();

        this.employeeService.getunassignedEmployeeKeywordField().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            }
        });
        switch (contextObj.Targetforstyle) {
            case 1:
                contextObj.Stylename = "search-containerInline";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 220;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }    
                break;
            case 2:
                contextObj.Stylename = "search-containerInlineforplace";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 260;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }    
                break;
            case 3:
                contextObj.Stylename = "search-containerInlinefromgrid";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 230;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }    
                break;
            default:
                contextObj.Stylename = "search-container";
        }
    }

    public loadData() {
        var contextObj = this;
        this.employeeService.getUnassignedEmployeeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["DataCount"]);
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                if (contextObj.totalItems == 0) {
                    contextObj.disable = true;
                    contextObj._notificationService.ShowToaster("No Employees exist", 2);
                }
                if (contextObj.totalItems > 100)
                    contextObj.height = "calc(100% - 45px)";
                contextObj.itemsPerPage = JSON.parse(resultData["RowsPerPage"]);
            }
        });
    }

    advanceSearch() {
        var contextObj = this;
        this.employeeService.getunassignedEmployeeAdvnceSearchLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"].filter(function (el) {
                    if (el.FieldId == 604 || el.FieldId == 605 || el.FieldId == 603 || el.FieldId ==596) {
                        return false
                    }
                    else {
                        return true
                    }
                });
            }
        });
    }

    ngDoCheck() {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var unassignedEmployeeId = this.inputItems.selectedIds;
            if (this.totalItems != 0) {
                this.updateUnassignedEmployeeSelectedId.emit({
                    unassignedEmployeeId, RowData: this.inputItems.rowData, Count: this.totalItems
                })
            }
        }
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;

        if (changes["multipleEditChange"] && typeof (changes["multipleEditChange"]["previousValue"]) == 'boolean' && changes["multipleEditChange"]["currentValue"] != changes["multipleEditChange"]["previousValue"]) {
            this.loadData();
        }
        if (changes["updateEmpData"] && changes["updateEmpData"]["currentValue"] && this.updateEmpData && this.updateEmpData.length > 0) {
            this.updateEmpDataInGrid();
        }
        if (changes["attachmentSuccess"] && changes["attachmentSuccess"]["currentValue"] != undefined) {
            contextObj.refreshgrid = [];

            //console.log("attachment", changes["attachmentSuccess"]["currentValue"].status);
            var g = changes["attachmentSuccess"]["currentValue"].status;

            var context = this;
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
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);

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
        if (changes["action"] && changes["action"]["currentValue"] == "employeeAssigned") {
            this.assignEmployeeSuccess();
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
        if ((changes["unAssignedEmpResourceCount"] && changes["unAssignedEmpResourceCount"]["currentValue"] != undefined) ||
            (changes["unAssignedEmployeeId"] && changes["unAssignedEmployeeId"]["currentValue"] != undefined && changes["unAssignedEmployeeId"]["currentValue"] != -1)) { // Resource Count
            if (contextObj.itemsSource != undefined) {
                contextObj.refreshgrid = [];
                var dataList = contextObj.itemsSource.find(function (item) {
                    return item.Id === contextObj.unAssignedEmployeeId;
                });
                dataList["Resource Count"] = contextObj.unAssignedEmpResourceCount.toString();
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                //var updatedData = new Array();/*To notify the watcher about the change*/
                //updatedData = updatedData.concat(contextObj.itemsSource);
                //contextObj.itemsSource = updatedData;
            }
        }
        if (changes["action"] && changes["action"]["currentValue"] == "unassignedemployeeexport") {
            // debugger
            var context = this;
            if (context.inputItems.selectedIds.length > 1) {
                context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
                context.exportObject.ExportData(context.exportDataSource, context.fieldObject, "UnassignedEmployees", function (retCode) {
                    if (retCode == 0) {
                        context._notificationService.ShowToaster("Employees data exported", 3);
                    }
                    else { context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
                });
            }
            else {
                var input = context.employeeService.getUnassignedEmployeeDataExport(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, context.fieldObject, "UnassignedEmployees", context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch, true);

                // context.exportDataSource = resultData["Data"]["FieldBinderData"];
                context.exportObject.ExportDataFromServer(input, 3, "UnassignedEmployees", function (retCode) {
                    if (retCode == 0) {
                        context._notificationService.ShowToaster("Employees data exported", 3);
                    }
                    else { context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
                    // });
                });
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
            if (index != -1) {
                    this.itemsSource.splice(index, 1);
            }
        }
        this.refreshgrid = this.refreshgrid.concat([true]);
    }
    okDelete(event: any) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        this.employeeService.CheckEmployeeStatus(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                var strEmpCheck = resultData["Data"]
                if (strEmpCheck == 0 || (strEmpCheck == 1) || (strEmpCheck == 2) || (strEmpCheck == 4) || (strEmpCheck == 5) || (strEmpCheck == 6)) {
                    contextObj.employeeService.getSupervisorCount(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            //console.log(resultData["Data"]["FieldBinderData"])
                            var strSuperVisorCount = resultData["Data"]["FieldBinderData"]
                            if (strSuperVisorCount > 0)
                                contextObj.showdeletionSlide = !contextObj.showdeletionSlide;
                            else
                                contextObj.DeleteEmployee();
                            //contextObj._notificationService.ShowToaster("Selected employee is a supervisor. Do you wish to continue with deletion?",2)
                        }
                    });
                        
                }
                else
                    contextObj._notificationService.ShowToaster("The selected Employee is linked to other functions, cannot be deleted", 2);
            }
        })       
    }
    clearEmpFromGrid(empId,target) {
        var contextObj = this;
        function findEntity(entity) {
            return entity.Id === empId;
        }
        contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
        var updatedList = new Array();/*To notify the watcher about the change*/
        updatedList = updatedList.concat(contextObj.itemsSource);
        contextObj.itemsSource = updatedList;
        contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
        if(target==1)
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
    }
    assignEmployeeSuccess() {
        for (var empId of this.assignedEmpIds)
            this.clearEmpFromGrid(empId,2);
        this.emitMenu.emit({ TotalItems: this.totalItems });
    }
    okSuperVisorDelete(event: any) {
        var contextObj = this;
        this.showdeletionSlide = !this.showdeletionSlide;
        this.DeleteEmployee();
    }
    DeleteEmployee() {
        var contextObj = this;
        //function findEntity(entity) {
        //    return entity.Id === contextObj.inputItems.selectedIds[0];
        //}
        this.employeeService.submitUnassignedEmployeeDelete(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                    //contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                    //var updatedList = new Array();/*To notify the watcher about the change*/
                    //updatedList = updatedList.concat(contextObj.itemsSource);
                    //contextObj.itemsSource = updatedList;
                    //contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                    //contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                    contextObj.clearEmpFromGrid(contextObj.inputItems.selectedIds[0],1);
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Employees exist", 2);
                    }
                    contextObj._notificationService.ShowToaster("Employee deleted", 3);

                }
            }
        });}
    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.employeeService.getUnassignedEmployeeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
            }
        });
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.employeeService.unassignedEmployeePaging(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
            }
        });
    }

    RowUpdate(event: any) {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds
        this.employeeService.submitinlineUnassignedEmployeeEdit(event, this.id).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee updated", 3);
                    contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0])
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    contextObj.itemsSource.pop();
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == 0) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }
                    if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Email is already in use", 5);
                    }
                }
            }
        });
        //this.employeeService.submitUnassignedEmployeeEdit(event);
        this._notificationService.ShowToaster("Employee updated", 3);
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
        this.employeeService.submitinlineUnassignedEmployeeAdd(JSON.stringify(temp)).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
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
                    } if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Email is already in use", 5);
                    }

                }
            }
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
        this.employeeService.unassignedEmployeeKeywordSeach(event.value, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Employees exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            }
        });
    }
    Clear(event: any) {
        //console.log('Entered Clear');
    }
    Submit(event: any) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        this.employeeService.unassignedEmployeeAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Employees exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            }
        });
    }
    cancelClick(value: any, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showdeletionSlide = value.value;

    }
    closeSlideDialog(value: any, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showdeletionSlide = value.value;

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
            this.analyticsInput.pageTarget = 3;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = 130;
            this.analyticsInput.ParentFormId = 127;
            this.showAnalytics = true;
        }
    }
    closeAnalytics() {
        this.showAnalytics = false;
    }
}