import {Component, EventEmitter, AfterViewInit, Output, Input, OnInit, AfterViewChecked} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DateComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { ReservationRequestforroom } from './reserveroom-reservationrequest.component';
import { Invitees } from './Invitees-list.component';
import { Amenities } from './Amenities-listforreservation.component';
import { Catering } from './Catering-listforreservation.component';
import { Services } from './Services-listforresrvation.component';
import { CustomRadioComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component';
import {ScheduleCalendarComponent} from '../../../Framework/Whatever/Scheduler/scheduler.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { Roomdetails } from './roomdetails.component';
import { Searchforschedule } from '../Seat Booking/customsearchforscheduling.component';

@Component({
    selector: 'reserveroom',
    templateUrl: './app/Views/Scheduling/Room Booking/reserveroom.component.html',
    styleUrls: ['./app/Views/Scheduling/Room Booking/reserveroom.component.css'],
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, FieldComponent,
        Notification, SlideComponent, DropDownListComponent, searchBox, DateComponent, ScheduleCalendarComponent, PagingComponent, ReservationRequestforroom, Invitees, Amenities, Catering, Services, PageComponent, Roomdetails, Searchforschedule, CustomRadioComponent],
    providers: [SchedulingService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],

})

export class ReserveroomComponenet implements OnInit {
    disableDates: Array<string> = ["Sunday", "Saturday"];
    @Input() drawingId: number;
    @Input() pageTarget: number;
    @Input() selectedData: number;
    @Input() isViewDrawing: boolean;
    IsReserved: boolean = false;
    showSlide: boolean = false;
    position: any = "top-right";
    slidewidth = 300;
    itemsSource: any[];
    fieldObject: IField[];
    Roombookrequest: IField[];
    Invitees: IField[];
    Amnitiy: IField[];
    Services: IField[];
    Catering: IField[];
    schedulerArrObj = new Array<ISchedulerObj>();
    SitedatetimeArrObj = new Array<SiteDatetime>();
    sitedatetimeforreservationrequest: string;
    messages: any[];
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    RowCount: number = 0;
    Dateforcalender: string;
    TommorrowDate: string;
    action: string;
    StartDate: string;
    IsAdvanceSearch = 0;
    EndDate: string;
    FromTime: any;
    Totime: any;
    SearchQuery: string;
    AminityQuery: string;
    IsAvailable: boolean = true;
    IsAddpageopened: boolean = false;
    IsGridloaded: boolean = false;
    SearchToDate: string;
    //DrawingId: number = 0;
    SpaceId: number = 0;
    FloorId: number = 0;
    SiteId: number = 0;
    SpaceIdforrrom: number = 0;
    secondaryTarget: number = 0;
    advancelookup: IField[];
    keyWordLookup: any;
    advanceValue = "[]";
    KeywordFieldObject: any;
    Amenitiedata: any[];
    arrayList = new Array<IField>();
    Sitename: string;
    Buildingname: string;
    Floorname: string;
    RoomNo: string;
    Seats: number = 0;
    ReservedBy: number = 0;
    filter: string = '';
    OldadataForInsert: string;
    NewDataForInsert: string;
    TempNewDataForInsert: any[];
    InviteesList: string = '';
    AmeniteesList: string = '';
    ServiceList: string = '';
    CateringList: string = '';
    sessionUserCatId = 0;
    sessionUserRoleId = 0;
    sessionUserId = 0;
    dateSelectorField: IField[];
    btnName: string;
    NameDisplayFormatId: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "SpaceId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, allowSort: false, sortDir: 'ASC', sortCol: '' };
    pageTitle: string;
    pagePath: string = "Scheduling / Reserve Team Room";
    sectionAccessExpansionStatus = [{ "title": "New Room Booking Request", "isExpanded": true }, { "title": "Invitees", "isExpanded": false }, { "title": "Amenities", "isExpanded": false }, { "title": "Services", "isExpanded": false }, { "title": "Catering", "isExpanded": false }];
    @Output() floorCellOnClick = new EventEmitter();
    @Output() itemSourceData = new EventEmitter();
    @Output() onSelChange = new EventEmitter();
    @Output() roomNoLinkClick = new EventEmitter();
    @Output() outSelectedData = new EventEmitter();
    arrHighlightRowIds = [];
    isSpecialRoom: boolean = false;
    roomtxt = "Team Room";
    roomtxtcopy: string;
    searchTitle = "Search Team Room";
    IsProxyReservationEnabled: boolean = false;
    enableAminity: boolean = false;
    LoadNonBaseOrgUnitSpace: boolean;
    isShowBaseTeamMessage: boolean = false;
    resOutsideBaseTeam;
    IsBaseTeamBasedResEnabled: boolean;
    constructor(private SchedulingService: SchedulingService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }
    ngOnInit(): void {
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
                    contextObj.fieldObject.push(item);;
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
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.SchedulingService.checkSubscribedFeature('275').subscribe(function (result) {//275
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
        var index = this.itemsSource.findIndex(function (el) { return el['SpaceId'] == contextObj.selectedData['SpaceId'] });
        selectedRowDatas.push(this.itemsSource[index]);
        this.itemsSource.splice(index, 1);
        var data = selectedRowDatas.concat(this.itemsSource);
        this.itemsSource = data;
    }
    public ReserveRoomdataLoad(isPageLoad) {
        debugger
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
                contextObj.SchedulingService.getReserveRoomData(contextObj.NameDisplayFormatId, contextObj.StartDate, contextObj.EndDate, contextObj.SearchQuery, contextObj.AminityQuery, contextObj.IsAvailable, contextObj.SearchToDate,
                    contextObj.drawingId, contextObj.ReservedBy, contextObj.isSpecialRoom, true, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.pageTarget).subscribe(function (resultData) {
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
                                    //largest = Math.max.apply(Math, temp);
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
                                    contextObj.SchedulingService.getReserveRoomData(contextObj.NameDisplayFormatId, contextObj.StartDate, contextObj.EndDate, contextObj.SearchQuery, contextObj.AminityQuery, contextObj.IsAvailable, contextObj.SearchToDate,
                                        contextObj.drawingId, contextObj.ReservedBy, contextObj.isSpecialRoom, false, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.pageTarget).subscribe(function (resultData) {
                                            // contextObj.totalItems = resultData["Data"].DataCount;

                                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                            contextObj.totalItems = contextObj.itemsSource.length;
                                            contextObj.RowCount = contextObj.itemsSource.length;
                                            if (contextObj.totalItems > 0) {
                                                if (isPageLoad == true && contextObj.isShowBaseTeamMessage == true) {
                                                    contextObj.notificationService.ShowToaster(contextObj.roomtxt + " in your Team are already reserved. Select any other Room to reserve", 2)
                                                }
                                                contextObj.IsGridloaded = true;
                                                if (contextObj.pageTarget == 2)
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
                                                        // largest = Math.max.apply(Math, temp);
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
                                                contextObj.notificationService.ShowToaster("No Spaces assigned for Scheduling", 2)
                                            }
                                        });
                                }//
                                else {
                                    contextObj.notificationService.ShowToaster("No Spaces assigned for Scheduling", 2)
                                }
                            });
                        }

                    });
            }
            else {
                contextObj.SchedulingService.getReserveRoomData(contextObj.NameDisplayFormatId, contextObj.StartDate, contextObj.EndDate, contextObj.SearchQuery, contextObj.AminityQuery, contextObj.IsAvailable, contextObj.SearchToDate,
                    contextObj.drawingId, contextObj.ReservedBy, contextObj.isSpecialRoom, false, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.pageTarget).subscribe(function (resultData) {
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
                            contextObj.notificationService.ShowToaster("No Spaces assigned for Scheduling", 2)
                        }
                });
            }
        });
    }

    divClicked(event: any) {
        this.Dateforcalender = event["FieldObject"]["FieldValue"];
        this.StartDate = this.Dateforcalender;
        this.EndDate = this.Dateforcalender;
        this.SearchToDate = this.Dateforcalender;
        this.ReserveRoomdataLoad(false);
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.ReserveRoomdataLoad(false);
    }

    cellclicked(event: any) {
        debugger
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
            var sitetime = contextObj.itemsSource.find(function (item) { return item.SiteId === contextObj.SiteId });
            this.sitedatetimeforreservationrequest = sitetime.DateTime;
            var siteTimeZone = "";
            var holidays = [1, 7];
            contextObj.SchedulingService.getTimeZoneNameForSite(contextObj.SiteId).subscribe(function (result) {
                siteTimeZone = result;
                contextObj.SchedulingService.roombookingfields(contextObj.SpaceId).subscribe(function (resultData) {
                    contextObj.Roombookrequest = (resultData["Data"]);
                    debugger
                    contextObj.Roombookrequest[10].IsVisible = false;// = contextObj.Sitename + "/" + contextObj.Buildingname + "/" + contextObj.Floorname + "/" + contextObj.RoomNo;
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
                    } else {
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
                            contextObj.Roombookrequest[i].LookupDetails.LookupValues = contextObj.Roombookrequest[i].LookupDetails.LookupValues.filter(function (el)
                            { return holidays.indexOf(el.Id) == -1; })
                        if (contextObj.Roombookrequest[i].FieldId == 2306) {//recur
                            contextObj.Roombookrequest[i].LookupDetails.LookupValues = contextObj.Roombookrequest[i].LookupDetails.LookupValues.filter(function (item) {
                                return item["Id"] < 6;
                            });
                        }
                    }
                    contextObj.SchedulingService.checkSubscribedFeature('280,281,282,283').subscribe(function (result) {//275
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
                        //}
                        //else {
                        //    contextObj.notificationService.ShowToaster("Select a time between 06:00 AM and 07:00 PM", 2);
                        //}
                    }
                    else
                        contextObj.notificationService.ShowToaster("Reservation cannot be done on Saturday/Sunday", 2);
                });
            });
        }
    }
    private getSessionUserData(contextObj) {
        debugger
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
    }
    private onSectionExpandChange(obj) {
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
            if (this.sectionAccessExpansionStatus[i].title !== obj[1].title) {
                this.sectionAccessExpansionStatus[i].isExpanded = false;

            } else {
                this.sectionAccessExpansionStatus[i].isExpanded = true;
            }
        }
    }
    onColValClick(colVal) {
        var contextObj = this;
        if (contextObj.sessionUserRoleId > 3 && colVal.colName == "Floor") {
            var spaceId = colVal.selRowData['SpaceId'];
            // contextObj.SchedulingService.checkEditPrivilageExist(spaceId).subscribe(function (resultData) {
            // if (resultData.ServerId > 0) {
            this.floorCellOnClick.emit({ "rowData": colVal.selRowData, "isFromRoomClick": false });
            //  }
            //else {
            //     contextObj.notificationService.ClearAllToasts();
            //     contextObj.notificationService.ShowToaster("You do not have the privilege to view the selected Drawing", 2);
            //  }
            //  });
        } else
            if (colVal.colName == "Room No.") {
                this.floorCellOnClick.emit({ "rowData": colVal.selRowData, "isFromRoomClick": true });
                //this.Roomcolumnclick(colVal);
            } else
                this.floorCellOnClick.emit({ "rowData": colVal.selRowData, "isFromRoomClick": false });

    }
    private Roomcolumnclick(colVal) {
        if (this.pageTarget != 2) {
            this.pageTitle = "Room Details";
            var contextObj = this;
            contextObj.SpaceIdforrrom = colVal.selRowData['SpaceId'];
            contextObj.secondaryTarget = 2;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
        else
            this.roomNoLinkClick.emit(colVal.selRowData);
    }
    onSelectionChange(data: any) {
        if (this.pageTarget == 2) {
            this.onSelChange.emit(data['rowdata']);
            this.selectedData = data['rowdata'];
        }
    }
    getInviteesList(event: any) {
        this.InviteesList = event["InviteesList"];
        if (this.TempNewDataForInsert != undefined)
            this.TempNewDataForInsert["Invitees"] = this.InviteesList;
    }
    getAmnietyList(event: any) {
        this.AmeniteesList = event["AmnietyList"];
        if (this.TempNewDataForInsert != undefined)
            this.TempNewDataForInsert["OtherAminitees"] = this.AmeniteesList;
    }
    getServiceList(event: any) {
        this.ServiceList = event["ServiceList"];
        if (this.TempNewDataForInsert != undefined)
            this.TempNewDataForInsert["OtherServices"] = this.ServiceList;
    }
    getCateringList(event: any) {
        this.CateringList = event["CateringList"];
        if (this.TempNewDataForInsert != undefined)
            this.TempNewDataForInsert["OtherCatering"] = this.CateringList;
    }
    OnSuccessfulSubmit(event: any) {
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
    }
    onReserve(event: any) {
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
    }
    onSplitViewClose(event: any) {
        var contextObj = this;
        contextObj.IsAddpageopened = false;
    }
    advanceSearch() {
        var contextObj = this;
        this.SchedulingService.getAdvnceSearchLookupforReserveroom().subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                if (contextObj.pageTarget == 2) {
                    resultData['Data']['FieldBinderList'].find(function (el) { return el['FieldId'] == 2170 })['IsVisible'] = false;
                    resultData['Data']['FieldBinderList'].find(function (el) { return el['FieldId'] == 2171 })['IsVisible'] = false;
                    resultData['Data']['FieldBinderList'].find(function (el) { return el['FieldId'] == 2172 })['IsVisible'] = false;
                }
                if (contextObj.enableAminity == false) {
                    resultData['Data']['FieldBinderList'].find(function (el) { return el['FieldId'] == 2429 })['IsVisible'] = false;
                }
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                //contextObj.advancelookup[0].FieldLabel = "Asset No.";
                //contextObj.advancelookup[1].FieldLabel = "Asset Class Name";
            }
            contextObj.SchedulingService.getAmenitiesData(0, '', 'ASC', '').subscribe(function (result) {
                contextObj.Amenitiedata = JSON.parse(result["Data"].FieldBinderData);
                if (contextObj.Amenitiedata.length > 0 || contextObj.Amenitiedata != undefined) {
                    for (let i = 0; i < contextObj.Amenitiedata.length; i++) {
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
                    //contextObj.advancelookup = contextObj.advancelookup.concat(contextObj.arrayList);
                }
            });
        });
    }
    Submit(event: any) {
        var contextObj = this;
        this.IsAdvanceSearch = 1;
        contextObj.advanceValue = event.fieldobject;
        contextObj.StartDate = event.fromdateTime;
        contextObj.EndDate = event.todateTime;
        contextObj.ReserveRoomdataLoadforsearch();
    }
    public ReserveRoomdataLoadforsearch() {
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
            fromtime = contextObj.StartDate.replace("PM", ":00 PM")
        else if (contextObj.StartDate.indexOf("AM") > 0)
            fromtime = contextObj.StartDate.replace("AM", ":00 AM")
        if (contextObj.EndDate.indexOf("PM") > 0)
            totime = contextObj.EndDate.replace("PM", ":00 PM")
        else if (contextObj.EndDate.indexOf("AM") > 0)
            totime = contextObj.EndDate.replace("AM", ":00 AM")
        contextObj.SitedatetimeArrObj = [];
        contextObj.schedulerArrObj = [];
        if (contextObj.IsAdvanceSearch == 1)
            contextObj.filter = contextObj.advanceValue;
        else
            contextObj.filter = '';
        if (new Date(fromtime) >= new Date(totime))
            contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
        else {
            this.SchedulingService.getReserveRoomDataforsearch(this.NameDisplayFormatId, this.StartDate, this.EndDate, contextObj.SearchQuery, this.AminityQuery, this.IsAvailable, this.SearchToDate,
                this.drawingId, this.ReservedBy, this.isSpecialRoom, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.LoadNonBaseOrgUnitSpace).subscribe(function (resultData) {
                    contextObj.totalItems = resultData.DataCount;
                    contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                    contextObj.RowCount = contextObj.itemsSource.length;
                    if (contextObj.RowCount > 0) {
                        contextObj.itemsPerPage = 100;
                        contextObj.IsGridloaded = true;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No Scheduling Spaces available for the selected search criteria", 2)
                    }
                    if (contextObj.pageTarget == 2)
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
                                largest = timeforScroll
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
    }
    onNormalClick($event) {
        this.isSpecialRoom = false;
        this.ReserveRoomdataLoad(true);
    }
    onSURoomClick($event) {
        this.isSpecialRoom = true;
        this.ReserveRoomdataLoad(true);
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.ReserveRoomdataLoad(false);
    };
    Clear() {
        this.IsAdvanceSearch = 0;
        this.filter = '';
        this.ReserveRoomdataLoad(true);
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