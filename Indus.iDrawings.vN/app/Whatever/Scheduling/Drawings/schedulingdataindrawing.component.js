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
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var general_1 = require('../../../models/common/general');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var administration_service_1 = require('../../../models/administration/administration.service');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var common_service_1 = require('../../../models/common/common.service');
var space_service_1 = require('../../../models/space/space.service');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var customsearchforscheduling_component_1 = require('../seat booking/customsearchforscheduling.component');
var schedulingdataindrawing = (function () {
    function schedulingdataindrawing(spaceService, AdministrationService, schedulingService, cdr, notificationService, generFun, administrationService, commonService) {
        this.spaceService = spaceService;
        this.AdministrationService = AdministrationService;
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.commonService = commonService;
        this.userRoleId = 0;
        this.isModuleAdmin = false;
        this.selectedTab = 0;
        this.isAutoClose = false;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.menuData = [];
        this.inputItems = { dataKey: "SpaceId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", isautosizecolms: false };
        this.showZoomOnClick = new core_1.EventEmitter();
        this.onSchedulingTabChangedClick = new core_1.EventEmitter();
        this.showInDrawingOnClick = new core_1.EventEmitter();
        //splitviewAssignedHoteling = { showSecondaryView: false, showButton: false, secondaryArea: 30 }
        //splitviewTeamRooms: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 }
        this.isSeatBookingEnabled = undefined;
        this.isRoomBookingEnabled = undefined;
        this.Stylename = "search-containerInline";
        this.disable = false;
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.isSmartSearch = true;
        this.gridHeight = "100%";
        this.onSearchInDrawing = new core_1.EventEmitter();
        this.onSearchInDrawingClear = new core_1.EventEmitter();
        this.onSearchClick = new core_1.EventEmitter();
        this.workSpaceSearchFormId = 411;
        this.teamRoomSearchFormId = 412;
        this.specialRoomSearchFormId = 438;
        this.workspaceTotalItems = 0;
        this.teamRoomTotalItems = 0;
        this.specialRoomTotalItems = 0;
        this.isSpecialUseRoom = undefined;
        this.isWorkspaceSearch = false;
        this.isTeamRoomSearch = false;
        this.isSpecialRoomSearch = false;
        this.seattxt = "Workspace";
        this.searchSeatTitle = "Search Workspace";
        this.roomtext = "Team Room";
        this.searchRoomTitle = "Search Team Room";
        this.drawingLabel = "Drawing";
        this.IsProxyReservationEnabled = false;
        //  debugger
        this.formHeight = window.innerHeight - 250;
        this.formHeight = this.formHeight + "px";
        var contextObj = this;
        this.cdr = cdr;
        var contextObj = this;
        contextObj.spaceService.getSpaceGridField(14).subscribe(function (result) {
            // debugger
            var rptField = [6729, 6731];
            var rptFieldhide = [1772, 488, 523];
            var count = +(rptField.length + rptFieldhide.length);
            result["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) != -1) {
                    item.IsVisible = true;
                    count--;
                }
                if (rptFieldhide.indexOf(item.ReportFieldId) != -1) {
                    item.IsVisible = false;
                    count--;
                }
                if (count == 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            contextObj.fieldObject = contextObj.arrangeFields(result["Data"]);
        });
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            contextObj.userRoleId = retData["UserRoleId"];
            contextObj.schedulingService.GetUserRolebasedSettingsRowData(contextObj.userRoleId).subscribe(function (result) {
                if (result.Data.DataCount == 1) {
                    contextObj.IsProxyReservationEnabled = JSON.parse(result.Data.FieldBinderData)[0]["Is Proxy Reservation Enabled?"];
                }
                if (contextObj.IsProxyReservationEnabled == true || contextObj.userRoleId == 3 || contextObj.userRoleId == 1)
                    contextObj.isSpecialUseRoom = true;
                else {
                    contextObj.isSpecialUseRoom = false;
                }
            });
        });
    }
    schedulingdataindrawing.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.spaceService.checkSubscribedFeature('186,187').subscribe(function (resultData) {
            var jsonobject = resultData["Data"];
            if (jsonobject) {
                for (var i = 0; i < jsonobject.length; i++) {
                    switch (resultData["Data"][i]["Id"]) {
                        case 186:
                            contextObj.isRoomBookingEnabled = jsonobject[i]["IsSubscribed"];
                            break;
                        case 187:
                            contextObj.isSeatBookingEnabled = jsonobject[i]["IsSubscribed"];
                            break;
                    }
                }
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            contextObj.dataLoad(1);
        });
        this.checkSubscribedFeatures();
    };
    schedulingdataindrawing.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.seattxt = result["Data"][0].Value;
                contextObj.searchSeatTitle = "Search " + contextObj.seattxt;
            }
        });
        contextObj.schedulingService.checkSubscribedFeature('275').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtext = result["Data"][0].Value;
                contextObj.searchRoomTitle = "Search " + contextObj.roomtext;
            }
        });
    };
    schedulingdataindrawing.prototype.checkSubscribedFeaturesDrawingLabel = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('276').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.drawingLabel = result["Data"][0].Value;
                contextObj.menuData = [
                    {
                        "id": 1,
                        "title": "Show in " + contextObj.drawingLabel,
                        "image": "Show Drawing",
                        "path": "Show Drawing",
                        "submenu": null,
                        "privilegeId": 512
                    },
                    {
                        "id": 2,
                        "title": "Show Zoomed",
                        "image": "Show Zoomed",
                        "path": "Show Zoomed",
                        "submenu": null,
                        "privilegeId": 513
                    }
                ];
            }
        });
    };
    schedulingdataindrawing.prototype.getKeywordLookups = function (selectedTarget) {
        var contextObj = this;
        if (this.workSpaceKeyWordLookup == undefined && selectedTarget == 1) {
            contextObj.schedulingService.getWorkSpaceDataKeyWordLookUp(contextObj.DrawingId).subscribe(function (resultData) {
                contextObj.workSpaceKeyWordLookup = resultData["FieldBinderList"];
            });
        }
        if (this.teamRoomKeyWordLookup == undefined && selectedTarget == 2) {
            contextObj.schedulingService.getteamRommDataKeyWordLookUp(contextObj.DrawingId).subscribe(function (resultData) {
                contextObj.teamRoomKeyWordLookup = resultData["FieldBinderList"];
            });
        }
        if (this.specialRoomKeyWordLookup == undefined && selectedTarget == 3) {
            contextObj.schedulingService.getspecialRoomDataKeyWordLookUp(contextObj.DrawingId).subscribe(function (resultData) {
                contextObj.specialRoomKeyWordLookup = resultData["FieldBinderList"];
            });
        }
    };
    schedulingdataindrawing.prototype.checkDrawingIds = function (target) {
        //   debugger
        var contextObj = this;
        var spaceIdsInput = "";
        var drawingId;
        if (contextObj.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else {
            if (target == 1)
                contextObj.showInDrawingOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });
            else
                contextObj.showZoomOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });
        }
    };
    schedulingdataindrawing.prototype.pageChanged = function (event) {
        var contextObj = this;
    };
    ;
    schedulingdataindrawing.prototype.onSort = function (objGrid) {
        var contextObj = this;
        contextObj.dataLoad(2);
    };
    schedulingdataindrawing.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                contextObj.checkDrawingIds(event.value);
                break;
            case 2:
                contextObj.checkDrawingIds(event.value);
                break;
        }
    };
    schedulingdataindrawing.prototype.arrangeFields = function (fieldsdata) {
        var contextObj = this;
        var fields = [];
        var count = -1;
        var splicecount = -1;
        var rowData = "";
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 793) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 791) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 290) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 291) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 292) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 293) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 294) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 295) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 296) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 297) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 298) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 299) {
                splicecount = count;
                return el;
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }
        count = -1;
        splicecount = -1;
        fieldsdata.filter(function (el) {
            fields.push(el);
        });
        return fields;
    };
    schedulingdataindrawing.prototype.dataLoad = function (target) {
        debugger;
        var contextObj = this;
        var gridListTarget;
        if (this.selectedTab == 0) {
            if (this.isSeatBookingEnabled) {
                this.isWorkspaceSearch = true;
                gridListTarget = 1;
            }
            else if (this.isRoomBookingEnabled) {
                this.isTeamRoomSearch = true;
                gridListTarget = 2;
            }
            else {
                this.isSpecialRoomSearch = true;
                gridListTarget = 3;
            }
        }
        else if (this.selectedTab == 1) {
            if (this.isSeatBookingEnabled && this.isRoomBookingEnabled) {
                this.isTeamRoomSearch = true;
                gridListTarget = 2;
            }
            else {
                this.isSpecialRoomSearch = true;
                gridListTarget = 3;
            }
        }
        else if (this.selectedTab == 2) {
            this.isSpecialRoomSearch = true;
            gridListTarget = 3;
        }
        contextObj.schedulingService.getAllWorkSpaceDetails(14, contextObj.DrawingId, gridListTarget, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result.FieldBinderData);
            contextObj.totalItems = contextObj.itemsSource.length;
            contextObj.disable = false;
            if (contextObj.itemsSource.length == 0) {
                contextObj.enableMenu = [];
                if (target == 1) {
                    contextObj.disable = true;
                }
                if (gridListTarget == 1) {
                    contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s exist", 2);
                }
                if (gridListTarget == 2)
                    contextObj.notificationService.ShowToaster("No " + contextObj.roomtext + "s exist", 2);
                if (gridListTarget == 3)
                    contextObj.notificationService.ShowToaster("No Special Use Rooms exist", 2);
                //if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter != "") {
                contextObj.onSearchInDrawingClear.emit({ "filter": 1 });
            }
            else {
                contextObj.enableMenu = [1, 2];
                if (target == 1) {
                    if (gridListTarget == 1) {
                        contextObj.workspaceTotalItems = contextObj.totalItems;
                        contextObj.onSearchInDrawingClear.emit({ "filter": 0 });
                    }
                    if (gridListTarget == 2) {
                        contextObj.teamRoomTotalItems = contextObj.totalItems;
                        contextObj.onSearchInDrawingClear.emit({ "filter": 0 });
                    }
                    if (gridListTarget == 3)
                        contextObj.specialRoomTotalItems = contextObj.totalItems;
                }
                else {
                    if (gridListTarget == 1) {
                        if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: 14 });
                        else if (contextObj.IsKeyWordSearch == 0 && contextObj.IsAdvanceSearch == 1) {
                            contextObj.onSearchClick.emit({ searchdate: contextObj.searchdate });
                            // if (contextObj.workspaceTotalItems != contextObj.totalItems)
                            contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: 14, searchdate: contextObj.searchdate });
                        }
                    }
                    else if (gridListTarget == 2) {
                        if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: 14 });
                        else if (contextObj.IsKeyWordSearch == 0 && contextObj.IsAdvanceSearch == 1) {
                            contextObj.onSearchClick.emit({ searchdate: contextObj.searchdate });
                            //if (contextObj.teamRoomTotalItems != contextObj.totalItems)
                            contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: 14, searchdate: contextObj.searchdate });
                        }
                    }
                    else if (gridListTarget == 3) {
                        if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: 14 });
                        else if (contextObj.IsKeyWordSearch == 0 && contextObj.IsAdvanceSearch == 1)
                            contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: 14 });
                    }
                    if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter == "") {
                        contextObj.onSearchInDrawingClear.emit({ "filter": 1 });
                    }
                }
                contextObj.getKeywordLookups(gridListTarget);
            }
        });
    };
    schedulingdataindrawing.prototype.ngAfterViewInit = function () {
        debugger;
        var drawingid = this.DrawingId;
        var contextObj = this;
        contextObj.checkSubscribedFeaturesDrawingLabel();
        contextObj.menuData = [
            {
                "id": 1,
                "title": "Show in " + contextObj.drawingLabel,
                "image": "Show Drawing",
                "path": "Show Drawing",
                "submenu": null,
                "privilegeId": 512
            },
            {
                "id": 2,
                "title": "Show Zoomed",
                "image": "Show Zoomed",
                "path": "Show Zoomed",
                "submenu": null,
                "privilegeId": 513
            }
        ];
        if (contextObj.Target == 3 || contextObj.Target == 4) {
            contextObj.Stylename = "search-containerInlinefromgrid";
            if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                contextObj.gridHeight = window.innerHeight - 240;
                contextObj.gridHeight = contextObj.gridHeight + "px";
            }
        }
    };
    schedulingdataindrawing.prototype.getSelectedTab = function (event) {
        // debugger
        var contextObj = this;
        contextObj.selectedTab = event[0];
        contextObj.showSearchFilter = [];
        contextObj.ClearSearchValues("");
        contextObj.isWorkspaceSearch = false;
        contextObj.isTeamRoomSearch = false;
        contextObj.isSpecialRoomSearch = false;
        if (event[0] == 0 && event[1] == false) {
            contextObj.onSchedulingTabChangedClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });
            ;
        }
        else if (event[0] == 1 && event[1] == true) {
            contextObj.onSchedulingTabChangedClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });
            contextObj.dataLoad(1);
        }
        else if (event[0] == 2 && event[1] == true) {
            contextObj.onSchedulingTabChangedClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });
            contextObj.dataLoad(1);
        }
        if (event[0] == 0)
            contextObj.dataLoad(1);
    };
    schedulingdataindrawing.prototype.ngOnChanges = function (changes) {
        if (changes["UpdateData"] && changes["UpdateData"]["currentValue"]) {
            if (this.UpdateData[0]['action'] == "0" || this.UpdateData[0]['action'] == "1" || this.UpdateData[0]['action'] == "2") {
                //this.selectedTab = this.UpdateData[0]['action'];
                this.dataLoad(1);
            }
        }
    };
    schedulingdataindrawing.prototype.keywordSearchSubmit = function (event) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        this.dataLoad(2);
    };
    schedulingdataindrawing.prototype.Clear = function (event, target) {
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        if (target == 1)
            contextObj.workSpaceSearchFieldObject = JSON.parse(JSON.stringify(contextObj.workSpaceAdvancelookupDefault));
        else if (target == 2)
            contextObj.teamRoomSearchFieldObject = JSON.parse(JSON.stringify(contextObj.teamRoomAdvancelookupDefault));
        else if (target == 3)
            contextObj.specialRoomSearchFieldObject = JSON.parse(JSON.stringify(contextObj.specialRoomAdvancelookupDefault));
        this.dataLoad(1);
    };
    schedulingdataindrawing.prototype.ClearSearchValues = function (event) {
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
    };
    schedulingdataindrawing.prototype.advanceSearchSubmit = function (event) {
        //comment due to partial check in
        var filterObj = JSON.parse(event.fieldobject);
        var isLoadSearch = false;
        this.showSearchFilter = [];
        var dateValue = filterObj.find(function (el) { return el['ReportFieldId'] == 6714; })['Value'];
        var rbtnIndex = filterObj.findIndex(function (el) { return el['ReportFieldId'] == 6716; });
        if (dateValue != "" && rbtnIndex != -1) {
            var checkBetween = dateValue.indexOf('ÿ');
            if (checkBetween > -1) {
                var dateArray = dateValue.split('ô');
                var fromDate = dateArray[1];
                var toDate = dateArray[3];
                if (fromDate.indexOf("PM") > 0)
                    fromDate = fromDate.replace("PM", ":00 PM");
                else if (fromDate.indexOf("AM") > 0)
                    fromDate = fromDate.replace("AM", ":00 AM");
                if (toDate.indexOf("PM") > 0)
                    toDate = toDate.replace("PM", ":00 PM");
                else if (toDate.indexOf("AM") > 0)
                    toDate = toDate.replace("AM", ":00 AM");
                this.searchdate = fromDate + "ô" + toDate;
                if (new Date(fromDate) >= new Date(toDate)) {
                    this.showSearchFilter = this.showSearchFilter.concat(true);
                    this.notificationService.ShowToaster("To Time should be greater than From Time", 2);
                    this.isAutoClose = false;
                }
                else
                    isLoadSearch = true;
            }
            else
                isLoadSearch = true;
        }
        else {
            this.isAutoClose = false;
            this.showSearchFilter = this.showSearchFilter.concat(true);
            this.notificationService.ShowToaster("Select Date and Status", 2);
            filterObj.splice(filterObj.findIndex(function (el) { return el['ReportFieldId'] == 6714; }), 1);
            if (rbtnIndex != -1)
                filterObj.splice(rbtnIndex, 1);
        }
        this.filter = "";
        this.advanceValue = JSON.stringify(filterObj);
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        if (isLoadSearch) {
            this.isAutoClose = true;
            this.dataLoad(2);
        }
    };
    schedulingdataindrawing.prototype.teamRoomAdvanceSearch = function () {
        if (this.isAutoClose)
            this.isAutoClose = false;
        var contextObj = this;
        if (contextObj.teamRoomSearchFieldObject == undefined) {
            contextObj.schedulingService.getAdvanceSearchFields(contextObj.teamRoomSearchFormId, contextObj.DrawingId).subscribe(function (result) {
                var rptField = [6716];
                result["Data"]['FieldBinderList'].find(function (item) {
                    if (rptField.indexOf(item.ReportFieldId) != -1) {
                        item.DataEntryControlId = 20;
                        item.FieldValue = "0";
                    }
                });
                contextObj.teamRoomSearchFieldObject = result["Data"]['FieldBinderList'];
                contextObj.teamRoomAdvancelookupDefault = JSON.parse(JSON.stringify(contextObj.teamRoomSearchFieldObject));
            });
        }
    };
    schedulingdataindrawing.prototype.workSpaceAdvanceSearch = function () {
        if (this.isAutoClose)
            this.isAutoClose = false;
        var contextObj = this;
        if (contextObj.workSpaceSearchFieldObject == undefined) {
            contextObj.schedulingService.getAdvanceSearchFields(contextObj.workSpaceSearchFormId, contextObj.DrawingId).subscribe(function (result) {
                var rptField = [6716];
                result["Data"]['FieldBinderList'].find(function (item) {
                    if (rptField.indexOf(item.ReportFieldId) != -1) {
                        item.DataEntryControlId = 20;
                        item.FieldValue = "0";
                    }
                });
                contextObj.workSpaceSearchFieldObject = result["Data"]['FieldBinderList'];
                contextObj.workSpaceAdvancelookupDefault = JSON.parse(JSON.stringify(contextObj.workSpaceSearchFieldObject));
            });
        }
    };
    schedulingdataindrawing.prototype.specialRommAdvanceSearch = function () {
        if (this.isAutoClose)
            this.isAutoClose = false;
        var contextObj = this;
        if (contextObj.specialRoomSearchFieldObject == undefined) {
            contextObj.schedulingService.getAdvanceSearchFields(contextObj.specialRoomSearchFormId, contextObj.DrawingId).subscribe(function (result) {
                var rptField = [6716];
                result["Data"]['FieldBinderList'].find(function (item) {
                    if (rptField.indexOf(item.ReportFieldId) != -1) {
                        item.DataEntryControlId = 20;
                        item.FieldValue = "0";
                    }
                });
                contextObj.specialRoomSearchFieldObject = result["Data"]['FieldBinderList'];
                contextObj.specialRoomAdvancelookupDefault = JSON.parse(JSON.stringify(contextObj.specialRoomSearchFieldObject));
            });
        }
    };
    schedulingdataindrawing.prototype.getKeywordAndAdvSearchLookups = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], schedulingdataindrawing.prototype, "DrawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], schedulingdataindrawing.prototype, "Target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], schedulingdataindrawing.prototype, "UpdateData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], schedulingdataindrawing.prototype, "showZoomOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], schedulingdataindrawing.prototype, "onSchedulingTabChangedClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], schedulingdataindrawing.prototype, "showInDrawingOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], schedulingdataindrawing.prototype, "onSearchInDrawing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], schedulingdataindrawing.prototype, "onSearchInDrawingClear", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], schedulingdataindrawing.prototype, "onSearchClick", void 0);
    schedulingdataindrawing = __decorate([
        core_1.Component({
            selector: 'sheduling-workspace-data',
            templateUrl: './app/Views/Scheduling/Drawings/schedulingdataindrawing.html',
            directives: [customsearchforscheduling_component_1.Searchforschedule, split_view_component_1.SplitViewComponent, search_component_1.searchBox,
                page_component_1.PageComponent, submenu_component_1.SubMenu, displaysettings_component_1.DisplaySettingsComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, notify_component_1.Notification, grid_component_1.GridComponent],
            providers: [notify_service_1.NotificationService, general_1.GeneralFunctions, administration_service_1.AdministrationService, exporttoexcel_service_1.ExportToExcel, common_service_1.CommonService, scheduling_service_1.SchedulingService, space_service_1.SpaceService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, administration_service_1.AdministrationService, scheduling_service_1.SchedulingService, core_1.ChangeDetectorRef, notify_service_1.NotificationService, general_1.GeneralFunctions, administration_service_1.AdministrationService, common_service_1.CommonService])
    ], schedulingdataindrawing);
    return schedulingdataindrawing;
}());
exports.schedulingdataindrawing = schedulingdataindrawing;
//# sourceMappingURL=schedulingdataindrawing.component.js.map