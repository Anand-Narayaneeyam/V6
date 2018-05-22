import {Component, Output, EventEmitter, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { SchedulingService } from '../../../models/scheduling/scheduling.service';
import { SeatResources } from './seatresourcelist.component';


@Component({
    selector: 'book-seat',
    templateUrl: './app/Views/Scheduling/Seat Booking/bookseat.component.html',
    providers: [NotificationService, SchedulingService],
    directives: [FieldComponent, SplitViewComponent, SeatResources],
    inputs: ['fieldDetailsBook', 'selSeatId'],
    encapsulation: ViewEncapsulation.None

})

export class BookSeatComponent implements OnInit {
    disableDates: Array<string> = ["Sunday", "Saturday"];
    selSeatId;
    splitviewInputbook: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    @Input() fieldDetailsBook: IField[];
    @Input() Sitetime: string;
    @Input() pageTarget: string;
    @Input() requestId: number;
    timearrayObj = [];
    timearrayObjFrom = [];
    isLocationView: boolean = false;
    pageTitle: string = "";
    @Output() reserveSeatReturn = new EventEmitter();
    isSubmit: boolean = false;
    showResource: boolean = false;
    existingResources = "";
    newResources = "";
    allresourcesText = [];
    allresourceCloneObj = [];
    seattxt = "Workspace";
    sessionUserRoleId;
    AdvanceResPeriod;
    MaxNoofReservation;
    constructor(private notificationService: NotificationService, private schedulingService: SchedulingService) {
    }

    ngOnInit() {
        debugger
        var contextObj = this;
        if (this.fieldDetailsBook) {
            this.timearrayObj = this.fieldDetailsBook.filter(function (el) { return el.ReportFieldId === 790; })
            this.timearrayObjFrom = this.fieldDetailsBook.filter(function (el) { return el.ReportFieldId === 6723; })

        }
        this.checkSubscribedFeatures();
        this.getSessionUserData();            
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.seattxt = result["Data"][0].Value;
            }            
        });
    }
    private onReserve(event) {
  
        var context = this;
        var fromDate = "";
        var fromTime = "";
        var toDate = "";
        var totime = "";
        var fromTimeIndex = "-1";
        var toTimeIndex = "-1";
        var bookedForId = 0;
        var selRecurrence = 0;
        var weekdaysArray = [];
        var freq = 1;
        if (this.isSubmit == false) {
            this.isSubmit = true;
            var addObj = JSON.parse(event["fieldobject"]);
            var findArray = [789, 790, 6723, 5714, 5612, 5615, 12322];
            var count = 8;

            addObj.find(function (el) {
                switch (el.ReportFieldId) {
                    case 789:
                        if (fromDate == "") {
                            fromDate = el.Value;
                        } else {
                            toDate = el.Value;
                        }
                        count--;
                        break;

                    case 6723:
                        fromTimeIndex = el.Value;
                        var filObjTime = context.timearrayObjFrom[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(el.Value)) });
                        fromTime = filObjTime[0].Value;
                        count--;
                        break;
                    case 790:
                        toTimeIndex = el.Value;
                        var filObjTime = context.timearrayObj[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(el.Value)) });
                        totime = filObjTime[0].Value;
                        count--;
                        break;
                    case 5714:/*user categoryId*/
                        el.Value = el.Value == "1" ? "7" : "2";
                        count--;
                        break;
                    case 8641:/*Bookedfor userId*/
                        bookedForId = el.Value;
                        count--;
                        break;
                    case 5612:/*recurrence pattern id*/
                        selRecurrence = el.Value;
                        count--;
                        break;
                    case 12322:/*recurrence every*/
                        freq = el.Value;
                        count--;
                        break;

                    //case 5615:/*weekdays*/
                    //    weekdaysArray.push(el.Value);
                    //    count--;
                    //    break;  

                }
                if (count == 0)
                    return true;
                else return false;
            });

            weekdaysArray = addObj.filter(function (el) { return el.ReportFieldId == 5615 });
            //addObj.remove(addObj.find(function (el) { return el.ReportFieldId===791 }))
            var currDateTime;
            if (context.Sitetime != undefined)
                currDateTime = new Date(context.Sitetime);
            else
                currDateTime = new Date();
            var fromdateTime = fromDate + fromTime;
            var todateTime = toDate + totime;

            var subDatefromTime = fromDate + fromTime.substring(0, fromTime.length - 2) + ":00 " + fromTime.substring(fromTime.length - 2, fromTime.length);
            var subDatetoTime = toDate + totime.substring(0, totime.length - 2) + ":00 " + totime.substring(totime.length - 2, totime.length);

            if (new Date(subDatefromTime) < currDateTime) {
                context.notificationService.ShowToaster("From date and time must be greater than the Current date and time", 2);
                this.isSubmit = false;
            }
            else if (new Date(subDatetoTime) < currDateTime) {
                context.notificationService.ShowToaster("To time must be greater than Current time", 2);
                this.isSubmit = false;
            }
            else if ((Number(fromTimeIndex) >= Number(toTimeIndex))) {
                //context.notificationService.ShowToaster("To time must be greater than From time", 2);
                context.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
                this.isSubmit = false;
            }
            else if (new Date(subDatefromTime) >= new Date(subDatetoTime)) {
                //context.notificationService.ShowToaster("To date must be greater than From date", 2);
                context.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
                this.isSubmit = false;
            }


            else if (selRecurrence == 2 && weekdaysArray.length == 0) {
                context.notificationService.ShowToaster("Select Week Day(s)", 2);
                this.isSubmit = false;
            }
            else {
                addObj.push({ "ReportFieldId": 6714, "Value": fromdateTime },
                    { "ReportFieldId": 6715, "Value": todateTime });

                //var Id = context.pageTarget != "Edit" ? context.selSeatId[0] : context.requestId;
                this.schedulingService.insertUpdateSeatReservationwithConflictChecking(context.selSeatId[0], fromdateTime, todateTime, bookedForId, selRecurrence, context.requestId, weekdaysArray, freq, JSON.stringify(addObj), context.existingResources, context.newResources, 1, context.pageTarget).subscribe(function (resultData) {
                    switch (resultData) {
                        case -1:
                            context.notificationService.ShowToaster("Reservation exists", 2)
                            context.isSubmit = false;
                            break;
                        case -3:
                            context.notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2)
                            context.isSubmit = false;
                            break;
                        case -4:
                            if (context.AdvanceResPeriod > 0) {
                                context.notificationService.ShowToaster(context.seattxt + " booking can be done only " + context.AdvanceResPeriod + " days in advance", 2);
                            }
                            else {
                                context.schedulingService.checkSubscribedFeature('241').subscribe(function (result) {
                                    if (result["Data"][0]["IsSubscribed"]) {
                                        context.notificationService.ShowToaster(context.seattxt + " booking can be done only " + result["Data"][0].Value + " days in advance", 2);
                                    }
                                });
                            }
                            context.isSubmit = false;
                            break;
                        case -5:
                            context.schedulingService.getSessionData().subscribe(function (data) {
                                if (data["Data"]["UserId"] != bookedForId) {
                                    context.notificationService.ShowToaster("Selected User already have another reservation for the same time slot", 2);
                                } else {
                                    context.notificationService.ShowToaster("You already have another reservation for the same time slot", 2);
                                }
                                context.isSubmit = false;
                            });
                            break;
                        case -6:
                            context.notificationService.ShowToaster("Reservations cannot be made for Saturdays and Sundays", 2);
                            context.isSubmit = false;
                            break;
                        case -7:
                            context.notificationService.ShowToaster("Only " + context.MaxNoofReservation + " reservations can be done within " + context.AdvanceResPeriod + " days", 2);
                            break;
                        case -10:
                            context.notificationService.ShowToaster("No " + context.seattxt + "s are available for reservation", 2);
                            context.isSubmit = false;
                            break;
                        default:
                            context.notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                            context.isSubmit = false;
                            break;
                        case 0:
                            context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            break;
                        case 1:
                            var msg = "";
                            if (context.pageTarget != "Edit") {
                                msg = "Reservation Confirmed.";
                            } else {
                                msg = "Reservation updated";
                            }
                            context.notificationService.ShowToaster(msg, 3);
                            context.reserveSeatReturn.emit({ success: true });
                            context.isSubmit = false;
                            break;
                        case 3:
                            context.notificationService.ShowToaster("No Email address exists for the selected Employee, confirmation mail cannot be sent", 2);
                            context.isSubmit = false;
                            break;
                        case -8:
                            context.notificationService.ShowToaster("Select a " + this.seattxt+" within your Team", 2);
                            context.isSubmit = false;
                            break;
                        case 7:
                            context.notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                            context.isSubmit = false;
                            break;


                    }
                });

                //this.schedulingService.checkConflictedSeatRequestExists(context.selSeatId[0], fromdateTime, todateTime, bookedForId, selRecurrence, context.requestId, weekdaysArray, freq).subscribe(function (resultData) {
                //    switch (resultData) {
                //        case 1:
                //            if (context.pageTarget != "Edit") {
                //                context.schedulingService.reserveHotellingSeat(JSON.stringify(addObj), context.existingResources, context.newResources).subscribe(function (resultData) {
                //                    switch (resultData.StatusId) {
                //                        case 0:
                //                            context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                //                            break;
                //                        case 1:
                //                            context.notificationService.ShowToaster("Reservation Confirmed.", 3);
                //                            context.reserveSeatReturn.emit({ success: true });
                //                            context.isSubmit = false;
                //                            break;
                //                        case 3:
                //                            context.notificationService.ShowToaster("No Email address exists for the selected Employee, confirmation mail cannot be sent", 2);
                //                            context.isSubmit = false;
                //                            break;
                //                        case 7:
                //                            context.notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                //                            context.isSubmit = false;
                //                            break;

                //                    }
                //                });
                //            } else {
                //                context.schedulingService.updateReservationRequest(context.requestId,JSON.stringify(addObj), context.existingResources, context.newResources, 1).subscribe(function (resultData) {
                //                    switch (resultData.StatusId) {
                //                        case 0:
                //                            context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                //                            break;
                //                        case 1:

                //                            context.notificationService.ShowToaster("Reservation updated", 3);
                //                            context.reserveSeatReturn.emit({ returnData: resultData.Data });
                //                            //context.reserveSeatReturn.emit({ success: true });
                //                            context.isSubmit = false;
                //                            break;


                //                    }
                //                });
                //            }
                //            break;
                //        case -1:
                //            context.notificationService.ShowToaster("Reservation exists", 2)
                //            context.isSubmit = false;
                //            break;
                //        case -3:
                //            context.notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2)
                //            context.isSubmit = false;
                //            break;
                //        case -4:
                //            context.schedulingService.checkSubscribedFeature('241').subscribe(function (result) {
                //                if (result["Data"][0]["IsSubscribed"]) {
                //                    context.notificationService.ShowToaster(context.seattxt + " booking can be done only " + result["Data"][0].Value + " days in advance", 2);
                //                }
                //            });

                //            //context.notificationService.ShowToaster(context.seattxt + " booking can be done only 14 days in advance", 2);
                //            context.isSubmit = false;
                //            break;
                //        case -5:
                //            context.schedulingService.getSessionData().subscribe(function (data) {
                //                if (data["Data"]["UserId"] != bookedForId) {
                //                    context.notificationService.ShowToaster("Selected User already have another reservation for the same time slot", 2);
                //                } else {
                //                    //context.notificationService.ShowToaster("Reservation already exists for the selected user in the selected time slot", 2)
                //                    context.notificationService.ShowToaster("You already have another reservation for the same time slot", 2);
                //                }
                //                context.isSubmit = false;
                //            });
                //            break;    
                //        case -6:
                //            context.notificationService.ShowToaster("Reservations cannot be made for Saturdays and Sundays", 2);                           
                //            context.isSubmit = false;
                //            break;              

                //        default:
                //            context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                //            context.isSubmit = false;
                //            break;
                //    }

                //});
            }
        }
    }


    private checkbtnClick(event) {
        var context = this;
        var currFld = event["fieldData"].FieldId;
        var iserror: boolean = false;
        switch (currFld) {
            //case 2051:/*location click*/
            //    this.isLocationView = !this.isLocationView;               
            //       var count = 7
            //        this.fieldDetailsBook.find(function (el) {
            //            switch (el.FieldId) {
            //                case 1981:/*location related space details hide*/
            //                case 2050:
            //                case 1982:
            //                case 1983:
            //                case 1984:
            //                case 465:
            //                case 1987:
            //                    el.IsVisible = context.isLocationView;
            //                    count--;
            //                    break;
            //            }
            //            if (count == 0)
            //                return true;
            //            else
            //                return false;
            //        });



            //    break;
            case 915:/*check availability*/
                var arrayforfind = [1687, 1695, 1688, 1696, 1692, 1540, 1543, 2306];
                var cnt = arrayforfind.length;
                var fromtime = "";
                var totime = "";
                var fromdate = "";
                var todate = "";
                var fromTimeIndex = "-1";
                var toTimeIndex = "-1";
                var bookedForId = 0;
                var recurrenceId = 0;
                var weekdays = [];
                var frequencyRecur;
                this.fieldDetailsBook.find(function (el) {
                    switch (el.FieldId) {
                        case 1687:
                            fromdate = el.FieldValue;
                            cnt--;
                            break;
                        case 1695:
                            fromTimeIndex = el.FieldValue;
                            var filObjTime = context.timearrayObjFrom[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(el.FieldValue)) });
                            if (filObjTime && filObjTime.length>0)
                                fromtime = filObjTime[0].Value;
                            else
                                iserror = true;
                            cnt--;
                            break;
                        case 1688:
                            todate = el.FieldValue;
                            cnt--;
                            break;
                        case 1696:
                            toTimeIndex = el.FieldValue;
                            var filObjTime = context.timearrayObj[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(el.FieldValue)) });
                            if (filObjTime && filObjTime.length > 0)
                                totime = filObjTime[0].Value;
                            else                            
                                iserror = true;                           
                            cnt--;
                            break;
                        case 1692:/*Bookedfor userId*/
                            bookedForId = Number(el.FieldValue);
                            cnt--;
                            break;
                        case 1540:/*RecurrencepatternId*/
                            recurrenceId = Number(el.FieldValue);
                            cnt--;
                            break;
                        case 1543:/*weekdays arary*/
                            weekdays = el.MultiFieldValues;
                            cnt--;
                            break;
                        case 2306:/*Recur every freq*/
                            frequencyRecur = el.FieldValue
                            cnt--;
                            break;

                    }
                    if (cnt == 0)
                        return true;
                    else
                        return false;
                });
                if (fromtime == "" || totime == "" || fromdate == "" || todate == "") {
                    return;
                }
                if (iserror == false) {
                    var currDateTime;
                    if (context.Sitetime != undefined)
                        currDateTime = new Date(context.Sitetime);
                    else
                        currDateTime = new Date();

                    var fromdateTime = fromdate + fromtime;
                    var todateTime = todate + totime;

                    var subDatefromTime = fromdate + fromtime.substring(0, fromtime.length - 2) + ":00 " + fromtime.substring(fromtime.length - 2, fromtime.length);
                    var subDatetoTime = todate + totime.substring(0, totime.length - 2) + ":00 " + totime.substring(totime.length - 2, totime.length);

                    if (new Date(subDatefromTime) < currDateTime) {
                        context.notificationService.ShowToaster("From date and time must be greater than the Current date and time", 2);
                        this.isSubmit = false;
                    }
                    else if (new Date(subDatetoTime) < currDateTime) {
                        context.notificationService.ShowToaster("To time must be greater than Current time", 2);
                        this.isSubmit = false;
                    }
                    else if (Number(fromTimeIndex) >= Number(toTimeIndex)) {
                        //context.notificationService.ShowToaster("To time must be greater than From time", 2);
                        context.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
                        this.isSubmit = false;
                    }
                    else if (new Date(subDatefromTime) >= new Date(subDatetoTime)) {
                        //context.notificationService.ShowToaster("To date must be greater than From date", 2);
                        context.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
                        this.isSubmit = false;
                    }


                    else if (recurrenceId == 2 && weekdays.length == 0) {
                        context.notificationService.ShowToaster("Select Week Day(s)", 2);
                        this.isSubmit = false;
                    }


                    else if (todateTime != "" && fromdateTime != "") {
                        var weekdayArray = [];
                        if (weekdays.length > 0) {
                            for (var i = 0; i < weekdays.length; i++) {
                                weekdayArray.push({ "ReportFieldId": 5615, "Value": weekdays[i] });
                            }
                        }
                        this.schedulingService.checkConflictedSeatRequestExists(context.selSeatId[0], fromdateTime, todateTime, bookedForId, recurrenceId, context.requestId, weekdayArray, frequencyRecur).subscribe(function (resultData) {
                            debugger
                            switch (resultData) {
                                case 1:
                                    context.notificationService.ShowToaster(context.seattxt + " is available for the selected time", 2)
                                    break;
                                case -1:
                                    context.notificationService.ShowToaster(context.seattxt + " Reservation exists", 2)
                                    break;
                                case -3:
                                    context.notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2)
                                    break;
                                case -4:
                                    if (context.AdvanceResPeriod > 0) {
                                        context.notificationService.ShowToaster(context.seattxt + " booking can be done only " + context.AdvanceResPeriod + " days in advance", 2);
                                    }
                                    else {
                                        context.schedulingService.checkSubscribedFeature('241').subscribe(function (result) {
                                            if (result["Data"][0]["IsSubscribed"]) {
                                                context.notificationService.ShowToaster(context.seattxt + " booking can be done only " + result["Data"][0].Value + " days in advance", 2);
                                            }
                                        });
                                    }
                                    break;
                                case -5:
                                    context.schedulingService.getSessionData().subscribe(function (data) {
                                        if (data["Data"]["UserId"] != bookedForId) {
                                            context.notificationService.ShowToaster("Selected User already have another reservation for the same time slot", 2);
                                        } else {
                                            //context.notificationService.ShowToaster("Reservation already exists for the selected user in the selected time slot", 2)
                                            context.notificationService.ShowToaster("You already have another reservation for the same time slot", 2);
                                        }
                                    });
                                    //context.notificationService.ShowToaster("Reservation already exists for the selected user in the selected time slot", 2)
                                    break;
                                case -6:
                                    context.notificationService.ShowToaster("Reservations cannot be made for Saturdays and Sundays", 2);
                                    break;
                                case -7:
                                    context.notificationService.ShowToaster("Only " + context.MaxNoofReservation + " reservations can be done within " + context.AdvanceResPeriod + " days", 2);
                                    break;
                                case -8:
                                    context.notificationService.ShowToaster("Select a " + this.seattxt +" within your Team", 2);
                                    context.isSubmit = false;
                                    break;
                                case -10:
                                    context.notificationService.ShowToaster("No " + context.seattxt + "s are available for reservation", 2);
                                    break;
                                default:
                                    context.notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                                    context.isSubmit = false;
                                    break;
                            }
                        });
                    }
                }
                break;
        }
    }
    private rdBtnchange(event: any) {
        var contextobj = this;
        var fldObj = event["rbtnObject"]["fieldobject"];
        switch (fldObj.FieldId) {
            case 1725:
                contextobj.schedulingService.GetReservationbookedforListlookup(fldObj.FieldValue).subscribe(function (data) {
                    contextobj.fieldDetailsBook.find(function (el) {
                        if (el.FieldId == 1692) {
                            el.LookupDetails.LookupValues = JSON.parse(data.Data["FieldBinderData"]);
                            el.FieldValue = "-1";
                            return true;
                        } else {
                            return false;
                        }
                    })
                });
                break;
            case 1540: /*recurrence pattern rdbtn list*/
            case 1372:/*monthly recurrence related  rdbtnlist*/
                contextobj.setRecurrencePatternVisibility(contextobj, fldObj.FieldValue);
                break;
        }
    }

    private setRecurrencePatternVisibility(context, selRdbtnVal) {
        var fldArray = [1543, 1372, 1373, 1374, 1375, 2306];
        var shwweeklyselection = false;
        var showmonthRdbtnlst = false;
        var dayddlshow = false;
        var dayandDaysddlshow = false;
        switch (selRdbtnVal) {
            case "2":/*weekly*/
                shwweeklyselection = true;
                break;
            case "3":/*monthly*/
                showmonthRdbtnlst = true;
                break;
            case "4":/*yearly*/
                break;
            case "6":
                showmonthRdbtnlst = true;
                dayddlshow = true;
                break;
            case "7":
                showmonthRdbtnlst = true;
                dayandDaysddlshow = true;
                break;
        }
        var cnt = fldArray.length;

        context.fieldDetailsBook.find(function (el) {
            if (fldArray.indexOf(el.FieldId) > -1) {
                switch (el.FieldId) {
                    case 1543: /*weekly chkbx list days */
                        el.IsVisible = shwweeklyselection;
                        el.IsEnabled = shwweeklyselection;
                        el.MultiFieldValues = [];
                        cnt--;
                        break
                    case 2306:/*Recurs every ddl */
                        context.schedulingService.getSessionData().subscribe(function (data) {
                            var retData = data["Data"];
                            var UserRoleId = retData["UserRoleId"];
                            context.schedulingService.GetReservationUserRolesBasedSetting(UserRoleId).subscribe(function (data1) {
                                var userbasedsettings = JSON.parse(data1.FieldBinderData);
                                var proxy = userbasedsettings.filter(function (item) {
                                    if (item["Is Proxy Reservation Enabled?"] == true && item["UserRoleId"] == UserRoleId) {
                                        return true;
                                    }

                                });
                                if (proxy.length > 0) {
                                    el.IsVisible = shwweeklyselection;

                                }
                                else
                                    el.IsVisible = false;

                            });
                        });
                        el.ShowSelect = false;
                        el.FieldValue = 1;
                        cnt--;
                        break;
                    case 1372:
                        el.IsVisible = showmonthRdbtnlst;
                        el.IsEnabled = showmonthRdbtnlst;
                        el.FieldValue = 5;
                        cnt--;
                        break;
                    case 1373:
                        el.IsVisible = showmonthRdbtnlst;
                        el.IsEnabled = dayddlshow;
                        cnt--;
                        break;
                    case 1374:
                        el.IsVisible = showmonthRdbtnlst;
                        el.IsEnabled = dayandDaysddlshow;
                        cnt--;
                        break;
                    case 1375:
                        el.IsVisible = showmonthRdbtnlst;
                        el.IsEnabled = false;
                        cnt--;
                        break;
                }
            }
            if (cnt == 0)
                return true;
            else
                return false;

        });
    }

    private ddlChange(event) {
        var contextobj = this;
        var index = "-1";
        let rptFieldId = event.ddlRelationShipEvent.ChildFieldObject;
        //  if (contextobj.pageTarget != "Edit") {
        if (rptFieldId.FieldId == 1695) {
            if (rptFieldId.FieldValue == "48") {
                index = "1";
            } else {
                var indexValue = contextobj.fieldDetailsBook.findIndex(function (el) { return el.FieldId == 1696 });
                if (indexValue != -1) {
                    if (contextobj.fieldDetailsBook[indexValue].FieldValue != '39')
                        index = (Number(rptFieldId.FieldValue) + 1).toString();
                    else
                        index = '39';
                }
                else
                    index = (Number(rptFieldId.FieldValue) + 1).toString();
            }
            contextobj.fieldDetailsBook.find(function (el) {
                if (el.FieldId == 1696) {
                    if (contextobj.pageTarget == "Edit" && el.FieldValue > index) {
                        index = el.FieldValue;
                    }
                    el.FieldValue = index;
                    return true;
                } else {
                    return false;
                }
            })
        }
        //  }

    }

    private datepickerChange(event) {
        var context = this;
        var dateChangeField = event["dateChangeObject"].FieldObject;
        if (dateChangeField["FieldId"] == 1687) {
            this.fieldDetailsBook.find(function (el) {
                if (el.FieldId == 1688) {
                    el.FieldValue = dateChangeField["FieldValue"];
                    //var index = 0;
                    //if (context.pageTarget == "Edit") {
                    //    index = 1;
                    //} else {
                    //    index = 5;
                    //}
                    //var elem = <HTMLInputElement>document.getElementsByClassName("date-picker")[index];

                    //if (elem == undefined) {
                    //    elem = <HTMLInputElement>document.getElementsByClassName("date-picker")[1];
                    //}
                    //elem.value = dateChangeField["FieldValue"];
                    return true;
                } else return false;
            });
        }
    }

    private resourcelistAdd(event) {
        this.showResource = true;
        this.pageTitle = "Resources";
        this.splitviewInputbook.showSecondaryView = !this.splitviewInputbook.showSecondaryView;
    }
    private resourceListDelete(event) {
        var context = this;
        var lookupvalues = event.FieldObject.LookupDetails.LookupValues;
        var resourcetext = [];
        for (var i = 0; i < lookupvalues.length; i++) {
            resourcetext.push(lookupvalues[i].Id);
        }
        context.allresourceCloneObj = context.allresourceCloneObj.filter(function (el) { return resourcetext.indexOf(el["ResourceIndex"]) > -1 })
        context.existingResources = JSON.stringify(JSON.parse(context.existingResources).filter(function (el) { return resourcetext.indexOf(el["ResourceIndex"]) > -1 }));
        context.newResources = JSON.stringify(JSON.parse(context.newResources).filter(function (el) { return resourcetext.indexOf(el["ResourceIndex"]) > -1 }));
    }
    private seatResourceListAdd(event) {
        var context = this;
        this.existingResources = event.existingResrc.length > 0 ? JSON.stringify(event.existingResrc) : "";
        this.newResources = event.newResources.length > 0 ? JSON.stringify(event.newResources) : "";
        this.allresourceCloneObj = event.cloneallResrceObj;
        this.fieldDetailsBook.find(function (el) {
            if (el.FieldId == 2040) {
                el.LookupDetails.LookupValues = event.seatResourcesforLst;
                context.splitviewInputbook.showSecondaryView = !context.splitviewInputbook.showSecondaryView;
                return true;
            } else return false;
        });
    }
    private lookupSelect(event) {
        if (event.selectedItem != null) {
            this.fieldDetailsBook.find(function (item) {
                if (item.FieldId == 1692) {
                    item.FieldValue = event.selectedItem.selectedItem.Id;
                    return true;
                } else
                    return false;
            });
        }
    }
    private getSessionUserData() {
       
        var contextObj = this;
        contextObj.schedulingService.getSessionData().subscribe(function (data) {
           
            var retData = data["Data"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            contextObj.schedulingService.GetUserRolebasedSettingsRowData(parseInt(contextObj.sessionUserRoleId)).subscribe(function (result) {
              
                if (result.Data.DataCount == 1) {
                    contextObj.AdvanceResPeriod = JSON.parse(result.Data.FieldBinderData)[0]["Advance Reservation Period (in days)"];
                    contextObj.MaxNoofReservation = JSON.parse(result.Data.FieldBinderData)[0]["Maximum Number of Reservation"];
                }
                if (contextObj.AdvanceResPeriod == null) {
                    contextObj.schedulingService.checkSubscribedFeature('241').subscribe(function (result) {
                        if (result["Data"][0]["IsSubscribed"]) {
                            contextObj.AdvanceResPeriod = result["Data"][0].Value;
                        }
                    });
                }
                if (contextObj.MaxNoofReservation && contextObj.MaxNoofReservation > 0 && contextObj.pageTarget=='Edit') {//81916 related addition 
                    contextObj.fieldDetailsBook.find(item => item.FieldId == 1687).ReadOnlyMode = true;
                    contextObj.fieldDetailsBook.find(item => item.FieldId == 1688).ReadOnlyMode = true;
                }
            });
        });
    }
}