import { Component, Output, Input, EventEmitter, OnInit, AfterViewChecked, SimpleChange, OnChanges } from '@angular/core';

@Component({
    selector: 'calenderControl',
    templateUrl: 'app/Framework/Views/Calendar/calendar.component.html'
})

export class CalendarComponent implements OnInit, AfterViewChecked, OnChanges {
    cellDate: string;
    SelectedYear: string;
    SelectedMonth: string;
    startDay: number;
    endDay: number;
    currentMonth: number;
    currentYear: number;
    blnShowDiv: boolean = false;
    date: Date = new Date();
    firstDay: Date;
    lastDay: Date;
    @Input() blnIsGenerated: boolean = false;
    @Input() SelectedDate: number;
    @Input() blnBlockPrevClick: boolean = false;
    @Input() blnBlockNextClick: boolean = false;
    @Input() CalendarObj: CalendarObj[];
    @Output() btnClick = new EventEmitter<btnObj>();
    @Output() prevMonClick = new EventEmitter<btnObj>();
    @Output() nextMonClick = new EventEmitter<btnObj>();

    ngOnInit() {
        var contextObj = this;
        contextObj.SelectedYear = contextObj.date.getFullYear().toString();
        contextObj.currentYear = contextObj.date.getFullYear();
        contextObj.currentMonth = contextObj.date.getMonth();
        contextObj.getMonthValue(1);
        contextObj.setCellDate();
        contextObj.setFirstDate();
    }

    ngAfterViewChecked() {
        var contextObj = this;
        //contextobj. setcelldate();
        //contextobj.setfirstdate();
        if (contextObj.CalendarObj != undefined) {
            contextObj.setButtonClass(contextObj.CalendarObj);
        }
    
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        //contextobj. setcelldate();
        //contextobj.setfirstdate();
        if (contextObj.CalendarObj != undefined) {
            contextObj.setButtonClass(contextObj.CalendarObj);
        }
    }

    createTableRows() {
        let items = [];
        for (let i = 0; i < 6; i++) {
            items.push("r" + i);
        }
        return items;
    }
    createTableCell() {
        let items = [];
        for (let i = 0; i < 7; i++) {
            items.push("c" + i);
        }
        return items;
    }

    setCellDate() {
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
    }

    setFirstDate() {
        // debugger
        var contextObj = this;
        var id: string;
        var j = 1;
        var loopFrom = contextObj.startDay - 1;
        var loopTo = contextObj.endDay + contextObj.startDay;
        for (var i = 0; i < 42; i++) {
            var elemClass = <HTMLInputElement>document.getElementById("btn" + i);
            if (elemClass != undefined) {
                //elemClass.className = "btnHide";
                elemClass.className = "btnHide";
                //elemClass.className = "btnDue";
            }
            var tdClass = <HTMLTableDataCellElement>document.getElementById("td" + i);
            if (tdClass != undefined) {
                tdClass.className = "tdDisabled";
            }
            var elem = <HTMLSpanElement>document.getElementById("sp" + i);
            if (elem != undefined) {
                elem.innerText = "";
                elemClass.className = "btnHide";
            }
            if (i > loopFrom && i < loopTo) {
                var elem = <HTMLSpanElement>document.getElementById("sp" + i);
                if (elem != undefined) {
                    var day = j++;
                    elem.innerText = day.toString();
                    //if (i % 2 == 0) {
                    //    elemClass.className = "btnGenerated";
                    //}
                    //else {
                    //    elemClass.className = "btnDue";
                    //}
                }
                tdClass.className = "tdEnabled";
            }
        }
    }

    getPreviousMonth(event) {
        var contextObj = this;
        contextObj.getMonthValue(2);
        contextObj.setCellDate();
        contextObj.setFirstDate();
        var month = this.setMonthNameOnEmit(contextObj.SelectedMonth);
        var dateValue = "01" + " " + month + " " + contextObj.SelectedYear;
        contextObj.prevMonClick.emit({
            selectedDate: dateValue
        });
    }

    getNextMonth(event) {
        var contextObj = this;
        contextObj.getMonthValue(3);
        contextObj.setCellDate();
        contextObj.setFirstDate();
        var month = this.setMonthNameOnEmit(contextObj.SelectedMonth);
        var dateValue = "01" + " " + month + " " + contextObj.SelectedYear;
        contextObj.nextMonClick.emit({
            selectedDate: dateValue
        });
    }

    setMonthNameOnEmit(strMonth) {
        switch (strMonth) {
            case "JANUARY": strMonth = "Jan";
                break;
            case "FEBRUARY": strMonth = "Feb";
                break;
            case "MARCH": strMonth = "Mar";
                break;
            case "APRIL": strMonth = "Apr";
                break;
            case "MAY": strMonth = "May";
                break;
            case "JUNE": strMonth ="Jun";
                break;
            case "JULY": strMonth = "Jul";
                break;
            case "AUGUST": strMonth = "Aug";
                break;
            case "SEPTEMBER": strMonth = "Sep";
                break;
            case "OCTOBER": strMonth = "Oct";
                break;
            case "NOVEMBER": strMonth =  "Nov";
                break;
            case "DECEMBER": strMonth = "Dec";
                break;
        }
        return strMonth;
    }

    getMonthValue(target) {
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
            case "Jan": contextObj.SelectedMonth = "JANUARY";
                break;
            case "Feb": contextObj.SelectedMonth = "FEBRUARY";
                break;
            case "Mar": contextObj.SelectedMonth = "MARCH";
                break;
            case "Apr": contextObj.SelectedMonth = "APRIL";
                break;
            case "May": contextObj.SelectedMonth = "MAY";
                break;
            case "Jun": contextObj.SelectedMonth = "JUNE";
                break;
            case "Jul": contextObj.SelectedMonth = "JULY";
                break;
            case "Aug": contextObj.SelectedMonth = "AUGUST";
                break;
            case "Sep": contextObj.SelectedMonth = "SEPTEMBER";
                break;
            case "Oct": contextObj.SelectedMonth = "OCTOBER";
                break;
            case "Nov": contextObj.SelectedMonth = "NOVEMBER";
                break;
            case "Dec": contextObj.SelectedMonth = "DECEMBER";
                break;
        }
    }

    getBtnClick(event, id) {
        var elem = <HTMLInputElement>document.getElementById(id);
        var strData = "";
        if (elem) {
            strData = elem.innerText;
        }
        if (strData.length < 2) {
            strData = "0" + strData 
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
    }

    setButtonClass(calObj: CalendarObj[]) {
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
            for (var j = contextObj.startDay, i = 0; j < contextObj.endDay, i < calObj.length; j++ , i++) {
                if (calObj[i].count > 0) {
                    var btn = <HTMLInputElement>document.getElementById("btn" + j);
                    if (btn != undefined) {
                        btn.value = calObj[i].count.toString();
                        var elemClass = <HTMLInputElement>document.getElementById("btn" + j);
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
                    var btn = <HTMLInputElement>document.getElementById("btn" + j);
                    if (btn != undefined) {
                        btn.value = calObj[i].count.toString();
                        var elemClass = <HTMLInputElement>document.getElementById("btn" + j);
                        if (elemClass != undefined) {
                            elemClass.className = "btnHide";
                        }
                    }
                }
            }
        }
    }
}

export interface CalendarObj {
    strDate: string,
    count: number
}

export interface btnObj {
    selectedDate: string,
}