
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {DateComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { CustomCheckBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { Searchforschedule } from '../seat booking/customsearchforscheduling.component';
import { BookEquipmentComponent } from './bookequipment.component';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

@Component({
    selector: 'reserveequipmentslist',
    templateUrl: './app/Views/Scheduling/Equipment Reservation/reserveequipmentlist.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, FieldComponent,
        DropDownListComponent, DateComponent, PagingComponent, PageComponent, CustomCheckBoxComponent, SlideComponent, Searchforschedule, BookEquipmentComponent],
    providers: [ValidateService, SchedulingService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    encapsulation: ViewEncapsulation.None
})

export class ReserveEquipmentListComponent implements OnInit {
    disableDates: Array<string> = ["Sunday", "Saturday"];
    itemsSource: any[];
    fieldObject: IField[];
    selRowData: any;
    itemsPerPage: number = 0;
    totalItems: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Id", selectioMode: 'single', sortDir: 'ASC', sortCol: '', allowAdd: false, allowEdit: false };
    pageTitle: string = "";
    pagePath: string = "";
    FromdateObj: IField;
    TodateObj: IField;
    FromTimeObj: IField;
    ToTimeObj: IField;

    FromDate: string;
    ToDate: string;
    Sitetime: string;
    Fromtime: any;
    Totime: any;
    timeid: number;
    Dateforcalender: string;
    TommorrowDate: string;
    SearchToDate: string;
    DateforcalenderSearch: string;
    isChkBxChecked = 1;
    sessionUserId = 0;
    sessionUserRoleId = 0;

    isReserved: boolean = false;
    showBookEqpt: boolean = false;

    showSearchFilter;
    keyWordLookup: any;
    KeywordFieldObject: any;
    advancelookup: IField[];
    IsAdvanceSearch = 0;
    advanceValue = "[]";
    constructor(private schedulingService: SchedulingService, private notificationService: NotificationService, private generFun: GeneralFunctions, private validateService: ValidateService) {
    }


    ngOnInit(): void {
        var contextObj = this;
        contextObj.pagePath = "Scheduling / Reserve Equipment";
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        if (m > 30) {
            n = n + 1;
            contextObj.timeid = (n * 2)
        }
        else
            contextObj.timeid = (n * 2) + 1;
        if (contextObj.timeid >= 38)
            contextObj.timeid = 12;
        var t = new Date();
        t.setDate(t.getDate() + 1);
        var tommorowdate = contextObj.getFormattedDate(t);
        var todaydate = contextObj.getFormattedDate(new Date());
        this.TommorrowDate = tommorowdate;
        this.Dateforcalender = todaydate;
        if (contextObj.timeid == 12) {
            this.FromDate = tommorowdate;
            this.ToDate = tommorowdate;
        }
        else {
            this.FromDate = todaydate;
            this.ToDate = todaydate;
        }
        this.SearchToDate = todaydate;

        contextObj.schedulingService.getEquipmentReservationListfields().subscribe(function (resultData) {
            var rptFieldForSearch = [12389, 12390, 12411, 12417];
            var fldObjArray = [];
            var len = resultData["Data"].length;
            for (var i = 0; i < len; i++) {
                var rptFldId = resultData["Data"][i].ReportFieldId;
                debugger
                switch (rptFldId) {
                    case 6731:
                        resultData["Data"][i].isContentHtml = "hyperlink";
                        break;
                    case 12389:
                        resultData["Data"][i].Width = 150;
                        resultData["Data"][i].IsHiddenLabel = true;
                        contextObj.FromdateObj = resultData["Data"][i];
                    case 12390:
                        resultData["Data"][i].Width = 150;
                        resultData["Data"][i].IsHiddenLabel = true;
                        contextObj.TodateObj = resultData["Data"][i];
                        break;
                    case 12411:
                        resultData["Data"][i].Width = 100;
                        resultData["Data"][i].IsHiddenLabel = true;
                        contextObj.FromTimeObj = resultData["Data"][i];
                        contextObj.FromTimeObj.LookupDetails.LookupValues.splice(26, 26);
                        break;
                    case 12417:
                        resultData["Data"][i].Width = 100;
                        resultData["Data"][i].IsHiddenLabel = true;
                        contextObj.ToTimeObj = resultData["Data"][i];
                        contextObj.ToTimeObj.LookupDetails.LookupValues.splice(0, 1);
                        break;
                }
                if (rptFieldForSearch.indexOf(resultData["Data"][i].ReportFieldId) == -1) {
                    fldObjArray.push(resultData["Data"][i]);
                }
                if (i == len - 1) {

                    contextObj.fieldObject = fldObjArray;
                    if (contextObj.timeid == 12) {
                        contextObj.FromdateObj.FieldValue = contextObj.TommorrowDate;
                        contextObj.TodateObj.FieldValue = contextObj.TommorrowDate;
                    }
                    else if (contextObj.timeid >= 38)
                        contextObj.TodateObj.FieldValue = contextObj.TommorrowDate;
                    else if (contextObj.timeid > 12 && contextObj.timeid < 38) {
                        contextObj.FromdateObj.FieldValue = todaydate;
                        contextObj.TodateObj.FieldValue = todaydate;
                    }
                    else if (contextObj.timeid < 12) {
                        contextObj.FromdateObj.FieldValue = todaydate;
                        contextObj.TodateObj.FieldValue = todaydate;
                        contextObj.timeid = 12;
                    }
                    contextObj.FromTimeObj.FieldValue = contextObj.FromTimeObj.LookupDetails.LookupValues[contextObj.timeid - 12].Id.toString();
                    var totimeid;
                    if (contextObj.timeid >= 38)
                        totimeid = 12;
                    else
                        totimeid = contextObj.timeid + 1;
                    contextObj.ToTimeObj.FieldValue = contextObj.ToTimeObj.LookupDetails.LookupValues[totimeid - 13].Id.toString();
                }
            }
            contextObj.ReserveEquipmentdataLoad(contextObj);
        });

        contextObj.getSessionUserData();
    }

    public ReserveEquipmentdataLoad(contextObj, target?: number) {
        var fromtime = contextObj.FromTimeObj.LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.FromTimeObj.FieldValue)) });
        var totime = contextObj.ToTimeObj.LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.ToTimeObj.FieldValue)) });
        var fromdateTime = contextObj.FromDate + fromtime[0].Value;
        var todateTime = contextObj.ToDate + totime[0].Value;
        var isDataload = true;

        if (target == 1) /*Search button click data load*/ {
            //var subDatefromTime = contextObj.FromDate + fromtime[0].Value.substring(0, fromtime[0].Value.length - 2) + ":00 " + fromtime[0].Value.substring(fromtime[0].Value.length - 2, fromtime[0].Value.length);
            //var subDatetoTime = contextObj.ToDate + totime[0].Value.substring(0, totime[0].Value.length - 2) + ":00 " + totime[0].Value.substring(totime[0].Value.length - 2, totime[0].Value.length);
            //if ((contextObj.FromDate == contextObj.ToDate) && fromtime && totime && (Number(fromtime[0].Id) >= Number(totime[0].Id))) {
            //    contextObj.notificationService.ShowToaster("To time must be greater than From time", 2);
            //    isDataload = false;
            //} else if (new Date(subDatefromTime) > new Date(subDatetoTime)) {
            //    contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);

            //}  

            if (new Date(contextObj.FromDate) > new Date(contextObj.ToDate)) {
                contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
                isDataload = false;
            }
            else if (fromtime && totime && (Number(fromtime[0].Id) >= Number(totime[0].Id))) {
                contextObj.notificationService.ShowToaster("To time must be greater than From time", 2);
                isDataload = false;
            }

        }

        if (isDataload) {
            contextObj.schedulingService.getReserveEquipmentListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, fromdateTime, todateTime, target, contextObj.advanceValue).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                if (contextObj.totalItems > 0) {
                    contextObj.itemsPerPage = resultData.RowsPerPage;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Equipment is available for reservation", 2)
                }
            });
        }


    }

    private getSessionUserData() {
        var context = this;
        this.schedulingService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            context.sessionUserId = retData["UserId"];
            context.sessionUserRoleId = retData["UserRoleId"];
        });
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
    private dateSearchClick(event: any, target) {
        var date = event["FieldObject"]["FieldValue"];
        if (target == 1) {
            this.FromDate = date;
            this.ToDate = date;
            var elem = <HTMLInputElement>document.getElementsByClassName("date-picker")[1];
            elem.value = date;
            if (this.getFormattedDate(new Date()) == this.getFormattedDate(date)) {
                this.DateforcalenderSearch = "";
            }
            else
                this.DateforcalenderSearch = date;
        } else {
            this.ToDate = date;

        }
        this.SearchToDate = date;
    }

    private OnSearchBtnClick(event: any) {
        this.ReserveEquipmentdataLoad(this, 1);
    }



    chkboxClick(event) {
        var contextObj = this;
        var srcelment = event.target || event.srcElement;
        this.isChkBxChecked = srcelment.checked == true ? 1 : 0;
        this.pageIndex = srcelment.checked == true ? 0 : this.pageIndex;
        this.itemsSource = [];
        this.ReserveEquipmentdataLoad(contextObj);
    }

    private onHyperLinkClick(event) {
        var colName = event["colName"];
        this.selRowData = event["selRowData"];
        this.showBookEqpt = false;
        //if (this.isReserved == false)
        switch (colName) {
            case "Book Equipment":
                if (this.selRowData["Equipment Quantity"] > 0) {
                    this.bookEquipment();
                } else {
                    this.notificationService.ShowToaster("All '" + this.selRowData["Equipment Type"] + "s' are already reserved", 2);
                }
                break;
        }
        //this.isReserved = false;
    }

    private bookEquipment() {
        var context = this;
        //context.schedulingService.getTimeforspace(selRowdata["SpaceId"]).subscribe(function (resulttime) {          
        //    context.Sitetime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
        //    context.splitviewInput.showSecondaryView = true;
        //    context.showBookEqpt = true;
        //});
        context.selRowData.FromDateVal = context.FromDate;
        context.selRowData.ToDateVal = context.ToDate;
        context.selRowData.FromTimeVal = context.FromTimeObj;
        context.selRowData.ToTimeVal = context.ToTimeObj;

        context.pageTitle = "Reserve Equipment";
        context.splitviewInput.showSecondaryView = true;
        context.showBookEqpt = true;
    }
    private pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.ReserveEquipmentdataLoad(contextObj);
    }

    private onSort(objGrid: any) {
        this.ReserveEquipmentdataLoad(this);
    }

    private onChangefrom(event: any) {
        var contextObj = this;
        if (event != "-1") {
            var timeid = parseInt(event);
            if (event == "39") {
                timeid = 13;
                contextObj.TodateObj.FieldValue = contextObj.TommorrowDate;
            }
            else
                contextObj.TodateObj.FieldValue = contextObj.ToDate;
            contextObj.ToTimeObj.FieldValue = contextObj.ToTimeObj.LookupDetails.LookupValues[timeid - 13].Id.toString();
            var ele = document.getElementsByClassName("ddl ng-invalid ng-dirty ng-touched");

            if (ele.length > 0) {
                var focusingElmt = <HTMLElement>ele[ele.length - 1];
                focusingElmt.focus();
                this.validateService.initiateValidation(contextObj.ToTimeObj, this, true, focusingElmt);
            }
        }
    }

    reserveEquipmtSubmitRet(event) {

        if (event["success"]) {
            var context = this;
            context.isReserved = true;
            this.ReserveEquipmentdataLoad(context);
            this.splitviewInput.showSecondaryView = false;
        }
    }
    private advanceSearch() {
        var contextObj = this;
        this.schedulingService.getEquipmentAdvnceSearchLookup().subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
        });
    }
    Submit(event: any) {
        var contextObj = this;
        contextObj.showSearchFilter = [];
        this.IsAdvanceSearch = 1;
        var contextObj = this;

        contextObj.advanceValue = event.fieldobject;
        var fromdateTime = event.fromdateTime;
        var todateTime = event.todateTime;
        var fromtime;
        var totime;
        if (fromdateTime.indexOf("PM") > 0)
            fromtime = fromdateTime.replace("PM", ":00 PM")
        else if (fromdateTime.indexOf("AM") > 0)
            fromtime = fromdateTime.replace("AM", ":00 AM")
        if (todateTime.indexOf("PM") > 0)
            totime = todateTime.replace("PM", ":00 PM")
        else if (todateTime.indexOf("AM") > 0)
            totime = todateTime.replace("AM", ":00 AM")
        if (new Date(fromtime) >= new Date(totime)) {
            contextObj.showSearchFilter = contextObj.showSearchFilter.concat(true);
            contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
        }
        else {
            contextObj.itemsSource = [];
            contextObj.schedulingService.getReserveEquipmentListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.isChkBxChecked, fromdateTime, todateTime, 2, contextObj.advanceValue).subscribe(function (resultData) {
                contextObj.totalItems = resultData.DataCount;
                contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                contextObj.itemsPerPage = resultData.RowsPerPage;
                if (contextObj.totalItems == 0) {
                    contextObj.notificationService.ShowToaster("No Equipment is available for the search criteria", 2)
                }
            });
        }
    }
    Clear(event) {
        this.advanceValue = '[]';
        this.ReserveEquipmentdataLoad(this);
    }
}