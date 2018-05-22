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
var delayedworkorders_report_component_1 = require('./delayedworkorders.report.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var DelayedWorkOrdersReportSelect = (function () {
    function DelayedWorkOrdersReportSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.isNextClicked = false;
        this.ddlWorkType = undefined;
        this.WorkTypeId = 0;
        this.WorkTypeName = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
        this.DateRange = "";
    }
    DelayedWorkOrdersReportSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order /  Service Requests / Delayed Work Orders";
        var contextObj = this;
        this.commonreportservice.getSRDailyReportFields().subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[1];
            contextObj.getdata();
        });
        contextObj.alignContent = "horizontal";
    };
    DelayedWorkOrdersReportSelect.prototype.getdata = function () {
        var contextObj = this;
        this.commonreportservice.ddlgetWorkTypeLookups(0).subscribe(function (result) {
            contextObj.ddlWorkType.LookupDetails.LookupValues = result.LookupValues;
            contextObj.ddlWorkType.FieldValue = "-1";
        });
    };
    DelayedWorkOrdersReportSelect.prototype.onChangeWorkType = function (event) {
        this.WorkTypeId = event;
        var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
        this.WorkTypeName = lookUp.Value;
    };
    DelayedWorkOrdersReportSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        var contextObj = this;
        if (contextObj.WorkTypeId == undefined || contextObj.WorkTypeName == "" || contextObj.WorkTypeId == -1) {
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
    };
    DelayedWorkOrdersReportSelect.prototype.getSelectedTab = function (event) {
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
    DelayedWorkOrdersReportSelect = __decorate([
        core_1.Component({
            selector: 'wo-srdelayedwo-report',
            templateUrl: './app/Views/Reports/WorkOrder/SR/DelayedWorkOrders/delayedworkorders.report.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, delayedworkorders_report_component_1.DelayedWorkOrdersComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], DelayedWorkOrdersReportSelect);
    return DelayedWorkOrdersReportSelect;
}());
exports.DelayedWorkOrdersReportSelect = DelayedWorkOrdersReportSelect;
//# sourceMappingURL=delayedworkorders.report.select.js.map