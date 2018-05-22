import {Component, OnInit,Input, Output, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, EventEmitter } from '@angular/core';
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
import {AdministrationService} from '../../../Models/Administration/administration.service';
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';

@Component({
    selector: 'assignedEmployeeList',
    templateUrl: 'app/Views/Employee/Data/assignedEmployeeList.html',
    providers: [EmployeeService, SortHelper, NotificationService, ConfirmationService, AdministrationService, ExportToExcel],
    inputs: ['action', 'dataKey', 'floorId', 'menuaccess', 'returnData', 'fieldObject', 'attachmentSuccess', 'assignedEmpResourceCount', 'assignedEmployeeId', 'multipleEditChange'],
    directives: [GridComponent, PagingComponent, SlideComponent, Notification, searchBox, ConfirmationComponent, Analytics]

})

export class AssignedEmployeeListComponent {
    @Input() SelectedEmployeeDetails: any[];
    @Input() pageTarget: number;
    @Output() updateAssignedEmployeeSelectedId = new EventEmitter();
    @Input() deAssignedEmpId: number;
    @Input() highlightRows: any[];
    @Input() Targetforstyle;
    @Input() assignedEmpsData: any[];
    @Input() updateEmpData: any[];
    gridHeight: any = "100%";
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
    differ: any;
    floorId: any;
    dataKey: any;
    assignedEmployeeId: any;
    assignedEmpResourceCount: any;
    itemsSource: any[];
    fieldObject: IField[];
    public totalItems: number = 1000;
    public itemsPerPage: number = 200;
    @Output() emitMenu = new EventEmitter();
    @Output() onDeleteAssignedEmployee = new EventEmitter();
//    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, sortCol: '[Employee Code]', sortDir: 'ASC', selectioMode: 'single' };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Employee Code]', sortDir: 'ASC', showContextMenu: true};    

    public keyWordLookup: any[];
    pageIndex: any = 0;
    action: string;
    showSlide: boolean = false;
    showdeletionSlide = false;
    id: any;
    success: any;
    position = "top-right";
    KeywordFieldObject: any;
    filter = "";
    advanceValue = "[]";
    advancelookup: IField[];
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    disable = false;
    isSmartSearch: boolean = false;
    height: string = "100%";
    refreshgrid;
    exportDataSource: any;
    Stylename = "";
    arrHighlightRowIds = [];
    @Output() onSearchInDrawing = new EventEmitter();
    totalRowData: number;
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;

    constructor(private employeeService: EmployeeService, private _sortHelper: SortHelper, private differs: KeyValueDiffers, private _notificationService: NotificationService, private confirmationService: ConfirmationService, private generFun: GeneralFunctions, private exportObject: ExportToExcel, private administrationService: AdministrationService) {
    
        this.differ = differs.find({}).create(null);
        var contextObj = this;
        setTimeout(function () {
            contextObj.employeeService.getAssignedEmployeeSearchKeyWordLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            }
            }); 
        }, 3000);
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
    AddChange(added: any) {
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
    ngOnInit() {
        debugger
        var contextObj = this;
        this.dataKey = ["Site FieldId", "Building FieldId"];
        if (this.pageTarget != 1) {
            this.height = "calc(100% - 45px)";
        }
        else
            this.isSmartSearch = true;

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
                    contextObj.gridHeight = window.innerHeight - 265;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }    
                break;
            case 3:
                contextObj.Stylename = "search-containerInlinefromgrid";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 235;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }    
                break;
            default:
                contextObj.Stylename = "search-container";
        }

        //this.employeeService.getAssignedEmployeeColumnData().subscribe(resultData => this.fieldObject = resultData["Data"]);        
        //the belo code to be uncommented for inline edit so as to make site dropdown readonly.
         //function (resultData) {
        //    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
        //    var siteinfo = contextObj.fieldDetailsSpaceEdit.find(function (item) {
        //        return item.ReportFieldId === 676
        //    })
        //    siteinfo.IsEnabled = true;
        //    siteinfo.ReadOnlyMode = true;
        //}
    }
    ngDoCheck() {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var assignedEmployeeId = this.inputItems.selectedIds;
            this.updateAssignedEmployeeSelectedId.emit({
                assignedEmployeeId, RowData: this.inputItems.rowData
            })
        }
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes["updateEmpData"] && changes["updateEmpData"]["currentValue"] && this.updateEmpData && this.updateEmpData.length > 0) {
            this.updateEmpDataInGrid();
        }
        if (changes["multipleEditChange"] && typeof (changes["multipleEditChange"]["previousValue"]) == 'boolean' && changes["multipleEditChange"]["currentValue"] != changes["multipleEditChange"]["previousValue"]) {
            this.loadData();
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
        if (changes["floorId"] && changes["floorId"]["currentValue"] && changes["floorId"]["currentValue"] != changes["floorId"]["previousValue"]) {
            this.loadData();
        }
           
        if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            this.showSlide = !this.showSlide;
        }
        if (changes["action"] && changes["action"]["currentValue"] == "employeeAssigned") {
            this.assignEmployeeSuccess();
        }
        if (changes["action"] && changes["action"]["currentValue"] != undefined) {
            if (changes["action"]["currentValue"] == "employeeDeAssigned" && this.deAssignedEmpId != undefined)
                this.onDeleteRefelct(false);
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
            //console.log(changes["returnData"])
            //if (this.action == 'add') {
            //    var added = JSON.parse(changes["returnData"]["currentValue"])[0];
            //    this.AddChange(added);
            //}
             if (this.action == 'edit') {
                var edited = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (this.inputItems.selectedIds.length == 1) {
                    this.EditChange(edited);
                }
            }
        }
        if (changes["fieldObject"] && changes["fieldObject"]["currentValue"]) {
            this.fieldObject = changes["fieldObject"]["currentValue"];
        }
        if ((changes["assignedEmpResourceCount"] && changes["assignedEmpResourceCount"]["currentValue"] != undefined) ||
            (changes["assignedEmployeeId"] && changes["assignedEmployeeId"]["currentValue"] != undefined)) { // Resource Count
            contextObj.refreshgrid = [];
            if (contextObj.itemsSource != undefined) {
                var dataList = contextObj.itemsSource.find(function (item) {
                    return item.Id === contextObj.assignedEmployeeId;
                });
                dataList["Resource Count"] = contextObj.assignedEmpResourceCount.toString();
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                //var updatedData = new Array();/*To notify the watcher about the change*/
                //updatedData = updatedData.concat(contextObj.itemsSource);
                //contextObj.itemsSource = updatedData;
            }
        }
        if (changes["action"] && changes["action"]["currentValue"] == "assignedemployeeexport") {

            var context = this;
            if (context.inputItems.selectedIds.length > 1) {
                context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
                context.exportObject.ExportData(context.exportDataSource, context.fieldObject, "AssignedEmployees", function (retCode) {
                    if (retCode == 0) {
                      context._notificationService.ShowToaster("Employees data exported", 3);
                    }
                    else { context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
                });
            }
            else {
                var input = context.employeeService.getAssignedEmployeeDataExport(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, 0, this.floorId.toString(), context.fieldObject, "AssignedEmployees", context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch, context.pageTarget, true);
                   // context.exportDataSource = resultData["Data"]["FieldBinderData"];
                context.exportObject.ExportDataFromServer(input,3, "AssignedEmployees", function (retCode) {
                        if (retCode == 0) {
                            context._notificationService.ShowToaster("Employees data exported", 3);
                        }
                        else { context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
                    });
               

            }
        }
        var contextObj = this;
        if (changes["highlightRows"] && changes["highlightRows"]["currentValue"]) {
            if (this.highlightRows.length > 0) {
                if (this.itemsSource) {
                    this.rearrangeItemSource(this.highlightRows.slice(), function (retcode) {
                        contextObj.arrHighlightRowIds = [];
                        setTimeout(function () {
                            contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat(contextObj.highlightRows);
                        }, 100);
                    });
                }
            }
            else
                contextObj.arrHighlightRowIds = [];
        }
        var contextObj = this;
        if (changes["SelectedEmployeeDetails"] && changes["SelectedEmployeeDetails"]["currentValue"]) {
            contextObj.refreshgrid = [];
            if (contextObj.SelectedEmployeeDetails.length > 0) {
                debugger
                //implement here
                for (let i = 0; i < contextObj.SelectedEmployeeDetails.length; i++) {
                    let index = contextObj.itemsSource.findIndex(function (item) { return item.Id === contextObj.SelectedEmployeeDetails[i].Id });
                        if (index > -1)
                        contextObj.itemsSource.splice(index, 1);
                }
                        var interChangeSource = contextObj.itemsSource;
                        contextObj.itemsSource = [];
                        contextObj.itemsSource = interChangeSource;
                        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                
            }
        }
    }
    updateEmpDataInGrid() {
        this.refreshgrid = [];
        var index;
        var indexItemsource;
        var empItem;
        var updatedDrawingId;
        for (var i = 0; i < this.updateEmpData.length; i++) {
            empItem = this.updateEmpData[i];
            updatedDrawingId = empItem['AssignedDrawingId'];
            indexItemsource = this.itemsSource.findIndex(function (el) { return el["Id"] == empItem["Id"] });
            if (indexItemsource != -1) {
                index = this.floorId.findIndex(function (el) { return el == updatedDrawingId });
                if (index != -1)
                    this.itemsSource[indexItemsource] = empItem;
                else
                    this.itemsSource.splice(indexItemsource, 1);
            }
        }
        if (this.itemsSource.length == 0) {
            this.emitMenu.emit({ TotalItems: this.itemsSource.length });
        }
        this.refreshgrid = this.refreshgrid.concat([true]);
    }

    public loadData() {
        var contextObj = this;
        this.employeeService.getAssignedEmployeeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, 0, this.floorId.toString(), "", "", this.IsKeyWordSearch, this.IsAdvanceSearch, this.pageTarget).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["DataCount"]);
                contextObj.totalRowData = contextObj.totalItems;
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                if (contextObj.totalItems == 0) {
                    contextObj.disable = true;
                    contextObj._notificationService.ShowToaster("No Employees exist", 2);
                }
                contextObj.itemsPerPage = JSON.parse(resultData["RowsPerPage"]);
            }
        });
    }

    rearrangeItemSource = function (selectedRows, resCallback) {
        var itemSourcedata = this.itemsSource.slice();
        var selectedSpaceIds = selectedRows;
        var selectedRowDatas: any[] = [];
        for (var i = 0; i < selectedSpaceIds.length; i++) {
            var index = itemSourcedata.findIndex(function (el) { return el.Id == selectedSpaceIds[i] });
            if (index != -1) {
                selectedRowDatas.push(itemSourcedata[index]);
                itemSourcedata.splice(index, 1);
            }
        }
        var data = selectedRowDatas.concat(itemSourcedata);
        this.itemsSource = data;
        resCallback(0);
    }

    advanceSearch() {
        var contextObj = this;
        this.employeeService.getAssignedEmployeeAdvnceSearchLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"].filter(function (el) {
                    if (el.FieldId == 604 || el.FieldId == 605 || el.FieldId == 603) {
                        return false
                    }
                    else {
                        return true
                    }
                });
            }
        });
    }
    assignEmployeeSuccess() {
        for (var empData of this.assignedEmpsData)
            this.AddChange(empData);
    }
    okDelete(event: any) {

        var contextObj = this;
        this.showSlide = !this.showSlide;
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
    DeleteEmployee() {
        var contextObj = this;
        //function findEntity(entity) {
        //    return entity.Id === contextObj.inputItems.selectedIds[0];
        //}
        this.employeeService.submitAssignedEmployeeDelete(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                    //contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                    //var updatedList = new Array();/*To notify the watcher about the change*/
                    //updatedList = updatedList.concat(contextObj.itemsSource);
                    //contextObj.itemsSource = updatedList;
                    //contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                    contextObj.onDeleteRefelct(false);
                    contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Employees exist", 2);
                    }
                    contextObj._notificationService.ShowToaster("Employee deleted", 3);
                    contextObj.onDeleteAssignedEmployee.emit(contextObj.inputItems.selectedIds[0] );
                }
            }
        });
    }
    onDeleteRefelct(fromEdit: boolean) {
        var contextObj = this;
        var emplId;
        if (this.pageTarget == 1) {
            if (fromEdit)
                emplId = contextObj.inputItems.selectedIds[0];
            else
                emplId = this.deAssignedEmpId;
        }
        else
            emplId = contextObj.inputItems.selectedIds[0];
        function findEntity(entity) {
            return entity.Id === emplId ;
        }
        contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
        var updatedList = new Array();/*To notify the watcher about the change*/
        updatedList = updatedList.concat(contextObj.itemsSource);
        contextObj.itemsSource = updatedList;
        contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;

        this.employeeService.getAssignedEmployeeData(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, 0, this.floorId.toString(), this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
            }        
        });

    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.employeeService.assignedEmployeePaging(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, 0, this.floorId.toString(), this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
            }
        });
    }
    RowUpdate(event: any) {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds
        this.employeeService.submitinlienAssignedEmployeeEdit(event, this.id).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Employee updated", 3);
                    if (contextObj.success["Data"][0]['StatusId'] == 1) {
                        contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0])
                        var assignedEmployeeId = contextObj.inputItems.selectedIds;
                        contextObj.updateAssignedEmployeeSelectedId.emit({ assignedEmployeeId, RowData: contextObj.inputItems.rowData });
                    }
                    else
                        contextObj.onDeleteRefelct(true);
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    // contextObj.itemsSource.pop();
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == 0) {
                        contextObj._notificationService.ShowToaster("Employee code is already in use", 5);
                    }
                }
            }
        });
    }
    RowDelete(event: any) {
        //if (this.delete == true)
        //    this.showSlide = !this.showSlide;
    }
    RowAdd(event: any) {
        this.employeeService.submitAssignedEmployeeAdd(event);
        this._notificationService.ShowToaster("Employee added", 3);
    }
    SaveAs(event: any) {
        //console.log('Entered Save As');
    }
    Delete(event: any) {
        //console.log('Entered Delete');
    }
    onloadSearch(event: any) {
        var contextObj = this;
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.employeeService.AssignedEmployeeKeywordSeach(this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol, 0, this.floorId.toString(), this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Employees exist", 2);
                } else {

                    if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0)
                    {
                        if (contextObj.filter!="")
                        contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: 5 });
                    }
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            }
        });     
    }
    Clear(event: any) {
        var contextObj = this;
        this.employeeService.getAssignedEmployeeAdvnceSearchLookup().subscribe(function (resultData) {
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
        this.employeeService.AssingedEmployeeAdvanceSeachResult(this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol, 0, this.floorId.toString(), this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Employees exist", 2);
                }
                else {
                    if (contextObj.IsKeyWordSearch == 0 && contextObj.IsAdvanceSearch == 1)
                    {

                        if (contextObj.totalRowData != contextObj.totalItems)
                            contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: 5 });
                    }
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            }
        });
    }
    closeSlideDialog(value: any, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showdeletionSlide = value.value;

    }
    cancelClick(value: any,index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showdeletionSlide = value.value;

    }
    onContextMenuOnClick(event: any) {
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = this.floorId;
            this.analyticsInput.moduleId = 5;
            this.analyticsInput.pageTarget = 2;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = 140;
            this.analyticsInput.ParentFormId = 127;
            this.showAnalytics = true;
        }
    }
    closeAnalytics() {
        this.showAnalytics = false;
    }
}