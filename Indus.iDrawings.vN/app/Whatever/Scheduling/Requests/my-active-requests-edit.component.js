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
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var MyActiveRequestEditComponent = (function () {
    function MyActiveRequestEditComponent(schedulingService, _notificationService) {
        this.schedulingService = schedulingService;
        this._notificationService = _notificationService;
        this.disableDates = ["Sunday", "Saturday"];
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.message = "";
        this.isneedtoUpdate = false;
        this.roomtxt = "Team Room";
        this.formHeight = window.innerHeight - 250;
        this.formHeight = this.formHeight + "px";
    }
    MyActiveRequestEditComponent.prototype.ngOnInit = function () {
        this.checkSubscribedFeatures();
        this.getSessionUserData();
    };
    MyActiveRequestEditComponent.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('275').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtxt = result["Data"][0].Value;
            }
        });
    };
    MyActiveRequestEditComponent.prototype.ddlChange = function (event) {
        var contextobj = this;
        var index = "-1";
        var rptFieldId = event.ddlRelationShipEvent.ChildFieldObject;
        if (rptFieldId.FieldId == 1695) {
            if (rptFieldId.FieldValue == "48") {
                index = "1";
            }
            else {
                index = (Number(rptFieldId.FieldValue) + 1).toString();
            }
            contextobj.fieldDetailsAdd.find(function (el) {
                if (el.FieldId == 1696) {
                    if (el.FieldValue > index) {
                        index = el.FieldValue;
                    }
                    el.FieldValue = index;
                    return true;
                }
                else {
                    return false;
                }
            });
        }
    };
    MyActiveRequestEditComponent.prototype.divClicked = function (event) {
        var contextObj = this;
        if (event["dateChangeObject"]["FieldObject"]["FieldId"] == 1687) {
            var elem = document.getElementById("1688");
            elem.value = event["dateChangeObject"]["FieldObject"]["FieldValue"];
            //contextObj.fieldDetailsAdd[3].FieldValue = event["dateChangeObject"]["FieldObject"]["FieldValue"];
            contextObj.fieldDetailsAdd.find(function (el) {
                if (el.FieldId == 1688) {
                    el.FieldValue = event["dateChangeObject"]["FieldObject"]["FieldValue"];
                    return true;
                }
            });
        }
    };
    MyActiveRequestEditComponent.prototype.onSubmitData = function (event) {
        this.submitFieldvalues = event["fieldobject"];
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    MyActiveRequestEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var fielddata = JSON.parse(strsubmitField);
        var ParticipantsCount = 0;
        var frmTime = contextObj.fieldDetailsAdd[2].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.fieldDetailsAdd[2].FieldValue)); });
        var toTime = contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.fieldDetailsAdd[4].FieldValue)); });
        var fromTime = fielddata[1].Value + frmTime[0].Value;
        var toTime1 = fielddata[3].Value + toTime[0].Value;
        fielddata[9].Value = fromTime;
        fielddata[10].Value = toTime1;
        fromTime = fromTime.replace("PM", " PM").replace("AM", " AM");
        toTime1 = toTime1.replace("PM", " PM").replace("AM", " AM");
        var ft = new Date(fromTime);
        var tt = new Date(toTime1);
        var index;
        index = fielddata.findIndex(function (el) { return el['ReportFieldId'] == 6719; });
        var participants = fielddata[index].Value;
        index = fielddata.findIndex(function (el) { return el['ReportFieldId'] == 6720; });
        var comments = fielddata[index].Value;
        if (participants == null || participants == "")
            participants = "1";
        else if (parseInt(participants) <= 0)
            ParticipantsCount = 1;
        if (comments == null || comments == undefined)
            comments = "";
        //if (ft >= tt)
        //{
        //    contextObj._notificationService.ShowToaster("To Time must be greater than From Time", 2);
        //    return;
        //}
        if (new Date(fielddata[1].Value) > new Date(fielddata[3].Value)) {
            //contextObj._notificationService.ShowToaster("To Date must be greater than From Date", 2);
            contextObj._notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
            return;
        }
        else if (frmTime[0].Id > toTime[0].Id) {
            //contextObj._notificationService.ShowToaster("To time must be greater than From time", 2);
            contextObj._notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
            return;
        }
        var currentTime = new Date(contextObj.SpaceTime);
        if (ft < currentTime) {
            //contextObj._notificationService.ShowToaster("From time must be greater than Current time", 2);
            contextObj._notificationService.ShowToaster("From date and time must be greater than the Current date and time", 2);
            return;
        }
        if (tt < currentTime) {
            contextObj._notificationService.ShowToaster("To time must be greater than Current time", 2);
            return;
        }
        var fromhour = ft.getHours();
        var tohour = tt.getHours();
        var tomin = tt.getMinutes();
        if (fromhour < 6 || fromhour >= 19 || tohour < 6 || tohour > 19 || (tohour == 19 && tomin > 0)) {
            contextObj._notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2);
            return;
        }
        var fromweekday = ft.getDay();
        var toweekday = tt.getDay();
        if (fromweekday == 0 || fromweekday == 6 || toweekday == 0 || toweekday == 6) {
            contextObj._notificationService.ShowToaster(contextObj.roomtxt + " Reservations cannot be made for Saturdays and Sundays", 2);
            return;
        }
        if (ParticipantsCount == 1) {
            contextObj._notificationService.ShowToaster("Participants (Number) must be greater than zero", 2);
            return;
        }
        if (contextObj.isneedtoUpdate != true) {
            if (contextObj.RoomCapacity >= parseInt(participants)) {
                contextObj.submitAfterValidations(fromTime, toTime1, participants, comments, fielddata, strsubmitField, target);
            }
            else {
                contextObj.message = "Room Capacity of the selected " + contextObj.roomtxt + " is only " + contextObj.RoomCapacity + ", Do you want to proceed? ";
                contextObj.showSlide = !contextObj.showSlide;
            }
        }
        else {
            contextObj.submitAfterValidations(fromTime, toTime1, participants, comments, fielddata, strsubmitField, target);
        }
    };
    MyActiveRequestEditComponent.prototype.submitAfterValidations = function (fromTime, toTime1, participants, comments, fielddata, strsubmitField, target) {
        var contextObj = this;
        contextObj.schedulingService.checkConflictedRoomRequestExistsforedit(contextObj.SpaceId, contextObj.selectedId, fromTime, toTime1, contextObj.ReservedUserId, 1).subscribe(function (resultConflict) {
            switch (resultConflict) {
                case 1:
                    //contextObj.schedulingService.checkSubscribedFeature("240").subscribe(function (resultData) {
                    //    var IsSubscribed = resultData["Data"][0].IsSubscribed;
                    //    if (IsSubscribed == true) {
                    //        var value = resultData["Data"][0].Value;
                    //        var after14days = new Date(new Date(contextObj.SpaceTime).getTime() + (parseInt(value) * 24 * 60 * 60 * 1000));
                    //        //var onedaybefore14 = new Date(new Date(contextObj.SpaceTime).getTime() + ((parseInt(value) - 1) * 24 * 60 * 60 * 1000));
                    //        if (ft > after14days || tt > after14days) {
                    //            //var date = new Date(onedaybefore14.toString());
                    //            //var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
                    //            //var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    //            //var mon = monthNames[date.getMonth()];
                    //            //var yy = date.getFullYear();
                    //            //var strDate = dd + " " + mon + " " + yy;
                    //            //contextObj._notificationService.ShowToaster("Select a date on or before " + strDate, 5);
                    //            contextObj._notificationService.ShowToaster("Team Room reservation booking can be done only " + value + " days in advance", 2);
                    //            return;                                                              
                    //        }
                    //    }
                    var data = new Array();
                    data.push({ ReportFieldId: 6714, Value: fromTime });
                    data.push({ ReportFieldId: 6715, Value: toTime1 });
                    data.push({ ReportFieldId: 6716, Value: "32" });
                    data.push({ ReportFieldId: 6716, Value: "40" });
                    data.push({ ReportFieldId: 6716, Value: "41" });
                    data.push({ ReportFieldId: 6711, Value: contextObj.selectedId.toString() });
                    data.push({ ReportFieldId: 6719, Value: participants });
                    data.push({ ReportFieldId: 6720, Value: comments });
                    var datafield = JSON.stringify(data);
                    strsubmitField = JSON.stringify(fielddata);
                    contextObj.schedulingService.updateReservationRequest(contextObj.selectedId, datafield, null, null, false).subscribe(function (resultData) {
                        switch (resultData.StatusId) {
                            case 0:
                                contextObj._notificationService.ShowToaster("Reservation already exist", 5);
                                break;
                            case 1:
                                if (target == 1) {
                                    contextObj._notificationService.ShowToaster("Reservation  Updated", 3);
                                }
                                else {
                                    contextObj._notificationService.ShowToaster("Reservation  Updated", 3);
                                }
                                contextObj.submitSuccess.emit({ returnData: resultData.Data });
                                break;
                            case 3:
                                if (resultData["Data"].ServerId == -1) {
                                    contextObj._notificationService.ShowToaster("Reservation already exist", 5);
                                }
                                else {
                                    contextObj._notificationService.ShowToaster("Reservation already exist", 1);
                                }
                                break;
                            default:
                                contextObj._notificationService.ShowToaster("Reservation already exist", 5);
                                break;
                        }
                    });
                    //});
                    break;
                case -1:
                    contextObj._notificationService.ShowToaster("Reservation exists", 2);
                    break;
                case -3:
                    contextObj._notificationService.ShowToaster("Select a time between '06:00 AM' and '07:00 PM'", 2);
                    break;
                case -4:
                    contextObj.schedulingService.checkSubscribedFeature('240').subscribe(function (result) {
                        if (result["Data"][0]["IsSubscribed"]) {
                            contextObj._notificationService.ShowToaster(contextObj.roomtxt + " Reservations can be done only " + result["Data"][0].Value + " days in advance", 2);
                        }
                    });
                    break;
                case -5:
                    contextObj._notificationService.ShowToaster("Reservation already exists for the selected user in the selected time slot", 2);
                    break;
                case -6:
                    contextObj._notificationService.ShowToaster(contextObj.roomtxt + " Reservations cannot be made for Saturdays and Sundays", 2);
                    break;
            }
        });
    };
    MyActiveRequestEditComponent.prototype.okSubmit = function (event) {
        this.showSlide = !this.showSlide;
        this.isneedtoUpdate = true;
        this.postSubmit(this.submitFieldvalues, 1);
    };
    MyActiveRequestEditComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    MyActiveRequestEditComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    MyActiveRequestEditComponent.prototype.checkbtnClick = function (event) {
        var contextObj = this;
        if (event["fieldData"].FieldId == 915) {
            var arrayforfind = [1687, 1695, 1688, 1696, 1812];
            var cnt = arrayforfind.length;
            var fromtime = "";
            var totime = "";
            var fromdate = "";
            var todate = "";
            var fromTimeIndex = "-1";
            var toTimeIndex = "-1";
            var bookedForId = 0;
            this.fieldDetailsAdd.find(function (el) {
                switch (el.FieldId) {
                    case 1687:
                        fromdate = el.FieldValue;
                        cnt--;
                        break;
                    case 1695:
                        fromTimeIndex = el.FieldValue;
                        var filObjTime = el.LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(el.FieldValue)); });
                        fromtime = filObjTime[0].Value;
                        cnt--;
                        break;
                    case 1688:
                        todate = el.FieldValue;
                        cnt--;
                        break;
                    case 1696:
                        toTimeIndex = el.FieldValue;
                        var filObjTime = el.LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(el.FieldValue)); });
                        totime = filObjTime[0].Value;
                        cnt--;
                        break;
                    case 1812:
                        bookedForId = Number(el.FieldValue);
                        cnt--;
                        break;
                }
                if (cnt == 0)
                    return true;
                else
                    return false;
            });
            var currDateTime;
            if (contextObj.SpaceTime != undefined)
                currDateTime = new Date(contextObj.SpaceTime);
            else
                currDateTime = new Date();
            var fromdateTime = fromdate + fromtime;
            var todateTime = todate + totime;
            var subDatefromTime = fromdate + fromtime.substring(0, fromtime.length - 2) + ":00 " + fromtime.substring(fromtime.length - 2, fromtime.length);
            var subDatetoTime = todate + totime.substring(0, totime.length - 2) + ":00 " + totime.substring(totime.length - 2, totime.length);
            if (new Date(subDatefromTime) < currDateTime) {
                //contextObj._notificationService.ShowToaster("From time must be greater than Current time", 2);
                contextObj._notificationService.ShowToaster("From date and time must be greater than the Current date and time", 2);
            }
            else if (new Date(subDatetoTime) < currDateTime) {
                contextObj._notificationService.ShowToaster("To time must be greater than Current time", 2);
            }
            else if ((Number(fromTimeIndex) >= Number(toTimeIndex))) {
                //contextObj._notificationService.ShowToaster("To time must be greater than From time", 2);
                contextObj._notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
            }
            else if (new Date(subDatefromTime) >= new Date(subDatetoTime)) {
                //contextObj._notificationService.ShowToaster("To date must be greater than From date", 2);
                contextObj._notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
            }
            else {
                contextObj.schedulingService.checkConflictedRoomRequestExistsforedit(contextObj.SpaceId, contextObj.selectedId, fromdateTime, todateTime, contextObj.ReservedUserId, 1).subscribe(function (resultConflict) {
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
                                contextObj.schedulingService.checkSubscribedFeature('240').subscribe(function (result) {
                                    if (result["Data"][0]["IsSubscribed"]) {
                                        contextObj._notificationService.ShowToaster(contextObj.roomtxt + " booking can be done only " + result["Data"][0].Value + " days in advance", 2);
                                    }
                                });
                            }
                            break;
                        case -5:
                            contextObj.schedulingService.getSessionData().subscribe(function (data) {
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
                    }
                });
            }
        }
    };
    MyActiveRequestEditComponent.prototype.getSessionUserData = function () {
        debugger;
        var contextObj = this;
        contextObj.schedulingService.getSessionData().subscribe(function (data) {
            debugger;
            var retData = data["Data"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            contextObj.schedulingService.GetUserRolebasedSettingsRowData(parseInt(contextObj.sessionUserRoleId)).subscribe(function (result) {
                debugger;
                if (result.Data.DataCount == 1) {
                    contextObj.AdvanceResPeriod = JSON.parse(result.Data.FieldBinderData)[0]["Advance Reservation Period (in days)"];
                    contextObj.MaxNoofReservation = JSON.parse(result.Data.FieldBinderData)[0]["Maximum Number of Reservation"];
                }
                if (contextObj.AdvanceResPeriod == null) {
                    contextObj.schedulingService.checkSubscribedFeature('240').subscribe(function (result) {
                        if (result["Data"][0]["IsSubscribed"]) {
                            contextObj.AdvanceResPeriod = result["Data"][0].Value;
                        }
                    });
                }
                if (contextObj.MaxNoofReservation && contextObj.MaxNoofReservation > 0) {
                    contextObj.fieldDetailsAdd.find(function (item) { return item.FieldId == 1687; }).ReadOnlyMode = true;
                    contextObj.fieldDetailsAdd.find(function (item) { return item.FieldId == 1688; }).ReadOnlyMode = true;
                }
            });
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MyActiveRequestEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MyActiveRequestEditComponent.prototype, "RoomCapacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MyActiveRequestEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MyActiveRequestEditComponent.prototype, "submitSuccess", void 0);
    MyActiveRequestEditComponent = __decorate([
        core_1.Component({
            selector: 'my-active-request-edit',
            templateUrl: './app/Views/Scheduling/Requests/my-active-requests-edit.component.html',
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'SpaceTime', 'ReservedUserId', 'SpaceId'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService])
    ], MyActiveRequestEditComponent);
    return MyActiveRequestEditComponent;
}());
exports.MyActiveRequestEditComponent = MyActiveRequestEditComponent;
//# sourceMappingURL=my-active-requests-edit.component.js.map