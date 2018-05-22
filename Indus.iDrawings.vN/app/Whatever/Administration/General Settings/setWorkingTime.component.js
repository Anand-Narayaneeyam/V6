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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var timecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/timecomponent.component');
var datetimecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datetimecomponent.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var SetWorkingTimeComponent = (function () {
    function SetWorkingTimeComponent(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.mytime = new Date();
        this.totalItems = 0;
        this.pageIndex = 0;
        this.refreshgrid = [];
        this.addBtnName = "Add";
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 280;
        this.message = "Are you sure you want to delete the selected Working Time?";
    }
    SetWorkingTimeComponent.prototype.ngOnInit = function () {
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
    };
    SetWorkingTimeComponent.prototype.loaddata = function () {
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
    };
    SetWorkingTimeComponent.prototype.getformattedDataTimeonSelection = function (dt) {
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
        min = (this.mytime.getMinutes() < 10 ? '0' : '') + this.mytime.getMinutes();
        if (hh > 12) {
            meridian = "PM";
            hh = hh - 12;
        }
        else if (hh == 12) {
            meridian = "PM";
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
    };
    SetWorkingTimeComponent.prototype.AddClick = function () {
        var contextObj = this;
        var startTime = document.getElementById('5496');
        var endTime = document.getElementById('5497');
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
        for (var j = 0; j < this.itemsSource.length; j++) {
            if (this.addBtnName == "Add" || this.itemsSource[j].Id != contextObj.inputItems.selectedIds) {
                if ((eTime > new Date("1900/01/01 " + this.itemsSource[j]["Start Time"]) && sTime < new Date("1900/01/01 " + this.itemsSource[j]["End Time"]))
                    || (sTime == new Date("1900/01/01 " + this.itemsSource[j]["Start Time"]) && eTime == new Date("1900/01/01 " + this.itemsSource[j]["End Time"]))) {
                    contextObj.notificationService.ShowToaster("Overlap not allowed", 2);
                    return;
                }
            }
        }
        if (sTime < eTime) {
            if (this.addBtnName == "Add") {
                //this.itemsSource.push({ RowIndex:  1, Id: 0, ["Start Time"]: this.StartTime, ["End Time"]: this.EndTime });
                if (this.itemsSource.length == 0) {
                    this.itemsSource = [(_a = { RowIndex: this.itemsSource.length + 1, Id: this.itemsSource.length }, _a["Start Time"] = this.StartTime, _a["End Time"] = this.EndTime, _a)];
                }
                else {
                    this.itemsSource.push((_b = { RowIndex: this.itemsSource.length + 1, Id: this.itemsSource.length }, _b["Start Time"] = this.StartTime, _b["End Time"] = this.EndTime, _b));
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
        var _a, _b;
    };
    SetWorkingTimeComponent.prototype.DeleteClick = function () {
        this.showSlide = !this.showSlide;
    };
    SetWorkingTimeComponent.prototype.delete = function () {
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 1) {
            var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
    };
    SetWorkingTimeComponent.prototype.EditClick = function () {
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 1) {
            contextObj.fieldObjectFrom.FieldValue = contextObj.inputItems.rowData["Start Time"];
            contextObj.fieldObjectTo.FieldValue = contextObj.inputItems.rowData["End Time"];
            contextObj.addBtnName = "Save Changes";
        }
    };
    SetWorkingTimeComponent.prototype.SaveClick = function () {
        var contextObj = this;
        contextObj.submitSuccess.emit({ "returnData": contextObj.itemsSource });
    };
    SetWorkingTimeComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.delete();
    };
    SetWorkingTimeComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    SetWorkingTimeComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SetWorkingTimeComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SetWorkingTimeComponent.prototype, "calendarName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SetWorkingTimeComponent.prototype, "workTimedata", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SetWorkingTimeComponent.prototype, "submitSuccess", void 0);
    SetWorkingTimeComponent = __decorate([
        core_1.Component({
            selector: 'setWorkingTime',
            templateUrl: 'app/Views/Administration/General Settings/setWorkingTime.component.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, grid_component_1.GridComponent, timecomponent_component_1.TimeComponent, datetimecomponent_component_1.DateTimeComponent, slide_component_1.SlideComponent],
            inputs: ['calendarName', 'workTimedata'],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SetWorkingTimeComponent);
    return SetWorkingTimeComponent;
}());
exports.SetWorkingTimeComponent = SetWorkingTimeComponent;
//# sourceMappingURL=setWorkingTime.component.js.map