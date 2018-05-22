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
var validate_directive_1 = require('../Validation/validate.directive');
var General_1 = require('../../../Models/Common/General');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var datepicker_1 = require('../../ExternalLibraries/datepicker/datepicker');
var moment = require('moment');
var timepicker_component_1 = require('../../ExternalLibraries/timepicker/timepicker.component');
var validation_service_1 = require('../../Models/Validation/validation.service');
var DateTimeSearchComponent = (function () {
    function DateTimeSearchComponent(limeter, _validateService) {
        this._validateService = _validateService;
        this.displayStyle = "none";
        this.displayStyle2 = "none";
        this.showDiv = "none";
        this.dt = new Date();
        this.dt2 = new Date();
        this.isdisable = true;
        this.show = true;
        this.minDate = void 0;
        this.minDate2 = void 0;
        this.formats = ['DD MMM YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
        this.format = this.formats[0];
        this.opened = false;
        this.hstep = 1;
        this.mstep = 1;
        this.sstep = 1;
        this.ismeridian = true;
        this.singleQ = "ô";
        this.dropDownValue = "";
        this.fieldtext1 = "";
        this.fieldtext2 = "";
        this.DatetimeTextBox = "";
        this.DatetimeTextBox2 = "";
        this.readOnly = false;
        this.mytime = new Date();
        this.hasValue = false;
        this.hasValue2 = false;
        this.disableDates = [];
        this.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30],
            sstep: [1, 2, 3, 4, 5, 6]
        };
        this.dateOptions = {
            formatYear: 'YYYY',
            startingDay: 1
        };
        this.dropdownForText = [{ Id: "", Value: "--Select--" }, { Id: "Ç", Value: "Equal to" }, { Id: "ü", Value: "Greater than" }, { Id: "é", Value: "Less than" }, { Id: "æ", Value: "Between" }];
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
    DateTimeSearchComponent.prototype.ngOnInit = function () {
        this.fieldObject2 = JSON.parse(JSON.stringify(this.fieldObject));
        this.fieldObject2.FieldId = this.fieldObject.FieldId + 20000;
        if (this.fieldObject.FieldValue == undefined) {
            this.fieldObject.FieldValue = "";
            this.selectedDateValue = this.fieldObject.FieldValue;
            this.selectedDateValue2 = this.fieldObject.FieldValue;
        }
        if (this.fieldObject.FieldValue.length > 0) {
            var arr = void 0;
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
                this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ + this.selectedDateValue2 + this.singleQ;
            else
                this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ;
        }
        else {
            this.dropDownValue = "";
            this.readOnly = true;
            this.DatetimeTextBox = this.DatetimeTextBox2 = this.fieldObject.FieldValue = "";
        }
    };
    DateTimeSearchComponent.prototype.onchange = function () {
    };
    DateTimeSearchComponent.prototype.toggleMode = function () {
        this.ismeridian = !this.ismeridian;
    };
    ;
    DateTimeSearchComponent.prototype.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        d.setSeconds(0);
        this.mytime = d;
    };
    ;
    DateTimeSearchComponent.prototype.changed = function () {
        console.log('Time changed to: ' + this.mytime);
    };
    ;
    DateTimeSearchComponent.prototype.clear = function () {
        this.mytime = void 0;
        this.dt = void 0;
    };
    ;
    DateTimeSearchComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    DateTimeSearchComponent.prototype.today = function () {
    };
    DateTimeSearchComponent.prototype.d20090824 = function () {
        this.dt = moment('2009-08-24', 'YYYY-MM-DD').toDate();
    };
    DateTimeSearchComponent.prototype.getDayClass = function (date, mode) {
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
    DateTimeSearchComponent.prototype.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };
    DateTimeSearchComponent.prototype.open = function () {
        this.opened = !this.opened;
    };
    DateTimeSearchComponent.prototype.toggleMin = function () {
        this.dt = new Date(this.minDate.valueOf());
        this.dt2 = new Date(this.minDate2.valueOf());
    };
    DateTimeSearchComponent.prototype.datetimepickertoggle = function () {
        if (this.displayStyle == "none") {
            this.displayStyle = "block";
        }
        else if (this.displayStyle == "block") {
            this.displayStyle = "none";
        }
    };
    DateTimeSearchComponent.prototype.datetimepickertoggle2 = function () {
        if (this.displayStyle2 == "none") {
            this.displayStyle2 = "block";
        }
        else if (this.displayStyle2 == "block") {
            this.displayStyle2 = "none";
        }
    };
    DateTimeSearchComponent.prototype.getSelectedValue = function (dt) {
        var h;
        var m;
        var s;
        var meridian;
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
        var dateformat = new Date(dt);
        var arr;
        arr = dateformat.toDateString().split(" ");
        this.selectedDateValue = this.getformattedDataTimeonSelection(dt);
        this.fieldObject.FieldValue = this.selectedDateValue;
        var contextObj = this;
        var el = document.getElementById(contextObj.fieldObject.FieldId.toString());
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
    };
    DateTimeSearchComponent.prototype.getSelectedValue2 = function (dt) {
        var h;
        var m;
        var s;
        var meridian;
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
        var dateformat = new Date(dt);
        var arr;
        arr = dateformat.toDateString().split(" ");
        this.selectedDateValue2 = this.getformattedDataTimeonSelection(dt);
        this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ + this.selectedDateValue2 + this.singleQ;
        this.fieldObject2.FieldValue = this.selectedDateValue2;
        var contextObj = this;
        var el = document.getElementById(contextObj.fieldObject2.FieldId.toString());
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
    };
    DateTimeSearchComponent.prototype.drpDwnChange = function (value) {
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
            var el1 = document.getElementById(contextObj.fieldObject2.FieldId.toString());
            setTimeout(function () {
                contextObj._validateService.initiateValidation(contextObj.fieldObject2, contextObj, true, el1);
            }, 100);
        }
        else {
            this.show = true;
            this.fieldObject.FieldValue = "";
        }
        this.dropDownValue = value;
        if (value == "") {
            this.fieldObject.FieldValue = "";
        }
        var contextObj = this;
        var el = document.getElementById(contextObj.fieldObject.FieldId.toString());
        setTimeout(function () {
            contextObj._validateService.initiateValidation(contextObj.fieldObject, contextObj, true, el);
        }, 100);
    };
    DateTimeSearchComponent.prototype.getformattedDataTime = function (dt) {
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
        strDate = dd + " " + mon + " " + yy + " " + hour + ":" + min + " " + meridian;
        return strDate;
    };
    DateTimeSearchComponent.prototype.getformattedDataTimeonSelection = function (dt) {
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
        strDate = dd + " " + mon + " " + yy + " " + hour + ":" + min + " " + meridian;
        return strDate;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DateTimeSearchComponent.prototype, "disableDates", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTimeSearchComponent.prototype, "validationData", void 0);
    DateTimeSearchComponent = __decorate([
        core_1.Component({
            selector: 'DateTimeSearchComponent',
            templateUrl: 'app/Framework/Views/Search/datetime.component.html',
            inputs: ['fieldObject'],
            directives: [datepicker_1.DATEPICKER_DIRECTIVES, timepicker_component_1.TimepickerComponent, common_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES, validate_directive_1.Validation],
            styleUrls: ['app/Framework/Views/Search/searchFields.css'],
            providers: [General_1.Delimeter, validation_service_1.ValidateService]
        }), 
        __metadata('design:paramtypes', [General_1.Delimeter, validation_service_1.ValidateService])
    ], DateTimeSearchComponent);
    return DateTimeSearchComponent;
}());
exports.DateTimeSearchComponent = DateTimeSearchComponent;
//# sourceMappingURL=datetimecomponent.component.js.map