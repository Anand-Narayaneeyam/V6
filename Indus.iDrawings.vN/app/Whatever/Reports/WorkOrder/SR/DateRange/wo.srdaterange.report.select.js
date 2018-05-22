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
var wo_srdaterange_report_component_1 = require('./wo.srdaterange.report.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var datecomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var WOSRDateRangeReportSelect = (function () {
    function WOSRDateRangeReportSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.isNextClicked = false;
        this.dateSelectorField = undefined;
        this.ddlWorkType = undefined;
        this.DateFrom = "";
        this.DateTo = "";
        this.WorkTypeId = 0;
        this.WorkTypeName = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    WOSRDateRangeReportSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / Service Requests / Work Orders by Date Range";
        var contextObj = this;
        this.commonreportservice.getSRWeeklyReportFields().subscribe(function (result) {
            var tempArray = new Array();
            tempArray.push(result.Data[0]);
            tempArray.push(result.Data[1]);
            contextObj.dateSelectorField = tempArray;
            contextObj.dateSelectorField[0].FieldLabel = "Date to Perform From";
            contextObj.dateSelectorField[1].FieldLabel = "Date to Perform To";
            contextObj.ddlWorkType = result.Data[2];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    };
    WOSRDateRangeReportSelect.prototype.getdata = function () {
        var contextObj = this;
        this.commonreportservice.ddlgetWorkTypeLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    };
    WOSRDateRangeReportSelect.prototype.onChangeWorkType = function (event) {
        this.WorkTypeId = event;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    };
    WOSRDateRangeReportSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        this.DateFrom = this.dateSelectorField[0].FieldValue;
        this.DateTo = this.dateSelectorField[1].FieldValue;
        if (this.DateFrom != "" && this.DateTo != "") {
            var toDate = new Date(this.DateTo);
            var fromDate = new Date(this.DateFrom);
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('Date to Perform From must be less than or equal to Date to Perform To', 2);
            }
            else {
                var dateselectorFrom = this.dateSelectorField[0];
                var dateselectorTo = this.dateSelectorField[1];
                if (this.WorkTypeId == undefined || this.WorkTypeName == "" || this.WorkTypeId == -1 || dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
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
    WOSRDateRangeReportSelect.prototype.getSelectedTab = function (event) {
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
    WOSRDateRangeReportSelect = __decorate([
        core_1.Component({
            selector: 'wo-srdaterange-report',
            templateUrl: './app/Views/Reports/WorkOrder/SR/DateRange/wo.srdaterange.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, datecomponent_component_1.DateComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, wo_srdaterange_report_component_1.WOSRDateRangeReportComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOSRDateRangeReportSelect);
    return WOSRDateRangeReportSelect;
}());
exports.WOSRDateRangeReportSelect = WOSRDateRangeReportSelect;
//# sourceMappingURL=wo.srdaterange.report.select.js.map