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
var datepicker_1 = require('../../../ExternalLibraries/datepicker/datepicker');
var moment = require('moment');
var timepicker_component_1 = require('../../../ExternalLibraries/timepicker/timepicker.component');
var validate_directive_1 = require('../../Validation/validate.directive');
var TimeComponent = (function () {
    function TimeComponent(renderer) {
        this.renderer = renderer;
        this.displayStyle = "none";
        this.showDiv = "none";
        this.dt = new Date();
        this.minDate = void 0;
        this.formats = ['DD MMM YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
        this.format = this.formats[0];
        this.opened = false;
        this.hstep = 1;
        this.mstep = 1;
        this.sstep = 1;
        this.ismeridian = true;
        this.mytime = new Date();
        this.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30],
            sstep: [1, 2, 3, 4, 5, 6]
        };
        this.dateOptions = {
            formatYear: 'YYYY',
            startingDay: 1
        };
        this.showDateTimeOnLoad = false; /*set input true if current date time value should be shown on page load*/
        this.IsCard = false;
        this.timepickerOut = new core_1.EventEmitter();
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 43000);
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }
    TimeComponent.prototype.ngOnInit = function () {
        if (this.IsCard == true) {
            if (this.fieldObject.FieldValue != undefined) {
                if (this.fieldObject.FieldValue.includes("M")) {
                    //var strDate = this.fieldObject.FieldValue.split("T")[0];
                    var strTime = this.fieldObject.FieldValue; /*.split("T")[1]*/
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
    };
    TimeComponent.prototype.ngAfterViewChecked = function () {
        //if (this.fieldObject.FieldValue != undefined) {
        //    this.fieldObject.FieldValue = JSON.parse(JSON.stringify(this.fieldObject.FieldValue));
        //}
        if (this.showDateTimeOnLoad == true) {
            if (this.fieldObject.FieldValue == "") {
                this.selectedDateValue = this.getformattedDataTime("");
                this.fieldObject.FieldValue = this.selectedDateValue;
            }
        }
        else if (this.fieldObject.FieldValue != "" && this.fieldObject.FieldValue != this.selectedDateValue) {
            if (this.fieldObject.FieldValue.includes("T")) {
            }
            else {
                this.selectedDateValue = this.fieldObject.FieldValue;
                var updatedvalue = new Date("01 Jan 1900 " + this.selectedDateValue);
                if (updatedvalue && !isNaN(updatedvalue.getTime()))
                    this.mytime = updatedvalue;
            }
        }
    };
    TimeComponent.prototype.onchange = function () {
    };
    TimeComponent.prototype.getKeyPress = function (event) {
        if (event.keyCode != 9 && event.keyCode != 13 && event.keyCode != 27) {
            event.target.value = "";
            this.fieldObject.FieldValue = "";
            event.preventDefault();
        }
        else if (event.keyCode == 13) {
            event.preventDefault();
            this.datetimepickertoggle();
        }
    };
    TimeComponent.prototype.handleKeyboardEvents = function (e) {
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
    TimeComponent.prototype.toggleMode = function () {
        this.ismeridian = !this.ismeridian;
    };
    ;
    TimeComponent.prototype.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        d.setSeconds(0);
        this.mytime = d;
    };
    ;
    TimeComponent.prototype.changed = function () {
        /*Time changed to: this.mytime*/
    };
    ;
    TimeComponent.prototype.clear = function () {
        this.mytime = void 0;
        this.dt = void 0;
    };
    ;
    TimeComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    TimeComponent.prototype.today = function () {
        /*this.dt = new Date();*/
    };
    TimeComponent.prototype.d20090824 = function () {
        this.dt = moment('2009-08-24', 'YYYY-MM-DD').toDate();
    };
    TimeComponent.prototype.getDayClass = function (date, mode) {
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
    TimeComponent.prototype.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };
    TimeComponent.prototype.open = function () {
        this.opened = !this.opened;
    };
    TimeComponent.prototype.toggleMin = function () {
        this.dt = new Date(this.minDate.valueOf());
    };
    TimeComponent.prototype.datetimepickertoggle = function () {
        if (this.displayStyle == "none") {
            this.displayStyle = "block";
            this.showDiv = "block";
        }
        else if (this.displayStyle == "block") {
            this.displayStyle = "none";
            this.showDiv = "none";
        }
        document.getElementById(this.fieldObject.ReportFieldId.toString()).focus();
    };
    TimeComponent.prototype.getBlurEvent = function (event) {
        if (event.srcElement.value == "") {
            this.fieldObject.FieldValue = "";
        }
        if (event.srcElement.value.length <= 20) {
            this.fieldObject.FieldValue = event.srcElement.value;
        }
    };
    TimeComponent.prototype.getSelectedValue = function (dt) {
        this.selectedDateValue = this.getformattedDataTimeonSelection(dt);
        this.fieldObject.FieldValue = this.selectedDateValue;
        this.timepickerOut.emit({
            fieldObj: this.fieldObject
        });
        var elem = document.getElementById("txtDateTime");
        if (elem) {
            elem.value = this.selectedDateValue;
        }
        document.getElementById(this.fieldObject.ReportFieldId.toString()).focus();
        if (event.srcElement.className == "btn btn-default btn-sm" || event.srcElement.parentElement.className == "btn btn-default btn-sm") {
            this.displayStyle = "none";
            this.showDiv = "none";
        }
    };
    TimeComponent.prototype.getChangedVal = function (event) {
        console.log(event);
    };
    TimeComponent.prototype.getformattedDataTime = function (dt) {
        var strDate = "";
        var date;
        var time;
        var hh;
        var hour;
        var min;
        var meridian;
        var dd;
        if (dt) {
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
            meridian = "PM";
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
    };
    TimeComponent.prototype.getformattedDataTimeonSelection = function (dt) {
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
            meridian = "PM";
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimeComponent.prototype, "readonlymode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TimeComponent.prototype, "labelwidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TimeComponent.prototype, "SetAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TimeComponent.prototype, "validationData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimeComponent.prototype, "showDateTimeOnLoad", void 0);
    __decorate([
        /*set input true if current date time value should be shown on page load*/ core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TimeComponent.prototype, "IsCard", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TimeComponent.prototype, "timepickerOut", void 0);
    __decorate([
        core_1.ViewChild('txtDateTime'), 
        __metadata('design:type', core_1.ElementRef)
    ], TimeComponent.prototype, "input", void 0);
    TimeComponent = __decorate([
        core_1.Component({
            selector: 'TimeComponent',
            templateUrl: 'app/Framework/Views/DynamicControls/DynamicFields/timecomponent.component.html',
            inputs: ['fieldObject'],
            directives: [datepicker_1.DATEPICKER_DIRECTIVES, timepicker_component_1.TimepickerComponent, common_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES, validate_directive_1.Validation],
            styleUrls: ['node_modules/bootstrap/dist/css/bootstrap.css', 'app/Framework/Views/DynamicControls/DynamicFields/componentstyles.css'],
            host: {
                '(document:keydown)': 'handleKeyboardEvents($event)'
            }
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], TimeComponent);
    return TimeComponent;
}());
exports.TimeComponent = TimeComponent;
//# sourceMappingURL=timecomponent.component.js.map