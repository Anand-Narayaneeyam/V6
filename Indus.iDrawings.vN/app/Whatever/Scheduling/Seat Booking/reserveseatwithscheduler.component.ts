/// <reference path="bookseat.component.ts" />
import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DateComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { BookSeatComponent } from './bookseat.component';
import { Roomdetails } from '../Room Booking/roomdetails.component';
import {ScheduleCalendarComponent} from '../../../Framework/Whatever/Scheduler/scheduler.component';
import { Searchforschedule } from './customsearchforscheduling.component';
import { GeneralFunctions} from '../../../Models/Common/General';


@Component({
    selector: 'reserveseatwithscheduler',
    styleUrls: ['./app/Views/Scheduling/Room Booking/reserveroom.component.css'],
    templateUrl: './app/Views/Scheduling/Seat Booking/reserveseatwithscheduler.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, FieldComponent,
        DropDownListComponent, searchBox, DateComponent, PagingComponent, PageComponent, CustomCheckBoxComponent, BookSeatComponent, Roomdetails, ScheduleCalendarComponent, Searchforschedule],
    providers: [SchedulingService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    encapsulation: ViewEncapsulation.None
})

export class ReserveSeatwithschedulerComponenet implements OnInit, OnChanges {
    disableDates: Array<string> = ["Sunday", "Saturday"];
    itemsSource: any[];
    fieldObject: IField[];
    fieldDetailsBook: IField[];
    NotshwingIngrid: any;
    totalItems: number = 0;
    @Input() pageTarget: number;
    @Input() drawingId: number;
    @Input() isSpecialRoom: boolean;
    @Input() isViewDrawing: boolean = false;
    @Input() selectedData: any;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    SpaceIdforroom: number = 0;
    secondaryTarget: number = 0;
    schedulerArrObj = new Array<ISchedulerObj>();
    SitedatetimeArrObj = new Array<SiteDatetime>();
    Dateforcalender: string;
    IsAddpageopened: boolean = false;
    IsGridloaded: boolean = false;
    TommorrowDate: string;
    FromDate: string;
    ToDate: string;
    Fromtime: any;
    Totime: any;
    timeid: number;
    SpaceId: number = 0;
    SeatId: number = 0;
    SiteId: number = 0;
    SearchQuery: string;
    SearchResourceQuery: string;
    Sitetime: string;
    IsAvailable: boolean = false;
    SearchToDate: string;
    filter: string = '';
    SeatIdarray: any = [];
    Fromdate: any = [];
    Todate: any = [];
    FromTime: any = [];
    ToTime: any = [];
    Availablity: any = [];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Seat Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, allowSort: false, sortDir: 'ASC', sortCol: '' };
    pageTitle: string = "";
    pagePath: string = "Scheduling / Reserve Seat";
    showBookSeat: boolean = false;
    refreshgrid;
    sessionUserId = 0;
    sessionUserRoleId = 0;
    SeatNo: string;
    @Output() itemSourceData = new EventEmitter();
    @Output() floorCellOnClick = new EventEmitter();
    @Output() onSelChange = new EventEmitter();
    @Output() roomNoLinkClick = new EventEmitter();
    @Output() outSelectedData = new EventEmitter();
    seattxt = "Workspace";
    formHeight: any;
    arrHighlightRowIds = [];
    advancelookup: IField[];
    Resourcedata: any[];
    arrayList = new Array<IField>();
    showSearchFilter;
    IsAdvanceSearch = 0;
    advanceValue = "[]";
    fromdateTimeAfterSearch = '';
    todateTimeAfterSearch = '';
    LoadNonBaseOrgUnitSpace: boolean;
    constructor(private schedulingService: SchedulingService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
        this.formHeight = ((window.innerHeight * 31.54) / 100);;
        this.formHeight = this.formHeight + "px";

    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['isViewDrawing']) {
            this.refreshgrid = [];
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
    }
    getHeight() {
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
    }
    ngOnInit(): void {
        var contextObj = this;
        contextObj.pagePath = "Scheduling / Reserve " + contextObj.seattxt;
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        if (m > 30) {
            n = n + 1;
            contextObj.timeid = (n * 2)
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

    }
    private getSessionUserData(contextObj) {
        contextObj.schedulingService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];

        });


    }
    getFormattedDate(dt) {
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
    }
    arrangeSelectedItemOnTop() {
        var contextObj = this;
        var selectedRowDatas: any[] = [];
        var seatId = contextObj.selectedData['SeatId'];
        if (seatId == null || seatId == undefined)
            seatId = contextObj.selectedData['Seat Id'];
        var index = this.itemsSource.findIndex(function (el) { return el['Seat Id'] == seatId });
        selectedRowDatas.push(this.itemsSource[index]);
        this.itemsSource.splice(index, 1);
        var data = selectedRowDatas.concat(this.itemsSource);
        this.itemsSource = data;
    }
    public ReserveSeatdataLoad() {
        debugger
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
        var fromtime = contextObj.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.FromTime[0].FieldValue)) });
        //var totime = contextObj.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.ToTime[0].FieldValue)) });
        var fromdateTime = contextObj.FromDate + fromtime[0].Value;
        //var todateTime = contextObj.ToDate + totime[0].Value;
        this.schedulingService.getReserveSeatDatafordrawing(contextObj.FromDate, contextObj.FromDate, contextObj.SearchQuery, contextObj.SearchQuery, this.IsAvailable, this.SearchToDate,
            this.drawingId, 0, contextObj.isSpecialRoom, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter).subscribe(function (resultData) {

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
                    contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s are available for reservation", 2)
                }
                if (contextObj.pageTarget == 0)
                    contextObj.itemSourceData.emit(contextObj.itemsSource);
                if (contextObj.itemsSource) {
                    for (var i = 0; i < contextObj.itemsSource.length; i++) {
                        contextObj.SitedatetimeArrObj.push({
                            Datetime: contextObj.itemsSource[i]["DateTime"]
                        })
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
                                    })
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
    }
    onHyperLinkClick(event) {
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
                    //    }
                    //    else {
                    //        contextObj.notificationService.ClearAllToasts();
                    //        contextObj.notificationService.ShowToaster("You do not have the privilege to view the selected Drawing", 2);
                    //    }
                    //});
                }
                break;
        }
    }
    private bookHotellingSeat(event: any) {
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
        var sitetime = context.itemsSource.find(function (item) { return item.SiteId === context.SiteId });
        var frmTime = context.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.FromTime[0].FieldValue)) });
        var toTime = context.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.ToTime[0].FieldValue)) });
        var fromdateTime = context.FromDate + frmTime[0].Value;
        var todateTime = context.ToDate + toTime[0].Value;
        //if (totimeid == 0)
        //    context.ToDate = context.TommorrowDate;
        var sitetime = context.itemsSource.find(function (item) { return item.SpaceId === context.SpaceId });
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
                                        case 1687://fromdate
                                            resultData["Data"][i].FieldValue = context.FromDate;
                                            break;
                                        case 2306://recur   
                                            resultData.Data[i].LookupDetails.LookupValues = resultData.Data[i].LookupDetails.LookupValues.filter(function (item) {
                                                return item["Id"] < 6;
                                            });
                                            break;
                                        case 1695://fromtime  
                                            resultData["Data"][i].LookupDetails.LookupValues.splice(26, 26);
                                            resultData["Data"][i].FieldValue = context.FromTime[0].LookupDetails.LookupValues[timeid].Id.toString();;
                                            break;
                                        case 1688://todate
                                            resultData["Data"][i].FieldValue = context.ToDate;
                                            break;
                                        case 1696://totime
                                            resultData["Data"][i].LookupDetails.LookupValues.splice(0, 1);
                                            resultData["Data"][i].FieldValue = 39;//context.ToTime[0].LookupDetails.LookupValues[totimeid.toString()].Id.toString();
                                            break;
                                        case 1697://group location
                                            resultData["Data"][i].IsVisible = false;
                                            break;
                                        case 1725:/*user type*/

                                            resultData["Data"][i].FieldValue = "1";
                                            resultData["Data"][i].IsVisible = false;
                                            if (context.sessionUserRoleId == 4) {

                                            }
                                            break;
                                        case 1692:/*booked for hiding for facility user*/
                                            resultData["Data"][i].FieldValue = context.sessionUserId;
                                            if (context.sessionUserRoleId != 7) {
                                                resultData["Data"][i].IsVisible = false;
                                            }
                                            break;
                                        case 698:/*space function*/
                                            resultData["Data"][i].IsEnabled = false;
                                            break;
                                        case 2050:/*sitetimezone*/
                                            resultData["Data"][i].FieldValue = siteTimeZone;
                                            resultData["Data"][i].IsVisible = false;
                                            break;
                                        case 1981:/*location related space details hide*/
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
                                            resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el)
                                            { return holidays.indexOf(el.Id) == -1; })
                                            break;
                                        case 1375:
                                            /*removes sat and sun from week days*/
                                            resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el)
                                            { return holidays.indexOf(el.Id) == -1; })
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

                                        case 2296:/*booked for textsearchlookup visible  for divadmin user*/
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
                                        } else
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
                    context.notificationService.ShowToaster("Reservation exists", 2)
                    break;
                //case -3:
                //    context.notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2)
                //    break;
                case -4:
                    context.notificationService.ShowToaster(context.seattxt + " booking can be done only 14 days in advance", 2);
                    break;
                case -5:
                    context.notificationService.ShowToaster("Selected User already have another reservation for the same time slot", 2)
                    break;
                case -8:
                    context.notificationService.ShowToaster("Select a "+ this.seattxt +" within your Team", 2);
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

    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.ReserveSeatdataLoad();
    };
    reserveSeatSubmitRet(event) {

        if (event["success"]) {
            this.ReserveSeatdataLoad();
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }
    private Roomcolumnclick(selRowData) {
        this.pageTitle = "Room Details";
        var contextObj = this;
        contextObj.SpaceIdforroom = selRowData['SpaceId'];
        contextObj.SeatNo = selRowData['Seat No.'];
        contextObj.secondaryTarget = 2;
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }
    private divClicked(event: any, target) {
        var date = event["FieldObject"]["FieldValue"];
        this.Dateforcalender = event["FieldObject"]["FieldValue"];
        this.FromDate = date;
        this.ToDate = date;
        this.SearchToDate = date;
        this.ReserveSeatdataLoad();
    }
    onSelectionChange(event: any) {
        if (this.pageTarget == 0)
            this.onSelChange.emit(event['rowdata']);
    }
    advanceSearch() {
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
                    for (let i = 0; i < contextObj.Resourcedata.length; i++) {
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
                    //contextObj.advancelookup = contextObj.advancelookup.concat(contextObj.arrayList);
                }
            });
        });
    }
    Submit(event: any) {
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
            fromtime = this.fromdateTimeAfterSearch.replace("PM", ":00 PM")
        else if (this.fromdateTimeAfterSearch.indexOf("AM") > 0)
            fromtime = this.fromdateTimeAfterSearch.replace("AM", ":00 AM")
        if (this.todateTimeAfterSearch.indexOf("PM") > 0)
            totime = this.todateTimeAfterSearch.replace("PM", ":00 PM")
        else if (this.todateTimeAfterSearch.indexOf("AM") > 0)
            totime = this.todateTimeAfterSearch.replace("AM", ":00 AM")
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
    }
    dataLoadAfterSearch() {
        var contextObj = this;
        debugger
        contextObj.LoadNonBaseOrgUnitSpace = true;
        this.schedulingService.getSeatfilterData(contextObj.advanceValue, contextObj.SearchResourceQuery, this.fromdateTimeAfterSearch, this.todateTimeAfterSearch, this.IsAvailable, this.isSpecialRoom,
            this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, contextObj.LoadNonBaseOrgUnitSpace).subscribe(function (resultData) {
                contextObj.totalItems = resultData.DataCount;
                contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                if (contextObj.totalItems > 0) {
                    contextObj.itemsPerPage = resultData.RowsPerPage;
                }
                else {
                    contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s are available for reservation", 2)
                }
            });
    }
}
export interface ISchedulerObj {
    rowNo: number,
    bookedDates: string[],
    strTooltip: string
}
export interface SiteDatetime {
    Datetime: string
}