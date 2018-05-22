import {Component, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CreateNewCalendarComponent } from './CreateNewCalendar.component'
import { CalendarComponent } from '../Calendar/dynaCalendar.component';
import {CalendarExceptionAddEditComponent} from './CalendarExceptionAddEdit.component';


@Component({
    selector: 'dynamicCalendar',
    templateUrl: './app/Views/Administration/General Settings/dynamicCalendar.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent, DropDownListComponent, CreateNewCalendarComponent, CalendarComponent, CalendarExceptionAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
})

export class DynamicCalendarComponent {

    fieldObject: IField[];
    fieldDetailsAdd: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    action: string;
    btnName: string;
    enableMenu = [1];
    menuData = [
        {
            "id": 1,
            "title": "Create New",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": null
        }
    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    pageTitle: string;
    refreshgrid;
    alignContent;
    ddlCalendar: any;
    CalendarId: number = 0;
    gridHead: string = "";
    CalendarObj = "";
    CalendarDetails = [];
    WorkingDays = [];
    StartWeekDay: number;
    blnBlockPrevClick: boolean = true;
    blnBlockNextClick: boolean = true;
    exceptiongridHead: string = " ";
    exceptionitemsSource: any[];
    exceptioninputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    exceptionfieldObject: IField[];
    exceptionAddEditfields: IField[];
    IsNewCalendar: boolean;
    fieldDetailsEdit: IField[];
    ExceptionDays = [];
    StartDate;
    EndDate;
    enableCalendar: boolean = true;
    CalenderdropdownId: any;
    enableButton: boolean = true;
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit() {
        this.alignContent = "horizontal";
        var contextObj = this;
        this.administrationService.getCalendarFields().subscribe(function (resultData) {
            debugger
            contextObj.ddlCalendar = resultData["Data"].find(function (el) { return el.ReportFieldId === 5416; });
        
            var removeArr = [5416];
            contextObj.administrationService.getWorkingTimeFields().subscribe(function (resultData1) {
                contextObj.fieldObject = resultData1["Data"];
            });
            contextObj.administrationService.getCalendarExceptionFields().subscribe(function (resultData2) {
                contextObj.exceptionfieldObject = resultData2["Data"];
            });
            if (contextObj.ddlCalendar.LookupDetails.LookupValues == "") {
                contextObj.notificationService.ShowToaster("No Calendars exist", 2);
            }
            this.itemsSource = [];
            contextObj.WorkingDays = [0, 1, 2, 3, 4, 5, 6];
            contextObj.StartWeekDay = 0;
            var CalDate = new Date();
            contextObj.CalendarObj = contextObj.getFormattedDate(CalDate);
        });

    }

    onChangeCalendar(event: any) {
        var contextObj = this;
        this.CalendarId = event;
        if (this.CalendarId > -1) {
            this.dataLoad(this.CalendarId)  
            this.blnBlockPrevClick = false; 
            this.blnBlockNextClick = false; 
            this.enableCalendar = false;      
        } else {
            contextObj.itemsSource = [];
            contextObj.gridHead = "";
            contextObj.WorkingDays = [0, 1, 2, 3, 4, 5, 6];
            contextObj.StartWeekDay = 0;
            this.blnBlockPrevClick = true;
            this.blnBlockNextClick = true; 
            contextObj.exceptiongridHead = " "; 
            contextObj.exceptionitemsSource = [];
            contextObj.ExceptionDays = [];
        }
    }

    public dataLoad(CalendarId) {
        var contextObj = this;
        contextObj.WorkingDays = [];
        contextObj.StartWeekDay = 0;
        var reportfieldIdValues = new Array<ReportFieldArray>();
        reportfieldIdValues.push({ ReportFieldId: 5494, Value: CalendarId });
        reportfieldIdValues.push({ ReportFieldId: 6444, Value: "0" });
        contextObj.administrationService.getWorkingTimeDataList(JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.ddlCalendar.LookupDetails.LookupValues.length>0){
                for (var cnt = 0; cnt < contextObj.ddlCalendar.LookupDetails.LookupValues.length; cnt++) {
                    if (contextObj.ddlCalendar.LookupDetails.LookupValues[cnt].Id == CalendarId) {
                        contextObj.gridHead = "Default Working Time for " + contextObj.ddlCalendar.LookupDetails.LookupValues[cnt].Value;
                    }
                }
            }
        });
        this.administrationService.getCalendarDetails(contextObj.ddlCalendar.FieldValue).subscribe(function (resultData) {
            contextObj.CalendarDetails = JSON.parse(resultData.FieldBinderData)[0];
            if (contextObj.CalendarDetails["IsSunWorking"] == 1) 
                contextObj.WorkingDays.push(0);
            if (contextObj.CalendarDetails["IsMonWorking"] == 1)
                contextObj.WorkingDays.push(1);
            if (contextObj.CalendarDetails["IsTueWorking"] == 1)
                contextObj.WorkingDays.push(2);
            if (contextObj.CalendarDetails["IsWedWorking"] == 1)
                contextObj.WorkingDays.push(3);
            if (contextObj.CalendarDetails["IsThursWorking"] == 1)
                contextObj.WorkingDays.push(4);
            if (contextObj.CalendarDetails["IsFriWorking"] == 1)
                contextObj.WorkingDays.push(5);
            if (contextObj.CalendarDetails["IsSatWorking"] == 1)
                contextObj.WorkingDays.push(6);
            contextObj.StartWeekDay = contextObj.CalendarDetails["StartWeekDayId"];
            contextObj.StartWeekDay = contextObj.StartWeekDay - 1;
        });
        var CalDate = new Date();
        contextObj.CalendarObj = contextObj.getFormattedDate(CalDate);
        contextObj.administrationService.getCalendarExceptionDataList(this.CalendarId).subscribe(function (result) {
            debugger
            contextObj.exceptionitemsSource = JSON.parse(result["Data"].FieldBinderData);
            if (result["Data"].DataCount != 0)
                contextObj.enableButton = false;
            else
                contextObj.enableButton = true;
            //contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.ddlCalendar.LookupDetails.LookupValues.length > 0) {
                for (var cnt = 0; cnt < contextObj.ddlCalendar.LookupDetails.LookupValues.length; cnt++) {
                    if (contextObj.ddlCalendar.LookupDetails.LookupValues[cnt].Id == CalendarId) {
                        contextObj.exceptiongridHead = contextObj.ddlCalendar.LookupDetails.LookupValues[cnt].Value + " - Exceptions";
                    }
                }
            }
        });
        debugger
        this.StartDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        this.EndDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        contextObj.getCalendarExceptionDays();
        setTimeout(function () {
            contextObj.enableCalendar = true;
        }, 10);
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
        }
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(this.CalendarId);
    };
    public onSort(objGrid: any) {
        this.dataLoad(this.CalendarId);
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Calendar";
        this.administrationService.getCreateNewCalendarFields().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd = resultData["Data"];
            for (let i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                if (contextObj.fieldDetailsAdd[i]["FieldId"] == 2806) {
                    contextObj.fieldDetailsAdd[i].LookupDetails.LookupValues = [];
                    contextObj.fieldDetailsAdd[i].LookupDetails.LookupValues.push({ Id: 0, Value: "Create New Base Calendar", IsDisabled: false });
                    contextObj.fieldDetailsAdd[i].LookupDetails.LookupValues.push({ Id: 1, Value: "Make a copy of", IsDisabled: false });
                    contextObj.fieldDetailsAdd[i].FieldValue = "0";
                }
                if (contextObj.fieldDetailsAdd[i]["FieldId"] == 2828) {
                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                }
                if (contextObj.fieldDetailsAdd[i]["FieldId"] == 2807) {
                    contextObj.fieldDetailsAdd[i]["FieldValue"] = "1";
                }
            }
            contextObj.IsNewCalendar = true;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }


    submitReturn(event) {
        var contextObj = this;
        contextObj.CalenderdropdownId = event.ServerId;
        // contextObj.ngOnInit();
        contextObj.updateCalendarddl();
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
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
    prevMonClick(event) {
        this.CalendarObj = event.selectedDate;
        this.StartDate = new Date(new Date(event.selectedDate).getFullYear(), new Date(event.selectedDate).getMonth(), 1);
        this.EndDate = new Date(new Date(event.selectedDate).getFullYear(), new Date(event.selectedDate).getMonth() + 1, 0);
        this.getCalendarExceptionDays();
        this.enableCalendar = true;
    }
    nextMonClick(event) {
        this.CalendarObj = event.selectedDate;
        this.StartDate = new Date(new Date(event.selectedDate).getFullYear(), new Date(event.selectedDate).getMonth(), 1);
        this.EndDate = new Date(new Date(event.selectedDate).getFullYear(), new Date(event.selectedDate).getMonth() + 1, 0);
        this.getCalendarExceptionDays();
        this.enableCalendar = true;
    }
    btnClick(event) {
        var contextObj = this;
        if (parseInt(this.ddlCalendar.FieldValue) > -1) {
            var reportfieldIdValues = new Array<ReportFieldArray>();
            reportfieldIdValues.push({ ReportFieldId: 6452, Value: this.ddlCalendar.FieldValue });
            reportfieldIdValues.push({ ReportFieldId: 6454, Value: event.selectedDate });
            this.administrationService.getWorkingTimeBasedOnDateList(JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                contextObj.totalItems = result["Data"].DataCount;
                var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                var day = new Date(event.selectedDate);
                if (contextObj.itemsSource.length > 0) {
                    contextObj.gridHead = "Working Time for " + event.selectedDate;
                    if (contextObj.getFormattedDate(today) == contextObj.getFormattedDate(day)) {
                        contextObj.gridHead = "Working Time for " + event.selectedDate + "(Today)";
                    }
                }
                else {
                    contextObj.gridHead = event.selectedDate + " is a Nonworking Day";
                    if (contextObj.getFormattedDate(today) == contextObj.getFormattedDate(day)) {
                        contextObj.gridHead = event.selectedDate + "(Today) is a Nonworking Day";
                    }
                }           
            });
        }
    }
    AddExceptionClick(event) {
        debugger
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Exception";
        this.IsNewCalendar = false;
        if (this.CalendarId > 0) {
            this.administrationService.loadCalendarExceptionAddEditFields( 0, 0, 1).subscribe(function (resultData) {
                debugger
                contextObj.exceptionAddEditfields = resultData["Data"];
                contextObj.fieldDetailsEdit = null;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Select a Calendar", 5);
        }     
    }
    EditExceptionClick(event) {
        debugger
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Exception";
        this.IsNewCalendar = false;
        if (this.exceptioninputItems.selectedIds != undefined && this.exceptioninputItems.selectedIds.length == 1) {
            this.administrationService.loadCalendarExceptionAddEditFields(0, this.exceptioninputItems.selectedIds[0], 1).subscribe(function (resultData) {
                debugger
                contextObj.exceptionAddEditfields = resultData["Data"];
                contextObj.fieldDetailsEdit = contextObj.exceptioninputItems.rowData;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else {
            //contextObj.notificationService.ShowToaster("Select an item", 5);
        }   
    }
    DeleteExceptionClick(event) {
        if (this.CalendarId > 0) {
            if (this.exceptioninputItems.selectedIds.length == 1) {
                this.showSlide = !this.showSlide;
            }
            else if (this.exceptioninputItems.selectedIds.length < 1) {
                this.notificationService.ShowToaster("Select an Exception", 2);
            }
            else if (this.exceptioninputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
        }   
    }
   
    okDelete(event: any) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        this.deleteException();
    }
    deleteException() {
        var contextObj = this;
        this.administrationService.postCalendarExceptionDelete(this.exceptioninputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.exceptionitemsSource, "delete", '', contextObj.exceptioninputItems.selectedIds, contextObj.exceptioninputItems.dataKey, contextObj.totalItems);
                contextObj.exceptionitemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                contextObj.notificationService.ShowToaster("Exception deleted", 3);
                contextObj.dataLoad(this.CalendarId);
            }
        });
    }
    submitCalExceReturn(event) {
        debugger
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        //if (this.action == "add") {
        //    retUpdatedSrc = this.generFun.updateDataSource(contextObj.exceptionitemsSource, "add", event, contextObj.exceptioninputItems.selectedIds, contextObj.exceptioninputItems.dataKey, contextObj.totalItems);
        //    this.totalItems = retUpdatedSrc["itemCount"];
        //    contextObj.exceptionitemsSource = retUpdatedSrc["itemSrc"];
        //} else {
        //    retUpdatedSrc = this.generFun.updateDataSource(contextObj.exceptionitemsSource, "edit", event, contextObj.exceptioninputItems.selectedIds, contextObj.exceptioninputItems.dataKey, contextObj.totalItems);
        //    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //}
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        contextObj.dataLoad(this.CalendarId);
        contextObj.enableCalendar = false;
    }
    getCalendarExceptionDays() {
        var contextObj = this;
        this.ExceptionDays = [];
        this.administrationService.getCalendarExceptionDays(this.CalendarId, this.getFormattedDate(this.StartDate), this.getFormattedDate(this.EndDate)).subscribe(function (resultData) {
            contextObj.ExceptionDays = JSON.parse(resultData.FieldBinderData);
        });
    }

    updateCalendarddl(){
        this.alignContent = "horizontal";
        var contextObj = this;
        this.administrationService.getCalendarFields().subscribe(function (resultData) {
            debugger
            contextObj.ddlCalendar = resultData["Data"].find(function (el) { return el.ReportFieldId === 5416; });

            //if (contextObj.ddlCalendar.FieldValue != null) {
                contextObj.ddlCalendar.FieldValue = contextObj.CalenderdropdownId;
            //}

            var removeArr = [5416];
            contextObj.administrationService.getWorkingTimeFields().subscribe(function (resultData1) {
                contextObj.fieldObject = resultData1["Data"];
            });
            contextObj.administrationService.getCalendarExceptionFields().subscribe(function (resultData2) {
                contextObj.exceptionfieldObject = resultData2["Data"];
            });
            if (contextObj.ddlCalendar.LookupDetails.LookupValues == "") {
                contextObj.notificationService.ShowToaster("No Calendars exist", 2);
            }
            this.itemsSource = [];
            contextObj.WorkingDays = [0, 1, 2, 3, 4, 5, 6];
            contextObj.StartWeekDay = 0;
            var CalDate = new Date();
            contextObj.CalendarObj = contextObj.getFormattedDate(CalDate);
        });
    }

}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}