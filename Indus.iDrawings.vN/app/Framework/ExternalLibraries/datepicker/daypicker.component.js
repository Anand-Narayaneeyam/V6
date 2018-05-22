"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var activeBtnDateWeekIndex;
//var disabledDates = ["00", "10", "20", "30", "40", "50", "06", "16", "26", "36", "46", "56"];
//  For 508 Compliance Datepicker Index START

var dateButton2DArray = [["00", "01", "02", "03", "04", "05", "06"],
                     ["10", "11", "12", "13", "14", "15", "16"],
                     ["20", "21", "22", "23", "24", "25", "26"],
                     ["30", "31", "32", "33", "34", "35", "36"],
                     ["40", "41", "42", "43", "44", "45", "46"],
                     ["50", "51", "52", "53", "54", "55", "56"],
                     ["60", "61", "62", "63", "64", "65", "66"]];

//  For 508 Compliance Datepicker Index END

var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var ng2_bootstrap_config_1 = require('./ng2-bootstrap-config');
var datepicker_inner_component_1 = require('./datepicker-inner.component');
var ActiveElement = "";
var dateTimeBackArrow = "";
// write an interface for template options
var TEMPLATE_OPTIONS = (_a = {},
    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = {
        DAY_TITLE: "\n        <th *ngFor=\"let labelz of labels;let i=index\" class=\"text-xs-center\"><small aria-label=\"labelz.full\"><b>{{labelz.abbr}}</b></small></th>\n    ",
        WEEK_ROW: "\n        <td *ngIf=\"datePicker.showWeeks\" class=\"text-xs-center h6\"><em>{{ weekNumbers[index] }}</em></td>\n        <td *ngFor=\"let dtz of rowz; let i=index;\" class=\"text-xs-center\" role=\"gridcell\" [id]=\"dtz.uid\">\n          <button #btnDate id=\{{index}}{{i}}\ type=\"button\" style=\"min-width:100%;\" class=\"btn btn-sm {{dtz.customClass}}\"\n [attr.disabled]=\"disableBtn(''+index+i,btnDate)\"   [attr.aria-label]=\"focusAnalyze(''+rows[index][i].date)\"  aria-live=\"false\"          *ngIf=\"!(datePicker.onlyCurrentMonth && dtz.secondary)\"\n                  [ngClass]=\"{'btn-secondary': !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected, disabled: dtz.disabled}\"\n                  [disabled]=\"dtz.disableBtn()\"\n    (keydown)=changeFocus\"($event)\"             (click)=\"datePicker.select(dtz.date)\" tabindex=\"0\">\n            <span [ngClass]=\"{'text-muted': dtz.secondary || dtz.current}\">{{dtz.label}}</span>\n          </button>\n        </td>\n    ",
        ARROW_LEFT: '&lt;',
        ARROW_RIGHT: '&gt;'
    },
    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = {
        DAY_TITLE: "\n        <th *ngFor=\"let labelz of labels;let i=index\" class=\"text-center\"><small aria-label=\"labelz.full\"><b>{{labelz.abbr}}</b></small></th>\n    ",
        WEEK_ROW: "\n        <td *ngIf=\"datePicker.showWeeks\" class=\"text-center h6\">" +
                             "<em>{{ weekNumbers[index] }}</em></td>\n" +
                             "<td *ngFor=\"let dtz of rowz; let i=index;\" class=\"text-center\" role=\"gridcell\" [id]=\"dtz.uid\">\n" +
                             "<button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default btn-sm {{dtz.customClass}}\"\n #btnDate id=\{{index}}{{i}}\ *ngIf=\"!(datePicker.onlyCurrentMonth && dtz.secondary)\"\n [ngClass]=\"{'btn-info': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}\"\n (click)=\"datePicker.select(dtz.date)\" (keydown)=\"changeFocus($event)\" tabindex=\"0\"  [attr.aria-label]=\"focusAnalyze(btnDate.id,''+rows[index][i].date)\" [attr.disabled]=\"disableBtn(''+index+i,btnDate)\" aria-live=\"false\">\n" +
                             "<span [ngClass]=\"{'text-muted': dtz.secondary, 'text-info': dtz.current}\">{{dtz.label}}</span>\n          </button>\n        </td>\n    ",
        ARROW_LEFT: "\n    <img src=\"./Content/Images/chevron-pointing-to-the-left.png\" height=\"10\" width=\"10\" autofocus>\n    ",
        ARROW_RIGHT: "\n   <div> <img src=\"./Content/Images/move-to-next.png\" height=\"10\" width=\"10\"> \n </div>  \n   "
    },
    _a
);




var CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme || ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3];
var DayPickerComponent = (function () {
    function DayPickerComponent(datePicker) {
        this.labels = [];
        this.rows = [];
        this.weekNumbers = [];
        this.datePicker = datePicker;
        this.disabledDatesArray = [];
    }
    /*private getDaysInMonth(year:number, month:number) {
     return ((month === 1) && (year % 4 === 0) &&
     ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
     }*/
    DayPickerComponent.prototype.ngOnInit = function () {

        //508 Compliance to Disable Saturday,Sunday (Holidays) for GAO. START
        console.log("this.disableDates",this.disableDates);
        this.disableDates = (this.disableDates === undefined
            ? [] : this.disableDates);
        // disabledDatesArray.length = 0;

        for (var i = 0; i < this.disableDates.length; i++) {
            this.disabledDatesArray.push(this.disableDates[i]);
        }

        if (this.disableDates.length == 0) {
            this.disabledDatesArray = [];
        }

        //508 Compliance to Disable Saturday,Sunday (Holidays) for GAO. END

        var self = this;
        this.datePicker.stepDay = { months: 1 };
        this.datePicker.setRefreshViewHandler(function () {
            var year = this.activeDate.getFullYear();
            var month = this.activeDate.getMonth();
            var firstDayOfMonth = new Date(year, month, 1);
            var difference = this.startingDay - firstDayOfMonth.getDay();
            var numDisplayedFromPreviousMonth = (difference > 0)
                ? 7 - difference
                : -difference;
            var firstDate = new Date(firstDayOfMonth.getTime());
            if (numDisplayedFromPreviousMonth > 0) {
                firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
            }
            // 42 is the number of days on a six-week calendar
            var _days = self.getDates(firstDate, 42);
            var days = [];
            for (var i = 0; i < 42; i++) {
                var _dateObject = this.createDateObject(_days[i], this.formatDay);
                _dateObject.secondary = _days[i].getMonth() !== month;
                _dateObject.uid = this.uniqueId + '-' + i;
                days[i] = _dateObject;
            }
            self.labels = [];
            for (var j = 0; j < 7; j++) {
                self.labels[j] = {};
                self.labels[j].abbr = this.dateFilter(days[j].date, this.formatDayHeader);
                self.labels[j].full = this.dateFilter(days[j].date, 'EEEE');
            }
            self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
            self.rows = this.split(days, 7);
            if (this.showWeeks) {
                self.weekNumbers = [];
                var thursdayIndex = (4 + 7 - this.startingDay) % 7;
                var numWeeks = self.rows.length;
                for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
                    self.weekNumbers.push(self.getISO8601WeekNumber(self.rows[curWeek][thursdayIndex].date));
                }
            }
        }, 'day');
        this.datePicker.setCompareHandler(function (date1, date2) {
            var d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
            var d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
            return d1.getTime() - d2.getTime();
        }, 'day');
        this.datePicker.refreshView();
    };


    DayPickerComponent.prototype.getDates = function (startDate, n) {
        var dates = new Array(n);
        var current = new Date(startDate.getTime());
        var i = 0;
        var date;
        while (i < n) {
            date = new Date(current.getTime());
            date = this.datePicker.fixTimeZone(date);
            dates[i++] = date;
            current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
        }
        return dates;
    };
    DayPickerComponent.prototype.getISO8601WeekNumber = function (date) {
        var checkDate = new Date(date.getTime());
        // Thursday
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        var time = checkDate.getTime();
        // Compare with Jan 1
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    };

    DayPickerComponent.prototype.disableBtn = function (id, className) {
        var dateAriaLabel = $(className).attr("aria-label");
        if (dateAriaLabel != undefined) {

            dateAriaLabel = dateAriaLabel.trim();
            dateAriaLabel = dateAriaLabel.split(" ");
            var stringArray = new Array();
            for (var i = 0; i < dateAriaLabel.length; i++) {
                stringArray.push(dateAriaLabel[i]);
                if (i != dateAriaLabel.length - 1) {
                    stringArray.push(" ");
                }
            }

            //console.log(stringArray[stringArray.length - 1])
            if (this.disabledDatesArray.includes(stringArray[stringArray.length - 1])) {

                return true;
                //console.log(stringArray[stringArray.length - 1]);

            }
            else {

                return null;
            }

        }

    };

    DayPickerComponent.prototype.focusAnalyze = function (id, fulldate) {

        var returnDate = "";
        var length = 16;
        var dateTrimmed = fulldate.substring(0, length);
        var dateSplitted = dateTrimmed.split(" ");

        var temp = dateSplitted[0];
        dateSplitted[0] = dateSplitted[2];
        dateSplitted[2] = temp;

        var temp2 = dateSplitted[2];
        dateSplitted[2] = dateSplitted[3];
        dateSplitted[3] = temp2;


        switch (dateSplitted[1]) {
            case "Aug":
                dateSplitted[1] = "August";
                break;
            case "Sep":
                dateSplitted[1] = "September";
                break;
            case "Oct":
                dateSplitted[1] = "October";
                break;
            case "Nov":
                dateSplitted[1] = "November";
                break;
            case "Dec":
                dateSplitted[1] = "December";
                break;
            case "Jan":
                dateSplitted[1] = "January";
                break;
            case "Feb":
                dateSplitted[1] = "February";
                break;
            case "Mar":
                dateSplitted[1] = "March";
                break;
            case "Apr":
                dateSplitted[1] = "April";
                break;
            case "May":
                dateSplitted[1] = "May";
                break;
            case "Jun":
                dateSplitted[1] = "June";
                break;
            case "Jul":
                dateSplitted[1] = "July";
                break;
            default:
                dateSplitted[1];
        }

        switch (dateSplitted[3]) {
            case "Sun":
                dateSplitted[3] = "Sunday";
                break;
            case "Mon":
                dateSplitted[3] = "Monday";
                break;
            case "Tue":
                dateSplitted[3] = "Tuesday";
                break;
            case "Wed":
                dateSplitted[3] = "Wednesday";
                break;
            case "Thu":
                dateSplitted[3] = "Thursday";
                break;
            case "Fri":
                dateSplitted[3] = "Friday";
                break;
            case "Sat":
                dateSplitted[3] = "Saturday";
                break;
            default:
                dateSplitted[3];
        }

        for (var i = 0; i < dateSplitted.length; i++) {
            returnDate = returnDate + " " + dateSplitted[i];
        }
        return returnDate;

    };

    DayPickerComponent.prototype.TotalButtons = function () {

        var activeElemBtnLen = document.activeElement.parentElement.parentElement.parentElement.querySelectorAll("tr td button").length;
        return activeElemBtnLen;

    }

    DayPickerComponent.prototype.focusUpOrDown = function (upBtnId) {

        var totalBtnLen = document.activeElement.parentElement.parentElement.parentElement.querySelectorAll("tr td button").length;
        if (totalBtnLen > 0) {

            for (var i = 0; i < totalBtnLen; i++) {
                if (document.activeElement.parentElement.parentElement.parentElement.querySelectorAll("tr td button")[i].id == upBtnId) {

                    (document.activeElement.parentElement.parentElement.parentElement.querySelectorAll("tr td button")[i]).focus();

                }
            }
        }
    }


    DayPickerComponent.prototype.focusRightOrLeft = function (rightOrLeftBtnId) {

        var totalBtnLen = document.activeElement.parentElement.parentElement.parentElement.querySelectorAll("tr td button").length;
        if (totalBtnLen > 0) {

            for (var i = 0; i < totalBtnLen; i++) {
                if (document.activeElement.parentElement.parentElement.parentElement.querySelectorAll("tr td button")[i].id == rightOrLeftBtnId) {
                    (document.activeElement.parentElement.parentElement.parentElement.querySelectorAll("tr td button")[i]).focus();

                }
            }
        }
    }


    DayPickerComponent.prototype.changeFocus = function (e) {

        if (e.keyCode == 9) {



            var activeElement = $(document.activeElement).closest("tbody td")[0];
            var x = $(document.activeElement).closest("tbody")[0];
            var LastDayOfCalendarId = x.children[5].children[6].id;
            var dateTimeBack = $(document.activeElement).closest("table")[0].children[0].children[0].children[0].children[0];

            if (activeElement.id == LastDayOfCalendarId) {
                var getDateTimeDiv = $(document.activeElement).closest("#dateTimeContainerDiv");
                var getDateDiv = $(document.activeElement).closest("#dateContainerDiv")
                if (getDateTimeDiv && getDateTimeDiv.length > 0) {
                    dateTimeBack = $(document.activeElement).closest("#dateTimeContainerDiv")[0].querySelectorAll("datepicker table")[0].children[0].children[0].children[0].children[0];
                    var timePicker = document.activeElement.closest("#dateTimeContainerDiv").getElementsByTagName("timepicker")[0];
                    if (timePicker) {

                        var timePickerFocus = timePicker.getElementsByTagName("a")[0];
                        timePickerFocus.focus();

                    }
                }
                else {

                    if (getDateDiv && getDateDiv.length > 0) {
                        var getFocusElement = $(document.activeElement).closest("#dateContainerDiv")[0].querySelectorAll("datepicker table")[0].children[0].children[0].children[0].children[0];
                        if (getFocusElement) {
                            getFocusElement.focus();

                        }
                    }
                }

            }
        }
        else if (e.keyCode == 39) //Right
        {


            //var id = e.currentTarget.id;

            //var nextElem = e.currentTarget.parentElement.nextElementSibling.firstElementChild;

            //nextElem.focus();

            var currentTargetId = e.currentTarget.id;
            var currentTargetIdFirstIndex = currentTargetId.substr(0, 1, currentTargetId);
            var currentTargetIdSecondIndex = currentTargetId.substr(1, 2, currentTargetId);

            currentTargetIdFirstIndex = parseInt(currentTargetIdFirstIndex);
            currentTargetIdSecondIndex = parseInt(currentTargetIdSecondIndex);
            var rightBtn;

            switch (currentTargetIdSecondIndex) {

                case 1:
                    rightBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex + 1);
                    break;
                case 2:
                    rightBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex + 1);
                    break;
                case 3:
                    rightBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex + 1);
                    break;
                case 4:
                    rightBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex + 1);
                    break;
                case 5:
                    rightBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex + 1);
                    break;
                case 6:
                    rightBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex - 6);
                    break;
                case 0:
                    rightBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex + 1);
                    break;

            }

            this.focusRightOrLeft(rightBtn);


        }
        else if (e.keyCode == 37) // Left
        {
            //debugger
            //var preElem = e.currentTarget.parentElement.previousElementSibling.firstElementChild;
            //preElem.focus();
            var currentTargetId = e.currentTarget.id;
            var currentTargetIdFirstIndex = currentTargetId.substr(0, 1, currentTargetId);
            var currentTargetIdSecondIndex = currentTargetId.substr(1, 2, currentTargetId);

            currentTargetIdFirstIndex = parseInt(currentTargetIdFirstIndex);
            currentTargetIdSecondIndex = parseInt(currentTargetIdSecondIndex);
            var leftBtn;


            switch (currentTargetIdSecondIndex) {

                case 1:
                    leftBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex - 1);
                    break;
                case 2:
                    leftBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex - 1);
                    break;
                case 3:
                    leftBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex - 1);
                    break;
                case 4:
                    leftBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex - 1);
                    break;
                case 5:
                    leftBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex - 1);
                    break;
                case 6:
                    leftBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex - 1);
                    break;
                case 0:
                    leftBtn = currentTargetIdFirstIndex + "" + (currentTargetIdSecondIndex + 6);
                    break;

            }


            this.focusRightOrLeft(leftBtn);

        }

        else if (e.keyCode == 38)  //Up
        {

            var currentTargetId = e.currentTarget.id;
            var currentTargetIdFirstIndex = currentTargetId.substr(0, 1, currentTargetId);
            var currentTargetIdSecondIndex = currentTargetId.substr(1, 2, currentTargetId);

            currentTargetIdFirstIndex = parseInt(currentTargetIdFirstIndex);
            currentTargetIdSecondIndex = parseInt(currentTargetIdSecondIndex);
            var upBtn;

            switch (currentTargetIdFirstIndex) {

                case 1:
                    upBtn = currentTargetIdFirstIndex - 1 + "" + currentTargetIdSecondIndex;
                    break;
                case 2:
                    upBtn = currentTargetIdFirstIndex - 1 + "" + currentTargetIdSecondIndex;
                    break;
                case 3:
                    upBtn = currentTargetIdFirstIndex - 1 + "" + currentTargetIdSecondIndex;
                    break;
                case 4:
                    upBtn = currentTargetIdFirstIndex - 1 + "" + currentTargetIdSecondIndex;
                    break;
                case 5:
                    upBtn = currentTargetIdFirstIndex - 1 + "" + currentTargetIdSecondIndex;
                    break;
                case 0:
                    upBtn = currentTargetIdFirstIndex + 5 + "" + currentTargetIdSecondIndex;
                    break;

            }

            this.focusUpOrDown(upBtn);

        }
        else if (e.keyCode == 40)  //Down
        {
            var currentTargetId = e.currentTarget.id;
            var currentTargetIdFirstIndex = currentTargetId.substr(0, 1, currentTargetId);
            var currentTargetIdSecondIndex = currentTargetId.substr(1, 2, currentTargetId);

            currentTargetIdFirstIndex = parseInt(currentTargetIdFirstIndex);
            currentTargetIdSecondIndex = parseInt(currentTargetIdSecondIndex);
            var downBtn;

            switch (currentTargetIdFirstIndex) {

                case 1:
                    downBtn = (currentTargetIdFirstIndex + 1) + "" + currentTargetIdSecondIndex;
                    break;
                case 2:
                    downBtn = (currentTargetIdFirstIndex + 1) + "" + currentTargetIdSecondIndex;
                    break;
                case 3:
                    downBtn = (currentTargetIdFirstIndex + 1) + "" + currentTargetIdSecondIndex;
                    break;
                case 4:
                    downBtn = (currentTargetIdFirstIndex + 1) + "" + currentTargetIdSecondIndex;
                    break;
                case 5:
                    downBtn = (currentTargetIdFirstIndex - 5) + "" + currentTargetIdSecondIndex;
                    break;
                case 0:
                    downBtn = (currentTargetIdFirstIndex + 1) + "" + currentTargetIdSecondIndex;
                    break;
            }

            this.focusUpOrDown(downBtn);

        }
    };

    __decorate([
        core_1.Input(),
        __metadata('design:type', Array)
    ], DayPickerComponent.prototype, "disableDates", void 0);
    DayPickerComponent = __decorate([
        core_1.Component({
            selector: 'daypicker',
            template: "\n<table *ngIf=\"datePicker.datepickerMode==='day'\" role=\"grid\" aria-labelledby=\"uniqueId+'-title'\" aria-activedescendant=\"activeDateId\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\"  role=\"button\" aria-label=\"Previous Month\" class=\"btn btn-default btn-secondary btn-sm pull-left\" autofocus (click)=\"datePicker.move(-1)\" tabindex=\"0\">\n        " + CURRENT_THEME_TEMPLATE.ARROW_LEFT + "\n        </button>\n      </th>\n      <th [attr.colspan]=\"5 + datePicker.showWeeks\">\n        <button [id]=\"datePicker.uniqueId + '-title'\"\n                type=\"button\" class=\"btn btn-default btn-secondary btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === datePicker.maxMode\"\n                [ngClass]=\"{disabled: datePicker.datepickerMode === datePicker.maxMode}\" tabindex=\"0\" style=\"width:100%;\">\n          <strong role=\"button\" [attr.aria-label]=\"''+title\">{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-secondary btn-sm pull-right\" role=\"button\" aria-label=\"Next Month\" (click)=\"datePicker.move(1)\" tabindex=\"0\">\n        " + CURRENT_THEME_TEMPLATE.ARROW_RIGHT + "\n        </button>\n      </th>\n    </tr>\n    <tr>\n      <th *ngIf=\"datePicker.showWeeks\"></th>\n      " + CURRENT_THEME_TEMPLATE.DAY_TITLE + "\n    </tr>\n  </thead>\n  <tbody>\n    <template ngFor [ngForOf]=\"rows\" let-rowz=\"$implicit\" let-index=\"index\">\n      <tr *ngIf=\"!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)\">\n        " + CURRENT_THEME_TEMPLATE.WEEK_ROW + "\n      </tr>\n    </template>\n  </tbody>\n</table>\n  ",
            directives: [forms_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgClass]
        }),

        __metadata('design:paramtypes', [datepicker_inner_component_1.DatePickerInnerComponent])
    ], DayPickerComponent);
    return DayPickerComponent;
}());
exports.DayPickerComponent = DayPickerComponent;
var _a;
