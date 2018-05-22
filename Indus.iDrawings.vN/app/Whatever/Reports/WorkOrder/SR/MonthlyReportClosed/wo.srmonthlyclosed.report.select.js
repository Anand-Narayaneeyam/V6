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
var wo_srmonthlyclosed_report_component_1 = require('./wo.srmonthlyclosed.report.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var datecomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var WOSRMonthlyClosedReportSelect = (function () {
    function WOSRMonthlyClosedReportSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.isNextClicked = false;
        this.dateSelectorField = undefined;
        this.ddlPriority = undefined;
        this.ddlWorkType = undefined;
        this.FromDate = "";
        this.ToDate = "";
        this.WorkTypeId = 0;
        this.WorkTypeName = "";
        this.Priority = "";
        this.PriorityId = 0;
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
        this.DateRange = "";
    }
    WOSRMonthlyClosedReportSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / Service Requests / Monthly Report - Closed";
        var contextObj = this;
        this.commonreportservice.getSRWeeklyReportFields().subscribe(function (result) {
            var tempArray = new Array();
            tempArray.push(result.Data[0]);
            tempArray.push(result.Data[1]);
            contextObj.dateSelectorField = tempArray;
            contextObj.dateSelectorField[0].FieldLabel = "Month From";
            contextObj.dateSelectorField[1].FieldLabel = "Month To";
            contextObj.ddlWorkType = result.Data[2];
            contextObj.getdata();
            contextObj.ddlPriority = result.Data[3];
        });
        contextObj.alignContent = "horizontal";
    };
    WOSRMonthlyClosedReportSelect.prototype.getdata = function () {
        var contextObj = this;
        this.commonreportservice.ddlgetWorkTypeLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    };
    WOSRMonthlyClosedReportSelect.prototype.onChangeWorkType = function (event) {
        this.WorkTypeId = event;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    };
    WOSRMonthlyClosedReportSelect.prototype.onChangePriority = function (event) {
        this.PriorityId = event;
        var lookUp = this.ddlPriority.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.Priority = lookUp.Value;
    };
    WOSRMonthlyClosedReportSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        this.FromDate = this.dateSelectorField[0].FieldValue;
        this.ToDate = this.dateSelectorField[1].FieldValue;
        var contextObj = this;
        if (this.FromDate != "" && this.ToDate != "") {
            var toDate = new Date(this.ToDate);
            var fromDate = new Date(this.FromDate);
            if (toDate < fromDate) {
                this.notificationService.ShowToaster('Month From must be less than or equal to Month To', 2);
            }
            else {
                contextObj.commonreportservice.getFirstLastdaysofMonthforReport(contextObj.FromDate, contextObj.ToDate).subscribe(function (result) {
                    contextObj.FromDate = result.Data[0];
                    contextObj.ToDate = result.Data[1];
                    contextObj.DateRange = result.Data[2];
                    var dateselectorFrom = contextObj.dateSelectorField[0];
                    var dateselectorTo = contextObj.dateSelectorField[1];
                    if (contextObj.WorkTypeId == undefined || contextObj.ddlWorkType.FieldValue == "-1" || contextObj.WorkTypeName == "" || dateselectorFrom.HasValidationError || dateselectorTo.HasValidationError) {
                        contextObj.isNextClicked = false;
                    }
                    else {
                        contextObj.isnext = 1;
                        setTimeout(function () {
                            contextObj.isNextClicked = true;
                        }, 50);
                        setTimeout(function () {
                            contextObj.selectedTab = 1;
                        }, 100);
                    }
                });
            }
        }
    };
    WOSRMonthlyClosedReportSelect.prototype.getSelectedTab = function (event) {
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
    WOSRMonthlyClosedReportSelect = __decorate([
        core_1.Component({
            selector: 'wo-srmonthlyclosed-report',
            templateUrl: './app/Views/Reports/WorkOrder/SR/MonthlyReportClosed/wo.srmonthlyclosedreport.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, datecomponent_component_1.DateComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, wo_srmonthlyclosed_report_component_1.WOSRMonthlyClosedReportComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOSRMonthlyClosedReportSelect);
    return WOSRMonthlyClosedReportSelect;
}());
exports.WOSRMonthlyClosedReportSelect = WOSRMonthlyClosedReportSelect;
//# sourceMappingURL=wo.srmonthlyclosed.report.select.js.map