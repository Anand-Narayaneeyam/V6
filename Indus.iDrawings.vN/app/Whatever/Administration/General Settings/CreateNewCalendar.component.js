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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var setWorkingTime_component_1 = require('./setWorkingTime.component');
var CreateNewCalendarComponent = (function () {
    function CreateNewCalendarComponent(administrationService, _notificationService) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.workTime = [];
        this.workTimeList = [];
        this.dataSource = [];
    }
    CreateNewCalendarComponent.prototype.onSubmitData = function (event) {
        debugger;
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    CreateNewCalendarComponent.prototype.postSubmit = function (strsubmitField, target) {
        debugger;
        var contextObj = this;
        if (this.workTime.length > 0) {
            this.workTimeList = [];
            for (var cnt = 0; cnt < this.workTime.length; cnt++) {
                this.workTimeList.push((_a = {}, _a["StartTime"] = this.workTime[cnt]["Start Time"], _a["EndTime"] = this.workTime[cnt]["End Time"], _a));
            }
            var field = JSON.parse(strsubmitField);
            if (parseInt(field[2].Value) > 0) {
                field[1].Value = field[2].Value;
            }
            strsubmitField = JSON.stringify(field);
            contextObj.administrationService.postSubmitCalendar(strsubmitField, JSON.stringify(this.workTimeList)).subscribe(function (resultData) {
                debugger;
                switch (resultData.StatusId) {
                    case 1:
                        contextObj._notificationService.ShowToaster("Calendar added", 2);
                        contextObj.submitSuccess.emit({ returnData: resultData.StatusId, ServerId: resultData.ServerId });
                        break;
                    case 3:
                        contextObj._notificationService.ShowToaster("Calendar Name Already Exists", 2);
                        break;
                }
            });
        }
        else {
            contextObj._notificationService.ShowToaster("New Base Calendar cannot be created as Working Time not set. Set the Working Time first.", 5);
        }
        var _a;
    };
    CreateNewCalendarComponent.prototype.fieldChange = function (event) {
        debugger;
        var contextObj = this;
        var Field = event.ddlRelationShipEvent.ChildFieldObject;
        if (Field.ReportFieldId == 500196) {
            this.administrationService.getCalendarDetails(Field.FieldValue).subscribe(function (resultData) {
                debugger;
                contextObj.dataSource = JSON.parse(resultData.FieldBinderData);
                var reportfieldIdValues = new Array();
                reportfieldIdValues.push({ ReportFieldId: 5494, Value: Field.FieldValue });
                reportfieldIdValues.push({ ReportFieldId: 6444, Value: "0" });
                if (contextObj.dataSource.length > 0) {
                    for (var i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                        if (contextObj.fieldDetailsAdd[i]["FieldId"] == 2807) {
                            contextObj.fieldDetailsAdd[i]["FieldValue"] = contextObj.dataSource[0].StartWeekDayId;
                        }
                        if (contextObj.fieldDetailsAdd[i]["FieldId"] == 2808) {
                            contextObj.fieldDetailsAdd[i].MultiFieldValues = [];
                            if (contextObj.dataSource[0].IsSunWorking == 1) {
                                contextObj.fieldDetailsAdd[i].MultiFieldValues.push("1");
                            }
                            if (contextObj.dataSource[0].IsMonWorking == 1) {
                                contextObj.fieldDetailsAdd[i].MultiFieldValues.push("2");
                            }
                            if (contextObj.dataSource[0].IsTueWorking == 1) {
                                contextObj.fieldDetailsAdd[i].MultiFieldValues.push("3");
                            }
                            if (contextObj.dataSource[0].IsWedWorking == 1) {
                                contextObj.fieldDetailsAdd[i].MultiFieldValues.push("4");
                            }
                            if (contextObj.dataSource[0].IsThursWorking == 1) {
                                contextObj.fieldDetailsAdd[i].MultiFieldValues.push("5");
                            }
                            if (contextObj.dataSource[0].IsFriWorking == 1) {
                                contextObj.fieldDetailsAdd[i].MultiFieldValues.push("6");
                            }
                            if (contextObj.dataSource[0].IsSatWorking == 1) {
                                contextObj.fieldDetailsAdd[i].MultiFieldValues.push("7");
                            }
                            contextObj.changeOfMultiValue(parseInt(contextObj.dataSource[0].StartWeekDayId));
                        }
                    }
                    contextObj.administrationService.getWorkingTimeDataList(JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
                        debugger;
                        var itemsSource = JSON.parse(result["Data"].FieldBinderData);
                        contextObj.workTime = itemsSource;
                    });
                }
                else {
                    for (var i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                        if (contextObj.fieldDetailsAdd[i]["FieldId"] == 2807) {
                            contextObj.fieldDetailsAdd[i]["FieldValue"] = "-1";
                        }
                        if (contextObj.fieldDetailsAdd[i]["FieldId"] == 2808) {
                            contextObj.fieldDetailsAdd[i].MultiFieldValues = [];
                        }
                    }
                    contextObj.workTime = [];
                }
            });
        }
        if (Field.ReportFieldId == 6442) {
            var val = parseInt(Field.FieldValue);
            contextObj.changeOfMultiValue(val);
        }
    };
    CreateNewCalendarComponent.prototype.changeOfMultiValue = function (val) {
        var contextObj = this;
        switch (val) {
            case 1:
                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues =
                    [{ Id: 1, Value: "Sunday" },
                        { Id: 2, Value: "Monday" },
                        { Id: 3, Value: "Tuesday" },
                        { Id: 4, Value: "Wednesday" },
                        { Id: 5, Value: "Thursday" },
                        { Id: 6, Value: "Friday" },
                        { Id: 7, Value: "Saturday" }];
                break;
            case 2:
                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues =
                    [{ Id: 2, Value: "Monday" },
                        { Id: 3, Value: "Tuesday" },
                        { Id: 4, Value: "Wednesday" },
                        { Id: 5, Value: "Thursday" },
                        { Id: 6, Value: "Friday" },
                        { Id: 7, Value: "Saturday" },
                        { Id: 1, Value: "Sunday" }];
                break;
            case 3:
                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues =
                    [{ Id: 3, Value: "Tuesday" },
                        { Id: 4, Value: "Wednesday" },
                        { Id: 5, Value: "Thursday" },
                        { Id: 6, Value: "Friday" },
                        { Id: 7, Value: "Saturday" },
                        { Id: 1, Value: "Sunday" },
                        { Id: 2, Value: "Monday" }];
                break;
            case 4:
                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues =
                    [{ Id: 4, Value: "Wednesday" },
                        { Id: 5, Value: "Thursday" },
                        { Id: 6, Value: "Friday" },
                        { Id: 7, Value: "Saturday" },
                        { Id: 1, Value: "Sunday" },
                        { Id: 2, Value: "Monday" },
                        { Id: 3, Value: "Tuesday" },];
                break;
            case 5:
                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues =
                    [{ Id: 5, Value: "Thursday" },
                        { Id: 6, Value: "Friday" },
                        { Id: 7, Value: "Saturday" },
                        { Id: 1, Value: "Sunday" },
                        { Id: 2, Value: "Monday" },
                        { Id: 3, Value: "Tuesday" },
                        { Id: 4, Value: "Wednesday" }];
                break;
            case 6:
                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues =
                    [{ Id: 6, Value: "Friday" },
                        { Id: 7, Value: "Saturday" },
                        { Id: 1, Value: "Sunday" },
                        { Id: 2, Value: "Monday" },
                        { Id: 3, Value: "Tuesday" },
                        { Id: 4, Value: "Wednesday" },
                        { Id: 5, Value: "Thursday" }];
                break;
            case 7:
                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues =
                    [{ Id: 7, Value: "Saturday" },
                        { Id: 1, Value: "Sunday" },
                        { Id: 2, Value: "Monday" },
                        { Id: 3, Value: "Tuesday" },
                        { Id: 4, Value: "Wednesday" },
                        { Id: 5, Value: "Thursday" },
                        { Id: 6, Value: "Friday" }];
                break;
            default:
                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues =
                    [{ Id: 1, Value: "Sunday" },
                        { Id: 2, Value: "Monday" },
                        { Id: 3, Value: "Tuesday" },
                        { Id: 4, Value: "Wednesday" },
                        { Id: 5, Value: "Thursday" },
                        { Id: 6, Value: "Friday" },
                        { Id: 7, Value: "Saturday" }];
                break;
        }
    };
    CreateNewCalendarComponent.prototype.rbnChange = function (event) {
        debugger;
        var radio = event.rbtnObject.fieldobject;
        if (radio.FieldId == 2806) {
            for (var i = 0; i < this.fieldDetailsAdd.length; i++) {
                if (this.fieldDetailsAdd[i]["FieldId"] == 2807) {
                    if (radio.FieldValue == "0") {
                        this.fieldDetailsAdd[i].IsEnabled = true;
                        this.fieldDetailsAdd[i].IsMandatory = true;
                        this.enableButton = false;
                    }
                    else if (radio.FieldValue == "1") {
                        this.fieldDetailsAdd[i].IsEnabled = false;
                        this.fieldDetailsAdd[i].IsMandatory = false;
                        this.fieldDetailsAdd[i].HasValidationError = false;
                        this.enableButton = true;
                    }
                    this.fieldDetailsAdd[i].FieldValue = "1";
                }
                if (this.fieldDetailsAdd[i]["FieldId"] == 2828) {
                    if (radio.FieldValue == "0") {
                        this.fieldDetailsAdd[i].IsEnabled = false;
                        this.fieldDetailsAdd[i].IsMandatory = false;
                    }
                    else if (radio.FieldValue == "1") {
                        this.fieldDetailsAdd[i].IsEnabled = true;
                        this.fieldDetailsAdd[i].IsMandatory = true;
                    }
                    this.fieldDetailsAdd[i].FieldValue = "-1";
                }
                if (this.fieldDetailsAdd[i]["FieldId"] == 2808) {
                    if (radio.FieldValue == "0") {
                        this.fieldDetailsAdd[i].IsEnabled = true;
                        this.fieldDetailsAdd[i].IsMandatory = true;
                    }
                    else if (radio.FieldValue == "1") {
                        this.fieldDetailsAdd[i].IsEnabled = false;
                        this.fieldDetailsAdd[i].IsMandatory = false;
                    }
                    this.fieldDetailsAdd[i].MultiFieldValues = [];
                    //this.dayarray = [];
                    this.workTime = [];
                }
            }
        }
    };
    CreateNewCalendarComponent.prototype.SetWorkingTimeClick = function () {
        debugger;
        var name = document.getElementById('2805');
        this.calendarName = name.value;
        if (name.value != "") {
            this.pageTitle = "Set Working Time";
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            this._notificationService.ShowToaster("Enter Calendar Name to set Working Time", 2);
        }
    };
    CreateNewCalendarComponent.prototype.submitWorkTime = function (event) {
        debugger;
        this.workTime = event.returnData;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CreateNewCalendarComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CreateNewCalendarComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CreateNewCalendarComponent.prototype, "submitSuccess", void 0);
    CreateNewCalendarComponent = __decorate([
        core_1.Component({
            selector: 'createNewCalendar',
            templateUrl: 'app/Views/Administration/General Settings/CreateNewCalendar.component.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, split_view_component_1.SplitViewComponent, setWorkingTime_component_1.SetWorkingTimeComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'CalendarId', 'btnName'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], CreateNewCalendarComponent);
    return CreateNewCalendarComponent;
}());
exports.CreateNewCalendarComponent = CreateNewCalendarComponent;
//# sourceMappingURL=CreateNewCalendar.component.js.map