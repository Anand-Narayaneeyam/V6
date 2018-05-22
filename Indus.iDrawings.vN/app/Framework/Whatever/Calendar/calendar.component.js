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
        this.blnIsGenerated = false;
        this.blnBlockPrevClick = false;
        this.blnBlockNextClick = false;
        this.btnClick = new core_1.EventEmitter();
        this.prevMonClick = new core_1.EventEmitter();
        this.nextMonClick = new core_1.EventEmitter();
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
        //contextobj. setcelldate();
        //contextobj.setfirstdate();
        if (contextObj.CalendarObj != undefined) {
            contextObj.setButtonClass(contextObj.CalendarObj);
        }
    };
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        //contextobj. setcelldate();
        //contextobj.setfirstdate();
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
        //  debugger
        var contextObj = this;
        contextObj.firstDay = new Date(contextObj.currentYear, contextObj.currentMonth, 1);
        contextObj.lastDay = new Date(contextObj.currentYear, contextObj.currentMonth + 1, 0);
        var day = contextObj.firstDay.getDay();
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
    };
    CalendarComponent.prototype.setFirstDate = function () {
        // debugger
        var contextObj = this;
        var id;
        var j = 1;
        var loopFrom = contextObj.startDay - 1;
        var loopTo = contextObj.endDay + contextObj.startDay;
        for (var i = 0; i < 42; i++) {
            var elemClass = document.getElementById("btn" + i);
            if (elemClass != undefined) {
                //elemClass.className = "btnHide";
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
                var elem = document.getElementById("sp" + i);
                if (elem != undefined) {
                    var day = j++;
                    elem.innerText = day.toString();
                }
                tdClass.className = "tdEnabled";
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
            strData = elem.innerText;
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
            if (calObj[0].strDate.split(" ")[1] == "Jan") {
                contextObj.SelectedMonth = "JANUARY";
            }
            if (calObj[0].strDate.split(" ")[1] == "Feb") {
                contextObj.SelectedMonth = "FEBRUARY";
            }
            if (calObj[0].strDate.split(" ")[1] == "Mar") {
                contextObj.SelectedMonth = "MARCH";
            }
            if (calObj[0].strDate.split(" ")[1] == "Apr") {
                contextObj.SelectedMonth = "APRIL";
            }
            if (calObj[0].strDate.split(" ")[1] == "May") {
                contextObj.SelectedMonth = "MAY";
            }
            if (calObj[0].strDate.split(" ")[1] == "Jun") {
                contextObj.SelectedMonth = "JUNE";
            }
            if (calObj[0].strDate.split(" ")[1] == "Jul") {
                contextObj.SelectedMonth = "JULY";
            }
            if (calObj[0].strDate.split(" ")[1] == "Aug") {
                contextObj.SelectedMonth = "AUGUST";
            }
            if (calObj[0].strDate.split(" ")[1] == "Sep") {
                contextObj.SelectedMonth = "SEPTEMBER";
            }
            if (calObj[0].strDate.split(" ")[1] == "Oct") {
                contextObj.SelectedMonth = "OCTOBER";
            }
            if (calObj[0].strDate.split(" ")[1] == "Nov") {
                contextObj.SelectedMonth = "NOVEMBER";
            }
            if (calObj[0].strDate.split(" ")[1] == "Dec") {
                contextObj.SelectedMonth = "DECEMBER";
            }
            if (calObj[0].strDate.split(" ")[2] != null) {
                contextObj.SelectedYear = calObj[0].strDate.split(" ")[2].toString();
            }
            for (var j = contextObj.startDay, i = 0; j < contextObj.endDay, i < calObj.length; j++, i++) {
                if (calObj[i].count > 0) {
                    var btn = document.getElementById("btn" + j);
                    if (btn != undefined) {
                        btn.value = calObj[i].count.toString();
                        var elemClass = document.getElementById("btn" + j);
                        if (elemClass != undefined) {
                            if (contextObj.blnIsGenerated == true) {
                                elemClass.className = "btnGenerated";
                            }
                            else {
                                elemClass.className = "btnDue";
                            }
                        }
                    }
                }
                else {
                    var btn = document.getElementById("btn" + j);
                    if (btn != undefined) {
                        btn.value = calObj[i].count.toString();
                        var elemClass = document.getElementById("btn" + j);
                        if (elemClass != undefined) {
                            elemClass.className = "btnHide";
                        }
                    }
                }
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
        __metadata('design:type', Array)
    ], CalendarComponent.prototype, "CalendarObj", void 0);
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
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calenderControl',
            templateUrl: 'app/Framework/Views/Calendar/calendar.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map