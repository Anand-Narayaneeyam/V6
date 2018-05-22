var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../models/common/general.ts" />
var core_1 = require('@angular/core');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var asbuilt_service_1 = require('../../../Models/Asbuilts/asbuilt.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var sortHelper_1 = require('../../utils/sortHelper');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var analytics_component_1 = require('../../common/analytics/analytics.component');
var BuildingDrawingListComponent = (function () {
    function BuildingDrawingListComponent(asbuiltService, _sortHelper, differs, _notificationService, generalFunctions) {
        this.asbuiltService = asbuiltService;
        this._sortHelper = _sortHelper;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.buildingdrawingId = 0;
        this.revisions = -1;
        this.buildingmarkups = -1;
        this.position = "top-right";
        this.showSlide = false;
        this.add = false;
        this.edit = true;
        this.delete = true;
        this.buildingDrawinglistFormId = 47;
        this.onNoBuildingData = new core_1.EventEmitter();
        this.updateBuildingSelectedIds = new core_1.EventEmitter();
        this.targetTab = new core_1.EventEmitter();
        this.onBuildingSelectionChange = new core_1.EventEmitter();
        this.pageTitle = "Buliding Drawing List";
        this.inputItems = { dataKey: "DrawingId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: this.add, allowEdit: this.edit, selectioMode: 'Multiple', showContextMenu: false };
        this.analyticsInput = { menuId: 0 };
        this.showAnalytics = false;
        this.differ = differs.find({}).create(null);
    }
    BuildingDrawingListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.dataKey = ["DrawingId"];
        switch (this.moduleId) {
            case 1:
                switch (this.pageTarget) {
                    case 1:
                        contextObj.asbuiltService.getBuildingDrawingsFields().subscribe(function (resultData) {
                            //  contextObj.fieldobjectsBuilding.emit({ fields: contextObj.fieldObject })                                         
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = contextObj.setBuildingFieldDetails(resultData["Data"]); //edit enabling for description
                            }
                        });
                        contextObj.asbuiltService.getBuildingDrawingsData().subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                contextObj.totalItems = resultData["Data"].DataCount;
                                if (contextObj.itemsSource.length == 0) {
                                    contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                    contextObj.onNoBuildingData.emit({ moduleId: contextObj.moduleId });
                                }
                            }
                            contextObj.inputItems.showContextMenu = true;
                        });
                        break;
                    case 2:
                        contextObj.asbuiltService.getBuildingDrawingsFields().subscribe(function (resultData) {
                            // contextObj.fieldobjectsBuilding.emit({ fields: contextObj.fieldObject })
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = contextObj.setBuildingFieldDetails(resultData["Data"]); //edit enabling for description
                            }
                        });
                        contextObj.asbuiltService.getBuildingDrawingsData().subscribe(function (resultData) {
                            // //console.log('building list', resultData["Data"]);
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            if (contextObj.itemsSource.length == 0) {
                                contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                contextObj.onNoBuildingData.emit({ moduleId: contextObj.moduleId });
                            }
                            contextObj.inputItems.showContextMenu = true;
                        });
                        break;
                }
                break;
            case 2:
                switch (this.pageTarget) {
                    case 1:
                        contextObj.asbuiltService.getBuildingDrawingsFields().subscribe(function (resultData) {
                            //  contextObj.fieldobjectsBuilding.emit({ fields: contextObj.fieldObject })
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = contextObj.setBuildingFieldDetails(resultData["Data"]); //edit enabling for description
                            }
                        });
                        contextObj.asbuiltService.getBuildingDrawingsData().subscribe(function (resultData) {
                            // //console.log('building list', resultData["Data"]);
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                contextObj.totalItems = resultData["Data"].DataCount;
                            }
                        });
                        break;
                    case 2:
                        break;
                }
                break;
            case 3:
                switch (this.pageTarget) {
                    case 1:
                        break;
                }
                break;
            case 4:
                switch (this.pageTarget) {
                    case 1:
                        break;
                }
                break;
            case 5:
                switch (this.pageTarget) {
                    case 1:
                        break;
                }
                break;
            case 6:
                break;
        }
    };
    BuildingDrawingListComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            this.buildingId = this.inputItems.rowData.BuildingId;
            this.revisionNo = this.inputItems.rowData.Revisions;
            this.dwgFilename = this.inputItems.rowData["DWG File"];
            var scopebuildingdrawing = this.inputItems.selectedIds;
            this.updateBuildingSelectedIds.emit({
                scopebuildingdrawing: scopebuildingdrawing, rowData: this.inputItems.rowData, totalItems: this.totalItems
            });
        }
    };
    BuildingDrawingListComponent.prototype.ngOnChanges = function (changes) {
        debugger;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (changes["returnDataBuilding"] && changes["returnDataBuilding"]["currentValue"] != undefined) {
            if (contextObj.action == 'add') {
                if (contextObj.totalItems == 0) {
                    contextObj.itemsSource = [];
                    contextObj.itemsSource.push(JSON.parse(changes["returnDataBuilding"]["currentValue"])[0]);
                }
                else
                    contextObj.itemsSource.unshift(JSON.parse(changes["returnDataBuilding"]["currentValue"])[0]);
                var updatedData = new Array(); /*To notify the watcher about the change*/
                updatedData = updatedData.concat(contextObj.itemsSource);
                contextObj.itemsSource = updatedData;
                contextObj.onNoBuildingData.emit({ total: contextObj.itemsSource });
            }
            else if (contextObj.action == 'edit' || contextObj.action == 'replace' || contextObj.action == 'revise') {
                //
                if (contextObj.inputItems.selectedIds.length == 1) {
                    var datakey = contextObj.inputItems.dataKey;
                    for (var i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i][datakey] == JSON.parse(changes["returnDataBuilding"]["currentValue"])[0][datakey]) {
                            contextObj.itemsSource[i] = JSON.parse(changes["returnDataBuilding"]["currentValue"])[0];
                            //var updatedData = new Array();/*To notify the watcher about the change*/
                            //updatedData = updatedData.concat(contextObj.itemsSource);
                            //contextObj.itemsSource = updatedData;
                            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        }
                    }
                }
            }
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            contextObj.showSlide = true;
        }
        else if (changes["revisions"] && changes["revisions"]["currentValue"] != undefined) {
            var revisionnumber = changes["revisions"]["currentValue"];
            var drawingId_1 = this.buildingdrawingId;
            var list = this.itemsSource.find(function (el) {
                return el.DrawingId === drawingId_1;
            });
            if (list) {
                list.Revisions = revisionnumber;
                for (var i = 0; i < contextObj.itemsSource.length; i++) {
                    if (contextObj.itemsSource[i][contextObj.dataKey] == drawingId_1) {
                        contextObj.itemsSource[i] = list;
                        var updatedData = new Array(); /*To notify the watcher about the change*/
                        updatedData = updatedData.concat(contextObj.itemsSource);
                        contextObj.itemsSource = updatedData;
                        break;
                    }
                }
            }
        }
        else if (changes["buildingmarkups"] && changes["buildingmarkups"]["currentValue"] != undefined) {
            var markupNumber = changes["buildingmarkups"]["currentValue"];
            var drawingId_2 = this.buildingdrawingId;
            if (this.itemsSource) {
                var list = this.itemsSource.find(function (el) {
                    return el.DrawingId === drawingId_2;
                });
                if (list) {
                    list.Markups = markupNumber;
                    for (var i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i][contextObj.dataKey] == drawingId_2) {
                            contextObj.itemsSource[i] = list;
                            var updatedData = new Array(); /*To notify the watcher about the change*/
                            updatedData = updatedData.concat(contextObj.itemsSource);
                            contextObj.itemsSource = updatedData;
                            break;
                        }
                    }
                }
            }
        }
    };
    BuildingDrawingListComponent.prototype.okBuildingDelete = function (event) {
        var contextObj = this;
        contextObj.showSlide = !contextObj.showSlide;
        function findEntity(entity) {
            return entity.Id === contextObj.inputItems.selectedIds[0];
        }
        debugger;
        contextObj.revisionNo = contextObj.inputItems.rowData.Revisions;
        if (contextObj.revisionNo == 0) {
            contextObj.asbuiltService.deleteBuildingDrawing(contextObj.inputItems.selectedIds, 0, 0, contextObj.dwgFilename).subscribe(function (resultData) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    var retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    contextObj._notificationService.ShowToaster("Drawing deleted", 3);
                    if (contextObj.itemsSource.length == 0) {
                        contextObj.onNoBuildingData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                    }
                }
                else
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            });
        }
        else {
            contextObj.asbuiltService.deleteBuildingDrawing(contextObj.inputItems.selectedIds, contextObj.revisionNo, 0, contextObj.dwgFilename).subscribe(function (resultData) {
                if (resultData["Data"]["ServerId"] >= 0) {
                    //  contextObj.itemsSource.splice(contextObj.itemsSource.findIndex(findEntity), 1);
                    var updatedList = new Array(); /*To notify the watcher about the change*/
                    contextObj.itemsSource = JSON.parse(resultData["Data"].Data);
                    updatedList = updatedList.concat(contextObj.itemsSource);
                    contextObj.itemsSource = updatedList;
                    contextObj._notificationService.ShowToaster("Drawing deleted", 3);
                }
                else
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            });
        }
    };
    BuildingDrawingListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        contextObj.asbuiltService.sort(this.buildingDrawinglistFormId, objGrid.sortDir, objGrid.sortCol).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            }
        });
        //alert("onSort");
        //this.asbuiltService.sort(this.buildingDrawinglistFormId, objGrid.sortDir, objGrid.sortCol).subscribe(function (resultData) {
        //    resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
    };
    BuildingDrawingListComponent.prototype.pageChanged = function (event) {
        // alert("pageChanged");
        var contextObj = this;
        this.asbuiltService.Paging(this.buildingDrawinglistFormId, event.pageEvent.page).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            }
        });
    };
    BuildingDrawingListComponent.prototype.RowUpdate = function (event) {
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 1)
            contextObj.id = contextObj.inputItems.selectedIds;
        var contextObj = contextObj;
        this.asbuiltService.postgetaction(event, contextObj.id).subscribe(function (resultData) {
            contextObj.success = (resultData["Data"]);
            if (contextObj.success["Data"] != "") {
                contextObj._notificationService.ShowToaster("Drawing description updated", 3);
                contextObj.returnDataBuilding = contextObj.success["Data"];
            }
        });
    };
    BuildingDrawingListComponent.prototype.RowDelete = function (event) {
        //  if (this.delete == true)
        this.showSlide = !this.showSlide;
        // this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Site?", "Yes");       
    };
    BuildingDrawingListComponent.prototype.RowAdd = function (event) {
        var test = this.generalFunctions.getFieldValuesAsReportFieldArray(event);
        this._notificationService.ShowToaster("Site added", 3);
    };
    BuildingDrawingListComponent.prototype.onColValClick = function (colVal) {
        this.targetTab.emit("1");
        //console.log("colName", colVal.colName)
        //console.log("colVal", colVal.colVal);
    };
    BuildingDrawingListComponent.prototype.SaveAs = function (event) {
        //console.log('Entered Save As');
    };
    BuildingDrawingListComponent.prototype.Delete = function (event) {
        //console.log('Entered Delete');
    };
    BuildingDrawingListComponent.prototype.onloadSearch = function (event) {
        //console.log('Enetered On Load Search', event);
        //    this.administrationService.SiteKeywordSeach(event);
    };
    BuildingDrawingListComponent.prototype.Clear = function (event) {
        //console.log('Entered Clear');
    };
    BuildingDrawingListComponent.prototype.Submit = function (event) {
        //console.log('Entered Search')
    };
    BuildingDrawingListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    BuildingDrawingListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    BuildingDrawingListComponent.prototype.buildingSelectionChange = function (event) {
        //this.buildingId = event.rowdata.BuildingId;
        //this.revisionNo = event.rowdata.Revisions;
        //this.dwgFilename = event.rowdata["DWG File Name"];
        this.onBuildingSelectionChange.emit({ event: event, totalcount: this.totalItems });
    };
    BuildingDrawingListComponent.prototype.setBuildingFieldDetails = function (jsonobject) {
        var contextObj = this;
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] != 4382) {
                    jsonobject[i]["IsEnabled"] = false;
                    jsonobject[i]["ReadOnlyMode"] = true;
                }
            }
        }
        return jsonobject;
    };
    BuildingDrawingListComponent.prototype.onContextMenuOnClick = function (event) {
        var tempID = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = tempID;
            this.analyticsInput.moduleId = this.moduleId;
            this.analyticsInput.pageTarget = 2;
            this.analyticsInput.IsAdvanceSearch = 0;
            this.analyticsInput.IsKeywordSearch = 0;
            this.analyticsInput.KeywordFilterValue = "";
            this.analyticsInput.AdvanceFilterValue = "[]";
            this.analyticsInput.FormId = 47;
            this.analyticsInput.ParentFormId = 0;
            this.showAnalytics = true;
        }
    };
    BuildingDrawingListComponent.prototype.closeAnalytics = function () {
        this.showAnalytics = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingDrawingListComponent.prototype, "onNoBuildingData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingDrawingListComponent.prototype, "updateBuildingSelectedIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingDrawingListComponent.prototype, "targetTab", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingDrawingListComponent.prototype, "onBuildingSelectionChange", void 0);
    BuildingDrawingListComponent = __decorate([
        core_1.Component({
            selector: 'building-drawing-list',
            templateUrl: './app/Views/Common/DrawingDetails/buildingdrawing-list.component.html',
            providers: [asbuilt_service_1.AsbuiltService, sortHelper_1.SortHelper, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['action', 'pageTarget', 'moduleId', 'returnDataBuilding', 'buildingdrawingId', 'revisions', 'buildingmarkups'],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, notify_component_1.Notification, search_component_1.searchBox, slide_component_1.SlideComponent, analytics_component_1.Analytics]
        }), 
        __metadata('design:paramtypes', [asbuilt_service_1.AsbuiltService, sortHelper_1.SortHelper, core_1.KeyValueDiffers, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], BuildingDrawingListComponent);
    return BuildingDrawingListComponent;
}());
exports.BuildingDrawingListComponent = BuildingDrawingListComponent;
//# sourceMappingURL=buildingdrawing-list.component.js.map