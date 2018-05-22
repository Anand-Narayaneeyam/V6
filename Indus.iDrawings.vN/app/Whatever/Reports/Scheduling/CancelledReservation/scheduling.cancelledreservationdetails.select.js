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
var dropdownlistcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var submenu_component_1 = require('../../../../Framework/Whatever/Submenu/submenu.component');
var scheduling_service_1 = require('../../../../Models/Scheduling/scheduling.service');
var scheduling_cancelledreservationdetails_report_1 = require('./scheduling.cancelledreservationdetails.report');
var listboxcomponent_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var CancelledReservationDetails = (function () {
    function CancelledReservationDetails(notificationService, schedulingService, generFun) {
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
        this.SiteId = 0;
        this.BuildingId = 0;
        this.FloorId = 0;
        this.selectedTab = 0;
        this.iscard = true;
        this.tabDeleteIndex = 0;
        this.pagePath = "Reports / Scheduling / Cancelled Reservation Details";
        this.selectedTeam = "";
    }
    CancelledReservationDetails.prototype.ngOnInit = function () {
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
        contextObj.schedulingService.UserReservationReportSelect().subscribe(function (resultData) {
            contextObj.dateSelectorField = resultData.Data;
            var index = contextObj.dateSelectorField.findIndex(function (el) { return el.FieldId == 2586; });
            if (index != -1)
                contextObj.teamListField = contextObj.dateSelectorField[index];
            contextObj.schedulingService.getSessionData().subscribe(function (data) {
                var retData = data["Data"];
                var UserRoleId = retData["UserRoleId"];
                if (UserRoleId >= 4) {
                    contextObj.ddlSite = undefined;
                    contextObj.ddlBuilding = undefined;
                    contextObj.ddlFloor = undefined;
                }
                else {
                    contextObj.ddlSite = resultData.Data[2];
                    contextObj.ddlBuilding = resultData.Data[3];
                    contextObj.ddlFloor = resultData.Data[4];
                }
            });
        });
    };
    CancelledReservationDetails.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        contextObj.nextClicked = false;
        contextObj.fromDate = contextObj.dateSelectorField[0].FieldValue;
        contextObj.toDate = contextObj.dateSelectorField[1].FieldValue;
        var toDate = new Date(contextObj.toDate);
        var fromDate = new Date(contextObj.fromDate);
        contextObj.selectedTeam = null;
        contextObj.selectedTeam = "";
        if (contextObj.teamListField.MultiFieldValues != null && contextObj.teamListField.MultiFieldValues != undefined && contextObj.teamListField.MultiFieldValues.length > 0) {
            for (var i = 0; i < contextObj.teamListField.MultiFieldValues.length; i++)
                contextObj.selectedTeam += contextObj.teamListField.MultiFieldValues[i] + ",";
            contextObj.selectedTeam = contextObj.selectedTeam.substring(0, contextObj.selectedTeam.length - 1);
        }
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
    CancelledReservationDetails.prototype.SelectAllTeamOnClick = function (event) {
    };
    CancelledReservationDetails.prototype.singleTeamNameOnClick = function (event) {
    };
    CancelledReservationDetails.prototype.getSelectedTab = function (event) {
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
    CancelledReservationDetails.prototype.onChangeSite = function (siteId) {
        var contextObj = this;
        contextObj.SiteId = parseInt(siteId);
        contextObj.ddlBuilding.FieldValue = "-1";
        contextObj.ddlFloor.FieldValue = "-1";
        contextObj.ddlBuilding.LookupDetails.LookupValues = null;
        contextObj.ddlFloor.LookupDetails.LookupValues = null;
        if (siteId == "-1") {
            contextObj.SiteId = 0;
            return;
        }
        contextObj.schedulingService.loadBuilding(siteId, 1302).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"].length > 0) {
                contextObj.ddlBuilding.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (contextObj.ddlBuilding.LookupDetails.LookupValues.length == 1) {
                    contextObj.ddlBuilding.FieldValue = contextObj.ddlBuilding.LookupDetails.LookupValues[0].Id.toString();
                    contextObj.onChangeBuilding(contextObj.ddlBuilding.FieldValue);
                }
            }
        });
    };
    CancelledReservationDetails.prototype.onChangeBuilding = function (buildingId) {
        var contextObj = this;
        contextObj.BuildingId = parseInt(buildingId);
        contextObj.ddlFloor.FieldValue = "-1";
        contextObj.ddlFloor.LookupDetails.LookupValues = null;
        if (buildingId == "-1") {
            contextObj.BuildingId = 0;
            return;
        }
        contextObj.schedulingService.loadFloor(buildingId, 1303).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"].length > 0) {
                contextObj.ddlFloor.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (contextObj.ddlFloor.LookupDetails.LookupValues.length == 1) {
                    contextObj.ddlFloor.FieldValue = contextObj.ddlFloor.LookupDetails.LookupValues[0].Id.toString();
                }
            }
        });
    };
    CancelledReservationDetails.prototype.onChangeFloor = function (floorId) {
        var contextObj = this;
        contextObj.FloorId = parseInt(floorId);
    };
    CancelledReservationDetails = __decorate([
        core_1.Component({
            selector: 'CancelledReservationDetails',
            templateUrl: './app/Views/Reports/Scheduling/CancelledReservation/scheduling.cancelledreservationdetails.select.html',
            directives: [listboxcomponent_component_1.ListBoxComponent, notify_component_1.Notification, datecomponent_component_1.DateComponent, page_component_1.PageComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, dropdownlistcomponent_component_1.DropDownListComponent, submenu_component_1.SubMenu, scheduling_cancelledreservationdetails_report_1.SchedulingReportCancelledReservationDetails],
            providers: [scheduling_service_1.SchedulingService, notify_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, scheduling_service_1.SchedulingService, General_1.GeneralFunctions])
    ], CancelledReservationDetails);
    return CancelledReservationDetails;
}());
exports.CancelledReservationDetails = CancelledReservationDetails;
//# sourceMappingURL=scheduling.cancelledreservationdetails.select.js.map