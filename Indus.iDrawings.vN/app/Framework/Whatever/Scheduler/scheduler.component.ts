﻿import { Component, Input, Output, OnInit, ElementRef, AfterViewChecked, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'schedule-calendar',
    templateUrl: 'app/Framework/Views/Scheduler/scheduler.component.html'
})

export class ScheduleCalendarComponent implements OnInit, AfterViewChecked, OnChanges {

    blnIsBooked: boolean = false;
    tableRowCount: number;
    getFocustd: number;
    @Input() IsGridloaded: boolean;
    @Input() isRoom: boolean;
    @Input() IsAddpageopened: boolean;
    @Input() SelectedDate: number;
    @Input() rowcount: number;
    @Input() Sitedatetime: SiteDatetime[];
    @Input() bookedDateObj: ISchedulerObj[];
    @Output() cellClick = new EventEmitter<Ischeduler>();
    Header: any = [];
    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        var contextObj = this;
        if (this.isRoom == undefined || this.isRoom == null)
            this.isRoom = false;

    }

    ngAfterViewChecked() {
        var contextObj = this;
        if (contextObj.IsAddpageopened == false && contextObj.IsGridloaded == true) {
            if (contextObj.rowcount != undefined && contextObj.Sitedatetime.length > 0) {
                contextObj.setCellClass(contextObj.Sitedatetime);
            }
            if (contextObj.bookedDateObj != undefined && contextObj.Sitedatetime.length > 0) {
                contextObj.setSeledtedOnLoad(contextObj.bookedDateObj, contextObj.Sitedatetime);
            }
            contextObj.IsGridloaded = false;
        }
        contextObj.setelementsforfocus();

        //this.removeTabIndexForDisabled();


    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (contextObj.IsGridloaded == true) {
            if (this.SelectedDate != undefined && contextObj.Sitedatetime.length > 0) {
                console.log(this.SelectedDate);
                this.setCellClass(contextObj.Sitedatetime);
            }
            if (contextObj.bookedDateObj != undefined && contextObj.Sitedatetime.length > 0) {
                contextObj.setSeledtedOnLoad(contextObj.bookedDateObj, contextObj.Sitedatetime);
            }

        }
    }

    //removeTabIndexForDisabled() {

    //    var totalLen = $(".scheduler tr").length;

    //    for (var j = 1; j <= totalLen; j++)
    //    {

    //        var tdLen = $(".scheduler tr")[j].querySelectorAll("td").length;

    //        for (var k = 0;k<

    //    }



    //}

    getManualFocus() {
        if (localStorage.getItem("focusReserv") != null && localStorage.getItem("focusReserv") != undefined && localStorage.getItem("focusReserv") != "") {
            //console.log(localStorage.getItem("focusReserv"));
            this.getFocustd = Number(localStorage.getItem("focusReserv"));
            this.getFocustd = this.getFocustd - 1;
            var totalItems = $(".scheduler #r" + this.getFocustd + " td");
            for (var i = 0; i < totalItems.length; i++) {

                if (totalItems[i].className == "tdEnabled") {
                    totalItems[i].focus();
                    break;
                }
            }
            localStorage.setItem("focusReserv", "");
        }
    }


    setelementsforfocus() {
        var contextObj = this;
        var rowlength: number, columnlength: number;
        rowlength = contextObj.Sitedatetime.length;
        columnlength = this.tableRowCount * 2;
        var elem: any;
        for (var k = 0; k < rowlength; k++) {
            for (var j = 0; j < columnlength; j++) {
                elem = <HTMLTableDataCellElement>document.getElementById("r" + k + "c" + j);
                if (elem != undefined) {
                    if (elem.className == "tdDisabled") {
                        if (elem.getAttribute('aria-label').search('Disabled Field') < 0)
                            elem.setAttribute('aria-label', (elem.getAttribute('aria-label') + " Disabled Field"));
                        //if (elem.title.search('Disabled Field') < 0) 
                        //elem.title = elem.title + " Disabled Field"; 
                        elem.tabIndex = "-1";
                    }
                    else {
                        elem.getAttribute('aria-label').replace('Disabled Field', '');
                        if (elem.getAttribute('aria-label').search('Click the required time slot to Reserve Room') < 0)
                            elem.setAttribute('aria-label', elem.getAttribute('aria-label') + ' Click the required time slot to Reserve Room');

                    }

                }
            }
        }
    }





    setCellClass(Sitedatetimes: SiteDatetime[]) {
        var datetime = new Date();
        var currentDate = datetime.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var currentMonVal = datetime.getMonth();
        var currentMon = monthNames[datetime.getMonth()];
        var currentYear = datetime.getFullYear();
        var hour = datetime.getHours();
        var mins = datetime.getMinutes();
        var datetimepick = new Date(this.SelectedDate);
        var pickDate = datetimepick.getDate();
        var Pickday = datetimepick.getDay();
        var pickMonVal = datetimepick.getMonth();
        var pickMon = monthNames[datetime.getMonth()];
        var pickYear = datetimepick.getFullYear();
        var pickhour = datetimepick.getHours();
        var pickmins = datetimepick.getMinutes();
        for (var k = 0; k < Sitedatetimes.length; k++) {
            var dateInput = new Date(Sitedatetimes[k].Datetime);
            var selectedDate = dateInput.getDate();
            var selectedMonVal = dateInput.getMonth();
            var selectedMon = monthNames[dateInput.getMonth()];
            var selectedYear = dateInput.getFullYear();
            var Selectedhour = dateInput.getHours();
            var Selectedmins = dateInput.getMinutes();
            var disableCount: number;
            if (currentYear > pickYear) {
                if (selectedYear == pickYear)
                    this.timezonestyle(k, Selectedhour, Selectedmins);
                else
                    this.disableTd(k);
            }
            else {
                if (currentYear < pickYear) {
                    if (selectedYear == pickYear)
                        this.timezonestyle(k, Selectedhour, Selectedmins);
                    else
                        this.enableTd(k);
                }
                else {
                    if (currentMonVal > pickMonVal) {
                        if (selectedMonVal == pickMonVal) {
                            if (selectedDate == pickDate)
                                this.timezonestyle(k, Selectedhour, Selectedmins);
                            else
                                this.disableTd(k);
                        }
                        else if (selectedMonVal < pickMonVal)
                            this.enableTd(k);
                        else
                            this.disableTd(k);
                    }
                    else if (currentMonVal < pickMonVal) {
                        if (selectedMonVal == pickMonVal)
                            this.timezonestyle(k, Selectedhour, Selectedmins);
                        else
                            this.enableTd(k);
                    }
                    else {
                        if (currentDate > pickDate) {
                            if (selectedDate == pickDate)
                                this.timezonestyle(k, Selectedhour, Selectedmins);
                            else
                                this.disableTd(k);
                        }
                        else if (currentDate < pickDate) {
                            if (selectedDate == pickDate)
                                this.timezonestyle(k, Selectedhour, Selectedmins);
                            else
                                this.enableTd(k);
                        }
                        else {
                            if (currentDate == pickDate) {
                                if (selectedDate == pickDate) {
                                    if (Selectedmins > 30) {
                                        disableCount = Selectedhour * 2;
                                        disableCount = disableCount + 1;
                                    }
                                    else {
                                        disableCount = Selectedhour * 2;
                                    }
                                }
                                else
                                    disableCount = -1;
                                //for (var i = 0; i < this.rowcount; i++) {
                                for (var j = 0; j < this.tableRowCount * 2; j++) {
                                    if (j <= disableCount) {
                                        var elem = <HTMLTableDataCellElement>document.getElementById("r" + k + "c" + j);
                                        if (elem != undefined) {
                                            elem.className = "tdDisabled";
                                            //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                            $("#" + elem.id.toString()).prop("disabled", true);
                                            elem.style.backgroundColor = "lightgray";
                                        }
                                    }
                                    else {
                                        var elem = <HTMLTableDataCellElement>document.getElementById("r" + k + "c" + j);
                                        if (elem != undefined) {
                                            if (Pickday != 0 && Pickday != 6) {
                                                if (j > 11 && j < 38) {
                                                    elem.className = "tdEnabled";
                                                    // $("#" + elem.id.toString()).attr("enabled", "true");
                                                    $("#" + elem.id.toString()).prop("disabled", false);
                                                    elem.style.backgroundColor = "white";
                                                }
                                                else {
                                                    elem.className = "tdDisabled";// as per GAO requirement time before 6:00 am and 7:00pm blocked
                                                    //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                                    $("#" + elem.id.toString()).prop("disabled", true);
                                                    elem.style.backgroundColor = "lightgray";
                                                }
                                            }
                                            else {
                                                elem.className = "tdDisabled";// as per GAO requirement time slots of Saturday and Sunday blocked
                                                //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                                $("#" + elem.id.toString()).prop("disabled", true);
                                                elem.style.backgroundColor = "lightgray";
                                            }
                                        }
                                    }
                                }
                                //}
                            }
                            else if (selectedDate == pickDate) {
                                if (selectedDate == pickDate) {
                                    if (Selectedmins > 30) {
                                        disableCount = Selectedhour * 2;
                                        disableCount = disableCount + 1;
                                    }
                                    else {
                                        disableCount = Selectedhour * 2;
                                    }
                                }
                                else
                                    disableCount = -1;
                                //for (var i = 0; i < this.rowcount; i++) {
                                for (var j = 0; j < this.tableRowCount * 2; j++) {
                                    if (j <= disableCount) {
                                        var elem = <HTMLTableDataCellElement>document.getElementById("r" + k + "c" + j);
                                        if (elem != undefined) {
                                            elem.className = "tdDisabled";
                                            //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                            $("#" + elem.id.toString()).prop("disabled", true);
                                            elem.style.backgroundColor = "lightgray";
                                        }
                                    }
                                    else {
                                        var elem = <HTMLTableDataCellElement>document.getElementById("r" + k + "c" + j);
                                        if (elem != undefined) {
                                            if (Pickday != 0 && Pickday != 6) {
                                                if (j > 11 && j < 38) {
                                                    elem.className = "tdEnabled";
                                                    //$("#" + elem.id.toString()).attr("enabled", "true");
                                                    $("#" + elem.id.toString()).prop("disabled", false);
                                                    elem.style.backgroundColor = "white";
                                                }
                                                else {
                                                    elem.className = "tdDisabled";// as per GAO requirement time before 6:00 am and 7:00pm blocked
                                                    //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                                    $("#" + elem.id.toString()).prop("disabled", true);
                                                    elem.style.backgroundColor = "lightgray";
                                                }
                                            }
                                            else {
                                                elem.className = "tdDisabled";// as per GAO requirement time slots of Saturday and Sunday blocked
                                                //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                                $("#" + elem.id.toString()).prop("disabled", true);
                                                elem.style.backgroundColor = "lightgray";
                                            }
                                        }
                                    }
                                }
                                //}
                            }
                        }
                    }
                }
            }
        }
    }

    enableTd(i) {
        var datetimepick = new Date(this.SelectedDate);
        var pickDate = datetimepick.getDate();
        var Pickday = datetimepick.getDay();
        //for (var i = 0; i < this.rowcount; i++) {
        for (var j = 0; j < this.tableRowCount * 2; j++) {

            var elem = <HTMLTableDataCellElement>document.getElementById("r" + i + "c" + j);
            if (Pickday != 0 && Pickday != 6) {
                if (elem != undefined) {
                    if (j > 11 && j < 38) {
                        elem.className = "tdEnabled";
                        //$("#" + elem.id.toString()).attr("enabled", "true");
                        $("#" + elem.id.toString()).prop("disabled", false);
                        elem.style.backgroundColor = "white";
                    }
                    else {
                        elem.className = "tdDisabled";// as per GAO requirement time before 6:00 am and 7:00pm blocked
                        //$("#" + elem.id.toString()).attr("disabled", "disabled");
                        $("#" + elem.id.toString()).prop("disabled", true);
                        elem.style.backgroundColor = "lightgray";
                    }
                }
            }
            else {
                elem.className = "tdDisabled";// as per GAO requirement time slots of Saturday and Sunday blocked
                //$("#" + elem.id.toString()).attr("disabled", "disabled");
                $("#" + elem.id.toString()).prop("disabled", true);
                elem.style.backgroundColor = "lightgray";
            }
        }
        //}
    }

    disableTd(i) {
        //for (var i = 0; i < this.rowcount; i++) {
        for (var j = 0; j < this.tableRowCount * 2; j++) {
            var elem = <HTMLTableDataCellElement>document.getElementById("r" + i + "c" + j);
            if (elem != undefined) {
                elem.className = "tdDisabled";
                //$("#" + elem.id.toString()).attr("disabled", "disabled");
                $("#" + elem.id.toString()).prop("disabled", true);
                elem.style.backgroundColor = "lightgray";
            }
        }
        //}
    }
    timezonestyle(k, Selectedhour, Selectedmins) {
        var disableCount: number;
        var datetimepick = new Date(this.SelectedDate);
        var pickDate = datetimepick.getDate();
        var Pickday = datetimepick.getDay();
        if (Selectedmins > 30) {
            disableCount = Selectedhour * 2;
            disableCount = disableCount + 1;
        }
        else {
            disableCount = Selectedhour * 2;
        }
        //for (var i = 0; i < this.rowcount; i++) {
        for (var j = 0; j < this.tableRowCount * 2; j++) {
            if (j <= disableCount) {
                var elem = <HTMLTableDataCellElement>document.getElementById("r" + k + "c" + j);
                if (elem != undefined) {
                    elem.className = "tdDisabled";
                    //$("#" + elem.id.toString()).attr("disabled", "disabled");
                    $("#" + elem.id.toString()).prop("disabled", true);
                    elem.style.backgroundColor = "lightgray";
                }
            }
            else {
                var elem = <HTMLTableDataCellElement>document.getElementById("r" + k + "c" + j);
                if (elem != undefined) {
                    if (Pickday != 0 && Pickday != 6) {
                        if (j > 11 && j < 38) {
                            elem.className = "tdEnabled";
                            //$("#" + elem.id.toString()).attr("enabled", "true");
                            $("#" + elem.id.toString()).prop("disabled", false);
                            elem.style.backgroundColor = "white";
                        }
                        else {
                            elem.className = "tdDisabled";// as per GAO requirement time before 6:00 am and 7:00pm blocked
                            //$("#" + elem.id.toString()).attr("disabled", "disabled");
                            $("#" + elem.id.toString()).prop("disabled", true);
                            elem.style.backgroundColor = "lightgray";
                        }
                    }
                    else {
                        elem.className = "tdDisabled";// as per GAO requirement time slots of Saturday and Sunday blocked
                        //$("#" + elem.id.toString()).attr("disabled", "disabled");
                        $("#" + elem.id.toString()).prop("disabled", true);
                        elem.style.backgroundColor = "lightgray";
                    }
                }
            }
        }
    }



    createTableHeader(cellcount) {
        let items = [];
        var x;
        this.tableRowCount = cellcount;
        for (let i = 0; i < cellcount; i++) {
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
            } else {
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
        this.Header = items;
        return items;
    }

    createTableRows(rowcount) {
        let items = [];
        for (let i = 0; i < rowcount; i++) {
            items.push("r" + i);
        }
        return items;
    }

    createTableData() {
        let items = [];
        for (let i = 0; i < this.tableRowCount * 2; i++) {
            items.push("c" + i);
        }
        return items;
    }

    onCellClick(val) {
        if (document.getElementById(val.target.id).className == "tdDisabled") {
        }
        else if (document.getElementById(val.target.id).style.backgroundColor == "indigo") {
        }
        else {
            var id = val.target.id;
            var t = this.getSelectedTimefromId(id);
            console.log(val.target.id);
            console.log(t);
            this.cellClick.emit({
                id: val.target.id,
                time: t
            })
            let selectedCell = this.el.nativeElement.childNodes;
            //if (document.getElementById(val.target.id).innerText == "booked") {

            //}
            //else {
            //    document.getElementById(val.target.id).style.backgroundColor = "indigo";
            //    document.getElementById(val.target.id).style.color = "white";
            //}
        }
    }

    getStyle() {
        if (this.blnIsBooked) {
            return "gray";
        }
        else {
            return "white";
        }
    }

    changeCursorStyle(event) {
        if (document.getElementById(event.target.id).innerText == "") {
            document.getElementById(event.target.id).style.cursor = "hand";
        }
        else {
            document.getElementById(event.target.id).style.cursor = "pointer";
        }
    }

    getSelectedTimefromId(id: string) {
        var splitVal;
        var time;
        if (id != "") {
            splitVal = id.split("c")[1];
            switch (splitVal) {
                case "0": time = "00:00"; break;
                case "1": time = "00:30"; break;
                case "2": time = "01:00"; break;
                case "3": time = "01:30"; break;
                case "4": time = "02:00"; break;
                case "5": time = "02:30"; break;
                case "6": time = "03:00"; break;
                case "7": time = "03:30"; break;
                case "8": time = "04:00"; break;
                case "9": time = "04:30"; break;
                case "10": time = "05:00"; break;
                case "11": time = "05:30"; break;
                case "12": time = "06:00"; break;
                case "13": time = "06:30"; break;
                case "14": time = "07:00"; break;
                case "15": time = "07:30"; break;
                case "16": time = "08:00"; break;
                case "17": time = "08:30"; break;
                case "18": time = "09:00"; break;
                case "19": time = "09:30"; break;
                case "20": time = "10:00"; break;
                case "21": time = "10:30"; break;
                case "22": time = "11:00"; break;
                case "23": time = "11:30"; break;
                case "24": time = "12:00"; break;
                case "25": time = "12:30"; break;
                case "26": time = "13:00"; break;
                case "27": time = "13:30"; break;
                case "28": time = "14:00"; break;
                case "29": time = "14:30"; break;
                case "30": time = "15:00"; break;
                case "31": time = "15:30"; break;
                case "32": time = "16:00"; break;
                case "33": time = "16:30"; break;
                case "34": time = "17:00"; break;
                case "35": time = "17:30"; break;
                case "36": time = "18:00"; break;
                case "37": time = "18:30"; break;
                case "38": time = "19:00"; break;
                case "39": time = "19:30"; break;
                case "40": time = "20:00"; break;
                case "41": time = "20:30"; break;
                case "42": time = "21:00"; break;
                case "43": time = "21:30"; break;
                case "44": time = "22:00"; break;
                case "45": time = "22:30"; break;
                case "46": time = "23:00"; break;
                case "47": time = "23:30"; break;
            }
        }
        return time;
    }

    setDisabledonLoad() {
        var date = new Date();
    }

    setSeledtedOnLoad(arrObj: ISchedulerObj[], Sitedatetimes: SiteDatetime[]) {
        var currentDt = new Date();
        var currentDate = currentDt.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var currentMonVal = currentDt.getMonth();
        var currentMon = monthNames[currentDt.getMonth()];
        var currentHour = currentDt.getHours();
        var currentMins = currentDt.getMinutes();
        for (var k = 0; k < Sitedatetimes.length; k++) {
            var dt = new Date(this.SelectedDate);
            var date = (dt.getDate() < 10 ? '0' : '') + dt.getDate();
            var monVal = dt.getMonth();
            var mon = monthNames[dt.getMonth()];
            if (this.tableRowCount != undefined) {
                if (arrObj != undefined) {
                    for (var i = 0; i < arrObj.length; i++) {
                        for (var j = 0; j < 48; j++) {
                            var strBookedDate = arrObj[i].bookedDates.toString();
                            var strMon = strBookedDate.split(" ")[0];
                            var strDate = strBookedDate.split(" ")[1];
                            var strCol = strBookedDate.split(" ")[2];
                            if (date.toString() == strDate && mon == strMon) {
                                if (j.toString() == strCol) {
                                    var elem = <HTMLTableDataCellElement>document.getElementById("r" + arrObj[i].rowNo + "c" + j);
                                    if (elem != undefined) {
                                        elem.style.backgroundColor = "indigo";
                                        elem.style.color = "white";
                                        elem.title = arrObj[i].strTooltip;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    onSlotkeydown(keyevent) {
        var key = keyevent.keyCode || keyevent.which;
        if (key == 13 || key == 32) {
            this.onCellClick(keyevent);
        }
    }
}

export interface Ischeduler {
    id: any,
    time: string
}

export interface ISchedulerObj {
    rowNo: number,
    bookedDates: string[],
    strTooltip: string
}
export interface SiteDatetime {
    Datetime: string
}