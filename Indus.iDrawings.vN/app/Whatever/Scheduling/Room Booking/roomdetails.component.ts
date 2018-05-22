import { Component, Output, OnInit, OnChanges, Renderer, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {FileViewer} from '../../../framework/whatever/fileviewer/fileviewer.component';
import {DashboardSchedulerComponent} from '../../../Framework/Whatever/Scheduler/dashboardscheduler.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { BookSeatComponent } from '../../Scheduling/Seat Booking/bookseat.component';
import {DateComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';

@Component({
    selector: 'roomdetails',
    templateUrl: './app/Views/Scheduling/Room Booking/roomdetails.component.html',
    directives: [FieldComponent, Notification, FileViewer, DashboardSchedulerComponent, SplitViewComponent, BookSeatComponent, DateComponent],
    providers: [SchedulingService, NotificationService, AdministrationService],
    inputs: ['selectedId', 'Todaydate','selSeatId','SeatNo','site','building','floor']
})

export class Roomdetails implements OnInit {
    seattxt = "Workspace";
    selectedId: number;
    Todaydate: string;
    Roomno: string;
    SpaceFunction: string;
    SeatingCapacity: string;
    Area: string;
    showAttachment: boolean = false;
    roomdetails: any[];
    amenityforroomdata: any[];
    @Input() Target: number;
    totalItems2: number = 0;
    seatday = [];
    selSeatId: any;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    fieldDetailsBook: IField[];
    showBookSeat = true;
    pageTitle = "Reserve Workspace";
    secondaryTarget = 1;
    FromDate = "";
    ToDate = "";
    SeatNo: string;
    Dateforcalender: any;
    dateSelectorField: IField[];
    StartDate: string;
    EndDate: string;
    sessionUserRoleId = 0;
    sessionUserId = 0;
    schedulerArrObj = new Array<ISchedulerObj>();
    IsAddpageopened: boolean = false;
    site: string;
    building: string;
    floor: string;
    ToTime: string;
    spaceFunText: string;
    enableAminity: boolean = false;
    constructor(private SchedulingService: SchedulingService, private _notificationService: NotificationService, private AdministrationService: AdministrationService) {
    }
    ngOnInit() {
        var contextobj = this;
        contextobj.showAttachment = false;
        var d = new Date(contextobj.Todaydate);
        var n = d.getHours(); 
        //
        var today6AM = new Date(contextobj.Todaydate);
        today6AM.setHours(6, 0, 0, 0);
        var today630PM = new Date(contextobj.Todaydate);
        today630PM.setHours(18, 30,0,0);
        var tomorrow = new Date(contextobj.Todaydate).setDate(new Date(contextobj.Todaydate).getDate() + 1);
        var tomorrow6AM = new Date(tomorrow);
        tomorrow6AM.setHours(6, 0, 0, 0);
        if (d > today630PM && d < tomorrow6AM) {
            contextobj.Todaydate = tomorrow6AM.toISOString().slice(0, -1);
            n = 6;
        }
        else if (d < today6AM){
            contextobj.Todaydate = today6AM.toISOString().slice(0, -1);
            n = 6;
        }
        //
        contextobj.GetSpacefunctionname();
        var checkslotavailable = new Array<chkReservationavailable>();
        checkslotavailable.push({ ReportFieldId: 6712, Value: contextobj.selectedId.toString() });
        checkslotavailable.push({ ReportFieldId: 6714, Value: contextobj.Todaydate });
        checkslotavailable.push({ ReportFieldId: 6715, Value: contextobj.Todaydate });  
        var todaysDate = contextobj.getFormattedDate(new Date(contextobj.Todaydate));            
        var yestDate = contextobj.getFormattedDate(new Date(contextobj.Todaydate).setDate(new Date(contextobj.Todaydate).getDate() - 1));
        contextobj.Dateforcalender = yestDate; 
        setTimeout(function () {
            contextobj.Dateforcalender = contextobj.getFormattedDate(new Date(contextobj.Todaydate));            
        },2000);        
        contextobj.SchedulingService.getReserveRoomFields().subscribe(function (resultData) {
            contextobj.dateSelectorField = [];
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 900197)
                    contextobj.dateSelectorField.push(item);
            });
            contextobj.dateSelectorField[0].FieldValue = contextobj.Todaydate;
        });
        contextobj.SchedulingService.Roomdetailsdata(JSON.stringify(checkslotavailable)).subscribe(function (result) {
            contextobj.roomdetails = JSON.parse(result["Table1"]);
            contextobj.amenityforroomdata = JSON.parse(result["Table2"]);
            contextobj.Roomno = contextobj.roomdetails[0]["RoomNo"];
            contextobj.SpaceFunction = contextobj.roomdetails[0]["SpaceFunctionsName"];
            contextobj.SeatingCapacity = contextobj.roomdetails[0]["MaximumSeats"];
            contextobj.Area = contextobj.roomdetails[0]["Area"];
            if (contextobj.roomdetails[0]["AttachmnetCount"] != "None")
                contextobj.showAttachment = true;
        });
        if (contextobj.Target == 2) {
            this.SchedulingService.getSeatReservationCalendarForDashboard(4, 0, todaysDate, todaysDate, contextobj.selSeatId[0]).subscribe(function (resultData) {
                var table2 = JSON.parse(resultData);
                contextobj.totalItems2 = table2.length;
                contextobj.seatday = [];
                for (let day of table2) {
                    contextobj.seatday.push(day.Day);
                }
                for (var i = 0; i < 48; i++) {
                    var time = contextobj.getSelectedTimefromId(i.toString())
                    if (table2["0"][time].trim().length > 0) {
                        var ff = table2["0"][time];
                        var bookstrig = "booked";
                        contextobj.schedulerArrObj.push({
                            rowNo: i,
                            bookedDates: [bookstrig],
                            strTooltip: ff
                        })
                    }
                }
            });
            contextobj.getSessionUserData(contextobj);
            setTimeout(function () {
                var $wjroot = $("div[wj-part='root']");
                var $scheduler = $("div[id='scheduler']");
                if (n > 3) {
                    $scheduler.scrollLeft(120 * n);
                }
            }, 2000);
        }
        this.checkSubscribedFeatures();
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.SchedulingService.checkSubscribedFeature('274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.seattxt = result["Data"][0].Value;
                contextObj.pageTitle = "Reserve " + contextObj.seattxt;
            }            
        });
        contextObj.SchedulingService.checkSubscribedFeature('282').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.enableAminity = result["Data"][0]["IsSubscribed"];
            }
        });
    }
    getSelectedTimefromId(id: string) {
        var splitVal;
        var time;
        if (id != "") {
            splitVal = id;
            switch (splitVal) {
                case "0": time = "0.00"; break;
                case "1": time = "0.30"; break;
                case "2": time = "1.00"; break;
                case "3": time = "1.30"; break;
                case "4": time = "2.00"; break;
                case "5": time = "2.30"; break;
                case "6": time = "3.00"; break;
                case "7": time = "3.30"; break;
                case "8": time = "4.00"; break;
                case "9": time = "4.30"; break;
                case "10": time = "5.00"; break;
                case "11": time = "5.30"; break;
                case "12": time = "6.00"; break;
                case "13": time = "6.30"; break;
                case "14": time = "7.00"; break;
                case "15": time = "7.30"; break;
                case "16": time = "8.00"; break;
                case "17": time = "8.30"; break;
                case "18": time = "9.00"; break;
                case "19": time = "9.30"; break;
                case "20": time = "10.00"; break;
                case "21": time = "10.30"; break;
                case "22": time = "11.00"; break;
                case "23": time = "11.30"; break;
                case "24": time = "12.00"; break;
                case "25": time = "12.30"; break;
                case "26": time = "13.00"; break;
                case "27": time = "13.30"; break;
                case "28": time = "14.00"; break;
                case "29": time = "14.30"; break;
                case "30": time = "15.00"; break;
                case "31": time = "15.30"; break;
                case "32": time = "16.00"; break;
                case "33": time = "16.30"; break;
                case "34": time = "17.00"; break;
                case "35": time = "17.30"; break;
                case "36": time = "18.00"; break;
                case "37": time = "18.30"; break;
                case "38": time = "19.00"; break;
                case "39": time = "19.30"; break;
                case "40": time = "20.00"; break;
                case "41": time = "20.30"; break;
                case "42": time = "21.00"; break;
                case "43": time = "21.30"; break;
                case "44": time = "22.00"; break;
                case "45": time = "22.30"; break;
                case "46": time = "23.00"; break;
                case "47": time = "23.30"; break;
            }
        }
        return time;
    }
    
    cellclicked(event) {
        debugger


        var context = this;
        //var frmTime = context.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.FromTime[0].FieldValue)) });
        //var toTime = context.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(context.ToTime[0].FieldValue)) });
        var timeid = event["id"].split("r")[1].split("c")[1];
        var totimeid = parseInt(timeid) + 1;
        if (timeid == "47")
            totimeid = 0;
        //var fromdateTime = context.FromDate + frmTime[0].Value;
        //var todateTime = context.ToDate + toTime[0].Value;
        context.ToTime = this.getSelectedTimefromId(totimeid.toString());
        context.ToTime = context.ToTime.replace(".", ":");
        this.SchedulingService.checkConflictedSeatRequestExists(context.selSeatId, event.day + " " + event.time, event.day + " " + context.ToTime).subscribe(function (resultData) {

            switch (resultData) {
                case 1:
                    var siteTimeZone = "";
                    context.SchedulingService.getSeatBookFields(context.selSeatId).subscribe(function (resultData) {
                        if (resultData["Data"]) {
                            for (var i = 0; i < resultData["Data"].length; i++) {
                                var holidays = [1, 7];
                                switch (resultData["Data"][i].FieldId) {
                                    case 1687://fromdate
                                        resultData["Data"][i].FieldValue = event.day;//context.FromDate;
                                        break;
                                    case 2306://recur   
                                        resultData.Data[i].LookupDetails.LookupValues = resultData.Data[i].LookupDetails.LookupValues.filter(function (item) {
                                            return item["Id"] < 6;
                                        });
                                        break;
                                    case 1695://fromtime   
                                        resultData["Data"][i].LookupDetails.LookupValues.splice(26, 26);                      
                                        resultData["Data"][i].FieldValue = resultData["Data"][1].LookupDetails.LookupValues[timeid-12].Id.toString();//event.time;//context.FromTime[0].FieldValue;
                                        break;
                                    case 1688://todate
                                        resultData["Data"][i].FieldValue = event.day;//context.ToDate;
                                        break;
                                    case 1696://totime
                                        resultData["Data"][i].LookupDetails.LookupValues.splice(0, 1);
                                        resultData["Data"][i].FieldValue = resultData["Data"][3].LookupDetails.LookupValues[(totimeid-13).toString()].Id.toString();//event.time;//context.ToTime[0].FieldValue;
                                        break;
                                    case 1697://group location
                                        resultData["Data"][i].IsVisible = false;
                                        break;
                                    case 1725:/*user type*/
                                        resultData["Data"][i].FieldValue = "1";
                                        resultData["Data"][i].IsVisible = false;
                                        //if (context.sessionUserRoleId == 4) {
                                        //    resultData["Data"][i].IsVisible = false;
                                        //}
                                        break;
                                    case 1692:/*booked for hiding for facility user*/
                                        resultData["Data"][i].FieldValue = context.sessionUserId;
                                        if (context.sessionUserRoleId != 7) {                                          
                                            resultData["Data"][i].IsVisible = false;
                                        }
                                        break;
                                    case 698:/*space function*/
                                        resultData["Data"][i].IsEnabled = false;
                                        break;
                                    case 2050:/*sitetimezone*/
                                        resultData["Data"][i].FieldValue = siteTimeZone;
                                        resultData["Data"][i].IsVisible = false;
                                        break;
                                    case 1981:/*location related space details hide*/
                                    case 1982:
                                    case 1983:
                                    case 1987:
                                        resultData["Data"][i].IsVisible = false;
                                        break;
                                    case 1984:
                                        resultData["Data"][i].IsVisible = false;
                                        resultData["Data"][i].FieldValue = resultData["Data"][i].FieldValue.toString().replace("'", "");
                                        break;
                                    case 465:
                                        resultData["Data"][i].IsVisible = true;
                                        break;
                                    case 1540:
                                        resultData["Data"][i].FieldValue = "1";
                                        break;
                                    case 1543:
                                        resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el)
                                        { return holidays.indexOf(el.Id) == -1; })
                                        break;
                                    case 1375:
                                        /*removes sat and sun from week days*/
                                        resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el)
                                        { return holidays.indexOf(el.Id) == -1; })
                                        resultData["Data"][i].FieldLabel = "";
                                        break;
                                    case 1372:
                                    case 1373:
                                    case 1374:
                                        resultData["Data"][i].FieldLabel = "";
                                        break;
                                    case 2040:
                                        resultData["Data"][i].IsVisible = false;
                                        break;
                                    case 2296:/*booked for textsearchlookup visible  for divadmin user*/
                                        if (context.sessionUserRoleId == 7) {
                                            resultData["Data"][i].HasAutoLookUp = true;
                                            resultData["Data"][i].IsVisible = true;
                                        }
                                        break;
                                }

                            }
                            if (context.sessionUserRoleId == 7) {
                                resultData["Data"].find(function (el) {
                                    if (el.FieldId == 2296) {
                                        var lookupobjFld = resultData["Data"].filter(function (el) { return el.FieldId === 1692; });
                                        el.LookupDetails = lookupobjFld[0].LookupDetails;
                                        return true;
                                    } else
                                        return false;
                                });
                            }        
                            context.fieldDetailsBook = resultData["Data"];
                            context.showBookSeat = true;
                            context.pageTitle = "Reserve " + context.seattxt;//"New " + context.seattxt +" Booking Request";
                            context.secondaryTarget = 1;
                            context.splitviewInput.showSecondaryView = true;
                        }
                    });
                    break;
                case -1:
                    context._notificationService.ShowToaster("Reservation exists", 2);
                    break;
                case -3:
                    context._notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2);
                    break;
                case -4:
                    context._notificationService.ShowToaster(context.seattxt + " booking can be done only 14 days in advance", 2);
                    break;
                case -5:
                    context._notificationService.ShowToaster("Reservation already exists for the selected user in the selected time slot", 2)
                    break;
                case -9:
                    context._notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                  
                    break;
            }           
            //context.fieldDetailsBook = resultData["Data"];
        });    


        
    }
    reserveSeatSubmitRet(event) {
        var contextobj = this;
        if (event["success"]) {
            this.SchedulingService.getSeatReservationCalendarForDashboard(4, 0, contextobj.Dateforcalender, contextobj.Dateforcalender, contextobj.selSeatId[0]).subscribe(function (resultData) {
                var table2 = JSON.parse(resultData);
                contextobj.totalItems2 = table2.length;
                contextobj.seatday = [];
                for (let day of table2) {
                    contextobj.seatday.push(day.Day);
                }
                contextobj.schedulerArrObj = [];
                for (var i = 0; i < 48; i++) {
                    var time = contextobj.getSelectedTimefromId(i.toString())
                    if (table2["0"][time].trim().length > 0) {
                        var ff = table2["0"][time];
                        var bookstrig = "booked";
                        contextobj.schedulerArrObj.push({
                            rowNo: i,
                            bookedDates: [bookstrig],
                            strTooltip: ff
                        })
                    }
                }
            });
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }
    getFormattedDate(dt) {
        var strDate = "";
        var date;
        if (dt != undefined) {
            date = new Date(dt);
        }
        else {
            date = new Date(this.Todaydate);
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        return strDate;
    }
    divClicked(event: any) {
        debugger
        var contextobj = this;
        this.Dateforcalender = event["FieldObject"]["FieldValue"];
        this.StartDate = this.Dateforcalender;
        this.EndDate = this.Dateforcalender;
        this.SchedulingService.getSeatReservationCalendarForDashboard(4, 0, contextobj.Dateforcalender, contextobj.Dateforcalender, contextobj.selSeatId[0]).subscribe(function (resultData) {
            var table2 = JSON.parse(resultData);
            contextobj.totalItems2 = table2.length;
            contextobj.seatday = [];
            for (let day of table2) {
                contextobj.seatday.push(day.Day);
            }
            contextobj.schedulerArrObj = [];
            for (var i = 0; i < 48; i++) {
                var time = contextobj.getSelectedTimefromId(i.toString())
                if (table2["0"][time].trim().length > 0) {
                    var ff = table2["0"][time];
                    var bookstrig = "booked";
                    contextobj.schedulerArrObj.push({
                        rowNo: i,
                        bookedDates: [bookstrig],
                        strTooltip: ff
                    })
                }
            }
        });
    }
    private getSessionUserData(contextObj) {
        contextObj.SchedulingService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];

        });


    }
    private GetSpacefunctionname() {
        var contextobj = this;
        this.AdministrationService.getSpaceFunctionCustomizedName().subscribe(function (resultData) {
            if (resultData.Data != undefined) {
                if (resultData.Data == "Space Functions") {
                    contextobj.spaceFunText = "Space Function";
                } else {
                    contextobj.spaceFunText = resultData.Data;
                }
            }
        });
    }

}
export interface chkReservationavailable {
    ReportFieldId: number;
    Value: string;
}
export interface ISchedulerObj {
    rowNo: number,
    bookedDates: string[],
    strTooltip: string
}