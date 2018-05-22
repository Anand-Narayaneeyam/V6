import {Component, Input, OnInit} from '@angular/core';
import {IField} from '../../Models/Interface/IField';
import {Validation} from '../Validation/validate.directive';
import {Delimeter} from '../../../Models/Common/General';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES, NgModel} from '@angular/forms';
import { DATEPICKER_DIRECTIVES } from '../../ExternalLibraries/datepicker/datepicker';
import *as moment from 'moment';
import {TimepickerComponent} from '../../ExternalLibraries/timepicker/timepicker.component';
import { ValidateService } from '../../Models/Validation/validation.service';

@Component({
    selector: 'DateTimeSearchComponent',
    templateUrl: 'app/Framework/Views/Search/datetime.component.html',
    inputs: ['fieldObject'],
    directives: [DATEPICKER_DIRECTIVES, TimepickerComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, Validation],
    styleUrls: ['app/Framework/Views/Search/searchFields.css'],
    providers: [Delimeter, ValidateService]
})

export class DateTimeSearchComponent implements OnInit {
    public selectedDateValue: any;
    public selectedDateValue2: any;
    public limeter: Delimeter;
    public displayStyle: string = "none";
    public displayStyle2: string = "none";
    public showDiv: string = "none";
    public dt: Date = new Date();
    public dt2: Date = new Date();
    public isdisable: boolean = true;
    public show: boolean = true;
    public minDate: Date = void 0;
    public minDate2: Date = void 0;
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
    public ismeridian: boolean = true;
    singleQ = "ô";
    public dropDownValue = "";
    public fieldtext1 = "";
    public fieldtext2 = "";
    public DatetimeTextBox = "";
    public DatetimeTextBox2 = "";
    public readOnly = false;

    public mytime: Date = new Date();
    public fieldObject: IField;
    fieldObject2: IField;
    hasValue = false;
    hasValue2 = false;
    @Input() disableDates: Array<string> = [];

    public options: any = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30],
        sstep: [1, 2, 3, 4, 5, 6]
    };
    public dateOptions: any = {
        formatYear: 'YYYY',
        startingDay: 1
    };
    @Input() validationData;
    dropdownForText: any = [{ Id: "", Value: "--Select--" }, { Id: "Ç", Value: "Equal to" }, { Id: "ü", Value: "Greater than" }, { Id: "é", Value: "Less than" }, { Id: "æ", Value: "Between" }];

    ngOnInit() {
        this.fieldObject2 = JSON.parse(JSON.stringify(this.fieldObject));
        this.fieldObject2.FieldId = this.fieldObject.FieldId +20000;
        if (this.fieldObject.FieldValue == undefined)
        {
            this.fieldObject.FieldValue = "";
            this.selectedDateValue = this.fieldObject.FieldValue;
            this.selectedDateValue2 = this.fieldObject.FieldValue;
        }
        if (this.fieldObject.FieldValue.length > 0) {
            let arr: any[];
            arr = this.fieldObject.FieldValue.split(" ");
            this.hour = Number(arr[3].split(":")[0]);
            this.minute = Number(arr[3].split(":")[1]);
            this.mytime = new Date(1990, 1, 1, this.hour, this.minute);
        }
        else {
            this.mytime = new Date();
        }
        this.selectedDateValue = this.fieldObject.FieldValue;

        if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue.indexOf(this.limeter.ColumnDelimeter) <= -1) {
            if (this.fieldObject.FieldValue.indexOf(this.limeter.TypeDelimeter) > -1) {
                var arr1 = this.fieldObject.FieldValue.split(this.limeter.TypeDelimeter);
                this.fieldtext1 = arr1[0];
                if (arr1[1] == ">")
                    this.dropDownValue = "ü";
                else if (arr1[1] == "=")
                    this.dropDownValue = "Ç";
                else if (arr1[1] == "<")
                    this.dropDownValue = "é";
                else if (arr1[1] == "Between")
                    this.dropDownValue = "æ";
            }
            else {
                this.dropDownValue = "";
                this.readOnly = true;
                this.DatetimeTextBox = this.DatetimeTextBox2 = this.fieldObject.FieldValue = "";
                this.fieldtext1 = this.fieldObject.FieldValue;
            }
            if (this.dropDownValue == "æ")
                this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ  + this.selectedDateValue2 + this.singleQ;
        else
            this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ;

        }
        else {
            this.dropDownValue = "";
            this.readOnly = true;
            this.DatetimeTextBox = this.DatetimeTextBox2 = this.fieldObject.FieldValue = "";
        }
       
    }
    public constructor(limeter: Delimeter,private _validateService: ValidateService) {
        this.limeter = limeter;
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 4300);
        (this.minDate2 = new Date()).setDate(this.minDate2.getDate() - 4300);
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }
    onchange() {
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
        console.log('Time changed to: ' + this.mytime);
    };

    public clear(): void {
        this.mytime = void 0;
        this.dt = void 0;
    };

    public getDate(): number {
        return this.dt && this.dt.getTime() || new Date().getTime();
    }
    public today(): void {

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
        this.dt2 = new Date(this.minDate2.valueOf());
    }

    datetimepickertoggle() {
        if (this.displayStyle == "none") {
            this.displayStyle = "block";
        }
        else if (this.displayStyle == "block") {
            this.displayStyle = "none";
        }
    }

    datetimepickertoggle2() {
        if (this.displayStyle2 == "none") {
            this.displayStyle2 = "block";
        }
        else if (this.displayStyle2 == "block") {
            this.displayStyle2 = "none";
        }
    }

    getSelectedValue(dt) {
        let h: number;
        let m: number;
        let s: number;
        let meridian: string;
        if (this.mytime.getHours() > 12) {
            meridian = "pm";
            h = this.mytime.getHours() % 12;
        }
        else {
            meridian = "am";
            if (this.mytime.getHours() == 12) {
                h = 12;
            }
            else {
                h = this.mytime.getHours();
            }
        }
        m = this.mytime.getMinutes();
        s = this.mytime.getSeconds();
        let dateformat = new Date(dt);
        let arr: any[];
        arr = dateformat.toDateString().split(" ");
        this.selectedDateValue = this.getformattedDataTimeonSelection(dt);
        this.fieldObject.FieldValue = this.selectedDateValue;
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(contextObj.fieldObject.FieldId.toString());
        setTimeout(function () {
            contextObj._validateService.initiateValidation(contextObj.fieldObject, contextObj, true, el);
            if (contextObj.dropDownValue == "æ") {
                if (contextObj.fieldObject.HasValidationError == false) {
                    contextObj.hasValue = true;
                }
                else {
                    contextObj.hasValue = false;
                }
                if (contextObj.hasValue == true && contextObj.hasValue2 == true) {
                    contextObj.fieldObject.HasValidationError = false;
                }
                else {
                    contextObj.fieldObject.HasValidationError = true;
                }
            }
        }, 100);

        if (this.dropDownValue == "æ")
            this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ + this.selectedDateValue2 + this.singleQ;
        else
            this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ;
    }

    getSelectedValue2(dt) {
        let h: number;
        let m: number;
        let s: number;
        let meridian: string;
        if (this.mytime.getHours() > 12) {
            meridian = "pm";
            h = this.mytime.getHours() % 12;
        }
        else {
            meridian = "am";
            if (this.mytime.getHours() == 12) {
                h = 12;
            }
            else {
                h = this.mytime.getHours();
            }
        }
        m = this.mytime.getMinutes();
        s = this.mytime.getSeconds();
        let dateformat = new Date(dt);
        let arr: any[];
        arr = dateformat.toDateString().split(" ");
        this.selectedDateValue2 = this.getformattedDataTimeonSelection(dt);
        this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ + this.selectedDateValue2 + this.singleQ;  
        this.fieldObject2.FieldValue = this.selectedDateValue2;
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(contextObj.fieldObject2.FieldId.toString());
        setTimeout(function () {
            contextObj._validateService.initiateValidation(contextObj.fieldObject2, contextObj, true, el);
            if (contextObj.fieldObject2.HasValidationError == false) {
                contextObj.hasValue2 = true;
            }
            else {
                contextObj.hasValue2 = false;
            }
            if (contextObj.hasValue == true && contextObj.hasValue2 == true) {
                contextObj.fieldObject.HasValidationError = false;
            }
            else {
                contextObj.fieldObject.HasValidationError = true;
            }
        }, 100);
    }

    drpDwnChange(value) {
        this.hasValue = false;
        this.hasValue2 = false;
        if (value == "") {
            this.readOnly = true;
            this.isdisable = true;
            this.selectedDateValue = "";
            this.fieldObject.IsMandatory = false;
            this.fieldObject.IsLocallyValidated = true;
            this.fieldObject2.IsMandatory = false;
            this.fieldObject2.IsLocallyValidated = true;

        }
        else {
            this.readOnly = false;
            this.isdisable = false;
            this.selectedDateValue = "";
            this.fieldObject.IsMandatory = true;
            this.fieldObject.IsLocallyValidated = false;
            this.fieldObject2.IsMandatory = true;
            this.fieldObject2.IsLocallyValidated = false;
        }
        if (value == "æ") {
            this.show = false;
            this.selectedDateValue2 = "";
            this.fieldObject.FieldValue = "";
            this.fieldObject2.FieldValue = "";
            var contextObj = this;
            var el1 = <HTMLElement>document.getElementById(contextObj.fieldObject2.FieldId.toString());
            setTimeout(function () {
                contextObj._validateService.initiateValidation(contextObj.fieldObject2, contextObj, true, el1);
            }, 100);
            //this.fieldObject.FieldValue = value + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ + this.selectedDateValue2 + this.singleQ ;
        }
        else {
            this.show = true;
            this.fieldObject.FieldValue = "";
            //this.fieldObject.FieldValue = value + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ;
        }
        this.dropDownValue = value;
        if (value == "") {
            this.fieldObject.FieldValue = "";
        }
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(contextObj.fieldObject.FieldId.toString());
        setTimeout(function () {
            contextObj._validateService.initiateValidation(contextObj.fieldObject, contextObj, true, el);
        }, 100);
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
        strDate = dd + " " + mon + " " + yy + " " + hour + ":" + min + " " + meridian;
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
        strDate = dd + " " + mon + " " + yy + " " + hour + ":" + min + " " + meridian;
        return strDate;
    }
} 
