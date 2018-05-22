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
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var drawingdetails_service_1 = require('../../../Models/Common/drawingdetails.service');
var asbuilt_service_1 = require('../../../Models/Asbuilts/asbuilt.service');
var sortHelper_1 = require('../../utils/sortHelper');
var opendrawing_component_1 = require('../opendrawing/opendrawing.component');
var revisionlist_component_1 = require('./revisionlist.component');
var markuplist_component_1 = require('./markuplist.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var drawing_addedit_component_1 = require('./drawing-addedit.component');
var reviewworkflow_service_1 = require('../../../models/common/reviewworkflow.service');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var buildingdrawing_list_component_1 = require('./buildingdrawing-list.component');
var floordrawing_list_component_1 = require('./floordrawing-list.component');
var sitedrawing_list_component_1 = require('./sitedrawing-list.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
require('../../../../Scripts/RSA.js');
var RSAObject = require('../../../../Scripts/RSA.js');
var space_service_1 = require('../../../Models/Space/space.service');
var markup_description_component_1 = require('../../../whatever/Asbuilts/Drawing Settings/markup-description.component');
var administration_service_1 = require('../../../models/administration/administration.service');
var reserveroom_schedulingopendrawing_component_1 = require('../../scheduling/drawings/reserveroom.schedulingopendrawing.component');
var wexbimViewer_component_1 = require('./wexbimViewer.component');
var DrawingDetailsComponent = (function () {
    function DrawingDetailsComponent(administrationService, cdr, generalFunctions, drawingDetailsService, _sortHelper, asbuiltService, notificationService, reviewWorkflowservice, spaceService) {
        this.administrationService = administrationService;
        this.generalFunctions = generalFunctions;
        this.drawingDetailsService = drawingDetailsService;
        this._sortHelper = _sortHelper;
        this.asbuiltService = asbuiltService;
        this.notificationService = notificationService;
        this.reviewWorkflowservice = reviewWorkflowservice;
        this.spaceService = spaceService;
        this.types = false;
        this.onDrawingTabClose = new core_1.EventEmitter();
        this.position = "top-right";
        this.positionConfirm = "top-left";
        this.showSlide = false;
        this.showSlideMarkup = false;
        this.showSlideDeleteSpaceData = false;
        this.showSlidelockDrawing = false;
        this.isDisplaySetting = false;
        this.isBuildingDrawing = undefined;
        this.blnIsGrid = true;
        this.dispSettingCategoryId = 14;
        //let $ = require('../../../../Scripts/jquery-1.10.2.js');
        this.splitviewBuilding = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.splitviewFloor = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.splitviewSite = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.splitviewMarkuplist = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.outDrawingobject = new core_1.EventEmitter();
        this.outUnlockDrawingClicked = new core_1.EventEmitter();
        this.unlockSpacedataClicked = new core_1.EventEmitter();
        this.showDrawingAfterUnlock = new core_1.EventEmitter();
        this.showZoomAfterUnlock = new core_1.EventEmitter();
        this.selectedTab = 0;
        this.pagePath = "";
        this.showSiteSecondary = false;
        this.btnName = "Save Changes";
        this.totalItems = 0;
        this.viewDrawing = false;
        this.IsOpenDrawingComponentActive = false;
        this.viewMarkup = false;
        this.reloaddwg = false;
        this.drawingDetails = { key: "", value: "" };
        this.inputItems = { dataKey: "DrawingId", grpWithCheckBx: false, allowAdd: false, allowEdit: false, selectedIds: [], rowData: [], selectioMode: 'Multiple' };
        this.gridcount = 6;
        this.enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
        this.enableFloorMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
        this.siteTabIndex = 999;
        this.buildingTabIndex = 0;
        this.floorTabIndex = 1;
        this.viewDrawingTabIndex = 2;
        this.buildingDrawinglistFormId = 47;
        this.floorDrawingListFormId = 48;
        this.markupCount = 0;
        this.showSlideDesc = false;
        this.isMarkupEdit = false;
        this.closeTbFuns = undefined;
        this.isBuildingDrawingOpen = false;
        this.floorTabName = "Drawings";
        this.viewTabName = "View Drawing";
        this.markupSaveMessage = "";
        this.isSchedulingUser = false;
        this.isSiteAdmin = false;
        this.drawingLabel = "Drawing";
        this.isPlotInDrawing = false;
        this.showIFC = false;
        //previlage
        this.getCusSubscribedFeatures = function (resCallback) {
            var contextObj = this;
            //contextObj.isBuildingDrawing = false;
            contextObj.administrationService.getCustomerSubscribedFeatures("117,285").subscribe(function (rt) {
                if (contextObj.generalFunctions.checkForUnhandledErrors(rt)) {
                    var customerFeatureobj = rt["Data"];
                    for (var i = 0; i < customerFeatureobj.length; i++) {
                        switch (customerFeatureobj[i]["Id"]) {
                            case 117:
                                contextObj.isBuildingDrawing = customerFeatureobj[i]["IsSubscribed"];
                                if (customerFeatureobj[i]["IsSubscribed"] == true)
                                    contextObj.checkSubscribedFeatures();
                                //contextObj.floorTabName = 'Floor Drawings';
                                break;
                            case 285:
                                contextObj.isPlotInDrawing = customerFeatureobj[i]["IsSubscribed"];
                                break;
                        }
                    }
                    resCallback();
                }
            });
        };
        this.changeMenu = function () {
            var contextObj = this;
            switch (contextObj.moduleId) {
                case 6:
                    this.modulename = "Telecom";
                    break;
                case 7:
                    this.modulename = "Assets";
                    break;
                case 8:
                    this.modulename = "Furniture";
                    break;
                case 17:
                    this.modulename = "Electrical";
                    break;
                case 18:
                    this.modulename = "Fire and Safety";
                    break;
                case 24:
                    this.modulename = "Security Assets";
                    break;
                case 25:
                    this.modulename = "Mechanical";
                    break;
                case 26:
                    this.modulename = "Plumbing";
                    break;
                case 27:
                    this.modulename = "Medical Gas";
                    break;
                default:
                    break;
            }
            switch (contextObj.moduleId) {
                case 1:
                    if (contextObj.pageTarget == 3 || contextObj.pageTarget == 4) {
                        contextObj.pageTarget = contextObj.currentPageTargetForAsbuilts;
                    }
                    switch (contextObj.pageTarget) {
                        case 1:
                            this.pagePath = "As Builts / Drawings";
                            //Drawings
                            contextObj.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                var callBack = function (data) {
                                    contextObj.menuData = data;
                                };
                                if (contextObj.buildingTabIndex == contextObj.selectedTab)
                                    contextObj.generalFunctions.GetPrivilegesOfPage(resultData["settingsbuilding"], callBack, 58, contextObj.administrationService, resultData["settingsbuilding"].length);
                                else {
                                    if (contextObj.isSiteAdmin == false)
                                        contextObj.generalFunctions.GetPrivilegesOfPage(resultData["settingsfloor"], callBack, 58, contextObj.administrationService, resultData["settingsfloor"].length);
                                    else
                                        contextObj.generalFunctions.GetPrivilegesOfPage(resultData["floordrawingsiteadmin"], callBack, 58, contextObj.administrationService, resultData["floordrawingsiteadmin"].length);
                                }
                                contextObj.menuTempData = contextObj.menuData;
                            });
                            break;
                        case 2:
                            this.pagePath = "Settings / As Builts / Drawings";
                            contextObj.dataKey = ["Id"];
                            //   this.keyWordLookup = this.asbuiltService.getDrawingListSearchKeyWordLookup();
                            contextObj.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                var callBack = function (data) {
                                    contextObj.menuData = data;
                                };
                                if (contextObj.buildingTabIndex == contextObj.selectedTab)
                                    contextObj.generalFunctions.GetPrivilegesOfPage(resultData["buildingdrawing"], callBack, 58, contextObj.administrationService, resultData["buildingdrawing"].length);
                                else {
                                    if (contextObj.isSiteAdmin == false)
                                        contextObj.generalFunctions.GetPrivilegesOfPage(resultData["floordrawing"], callBack, 58, contextObj.administrationService, resultData["floordrawing"].length);
                                    else
                                        contextObj.generalFunctions.GetPrivilegesOfPage(resultData["floordrawing"], callBack, 58, contextObj.administrationService, resultData["floordrawing"].length); //80776
                                }
                                contextObj.menuTempData = contextObj.menuData;
                            });
                            //    (resultData => {
                            //    //console.log(contextObj.menuData = contextObj.buildingTabIndex == contextObj.selectedTab ? resultData["buildingdrawing"] : resultData["setup"]),
                            //        contextObj.menuTempData = contextObj.menuData
                            //})
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
                    //   debugger;
                    switch (contextObj.pageTarget) {
                        case 1:
                            this.pagePath = "Space / Drawings"; //allocated drawing
                            //     debugger;
                            this.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                contextObj.menuData = resultData["space"],
                                    contextObj.menuTempData = contextObj.menuData;
                            });
                            break;
                        case 2:
                            this.pagePath = "Settings / Space / Unlock Drawings"; //unlock drawing
                            this.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                contextObj.menuData = resultData["space"],
                                    contextObj.menuTempData = contextObj.menuData;
                            });
                            break;
                        case 3:
                            this.pagePath = "Settings / Space / Lock Drawings"; //lock drawing
                            this.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                contextObj.menuData = resultData["lockdrawing"],
                                    contextObj.menuTempData = contextObj.menuData;
                            });
                            break;
                        case 4:
                            this.pagePath = "Settings / Space / Delete Space Data"; //deletespacedata
                            this.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                contextObj.menuData = resultData["deletespacedata"],
                                    contextObj.menuTempData = contextObj.menuData;
                            });
                            break;
                    }
                    break;
                case 12:
                    this.pagePath = "CAI / Drawings";
                    this.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                        contextObj.menuData = resultData["space"],
                            contextObj.menuTempData = contextObj.menuData;
                    });
                    break;
                case 4:
                    switch (contextObj.pageTarget) {
                        case 1:
                            break;
                    }
                    break;
                case 5:
                    switch (contextObj.pageTarget) {
                        case 1:
                            this.pagePath = "Employees / Drawings"; //allocated drawing
                            this.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                contextObj.menuData = resultData["employee"],
                                    contextObj.menuTempData = contextObj.menuData;
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
                            this.pagePath = contextObj.modulename + " / Drawings"; //allocated drawing
                            this.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                contextObj.menuData = resultData["assets"],
                                    contextObj.menuTempData = contextObj.menuData;
                            });
                            break;
                        case 2:
                            this.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                contextObj.menuData = resultData["assets"],
                                    contextObj.menuTempData = contextObj.menuData;
                                contextObj.selectedRowDetails = contextObj.selectedRow;
                            });
                            break;
                    }
                    break;
                //// Module Id : 8 - Furniture*************************************************
                //case 8: switch (contextObj.pageTarget) { //furniture drawinglist->opendrawing       
                //    case 1: this.pagePath = "Furniture / Drawings";//allocated drawing
                //        this.asbuiltService.getAsbuiltsMenuData().subscribe
                //            (resultData => {
                //                contextObj.menuData = resultData["assets"],
                //                    contextObj.menuTempData = contextObj.menuData
                //            })
                //        break;
                //    case 2: //From furniture list -> drawinglist->opendrawing
                //        this.asbuiltService.getAsbuiltsMenuData().subscribe
                //            (resultData => {
                //                contextObj.menuData = resultData["assets"],
                //                    contextObj.menuTempData = contextObj.menuData
                //                contextObj.selectedRowDetails = contextObj.selectedRow;
                //            })
                //        break;
                //    //************************************************************************
                //}
                //    break;
                //// Module Id : 18 - Fire and Safety********************************************
                //case 18: switch (contextObj.pageTarget) { //Fire and Safety drawinglist->opendrawing       
                //    case 1: this.pagePath = "Fire and Safety / Drawings";//allocated drawing
                //        this.asbuiltService.getAsbuiltsMenuData().subscribe
                //            (resultData => {
                //                contextObj.menuData = resultData["assets"],
                //                    contextObj.menuTempData = contextObj.menuData
                //            })
                //        break;
                //    case 2: //From Fire and Safety list -> drawinglist->opendrawing
                //        this.asbuiltService.getAsbuiltsMenuData().subscribe
                //            (resultData => {
                //                contextObj.menuData = resultData["assets"],
                //                    contextObj.menuTempData = contextObj.menuData
                //                contextObj.selectedRowDetails = contextObj.selectedRow;
                //            })
                //        break;
                //    //************************************************************************
                //}
                //    break;
                case 14:
                    switch (contextObj.pageTarget) {
                        case 1:
                            this.administrationService.checkSubscribedFeature('276').subscribe(function (result) {
                                debugger;
                                if (result["Data"][0]["IsSubscribed"] == true) {
                                    contextObj.drawingLabel = result["Data"][0].Value;
                                }
                                contextObj.pagePath = "Scheduling / " + contextObj.drawingLabel + "s";
                            });
                            this.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                                contextObj.menuData = resultData["scheduling"],
                                    contextObj.menuTempData = contextObj.menuData;
                            });
                            break;
                    }
                    break;
            }
        };
        this.cdr = cdr;
    }
    DrawingDetailsComponent.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.administrationService.checkSubscribedFeature('276').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"] == true) {
                contextObj.floorTabName = result["Data"][0].Value;
                contextObj.viewTabName = "View " + contextObj.floorTabName;
            }
            if (contextObj.moduleId != 14) {
                contextObj.floorTabName = "Floor Drawings";
                contextObj.viewTabName = "View Drawing";
            }
        });
    };
    DrawingDetailsComponent.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        contextObj.splitviewBuilding.showSecondaryView = false;
        contextObj.splitviewFloor.showSecondaryView = false;
        if (contextObj.moduleId == 1) {
            if (contextObj.isBuildingDrawing == true && event[0] == 0)
                contextObj.drawingType = 0;
            else if (contextObj.isBuildingDrawing == true && event[0] == 1)
                contextObj.drawingType = 1;
            else if (contextObj.isBuildingDrawing == false && event[0] == 0) {
                contextObj.buildingTabIndex = -1;
                contextObj.floorTabIndex = 0;
                contextObj.drawingType = 1;
            }
        }
        else {
            contextObj.isBuildingDrawing = false;
            contextObj.buildingTabIndex = -1;
            contextObj.floorTabIndex = 0;
            contextObj.drawingType = 1;
        }
        if (contextObj.isBuildingDrawingOpen && contextObj.viewDrawing == false)
            contextObj.selectedTab = 0;
        else
            contextObj.selectedTab = event[0];
        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                if (contextObj.menuData == null && contextObj.menuTempData != undefined)
                    contextObj.menuData = contextObj.menuTempData;
                else {
                    contextObj.changeMenu();
                }
                contextObj.isBuildingDrawingOpen = false;
                break;
            case contextObj.floorTabIndex:
                if (contextObj.menuData == null && contextObj.menuTempData != undefined)
                    contextObj.menuData = contextObj.menuTempData;
                else {
                    contextObj.changeMenu();
                }
                break;
            case contextObj.viewDrawingTabIndex:
                if (contextObj.menuData)
                    contextObj.menuData = null;
                break;
        }
    };
    DrawingDetailsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        if (this.moduleId == 7 && this.pageTarget == 4) {
        }
        if (this.isNotification == true || this.isNotification == undefined)
            this.isNotification = true;
        else
            this.isNotification = false;
        contextObj.getCusSubscribedFeatures(function () {
            //    debugger;
            contextObj.changeMenu();
            if (contextObj.isBuildingDrawing == false) {
                contextObj.drawingType = 1;
                contextObj.buildingTabIndex = -1;
                contextObj.floorTabIndex = 0;
            }
        });
        contextObj.administrationService.CheckIsSiteLevelAdmin(1).subscribe(function (result) {
            debugger;
            contextObj.isSiteAdmin = result == 1 ? true : false;
        });
        if (this.moduleId == 14) {
            this.floorTabName = 'Drawings';
            this.viewTabName = 'View Drawing';
        }
        //if (contextObj.moduleId == 1) {
        //    contextObj.floorTabName = "Floors";
        //}
        //console.log("this.moduleId", this.moduleId);
        //console.log("this.pageTarget", this.pageTarget);
        //console.log("contextObj.floorTabName", this.floorTabName);
    };
    DrawingDetailsComponent.prototype.outDrawingObject = function (event) {
        //debugger;
        //console.log("drawingdetailsoutObject", event);
        this.objiWhiz = event.dwgObject;
        this.markupObj = event.markupObj;
        this.outDrawingobject.emit({ "dwgObj": this.objiWhiz, "dwgId": this.drawingId });
    };
    DrawingDetailsComponent.prototype.onSubMenuChange = function (event) {
        this.menuClickValue = event.value;
        this.revisionNo = this.drawingDetails["LatestRevisionNo"] != undefined ? this.drawingDetails["LatestRevisionNo"] : this.revisionNo;
        this.DWLdrawingtype = this.drawingDetails["DrawingTypeId"] != undefined ? this.drawingDetails["DrawingTypeId"] : this.DWLdrawingtype;
        switch (this.moduleId) {
            case 1:
                if (event.value == 1) {
                    this.editClick();
                }
                else if (event.value == 2) {
                    this.addClick();
                }
                else if (event.value == 3) {
                    this.DeleteClick();
                }
                else if (event.value == 4) {
                    //this.menuData = null;
                    this.viewDrawings(this.inputItems.selectedIds);
                }
                else if (event.value == 11) {
                    this.downloadDrawing(this.selectedFloorIds, 0);
                }
                else if (event.value == 12) {
                    this.downloadDrawing(this.selectedBuildingIds, 1);
                }
                else if (event.value == 6) {
                    this.reviseClick();
                }
                else if (event.value == 7) {
                    if (this.markupCount > 0)
                        this.showSlide = true;
                    else
                        this.replaceClick();
                }
                else if (event.value == 8) {
                    this.onRevisionListClick();
                }
                else if (event.value == 9) {
                    this.onMarkupListClick();
                }
                else if (event.value == 10) {
                    this.displaySettingsClick();
                }
                break;
            case 2:
                switch (this.selectedTab) {
                    case this.buildingTabIndex: if (event.value == 1)
                        // this.openDrawing();
                        break;
                    case this.floorTabIndex: if (event.value == 1)
                        //  this.unlockDrawing();
                        break;
                }
                break;
            case 3:
            case 12:
                switch (this.selectedTab) {
                    case this.floorTabIndex:
                        if (event.value == 4) 
                        //this.menuData = null;
                        {
                            this.viewDrawings(this.inputItems.selectedIds);
                        }
                        else if (event.value == 11) {
                            //console.log("Delete Space data");
                            this.deleteDrawingClick();
                        }
                        else if (event.value == 12) {
                            this.lockDrawingClick();
                        }
                        break;
                }
                break;
            case 5:
                switch (this.selectedTab) {
                    case this.floorTabIndex:
                        if (event.value == 4)
                            //this.menuData = null;
                            this.viewDrawings(this.inputItems.selectedIds);
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
                switch (this.selectedTab) {
                    case this.floorTabIndex:
                        if (event.value == 4)
                            //this.menuData = null;
                            this.viewDrawings(this.inputItems.selectedIds);
                        break;
                }
                break;
            case 14:
                debugger;
                switch (this.selectedTab) {
                    case this.floorTabIndex:
                        if (event.value == 4)
                            var contextObj = this;
                        contextObj.administrationService.getSessionData().subscribe(function (data) {
                            var retData = data["Data"];
                            var sessionUserRoleId = retData["UserRoleId"];
                            if (sessionUserRoleId > 3) {
                                contextObj.administrationService.getAccessibleModuleForUser().subscribe(function (Data) {
                                    var accesibleModules = Data["Data"];
                                    var isSpaceEnabled = [];
                                    isSpaceEnabled = accesibleModules.filter(function (item) { return item.ModuleId === 3; });
                                    if (isSpaceEnabled.length == 0) {
                                        contextObj.isSchedulingUser = true;
                                        contextObj.viewDrawings(contextObj.inputItems.selectedIds);
                                    }
                                    else
                                        contextObj.viewDrawings(contextObj.inputItems.selectedIds);
                                });
                            }
                            else
                                contextObj.viewDrawings(contextObj.inputItems.selectedIds);
                        });
                        break;
                }
                break;
        }
    };
    DrawingDetailsComponent.prototype.okDeleteSpaceData = function () {
        var contextObj = this;
        contextObj.showSlide = false;
        contextObj.showSlideMarkup = false;
        contextObj.showSlideDesc = false;
        contextObj.showSlideDeleteSpaceData = false;
        // debugger
        contextObj.spaceService.DeleteSpaceData(contextObj.drawingId, contextObj.moduleId).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                var returndata = resultData["Data"];
                contextObj.returnData = returndata.Data;
                contextObj.action = "deletespacedata";
                contextObj.cdr.detectChanges();
                contextObj.action = "";
                if (returndata.Message == "Success") {
                    contextObj.notificationService.ShowToaster("Space Data for the selected floor(s) deleted", 2);
                }
            }
        });
    };
    DrawingDetailsComponent.prototype.noDeleteSpaceData = function () {
        var contextObj = this;
        contextObj.showSlide = false;
        contextObj.showSlideMarkup = false;
        contextObj.showSlideDesc = false;
        contextObj.showSlideDeleteSpaceData = false;
    };
    DrawingDetailsComponent.prototype.deleteDrawingClick = function () {
        var contextObj = this;
        if (contextObj.selectedFloorIds) {
            if (contextObj.selectedFloorIds.length > 0) {
                if (contextObj.selectedFloorIds.length > 1) {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    contextObj.showSlideDeleteSpaceData = true;
                }
            }
        }
    };
    DrawingDetailsComponent.prototype.lockDrawingClick = function () {
        var contextObj = this;
        //   debugger
        //var contextObj = this;
        if (contextObj.selectedFloorIds) {
            if (contextObj.selectedFloorIds.length > 0) {
                if (contextObj.selectedFloorIds.length > 1) {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    contextObj.showSlidelockDrawing = true;
                }
            }
        }
    };
    DrawingDetailsComponent.prototype.okLockDrawing = function () {
        //  debugger
        var contextObj = this;
        contextObj.showSlide = false;
        contextObj.showSlideMarkup = false;
        contextObj.showSlideDesc = false;
        contextObj.showSlideDeleteSpaceData = false;
        contextObj.showSlidelockDrawing = false;
        contextObj.spaceService.UpdateDrawingUnLockAslocked(contextObj.drawingId, contextObj.moduleId).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                var returndata = resultData["Data"];
                contextObj.returnData = returndata.Data;
                contextObj.action = undefined;
                contextObj.cdr.detectChanges();
                contextObj.action = "lockDrawingSuccess";
                if (returndata.Message == "Success") {
                    contextObj.notificationService.ShowToaster("Selected drawing(s) locked", 2);
                }
            }
        });
    };
    DrawingDetailsComponent.prototype.noLockDrawing = function () {
        var contextObj = this;
        contextObj.showSlide = false;
        contextObj.showSlideMarkup = false;
        contextObj.showSlideDesc = false;
        contextObj.showSlideDeleteSpaceData = false;
        contextObj.showSlidelockDrawing = false;
    };
    //Building
    DrawingDetailsComponent.prototype.updateBuildingDrawingSelectedID = function (event) {
        var contextObj = this;
        contextObj.selectedBuildingIds = event.scopebuildingdrawing;
        contextObj.totalItems = event.totalItems;
        contextObj.markupCount = event.rowData.Markups;
        contextObj.drawingCategoryId = event.rowData.DrawingCategoryId;
        contextObj.drawingId = event.rowData.DrawingId;
        contextObj.revisionNo = event.rowData['Revision No.'];
        contextObj.Revisions = event.rowData['Revisions'];
        contextObj.drawingDetails = event.rowData;
        // if (contextObj.totalItems != 0)
        //      contextObj.enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10,11];
        //console.log("selectedEvent", event);
        contextObj.cdr.detectChanges();
        contextObj.cdr.detectChanges();
    };
    //Floor
    DrawingDetailsComponent.prototype.updateFloorDrawingSelectedID = function (event) {
        console.log("updateFloorDrawingSelectedID", event);
        var contextObj = this;
        contextObj.selectedFloorIds = event["scopefloordrawing"];
        contextObj.totalItems = event.totalItems;
        contextObj.markupCount = event.rowData.Markups;
        contextObj.drawingId = event.rowData.DrawingId;
        contextObj.drawingCategoryId = event.rowData.DrawingCategoryId;
        contextObj.revisionNo = event.rowData['Revision No.'];
        contextObj.Revisions = event.rowData['Revisions'];
        contextObj.drawingDetails = event.rowData;
        if (event.rowData['FloorID'] == null && event.rowData['FloorId'] == null && event.rowData.length != 0) {
            contextObj.drawingType = 0;
        }
        else {
            contextObj.drawingType = 1;
        }
        //  if (contextObj.totalItems != 0)
        //      contextObj.enableMenu = [1, 2, 3, 4, 6, 7, 8,9,10,11];
        //console.log("selectedEventFloor", event);
        //console.log("updateFloorDrawingSelectedID", this.selectedFloorIds)
        contextObj.cdr.detectChanges();
    };
    DrawingDetailsComponent.prototype.buildingSelectionChange = function (selectedRow) {
        //   debugger
        //console.log("buildingSelectionChange", event);
        //this.totalItems = selectedRow.totalcount;
        //this.markupCount = selectedRow.event.rowdata.Markups;
        //this.drawingId = selectedRow.event.rowdata.DrawingId;
        //this.revisionNo = selectedRow.event.rowdata.Revisions;
    };
    DrawingDetailsComponent.prototype.floorSelectionChange = function (selectedRow) {
        // this.totalItems = selectedRow.totalcount;
        // this.markupCount = selectedRow.event.rowdata.Markups;    
        // this.drawingId = selectedRow.event.rowdata.DrawingId;
        //this.revisionNo = selectedRow.event.rowdata.Revisions;
    };
    DrawingDetailsComponent.prototype.onNoFloorData = function (event) {
        debugger;
        if (event["moduleId"]) {
            this.enableFloorMenu = [2];
        }
        else if (event["total"]) {
            this.enableFloorMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
        }
        else {
            this.menuData = null;
        }
    };
    //onNoFloorData(event) {
    //    debugger
    //    if (event["moduleId"] && event["pageTarget"]) {
    //        switch (event["moduleId"]) {
    //            case 1:
    //                switch (event["pageTarget"]) {
    //                    case 1:
    //                        this.enableMenu = [];
    //                        break;
    //                    case 2:
    //                        this.enableMenu = [2];
    //                        break;
    //                    case 3:
    //                        this.enableMenu = [2];
    //                        break;
    //                    case 4:
    //                        this.enableMenu = [2];
    //                        break;
    //                }
    //                break;
    //            case 3:
    //                this.enableMenu = [3, 4];
    //                break;
    //            default:
    //                 this.enableMenu = [3, 4];
    //                break;
    //        }
    //    }
    //    else {
    //        this.menuData = null;
    //    }
    //}
    DrawingDetailsComponent.prototype.onNoBuildingData = function (event) {
        //debugger
        if (event["moduleId"]) {
            this.enableMenu = [2];
        }
        else if (event["total"]) {
            this.enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
        }
        else {
            this.menuData = null;
        }
    };
    DrawingDetailsComponent.prototype.unlockDrawing = function (event) {
        this.outUnlockDrawingClicked.emit({ event: event, drawingId: this.drawingId });
    };
    DrawingDetailsComponent.prototype.spacedataClicked = function (event) {
        this.unlockSpacedataClicked.emit({ event: event, drawingId: this.drawingId });
    };
    DrawingDetailsComponent.prototype.reviseClick = function () {
        this.pageTitle = "Revise Drawing";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "revise";
                            contextObj.btnName = "Revise";
                            contextObj.splitviewBuilding.showSecondaryView = true;
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "revise";
                            contextObj.btnName = "Revise";
                            contextObj.splitviewFloor.showSecondaryView = true;
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
        }
    };
    DrawingDetailsComponent.prototype.okReplace = function (event) {
        var contextObj = this;
        contextObj.showSlide = !contextObj.showSlide;
        this.replaceClick();
    };
    DrawingDetailsComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    DrawingDetailsComponent.prototype.replaceClick = function () {
        this.pageTitle = "Replace Drawing";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        contextObj.action = "replace";
        contextObj.btnName = "Replace";
        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "replace";
                            contextObj.btnName = "Replace";
                            contextObj.splitviewBuilding.showSecondaryView = true;
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "replace";
                            contextObj.btnName = "Replace";
                            contextObj.splitviewFloor.showSecondaryView = true;
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
        }
    };
    DrawingDetailsComponent.prototype.editClick = function () {
        this.pageTitle = "Edit Drawing Description";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "edit";
                            contextObj.btnName = "Save Changes";
                            contextObj.drawingType = 0;
                            contextObj.splitviewBuilding.showSecondaryView = true;
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "edit";
                            contextObj.btnName = "Save Changes";
                            contextObj.drawingType = 1;
                            contextObj.splitviewFloor.showSecondaryView = true;
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
        }
        contextObj.cdr.detectChanges();
    };
    DrawingDetailsComponent.prototype.addClick = function () {
        this.pageTitle = "Add Drawing";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        contextObj.action = "add";
        contextObj.btnName = "Add";
        // this.selectedBuildingIds = [-1];
        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                contextObj.splitviewBuilding.showSecondaryView = true;
                break;
            case contextObj.floorTabIndex:
                contextObj.splitviewFloor.showSecondaryView = true;
                break;
        }
        contextObj.cdr.detectChanges();
    };
    DrawingDetailsComponent.prototype.DeleteClick = function () {
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        // debugger
        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "delete";
                            contextObj.btnName = "Delete";
                            contextObj.splitviewBuilding.showSecondaryView = false;
                            contextObj.cdr.detectChanges();
                            contextObj.action = "";
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "delete";
                            contextObj.btnName = "Delete";
                            contextObj.splitviewFloor.showSecondaryView = false;
                            contextObj.cdr.detectChanges();
                            contextObj.action = "";
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
        }
    };
    DrawingDetailsComponent.prototype.displaySettingsClick = function () {
        this.pageTitle = "Display Settings";
        //console.log("displaySettings");
        var contextObj = this;
        contextObj.action = "displaySettings";
        contextObj.isDisplaySetting = true;
        contextObj.splitviewBuilding.showSecondaryView = true;
        contextObj.splitviewFloor.showSecondaryView = true;
    };
    DrawingDetailsComponent.prototype.deleteSpaceData = function () {
        //console.log("deleteSpaceData");
        var contextObj = this;
        contextObj.action = "deleteSpaceData";
        contextObj.isDisplaySetting = false;
        contextObj.splitviewBuilding.showSecondaryView = false;
        contextObj.splitviewFloor.showSecondaryView = false;
    };
    DrawingDetailsComponent.prototype.lockDrawing = function () {
        //console.log("lockDrawing");
        var contextObj = this;
        contextObj.action = "lockDrawing";
        contextObj.isDisplaySetting = false;
        contextObj.splitviewBuilding.showSecondaryView = false;
        contextObj.splitviewFloor.showSecondaryView = false;
    };
    DrawingDetailsComponent.prototype.OnSuccessfulSubmi = function (event, index) {
        var contextObj = this;
        if (event["status"] == "success") {
            if (event["returnData"]) {
                if ((event["returnData"]["Data"]) != "") {
                    contextObj.returnData = event["returnData"]["Data"];
                    contextObj.drawingDetails = JSON.parse(contextObj.returnData)[0];
                }
                if (event["isUpdate"] == true) {
                    contextObj.markupCount = 0;
                    contextObj.drawingDetails = JSON.parse(contextObj.returnData)[0];
                }
                if (event["isRevised"]) {
                    if (event["isRevised"] == true) {
                        contextObj.revisionNo = +(contextObj.revisionNo) + 1;
                        contextObj.Revisions = +(contextObj.Revisions) + 1;
                    }
                    contextObj.drawingDetails = JSON.parse(contextObj.returnData)[0];
                }
            }
            if (event["returnDataBuilding"]) {
                if ((event["returnDataBuilding"]["Data"]) != "") {
                    contextObj.returnDataBuilding = event["returnDataBuilding"]["Data"];
                    contextObj.drawingDetails = JSON.parse(contextObj.returnDataBuilding)[0];
                }
                if (event["isUpdate"] == true) {
                    contextObj.markupCount = 0;
                    contextObj.drawingDetails = JSON.parse(contextObj.returnDataBuilding)[0];
                }
                if (event["isRevised"]) {
                    if (event["isRevised"] == true) {
                        contextObj.revisionNo = +(contextObj.revisionNo) + 1;
                        contextObj.Revisions = +(contextObj.Revisions) + 1;
                    }
                    contextObj.drawingDetails = JSON.parse(contextObj.returnDataBuilding)[0];
                }
            }
            contextObj.splitviewSite.showSecondaryView = false;
            contextObj.splitviewBuilding.showSecondaryView = false;
            contextObj.splitviewFloor.showSecondaryView = false;
        }
    };
    DrawingDetailsComponent.prototype.viewDrawings = function (id) {
        var contextObj = this;
        console.log(contextObj.revisionNo);
        contextObj.isDisplaySetting = false;
        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            // this.splitviewInput.showSecondaryView = false;
                            this.menuData = null;
                            contextObj.isBuildingDrawingOpen = true;
                            if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                                contextObj.IsOpenDrawingComponentActive = false;
                                contextObj.viewDrawing = false;
                                contextObj.deleteIndex = contextObj.viewDrawingTabIndex;
                            }
                            setTimeout(function () {
                                contextObj.IsOpenDrawingComponentActive = true;
                                contextObj.viewDrawing = true;
                                if (contextObj.DWLdrawingtype == 3) {
                                    contextObj.OpenRevit3DDrawing(contextObj.drawingId, contextObj.revisionNo, true);
                                }
                                contextObj.updateCrossSession(contextObj.selectedBuildingIds[0]);
                            }, 50);
                            setTimeout(function () {
                                if (contextObj.moduleId == 1) {
                                    if (contextObj.isBuildingDrawing == false)
                                        contextObj.selectedTab = 1;
                                    else
                                        contextObj.selectedTab = 2;
                                }
                                contextObj.deleteIndex = 0;
                            }, 100);
                            break;
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            this.menuData = null;
                            contextObj.isBuildingDrawingOpen = false;
                            if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                                this.IsOpenDrawingComponentActive = false;
                                this.viewDrawing = false;
                                this.deleteIndex = this.viewDrawingTabIndex;
                            }
                            setTimeout(function () {
                                contextObj.IsOpenDrawingComponentActive = true;
                                contextObj.viewDrawing = true;
                                if (contextObj.DWLdrawingtype == 3) {
                                    contextObj.OpenRevit3DDrawing(contextObj.drawingId, contextObj.revisionNo, false);
                                }
                                contextObj.updateCrossSession(contextObj.selectedFloorIds[0]);
                            }, 50);
                            setTimeout(function () {
                                if (contextObj.moduleId == 1) {
                                    if (contextObj.isBuildingDrawing == false)
                                        contextObj.selectedTab = 1;
                                    else
                                        contextObj.selectedTab = 2;
                                }
                                else {
                                    contextObj.selectedTab = 1;
                                }
                                contextObj.deleteIndex = 0;
                            }, 100);
                            break;
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
        }
    };
    DrawingDetailsComponent.prototype.OpenRevit3DDrawing = function (Id, RevNo, IsBuidling) {
        var contextObj = this;
        this.showIFC = true;
        //contextObj.administrationService.getRevit3DDrawingAppSetingsKey().subscribe(function (resultData) {
        //    var Url = resultData + "Default.aspx?Tgt=1&ModuleName=&ModuleId=&DId=" + Id + "&Rno=" + RevNo + "&BDwg=" + IsBuidling
        //    window.open(Url, '_blank');
        //    //var ua = window.navigator.userAgent;
        //    //var msie = ua.indexOf("MSIE");
        //    //if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
        //    //    msie = 1;
        //    //}
        //    //if (msie > 0) // If Internet Explorer, return version number
        //    //{
        //    //   // window.open(Url, '_blank');
        //    //    contextObj.plotMessage = Url;
        //    //    contextObj.showSlidePlot = true;
        //    //} else {
        //    //    window.open(Url, '_blank');
        //    //}
        //});
    };
    DrawingDetailsComponent.prototype.downloadDrawing = function (id, drawingType) {
        debugger;
        if (id.length > 1) {
            var contextObj = this;
            var multiDownload = [];
            var filename, drawingId;
            for (var i = 0; contextObj.drawingDetails[i]; i++) {
                contextObj.revisionNo = contextObj.drawingDetails[i]["Revision No."];
                multiDownload.push({
                    filename: contextObj.drawingDetails[i]["DWG File"],
                    ReferenceId: contextObj.drawingDetails[i]["DrawingId"],
                    revisionNo: contextObj.revisionNo,
                });
            }
            //if (contextObj.revisionNo == undefined)
            //    contextObj.revisionNo = contextObj.drawingDetails["LatestRevisionNo"]
            //if (contextObj.revisionNo == undefined)
            //    contextObj.revisionNo = contextObj.drawingDetails["Revision No."]
            //if (contextObj.revisionNo == undefined)
            //    contextObj.revisionNo = 0;
            contextObj.asbuiltService.multipleDownloadFile(contextObj.floorDrawingListFormId, drawingType, (JSON.stringify(multiDownload))).subscribe(function (resultData) {
                debugger;
                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.generalFunctions.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);
                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                            window.navigator.msSaveOrOpenBlob(blob, "Drawings.zip");
                        }
                        else if (isSafari) {
                            contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);
                        }
                        else {
                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", "Drawings.zip");
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
            });
        }
        else if (id.length == 1) {
            var contextObj = this;
            var filename;
            filename =
                contextObj.drawingDetails["DWG File"];
            if (contextObj.revisionNo == undefined)
                contextObj.revisionNo = contextObj.drawingDetails["LatestRevisionNo"];
            if (contextObj.revisionNo == undefined)
                contextObj.revisionNo = contextObj.drawingDetails["Revision No."];
            if (contextObj.revisionNo == undefined)
                contextObj.revisionNo = 0;
            contextObj.asbuiltService.downloadFile(contextObj.floorDrawingListFormId, contextObj.drawingId, filename, contextObj.revisionNo, drawingType).subscribe(function (resultData) {
                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.generalFunctions.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);
                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                            window.navigator.msSaveOrOpenBlob(blob, filename);
                        }
                        else if (isSafari) {
                            contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);
                        }
                        else {
                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", filename);
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
            });
        }
        else if (id.length == 0) {
            this.notificationService.ShowToaster("Select a Drawing", 2);
        }
    };
    DrawingDetailsComponent.prototype.updateCrossSession = function (SelectedId) {
        var contextObj = this;
        switch (contextObj.moduleId) {
            case 1:
                if (contextObj.buildingTabIndex == contextObj.selectedTab) {
                    contextObj.administrationService.ChangeCrossSessionValue(20, SelectedId).subscribe(function (resultData) {
                    });
                }
                else {
                    contextObj.administrationService.ChangeCrossSessionValue(5, SelectedId).subscribe(function (resultData) {
                    });
                }
                break;
            case 3: /*space*/
            case 12:
                contextObj.administrationService.ChangeCrossSessionValue(1, SelectedId).subscribe(function (resultData) {
                });
                break;
            case 5:
                contextObj.administrationService.ChangeCrossSessionValue(16, SelectedId).subscribe(function (resultData) {
                });
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
                contextObj.administrationService.ChangeCrossSessionValue(17, SelectedId).subscribe(function (resultData) {
                });
                break;
            case 14:
                contextObj.administrationService.ChangeCrossSessionValue(18, SelectedId).subscribe(function (resultData) {
                });
                break;
            case 2:
                contextObj.administrationService.ChangeCrossSessionValue(3, SelectedId).subscribe(function (resultData) {
                });
                break;
        }
    };
    DrawingDetailsComponent.prototype.showDrawingDetails = function (items) {
        //if (items.keyvalue.length > 0) {
        //    ////console.log("selectedId", items);
        //    this.splitviewInput.showSecondaryView = true;
        //    this.drawingDetails = items.rowdata;
        //    this.drawingId = items.keyvalue;
        //}
    };
    DrawingDetailsComponent.prototype.onViewDrawingClick = function (tab) {
        //this.viewDrawing = true;
        //var contextObj = this;
        //setTimeout(function () {
        //    contextObj.selectedTab = tab;
        //}, 1);
    };
    DrawingDetailsComponent.prototype.onMarkupListClick = function () {
        this.pageTitle = "Markups";
        var contextObj = this;
        var markupFromDescription = contextObj.markups == undefined ? 0 : contextObj.markups;
        contextObj.isDisplaySetting = false;
        contextObj.action = "markuplist";
        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            if (markupFromDescription == 0 && contextObj.markupCount == 0) {
                                contextObj.notificationService.ShowToaster("No Markups added", 2);
                                contextObj.splitviewFloor.showSecondaryView = false;
                                contextObj.splitviewBuilding.showSecondaryView = false;
                            }
                            else {
                                contextObj.splitviewFloor.showSecondaryView = false;
                                contextObj.splitviewBuilding.showSecondaryView = true;
                            }
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            if (markupFromDescription == 0 && contextObj.markupCount == 0) {
                                contextObj.notificationService.ShowToaster("No Markups added", 2);
                                contextObj.splitviewFloor.showSecondaryView = false;
                                contextObj.splitviewBuilding.showSecondaryView = false;
                            }
                            else {
                                contextObj.splitviewBuilding.showSecondaryView = false;
                                contextObj.splitviewFloor.showSecondaryView = true;
                            }
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
        }
    };
    DrawingDetailsComponent.prototype.onRevisionListClick = function () {
        //debugger
        this.pageTitle = "Revisions";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        contextObj.action = "revisionlist";
        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            if (contextObj.Revisions == 0) {
                                contextObj.notificationService.ShowToaster("No Revisions added", 2);
                            }
                            else {
                                contextObj.splitviewFloor.showSecondaryView = false;
                                contextObj.splitviewBuilding.showSecondaryView = true;
                            }
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            if (contextObj.Revisions == 0) {
                                contextObj.notificationService.ShowToaster("No Revisions added", 2);
                            }
                            else {
                                contextObj.splitviewBuilding.showSecondaryView = false;
                                contextObj.splitviewFloor.showSecondaryView = true;
                            }
                        }
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break;
        }
    };
    DrawingDetailsComponent.prototype.onrevisionCardClick = function (tab) {
        // //console.log("cardClick!2");
        //this.selectedTab = 1;
    };
    DrawingDetailsComponent.prototype.onmarkupCardClick = function (event) {
        ////console.log("cardClick markup");
    };
    // following are the search component functions
    DrawingDetailsComponent.prototype.SaveAs = function (event) {
        //console.log('Entered Save As');
    };
    DrawingDetailsComponent.prototype.Delete = function (event) {
        //console.log('Entered Delete');
    };
    DrawingDetailsComponent.prototype.onloadSearch = function (event) {
        //console.log('Enetered On Load Search');
    };
    DrawingDetailsComponent.prototype.Clear = function (event) {
        //console.log('Entered Clear');
    };
    DrawingDetailsComponent.prototype.Submit = function (event) {
        //console.log('Entered Search')
    };
    DrawingDetailsComponent.prototype.ShiftTab = function (event) {
        this.selectedTab = event;
    };
    //detailsOnClick() {
    //    this.splitviewDrawing.showSecondaryView = true;
    //}
    DrawingDetailsComponent.prototype.onTabClose = function () {
        this.showIFC = false;
        var callBackForCloseTab = this.closeTbFuns[1];
        var selectedTabObj = this.closeTbFuns[2];
        var tabContextObj = this.closeTbFuns[3];
        callBackForCloseTab(selectedTabObj, tabContextObj, "out");
        this.changeMenu();
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
        if (this.pageTarget == 2)
            this.onDrawingTabClose.emit({});
    };
    DrawingDetailsComponent.prototype.okMarkupSave = function () {
        var contextObj = this;
        var isBuildingDrawing = false;
        if (this.isMarkupEdit) {
            if (this.selectedTab == this.buildingTabIndex)
                isBuildingDrawing = true;
            contextObj.markupObj.saveMarkUp(function (xmlString) {
                //console.log("xmlString", xmlString);
                var xmlStringModified = xmlString.replace(/\\/g, "0x5c"); // replace becuase of ; not work on json (; convert to it's hex value)
                contextObj.drawingDetailsService.updateMarkupDetails(contextObj.markupObj.selectedEditmarkupData[0].markupId, contextObj.drawingType, xmlStringModified, contextObj.drawingId, contextObj.revisionNo, isBuildingDrawing).subscribe(function (resultData) {
                    if (resultData.StatusId == 1) {
                        contextObj.notificationService.ShowToaster("Markup uploaded", 3);
                    }
                    else
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                });
            });
        }
        else
            this.showSlideDesc = true;
        this.showSlideMarkup = false;
    };
    DrawingDetailsComponent.prototype.noMarkupSave = function () {
        var contextObj = this;
        this.showSlideMarkup = false;
        if (contextObj.closeTbFuns != undefined) {
            if (contextObj.objiWhiz) {
                contextObj.objiWhiz.close(function (returnCode) {
                    contextObj.onTabClose();
                });
            }
        }
    };
    DrawingDetailsComponent.prototype.onMarkupDesciptionSubmit = function (event) {
        //console.log("onMarkupDesciptionSubmit", event);
        debugger;
        var contextObj = this;
        var message = "";
        var isBuildingDrawing = false;
        var description = event[0].FieldValue;
        var markupFromDescription = contextObj.markups == undefined ? 0 : contextObj.markups;
        if (this.selectedTab == this.buildingTabIndex)
            isBuildingDrawing = true;
        contextObj.markupObj.saveMarkUp(function (xmlString) {
            //console.log("xmlString", xmlString);
            var xmlStringModified = xmlString.replace(/\\/g, "0x5c"); // replace becuase of ; not work on json (; convert to it's hex value)
            this.revisionNo = this.drawingDetails["LatestRevisionNo"] != undefined ? this.drawingDetails["LatestRevisionNo"] : this.revisionNo;
            contextObj.drawingDetailsService.insertMarkupDetails(contextObj.drawingType, xmlStringModified, description, contextObj.drawingId, contextObj.revisionNo, isBuildingDrawing, contextObj.moduleId, 0).subscribe(function (resultData) {
                message = resultData.Message;
                if (message = "Success") {
                    //contextObj.IsOpenDrawingComponentActive = false;
                    //contextObj.viewDrawing = false;
                    markupFromDescription = contextObj.markupCount + 1;
                    contextObj.markups = markupFromDescription;
                    contextObj.notificationService.ShowToaster("Markup uploaded", 3);
                    contextObj.objiWhiz.close(function (returnCode) {
                        contextObj.showSlideDesc = false;
                        if (contextObj.closeTbFuns != undefined)
                            contextObj.onTabClose();
                    });
                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            });
        });
    };
    DrawingDetailsComponent.prototype.onTabBeforeClose = function ($event) {
        var contextObj = this;
        this.showIFC = false;
        contextObj.closeTbFuns = $event;
        if (contextObj.moduleId == 1) {
            if (contextObj.objiWhiz && contextObj.markupObj) {
                if (contextObj.markupObj.isMarkupSaved)
                    contextObj.onTabClose();
                else {
                    contextObj.markupObj.hasMarkups(function (retCode, isEdit) {
                        if (retCode == 0) {
                            if (isEdit) {
                                contextObj.isMarkupEdit = isEdit;
                                contextObj.markupSaveMessage = "Do you want to save the Markup?";
                            }
                            else
                                contextObj.markupSaveMessage = "Do you want to save the newly added Markup?";
                            contextObj.showSlideMarkup = true;
                        }
                        else {
                            contextObj.onTabClose();
                        }
                    });
                }
            }
            else
                contextObj.onTabClose();
        }
        else {
            contextObj.selectedTab = contextObj.floorTabIndex;
            if (contextObj.objiWhiz) {
                contextObj.objiWhiz.close(function (returnCode) {
                    contextObj.onTabClose();
                });
            }
            else
                contextObj.onTabClose();
        }
        //var callBackForCloseTab = $event[1];
        //var selectedTabObj = $event[2];
        //var tabContextObj = $event[3];
        //callBackForCloseTab(selectedTabObj, tabContextObj);
    };
    DrawingDetailsComponent.prototype.onMarkupViewOnClick = function (event) {
        this.splitviewBuilding.showSecondaryView = false;
        this.splitviewFloor.showSecondaryView = false;
        this.currentPageTargetForAsbuilts = this.pageTarget;
        this.pageTarget = 3;
        this.markupEvent = event;
        this.viewDrawings(this.inputItems.selectedIds);
        //switch (this.selectedTab) {
        //    case this.buildingTabIndex:
        //        break;
        //    case this.floorTabIndex: this.pageTarget = 3;
        //        this.markupEvent = event;
        //        break;
        //}
    };
    DrawingDetailsComponent.prototype.onDrawingView = function (event) {
        debugger;
        var contextObj = this;
        //  var fieldObject = JSON.parse(event.event.fieldObject);
        this.currentPageTargetForAsbuilts = this.pageTarget;
        this.pageTarget = 4;
        contextObj.revisionNo = +(event.latestRevisionNo);
        contextObj.drawingId = event.drawingId;
        contextObj.drawingDetails = event.rowData;
        contextObj.viewDrawings(contextObj.drawingId);
    };
    DrawingDetailsComponent.prototype.onRevisionChange = function (event) {
        this.revisions = event.revisions;
        this.drawingId = event.drawingId;
    };
    DrawingDetailsComponent.prototype.onMarkupChange = function (event) {
        this.markups = event.markups; /*update revision count on change of floordrawinglist*/
        this.markupCount = this.markups;
        this.drawingId = event.drawingId;
    };
    DrawingDetailsComponent.prototype.getFieldObjectsBuilding = function (event) {
        var contextObj = this;
        contextObj.fieldObject = event.fields;
    };
    DrawingDetailsComponent.prototype.getFieldObjectsFloor = function (event) {
        var contextObj = this;
        contextObj.fieldObject = event.fields;
    };
    DrawingDetailsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    DrawingDetailsComponent.prototype.closeSlideDescDialog = function (value) {
        this.showSlideDesc = value.value;
    };
    DrawingDetailsComponent.prototype.closeSlideConfirmDialog = function (value) {
        this.showSlideMarkup = value.value;
    };
    DrawingDetailsComponent.prototype.closeSlideDeleteSpaceDataDialog = function (value) {
        this.showSlideDeleteSpaceData = value.value;
    };
    DrawingDetailsComponent.prototype.closeSlideLockDrawingDialog = function (value) {
        this.showSlidelockDrawing = value.value;
    };
    DrawingDetailsComponent.prototype.getUpdatedDisplaySettingsBuilding = function (event) {
        var contextObj = this;
        contextObj.fieldObject = contextObj.generalFunctions.updateDisplaySettingsinUI(contextObj.fieldObject, event);
    };
    DrawingDetailsComponent.prototype.getUpdatedDisplaySettingsFloor = function (event) {
        var contextObj = this;
        var contextObj = this;
        this.fieldObject = contextObj.generalFunctions.updateDisplaySettingsinUI(contextObj.fieldObject, event["dispSettingObject"]);
        //setTimeout(function () {
        //    contextObj.splitviewFloor.showSecondaryView = false;
        // }, 8000);
        //contextObj.isDisplaySetting = false;
        contextObj.splitviewFloor.showSecondaryView = false;
    };
    DrawingDetailsComponent.prototype.afterassetplaceclick = function (event) {
    };
    DrawingDetailsComponent.prototype.showDrawingAfterUnlockEvent = function (data) {
        this.showDrawingAfterUnlock.emit(data);
    };
    DrawingDetailsComponent.prototype.showZoomAfterUnlockEvent = function (data) {
        this.showZoomAfterUnlock.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DrawingDetailsComponent.prototype, "selectedRow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "pageTarget", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DrawingDetailsComponent.prototype, "isNotification", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "objectCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DrawingDetailsComponent.prototype, "isDrawingUnlocked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "connectivityListInputs", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "spaceObjInUnlock", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "onDrawingTabClose", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "outDrawingobject", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "outUnlockDrawingClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "unlockSpacedataClicked", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "showDrawingAfterUnlock", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DrawingDetailsComponent.prototype, "showZoomAfterUnlock", void 0);
    DrawingDetailsComponent = __decorate([
        core_1.Component({
            selector: 'drawingdetails',
            templateUrl: './app/Views/Common/DrawingDetails/drawingdetails.component.html',
            styleUrls: ['app/Views/Common/DrawingDetails/drawingdetails.css'],
            directives: [reserveroom_schedulingopendrawing_component_1.ReserveRoomSchedulingOpenDrawing, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, split_view_component_1.SplitViewComponent, submenu_component_1.SubMenu, section_component_1.SectionComponent, grid_component_1.GridComponent, opendrawing_component_1.OpenDrawing, drawing_addedit_component_1.DrawingAddEditComponent, notify_component_1.Notification, displaysettings_component_1.DisplaySettingsComponent, buildingdrawing_list_component_1.BuildingDrawingListComponent, floordrawing_list_component_1.FloorDrawingListComponent, sitedrawing_list_component_1.SiteDrawingListComponent, markuplist_component_1.MarkupsList, revisionlist_component_1.RevisionList, slide_component_1.SlideComponent, markup_description_component_1.MarkupDescriptionComponent, wexbimViewer_component_1.WexBMViewerComponent],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [drawingdetails_service_1.DrawingDetailsService, asbuilt_service_1.AsbuiltService, sortHelper_1.SortHelper, notify_service_1.NotificationService, General_1.GeneralFunctions, reviewworkflow_service_1.ReviewWorkFlowService, space_service_1.SpaceService, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, core_1.ChangeDetectorRef, General_1.GeneralFunctions, drawingdetails_service_1.DrawingDetailsService, sortHelper_1.SortHelper, asbuilt_service_1.AsbuiltService, notify_service_1.NotificationService, reviewworkflow_service_1.ReviewWorkFlowService, space_service_1.SpaceService])
    ], DrawingDetailsComponent);
    return DrawingDetailsComponent;
}());
exports.DrawingDetailsComponent = DrawingDetailsComponent;
//# sourceMappingURL=drawingdetails.component.js.map