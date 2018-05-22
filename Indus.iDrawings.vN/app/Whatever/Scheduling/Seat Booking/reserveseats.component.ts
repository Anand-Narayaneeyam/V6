
import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
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
import { GeneralFunctions} from '../../../Models/Common/General';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DateComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { BookSeatComponent } from './bookseat.component';
import { Roomdetails } from '../Room Booking/roomdetails.component';
import { Searchforschedule } from './customsearchforscheduling.component';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'


@Component({
    selector: 'reserveseats',
    templateUrl: './app/Views/Scheduling/Seat Booking/reserveseats.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, FieldComponent,
        DropDownListComponent, searchBox, DateComponent, PagingComponent, PageComponent, CustomCheckBoxComponent, BookSeatComponent, Roomdetails, Searchforschedule, SlideComponent, DisplaySettingsComponent],
    providers: [ValidateService, SchedulingService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    encapsulation: ViewEncapsulation.None
})

export class ReserveSeatComponenet implements OnInit {
    disableDates: Array<string> = ["Sunday", "Saturday"];
    itemsSource: any[];
    fieldObject: IField[];
    fieldDetailsBook: IField[];
    advancelookup: IField[];
    keyWordLookup: any;
    NotshwingIngrid: any;
    advanceValue = "[]";
    KeywordFieldObject: any;
    totalItems: number = 0;
    IsAdvanceSearch = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    SpaceIdforroom: number = 0;
    secondaryTarget: number = 0;
    Dateforcalender: string;
    DateforcalenderSearch: string;
    SpaceTimeForCalendar: string = "";
    TommorrowDate: string;
    FromDate: string;
    ToDate: string;
    Sitetime: string;
    Fromtime: any;
    Totime: any;
    timeid: number;
    SearchQuery: string;
    SearchResourceQuery: string;
    IsAvailable: boolean = false;
    SearchToDate: string;
    filter: string = '';
    Fromdate: any = [];
    Todate: any = [];
    FromTime: any = [];
    ToTime: any = [];
    Availablity: any = [];
    Resourcedata: any[];
    arrayList = new Array<IField>();
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "SeatId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '' };
    pageTitle: string = "";
    pagePath: string = "";
    showBookSeat: boolean = false;
    refreshgrid;
    sessionUserId = 0;
    sessionUserRoleId = 0;
    SeatNo: string;
    @Output() floorCellOnClick = new EventEmitter();
    seattxt = "Workspace";
    seattxtcopy: string;
    searchTitle: string;
    isSpecialRoom: boolean = false;
    isReserved: boolean = false;
    showSearchFilter;
    fromdateTimeAfterSearch = '';
    todateTimeAfterSearch = '';
    resOutsideBaseTeam;
    LoadNonBaseOrgUnitSpace: boolean;
    isShowBaseTeamMessage: boolean = false;
    IsProxyReservationEnabled: boolean = false;
    constructor(private schedulingService: SchedulingService, private notificationService: NotificationService, private generFun: GeneralFunctions, private validateService: ValidateService, private administrationService: AdministrationService) {
    }

    ngOnInit(): void {
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
    }
    checkSubscribedFeatures() {
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
    }
    getDateAndTime() {
        var contextObj = this;
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
            this.FromDate = tommorowdate;
            this.ToDate = tommorowdate;
        }
        else {
            this.FromDate = todaydate;
            this.ToDate = todaydate;
        }
        this.SearchToDate = todaydate;
        return todaydate;
    }
    setDateTimeVariables(todaydate) {
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

    }
    private getSessionUserData(contextObj) {
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
    public ReserveSeatdataLoad(noBaseTeam?) {
        var contextObj = this;
        if (contextObj.Availablity[0].FieldValue == "true")
            contextObj.IsAvailable = true;
        else
            contextObj.IsAvailable = false;
        contextObj.SearchQuery = '';
        contextObj.SearchResourceQuery = '';
        if (contextObj.FromTime[0].FieldValue != "-1" && contextObj.ToTime[0].FieldValue != "-1") {
            var fromtime = contextObj.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.FromTime[0].FieldValue)) });
            var totime = contextObj.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.ToTime[0].FieldValue)) });
            var fromdateTime = contextObj.FromDate + fromtime[0].Value;
            var todateTime = contextObj.ToDate + totime[0].Value;
            contextObj.schedulingService.checkSubscribedFeature('279').subscribe(function (result) {
                contextObj.resOutsideBaseTeam = result["Data"][0]["IsSubscribed"];
                if (contextObj.resOutsideBaseTeam == true) {
                    contextObj.schedulingService.getReserveSeatData(contextObj.SearchQuery, contextObj.SearchResourceQuery, fromdateTime, todateTime, contextObj.IsAvailable, contextObj.isSpecialRoom, true,
                        contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
                            contextObj.totalItems = resultData.DataCount;
                            contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                            if (contextObj.totalItems > 0) {
                                contextObj.itemsPerPage = resultData.RowsPerPage;
                                contextObj.LoadNonBaseOrgUnitSpace = true;
                            }
                            else {
                                //Only CFPB Implimentation-New ReQuirement(base team) and other worspace availability
                                contextObj.LoadNonBaseOrgUnitSpace = false;
                                contextObj.schedulingService.getReserveSeatData(contextObj.SearchQuery, contextObj.SearchResourceQuery, fromdateTime, todateTime, contextObj.IsAvailable, contextObj.isSpecialRoom, false,
                                    contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
                                        contextObj.totalItems = resultData.DataCount;
                                        contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                                        if (contextObj.totalItems > 0) {
                                            contextObj.itemsPerPage = resultData.RowsPerPage;
                                            if (noBaseTeam == true && contextObj.isShowBaseTeamMessage == true)
                                                contextObj.notificationService.ShowToaster(contextObj.seattxt + " in your Team are already reserved. Select any other Workspace to reserve", 2)
                                        }
                                        else { contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s are available for reservation", 2) }
                                    });
                            }
                        });
                }
                else {
                    contextObj.LoadNonBaseOrgUnitSpace = true;
                    contextObj.schedulingService.getReserveSeatData(contextObj.SearchQuery, contextObj.SearchResourceQuery, fromdateTime, todateTime, contextObj.IsAvailable, contextObj.isSpecialRoom, true,
                        contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (resultData) {
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
    }
    onChangefrom(event: any) {
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
                var focusingElmt = <HTMLElement>ele[ele.length - 1];
                focusingElmt.focus();
                this.validateService.initiateValidation(contextObj.ToTime[0], this, true, focusingElmt);
            }
        }
    }
    //(change) = "onChangeto($event.target.value)"
    OnSearchClick(event: any) {
        var contextObj = this;
        if (contextObj.Availablity[0].FieldValue == "true")
            contextObj.IsAvailable = true;
        else
            contextObj.IsAvailable = false;
        if (contextObj.FromTime[0].FieldValue != "-1" && contextObj.ToTime[0].FieldValue != "-1") {
            var fromtime = contextObj.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.FromTime[0].FieldValue)) });
            var totime = contextObj.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.ToTime[0].FieldValue)) });
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

            } else {
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
    }
    selectedAvailability(event: any) {
        this.dataLoad();
        if (this.isSpecialRoom == true)
            this.seattxt = "Special Use Room";
        else
            this.seattxt = this.seattxtcopy;

    }
    dataLoad() {
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
    }
    onHyperLinkClick(event) {
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
                    //    }
                    //    else {
                    //        contextObj.notificationService.ClearAllToasts();
                    //        contextObj.notificationService.ShowToaster("You do not have the privilege to view the selected Drawing", 2);
                    //    }
                    //});
                }
                else
                    contextObj.floorCellOnClick.emit({ "selRowData": event.selRowData, "isSpecialRoom": contextObj.isSpecialRoom, "isFromRoomClick": false });
                break;
        }
        contextObj.isReserved = false;
    }
    private bookHotellingSeat(selRowData) {
        var context = this;
        if (context.FromTime[0].FieldValue != "-1" && context.ToTime[0].FieldValue != "-1") {
            var frmTime = context.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.FromTime[0].FieldValue)) });
            var toTime = context.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.ToTime[0].FieldValue)) });
            var fromdateTime = context.FromDate + frmTime[0].Value;
            var todateTime = context.ToDate + toTime[0].Value;

            this.schedulingService.checkConflictedSeatRequestExists(selRowData["SeatId"], fromdateTime, todateTime).subscribe(function (resultData) {
                switch (resultData) {
                    case 1:
                    case -3:
                        var siteTimeZone = "";
                        context.schedulingService.getTimeZoneNameForSite(selRowData["SiteId"]).subscribe(function (resultData) {
                            siteTimeZone = resultData
                            context.schedulingService.getTimeforspace(selRowData["SpaceId"]).subscribe(function (resulttime) {
                                var SpaceTime = "";
                                SpaceTime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];

                                context.Sitetime = SpaceTime;
                                context.schedulingService.getSeatBookFields(selRowData["SeatId"]).subscribe(function (resultData) {
                                    if (resultData["Data"]) {
                                        debugger
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
                                                    resultData["Data"][i].FieldValue = context.FromTime[0].FieldValue;
                                                    break;
                                                case 1688://todate
                                                    resultData["Data"][i].FieldValue = context.ToDate;
                                                    break;
                                                case 1696://totime
                                                    resultData["Data"][i].LookupDetails.LookupValues.splice(0, 1);
                                                    resultData["Data"][i].FieldValue = context.ToTime[0].FieldValue;
                                                    break;
                                                case 1697://group location
                                                    resultData["Data"][i].IsVisible = false;
                                                    break;
                                                case 1725:/*user type*/

                                                    resultData["Data"][i].FieldValue = "1";
                                                    resultData["Data"][i].IsVisible = false;
                                                    /*if (context.sessionUserRoleId == 4) { //for GAO 
                                                        resultData["Data"][i].IsVisible = false;
                                                    }*/
                                                    break;
                                                case 1692:/*booked for visible  for divadmin user*/
                                                    resultData["Data"][i].FieldValue = context.sessionUserId;
                                                    if (context.IsProxyReservationEnabled == true) {
                                                        resultData["Data"][i].IsVisible = true;
                                                    } else {
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
                                                } else
                                                    return false;
                                            });
                                        }
                                        context.fieldDetailsBook = resultData["Data"];
                                        context.showBookSeat = true;
                                        context.pageTitle = "Reserve " + context.seattxt;    //"New "+context.seattxt +" Booking Request";
                                        context.secondaryTarget = 1;
                                        context.splitviewInput.showSecondaryView = true;
                                    }
                                });
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
                    //case -5:
                    //    context.notificationService.ShowToaster("Reservation already exists for the selected user in the selected time slot", 2)
                    //    break;
                }

            });
        }
    }

    reserveSeatSubmitRet(event) {

        if (event["success"]) {
            this.refreshgrid = [];
            var context = this;
            context.isReserved = true;
            this.ReserveSeatdataLoad(true);
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
            //this.itemsSource.find(function (el) {
            //    if (el.SeatId == context.inputItems.selectedIds[0]) {
            //        el.StatusId = "41";
            //        el.Status = "Not Available";
            //        context.refreshgrid = context.refreshgrid.concat([true]);
            //        return true;
            //    } else return false;
            //});
        }
    }
    private Roomcolumnclick(selRowData) {
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
        } else {
            contextObj.Dateforcalender = this.DateforcalenderSearch;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
    }
    private divClicked(event: any, target) {
        var date = event["FieldObject"]["FieldValue"];

        if (target == 1) {
            this.FromDate = date;
            this.ToDate = date;
            this.Fromdate[0].FieldValue = date;
            this.Todate[0].FieldValue = date;
            var elem = <HTMLInputElement>document.getElementsByClassName("date-picker")[1];
            elem.value = date;
            if (this.getFormattedDate(new Date()) == this.getFormattedDate(date)) {
                this.DateforcalenderSearch = "";
            }
            else
                this.DateforcalenderSearch = date;

        } else {
            this.ToDate = date;

        }
        this.SearchToDate = date;
    }
    advanceSearch() {
        var contextObj = this;
        this.schedulingService.getAdvnceSearchLookup().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                //contextObj.advancelookup[0].FieldLabel = "Asset No.";
                //contextObj.advancelookup[1].FieldLabel = "Asset Class Name";
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
    }
    dataLoadAfterSearch() {
        var contextObj = this;
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
    Clear(event) {
        this.filter = '';
        this.advanceValue = '[]';
        this.setDateTimeVariables(this.getDateAndTime());
        this.ReserveSeatdataLoad(true);
    }

    onNormalClick($event) {
        this.isSpecialRoom = false;
        this.seattxt = this.seattxtcopy;
        //var bookfield = this.fieldObject.find(function (item) { return item.ReportFieldId === 6731 })
        //bookfield.FieldLabel = "Book " + this.seattxt;
        this.ReserveSeatdataLoad(true);
    }
    onSURoomClick($event) {
        this.isSpecialRoom = true;
        this.seattxt = "Special Use Room";
        //var bookfield = this.fieldObject.find(function (item) { return item.ReportFieldId === 6731 })
        //bookfield.FieldLabel = "Book " + this.seattxt;
        this.ReserveSeatdataLoad(true);
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.ReserveSeatdataLoad(false);
    };
    public onSort(objGrid: any) {
        this.dataLoad();
        //this.ReserveSeatdataLoad();
    }

    onfocusIn(event) {
        var a = document.getElementById("showavailablechkbox");
        if (a != null) {
            a.setAttribute("aria-hidden", "false");
        }

    }
    onfocusOut(event) {
        var a = document.getElementById("showavailablechkbox");
        if (a != null) {
            a.setAttribute("aria-hidden", "true");
        }
    }
    public displaySettingsClick() {
        var contextObj = this;
        contextObj.pageTitle = "Display Settings";
        contextObj.secondaryTarget = 3;
        contextObj.splitviewInput.showSecondaryView = true;
    }
    public getUpdatedDisplaySettings(event) {
        var contextObj = this;
        this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, event.dispSettingObject);
        contextObj.splitviewInput.showSecondaryView = false;
    }
}