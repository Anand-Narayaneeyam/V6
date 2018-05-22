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
var BuildingListComponent = (function () {
    function BuildingListComponent(generFun, administrationService, _sortHelper, differs, _notificationService, confirmationService, exportObject) {
        this.generFun = generFun;
        this.administrationService = administrationService;
        this._sortHelper = _sortHelper;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.confirmationService = confirmationService;
        this.exportObject = exportObject;
        this.updateBuildingSelectedIds = new core_1.EventEmitter();
        this.selectedTab = new core_1.EventEmitter();
        this.emitMenu = new core_1.EventEmitter();
        this.disable = false;
        this.add = false;
        this.edit = false;
        this.delete = false;
        this.pageIndex = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.pageTitle = "Building List Component";
        this.inputItems = { dataKey: "BuildingId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: 'Site,Building' };
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.differ = differs.find({}).create(null);
        var contextObj = this;
    }
    BuildingListComponent.prototype.AddChange = function (added) {
        this.itemsSource.unshift(added);
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.itemsSource);
        this.itemsSource = updatedData;
        this.totalItems = this.generFun.updateTotalItems(this.totalItems, "add");
        this.emitMenu.emit({ TotalItems: this.totalItems });
    };
    BuildingListComponent.prototype.EditChange = function (edited) {
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
    BuildingListComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        var contextObj = this;
        if (changes) {
            var scopebuilding = this.inputItems.selectedIds;
            var sitestatus = contextObj.itemsSource.find(function (item) {
                return item.BuildingId === contextObj.inputItems.selectedIds[0];
            });
            if (sitestatus != null && sitestatus != [] && sitestatus != undefined) {
                this.updateBuildingSelectedIds.emit({ scopebuilding: scopebuilding, sitestatus: sitestatus["SiteStatus"], siteId: this.siteId });
            }
            else {
                this.updateBuildingSelectedIds.emit({ scopebuilding: scopebuilding, sitestatus: "", siteId: this.siteId });
            }
        }
    };
    BuildingListComponent.prototype.advanceSearch = function () {
        var contextObj = this;
        if (contextObj.advancelookup == undefined)
            if (this.siteId != undefined) {
                var fieldobj = new Array();
                fieldobj.push({
                    ReportFieldId: 489,
                    Value: this.siteId[0]
                });
                contextObj.administrationService.getBuildingAdvnceSearchLookup(fieldobj).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    }
                });
            }
            else {
                contextObj.administrationService.getBuildingAdvnceSearchLookup(contextObj.siteId).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    }
                });
            }
    };
    BuildingListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        contextObj.administrationService.getBuildingColumnData().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.fieldObject = resultData["Data"];
                for (var i = 0; i < contextObj.fieldObject.length; i++) {
                    if (contextObj.fieldObject[i].FieldId == 310) {
                        contextObj.fieldObject[i].isContentHtml = "hyperlink";
                        break;
                    }
                }
            }
        });
        if (changes["attachmentSuccess"] && changes["attachmentSuccess"]["currentValue"] != undefined) {
            contextObj.refreshgrid = [];
            var result = changes["attachmentSuccess"]["currentValue"].status;
            var selId = contextObj.inputItems.selectedIds[0];
            if (selId != undefined) {
                contextObj.itemsSource.find(function (item) {
                    if (item["BuildingId"] == selId) {
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
        if (changes["siteId"])
            if ((changes["siteId"]["currentValue"]) != (changes["siteId"]["previousValue"])) {
                var fieldobj = new Array();
                if (contextObj.siteId != undefined) {
                    fieldobj.push({
                        ReportFieldId: 489,
                        Value: contextObj.siteId[0]
                    });
                    contextObj.siteIdArray = fieldobj;
                    contextObj.administrationService.getBuildingData(fieldobj, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                            if (contextObj.totalItems == 0) {
                                contextObj.disable = true;
                                contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                            }
                            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                        }
                    });
                    setTimeout(function () {
                        contextObj.administrationService.getBuildingSearchKeyWordLookup(fieldobj).subscribe(function (resultData) {
                            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                            }
                        });
                    }, 3000);
                }
                else {
                    contextObj.administrationService.getBuildingData(contextObj.siteId, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                            if (contextObj.totalItems == 0) {
                                contextObj.disable = true;
                                contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                                contextObj.updateBuildingSelectedIds.emit({ scopebuilding: 0, sitestatus: "Active" });
                            }
                            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
                        }
                    });
                    setTimeout(function () {
                        contextObj.administrationService.getBuildingSearchKeyWordLookup(contextObj.siteId).subscribe(function (resultData) {
                            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                            }
                        });
                    }, 3000);
                }
            }
        if (changes["action"] != undefined) {
            if (changes["action"]["currentValue"] == "delete") {
                if (contextObj.itemsSource)
                    for (var i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i].BuildingId == contextObj.inputItems.selectedIds[0]) {
                            if (contextObj.itemsSource[i]["Floor Count"] == 0)
                                contextObj.showSlide = !contextObj.showSlide;
                            else
                                contextObj._notificationService.ShowToaster("Selected Building cannot be deleted,Floors added to it", 2);
                        }
                    }
            }
            else if (changes["action"]["currentValue"] == "close") {
                contextObj.administrationService.submitBuildingClose(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        var datakey = contextObj.inputItems.dataKey;
                        for (var i = 0; i < contextObj.itemsSource.length; i++) {
                            if (contextObj.itemsSource[i][datakey] == JSON.parse(resultData)[0][datakey]) {
                                contextObj.itemsSource[i] = JSON.parse(resultData)[0];
                                var updatedData = new Array(); /*To notify the watcher about the change*/
                                updatedData = updatedData.concat(contextObj.itemsSource);
                                contextObj.itemsSource = updatedData;
                            }
                        }
                    }
                });
            }
            else if (changes["action"]["currentValue"] == "reopen")
                contextObj.administrationService.submitbuildingReopen(contextObj.inputItems.selectedIds);
            else if (changes["action"] && changes["action"]["currentValue"] == "buildingexport") {
                var fieldobj = new Array();
                if (contextObj.siteId != undefined) {
                    fieldobj.push({
                        ReportFieldId: 489,
                        Value: contextObj.siteId[0]
                    });
                }
                else
                    fieldobj = undefined;
                var input = contextObj.administrationService.getBuildingExportData(1, 122, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, contextObj.fieldObject, "Buildings", contextObj.filter, contextObj.advanceValue, fieldobj);
                //  contextObj.exportDataSource = resultData["Data"]["FieldBinderData"];
                contextObj.exportObject.ExportDataFromServer(input, 1, "Buildings", function (retCode) {
                    // contextObj.exportObject.ExportData(contextObj.exportDataSource, contextObj.fieldObject, "Buildings", function (retCode) {
                    if (retCode == 0) {
                        contextObj._notificationService.ShowToaster("Building data exported", 3);
                    }
                    else
                        contextObj._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                });
            }
        }
        if (changes["menuaccess"] && changes["menuaccess"]["currentValue"] != undefined) {
            for (var i = 0; i < changes["menuaccess"]["currentValue"].length; i++) {
                if (changes["menuaccess"]["currentValue"][i]["image"] == "Add")
                    contextObj.add = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Edit")
                    contextObj.edit = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Delete")
                    contextObj.delete = true;
            }
        }
        if (changes["returnData"] && changes["returnData"]["currentValue"] != undefined) {
            if (contextObj.action == 'add') {
                var added = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (contextObj.itemsSource)
                    contextObj.AddChange(added);
            }
            else if (contextObj.action == 'edit') {
                var edited = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (contextObj.inputItems.selectedIds.length == 1) {
                    contextObj.EditChange(edited);
                }
            }
        }
    };
    BuildingListComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        function findEntity(entity) {
            return entity.BuildingId === contextObj.inputItems.selectedIds[0];
        }
        this.administrationService.submitBuildingDelete(this.inputItems.selectedIds).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                var updatedList = new Array(); /*To notify the watcher about the change*/
                updatedList = updatedList.concat(contextObj.itemsSource);
                contextObj.itemsSource = updatedList;
                contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                }
                contextObj._notificationService.ShowToaster("Building deleted", 3);
            }
            else if (resultData["Data"]["ServerId"] == -1) {
                contextObj._notificationService.ShowToaster("Selected Building in use, cannot be deleted", 5);
            }
            else
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
    };
    BuildingListComponent.prototype.onSort = function (objGrid) {
        var _this = this;
        var fieldobj = new Array();
        if (this.siteId != undefined) {
            fieldobj.push({
                ReportFieldId: 489,
                Value: this.siteId[0]
            });
        }
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.administrationService.sortBuilding(fieldobj, this.pageIndex, objGrid.sortDir, objGrid.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) { return _this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]); });
    };
    BuildingListComponent.prototype.pageChanged = function (event) {
        var _this = this;
        this.pageIndex = event.pageEvent.page;
        var sortcol;
        var fieldobj = new Array();
        if (this.siteId != undefined) {
            fieldobj.push({
                ReportFieldId: 489,
                Value: this.siteId[0]
            });
        }
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol;
        else
            sortcol = 'Site,Building';
        this.administrationService.buildingPage(fieldobj, this.pageIndex, this.inputItems.sortDir, sortcol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) { return _this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]); });
    };
    BuildingListComponent.prototype.onColValClick = function (event) {
        if (event.colVal > 0) {
            this.selectedTab.emit("2");
        }
    };
    BuildingListComponent.prototype.RowUpdate = function (event) {
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds;
        var contextObj = this;
        var temp = JSON.parse(event);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 6655)
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = "1";
        }
        event = JSON.stringify(temp);
        this.administrationService.submitBuildinginlineEdit(event, this.id).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Buidling updated", 3);
                    contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0]);
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj._notificationService.ShowToaster("Failed to update Building", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Building already exists", 5);
                    }
                    else if (contextObj.success["ServerId"] == -1)
                        contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                    else if (contextObj.success["ServerId"] == -3)
                        contextObj._notificationService.ShowToaster(" Buiding Code already exists", 5);
                }
            }
        });
    };
    BuildingListComponent.prototype.RowDelete = function (event) {
    };
    BuildingListComponent.prototype.RowAdd = function (event) {
        var contextObj = this;
        var temp = JSON.parse(event);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 6655)
                if (temp[i]["Value"] == "-1")
                    temp[i]["Value"] = "1";
        }
        event = JSON.stringify(temp);
        this.administrationService.submitBuildinginlineAdd(event).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.success = resultData["Data"];
                if (contextObj.success["StatusId"] == 1) {
                    contextObj._notificationService.ShowToaster("Building added", 3);
                    contextObj.disable = false;
                    contextObj.itemsSource.pop();
                    contextObj.AddChange(JSON.parse(contextObj.success["Data"])[0]);
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj._notificationService.ShowToaster("Failed to add  Building", 5);
                    contextObj.itemsSource.pop();
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -2) {
                        contextObj._notificationService.ShowToaster("Building Name already exist", 5);
                    }
                    else if (contextObj.success["ServerId"] == -1)
                        contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                    else if (contextObj.success["ServerId"] == -3)
                        contextObj._notificationService.ShowToaster(" Buiding Code already exists", 5);
                }
            }
        });
    };
    BuildingListComponent.prototype.SaveAs = function (event) {
    };
    BuildingListComponent.prototype.Delete = function (event) {
    };
    BuildingListComponent.prototype.Clear = function (event) {
        var contextObj = this;
        if (this.siteId != undefined) {
            var fieldobj = new Array();
            fieldobj.push({
                ReportFieldId: 489,
                Value: this.siteId[0]
            });
            contextObj.advancelookup = JSON.parse(JSON.stringify(contextObj.advancelookupDefault));
        }
        else {
            contextObj.advancelookup = JSON.parse(JSON.stringify(contextObj.advancelookupDefault));
        }
    };
    BuildingListComponent.prototype.Submit = function (event) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        var sortcol;
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol;
        else
            sortcol = 'Site,Building';
        this.pageIndex = 0;
        this.administrationService.BuildingAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, sortcol, this.siteIdArray).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Buildings exist", 2);
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });
    };
    BuildingListComponent.prototype.onloadSearch = function (event) {
        var contextObj = this;
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        var sortcol;
        if (this.inputItems.sortCol)
            sortcol = this.inputItems.sortCol;
        else
            sortcol = 'Site,Building';
        var fieldobj = new Array();
        this.pageIndex = 0;
        if (this.siteId != undefined) {
            fieldobj.push({
                ReportFieldId: 489,
                Value: this.siteId[0]
            });
            this.administrationService.BuildingKeywordSeach(event.value, fieldobj, this.pageIndex, this.inputItems.sortDir, sortcol).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            });
        }
        else {
            this.administrationService.BuildingKeywordSeach(event.value, this.siteId, this.pageIndex, this.inputItems.sortDir, sortcol).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Buildings exist", 2);
                }
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
            });
        }
    };
    BuildingListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    BuildingListComponent.prototype.cancelClick = function (value) {
        this.showSlide = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingListComponent.prototype, "updateBuildingSelectedIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingListComponent.prototype, "selectedTab", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingListComponent.prototype, "emitMenu", void 0);
    BuildingListComponent = __decorate([
        core_1.Component({
            selector: 'building-list',
            templateUrl: './app/Views/Administration/Building/building-list.component.html',
            providers: [administration_service_1.AdministrationService, sortHelper_1.SortHelper, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, exporttoexcel_service_1.ExportToExcel],
            inputs: ['action', 'siteId', 'menuaccess', 'returnData', 'attachmentSuccess'],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, notify_component_1.Notification, search_component_1.searchBox, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent]
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, administration_service_1.AdministrationService, sortHelper_1.SortHelper, core_1.KeyValueDiffers, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, exporttoexcel_service_1.ExportToExcel])
    ], BuildingListComponent);
    return BuildingListComponent;
}());
exports.BuildingListComponent = BuildingListComponent;
//# sourceMappingURL=building-list.component.js.map