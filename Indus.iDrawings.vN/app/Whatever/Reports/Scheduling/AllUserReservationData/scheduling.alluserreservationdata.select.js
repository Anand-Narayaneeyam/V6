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
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../../Models/Common/General');
var datecomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var scheduling_service_1 = require('../../../../Models/Scheduling/scheduling.service');
var scheduling_alluserreservationdata_report_1 = require('./scheduling.alluserreservationdata.report');
var dropdownlistcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var listboxcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var AllUserReservationData = (function () {
    function AllUserReservationData(notificationService, schedulingService, generFun) {
        this.notificationService = notificationService;
        this.schedulingService = schedulingService;
        this.generFun = generFun;
        this.EndDate = "";
        this.StartDate = "";
        this.nextClicked = false;
        this.blnShowDate = true;
        this.nextEnabled = false;
        this.reportType = undefined;
        this.fromDate = "";
        this.toDate = "";
        this.selectedTab = 0;
        this.iscard = true;
        this.tabDeleteIndex = 0;
        this.pagePath = "Reports / Scheduling / All User Reservation Data";
        this.selectedTeam = "";
    }
    AllUserReservationData.prototype.ngOnInit = function () {
        debugger;
        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
        var contextObj = this;
        contextObj.schedulingService.SchedulingReportDateSelect().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;
            var index = contextObj.dateSelectorField.findIndex(function (el) { return el.FieldId == 2586; });
            if (index != -1)
                contextObj.teamListField = contextObj.dateSelectorField[index];
            //var index = contextObj.dateSelectorField.findIndex(function (el) { return el.ReportFieldId == 500368 });
            //if (index != -1)
            //    contextObj.teamDropdownField = contextObj.dateSelectorField[index];
        });
    };
    AllUserReservationData.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        contextObj.nextClicked = false;
        contextObj.fromDate = this.dateSelectorField[0].FieldValue;
        contextObj.toDate = this.dateSelectorField[1].FieldValue;
        contextObj.selectedTeam = null;
        contextObj.selectedTeam = "";
        if (contextObj.teamListField.MultiFieldValues != null && contextObj.teamListField.MultiFieldValues != undefined && contextObj.teamListField.MultiFieldValues.length > 0) {
            for (var i = 0; i < contextObj.teamListField.MultiFieldValues.length; i++)
                contextObj.selectedTeam += contextObj.teamListField.MultiFieldValues[i] + ",";
            contextObj.selectedTeam = contextObj.selectedTeam.substring(0, contextObj.selectedTeam.length - 1);
        }
        var toDate = new Date(this.toDate);
        var fromDate = new Date(this.fromDate);
        if (this.fromDate != "" && this.toDate != "") {
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('From Date must be less than or equal to To Date', 2);
            }
            else {
                this.reportType = 1;
                var contexObj = this;
                setTimeout(function () {
                    contexObj.nextClicked = true;
                }, 50);
                setTimeout(function () {
                    contexObj.selectedTab = 1;
                }, 100);
            }
        }
        else {
            return;
        }
    };
    AllUserReservationData.prototype.onChangeDataFieldTeam = function (event) {
        this.selectedTeam = event;
    };
    AllUserReservationData.prototype.SelectAllTeamOnClick = function (event) {
    };
    AllUserReservationData.prototype.singleTeamNameOnClick = function (event) {
    };
    AllUserReservationData.prototype.getSelectedTab = function (event) {
        if (event[0] == 0) {
            this.selectedTab = 0;
            if (event[1] == true && this.reportType != undefined) {
                this.nextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.reportType = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
    };
    AllUserReservationData = __decorate([
        core_1.Component({
            selector: 'alluserreservationdata-selector',
            templateUrl: './app/Views/Reports/Scheduling/AllUserReservationData/scheduling.alluserreservations.select.html',
            directives: [listboxcomponent_component_1.ListBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, notify_component_1.Notification, datecomponent_component_1.DateComponent, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, scheduling_alluserreservationdata_report_1.SchedulingReportAllUserReservationData],
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, scheduling_service_1.SchedulingService, General_1.GeneralFunctions])
    ], AllUserReservationData);
    return AllUserReservationData;
}());
exports.AllUserReservationData = AllUserReservationData;
//# sourceMappingURL=scheduling.alluserreservationdata.select.js.map