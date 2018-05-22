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
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var SiteListComponent = (function () {
    function SiteListComponent(administrationService, _sortHelper, differs, _notificationService, generFun, exportObject) {
        this.administrationService = administrationService;
        this._sortHelper = _sortHelper;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.exportObject = exportObject;
        //import { ExportToExcelComponent} from '../../../Framework/Whatever/Export/exporttoexcel.component';
        this.disable = false;
        this.pageIndex = 0;
        this.position = "top-right";
        this.showSlide = false;
        this.showCloseSlide = false;
        this.showReopenSlide = false;
        this.add = false;
        this.edit = false;
        this.delete = false;
        this.filter = "";
        this.fileName = "SiteList.xls";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.updateSiteSelectedIds = new core_1.EventEmitter();
        this.targetTab = new core_1.EventEmitter();
        this.emitMenu = new core_1.EventEmitter();
        this.SiteStatus = new core_1.EventEmitter();
        this.pageTitle = "Site List Component";
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '[Site]', selectioMode: "single" };
        this.differ = differs.find({}).create(null);
    }
    SiteListComponent.prototype.advanceSearch = function () {
        var contextObj = this;
        this.administrationService.getAdvnceSearchLookup().subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
        });
    };
    SiteListComponent.prototype.AddChange = function (added) {
        this.itemsSource.unshift(added);
        var updatedData = new Array(); /*To notify the watcher about the change*/
        updatedData = updatedData.concat(this.itemsSource);
        this.itemsSource = updatedData;
        this.totalItems = this.generFun.updateTotalItems(this.totalItems, "add");
        this.emitMenu.emit({ TotalItems: this.totalItems });
    };
    SiteListComponent.prototype.EditChange = function (edited) {
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
    SiteListComponent.prototype.ngOnInit = function () {
        this.dataKey = ["Id"];
        var contextObj = this;
        this.administrationService.getSiteColumnData().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            for (var i = 0; i < contextObj.fieldObject.length; i++) {
                if (contextObj.fieldObject[i].FieldId == 176) {
                    contextObj.fieldObject[i].isContentHtml = "hyperlink";
                    break;
                }
            }
        });
        this.administrationService.getSiteData(this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Sites exist", 2);
                contextObj.disable = true;
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });
        setTimeout(function () {
            contextObj.administrationService.getSiteKeywordField().subscribe(function (resultData) {
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            });
        }, 3000);
    };
    SiteListComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            var scopesite = this.inputItems.selectedIds;
            this.updateSiteSelectedIds.emit({
                scopesite: scopesite
            });
        }
    };
    SiteListComponent.prototype.ngOnChanges = function (changes) {
        var context = this;
        if (changes["attachmentSuccess"] && changes["attachmentSuccess"]["currentValue"] != undefined) {
            context.refreshgrid = [];
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
        else if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            if (context.itemsSource)
                for (var i = 0; i < context.itemsSource.length; i++) {
                    if (context.itemsSource[i].Id == context.inputItems.selectedIds[0]) {
                        if (context.itemsSource[i]["Building Count"] == 0)
                            context.showSlide = !context.showSlide;
                        else
                            context._notificationService.ShowToaster("Selected Site cannot be deleted, Buildings added to it", 2);
                    }
                }
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "siteexport") {
            //context.administrationService.getExportData(44,110, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, context.filter, context.advanceValue).subscribe(function (resultData) {
            //    context.exportDataSource = resultData["Data"]["FieldBinderData"];
            //    context.exportObject.ExportData(context.exportDataSource, context.fieldObject, "Sites", function (retCode) {
            //        if (retCode == 0) {
            //            context._notificationService.ShowToaster("Site data exported", 3);
            //        }
            //        else context._notificationService.ShowToaster("Site data cannot be exported", 3);
            //    });
            //});
            var input = context.administrationService.getExportData(44, 110, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, context.fieldObject, "Sites", context.filter, context.advanceValue);
            context.exportObject.ExportDataFromServer(input, 1, "Sites", function (retCode) {
                if (retCode == 0) {
                    context._notificationService.ShowToaster("Site data exported", 3);
                }
                else
                    context._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
            });
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "close") {
            context.administrationService.CheckSiteInUseWorkorder(context.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    context._notificationService.ShowToaster("Selected Site is linked to Work Order module, cannot be closed", 2);
                }
                else if (context.itemsSource)
                    for (var i = 0; i < context.itemsSource.length; i++) {
                        if (context.inputItems.selectedIds[0] == context.itemsSource[i].Id)
                            if (context.itemsSource[i].StatusId == 3) {
                                context._notificationService.ShowToaster("Site is already closed", 2);
                                break;
                            }
                            else if (context.itemsSource[i].StatusId == 2) {
                                context._notificationService.ShowToaster("Blocked Site cannot be closed", 2);
                                break;
                            }
                            else {
                                context.showCloseSlide = !context.showCloseSlide;
                                break;
                            }
                    }
            });
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "reopen") {
            if (context.itemsSource)
                for (var i = 0; i < context.itemsSource.length; i++) {
                    if (context.inputItems.selectedIds[0] == context.itemsSource[i].Id)
                        if (context.itemsSource[i].StatusId == 1) {
                            context._notificationService.ShowToaster("Site is already active", 2);
                            break;
                        }
                        else if (context.itemsSource[i].StatusId == 2) {
                            context._notificationService.ShowToaster("Blocked Site cannot be re-opened", 2);
                            break;
                        }
                        else {
                            context.showReopenSlide = !context.showReopenSlide;
                            break;
                        }
                }
        }
        else if (changes["menuaccess"] && changes["menuaccess"]["currentValue"] != undefined) {
            for (var i = 0; i < changes["menuaccess"]["currentValue"].length; i++) {
                if (changes["menuaccess"]["currentValue"][i]["image"] == "Add")
                    context.add = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Edit")
                    context.edit = true;
                else if (changes["menuaccess"]["currentValue"][i]["image"] == "Delete")
                    context.delete = true;
            }
        }
        else if (changes["returnData"] && changes["returnData"]["currentValue"] != undefined) {
            if (context.action == 'add') {
                var added = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (context.itemsSource)
                    context.AddChange(added);
            }
            else if (context.action == 'edit') {
                var edited = JSON.parse(changes["returnData"]["currentValue"])[0];
                if (context.inputItems.selectedIds.length == 1) {
                    context.EditChange(edited);
                }
            }
        }
    };
    SiteListComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        /*code to delete from array manually
          if (event.returnOk == true) {
        for (var i = 0; i < this.itemsSource.length; i++) {
            for (var j = 0; j < this.inputItems.selectedIds.length; j++) {
                if (this.itemsSource[i]["FieldId"] == this.inputItems.selectedIds[j]) {
                    var index = (this.itemsSource.indexOf(this.itemsSource[i]));
                    if (index > -1) {
                        this.itemsSource.splice(index, 1)
                        var sortedData = new Array();//To notify the watcher about the change
                        sortedData = sortedData.concat(this.itemsSource);
                        this.itemsSource = sortedData;
                    }
                }
            }
        }*/
        function findEntity(entity) {
            return entity.Id === contextObj.inputItems.selectedIds[0];
        }
        this.administrationService.submitSiteDelete(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                var updatedList = new Array(); /*To notify the watcher about the change*/
                updatedList = updatedList.concat(contextObj.itemsSource);
                contextObj.itemsSource = updatedList;
                contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Sites exist", 2);
                }
                contextObj._notificationService.ShowToaster("Site deleted", 3);
            }
            else if ((resultData["Data"]["ServerId"] == -1)) {
                contextObj._notificationService.ShowToaster("Selected Site is linked to other module, cannot be deleted", 2);
            }
            else
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
    };
    SiteListComponent.prototype.onSort = function (objGrid) {
        var _this = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.administrationService.sortSite(this.pageIndex, objGrid.sortDir, objGrid.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) { return _this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]); });
    };
    SiteListComponent.prototype.pageChanged = function (event) {
        var _this = this;
        this.pageIndex = event.pageEvent.page;
        this.administrationService.sitePaging(this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) { return _this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]); });
    };
    SiteListComponent.prototype.RowUpdate = function (event) {
        if (this.inputItems.selectedIds.length == 1)
            this.id = this.inputItems.selectedIds;
        var contextObj = this;
        this.administrationService.submitSiteinlineEdit(event, this.id).subscribe(function (resultData) {
            contextObj.success = (resultData["Data"]);
            if (contextObj.success["StatusId"] == 1) {
                contextObj.disable = false;
                contextObj._notificationService.ShowToaster("Site updated", 3);
                contextObj.EditChange(JSON.parse(contextObj.success["Data"])[0]);
            }
            else if (contextObj.success["StatusId"] == 0)
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            else if (contextObj.success["StatusId"] == 3) {
                if (contextObj.success["ServerId"] == -2) {
                    contextObj._notificationService.ShowToaster("Site already exists", 5);
                }
                else if (contextObj.success["ServerId"] == -1) {
                    contextObj._notificationService.ShowToaster("Permitted number of sites already created", 5);
                }
                else if (contextObj.success["ServerId"] == -3)
                    contextObj._notificationService.ShowToaster("Site Code already exists", 5);
            }
        });
    };
    SiteListComponent.prototype.RowDelete = function (event) {
    };
    SiteListComponent.prototype.RowAdd = function (event) {
        var contextObj = this;
        var temp = JSON.parse(event);
        for (var i = 0; i < temp.length; i++) {
            if (temp[i]["ReportFieldId"] == 576) {
                temp[i]["Value"] = "1";
                break;
            }
        }
        this.administrationService.submitSiteinlineAdd(JSON.stringify(temp)).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            if (contextObj.success["StatusId"] == 1) {
                contextObj._notificationService.ShowToaster("Site added", 3);
                contextObj.disable = false;
                contextObj.itemsSource.pop();
                contextObj.AddChange(JSON.parse(contextObj.success["Data"])[0]);
            }
            else if (contextObj.success["StatusId"] == 0)
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            else if (contextObj.success["StatusId"] == 3) {
                if (contextObj.success["ServerId"] == -2) {
                    contextObj._notificationService.ShowToaster("Site already exists", 5);
                }
                else if (contextObj.success["ServerId"] == -1) {
                    contextObj._notificationService.ShowToaster("Permitted number of sites already created", 5);
                }
                else if (contextObj.success["ServerId"] == -3)
                    contextObj._notificationService.ShowToaster("Site Code already exists", 5);
            }
        });
    };
    SiteListComponent.prototype.onColValClick = function (event) {
        if (event.colVal > 0) {
            this.targetTab.emit("1");
        }
    };
    SiteListComponent.prototype.SaveAs = function (event) {
    };
    SiteListComponent.prototype.Delete = function (event) {
    };
    SiteListComponent.prototype.onloadSearch = function (event) {
        var contextObj = this;
        contextObj.filter = event.value;
        contextObj.advanceValue = "[]";
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.administrationService.SiteKeywordSeach(event.value, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Sites exist", 2);
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });
    };
    SiteListComponent.prototype.Clear = function (event) {
        var contextObj = this;
        this.administrationService.getAdvnceSearchLookup().subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
        });
    };
    SiteListComponent.prototype.onAdvanceSearch = function (event) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.filter = "";
        this.IsAdvanceSearch = 1;
        this.administrationService.SiteAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Sites exist", 2);
            }
            contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
        });
    };
    SiteListComponent.prototype.closeSlideDialog = function (value, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showCloseSlide = value.value;
        else if (index == 3)
            this.showReopenSlide = value.value;
    };
    SiteListComponent.prototype.okClose = function (event) {
        this.showCloseSlide = !this.showCloseSlide;
        var contextObj = this;
        this.administrationService.submitSiteClose(this.inputItems.selectedIds).subscribe(function (resultData) {
            var datakey = contextObj.inputItems.dataKey;
            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i][datakey] == JSON.parse(resultData)[0][datakey]) {
                    contextObj.itemsSource[i] = JSON.parse(resultData)[0];
                    var updatedData = new Array(); /*To notify the watcher about the change*/
                    updatedData = updatedData.concat(contextObj.itemsSource);
                    contextObj.itemsSource = updatedData;
                    contextObj._notificationService.ShowToaster("Site closed", 3);
                }
            }
        });
    };
    SiteListComponent.prototype.okReopen = function (event) {
        this.showReopenSlide = !this.showReopenSlide;
        var contextObj = this;
        this.administrationService.submitSiteReopen(this.inputItems.selectedIds).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            if (contextObj.success["ServerId"] == -1) {
                contextObj._notificationService.ShowToaster("Permitted number of sites already created", 5);
            }
            else {
                var datakey = contextObj.inputItems.dataKey;
                for (var i = 0; i < contextObj.itemsSource.length; i++) {
                    if (contextObj.itemsSource[i][datakey] == JSON.parse(resultData["Data"].Data[0])[0]["Id"]) {
                        contextObj.itemsSource[i] = JSON.parse(resultData["Data"].Data[0])[0];
                        var updatedData = new Array(); /*To notify the watcher about the change*/
                        updatedData = updatedData.concat(contextObj.itemsSource);
                        contextObj.itemsSource = updatedData;
                        contextObj._notificationService.ShowToaster("Site reopened", 3);
                    }
                }
            }
        });
    };
    SiteListComponent.prototype.cancelClick = function (value, index) {
        if (index == 1)
            this.showSlide = value.value;
        else if (index == 2)
            this.showCloseSlide = value.value;
        else if (index == 3)
            this.showReopenSlide = value.value;
    };
    SiteListComponent.prototype.ddlChangeFrmGrid = function (event) {
        var countryid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var result;
        var contextObj = this;
        if (countryid > 0) {
            if (parentFieldId == 171) {
                this.administrationService.loadState(countryid, parentFieldId).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        for (var i = 0; i < contextObj.fieldObject.length; i++) {
                            if (contextObj.fieldObject[i]["FieldId"] == 173) {
                                contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                contextObj.fieldObject[i]["FieldValue"] = "-1";
                                break;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < contextObj.fieldObject.length; i++) {
                            if (contextObj.fieldObject[i]["FieldId"] == 173) {
                                contextObj.fieldObject[i]["LookupDetails"]["LookupValues"] = null;
                                contextObj.fieldObject[i]["FieldValue"] = "-1";
                                break;
                            }
                        }
                    }
                });
            }
        }
        else {
            if (parentFieldId == 171) {
                for (var i = 0; i < contextObj.fieldObject.length; i++) {
                    if (contextObj.fieldObject[i]["FieldId"] == 173) {
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
    ], SiteListComponent.prototype, "updateSiteSelectedIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SiteListComponent.prototype, "targetTab", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SiteListComponent.prototype, "emitMenu", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SiteListComponent.prototype, "SiteStatus", void 0);
    SiteListComponent = __decorate([
        core_1.Component({
            selector: 'site-list',
            templateUrl: 'app/Views/Administration/Site/site-list.component.html',
            providers: [administration_service_1.AdministrationService, sortHelper_1.SortHelper, notify_service_1.NotificationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel],
            inputs: ['action', 'dataKey', 'menuaccess', 'returnData', 'attachmentSuccess'],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, notify_component_1.Notification, search_component_1.searchBox, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, sortHelper_1.SortHelper, core_1.KeyValueDiffers, notify_service_1.NotificationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel])
    ], SiteListComponent);
    return SiteListComponent;
}());
exports.SiteListComponent = SiteListComponent;
//# sourceMappingURL=site-list.component.js.map