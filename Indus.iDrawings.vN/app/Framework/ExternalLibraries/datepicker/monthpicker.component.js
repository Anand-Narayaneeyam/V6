"use strict";
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
var datepicker_inner_component_1 = require('./datepicker-inner.component');  
var ng2_bootstrap_config_1 = require('./ng2-bootstrap-config');
// write an interface for template options
var TEMPLATE_OPTIONS = {
    bs4: {
        MONTH_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ngClass]=\"{'btn-info': dtz.selected, 'btn-link': !dtz.selected && !datePicker.isActive(dtz), 'btn-info': !dtz.selected && datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n   (keydown)=\"changeFocus($event)\"              (click)=\"datePicker.select(dtz.date)\" [attr.aria-label]=\"''+dtz.label\" tabindex=\"0\"><span [ngClass]=\"{'text-success': dtz.current}\">{{dtz.label}}</span></button>\n    "
    },
    bs3: {
        MONTH_BUTTON: "\n        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\"\n                [ngClass]=\"{'btn-info': dtz.selected, active: datePicker.isActive(dtz), disabled: dtz.disabled}\"\n                [disabled]=\"dtz.disabled\"\n      (keydown)=\"changeFocus($event)\"           (click)=\"datePicker.select(dtz.date)\" [attr.aria-label]=\"''+dtz.label\" tabindex=\"0\"><span [ngClass]=\"{'text-info': dtz.current}\">{{dtz.label}}</span></button>\n    "
    }
};
var CURRENT_THEME_TEMPLATE = TEMPLATE_OPTIONS[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme] || TEMPLATE_OPTIONS.bs3;
var MonthPickerComponent = (function () {
    function MonthPickerComponent(datePicker) {
        this.rows = [];
        this.datePicker = datePicker;
    }
    MonthPickerComponent.prototype.changeFocus = function (e) {

        var activeElement = $(document.activeElement).closest("tbody td")[0];
        var x = $(document.activeElement).closest("tbody")[0];
            // $(document.activeElement).closest("tbody")[0];
        var LastDayOfCalendarId = x.children[3].children[2].id;
        var dateTimeBack = $(document.activeElement).closest("table")[0].children[0].children[0].children[0].children[0];
        
        if (activeElement.id == LastDayOfCalendarId) {
            var getDateTimeDiv = $(document.activeElement).closest("#dateTimeContainerDiv");
            var getDateDiv = $(document.activeElement).closest("#dateContainerDiv")
            if (getDateTimeDiv && getDateTimeDiv.length > 0) {
                dateTimeBack = $(document.activeElement).closest("#dateTimeContainerDiv")[0].querySelectorAll("datepicker table")[0].children[0].children[0].children[0].children[0];
                var timePicker = document.activeElement.closest("#dateTimeContainerDiv").getElementsByTagName("timepicker")[0];
                if (timePicker) {

                    var timePickerFocus = timePicker.getElementsByTagName("a")[0];
                    timePickerFocus.focus();
                    
                }
            }
            else {
                
                if (getDateDiv && getDateDiv.length > 0) {
                    var getFocusElement = $(document.activeElement).closest("#dateContainerDiv")[0].querySelectorAll("datepicker table")[0].children[0].children[0].children[0].children[0];
                    if (getFocusElement) {
                        getFocusElement.focus();
                        
                    }
                }
            }

        }
    };
    MonthPickerComponent.prototype.ngOnInit = function () {
        var self = this;
        this.datePicker.stepMonth = { years: 1 };
        this.datePicker.setRefreshViewHandler(function () {
            var months = new Array(12);
            var year = this.activeDate.getFullYear();
            var date;
            for (var i = 0; i < 12; i++) {
                date = new Date(year, i, 1);
                date = this.fixTimeZone(date);
                months[i] = this.createDateObject(date, this.formatMonth);
                months[i].uid = this.uniqueId + '-' + i;
            }
            self.title = this.dateFilter(this.activeDate, this.formatMonthTitle);
            self.rows = this.split(months, 3);
        }, 'month');
        this.datePicker.setCompareHandler(function (date1, date2) {
            var d1 = new Date(date1.getFullYear(), date1.getMonth());
            var d2 = new Date(date2.getFullYear(), date2.getMonth());
            return d1.getTime() - d2.getTime();
        }, 'month');
        this.datePicker.refreshView();
    };
    MonthPickerComponent = __decorate([
        core_1.Component({
            selector: 'monthpicker',
            template: "\n<table *ngIf=\"datePicker.datepickerMode==='month'\" role=\"grid\">\n  <thead>\n    <tr>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-left\"\n    aria-label=\"Previous Year\" role=\"button\"            (click)=\"datePicker.move(-1)\" tabindex=\"0\">\n           <img src=\"./Content/Images/chevron-pointing-to-the-left.png\" height=\"10\" width=\"10\">  \n        </button></th>\n      <th>\n        <button [id]=\"uniqueId + '-title'\"\n                type=\"button\" class=\"btn btn-default btn-sm\"\n                (click)=\"datePicker.toggleMode()\"\n                [disabled]=\"datePicker.datepickerMode === maxMode\"\n                [ngClass]=\"{disabled: datePicker.datepickerMode === maxMode}\" tabindex=\"0\" style=\"width:100%;\">\n          <strong [attr.aria-label]=\"''+title\">{{title}}</strong>\n        </button>\n      </th>\n      <th>\n        <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n  aria-label=\"Next Year\" role=\"button\"              (click)=\"datePicker.move(1)\" tabindex=\"0\">\n          <img src=\"./Content/Images/move-to-next.png\" height=\"10\" width=\"10\">\n        </button>\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let rowz of rows\">\n      <td *ngFor=\"let dtz of rowz\" class=\"text-center\" role=\"gridcell\" id=\"{{dtz.uid}}\" [ngClass]=\"dtz.customClass\">\n        " + CURRENT_THEME_TEMPLATE.MONTH_BUTTON + "\n      </td>\n    </tr>\n  </tbody>\n</table>\n  ",
            directives: [forms_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [datepicker_inner_component_1.DatePickerInnerComponent])
    ], MonthPickerComponent);
    return MonthPickerComponent;
}());
exports.MonthPickerComponent = MonthPickerComponent;
