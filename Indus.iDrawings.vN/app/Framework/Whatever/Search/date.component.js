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
var moment = require('moment');
var datepicker_1 = require('../../ExternalLibraries/datepicker/datepicker');
var validation_service_1 = require('../../Models/Validation/validation.service');
var DateSearchComponent = (function () {
    function DateSearchComponent(limeter, _validateService) {
        this._validateService = _validateService;
        this.show = true;
        this.isdisable = true;
        this.readOnly = false;
        this.disableDates = [];
        this.dropDownValue = "";
        this.dropdownForText = [{ Id: "", Value: "--Select--" }, { Id: "Ç", Value: "Equal to" }, { Id: "ü", Value: "Greater than" }, { Id: "é", Value: "Less than" }, { Id: "æ", Value: "Between" }];
        this.singleQ = "ô";
        this.displayStyle = "none";
        this.displayStyle2 = "none";
        this.dt = new Date();
        this.dt2 = new Date();
        this.minDate = void 0;
        this.formats = ['DD MMM YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
        this.format = this.formats[0];
        this.dateOptions = {
            formatYear: 'YYYY',
            startingDay: 1
        };
        this.hasValue = false;
        this.hasValue2 = false;
        this.opened = false;
        this.limeter = limeter;
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 43000);
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }
    DateSearchComponent.prototype.ngOnInit = function () {
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
            }
            else {
                var tempOperator = this.fieldObject.FieldValue.split("ǂ")[1];
                this.dropDownValue = "";
                this.readOnly = true;
                // this.selectedDateValue = this.selectedDateValue2 = this.fieldObject.FieldValue = "";
                this.selectedDateValue = this.fieldObject.FieldValue;
            }
        }
        else {
            this.dropDownValue = "";
            this.readOnly = true;
            this.selectedDateValue = this.selectedDateValue2 = this.fieldObject.FieldValue = "";
        }
    };
    DateSearchComponent.prototype.drpDwnChange = function (value) {
        debugger;
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
    DateSearchComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    DateSearchComponent.prototype.today = function () {
    };
    DateSearchComponent.prototype.d20090824 = function () {
        this.dt = moment('2009-08-24', 'YYYY-MM-DD').toDate();
    };
    DateSearchComponent.prototype.getDayClass = function (date, mode) {
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
    DateSearchComponent.prototype.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };
    DateSearchComponent.prototype.open = function () {
        this.opened = !this.opened;
    };
    DateSearchComponent.prototype.clear = function () {
        this.dt = void 0;
    };
    DateSearchComponent.prototype.toggleMin = function () {
        this.dt = new Date(this.minDate.valueOf());
    };
    DateSearchComponent.prototype.datepickertoggle = function () {
        if (this.displayStyle == "none") {
            this.displayStyle = "block";
        }
        else if (this.displayStyle == "block") {
            this.displayStyle = "none";
        }
    };
    DateSearchComponent.prototype.datepickertoggle2 = function () {
        if (this.displayStyle2 == "none") {
            this.displayStyle2 = "block";
        }
        else if (this.displayStyle2 == "block") {
            this.displayStyle2 = "none";
        }
    };
    DateSearchComponent.prototype.datePickerClick = function (event, id) {
        if (event.keyCode == 8)
            event.preventDefault();
        if (id == 1 && event.keyCode == 13) {
            this.datepickertoggle();
        }
        else if (id == 2 && event.keyCode == 13) {
            this.datepickertoggle2();
        }
    };
    DateSearchComponent.prototype.getSelectedValue = function (dt) {
        var dateformat = new Date(dt);
        var arr;
        arr = dateformat.toDateString().split(" ");
        this.fieldObject.FieldValue = arr[2] + " " + arr[1] + " " + arr[3];
        this.selectedDateValue = arr[2] + " " + arr[1] + " " + arr[3];
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
        console.log(this.fieldObject.FieldValue);
    };
    DateSearchComponent.prototype.getSelectedValue2 = function (dt) {
        var dateformat = new Date(dt);
        var arr;
        arr = dateformat.toDateString().split(" ");
        this.fieldObject.FieldValue = arr[2] + " " + arr[1] + " " + arr[3];
        this.selectedDateValue2 = arr[2] + " " + arr[1] + " " + arr[3];
        this.fieldObject.FieldValue = this.dropDownValue + this.limeter.ColumnDelimeter + this.singleQ + this.selectedDateValue + this.singleQ + " ÿ " + this.singleQ + this.selectedDateValue2 + this.singleQ;
        console.log(this.fieldObject.FieldValue);
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DateSearchComponent.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateSearchComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateSearchComponent.prototype, "fieldValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DateSearchComponent.prototype, "disableDates", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateSearchComponent.prototype, "validationData", void 0);
    DateSearchComponent = __decorate([
        core_1.Component({
            selector: 'DateSearchComponent',
            templateUrl: 'app/Framework/Views/Search/date.component.html',
            inputs: ['fieldObject'],
            directives: [validate_directive_1.Validation, datepicker_1.DATEPICKER_DIRECTIVES, common_1.CORE_DIRECTIVES, forms_1.FORM_DIRECTIVES],
            styleUrls: ['app/Framework/Views/Search/searchFields.css'],
            providers: [General_1.Delimeter, validation_service_1.ValidateService]
        }), 
        __metadata('design:paramtypes', [General_1.Delimeter, validation_service_1.ValidateService])
    ], DateSearchComponent);
    return DateSearchComponent;
}());
exports.DateSearchComponent = DateSearchComponent;
//# sourceMappingURL=date.component.js.map