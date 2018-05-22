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
var http_1 = require('@angular/http');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var datecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var reserveroom_reservationrequest_component_1 = require('./reserveroom-reservationrequest.component');
var Invitees_list_component_1 = require('./Invitees-list.component');
var Amenities_listforreservation_component_1 = require('./Amenities-listforreservation.component');
var Catering_listforreservation_component_1 = require('./Catering-listforreservation.component');
var Services_listforresrvation_component_1 = require('./Services-listforresrvation.component');
var radiocomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var scheduler_component_1 = require('../../../Framework/Whatever/Scheduler/scheduler.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var roomdetails_component_1 = require('./roomdetails.component');
var customsearchforscheduling_component_1 = require('../Seat Booking/customsearchforscheduling.component');
var ReserveroomComponenet = (function () {
    function ReserveroomComponenet(SchedulingService, AdministrationService, notificationService, generFun) {
        this.SchedulingService = SchedulingService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.disableDates = ["Sunday", "Saturday"];
        this.IsReserved = false;
        this.showSlide = false;
        this.position = "top-right";
        this.slidewidth = 300;
        this.schedulerArrObj = new Array();
        this.SitedatetimeArrObj = new Array();
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.RowCount = 0;
        this.IsAdvanceSearch = 0;
        this.IsAvailable = true;
        this.IsAddpageopened = false;
        this.IsGridloaded = false;
        //DrawingId: number = 0;
        this.SpaceId = 0;
        this.FloorId = 0;
        this.SiteId = 0;
        this.SpaceIdforrrom = 0;
        this.secondaryTarget = 0;
        this.advanceValue = "[]";
        this.arrayList = new Array();
        this.Seats = 0;
        this.ReservedBy = 0;
        this.filter = '';
        this.InviteesList = '';
        this.AmeniteesList = '';
        this.ServiceList = '';
        this.CateringList = '';
        this.sessionUserCatId = 0;
        this.sessionUserRoleId = 0;
        this.sessionUserId = 0;
        this.NameDisplayFormatId = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "SpaceId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, allowSort: false, sortDir: 'ASC', sortCol: '' };
        this.pagePath = "Scheduling / Reserve Team Room";
        this.sectionAccessExpansionStatus = [{ "title": "New Room Booking Request", "isExpanded": true }, { "title": "Invitees", "isExpanded": false }, { "title": "Amenities", "isExpanded": false }, { "title": "Services", "isExpanded": false }, { "title": "Catering", "isExpanded": false }];
        this.floorCellOnClick = new core_1.EventEmitter();
        this.itemSourceData = new core_1.EventEmitter();
        this.onSelChange = new core_1.EventEmitter();
        this.roomNoLinkClick = new core_1.EventEmitter();
        this.outSelectedData = new core_1.EventEmitter();
        this.arrHighlightRowIds = [];
        this.isSpecialRoom = false;
        this.roomtxt = "Team Room";
        this.searchTitle = "Search Team Room";
        this.IsProxyReservationEnabled = false;
        this.enableAminity = false;
        this.isShowBaseTeamMessage = false;
    }
    ReserveroomComponenet.prototype.ngOnInit = function () {
        var contextObj = this;
        if (this.drawingId == undefined)
            this.drawingId = 0;
        contextObj.SchedulingService.getReserveRoomFields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 7450) {
                    item.IsVisible = false;
                }
                if (item.ReportFieldId == 523 || item.ReportFieldId == 793)
                    item.isContentHtml = "hyperlink";
                if (contextObj.pageTarget == 2) {
                    if (item.ReportFieldId == 572 || item.ReportFieldId == 488 || item.ReportFieldId == 523 || item.ReportFieldId == 791 ||
                        item.ReportFieldId == 290 || item.ReportFieldId == 292 || item.ReportFieldId == 294 || item.ReportFieldId == 296 || item.ReportFieldId == 298)
                        item.IsVisible = false;
                    if (item.ReportFieldId == 793 || item.ReportFieldId == 6730) {
                        item.Width = 100;
                    }
                }
                if (item.ReportFieldId == 6730) {
                    item.FieldLabel = "Room Capacity";
                }
            });
            //contextObj.fieldObject = (resultData["Data"]);
            //contextObj.dateSelectorField = contextObj.fieldObject.splice(13, 14);
            contextObj.dateSelectorField = [];
            contextObj.fieldObject = [];
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 900197)
                    contextObj.dateSelectorField.push(item);
            });
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId != 900197)
                    contextObj.fieldObject.push(item);
                ;
            });
        });
        var d = new Date();
        var n = d.getHours();
        var t = new Date();
        t.setDate(t.getDate() + 1);
        var tommorowdate = contextObj.getFormattedDate(t);
        var todaydate = contextObj.getFormattedDate(new Date());
        this.TommorrowDate = tommorowdate;
        this.Dateforcalender = todaydate;
        this.StartDate = todaydate;
        this.EndDate = todaydate;
        this.SearchToDate = todaydate;
        this.checkSubscribedFeatures();
        this.ReserveRoomdataLoad(true);
        this.getSessionUserData(contextObj);
        setTimeout(function () {
            var $wjroot = $("div[wj-part='root']");
            var $scheduler = $("div[id='scheduler']");
            var $schedulerHeader = $("div[id='schedulerHeader']");
            //if (n > 3) {
            //    $scheduler.scrollLeft(120 * n);
            //}
            //$scheduler.scrollLeft (4000);
            if ($wjroot != undefined && $scheduler != undefined) {
                $wjroot.scroll(function () {
                    setTimeout(function () {
                        $scheduler.scrollTop($wjroot.scrollTop());
                    }, 100);
                });
                $scheduler.scroll(function () {
                    setTimeout(function () {
                        $wjroot.scrollTop($scheduler.scrollTop());
                        $schedulerHeader.scrollLeft($scheduler.scrollLeft());
                    }, 100);
                });
            }
        }, 2000);
    };
    ReserveroomComponenet.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.SchedulingService.checkSubscribedFeature('275').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtxt = result["Data"][0].Value;
            }
            contextObj.roomtxtcopy = contextObj.roomtxt;
            contextObj.searchTitle = "Search " + contextObj.roomtxt;
            contextObj.pagePath = "Scheduling / Reserve " + contextObj.roomtxt;
        });
        contextObj.pagePath = "Scheduling / Reserve " + contextObj.roomtxt;
        contextObj.SchedulingService.checkSubscribedFeature('282').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.enableAminity = result["Data"][0]["IsSubscribed"];
            }
        });
    };
    ReserveroomComponenet.prototype.getFormattedDate = function (dt) {
        var strDate = "";
        var date;
        if (dt != undefined) {
            date = new Date(dt);
        }
        else {
            date = new Date();
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        return strDate;
    };
    ReserveroomComponenet.prototype.arrangeSelectedItemOnTop = function () {
        var contextObj = this;
        var selectedRowDatas = [];
        var index = this.itemsSource.findIndex(function (el) { return el['SpaceId'] == contextObj.selectedData['SpaceId']; });
        selectedRowDatas.push(this.itemsSource[index]);
        this.itemsSource.splice(index, 1);
        var data = selectedRowDatas.concat(this.itemsSource);
        this.itemsSource = data;
    };
    ReserveroomComponenet.prototype.ReserveRoomdataLoad = function (isPageLoad) {
        debugger;
        var temp = new Array();
        var sitedt;
        var hr;
        var dt;
        var today = new Date(this.Dateforcalender);
        var contextObj = this;
        contextObj.IsGridloaded = false;
        contextObj.SearchQuery = '';
        contextObj.AminityQuery = '';
        contextObj.SitedatetimeArrObj = [];
        if (contextObj.IsAdvanceSearch == 1)
            contextObj.filter = contextObj.advanceValue;
        else
            contextObj.filter = '';
        this.SchedulingService.checkSubscribedFeature('278').subscribe(function (result) {
            contextObj.IsBaseTeamBasedResEnabled = result["Data"][0]["IsSubscribed"];
            if (contextObj.IsBaseTeamBasedResEnabled == true) {
                contextObj.SchedulingService.getReserveRoomData(contextObj.NameDisplayFormatId, contextObj.StartDate, contextObj.EndDate, contextObj.SearchQuery, contextObj.AminityQuery, contextObj.IsAvailable, contextObj.SearchToDate, contextObj.drawingId, contextObj.ReservedBy, contextObj.isSpecialRoom, true, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.pageTarget).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = contextObj.itemsSource.length;
                    contextObj.RowCount = contextObj.itemsSource.length;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.IsGridloaded = true;
                        if (contextObj.pageTarget == 2) {
                            contextObj.arrangeSelectedItemOnTop();
                            contextObj.itemSourceData.emit(contextObj.itemsSource);
                        }
                        if (contextObj.itemsSource) {
                            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                                contextObj.SitedatetimeArrObj.push({
                                    Datetime: contextObj.itemsSource[i]["DateTime"]
                                });
                                sitedt = new Date(contextObj.itemsSource[i]["DateTime"]);
                                hr = sitedt.getHours();
                                dt = sitedt.getDate();
                                temp[i] = hr;
                                for (var j = 0; j < 48; j++) {
                                    if (contextObj.itemsSource[i][j] != null) {
                                        var str = contextObj.itemsSource[i][j];
                                        var strDates = null;
                                        var Strdatefortooltip = null;
                                        var StrTime = null;
                                        if (str.includes("µ")) {
                                            strDates = str.split("µ")[0];
                                            Strdatefortooltip = str.split("µ")[0];
                                            StrTime = str.split("µ")[1];
                                            var strContent = str.split("µ")[2];
                                            var tooltip = null;
                                            if (strContent.includes("§")) {
                                                tooltip = Strdatefortooltip.slice(0, -2) + StrTime + " " + strContent.split("§")[0];
                                            }
                                            contextObj.schedulerArrObj.push({
                                                rowNo: i,
                                                bookedDates: strDates,
                                                strTooltip: tooltip
                                            });
                                        }
                                    }
                                }
                            }
                            var dateTimeForScroll = new Date(contextObj.itemsSource[0]["DateTime"]);
                            var dateforScroll = dateTimeForScroll.getDate();
                            var timeforScroll = dateTimeForScroll.getHours();
                            if (timeforScroll < 6)
                                timeforScroll = 6;
                            setTimeout(function () {
                                var date = new Date();
                                var $scheduler = $("div[id='scheduler']");
                                var $schedulerHeader = $("div[id='schedulerHeader']");
                                var largest;
                                if (today.getDate() == dateforScroll)
                                    largest = timeforScroll;
                                else
                                    largest = today.getHours();
                                if (largest > 3) {
                                    $scheduler.scrollLeft(120 * largest);
                                    $schedulerHeader.scrollLeft(120 * largest);
                                }
                                else
                                    $scheduler.scrollLeft(0);
                            }, 1000);
                        }
                        contextObj.IsAdvanceSearch = 0;
                        contextObj.LoadNonBaseOrgUnitSpace = true;
                    }
                    else {
                        contextObj.SchedulingService.checkSubscribedFeature('279').subscribe(function (result) {
                            contextObj.resOutsideBaseTeam = result["Data"][0]["IsSubscribed"];
                            if (contextObj.resOutsideBaseTeam == true) {
                                //contextObj.notificationService.ShowToaster("No Spaces assigned for Scheduling", 2)               
                                //Only CFPB Implimentation-New ReQuirement(base team) and other rooms availability
                                contextObj.LoadNonBaseOrgUnitSpace = false;
                                contextObj.SchedulingService.getReserveRoomData(contextObj.NameDisplayFormatId, contextObj.StartDate, contextObj.EndDate, contextObj.SearchQuery, contextObj.AminityQuery, contextObj.IsAvailable, contextObj.SearchToDate, contextObj.drawingId, contextObj.ReservedBy, contextObj.isSpecialRoom, false, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.pageTarget).subscribe(function (resultData) {
                                    // contextObj.totalItems = resultData["Data"].DataCount;
                                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                    contextObj.totalItems = contextObj.itemsSource.length;
                                    contextObj.RowCount = contextObj.itemsSource.length;
                                    if (contextObj.totalItems > 0) {
                                        if (isPageLoad == true && contextObj.isShowBaseTeamMessage == true) {
                                            contextObj.notificationService.ShowToaster(contextObj.roomtxt + " in your Team are already reserved. Select any other Room to reserve", 2);
                                        }
                                        contextObj.IsGridloaded = true;
                                        if (contextObj.pageTarget == 2)
                                            contextObj.itemSourceData.emit(contextObj.itemsSource);
                                        if (contextObj.itemsSource) {
                                            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                                                contextObj.SitedatetimeArrObj.push({
                                                    Datetime: contextObj.itemsSource[i]["DateTime"]
                                                });
                                                sitedt = new Date(contextObj.itemsSource[i]["DateTime"]);
                                                hr = sitedt.getHours();
                                                dt = sitedt.getDate();
                                                temp[i] = hr;
                                                for (var j = 0; j < 48; j++) {
                                                    if (contextObj.itemsSource[i][j] != null) {
                                                        var str = contextObj.itemsSource[i][j];
                                                        var strDates = null;
                                                        var Strdatefortooltip = null;
                                                        var StrTime = null;
                                                        if (str.includes("µ")) {
                                                            strDates = str.split("µ")[0];
                                                            Strdatefortooltip = str.split("µ")[0];
                                                            StrTime = str.split("µ")[1];
                                                            var strContent = str.split("µ")[2];
                                                            var tooltip = null;
                                                            if (strContent.includes("§")) {
                                                                tooltip = Strdatefortooltip.slice(0, -2) + StrTime + " " + strContent.split("§")[0];
                                                            }
                                                            contextObj.schedulerArrObj.push({
                                                                rowNo: i,
                                                                bookedDates: strDates,
                                                                strTooltip: tooltip
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                            var dateTimeForScroll = new Date(contextObj.itemsSource[0]["DateTime"]);
                                            var dateforScroll = dateTimeForScroll.getDate();
                                            var timeforScroll = dateTimeForScroll.getHours();
                                            if (timeforScroll < 6)
                                                timeforScroll = 6;
                                            setTimeout(function () {
                                                var $scheduler = $("div[id='scheduler']");
                                                var $schedulerHeader = $("div[id='schedulerHeader']");
                                                var largest;
                                                if (today.getDate() == dateforScroll)
                                                    largest = timeforScroll;
                                                else
                                                    largest = today.getHours();
                                                if (largest > 3) {
                                                    $scheduler.scrollLeft(120 * largest);
                                                }
                                                else {
                                                    $scheduler.scrollLeft(0);
                                                    $schedulerHeader.scrollLeft(0);
                                                }
                                            }, 1000);
                                        }
                                        contextObj.IsAdvanceSearch = 0;
                                    }
                                    else {
                                        contextObj.notificationService.ShowToaster("No Spaces assigned for Scheduling", 2);
                                    }
                                });
                            } //
                            else {
                                contextObj.notificationService.ShowToaster("No Spaces assigned for Scheduling", 2);
                            }
                        });
                    }
                });
            }
            else {
                contextObj.SchedulingService.getReserveRoomData(contextObj.NameDisplayFormatId, contextObj.StartDate, contextObj.EndDate, contextObj.SearchQuery, contextObj.AminityQuery, contextObj.IsAvailable, contextObj.SearchToDate, contextObj.drawingId, contextObj.ReservedBy, contextObj.isSpecialRoom, false, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.pageTarget).subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.totalItems = contextObj.itemsSource.length;
                    contextObj.RowCount = contextObj.itemsSource.length;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.IsGridloaded = true;
                        if (contextObj.pageTarget == 2) {
                            contextObj.arrangeSelectedItemOnTop();
                            contextObj.itemSourceData.emit(contextObj.itemsSource);
                        }
                        if (contextObj.itemsSource) {
                            for (var i = 0; i < contextObj.itemsSource.length; i++) {
                                contextObj.SitedatetimeArrObj.push({
                                    Datetime: contextObj.itemsSource[i]["DateTime"]
                                });
                                sitedt = new Date(contextObj.itemsSource[i]["DateTime"]);
                                hr = sitedt.getHours();
                                dt = sitedt.getDate();
                                temp[i] = hr;
                                for (var j = 0; j < 48; j++) {
                                    if (contextObj.itemsSource[i][j] != null) {
                                        var str = contextObj.itemsSource[i][j];
                                        var strDates = null;
                                        var Strdatefortooltip = null;
                                        var StrTime = null;
                                        if (str.includes("µ")) {
                                            strDates = str.split("µ")[0];
                                            Strdatefortooltip = str.split("µ")[0];
                                            StrTime = str.split("µ")[1];
                                            var strContent = str.split("µ")[2];
                                            var tooltip = null;
                                            if (strContent.includes("§")) {
                                                tooltip = Strdatefortooltip.slice(0, -2) + StrTime + " " + strContent.split("§")[0];
                                            }
                                            contextObj.schedulerArrObj.push({
                                                rowNo: i,
                                                bookedDates: strDates,
                                                strTooltip: tooltip
                                            });
                                        }
                                    }
                                }
                            }
                            var dateTimeForScroll = new Date(contextObj.itemsSource[0]["DateTime"]);
                            var dateforScroll = dateTimeForScroll.getDate();
                            var timeforScroll = dateTimeForScroll.getHours();
                            if (timeforScroll < 6)
                                timeforScroll = 6;
                            setTimeout(function () {
                                var date = new Date();
                                var $scheduler = $("div[id='scheduler']");
                                var $schedulerHeader = $("div[id='schedulerHeader']");
                                var largest;
                                if (today.getDate() == dateforScroll)
                                    largest = timeforScroll;
                                else
                                    largest = today.getHours();
                                if (largest > 3) {
                                    $scheduler.scrollLeft(120 * largest);
                                    $schedulerHeader.scrollLeft(120 * largest);
                                }
                                else
                                    $scheduler.scrollLeft(0);
                            }, 1000);
                        }
                        contextObj.IsAdvanceSearch = 0;
                        contextObj.LoadNonBaseOrgUnitSpace = true;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No Spaces assigned for Scheduling", 2);
                    }
                });
            }
        });
    };
    ReserveroomComponenet.prototype.divClicked = function (event) {
        this.Dateforcalender = event["FieldObject"]["FieldValue"];
        this.StartDate = this.Dateforcalender;
        this.EndDate = this.Dateforcalender;
        this.SearchToDate = this.Dateforcalender;
        this.ReserveRoomdataLoad(false);
    };
    ReserveroomComponenet.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.ReserveRoomdataLoad(false);
    };
    ReserveroomComponenet.prototype.cellclicked = function (event) {
        debugger;
        if (this.dateSelectorField[0].FieldValue != "") {
            this.action = "Booking";
            this.btnName = "Reserve";
            this.pageTitle = "Reserve " + this.roomtxt;
            var contextObj = this;
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var d = new Date(contextObj.Dateforcalender);
            var dayName = days[d.getDay()];
            contextObj.IsAddpageopened = true;
            var cellid = parseInt(event["id"].split("r")[1].split("c")[0]);
            var timeid = event["id"].split("r")[1].split("c")[1];
            timeid = parseInt(timeid) - 12;
            var totimeid = parseInt(timeid);
            if (timeid == "47")
                totimeid = 0;
            this.SpaceId = contextObj.itemsSource[cellid]["SpaceId"];
            contextObj.arrHighlightRowIds = [];
            setTimeout(function () {
                contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat([contextObj.SpaceId]);
            }, 100);
            this.outSelectedData.emit(contextObj.itemsSource[cellid]);
            this.FloorId = contextObj.itemsSource[cellid]["FloorId"];
            this.Sitename = contextObj.itemsSource[cellid]["Site"];
            this.SiteId = contextObj.itemsSource[cellid]["SiteId"];
            this.Buildingname = contextObj.itemsSource[cellid]["Building"];
            this.Floorname = contextObj.itemsSource[cellid]["Floor"];
            this.RoomNo = contextObj.itemsSource[cellid]["Room No."];
            this.Seats = parseInt(contextObj.itemsSource[cellid]["Room Capacity"]);
            var sitetime = contextObj.itemsSource.find(function (item) { return item.SiteId === contextObj.SiteId; });
            this.sitedatetimeforreservationrequest = sitetime.DateTime;
            var siteTimeZone = "";
            var holidays = [1, 7];
            contextObj.SchedulingService.getTimeZoneNameForSite(contextObj.SiteId).subscribe(function (result) {
                siteTimeZone = result;
                contextObj.SchedulingService.roombookingfields(contextObj.SpaceId).subscribe(function (resultData) {
                    contextObj.Roombookrequest = (resultData["Data"]);
                    debugger;
                    contextObj.Roombookrequest[10].IsVisible = false; // = contextObj.Sitename + "/" + contextObj.Buildingname + "/" + contextObj.Floorname + "/" + contextObj.RoomNo;
                    contextObj.Roombookrequest[19].LookupDetails.LookupValues = contextObj.Roombookrequest[19].LookupDetails.LookupValues.splice(0, 3);
                    contextObj.Roombookrequest[19].FieldValue = "1";
                    contextObj.Roombookrequest[6].FieldValue = "1";
                    //contextObj.Roombookrequest[6].IsVisible = false;
                    contextObj.Roombookrequest[15].IsEnabled = false;
                    contextObj.Roombookrequest[9].FieldValue = contextObj.RoomNo;
                    contextObj.Roombookrequest[2].FieldValue = contextObj.Dateforcalender;
                    //contextObj.Roombookrequest[3].IsHiddenLabel = true;
                    //contextObj.Roombookrequest[5].IsHiddenLabel = true;
                    contextObj.Roombookrequest[3].LookupDetails.LookupValues.pop();
                    contextObj.Roombookrequest[5].LookupDetails.LookupValues.shift();
                    contextObj.Roombookrequest[3].FieldValue = contextObj.Roombookrequest[3].LookupDetails.LookupValues[timeid.toString()].Id.toString();
                    contextObj.Roombookrequest[5].FieldValue = contextObj.Roombookrequest[5].LookupDetails.LookupValues[totimeid.toString()].Id.toString();
                    //if (totimeid == 0)
                    //    contextObj.Roombookrequest[4].FieldValue = contextObj.TommorrowDate;
                    //else
                    contextObj.Roombookrequest[4].FieldValue = contextObj.Dateforcalender;
                    //if (contextObj.sessionUserRoleId > 2)
                    contextObj.Roombookrequest[20].FieldValue = contextObj.sessionUserId.toString();
                    if (contextObj.IsProxyReservationEnabled == true) {
                        contextObj.Roombookrequest[20].IsVisible = true;
                    }
                    else {
                        contextObj.Roombookrequest[20].IsVisible = false;
                    }
                    for (var i = 0; i < contextObj.Roombookrequest.length; i++) {
                        if (contextObj.Roombookrequest[i].FieldId == 1721 || contextObj.Roombookrequest[i].FieldId == 1719 || contextObj.Roombookrequest[i].FieldId == 1720 || contextObj.Roombookrequest[i].FieldId == 698 || contextObj.Roombookrequest[i].FieldId == 465 || contextObj.Roombookrequest[i].FieldId == 2050)
                            contextObj.Roombookrequest[i].IsVisible = false;
                        if (contextObj.Roombookrequest[i].FieldId == 465)
                            contextObj.Roombookrequest[i].IsVisible = true;
                        contextObj.Roombookrequest[i].Width = "400";
                        if (contextObj.Roombookrequest[i].FieldId == 2050)
                            contextObj.Roombookrequest[i].FieldValue = siteTimeZone;
                        if (contextObj.Roombookrequest[i].FieldId == 1543)
                            contextObj.Roombookrequest[i].LookupDetails.LookupValues = contextObj.Roombookrequest[i].LookupDetails.LookupValues.filter(function (el) { return holidays.indexOf(el.Id) == -1; });
                        if (contextObj.Roombookrequest[i].FieldId == 2306) {
                            contextObj.Roombookrequest[i].LookupDetails.LookupValues = contextObj.Roombookrequest[i].LookupDetails.LookupValues.filter(function (item) {
                                return item["Id"] < 6;
                            });
                        }
                    }
                    contextObj.SchedulingService.checkSubscribedFeature('280,281,282,283').subscribe(function (result) {
                        for (var i = 0; i < contextObj.Roombookrequest.length; i++) {
                            if (contextObj.Roombookrequest[i].FieldId == 1823 && result["Data"][0]["IsSubscribed"] == false) {
                                contextObj.Roombookrequest[i].IsVisible = false;
                            }
                            if (contextObj.Roombookrequest[i].FieldId == 1826 && result["Data"][1]["IsSubscribed"] == false) {
                                contextObj.Roombookrequest[i].IsVisible = false;
                            }
                            if (contextObj.Roombookrequest[i].FieldId == 1824 && result["Data"][2]["IsSubscribed"] == false) {
                                contextObj.Roombookrequest[i].IsVisible = false;
                            }
                            if (contextObj.Roombookrequest[i].FieldId == 1825 && result["Data"][3]["IsSubscribed"] == false) {
                                contextObj.Roombookrequest[i].IsVisible = false;
                            }
                        }
                    });
                    if (dayName != "Sunday" && dayName != "Saturday") {
                        //if (parseInt(timeid) > 11 && parseInt(timeid) < 38) {
                        contextObj.secondaryTarget = 1;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    }
                    else
                        contextObj.notificationService.ShowToaster("Reservation cannot be done on Saturday/Sunday", 2);
                });
            });
        }
    };
    ReserveroomComponenet.prototype.getSessionUserData = function (contextObj) {
        debugger;
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserCatId = retData["UserCategoryId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            contextObj.SchedulingService.GetUserRolebasedSettingsRowData(parseInt(contextObj.sessionUserRoleId)).subscribe(function (result) {
                if (result.Data.DataCount == 1) {
                    contextObj.IsProxyReservationEnabled = JSON.parse(result.Data.FieldBinderData)[0]["Is Proxy Reservation Enabled?"];
                }
            });
            contextObj.AdministrationService.getUserDetails(contextObj.sessionUserId, JSON.stringify(contextObj.fieldobj)).subscribe(function (result) {
                var data1 = JSON.parse(result["Data"]);
                var data = data1[0].OrganizationalUnitId;
                if (data != undefined && data != null && data != "")
                    contextObj.isShowBaseTeamMessage = true;
                //contextObj.ReserveRoomdataLoad(true);
            });
        });
    };
    ReserveroomComponenet.prototype.onSectionExpandChange = function (obj) {
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
            if (this.sectionAccessExpansionStatus[i].title !== obj[1].title) {
                this.sectionAccessExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionAccessExpansionStatus[i].isExpanded = true;
            }
        }
    };
    ReserveroomComponenet.prototype.onColValClick = function (colVal) {
        var contextObj = this;
        if (contextObj.sessionUserRoleId > 3 && colVal.colName == "Floor") {
            var spaceId = colVal.selRowData['SpaceId'];
            // contextObj.SchedulingService.checkEditPrivilageExist(spaceId).subscribe(function (resultData) {
            // if (resultData.ServerId > 0) {
            this.floorCellOnClick.emit({ "rowData": colVal.selRowData, "isFromRoomClick": false });
        }
        else if (colVal.colName == "Room No.") {
            this.floorCellOnClick.emit({ "rowData": colVal.selRowData, "isFromRoomClick": true });
        }
        else
            this.floorCellOnClick.emit({ "rowData": colVal.selRowData, "isFromRoomClick": false });
    };
    ReserveroomComponenet.prototype.Roomcolumnclick = function (colVal) {
        if (this.pageTarget != 2) {
            this.pageTitle = "Room Details";
            var contextObj = this;
            contextObj.SpaceIdforrrom = colVal.selRowData['SpaceId'];
            contextObj.secondaryTarget = 2;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
        else
            this.roomNoLinkClick.emit(colVal.selRowData);
    };
    ReserveroomComponenet.prototype.onSelectionChange = function (data) {
        if (this.pageTarget == 2) {
            this.onSelChange.emit(data['rowdata']);
            this.selectedData = data['rowdata'];
        }
    };
    ReserveroomComponenet.prototype.getInviteesList = function (event) {
        this.InviteesList = event["InviteesList"];
        if (this.TempNewDataForInsert != undefined)
            this.TempNewDataForInsert["Invitees"] = this.InviteesList;
    };
    ReserveroomComponenet.prototype.getAmnietyList = function (event) {
        this.AmeniteesList = event["AmnietyList"];
        if (this.TempNewDataForInsert != undefined)
            this.TempNewDataForInsert["OtherAminitees"] = this.AmeniteesList;
    };
    ReserveroomComponenet.prototype.getServiceList = function (event) {
        this.ServiceList = event["ServiceList"];
        if (this.TempNewDataForInsert != undefined)
            this.TempNewDataForInsert["OtherServices"] = this.ServiceList;
    };
    ReserveroomComponenet.prototype.getCateringList = function (event) {
        this.CateringList = event["CateringList"];
        if (this.TempNewDataForInsert != undefined)
            this.TempNewDataForInsert["OtherCatering"] = this.CateringList;
    };
    ReserveroomComponenet.prototype.OnSuccessfulSubmit = function (event) {
        var contextObj = this;
        contextObj.TempNewDataForInsert = event["returnData"];
        contextObj.OldadataForInsert = event["OldData"];
        contextObj.NewDataForInsert = JSON.stringify([event["returnData"]]);
        this.IsReserved = true;
        contextObj.IsAddpageopened = false;
        contextObj.ReserveRoomdataLoad(true);
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        //contextObj.SchedulingService.submitReservationRequest(event["OldData"], JSON.stringify([event["returnData"]])).subscribe(function (resultdata) {
        //    switch (resultdata["Data"].StatusId) {
        //        case 0:
        //            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        //            break;
        //        case 1:
        //            contextObj.notificationService.ShowToaster("Request Confirmed", 3);                    
        //            break;
        //    }
        //});    
        //this.IsReserved = true;
        //contextObj.ReserveRoomdataLoad();
        //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ReserveroomComponenet.prototype.onReserve = function (event) {
        var contextObj = this;
        contextObj.NewDataForInsert = JSON.stringify([contextObj.TempNewDataForInsert]);
        contextObj.SchedulingService.submitReservationRequest(contextObj.OldadataForInsert, contextObj.NewDataForInsert).subscribe(function (resultdata) {
            switch (resultdata["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Request Confirmed", 3);
                    break;
            }
        });
        contextObj.IsReserved = true;
        contextObj.ReserveRoomdataLoad(false);
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ReserveroomComponenet.prototype.onSplitViewClose = function (event) {
        var contextObj = this;
        contextObj.IsAddpageopened = false;
    };
    ReserveroomComponenet.prototype.advanceSearch = function () {
        var contextObj = this;
        this.SchedulingService.getAdvnceSearchLookupforReserveroom().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (contextObj.pageTarget == 2) {
                    resultData['Data']['FieldBinderList'].find(function (el) { return el['FieldId'] == 2170; })['IsVisible'] = false;
                    resultData['Data']['FieldBinderList'].find(function (el) { return el['FieldId'] == 2171; })['IsVisible'] = false;
                    resultData['Data']['FieldBinderList'].find(function (el) { return el['FieldId'] == 2172; })['IsVisible'] = false;
                }
                if (contextObj.enableAminity == false) {
                    resultData['Data']['FieldBinderList'].find(function (el) { return el['FieldId'] == 2429; })['IsVisible'] = false;
                }
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
            contextObj.SchedulingService.getAmenitiesData(0, '', 'ASC', '').subscribe(function (result) {
                contextObj.Amenitiedata = JSON.parse(result["Data"].FieldBinderData);
                if (contextObj.Amenitiedata.length > 0 || contextObj.Amenitiedata != undefined) {
                    for (var i = 0; i < contextObj.Amenitiedata.length; i++) {
                        contextObj.arrayList.push({
                            FormFieldId: 2,
                            FieldId: contextObj.Amenitiedata[i].Id,
                            ReportFieldId: contextObj.Amenitiedata[i].Id * 100000,
                            FieldLabel: contextObj.Amenitiedata[i].Amenity,
                            DataEntryControlId: 1,
                            GenericDataTypeId: 5,
                            Whitelist: { Id: 16, FormatString: "", RegularExpression: "^[0-9Çüé§¶ôÑ¥µ]+$" },
                            Format: { FormatString: "Integer", RegularExpression: "^[0-9Çüé§¶ôÑ¥µ]+$", Id: 7 },
                            FieldValue: '',
                            LookupDetails: { LookupValues: null, PopupComponent: null },
                            IsMandatory: false,
                            MaxLength: 3,
                            IsVisible: true,
                            IsEnabled: true,
                            IsValidated: false,
                            isContentHtml: "",
                            Precision: 0,
                            Scale: 0,
                            Height: 25,
                            IsSigned: false,
                            RangeFrom: null,
                            RangeTo: null,
                            HelpText: "",
                            IsGrouped: false,
                            HasChild: false,
                            ParentId: 0,
                            IsSubField: false,
                            Width: "70",
                        });
                    }
                }
            });
        });
    };
    ReserveroomComponenet.prototype.Submit = function (event) {
        var contextObj = this;
        this.IsAdvanceSearch = 1;
        contextObj.advanceValue = event.fieldobject;
        contextObj.StartDate = event.fromdateTime;
        contextObj.EndDate = event.todateTime;
        contextObj.ReserveRoomdataLoadforsearch();
    };
    ReserveroomComponenet.prototype.ReserveRoomdataLoadforsearch = function () {
        var temp = new Array();
        var sitedt;
        var hr;
        var dt;
        var today = new Date(this.Dateforcalender);
        var contextObj = this;
        contextObj.IsGridloaded = false;
        contextObj.SearchQuery = '';
        contextObj.AminityQuery = '';
        var fromtime;
        var totime;
        if (contextObj.StartDate.indexOf("PM") > 0)
            fromtime = contextObj.StartDate.replace("PM", ":00 PM");
        else if (contextObj.StartDate.indexOf("AM") > 0)
            fromtime = contextObj.StartDate.replace("AM", ":00 AM");
        if (contextObj.EndDate.indexOf("PM") > 0)
            totime = contextObj.EndDate.replace("PM", ":00 PM");
        else if (contextObj.EndDate.indexOf("AM") > 0)
            totime = contextObj.EndDate.replace("AM", ":00 AM");
        contextObj.SitedatetimeArrObj = [];
        contextObj.schedulerArrObj = [];
        if (contextObj.IsAdvanceSearch == 1)
            contextObj.filter = contextObj.advanceValue;
        else
            contextObj.filter = '';
        if (new Date(fromtime) >= new Date(totime))
            contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
        else {
            this.SchedulingService.getReserveRoomDataforsearch(this.NameDisplayFormatId, this.StartDate, this.EndDate, contextObj.SearchQuery, this.AminityQuery, this.IsAvailable, this.SearchToDate, this.drawingId, this.ReservedBy, this.isSpecialRoom, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.LoadNonBaseOrgUnitSpace).subscribe(function (resultData) {
                contextObj.totalItems = resultData.DataCount;
                contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                contextObj.RowCount = contextObj.itemsSource.length;
                if (contextObj.RowCount > 0) {
                    contextObj.itemsPerPage = 100;
                    contextObj.IsGridloaded = true;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Scheduling Spaces available for the selected search criteria", 2);
                }
                if (contextObj.pageTarget == 2)
                    contextObj.itemSourceData.emit(contextObj.itemsSource);
                if (contextObj.itemsSource) {
                    for (var i = 0; i < contextObj.itemsSource.length; i++) {
                        contextObj.SitedatetimeArrObj.push({
                            Datetime: contextObj.itemsSource[i]["DateTime"]
                        });
                        sitedt = new Date(contextObj.itemsSource[i]["DateTime"]);
                        hr = sitedt.getHours();
                        dt = sitedt.getDate();
                        temp[i] = hr;
                        for (var j = 0; j < 48; j++) {
                            if (contextObj.itemsSource[i][j] != null) {
                                var str = contextObj.itemsSource[i][j];
                                var strDates = null;
                                var Strdatefortooltip = null;
                                var StrTime = null;
                                if (str.includes("µ")) {
                                    strDates = str.split("µ")[0];
                                    Strdatefortooltip = str.split("µ")[0];
                                    StrTime = str.split("µ")[1];
                                    var strContent = str.split("µ")[2];
                                    var tooltip = null;
                                    if (strContent.includes("§")) {
                                        tooltip = Strdatefortooltip.slice(0, -2) + StrTime + " " + strContent.split("§")[0];
                                    }
                                    contextObj.schedulerArrObj.push({
                                        rowNo: i,
                                        bookedDates: strDates,
                                        strTooltip: tooltip
                                    });
                                }
                            }
                        }
                    }
                    var dateTimeForScroll = new Date(contextObj.itemsSource[0]["DateTime"]);
                    var dateforScroll = dateTimeForScroll.getDate();
                    var timeforScroll = dateTimeForScroll.getHours();
                    if (timeforScroll < 6)
                        timeforScroll = 6;
                    setTimeout(function () {
                        var date = new Date();
                        var $scheduler = $("div[id='scheduler']");
                        var $schedulerHeader = $("div[id='schedulerHeader']");
                        var largest;
                        if (today.getDate() == dateforScroll)
                            largest = timeforScroll;
                        else
                            largest = 6;
                        if (largest > 3) {
                            $scheduler.scrollLeft(120 * largest);
                            $schedulerHeader.scrollLeft(120 * largest);
                        }
                        else {
                            $scheduler.scrollLeft(0);
                            $schedulerHeader.scrollLeft(0);
                        }
                    }, 1000);
                }
                contextObj.IsAdvanceSearch = 0;
            });
        }
    };
    ReserveroomComponenet.prototype.onNormalClick = function ($event) {
        this.isSpecialRoom = false;
        this.ReserveRoomdataLoad(true);
    };
    ReserveroomComponenet.prototype.onSURoomClick = function ($event) {
        this.isSpecialRoom = true;
        this.ReserveRoomdataLoad(true);
    };
    ReserveroomComponenet.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.ReserveRoomdataLoad(false);
    };
    ;
    ReserveroomComponenet.prototype.Clear = function () {
        this.IsAdvanceSearch = 0;
        this.filter = '';
        this.ReserveRoomdataLoad(true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ReserveroomComponenet.prototype, "drawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ReserveroomComponenet.prototype, "pageTarget", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ReserveroomComponenet.prototype, "selectedData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ReserveroomComponenet.prototype, "isViewDrawing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveroomComponenet.prototype, "floorCellOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveroomComponenet.prototype, "itemSourceData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveroomComponenet.prototype, "onSelChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveroomComponenet.prototype, "roomNoLinkClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveroomComponenet.prototype, "outSelectedData", void 0);
    ReserveroomComponenet = __decorate([
        core_1.Component({
            selector: 'reserveroom',
            templateUrl: './app/Views/Scheduling/Room Booking/reserveroom.component.html',
            styleUrls: ['./app/Views/Scheduling/Room Booking/reserveroom.component.css'],
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, dropdownlistcomponent_component_1.DropDownListComponent, search_component_1.searchBox, datecomponent_component_1.DateComponent, scheduler_component_1.ScheduleCalendarComponent, paging_component_1.PagingComponent, reserveroom_reservationrequest_component_1.ReservationRequestforroom, Invitees_list_component_1.Invitees, Amenities_listforreservation_component_1.Amenities, Catering_listforreservation_component_1.Catering, Services_listforresrvation_component_1.Services, page_component_1.PageComponent, roomdetails_component_1.Roomdetails, customsearchforscheduling_component_1.Searchforschedule, radiocomponent_component_1.CustomRadioComponent],
            providers: [scheduling_service_1.SchedulingService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ReserveroomComponenet);
    return ReserveroomComponenet;
}());
exports.ReserveroomComponenet = ReserveroomComponenet;
//# sourceMappingURL=reserveroom.component.js.map