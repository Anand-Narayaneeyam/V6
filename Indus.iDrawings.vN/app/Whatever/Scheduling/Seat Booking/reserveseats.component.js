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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var General_1 = require('../../../Models/Common/General');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var datecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var bookseat_component_1 = require('./bookseat.component');
var roomdetails_component_1 = require('../Room Booking/roomdetails.component');
var customsearchforscheduling_component_1 = require('./customsearchforscheduling.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var ReserveSeatComponenet = (function () {
    function ReserveSeatComponenet(schedulingService, notificationService, generFun, validateService, administrationService) {
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.validateService = validateService;
        this.administrationService = administrationService;
        this.disableDates = ["Sunday", "Saturday"];
        this.advanceValue = "[]";
        this.totalItems = 0;
        this.IsAdvanceSearch = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.SpaceIdforroom = 0;
        this.secondaryTarget = 0;
        this.SpaceTimeForCalendar = "";
        this.IsAvailable = false;
        this.filter = '';
        this.Fromdate = [];
        this.Todate = [];
        this.FromTime = [];
        this.ToTime = [];
        this.Availablity = [];
        this.arrayList = new Array();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "SeatId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '' };
        this.pageTitle = "";
        this.pagePath = "";
        this.showBookSeat = false;
        this.sessionUserId = 0;
        this.sessionUserRoleId = 0;
        this.floorCellOnClick = new core_1.EventEmitter();
        this.seattxt = "Workspace";
        this.isSpecialRoom = false;
        this.isReserved = false;
        this.fromdateTimeAfterSearch = '';
        this.todateTimeAfterSearch = '';
        this.isShowBaseTeamMessage = false;
        this.IsProxyReservationEnabled = false;
    }
    ReserveSeatComponenet.prototype.ngOnInit = function () {
        var contextObj = this;
        var todaydate = contextObj.getDateAndTime();
        contextObj.schedulingService.getseatbookingListfields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 6731 || item.ReportFieldId == 793 || item.ReportFieldId == 540)
                    item.isContentHtml = "hyperlink";
                if (item.ReportFieldId == 789 || item.ReportFieldId == 790 || item.ReportFieldId == 6723) {
                    item.IsHiddenLabel = true;
                    item.Width = 100;
                    if (item.ReportFieldId == 789)
                        item.Width = 150;
                }
            });
            contextObj.fieldObject = (resultData["Data"]);
            resultData["Data"].find(function (item) {
                var fieldid = [1687, 1688, 1695, 1696, 2041];
                contextObj.NotshwingIngrid = contextObj.fieldObject.filter(function (el) {
                    return fieldid.indexOf(el["FieldId"]) > -1;
                });
            });
            resultData["Data"].find(function (item) {
                var fieldid = [1687, 1688, 1695, 1696, 2041];
                contextObj.fieldObject = contextObj.fieldObject.filter(function (el) {
                    return fieldid.indexOf(el["FieldId"]) == -1;
                });
            });
            //contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return contextObj.NotshwingIngrid.indexOf(item.FieldId) });
            contextObj.NotshwingIngrid.find(function (item) {
                switch (item.FieldId) {
                    case 1687:
                        contextObj.Fromdate.push({});
                        contextObj.Fromdate[0] = item;
                        break;
                    case 1688:
                        contextObj.Todate.push({});
                        contextObj.Todate[0] = item;
                        break;
                    case 1695:
                        contextObj.FromTime.push({});
                        contextObj.FromTime[0] = item;
                        contextObj.FromTime[0].LookupDetails.LookupValues.splice(26, 26);
                        break;
                    case 1696:
                        contextObj.ToTime.push({});
                        contextObj.ToTime[0] = item;
                        contextObj.ToTime[0].LookupDetails.LookupValues.splice(0, 1);
                        break;
                    case 2041:
                        contextObj.Availablity.push({});
                        item.FieldValue = "true";
                        contextObj.Availablity[0] = item;
                        break;
                }
            });
            //contextObj.Availablity = contextObj.fieldObject.splice(18, 19);
            //contextObj.ToTime = contextObj.fieldObject.splice(17,18);
            //contextObj.FromTime = contextObj.fieldObject.splice(16,17);
            //contextObj.Todate = contextObj.fieldObject.splice(15, 16);
            //contextObj.Fromdate = contextObj.fieldObject.splice(14, 15);
            contextObj.setDateTimeVariables(todaydate);
            contextObj.checkSubscribedFeatures();
            contextObj.ReserveSeatdataLoad(true);
            contextObj.getSessionUserData(contextObj);
        });
        //this.getSessionUserData(contextObj);      
    };
    ReserveSeatComponenet.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.seattxt = result["Data"][0].Value;
            }
            contextObj.seattxtcopy = contextObj.seattxt;
            contextObj.searchTitle = "Search " + contextObj.seattxt;
            contextObj.pagePath = "Scheduling / Reserve " + contextObj.seattxt;
            contextObj.Availablity[0].FieldLabel = "Show available " + contextObj.seattxt + "s only";
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) {
                if (item.FieldId == 1979) {
                    item.FieldLabel = "Book " + contextObj.seattxt;
                }
                return true;
            });
        });
        contextObj.pagePath = "Scheduling / Reserve " + contextObj.seattxt;
    };
    ReserveSeatComponenet.prototype.getDateAndTime = function () {
        var contextObj = this;
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        if (m > 30) {
            n = n + 1;
            contextObj.timeid = (n * 2);
        }
        else
            contextObj.timeid = (n * 2) + 1;
        if (contextObj.timeid >= 38)
            contextObj.timeid = 12;
        var t = new Date();
        t.setDate(t.getDate() + 1);
        var tommorowdate = contextObj.getFormattedDate(t);
        var todaydate = contextObj.getFormattedDate(new Date());
        this.TommorrowDate = tommorowdate;
        this.Dateforcalender = todaydate;
        if (contextObj.timeid == 12) {
            this.FromDate = tommorowdate;
            this.ToDate = tommorowdate;
        }
        else {
            this.FromDate = todaydate;
            this.ToDate = todaydate;
        }
        this.SearchToDate = todaydate;
        return todaydate;
    };
    ReserveSeatComponenet.prototype.setDateTimeVariables = function (todaydate) {
        var contextObj = this;
        if (contextObj.timeid == 12) {
            contextObj.Fromdate[0].FieldValue = contextObj.TommorrowDate;
            contextObj.Todate[0].FieldValue = contextObj.TommorrowDate;
        }
        else if (contextObj.timeid >= 38)
            contextObj.Todate[0].FieldValue = contextObj.TommorrowDate;
        else if (contextObj.timeid > 12 && contextObj.timeid < 38) {
            contextObj.Fromdate[0].FieldValue = todaydate;
            contextObj.Todate[0].FieldValue = todaydate;
        }
        else if (contextObj.timeid < 12) {
            contextObj.Fromdate[0].FieldValue = todaydate;
            contextObj.Todate[0].FieldValue = todaydate;
            contextObj.timeid = 12;
        }
        contextObj.FromTime[0].FieldValue = contextObj.FromTime[0].LookupDetails.LookupValues[contextObj.timeid - 12].Id.toString();
        var totimeid;
        if (contextObj.timeid >= 38)
            totimeid = 12;
        else
            totimeid = contextObj.timeid + 1;
        contextObj.ToTime[0].FieldValue = contextObj.ToTime[0].LookupDetails.LookupValues[25].Id.toString();
        //contextObj.ToTime[0].FieldValue = contextObj.ToTime[0].LookupDetails.LookupValues[totimeid - 13].Id.toString();//fix for bug 81666 but only for cfpb setting to be discussed
    };
    ReserveSeatComponenet.prototype.getSessionUserData = function (contextObj) {
        contextObj.schedulingService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            contextObj.schedulingService.GetUserRolebasedSettingsRowData(parseInt(contextObj.sessionUserRoleId)).subscribe(function (result) {
                if (result.Data.DataCount == 1) {
                    contextObj.IsProxyReservationEnabled = JSON.parse(result.Data.FieldBinderData)[0]["Is Proxy Reservation Enabled?"];
                }
            });
            //contextObj.fieldobj.push({ //for loading drop down for team
            //    FieldId: 2559,
            //    ReportFieldId: 289,
            //    Value: "1"
            //})
            //contextObj.administrationService.getUserDetails(contextObj.sessionUserId, JSON.stringify(contextObj.fieldobj)).subscribe(function (result) {
            //    var data1 = JSON.parse(result["Data"]);
            //    var data = data1[0].OrganizationalUnitId;
            //    if (data != undefined && data != null && data != "")
            //        contextObj.isShowBaseTeamMessage = true;
            //    contextObj.ReserveSeatdataLoad(true);
            //});
        });
    };
    ReserveSeatComponenet.prototype.getFormattedDate = function (dt) {
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
    ReserveSeatComponenet.prototype.ReserveSeatdataLoad = function (noBaseTeam) {
        var contextObj = this;
        if (contextObj.Availablity[0].FieldValue == "true")
            contextObj.IsAvailable = true;
        else
            contextObj.IsAvailable = false;
        contextObj.SearchQuery = '';
        contextObj.SearchResourceQuery = '';
        if (contextObj.FromTime[0].FieldValue != "-1" && contextObj.ToTime[0].FieldValue != "-1") {
            var fromtime = contextObj.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.FromTime[0].FieldValue)); });
            var totime = contextObj.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.ToTime[0].FieldValue)); });
            var fromdateTime = contextObj.FromDate + fromtime[0].Value;
            var todateTime = contextObj.ToDate + totime[0].Value;
            contextObj.schedulingService.checkSubscribedFeature('279').subscribe(function (result) {
                contextObj.resOutsideBaseTeam = result["Data"][0]["IsSubscribed"];
                if (contextObj.resOutsideBaseTeam == true) {
                    contextObj.schedulingService.getReserveSeatData(contextObj.SearchQuery, contextObj.SearchResourceQuery, fromdateTime, todateTime, contextObj.IsAvailable, contextObj.isSpecialRoom, true, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
                        contextObj.totalItems = resultData.DataCount;
                        contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                        if (contextObj.totalItems > 0) {
                            contextObj.itemsPerPage = resultData.RowsPerPage;
                            contextObj.LoadNonBaseOrgUnitSpace = true;
                        }
                        else {
                            //Only CFPB Implimentation-New ReQuirement(base team) and other worspace availability
                            contextObj.LoadNonBaseOrgUnitSpace = false;
                            contextObj.schedulingService.getReserveSeatData(contextObj.SearchQuery, contextObj.SearchResourceQuery, fromdateTime, todateTime, contextObj.IsAvailable, contextObj.isSpecialRoom, false, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
                                contextObj.totalItems = resultData.DataCount;
                                contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                                if (contextObj.totalItems > 0) {
                                    contextObj.itemsPerPage = resultData.RowsPerPage;
                                    if (noBaseTeam == true && contextObj.isShowBaseTeamMessage == true)
                                        contextObj.notificationService.ShowToaster(contextObj.seattxt + " in your Team are already reserved. Select any other Workspace to reserve", 2);
                                }
                                else {
                                    contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s are available for reservation", 2);
                                }
                            });
                        }
                    });
                }
                else {
                    contextObj.LoadNonBaseOrgUnitSpace = true;
                    contextObj.schedulingService.getReserveSeatData(contextObj.SearchQuery, contextObj.SearchResourceQuery, fromdateTime, todateTime, contextObj.IsAvailable, contextObj.isSpecialRoom, true, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
                        contextObj.totalItems = resultData.DataCount;
                        contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                        if (contextObj.totalItems > 0) {
                            contextObj.itemsPerPage = resultData.RowsPerPage;
                        }
                        else {
                            contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s are available for reservation", 2);
                        }
                    });
                }
            });
        }
    };
    ReserveSeatComponenet.prototype.onChangefrom = function (event) {
        var contextObj = this;
        var currentTotimeId = parseInt(contextObj.ToTime[0].FieldValue);
        if (event != "-1") {
            var timeid = parseInt(event);
            if (event == "39") {
                timeid = 13;
                contextObj.Todate[0].FieldValue = contextObj.TommorrowDate;
            }
            else
                contextObj.Todate[0].FieldValue = contextObj.ToDate;
            if (currentTotimeId <= timeid)
                contextObj.ToTime[0].FieldValue = contextObj.ToTime[0].LookupDetails.LookupValues[timeid - 13].Id.toString();
            var ele = document.getElementsByClassName("ddl ng-invalid ng-dirty ng-touched");
            if (ele.length > 0) {
                var focusingElmt = ele[ele.length - 1];
                focusingElmt.focus();
                this.validateService.initiateValidation(contextObj.ToTime[0], this, true, focusingElmt);
            }
        }
    };
    //(change) = "onChangeto($event.target.value)"
    ReserveSeatComponenet.prototype.OnSearchClick = function (event) {
        var contextObj = this;
        if (contextObj.Availablity[0].FieldValue == "true")
            contextObj.IsAvailable = true;
        else
            contextObj.IsAvailable = false;
        if (contextObj.FromTime[0].FieldValue != "-1" && contextObj.ToTime[0].FieldValue != "-1") {
            var fromtime = contextObj.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.FromTime[0].FieldValue)); });
            var totime = contextObj.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.ToTime[0].FieldValue)); });
            var date1 = contextObj.FromDate + fromtime[0].Value;
            var date2 = contextObj.ToDate + totime[0].Value;
            //var subDatefromTime = contextObj.FromDate + fromtime[0].Value.substring(0, fromtime[0].Value.length - 2) + ":00 " + fromtime[0].Value.substring(fromtime[0].Value.length - 2, fromtime[0].Value.length);
            //var subDatetoTime = contextObj.ToDate + totime[0].Value.substring(0, totime[0].Value.length - 2) + ":00 " + totime[0].Value.substring(totime[0].Value.length - 2, totime[0].Value.length);
            //if ((contextObj.FromDate == contextObj.ToDate) && fromtime && totime && (Number(fromtime[0].Id) >= Number(totime[0].Id))) {
            //    contextObj.notificationService.ShowToaster("To time must be greater than From time", 2);
            //} else if (new Date(subDatefromTime) > new Date(subDatetoTime)) {      
            //    contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
            if (new Date(contextObj.FromDate) > new Date(contextObj.ToDate)) {
                // contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
                contextObj.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
            }
            else if (fromtime && totime && (Number(fromtime[0].Id) >= Number(totime[0].Id))) {
                //contextObj.notificationService.ShowToaster("To time must be greater than From time", 2);
                contextObj.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
            }
            else {
                contextObj.SearchQuery = '';
                contextObj.SearchResourceQuery = '';
                //contextObj.schedulingService.getReserveSeatData(contextObj.SearchQuery, contextObj.SearchResourceQuery, date1, date2, contextObj.IsAvailable, contextObj.isSpecialRoom,
                //    contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
                //        contextObj.totalItems = resultData.DataCount;
                //        contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                //        if (contextObj.totalItems > 0) {
                //            contextObj.itemsPerPage = resultData.RowsPerPage;
                //        }
                //        else {
                //            contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s are available for reservation", 2)
                //        }
                //    });
                contextObj.ReserveSeatdataLoad(false);
            }
        }
    };
    ReserveSeatComponenet.prototype.selectedAvailability = function (event) {
        this.dataLoad();
        if (this.isSpecialRoom == true)
            this.seattxt = "Special Use Room";
        else
            this.seattxt = this.seattxtcopy;
    };
    ReserveSeatComponenet.prototype.dataLoad = function () {
        var contextObj = this;
        this.itemsSource = [];
        if (contextObj.Availablity[0].FieldValue == "true")
            contextObj.IsAvailable = true;
        else
            contextObj.IsAvailable = false;
        if (this.advanceValue != "[]")
            this.dataLoadAfterSearch();
        else
            this.OnSearchClick(contextObj);
    };
    ReserveSeatComponenet.prototype.onHyperLinkClick = function (event) {
        var contextObj = this;
        var colName = event["colName"];
        var selRowdata = event["selRowData"];
        this.showBookSeat = false;
        var bookName = "Book " + contextObj.seattxtcopy;
        //  if (contextObj.isReserved == false)
        switch (colName) {
            case bookName:
                this.bookHotellingSeat(selRowdata);
                break;
            case "Room No.":
                contextObj.floorCellOnClick.emit({ "selRowData": event.selRowData, "isSpecialRoom": contextObj.isSpecialRoom, "isFromRoomClick": true });
                //this.Roomcolumnclick(selRowdata);
                break;
            case "Floor":
                if (contextObj.sessionUserRoleId > 3) {
                    var spaceId = event.selRowData['SpaceId'];
                    //contextObj.schedulingService.checkEditPrivilageExist(spaceId).subscribe(function (resultData) {
                    //    if (resultData.ServerId > 0) {
                    contextObj.floorCellOnClick.emit({ "selRowData": event.selRowData, "isSpecialRoom": contextObj.isSpecialRoom, "isFromRoomClick": false });
                }
                else
                    contextObj.floorCellOnClick.emit({ "selRowData": event.selRowData, "isSpecialRoom": contextObj.isSpecialRoom, "isFromRoomClick": false });
                break;
        }
        contextObj.isReserved = false;
    };
    ReserveSeatComponenet.prototype.bookHotellingSeat = function (selRowData) {
        var context = this;
        if (context.FromTime[0].FieldValue != "-1" && context.ToTime[0].FieldValue != "-1") {
            var frmTime = context.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.FromTime[0].FieldValue)); });
            var toTime = context.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.ToTime[0].FieldValue)); });
            var fromdateTime = context.FromDate + frmTime[0].Value;
            var todateTime = context.ToDate + toTime[0].Value;
            this.schedulingService.checkConflictedSeatRequestExists(selRowData["SeatId"], fromdateTime, todateTime).subscribe(function (resultData) {
                switch (resultData) {
                    case 1:
                    case -3:
                        var siteTimeZone = "";
                        context.schedulingService.getTimeZoneNameForSite(selRowData["SiteId"]).subscribe(function (resultData) {
                            siteTimeZone = resultData;
                            context.schedulingService.getTimeforspace(selRowData["SpaceId"]).subscribe(function (resulttime) {
                                var SpaceTime = "";
                                SpaceTime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
                                context.Sitetime = SpaceTime;
                                context.schedulingService.getSeatBookFields(selRowData["SeatId"]).subscribe(function (resultData) {
                                    if (resultData["Data"]) {
                                        debugger;
                                        for (var i = 0; i < resultData["Data"].length; i++) {
                                            var holidays = [1, 7];
                                            switch (resultData["Data"][i].FieldId) {
                                                case 1687:
                                                    resultData["Data"][i].FieldValue = context.FromDate;
                                                    break;
                                                case 2306:
                                                    resultData.Data[i].LookupDetails.LookupValues = resultData.Data[i].LookupDetails.LookupValues.filter(function (item) {
                                                        return item["Id"] < 6;
                                                    });
                                                    break;
                                                case 1695:
                                                    resultData["Data"][i].LookupDetails.LookupValues.splice(26, 26);
                                                    resultData["Data"][i].FieldValue = context.FromTime[0].FieldValue;
                                                    break;
                                                case 1688:
                                                    resultData["Data"][i].FieldValue = context.ToDate;
                                                    break;
                                                case 1696:
                                                    resultData["Data"][i].LookupDetails.LookupValues.splice(0, 1);
                                                    resultData["Data"][i].FieldValue = context.ToTime[0].FieldValue;
                                                    break;
                                                case 1697:
                                                    resultData["Data"][i].IsVisible = false;
                                                    break;
                                                case 1725:
                                                    resultData["Data"][i].FieldValue = "1";
                                                    resultData["Data"][i].IsVisible = false;
                                                    /*if (context.sessionUserRoleId == 4) { //for GAO
                                                        resultData["Data"][i].IsVisible = false;
                                                    }*/
                                                    break;
                                                case 1692:
                                                    resultData["Data"][i].FieldValue = context.sessionUserId;
                                                    if (context.IsProxyReservationEnabled == true) {
                                                        resultData["Data"][i].IsVisible = true;
                                                    }
                                                    else {
                                                        resultData["Data"][i].IsVisible = false;
                                                    }
                                                    break;
                                                case 698:
                                                    resultData["Data"][i].IsEnabled = false;
                                                    break;
                                                case 2050:
                                                    resultData["Data"][i].FieldValue = siteTimeZone;
                                                    resultData["Data"][i].IsVisible = false;
                                                    break;
                                                case 1981: /*location related space details hide*/
                                                case 1982:
                                                case 1983:
                                                case 1987:
                                                    resultData["Data"][i].IsVisible = false;
                                                    break;
                                                case 1984:
                                                    resultData["Data"][i].IsVisible = false;
                                                    resultData["Data"][i].FieldValue = resultData["Data"][i].FieldValue.toString().replace("'", "");
                                                    break;
                                                case 465:
                                                    resultData["Data"][i].IsVisible = true;
                                                    break;
                                                case 1540:
                                                    resultData["Data"][i].FieldValue = "1";
                                                    break;
                                                case 1543:
                                                    resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el) { return holidays.indexOf(el.Id) == -1; });
                                                    break;
                                                case 1375:
                                                    /*removes sat and sun from week days*/
                                                    resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el) { return holidays.indexOf(el.Id) == -1; });
                                                    resultData["Data"][i].FieldLabel = "";
                                                    break;
                                                case 1372:
                                                case 1373:
                                                case 1374:
                                                    resultData["Data"][i].FieldLabel = "";
                                                    break;
                                                case 2040:
                                                    resultData["Data"][i].IsVisible = false;
                                                    break;
                                                case 2296:
                                                    if (context.IsProxyReservationEnabled == true) {
                                                        resultData["Data"][i].HasAutoLookUp = true;
                                                        resultData["Data"][i].IsVisible = true;
                                                    }
                                                    break;
                                            }
                                        }
                                        if (context.IsProxyReservationEnabled == true) {
                                            resultData["Data"].find(function (el) {
                                                if (el.FieldId == 2296) {
                                                    var lookupobjFld = resultData["Data"].filter(function (el) { return el.FieldId === 1692; });
                                                    el.LookupDetails = lookupobjFld[0].LookupDetails;
                                                    return true;
                                                }
                                                else
                                                    return false;
                                            });
                                        }
                                        context.fieldDetailsBook = resultData["Data"];
                                        context.showBookSeat = true;
                                        context.pageTitle = "Reserve " + context.seattxt; //"New "+context.seattxt +" Booking Request";
                                        context.secondaryTarget = 1;
                                        context.splitviewInput.showSecondaryView = true;
                                    }
                                });
                            });
                        });
                        break;
                    case -1:
                        context.notificationService.ShowToaster("Reservation exists", 2);
                        break;
                    //case -3:
                    //    context.notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2)
                    //    break;
                    case -4:
                        context.schedulingService.checkSubscribedFeature('241').subscribe(function (result) {
                            if (result["Data"][0]["IsSubscribed"]) {
                                context.notificationService.ShowToaster(context.seattxt + " booking can be done only " + result["Data"][0].Value + " days in advance", 2);
                            }
                        });
                        break;
                    case -10:
                        context.notificationService.ShowToaster("No " + context.seattxt + "s are available for reservation", 2);
                        break;
                    case -9:
                        context.notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                        break;
                }
            });
        }
    };
    ReserveSeatComponenet.prototype.reserveSeatSubmitRet = function (event) {
        if (event["success"]) {
            this.refreshgrid = [];
            var context = this;
            context.isReserved = true;
            this.ReserveSeatdataLoad(true);
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    ReserveSeatComponenet.prototype.Roomcolumnclick = function (selRowData) {
        this.pageTitle = "Room Details";
        var contextObj = this;
        contextObj.SpaceIdforroom = selRowData['SpaceId'];
        contextObj.SeatNo = selRowData['Seat No.'];
        contextObj.secondaryTarget = 2;
        if (this.DateforcalenderSearch == "" || this.DateforcalenderSearch == undefined || this.DateforcalenderSearch == null) {
            contextObj.schedulingService.getTimeforspace(contextObj.SpaceIdforroom).subscribe(function (resulttime) {
                var SpaceTime = "";
                SpaceTime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
                // if (contextObj.Dateforcalender == "" || contextObj.Dateforcalender == null)
                contextObj.Dateforcalender = SpaceTime;
                contextObj.SpaceTimeForCalendar = SpaceTime;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else {
            contextObj.Dateforcalender = this.DateforcalenderSearch;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
    };
    ReserveSeatComponenet.prototype.divClicked = function (event, target) {
        var date = event["FieldObject"]["FieldValue"];
        if (target == 1) {
            this.FromDate = date;
            this.ToDate = date;
            this.Fromdate[0].FieldValue = date;
            this.Todate[0].FieldValue = date;
            var elem = document.getElementsByClassName("date-picker")[1];
            elem.value = date;
            if (this.getFormattedDate(new Date()) == this.getFormattedDate(date)) {
                this.DateforcalenderSearch = "";
            }
            else
                this.DateforcalenderSearch = date;
        }
        else {
            this.ToDate = date;
        }
        this.SearchToDate = date;
    };
    ReserveSeatComponenet.prototype.advanceSearch = function () {
        var contextObj = this;
        this.schedulingService.getAdvnceSearchLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
            contextObj.schedulingService.getResourceSchedulingData(0, '', 'ASC').subscribe(function (result) {
                contextObj.Resourcedata = JSON.parse(result["Data"].FieldBinderData);
                if (contextObj.Resourcedata.length > 0 || contextObj.Resourcedata != undefined) {
                    for (var i = 0; i < contextObj.Resourcedata.length; i++) {
                        contextObj.arrayList.push({
                            FormFieldId: 2,
                            FieldId: contextObj.Resourcedata[i].Id,
                            ReportFieldId: contextObj.Resourcedata[i].Id * 100000,
                            FieldLabel: contextObj.Resourcedata[i].Resource,
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
    ReserveSeatComponenet.prototype.Submit = function (event) {
        var contextObj = this;
        contextObj.showSearchFilter = [];
        this.IsAdvanceSearch = 1;
        var contextObj = this;
        contextObj.SearchQuery = '';
        contextObj.SearchResourceQuery = '';
        contextObj.advanceValue = event.fieldobject;
        this.fromdateTimeAfterSearch = event.fromdateTime;
        this.todateTimeAfterSearch = event.todateTime;
        var fromtime;
        var totime;
        if (this.fromdateTimeAfterSearch.indexOf("PM") > 0)
            fromtime = this.fromdateTimeAfterSearch.replace("PM", ":00 PM");
        else if (this.fromdateTimeAfterSearch.indexOf("AM") > 0)
            fromtime = this.fromdateTimeAfterSearch.replace("AM", ":00 AM");
        if (this.todateTimeAfterSearch.indexOf("PM") > 0)
            totime = this.todateTimeAfterSearch.replace("PM", ":00 PM");
        else if (this.todateTimeAfterSearch.indexOf("AM") > 0)
            totime = this.todateTimeAfterSearch.replace("AM", ":00 AM");
        if (new Date(fromtime) >= new Date(totime)) {
            contextObj.showSearchFilter = contextObj.showSearchFilter.concat(true);
            //contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
            contextObj.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
        }
        else {
            this.ToTime[0].FieldValue = event['todateTimeValue'];
            this.FromTime[0].FieldValue = event['fromtimeValue'];
            this.Todate[0].FieldValue = event['toDate'];
            this.Fromdate[0].FieldValue = event['fromDate'];
            this.ToDate = event['toDate'];
            this.FromDate = event['fromDate'];
            //  this.setDateTimeAfterSearch(fromtime, totime);
            this.dataLoadAfterSearch();
        }
    };
    ReserveSeatComponenet.prototype.dataLoadAfterSearch = function () {
        var contextObj = this;
        this.schedulingService.getSeatfilterData(contextObj.advanceValue, contextObj.SearchResourceQuery, this.fromdateTimeAfterSearch, this.todateTimeAfterSearch, this.IsAvailable, this.isSpecialRoom, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, contextObj.LoadNonBaseOrgUnitSpace).subscribe(function (resultData) {
            contextObj.totalItems = resultData.DataCount;
            contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
            if (contextObj.totalItems > 0) {
                contextObj.itemsPerPage = resultData.RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s are available for reservation", 2);
            }
        });
    };
    ReserveSeatComponenet.prototype.Clear = function (event) {
        this.filter = '';
        this.advanceValue = '[]';
        this.setDateTimeVariables(this.getDateAndTime());
        this.ReserveSeatdataLoad(true);
    };
    ReserveSeatComponenet.prototype.onNormalClick = function ($event) {
        this.isSpecialRoom = false;
        this.seattxt = this.seattxtcopy;
        //var bookfield = this.fieldObject.find(function (item) { return item.ReportFieldId === 6731 })
        //bookfield.FieldLabel = "Book " + this.seattxt;
        this.ReserveSeatdataLoad(true);
    };
    ReserveSeatComponenet.prototype.onSURoomClick = function ($event) {
        this.isSpecialRoom = true;
        this.seattxt = "Special Use Room";
        //var bookfield = this.fieldObject.find(function (item) { return item.ReportFieldId === 6731 })
        //bookfield.FieldLabel = "Book " + this.seattxt;
        this.ReserveSeatdataLoad(true);
    };
    ReserveSeatComponenet.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.ReserveSeatdataLoad(false);
    };
    ;
    ReserveSeatComponenet.prototype.onSort = function (objGrid) {
        this.dataLoad();
        //this.ReserveSeatdataLoad();
    };
    ReserveSeatComponenet.prototype.onfocusIn = function (event) {
        var a = document.getElementById("showavailablechkbox");
        if (a != null) {
            a.setAttribute("aria-hidden", "false");
        }
    };
    ReserveSeatComponenet.prototype.onfocusOut = function (event) {
        var a = document.getElementById("showavailablechkbox");
        if (a != null) {
            a.setAttribute("aria-hidden", "true");
        }
    };
    ReserveSeatComponenet.prototype.displaySettingsClick = function () {
        var contextObj = this;
        contextObj.pageTitle = "Display Settings";
        contextObj.secondaryTarget = 3;
        contextObj.splitviewInput.showSecondaryView = true;
    };
    ReserveSeatComponenet.prototype.getUpdatedDisplaySettings = function (event) {
        var contextObj = this;
        this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, event.dispSettingObject);
        contextObj.splitviewInput.showSecondaryView = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveSeatComponenet.prototype, "floorCellOnClick", void 0);
    ReserveSeatComponenet = __decorate([
        core_1.Component({
            selector: 'reserveseats',
            templateUrl: './app/Views/Scheduling/Seat Booking/reserveseats.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, fieldGeneration_component_1.FieldComponent,
                dropdownlistcomponent_component_1.DropDownListComponent, search_component_1.searchBox, datecomponent_component_1.DateComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, bookseat_component_1.BookSeatComponent, roomdetails_component_1.Roomdetails, customsearchforscheduling_component_1.Searchforschedule, slide_component_1.SlideComponent, displaysettings_component_1.DisplaySettingsComponent],
            providers: [validation_service_1.ValidateService, scheduling_service_1.SchedulingService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService, administration_service_1.AdministrationService])
    ], ReserveSeatComponenet);
    return ReserveSeatComponenet;
}());
exports.ReserveSeatComponenet = ReserveSeatComponenet;
//# sourceMappingURL=reserveseats.component.js.map