var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Component, Input, Output, OnInit, AfterViewInit, EventEmitter} from '@angular/core';
var core_1 = require('@angular/core');
var calendar_services_1 = require('../../../models/administration/calendar.services');
var CalendarComponent = (function () {
    function CalendarComponent(calendarService) {
        this.calendarService = calendarService;
        this.monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.startDayOfCalendar = "Mon";
        this.dayArrayIndexForStart = 5;
        this.dayArrayForDate = [0, 1, 2, 3, 4, 5, 6];
        this.startDay = -1;
        this.todayDate = new Date();
        this.colTodayDateIndex = 1;
        this.datedayArr = [];
        this.selMonth = "";
        this.selYear = 0;
        this.currentMonthsFirstDay = "";
        this.currentMonthNum = 0;
        this.dayIndex = 0;
        this.currMonthDays = 0;
        this.dayArrayValues = [];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        //this.trCountArr = new Array(t);
        this.tdCountArr = this.getColumnArray(1, -1);
        this.getdateandday();
        this.colTodayDateIndex = this.todayDate.getDate();
        var todaydate = contextObj.getFormattedDate(new Date());
        this.Dateforcalender = todaydate;
        this.currentMonthNum = this.getMonthNumber(this.selMonth);
        this.currentMonthsFirstDay = this.getmonthsFirstday(this.selYear, this.currentMonthNum);
        this.dayArrayIndexForStart = this.dayArray.findIndex(function (el) { return el == contextObj.startDayOfCalendar; });
        this.setDayArrayValues(this.currMonthDays, this.currentMonthsFirstDay, this.startDayOfCalendar);
    };
    CalendarComponent.prototype.getmonthsFirstday = function (year, month) {
        debugger;
        return new Date(year, month, 1).toString().substring(0, 3);
    };
    CalendarComponent.prototype.getMonthNumber = function (month) {
        return this.monthArray.findIndex(function (el) { return el == month; });
    };
    CalendarComponent.prototype.pushDayNameToDayArray = function () {
        var day = [];
        for (var i = 0; i < this.dayArray.length; i++) {
            day.push(this.getDayName(i));
        }
        return day;
    };
    CalendarComponent.prototype.setDayArrayValues = function (noOfDaysInMonth, startDay, startDayOfCal) {
        debugger;
        var num = 1;
        var day = [];
        this.dayArrayValues.push(this.pushDayNameToDayArray());
        for (var i = 1; i <= 36; i++) {
            if (i <= 7) {
                if (this.currentMonthsFirstDay == this.dayArrayValues[0][i - 1]) {
                    day.push(num.toString());
                    num++;
                }
                else if (num != 1) {
                    day.push(num.toString());
                    num++;
                }
                else {
                    day.push("");
                }
            }
            else if (i > 7 && i <= 28) {
                if (i == 8 || i == 15 || i == 22) {
                    this.dayArrayValues.push(day);
                    day = [];
                }
                day.push(num.toString());
                num++;
            }
            else {
                if (noOfDaysInMonth >= num) {
                    if (i == 29) {
                        this.dayArrayValues.push(day);
                        day = [];
                    }
                    day.push(num.toString());
                    num++;
                }
                else {
                    if (i == 36) {
                        this.dayArrayValues.push(day);
                        day = [];
                    }
                    day.push("");
                }
            }
        }
    };
    CalendarComponent.prototype.getColumnArray = function (target, monthIndex) {
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
        //tdcolNum = new Array(currMonthDays + 1);
        this.currMonthDays = currMonthDays;
        for (var i = 1; i <= currMonthDays; i++)
            tdcolNum.push(i.toString());
        return tdcolNum;
    };
    CalendarComponent.prototype.getdateandday = function () {
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
            dateDay = index + "-" + this.dayArray[dayIndex];
            this.datedayArr.push(dateDay);
        }
    };
    CalendarComponent.prototype.getFormattedDate = function (dt) {
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
    CalendarComponent.prototype.getDaysInMonth = function (year, month) {
        var retdate = 0;
        var monthIndex = month + 1;
        var isLeap = ((!(year % 4)) && ((year % 100) || (!(year % 400))));
        switch (monthIndex) {
            case 2:
                retdate = (isLeap) ? 29 : 28;
                break;
            case 8:
            case 12:
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
    CalendarComponent.prototype.getDayNumber = function (selMonth, selYear, rowIndex, colIndex, dayName) {
        //  if (this.dayIndex != this.currMonthDays) {
        var text = "";
        if (rowIndex == 0) {
            text = this.getDayName(colIndex);
        }
        else if (rowIndex == 1) {
            if (this.currentMonthsFirstDay == this.getDayName(colIndex)) {
                this.dayIndex++;
                text = this.tdCountArr[this.dayIndex - 1];
            }
            else if (this.dayIndex != 0) {
                this.dayIndex++;
                text = this.tdCountArr[this.dayIndex - 1];
            }
        }
        else {
            if (this.currMonthDays != this.dayIndex) {
                this.dayIndex++;
                text = this.tdCountArr[this.dayIndex - 1];
            }
        }
        return text;
        // }
    };
    CalendarComponent.prototype.getDayName = function (colIndex) {
        var index;
        var dayName = "";
        var dayArrLen = this.dayArray.length;
        if (colIndex != 0) {
            if (this.dayArrayIndexForStart + colIndex > dayArrLen - 1) {
                var indexNo = this.dayArrayIndexForStart + colIndex - (dayArrLen - 1);
                index = indexNo - 1;
            }
            else
                index = this.dayArrayIndexForStart + colIndex;
        }
        else {
            index = this.dayArrayIndexForStart;
        }
        dayName = this.dayArray[index];
        return dayName;
    };
    CalendarComponent.prototype.getPreviousMonth = function () {
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
    };
    CalendarComponent.prototype.getNextMonth = function () {
        var monIndex = Number(this.monthArray.indexOf(this.selMonth));
        var calcIndex = (monIndex + 1) % 12;
        var nextMonth = this.monthArray[calcIndex];
        if (this.selMonth == "Dec") {
            this.selYear = Number(this.selYear) + 1;
        }
        this.selMonth = nextMonth;
        this.tdCountArr = this.getColumnArray(2, calcIndex);
        this.getdateandday();
    };
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calendar',
            templateUrl: 'app/Views/Administration/Calendar/calendar.component.html',
            directives: [],
            providers: [calendar_services_1.CalendarService]
        }), 
        __metadata('design:paramtypes', [calendar_services_1.CalendarService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map