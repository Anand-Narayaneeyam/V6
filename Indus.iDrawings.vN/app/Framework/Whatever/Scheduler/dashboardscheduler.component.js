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
var DashboardSchedulerComponent = (function () {
    function DashboardSchedulerComponent(el) {
        this.el = el;
        this.blnIsBooked = false;
        this.IsAddpageopened = false;
        this.cellClick = new core_1.EventEmitter();
    }
    DashboardSchedulerComponent.prototype.ngOnInit = function () {
        var contextObj = this;
    };
    DashboardSchedulerComponent.prototype.ngAfterViewChecked = function () {
        var contextObj = this;
        if (contextObj.IsAddpageopened == false) {
            if (contextObj.rowcount != undefined) {
                contextObj.setCellClass();
            }
            if (contextObj.bookedDateObj != undefined) {
                contextObj.setSeledtedOnLoad(contextObj.bookedDateObj);
            }
        }
    };
    DashboardSchedulerComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (this.SelectedDate != undefined) {
            this.setCellClass();
        }
        if (contextObj.bookedDateObj != undefined) {
            contextObj.setSeledtedOnLoad(contextObj.bookedDateObj);
        }
        contextObj.setelementsforfocus();
    };
    DashboardSchedulerComponent.prototype.setelementsforfocus = function () {
        var contextObj = this;
        var rowlength, columnlength;
        rowlength = contextObj.rowcount;
        columnlength = this.tableRowCount * 2;
        var elem;
        for (var k = 0; k < rowlength; k++) {
            for (var j = 0; j < columnlength; j++) {
                elem = document.getElementById("r" + k + "c" + j);
                if (elem != undefined) {
                    if (elem.className == "tdDisabled") {
                        if (elem.title.search('Disabled Field') < 0)
                            elem.title = elem.title + " Disabled Field";
                        $("#" + elem.id.toString()).attr("disabled", "disabled");
                        elem.tabIndex = "-1";
                    }
                    else {
                        elem.title.replace('Disabled Field', '');
                    }
                }
            }
        }
    };
    DashboardSchedulerComponent.prototype.setCellClass = function () {
        var datetime = new Date(this.Todaydate);
        var currentDate = datetime.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var currentMonVal = datetime.getMonth();
        var currentMon = monthNames[datetime.getMonth()];
        var currentYear = datetime.getFullYear();
        var hour = datetime.getHours();
        var mins = datetime.getMinutes();
        var datetimepick = new Date(this.SelectedDate);
        var Pickday = datetimepick.getDay();
        var dateInput = new Date(this.SelectedDate);
        var selectedDate = dateInput.getDate();
        var selectedMonVal = dateInput.getMonth();
        var selectedMon = monthNames[dateInput.getMonth()];
        var selectedYear = dateInput.getFullYear();
        var disableCount;
        if (currentYear > selectedYear) {
            this.disableTd();
        }
        else {
            if (currentYear < selectedYear) {
                this.enableTd();
            }
            else {
                if (currentMonVal > selectedMonVal) {
                    this.disableTd();
                }
                else if (currentMonVal < selectedMonVal) {
                    this.enableTd();
                }
                else {
                    if (currentDate > selectedDate) {
                        this.disableTd();
                    }
                    else if (currentDate < selectedDate) {
                        this.enableTd();
                    }
                    else {
                        if (currentDate == selectedDate) {
                            if (mins > 30) {
                                disableCount = hour * 2;
                                disableCount = disableCount + 1;
                            }
                            else {
                                disableCount = hour * 2;
                            }
                            for (var i = 0; i < this.rowcount; i++) {
                                for (var j = 0; j < this.tableRowCount * 2; j++) {
                                    if (j <= disableCount) {
                                        var elem = document.getElementById("r" + i + "c" + j);
                                        if (elem != undefined) {
                                            elem.className = "tdDisabled";
                                            //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                            $("#" + elem.id.toString()).prop("disabled", true);
                                            elem.style.backgroundColor = "lightgray";
                                        }
                                    }
                                    else {
                                        var elem = document.getElementById("r" + i + "c" + j);
                                        if (elem != undefined) {
                                            if (Pickday != 0 && Pickday != 6) {
                                                if (j > 11 && j < 38) {
                                                    elem.className = "tdEnabled";
                                                    //$("#" + elem.id.toString()).attr("enabled", "true");
                                                    $("#" + elem.id.toString()).prop("disabled", false);
                                                    elem.style.backgroundColor = "white";
                                                }
                                                else {
                                                    elem.className = "tdDisabled"; // as per GAO requirement time before 6:00 am and 7:00pm blocked
                                                    //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                                    $("#" + elem.id.toString()).prop("disabled", true);
                                                    elem.style.backgroundColor = "lightgray";
                                                }
                                            }
                                            else {
                                                elem.className = "tdDisabled"; // as per GAO requirement time slots of Saturday and Sunday blocked
                                                //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                                $("#" + elem.id.toString()).prop("disabled", true);
                                                elem.style.backgroundColor = "lightgray";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    DashboardSchedulerComponent.prototype.enableTd = function () {
        var datetimepick = new Date(this.SelectedDate);
        var pickDate = datetimepick.getDate();
        var Pickday = datetimepick.getDay();
        //for (var i = 0; i < this.rowcount; i++) {
        for (var j = 0; j < this.tableRowCount * 2; j++) {
            var elem = document.getElementById("r" + 0 + "c" + j);
            if (Pickday != 0 && Pickday != 6) {
                if (elem != undefined) {
                    if (j > 11 && j < 38) {
                        elem.className = "tdEnabled";
                        //$("#" + elem.id.toString()).attr("enabled", "true");
                        $("#" + elem.id.toString()).prop("disabled", false);
                        elem.style.backgroundColor = "white";
                    }
                    else {
                        elem.className = "tdDisabled"; // as per GAO requirement time before 6:00 am and 7:00pm blocked
                        //$("#" + elem.id.toString()).attr("disabled", "disabled");
                        $("#" + elem.id.toString()).prop("disabled", true);
                        elem.style.backgroundColor = "lightgray";
                    }
                }
            }
            else {
                elem.className = "tdDisabled"; // as per GAO requirement time slots of Saturday and Sunday blocked
                //$("#" + elem.id.toString()).attr("disabled", "disabled");
                $("#" + elem.id.toString()).prop("disabled", true);
                elem.style.backgroundColor = "lightgray";
            }
        }
    };
    DashboardSchedulerComponent.prototype.disableTd = function () {
        for (var i = 0; i < this.rowcount; i++) {
            for (var j = 0; j < this.tableRowCount * 2; j++) {
                var elem = document.getElementById("r" + i + "c" + j);
                if (elem != undefined) {
                    elem.className = "tdDisabled";
                    //$("#" + elem.id.toString()).attr("disabled", "disabled");
                    $("#" + elem.id.toString()).prop("disabled", true);
                    elem.style.backgroundColor = "lightgray";
                }
            }
        }
    };
    DashboardSchedulerComponent.prototype.createTableHeader = function (cellcount) {
        var items = [];
        var x;
        this.tableRowCount = cellcount;
        for (var i = 0; i < cellcount; i++) {
            if (i > 9) {
                if (i > 11) {
                    if (i > 12 && i < 22) {
                        x = i - 12;
                        items.push("0" + x + ":00 PM");
                        items.push("0" + x + ":30 PM");
                    }
                    else {
                        if (i != 12)
                            x = i - 12;
                        else
                            x = i;
                        items.push(x + ":00 PM");
                        items.push(x + ":30 PM");
                    }
                }
                else {
                    items.push(i + ":00 AM");
                    items.push(i + ":30 AM");
                }
            }
            else {
                if (i == 0)
                    x = 12;
                else
                    x = i;
                if (x != 12) {
                    items.push("0" + x + ":00 AM");
                    items.push("0" + x + ":30 AM");
                }
                else {
                    items.push(x + ":00 AM");
                    items.push(x + ":30 AM");
                }
            }
        }
        this.timeArray = items;
        return items;
    };
    DashboardSchedulerComponent.prototype.createTableRows = function (rowcount) {
        var items = [];
        for (var i = 0; i < rowcount; i++) {
            items.push("r" + i);
        }
        return items;
    };
    DashboardSchedulerComponent.prototype.getTitleDyn = function (tag) {
        debugger;
    };
    DashboardSchedulerComponent.prototype.createTableData = function () {
        var items = [];
        for (var i = 0; i < this.tableRowCount * 2; i++) {
            items.push("c" + i);
        }
        return items;
    };
    DashboardSchedulerComponent.prototype.clickByEnterKey = function (val) {
        if (val.keyCode == 13 || val.keyCode == 32) {
            this.onCellClick(val);
        }
    };
    DashboardSchedulerComponent.prototype.onCellClick = function (val) {
        if (document.getElementById(val.target.id).className == "tdDisabled") {
        }
        else if (document.getElementById(val.target.id).style.backgroundColor == "indigo") {
        }
        else {
            var id = val.target.id;
            var t = this.getSelectedTimefromId(id);
            var i = id.split("r");
            var j = i[1].split("c");
            this.cellClick.emit({
                id: val.target.id,
                time: t,
                day: this.day[j[0]]
            });
            var selectedCell = this.el.nativeElement.childNodes;
            if (document.getElementById(val.target.id).innerText == "booked") {
            }
            else {
                document.getElementById(val.target.id).style.backgroundColor = "indigo";
                document.getElementById(val.target.id).style.color = "white";
            }
        }
    };
    DashboardSchedulerComponent.prototype.getStyle = function () {
        if (this.blnIsBooked) {
            return "gray";
        }
        else {
            return "white";
        }
    };
    DashboardSchedulerComponent.prototype.changeCursorStyle = function (event) {
        if (document.getElementById(event.target.id).innerText == "") {
            document.getElementById(event.target.id).style.cursor = "hand";
        }
        else {
            document.getElementById(event.target.id).style.cursor = "pointer";
        }
    };
    DashboardSchedulerComponent.prototype.getSelectedTimefromId = function (id) {
        var splitVal;
        var time;
        if (id != "") {
            splitVal = id.split("c")[1];
            switch (splitVal) {
                case "0":
                    time = "00:00";
                    break;
                case "1":
                    time = "00:30";
                    break;
                case "2":
                    time = "01:00";
                    break;
                case "3":
                    time = "01:30";
                    break;
                case "4":
                    time = "02:00";
                    break;
                case "5":
                    time = "02:30";
                    break;
                case "6":
                    time = "03:00";
                    break;
                case "7":
                    time = "03:30";
                    break;
                case "8":
                    time = "04:00";
                    break;
                case "9":
                    time = "04:30";
                    break;
                case "10":
                    time = "05:00";
                    break;
                case "11":
                    time = "05:30";
                    break;
                case "12":
                    time = "06:00";
                    break;
                case "13":
                    time = "06:30";
                    break;
                case "14":
                    time = "07:00";
                    break;
                case "15":
                    time = "07:30";
                    break;
                case "16":
                    time = "08:00";
                    break;
                case "17":
                    time = "08:30";
                    break;
                case "18":
                    time = "09:00";
                    break;
                case "19":
                    time = "09:30";
                    break;
                case "20":
                    time = "10:00";
                    break;
                case "21":
                    time = "10:30";
                    break;
                case "22":
                    time = "11:00";
                    break;
                case "23":
                    time = "11:30";
                    break;
                case "24":
                    time = "12:00";
                    break;
                case "25":
                    time = "12:30";
                    break;
                case "26":
                    time = "13:00";
                    break;
                case "27":
                    time = "13:30";
                    break;
                case "28":
                    time = "14:00";
                    break;
                case "29":
                    time = "14:30";
                    break;
                case "30":
                    time = "15:00";
                    break;
                case "31":
                    time = "15:30";
                    break;
                case "32":
                    time = "16:00";
                    break;
                case "33":
                    time = "16:30";
                    break;
                case "34":
                    time = "17:00";
                    break;
                case "35":
                    time = "17:30";
                    break;
                case "36":
                    time = "18:00";
                    break;
                case "37":
                    time = "18:30";
                    break;
                case "38":
                    time = "19:00";
                    break;
                case "39":
                    time = "19:30";
                    break;
                case "40":
                    time = "20:00";
                    break;
                case "41":
                    time = "20:30";
                    break;
                case "42":
                    time = "21:00";
                    break;
                case "43":
                    time = "21:30";
                    break;
                case "44":
                    time = "22:00";
                    break;
                case "45":
                    time = "22:30";
                    break;
                case "46":
                    time = "23:00";
                    break;
                case "47":
                    time = "23:30";
                    break;
            }
        }
        return time;
    };
    DashboardSchedulerComponent.prototype.setDisabledonLoad = function () {
        var date = new Date(this.Todaydate);
    };
    DashboardSchedulerComponent.prototype.setSeledtedOnLoad = function (arrObj) {
        var currentDt = new Date(this.Todaydate);
        var currentDate = currentDt.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var currentMonVal = currentDt.getMonth();
        var currentMon = monthNames[currentDt.getMonth()];
        var currentHour = currentDt.getHours();
        var currentMins = currentDt.getMinutes();
        var dt = new Date(this.SelectedDate);
        var date = (dt.getDate() < 10 ? '0' : '') + dt.getDate();
        var monVal = dt.getMonth();
        var mon = monthNames[dt.getMonth()];
        if (this.tableRowCount != undefined) {
            if (arrObj != undefined) {
                for (var i = 0; i < arrObj.length; i++) {
                    /*Seact booking case only - need to be changed later*/
                    var elem = document.getElementById("r0c" + arrObj[i].rowNo);
                    if (elem != undefined) {
                        elem.style.backgroundColor = "indigo";
                        elem.style.color = "white";
                        elem.title = arrObj[i].strTooltip.split('!')[0];
                    }
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DashboardSchedulerComponent.prototype, "IsGridloaded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DashboardSchedulerComponent.prototype, "IsAddpageopened", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DashboardSchedulerComponent.prototype, "SelectedDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DashboardSchedulerComponent.prototype, "rowcount", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DashboardSchedulerComponent.prototype, "bookedDateObj", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DashboardSchedulerComponent.prototype, "day", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DashboardSchedulerComponent.prototype, "SeatNo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DashboardSchedulerComponent.prototype, "Todaydate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DashboardSchedulerComponent.prototype, "cellClick", void 0);
    DashboardSchedulerComponent = __decorate([
        core_1.Component({
            selector: 'dashboardscheduler',
            templateUrl: 'app/Framework/Views/Scheduler/dashboardscheduler.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DashboardSchedulerComponent);
    return DashboardSchedulerComponent;
}());
exports.DashboardSchedulerComponent = DashboardSchedulerComponent;
//# sourceMappingURL=dashboardscheduler.component.js.map