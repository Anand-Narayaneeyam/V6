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
var wo_srproductivity_component_1 = require('./wo.srproductivity.component');
var dropdownlistcomponent_component_1 = require('../../../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var tabs_component_1 = require('../../../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../../../Framework/Whatever/Submenu/submenu.component');
var WOSRProductivityReportSelect = (function () {
    function WOSRProductivityReportSelect(commonreportservice, notificationService) {
        this.commonreportservice = commonreportservice;
        this.notificationService = notificationService;
        this.isNextClicked = false;
        this.ddlWorkType = undefined;
        this.ddlTrade = undefined;
        this.ddlTechnician = undefined;
        this.WorkTypeId = 0;
        this.TradeId = 0;
        this.TechnicianId = 0;
        this.WorkTypeName = "";
        this.TradeName = "";
        this.selectedTab = 0;
        this.isnext = undefined;
        this.iscard = true;
        this.tabDeleteIndex = 0;
    }
    WOSRProductivityReportSelect.prototype.ngOnInit = function () {
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
        this.pagePath = "Reports / Work Order / Service Requests / Work Order Productivity by Technician";
        var contextObj = this;
        this.commonreportservice.getWorkTypesforforProductivityTechnicianReport(1219, 2).subscribe(function (result) {
            contextObj.ddlWorkType = result.Data[0];
            contextObj.ddlWorkType.FieldValue = "-1";
            contextObj.ddlTrade = result.Data[1];
            contextObj.ddlTrade.FieldValue = "-1";
            contextObj.ddlTechnician = result.Data[2];
            contextObj.ddlTechnician.FieldValue = "-1";
        });
        contextObj.alignContent = "horizontal";
    };
    WOSRProductivityReportSelect.prototype.onChangeWorkType = function (event) {
        this.ddlTrade.LookupDetails.LookupValues = null;
        this.ddlTechnician.LookupDetails.LookupValues = null;
        this.WorkTypeId = event;
        this.WorkTypeName = "";
        if (this.WorkTypeId != -1) {
            var lookUp = this.ddlWorkType.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.WorkTypeName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadTradeLookupforWorkType(contextObj.WorkTypeId, 1219, 2).subscribe(function (result) {
            contextObj.ddlTrade.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlTrade.FieldValue = "-1";
            contextObj.ddlTechnician.FieldValue = "-1";
        });
    };
    WOSRProductivityReportSelect.prototype.onChangeTrade = function (event) {
        this.ddlTechnician.LookupDetails.LookupValues = null;
        this.TradeId = event;
        this.TradeName = "";
        if (this.TradeId != -1) {
            var lookUp = this.ddlTrade.LookupDetails.LookupValues.find(function (item) {
                return item.Id === parseInt(event);
            });
            this.TradeName = lookUp.Value;
        }
        var contextObj = this;
        this.commonreportservice.loadTechnicianLookupforWorkType(contextObj.TradeId, contextObj.WorkTypeId, 2627, 2).subscribe(function (result) {
            contextObj.ddlTechnician.LookupDetails.LookupValues = result["Data"]["LookupValues"];
            contextObj.ddlTechnician.FieldValue = "-1";
        });
    };
    WOSRProductivityReportSelect.prototype.onChangeTechnician = function (event) {
        this.TechnicianId = event;
        if (this.TechnicianId == -1)
            this.TechnicianId = 0;
        var lookUp = this.ddlTechnician.LookupDetails.LookupValues.find(function (item) {
            return item.Id === parseInt(event);
        });
    };
    WOSRProductivityReportSelect.prototype.onSubMenuChange = function (event) {
        this.isnext = undefined;
        this.isNextClicked = false;
        if (this.WorkTypeId == undefined || this.WorkTypeName == "" || this.TradeId == undefined || this.TradeName == "" || this.TradeId == -1 || this.WorkTypeId == -1) {
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
    };
    WOSRProductivityReportSelect.prototype.getSelectedTab = function (event) {
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
    WOSRProductivityReportSelect = __decorate([
        core_1.Component({
            selector: 'wo-srproductivity-report',
            templateUrl: './app/Views/Reports/WorkOrder/SR/ProductivityByTechnician/wo.srproductivity.select.html',
            providers: [common_service_1.CommonReportService, notify_service_1.NotificationService],
            directives: [notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, submenu_component_1.SubMenu, wo_srproductivity_component_1.WOSRProductivityReportComponent]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonReportService, notify_service_1.NotificationService])
    ], WOSRProductivityReportSelect);
    return WOSRProductivityReportSelect;
}());
exports.WOSRProductivityReportSelect = WOSRProductivityReportSelect;
//# sourceMappingURL=wo.srproductivity.select.js.map