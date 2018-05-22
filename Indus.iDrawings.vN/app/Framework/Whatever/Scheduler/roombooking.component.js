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
var split_view_component_1 = require('../../Whatever/Split-View/split-view.component');
var reserveroom_reservationrequest_component_1 = require('../../../Whatever/Scheduling/Room Booking/reserveroom-reservationrequest.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var RoomBookingComponent = (function () {
    //@Output() divClick = new EventEmitter();
    function RoomBookingComponent(SchedulingService, AdministrationService, notificationService) {
        this.SchedulingService = SchedulingService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.startDay = -1;
        this.timeObj = [{ "Id": 12, "Value": "6:00am" }, { "Id": 13, "Value": "6:30am" },
            { "Id": 14, "Value": "7:00am" }, { "Id": 15, "Value": "7:30am" }, { "Id": 16, "Value": "8:00am" },
            { "Id": 17, "Value": "8:30am" }, { "Id": 18, "Value": "9:00am" }, { "Id": 19, "Value": "9:30am" },
            { "Id": 20, "Value": "10:00am" },
            { "Id": 21, "Value": "10:30am" }, { "Id": 22, "Value": "11:00am" }, { "Id": 23, "Value": "11:30am" },
            { "Id": 24, "Value": "12:00pm" }, { "Id": 25, "Value": "12:30pm" }, { "Id": 26, "Value": "1:00pm" },
            { "Id": 27, "Value": "1:30pm" },
            { "Id": 28, "Value": "2:00pm" }, { "Id": 29, "Value": "2:30pm" }, { "Id": 30, "Value": "3:00pm" },
            { "Id": 31, "Value": "3:30pm" }, { "Id": 32, "Value": "4:00pm" },
            { "Id": 33, "Value": "4:30pm" }, { "Id": 34, "Value": "5:00pm" }, { "Id": 35, "Value": "5:30pm" },
            { "Id": 36, "Value": "6:00pm" }, { "Id": 37, "Value": "6:30pm" },
            { "Id": 38, "Value": "7:00pm" }
        ];
        this.datedayArr = [];
        this.selMonth = "";
        this.selYear = 0;
        this.todayDate = new Date();
        this.colTodayDateIndex = 1;
        this.isDblClick = true;
        this.dblClickedCelldata = [];
        this.pageTitle = "";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.action = "";
        this.btnName = "";
        this.Seats = 0;
        this.sessionUserRoleId = 0;
        this.sessionUserId = 0;
        this.bookedDateObj = [];
        this.roomtxt = "Team Room";
        this.IsProxyReservationEnabled = false;
    }
    RoomBookingComponent.prototype.ngAfterViewInit = function () {
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
    };
    RoomBookingComponent.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.SchedulingService.checkSubscribedFeature('275').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtxt = result["Data"][0].Value;
            }
        });
    };
    RoomBookingComponent.prototype.scrollfun = function () {
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
    };
    RoomBookingComponent.prototype.setBookedCells = function () {
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
                        else
                            return false;
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
                        }
                        else
                            return false;
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
    };
    RoomBookingComponent.prototype.getFormattedDate = function (dt) {
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
    RoomBookingComponent.prototype.getColumnArray = function (target, monthIndex) {
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
    };
    RoomBookingComponent.prototype.getDaysInMonth = function (year, month) {
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
    };
    RoomBookingComponent.prototype.getdateandday = function () {
        var dateDay = "";
        this.datedayArr = [];
        for (var index = 0; index < this.tdCountArr.length; index++) {
            var dayIndex = -1;
            if (index == 0) {
                dateDay = "";
            }
            else if (index == 1) {
                dayIndex = this.startDay;
            }
            else {
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
    };
    RoomBookingComponent.prototype.getClassNameTable1 = function (row, col) {
        var classname = "notFirstTd";
        if (col == this.colTodayDateIndex && this.checkSelectedDateYear()) {
            classname = classname + " todayHighlight";
        }
        return classname;
    };
    RoomBookingComponent.prototype.getClassName = function (row, col) {
        //if (col != 0) {
        //    var tdcellId = "td" + row + "_" + col;
        //    var elemtd = <HTMLTableDataCellElement>document.getElementById(tdcellId);
        //}
        var classname = "";
        if (col != 0) {
            classname = "notFirstTd";
        }
        else {
            classname = "FirstTd";
        }
        if (row > 0 && col > 0) {
            if (this.bookedDateObj.length > 0) {
                this.bookedDateObj.find(function (item) {
                    if (item.colIndex == col && item.rowIndex.indexOf(row) > -1) {
                        classname = classname + " bookedCell";
                        return true;
                    }
                    else
                        return false;
                });
            }
            if (col == this.colTodayDateIndex && this.checkSelectedDateYear()) {
                classname = classname + " todayHighlight";
            }
            if (this.datedayArr[col].includes("Sun") == true) {
                classname = classname + " divSunday";
            }
            else if (this.datedayArr[col].includes("Sat") == true) {
                classname = classname + " divSunday";
            }
        }
        return classname;
    };
    RoomBookingComponent.prototype.checkSelectedDateYear = function () {
        if (this.monthArray.indexOf(this.selMonth) == this.todayDate.getMonth() && this.selYear == this.todayDate.getFullYear())
            return true;
        else
            return false;
    };
    RoomBookingComponent.prototype.divBlockClick = function (e, colindex, rowindx) {
        var tdcellId = "td" + rowindx + "_" + colindex;
        var elemtd = document.getElementById(tdcellId);
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
        }
    };
    RoomBookingComponent.prototype.getTitle = function (colindex, rowindx) {
        var title = "";
        if (rowindx > 0 && colindex > 0) {
            if (this.bookedDateObj.length > 0) {
                this.bookedDateObj.find(function (item) {
                    if (item.colIndex == colindex && item.rowIndex.indexOf(rowindx) > -1) {
                        title = item.bookedTitle;
                        return true;
                    }
                    else
                        return false;
                });
            }
            else {
                title = this.datedayArr[colindex] + " " + this.timeObj[rowindx - 1].Value;
            }
        }
        return title;
    };
    RoomBookingComponent.prototype.getPreviousMonth = function () {
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
    };
    RoomBookingComponent.prototype.getNextMonth = function () {
        var monIndex = Number(this.monthArray.indexOf(this.selMonth));
        var calcIndex = (monIndex + 1) % 12;
        var nextMonth = this.monthArray[calcIndex];
        if (this.selMonth == "Dec") {
            this.selYear = Number(this.selYear) + 1;
        }
        this.selMonth = nextMonth;
        this.tdCountArr = this.getColumnArray(2, calcIndex);
        this.getdateandday();
        this.setBookedCells();
    };
    /*reserve*/
    RoomBookingComponent.prototype.loadReserveComponent = function () {
        var contextObj = this;
        this.action = "Booking";
        this.btnName = "Reserve";
        this.pageTitle = "Reserve " + contextObj.roomtxt;
        this.SpaceId = this.selRowObj.SpaceId;
        this.FloorId = this.selRowObj.FloorId;
        this.Sitename = this.selRowObj.Site;
        this.SiteId = this.selRowObj.SiteId;
        this.Buildingname = this.selRowObj.Building;
        this.Floorname = this.selRowObj.Floor;
        this.RoomNo = this.selRowObj["Room No."];
        this.Seats = parseInt(this.selRowObj["Seating Capacity"]);
        debugger;
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
                    contextObj.Roombookrequest[10].IsVisible = false; //contextObj.Sitename + "/" + contextObj.Buildingname + "/" + contextObj.Floorname + "/" + contextObj.RoomNo;
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
                            contextObj.Roombookrequest[i].LookupDetails.LookupValues = contextObj.Roombookrequest[i].LookupDetails.LookupValues.filter(function (el) { return holidays.indexOf(el.Id) == -1; });
                        if (contextObj.Roombookrequest[i].FieldId == 1824 || contextObj.Roombookrequest[i].FieldId == 1825 || contextObj.Roombookrequest[i].FieldId == 1826)
                            contextObj.Roombookrequest[i].IsVisible = true;
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
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    }
                    else
                        contextObj.notificationService.ShowToaster("Reservation cannot be done on Saturday/Sunday", 2);
                });
            });
        });
    };
    RoomBookingComponent.prototype.getSessionUserData = function (contextObj) {
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
    };
    RoomBookingComponent.prototype.getInviteesList = function (event) {
        return event["InviteesList"];
    };
    RoomBookingComponent.prototype.getAmnietyList = function (event) {
        return event["AmnietyList"];
    };
    RoomBookingComponent.prototype.getServiceList = function (event) {
        return event["ServiceList"];
    };
    RoomBookingComponent.prototype.OnSuccessfulSubmit = function (event) {
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
    };
    RoomBookingComponent = __decorate([
        core_1.Component({
            selector: 'room-booking',
            directives: [split_view_component_1.SplitViewComponent, reserveroom_reservationrequest_component_1.ReservationRequestforroom],
            providers: [scheduling_service_1.SchedulingService, administration_service_1.AdministrationService, notify_service_1.NotificationService],
            templateUrl: 'app/Framework/Views/Scheduler/roomBooking.component.html',
            inputs: ["selRowObj", "target"]
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], RoomBookingComponent);
    return RoomBookingComponent;
}());
exports.RoomBookingComponent = RoomBookingComponent;
//# sourceMappingURL=roombooking.component.js.map