var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../models/space/space.service.ts" />
var core_1 = require('@angular/core');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sortHelper_1 = require('../../utils/sortHelper');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var FloorListComponent = (function () {
    function FloorListComponent(cdr, generFun, administrationService, _sortHelper, differs, _notificationService, confirmationService, exportObject) {
        this.generFun = generFun;
        this.administrationService = administrationService;
        this._sortHelper = _sortHelper;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.confirmationService = confirmationService;
        this.exportObject = exportObject;
        this.position = "top-right";
        this.showSlide = false;
        this.pageIndex = 0;
        this.disable = false;
        this.add = false;
        this.edit = false;
        this.delete = false;
        this.emitMenu = new core_1.EventEmitter();
        this.updateFloorSelectedIds = new core_1.EventEmitter();
        this.pageTitle = "Floor List Component";
        this.inputItems = { dataKey: "FloorId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC' };
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.differ = differs.find({}).create(null);
        var contextObj = this;
        this.cdr = cdr;
    }
    FloorListComponent.prototype.AddChange = function (added) {
        this.itemsSource.unshift(added);
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.itemsSource);
        this.itemsSource = updatedData;
        this.totalItems = this.generFun.updateTotalItems(this.totalItems, "add");
        this.emitMenu.emit({ TotalItems: this.totalItems });
    };
    FloorListComponent.prototype.EditChange = function (edited) {
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
    FloorListComponent.prototype.advanceSearch = function () {
        var contextObj = this;
        this.administrationService.getFloorAdvnceSearchLookup(this.Parameter).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
        });
    };
    FloorListComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        var contextObj = this;
        if (changes) {
            var scopefloor = this.inputItems.selectedIds;
            var sitestatus = contextObj.itemsSource.find(function (item) {
                return item.FloorId === contextObj.inputItems.selectedIds[0];
            });
            if (sitestatus != null && sitestatus != [] && sitestatus != undefined) {
                this.updateFloorSelectedIds.emit({ scopefloor: scopefloor, sitestatus: sitestatus["SiteStatus"], buildingId: this.buildingId });
            }
            else {
                this.updateFloorSelectedIds.emit({ scopefloor: scopefloor, sitestatus: "", buildingId: this.buildingId });
            }
        }
    };
    FloorListComponent.prototype.onSort = function (objGrid) {
        var _this = this;
        var fieldobj = new Array();
        if (this.buildingId != undefined) {
            fieldobj.push({
                ReportFieldId: 541,
                Value: this.buildingId[0]
            });
        }
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.administrationService.sortFloor(fieldobj, this.pageIndex, objGrid.sortDir, objGrid.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) { return _this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]); });
    };
    FloorListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        this.administrationService.getFloorColumnData().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.fieldObject = resultData["Data"];
                for (var i = 0; i < contextObj.fieldObject.length; i++) {
                    if ((contextObj.fieldObject[i]["FieldId"] == 38) || (contextObj.fieldObject[i]["FieldId"] == 325))
                        contextObj.fieldObject[i]["IsEnabled"] = false;
                }
            }
        });
        if (changes["attachmentSuccess"] && changes["attachmentSuccess"]["currentValue"] != undefined) {
            contextObj.refreshgrid = [];
            var result = changes["attachmentSuccess"]["currentValue"].status;
            var context = this;
            var selId = context.inputItems.selectedIds[0];
            if (selId != undefined) {
                context.itemsSource.find(function (item) {
                    if (item["FloorId"] == selId) {
                        switch (result) {
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
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }
        }
        if (changes["buildingId"] && changes["buildingId"]["currentValue"] != changes["buildingId"]["previousValue"]) {
            var fieldobj = new Array();
            if (this.buildingId != undefined) {
                fieldobj.push({
                    ReportFieldId: 541,
                    Value: this.buildingId[0]
                });
                this.administrationService.getFloorData(fieldobj, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                        contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                        if (contextObj.totalItems == 0) {
                            contextObj.disable = true;
                            contextObj._notificationService.ShowToaster("No Floors exist", 2);
                        }
                        contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    }
                });
                setTimeout(function () {
                    contextObj.administrationService.getFloorSearchKeyWordLookup(fieldobj).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                        }
                    });
                }, 3000);
            }
            else {
                this.administrationService.getFloorData(this.buildingId, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                        contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                        if (contextObj.totalItems == 0) {
                            contextObj.disable = true;
                            contextObj._notificationService.ShowToaster("No Floors exist", 2);
                            contextObj.updateFloorSelectedIds.emit({ scopefloor: 0, sitestatus: "Active" });
                        }
                        contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                    }
                });
                setTimeout(function () {
                    contextObj.administrationService.getFloorSearchKeyWordLookup(this.buildingId).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                        }
                    });
                }, 3000);
            }
        }
        if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            if (this.itemsSource) {
                var contextObj = this;
                var fieldObj = new Array();
                fieldObj.push({ ReportFieldId: 173, Value: "112" });
                this.administrationService.CheckIsEntityReferenceFound(fieldObj, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"] == false) {
                            contextObj.message = " Are you sure you want to delete the selected Floor?";
                        }
                        else {
                            contextObj.message = " Drawings and data attached to the selected Floor will be lost. Are you sure you want to delete the selected Floor?";
                        }
                        contextObj.showSlide = !this.showSlide;
                    }
                });
            }
        }
        if (changes["action"] && changes["action"]["currentValue"] == "floorexport") {
            var context = this;
            var fieldobj = new Array();
            if (context.buildingId != undefined) {
                fieldobj.push({
                    ReportFieldId: 541,
                    Value: context.buildingId[0]
                });
            }
            else
                fieldobj = undefined;
            //debugger
            var input = context.administrationService.getFloorExportData(context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol == undefined ? "Site,Building,Floor" : context.inputItems.sortCol, fieldobj, contextObj.fieldObject, "Floors", context.filter, context.advanceValue, true);
            //  this.administrationService.getExportData(71, 125, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol == undefined ? "" : context.inputItems.sortCol, context.filter, context.advanceValue).subscribe(function (resultData) {
            // context.exportDataSource = resultData["Data"]["FieldBinderData"];
            context.exportObject.ExportDataFromServer(input, 1, "Floors", function (retCode) {
                if (retCode == 0) {
                    context._notificationService.ShowToaster("Floor data exported", 3);
                }
                else
                    context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            });
        }
        if (changes["action"] && changes["action"]["currentValue"] == "close")
            this.administrationService.submitFloorClose(this.inputItems.selectedIds);
        if (changes["action"] && changes["action"]["currentValue"] == "reopen")
            this.administrationService.submitFloorReopen(this.inputItems.selectedIds);
        if (changes["menuaccess"] && changes["menuaccess"]["currentValue"] != undefined) {
            for (var i = 0; i < changes["menuaccess"]["currentValue"].length; i++) {
                if (changes["menuaccess"]["currentValue"][i]["image"] == "Add")
                    this.add = false;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Edit")
                    this.edit = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Delete")
                    this.delete = true;
            }
        }
        if (changes["returnData"] && changes["returnData"]["currentValue"] != undefined) {
            if (this.action == 'add') {
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
        var fieldobj = new Array();
        if (this.buildingId != undefined) {
            fieldobj.push({
                ReportFieldId: 541,
                Value: this.buildingId[0]
            });
            this.Parameter = fieldobj;
        }
        else {
            this.Parameter = this.buildingId;
        }
    };
    FloorListComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        var fieldObj = new Array();
        var _loop_1 = function(i) {
            selectedrow = this_1.itemsSource.find(function (item) { return item.FloorId === contextObj.inputItems.selectedIds[i]; });
            fieldObj.push({ ReportFieldId: 539, Value: contextObj.inputItems.selectedIds[i] });
        };
        var this_1 = this;
        var selectedrow;
        for (var i = 0; i < this.inputItems.selectedIds.length; i++) {
            _loop_1(i);
        }
        this.showSlide = !this.showSlide;
        function findEntity(entity) {
            return entity.FloorId === contextObj.inputItems.selectedIds[0];
        }
        this.administrationService.submitFloorDelete(fieldObj, this.inputItems.selectedIds).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if ((resultData["ServerId"] >= 0) && (resultData["StatusId"] == 1)) {
                    contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                    var updatedList = new Array(); /*To notify the watcher about the change*/
                    updatedList = updatedList.concat(contextObj.itemsSource);
                    contextObj.itemsSource = updatedList;
                    contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                    contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Floors exist", 2);
                    }
                    contextObj._notificationService.ShowToaster("Floor deleted", 3);
                }
                else
                    contextObj._notificationService.ShowToaster("Failed to delete Floor", 5);
            }
        });
    };
    FloorListComponent.prototype.pageChanged = function (event) {
        var _this = this;
        this.pageIndex = event.pageEvent.page;
        var sortcol;
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol;
        else
            sortcol = 'Site,Building,Floor';
        this.administrationService.floorPage(this.pageIndex, this.inputItems.sortDir, sortcol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) { return _this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]); });
    };
    FloorListComponent.prototype.RowUpdate = function (event) {
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds;
        var contextObj = this;
        var temp = JSON.parse(event);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 8624)
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = "1";
            if (temp[i]["ReportFieldId"] == 787)
                if (temp[i]["Value"] == undefined)
                    temp[i]["Value"] = 0;
        }
        event = JSON.stringify(temp);
        this.administrationService.submitFloorinlineEdit(event, this.id).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Floor updated", 3);
                    contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0]);
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("Failed to update Floor", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Floor already exists", 5);
                    }
                }
            }
        });
    };
    FloorListComponent.prototype.RowDelete = function (event) {
    };
    FloorListComponent.prototype.RowAdd = function (event) {
        var contextObj = this;
        var temp = JSON.parse(event);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 8624)
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = "1";
        }
        event = JSON.stringify(temp);
        this.administrationService.submitFloorinlineAdd(event).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"];
                if (contextObj.success["StatusId"] == 1) {
                    contextObj.disable = false;
                    contextObj._notificationService.ShowToaster("Floor added", 3);
                    contextObj.itemsSource.pop();
                    contextObj.AddChange(JSON.parse(contextObj.success["Data"])[0]);
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj._notificationService.ShowToaster("Failed to add  Floor", 5);
                    contextObj.itemsSource.pop();
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        contextObj._notificationService.ShowToaster("Floor already exists", 5);
                    }
                }
            }
        });
    };
    FloorListComponent.prototype.SaveAs = function (event) {
    };
    FloorListComponent.prototype.Delete = function (event) {
    };
    FloorListComponent.prototype.Clear = function (event) {
        var contextObj = this;
        this.administrationService.getFloorAdvnceSearchLookup(this.Parameter).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
        });
    };
    FloorListComponent.prototype.Submit = function (event) {
        var contextObj = this;
        contextObj.advanceValue = event.fieldobject;
        contextObj.IsKeyWordSearch = 0;
        contextObj.filter = "";
        contextObj.IsAdvanceSearch = 1;
        var sortcol;
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol;
        else
            sortcol = 'Site,Building,Floor';
        this.administrationService.FloorAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, sortcol, this.Parameter).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Floors exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            }
        });
    };
    FloorListComponent.prototype.onloadSearch = function (event) {
        var contextObj = this;
        contextObj.filter = event.value;
        contextObj.advanceValue = "[]";
        contextObj.IsKeyWordSearch = 1;
        contextObj.IsAdvanceSearch = 0;
        this.administrationService.FloorKeywordSeach(event.value, this.Parameter).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Floors exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            }
        });
    };
    FloorListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    FloorListComponent.prototype.cancelClick = function (value) {
        this.showSlide = false;
    };
    FloorListComponent.prototype.ddlChangeFrmGrid = function (event) {
        var fieldobj = new Array();
        var siteid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        if (siteid) {
            fieldobj.push({
                ReportFieldId: event["ddlRelationShipEvent"]["ChildFieldObject"]["ReportFieldId"],
                Value: event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"]
            });
        }
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var result;
        var contextObj = this;
        if (siteid > 0) {
            if (parentFieldId == 38) {
                this.administrationService.loadBuilding(siteid, parentFieldId).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            for (var i = 0; i < contextObj.fieldObject.length; i++) {
                                if (contextObj.fieldObject[i]["FieldId"] == 325) {
                                    contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                    contextObj.fieldObject[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < contextObj.fieldObject.length; i++) {
                                if (contextObj.fieldObject[i]["FieldId"] == 325) {
                                    contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = null;
                                    contextObj.fieldObject[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                    }
                });
            }
        }
        else {
            if (parentFieldId == 38) {
                for (var i = 0; i < contextObj.fieldObject.length; i++) {
                    if (contextObj.fieldObject[i]["FieldId"] == 325) {
                        contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldObject[i]["FieldValue"] = "-1";
                        break;
                    }
                }
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorListComponent.prototype, "emitMenu", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorListComponent.prototype, "updateFloorSelectedIds", void 0);
    FloorListComponent = __decorate([
        core_1.Component({
            selector: 'floor-list',
            templateUrl: './app/Views/Administration/Floor/floor-list.component.html',
            providers: [administration_service_1.AdministrationService, sortHelper_1.SortHelper, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, exporttoexcel_service_1.ExportToExcel],
            inputs: ['action', 'buildingId', 'menuaccess', 'returnData', 'attachmentSuccess'],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, notify_component_1.Notification, search_component_1.searchBox, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, General_1.GeneralFunctions, administration_service_1.AdministrationService, sortHelper_1.SortHelper, core_1.KeyValueDiffers, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, exporttoexcel_service_1.ExportToExcel])
    ], FloorListComponent);
    return FloorListComponent;
}());
exports.FloorListComponent = FloorListComponent;
//# sourceMappingURL=floor-list.component.js.map