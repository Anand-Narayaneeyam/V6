import {Component, Input} from '@angular/core';
import {IField} from '../../Models/Interface/IField';
import {Validation} from '../Validation/validate.directive';
import {Delimeter} from '../../../Models/Common/General';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import *as moment from 'moment';
import { DATEPICKER_DIRECTIVES } from '../../ExternalLibraries/datepicker/datepicker';
import { ValidateService } from '../../Models/Validation/validation.service';

@Component({
    selector: 'DateSearchComponent',
    templateUrl: 'app/Framework/Views/Search/date.component.html',
    inputs: ['fieldObject'],
    directives: [Validation, DATEPICKER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    styleUrls: ['app/Framework/Views/Search/searchFields.css'],
    providers: [Delimeter, ValidateService]
})

export class DateSearchComponent {
    public fieldObject: IField;
    public limeter: Delimeter;
    public show = true;
    public isdisable = true;
    public readOnly = false;
    @Input() fieldId: number;
    @Input() fieldName: string;
    @Input() fieldValue: string;
    @Input() disableDates: Array<string> = [];
    public dropDownValue = "";
    dropdownForText: any = [{ Id: "", Value: "--Select--" }, { Id: "Ç", Value: "Equal to" }, { Id: "ü", Value: "Greater than" }, { Id: "é", Value: "Less than" }, { Id: "æ", Value: "Between" }]
    singleQ = "ô";
    public imgSource: string;
    public selectedDateValue: any;
    public selectedDateValue2: any;
    public displayStyle: string = "none";
    public displayStyle2: string = "none";
    public dt: Date = new Date();
    public dt2: Date = new Date();
    public minDate: Date = void 0;
    public events: Array<any>;
    public tomorrow: Date;
    public afterTomorrow: Date;
    public formats: Array<string> = ['DD MMM YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    public format: string = this.formats[0];
    public dateOptions: any = {
        formatYear: 'YYYY',
        startingDay: 1
    };
    fieldObject2: IField;
    hasValue = false;
    hasValue2 = false;
    private opened: boolean = false;
    @Input() validationData;



    ngOnInit() {
        this.fieldObject2 = JSON.parse(JSON.stringify(this.fieldObject));
        this.fieldObject2.FieldId = this.fieldObject.FieldId + 20000;
        if (this.fieldObject.FieldValue == undefined) {
            this.fieldObject.FieldValue = "";
            this.selectedDateValue = this.fieldObject.FieldValue;
            this.selectedDateValue2 = this.fieldObject.FieldValue;
        }
        if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue.indexOf(this.limeter.ColumnDelimeter) <= -1) {
            if (this.fieldObject.FieldValue.indexOf(this.limeter.TypeDelimeter) > -1) {
                var arr1 = this.fieldObject.FieldValue.split(this.limeter.TypeDelimeter);
                this.selectedDateValue = arr1[0];
                this.isdisable = false;
                if (arr1[1] == ">")
                    this.dropDownValue = "ü";
                else if (arr1[1] == "=")
                    this.dropDownValue = "Ç";
                else if (arr1[1] == "<")
                    this.dropDownValue = "é";
                else if (arr1[1] == "Between") {
                    var arr2 = arr1[0].split(',');
                    this.selectedDateValue = arr2[0];
                    this.selectedDateValue2 = arr2[1];
                    this.show = false;
                    this.dropDownValue = "æ";
                }

                if (this.dropDownValue == "æ")
                    this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ + this.selectedDateValue2 + this.singleQ;
                else
                    this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ;

            } else {
                var tempOperator = this.fieldObject.FieldValue.split("ǂ")[1];
                this.dropDownValue = "";
                this.readOnly = true;

               // this.selectedDateValue = this.selectedDateValue2 = this.fieldObject.FieldValue = "";
              
                this.selectedDateValue = this.fieldObject.FieldValue;
            }
        }else {
            this.dropDownValue = "";
            this.readOnly = true;
            this.selectedDateValue = this.selectedDateValue2 = this.fieldObject.FieldValue = "";
        }
    }


    public constructor(limeter: Delimeter, private _validateService: ValidateService) {
        this.limeter = limeter;
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 43000);
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }

    drpDwnChange(value) {
        debugger
        if (value == "") {
            this.readOnly = true;
            this.isdisable = true;
            this.selectedDateValue = "";
            this.selectedDateValue2 = "";
            this.fieldObject.IsMandatory = false;
            this.fieldObject.IsLocallyValidated = true;
            this.fieldObject2.IsMandatory = false;
            this.fieldObject2.IsLocallyValidated = true;
        }
        else {
            this.readOnly = false;
            this.isdisable = false;
            this.selectedDateValue = "";
            this.selectedDateValue2 = "";
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
            //this.fieldObject.FieldValue = value + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ + this.selectedDateValue2 + this.singleQ;
        }
        else {
            this.show = true;
            this.fieldObject.FieldValue = "";
            //this.fieldObject.FieldValue = value + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ;
        }
        this.dropDownValue = value;
        if (value == "")
        {
            this.fieldObject.FieldValue = "";
        }
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(contextObj.fieldObject.FieldId.toString());
        setTimeout(function () {
            contextObj._validateService.initiateValidation(contextObj.fieldObject, contextObj, true, el);
        }, 100);
    }

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

    public clear(): void {
        this.dt = void 0;
    }

    public toggleMin(): void {
        this.dt = new Date(this.minDate.valueOf());
    }

    datepickertoggle() {
        if (this.displayStyle == "none") {
            this.displayStyle = "block";
        }
        else if (this.displayStyle == "block") {
            this.displayStyle = "none";
        }
    }
    datepickertoggle2() {
        if (this.displayStyle2 == "none") {
            this.displayStyle2 = "block";
        }
        else if (this.displayStyle2 == "block") {
            this.displayStyle2 = "none";
        }
    }
    datePickerClick(event, id) {
        if (event.keyCode == 8)
            event.preventDefault();
        if (id == 1 && event.keyCode == 13) {
            this.datepickertoggle();

        } else if (id == 2 && event.keyCode == 13) {
            this.datepickertoggle2();
        }

    }
    getSelectedValue(dt) {
        let dateformat = new Date(dt);
        let arr: any[];
        arr = dateformat.toDateString().split(" ");
        this.fieldObject.FieldValue = arr[2] + " " + arr[1] + " " + arr[3];
        this.selectedDateValue = arr[2] + " " + arr[1] + " " + arr[3];

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

        console.log(this.fieldObject.FieldValue);
    }

    getSelectedValue2(dt) {
        let dateformat = new Date(dt);
        let arr: any[];
        arr = dateformat.toDateString().split(" ");
        this.fieldObject.FieldValue = arr[2] + " " + arr[1] + " " + arr[3];
        this.selectedDateValue2 = arr[2] + " " + arr[1] + " " + arr[3];
        this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ + this.selectedDateValue2 + this.singleQ;
        console.log(this.fieldObject.FieldValue);
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

} 