import {Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChange, DoCheck, ViewEncapsulation, ElementRef} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {SetWorkingTimeComponent} from './setWorkingTime.component'
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

@Component({
    selector: 'CalendarException-addedit',
    templateUrl: 'app/Views/Administration/General Settings/CalendarExceptionAddEdit.component.html',
    providers: [AdministrationService, NotificationService, ValidateService],
    directives: [FieldComponent, GridComponent, SplitViewComponent, SetWorkingTimeComponent],
    inputs: ['selectedId', 'action', 'exceptionAddEditfields', 'btnName', 'fieldDetailsEdit', 'CalendarId'],
    encapsulation: ViewEncapsulation.None
})

export class CalendarExceptionAddEditComponent implements OnInit{
    fieldObject: IField[];
    itemsSource: any[];
    itemsSourceGrid: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    CalendarId;
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() exceptionAddEditfields;
    @Input() fieldDetailsEdit: any;
    @Output() submitSuccess = new EventEmitter();
    ddlDisableShowSelect = [2887, 2906, 2894, 2907, 2904, 2893, 2901, 2892, 2903, 2902, 2908];
    ddlOnChangeMonthly = [2893, 2901, 2892, 2903, 2902];
    ddlOnChangeYearly = [2906, 2894, 2907, 2904, 2908];
    ddlOnChangeMonthlyDay = [2893, 2901];
    ddlOnChangeMonthlyThe = [2892, 2903, 2902];
    ddlOnChangeYearlyOn = [2906, 2894];
    ddlOnChangeYearlyThe = [2907, 2904, 2908];
    ddlOnChangeDaily = [2887];
    ddlOnChangeWeekly = [2887];
    ddlOnChangeRecFrequency = [2895];
    showHideArrayPre = [2887, 2889, 2888, 2893, 2892, 2901, 2903, 2902, 2905, 2906, 2894, 2907, 2904, 2908];
    showHideArray1Pre = [2887]; //show daily 
    showHideArray2Pre = [2887, 2889];  //show weekly days  
    showHideArray3Pre = [2888, 2893, 2892, 2901, 2903, 2902];//show monthly fields
    showHideArray4Pre = [2905, 2906, 2894, 2907, 2904, 2908]; // show yearly fields
    showHideArrayRecRangeDDL = [2895];
    showHideArrayRecRangeDatePicker = [2896];
    HideArray3Pre = [2893, 2901, 2892, 2903, 2902];
    showHideArray3of1Pre = [2893, 2901];
    showHideArray3of2Pre = [2892, 2903, 2902];
    HideArray4Pre = [2906, 2894, 2907, 2904, 2908];
    showHideArray4of1Pre = [2906, 2894];
    showHideArray4of2Pre = [2907, 2904, 2908];
    fieldDetails: IField[];
    recPatternSelected: any;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    calendarName: string;
    workTime: any[] = [];
    pageTitle: string;
    CalendarDetails: any;
    workTimeList: any[] = [];
    enableBtn: boolean = false;
    iselementinsert: boolean = true;
    elref: any;
    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService, private validateService: ValidateService, elemRef: ElementRef) {
        this.elref = elemRef;
    }

    ngOnInit() {
        //this.loadFields(this.action);
    }

    ngDoCheck() {
        var formatRecurStart = document.getElementsByClassName("MainContainer_2890")[0]
        if (formatRecurStart != undefined) {
            formatRecurStart.getElementsByTagName("label")[0].innerHTML = "Range of Recurrence</br> Start";
        }     
        if (this.iselementinsert)
        {            
            var changetimeElement = document.getElementById("changetime"),
                WorkingRadioElement = this.elref.nativeElement.getElementsByClassName("MainContainer_2885"),
                dynamiclistElement = this.elref.nativeElement.getElementsByClassName("list-group");
            if (changetimeElement && WorkingRadioElement && WorkingRadioElement.length > 0)
            {
                $(changetimeElement).insertAfter(WorkingRadioElement[0]);
                this.iselementinsert = false;
            }
            if (dynamiclistElement && dynamiclistElement.length > 0)
            {
                dynamiclistElement[0].style.setProperty("height", "85%", "important"); 
                dynamiclistElement[0].style.setProperty("max-height", "none", "important");
            }
        }
        
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        //this.loadFields(this.action);
        contextObj.administrationService.getWorkingTimeFields().subscribe(function (resultData1) {
            contextObj.fieldObject = resultData1["Data"];
        });
        var reportfieldIdValues = new Array<ReportFieldArray>();
        reportfieldIdValues.push({ ReportFieldId: 5494, Value: this.CalendarId });
        reportfieldIdValues.push({ ReportFieldId: 6444, Value: "0" });
        contextObj.administrationService.getWorkingTimeDataList(JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.loadFields(contextObj.action);
        });
        this.administrationService.getCalendarDetails(this.CalendarId).subscribe(function (resultData) {
            contextObj.CalendarDetails = JSON.parse(resultData.FieldBinderData)[0];
            contextObj.calendarName = contextObj.CalendarDetails.Name;
        });
    }
    loadFields(action) {
        var contextObj = this;
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2885) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2891) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2889) { return item.FieldLabel = "week(s) on:"; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2901) { return item.FieldLabel = "of every month(s)"; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2893) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2892) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2903) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2902) { return item.FieldLabel = "of every month(s)"; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2905) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2906) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2894) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2907) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2904) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2904) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2891) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2908) { return item.FieldLabel = "of"; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2895) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2896) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2888) { return item.FieldLabel = ""; } });
        this.exceptionAddEditfields.find(function (item) { if (item.FieldId == 2887) { return item.FieldLabel = "Recur every"; } });
        var ExceptionName = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2884;
        });
        var IsWorkingDay = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2885;
        });
        var dailyFrequency = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2887;
        });
        var weeklyFrequency = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2887;
        });
        var weeklyWeekDays = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2889;
        });
        var monthlySubRadio = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2888;
        });
        var yearlySubRadio = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2905;
        });
        var monthlyDaySubFields1 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2893;
        });
        var monthlyDaySubFields2 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2901;
        });
        var monthlyTheSubFields1 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2892;
        });
        var monthlyTheSubFields2 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2903;
        });
        var monthlyTheSubFields3 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2902;
        });
        var yearlyOnSubFields1 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2906;
        });
        var yearlyOnSubFields2 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2894;
        });
        var yearlyTheSubFields1 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2907;
        });
        var yearlyTheSubFields2 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2904;
        });
        var yearlyTheSubFields3 = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2908;
        });
        var recPattern = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2886;
        });
        var datePickerRecRange = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2896;
        });
        var ddlFrequencyRecRange = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2895;
        });
        var rdRecRange = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2891;
        });
        var datePickerStart = contextObj.exceptionAddEditfields.find(function (item) {
            return item.FieldId === 2890;
        });
        this.fieldDetails = this.exceptionAddEditfields;
        debugger
        //IsWorkingDay.LookupDetails.LookupValues.splice(IsWorkingDay.LookupDetails.LookupValues.findIndex(function (el) { return el.Id === 1 }), 1);
        IsWorkingDay.LookupDetails.LookupValues = IsWorkingDay.LookupDetails.LookupValues.filter(function (el) { return el.Id !== 1 });
        //IsWorkingDay.LookupDetails.LookupValues.shift();
        if (contextObj.fieldDetailsEdit) {
            if (contextObj.fieldDetailsEdit.IsWorkDay == 0) {
                IsWorkingDay.FieldValue = 3;
                this.workTimeList = [];
                this.enableBtn = false;
            }
            else if (contextObj.fieldDetailsEdit.IsWorkDay == 1){
                IsWorkingDay.FieldValue = 2;
                this.itemsSourceGrid = this.itemsSource;
                this.enableBtn = true;
                this.workTimeList = [];
                for (var cnt = 0; cnt < this.itemsSourceGrid.length; cnt++) {
                    this.workTimeList.push({ ["StartTime"]: this.itemsSourceGrid[cnt]["Start Time"], ["EndTime"]: this.itemsSourceGrid[cnt]["End Time"] });
                }    
            }
            if (contextObj.fieldDetailsEdit.RecurrenceRangeId == 3) {
                contextObj.enableRecFrequency();
                rdRecRange.FieldValue = "11";
                datePickerRecRange.IsEnabled = false;
                datePickerRecRange.IsVisible = true;
                datePickerRecRange.IsMandatory = false;
                ddlFrequencyRecRange.IsEnabled = true;
                ddlFrequencyRecRange.IsVisible = true;
                for (var i = 0; i < ddlFrequencyRecRange.LookupDetails.LookupValues.length; i++) {
                    if (ddlFrequencyRecRange.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.RangeRecurrenceNo) {
                        ddlFrequencyRecRange.FieldValue = ddlFrequencyRecRange.LookupDetails.LookupValues[i].Id.toString();
                    }
                }
            }
            else if (contextObj.fieldDetailsEdit.RecurrenceRangeId == 4) {
                rdRecRange.FieldValue = "12";
                ddlFrequencyRecRange.IsEnabled = false;
                ddlFrequencyRecRange.IsVisible = false;
                datePickerRecRange.IsEnabled = true;
                datePickerRecRange.IsVisible = true;
                datePickerRecRange.IsMandatory = true;
                datePickerRecRange.FieldValue = contextObj.fieldDetailsEdit['End Date'];
            }
            datePickerStart.FieldValue = this.getFormattedDate(contextObj.fieldDetailsEdit['Start Date']);
            ExceptionName.FieldValue = contextObj.fieldDetailsEdit['Exception'];
            contextObj.initiateValidation(ExceptionName.FieldId, ExceptionName);
        }
        else {
            IsWorkingDay.FieldValue = "3";
            rdRecRange.FieldValue = "11";
            contextObj.refreshRecRangeDatePicker()
            contextObj.enableRecFields();
            contextObj.enableRecFrequency();
            var today = new Date();
            datePickerStart.FieldValue = this.getFormattedDate(today);
            contextObj.workTime = [];
            contextObj.workTimeList = [];
            contextObj.itemsSourceGrid = [];
            contextObj.enableBtn = false;
        }

        if (contextObj.fieldDetailsEdit) {
            if (contextObj.fieldDetailsEdit.RecurrencePatternId == 1) {
                contextObj.refreshBeforeRender();
                contextObj.reRenderCriteria("1");
                contextObj.clearDDlShowSelect();
                contextObj.enableDaily();
                recPattern.FieldValue = "1";
                if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == false) {
                    for (var i = 0; i < dailyFrequency.LookupDetails.LookupValues.length; i++) {
                        if (dailyFrequency.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.Frequency) {
                            dailyFrequency.FieldValue = dailyFrequency.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                }
            }
            else if (contextObj.fieldDetailsEdit.RecurrencePatternId == 2) {
                contextObj.refreshBeforeRender();
                contextObj.reRenderCriteria("2");
                contextObj.clearDDlShowSelect();
                contextObj.enableWeekly();
                recPattern.FieldValue = "2";
                if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == true) {
                    for (var i = 0; i < weeklyFrequency.LookupDetails.LookupValues.length; i++) {
                        if (weeklyFrequency.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.Frequency) {
                            weeklyFrequency.FieldValue = weeklyFrequency.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                    var weeklyWeekDaysCast: any = weeklyWeekDays;
                    weeklyWeekDaysCast.MultiFieldValues = [];
                    for (var i = 0; i < weeklyWeekDaysCast.LookupDetails.LookupValues.length; i++) {
                        if (weeklyWeekDaysCast.LookupDetails.LookupValues[i].IsChecked == 1) {
                            weeklyWeekDaysCast.MultiFieldValues.push(weeklyWeekDaysCast.LookupDetails.LookupValues[i].Id.toString());
                        }
                    }
                }
            }
            else if (contextObj.fieldDetailsEdit.RecurrencePatternId == 3) {
                contextObj.refreshBeforeRender();
                contextObj.reRenderCriteria("3");
                contextObj.clearDDlShowSelect();
                recPattern.FieldValue = "3";
                if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == false) {
                    contextObj.refreshMontlyDayThe();
                    contextObj.showMonthlyDay();
                    contextObj.enableMonthlyDay();
                    monthlySubRadio.FieldValue = "82";
                    for (var i = 0; i < monthlyDaySubFields1.LookupDetails.LookupValues.length; i++) {
                        if (monthlyDaySubFields1.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.DayNo) {
                            monthlyDaySubFields1.FieldValue = monthlyDaySubFields1.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                    for (var i = 0; i < monthlyDaySubFields2.LookupDetails.LookupValues.length; i++) {
                        if (monthlyDaySubFields2.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.Frequency) {
                            monthlyDaySubFields2.FieldValue = monthlyDaySubFields2.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                }
                else if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == true) {
                    contextObj.refreshMontlyDayThe();
                    contextObj.showMonthlyThe();
                    contextObj.enableMonthlyThe();
                    contextObj.clearDDlShowSelect();
                    monthlySubRadio.FieldValue = "83";
                    contextObj.enableMonthlyThe();
                    for (var i = 0; i < monthlyTheSubFields1.LookupDetails.LookupValues.length; i++) {
                        if (monthlyTheSubFields1.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.WeekDayRecurrenceTypeId) {
                            monthlyTheSubFields1.FieldValue = monthlyTheSubFields1.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                    for (var i = 0; i < monthlyTheSubFields2.LookupDetails.LookupValues.length; i++) {
                        if (monthlyTheSubFields2.LookupDetails.LookupValues[i].Id == (Math.log(contextObj.fieldDetailsEdit.WeekDays) / Math.log(2))) {
                            monthlyTheSubFields2.FieldValue = monthlyTheSubFields2.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                    for (var i = 0; i < monthlyTheSubFields3.LookupDetails.LookupValues.length; i++) {
                        if (monthlyTheSubFields3.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.Frequency) {
                            monthlyTheSubFields3.FieldValue = monthlyTheSubFields3.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                }
            }
            else if (contextObj.fieldDetailsEdit.RecurrencePatternId == 4) {
                contextObj.refreshBeforeRender();
                contextObj.reRenderCriteria("4");
                contextObj.clearDDlShowSelect();
                recPattern.FieldValue = "4";
                if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == false) {
                    contextObj.refreshYearlyOnThe();
                    contextObj.showYearlyOn();
                    contextObj.enableYearlyOn();
                    yearlySubRadio.FieldValue = "84";
                    for (var i = 0; i < yearlyOnSubFields1.LookupDetails.LookupValues.length; i++) {
                        if (yearlyOnSubFields1.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.DayNo) {
                            yearlyOnSubFields1.FieldValue = yearlyOnSubFields1.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                    for (var i = 0; i < yearlyOnSubFields2.LookupDetails.LookupValues.length; i++) {
                        if (yearlyOnSubFields2.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.MonthNo) {
                            yearlyOnSubFields2.FieldValue = yearlyOnSubFields2.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                }
                else if (contextObj.fieldDetailsEdit.IsWeekDaySpecific == true) {
                    contextObj.refreshYearlyOnThe();
                    contextObj.showYearlyThe();
                    contextObj.enableYearlyThe();
                    yearlySubRadio.FieldValue = "85";
                    for (var i = 0; i < yearlyTheSubFields1.LookupDetails.LookupValues.length; i++) {
                        if (yearlyTheSubFields1.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.WeekDayRecurrenceTypeId) {
                            yearlyTheSubFields1.FieldValue = yearlyTheSubFields1.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                    for (var i = 0; i < yearlyTheSubFields2.LookupDetails.LookupValues.length; i++) {
                        if (yearlyTheSubFields2.LookupDetails.LookupValues[i].Id == (Math.log(contextObj.fieldDetailsEdit.WeekDays) / Math.log(2))) {
                            yearlyTheSubFields2.FieldValue = yearlyTheSubFields2.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                    for (var i = 0; i < yearlyTheSubFields3.LookupDetails.LookupValues.length; i++) {
                        if (yearlyTheSubFields3.LookupDetails.LookupValues[i].Id == contextObj.fieldDetailsEdit.MonthNo) {
                            yearlyTheSubFields3.FieldValue = yearlyTheSubFields3.LookupDetails.LookupValues[i].Id.toString();
                        }
                    }
                }
            }
        }
        else {
            contextObj.refreshBeforeRender();
            contextObj.reRenderCriteria("1");
            contextObj.clearDDlShowSelect();
            contextObj.enableDaily();
            recPattern.FieldValue = "1";
        }
        this.iselementinsert = true;
    }

    public initiateValidation(id: any, fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(id);
        setTimeout(function () {
            contextObj.validateService.initiateValidation(fieldObject, contextObj, true, el);
        }, 100);
    }

    reRenderCriteria(targetRecId: string) {
        switch (targetRecId) {
            case "1":
                this.recPatternSelected = 1;
                this.showDailyFields();
                break;
            case "2":
                this.recPatternSelected = 2;
                this.showWeeklyFields();
                break;
            case "3":
                this.recPatternSelected = 3;
                this.showMonthlyFields();
                break;
            case "4":
                this.recPatternSelected = 4;
                this.showYearlyFields();
                break;
            default:
                break;
        }
    }

    showDailyFields() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray1Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray1Pre[j]) {
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    }

    showWeeklyFields() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray2Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray2Pre[j]) {
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    }

    showMonthlyFields() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray3Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray3Pre[j]) {
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    }

    showYearlyFields() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray4Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray4Pre[j]) {
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    }

    refreshMontlyDayThe() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.HideArray3Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.HideArray3Pre[j]) {
                    this.fieldDetails[i].FieldValue = "-1";
                    this.fieldDetails[i].IsEnabled = false;
                    this.fieldDetails[i].IsVisible = false;
                }
            }
        }
    }

    showMonthlyDay() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray3of1Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray3of1Pre[j]) {
                    this.fieldDetails[i].IsEnabled = true;
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    }

    showMonthlyThe() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray3of2Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray3of2Pre[j]) {
                    this.fieldDetails[i].IsEnabled = true;
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    }

    refreshYearlyOnThe() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.HideArray4Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.HideArray4Pre[j]) {
                    this.fieldDetails[i].IsEnabled = false;
                    this.fieldDetails[i].IsVisible = false;
                    this.fieldDetails[i].FieldValue = "-1";
                }
            }
        }
    }

    showYearlyOn() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray4of1Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray4of1Pre[j]) {
                    this.fieldDetails[i].IsEnabled = true;
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    }

    showYearlyThe() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArray4of2Pre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArray4of2Pre[j]) {
                    this.fieldDetails[i].IsEnabled = true;
                    this.fieldDetails[i].IsVisible = true;
                }
            }
        }
    }
    refreshBeforeRender() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArrayPre.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArrayPre[j]) {
                    this.fieldDetails[i].IsVisible = false;
                }
            }
        }
    }

    refreshRecRangeDDL() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArrayRecRangeDDL.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArrayRecRangeDDL[j]) {
                    this.fieldDetails[i].IsVisible = false;
                    this.fieldDetails[i].IsEnabled = false;
                    this.fieldDetails[i].FieldValue = "-1";
                }
            }
        }
    }

    refreshRecRangeDatePicker() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            for (var j = 0; j < this.showHideArrayRecRangeDatePicker.length; j++) {
                if (this.fieldDetails[i].FieldId == this.showHideArrayRecRangeDatePicker[j]) {
                    this.fieldDetails[i].IsVisible = false;
                    // this.fieldDetails[i].IsEnabled = false;
                    //this.fieldDetails[i].ReadOnlyMode = true;
                    this.fieldDetails[i].FieldValue = "";
                }
            }
        }
    }

    enableRecFields() {
        var datePickerRecRange = this.fieldDetails.find(function (item) {  //Getting Rec Range Group Radio Elem 1 of 2
            return item.FieldId === 2896;
        });
        var ddlFrequencyRecRange = this.fieldDetails.find(function (item) {  // Getting Freq DDL Element 2 of 2
            return item.FieldId === 2895;
        });
        var recFieldSelected = this.fieldDetails.find(function (item) {

            return item.FieldId === 2891;

        });
        var parentddlField: any = this.elref.nativeElement.getElementsByClassName("MainContainer_2895");
        if (recFieldSelected.FieldValue == "11") {
            datePickerRecRange.IsEnabled = false;
            datePickerRecRange.IsVisible = true;
            ddlFrequencyRecRange.IsEnabled = true;
            ddlFrequencyRecRange.IsVisible = true;
            datePickerRecRange.IsMandatory = false;            
            if (parentddlField && parentddlField.length > 0)
                parentddlField[0].style.setProperty("display", "block", "important");            
        }
        else if (recFieldSelected.FieldValue == "12") {
            ddlFrequencyRecRange.IsEnabled = false;
            ddlFrequencyRecRange.IsVisible = false;
            datePickerRecRange.IsEnabled = true;
            datePickerRecRange.IsVisible = true;
            datePickerRecRange.IsMandatory = true;
            if (parentddlField && parentddlField.length > 0)
                parentddlField[0].style.setProperty("display", "none", "important");                               
        }
    }

    clearDDlShowSelect() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlDisableShowSelect.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = "-1";
            }
        }
    }

    enableMonthlyDay() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeMonthlyDay.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    }

    enableMonthlyThe() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeMonthlyThe.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    }
    enableYearlyOn() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeYearlyOn.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    }

    enableYearlyThe() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeYearlyThe.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    }

    enableDaily() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeDaily.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }
        }
    }
    enableWeekly() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeWeekly.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }

        }
    }

    enableRecFrequency() {
        for (var i = 0; i < this.fieldDetails.length; i++) {
            if (this.ddlOnChangeRecFrequency.indexOf(this.fieldDetails[i].FieldId) > -1) {
                this.fieldDetails[i].ShowSelect = false;
                this.fieldDetails[i].FieldValue = this.fieldDetails[i].LookupDetails.LookupValues[0].Id.toString();
            }

        }
    }

    enableRecDatePicker() {
        var datePickerRecRange = this.fieldDetails.find(function (item) {
            return item.FieldId === 2896;
        });
        //datePickerRecRange.ReadOnlyMode = false;
        debugger
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        datePickerRecRange.IsMandatory = true;
        datePickerRecRange.FieldValue = this.getFormattedDate(tomorrow);
        if (this.fieldDetailsEdit != null && this.fieldDetailsEdit.RecurrenceRangeId == 4) {
            datePickerRecRange.FieldValue = this.fieldDetailsEdit['End Date'];
          
        }
    }
    private getFormattedDate(dt) {
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

    radioBtnChange(event) {
        debugger
        if (event.rbtnObject.fieldobject.FieldId == 2885) {
            switch (event.rbtnObject.fieldobject.FieldValue){
                case "2":
                    this.itemsSourceGrid = this.itemsSource;
                    this.enableBtn = true;
                    this.workTimeList = [];
                    for (var cnt = 0; cnt < this.itemsSourceGrid.length; cnt++) {
                        this.workTimeList.push({ ["StartTime"]: this.itemsSourceGrid[cnt]["Start Time"], ["EndTime"]: this.itemsSourceGrid[cnt]["End Time"] });
                    }                   
                    break;
                case "3":
                    this.itemsSourceGrid = [];
                    this.enableBtn = false;
                    this.workTimeList = [];
                    break;
            }
        }
        if (event.rbtnObject.fieldobject.FieldId == 2886) {
            switch (event.rbtnObject.fieldobject.FieldValue) {
                case "1":
                    this.refreshBeforeRender();
                    this.showDailyFields();
                    this.clearDDlShowSelect();
                    this.enableDaily();
                    break;
                case "2":
                    this.refreshBeforeRender();
                    this.showWeeklyFields();
                    this.clearDDlShowSelect();
                    this.enableWeekly();
                    break;
                case "3":
                    this.refreshBeforeRender();
                    this.showMonthlyFields();

                    this.refreshMontlyDayThe();
                    this.showMonthlyDay();

                    this.clearDDlShowSelect();
                    this.enableMonthlyDay();
                    var monthlySubRadio = this.fieldDetails.find(function (item) {
                        return item.FieldId === 2888;
                    });
                    monthlySubRadio.FieldValue = "82";
                    break;
                case "4":
                    this.refreshBeforeRender();
                    this.showYearlyFields();

                    this.refreshYearlyOnThe();
                    this.showYearlyOn();

                    this.clearDDlShowSelect();
                    this.enableYearlyOn();

                    var yearlySubRadio = this.fieldDetails.find(function (item) {
                        return item.FieldId === 2905;
                    });
                    yearlySubRadio.FieldValue = "84";
                    break;
                default:
                    break;
            }
        }

        if (event.rbtnObject.fieldobject.FieldId == 2888) {
            switch (event.rbtnObject.fieldobject.FieldValue) {
                case "82":
                    this.refreshMontlyDayThe();
                    this.showMonthlyDay();
                    this.clearDDlShowSelect();
                    this.enableMonthlyDay();
                    break;
                case "83":
                    this.refreshMontlyDayThe();
                    this.showMonthlyThe();
                    this.clearDDlShowSelect();
                    this.enableMonthlyThe();
                    break;
                default:
                    break;
            }
        }

        if (event.rbtnObject.fieldobject.FieldId == 2905) {
            switch (event.rbtnObject.fieldobject.FieldValue) {
                case "84":
                    this.refreshYearlyOnThe();
                    this.showYearlyOn();
                    this.clearDDlShowSelect();
                    this.enableYearlyOn();
                    break;
                case "85":
                    this.refreshYearlyOnThe();
                    this.showYearlyThe();
                    this.clearDDlShowSelect();
                    this.enableYearlyThe();
                    break;
                default:
                    break;
            }
        }

        if (event.rbtnObject.fieldobject.FieldId == 2891) {
            switch (event.rbtnObject.fieldobject.FieldValue) {
                case "11":
                    this.refreshRecRangeDDL();
                    this.refreshRecRangeDatePicker();
                    this.enableRecFields();
                    this.enableRecFrequency()
                    break;
                case "12":
                    this.refreshRecRangeDDL();
                    this.refreshRecRangeDatePicker();
                    this.enableRecFields();
                    this.enableRecDatePicker();
                    break;

                default:
                    break;
            }
        }
    }

    showRecRangeDDL() {
        var HideArrayRecRangeDDL = document.getElementsByClassName("MainContainer_2895")[0];
        HideArrayRecRangeDDL.getElementsByTagName("select")[0].disabled = false;
        HideArrayRecRangeDDL.getElementsByTagName("select")[0].style.backgroundColor = "white";
    }

    showRecRangeDatePicker() {
        var HideArrayRecRangeDatePick = document.getElementsByClassName("MainContainer_2896")[0];
        HideArrayRecRangeDatePick.getElementsByTagName("input")[0].disabled = false;
        HideArrayRecRangeDatePick.getElementsByTagName("input")[0].style.backgroundColor = "white";
    }

    onSubmitData(event) {
        debugger
        var dateError = false;
        var endDate = JSON.parse(event["fieldobject"]).find(function (item) {
            if (item.ReportFieldId == 5411) {
                return item;
            }
        });
        var startDate = JSON.parse(event["fieldobject"]).find(function (item) {
            if (item.ReportFieldId == 5405) {
                return item;
            }
        });
        if (endDate.Value != "") {

            endDate = new Date(endDate.Value);
            startDate = new Date(startDate.Value);
            if (endDate <= startDate) {
                this._notificationService.ShowToaster("End by Date must be greater than Start Date", 5);
                dateError = true;
            }
        }

        var postRecPattern = this.fieldDetails.find(function (item) {
            return item.FieldId === 2886;
        });

        var postMonthlyDayORThe = this.fieldDetails.find(function (item) {
            return item.FieldId === 2888;
        });

        var postYearlyOnORThe = this.fieldDetails.find(function (item) {
            return item.FieldId === 2905;
        });
        if (dateError == false) {
            switch (postRecPattern.FieldValue) {
                case "1":
                    var tempField1 = [
                        { ReportFieldId: 5403, Value: "0" },
                        { ReportFieldId: 5404, Value: "0" },
                        { ReportFieldId: 5398, Value: this.CalendarId },
                        { ReportFieldId: 6441, Value: "0" }];
                    event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                        return obj.Value !== "-1" && obj.Value !== null;
                    });
                    event["fieldobject"] = event["fieldobject"].filter(function (item) {
                        return item.ReportFieldId != 5403;
                    });
                    event["fieldobject"] = event["fieldobject"].concat(tempField1);
                    this.postSubmit(JSON.stringify(event["fieldobject"]));
                    break;
                case "2":
                    var WeekDays = JSON.parse(event["fieldobject"]).find(function (item) {
                        return item.ReportFieldId == 5404;
                    });
                    if (WeekDays.Value == null || WeekDays.Value == "-1") {
                        this._notificationService.ShowToaster("Select at least one week day", 5);
                    }
                    else {
                        var tempField2 = [
                            {
                                ReportFieldId: 5403, //Is Week Day Specific
                                Value: "1"
                            },
                            { ReportFieldId: 5398, Value: this.CalendarId },
                            { ReportFieldId: 6441, Value: "0" }
                        ];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField2);
                        this.postSubmit(JSON.stringify(event["fieldobject"]));  
                    }
                    break;
                case "3":
                    if (postMonthlyDayORThe.FieldValue == "82") {
                        var tempField31 = [
                            {
                                ReportFieldId: 5403, //Is Week Day Specific
                                Value: "0"
                            },
                            {
                                ReportFieldId: 5404, //Weekdays
                                Value: "0"
                            },
                            { ReportFieldId: 5398, Value: this.CalendarId },
                            { ReportFieldId: 6441, Value: "0" }
                        ];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].filter(function (item) {
                            return item.ReportFieldId != 5403;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField31);
                        this.postSubmit(JSON.stringify(event["fieldobject"]));
                    }
                    else if (postMonthlyDayORThe.FieldValue == "83") {
                        var tempField32 = [{ ReportFieldId: 5403, Value: "1" }, { ReportFieldId: 5398, Value: this.CalendarId }, { ReportFieldId: 6441, Value: "0" }];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].filter(function (item) {
                            return item.ReportFieldId != 5403;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField32);  
                        this.postSubmit(JSON.stringify(event["fieldobject"]));  
                    }
                    break;
                case "4":
                    if (postYearlyOnORThe.FieldValue == "84") {
                        var tempField41 = [
                            {
                                ReportFieldId: 5403, //Is Week Day Specific
                                Value: "0"
                            },
                            {
                                ReportFieldId: 5404, //Weekdays
                                Value: "0"
                            },
                            {
                                ReportFieldId: 5402,
                                Value: "1"
                            },
                            { ReportFieldId: 5398, Value: this.CalendarId },
                            { ReportFieldId: 6441, Value: "0" }
                        ];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].filter(function (item) {
                            return item.ReportFieldId != 5403;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField41);
                        this.postSubmit(JSON.stringify(event["fieldobject"]));
                    }
                    else if (postYearlyOnORThe.FieldValue == "85") {
                        var tempField42 = [
                            {
                                ReportFieldId: 5403, //Is Week Day Specific
                                Value: "1"
                            },
                            {
                                ReportFieldId: 5402,
                                Value: "1"
                            },
                            { ReportFieldId: 5398, Value: this.CalendarId },
                            { ReportFieldId: 6441, Value: "0" }
                        ];
                        event["fieldobject"] = JSON.parse(event["fieldobject"]).filter(function (obj) {
                            return obj.Value !== "-1" && obj.Value !== null;
                        });
                        event["fieldobject"] = event["fieldobject"].filter(function (item) {
                            return item.ReportFieldId != 5403;
                        });
                        event["fieldobject"] = event["fieldobject"].concat(tempField42);
                        this.postSubmit(JSON.stringify(event["fieldobject"])); 
                    }
                    break;
            }
        }
    }

    postSubmit(strsubmitField: string) {
        var contextObj = this;
        debugger
        var subfield = JSON.parse(strsubmitField);
        subfield.filter(function (item) {
            if (item.ReportFieldId == 5400) {
                if (item.Value == "3") {
                    item.Value = "0";
                }
                else if (item.Value == "2"){
                    item.Value = "1";
                }
            }
            if (item.ReportFieldId == 5406) {
                if (item.Value == "11") {
                    item.Value = "3";
                }
                else if (item.Value == "12") {
                    item.Value = "4";
                }
            }
        });
        var submitField = JSON.stringify(subfield);
        var calendarid = contextObj.fieldDetailsEdit == null ? 0 : contextObj.fieldDetailsEdit.Id;
        contextObj.administrationService.postSubmitCalendarException(submitField, JSON.stringify(this.workTimeList), calendarid, contextObj.action).subscribe(function (resultData) {
            debugger
            switch (resultData.StatusId) {
                case 1:
                    switch (contextObj.action) {
                        case "add":
                            contextObj._notificationService.ShowToaster("Exception added", 3);
                            break;
                        case "edit":
                            contextObj._notificationService.ShowToaster("Exception updated", 3);
                            break;
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData.Data });
                    break;
                case 3:
                    contextObj._notificationService.ShowToaster("Exception already exists", 3);
                    break;
            }
        });
    }


    //radioBtnChange(event) {
    //    debugger
    //}
    fieldChange($evevt) {
        debugger
    }
    ChangeTimeClick(event) {
        debugger
        this.pageTitle = "Working Time";
        this.workTime = this.itemsSource;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    submitWorkTime(event) {
        debugger
        var retdata = event.returnData;
        this.workTimeList = [];
        for (var cnt = 0; cnt < retdata.length; cnt++) {
            this.workTimeList.push({ ["Start Time"]: retdata[cnt]["Start Time"], ["End Time"]: retdata[cnt]["End Time"], ["StartTime"]: retdata[cnt]["Start Time"], ["EndTime"]: retdata[cnt]["End Time"]  });
        }
        this.itemsSourceGrid = [];
        this.itemsSourceGrid = this.workTimeList
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}