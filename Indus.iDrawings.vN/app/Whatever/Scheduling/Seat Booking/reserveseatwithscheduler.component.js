var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="bookseat.component.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var datecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var bookseat_component_1 = require('./bookseat.component');
var roomdetails_component_1 = require('../Room Booking/roomdetails.component');
var scheduler_component_1 = require('../../../Framework/Whatever/Scheduler/scheduler.component');
var customsearchforscheduling_component_1 = require('./customsearchforscheduling.component');
var General_1 = require('../../../Models/Common/General');
var ReserveSeatwithschedulerComponenet = (function () {
    function ReserveSeatwithschedulerComponenet(schedulingService, notificationService, generFun) {
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.disableDates = ["Sunday", "Saturday"];
        this.totalItems = 0;
        this.isViewDrawing = false;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.SpaceIdforroom = 0;
        this.secondaryTarget = 0;
        this.schedulerArrObj = new Array();
        this.SitedatetimeArrObj = new Array();
        this.IsAddpageopened = false;
        this.IsGridloaded = false;
        this.SpaceId = 0;
        this.SeatId = 0;
        this.SiteId = 0;
        this.IsAvailable = false;
        this.filter = '';
        this.SeatIdarray = [];
        this.Fromdate = [];
        this.Todate = [];
        this.FromTime = [];
        this.ToTime = [];
        this.Availablity = [];
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Seat Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, allowSort: false, sortDir: 'ASC', sortCol: '' };
        this.pageTitle = "";
        this.pagePath = "Scheduling / Reserve Seat";
        this.showBookSeat = false;
        this.sessionUserId = 0;
        this.sessionUserRoleId = 0;
        this.itemSourceData = new core_1.EventEmitter();
        this.floorCellOnClick = new core_1.EventEmitter();
        this.onSelChange = new core_1.EventEmitter();
        this.roomNoLinkClick = new core_1.EventEmitter();
        this.outSelectedData = new core_1.EventEmitter();
        this.seattxt = "Workspace";
        this.arrHighlightRowIds = [];
        this.arrayList = new Array();
        this.IsAdvanceSearch = 0;
        this.advanceValue = "[]";
        this.fromdateTimeAfterSearch = '';
        this.todateTimeAfterSearch = '';
        this.formHeight = ((window.innerHeight * 31.54) / 100);
        ;
        this.formHeight = this.formHeight + "px";
    }
    ReserveSeatwithschedulerComponenet.prototype.ngOnChanges = function (changes) {
        if (changes['isViewDrawing']) {
            this.refreshgrid = [];
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
    };
    ReserveSeatwithschedulerComponenet.prototype.getHeight = function () {
        if (this.isViewDrawing == true) {
            //this.formHeight = window.innerHeight - ((window.innerHeight * 71.52) / 100);
            var decerementvalue = 0;
            var dwgViewHeight = 0;
            if ($("#dwgView") != undefined) {
                dwgViewHeight = $("#dwgView").height();
            }
            decerementvalue = 288 + 6 + dwgViewHeight;
            this.formHeight = window.innerHeight - decerementvalue;
            this.formHeight = this.formHeight + "px";
        }
        else {
            this.formHeight = window.innerHeight - 288;
            this.formHeight = this.formHeight + "px";
        }
        return this.formHeight;
    };
    ReserveSeatwithschedulerComponenet.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.pagePath = "Scheduling / Reserve " + contextObj.seattxt;
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
            this.FromDate = todaydate;
            this.ToDate = todaydate;
        }
        else {
            this.FromDate = todaydate;
            this.ToDate = todaydate;
        }
        this.SearchToDate = todaydate;
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
                if (contextObj.pageTarget == 0) {
                    if (item.ReportFieldId != 793 && item.ReportFieldId != 8793)
                        item.IsVisible = false;
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
                        contextObj.Availablity[0] = item;
                        break;
                }
            });
            //contextObj.Availablity = contextObj.fieldObject.splice(18, 19);
            //contextObj.ToTime = contextObj.fieldObject.splice(17,18);
            //contextObj.FromTime = contextObj.fieldObject.splice(16,17);
            //contextObj.Todate = contextObj.fieldObject.splice(15, 16);
            //contextObj.Fromdate = contextObj.fieldObject.splice(14, 15);
            if (contextObj.timeid == 12) {
                contextObj.Fromdate[0].FieldValue = contextObj.SearchToDate;
                contextObj.Todate[0].FieldValue = contextObj.SearchToDate;
            }
            else if (contextObj.timeid >= 38)
                contextObj.Todate[0].FieldValue = contextObj.TommorrowDate;
            contextObj.FromTime[0].FieldValue = contextObj.FromTime[0].LookupDetails.LookupValues[contextObj.timeid - 12].Id.toString();
            var totimeid;
            if (contextObj.timeid >= 38)
                totimeid = 12;
            else
                totimeid = contextObj.timeid + 1;
            contextObj.ToTime[0].FieldValue = contextObj.ToTime[0].LookupDetails.LookupValues[totimeid - 13].Id.toString();
            contextObj.ReserveSeatdataLoad();
            contextObj.getSessionUserData(contextObj);
        });
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
        //this.getSessionUserData(contextObj);     
        $("div[wj-part='root']").css("overflow-x", "hidden");
    };
    ReserveSeatwithschedulerComponenet.prototype.getSessionUserData = function (contextObj) {
        contextObj.schedulingService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });
    };
    ReserveSeatwithschedulerComponenet.prototype.getFormattedDate = function (dt) {
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
    ReserveSeatwithschedulerComponenet.prototype.arrangeSelectedItemOnTop = function () {
        var contextObj = this;
        var selectedRowDatas = [];
        var seatId = contextObj.selectedData['SeatId'];
        if (seatId == null || seatId == undefined)
            seatId = contextObj.selectedData['Seat Id'];
        var index = this.itemsSource.findIndex(function (el) { return el['Seat Id'] == seatId; });
        selectedRowDatas.push(this.itemsSource[index]);
        this.itemsSource.splice(index, 1);
        var data = selectedRowDatas.concat(this.itemsSource);
        this.itemsSource = data;
    };
    ReserveSeatwithschedulerComponenet.prototype.ReserveSeatdataLoad = function () {
        debugger;
        var contextObj = this;
        var temp = new Array();
        var sitedt;
        var hr;
        var dt;
        var today = new Date(this.Dateforcalender);
        contextObj.IsGridloaded = false;
        contextObj.SearchQuery = '';
        contextObj.SearchResourceQuery = '';
        contextObj.SitedatetimeArrObj = [];
        var fromtime = contextObj.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.FromTime[0].FieldValue)); });
        //var totime = contextObj.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.ToTime[0].FieldValue)) });
        var fromdateTime = contextObj.FromDate + fromtime[0].Value;
        //var todateTime = contextObj.ToDate + totime[0].Value;
        this.schedulingService.getReserveSeatDatafordrawing(contextObj.FromDate, contextObj.FromDate, contextObj.SearchQuery, contextObj.SearchQuery, this.IsAvailable, this.SearchToDate, this.drawingId, 0, contextObj.isSpecialRoom, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter).subscribe(function (resultData) {
            contextObj.totalItems = resultData.DataCount;
            console.log("total items", contextObj.totalItems);
            contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
            console.log("total items1", contextObj.itemsSource.length);
            contextObj.arrangeSelectedItemOnTop();
            if (contextObj.totalItems > 0) {
                contextObj.itemsPerPage = resultData.RowsPerPage;
                contextObj.IsGridloaded = true;
            }
            else {
                contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s are available for reservation", 2);
            }
            if (contextObj.pageTarget == 0)
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
                setTimeout(function () {
                    var date = new Date();
                    var $scheduler = $("div[id='scheduler']");
                    var $schedulerHeader = $("div[id='schedulerHeader']");
                    var largest;
                    if (date.getDate() == dt)
                        largest = Math.max.apply(Math, temp);
                    else
                        largest = date.getHours();
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
        });
    };
    ReserveSeatwithschedulerComponenet.prototype.onHyperLinkClick = function (event) {
        var contextObj = this;
        var colName = event["colName"];
        var selRowdata = event["selRowData"];
        this.showBookSeat = false;
        switch (colName) {
            case "Book Workspace":
                this.bookHotellingSeat(selRowdata);
                break;
            case "Room No.":
                if (this.pageTarget != 0)
                    this.Roomcolumnclick(selRowdata);
                else
                    this.roomNoLinkClick.emit(selRowdata);
                break;
            case "Floor":
                if (contextObj.sessionUserRoleId > 3) {
                    var spaceId = event.selRowData['SpaceId'];
                    //contextObj.schedulingService.checkEditPrivilageExist(spaceId).subscribe(function (resultData) {
                    //    if (resultData.ServerId > 0) {
                    contextObj.floorCellOnClick.emit(event.selRowData);
                }
                break;
        }
    };
    ReserveSeatwithschedulerComponenet.prototype.bookHotellingSeat = function (event) {
        var context = this;
        var cellid = parseInt(event["id"].split("r")[1].split("c")[0]);
        var timeid = event["id"].split("r")[1].split("c")[1];
        timeid = parseInt(timeid) - 12;
        var totimeid = parseInt(timeid);
        //var totimeid = parseInt(timeid) + 1;
        if (timeid == "47")
            totimeid = 0;
        this.SpaceId = context.itemsSource[cellid]["SpaceId"];
        this.SiteId = context.itemsSource[cellid]["SiteId"];
        this.SeatId = parseInt(context.itemsSource[cellid]["Seat Id"]);
        context.arrHighlightRowIds = [];
        setTimeout(function () {
            context.arrHighlightRowIds = context.arrHighlightRowIds.concat([context.SeatId]);
        }, 100);
        context.selectedData = context.itemsSource[cellid];
        this.outSelectedData.emit(context.selectedData);
        context.SeatIdarray.push({});
        context.SeatIdarray[0] = context.SeatId;
        var sitetime = context.itemsSource.find(function (item) { return item.SiteId === context.SiteId; });
        var frmTime = context.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.FromTime[0].FieldValue)); });
        var toTime = context.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.ToTime[0].FieldValue)); });
        var fromdateTime = context.FromDate + frmTime[0].Value;
        var todateTime = context.ToDate + toTime[0].Value;
        //if (totimeid == 0)
        //    context.ToDate = context.TommorrowDate;
        var sitetime = context.itemsSource.find(function (item) { return item.SpaceId === context.SpaceId; });
        this.Sitetime = sitetime.DateTime;
        this.schedulingService.checkConflictedSeatRequestExists(context.SeatId, fromdateTime, todateTime).subscribe(function (resultDataexists) {
            switch (resultDataexists) {
                case 1:
                case -3:
                    var siteTimeZone = "";
                    context.schedulingService.getTimeZoneNameForSite(context.SiteId).subscribe(function (resultDatatime) {
                        siteTimeZone = resultDatatime;
                        context.schedulingService.getSeatBookFields(context.SeatId).subscribe(function (resultData) {
                            if (resultData["Data"]) {
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
                                            resultData["Data"][i].FieldValue = context.FromTime[0].LookupDetails.LookupValues[timeid].Id.toString();
                                            ;
                                            break;
                                        case 1688:
                                            resultData["Data"][i].FieldValue = context.ToDate;
                                            break;
                                        case 1696:
                                            resultData["Data"][i].LookupDetails.LookupValues.splice(0, 1);
                                            resultData["Data"][i].FieldValue = 39; //context.ToTime[0].LookupDetails.LookupValues[totimeid.toString()].Id.toString();
                                            break;
                                        case 1697:
                                            resultData["Data"][i].IsVisible = false;
                                            break;
                                        case 1725:
                                            resultData["Data"][i].FieldValue = "1";
                                            resultData["Data"][i].IsVisible = false;
                                            if (context.sessionUserRoleId == 4) {
                                            }
                                            break;
                                        case 1692:
                                            resultData["Data"][i].FieldValue = context.sessionUserId;
                                            if (context.sessionUserRoleId != 7) {
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
                                            if (context.sessionUserRoleId == 7) {
                                                resultData["Data"][i].HasAutoLookUp = true;
                                                resultData["Data"][i].IsVisible = true;
                                            }
                                            break;
                                    }
                                }
                                if (context.sessionUserRoleId == 7) {
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
                                context.pageTitle = "Reserve Workspace"; //"New " + context.seattxt +" Booking Request";
                                context.secondaryTarget = 1;
                                context.splitviewInput.showSecondaryView = true;
                            }
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
                    context.notificationService.ShowToaster(context.seattxt + " booking can be done only 14 days in advance", 2);
                    break;
                case -5:
                    context.notificationService.ShowToaster("Selected User already have another reservation for the same time slot", 2);
                    break;
                case -8:
                    context.notificationService.ShowToaster("Select a " + this.seattxt + " within your Team", 2);
                    break;
                case -9:
                    context.notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                    break;
                case -10:
                    context.notificationService.ShowToaster("No " + context.seattxt + "s are available for reservation", 2);
                    break;
            }
            //context.fieldDetailsBook = resultData["Data"];
        });
    };
    ReserveSeatwithschedulerComponenet.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.ReserveSeatdataLoad();
    };
    ;
    ReserveSeatwithschedulerComponenet.prototype.reserveSeatSubmitRet = function (event) {
        if (event["success"]) {
            this.ReserveSeatdataLoad();
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    ReserveSeatwithschedulerComponenet.prototype.Roomcolumnclick = function (selRowData) {
        this.pageTitle = "Room Details";
        var contextObj = this;
        contextObj.SpaceIdforroom = selRowData['SpaceId'];
        contextObj.SeatNo = selRowData['Seat No.'];
        contextObj.secondaryTarget = 2;
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ReserveSeatwithschedulerComponenet.prototype.divClicked = function (event, target) {
        var date = event["FieldObject"]["FieldValue"];
        this.Dateforcalender = event["FieldObject"]["FieldValue"];
        this.FromDate = date;
        this.ToDate = date;
        this.SearchToDate = date;
        this.ReserveSeatdataLoad();
    };
    ReserveSeatwithschedulerComponenet.prototype.onSelectionChange = function (event) {
        if (this.pageTarget == 0)
            this.onSelChange.emit(event['rowdata']);
    };
    ReserveSeatwithschedulerComponenet.prototype.advanceSearch = function () {
        var contextObj = this;
        this.schedulingService.getAdvnceSearchLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"].filter(function (item) {
                    return item.ReportFieldId < 1000000;
                });
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
    ReserveSeatwithschedulerComponenet.prototype.Submit = function (event) {
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
            contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
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
    ReserveSeatwithschedulerComponenet.prototype.dataLoadAfterSearch = function () {
        var contextObj = this;
        debugger;
        contextObj.LoadNonBaseOrgUnitSpace = true;
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ReserveSeatwithschedulerComponenet.prototype, "pageTarget", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ReserveSeatwithschedulerComponenet.prototype, "drawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ReserveSeatwithschedulerComponenet.prototype, "isSpecialRoom", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ReserveSeatwithschedulerComponenet.prototype, "isViewDrawing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReserveSeatwithschedulerComponenet.prototype, "selectedData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveSeatwithschedulerComponenet.prototype, "itemSourceData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveSeatwithschedulerComponenet.prototype, "floorCellOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveSeatwithschedulerComponenet.prototype, "onSelChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveSeatwithschedulerComponenet.prototype, "roomNoLinkClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReserveSeatwithschedulerComponenet.prototype, "outSelectedData", void 0);
    ReserveSeatwithschedulerComponenet = __decorate([
        core_1.Component({
            selector: 'reserveseatwithscheduler',
            styleUrls: ['./app/Views/Scheduling/Room Booking/reserveroom.component.css'],
            templateUrl: './app/Views/Scheduling/Seat Booking/reserveseatwithscheduler.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, fieldGeneration_component_1.FieldComponent,
                dropdownlistcomponent_component_1.DropDownListComponent, search_component_1.searchBox, datecomponent_component_1.DateComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, bookseat_component_1.BookSeatComponent, roomdetails_component_1.Roomdetails, scheduler_component_1.ScheduleCalendarComponent, customsearchforscheduling_component_1.Searchforschedule],
            providers: [scheduling_service_1.SchedulingService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ReserveSeatwithschedulerComponenet);
    return ReserveSeatwithschedulerComponenet;
}());
exports.ReserveSeatwithschedulerComponenet = ReserveSeatwithschedulerComponenet;
//# sourceMappingURL=reserveseatwithscheduler.component.js.map