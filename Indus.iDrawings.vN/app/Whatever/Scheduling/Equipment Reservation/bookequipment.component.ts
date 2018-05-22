﻿import {Component, Output, EventEmitter, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import { SchedulingService } from '../../../models/scheduling/scheduling.service';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';


@Component({
    selector: 'book-equipment',
    templateUrl: './app/Views/Scheduling/Equipment Reservation/bookequipment.component.html',
    providers: [NotificationService, SchedulingService, ValidateService],
    directives: [FieldComponent],
    encapsulation: ViewEncapsulation.None

})

export class BookEquipmentComponent implements OnInit {

    @Input() selRowObj: any;
    @Input() pageTarget: string;
    @Input() requestId: number;
    @Output() reserveEquipmentReturn = new EventEmitter();

    disableDates: Array<string> = ["Sunday", "Saturday"];
    timearrayObjFrom: any;
    timearrayObjTo: any;
    isSubmit: boolean = false;
    fieldDetailsBookEqumt: IField[];
    sessionUserId = 0;
    sessionUserRoleId = 0;
    Sitetime;
    btnName: string;
    msgtxt: string;
    IsProxyReservationEnabled: boolean = false;
    AdvanceResPeriod;
    MaxNoofReservation;
    constructor(private notificationService: NotificationService, private schedulingService: SchedulingService, private validateService: ValidateService) {
    }

    ngOnInit() {
        var contextObj = this;
        if (contextObj.pageTarget == 'Edit')
            contextObj.btnName = "Save Changes";
        else
            contextObj.btnName = "Reserve";
        contextObj.schedulingService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            contextObj.schedulingService.GetUserRolebasedSettingsRowData(contextObj.sessionUserRoleId).subscribe(function (result) {
                if (result.Data.DataCount == 1) {
                    contextObj.IsProxyReservationEnabled = JSON.parse(result.Data.FieldBinderData)[0]["Is Proxy Reservation Enabled?"];
                    contextObj.AdvanceResPeriod = JSON.parse(result.Data.FieldBinderData)[0]["Advance Reservation Period (in days)"];
                    contextObj.MaxNoofReservation = JSON.parse(result.Data.FieldBinderData)[0]["Maximum Number of Reservation"];
                }
               
                var selectedQuantity;
                contextObj.schedulingService.getReserveEquipmentFields(contextObj.selRowObj['ClassId']).subscribe(function (resultData) {
                    console.log('reserve fields', resultData["Data"])
                    for (var i = 0; i < resultData["Data"].length; i++) {
                        var holidays = [1, 7];
                        switch (resultData["Data"][i].FieldId) {
                            case 2461://fromdate
                                resultData["Data"][i].FieldValue = contextObj.selRowObj.FromDateVal;
                                break;
                            case 2462://fromtime   
                                resultData["Data"][i].LookupDetails.LookupValues.splice(26, 26);
                                contextObj.timearrayObjFrom = resultData["Data"][i].LookupDetails.LookupValues;
                                resultData["Data"][i].FieldValue = contextObj.selRowObj.FromTimeVal.FieldValue;
                                break;
                            case 2463://todate
                                resultData["Data"][i].FieldValue = contextObj.selRowObj.ToDateVal;
                                break;
                            case 2464://totime
                                resultData["Data"][i].LookupDetails.LookupValues.splice(0, 1);
                                contextObj.timearrayObjTo = resultData["Data"][i].LookupDetails.LookupValues;
                                resultData["Data"][i].FieldValue = contextObj.selRowObj.ToTimeVal.FieldValue;
                                break;
                            case 1725:/*user type*/
                                resultData["Data"][i].FieldValue = "1";
                                resultData["Data"][i].IsVisible = false;
                                break;
                            case 1692:/*booked for visible  for divadmin user*/
                                //resultData["Data"][i].FieldValue = contextObj.selRowObj["Reserved UserId"];
                                resultData["Data"][i].FieldValue = contextObj.sessionUserId;
                                if (contextObj.IsProxyReservationEnabled == true) {
                                    resultData["Data"][i].IsVisible = true;
                                    if (contextObj.pageTarget == 'Edit')
                                        resultData["Data"][i].IsEnabled = false;
                                }
                                else {
                                    resultData["Data"][i].IsVisible = false;
                                }
                                break;
                            case 1540:
                                resultData["Data"][i].FieldValue = "1";
                                if (contextObj.pageTarget == 'Edit')
                                    resultData["Data"][i].IsVisible = false;
                                break;
                            case 1543:
                                resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el)
                                { return holidays.indexOf(el.Id) == -1; })
                                break;
                            case 2296:/*booked for textsearchlookup visible  for divadmin user*/
                                if (contextObj.IsProxyReservationEnabled == true) {
                                    resultData["Data"][i].HasAutoLookUp = true;
                                    resultData["Data"][i].IsVisible = true;
                                    if (contextObj.pageTarget == 'Edit')
                                        resultData["Data"][i].IsVisible = false;
                                }
                                break;
                            case 2497:/*Quantity*/
                                /*72,73,74,75,76,77 are the lookuptable ids for quantity radiobutton*/
                                if (contextObj.pageTarget != 'Edit')
                                    resultData["Data"][i].FieldValue = "72";
                                else {
                
                                    var selQuantity = contextObj.selRowObj["Equipment Quantity"];
                                    if (selQuantity < 6) {
                                        switch (selQuantity) {
                                            case 1:
                                                selectedQuantity = "72";
                                                break;
                                            case 2:
                                                selectedQuantity = "73";
                                                break;
                                            case 3:
                                                selectedQuantity = "74";
                                                break;
                                            case 4:
                                                selectedQuantity = "75";
                                                break;
                                            case 5:
                                                selectedQuantity = "76";
                                                break;
                
                                        }
                                    }
                                    else {
                                        selectedQuantity = "77";
                                    }
                                    resultData["Data"][i].FieldValue = selectedQuantity;
                                }
                                //var Id = [72];
                                //if (selQuantity < 6) {
                                //    switch (selQuantity) {
                                //        case 1:
                                //            Id = [72];
                                //            break;
                                //        case 2:
                                //            Id = [72,73];
                                //            break;
                                //        case 3:
                                //            Id = [72, 73,74];
                                //            break;
                                //        case 4:
                                //            Id = [72, 73,74,75];
                                //            break;
                                //        case 5:
                                //            Id = [72, 73, 74, 75,76];
                                //            break;
                                //    }
                                //    resultData["Data"][i].LookupDetails.LookupValues = resultData["Data"][i].LookupDetails.LookupValues.filter(function (el) {
                                //        return Id.indexOf(el["Id"]) > -1;
                                //    });
                                //}
                                break;
                            case 2458://description
                                if (contextObj.pageTarget == 'Edit')
                                    resultData["Data"][i].FieldValue = contextObj.selRowObj["Comments"];
                                break;
                            case 2525:
                                resultData["Data"][i].FieldValue = contextObj.selRowObj["Equipment Type"];
                                break;
                
                        }
                
                    }
                    if (contextObj.IsProxyReservationEnabled == true) {
                        resultData["Data"].find(function (el) {
                            if (el.FieldId == 2296) {
                                var lookupobjFld = resultData["Data"].filter(function (el) { return el.FieldId === 1692; });
                                el.LookupDetails = lookupobjFld[0].LookupDetails;
                                return true;
                            } else
                                return false;
                        });
                    }
                    contextObj.fieldDetailsBookEqumt = resultData["Data"];
                    if (contextObj.MaxNoofReservation && contextObj.MaxNoofReservation > 0 && contextObj.pageTarget == 'Edit') {//81916 related addition 
                        contextObj.fieldDetailsBookEqumt.find(item => item.FieldId == 2461).ReadOnlyMode = true;
                        contextObj.fieldDetailsBookEqumt.find(item => item.FieldId == 2463).ReadOnlyMode = true;
                    }
                    if (selectedQuantity == "77") {
                        contextObj.fieldDetailsBookEqumt.find(function (el) {
                            if (el.FieldId == 2498) {
                                el.IsHiddenLabel = true;
                                el.IsVisible = true;
                                el.IsMandatory = true;
                                el.FieldValue = contextObj.selRowObj["Equipment Quantity"];
                                return true;
                            } else return false;
                        });
                    }
                });
            });
        });
        contextObj.getSiteTime(contextObj, contextObj.selRowObj["SiteId"]);
    }

    private getSiteTime(context, siteId) {
        context.schedulingService.getTimeforSite(siteId).subscribe(function (resulttime) {
            context.Sitetime = JSON.parse(resulttime["FieldBinderData"])[0]["Column1"];
        });
    }

    private onReserve(event) {
        debugger
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
        var addObj = JSON.parse(event["fieldobject"]);
        var count = 10;
        var rdQuantity = 72;
        var txtQuantity = 0;

        if (this.isSubmit == false) {
            this.isSubmit = true;
            addObj.find(function (el) {
                switch (el.ReportFieldId) {
                    case 12389: /*from date */
                        fromDate = el.Value;
                        count--;
                        break;
                    case 12411:/*from time */
                        fromTimeIndex = el.Value;
                        var filObjTime = context.timearrayObjFrom.filter(function (item) { return (item.Id === parseInt(el.Value)) });
                        fromTime = filObjTime[0].Value;
                        count--;
                        break;
                    case 12390:/*to date */
                        toDate = el.Value;
                        count--;
                        break;
                    case 12417:/*to time */
                        toTimeIndex = el.Value;
                        var filObjTime = context.timearrayObjTo.filter(function (item) { return (item.Id === parseInt(el.Value)) });
                        totime = filObjTime[0].Value;
                        count--;
                        break;
                    case 5612:/*recurrence patten */
                        selRecurrence = el.Value;
                        count--;
                        break;
                    case 12322:/*recurrence range */
                        freq = el.Value;
                        count--;
                        break;
                    case 5714:/*user categoryId*/
                        el.Value = el.Value == "1" ? "7" : "2";
                        count--;
                        break;
                    case 8641:/*booked for*/
                        bookedForId = el.Value;
                        count--;
                        break;
                    case 12380:
                        rdQuantity = context.getQuantityNum(Number(el.Value));
                        count--;
                        break;
                    case 12376:
                        txtQuantity = Number(el.Value);
                        count--;
                        break;

                }
            });
            weekdaysArray = addObj.filter(function (el) { return el.ReportFieldId == 5615 });
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
                context.notificationService.ShowToaster("From time must be greater than Current time", 2);
                this.isSubmit = false;
            }
            else if (new Date(subDatetoTime) < currDateTime) {
                context.notificationService.ShowToaster("To time must be greater than Current time", 2);
                this.isSubmit = false;
            }
            else if ((Number(fromTimeIndex) >= Number(toTimeIndex))) {
                context.notificationService.ShowToaster("To time must be greater than From time", 2);
                this.isSubmit = false;
            }
            else if (new Date(subDatefromTime) >= new Date(subDatetoTime)) {
                context.notificationService.ShowToaster("To date must be greater than From date", 2);
                this.isSubmit = false;
            }


            else if (selRecurrence == 2 && weekdaysArray.length == 0) {
                context.notificationService.ShowToaster("Select Week Day(s)", 2);
                this.isSubmit = false;
            }
            else {
                var cnt = 2;
                addObj.find(function (el) {

                    switch (el.ReportFieldId) {
                        case 12389:
                            el.Value = fromdateTime;
                            cnt--;
                            break;
                        case 12390:
                            el.Value = todateTime;
                            cnt--;
                            break;
                    }
                    if (cnt == 0)
                        return true;
                    else
                        return false;
                });
                if (rdQuantity == 0) {
                    rdQuantity = txtQuantity;
                }
                if (txtQuantity > 0 && txtQuantity <= 5) {
                    context.notificationService.ShowToaster("Enter an integer value greater than 5 in Quantity", 2);
                    this.isSubmit = false;
                    return false;
                }
                if (rdQuantity > 0) {
                    addObj.push({ "ReportFieldId": 12424, "Value": context.selRowObj["SiteId"] },
                        { "ReportFieldId": 12425, "Value": context.selRowObj["BuildingId"] },
                        { "ReportFieldId": 12391, "Value": context.selRowObj["ClassId"] });
                    var Id = context.pageTarget == 'Edit' ? context.requestId : context.selRowObj["ClassId"];
                    //context.schedulingService.checkConflictedEquipmtRequestExists(context.selRowObj["ClassId"], fromdateTime, todateTime, bookedForId, selRecurrence, context.requestId, weekdaysArray, freq, context.selRowObj["SiteId"], context.selRowObj["BuildingId"], rdQuantity).subscribe(function (resultData) {
                    //    switch (resultData) {
                    //        case 1:
                    //            addObj.push({ "ReportFieldId": 12424, "Value": context.selRowObj["SiteId"] },
                    //                { "ReportFieldId": 12425, "Value": context.selRowObj["BuildingId"] },
                    //                { "ReportFieldId": 12391, "Value": context.selRowObj["ClassId"] });

                    //            console.log('modify', context.selRowObj)
                    //            if (context.pageTarget == 'Edit') {
                    //                debugger
                    //                context.schedulingService.UpdateEquipmentReservation(JSON.stringify(addObj), context.requestId).subscribe(function (result) {
                    //                    console.log(result)
                    //                    switch (result.StatusId) {
                    //                        case 0:
                    //                            context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    //                            break;
                    //                        case 1:

                    //                            context.notificationService.ShowToaster("Reservation updated", 3);
                    //                            context.reserveEquipmentReturn.emit({ returnData: resultData.Data });
                    //                            //context.reserveSeatReturn.emit({ success: true });
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
                    //            }
                    //            else {
                    //                context.schedulingService.reserveEquipment(JSON.stringify(addObj)).subscribe(function (resultData) {
                    //                    switch (resultData.StatusId) {
                    //                        case 0:
                    //                            context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    //                            break;
                    //                        case 1:
                    //                            context.notificationService.ShowToaster("Reservation Confirmed.", 3);
                    //                            context.reserveEquipmentReturn.emit({ success: true });
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
                    //            }
                    //            break;
                    //        case -1:
                    //            context.notificationService.ShowToaster(context.msgtxt +" Quantity is not available for the Equipment Type " + context.selRowObj["Equipment Type"] + "", 2)
                    //            context.isSubmit = false;
                    //            break;
                    //        case -3:
                    //            context.notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2)
                    //            context.isSubmit = false;
                    //            break;
                    //        case -4:
                    //            context.schedulingService.checkSubscribedFeature('257').subscribe(function (result) {
                    //                if (result["Data"][0]["IsSubscribed"]) {
                    //                    context.notificationService.ShowToaster("Equipment reservation can be done only " + result["Data"][0].Value + " days in advance", 2);
                    //                }
                    //            });


                    //            context.isSubmit = false;
                    //            break;
                    //        case -5:

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

                    context.schedulingService.insertUpdateEquipmentReservationwithConflictChecking(context.selRowObj["ClassId"], fromdateTime, todateTime, bookedForId, selRecurrence, context.requestId, weekdaysArray, freq, context.selRowObj["SiteId"], context.selRowObj["BuildingId"], rdQuantity, JSON.stringify(addObj), context.pageTarget).subscribe(function (resultData) {
                        switch (resultData) {
                            case -1:
                                context.notificationService.ShowToaster(context.msgtxt + " Quantity is not available for the Equipment Type " + context.selRowObj["Equipment Type"] + "", 2)
                                context.isSubmit = false;
                                break;
                            case -3:
                                context.notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2)
                                context.isSubmit = false;
                                break;
                            case -4:
                                context.schedulingService.checkSubscribedFeature('257').subscribe(function (result) {
                                    if (result["Data"][0]["IsSubscribed"]) {
                                        context.notificationService.ShowToaster("Equipment reservation can be done only " + result["Data"][0].Value + " days in advance", 2);
                                    }
                                });


                                context.isSubmit = false;
                                break;
                            case -5:

                                break;
                            case -7:
                                context.notificationService.ShowToaster("Only " + context.MaxNoofReservation + " reservations can be done within " + context.AdvanceResPeriod + " days", 2);
                                break;
                            case -6:
                                context.notificationService.ShowToaster("Reservations cannot be made for Saturdays and Sundays", 2);
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
                                context.reserveEquipmentReturn.emit({ success: true });
                                context.isSubmit = false;
                                break;
                            case 3:
                                context.notificationService.ShowToaster("No Email address exists for the selected Employee, confirmation mail cannot be sent", 2);
                                context.isSubmit = false;
                                break;
                            case 7:
                                context.notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                                context.isSubmit = false;
                                break;
                            default:
                                context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                context.isSubmit = false;
                                break;

                        }
                    });
                }
            }
        }
    }

    private rdBtnchange(event: any) {

        var contextobj = this;
        var fldObj = event["rbtnObject"]["fieldobject"];
        switch (fldObj.FieldId) {
            case 1540: /*weekly selection*/
                var fldArray = [1543, 2306];
                var cnt = fldArray.length;
                var shwweekdaySettings = false;
                if (fldObj.FieldValue == "2") {
                    shwweekdaySettings = true;
                } else {
                    shwweekdaySettings = false;
                }
                contextobj.fieldDetailsBookEqumt.find(function (el) {
                    if (fldArray.indexOf(el.FieldId) > -1) {
                        switch (el.FieldId) {
                            case 1543: /*weekly chkbx list days */
                                el.IsVisible = shwweekdaySettings;
                                el.IsEnabled = shwweekdaySettings;
                                el.MultiFieldValues = [];
                                cnt--;
                                break
                            case 2306:/*Recurs every ddl */
                                if (contextobj.IsProxyReservationEnabled == true)
                                    el.IsVisible = shwweekdaySettings;
                                else
                                    el.IsVisible = false;
                                el.ShowSelect = false;
                                el.FieldValue = "1";
                                cnt--;
                                break;
                        }
                    }
                    if (cnt == 0)
                        return true;
                    else
                        return false;
                });

                break;
            case 2497: /*Quantity textbox*/

                contextobj.fieldDetailsBookEqumt.find(function (el) {
                    if (el.FieldId == 2498) {
                        el.IsHiddenLabel = true;
                        if (fldObj.FieldValue == "77") {
                            el.IsVisible = true;
                            el.IsMandatory = true;
                            if (<HTMLElement>document.getElementById("2498")) {
                                var focusingElmt = <HTMLElement>document.getElementById("2498");
                                focusingElmt.focus();
                                contextobj.validateService.initiateValidation(el, contextobj, true, focusingElmt);
                            }

                        } else {
                            el.IsVisible = false;
                            el.HasValidationError = false;
                            el.IsMandatory = false;
                            el.FieldValue = "";
                        }
                        return true;
                    } else return false;
                });

                break;
        }

    }

    private ddlChange(event) {
        var contextobj = this;
        var index = "-1";
        let rptFieldId = event.ddlRelationShipEvent.ChildFieldObject;
        if (rptFieldId.FieldId == 2462) {
            if (rptFieldId.FieldValue == "48") {
                index = "1";
            } else {
                index = (Number(rptFieldId.FieldValue) + 1).toString();
            }
            contextobj.fieldDetailsBookEqumt.find(function (el) {
                if (el.FieldId == 2464) {
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
    }

    private datepickerChange(event) {
        var context = this;
        var dateChangeField = event["dateChangeObject"].FieldObject;
        if (dateChangeField["FieldId"] == 2461) {
            this.fieldDetailsBookEqumt.find(function (el) {
                if (el.FieldId == 2463) {
                    el.FieldValue = dateChangeField["FieldValue"];
                    return true;
                } else return false;
            });
        }
    }


    private lookupSelect(event) {
        if (event.selectedItem != null) {
            this.fieldDetailsBookEqumt.find(function (item) {
                if (item.FieldId == 1692) {
                    item.FieldValue = event.selectedItem.selectedItem.Id;
                    return true;
                } else
                    return false;
            });
        }
    }

    private checkbtnClick(event) {
        var cnt = 10;
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
        var rdQuantity = 0;
        var txtQuantity = 0;
        var context = this;
        var iserror: boolean = false;
        this.fieldDetailsBookEqumt.find(function (el) {
            switch (el.FieldId) {
                case 2461:
                    fromdate = el.FieldValue;
                    cnt--;
                    break;
                case 2462:
                    fromTimeIndex = el.FieldValue;
                    var filObjTime = context.timearrayObjFrom.filter(function (item) { return (item.Id === parseInt(el.FieldValue)) });
                    if (filObjTime && filObjTime.length > 0)
                        fromtime = filObjTime[0].Value;
                    else
                        iserror = true;
                    cnt--;
                    break;
                case 2463:
                    todate = el.FieldValue;
                    cnt--;
                    break;
                case 2464:
                    toTimeIndex = el.FieldValue;
                    var filObjTime = context.timearrayObjTo.filter(function (item) { return (item.Id === parseInt(el.FieldValue)) });
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
                case 2497:/*Quantity*/
                    rdQuantity = context.getQuantityNum(Number(el.FieldValue));
                    cnt--;
                    break;
                case 2498:/*more quantity*/
                    txtQuantity = Number(el.FieldValue);
                    cnt--;
                    break;
            }
            if (cnt == 0)
                return true;
            else
                return false;
        });
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
                context.notificationService.ShowToaster("From time must be greater than Current time", 2);
                this.isSubmit = false;
            }
            else if (new Date(subDatetoTime) < currDateTime) {
                context.notificationService.ShowToaster("To time must be greater than Current time", 2);
                this.isSubmit = false;
            }
            else if (Number(fromTimeIndex) >= Number(toTimeIndex)) {
                context.notificationService.ShowToaster("To time must be greater than From time", 2);
                this.isSubmit = false;
            }
            else if (new Date(subDatefromTime) >= new Date(subDatetoTime)) {
                context.notificationService.ShowToaster("To date must be greater than From date", 2);
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
                if (rdQuantity == 0) {
                    rdQuantity = txtQuantity;
                }
                if (rdQuantity > 0) {

                    this.schedulingService.checkConflictedEquipmtRequestExists(context.selRowObj["ClassId"], fromdateTime, todateTime, bookedForId, recurrenceId, context.requestId, weekdayArray, frequencyRecur, context.selRowObj["SiteId"], context.selRowObj["BuildingId"], rdQuantity).subscribe(function (resultData) {
                        switch (resultData) {
                            case 1:
                                context.notificationService.ShowToaster("Equipment is available for the selected time", 2)
                                break;
                            case -1:
                                context.notificationService.ShowToaster(context.msgtxt + " Quantity is not available for the Equipment Type " + context.selRowObj["Equipment Type"] + "", 2)
                                break;
                            case -3:
                                context.notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2)
                                break;
                            case -4:
                                context.schedulingService.checkSubscribedFeature('257').subscribe(function (result) {
                                    if (result["Data"][0]["IsSubscribed"]) {
                                        context.notificationService.ShowToaster("Equipment reservation can be done only " + result["Data"][0].Value + " days in advance", 2);
                                    }
                                });

                                break;
                            case -6:
                                context.notificationService.ShowToaster("Reservations cannot be made for Saturdays and Sundays", 2);
                                break;
                            case -7:
                                context.notificationService.ShowToaster("Only " + context.MaxNoofReservation + " reservations can be done within " + context.AdvanceResPeriod + " days", 2);
                                break;

                        }
                    });
                }
            }
        }
    }

    private getQuantityNum(quaNo) {
        var retValue = 0;
        this.msgtxt = "Selected"
        switch (quaNo) {
            case 72:
                retValue = 1;
                break;
            case 73:
                retValue = 2;
                break;
            case 74:
                retValue = 3;
                break;
            case 75:
                retValue = 4;
                break;
            case 76:
                retValue = 5;
                break;
            case 77:
                this.msgtxt = "Entered"
                retValue = 0;
        }
        return retValue;

    }

    
}