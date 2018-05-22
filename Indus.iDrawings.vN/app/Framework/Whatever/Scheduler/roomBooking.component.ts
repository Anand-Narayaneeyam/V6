
import { Component, Input, Output, OnInit, AfterViewInit, EventEmitter} from '@angular/core';
import {ISplitView} from '../../Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../Whatever/Split-View/split-view.component';
import { ReservationRequestforroom } from '../../../Whatever/Scheduling/Room Booking/reserveroom-reservationrequest.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {IField} from  '../../Models/Interface/IField'
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'room-booking',
    directives: [SplitViewComponent, ReservationRequestforroom],
    providers: [SchedulingService, AdministrationService, NotificationService],
    templateUrl: 'app/Framework/Views/Scheduler/roomBooking.component.html',
    inputs: ["selRowObj", "target"]
})

export class RoomBookingComponent implements AfterViewInit {
    selRowObj;
    private monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    private dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    private startDay = -1;
    private timeObj = [{ "Id": 12, "Value": "6:00am" }, { "Id": 13, "Value": "6:30am" },
        { "Id": 14, "Value": "7:00am" }, { "Id": 15, "Value": "7:30am" }, { "Id": 16, "Value": "8:00am" },
        { "Id": 17, "Value": "8:30am" }, { "Id": 18, "Value": "9:00am" }, { "Id": 19, "Value": "9:30am" },
        { "Id": 20, "Value": "10:00am" }
        , { "Id": 21, "Value": "10:30am" }, { "Id": 22, "Value": "11:00am" }, { "Id": 23, "Value": "11:30am" }
        , { "Id": 24, "Value": "12:00pm" }, { "Id": 25, "Value": "12:30pm" }, { "Id": 26, "Value": "1:00pm" },
        { "Id": 27, "Value": "1:30pm" }
        , { "Id": 28, "Value": "2:00pm" }, { "Id": 29, "Value": "2:30pm" }, { "Id": 30, "Value": "3:00pm" },
        { "Id": 31, "Value": "3:30pm" }, { "Id": 32, "Value": "4:00pm" }
        , { "Id": 33, "Value": "4:30pm" }, { "Id": 34, "Value": "5:00pm" }, { "Id": 35, "Value": "5:30pm" },
        { "Id": 36, "Value": "6:00pm" }, { "Id": 37, "Value": "6:30pm" }
        , { "Id": 38, "Value": "7:00pm" }
    ];
    private trCountArr;
    private tdCountArr;
    private datedayArr = [];
    private selMonth = "";
    private selYear = 0;
    private todayDate = new Date();
    private colTodayDateIndex = 1;
    private isDblClick: boolean = true;
    private dblClickedCelldata = [];
    private Roombookrequest: IField[];
    private fromTime;
    private toTime;
    private FloorId;
    private SpaceId;
    private SiteId;
    pageTitle: string = "";
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };

    action: string = "";
    btnName: string = "";
    Sitename: string;
    Buildingname: string;
    Floorname: string;
    RoomNo: string;
    sitedatetimeforreservationrequest: string;
    Seats: number = 0;
    sessionUserRoleId = 0;
    Dateforcalender: string;
    sessionUserId = 0;
    selDate: any;
    bookedDateObj = [];
    roomtxt = "Team Room";
    IsProxyReservationEnabled: boolean = false;
    //@Output() divClick = new EventEmitter();
    constructor(private SchedulingService: SchedulingService, private AdministrationService: AdministrationService, private notificationService: NotificationService) {

    }
    ngAfterViewInit() {
        var contextObj = this;
        this.trCountArr = new Array(this.timeObj.length + 1);
        this.tdCountArr = this.getColumnArray(1, -1);
        this.getdateandday();
        this.colTodayDateIndex = this.todayDate.getDate();
        this.getSessionUserData(contextObj);
        var todaydate = contextObj.getFormattedDate(new Date());
        this.Dateforcalender = todaydate;
        this.setBookedCells();
        this.scrollfun();
        this.checkSubscribedFeatures();
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.SchedulingService.checkSubscribedFeature('275').subscribe(function (result) {//275
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtxt = result["Data"][0].Value;
            }           
        });
    }
    scrollfun() {
        setTimeout(function () {
            var contextObj = this;
            var $reserveMainTable = $("div[id='reserveMainDiv']");
            var $firstRowDiv = $("div[id='firstRowDiv']");
            var $firstColDiv = $("div[id='firstColDiv']");

            if ($reserveMainTable != undefined && $firstRowDiv != undefined && $firstColDiv != undefined) {
                var prevLeft = 0;
                var prevTop = 0;
                $reserveMainTable.scroll(function () {
                    setTimeout(function () {

                        var currentLeft = $reserveMainTable.scrollLeft();
                        if (prevLeft != currentLeft) {

                            prevLeft = currentLeft;
                            $firstRowDiv.scrollLeft(currentLeft);
                        }
                        var currentTop = $reserveMainTable.scrollTop();
                        if (prevTop !== currentTop) {

                            prevTop = currentTop;
                            $firstColDiv.scrollTop(currentTop);
                        }

                    }, 10);
                });
            }

        }, 2000);
    }
    setBookedCells() {
        var selectedObj = [];
        this.bookedDateObj = [];
        var selObjArr = this.selRowObj;
        var curDate = "1" + "-" + this.selMonth + "-" + this.selYear;

        var endDate = (this.datedayArr.length - 1).toString();
        var toDate = endDate + "-" + this.selMonth + "-" + this.selYear;
        selectedObj.push({
            selDate: curDate,
            roomNo: selObjArr["Room No."],
            spaceId: selObjArr["SpaceId"],
            floorId: selObjArr["FloorId"],
            startDate: curDate,
            endDate: toDate,
            reservedBy: 0
        });

        var context = this;
        this.SchedulingService.getReservationTimeSlots(selectedObj[0]).subscribe(function (result) {
            var data = JSON.parse(result["Data"]["FieldBinderData"]);
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var title = data[i].Name.split('µ')[0];
                    var timeArray = [data[i].FromTime, data[i].ToTime];

                    var count = 2;
                    var rIndex = [];
                    context.timeObj.find(function (item, i) {
                        if (timeArray.indexOf(item.Value) > -1) {
                            rIndex.push(i + 1);
                            count--;
                        }
                        if (count == 0)
                            return true;
                        else return false;
                    });

                    if (rIndex.length > 0) {
                        // var diff = Number(rIndex[0]) -Number(rIndex[1]);                           
                        var toTimeIndex = Number(rIndex[1]);
                        rIndex.pop();
                        var j = Number(rIndex[0]) + 1;
                        for (j; j < toTimeIndex; j++) {
                            rIndex.push(j);
                        }
                    }
                    var colIndex = -1;
                    var fromdte = data[i].FromDate.split('-')[0];
                    context.datedayArr.find(function (item, i) {
                        var date = item.split('-')[0];
                        if (date == fromdte) {
                            colIndex = i;
                            return true;
                        } else return false;

                    });
                    context.bookedDateObj.push({
                        "date": data[i].FromDate,
                        "fromTime": data[i].FromTime,
                        "toTime": data[i].ToTime,
                        "rowIndex": rIndex,
                        "colIndex": colIndex,
                        "bookedTitle": title
                    });

                }
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

    getColumnArray(target, monthIndex) {
        var tdcolNum = [];
        var currMonth;
        var currYear;
        if (target == 1) {
            var currDate = this.todayDate;
            currMonth = currDate.getMonth();
            currYear = currDate.getFullYear();
            this.selMonth = this.monthArray[currMonth];
            this.selYear = currYear;
        }
        else {
            currMonth = monthIndex;
            currYear = this.selYear;
        }
        var currMonthDays = this.getDaysInMonth(currYear, currMonth);
        this.startDay = new Date(currYear, currMonth, 1).getDay();
        tdcolNum = new Array(currMonthDays + 1);
        return tdcolNum;
    }

    getDaysInMonth(year, month: number) {
        var retdate = 0;
        var monthIndex = month + 1;
        var isLeap = ((!(year % 4)) && ((year % 100) || (!(year % 400))));
        switch (monthIndex) {
            case 2:
                retdate = (isLeap) ? 29 : 28;
                break;
            case 8:
            case 12:
            case 10:
                retdate = 31;
                break;
            case 9:
            case 11:
                retdate = 30;
                break;
            default:
                retdate = 30 + (monthIndex % 2);
                break;
        }
        return retdate;
    }

    getdateandday() {
        var dateDay = "";
        this.datedayArr = [];
        for (var index = 0; index < this.tdCountArr.length; index++) {
            var dayIndex = -1;
            if (index == 0) {
                dateDay = "";
            } else if (index == 1) {
                dayIndex = this.startDay;
            } else {
                this.startDay = this.startDay + 1;
                dayIndex = this.startDay % 7;
            }
            var strIndex = index.toString();
            if (strIndex.length == 1) {
                strIndex = "0" + strIndex;
            }

            dateDay = strIndex + "-" + this.dayArray[dayIndex];

            this.datedayArr.push(dateDay);

        }
    }
    getClassNameTable1(row, col) {
        var classname = "notFirstTd";
        if (col == this.colTodayDateIndex && this.checkSelectedDateYear()) {
            classname = classname + " todayHighlight";
        }
        return classname;
    }

    getClassName(row, col) {
        //if (col != 0) {
        //    var tdcellId = "td" + row + "_" + col;
        //    var elemtd = <HTMLTableDataCellElement>document.getElementById(tdcellId);
        //}
        var classname = "";
        if (col != 0) {
            classname = "notFirstTd";
        } else {
            classname = "FirstTd";
        }
        if (row > 0 && col > 0) {
            if (this.bookedDateObj.length > 0) {
                this.bookedDateObj.find(function (item) {
                    if (item.colIndex == col && item.rowIndex.indexOf(row) > -1) {
                        classname = classname + " bookedCell";
                        return true;
                    } else
                        return false;
                })
            }
            if (col == this.colTodayDateIndex && this.checkSelectedDateYear()) {
                classname = classname + " todayHighlight";
            }
            if (this.datedayArr[col].includes("Sun") == true) {
                classname = classname + " divSunday";
            } else if (this.datedayArr[col].includes("Sat") == true) {
                classname = classname + " divSunday";
            }
            //if (col > 0 && row > 0) {
            //    if (row < 13 || row > 38){
            //        $("#" + tdcellId.toString()).attr("disabled", "disabled");
            //        classname = classname + " divSunday";
            //    }
            //}
        }
        return classname;
    }
    checkSelectedDateYear() {
        if (this.monthArray.indexOf(this.selMonth) == this.todayDate.getMonth() && this.selYear == this.todayDate.getFullYear())
            return true;
        else
            return false;
    }
    divBlockClick(e, colindex, rowindx) {
        var tdcellId = "td" + rowindx + "_" + colindex;
        var elemtd = <HTMLTableDataCellElement>document.getElementById(tdcellId);
        if (!elemtd.classList.contains("bookedCell") && !elemtd.classList.contains("divSaturday") && !elemtd.classList.contains("divSunday")) {
            //className != "bookedCell"){
            this.dblClickedCelldata = [];
            if (rowindx > 0 && colindex > 0) {
                this.isDblClick = true;
                this.dblClickedCelldata.push({
                    "row": rowindx.toString(),
                    "col": colindex.toString()
                });

                var tempDate = this.datedayArr[colindex];
                tempDate = tempDate.split('-')[0];
                this.selDate = tempDate + " " + this.selMonth + " " + this.selYear;

                this.fromTime = this.timeObj[rowindx - 1];
                this.toTime = this.timeObj[rowindx];
                this.loadReserveComponent();
            }
            //this.divClick.emit({ "date": this.datedayArr[colindex], "time": this.timeObj[rowindx-1].Value });
        }
    }

    getTitle(colindex: number, rowindx: number) {
        var title = "";
        if (rowindx > 0 && colindex > 0) {
            if (this.bookedDateObj.length > 0) {
                this.bookedDateObj.find(function (item) {
                    if (item.colIndex == colindex && item.rowIndex.indexOf(rowindx) > -1) {
                        title = item.bookedTitle;
                        return true;
                    } else
                        return false;
                })
            } else {
                title = this.datedayArr[colindex] + " " + this.timeObj[rowindx - 1].Value;
            }
        }
        return title;
    }

    getPreviousMonth() {

        var monIndex = Number(this.monthArray.indexOf(this.selMonth));

        var ind = monIndex - 1;
        if (ind == -1) {
            ind = 11;
        }
        var prevMonth = this.monthArray[ind];
        if (this.selMonth == "Jan") {
            this.selYear = Number(this.selYear) - 1;
        }
        this.selMonth = prevMonth;
        this.tdCountArr = this.getColumnArray(2, ind);
        this.getdateandday();
        this.setBookedCells();
    }

    getNextMonth() {
        var monIndex = Number(this.monthArray.indexOf(this.selMonth));
        var calcIndex = (monIndex + 1) % 12;
        var nextMonth = this.monthArray[calcIndex]
        if (this.selMonth == "Dec") {
            this.selYear = Number(this.selYear) + 1;
        }
        this.selMonth = nextMonth;
        this.tdCountArr = this.getColumnArray(2, calcIndex);
        this.getdateandday();
        this.setBookedCells();
    }
    /*reserve*/
    loadReserveComponent() {
        var contextObj = this;
        this.action = "Booking";
        this.btnName = "Reserve";
        this.pageTitle = "Reserve " + contextObj.roomtxt;
        this.SpaceId = this.selRowObj.SpaceId;
        this.FloorId = this.selRowObj.FloorId;
        this.Sitename = this.selRowObj.Site;
        this.SiteId = this.selRowObj.SiteId
        this.Buildingname = this.selRowObj.Building;
        this.Floorname = this.selRowObj.Floor;
        this.RoomNo = this.selRowObj["Room No."];
        this.Seats = parseInt(this.selRowObj["Seating Capacity"]);
        debugger
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(contextObj.selDate);
        var dayName = days[d.getDay()];
        var timeid = this.fromTime.Id;
        var totimeid = this.toTime.Id;
        timeid = timeid - 12;
        totimeid = totimeid - 13;
        var siteTimeZone = "";
        var SpaceTime = "";
        var holidays = [1, 7];
        contextObj.SchedulingService.getTimeZoneNameForSite(contextObj.SiteId).subscribe(function (result) {
            siteTimeZone = result;
            contextObj.SchedulingService.getTimeforspace(contextObj.SpaceId).subscribe(function (resulttime) {
                SpaceTime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
                contextObj.sitedatetimeforreservationrequest = SpaceTime;
                contextObj.SchedulingService.roombookingfields(contextObj.SpaceId).subscribe(function (resultData) {
                    contextObj.Roombookrequest = (resultData["Data"]);
                    contextObj.Roombookrequest[10].IsVisible = false;//contextObj.Sitename + "/" + contextObj.Buildingname + "/" + contextObj.Floorname + "/" + contextObj.RoomNo;
                    contextObj.Roombookrequest[19].LookupDetails.LookupValues = contextObj.Roombookrequest[19].LookupDetails.LookupValues.splice(0, 3);
                    contextObj.Roombookrequest[19].FieldValue = "1";
                    contextObj.Roombookrequest[6].FieldValue = "1";
                    //contextObj.Roombookrequest[6].IsVisible = false;
                    contextObj.Roombookrequest[15].IsEnabled = false;
                    contextObj.Roombookrequest[9].FieldValue = contextObj.RoomNo;
                    contextObj.Roombookrequest[2].FieldValue = contextObj.selDate;
                    //contextObj.Roombookrequest[2].IsEnabled = false;
                    //contextObj.Roombookrequest[3].IsHiddenLabel = true;
                    //contextObj.Roombookrequest[5].IsHiddenLabel = true;
                    contextObj.Roombookrequest[3].LookupDetails.LookupValues.pop();
                    contextObj.Roombookrequest[5].LookupDetails.LookupValues.shift();
                    contextObj.Roombookrequest[3].FieldValue = contextObj.Roombookrequest[3].LookupDetails.LookupValues[timeid].Id.toString();
                    contextObj.Roombookrequest[5].FieldValue = contextObj.Roombookrequest[5].LookupDetails.LookupValues[totimeid].Id.toString();
                    contextObj.Roombookrequest[4].FieldValue = contextObj.selDate;
                    //contextObj.Roombookrequest[2].ReadOnlyMode = true;
                    //contextObj.Roombookrequest[3].IsEnabled = false;
                    //contextObj.Roombookrequest[4].ReadOnlyMode = true;
                    ////contextObj.Roombookrequest[4].IsEnabled = false;
                    //contextObj.Roombookrequest[5].IsEnabled = false;
                    //if (contextObj.sessionUserRoleId > 2)
                    contextObj.Roombookrequest[20].FieldValue = contextObj.sessionUserId.toString();
                    if (contextObj.IsProxyReservationEnabled == false)
                        contextObj.Roombookrequest[20].IsVisible = false;
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
                        if (contextObj.Roombookrequest[i].FieldId == 1824 || contextObj.Roombookrequest[i].FieldId == 1825 || contextObj.Roombookrequest[i].FieldId == 1826)
                            contextObj.Roombookrequest[i].IsVisible = true;
                        if (contextObj.Roombookrequest[i].FieldId == 2306){//recur
                     
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
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        //}
                        //else {
                        //    contextObj.notificationService.ShowToaster("Select a time between 06:00 AM and 07:00 PM", 2)
                        //    } 
                    }
                    else
                        contextObj.notificationService.ShowToaster("Reservation cannot be done on Saturday/Sunday", 2);
                });
            });
        });
    }

    private getSessionUserData(contextObj) {
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
        });
    }

    getInviteesList(event: any) {
        return event["InviteesList"];
    }
    getAmnietyList(event: any) {
        return event["AmnietyList"];
    }
    getServiceList(event: any) {
        return event["ServiceList"];
    }
    OnSuccessfulSubmit(event: any) {
        var contextObj = this;
        if (this.dblClickedCelldata.length > 0) {
            var eventName = event.returnData.EventName;

            //var tdcellId ="td"+ this.dblClickedCelldata[0].row + "_" + this.dblClickedCelldata[0].col;            
            //var elemtd = <HTMLTableDataCellElement>document.getElementById(tdcellId);
            //if (elemtd) {
            //   // elemtd.style.backgroundColor = "#FF8566";
            //    elemtd.className = "bookedCell";
            //}
            //var divcellId = "div" + this.dblClickedCelldata[0].row + "_" + this.dblClickedCelldata[0].col;   
            //var elemdiv = <HTMLTableDataCellElement>document.getElementById(divcellId);
            //if (elemdiv) {
            //    elemdiv.title = eventName;
            //}
            contextObj.setBookedCells();

            contextObj.splitviewInput.showSecondaryView = false;
        }
    }
}