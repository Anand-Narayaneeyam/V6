import {Component, Output, EventEmitter, Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {TimeComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/timecomponent.component'
import { DateTimeComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/datetimecomponent.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'setWorkingTime',
    templateUrl: 'app/Views/Administration/General Settings/setWorkingTime.component.html',
    providers: [AdministrationService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, GridComponent, TimeComponent, DateTimeComponent,SlideComponent],
    inputs: ['calendarName','workTimedata'],
})

export class SetWorkingTimeComponent { 
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() calendarName: string;
    @Input() workTimedata: any[]; 
    @Output() submitSuccess = new EventEmitter();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    fieldObjectFrom;
    fieldObjectTo;
    public mytime: Date = new Date();
    nowTime: string;
    itemsSource: any[];
    itemsSourceT: any[];
    totalItems: number = 0;
    pageIndex: number = 0;
    fieldObject: IField[];
    StartTime;
    EndTime;
    refreshgrid = [];
    addBtnName: string = "Add";
    position = "top-right";
    showSlide = false;
    slidewidth = 280;
    message = "Are you sure you want to delete the selected Working Time?";
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {        
        var contextObj = this;
        this.administrationService.getWorkingTimeFields().subscribe(function (resultData) {            
            contextObj.fieldObject = resultData["Data"];
            contextObj.nowTime = contextObj.getformattedDataTimeonSelection("");
            contextObj.fieldObjectFrom = resultData["Data"].find(function (el) { return el.ReportFieldId === 5496; });
            contextObj.fieldObjectFrom.FieldValue = contextObj.nowTime;
            contextObj.fieldObjectTo = resultData["Data"].find(function (el) { return el.ReportFieldId === 5497; });
            contextObj.fieldObjectTo.FieldValue = contextObj.nowTime;
            contextObj.loaddata();
        });
    }

    loaddata() { 
        var contextObj = this;        
        if (contextObj.workTimedata.length == 0) {
            contextObj.administrationService.getWorkingTimeData().subscribe(function (result) {                
                contextObj.totalItems = result["Data"].DataCount; 
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            });
        }
        else {
            contextObj.itemsSource = contextObj.workTimedata;
        }
    }

    getformattedDataTimeonSelection(dt) {
        var strDate = "";
        var date;
        var time;
        var hh;
        var hour;
        var min;
        var meridian;
        if (dt != "") {
            date = new Date(dt);
        }
        else {
            date = new Date();
        }       
        hh = this.mytime.getHours();
        min = (this.mytime.getMinutes()  < 10 ? '0' : '') + this.mytime.getMinutes();
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
        //strDate = hour + ":" + min + " " + meridian;
        return strDate;
    }
    AddClick() {        
        var contextObj = this;
        var startTime = <HTMLInputElement>document.getElementById('5496');
        var endTime = <HTMLInputElement>document.getElementById('5497');
        this.StartTime = startTime.value;
        this.EndTime = endTime.value;
        var sTime = new Date("1900/01/01 " + startTime.value);
        var eTime = new Date("1900/01/01 " + endTime.value);
        if (this.StartTime == "") {
            contextObj.notificationService.ShowToaster("Set Start Time", 2);
            return;
        }
        else if (this.EndTime == "") {
            contextObj.notificationService.ShowToaster("Set End Time", 2);
            return;
        }
        for (var j = 0; j  < this.itemsSource.length; j++)
        {
            if (this.addBtnName == "Add" || this.itemsSource[j].Id != contextObj.inputItems.selectedIds)
            {     
                if ((eTime > new Date("1900/01/01 " + this.itemsSource[j]["Start Time"]) && sTime < new Date("1900/01/01 " + this.itemsSource[j]["End Time"]))                    
                    || (sTime == new Date("1900/01/01 " + this.itemsSource[j]["Start Time"]) && eTime == new Date("1900/01/01 " + this.itemsSource[j]["End Time"]))
                    )
                {
                    contextObj.notificationService.ShowToaster("Overlap not allowed", 2);
                    return;
                }
            }
        }

        if (sTime < eTime) {
            if (this.addBtnName == "Add") {
                //this.itemsSource.push({ RowIndex:  1, Id: 0, ["Start Time"]: this.StartTime, ["End Time"]: this.EndTime });
                if (this.itemsSource.length == 0) {
                    this.itemsSource = [{ RowIndex: this.itemsSource.length + 1, Id: this.itemsSource.length, ["Start Time"]: this.StartTime, ["End Time"]: this.EndTime }];
                }
                else {
                    this.itemsSource.push({ RowIndex: this.itemsSource.length + 1, Id: this.itemsSource.length, ["Start Time"]: this.StartTime, ["End Time"]: this.EndTime });
                    this.itemsSourceT = this.itemsSource;
                    this.itemsSource = this.itemsSourceT;
                }
                this.totalItems = this.itemsSource.length;
            }
            else {
                this.itemsSourceT = this.itemsSource;
                for (var cnt = 0; cnt < this.itemsSourceT.length; cnt++) {
                    if (this.itemsSourceT[cnt].Id == contextObj.inputItems.selectedIds) {
                        this.itemsSourceT[cnt]["Start Time"] = this.StartTime;
                        this.itemsSourceT[cnt]["End Time"] = this.EndTime;
                    }
                }
                this.itemsSource = this.itemsSourceT;
                contextObj.addBtnName = "Add";
            }
            this.refreshgrid = this.refreshgrid.concat([true]);
        }
        else {
            contextObj.notificationService.ShowToaster("End Time should be greater than Start Time", 2);
        }
    }
    DeleteClick() {        
        this.showSlide = !this.showSlide;
    }
    delete() {
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 1) {
            let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
    }
    EditClick() {        
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 1) {
            contextObj.fieldObjectFrom.FieldValue = contextObj.inputItems.rowData["Start Time"];
            contextObj.fieldObjectTo.FieldValue = contextObj.inputItems.rowData["End Time"];
            contextObj.addBtnName = "Save Changes";
        }
    }
    SaveClick() {        
        var contextObj = this;
        contextObj.submitSuccess.emit({ "returnData": contextObj.itemsSource });
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.delete();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}