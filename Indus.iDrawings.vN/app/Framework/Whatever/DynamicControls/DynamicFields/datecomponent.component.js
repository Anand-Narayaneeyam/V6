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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var moment = require('moment');
var datepicker_1 = require('../../../ExternalLibraries/datepicker/datepicker');
var validate_directive_1 = require('../../Validation/validate.directive');
//import { NotificationService } from '../../../Models/Notification/notify.service';
var DateComponent = (function () {
    function DateComponent(renderer) {
        this.renderer = renderer;
        this.displayStyle = "none";
        this.showDiv = "none";
        this.dt = new Date();
        this.minDate = void 0;
        this.formats = ['DD MMM YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
        this.format = this.formats[0];
        this.dateOptions = {
            formatYear: 'YYYY',
            startingDay: 1
        };
        this.opened = false;
        this.disableDates = [];
        this.showDateOnLoad = false; /*set input true if current date value should be shown on page load*/
        this.datepickerOut = new core_1.EventEmitter();
        this.dateIconClick = new core_1.EventEmitter();
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 43000); /*set year limit JN*/
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }
    DateComponent.prototype.ngOnInit = function () {
        if (this.isClearDateValue == undefined || this.isClearDateValue == null)
            this.isClearDateValue = true;
        if (this.SetAlignment == "horizontal") {
            this.setAlignment = "inline-flex";
        }
        else {
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
                    var dateformat = new Date();
                    var arr = void 0;
                    arr = dateformat.toDateString().split(" ");
                    this.selectedDateValue = arr[2] + " " + arr[1] + " " + arr[3];
                    this.fieldObject.FieldValue = this.selectedDateValue;
                }
            }
            else {
                if (this.showDateOnLoad == true) {
                    var dateformat = new Date();
                    var arr = void 0;
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
    };
    DateComponent.prototype.ngOnChanges = function () {
        if (this.fieldObject.FieldValue == null) {
        }
        if (this.fieldObject.FieldValue != null) {
        }
    };
    DateComponent.prototype.ngDoCheck = function () {
        if (this.fieldObject.FieldValue == null) {
            this.selectedDateValue = "";
        }
    };
    DateComponent.prototype.getChangedValue = function (event) {
        this.fieldObject.FieldValue = event;
    };
    DateComponent.prototype.getKeyPress = function (event) {
        if (event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 32 && event.keyCode != 27) {
            event.target.value = "";
            event.preventDefault();
        }
        else if (event.keyCode == 13) {
            event.preventDefault();
            this.datetoggle();
        }
    };
    DateComponent.prototype.handleKeyboardEvents = function (e) {
        if (!e)
            e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '27') {
            if (this.displayStyle == "block") {
                this.displayStyle = "none";
                this.showDiv = "none";
            }
        }
    };
    DateComponent.prototype.getkeydown = function (event) {
        if (this.isClearDateValue == false) {
            if (event.keyCode != 9 && event.keyCode != 13) {
                event.preventDefault();
            }
        }
        else {
            if (event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 8) {
                console.log('this.fieldObject.FieldValue', this.fieldObject.FieldValue);
                //this.fieldObject.FieldValue = this.fieldObject.FieldValue
                event.preventDefault();
            }
        }
        //end of code for bug 80022
    };
    DateComponent.prototype.cleardata = function (event) {
        event.target.value = "";
        this.fieldObject.FieldValue = "";
    };
    DateComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    DateComponent.prototype.today = function () {
        /*this.dt = new Date();*/
    };
    DateComponent.prototype.d20090824 = function () {
        this.dt = moment('2009-08-24', 'YYYY-MM-DD').toDate();
    };
    DateComponent.prototype.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
            for (var i = 0; i < this.events.length; i++) {
                var currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);
                if (dayToCheck === currentDay) {
                    return this.events[i].status;
                }
            }
        }
        return '';
    };
    DateComponent.prototype.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };
    DateComponent.prototype.open = function () {
        this.opened = !this.opened;
    };
    DateComponent.prototype.clear = function () {
        this.dt = void 0;
    };
    DateComponent.prototype.toggleMin = function () {
        this.dt = new Date(this.minDate.valueOf());
    };
    DateComponent.prototype.datetoggle = function () {
        if (this.displayStyle == "none") {
            this.displayStyle = "block";
            this.showDiv = "block";
        }
        else if (this.displayStyle == "block") {
            this.displayStyle = "none";
            this.showDiv = "none";
        }
        this.dateIconClick.emit({});
    };
    DateComponent.prototype.hideDatepicker = function () {
        this.displayStyle = "none";
        this.showDiv = "none";
    };
    DateComponent.prototype.getSelectedValue = function (dt, event) {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
        var elem = document.getElementById("txtDate");
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
    };
    DateComponent.prototype.getFormattedDate = function (dt) {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DateComponent.prototype, "readonlymode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DateComponent.prototype, "disableDates", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DateComponent.prototype, "labelwidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateComponent.prototype, "SetAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DateComponent.prototype, "isClearDateValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DateComponent.prototype, "showDateOnLoad", void 0);
    __decorate([
        /*set input true if current date value should be shown on page load*/ core_1.Input(), 
        __metadata('design:type', Object)
    ], DateComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DateComponent.prototype, "datepickerOut", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DateComponent.prototype, "dateIconClick", void 0);
    __decorate([
        core_1.ViewChild('txtDate'), 
        __metadata('design:type', core_1.ElementRef)
    ], DateComponent.prototype, "input", void 0);
    DateComponent = __decorate([
        core_1.Component({
            selector: 'DateComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/datecomponent.component.html',
            inputs: ['fieldObject'],
            directives: [datepicker_1.DATEPICKER_DIRECTIVES, common_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES, validate_directive_1.Validation],
            styleUrls: ['app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            providers: [],
            host: {
                '(document:keydown)': 'handleKeyboardEvents($event)'
            }
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], DateComponent);
    return DateComponent;
}());
exports.DateComponent = DateComponent;
//# sourceMappingURL=datecomponent.component.js.map