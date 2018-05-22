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
var http_1 = require('@angular/http');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var CreateNewCalendar_component_1 = require('./CreateNewCalendar.component');
var dynaCalendar_component_1 = require('../Calendar/dynaCalendar.component');
var CalendarExceptionAddEdit_component_1 = require('./CalendarExceptionAddEdit.component');
var DynamicCalendarComponent = (function () {
    function DynamicCalendarComponent(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.enableMenu = [1];
        this.menuData = [
            {
                "id": 1,
                "title": "Create New",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.CalendarId = 0;
        this.gridHead = "";
        this.CalendarObj = "";
        this.CalendarDetails = [];
        this.WorkingDays = [];
        this.blnBlockPrevClick = true;
        this.blnBlockNextClick = true;
        this.exceptiongridHead = " ";
        this.exceptioninputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.ExceptionDays = [];
        this.enableCalendar = true;
        this.enableButton = true;
    }
    DynamicCalendarComponent.prototype.ngOnInit = function () {
        this.alignContent = "horizontal";
        var contextObj = this;
        this.administrationService.getCalendarFields().subscribe(function (resultData) {
            debugger;
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
    };
    DynamicCalendarComponent.prototype.onChangeCalendar = function (event) {
        var contextObj = this;
        this.CalendarId = event;
        if (this.CalendarId > -1) {
            this.dataLoad(this.CalendarId);
            this.blnBlockPrevClick = false;
            this.blnBlockNextClick = false;
            this.enableCalendar = false;
        }
        else {
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
    };
    DynamicCalendarComponent.prototype.dataLoad = function (CalendarId) {
        var contextObj = this;
        contextObj.WorkingDays = [];
        contextObj.StartWeekDay = 0;
        var reportfieldIdValues = new Array();
        reportfieldIdValues.push({ ReportFieldId: 5494, Value: CalendarId });
        reportfieldIdValues.push({ ReportFieldId: 6444, Value: "0" });
        contextObj.administrationService.getWorkingTimeDataList(JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.ddlCalendar.LookupDetails.LookupValues.length > 0) {
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
            debugger;
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
        debugger;
        this.StartDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        this.EndDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        contextObj.getCalendarExceptionDays();
        setTimeout(function () {
            contextObj.enableCalendar = true;
        }, 10);
    };
    DynamicCalendarComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
        }
    };
    DynamicCalendarComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(this.CalendarId);
    };
    ;
    DynamicCalendarComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(this.CalendarId);
    };
    DynamicCalendarComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Calendar";
        this.administrationService.getCreateNewCalendarFields().subscribe(function (resultData) {
            contextObj.fieldDetailsAdd = resultData["Data"];
            for (var i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
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
    };
    DynamicCalendarComponent.prototype.submitReturn = function (event) {
        var contextObj = this;
        contextObj.CalenderdropdownId = event.ServerId;
        // contextObj.ngOnInit();
        contextObj.updateCalendarddl();
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    DynamicCalendarComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    DynamicCalendarComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    DynamicCalendarComponent.prototype.getFormattedDate = function (dt) {
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
    DynamicCalendarComponent.prototype.prevMonClick = function (event) {
        this.CalendarObj = event.selectedDate;
        this.StartDate = new Date(new Date(event.selectedDate).getFullYear(), new Date(event.selectedDate).getMonth(), 1);
        this.EndDate = new Date(new Date(event.selectedDate).getFullYear(), new Date(event.selectedDate).getMonth() + 1, 0);
        this.getCalendarExceptionDays();
        this.enableCalendar = true;
    };
    DynamicCalendarComponent.prototype.nextMonClick = function (event) {
        this.CalendarObj = event.selectedDate;
        this.StartDate = new Date(new Date(event.selectedDate).getFullYear(), new Date(event.selectedDate).getMonth(), 1);
        this.EndDate = new Date(new Date(event.selectedDate).getFullYear(), new Date(event.selectedDate).getMonth() + 1, 0);
        this.getCalendarExceptionDays();
        this.enableCalendar = true;
    };
    DynamicCalendarComponent.prototype.btnClick = function (event) {
        var contextObj = this;
        if (parseInt(this.ddlCalendar.FieldValue) > -1) {
            var reportfieldIdValues = new Array();
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
    };
    DynamicCalendarComponent.prototype.AddExceptionClick = function (event) {
        debugger;
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Exception";
        this.IsNewCalendar = false;
        if (this.CalendarId > 0) {
            this.administrationService.loadCalendarExceptionAddEditFields(0, 0, 1).subscribe(function (resultData) {
                debugger;
                contextObj.exceptionAddEditfields = resultData["Data"];
                contextObj.fieldDetailsEdit = null;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Select a Calendar", 5);
        }
    };
    DynamicCalendarComponent.prototype.EditExceptionClick = function (event) {
        debugger;
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Exception";
        this.IsNewCalendar = false;
        if (this.exceptioninputItems.selectedIds != undefined && this.exceptioninputItems.selectedIds.length == 1) {
            this.administrationService.loadCalendarExceptionAddEditFields(0, this.exceptioninputItems.selectedIds[0], 1).subscribe(function (resultData) {
                debugger;
                contextObj.exceptionAddEditfields = resultData["Data"];
                contextObj.fieldDetailsEdit = contextObj.exceptioninputItems.rowData;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
        else {
        }
    };
    DynamicCalendarComponent.prototype.DeleteExceptionClick = function (event) {
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
    };
    DynamicCalendarComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        this.deleteException();
    };
    DynamicCalendarComponent.prototype.deleteException = function () {
        var contextObj = this;
        this.administrationService.postCalendarExceptionDelete(this.exceptioninputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.exceptionitemsSource, "delete", '', contextObj.exceptioninputItems.selectedIds, contextObj.exceptioninputItems.dataKey, contextObj.totalItems);
                contextObj.exceptionitemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                contextObj.notificationService.ShowToaster("Exception deleted", 3);
                contextObj.dataLoad(this.CalendarId);
            }
        });
    };
    DynamicCalendarComponent.prototype.submitCalExceReturn = function (event) {
        debugger;
        var retUpdatedSrc;
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
    };
    DynamicCalendarComponent.prototype.getCalendarExceptionDays = function () {
        var contextObj = this;
        this.ExceptionDays = [];
        this.administrationService.getCalendarExceptionDays(this.CalendarId, this.getFormattedDate(this.StartDate), this.getFormattedDate(this.EndDate)).subscribe(function (resultData) {
            contextObj.ExceptionDays = JSON.parse(resultData.FieldBinderData);
        });
    };
    DynamicCalendarComponent.prototype.updateCalendarddl = function () {
        this.alignContent = "horizontal";
        var contextObj = this;
        this.administrationService.getCalendarFields().subscribe(function (resultData) {
            debugger;
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
    };
    DynamicCalendarComponent = __decorate([
        core_1.Component({
            selector: 'dynamicCalendar',
            templateUrl: './app/Views/Administration/General Settings/dynamicCalendar.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, dropdownlistcomponent_component_1.DropDownListComponent, CreateNewCalendar_component_1.CreateNewCalendarComponent, dynaCalendar_component_1.CalendarComponent, CalendarExceptionAddEdit_component_1.CalendarExceptionAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], DynamicCalendarComponent);
    return DynamicCalendarComponent;
}());
exports.DynamicCalendarComponent = DynamicCalendarComponent;
//# sourceMappingURL=dynamicCalendar.component.js.map