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
var drawingdetails_service_1 = require('../../../Models/Common/drawingdetails.service');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var space_service_1 = require('../../../Models/Space/space.service');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var analytics_component_1 = require('../../common/analytics/analytics.component');
var FloorDrawingListComponent = (function () {
    function FloorDrawingListComponent(asbuiltService, _sortHelper, differs, _notificationService, generalFunctions, drawingDetailsService, employeeService, _spaceService, schedulingService, objectsService, administrationService) {
        this.asbuiltService = asbuiltService;
        this._sortHelper = _sortHelper;
        this.differs = differs;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.drawingDetailsService = drawingDetailsService;
        this.employeeService = employeeService;
        this._spaceService = _spaceService;
        this.schedulingService = schedulingService;
        this.objectsService = objectsService;
        this.administrationService = administrationService;
        this.disable = false;
        this.position = "top-right";
        this.showSlide = false;
        this.floordrawingId = 0;
        this.archiveId = 0;
        this.revisions = -1;
        this.markups = -1;
        this.add = false;
        this.edit = false;
        this.delete = true;
        this.floorDrawingListFormId = 48;
        this.spaceFloorDrawingListFormId = 112;
        this.employeeDrawingListFormId = 156;
        this.assetDrawingListFormId = 164;
        this.schedulingDrawingListFormId = 165;
        //  @Output() selectedSiteIdsChange = new EventEmitter();
        this.updateFloorSelectedIds = new core_1.EventEmitter();
        this.targetTab = new core_1.EventEmitter();
        this.onFloorSelectionChange = new core_1.EventEmitter();
        this.fieldobjectsFloor = new core_1.EventEmitter();
        this.onNoFloorData = new core_1.EventEmitter();
        this.pageTitle = "Floor Drawing List";
        this.inputItems = { dataKey: "DrawingId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', selectioMode: 'Multiple', showContextMenu: false };
        this.pageIndex = 0;
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.partialFloorWing = false;
        this.analyticsInput = { menuId: 0 };
        this.showAnalytics = false;
        var contextObj = this;
        contextObj.differ = differs.find({}).create(null);
        // contextObj.keyWordLookup = contextObj.employeeService.getAllEmployeeSearchKeyWordLookup();
    }
    FloorDrawingListComponent.prototype.ngOnInit = function () {
        this.getCusSubscribedFeatures();
    };
    FloorDrawingListComponent.prototype.getCusSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.administrationService.getCustomerSubscribedFeatures("26,276").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 26:
                        contextObj.partialFloorWing = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 276:
                        contextObj.drawinglabel = customerFeatureobj[i]["Value"] == "" ? "Drawing" : customerFeatureobj[i]["Value"];
                        break;
                }
            }
        });
    };
    FloorDrawingListComponent.prototype.ngAfterViewInit = function () {
        debugger;
        var contextObj = this;
        switch (contextObj.moduleId) {
            case 1:
                this.inputItems.showContextMenu = true;
            case 6:
                this.objectname = "Object";
                break;
            case 7:
                this.objectname = "Asset";
                break;
            case 8:
                this.objectname = "Furniture";
                break;
            case 17:
            case 18:
            case 25:
            case 26:
            case 27:
                this.objectname = "Component";
                break;
            case 24:
                this.objectname = "Equipment";
                break;
            default:
                break;
        }
        contextObj.objectCategoryId;
        contextObj.dataKey = ["DrawingId"];
        switch (contextObj.moduleId) {
            case 1:
                switch (contextObj.pageTarget) {
                    case 1:
                        contextObj.asbuiltService.getFloorDrawingsFields(contextObj.floorDrawingListFormId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                            }
                        });
                        contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            //console.log('Floor list', resultData["Data"]);
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                contextObj.totalItems = resultData["Data"].DataCount;
                                if (contextObj.totalItems == 0 || contextObj.totalItems == undefined) {
                                    contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                    contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                                    contextObj.disable = true;
                                }
                                else
                                    contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
                            }
                        });
                        contextObj.asbuiltService.getAllFloorDrawingKeywordField().subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                            }
                        });
                        break;
                    case 2:
                        contextObj.asbuiltService.getFloorDrawingsFields(contextObj.floorDrawingListFormId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                            }
                        });
                        contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            //console.log('Floor list', resultData["Data"]);
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                contextObj.totalItems = resultData["Data"].DataCount;
                                if (contextObj.totalItems == 0 || contextObj.totalItems == undefined) {
                                    contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                    contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                                    contextObj.disable = true;
                                }
                                else
                                    contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
                            }
                        });
                        contextObj.asbuiltService.getAllFloorDrawingKeywordField().subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                            }
                        });
                        break;
                    case 3: //load floor data after closing view tab (view selected from revision list)
                    case 4: //load floor data after closing view tab (view selected from markup list)
                    case 12:
                        //  var contextObj = contextObj;
                        contextObj.asbuiltService.getFloorDrawingsFields(contextObj.floorDrawingListFormId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                            }
                        });
                        contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            //console.log('floorDrawingListFormId', contextObj.floorDrawingListFormId);
                            //console.log('Floor list', resultData["Data"]);
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                contextObj.totalItems = resultData["Data"].DataCount;
                                if (contextObj.totalItems == 0 || contextObj.totalItems == undefined) {
                                    contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                    contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                                }
                                else
                                    contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
                            }
                        });
                        contextObj.asbuiltService.getAllFloorDrawingKeywordField().subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                            }
                        });
                        break;
                }
                break;
            case 2:
                switch (contextObj.pageTarget) {
                    case 1:
                        break;
                    case 2:
                        break;
                }
                break;
            case 3:
            case 12:
                switch (contextObj.pageTarget) {
                    case 1:
                        // var contextObj = this;
                        //  contextObj.inputItems = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: false };
                        var unlockedCount_1 = 0;
                        contextObj.drawingDetailsService.getDrawingLockedCount(contextObj.spaceFloorDrawingListFormId, 3).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                unlockedCount_1 = resultData["Data"];
                                if (unlockedCount_1 > 0)
                                    contextObj._notificationService.ShowToaster(unlockedCount_1.toString() + " drawing(s) to be unlocked", 2);
                            }
                        });
                        contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                                contextObj._spaceService.getSpaceFloorDrawingsData(contextObj.spaceFloorDrawingListFormId, contextObj.moduleId).subscribe(function (resultData) {
                                    //console.log('Floor list', resultData["Data"]);
                                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                    contextObj.totalItems = resultData["Data"].DataCount;
                                    if (contextObj.totalItems == 0 || contextObj.totalItems == undefined) {
                                        var msg = "";
                                        if (contextObj.moduleId == 12) {
                                            msg = "No Drawings are selected for CAI Drawing Management";
                                        }
                                        else {
                                            msg = "No Drawings are selected for Space Management";
                                        }
                                        contextObj._notificationService.ShowToaster(msg, 2);
                                        contextObj.onNoFloorData.emit({});
                                    }
                                });
                            }
                        });
                        break;
                    case 2:
                        //  var contextObj = this;
                        //  contextObj.inputItems = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: false };
                        contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                            }
                        });
                        contextObj.drawingDetailsService.getspacelockdrawingListData(contextObj.moduleId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                                contextObj.itemsPerPage = resultData.RowsPerPage;
                                contextObj.totalItems = resultData.DataCount;
                                if (contextObj.itemsSource.length == 0) {
                                    contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                    contextObj.onNoFloorData.emit({});
                                }
                            }
                        });
                        break;
                    case 3:
                        // var contextObj = this;
                        //   contextObj.inputItems = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: false };
                        contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                            }
                            // contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        });
                        contextObj._spaceService.unlockedDrawings(contextObj.moduleId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData.Data.FieldBinderData);
                                contextObj.itemsPerPage = resultData.Data.RowsPerPage;
                                contextObj.totalItems = resultData.Data.DataCount;
                                if (contextObj.itemsSource.length == 0) {
                                    contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                    contextObj.onNoFloorData.emit({});
                                }
                            }
                        });
                        break;
                    case 4:
                        // var contextObj = this;
                        //  contextObj.inputItems = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: false };
                        contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                            }
                        });
                        contextObj._spaceService.unlockedDrawings(contextObj.moduleId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData.Data.FieldBinderData);
                                contextObj.itemsPerPage = resultData.Data.RowsPerPage;
                                contextObj.totalItems = resultData.Data.DataCount;
                                if (contextObj.itemsSource.length == 0) {
                                    contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                    contextObj.onNoFloorData.emit({});
                                }
                            }
                        });
                        break;
                    case 10:
                        debugger;
                        contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                            }
                        });
                        contextObj._spaceService.GetArchiveDrawingDetails(contextObj.archiveId, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                                contextObj.itemsPerPage = resultData.RowsPerPage;
                                contextObj.totalItems = resultData.DataCount;
                            }
                        });
                        break;
                }
                break;
            case 4:
                break;
            case 5:
                switch (contextObj.pageTarget) {
                    case 1:
                        //  var contextObj = this;
                        //  contextObj.inputItems.isautosizecolms = false;
                        contextObj.employeeService.getEmployeeDrawingsFields(contextObj.employeeDrawingListFormId).subscribe(function (resultData) {
                            resultData["Data"].find(function (item) {
                                if (item.ReportFieldId == 513) {
                                    item.Width = 180;
                                }
                            });
                            contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                        });
                        contextObj.employeeService.getEmployeerawingListData(contextObj.employeeDrawingListFormId, contextObj.moduleId).subscribe(function (resultData) {
                            //if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                            contextObj.itemsPerPage = resultData.RowsPerPage;
                            contextObj.totalItems = resultData.DataCount;
                            if (contextObj.itemsSource.length == 0) {
                                contextObj._notificationService.ShowToaster("No Drawings are selected for Employee Management", 2);
                                contextObj.onNoFloorData.emit({});
                            }
                            // }
                        });
                        break;
                    case 6:
                        contextObj.employeeService.getEmployeeDrawingsFields(contextObj.employeeDrawingListFormId).subscribe(function (resultData) {
                            resultData["Data"].find(function (item) {
                                if (item.ReportFieldId == 513) {
                                    item.Width = 180;
                                }
                            });
                            contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                        });
                        contextObj.employeeService.getEmployeerawingListData(contextObj.employeeDrawingListFormId, contextObj.moduleId, contextObj.EmployeMovedrawingId).subscribe(function (resultData) {
                            //if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                            contextObj.itemsPerPage = resultData.RowsPerPage;
                            contextObj.totalItems = resultData.DataCount;
                            if (contextObj.itemsSource.length == 0) {
                                contextObj._notificationService.ShowToaster("No Drawings are selected for Employee Management", 2);
                                contextObj.onNoFloorData.emit({});
                            }
                            // }
                        });
                        break;
                }
                break;
            case 6: //telecom
            case 7: //assets
            case 8: //furniture
            case 17: //electrical
            case 18: //fire and safety
            case 24: //security assets
            case 25: //mechanical
            case 26: //plumbing
            case 27:
                debugger;
                switch (contextObj.pageTarget) {
                    case 1:
                        // var contextObj = this;
                        contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                            }
                        });
                        contextObj.objectsService.getObjectDrawingListData(contextObj.assetDrawingListFormId, Number(contextObj.objectCategoryId)).subscribe(function (resultData) {
                            debugger;
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                contextObj.totalItems = resultData["Data"].DataCount;
                                if (contextObj.itemsSource.length == 0) {
                                    contextObj._notificationService.ShowToaster("No Drawings are selected for " + contextObj.objectname + " Management", 2);
                                    contextObj.onNoFloorData.emit({});
                                }
                            }
                        });
                        break;
                    case 2:
                        // var contextObj = this;
                        contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                            }
                        });
                        contextObj.objectsService.getObjectDrawingListData(contextObj.assetDrawingListFormId, Number(contextObj.objectCategoryId)).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                contextObj.totalItems = resultData["Data"].DataCount;
                                if (contextObj.itemsSource.length == 0) {
                                    contextObj._notificationService.ShowToaster("No Drawings are selected for " + contextObj.objectname + " Management", 2);
                                    contextObj.onNoFloorData.emit({});
                                }
                            }
                        });
                        break;
                    case 4:
                        var SecondBlinkDetails = contextObj.BlinkSecondDrawings;
                        SecondBlinkDetails = SecondBlinkDetails.filter(function (item) { return item.ReportFieldId != 669; });
                        contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (result) {
                            contextObj.objectsService.getSecondDrawingList(JSON.stringify(SecondBlinkDetails)).subscribe(function (resultData) {
                                debugger;
                                //   contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                                contextObj.itemsPerPage = JSON.parse(resultData["FieldBinderData"]).RowsPerPage;
                                contextObj.totalItems = JSON.parse(resultData["FieldBinderData"]).DataCount;
                                if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                    contextObj.fieldObject = result["Data"];
                                    // contextObj.fieldObject = resultData["Data"];
                                    contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                                }
                            });
                        });
                        break;
                }
                break;
            //case 8: switch (contextObj.pageTarget) {//furniture
            //    case 1:
            //        // var contextObj = this;
            //        contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (resultData) {
            //            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            //                contextObj.fieldObject = resultData["Data"];
            //                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
            //            }
            //        });
            //        contextObj.objectsService.getAssetDrawingListData(contextObj.assetDrawingListFormId, Number(contextObj.objectCategoryId)).subscribe(function (resultData) {
            //            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            //                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            //                //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
            //                contextObj.itemsPerPage = resultData.RowsPerPage;
            //                contextObj.totalItems = resultData.DataCount;
            //                if (contextObj.itemsSource.length == 0) {
            //                    contextObj._notificationService.ShowToaster("No Drawings are selected for Furniture Management", 2);
            //                    contextObj.onNoFloorData.emit({});
            //                }
            //            }
            //        });
            //        break;
            //    case 2:
            //        // var contextObj = this;
            //        contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (resultData) {
            //            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            //                contextObj.fieldObject = resultData["Data"];
            //                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
            //            }
            //        });
            //        contextObj.objectsService.getAssetDrawingListData(contextObj.assetDrawingListFormId, Number(contextObj.objectCategoryId)).subscribe(function (resultData) {
            //            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            //                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            //                //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
            //                contextObj.itemsPerPage = resultData.RowsPerPage;
            //                contextObj.totalItems = resultData.DataCount;
            //                if (contextObj.itemsSource.length == 0) {
            //                    contextObj._notificationService.ShowToaster("No Drawings are selected for Furniture Management", 2);
            //                    contextObj.onNoFloorData.emit({});
            //                }
            //            }
            //        });
            //        break;
            //}
            //    break;
            case 14:
                switch (contextObj.pageTarget) {
                    case 1:
                        // var contextObj = this;
                        contextObj.schedulingService.getScheduledDrawingsFields().subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject });
                            }
                        });
                        contextObj.schedulingService.getSchedulingDrawingListData(contextObj.schedulingDrawingListFormId, contextObj.moduleId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                contextObj.totalItems = resultData["Data"].DataCount;
                                if (contextObj.itemsSource.length == 0) {
                                    contextObj._notificationService.ShowToaster("No " + contextObj.drawinglabel + "s are selected for Scheduling Management", 2);
                                    contextObj.onNoFloorData.emit({});
                                }
                            }
                        });
                        break;
                }
                break;
        }
    };
    FloorDrawingListComponent.prototype.ngDoCheck = function () {
        var contextobje = this;
        var changes = contextobje.differ.diff(contextobje.inputItems.selectedIds);
        if (changes) {
            var scopefloordrawing = contextobje.inputItems.selectedIds;
            contextobje.floorId = contextobje.inputItems.rowData.FloorID;
            contextobje.revisionNo = contextobje.inputItems.rowData.Revisions;
            contextobje.dwgFilename = contextobje.inputItems.rowData["DWG File"];
            //console.log("roedata", contextobje.inputItems.rowData);        
            contextobje.updateFloorSelectedIds.emit({
                scopefloordrawing: scopefloordrawing, rowData: contextobje.inputItems.rowData, totalItems: contextobje.totalItems
            });
        }
        //  //console.log("selected  "+ this.inputItems.selectedIds)
    };
    FloorDrawingListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (changes["returnData"] && changes["returnData"]["currentValue"] != undefined) {
            if (contextObj.action == 'add' && contextObj.itemsSource != undefined) {
                // contextObj.itemsSource.unshift(JSON.parse(changes["returnData"]["currentValue"])[0]);
                //// contextObj.itemsSource.push(JSON.parse(changes["returnData"]["currentValue"])[0]);
                // var updatedData = new Array();/*To notify the watcher about the change*/
                // updatedData = updatedData.concat(contextObj.itemsSource);
                // contextObj.itemsSource = updatedData;
                // contextObj.totalItems = contextObj.generalFunctions.updateTotalItems(contextObj.totalItems, "add");
                // debugger
                var returnData = { returnData: changes["returnData"]["currentValue"] };
                var retUpdatedSrc = void 0;
                retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "add", returnData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
                contextObj.disable = false;
            }
            else if (contextObj.itemsSource != undefined && (contextObj.action == 'edit' || contextObj.action == 'replace' || contextObj.action == 'revise')) {
                //
                if (contextObj.inputItems.selectedIds.length == 1) {
                    var datakey = contextObj.inputItems.dataKey;
                    for (var i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i][datakey] == JSON.parse(changes["returnData"]["currentValue"])[0][datakey]) {
                            contextObj.itemsSource[i] = JSON.parse(changes["returnData"]["currentValue"])[0];
                            // var updatedData = new Array();/*To notify the watcher about the change*/
                            //  updatedData = updatedData.concat(contextObj.itemsSource);
                            //contextObj.itemsSource = updatedData;
                            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        }
                    }
                }
            }
        }
        else if ((contextObj.action == 'deletespacedata') && contextObj.itemsSource != undefined) {
            var retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.totalItems = retUpdatedSrc["itemCount"];
            contextObj._notificationService.ShowToaster("Space Data for the selected floor(s) deleted", 3);
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "lockDrawingSuccess" && contextObj.itemsSource != undefined) {
            var retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.totalItems = retUpdatedSrc["itemCount"];
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            contextObj.showSlide = !contextObj.showSlide;
        }
        else if (changes["revisions"] && changes["revisions"]["currentValue"] != undefined) {
            var revisionnumber = changes["revisions"]["currentValue"];
            var drawingId_1 = this.floordrawingId;
            if (this.itemsSource) {
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
        }
        else if (changes["markups"] && changes["markups"]["currentValue"] != undefined) {
            var markupNumber = changes["markups"]["currentValue"];
            var drawingId_2 = this.floordrawingId;
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
    FloorDrawingListComponent.prototype.okFloorDelete = function (event) {
        var contextObj = this;
        function findEntity(entity) {
            return entity.Id === contextObj.inputItems.selectedIds[0];
        }
        debugger;
        contextObj.revisionNo = contextObj.inputItems.rowData.Revisions;
        if (contextObj.revisionNo == 0) {
            contextObj.asbuiltService.deleteFloorDrawing(contextObj.inputItems.selectedIds, 0, contextObj.floorId, contextObj.dwgFilename).subscribe(function (resultData) {
                if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"]["ServerId"] >= 0) {
                        var retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                        contextObj.totalItems = retUpdatedSrc["itemCount"];
                        contextObj._notificationService.ShowToaster("Drawing deleted", 3);
                        if (contextObj.itemsSource.length == 0) {
                            contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                            contextObj.disable = true;
                        }
                    }
                    else
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            });
        }
        else {
            contextObj.asbuiltService.deleteFloorDrawing(contextObj.inputItems.selectedIds, contextObj.revisionNo, 0, contextObj.dwgFilename).subscribe(function (resultData) {
                if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"]["ServerId"] >= 0) {
                        var datakey = contextObj.inputItems.dataKey;
                        for (var i = 0; i < contextObj.itemsSource.length; i++) {
                            if (contextObj.itemsSource[i][datakey] == contextObj.inputItems.selectedIds[0]) {
                                contextObj.itemsSource[i] = JSON.parse(resultData["Data"].Data)[0];
                                var updatedData = new Array(); /*To notify the watcher about the change*/
                                updatedData = updatedData.concat(contextObj.itemsSource);
                                contextObj.itemsSource = updatedData;
                            }
                        }
                        contextObj._notificationService.ShowToaster("Drawing deleted", 3);
                    }
                    else
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            });
        }
        contextObj.showSlide = !contextObj.showSlide;
    };
    FloorDrawingListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        contextObj.inputItems.sortCol = objGrid.sortCol;
        contextObj.inputItems.sortDir = objGrid.sortDir;
        switch (contextObj.moduleId) {
            case 1:
                switch (contextObj.pageTarget) {
                    case 1:
                        contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                            //  }
                        });
                        break;
                    case 2:
                        contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            //if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                            // }
                        });
                        break;
                }
                break;
            case 3:
            case 12:
                switch (contextObj.pageTarget) {
                    case 1:
                        contextObj.drawingDetailsService.sortSpaceDrawing(contextObj.spaceFloorDrawingListFormId, objGrid.sortDir, objGrid.sortCol, contextObj.moduleId).subscribe(function (resultData) {
                            //  if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                            //  }
                        });
                        break;
                    case 2:
                        contextObj.drawingDetailsService.sortSpaceUnlockDrawing(objGrid.sortDir, objGrid.sortCol, contextObj.moduleId).subscribe(//Space unlock
                        function (resultData) {
                            debugger;
                            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]));
                            // }
                        });
                        break;
                    case 3:
                        contextObj._spaceService.sortSpaceUnlockedData(objGrid.sortDir, objGrid.sortCol, contextObj.moduleId).subscribe(function (resultData) {
                            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                            // }
                        });
                        break;
                    case 4:
                        contextObj._spaceService.sortSpaceUnlockedData(objGrid.sortDir, objGrid.sortCol, contextObj.moduleId).subscribe(function (resultData) {
                            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                            // }
                        });
                        break;
                    case 10:
                        contextObj._spaceService.GetArchiveDrawingDetails(contextObj.archiveId, contextObj.pageIndex, objGrid.sortDir, objGrid.sortCol).subscribe(function (resultData) {
                            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                            // }
                        });
                        break;
                }
                break;
            case 5:
                switch (contextObj.pageTarget) {
                    case 1:
                        //  var contextObj = this;
                        contextObj.employeeService.getEmployeerawingListDataSort(contextObj.employeeDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);                           
                            //}
                        });
                        break;
                }
                break;
            case 6: //telecom
            case 7: //assets
            case 8: //furniture
            case 17: //electrical
            case 18: //fire and safety
            case 24: //security assets
            case 25: //mechanical
            case 26: //plumbing
            case 27:
                switch (contextObj.pageTarget) {
                    case 1:
                        // var contextObj = this;
                        contextObj.objectsService.getObjectDrawingListDataSort(contextObj.assetDrawingListFormId, contextObj.objectCategoryId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            // }
                        });
                        break;
                    case 2:
                        // var contextObj = this;
                        contextObj.objectsService.getObjectDrawingListDataSort(contextObj.assetDrawingListFormId, contextObj.objectCategoryId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            //if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            // }
                        });
                        break;
                }
                break;
            case 14: switch (contextObj.pageTarget) {
                case 1:
                    // var contextObj = this;
                    contextObj.schedulingService.getSchedulingDrawingListDataSort(contextObj.schedulingDrawingListFormId, contextObj.moduleId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                        // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                        // }
                    });
                    break;
                case 2:
                    // var contextObj = this;
                    contextObj.schedulingService.getSchedulingDrawingListDataSort(contextObj.schedulingDrawingListFormId, contextObj.moduleId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                        // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                        // }
                    });
                    break;
            }
        }
    };
    FloorDrawingListComponent.prototype.pageChanged = function (event) {
        // alert("pageChanged");
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        switch (contextObj.moduleId) {
            case 1:
                switch (contextObj.pageTarget) {
                    case 1:
                        contextObj.asbuiltService.FloorDrawingPaging(contextObj.floorDrawingListFormId, event.pageEvent.page, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                            }
                        });
                        break;
                    case 2:
                        // contextObj.asbuiltService.Paging(contextObj.floorDrawingListFormId, event.pageEvent.page).subscribe(resultData => contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                        contextObj.asbuiltService.FloorDrawingPaging(contextObj.floorDrawingListFormId, event.pageEvent.page, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                            }
                        });
                        break;
                }
                break;
            case 3:
            case 12:
                switch (contextObj.pageTarget) {
                    case 1:
                        contextObj.asbuiltService.spaceDrawingPaging(contextObj.spaceFloorDrawingListFormId, event.pageEvent.page, contextObj.moduleId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                            }
                        });
                        break;
                }
                break;
            case 6: //telecom
            case 7: //assets
            case 8: //furniture
            case 17: //electrical
            case 18: //fire and safety
            case 24: //security assets
            case 25: //mechanical
            case 26: //plumbing
            case 27:
                contextObj.objectsService.getObjectDrawingListDataSort(contextObj.assetDrawingListFormId, contextObj.objectCategoryId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                    // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.itemsSource.length == 0) {
                        contextObj._notificationService.ShowToaster("No Drawings are selected for " + contextObj.objectname + " Management", 2);
                    }
                    //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                    // }
                });
                break;
        }
    };
    FloorDrawingListComponent.prototype.RowUpdate = function (event) {
        // alert("RowUpdate");
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 1)
            contextObj.id = contextObj.inputItems.selectedIds;
        //console.log(event);
        this.asbuiltService.postgetaction(event, contextObj.id).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["Data"] != "") {
                    contextObj._notificationService.ShowToaster("Site Updated", 3);
                    contextObj.returnData = contextObj.success["Data"];
                }
            }
        });
    };
    FloorDrawingListComponent.prototype.RowDelete = function (event) {
        //   if (this.delete == true)
        this.showSlide = !this.showSlide;
        // this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Site?", "Yes");       
    };
    FloorDrawingListComponent.prototype.RowAdd = function (event) {
        var test = this.generalFunctions.getFieldValuesAsReportFieldArray(event);
        //console.log("fieldConverion", test);
        // this.administrationService.submitSiteAdd(test);
        this._notificationService.ShowToaster("Site added", 3);
    };
    FloorDrawingListComponent.prototype.onColValClick = function (colVal) {
        this.targetTab.emit("1");
        //console.log("colName", colVal.colName)
        //console.log("colVal", colVal.colVal);
    };
    FloorDrawingListComponent.prototype.SaveAs = function (event) {
        //console.log('Entered Save As');
    };
    FloorDrawingListComponent.prototype.Delete = function (event) {
        //console.log('Entered Delete');
    };
    FloorDrawingListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    FloorDrawingListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    FloorDrawingListComponent.prototype.floorSelectionChange = function (event) {
        //this.floorId = event.rowdata.FloorID;
        //this.revisionNo = event.rowdata.Revisions;  
        //this.dwgFilename = event.rowdata["DWG File Name"];    
        this.onFloorSelectionChange.emit({ event: event, totalcount: this.totalItems });
    };
    //search
    FloorDrawingListComponent.prototype.onloadSearch = function (event) {
        var contextObj = this;
        contextObj.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.asbuiltService.AllFloorDrawingKeywordSeach(event.value, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.itemsSource.length == 0) {
                contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
            }
            else {
                contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
            }
        });
    };
    FloorDrawingListComponent.prototype.Clear = function (event) {
        var contextObj = this;
        this.asbuiltService.getAllFloorDrawingAdvanceSearchLookup().subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"].filter(function (el) {
                if (el.FieldId == 1291 && contextObj.partialFloorWing == false) {
                    // debugger
                    return false;
                }
                else {
                    return true;
                }
            });
        });
    };
    FloorDrawingListComponent.prototype.Submit = function (event) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        this.asbuiltService.AllFloorDrawingAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.itemsSource.length == 0) {
                contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
            }
            else {
                contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
            }
            // }
        });
    };
    FloorDrawingListComponent.prototype.advanceSearch = function () {
        //debugger
        var contextObj = this;
        this.asbuiltService.getAllFloorDrawingAdvanceSearchLookup().subscribe(function (resultData) {
            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"].filter(function (el) {
                if (el.FieldId == 1291 && contextObj.partialFloorWing == false) {
                    // debugger
                    return false;
                }
                else {
                    return true;
                }
            });
            // contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            // }
        });
    };
    FloorDrawingListComponent.prototype.onContextMenuOnClick = function (event) {
        var tempID = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = tempID;
            this.analyticsInput.moduleId = this.moduleId;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch;
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = this.floorDrawingListFormId;
            this.analyticsInput.ParentFormId = 233;
            this.showAnalytics = true;
        }
    };
    FloorDrawingListComponent.prototype.closeAnalytics = function () {
        this.showAnalytics = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FloorDrawingListComponent.prototype, "BlinkSecondDrawings", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FloorDrawingListComponent.prototype, "EmployeMovedrawingId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorDrawingListComponent.prototype, "updateFloorSelectedIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorDrawingListComponent.prototype, "targetTab", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorDrawingListComponent.prototype, "onFloorSelectionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorDrawingListComponent.prototype, "fieldobjectsFloor", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorDrawingListComponent.prototype, "onNoFloorData", void 0);
    FloorDrawingListComponent = __decorate([
        core_1.Component({
            selector: 'floor-drawing-list',
            templateUrl: './app/Views/Common/DrawingDetails/floordrawing-list.component.html',
            providers: [sortHelper_1.SortHelper, notify_service_1.NotificationService, General_1.GeneralFunctions, asbuilt_service_1.AsbuiltService, drawingdetails_service_1.DrawingDetailsService, employee_services_1.EmployeeService, space_service_1.SpaceService, scheduling_service_1.SchedulingService, objects_service_1.ObjectsService, administration_service_1.AdministrationService],
            inputs: ['action', 'pageTarget', 'moduleId', 'returnData', 'floordrawingId', 'revisions', 'objectCategoryId', 'markups', 'connectivityListInputs', 'archiveId'],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, notify_component_1.Notification, search_component_1.searchBox, slide_component_1.SlideComponent, analytics_component_1.Analytics]
        }), 
        __metadata('design:paramtypes', [asbuilt_service_1.AsbuiltService, sortHelper_1.SortHelper, core_1.KeyValueDiffers, notify_service_1.NotificationService, General_1.GeneralFunctions, drawingdetails_service_1.DrawingDetailsService, employee_services_1.EmployeeService, space_service_1.SpaceService, scheduling_service_1.SchedulingService, objects_service_1.ObjectsService, administration_service_1.AdministrationService])
    ], FloorDrawingListComponent);
    return FloorDrawingListComponent;
}());
exports.FloorDrawingListComponent = FloorDrawingListComponent;
//# sourceMappingURL=floordrawing-list.component.js.map