var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sortHelper_1 = require('../../utils/sortHelper');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var common_service_1 = require('../../../models/common/common.service');
var analytics_component_1 = require('../../common/analytics/analytics.component');
var AllEmployeeList = (function () {
    function AllEmployeeList(commonService, employeeService, _sortHelper, differs, _notificationService, confirmationService, generFun, exportObject, administrationService) {
        this.commonService = commonService;
        this.employeeService = employeeService;
        this._sortHelper = _sortHelper;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.confirmationService = confirmationService;
        this.generFun = generFun;
        this.exportObject = exportObject;
        this.administrationService = administrationService;
        this.disable = false;
        this.showSlide = false;
        this.showdeletionSlide = false;
        this.position = "top-right";
        this.pageIndex = 0;
        this.updateAllEmployeeSelectedId = new core_1.EventEmitter();
        this.emitMenu = new core_1.EventEmitter();
        this.add = false;
        this.edit = false;
        this.delete = false;
        // inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: this.add, allowEdit: this.edit, sortCol: '[Employee Code]', sortDir: 'ASC', selectioMode: 'single' };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortCol: '[Employee Code]', sortDir: 'ASC', showContextMenu: true };
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.arrHighlightRowIds = [];
        //@Output() onSearchInDrawing = new EventEmitter();
        this.analyticsInput = { menuId: 0 };
        this.showAnalytics = false;
        this.differ = differs.find({}).create(null);
        var contextObj = this;
        setTimeout(function () {
            contextObj.keyWordLookup = contextObj.employeeService.getAllEmployeeSearchKeyWordLookup();
        }, 3000);
    }
    AllEmployeeList.prototype.AddChange = function (added) {
        //var lastpage = Math.round(this.totalItems / this.itemsPerPage);
        //this.administrationService.sitePaging(lastpage, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
        var contextObj = this;
        this.itemsSource.unshift(added);
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.itemsSource);
        this.itemsSource = updatedData;
        this.totalItems = this.generFun.updateTotalItems(this.totalItems, "add");
        this.emitMenu.emit({ TotalItems: this.totalItems });
        var addedId = added[this.inputItems.dataKey];
        setTimeout(function () {
            contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat([addedId]);
        }, 50);
    };
    AllEmployeeList.prototype.EditChange = function (edited) {
        this.refreshgrid = [];
        var datakey = this.inputItems.dataKey;
        for (var i = 0; i < this.itemsSource.length; i++) {
            if (this.itemsSource[i][datakey] == edited[datakey]) {
                this.itemsSource[i] = edited;
                //var updatedData = new Array();/*To notify the watcher about the change*/
                //updatedData = updatedData.concat(this.itemsSource);
                //this.itemsSource = updatedData;
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
        }
    };
    AllEmployeeList.prototype.advanceSearch = function () {
        var contextObj = this;
        this.employeeService.getAllEmployeeAdvnceSearchLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"].filter(function (el) {
                    if (el.FieldId == 604 || el.FieldId == 605 || el.FieldId == 603) {
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
        });
    };
    AllEmployeeList.prototype.ngOnInit = function () {
        var contextObj = this;
        this.dataKey = ["Id"];
        //this.employeeService.getAllEmployeeColumnData().subscribe(resultData => this.fieldObject = resultData["Data"]);
        this.loadData(1);
        this.employeeService.getAllEmployeeKeywordField().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            }
        });
    };
    AllEmployeeList.prototype.loadData = function (onload) {
        var contextObj = this;
        if (contextObj.qResult) {
            if (onload == 1) {
                contextObj.itemsSource = JSON.parse(contextObj.qResult.FieldBinderData);
                contextObj.itemsPerPage = contextObj.qResult.RowsPerPage;
                contextObj.totalItems = contextObj.qResult.DataCount;
            }
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
    };
    AllEmployeeList.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var allEmployeeId = this.inputItems.selectedIds;
            this.updateAllEmployeeSelectedId.emit({
                allEmployeeId: allEmployeeId, RowData: this.inputItems.rowData
            });
        }
    };
    AllEmployeeList.prototype.ngOnChanges = function (changes) {
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
                    }
                    else
                        return false;
                });
                context.refreshgrid = context.refreshgrid.concat([true]);
            }
        }
        if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            this.showSlide = !this.showSlide;
        }
        if (changes["updateEmpData"] && changes["updateEmpData"]["currentValue"] && this.updateEmpData && this.updateEmpData.length > 0) {
            this.updateEmpDataInGrid();
        }
        if (changes["menuaccess"] && changes["menuaccess"]["currentValue"] != undefined) {
            for (var i = 0; i < changes["menuaccess"]["currentValue"].length; i++) {
                if (changes["menuaccess"]["currentValue"][i]["image"] == "Add")
                    this.add = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Edit")
                    this.edit = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Delete")
                    this.delete = true;
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
            (changes["allEmployeeId"] && changes["allEmployeeId"]["currentValue"] != undefined)) {
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
                    else {
                        context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
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
                        context._notificationService.ShowToaster("Employees data exported", 3);
                        ;
                    }
                    else {
                        context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                });
            }
        }
    };
    AllEmployeeList.prototype.updateEmpDataInGrid = function () {
        this.refreshgrid = [];
        var index;
        var empItem;
        for (var i = 0; i < this.updateEmpData.length; i++) {
            empItem = this.updateEmpData[i];
            index = this.itemsSource.findIndex(function (el) { return el["Id"] == empItem["Id"]; });
            if (index != -1)
                this.itemsSource[index] = empItem;
        }
        this.refreshgrid = this.refreshgrid.concat([true]);
    };
    AllEmployeeList.prototype.okDelete = function (event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        //check the supervisor check 
        this.employeeService.CheckEmployeeStatus(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                var strEmpCheck = resultData["Data"];
                if (strEmpCheck != 0 && strEmpCheck != 3) {
                    if ((strEmpCheck == 1) || (strEmpCheck == 2) || (strEmpCheck == 4) || (strEmpCheck == 5) || (strEmpCheck == 6))
                        contextObj._notificationService.ShowToaster("The selected Employee is used in Move Projects", 2);
                    else
                        contextObj._notificationService.ShowToaster("The selected Employee is linked to other functions, cannot be deleted", 2);
                }
                else
                    contextObj.employeeService.getSupervisorCount(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            //console.log(resultData["Data"]["FieldBinderData"])
                            var strSuperVisorCount = resultData["Data"]["FieldBinderData"];
                            if (strSuperVisorCount > 0)
                                contextObj.showdeletionSlide = !contextObj.showdeletionSlide;
                            else
                                contextObj.DeleteEmployee();
                        }
                        //contextObj._notificationService.ShowToaster("Selected employee is a supervisor. Do you wish to continue with deletion?",2)
                    });
            }
        });
    };
    AllEmployeeList.prototype.okSuperVisorDelete = function (event) {
        var contextObj = this;
        this.showdeletionSlide = !this.showdeletionSlide;
        this.DeleteEmployee();
    };
    AllEmployeeList.prototype.assignEmployeeSuccess = function () {
        this.loadData(0);
        //for (var empId of this.assignedEmpIds)
        //    this.clearEmpFromGrid(empId);
    };
    AllEmployeeList.prototype.clearEmpFromGrid = function (empId) {
        var contextObj = this;
        function findEntity(entity) {
            return entity.Id === empId;
        }
        contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
        var updatedList = new Array(); /*To notify the watcher about the change*/
        updatedList = updatedList.concat(contextObj.itemsSource);
        contextObj.itemsSource = updatedList;
        contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
        contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
    };
    AllEmployeeList.prototype.DeleteEmployee = function () {
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
    };
    AllEmployeeList.prototype.onSort = function (objGrid) {
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
    };
    AllEmployeeList.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.employeeService.allEmployeePaging(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
            // if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
            contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
            /// }
        });
    };
    AllEmployeeList.prototype.RowUpdate = function (event) {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds;
        this.employeeService.submitinlienAllEmployeeEdit(event, this.id).subscribe(function (resultData) {
            // if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
            contextObj.success = (resultData["Data"]);
            if (contextObj.success["StatusId"] == 1) {
                contextObj._notificationService.ShowToaster("Employee updated", 3);
                contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0]);
            }
            else if (contextObj.success["StatusId"] == 0) {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
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
        });
        ;
        //this._notificationService.ShowToaster("Employee updated", 3);
    };
    AllEmployeeList.prototype.RowDelete = function (event) {
        //if (this.delete == true)
        //    this.showSlide = !this.showSlide;
    };
    AllEmployeeList.prototype.RowAdd = function (event) {
        var contextObj = this;
        var temp = JSON.parse(event);
        for (var i = 0; i < temp.length; i++) {
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
                contextObj.AddChange(JSON.parse(contextObj.success["Data"])[0]);
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
    };
    AllEmployeeList.prototype.SaveAs = function (event) {
        //console.log('Entered Save As');
    };
    AllEmployeeList.prototype.Delete = function (event) {
        //console.log('Entered Delete');
    };
    AllEmployeeList.prototype.onloadSearch = function (event) {
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
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            // }
        });
    };
    AllEmployeeList.prototype.Clear = function (event) {
        var contextObj = this;
        this.employeeService.getAllEmployeeAdvnceSearchLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
        });
    };
    AllEmployeeList.prototype.Submit = function (event) {
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
            }
            else {
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            //}
        });
    };
    AllEmployeeList.prototype.closeSlideDialog = function (value, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showdeletionSlide = value.value;
    };
    AllEmployeeList.prototype.cancelClick = function (value, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showdeletionSlide = value.value;
    };
    AllEmployeeList.prototype.allEmployeeResourceCount = function (event) {
        console.log("All Resource Count:", event);
    };
    AllEmployeeList.prototype.onContextMenuOnClick = function (event) {
        var temp = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = temp;
            this.analyticsInput.moduleId = 5;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch;
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = 102;
            this.analyticsInput.ParentFormId = 127;
            this.showAnalytics = true;
        }
    };
    AllEmployeeList.prototype.closeAnalytics = function () {
        this.showAnalytics = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AllEmployeeList.prototype, "assignedEmpIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AllEmployeeList.prototype, "isQuerybuilder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AllEmployeeList.prototype, "buildarray", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AllEmployeeList.prototype, "qResult", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AllEmployeeList.prototype, "updateAllEmployeeSelectedId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AllEmployeeList.prototype, "emitMenu", void 0);
    AllEmployeeList = __decorate([
        core_1.Component({
            selector: 'allEmployeeList',
            templateUrl: 'app/Views/Employee/Data/allEmployeeList.html',
            providers: [common_service_1.CommonService, employee_services_1.EmployeeService, sortHelper_1.SortHelper, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, exporttoexcel_service_1.ExportToExcel, administration_service_1.AdministrationService],
            inputs: ['action', 'dataKey', 'menuaccess', 'returnData', 'fieldObject', 'attachmentSuccess', 'allEmpResourceCount', 'allEmployeeId', 'multipleEditChange', 'updateEmpData'],
            directives: [grid_component_1.GridComponent, slide_component_1.SlideComponent, paging_component_1.PagingComponent, notify_component_1.Notification, search_component_1.searchBox, confirm_component_1.ConfirmationComponent, analytics_component_1.Analytics]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, employee_services_1.EmployeeService, sortHelper_1.SortHelper, core_1.KeyValueDiffers, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel, administration_service_1.AdministrationService])
    ], AllEmployeeList);
    return AllEmployeeList;
}());
exports.AllEmployeeList = AllEmployeeList;
//# sourceMappingURL=allEmployeeList.js.map