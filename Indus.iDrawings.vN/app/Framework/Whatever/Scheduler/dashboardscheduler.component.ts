import { Component, Input, Output, OnInit, ElementRef, AfterViewChecked, EventEmitter, OnChanges, SimpleChange} from '@angular/core';

@Component({
    selector: 'dashboardscheduler',
    templateUrl: 'app/Framework/Views/Scheduler/dashboardscheduler.component.html'
})

export class DashboardSchedulerComponent implements OnInit, AfterViewChecked, OnChanges {

    blnIsBooked: boolean = false;
    tableRowCount: number;
    @Input() IsGridloaded: boolean;
    @Input() IsAddpageopened: boolean = false;
    @Input() SelectedDate: number;
    @Input() rowcount: number;
    @Input() bookedDateObj: ISchedulerObj[];
    @Input() day: any;
    @Input() SeatNo: string;
    @Input() Todaydate: string;
    @Output() cellClick = new EventEmitter<Ischeduler>();
    timeArray: any[]; 

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        var contextObj = this;
    }

    ngAfterViewChecked() {
        var contextObj = this;
        if (contextObj.IsAddpageopened == false) {
            if (contextObj.rowcount != undefined) {
                contextObj.setCellClass();
            }
            if (contextObj.bookedDateObj != undefined) {
                contextObj.setSeledtedOnLoad(contextObj.bookedDateObj);
            }
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (this.SelectedDate != undefined) {
            this.setCellClass();
        }
        if (contextObj.bookedDateObj != undefined) {
            contextObj.setSeledtedOnLoad(contextObj.bookedDateObj);
        }
        contextObj.setelementsforfocus();
    }

    setelementsforfocus() {
        var contextObj = this;
        var rowlength: number, columnlength: number;
        rowlength = contextObj.rowcount;
        columnlength = this.tableRowCount * 2;
        var elem: any;
        for (var k = 0; k < rowlength; k++) {
            for (var j = 0; j < columnlength; j++) {
                elem = <HTMLTableDataCellElement>document.getElementById("r" + k + "c" + j);
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
    }

    setCellClass() {
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
        var disableCount: number;
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
                                        var elem = <HTMLTableDataCellElement>document.getElementById("r" + i + "c" + j);
                                        if (elem != undefined) {
                                            elem.className = "tdDisabled";
                                            //$("#" + elem.id.toString()).attr("disabled", "disabled");
                                            $("#" + elem.id.toString()).prop("disabled", true);
                                            elem.style.backgroundColor = "lightgray";
                                        }
                                    }
                                    else {
                                        var elem = <HTMLTableDataCellElement>document.getElementById("r" + i + "c" + j);
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
                        }
                    }
                }
            }
        }
    }

    enableTd() {
        var datetimepick = new Date(this.SelectedDate);
        var pickDate = datetimepick.getDate();
        var Pickday = datetimepick.getDay();
        //for (var i = 0; i < this.rowcount; i++) {
        for (var j = 0; j < this.tableRowCount * 2; j++) {

            var elem = <HTMLTableDataCellElement>document.getElementById("r" + 0 + "c" + j);
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
    }

    disableTd() {
        for (var i = 0; i < this.rowcount; i++) {
            for (var j = 0; j < this.tableRowCount * 2; j++) {
                var elem = <HTMLTableDataCellElement>document.getElementById("r" + i + "c" + j);
                if (elem != undefined) {
                    elem.className = "tdDisabled";
                    //$("#" + elem.id.toString()).attr("disabled", "disabled");
                    $("#" + elem.id.toString()).prop("disabled", true);
                    elem.style.backgroundColor = "lightgray";
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

        this.timeArray = items;
        return items;
    }

    createTableRows(rowcount) {
        let items = [];
        for (let i = 0; i < rowcount; i++) {
            items.push("r" + i);
        }
        return items;
    }

    getTitleDyn(tag) {

        debugger
    }

    createTableData() {
        let items = [];
        for (let i = 0; i < this.tableRowCount * 2; i++) {
            items.push("c" + i);
        }
        return items;
    }

    clickByEnterKey(val) {

        if (val.keyCode == 13 || val.keyCode == 32) {
            this.onCellClick(val);
        }
    }

    onCellClick(val) {
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
                time: t
                , day: this.day[j[0]]
            })
            let selectedCell = this.el.nativeElement.childNodes;
            if (document.getElementById(val.target.id).innerText == "booked") {

            }
            else {
                document.getElementById(val.target.id).style.backgroundColor = "indigo";
                document.getElementById(val.target.id).style.color = "white";
            }
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
        var date = new Date(this.Todaydate);
    }

    setSeledtedOnLoad(arrObj: ISchedulerObj[]) {
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
                    var elem = <HTMLTableDataCellElement>document.getElementById("r0c" + arrObj[i].rowNo);
                        if (elem != undefined) {
                            elem.style.backgroundColor = "indigo";
                            elem.style.color = "white";
                            elem.title = arrObj[i].strTooltip.split('!')[0];
                        }                    
                }
            }
        }
    }
}

export interface Ischeduler {
    id: any,
    time: string
    day: string
}

export interface ISchedulerObj {
    rowNo: number,
    bookedDates: string[],
    strTooltip: string
}