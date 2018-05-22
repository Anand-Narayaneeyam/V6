import {Component, Input, OnInit, Output, EventEmitter, Renderer, ViewChild, ViewChildren, ElementRef, DoCheck, OnChanges, SimpleChange} from '@angular/core';
import {IField} from '../../../Models/Interface/IField'
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import *as moment from 'moment';
import { DATEPICKER_DIRECTIVES } from '../../../ExternalLibraries/datepicker/datepicker';
import {Validation} from '../../Validation/validate.directive';
import { Notification} from '../../../Whatever/Notification/notify.component';
//import { NotificationService } from '../../../Models/Notification/notify.service';

@Component({
    selector: 'DateComponent',
    templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/datecomponent.component.html',
    inputs: ['fieldObject'],
    directives: [DATEPICKER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, Validation],
    styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
    providers: [],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
})

export class DateComponent implements OnInit, DoCheck, OnChanges {

    public imgSource: string;
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
    public setAlignment: string;
    public dateOptions: any = {
        formatYear: 'YYYY',
        startingDay: 1
    };
    private opened: boolean = false;
    public fieldObject: IField;
    public labelWidth: string;
    public fieldWidth: string;
    @Input() readonlymode: boolean;
    @Input() disableDates: Array<string> = [];
    @Input() labelwidth: number;
    @Input() SetAlignment: string;
    @Input() isClearDateValue: boolean;
    @Input() showDateOnLoad: boolean = false; /*set input true if current date value should be shown on page load*/
    @Input() validationData;
    @Output() datepickerOut = new EventEmitter<IdateComp>();
    @Output() dateIconClick = new EventEmitter();
    @ViewChild('txtDate') input: ElementRef;


    public constructor(private renderer: Renderer) {
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 43000); /*set year limit JN*/
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }

    ngOnInit() {
        if (this.isClearDateValue == undefined || this.isClearDateValue == null)
            this.isClearDateValue = true;
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
        if (this.fieldObject.FieldValue == null || this.fieldObject.FieldValue.toString() == "undefined" || this.fieldObject.FieldValue == "" || this.fieldObject.FieldValue == undefined) {
            if (this.fieldObject.IsMandatory == true) {
                if (this.showDateOnLoad == false) {
                    this.selectedDateValue = "";
                }
                else {
                    let dateformat = new Date();
                    let arr: any[];
                    arr = dateformat.toDateString().split(" ");
                    this.selectedDateValue = arr[2] + " " + arr[1] + " " + arr[3];
                    this.fieldObject.FieldValue = this.selectedDateValue;
                }
            }
            else {
                if (this.showDateOnLoad == true) {
                    let dateformat = new Date();
                    let arr: any[];
                    arr = dateformat.toDateString().split(" ");
                    this.selectedDateValue = arr[2] + " " + arr[1] + " " + arr[3];
                    this.fieldObject.FieldValue = this.selectedDateValue;
                }
                else {
                    this.fieldObject.FieldValue = "";
                    this.selectedDateValue = "";
                }
            }
        }
        else {
            var d = new Date(this.fieldObject.FieldValue);
            if (d != null || d != undefined) {
                this.fieldObject.FieldValue = this.getFormattedDate(d);
                this.selectedDateValue = this.getFormattedDate(d);
                this.dt = d;
            }
        }
    }

    ngOnChanges() {

        if (this.fieldObject.FieldValue == null) {
        }
        if (this.fieldObject.FieldValue != null) {
        }
    }


    ngDoCheck() {
        if (this.fieldObject.FieldValue == null) {
            this.selectedDateValue = "";
        }
    }


    getChangedValue(event) {
        this.fieldObject.FieldValue = event;
    }

    getKeyPress(event) {

        if (event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 32 && event.keyCode != 27) {
            event.target.value = "";
            event.preventDefault();
        }
        else if (event.keyCode == 13) {
            event.preventDefault();
            this.datetoggle();

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
    getkeydown(event) {
        if (this.isClearDateValue == false) {
            if (event.keyCode != 9 && event.keyCode != 13) {
                event.preventDefault();
            }
        }
        //bug 80022
        else {
            if (event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 8) {
                console.log('this.fieldObject.FieldValue', this.fieldObject.FieldValue)
                //this.fieldObject.FieldValue = this.fieldObject.FieldValue
                event.preventDefault();
            }
        }
        //end of code for bug 80022
    }
    cleardata(event) {
        event.target.value = "";
        this.fieldObject.FieldValue = "";
    }

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

    public clear(): void {
        this.dt = void 0;
    }

    public toggleMin(): void {
        this.dt = new Date(this.minDate.valueOf());
    }

    datetoggle() {
        if (this.displayStyle == "none") {
            this.displayStyle = "block";
            this.showDiv = "block";
        }
        else if (this.displayStyle == "block") {
            this.displayStyle = "none";
            this.showDiv = "none";
        }
        this.dateIconClick.emit({});
    }

    hideDatepicker() {
        this.displayStyle = "none";
        this.showDiv = "none";
    }

    getSelectedValue(dt, event) {

        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
        var elem = <HTMLInputElement>document.getElementById("txtDate");
        if (elem) {
            elem.focus();
        }
        this.selectedDateValue = this.getFormattedDate(dt);
        this.fieldObject.FieldValue = this.getFormattedDate(dt);
        if (this.fieldObject.FieldValue != null || this.fieldObject.FieldValue != undefined || this.fieldObject.FieldValue != "") {
            this.datepickerOut.emit({
                FieldObject: this.fieldObject
            });
        }

        var isFirefox = /Firefox/.test(navigator.userAgent);

        if (isFirefox == true) {

            if (event.target.className == "btn btn-default btn-sm" || event.target.parentElement.className == "btn btn-default btn-sm") {
                this.displayStyle = "none";
                this.showDiv = "none";
            }
        }
        else {
            if (event.srcElement.className == "btn btn-default btn-sm" || event.srcElement.parentElement.className == "btn btn-default btn-sm") {
                this.displayStyle = "none";
                this.showDiv = "none";
            }
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
}


export interface IdateComp {
    FieldObject: IField;
}

