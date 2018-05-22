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
var common_service_1 = require('../../../../../Models/reports/common.service');
var notify_component_1 = require('../../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../../Framework/Models/Notification/notify.service');
var page_component_1 = require('../../../../../Framework/Whatever/Page/page.component');
var wo_schedulesbydaterange_component_1 = require('./wo.schedulesbydaterange.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var datecomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var WOSchedulesbyDateRangeReportSelect = (function () {
    function WOSchedulesbyDateRangeReportSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.isNextClicked = false;
        this.dateSelectorField = undefined;
        this.ddlRoute = undefined;
        this.ddlWorkType = undefined;
        this.ddlAPUser = undefined;
        this.RouteId = 0;
        this.WorkTypeId = 0;
        this.APUserId = 0;
        this.RouteName = "";
        this.WorkTypeName = "";
        this.APUserName = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    WOSchedulesbyDateRangeReportSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / General / Schedules by Date Range";
        var contextObj = this;
        this.commonreportservice.getFieldsforSchedulesbyDateRangeReport().subscribe(function (result) {
            var tempArray = new Array();
            tempArray.push(result.Data[0]);
            tempArray.push(result.Data[1]);
            contextObj.dateSelectorField = tempArray;
            contextObj.ddlRoute = result.Data[2];
            contextObj.ddlRoute.FieldValue = "-1";
            contextObj.ddlWorkType = result.Data[3];
            contextObj.ddlWorkType.FieldValue = "-1";
            contextObj.ddlAPUser = result.Data[4];
            contextObj.ddlAPUser.FieldValue = "-1";
        });
        contextObj.alignContent = "horizontal";
        //contextObj.ddlAPUser.IsEnabled = false;
    };
    WOSchedulesbyDateRangeReportSelect.prototype.onChangeRoute = function (event) {
        this.RouteId = event;
        if (this.RouteId != -1) {
            var lookUp = this.ddlRoute.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.RouteName = lookUp.Value;
        }
    };
    WOSchedulesbyDateRangeReportSelect.prototype.onChangeWorkType = function (event) {
        this.ddlAPUser.LookupDetails.LookupValues = null;
        this.WorkTypeId = event;
        this.WorkTypeName = "";
        if (this.WorkTypeId != -1) {
            var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.WorkTypeName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadAPUserLookupforWorkType(contextObj.WorkTypeId, 1261).subscribe(function (result) {
            contextObj.ddlAPUser.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlAPUser.FieldValue = "-1";
            //if (contextObj.ddlAPUser.LookupDetails.LookupValues.length > 0)
            //    contextObj.ddlAPUser.IsEnabled = true;
        });
        //if (this.EquipmentClassId == 0) {
        //    contextObj.ddlEquipmentNo.IsMandatory = false;
        //    this.EquipmentNoId = 0;
        //} else {
        //    contextObj.ddlEquipmentNo.IsMandatory = true;
        //    this.EquipmentNoId = -1;
        //}
    };
    WOSchedulesbyDateRangeReportSelect.prototype.onChangeAPUser = function (event) {
        this.APUserId = event;
        if (this.APUserId != -1) {
            var lookUp = this.ddlAPUser.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.APUserName = lookUp.Value;
        }
    };
    WOSchedulesbyDateRangeReportSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        this.DateFrom = this.dateSelectorField[0].FieldValue;
        this.DateTo = this.dateSelectorField[1].FieldValue;
        if (this.RouteId == -1)
            this.RouteId = 0;
        if (this.WorkTypeId == -1)
            this.WorkTypeId = 0;
        if (this.APUserId == -1)
            this.APUserId = 0;
        if (this.DateFrom != "" && this.DateTo != "") {
            var toDate = new Date(this.DateTo);
            var fromDate = new Date(this.DateFrom);
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('Date From must be less than or equal to Date To', 2);
            }
            else {
                var dateselectorFrom = this.dateSelectorField[0];
                var dateselectorTo = this.dateSelectorField[1];
                if (dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
                    this.isNextClicked = false;
                }
                else {
                    this.isnext = 1;
                    var contexObj = this;
                    setTimeout(function () {
                        contexObj.isNextClicked = true;
                    }, 50);
                    setTimeout(function () {
                        contexObj.selectedTab = 1;
                    }, 100);
                }
            }
        }
    };
    WOSchedulesbyDateRangeReportSelect.prototype.getSelectedTab = function (event) {
        if (event[0] == 0) {
            this.selectedTab = 0;
            if (event[1] == true && this.isnext != undefined) {
                this.isNextClicked = false;
                var contextObj = this;
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 1;
                    contextObj.isnext = undefined;
                }, 50);
                setTimeout(function () {
                    contextObj.tabDeleteIndex = 0;
                }, 50);
            }
        }
    };
    WOSchedulesbyDateRangeReportSelect = __decorate([
        core_1.Component({
            selector: 'wo-schedulesbydaterange-report',
            templateUrl: './app/Views/Reports/WorkOrder/Maintenance/SchedulesbyDateRange/wo.schedulesbydaterange.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, datecomponent_component_1.DateComponent, wo_schedulesbydaterange_component_1.WOSchedulesbyDateRangeReportComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOSchedulesbyDateRangeReportSelect);
    return WOSchedulesbyDateRangeReportSelect;
}());
exports.WOSchedulesbyDateRangeReportSelect = WOSchedulesbyDateRangeReportSelect;
//# sourceMappingURL=wo.schedulesbydaterange.select.js.map