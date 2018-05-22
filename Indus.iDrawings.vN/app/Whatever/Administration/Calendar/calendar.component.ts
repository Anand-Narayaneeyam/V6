//import { Component, Input, Output, OnInit, AfterViewInit, EventEmitter} from '@angular/core';
import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, SimpleChange, OnChanges, AfterViewInit } from '@angular/core';
import { CalendarService } from '../../../models/administration/calendar.services';
@Component({
    selector: 'calendar',
    templateUrl: 'app/Views/Administration/Calendar/calendar.component.html',
    directives: [],
    providers: [CalendarService]
})

export class CalendarComponent implements OnInit {
    private monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    private dayArray: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    startDayOfCalendar: string = "Mon";
    dayArrayIndexForStart: number = 5;
    private dayArrayForDate = [0,1, 2, 3, 4, 5, 6];
    private startDay = -1;
    private trCountArr;
    private tdCountArr;
    private todayDate = new Date();
    private colTodayDateIndex = 1;
    private datedayArr = [];
    private selMonth = "";
    private selYear = 0;
    Dateforcalender: string;
    currentMonthsFirstDay: string = "";
    currentMonthNum: number = 0;
    dayIndex = 0;
    currMonthDays = 0;
    dayArrayValues: any[] = [];
    constructor(private calendarService: CalendarService) {

    }
    ngOnInit() {
        var contextObj = this;
        //this.trCountArr = new Array(t);
        this.tdCountArr = this.getColumnArray(1, -1);
        this.getdateandday();
        this.colTodayDateIndex = this.todayDate.getDate();
        var todaydate = contextObj.getFormattedDate(new Date());
        this.Dateforcalender = todaydate;
        this.currentMonthNum = this.getMonthNumber(this.selMonth);
        this.currentMonthsFirstDay = this.getmonthsFirstday(this.selYear, this.currentMonthNum);
        this.dayArrayIndexForStart = this.dayArray.findIndex(function (el) { return el == contextObj.startDayOfCalendar });
        this.setDayArrayValues(this.currMonthDays, this.currentMonthsFirstDay, this.startDayOfCalendar);
    }
    getmonthsFirstday(year, month) {
        debugger
        return new Date(year, month, 1).toString().substring(0, 3);
    }
    getMonthNumber(month) {
        return this.monthArray.findIndex(function (el) { return el == month });
    }
    pushDayNameToDayArray() {
        var day = [];
        for (var i = 0; i <this.dayArray.length; i++){
            day.push(this.getDayName(i));
        }
        return day;
    }
    setDayArrayValues(noOfDaysInMonth, startDay, startDayOfCal) {
        debugger
        var num = 1;
        var day = [];
        this.dayArrayValues.push(this.pushDayNameToDayArray());
        for (var i = 1; i <= 36; i++) {
            if (i <= 7) {
                if (this.currentMonthsFirstDay == this.dayArrayValues[0][i-1]) {
                    day.push(num.toString());
                    num++;
                } else if (num != 1) {
                    day.push(num.toString());
                    num++;
                } else {
                    day.push("");
                }
            } else if (i > 7 && i <= 28) {
                if (i == 8 || i == 15 || i == 22) {
                    this.dayArrayValues.push(day);
                    day = [];
                }
                day.push(num.toString());
                num++;
            } else {
                if (noOfDaysInMonth >= num) {
                    if (i == 29) {
                        this.dayArrayValues.push(day);
                        day = [];
                    }
                    day.push(num.toString());
                    num++;
                } else {
                    if (i == 36) {
                        this.dayArrayValues.push(day);
                        day = [];
                    }
                    day.push("");
                }
        }
        }

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
        //tdcolNum = new Array(currMonthDays + 1);
        this.currMonthDays = currMonthDays;
        for (var i = 1; i <= currMonthDays; i++)
            tdcolNum.push(i.toString());
        return tdcolNum;
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
            dateDay = index + "-" + this.dayArray[dayIndex];

            this.datedayArr.push(dateDay);

        }
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
    getDayNumber(selMonth, selYear, rowIndex, colIndex, dayName) {
      //  if (this.dayIndex != this.currMonthDays) {
            var text = "";
            if (rowIndex == 0) {
                text= this.getDayName(colIndex);
            } else if (rowIndex == 1) {
                if (this.currentMonthsFirstDay == this.getDayName(colIndex)) {
                    this.dayIndex++;
                    text= this.tdCountArr[this.dayIndex - 1];
                } else if (this.dayIndex != 0) {
                    this.dayIndex++;
                    text= this.tdCountArr[this.dayIndex - 1];
                }
            } else {
                if (this.currMonthDays != this.dayIndex) {
                    this.dayIndex++;
                    text= this.tdCountArr[this.dayIndex - 1];
                }
            }
            return text;
       // }
        
    }

    getDayName(colIndex) {
        var index;
        var dayName: string = "";
        var dayArrLen = this.dayArray.length;
        if (colIndex != 0) {
            if (this.dayArrayIndexForStart + colIndex > dayArrLen  - 1) {
                var indexNo = this.dayArrayIndexForStart + colIndex - (dayArrLen - 1);
                index = indexNo - 1;
            }
            else
                index = this.dayArrayIndexForStart + colIndex;
        } else {
            index = this.dayArrayIndexForStart;
        }
        dayName = this.dayArray[index];
        return dayName;
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
    }
}