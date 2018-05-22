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
var CalendarComponent = (function () {
    function CalendarComponent() {
        this.blnShowDiv = false;
        this.date = new Date();
        this.weekday0 = "";
        this.weekday1 = "";
        this.weekday2 = "";
        this.weekday3 = "";
        this.weekday4 = "";
        this.weekday5 = "";
        this.weekday6 = "";
        this.blnIsGenerated = false;
        this.blnBlockPrevClick = false;
        this.blnBlockNextClick = false;
        this.CalendarObj = "";
        this.WorkingDays = [];
        this.btnClick = new core_1.EventEmitter();
        this.prevMonClick = new core_1.EventEmitter();
        this.nextMonClick = new core_1.EventEmitter();
        this.ExceptionDays = [];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.SelectedYear = contextObj.date.getFullYear().toString();
        contextObj.currentYear = contextObj.date.getFullYear();
        contextObj.currentMonth = contextObj.date.getMonth();
        contextObj.getMonthValue(1);
        contextObj.setCellDate();
        contextObj.setFirstDate();
    };
    CalendarComponent.prototype.ngAfterViewChecked = function () {
        var contextObj = this;
        contextObj.setCellDate();
        contextObj.setFirstDate();
        if (contextObj.CalendarObj != undefined) {
            contextObj.setButtonClass(contextObj.CalendarObj);
        }
    };
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        contextObj.setCellDate();
        contextObj.setFirstDate();
        if (contextObj.CalendarObj != undefined) {
            contextObj.setButtonClass(contextObj.CalendarObj);
        }
    };
    CalendarComponent.prototype.createTableRows = function () {
        var items = [];
        for (var i = 0; i < 6; i++) {
            items.push("r" + i);
        }
        return items;
    };
    CalendarComponent.prototype.createTableCell = function () {
        var items = [];
        for (var i = 0; i < 7; i++) {
            items.push("c" + i);
        }
        return items;
    };
    CalendarComponent.prototype.setCellDate = function () {
        //debugger
        var contextObj = this;
        switch (contextObj.StartWeekDay) {
            case 0:
                contextObj.weekday0 = "Sun";
                contextObj.weekday1 = "Mon";
                contextObj.weekday2 = "Tue";
                contextObj.weekday3 = "Wed";
                contextObj.weekday4 = "Thu";
                contextObj.weekday5 = "Fri";
                contextObj.weekday6 = "Sat";
                break;
            case 1:
                contextObj.weekday6 = "Sun";
                contextObj.weekday0 = "Mon";
                contextObj.weekday1 = "Tue";
                contextObj.weekday2 = "Wed";
                contextObj.weekday3 = "Thu";
                contextObj.weekday4 = "Fri";
                contextObj.weekday5 = "Sat";
                break;
            case 2:
                contextObj.weekday5 = "Sun";
                contextObj.weekday6 = "Mon";
                contextObj.weekday0 = "Tue";
                contextObj.weekday1 = "Wed";
                contextObj.weekday2 = "Thu";
                contextObj.weekday3 = "Fri";
                contextObj.weekday4 = "Sat";
                break;
            case 3:
                contextObj.weekday4 = "Sun";
                contextObj.weekday5 = "Mon";
                contextObj.weekday6 = "Tue";
                contextObj.weekday0 = "Wed";
                contextObj.weekday1 = "Thu";
                contextObj.weekday2 = "Fri";
                contextObj.weekday3 = "Sat";
                break;
            case 4:
                contextObj.weekday3 = "Sun";
                contextObj.weekday4 = "Mon";
                contextObj.weekday5 = "Tue";
                contextObj.weekday6 = "Wed";
                contextObj.weekday0 = "Thu";
                contextObj.weekday1 = "Fri";
                contextObj.weekday2 = "Sat";
                break;
            case 5:
                contextObj.weekday2 = "Sun";
                contextObj.weekday3 = "Mon";
                contextObj.weekday4 = "Tue";
                contextObj.weekday5 = "Wed";
                contextObj.weekday6 = "Thu";
                contextObj.weekday0 = "Fri";
                contextObj.weekday1 = "Sat";
                break;
            case 6:
                contextObj.weekday1 = "Sun";
                contextObj.weekday2 = "Mon";
                contextObj.weekday3 = "Tue";
                contextObj.weekday4 = "Wed";
                contextObj.weekday5 = "Thu";
                contextObj.weekday6 = "Fri";
                contextObj.weekday0 = "Sat";
                break;
        }
        contextObj.firstDay = new Date(contextObj.currentYear, contextObj.currentMonth, 1);
        contextObj.lastDay = new Date(contextObj.currentYear, contextObj.currentMonth + 1, 0);
        var day = contextObj.firstDay.getDay();
        switch (contextObj.StartWeekDay) {
            case 0:
                contextObj.endDay = parseInt(contextObj.lastDay.getDate().toString());
                switch (day) {
                    case 0:
                        contextObj.startDay = 0;
                        break;
                    case 1:
                        contextObj.startDay = 1;
                        break;
                    case 2:
                        contextObj.startDay = 2;
                        break;
                    case 3:
                        contextObj.startDay = 3;
                        break;
                    case 4:
                        contextObj.startDay = 4;
                        break;
                    case 5:
                        contextObj.startDay = 5;
                        break;
                    case 6:
                        contextObj.startDay = 6;
                        break;
                    default:
                        contextObj.startDay = 0;
                        break;
                }
                break;
            case 1:
                contextObj.endDay = parseInt(contextObj.lastDay.getDate().toString());
                switch (day) {
                    case 0:
                        contextObj.startDay = 6;
                        break;
                    case 1:
                        contextObj.startDay = 0;
                        break;
                    case 2:
                        contextObj.startDay = 1;
                        break;
                    case 3:
                        contextObj.startDay = 2;
                        break;
                    case 4:
                        contextObj.startDay = 3;
                        break;
                    case 5:
                        contextObj.startDay = 4;
                        break;
                    case 6:
                        contextObj.startDay = 5;
                        break;
                    default:
                        contextObj.startDay = 6;
                        break;
                }
                break;
            case 2:
                contextObj.endDay = parseInt(contextObj.lastDay.getDate().toString());
                switch (day) {
                    case 0:
                        contextObj.startDay = 5;
                        break;
                    case 1:
                        contextObj.startDay = 6;
                        break;
                    case 2:
                        contextObj.startDay = 0;
                        break;
                    case 3:
                        contextObj.startDay = 1;
                        break;
                    case 4:
                        contextObj.startDay = 2;
                        break;
                    case 5:
                        contextObj.startDay = 3;
                        break;
                    case 6:
                        contextObj.startDay = 4;
                        break;
                    default:
                        contextObj.startDay = 5;
                        break;
                }
                break;
            case 3:
                contextObj.endDay = parseInt(contextObj.lastDay.getDate().toString());
                switch (day) {
                    case 0:
                        contextObj.startDay = 4;
                        break;
                    case 1:
                        contextObj.startDay = 5;
                        break;
                    case 2:
                        contextObj.startDay = 6;
                        break;
                    case 3:
                        contextObj.startDay = 0;
                        break;
                    case 4:
                        contextObj.startDay = 1;
                        break;
                    case 5:
                        contextObj.startDay = 2;
                        break;
                    case 6:
                        contextObj.startDay = 3;
                        break;
                    default:
                        contextObj.startDay = 4;
                        break;
                }
                break;
            case 4:
                contextObj.endDay = parseInt(contextObj.lastDay.getDate().toString());
                switch (day) {
                    case 0:
                        contextObj.startDay = 3;
                        break;
                    case 1:
                        contextObj.startDay = 4;
                        break;
                    case 2:
                        contextObj.startDay = 5;
                        break;
                    case 3:
                        contextObj.startDay = 6;
                        break;
                    case 4:
                        contextObj.startDay = 0;
                        break;
                    case 5:
                        contextObj.startDay = 1;
                        break;
                    case 6:
                        contextObj.startDay = 2;
                        break;
                    default:
                        contextObj.startDay = 3;
                        break;
                }
                break;
            case 5:
                contextObj.endDay = parseInt(contextObj.lastDay.getDate().toString());
                switch (day) {
                    case 0:
                        contextObj.startDay = 2;
                        break;
                    case 1:
                        contextObj.startDay = 3;
                        break;
                    case 2:
                        contextObj.startDay = 4;
                        break;
                    case 3:
                        contextObj.startDay = 5;
                        break;
                    case 4:
                        contextObj.startDay = 6;
                        break;
                    case 5:
                        contextObj.startDay = 0;
                        break;
                    case 6:
                        contextObj.startDay = 1;
                        break;
                    default:
                        contextObj.startDay = 2;
                        break;
                }
                break;
            case 6:
                contextObj.endDay = parseInt(contextObj.lastDay.getDate().toString());
                switch (day) {
                    case 0:
                        contextObj.startDay = 1;
                        break;
                    case 1:
                        contextObj.startDay = 2;
                        break;
                    case 2:
                        contextObj.startDay = 3;
                        break;
                    case 3:
                        contextObj.startDay = 4;
                        break;
                    case 4:
                        contextObj.startDay = 5;
                        break;
                    case 5:
                        contextObj.startDay = 6;
                        break;
                    case 6:
                        contextObj.startDay = 0;
                        break;
                    default:
                        contextObj.startDay = 1;
                        break;
                }
                break;
        }
    };
    CalendarComponent.prototype.setFirstDate = function () {
        //debugger
        var contextObj = this;
        var id;
        var j = 1;
        var loopFrom = contextObj.startDay - 1;
        var loopTo = contextObj.endDay + contextObj.startDay;
        for (var i = 0; i < 42; i++) {
            var elemClass1 = document.getElementById("btn" + i);
            if (elemClass1 != undefined) {
                elemClass1.value = "";
            }
        }
        for (var i = 0; i < 42; i++) {
            var elemClass = document.getElementById("btn" + i);
            if (elemClass != undefined) {
                elemClass.className = "btnHide";
            }
            var tdClass = document.getElementById("td" + i);
            if (tdClass != undefined) {
                tdClass.className = "tdDisabled";
            }
            var elem = document.getElementById("sp" + i);
            if (elem != undefined) {
                elem.innerText = "";
                elemClass.className = "btnHide";
            }
            if (i > loopFrom && i < loopTo) {
                //var elem = <HTMLSpanElement>document.getElementById("sp" + i);
                //if (elem != undefined) {
                //    var day = j++;
                //    //elem.innerText = day.toString();                  
                //}
                var day = j++;
                var elemClass = document.getElementById("btn" + i);
                if (elemClass != undefined) {
                    //var day = j++;
                    elemClass.value = day.toString();
                }
                if (tdClass != undefined)
                    tdClass.className = "tdEnabled";
            }
        }
        for (var j = contextObj.startDay; j < (contextObj.endDay + contextObj.startDay); j++) {
            var btn = document.getElementById("btn" + j);
            if (btn != undefined) {
                //btn.value = j.toString();
                var elemClass = document.getElementById("btn" + j);
                if (elemClass != undefined) {
                    //if (j % 3 == 0) {
                    //    elemClass.className = "btnWorkingDay";
                    //}
                    //else {
                    elemClass.className = "btnNonworkingDay";
                }
            }
        }
        //debugger
        switch (contextObj.StartWeekDay) {
            case 0:
                for (var cnt = 0; cnt < contextObj.WorkingDays.length; cnt++) {
                    switch (contextObj.WorkingDays[cnt]) {
                        case 0:
                            var weekarray = [0, 7, 14, 21, 28, 35];
                            break;
                        case 1:
                            var weekarray = [1, 8, 15, 22, 29, 36];
                            break;
                        case 2:
                            var weekarray = [2, 9, 16, 23, 30, 37];
                            break;
                        case 3:
                            var weekarray = [3, 10, 17, 24, 31, 38];
                            break;
                        case 4:
                            var weekarray = [4, 11, 18, 25, 32, 39];
                            break;
                        case 5:
                            var weekarray = [5, 12, 19, 26, 33, 40];
                            break;
                        case 6:
                            var weekarray = [6, 13, 20, 27, 34, 41];
                            break;
                    }
                    for (var cnt1 = 0; cnt1 < weekarray.length; cnt1++) {
                        j = weekarray[cnt1];
                        var btn = document.getElementById("btn" + j);
                        if (btn != undefined) {
                            if (btn.className == "btnNonworkingDay") {
                                btn.className = "btnWorkingDay";
                            }
                        }
                    }
                }
                break;
            case 1:
                for (var cnt = 0; cnt < contextObj.WorkingDays.length; cnt++) {
                    switch (contextObj.WorkingDays[cnt]) {
                        case 1:
                            var weekarray = [0, 7, 14, 21, 28, 35];
                            break;
                        case 2:
                            var weekarray = [1, 8, 15, 22, 29, 36];
                            break;
                        case 3:
                            var weekarray = [2, 9, 16, 23, 30, 37];
                            break;
                        case 4:
                            var weekarray = [3, 10, 17, 24, 31, 38];
                            break;
                        case 5:
                            var weekarray = [4, 11, 18, 25, 32, 39];
                            break;
                        case 6:
                            var weekarray = [5, 12, 19, 26, 33, 40];
                            break;
                        case 0:
                            var weekarray = [6, 13, 20, 27, 34, 41];
                            break;
                    }
                    for (var cnt1 = 0; cnt1 < weekarray.length; cnt1++) {
                        j = weekarray[cnt1];
                        var btn = document.getElementById("btn" + j);
                        if (btn != undefined) {
                            if (btn.className == "btnNonworkingDay") {
                                btn.className = "btnWorkingDay";
                            }
                        }
                    }
                }
                break;
            case 2:
                for (var cnt = 0; cnt < contextObj.WorkingDays.length; cnt++) {
                    switch (contextObj.WorkingDays[cnt]) {
                        case 2:
                            var weekarray = [0, 7, 14, 21, 28, 35];
                            break;
                        case 3:
                            var weekarray = [1, 8, 15, 22, 29, 36];
                            break;
                        case 4:
                            var weekarray = [2, 9, 16, 23, 30, 37];
                            break;
                        case 5:
                            var weekarray = [3, 10, 17, 24, 31, 38];
                            break;
                        case 6:
                            var weekarray = [4, 11, 18, 25, 32, 39];
                            break;
                        case 0:
                            var weekarray = [5, 12, 19, 26, 33, 40];
                            break;
                        case 1:
                            var weekarray = [6, 13, 20, 27, 34, 41];
                            break;
                    }
                    for (var cnt1 = 0; cnt1 < weekarray.length; cnt1++) {
                        j = weekarray[cnt1];
                        var btn = document.getElementById("btn" + j);
                        if (btn != undefined) {
                            if (btn.className == "btnNonworkingDay") {
                                btn.className = "btnWorkingDay";
                            }
                        }
                    }
                }
                break;
            case 3:
                for (var cnt = 0; cnt < contextObj.WorkingDays.length; cnt++) {
                    switch (contextObj.WorkingDays[cnt]) {
                        case 3:
                            var weekarray = [0, 7, 14, 21, 28, 35];
                            break;
                        case 4:
                            var weekarray = [1, 8, 15, 22, 29, 36];
                            break;
                        case 5:
                            var weekarray = [2, 9, 16, 23, 30, 37];
                            break;
                        case 6:
                            var weekarray = [3, 10, 17, 24, 31, 38];
                            break;
                        case 0:
                            var weekarray = [4, 11, 18, 25, 32, 39];
                            break;
                        case 1:
                            var weekarray = [5, 12, 19, 26, 33, 40];
                            break;
                        case 2:
                            var weekarray = [6, 13, 20, 27, 34, 41];
                            break;
                    }
                    for (var cnt1 = 0; cnt1 < weekarray.length; cnt1++) {
                        j = weekarray[cnt1];
                        var btn = document.getElementById("btn" + j);
                        if (btn != undefined) {
                            if (btn.className == "btnNonworkingDay") {
                                btn.className = "btnWorkingDay";
                            }
                        }
                    }
                }
                break;
            case 4:
                for (var cnt = 0; cnt < contextObj.WorkingDays.length; cnt++) {
                    switch (contextObj.WorkingDays[cnt]) {
                        case 4:
                            var weekarray = [0, 7, 14, 21, 28, 35];
                            break;
                        case 5:
                            var weekarray = [1, 8, 15, 22, 29, 36];
                            break;
                        case 6:
                            var weekarray = [2, 9, 16, 23, 30, 37];
                            break;
                        case 0:
                            var weekarray = [3, 10, 17, 24, 31, 38];
                            break;
                        case 1:
                            var weekarray = [4, 11, 18, 25, 32, 39];
                            break;
                        case 2:
                            var weekarray = [5, 12, 19, 26, 33, 40];
                            break;
                        case 3:
                            var weekarray = [6, 13, 20, 27, 34, 41];
                            break;
                    }
                    for (var cnt1 = 0; cnt1 < weekarray.length; cnt1++) {
                        j = weekarray[cnt1];
                        var btn = document.getElementById("btn" + j);
                        if (btn != undefined) {
                            if (btn.className == "btnNonworkingDay") {
                                btn.className = "btnWorkingDay";
                            }
                        }
                    }
                }
                break;
            case 5:
                for (var cnt = 0; cnt < contextObj.WorkingDays.length; cnt++) {
                    switch (contextObj.WorkingDays[cnt]) {
                        case 5:
                            var weekarray = [0, 7, 14, 21, 28, 35];
                            break;
                        case 6:
                            var weekarray = [1, 8, 15, 22, 29, 36];
                            break;
                        case 0:
                            var weekarray = [2, 9, 16, 23, 30, 37];
                            break;
                        case 1:
                            var weekarray = [3, 10, 17, 24, 31, 38];
                            break;
                        case 2:
                            var weekarray = [4, 11, 18, 25, 32, 39];
                            break;
                        case 3:
                            var weekarray = [5, 12, 19, 26, 33, 40];
                            break;
                        case 4:
                            var weekarray = [6, 13, 20, 27, 34, 41];
                            break;
                    }
                    for (var cnt1 = 0; cnt1 < weekarray.length; cnt1++) {
                        j = weekarray[cnt1];
                        var btn = document.getElementById("btn" + j);
                        if (btn != undefined) {
                            if (btn.className == "btnNonworkingDay") {
                                btn.className = "btnWorkingDay";
                            }
                        }
                    }
                }
                break;
            case 6:
                for (var cnt = 0; cnt < contextObj.WorkingDays.length; cnt++) {
                    switch (contextObj.WorkingDays[cnt]) {
                        case 6:
                            var weekarray = [0, 7, 14, 21, 28, 35];
                            break;
                        case 0:
                            var weekarray = [1, 8, 15, 22, 29, 36];
                            break;
                        case 1:
                            var weekarray = [2, 9, 16, 23, 30, 37];
                            break;
                        case 2:
                            var weekarray = [3, 10, 17, 24, 31, 38];
                            break;
                        case 3:
                            var weekarray = [4, 11, 18, 25, 32, 39];
                            break;
                        case 4:
                            var weekarray = [5, 12, 19, 26, 33, 40];
                            break;
                        case 5:
                            var weekarray = [6, 13, 20, 27, 34, 41];
                            break;
                    }
                    for (var cnt1 = 0; cnt1 < weekarray.length; cnt1++) {
                        j = weekarray[cnt1];
                        var btn = document.getElementById("btn" + j);
                        if (btn != undefined) {
                            if (btn.className == "btnNonworkingDay") {
                                btn.className = "btnWorkingDay";
                            }
                        }
                    }
                }
                break;
        }
        for (var cnt = 0; cnt < this.ExceptionDays.length; cnt++) {
            var execDate = this.ExceptionDays[cnt]["ExceptionDate"];
            var day = new Date(execDate).getDate();
            for (var i = 0; i < 42; i++) {
                var btn = document.getElementById("btn" + i);
                if (btn != undefined) {
                    if (btn.value == day.toString()) {
                        btn.className = "btnExceptionDay";
                    }
                }
            }
        }
        if (contextObj.SelectedYear == contextObj.date.getFullYear().toString()) {
            var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
            if (contextObj.SelectedMonth == month[contextObj.date.getMonth()]) {
                var today = contextObj.date.getDate();
                for (var i = 0; i < 42; i++) {
                    var btn = document.getElementById("btn" + i);
                    if (btn != undefined) {
                        if (btn.value == today.toString()) {
                            if (btn.className == "btnNonworkingDay")
                                btn.className = "btnNonworkingToDay";
                            else if (btn.className == "btnWorkingDay")
                                btn.className = "btnWorkingToDay";
                            else if (btn.className == "btnExceptionDay")
                                btn.className = "btnExceptionToDay";
                        }
                    }
                }
            }
        }
    };
    CalendarComponent.prototype.getPreviousMonth = function (event) {
        var contextObj = this;
        contextObj.getMonthValue(2);
        contextObj.setCellDate();
        contextObj.setFirstDate();
        var month = this.setMonthNameOnEmit(contextObj.SelectedMonth);
        var dateValue = "01" + " " + month + " " + contextObj.SelectedYear;
        contextObj.prevMonClick.emit({
            selectedDate: dateValue
        });
    };
    CalendarComponent.prototype.getNextMonth = function (event) {
        var contextObj = this;
        contextObj.getMonthValue(3);
        contextObj.setCellDate();
        contextObj.setFirstDate();
        var month = this.setMonthNameOnEmit(contextObj.SelectedMonth);
        var dateValue = "01" + " " + month + " " + contextObj.SelectedYear;
        contextObj.nextMonClick.emit({
            selectedDate: dateValue
        });
    };
    CalendarComponent.prototype.setMonthNameOnEmit = function (strMonth) {
        switch (strMonth) {
            case "JANUARY":
                strMonth = "Jan";
                break;
            case "FEBRUARY":
                strMonth = "Feb";
                break;
            case "MARCH":
                strMonth = "Mar";
                break;
            case "APRIL":
                strMonth = "Apr";
                break;
            case "MAY":
                strMonth = "May";
                break;
            case "JUNE":
                strMonth = "Jun";
                break;
            case "JULY":
                strMonth = "Jul";
                break;
            case "AUGUST":
                strMonth = "Aug";
                break;
            case "SEPTEMBER":
                strMonth = "Sep";
                break;
            case "OCTOBER":
                strMonth = "Oct";
                break;
            case "NOVEMBER":
                strMonth = "Nov";
                break;
            case "DECEMBER":
                strMonth = "Dec";
                break;
        }
        return strMonth;
    };
    CalendarComponent.prototype.getMonthValue = function (target) {
        /*
           target = 1 : current getMonth
           target = 2 : previous getMonth
           target = 3 : next getMonth
         */
        // debugger
        var contextObj = this;
        var date = new Date();
        var monthNamesArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var monthName = "";
        switch (target) {
            case 1:
                monthName = monthNamesArray[contextObj.currentMonth];
                break;
            case 2:
                contextObj.currentMonth--;
                if (contextObj.currentMonth == -1) {
                    contextObj.currentMonth = 11;
                    var dd = new Date(contextObj.currentYear, contextObj.currentMonth, contextObj.date.getDate());
                    contextObj.SelectedYear = (dd.getFullYear() - 1).toString();
                    contextObj.currentYear = dd.getFullYear() - 1;
                }
                if (contextObj.currentMonth.toString().includes("-")) {
                    contextObj.currentMonth = contextObj.currentMonth * -1;
                }
                monthName = monthNamesArray[contextObj.currentMonth];
                break;
            case 3:
                contextObj.currentMonth++;
                if (contextObj.currentMonth == 12) {
                    contextObj.currentMonth = 0;
                    var dd = new Date(contextObj.currentYear, contextObj.currentMonth, contextObj.date.getDate());
                    contextObj.SelectedYear = (dd.getFullYear() + 1).toString();
                    contextObj.currentYear = dd.getFullYear() + 1;
                }
                monthName = monthNamesArray[contextObj.currentMonth];
                break;
        }
        switch (monthName) {
            case "Jan":
                contextObj.SelectedMonth = "JANUARY";
                break;
            case "Feb":
                contextObj.SelectedMonth = "FEBRUARY";
                break;
            case "Mar":
                contextObj.SelectedMonth = "MARCH";
                break;
            case "Apr":
                contextObj.SelectedMonth = "APRIL";
                break;
            case "May":
                contextObj.SelectedMonth = "MAY";
                break;
            case "Jun":
                contextObj.SelectedMonth = "JUNE";
                break;
            case "Jul":
                contextObj.SelectedMonth = "JULY";
                break;
            case "Aug":
                contextObj.SelectedMonth = "AUGUST";
                break;
            case "Sep":
                contextObj.SelectedMonth = "SEPTEMBER";
                break;
            case "Oct":
                contextObj.SelectedMonth = "OCTOBER";
                break;
            case "Nov":
                contextObj.SelectedMonth = "NOVEMBER";
                break;
            case "Dec":
                contextObj.SelectedMonth = "DECEMBER";
                break;
        }
    };
    CalendarComponent.prototype.getBtnClick = function (event, id) {
        var elem = document.getElementById(id);
        var strData = "";
        if (elem) {
            strData = elem.value;
        }
        if (strData.length < 2) {
            strData = "0" + strData;
        }
        var contextObj = this;
        var monthId = contextObj.currentMonth;
        var yearValue = contextObj.currentYear;
        var monthNamesArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var monthName = monthNamesArray[monthId];
        var dateValue = strData + " " + monthName + " " + yearValue;
        contextObj.btnClick.emit({
            selectedDate: dateValue
        });
        console.log(dateValue);
    };
    CalendarComponent.prototype.setButtonClass = function (calObj) {
        var contextObj = this;
        if (calObj != undefined) {
            if (calObj.split(" ")[1] == "Jan") {
                contextObj.SelectedMonth = "JANUARY";
            }
            if (calObj.split(" ")[1] == "Feb") {
                contextObj.SelectedMonth = "FEBRUARY";
            }
            if (calObj.split(" ")[1] == "Mar") {
                contextObj.SelectedMonth = "MARCH";
            }
            if (calObj.split(" ")[1] == "Apr") {
                contextObj.SelectedMonth = "APRIL";
            }
            if (calObj.split(" ")[1] == "May") {
                contextObj.SelectedMonth = "MAY";
            }
            if (calObj.split(" ")[1] == "Jun") {
                contextObj.SelectedMonth = "JUNE";
            }
            if (calObj.split(" ")[1] == "Jul") {
                contextObj.SelectedMonth = "JULY";
            }
            if (calObj.split(" ")[1] == "Aug") {
                contextObj.SelectedMonth = "AUGUST";
            }
            if (calObj.split(" ")[1] == "Sep") {
                contextObj.SelectedMonth = "SEPTEMBER";
            }
            if (calObj.split(" ")[1] == "Oct") {
                contextObj.SelectedMonth = "OCTOBER";
            }
            if (calObj.split(" ")[1] == "Nov") {
                contextObj.SelectedMonth = "NOVEMBER";
            }
            if (calObj.split(" ")[1] == "Dec") {
                contextObj.SelectedMonth = "DECEMBER";
            }
            if (calObj.split(" ")[2] != null) {
                contextObj.SelectedYear = calObj.split(" ")[2].toString();
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "blnIsGenerated", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarComponent.prototype, "SelectedDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "blnBlockPrevClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "blnBlockNextClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "CalendarObj", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "WorkingDays", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalendarComponent.prototype, "StartWeekDay", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "btnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "prevMonClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "nextMonClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "ExceptionDays", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'dynaCalenderControl',
            templateUrl: 'app/Views/Administration/Calendar/dynaCalendar.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=dynaCalendar.component.js.map