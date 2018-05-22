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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var Invitees_checkboxgrid_component_1 = require('./Invitees-checkboxgrid.component');
var Amenities_listcustomadd_componet_1 = require('./Amenities-listcustomadd.componet');
var CustomServiceAdd_component_1 = require('./CustomServiceAdd.component');
var Catering_listCustomadd_component_1 = require('./Catering-listCustomadd.component');
var ReservationRequestforroom = (function () {
    function ReservationRequestforroom(SchedulingService, _notificationService, _renderer, el) {
        this.SchedulingService = SchedulingService;
        this._notificationService = _notificationService;
        this._renderer = _renderer;
        this.el = el;
        this.btnName = "Reserve";
        this.dataKey = "SpaceId";
        this.needtohide = false;
        this.isneedtoInsert = false;
        this.InviteesListForInsert = "";
        this.Amnietyvalueforinsert = "";
        this.OriginalAmnietyvalueforinsert = "";
        this.OriginalServicevalueforinsert = "";
        this.Servicevalueforinsert = "";
        this.Cateringvalueforinsert = "";
        this.OriginalCateringvalueforinsert = "";
        this.InviteesList = new core_1.EventEmitter();
        this.AmnietyList = new core_1.EventEmitter();
        this.ServiceList = new core_1.EventEmitter();
        this.CateringList = new core_1.EventEmitter();
        this.submitSuccess = new core_1.EventEmitter();
        this.hasFieldValue = false;
        this.isinUse = false;
        this.secondaryTarget = 0;
        this.position = "top-right";
        this.ReserveDetails = [];
        this.showSlide = false;
        this.showSlidedelink = false;
        this.slidewidth = 250;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.roomtxt = "Team Room";
    }
    ReservationRequestforroom.prototype.ngOnInit = function () {
        var contextobj = this;
        contextobj.CheckboxvaluesforInvitees = [];
        contextobj.Ameniety = [];
        contextobj.Service = [];
        contextobj.Cateringarray = [];
        var d = new Date();
        var n = d.getHours();
        var t = new Date();
        t.setDate(t.getDate() + 1);
        var tommorowdate = contextobj.getFormattedDate(t);
        var todaydate = contextobj.getFormattedDate(new Date());
        this.TommorrowDate = tommorowdate;
        this.checkSubscribedFeatures();
        this.getSessionUserData();
    };
    ReservationRequestforroom.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.SchedulingService.checkSubscribedFeature('275').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtxt = result["Data"][0].Value;
            }
        });
    };
    ReservationRequestforroom.prototype.getFormattedDate = function (dt) {
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
    };
    ReservationRequestforroom.prototype.bookedforchange = function (event) {
        var contextobj = this;
        var Fieldid = event["rbtnObject"]["fieldobject"]["FieldId"];
        var target = parseInt(event["rbtnObject"]["fieldobject"]["FieldValue"]);
        switch (Fieldid) {
            case 1725:
                var tempusercategory = new Array();
                target = parseInt(event["rbtnObject"]["fieldobject"]["FieldValue"]);
                var fieldvalue = contextobj.Roombookrequest[19].FieldValue;
                contextobj.SchedulingService.GetReservationbookedforListlookup(target).subscribe(function (data) {
                    var tempusercategory = JSON.parse(data.Data["FieldBinderData"]);
                    var IsIdismatch = tempusercategory.find(function (item) { return item.Id === parseInt(fieldvalue); });
                    contextobj.Roombookrequest[20].LookupDetails.LookupValues = JSON.parse(data.Data["FieldBinderData"]);
                    if (IsIdismatch == undefined && target != 1) {
                        contextobj.Roombookrequest[20].FieldValue = "-1";
                        contextobj.Roombookrequest[20].HasValidationError = true;
                    }
                });
                break;
            case 1540:
                contextobj.setRecurrencePatternVisibility(target);
                break;
        }
    };
    ReservationRequestforroom.prototype.setRecurrencePatternVisibility = function (selRdbtnVal) {
        debugger;
        var contextobj = this;
        var fldArray = [1543, 1372, 1373, 1374, 1375, 2306];
        var shwweeklyselection = false;
        var showmonthRdbtnlst = false;
        var dayddlshow = false;
        var dayandDaysddlshow = false;
        switch (selRdbtnVal) {
            case 2:
                shwweeklyselection = true;
                break;
            case 3:
                showmonthRdbtnlst = true;
                break;
            case 4:
                break;
            case 6:
                showmonthRdbtnlst = true;
                dayddlshow = true;
                break;
            case 7:
                showmonthRdbtnlst = true;
                dayandDaysddlshow = true;
                break;
        }
        var cnt = fldArray.length;
        contextobj.Roombookrequest.find(function (el) {
            if (fldArray.indexOf(el.FieldId) > -1) {
                switch (el.FieldId) {
                    case 1543:
                        el.IsVisible = shwweeklyselection;
                        el.IsEnabled = shwweeklyselection;
                        el.MultiFieldValues = [];
                        cnt--;
                        break;
                    case 2306:
                        contextobj.SchedulingService.getSessionData().subscribe(function (data) {
                            var retData = data["Data"];
                            var UserRoleId = retData["UserRoleId"];
                            contextobj.SchedulingService.GetReservationUserRolesBasedSetting(UserRoleId).subscribe(function (data1) {
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
                        //el.IsVisible = shwweeklyselection;
                        el.ShowSelect = false;
                        el.FieldValue = "1";
                        cnt--;
                        break;
                    case 1372:
                        el.IsVisible = showmonthRdbtnlst;
                        el.IsEnabled = showmonthRdbtnlst;
                        el.FieldValue = "5";
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
    };
    ReservationRequestforroom.prototype.onSubmitData = function (event) {
        this.postSubmit(event["fieldobject"]);
        this.submitFieldvalues = event["fieldobject"];
    };
    ReservationRequestforroom.prototype.postSubmit = function (strsubmitField) {
        debugger;
        var contextObj = this;
        var datetime;
        var freq = 1;
        if (contextObj.SiteDate != undefined)
            datetime = new Date(contextObj.SiteDate);
        else
            datetime = new Date();
        contextObj.ReserveDetails = [];
        var Recurvalueforinsert;
        var weekdaysArray = [];
        var ParticipantsCount = 0;
        var fromTimeIndex = "-1";
        var toTimeIndex = "-1";
        var Frotimeid = parseInt(contextObj.Roombookrequest[3].FieldValue);
        var totimeid = parseInt(contextObj.Roombookrequest[5].FieldValue);
        var fromtime = contextObj.Roombookrequest[3].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.Roombookrequest[3].FieldValue)); });
        var totime = contextObj.Roombookrequest[5].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.Roombookrequest[5].FieldValue)); });
        contextObj.FromTime = fromtime[0]["Value"];
        if (contextObj.FromTime.indexOf("PM") > 0)
            contextObj.FromTime = contextObj.FromTime.replace("PM", ":00 PM");
        else if (contextObj.FromTime.indexOf("AM") > 0)
            contextObj.FromTime = contextObj.FromTime.replace("AM", ":00 AM");
        contextObj.Totime = totime[0]["Value"];
        if (contextObj.Totime.indexOf("PM") > 0)
            contextObj.Totime = contextObj.Totime.replace("PM", ":00 PM");
        else if (contextObj.Totime.indexOf("AM") > 0)
            contextObj.Totime = contextObj.Totime.replace("AM", ":00 AM");
        var UserCategoryId;
        var arr = new Array();
        var usercategoryvalue = new Array();
        usercategoryvalue.push({ ReportFieldId: 6738, Value: contextObj.Roombookrequest[20].FieldValue });
        arr = JSON.parse(strsubmitField);
        var addObj = JSON.parse(strsubmitField);
        var checkslotavailable = new Array();
        checkslotavailable.push({ ReportFieldId: 6712, Value: contextObj.selectedId.toString() });
        checkslotavailable.push({ ReportFieldId: 6714, Value: arr[2].Value + contextObj.FromTime });
        checkslotavailable.push({ ReportFieldId: 6715, Value: arr[4].Value + contextObj.Totime });
        var Eventname = arr.find(function (item) { return item.ReportFieldId === 7390; });
        var ParticipantsNo = arr.find(function (item) { return item.ReportFieldId === 6719; });
        var Comments = arr.find(function (item) { return item.ReportFieldId === 6720; });
        var Usercategory = arr.find(function (item) { return item.ReportFieldId === 5714; });
        if (ParticipantsNo.Value == null || ParticipantsNo.Value == "")
            ParticipantsNo.Value = "0";
        else if (parseInt(ParticipantsNo.Value) <= 0)
            ParticipantsCount = 1;
        if (Comments.Value == null)
            Comments.Value = "";
        if (Usercategory.Value == "1")
            UserCategoryId = 7;
        else if (Usercategory.Value == "2")
            UserCategoryId = 2;
        else
            UserCategoryId = 4;
        var Recurvalue;
        Recurvalueforinsert = arr.find(function (item) { return item.ReportFieldId === 5612; });
        if (Recurvalueforinsert.Value == "1")
            Recurvalue = 1;
        else
            Recurvalue = 0;
        var cnt = 1;
        addObj.find(function (item) {
            switch (item.ReportFieldId) {
                case 12322:
                    usercategoryvalue.push({ ReportFieldId: 12322, Value: item.Value });
                    freq = item.Value;
                    cnt--;
                    break;
            }
            if (cnt == 0)
                return true;
            else
                return false;
        });
        weekdaysArray = addObj.filter(function (el) { return el.ReportFieldId == 5615; });
        for (var i = 0; i < weekdaysArray.length; i++) {
            usercategoryvalue.push(weekdaysArray[i]);
        }
        var weekspecific;
        //usercategoryvalue.push({ ReportFieldId: 5612, Value: Recurvalueforinsert.Value })
        if (Recurvalueforinsert.Value == "1")
            weekspecific = "0";
        else {
            weekspecific = "1";
        }
        usercategoryvalue.push({ ReportFieldId: 5612, Value: Recurvalueforinsert.Value });
        usercategoryvalue.push({ ReportFieldId: 12323, Value: weekspecific });
        contextObj.ReserveDetails.push({
            SpaceId: contextObj.selectedId,
            FloorId: 0,
            RoomNo: contextObj.RoomNo,
            IsHoteling: false,
            FromDate: arr[2].Value + contextObj.FromTime,
            ToDate: arr[4].Value + contextObj.Totime,
            HasWorkflow: false,
            NoOfParticipants: parseInt(ParticipantsNo.Value),
            Comments: Comments.Value,
            EventName: Eventname.Value,
            Invitees: contextObj.InviteesListForInsert,
            Aminitees: contextObj.OriginalAmnietyvalueforinsert,
            OtherAminitees: contextObj.Amnietyvalueforinsert,
            Services: contextObj.OriginalServicevalueforinsert,
            OtherServices: contextObj.Servicevalueforinsert,
            Catering: contextObj.OriginalCateringvalueforinsert,
            OtherCatering: contextObj.Cateringvalueforinsert,
            UserCategoryId: UserCategoryId,
            StatusId: 41,
            RecurDaily: Recurvalue
        });
        var fromdateTime = arr[2].Value + contextObj.FromTime;
        var todateTime = arr[4].Value + contextObj.Totime;
        //if ((Frotimeid < 11 || Frotimeid > 38) || (totimeid < 11 || totimeid > 38))
        //    contextObj._notificationService.ShowToaster("Select a time between 06:00 AM and 07:00 PM", 2);
        //else {
        debugger;
        if (new Date(arr[2].Value) > new Date(arr[4].Value)) {
            //contextObj._notificationService.ShowToaster("To date must be greater than From date", 2);
            contextObj._notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
            return;
        }
        //if (new Date(arr[2].Value + contextObj.FromTime) < datetime)
        ////    contextObj._notificationService.ShowToaster("From time must be greater than Current time", 2);
        //    contextObj._notificationService.ShowToaster("From date and time must be greater than the Current date and time", 2);
        //else if (new Date(arr[4].Value + contextObj.Totime) < datetime)
        //    contextObj._notificationService.ShowToaster("To time must be greater than Current time", 2);
        //else {
        //if (Frotimeid >= totimeid)
        //    contextObj._notificationService.ShowToaster("To time must be greater than From time", 2);
        //else {
        fromTimeIndex = contextObj.Roombookrequest.find(function (el) { return el.FieldId == 1695; }).FieldValue;
        toTimeIndex = contextObj.Roombookrequest.find(function (el) { return el.FieldId == 1696; }).FieldValue;
        if ((Number(fromTimeIndex) >= Number(toTimeIndex))) {
            //contextObj._notificationService.ShowToaster("To time must be greater than From time", 2);
            contextObj._notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
        }
        else {
            if (Recurvalueforinsert.Value == "2" && weekdaysArray.length == 0)
                contextObj._notificationService.ShowToaster("Select Week Day(s)", 2);
            else {
                if (contextObj.isneedtoInsert != true) {
                    if (ParticipantsCount == 1)
                        contextObj._notificationService.ShowToaster("Participants (Number) must be greater than zero", 2);
                    else {
                        if (contextObj.Seats >= parseInt(ParticipantsNo.Value)) {
                            debugger;
                            contextObj.SchedulingService.checkConflictedRoomRequestExists(contextObj.selectedId, fromdateTime, todateTime, Recurvalueforinsert.Value, parseInt(contextObj.Roombookrequest[20].FieldValue), 1, weekdaysArray, freq).subscribe(function (resultConflict) {
                                debugger;
                                switch (resultConflict) {
                                    case 1:
                                        //contextObj.SchedulingService.IsReservationSlotInUse(JSON.stringify(checkslotavailable)).subscribe(function (result) {
                                        //    var data = result["Table3"];
                                        //    var objdata = JSON.parse(data);
                                        //if (objdata[0]["StatusId"] > 0)
                                        //    contextObj._notificationService.ShowToaster("Team Room reservation already exists for the selected time slot", 2);
                                        //else {
                                        contextObj.SchedulingService.submitReservationRequest(JSON.stringify(usercategoryvalue), JSON.stringify([contextObj.ReserveDetails[0]])).subscribe(function (resultdata) {
                                            switch (resultdata["Data"].StatusId) {
                                                case 0:
                                                    //contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                                    contextObj._notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                                                    break;
                                                case 1:
                                                    contextObj._notificationService.ShowToaster("Reservation Confirmed.", 3);
                                                    contextObj.submitSuccess.emit({ returnData: contextObj.ReserveDetails[0], "OldData": strsubmitField });
                                                    break;
                                            }
                                        });
                                        //}
                                        //});
                                        break;
                                    case -1:
                                        contextObj._notificationService.ShowToaster("Reservation exists", 2);
                                        break;
                                    case -3:
                                        contextObj._notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2);
                                        break;
                                    case -4:
                                        if (contextObj.AdvanceResPeriod > 0) {
                                            contextObj._notificationService.ShowToaster(contextObj.roomtxt + " booking can be done only " + contextObj.AdvanceResPeriod + " days in advance", 2);
                                        }
                                        else {
                                            contextObj.SchedulingService.checkSubscribedFeature('240').subscribe(function (result) {
                                                if (result["Data"][0]["IsSubscribed"]) {
                                                    contextObj._notificationService.ShowToaster(contextObj.roomtxt + " booking can be done only " + result["Data"][0].Value + " days in advance", 2);
                                                }
                                            });
                                        }
                                        break;
                                    case -5:
                                        contextObj._notificationService.ShowToaster("Reservation already exists for the selected user in the selected time slot", 2);
                                        break;
                                    case -6:
                                        contextObj._notificationService.ShowToaster(contextObj.roomtxt + " Reservations cannot be made for Saturdays and Sundays", 2);
                                        break;
                                    case -7:
                                        contextObj._notificationService.ShowToaster("Only " + contextObj.MaxNoofReservation + " reservations can be done within " + contextObj.AdvanceResPeriod + " days", 2);
                                        break;
                                    case -9:
                                        contextObj._notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                                        break;
                                    default:
                                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                        break;
                                }
                            });
                        }
                        else {
                            contextObj.message = "Room Capacity of the selected " + contextObj.roomtxt + " is only " + contextObj.Seats + ", Do you want to proceed? ";
                            contextObj.showSlide = !contextObj.showSlide;
                        }
                    }
                }
                else {
                    contextObj.SchedulingService.checkConflictedRoomRequestExists(contextObj.selectedId, fromdateTime, todateTime, Recurvalueforinsert.Value, parseInt(contextObj.Roombookrequest[20].FieldValue), 1).subscribe(function (resultConflict) {
                        switch (resultConflict) {
                            case 1:
                                //contextObj.SchedulingService.IsReservationSlotInUse(JSON.stringify(checkslotavailable)).subscribe(function (result) {
                                //    var data = result["Table3"];
                                //    var objdata = JSON.parse(data);
                                //if (objdata[0]["StatusId"] > 0)
                                //    contextObj._notificationService.ShowToaster("Team Room reservation already exists for the selected time slot", 2);
                                //else {
                                contextObj.SchedulingService.submitReservationRequest(JSON.stringify(usercategoryvalue), JSON.stringify([contextObj.ReserveDetails[0]])).subscribe(function (resultdata) {
                                    switch (resultdata["Data"].StatusId) {
                                        case 0:
                                            //contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                            contextObj._notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                                            break;
                                        case 1:
                                            contextObj._notificationService.ShowToaster("Reservation Confirmed.", 3);
                                            contextObj.submitSuccess.emit({ returnData: JSON.stringify([contextObj.ReserveDetails[0]]), "OldData": strsubmitField });
                                            break;
                                    }
                                });
                                //    }
                                //});
                                break;
                            case -1:
                                contextObj._notificationService.ShowToaster("Reservation exists", 2);
                                break;
                            case -3:
                                contextObj._notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2);
                                break;
                            case -4:
                                if (contextObj.AdvanceResPeriod > 0) {
                                    contextObj._notificationService.ShowToaster(contextObj.roomtxt + " booking can be done only " + contextObj.AdvanceResPeriod + " days in advance", 2);
                                }
                                else {
                                    contextObj.SchedulingService.checkSubscribedFeature('240').subscribe(function (result) {
                                        if (result["Data"][0]["IsSubscribed"]) {
                                            contextObj._notificationService.ShowToaster(contextObj.roomtxt + " booking can be done only " + result["Data"][0].Value + " days in advance", 2);
                                        }
                                    });
                                }
                                break;
                            case -5:
                                contextObj._notificationService.ShowToaster("Reservation already exists for the selected user in the selected time slot", 2);
                                break;
                            case -6:
                                contextObj._notificationService.ShowToaster("Reservation cannot be done on Saturday/Sunday", 2);
                                break;
                            case -7:
                                contextObj._notificationService.ShowToaster("Only " + contextObj.MaxNoofReservation + " reservations can be done within " + contextObj.AdvanceResPeriod + " days", 2);
                                break;
                            case -9:
                                contextObj._notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                                break;
                            default:
                                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                                break;
                        }
                    });
                }
            }
        }
        //}
        //}
        //}
        this.isneedtoInsert = false;
    };
    ReservationRequestforroom.prototype.checkAvailability = function (event) {
        var contextObj = this;
        var iserror = false;
        if (event["fieldData"].FieldId == 1689) {
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
            this.Roombookrequest.find(function (el) {
                switch (el.FieldId) {
                    case 1687:
                        fromdate = el.FieldValue;
                        cnt--;
                        break;
                    case 1695:
                        fromTimeIndex = el.FieldValue;
                        var filObjTime = el.LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(el.FieldValue)); });
                        if (filObjTime && filObjTime.length > 0)
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
                        var filObjTime = el.LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(el.FieldValue)); });
                        if (filObjTime && filObjTime.length > 0)
                            totime = filObjTime[0].Value;
                        else
                            iserror = true;
                        cnt--;
                        break;
                    case 1692:
                        bookedForId = Number(el.FieldValue);
                        cnt--;
                        break;
                    case 1540:
                        recurrenceId = Number(el.FieldValue);
                        cnt--;
                        break;
                    case 1543:
                        weekdays = el.MultiFieldValues;
                        cnt--;
                        break;
                    case 2306:
                        frequencyRecur = el.FieldValue;
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
                if (contextObj.SiteDate != undefined)
                    currDateTime = new Date(contextObj.SiteDate);
                else
                    currDateTime = new Date();
                var fromdateTime = fromdate + fromtime;
                var todateTime = todate + totime;
                var subDatefromTime = fromdate + fromtime.substring(0, fromtime.length - 2) + ":00 " + fromtime.substring(fromtime.length - 2, fromtime.length);
                var subDatetoTime = todate + totime.substring(0, totime.length - 2) + ":00 " + totime.substring(totime.length - 2, totime.length);
                //if (new Date(subDatefromTime) < currDateTime) {
                //    contextObj._notificationService.ShowToaster("From time must be greater than Current time", 2);
                //}
                //else if (new Date(subDatetoTime) < currDateTime) {
                //    contextObj._notificationService.ShowToaster("To time must be greater than Current time", 2);
                //}
                if ((Number(fromTimeIndex) >= Number(toTimeIndex))) {
                    contextObj._notificationService.ShowToaster("To time must be greater than From time", 2);
                }
                else if (new Date(subDatefromTime) >= new Date(subDatetoTime)) {
                    contextObj._notificationService.ShowToaster("To date must be greater than From date", 2);
                }
                else if (recurrenceId == 2 && weekdays.length == 0) {
                    contextObj._notificationService.ShowToaster("Select Week Day(s)", 2);
                }
                else if (todateTime != "" && fromdateTime != "") {
                    var weekdayArray = [];
                    if (weekdays.length > 0) {
                        for (var i = 0; i < weekdays.length; i++) {
                            weekdayArray.push({ "ReportFieldId": 5615, "Value": weekdays[i] });
                        }
                    }
                    contextObj.SchedulingService.checkConflictedRoomRequestExists(contextObj.selectedId, fromdateTime, todateTime, recurrenceId, bookedForId, 1, weekdayArray, frequencyRecur).subscribe(function (resultConflict) {
                        switch (resultConflict) {
                            case 1:
                                contextObj._notificationService.ShowToaster(contextObj.roomtxt + " is available for the selected time", 2);
                                break;
                            case -1:
                                contextObj._notificationService.ShowToaster(contextObj.roomtxt + " Reservation exists", 2);
                                break;
                            case -3:
                                contextObj._notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2);
                                break;
                            case -4:
                                if (contextObj.AdvanceResPeriod > 0) {
                                    contextObj._notificationService.ShowToaster(contextObj.roomtxt + " booking can be done only " + contextObj.AdvanceResPeriod + " days in advance", 2);
                                }
                                else {
                                    contextObj.SchedulingService.checkSubscribedFeature('240').subscribe(function (result) {
                                        if (result["Data"][0]["IsSubscribed"]) {
                                            contextObj._notificationService.ShowToaster(contextObj.roomtxt + " booking can be done only " + result["Data"][0].Value + " days in advance", 2);
                                        }
                                    });
                                }
                                break;
                            case -5:
                                contextObj.SchedulingService.getSessionData().subscribe(function (data) {
                                    if (data["Data"]["UserId"] != bookedForId) {
                                        contextObj._notificationService.ShowToaster("Selected User already have another reservation for the same time slot", 2);
                                    }
                                    else {
                                        contextObj._notificationService.ShowToaster("You already have another reservation for the same time slot", 2);
                                    }
                                });
                                break;
                            case -6:
                                contextObj._notificationService.ShowToaster("Reservations cannot be made for Saturdays and Sundays", 2);
                                break;
                            case -7:
                                contextObj._notificationService.ShowToaster("Only " + contextObj.MaxNoofReservation + " reservations can be done within " + contextObj.AdvanceResPeriod + " days", 2);
                                break;
                            case -9:
                                contextObj._notificationService.ShowToaster("Select Week Day(s) fall between the selected date range", 2);
                                break;
                        }
                    });
                }
            }
        }
        //for (var i = 0; i < contextobj.Roombookrequest.length; i++) {
        //    if (contextobj.Roombookrequest[i].FieldId == 1721 || contextobj.Roombookrequest[i].FieldId == 1719 || contextobj.Roombookrequest[i].FieldId == 1720 || contextobj.Roombookrequest[i].FieldId == 698 || contextobj.Roombookrequest[i].FieldId == 465 || contextobj.Roombookrequest[i].FieldId == 2050) {
        //        if (this.needtohide == false)
        //            contextobj.Roombookrequest[i].IsVisible = true;
        //        else
        //            contextobj.Roombookrequest[i].IsVisible = false;
        //    }               
        //}
        //this.needtohide = !this.needtohide;
    };
    ReservationRequestforroom.prototype.fieldChange = function (event) {
        var contextObj = this;
        var fieldvalue = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var fieldid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        if (fieldid == 1695 && fieldvalue != "-1") {
            var timeid = parseInt(event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"]);
            timeid = timeid - 13;
            if (timeid == 48) {
                timeid = 0;
                contextObj.Roombookrequest[4].FieldValue = contextObj.TommorrowDate;
            }
            contextObj.Roombookrequest[5].FieldValue = contextObj.Roombookrequest[5].LookupDetails.LookupValues[timeid].Id.toString();
        }
    };
    ReservationRequestforroom.prototype.listbuttonadd = function (event) {
        var ContextObj = this;
        switch (event["FieldObject"]["FieldId"]) {
            case 1823:
                ContextObj.Invitees = event["FieldObject"];
                ContextObj.secondaryTarget = 1;
                ContextObj.pageTitle = "Invitees";
                break;
            case 1824:
                ContextObj.Amenities = event["FieldObject"];
                ContextObj.secondaryTarget = 2;
                ContextObj.pageTitle = "Amenities";
                break;
            case 1825:
                ContextObj.Services = event["FieldObject"];
                ContextObj.secondaryTarget = 3;
                ContextObj.pageTitle = "Services";
                break;
            case 1826:
                ContextObj.Catering = event["FieldObject"];
                ContextObj.secondaryTarget = 4;
                ContextObj.pageTitle = "Catering";
                break;
        }
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    ReservationRequestforroom.prototype.listbuttondelete = function (event) {
        var ContextObj = this;
        var tempInviteesList = "";
        var tempamnitiesList = "";
        var tempOriginalamnitiesList = "";
        var tempOriginalservicesList = "";
        var tempOriginalcateringList = "";
        var tempservicesList = "";
        var tempcateringList = "";
        ContextObj.InviteesListForInsert = "";
        ContextObj.Amnietyvalueforinsert = "";
        ContextObj.OriginalAmnietyvalueforinsert = "";
        ContextObj.OriginalServicevalueforinsert = "";
        ContextObj.OriginalCateringvalueforinsert = "";
        ContextObj.Servicevalueforinsert = "";
        ContextObj.Cateringvalueforinsert = "";
        switch (event["FieldObject"]["FieldId"]) {
            case 1823:
                if (event["SelectedId"] == -1 && event["FieldObject"] != undefined)
                    ContextObj._notificationService.ShowToaster("Select an Invitee", 2);
                else {
                    ContextObj.Invitees = event["FieldObject"];
                    for (var i = 0; i < ContextObj.Invitees["LookupDetails"]["LookupValues"].length; i++) {
                        tempInviteesList = ContextObj.Invitees["LookupDetails"]["LookupValues"][i].InsertValue;
                        ContextObj.InviteesListForInsert = ContextObj.InviteesListForInsert + tempInviteesList + "µ1µ§";
                    }
                }
                break;
            case 1824:
                if (event["SelectedId"] == -1 && event["FieldObject"] != undefined)
                    ContextObj._notificationService.ShowToaster("Select an Amenity", 2);
                else {
                    ContextObj.Amenities = event["FieldObject"];
                    ContextObj.Ameniety = ContextObj.Amenities["LookupDetails"]["LookupValues"];
                    for (var i = 0; i < ContextObj.Amenities["LookupDetails"]["LookupValues"].length; i++) {
                        tempamnitiesList = ContextObj.Amenities["LookupDetails"]["LookupValues"][i].InsertValue;
                        tempOriginalamnitiesList = ContextObj.Amenities["LookupDetails"]["LookupValues"][i].InsertOriginalValue;
                        ContextObj.Amnietyvalueforinsert = ContextObj.Amnietyvalueforinsert + tempamnitiesList;
                        ContextObj.OriginalAmnietyvalueforinsert = ContextObj.OriginalAmnietyvalueforinsert + tempOriginalamnitiesList;
                    }
                }
                break;
            case 1825:
                if (event["SelectedId"] == -1 && event["FieldObject"] != undefined)
                    ContextObj._notificationService.ShowToaster("Select a Service", 2);
                else {
                    ContextObj.Services = event["FieldObject"];
                    ContextObj.Service = ContextObj.Services["LookupDetails"]["LookupValues"];
                    for (var i = 0; i < ContextObj.Services["LookupDetails"]["LookupValues"].length; i++) {
                        tempamnitiesList = ContextObj.Services["LookupDetails"]["LookupValues"][i].InsertValue;
                        tempOriginalservicesList = ContextObj.Services["LookupDetails"]["LookupValues"][i].InsertOriginalValue;
                        ContextObj.Servicevalueforinsert = ContextObj.Servicevalueforinsert + tempservicesList;
                        ContextObj.OriginalServicevalueforinsert = ContextObj.OriginalServicevalueforinsert + tempOriginalservicesList;
                    }
                }
                break;
            case 1826:
                if (event["SelectedId"] == -1 && event["FieldObject"] != undefined)
                    ContextObj._notificationService.ShowToaster("Select a Catering", 2);
                else {
                    ContextObj.Catering = event["FieldObject"];
                    ContextObj.Cateringarray = ContextObj.Catering["LookupDetails"]["LookupValues"];
                    for (var i = 0; i < ContextObj.Catering["LookupDetails"]["LookupValues"].length; i++) {
                        tempcateringList = ContextObj.Catering["LookupDetails"]["LookupValues"][i].InsertValue;
                        tempOriginalcateringList = ContextObj.Catering["LookupDetails"]["LookupValues"][i].InsertOriginalValue;
                        ContextObj.Cateringvalueforinsert = ContextObj.Cateringvalueforinsert + tempcateringList;
                        ContextObj.OriginalCateringvalueforinsert = ContextObj.OriginalCateringvalueforinsert + tempOriginalcateringList;
                    }
                }
                break;
        }
        //document.getElementById(ContextObj.list.lastElementChild.id).remove();
        //ContextObj.CheckboxvaluesforInvitees.pop();
        //for (let i = 0; i < ContextObj.CheckboxvaluesforInvitees.length; i++) {
        //    tempInviteesList = ContextObj.CheckboxvaluesforInvitees[i]["Value"].split("µ")[0] + "µ" + ContextObj.CheckboxvaluesforInvitees[i]["Value"].split("µ")[1];
        //    ContextObj.ShowinListItem = ContextObj.CheckboxvaluesforInvitees[i]["Value"].split("µ")[2];
        //    ContextObj.InviteesListForInsert = ContextObj.InviteesListForInsert + tempInviteesList + "µ1µ§"
        //}
        //ContextObj.InviteesList.emit({ "InviteesList": ContextObj.InviteesListForInsert });
    };
    ReservationRequestforroom.prototype.OnSuccessfulSubmit = function (event) {
        var ContextObj = this;
        var tempInviteesList = "";
        ContextObj.InviteesListForInsert = "";
        var temp = new Array();
        //ContextObj.CheckboxvaluesforInvitees = [];
        if (ContextObj.CheckboxvaluesforInvitees != undefined && ContextObj.CheckboxvaluesforInvitees.length > 0) {
            ContextObj.CheckboxvaluesforInvitees = ContextObj.CheckboxvaluesforInvitees.concat(event["arrayList"]);
            var InsertValues = [];
            var uniquesData = [];
            var index;
            for (var i = 0; i < ContextObj.CheckboxvaluesforInvitees.length; i++) {
                index = InsertValues.indexOf(ContextObj.CheckboxvaluesforInvitees[i].InsertValue);
                if (index == -1) {
                    InsertValues.push(ContextObj.CheckboxvaluesforInvitees[i].InsertValue);
                    uniquesData.push(ContextObj.CheckboxvaluesforInvitees[i]);
                }
                else {
                    uniquesData[index].DIFF += ContextObj.CheckboxvaluesforInvitees[i].DIFF;
                }
            }
            ContextObj.CheckboxvaluesforInvitees = uniquesData;
        }
        else
            ContextObj.CheckboxvaluesforInvitees = event["arrayList"];
        //temp = event["arrayList"];
        ContextObj.Invitees["LookupDetails"]["LookupValues"] = ContextObj.CheckboxvaluesforInvitees;
        for (var i_1 = 0; i_1 < ContextObj.CheckboxvaluesforInvitees.length; i_1++) {
            tempInviteesList = ContextObj.CheckboxvaluesforInvitees[i_1].InsertValue;
            //ContextObj.Invitees["LookupDetails"]["LookupValues"][i].Value = temp[i]["Value"].split("µ")[2];
            ContextObj.InviteesListForInsert = ContextObj.InviteesListForInsert + tempInviteesList + "µ1µ§";
        }
        ContextObj.InviteesList.emit({ "InviteesList": ContextObj.InviteesListForInsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    ReservationRequestforroom.prototype.OnSuccessfulAmenitiesSubmit = function (event) {
        var ContextObj = this;
        var tempInviteesList = "";
        ContextObj.Amnietyvalueforinsert = event["Amenityvalue"];
        ContextObj.OriginalAmnietyvalueforinsert = event["OriginalAmnietyvalue"];
        ContextObj.Ameniety = event["arrayList"];
        ContextObj.Amenities["LookupDetails"]["LookupValues"] = ContextObj.Ameniety;
        ContextObj.AmnietyList.emit({ "AmnietyList": ContextObj.Amnietyvalueforinsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    ReservationRequestforroom.prototype.OnSuccessfulServiceSubmit = function (event) {
        var ContextObj = this;
        var tempInviteesList = "";
        ContextObj.Servicevalueforinsert = event["Servicevalue"];
        ContextObj.OriginalServicevalueforinsert = event["OriginalServicevalue"];
        ContextObj.Service = event["arrayList"];
        ContextObj.Services["LookupDetails"]["LookupValues"] = ContextObj.Service;
        ContextObj.ServiceList.emit({ "ServiceList": ContextObj.Servicevalueforinsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    ReservationRequestforroom.prototype.OnSuccessfulCateringSubmit = function (event) {
        var ContextObj = this;
        var tempCateringList = "";
        ContextObj.Cateringvalueforinsert = event["Cateringvalue"];
        ContextObj.OriginalCateringvalueforinsert = event["OriginalCateringvalue"];
        ContextObj.Cateringarray = event["arrayList"];
        ContextObj.Catering["LookupDetails"]["LookupValues"] = ContextObj.Cateringarray;
        ContextObj.CateringList.emit({ "CateringList": ContextObj.Cateringvalueforinsert });
        ContextObj.splitviewInput.showSecondaryView = !ContextObj.splitviewInput.showSecondaryView;
    };
    ReservationRequestforroom.prototype.okSubmit = function (event) {
        this.showSlide = !this.showSlide;
        this.isneedtoInsert = true;
        this.postSubmit(this.submitFieldvalues);
    };
    ReservationRequestforroom.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ReservationRequestforroom.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ReservationRequestforroom.prototype.divClicked = function (event) {
        var contextObj = this;
        if (event["dateChangeObject"]["FieldObject"]["FieldId"] == 1687) {
            var elem = document.getElementsByClassName("date-picker")[4];
            if (elem == undefined)
                elem = document.getElementsByClassName("date-picker")[1];
            elem.value = event["dateChangeObject"]["FieldObject"]["FieldValue"];
            contextObj.Roombookrequest[4].FieldValue = event["dateChangeObject"]["FieldObject"]["FieldValue"];
        }
    };
    ReservationRequestforroom.prototype.getSessionUserData = function () {
        debugger;
        var contextObj = this;
        contextObj.SchedulingService.getSessionData().subscribe(function (data) {
            debugger;
            var retData = data["Data"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            contextObj.SchedulingService.GetUserRolebasedSettingsRowData(parseInt(contextObj.sessionUserRoleId)).subscribe(function (result) {
                debugger;
                if (result.Data.DataCount == 1) {
                    contextObj.AdvanceResPeriod = JSON.parse(result.Data.FieldBinderData)[0]["Advance Reservation Period (in days)"];
                    contextObj.MaxNoofReservation = JSON.parse(result.Data.FieldBinderData)[0]["Maximum Number of Reservation"];
                }
                if (contextObj.AdvanceResPeriod == null) {
                    contextObj.SchedulingService.checkSubscribedFeature('240').subscribe(function (result) {
                        if (result["Data"][0]["IsSubscribed"]) {
                            contextObj.AdvanceResPeriod = result["Data"][0].Value;
                        }
                    });
                }
            });
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReservationRequestforroom.prototype, "InviteesList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReservationRequestforroom.prototype, "AmnietyList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReservationRequestforroom.prototype, "ServiceList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReservationRequestforroom.prototype, "CateringList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReservationRequestforroom.prototype, "FromTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ReservationRequestforroom.prototype, "Totime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ReservationRequestforroom.prototype, "Seats", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ReservationRequestforroom.prototype, "FloorId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ReservationRequestforroom.prototype, "SiteDate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ReservationRequestforroom.prototype, "submitSuccess", void 0);
    ReservationRequestforroom = __decorate([
        core_1.Component({
            selector: 'reservation-request',
            templateUrl: './app/Views/Scheduling/Room Booking/reserveroom-reservationrequest.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, Invitees_checkboxgrid_component_1.Inviteescheckboxgrid, Amenities_listcustomadd_componet_1.AmenitiesCustomadd, CustomServiceAdd_component_1.ServicesCustomadd, Catering_listCustomadd_component_1.CateringCustomadd],
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'action', 'Roombookrequest', 'btnName', 'RoomNo', 'fieldDetailsAdd', 'target']
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, core_1.Renderer, core_1.ElementRef])
    ], ReservationRequestforroom);
    return ReservationRequestforroom;
}());
exports.ReservationRequestforroom = ReservationRequestforroom;
//# sourceMappingURL=reserveroom-reservationrequest.component.js.map