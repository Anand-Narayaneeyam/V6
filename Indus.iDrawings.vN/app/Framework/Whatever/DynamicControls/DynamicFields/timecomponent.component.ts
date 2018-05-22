import {Component, Input, OnInit, EventEmitter, Output, Renderer, ViewChild, ViewChildren, ElementRef, AfterViewChecked } from '@angular/core';
import {IField} from '../../../Models/Interface/IField'
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES, NgModel} from '@angular/forms';
import { DATEPICKER_DIRECTIVES } from '../../../ExternalLibraries/datepicker/datepicker';
import *as moment from 'moment';
import {TimepickerComponent} from '../../../ExternalLibraries/timepicker/timepicker.component';
import {Validation} from '../../Validation/validate.directive'

@Component({
    selector: 'TimeComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/timecomponent.component.html',
    inputs: ['fieldObject'],
    directives: [DATEPICKER_DIRECTIVES, TimepickerComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, Validation],
    styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css', 'app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
})

export class TimeComponent implements OnInit, AfterViewChecked {
    public selectedDateValue: any;
    public displayStyle: string = "none";
    public showDiv: string = "none";
    public dt: Date = new Date();
    public minDate: Date = void 0;
    public events: Array<any>;
    public tomorrow: Date;
    public afterTomorrow: Date;
    public formats: Array<string> = ['DD MMM YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    public format: string = this.formats[0];
    private opened: boolean = false;
    public hour: number;
    public minute: number;
    public hstep: number = 1;
    public mstep: number = 1;
    public sstep: number = 1;
    public key: number;
    public ismeridian: boolean = true;
    public mytime: Date = new Date();
    public fieldObject: IField;
    public fieldWidth: string;
    public options: any = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30],
        sstep: [1, 2, 3, 4, 5, 6]
    };
    public dateOptions: any = {
        formatYear: 'YYYY',
        startingDay: 1
    };
    public labelWidth: string;
    public setAlignment: string;
    @Input() readonlymode: boolean;
    @Input() labelwidth: number;
    @Input() SetAlignment: string;
    @Input() validationData;
    @Input() showDateTimeOnLoad: boolean = false; /*set input true if current date time value should be shown on page load*/
    @Input() IsCard: boolean = false;
    @Output() timepickerOut = new EventEmitter();
    @ViewChild('txtDateTime') input: ElementRef;

    ngOnInit() {
        if (this.IsCard == true) { /*From General.ts : Card Add*/
            if (this.fieldObject.FieldValue != undefined) {
                if (this.fieldObject.FieldValue.includes("M")) {
                    //var strDate = this.fieldObject.FieldValue.split("T")[0];
                    var strTime = this.fieldObject.FieldValue;/*.split("T")[1]*/
                    //var strYear = strDate.split("-")[0];
                    //var strMon: number = Number(strDate.split("-")[1]);
                    //strMon = strMon - 1;
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    //var mon = monthNames[strMon];
                    //var strDay = strDate.split("-")[2];
                    var strHour = strTime.split(":")[0];
                    var meridian = "AM";
                    if (Number(strHour) >= 12) {
                        meridian = "PM";
                        var hr = Number(strHour);
                        if (hr == 12) {
                            strHour = "12";
                        }
                        else if (hr > 12) {
                            hr = hr - 12;
                            if (hr < 10) {
                                strHour = "0" + hr.toString();
                            }
                            else {
                                strHour = hr.toString();
                            }
                        }
                    }
                    if (meridian == "AM") {
                        if (strHour == "00") {
                            strHour = "12";
                        }
                    }
                    var strMin = strTime.split(":")[1];
                    var dateString = strHour + ":" + strMin + " " + meridian;
                    this.selectedDateValue = dateString;
                    this.fieldObject.FieldValue = dateString;
                }
                else {
                    this.selectedDateValue = this.fieldObject.FieldValue;
                }
            }
            else {

            }
        }
        else {
            if (this.fieldObject.FieldValue == null || this.fieldObject.FieldValue.toString() == "undefined" || this.fieldObject.FieldValue == "" || this.fieldObject.FieldValue == undefined) {
                if (this.fieldObject.IsMandatory == true) {
                    this.selectedDateValue = this.getformattedDataTime("");
                    this.fieldObject.FieldValue = this.selectedDateValue;
                }
                else {
                    if (this.showDateTimeOnLoad == true) {
                        this.selectedDateValue = this.getformattedDataTime("");
                        this.fieldObject.FieldValue = this.selectedDateValue;
                    }
                    this.fieldObject.FieldValue = "";
                    this.selectedDateValue = "";
                }
            }
            else {
                if (this.fieldObject.FieldValue != null || d != undefined) {
                    var d = new Date(this.fieldObject.FieldValue);
                    this.selectedDateValue = this.getformattedDataTime(d);
                    this.fieldObject.FieldValue = this.selectedDateValue;
                    this.dt = d;
                }
            }
        }
        if (this.SetAlignment == "horizontal") {
            this.setAlignment = "inline-flex";
        } else {
            this.setAlignment = "block";
        }
        if (this.labelwidth == undefined || this.labelwidth == null) {
            this.labelWidth = "auto";
        }
        else {
            this.labelWidth = this.labelwidth + "px";
        }
        if ((this.fieldObject.Width != null) || (this.fieldObject.Width != undefined)) {
            this.fieldWidth = this.fieldObject.Width.toString();
        }
        else {
            this.fieldWidth = "250";
        }
    }



    public constructor(private renderer: Renderer) {
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 43000);
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }


    ngAfterViewChecked() {
        //if (this.fieldObject.FieldValue != undefined) {
        //    this.fieldObject.FieldValue = JSON.parse(JSON.stringify(this.fieldObject.FieldValue));
        //}
        if (this.showDateTimeOnLoad == true) {
            if (this.fieldObject.FieldValue == "") {
                this.selectedDateValue = this.getformattedDataTime("");
                this.fieldObject.FieldValue = this.selectedDateValue;
            }
        } else if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue != this.selectedDateValue) {
            if (this.fieldObject.FieldValue.includes("T")) {
                //for card
            }
            else {
                this.selectedDateValue = this.fieldObject.FieldValue;
                var updatedvalue = new Date("01 Jan 1900 " + this.selectedDateValue);
                if (updatedvalue && !isNaN(updatedvalue.getTime()))
                    this.mytime = updatedvalue;
            }
        }
    }

    onchange() {
    }

    getKeyPress(event) {

        if (event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 27) {
            event.target.value = "";
            this.fieldObject.FieldValue = "";
            event.preventDefault();
        }
        else if (event.keyCode == 13) {
            event.preventDefault();
            this.datetimepickertoggle();

        }

    }

    handleKeyboardEvents(e) //ESC to Hide Date Picker
    {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '27') {
            if (this.displayStyle == "block") {
                this.displayStyle = "none";
                this.showDiv = "none";
            }

        }
    }

    public toggleMode(): void {
        this.ismeridian = !this.ismeridian;
    };

    public update(): void {
        let d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        d.setSeconds(0);
        this.mytime = d;
    };

    public changed(): void {
        /*Time changed to: this.mytime*/
    };

    public clear(): void {
        this.mytime = void 0;
        this.dt = void 0;
    };

    public getDate(): number {
        return this.dt && this.dt.getTime() || new Date().getTime();
    }
    public today(): void {
        /*this.dt = new Date();*/
    }

    public d20090824(): void {
        this.dt = moment('2009-08-24', 'YYYY-MM-DD').toDate();
    }

    public getDayClass(date: any, mode: string): string {
        if (mode === 'day') {
            let dayToCheck = new Date(date).setHours(0, 0, 0, 0);
            for (let i = 0; i < this.events.length; i++) {
                let currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);
                if (dayToCheck === currentDay) {
                    return this.events[i].status;
                }
            }
        }
        return '';
    }

    public disabled(date: Date, mode: string): boolean {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    }

    public open(): void {
        this.opened = !this.opened;
    }

    public toggleMin(): void {
        this.dt = new Date(this.minDate.valueOf());
    }

    datetimepickertoggle() {
        if (this.displayStyle == "none") {
            this.displayStyle = "block";
            this.showDiv = "block";
        }
        else if (this.displayStyle == "block") {
            this.displayStyle = "none";
            this.showDiv = "none";
        }
        document.getElementById(this.fieldObject.ReportFieldId.toString()).focus();
    }

    getBlurEvent(event) {
        if (event.srcElement.value == "") {
            this.fieldObject.FieldValue = ""
        }
        if (event.srcElement.value.length <= 20) {
            this.fieldObject.FieldValue = event.srcElement.value;
        }
    }

    getSelectedValue(dt) {
        this.selectedDateValue = this.getformattedDataTimeonSelection(dt);
        this.fieldObject.FieldValue = this.selectedDateValue;
        this.timepickerOut.emit({
            fieldObj: this.fieldObject
        })
        var elem = <HTMLInputElement>document.getElementById("txtDateTime");
        if (elem) {
            elem.value = this.selectedDateValue;
        }
        document.getElementById(this.fieldObject.ReportFieldId.toString()).focus();
        if (event.srcElement.className == "btn btn-default btn-sm" || event.srcElement.parentElement.className == "btn btn-default btn-sm") {
            this.displayStyle = "none";
            this.showDiv = "none";
        }
    }

    getChangedVal(event) {
        console.log(event);
    }

    getformattedDataTime(dt) {
        var strDate = "";
        var date;
        var time;
        var hh;
        var hour;
        var min;
        var meridian;
        var dd;
        if (dt) {// undefined || dt != null || dt != "" || (dt)) {
            date = new Date(dt);
            hh = date.getHours();
            min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        }
        else {
            date = new Date();
            hh = this.mytime.getHours();
            min = (this.mytime.getMinutes() < 10 ? '0' : '') + this.mytime.getMinutes();
            dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        }
        if (hh > 12) {
            meridian = "PM";
            hh = hh - 12;
        }
        else if (hh == 12) {
            meridian = "PM"
            hh = 12;
        }
        else {
            meridian = "AM";
        }
        if (meridian == "AM") {
            if (hh == 0) {
                hh = 12;
            }
        }
        hour = hh.toString();
        hour = (hh < 10 ? '0' : '') + hour;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        //strDate = dd + " " + mon + " " + yy + " " + hour + ":" + min + " " + meridian;
        strDate = hour + ":" + min + " " + meridian;
        return strDate;
    }

    getformattedDataTimeonSelection(dt) {
        var strDate = "";
        var date;
        var time;
        var hh;
        var hour;
        var min;
        var meridian;
        if (dt) {
            date = new Date(dt);
        }
        else {
            date = new Date();
        }
        hh = this.mytime.getHours();
        min = (this.mytime.getMinutes() < 10 ? '0' : '') + this.mytime.getMinutes();
        if (hh > 12) {
            meridian = "PM";
            hh = hh - 12;
        }
        else if (hh == 12) {
            meridian = "PM"
            hh = 12;
        }
        else {
            meridian = "AM";
        }
        if (meridian == "AM") {
            if (hh == 0) {
                hh = 12;
            }
        }
        hour = hh.toString();
        hour = (hh < 10 ? '0' : '') + hour;
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        //strDate = dd + " " + mon + " " + yy + " " + hour + ":" + min + " " + meridian;
        strDate = hour + ":" + min + " " + meridian;
        return strDate;
    }
} 
